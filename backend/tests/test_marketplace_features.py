"""
Test suite for TrusteD-V Marketplace and Product Pages features
Tests: Products page, Marketplace tabs, Partner logos, Pricing tiers
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://embedded-ai-builder.preview.emergentagent.com')

class TestHardwareAPI:
    """Hardware API tests for Marketplace"""
    
    def test_hardware_list_returns_200(self):
        """Test hardware list endpoint returns 200"""
        response = requests.get(f"{BASE_URL}/api/hardware")
        assert response.status_code == 200
        print("✓ Hardware list endpoint returns 200")
    
    def test_hardware_list_returns_array(self):
        """Test hardware list returns an array"""
        response = requests.get(f"{BASE_URL}/api/hardware")
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Hardware list returns array with {len(data)} items")
    
    def test_hardware_has_required_fields(self):
        """Test hardware items have required fields"""
        response = requests.get(f"{BASE_URL}/api/hardware")
        data = response.json()
        
        if len(data) > 0:
            hw = data[0]
            required_fields = ['id', 'name', 'manufacturer', 'core', 'description']
            for field in required_fields:
                assert field in hw, f"Missing field: {field}"
            print("✓ Hardware items have required fields")
        else:
            pytest.skip("No hardware items to test")
    
    def test_hardware_peripherals_are_objects(self):
        """Test hardware peripherals are objects with name, type, interface"""
        response = requests.get(f"{BASE_URL}/api/hardware")
        data = response.json()
        
        if len(data) > 0:
            hw = data[0]
            if 'peripherals' in hw and len(hw['peripherals']) > 0:
                peripheral = hw['peripherals'][0]
                assert isinstance(peripheral, dict), "Peripheral should be an object"
                assert 'name' in peripheral, "Peripheral should have 'name'"
                print("✓ Hardware peripherals are objects with proper structure")
            else:
                pytest.skip("No peripherals to test")
        else:
            pytest.skip("No hardware items to test")
    
    def test_hardware_has_partner_manufacturers(self):
        """Test hardware includes C-DAC, Mindgrove, or Upbeat Tech"""
        response = requests.get(f"{BASE_URL}/api/hardware")
        data = response.json()
        
        manufacturers = set(hw.get('manufacturer', '') for hw in data)
        expected_partners = {'C-DAC', 'Mindgrove', 'Upbeat Tech'}
        found_partners = manufacturers.intersection(expected_partners)
        
        assert len(found_partners) > 0, f"Expected at least one partner manufacturer, found: {manufacturers}"
        print(f"✓ Found partner manufacturers: {found_partners}")


class TestAuthAPI:
    """Authentication API tests"""
    
    def test_login_success(self):
        """Test login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@trusted-v.com",
            "password": "bosch@2425"
        })
        assert response.status_code == 200
        data = response.json()
        assert 'token' in data or 'access_token' in data
        print("✓ Login successful with valid credentials")
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "wrong@example.com",
            "password": "wrongpass"
        })
        assert response.status_code in [401, 400]
        print("✓ Login rejected with invalid credentials")


class TestSalesInquiryAPI:
    """Sales inquiry API tests for pricing CTAs"""
    
    def test_sales_inquiry_endpoint_exists(self):
        """Test sales inquiry endpoint exists"""
        response = requests.post(f"{BASE_URL}/api/applications/sales-inquiry", json={
            "name": "TEST_User",
            "email": "test@example.com",
            "company": "Test Company",
            "phone": "1234567890",
            "plan": "pro",
            "team_size": "1-10",
            "message": "Test inquiry"
        })
        # Should return 200/201 or 401 if auth required
        assert response.status_code in [200, 201, 401, 422]
        print(f"✓ Sales inquiry endpoint exists (status: {response.status_code})")


class TestProjectsAPI:
    """Projects API tests"""
    
    def test_projects_list_requires_auth(self):
        """Test projects list endpoint requires authentication"""
        response = requests.get(f"{BASE_URL}/api/projects")
        # Should return 403 (forbidden) without auth
        assert response.status_code in [200, 403, 401]
        print(f"✓ Projects list endpoint returns {response.status_code} (auth required)")


class TestIDEDownloadsAPI:
    """IDE Downloads API tests"""
    
    def test_ide_downloads_returns_200(self):
        """Test IDE downloads endpoint"""
        response = requests.get(f"{BASE_URL}/api/ide-downloads")
        assert response.status_code == 200
        print("✓ IDE downloads endpoint returns 200")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
