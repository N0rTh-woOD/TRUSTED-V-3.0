import requests
import sys
import json
from datetime import datetime
import uuid

class RISCVPlatformTester:
    def __init__(self, base_url="https://rustembedgen.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = f"test-session-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
        self.auth_token = None
        self.test_user_email = f"testuser_{datetime.now().strftime('%H%M%S')}@test.com"
        self.admin_token = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response keys: {list(response_data.keys())}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout (30s)")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_hardware_endpoints(self):
        """Test hardware-related endpoints"""
        print("\n" + "="*50)
        print("TESTING HARDWARE ENDPOINTS")
        print("="*50)
        
        # Test get all hardware
        success, hardware_data = self.run_test(
            "Get All Hardware",
            "GET",
            "hardware",
            200
        )
        
        if success and isinstance(hardware_data, list) and len(hardware_data) > 0:
            print(f"   Found {len(hardware_data)} hardware items")
            
            # Test get specific hardware by ID
            first_hardware = hardware_data[0]
            hardware_id = first_hardware.get('id')
            if hardware_id:
                self.run_test(
                    f"Get Hardware by ID ({hardware_id[:8]}...)",
                    "GET",
                    f"hardware/{hardware_id}",
                    200
                )
        
        return success

    def test_middleware_endpoints(self):
        """Test middleware-related endpoints"""
        print("\n" + "="*50)
        print("TESTING MIDDLEWARE ENDPOINTS")
        print("="*50)
        
        # Test get all middleware
        success, middleware_data = self.run_test(
            "Get All Middleware",
            "GET",
            "middleware",
            200
        )
        
        if success and isinstance(middleware_data, list) and len(middleware_data) > 0:
            print(f"   Found {len(middleware_data)} middleware items")
            
            # Test get compatible middleware for a specific core
            self.run_test(
                "Get Compatible Middleware (RISC-V E31)",
                "GET",
                "middleware/compatible/RISC-V E31",
                200
            )
        
        return success

    def test_auth_endpoints(self):
        """Test authentication endpoints"""
        print("\n" + "="*50)
        print("TESTING AUTHENTICATION ENDPOINTS")
        print("="*50)
        
        # Test user registration
        register_data = {
            "email": self.test_user_email,
            "username": f"testuser_{datetime.now().strftime('%H%M%S')}",
            "password": "testpass123"
        }
        
        success, register_response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data=register_data
        )
        
        if success and isinstance(register_response, dict):
            self.auth_token = register_response.get('access_token')
            print(f"   Registration successful, token received: {bool(self.auth_token)}")
            print(f"   User info: {register_response.get('user', {})}")
        
        # Test user login with same credentials
        login_data = {
            "email": self.test_user_email,
            "password": "testpass123"
        }
        
        login_success, login_response = self.run_test(
            "User Login",
            "POST",
            "auth/login",
            200,
            data=login_data
        )
        
        if login_success and isinstance(login_response, dict):
            login_token = login_response.get('access_token')
            print(f"   Login successful, token received: {bool(login_token)}")
        
        # Test admin login
        admin_login_data = {
            "email": "admin@rvrust.com",
            "password": "admin123"
        }
        
        admin_success, admin_response = self.run_test(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            data=admin_login_data
        )
        
        if admin_success and isinstance(admin_response, dict):
            self.admin_token = admin_response.get('access_token')
            print(f"   Admin login successful, token received: {bool(self.admin_token)}")
            print(f"   Admin user: {admin_response.get('user', {})}")
        
        # Test /auth/me endpoint with user token
        if self.auth_token:
            auth_headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self.auth_token}'
            }
            
            me_success, me_response = self.run_test(
                "Get Current User Info",
                "GET",
                "auth/me",
                200,
                headers=auth_headers
            )
            
            if me_success:
                print(f"   Current user info: {me_response}")
        
        return success and login_success and admin_success

    def test_chat_endpoints(self):
        """Test AI chat functionality (requires authentication)"""
        print("\n" + "="*50)
        print("TESTING AI CHAT ENDPOINTS")
        print("="*50)
        
        if not self.auth_token:
            print("❌ No auth token available, skipping chat tests")
            return False
        
        auth_headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.auth_token}'
        }
        
        # Test chat with IoT project request
        chat_message = "I need a RISC-V board for an IoT project with WiFi connectivity and low power consumption"
        success, chat_response = self.run_test(
            "AI Chat - IoT Project Request",
            "POST",
            "chat",
            200,
            data={
                "message": chat_message,
                "session_id": self.session_id
            },
            headers=auth_headers
        )
        
        if success:
            print(f"   AI Response length: {len(chat_response.get('response', ''))}")
            if chat_response.get('suggested_hardware'):
                print(f"   Suggested hardware: {len(chat_response['suggested_hardware'])} items")
            if chat_response.get('suggested_middleware'):
                print(f"   Suggested middleware: {len(chat_response['suggested_middleware'])} items")
        
        # Test chat history
        history_success, history_data = self.run_test(
            "Get Chat History",
            "GET",
            f"chat/history/{self.session_id}",
            200,
            headers=auth_headers
        )
        
        if history_success and isinstance(history_data, dict):
            messages = history_data.get('messages', [])
            print(f"   Chat history: {len(messages)} messages")
        
        return success

    def test_project_endpoints(self):
        """Test project-related endpoints"""
        print("\n" + "="*50)
        print("TESTING PROJECT ENDPOINTS")
        print("="*50)
        
        # Test get all projects (should be empty initially)
        success, projects_data = self.run_test(
            "Get All Projects",
            "GET",
            "projects",
            200
        )
        
        if success:
            print(f"   Found {len(projects_data)} projects")
        
        # Test create a new project
        project_data = {
            "name": "Test IoT Project",
            "description": "A test project for IoT with WiFi",
            "hardware_id": "test-hardware-id",
            "middleware_ids": ["test-middleware-id"],
            "requirements": "IoT project with WiFi connectivity"
        }
        
        create_success, created_project = self.run_test(
            "Create New Project",
            "POST",
            "projects",
            200,
            data=project_data
        )
        
        return success

    def test_ide_downloads_endpoints(self):
        """Test IDE downloads endpoints"""
        print("\n" + "="*50)
        print("TESTING IDE DOWNLOADS ENDPOINTS")
        print("="*50)
        
        success, ide_data = self.run_test(
            "Get IDE Downloads",
            "GET",
            "ide-downloads",
            200
        )
        
        if success and isinstance(ide_data, list):
            print(f"   Found {len(ide_data)} IDE downloads")
            for ide in ide_data:
                print(f"   - {ide.get('name', 'Unknown')} v{ide.get('version', 'Unknown')} ({ide.get('platform', 'Unknown')})")
        
        return success

    def test_basic_connectivity(self):
        """Test basic server connectivity"""
        print("\n" + "="*50)
        print("TESTING BASIC CONNECTIVITY")
        print("="*50)
        
        try:
            response = requests.get(self.base_url, timeout=10)
            if response.status_code in [200, 404]:  # 404 is OK for root path
                print("✅ Server is reachable")
                return True
            else:
                print(f"❌ Server returned status {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Server connectivity failed: {str(e)}")
            return False

def main():
    print("🚀 Starting RISC-V Platform API Testing")
    print("="*60)
    
    tester = RISCVPlatformTester()
    
    # Test basic connectivity first
    if not tester.test_basic_connectivity():
        print("\n❌ Basic connectivity failed. Stopping tests.")
        return 1
    
    # Run all API tests
    tests = [
        tester.test_hardware_endpoints,
        tester.test_middleware_endpoints,
        tester.test_ide_downloads_endpoints,
        tester.test_chat_endpoints,
        tester.test_project_endpoints,
    ]
    
    for test_func in tests:
        try:
            test_func()
        except Exception as e:
            print(f"❌ Test function {test_func.__name__} failed with error: {str(e)}")
    
    # Print final results
    print("\n" + "="*60)
    print("📊 FINAL TEST RESULTS")
    print("="*60)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "No tests run")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())