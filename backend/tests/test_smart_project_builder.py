"""
Test suite for Smart Project Builder feature
Tests: Project generation, ZIP download, versioning, Admin LLM configuration
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

@pytest.fixture(scope="module")
def admin_token():
    """Get admin authentication token"""
    response = requests.post(f"{BASE_URL}/api/auth/login", json={
        "email": "admin@trusted-v.com",
        "password": "admin123"
    })
    assert response.status_code == 200, f"Admin login failed: {response.text}"
    return response.json()["access_token"]

@pytest.fixture(scope="module")
def hardware_list():
    """Get available hardware"""
    response = requests.get(f"{BASE_URL}/api/hardware")
    assert response.status_code == 200
    return response.json()

@pytest.fixture(scope="module")
def middleware_list():
    """Get available middleware"""
    response = requests.get(f"{BASE_URL}/api/middleware")
    assert response.status_code == 200
    return response.json()

@pytest.fixture(scope="module")
def software_components():
    """Get available software components"""
    response = requests.get(f"{BASE_URL}/api/software-components")
    assert response.status_code == 200
    return response.json()


class TestSmartProjectBuilderAPIs:
    """Tests for Smart Project Builder backend APIs"""
    
    def test_hardware_endpoint(self, hardware_list):
        """Test hardware endpoint returns data for builder step 2"""
        assert len(hardware_list) > 0, "No hardware found"
        # Verify hardware has required fields
        hw = hardware_list[0]
        assert "id" in hw
        assert "name" in hw
        assert "core" in hw
        assert "peripherals" in hw
        print(f"SUCCESS: Hardware endpoint returns {len(hardware_list)} boards")
    
    def test_middleware_endpoint(self, middleware_list):
        """Test middleware endpoint returns data for builder step 3"""
        assert len(middleware_list) > 0, "No middleware found"
        # Verify middleware has required fields
        mw = middleware_list[0]
        assert "id" in mw
        assert "name" in mw
        assert "compatible_cores" in mw
        print(f"SUCCESS: Middleware endpoint returns {len(middleware_list)} items")
    
    def test_software_components_endpoint(self, software_components):
        """Test software components endpoint for builder step 3"""
        assert len(software_components) > 0, "No software components found"
        # Verify software component has required fields
        sw = software_components[0]
        assert "id" in sw
        assert "name" in sw
        assert "type" in sw
        print(f"SUCCESS: Software components endpoint returns {len(software_components)} items")
    
    def test_compatible_middleware_endpoint(self, hardware_list):
        """Test compatible middleware filtering by core"""
        hw = hardware_list[0]
        core = hw["core"]
        response = requests.get(f"{BASE_URL}/api/middleware/compatible/{core}")
        assert response.status_code == 200
        compatible = response.json()
        print(f"SUCCESS: Compatible middleware for {core}: {len(compatible)} items")
    
    def test_compatible_software_endpoint(self, hardware_list):
        """Test compatible software filtering by hardware_id"""
        hw = hardware_list[0]
        hw_id = hw["id"]
        response = requests.get(f"{BASE_URL}/api/software-components/compatible/{hw_id}")
        assert response.status_code == 200
        compatible = response.json()
        print(f"SUCCESS: Compatible software for {hw['name']}: {len(compatible)} items")


class TestProjectGeneration:
    """Tests for project generation and versioning"""
    
    def test_generate_project(self, admin_token, hardware_list, middleware_list):
        """Test project generation with LLM (may take 5-10 seconds)"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        # Use first hardware and middleware
        hw = hardware_list[0]
        mw_ids = [middleware_list[0]["id"]] if middleware_list else []
        
        payload = {
            "name": "TEST_Smart_Builder_Project",
            "description": "Test project for Smart Project Builder testing",
            "hardware_id": hw["id"],
            "middleware_ids": mw_ids,
            "software_component_ids": [],
            "peripherals": ["GPIO", "UART"] if hw.get("peripherals") else [],
            "additional_requirements": "Basic LED blink example"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/projects/generate",
            json=payload,
            headers=headers,
            timeout=60  # LLM generation may take time
        )
        
        assert response.status_code == 200, f"Project generation failed: {response.text}"
        
        data = response.json()
        assert "project_id" in data
        assert "version" in data
        assert "files_generated" in data or "files" in data
        
        print(f"SUCCESS: Project generated - ID: {data['project_id']}, Version: {data['version']}")
        return data["project_id"]
    
    def test_get_user_projects(self, admin_token):
        """Test getting user's projects list"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        response = requests.get(f"{BASE_URL}/api/projects", headers=headers)
        assert response.status_code == 200
        
        projects = response.json()
        assert isinstance(projects, list)
        print(f"SUCCESS: User has {len(projects)} projects")
        return projects
    
    def test_project_has_versions(self, admin_token):
        """Test that generated project has version history"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        # Get projects
        response = requests.get(f"{BASE_URL}/api/projects", headers=headers)
        assert response.status_code == 200
        projects = response.json()
        
        # Find test project
        test_projects = [p for p in projects if "TEST_" in p.get("name", "")]
        if test_projects:
            project = test_projects[0]
            assert "versions" in project
            assert len(project["versions"]) > 0, "Project should have at least one version"
            print(f"SUCCESS: Project '{project['name']}' has {len(project['versions'])} version(s)")
        else:
            print("INFO: No test projects found, skipping version check")
    
    def test_download_project_zip(self, admin_token):
        """Test downloading project as ZIP file"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        # Get projects
        response = requests.get(f"{BASE_URL}/api/projects", headers=headers)
        assert response.status_code == 200
        projects = response.json()
        
        # Find a project with versions
        projects_with_versions = [p for p in projects if p.get("versions") and len(p["versions"]) > 0]
        
        if projects_with_versions:
            project = projects_with_versions[0]
            version = project["versions"][-1]["version"]
            
            download_response = requests.get(
                f"{BASE_URL}/api/projects/{project['id']}/download/{version}",
                headers=headers
            )
            
            assert download_response.status_code == 200, f"Download failed: {download_response.text}"
            assert download_response.headers.get("content-type") == "application/zip" or \
                   "application/octet-stream" in download_response.headers.get("content-type", "")
            assert len(download_response.content) > 0, "ZIP file is empty"
            
            print(f"SUCCESS: Downloaded ZIP for project '{project['name']}' v{version} ({len(download_response.content)} bytes)")
        else:
            pytest.skip("No projects with versions found for download test")


class TestAdminLLMConfiguration:
    """Tests for Admin LLM configuration page"""
    
    def test_get_llm_providers(self):
        """Test getting available LLM providers"""
        response = requests.get(f"{BASE_URL}/api/llm-providers")
        assert response.status_code == 200
        
        data = response.json()
        assert "providers" in data
        providers = data["providers"]
        assert len(providers) > 0, "No LLM providers found"
        
        # Verify provider structure
        provider = providers[0]
        assert "id" in provider
        assert "name" in provider
        assert "models" in provider
        
        print(f"SUCCESS: {len(providers)} LLM providers available")
        for p in providers:
            print(f"  - {p['name']}: {len(p['models'])} models")
    
    def test_get_llm_settings_admin(self, admin_token):
        """Test getting current LLM settings (admin only)"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        response = requests.get(f"{BASE_URL}/api/admin/llm-settings", headers=headers)
        assert response.status_code == 200
        
        settings = response.json()
        assert "provider" in settings
        assert "model" in settings
        assert "api_key_type" in settings
        
        print(f"SUCCESS: Current LLM settings - Provider: {settings['provider']}, Model: {settings['model']}")
    
    def test_update_llm_settings_admin(self, admin_token):
        """Test updating LLM settings (admin only)"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        # Get current settings first
        get_response = requests.get(f"{BASE_URL}/api/admin/llm-settings", headers=headers)
        current_settings = get_response.json()
        
        # Update settings (keep same values to not break anything)
        update_payload = {
            "provider": current_settings.get("provider", "gemini"),
            "model": current_settings.get("model", "gemini-3-flash-preview"),
            "api_key_type": "emergent"
        }
        
        response = requests.put(
            f"{BASE_URL}/api/admin/llm-settings",
            json=update_payload,
            headers=headers
        )
        
        assert response.status_code == 200, f"Update failed: {response.text}"
        print("SUCCESS: LLM settings updated successfully")
    
    def test_llm_settings_requires_admin(self):
        """Test that LLM settings endpoint requires admin access"""
        # Try without auth
        response = requests.get(f"{BASE_URL}/api/admin/llm-settings")
        assert response.status_code in [401, 403], "Should require authentication"
        
        print("SUCCESS: LLM settings endpoint properly requires admin access")


class TestProjectCleanup:
    """Cleanup test data"""
    
    def test_cleanup_test_projects(self, admin_token):
        """Delete test projects created during testing"""
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        # Get projects
        response = requests.get(f"{BASE_URL}/api/projects", headers=headers)
        if response.status_code == 200:
            projects = response.json()
            test_projects = [p for p in projects if "TEST_" in p.get("name", "")]
            
            for project in test_projects:
                delete_response = requests.delete(
                    f"{BASE_URL}/api/projects/{project['id']}",
                    headers=headers
                )
                if delete_response.status_code in [200, 204]:
                    print(f"Cleaned up test project: {project['name']}")
        
        print("SUCCESS: Test cleanup completed")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
