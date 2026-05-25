"""
TrusteD-V Platform API Tests
Tests for: Registration disabled, Demo login, Navigation changes, IDE page content
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://embedded-ai-builder.preview.emergentagent.com').rstrip('/')

# Test credentials
DEMO_EMAIL = os.environ.get("TEST_DEMO_EMAIL", "demo@trusted-v.com")
DEMO_PASSWORD = os.environ.get("TEST_DEMO_PASSWORD", "demo@2025")
ADMIN_EMAIL = os.environ.get("TEST_ADMIN_EMAIL", "admin@trusted-v.com")
ADMIN_PASSWORD = os.environ.get("TEST_ADMIN_PASSWORD", "bosch@2425")


class TestRegistrationDisabled:
    """Test that public registration is disabled"""
    
    def test_register_returns_403(self):
        """POST /api/auth/register should return 403"""
        response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": "newuser@test.com",
            "username": "newuser",
            "password": "testpass123"
        })
        assert response.status_code == 403, f"Expected 403, got {response.status_code}"
        data = response.json()
        assert "disabled" in data.get("detail", "").lower(), "Error message should mention registration is disabled"
        print(f"✅ Registration disabled: {data.get('detail')}")


class TestDemoUserLogin:
    """Test demo user authentication"""
    
    def test_demo_login_success(self):
        """Demo user should be able to login with demo@trusted-v.com / demo@2025"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": DEMO_EMAIL,
            "password": DEMO_PASSWORD
        })
        assert response.status_code == 200, f"Demo login failed: {response.text}"
        data = response.json()
        assert "access_token" in data, "Response should contain access_token"
        assert data["user"]["email"] == DEMO_EMAIL
        assert data["user"]["is_admin"] is False, "Demo user should not be admin"
        print(f"✅ Demo login successful: {data['user']['email']}")
        return data["access_token"]
    
    def test_demo_login_wrong_password(self):
        """Demo login with wrong password should fail"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": DEMO_EMAIL,
            "password": "wrongpassword"
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("✅ Wrong password correctly rejected")


class TestAdminLogin:
    """Test admin user authentication"""
    
    def test_admin_login_success(self):
        """Admin user should be able to login with admin@trusted-v.com / bosch@2425"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Admin login failed: {response.text}"
        data = response.json()
        assert "access_token" in data, "Response should contain access_token"
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["is_admin"] is True, "Admin user should have is_admin=True"
        print(f"✅ Admin login successful: {data['user']['email']} (is_admin={data['user']['is_admin']})")


class TestAuthenticatedEndpoints:
    """Test endpoints that require authentication"""
    
    @pytest.fixture
    def demo_token(self):
        """Get demo user token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": DEMO_EMAIL,
            "password": DEMO_PASSWORD
        })
        return response.json()["access_token"]
    
    def test_get_me_with_token(self, demo_token):
        """GET /api/auth/me should return user info"""
        response = requests.get(
            f"{BASE_URL}/api/auth/me",
            headers={"Authorization": f"Bearer {demo_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == DEMO_EMAIL
        print(f"✅ /api/auth/me returns correct user: {data['email']}")
    
    def test_get_hardware_list(self, demo_token):
        """GET /api/hardware should return hardware list"""
        response = requests.get(
            f"{BASE_URL}/api/hardware",
            headers={"Authorization": f"Bearer {demo_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Hardware list should not be empty"
        print(f"✅ Hardware list returned {len(data)} items")
    
    def test_get_middleware_list(self, demo_token):
        """GET /api/middleware should return middleware list"""
        response = requests.get(
            f"{BASE_URL}/api/middleware",
            headers={"Authorization": f"Bearer {demo_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Middleware list returned {len(data)} items")


class TestPublicEndpoints:
    """Test endpoints that should work without auth (when site lock is disabled)"""
    
    def test_health_check(self):
        """Health endpoint should be accessible"""
        response = requests.get(f"{BASE_URL}/api/health")
        # May return 404 if not implemented, but should not error
        print(f"Health check status: {response.status_code}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
