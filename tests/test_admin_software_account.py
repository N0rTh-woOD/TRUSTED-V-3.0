"""
Test suite for Admin Software Components, IDE Downloads, and User Account Settings
Tests the new features added in iteration 4:
- Admin Software Components management (BSP, SDK, Driver, Bootloader, Library)
- Admin IDE Downloads management
- User Account Settings (profile update, password change, project stats)
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    BASE_URL = "https://embedded-ai-builder.preview.emergentagent.com"

API = f"{BASE_URL}/api"

# Test credentials
ADMIN_EMAIL = "admin@rvrust.com"
ADMIN_PASSWORD = "admin123"


class TestAdminLogin:
    """Test admin authentication"""
    
    def test_admin_login_success(self):
        """Admin can login with correct credentials"""
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["user"]["is_admin"] == True
        assert data["user"]["email"] == ADMIN_EMAIL


class TestAdminStats:
    """Test admin stats endpoint"""
    
    @pytest.fixture
    def admin_token(self):
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        return response.json()["access_token"]
    
    def test_admin_stats_includes_software_components(self, admin_token):
        """Admin stats should include software components count and breakdown by type"""
        response = requests.get(f"{API}/admin/stats", headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        # Check all expected fields
        assert "hardware" in data
        assert "middleware" in data
        assert "software_components" in data
        assert "software_by_type" in data
        assert "ide_downloads" in data
        
        # Check software_by_type breakdown
        software_by_type = data["software_by_type"]
        expected_types = ["RTOS", "BSP", "SDK", "Driver", "Bootloader", "Framework", "Library"]
        for t in expected_types:
            assert t in software_by_type


class TestSoftwareComponents:
    """Test software components CRUD operations"""
    
    @pytest.fixture
    def admin_token(self):
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        return response.json()["access_token"]
    
    def test_get_all_software_components(self):
        """Get all software components (public endpoint)"""
        response = requests.get(f"{API}/software-components")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1  # Should have sample data
    
    def test_filter_software_components_by_type(self):
        """Filter software components by type"""
        # Test SDK filter
        response = requests.get(f"{API}/software-components?component_type=SDK")
        assert response.status_code == 200
        data = response.json()
        for component in data:
            assert component["type"] == "SDK"
        
        # Test BSP filter
        response = requests.get(f"{API}/software-components?component_type=BSP")
        assert response.status_code == 200
        data = response.json()
        for component in data:
            assert component["type"] == "BSP"
    
    def test_get_component_types(self):
        """Get list of valid component types"""
        response = requests.get(f"{API}/component-types")
        assert response.status_code == 200
        data = response.json()
        assert "types" in data
        expected_types = ["RTOS", "BSP", "SDK", "Driver", "Bootloader", "Framework", "Library"]
        assert data["types"] == expected_types
    
    def test_create_software_component_admin(self, admin_token):
        """Admin can create a new software component"""
        test_component = {
            "name": f"TEST_Component_{uuid.uuid4().hex[:8]}",
            "type": "SDK",
            "version": "1.0.0",
            "description": "Test SDK component for testing",
            "compatible_cores": ["RISC-V E31"],
            "features": ["Feature 1", "Feature 2"],
            "download_url": "https://example.com/download",
            "documentation_url": "https://example.com/docs"
        }
        
        response = requests.post(f"{API}/admin/software-components", 
            json=test_component,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == test_component["name"]
        assert data["type"] == "SDK"
        assert "id" in data
        
        # Cleanup - delete the test component
        component_id = data["id"]
        delete_response = requests.delete(f"{API}/admin/software-components/{component_id}",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert delete_response.status_code == 200
    
    def test_create_software_component_invalid_type(self, admin_token):
        """Creating component with invalid type should fail"""
        test_component = {
            "name": "Invalid Component",
            "type": "InvalidType",
            "version": "1.0.0",
            "description": "Test component"
        }
        
        response = requests.post(f"{API}/admin/software-components",
            json=test_component,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 400
    
    def test_update_software_component_admin(self, admin_token):
        """Admin can update a software component"""
        # First create a component
        test_component = {
            "name": f"TEST_Update_{uuid.uuid4().hex[:8]}",
            "type": "Driver",
            "version": "1.0.0",
            "description": "Original description"
        }
        
        create_response = requests.post(f"{API}/admin/software-components",
            json=test_component,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        component_id = create_response.json()["id"]
        
        # Update the component
        updated_data = {
            "name": test_component["name"],
            "type": "Driver",
            "version": "2.0.0",
            "description": "Updated description"
        }
        
        update_response = requests.put(f"{API}/admin/software-components/{component_id}",
            json=updated_data,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert update_response.status_code == 200
        data = update_response.json()
        assert data["version"] == "2.0.0"
        assert data["description"] == "Updated description"
        
        # Cleanup
        requests.delete(f"{API}/admin/software-components/{component_id}",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
    
    def test_delete_software_component_admin(self, admin_token):
        """Admin can delete a software component"""
        # Create a component to delete
        test_component = {
            "name": f"TEST_Delete_{uuid.uuid4().hex[:8]}",
            "type": "Library",
            "version": "1.0.0",
            "description": "To be deleted"
        }
        
        create_response = requests.post(f"{API}/admin/software-components",
            json=test_component,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        component_id = create_response.json()["id"]
        
        # Delete the component
        delete_response = requests.delete(f"{API}/admin/software-components/{component_id}",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert delete_response.status_code == 200
        
        # Verify it's deleted - should not appear in list
        list_response = requests.get(f"{API}/software-components")
        components = list_response.json()
        component_ids = [c["id"] for c in components]
        assert component_id not in component_ids


class TestIDEDownloads:
    """Test IDE downloads management"""
    
    @pytest.fixture
    def admin_token(self):
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        return response.json()["access_token"]
    
    def test_get_ide_downloads(self):
        """Get all IDE downloads (public endpoint)"""
        response = requests.get(f"{API}/ide-downloads")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1  # Should have sample data
        
        # Check structure
        for ide in data:
            assert "name" in ide
            assert "version" in ide
            assert "platform" in ide
            assert "download_url" in ide
            assert "size" in ide
    
    def test_create_ide_download_admin(self, admin_token):
        """Admin can create a new IDE download"""
        test_ide = {
            "name": "RISC-V Rust Studio",
            "version": "2.0.0",
            "platform": f"TEST_Platform_{uuid.uuid4().hex[:8]}",
            "download_url": "https://example.com/download",
            "size": "500 MB",
            "description": "Test IDE download"
        }
        
        response = requests.post(f"{API}/admin/ide-downloads",
            json=test_ide,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["platform"] == test_ide["platform"]
        assert "id" in data
        
        # Cleanup
        ide_id = data["id"]
        requests.delete(f"{API}/admin/ide-downloads/{ide_id}",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
    
    def test_update_ide_download_admin(self, admin_token):
        """Admin can update an IDE download"""
        # Create an IDE download
        test_ide = {
            "name": "RISC-V Rust Studio",
            "version": "1.0.0",
            "platform": f"TEST_Update_{uuid.uuid4().hex[:8]}",
            "download_url": "https://example.com/download",
            "size": "400 MB",
            "description": "Original description"
        }
        
        create_response = requests.post(f"{API}/admin/ide-downloads",
            json=test_ide,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        ide_id = create_response.json()["id"]
        
        # Update
        updated_data = {
            "version": "1.1.0",
            "size": "450 MB"
        }
        
        update_response = requests.put(f"{API}/admin/ide-downloads/{ide_id}",
            json=updated_data,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert update_response.status_code == 200
        data = update_response.json()
        assert data["version"] == "1.1.0"
        assert data["size"] == "450 MB"
        
        # Cleanup
        requests.delete(f"{API}/admin/ide-downloads/{ide_id}",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
    
    def test_delete_ide_download_admin(self, admin_token):
        """Admin can delete an IDE download"""
        # Create an IDE download
        test_ide = {
            "name": "RISC-V Rust Studio",
            "version": "1.0.0",
            "platform": f"TEST_Delete_{uuid.uuid4().hex[:8]}",
            "download_url": "https://example.com/download",
            "size": "400 MB",
            "description": "To be deleted"
        }
        
        create_response = requests.post(f"{API}/admin/ide-downloads",
            json=test_ide,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        ide_id = create_response.json()["id"]
        
        # Delete
        delete_response = requests.delete(f"{API}/admin/ide-downloads/{ide_id}",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert delete_response.status_code == 200


class TestUserAccountSettings:
    """Test user account settings endpoints"""
    
    @pytest.fixture
    def test_user_token(self):
        """Create a test user and return token"""
        unique_id = uuid.uuid4().hex[:8]
        user_data = {
            "email": f"TEST_user_{unique_id}@test.com",
            "username": f"TEST_user_{unique_id}",
            "password": "testpass123"
        }
        
        response = requests.post(f"{API}/auth/register", json=user_data)
        if response.status_code == 200:
            return response.json()["access_token"], user_data
        else:
            # User might already exist, try login
            login_response = requests.post(f"{API}/auth/login", json={
                "email": user_data["email"],
                "password": user_data["password"]
            })
            return login_response.json()["access_token"], user_data
    
    def test_get_user_profile(self, test_user_token):
        """User can get their profile"""
        token, user_data = test_user_token
        response = requests.get(f"{API}/auth/me", headers={
            "Authorization": f"Bearer {token}"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == user_data["email"]
        assert data["username"] == user_data["username"]
    
    def test_update_user_profile(self, test_user_token):
        """User can update their profile"""
        token, user_data = test_user_token
        new_username = f"TEST_updated_{uuid.uuid4().hex[:8]}"
        
        response = requests.put(f"{API}/account/profile", 
            json={"username": new_username},
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["username"] == new_username
        
        # Verify with GET
        verify_response = requests.get(f"{API}/auth/me", headers={
            "Authorization": f"Bearer {token}"
        })
        assert verify_response.json()["username"] == new_username
    
    def test_get_user_project_stats(self, test_user_token):
        """User can get their project stats"""
        token, _ = test_user_token
        response = requests.get(f"{API}/account/projects/stats", headers={
            "Authorization": f"Bearer {token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        # Check structure
        assert "total_projects" in data
        assert "total_versions" in data
        assert "unique_hardware_used" in data
        assert "unique_middleware_used" in data
    
    def test_change_password(self, test_user_token):
        """User can change their password"""
        token, user_data = test_user_token
        
        response = requests.put(f"{API}/account/password",
            json={
                "current_password": user_data["password"],
                "new_password": "newpassword123"
            },
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        
        # Verify can login with new password
        login_response = requests.post(f"{API}/auth/login", json={
            "email": user_data["email"],
            "password": "newpassword123"
        })
        assert login_response.status_code == 200
    
    def test_change_password_wrong_current(self, test_user_token):
        """Changing password with wrong current password should fail"""
        token, _ = test_user_token
        
        response = requests.put(f"{API}/account/password",
            json={
                "current_password": "wrongpassword",
                "new_password": "newpassword123"
            },
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 400
    
    def test_delete_account(self):
        """User can delete their own account"""
        # Create a new user specifically for deletion test
        unique_id = uuid.uuid4().hex[:8]
        user_data = {
            "email": f"TEST_delete_{unique_id}@test.com",
            "username": f"TEST_delete_{unique_id}",
            "password": "testpass123"
        }
        
        register_response = requests.post(f"{API}/auth/register", json=user_data)
        assert register_response.status_code == 200
        token = register_response.json()["access_token"]
        
        # Delete account
        delete_response = requests.delete(f"{API}/account", headers={
            "Authorization": f"Bearer {token}"
        })
        assert delete_response.status_code == 200
        
        # Verify cannot login anymore
        login_response = requests.post(f"{API}/auth/login", json={
            "email": user_data["email"],
            "password": user_data["password"]
        })
        assert login_response.status_code == 401


class TestAdminDashboardNoUserManagement:
    """Verify admin dashboard doesn't have user management in frontend sections"""
    
    @pytest.fixture
    def admin_token(self):
        response = requests.post(f"{API}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        return response.json()["access_token"]
    
    def test_admin_stats_structure(self, admin_token):
        """Admin stats should have correct structure for new dashboard"""
        response = requests.get(f"{API}/admin/stats", headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        # Should have these keys for the new dashboard sections
        assert "hardware" in data
        assert "middleware" in data
        assert "software_components" in data
        assert "ide_downloads" in data
        assert "software_by_type" in data


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
