"""
Backend API tests for TrusteD-V Sales Inquiry and CTA Link Fix
Tests the new /api/applications/sales-inquiry endpoint
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://embedded-ai-builder.preview.emergentagent.com').rstrip('/')


class TestSalesInquiryAPI:
    """Tests for the sales inquiry endpoint"""
    
    def test_sales_inquiry_submission_success(self):
        """Test successful sales inquiry submission"""
        payload = {
            "type": "sales_inquiry",
            "data": {
                "name": "TEST_John Doe",
                "email": "test_john@example.com",
                "company": "TEST_Acme Corp",
                "phone": "+1234567890",
                "plan": "pro",
                "teamSize": "6-20",
                "message": "Testing sales inquiry API for Pro plan"
            }
        }
        
        response = requests.post(f"{BASE_URL}/api/applications/sales-inquiry", json=payload)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "message" in data, "Response should contain 'message' field"
        assert "id" in data, "Response should contain 'id' field"
        assert data["message"] == "Sales inquiry submitted successfully"
        assert isinstance(data["id"], str)
        assert len(data["id"]) > 0
        
        print(f"✓ Sales inquiry submitted successfully with ID: {data['id']}")
    
    def test_sales_inquiry_with_enterprise_plan(self):
        """Test sales inquiry with enterprise plan"""
        payload = {
            "type": "sales_inquiry",
            "data": {
                "name": "TEST_Enterprise User",
                "email": "test_enterprise@bigcorp.com",
                "company": "TEST_Big Corporation",
                "phone": "+9876543210",
                "plan": "enterprise",
                "teamSize": "50+",
                "message": "Enterprise plan inquiry for large deployment"
            }
        }
        
        response = requests.post(f"{BASE_URL}/api/applications/sales-inquiry", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Sales inquiry submitted successfully"
        print(f"✓ Enterprise plan inquiry submitted with ID: {data['id']}")
    
    def test_sales_inquiry_with_basic_plan(self):
        """Test sales inquiry with basic plan"""
        payload = {
            "type": "sales_inquiry",
            "data": {
                "name": "TEST_Basic User",
                "email": "test_basic@startup.com",
                "company": "TEST_Startup Inc",
                "phone": "",
                "plan": "basic",
                "teamSize": "1-5",
                "message": "Basic plan inquiry"
            }
        }
        
        response = requests.post(f"{BASE_URL}/api/applications/sales-inquiry", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Sales inquiry submitted successfully"
        print(f"✓ Basic plan inquiry submitted with ID: {data['id']}")
    
    def test_sales_inquiry_minimal_data(self):
        """Test sales inquiry with minimal required data"""
        payload = {
            "type": "sales_inquiry",
            "data": {
                "name": "TEST_Minimal",
                "email": "test_minimal@test.com",
                "company": "TEST_Co",
                "message": "Minimal test"
            }
        }
        
        response = requests.post(f"{BASE_URL}/api/applications/sales-inquiry", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        print(f"✓ Minimal data inquiry submitted with ID: {data['id']}")


class TestHealthAndBasicEndpoints:
    """Basic health and endpoint tests"""
    
    def test_health_endpoint(self):
        """Test health endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        print("✓ Health endpoint working")
    
    def test_hardware_endpoint(self):
        """Test hardware listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/hardware")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Hardware endpoint working, returned {len(data)} items")
    
    def test_middleware_endpoint(self):
        """Test middleware listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/middleware")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Middleware endpoint working, returned {len(data)} items")
    
    def test_ide_downloads_endpoint(self):
        """Test IDE downloads endpoint"""
        response = requests.get(f"{BASE_URL}/api/ide-downloads")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ IDE downloads endpoint working, returned {len(data)} items")


class TestAuthenticationFlow:
    """Test authentication endpoints"""
    
    def test_login_with_admin_credentials(self):
        """Test login with admin credentials"""
        payload = {
            "email": "admin@trusted-v.com",
            "password": "bosch@2425"
        }
        
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        assert "access_token" in data
        assert "user" in data
        assert data["user"]["email"] == "admin@trusted-v.com"
        assert data["user"]["is_admin"] == True
        print("✓ Admin login successful")
        return data["access_token"]
    
    def test_login_with_invalid_credentials(self):
        """Test login with invalid credentials"""
        payload = {
            "email": "invalid@test.com",
            "password": "wrongpassword"
        }
        
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        
        assert response.status_code == 401
        print("✓ Invalid credentials correctly rejected")


class TestAdminSalesInquiriesEndpoint:
    """Test admin endpoint for viewing sales inquiries"""
    
    def test_get_sales_inquiries_as_admin(self):
        """Test fetching sales inquiries as admin"""
        # First login as admin
        login_response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "admin@trusted-v.com", "password": "bosch@2425"}
        )
        assert login_response.status_code == 200
        token = login_response.json()["access_token"]
        
        # Fetch sales inquiries
        response = requests.get(
            f"{BASE_URL}/api/admin/applications/sales-inquiries",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Admin can view sales inquiries, found {len(data)} inquiries")
    
    def test_get_sales_inquiries_without_auth(self):
        """Test that sales inquiries endpoint requires authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/applications/sales-inquiries")
        
        # Should return 403 (Forbidden) or 401 (Unauthorized)
        assert response.status_code in [401, 403], f"Expected 401/403, got {response.status_code}"
        print("✓ Sales inquiries endpoint correctly requires authentication")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
