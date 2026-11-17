"""Public editorial release: authentication, catalogs, and form payload persistence."""
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

@pytest.fixture(scope='module')
def database():
    load_dotenv('/app/backend/.env')
    client = MongoClient(os.environ['MONGO_URL'])
    yield client[os.environ['DB_NAME']]
    client.close()

@pytest.fixture(scope='module')
def demo():
    section = Path('/app/memory/test_credentials.md').read_text().split('### Demo User')[1].split('###')[0]
    creds = {key.lower(): re.search(rf'- {key}: `([^`]+)`', section).group(1) for key in ('Email', 'Password')}
    response = requests.post(BASE_URL + '/api/auth/login', json=creds, timeout=30)
    if response.status_code != 200:
        pytest.skip('Demo authentication failed')
    return response, creds

def test_demo_login_and_me(demo, database):
    response, creds = demo
    data = response.json()
    assert data['user']['email'] == creds['email']
    assert data['token_type'] == 'bearer' and isinstance(data['access_token'], str)
    me = requests.get(BASE_URL + '/api/auth/me', headers={'Authorization': 'Bearer ' + data['access_token']}, timeout=30)
    assert me.status_code == 200 and me.json() == data['user']
    assert database.users.find_one({'id': data['user']['id']})['password_hash'].startswith('$2b$')

@pytest.mark.parametrize('endpoint', ['hardware', 'middleware', 'software-components', 'ide-downloads'])
def test_public_catalogs(endpoint):
    response = requests.get(BASE_URL + '/api/' + endpoint, timeout=30)
    assert response.status_code == 200
    rows = response.json()
    assert isinstance(rows, list) and rows
    assert all(isinstance(r['name'], str) and isinstance(r['id'], str) and '_id' not in r for r in rows)

@pytest.mark.parametrize('kind', ['contact', 'sales', 'partnership', 'board-support'])
def test_valid_form_payload_persistence(kind, database):
    marker = 'TEST_' + uuid.uuid4().hex
    if kind in ('contact', 'sales'):
        endpoint, collection = 'sales-inquiry', 'sales_inquiries'
        payload = dict(name=marker, email=marker + '@example.com', company=marker, message=marker)
        payload.update(dict(country='United States', product_interest='Silicon Sign-Off & Trust') if kind == 'contact' else dict(phone='+15555550100', product_interest='Plan: pro', team_size='6-20'))
        expected_message = 'Sales inquiry submitted successfully'
    else:
        endpoint = kind
        collection = 'partnership_applications' if kind == 'partnership' else 'board_support_requests'
        payload = dict(company_name=marker, contact_name=marker, email=marker + '@example.com', description=marker)
        payload.update(dict(company_type='hardware', partnership_type='hardware', products='AI / ML Accelerators', motivation=marker, agree_terms=True) if kind == 'partnership' else dict(board_name=marker, board_manufacturer=marker, architecture='RISC-V', use_case=marker))
        expected_message = 'Partnership application submitted successfully' if kind == 'partnership' else 'Board support request submitted successfully'
    response = requests.post(BASE_URL + '/api/applications/' + endpoint, json=payload, timeout=30)
    assert response.status_code == 200, response.text
    data = response.json()
    assert data['message'] == expected_message and isinstance(data['id'], str)
    try:
        stored = database[collection].find_one({'id': data['id']})
        assert stored is not None
        fields = stored['data'] if kind in ('contact', 'sales') else stored
        for key, value in payload.items():
            assert fields[key] == value, key
    finally:
        database[collection].delete_one({'id': data['id']})
        assert database[collection].find_one({'id': data['id']}) is None

@pytest.mark.parametrize('endpoint', ['sales-inquiry', 'partnership', 'board-support'])
def test_invalid_form_payload_validation(endpoint):
    response = requests.post(BASE_URL + '/api/applications/' + endpoint, json={}, timeout=30)
    assert response.status_code == 422
    assert isinstance(response.json()['detail'], list) and response.json()['detail']

def test_cors():
    response = requests.options(BASE_URL + '/api/auth/login', headers={'Origin': BASE_URL, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type'}, timeout=30)
    assert response.status_code == 200
    assert response.headers['Access-Control-Allow-Origin'] == BASE_URL
    assert response.headers['Access-Control-Allow-Credentials'] == 'true'