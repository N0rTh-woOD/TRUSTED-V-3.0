"""
Backend API Tests for TrusteD-V Platform - Application Endpoints
Tests for board support requests and partnership applications
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    BASE_URL = "https://risc-v-rust-ide.preview.emergentagent.com"

API = f"{BASE_URL}/api"

# Admin credentials 
ADMIN_EMAIL = os.environ.get("TEST_ADMIN_EMAIL", "admin@trusted-v.com")
ADMIN_PASSWORD = os.environ.get("TEST_ADMIN_PASSWORD", "bosch@2425")


class TestBoardSupportRequestEndpoints:
    """Test board support request endpoints"""
    
    @pytest.fixture
    def admin_token(self):
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code != 200:
            pytest.skip("Admin login failed")
        return response.json()["access_token"]
    
    def test_submit_board_support_request(self):
        """POST /api/applications/board-support creates a new request"""
        test_data = {
            "company_name": f"TEST_Company_{uuid.uuid4().hex[:8]}",
            "contact_name": "Test Contact",
            "email": "test@example.com",
            "board_name": "Test Board XYZ",
            "board_manufacturer": "Test Manufacturer",
            "architecture": "RISC-V",
            "description": "Test board description for automated testing",
            "use_case": "Testing purposes"
        }
        
        response = requests.post(f"{API}/applications/board-support", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "id" in data
        assert data["message"] == "Board support request submitted successfully"
    
    def test_admin_get_board_support_requests(self, admin_token):
        """GET /api/admin/applications/board-support returns list of requests"""
        response = requests.get(
            f"{API}/admin/applications/board-support",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_admin_get_board_support_requires_auth(self):
        """GET /api/admin/applications/board-support requires authentication"""
        response = requests.get(f"{API}/admin/applications/board-support")
        assert response.status_code in [401, 403]


class TestPartnershipApplicationEndpoints:
    """Test partnership application endpoints"""
    
    @pytest.fixture
    def admin_token(self):
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code != 200:
            pytest.skip("Admin login failed")
        return response.json()["access_token"]
    
    def test_submit_partnership_application(self):
        """POST /api/applications/partnership creates a new application"""
        test_data = {
            "company_name": f"TEST_Partner_{uuid.uuid4().hex[:8]}",
            "contact_name": "Test Partner Contact",
            "email": "partner@example.com",
            "phone": "+1234567890",
            "website": "https://example.com",
            "company_type": "hardware",
            "partnership_type": "hardware",
            "description": "Test partnership application for automated testing",
            "products": "Development Boards, Microcontrollers",
            "agree_terms": True
        }
        
        response = requests.post(f"{API}/applications/partnership", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "id" in data
        assert data["message"] == "Partnership application submitted successfully"
    
    def test_admin_get_partnership_applications(self, admin_token):
        """GET /api/admin/applications/partnership returns list of applications"""
        response = requests.get(
            f"{API}/admin/applications/partnership",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_admin_get_partnership_requires_auth(self):
        """GET /api/admin/applications/partnership requires authentication"""
        response = requests.get(f"{API}/admin/applications/partnership")
        assert response.status_code in [401, 403]


class TestAdminNotificationsEndpoint:
    """Test admin notifications endpoint"""
    
    @pytest.fixture
    def admin_token(self):
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code != 200:
            pytest.skip("Admin login failed")
        return response.json()["access_token"]
    
    def test_admin_notifications_endpoint(self, admin_token):
        """GET /api/admin/notifications returns pending counts"""
        response = requests.get(
            f"{API}/admin/notifications",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "board_support_pending" in data
        assert "partnership_pending" in data
        assert "total_pending" in data
        assert isinstance(data["board_support_pending"], int)
        assert isinstance(data["partnership_pending"], int)
        assert isinstance(data["total_pending"], int)
    
    def test_admin_notifications_requires_auth(self):
        """GET /api/admin/notifications requires authentication"""
        response = requests.get(f"{API}/admin/notifications")
        assert response.status_code in [401, 403]


class TestAdminStatsWithApplications:
    """Test admin stats include application counts"""
    
    @pytest.fixture
    def admin_token(self):
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code != 200:
            pytest.skip("Admin login failed")
        return response.json()["access_token"]
    
    def test_admin_stats_includes_application_counts(self, admin_token):
        """Admin stats include board support and partnership counts"""
        response = requests.get(
            f"{API}/admin/stats",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        
        # Verify application-related stats
        assert "board_support_requests" in data
        assert "partnership_applications" in data
        assert "pending_notifications" in data
        assert isinstance(data["board_support_requests"], int)
        assert isinstance(data["partnership_applications"], int)
        assert isinstance(data["pending_notifications"], int)
