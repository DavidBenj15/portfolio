# test_db.py

import os
import unittest
from peewee import *
from datetime import datetime

# Set testing env before importing app, no .env needed
os.environ['TESTING'] = '1'

from app import TimelinePost

MODELS = [TimelinePost]

# use an in-memory SQLite for tests.
test_db = SqliteDatabase(':memory:')

class TestTimelinePost(unittest.TestCase):
    def setUp(self):
        # Bind model classes to test db. Since we have a complete list of
        # all models, we do not need to recursively bind dependencies.
        test_db.bind(MODELS, bind_refs=False, bind_backrefs=False)

        test_db.connect()
        test_db.create_tables(MODELS)

    def tearDown(self):
        # Not strictly necessary since SQLite in-memory databases only live
        # for the duration of the connection, and in the next step we close
        # the connection...but a good practice all the same.
        test_db.drop_tables(MODELS)

        # Close connection to db.
        test_db.close()

    def test_timeline_post(self):
        # Create 2 timeline posts.
        first_post = TimelinePost.create(name='John Doe', email='john@example.com', content='Hello, world! John here.')
        assert first_post.id == 1
        second_post = TimelinePost.create(name='Jane Doe', email='jane@example.com', content='Hello, world! Jane here.')
        assert second_post.id == 2

        # Get all posts and verify there are two.
        all_posts = list(TimelinePost.select().order_by(TimelinePost.id))
        self.assertEqual(len(all_posts), 2)

        # Convert to dict for strict comparison
        post_dicts = []
        for post in all_posts:
            post_dicts.append({
                'id': post.id,
                'name': post.name,
                'email': post.email,
                'content': post.content,
                'created_at': post.created_at,
            })

        # Check contents strictly
        self.assertEqual(post_dicts[0]['name'], 'John Doe')
        self.assertEqual(post_dicts[0]['email'], 'john@example.com')
        self.assertEqual(post_dicts[0]['content'], 'Hello, world! John here.')
        self.assertEqual(post_dicts[1]['name'], 'Jane Doe')
        self.assertEqual(post_dicts[1]['email'], 'jane@example.com')
        self.assertEqual(post_dicts[1]['content'], 'Hello, world! Jane here.')
        # Check created_at is a datetime
        self.assertIsInstance(post_dicts[0]['created_at'], datetime)
        self.assertIsInstance(post_dicts[1]['created_at'], datetime)
