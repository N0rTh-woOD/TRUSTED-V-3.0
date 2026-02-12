"""
Test suite for TrusteD-V platform rebranding verification
Tests: Login with new credentials, IDE branding, admin access
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestRebranding:
    """Tests for platform rebranding from RV-Rust to TrusteD-V"""
    
    def test_login_with_new_admin_credentials(self):
        """Test login with new admin@trusted-v.com credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@trusted-v.com",
            "password": "admin123"
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        
        data = response.json()
        assert "access_token" in data
        assert data["user"]["email"] == "admin@trusted-v.com"
        assert data["user"]["is_admin"] == True
        print("SUCCESS: Login with admin@trusted-v.com works")
    
    def test_new_admin_user_exists(self):
        """Test that new admin@trusted-v.com user exists and is admin"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@trusted-v.com",
            "password": "admin123"
        })
        assert response.status_code == 200, f"New admin login failed: {response.text}"
        
        data = response.json()
        assert data["user"]["is_admin"] == True, "New admin user should have admin privileges"
        print("SUCCESS: New admin@trusted-v.com user exists with admin privileges")
    
    def test_ide_downloads_show_trusted_v_studio(self):
        """Test that IDE downloads show TrusteD-V Studio branding"""
        response = requests.get(f"{BASE_URL}/api/ide-downloads")
        assert response.status_code == 200
        
        downloads = response.json()
        assert len(downloads) > 0, "No IDE downloads found"
        
        for download in downloads:
            assert "TrusteD-V Studio" in download["name"], f"IDE name should be TrusteD-V Studio, got: {download['name']}"
        
        print(f"SUCCESS: All {len(downloads)} IDE downloads show TrusteD-V Studio branding")
    
    def test_admin_access_with_new_credentials(self):
        """Test admin dashboard access with new credentials"""
        # Login first
        login_response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@trusted-v.com",
            "password": "admin123"
        })
        assert login_response.status_code == 200
        token = login_response.json()["access_token"]
        
        # Access admin stats
        headers = {"Authorization": f"Bearer {token}"}
        stats_response = requests.get(f"{BASE_URL}/api/admin/stats", headers=headers)
        assert stats_response.status_code == 200, f"Admin stats failed: {stats_response.text}"
        
        stats = stats_response.json()
        assert "hardware" in stats
        assert "middleware" in stats
        assert "software_components" in stats
        print("SUCCESS: Admin dashboard accessible with new credentials")
    
    def test_hardware_endpoint_works(self):
        """Test hardware endpoint returns data"""
        response = requests.get(f"{BASE_URL}/api/hardware")
        assert response.status_code == 200
        
        hardware = response.json()
        assert len(hardware) > 0, "No hardware found"
        print(f"SUCCESS: Hardware endpoint returns {len(hardware)} items")
    
    def test_middleware_endpoint_works(self):
        """Test middleware endpoint returns data"""
        response = requests.get(f"{BASE_URL}/api/middleware")
        assert response.status_code == 200
        
        middleware = response.json()
        assert len(middleware) > 0, "No middleware found"
        print(f"SUCCESS: Middleware endpoint returns {len(middleware)} items")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
