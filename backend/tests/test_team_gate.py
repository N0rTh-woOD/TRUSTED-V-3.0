"""Team-neutral authentication, retired admin APIs, catalogs and submission persistence."""
import os
import re
import uuid
from pathlib import Path

import pytest
import requests
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv('/app/frontend/.env')
BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')
SAFE = {'detail': 'This feature is no longer available'}

def credentials(role):
    section = Path('/app/memory/test_credentials.md').read_text().split('### ' + ('Admin User' if role == 'admin' else 'Demo User'))[1].split('###')[0]
    return {k.lower(): re.search(rf'- {k}: `([^`]+)`', section).group(1) for k in ('Email', 'Password')}

@pytest.fixture(scope='module', params=['admin', 'demo'])
def account(request):
    session = requests.Session()
    creds = credentials(request.param)
    result = session.post(BASE_URL + '/api/auth/login', json=creds, timeout=30)
    if result.status_code != 200:
        pytest.skip(f'{request.param} authentication failed: {result.status_code}')
    data = result.json()
    session.headers['Authorization'] = 'Bearer ' + data['access_token']
    yield request.param, session, creds, data, result.headers
    session.close()

@pytest.fixture(scope='module')
def database():
    load_dotenv('/app/backend/.env', override=False)
    client = MongoClient(os.environ['MONGO_URL'])
    yield client[os.environ['DB_NAME']]
    client.close()

def test_role_neutral_auth(account, database):
    role, session, creds, data, headers = account
    assert data['token_type'] == 'bearer'
    assert isinstance(data['access_token'], str) and data['access_token']
    assert set(data['user']) == {'id', 'email', 'username'}
    assert data['user']['email'] == creds['email']
    response = session.get(BASE_URL + '/api/auth/me', timeout=30)
    assert response.status_code == 200
    assert response.json() == data['user']
    assert database.users.find_one({'id': data['user']['id']})['password_hash'].startswith('$2b$')
    print(f'{role}: httpOnly login cookie present: {"httponly" in headers.get("Set-Cookie", "").lower()}')

def test_admin_reads_retired(account):
    role, session, *_ = account
    for endpoint in ['/admin/stats', '/admin/users', '/admin/applications/board-support', '/admin/applications/partnership', '/admin/applications/sales-inquiries', '/admin/notifications', '/admin/llm-settings']:
        response = session.get(BASE_URL + '/api' + endpoint, timeout=30)
        assert response.status_code == 410, (role, endpoint, response.text)
        assert response.json() == SAFE

def test_admin_writes_retired_without_body(account):
    role, session, *_ = account
    for method, endpoint in [('POST', '/admin/hardware'), ('POST', '/admin/middleware'), ('POST', '/admin/software-components'), ('PUT', '/admin/llm-settings'), ('POST', '/admin/ide-downloads'), ('POST', '/admin/hardware/TEST_missing/upload-image')]:
        response = session.request(method, BASE_URL + '/api' + endpoint, timeout=30)
        assert response.status_code == 410, (role, endpoint, response.text)
        assert response.json() == SAFE

def test_admin_hardware_valid_payload_retired(account):
    role, session, *_ = account
    response = session.post(BASE_URL + '/api/admin/hardware', json={'name': 'TEST_never_created', 'manufacturer': 'TEST_', 'core': 'RISC-V', 'clock_speed': '1 MHz', 'memory': '1 KB', 'flash': '1 KB', 'peripherals': [], 'description': 'TEST_retired'}, timeout=30)
    assert response.status_code == 410
    assert response.json() == SAFE

def test_public_catalog_and_account_reads(account):
    role, session, *_ = account
    for endpoint in ['/hardware', '/middleware', '/software-components', '/ide-downloads', '/projects']:
        response = session.get(BASE_URL + '/api' + endpoint, timeout=30)
        assert response.status_code == 200, (endpoint, response.text)
        rows = response.json()
        assert isinstance(rows, list)
        if endpoint != '/projects':
            assert rows
        for row in rows:
            assert isinstance(row['id'], str) and isinstance(row['name'], str)
            assert '_id' not in row
    hardware = session.get(BASE_URL + '/api/hardware', timeout=30).json()[0]
    assert session.get(BASE_URL + '/api/hardware/' + hardware['id'], timeout=30).json()['name'] == hardware['name']
    types = session.get(BASE_URL + '/api/component-types', timeout=30)
    assert types.status_code == 200 and 'RTOS' in types.json()['types']

def test_contact_ui_payload_persists(database):
    marker = 'TEST_' + uuid.uuid4().hex
    payload = {'name': marker, 'email': marker + '@example.com', 'company': marker, 'country': 'India', 'product_interest': 'Certification', 'message': marker}
    response = requests.post(BASE_URL + '/api/applications/sales-inquiry', json=payload, timeout=30)
    assert response.status_code == 200
    data = response.json()
    assert data['message'] == 'Sales inquiry submitted successfully'
    assert isinstance(data['id'], str)
    try:
        stored = database.sales_inquiries.find_one({'id': data['id']})
        assert stored is not None
        assert stored['data'].get('email') == payload['email'], f'Contact fields discarded; stored data keys: {list(stored["data"])}'
    finally:
        database.sales_inquiries.delete_one({'id': data['id']})

def test_partner_submission_persists(database):
    marker = 'TEST_' + uuid.uuid4().hex
    payload = {'company_name': marker, 'contact_name': marker, 'email': marker + '@example.com', 'partnership_type': 'hardware', 'description': marker, 'agree_terms': True}
    response = requests.post(BASE_URL + '/api/applications/partnership', json=payload, timeout=30)
    assert response.status_code == 200
    data = response.json()
    assert data['message'] == 'Partnership application submitted successfully'
    try:
        stored = database.partnership_applications.find_one({'id': data['id']})
        assert stored['email'] == payload['email']
        assert stored['company_name'] == marker and stored['agree_terms'] is True
    finally:
        database.partnership_applications.delete_one({'id': data['id']})

def test_empty_partner_submission_validation():
    response = requests.post(BASE_URL + '/api/applications/partnership', json={}, timeout=30)
    assert response.status_code == 422, f'Invalid submission returned {response.status_code}: {response.text}'
    assert isinstance(response.json()['detail'], list)

def test_cors_explicit_origin():
    response = requests.options(BASE_URL + '/api/auth/login', headers={'Origin': BASE_URL, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type'}, timeout=30)
    assert response.status_code == 200
    assert response.headers['Access-Control-Allow-Origin'] == BASE_URL
    assert response.headers['Access-Control-Allow-Credentials'] == 'true'