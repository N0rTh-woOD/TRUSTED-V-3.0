"""
Backend API Tests for TrusteD-V Platform
Tests for auth, hardware, IDE downloads, and admin endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    BASE_URL = "https://embedded-ai-lab.preview.emergentagent.com"

API = f"{BASE_URL}/api"

# New admin credentials 
ADMIN_EMAIL = "admin@trusted-v.com"
ADMIN_PASSWORD = "bosch@2425"


class TestAdminAuth:
    """Test admin authentication with new credentials"""
    
    def test_admin_login_with_new_credentials(self):
        """Admin can login with new credentials admin@trusted-v.com / bosch@2425"""
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["user"]["is_admin"] == True
        assert data["user"]["email"] == ADMIN_EMAIL

    def test_admin_login_invalid_password(self):
        """Admin login fails with wrong password"""
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": "wrongpassword"
        })
        assert response.status_code == 401

    def test_admin_login_invalid_email(self):
        """Admin login fails with wrong email"""
        response = requests.post(f"{API}/auth/login", json={
            "email": "wrong@email.com",
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 401


class TestHardwareEndpoints:
    """Test hardware catalog endpoints"""
    
    def test_get_hardware_list(self):
        """GET /api/hardware returns list of RISC-V boards"""
        response = requests.get(f"{API}/hardware")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        
        # Verify RISC-V boards are present
        board_names = [h["name"] for h in data]
        assert any("SiFive" in name for name in board_names), "Should have SiFive board"
        
    def test_hardware_has_required_fields(self):
        """Hardware entries have all required fields"""
        response = requests.get(f"{API}/hardware")
        data = response.json()
        
        for hw in data[:3]:  # Check first 3
            assert "id" in hw
            assert "name" in hw
            assert "manufacturer" in hw
            assert "core" in hw
            assert "clock_speed" in hw
            assert "memory" in hw
            assert "peripherals" in hw


class TestIDEDownloadsEndpoints:
    """Test IDE downloads endpoints"""
    
    def test_get_ide_downloads(self):
        """GET /api/ide-downloads returns download list"""
        response = requests.get(f"{API}/ide-downloads")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
    
    def test_ide_downloads_has_all_platforms(self):
        """IDE downloads include Windows, macOS, Linux"""
        response = requests.get(f"{API}/ide-downloads")
        data = response.json()
        
        platforms = [d["platform"] for d in data]
        assert any("Windows" in p for p in platforms), "Should have Windows download"
        assert any("macOS" in p or "Mac" in p for p in platforms), "Should have macOS download"
        assert any("Linux" in p for p in platforms), "Should have Linux download"

    def test_ide_downloads_has_required_fields(self):
        """IDE download entries have required fields"""
        response = requests.get(f"{API}/ide-downloads")
        data = response.json()
        
        for dl in data[:3]:
            assert "id" in dl
            assert "name" in dl
            assert "version" in dl
            assert "platform" in dl
            assert "size" in dl


class TestAdminStats:
    """Test admin dashboard statistics"""
    
    @pytest.fixture
    def admin_token(self):
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code != 200:
            pytest.skip("Admin login failed")
        return response.json()["access_token"]
    
    def test_admin_stats_endpoint(self, admin_token):
        """Admin can get dashboard stats"""
        response = requests.get(
            f"{API}/admin/stats",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        
        # Verify stats structure - actual field names
        assert "users" in data
        assert "projects" in data
        assert "hardware" in data
        assert "middleware" in data
        assert "ide_downloads" in data

    def test_admin_stats_requires_auth(self):
        """Admin stats endpoint requires authentication"""
        response = requests.get(f"{API}/admin/stats")
        assert response.status_code == 403 or response.status_code == 401


class TestAdminHardwareManagement:
    """Test admin hardware management"""
    
    @pytest.fixture
    def admin_token(self):
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code != 200:
            pytest.skip("Admin login failed")
        return response.json()["access_token"]
    
    def test_admin_can_view_hardware(self, admin_token):
        """Admin can view hardware list"""
        response = requests.get(
            f"{API}/hardware",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


class TestAdminIDEManagement:
    """Test admin IDE management"""
    
    @pytest.fixture
    def admin_token(self):
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code != 200:
            pytest.skip("Admin login failed")
        return response.json()["access_token"]
    
    def test_admin_can_view_ide_downloads(self, admin_token):
        """Admin can view IDE downloads list"""
        response = requests.get(
            f"{API}/ide-downloads",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


class TestPublicPages:
    """Test public page availability"""
    
    def test_root_endpoint(self):
        """Root endpoint returns properly"""
        response = requests.get(BASE_URL)
        assert response.status_code == 200

    def test_middleware_endpoint(self):
        """Middleware endpoint returns data"""
        response = requests.get(f"{API}/middleware")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_software_components_endpoint(self):
        """Software components endpoint returns data"""
        response = requests.get(f"{API}/software-components")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
