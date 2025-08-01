import unittest
import os
import requests
import time
from requests.exceptions import ConnectionError, RequestException

os.environ['TESTING'] = 'true'

from app import app, TimelinePost, mydb

# Import URL from environment file
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')
BACKEND_URL = os.getenv('URL', 'http://localhost:5000')


class FrontendTestCase(unittest.TestCase):
    """Test cases for the Next.js frontend"""
    
    @classmethod
    def setUpClass(cls):
        """Check if frontend is available before running tests"""
        try:
            response = requests.get(FRONTEND_URL, timeout=5)
            cls.frontend_available = response.status_code == 200
        except (ConnectionError, RequestException):
            cls.frontend_available = False
    
    def setUp(self):
        if not self.frontend_available:
            self.skipTest(f"Frontend not available at {FRONTEND_URL}. Please start your Next.js dev server.")
    
    def test_home_page_loads(self):
        """Test that the home page loads correctly"""
        response = requests.get(FRONTEND_URL, timeout=10)
        self.assertEqual(response.status_code, 200)
        html = response.text
        
        # Check for essential elements
        self.assertIn('<title>Portfolio | David Benjamin</title>', html)
        self.assertIn('About Me', html)
        self.assertIn('me_square.jpg', html)
    
    def test_timeline_page_loads(self):
        """Test that the timeline page loads correctly"""
        timeline_url = f"{FRONTEND_URL}/timeline"
        response = requests.get(timeline_url, timeout=10)
        self.assertEqual(response.status_code, 200)
        html = response.text
        
        # Check that timeline page contains expected content
        self.assertIn('Timeline', html)


class BackendAPITestCase(unittest.TestCase):
    """Test cases for the Flask backend API"""
    
    def setUp(self):
        self.client = app.test_client()
        # Ensure the table exists for each test
        if mydb is not None and mydb.is_closed():
            mydb.connect()
        mydb.create_tables([TimelinePost], safe=True)
    
    def tearDown(self):
        # Clean up the table after each test
        mydb.drop_tables([TimelinePost], safe=True)
        if not mydb.is_closed():
            mydb.close()
    
    def test_timeline_api_empty(self):
        """Test GET timeline API returns empty initially"""
        response = self.client.get('/api/timeline_post')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.is_json)
        json_data = response.get_json()
        self.assertIn("timeline_posts", json_data)
        self.assertEqual(len(json_data["timeline_posts"]), 0)
    
    def test_timeline_api_post_and_get(self):
        """Test POST and GET timeline API functionality"""
        # POST a new timeline post
        post_data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'content': 'This is a test post.'
        }
        post_response = self.client.post('/api/timeline_post', data=post_data)
        self.assertEqual(post_response.status_code, 200)
        
        post_json = post_response.get_json()
        self.assertEqual(post_json['name'], 'Test User')
        self.assertEqual(post_json['email'], 'test@example.com')
        self.assertEqual(post_json['content'], 'This is a test post.')
        
        # GET should now return one post
        get_response = self.client.get('/api/timeline_post')
        self.assertEqual(get_response.status_code, 200)
        get_json = get_response.get_json()
        self.assertEqual(len(get_json["timeline_posts"]), 1)
        self.assertEqual(get_json["timeline_posts"][0]['name'], 'Test User')
    
    def test_malformed_timeline_post_missing_name(self):
        """Test POST request missing name field"""
        response = self.client.post("/api/timeline_post", data={
            "email": "john@example.com", 
            "content": "Hello world, I'm John!"
        })
        self.assertEqual(response.status_code, 400)
        response_data = response.get_data(as_text=True)
        self.assertIn("Invalid name", response_data)
    
    def test_malformed_timeline_post_empty_content(self):
        """Test POST request with empty content"""
        response = self.client.post("/api/timeline_post", data={
            "name": "John Doe", 
            "email": "john@example.com", 
            "content": ""
        })
        self.assertEqual(response.status_code, 400)
        response_data = response.get_data(as_text=True)
        self.assertIn("Invalid content", response_data)
    
    def test_malformed_timeline_post_invalid_email(self):
        """Test POST request with malformed email"""
        response = self.client.post("/api/timeline_post", data={
            "name": "John Doe", 
            "email": "not-an-email", 
            "content": "Hello world, I'm John!"
        })
        self.assertEqual(response.status_code, 400)
        response_data = response.get_data(as_text=True)
        self.assertIn("Invalid email", response_data)
    
    def test_malformed_timeline_post_missing_email(self):
        """Test POST request missing email field"""
        response = self.client.post('/api/timeline_post', data={
            'name': 'No Email',
            'content': 'Missing email field.'
        })
        self.assertIn(response.status_code, [400, 422])
    
    def test_delete_nonexistent_post(self):
        """Test DELETE request for non-existent post"""
        response = self.client.delete('/api/timeline_post/9999')
        self.assertEqual(response.status_code, 404)
