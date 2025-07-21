# tests/test_app.py

import unittest
import os
os.environ['TESTING'] = 'true'

from app import app, TimelinePost, mydb

class AppTestCase(unittest.TestCase):
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
    
    def test_home(self):
        response = self.client.get('/')
        assert response.status_code == 200
        html = response.get_data(as_text=True)
        assert '<title>Portfolio</title>' in html
        # Basic check for about section
        assert 'About David Benjamin' in html or 'About Ebony Brown' in html
        # Basic check for photos
        assert 'David%20Benjamin.jpg' in html

    def test_timeline(self):
        # GET should return empty initially
        response = self.client.get('/api/timeline_post')
        assert response.status_code == 200
        assert response.is_json
        json = response.get_json()
        assert "timeline_posts" in json
        assert len(json["timeline_posts"]) == 0

        # POST a new timeline post
        post_data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'content': 'This is a test post.'
        }
        post_response = self.client.post('/api/timeline_post', data=post_data)
        assert post_response.status_code == 200
        post_json = post_response.get_json()
        assert post_json['name'] == 'Test User'
        assert post_json['email'] == 'test@example.com'
        assert post_json['content'] == 'This is a test post.'

        # GET should now return one post
        response = self.client.get('/api/timeline_post')
        assert response.status_code == 200
        json = response.get_json()
        assert len(json["timeline_posts"]) == 1
        assert json["timeline_posts"][0]['name'] == 'Test User'

        # Check /timeline page loads
        timeline_page = self.client.get('/timeline')
        assert timeline_page.status_code == 200
        assert 'Timeline' in timeline_page.get_data(as_text=True)

    def test_malformed_timeline_post(self):
        # POST request missing name
        response = self.client.post("/api/timeline_post", data={"email": "john@example.com", "content": "Hello world, I'm John!"})
        assert response.status_code == 400
        html = response.get_data(as_text=True)
        assert "Invalid name" in html

        # POST request with empty content
        response = self.client.post("/api/timeline_post", data={"name": "John Doe", "email": "john@example.com", "content": ""})
        assert response.status_code == 400
        html = response.get_data(as_text=True)
        assert "Invalid content" in html

        # POST request with malformed email
        response = self.client.post("/api/timeline_post", data={"name": "John Doe", "email": "not-an-email", "content": "Hello world, I'm John!"})
        assert response.status_code == 400
        html = response.get_data(as_text=True)
        assert "Invalid email" in html

        # POST with missing email
        response = self.client.post('/api/timeline_post', data={
            'name': 'No Email',
            'content': 'Missing email field.'
        })
        assert response.status_code == 400 or response.status_code == 422

        # GET a non-existent post (delete endpoint)
        response = self.client.delete('/api/timeline_post/9999')
        assert response.status_code == 404
