"""AI retirement responses and preserved read-only account/catalog APIs."""
import os
import re
from pathlib import Path

import pytest
import requests
from dotenv import load_dotenv

load_dotenv('/app/frontend/.env')
BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')
SAFE_DETAIL = 'This feature is no longer available'
RETIRED = [
    ('POST', '/chat'), ('POST', '/projects/generate'),
    ('GET', '/ai-models'), ('GET', '/admin/llm-settings'),
    ('PUT', '/admin/llm-settings'), ('GET', '/llm-providers'),
    ('GET', '/chat/history/TEST_retired_session'),
    ('GET', '/projects/TEST_retired_project/download/1'),
]


def credentials(role):
    text = Path('/app/memory/test_credentials.md').read_text()
    heading = 'Admin User' if role == 'admin' else 'Demo User'
    section = text.split('### ' + heading)[1].split('###')[0]
    return {key.lower(): re.search(rf'- {key}: `([^`]+)`', section).group(1)
            for key in ('Email', 'Password')}


@pytest.fixture(scope='module', params=['admin', 'demo'])
def account(request):
    creds = credentials(request.param)
    session = requests.Session()
    response = session.post(BASE_URL + '/api/auth/login', json=creds, timeout=30)
    if response.status_code != 200:
        pytest.fail(f'{request.param} login returned {response.status_code}')
    data = response.json()
    assert data['user']['email'] == creds['email']
    assert data['user']['is_admin'] is (request.param == 'admin')
    assert isinstance(data['access_token'], str) and data['access_token']
    session.headers['Authorization'] = 'Bearer ' + data['access_token']
    yield request.param, session, data['user']
    session.close()


def test_login_and_me(account):
    role, session, user = account
    response = session.get(BASE_URL + '/api/auth/me', timeout=30)
    assert response.status_code == 200
    assert response.json() == user
    print(f'PASS {role}: login and auth/me')


def test_retired_endpoints(account):
    role, session, _ = account
    for method, endpoint in RETIRED:
        response = session.request(method, BASE_URL + '/api' + endpoint,
                                   json={} if method in ('POST', 'PUT') else None, timeout=30)
        expected = 403 if role == 'demo' and endpoint == '/admin/llm-settings' else 410
        assert response.status_code == expected, (role, method, endpoint, response.text)
        assert response.json() == {'detail': 'Admin access required' if expected == 403 else SAFE_DETAIL}
        print(f'PASS {role}: {method} {endpoint} -> {expected}')


def test_preserved_catalogs_and_history(account):
    role, session, user = account
    for endpoint in ['/hardware', '/middleware', '/software-components', '/projects', '/ide-downloads']:
        response = session.get(BASE_URL + '/api' + endpoint, timeout=30)
        assert response.status_code == 200, (endpoint, response.text)
        rows = response.json()
        assert isinstance(rows, list)
        if endpoint != '/projects':
            assert rows, endpoint
        for row in rows:
            assert isinstance(row['id'], str) and row['id']
            assert isinstance(row['name'], str) and row['name']
            assert '_id' not in row
            if endpoint == '/projects':
                assert row['user_id'] == user['id']
                assert isinstance(row['versions'], list)
        print(f'PASS {role}: {endpoint}, {len(rows)} records')


def test_role_appropriate_admin_stats(account):
    role, session, _ = account
    response = session.get(BASE_URL + '/api/admin/stats', timeout=30)
    if role == 'demo':
        assert response.status_code == 403
        assert response.json() == {'detail': 'Admin access required'}
    else:
        assert response.status_code == 200
        data = response.json()
        for key in ['hardware', 'middleware', 'software_components', 'users', 'projects']:
            assert isinstance(data[key], int) and data[key] >= 0
        assert 'LLM' not in data['software_by_type']
    print(f'PASS {role}: admin stats role check')


def test_retired_generation_without_body(account):
    role, session, _ = account
    response = session.post(BASE_URL + '/api/projects/generate', timeout=30)
    assert response.status_code == 410, f'{role}: missing body returned {response.status_code}: {response.text}'
    assert response.json() == {'detail': SAFE_DETAIL}