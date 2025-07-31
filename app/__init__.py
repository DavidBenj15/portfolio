import os
import datetime
from flask import Flask, render_template, request, jsonify, abort
from dotenv import load_dotenv
from . import testdata
from peewee import *
from playhouse.shortcuts import model_to_dict
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)

if os.getenv("TESTING") == "true":
    print("Running in test mode")
    mydb = SqliteDatabase('file:memory?mode=memory&cache=shared', uri=True)
else:
    mydb = MySQLDatabase(os.getenv("MYSQL_DATABASE"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        host=os.getenv("MYSQL_HOST"),
        port=3306)

# print(mydb)

class TimelinePost(Model):
    name = CharField()
    email = CharField()
    content = TextField()
    created_at = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = mydb

mydb.connect()
mydb.create_tables([TimelinePost])

# @app.route('/')
# def index():
#     # Temporary images. TODO replace with actual images.
#     photos = ['David Benjamin.jpg', 'David Benjamin.jpg', 'David Benjamin.jpg', 'David Benjamin.jpg', 'David Benjamin.jpg']
#     locations = [
#         {"name": "New York", "lat": 40.7128, "lng": -74.0060, "visited_by": "David"},
#         {"name": "San Francisco", "lat": 37.7749, "lng": -122.4194, "visited_by": "Ebony"},
#         {"name": "Pennsylvania", "lat": 13.847161255761124, "lng":100.39281811647348 , "visited_by": "Ebony"},
#         {"name": "Boston", "lat": 42.3601, "lng": -71.0589, "visited_by": "David"},
#     ]

#     # TODO fill in actual about sections.
#     abouts = [
#         {
#             'title': 'About David Benjamin',
#             'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo mi vel mauris iaculis placerat. Maecenas suscipit ipsum massa. Proin.'
#         },
#         {
#             'title': 'About Ebony Brown',
#             'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo mi vel mauris iaculis placerat. Maecenas suscipit ipsum massa. Proin.'
#         }
#     ]
#     return render_template('index.html', title="MLH Fellow", url=os.getenv("URL"), photos=photos, abouts=abouts, locations=locations)

# @app.route('/resume')
# def resume():
#     return render_template('resume.html', title="Work Experience", exp=testdata.workData, edu=testdata.schoolData, url=os.getenv("URL"))

# @app.route('/hobbies')
# def hobbies():
#     return render_template('hobbies.html', title="Hobbies", hobbies=testdata.hobbiesData)

# @app.route('/timeline')
# def timeline():
#     return render_template('timeline.html', title='Timeline')

# API

@app.route('/api/timeline_post', methods=['POST'])
def post_timeline_post():
    # Get form data and strip whitespace
    name = request.form.get('name', '').strip()
    email = request.form.get('email', '').strip()
    content = request.form.get('content', '').strip()

    # Validate fields individually
    if not name:
        return jsonify({'error': 'Invalid name'}), 400
    if not email or '@' not in email:
        return jsonify({'error': 'Invalid email'}), 400
    if not content:
        return jsonify({'error': 'Invalid content'}), 400
    timeline_post = TimelinePost.create(name=name, email=email, content=content)
    return model_to_dict(timeline_post)

@app.route('/api/timeline_post', methods=['GET'])
def get_timeline_post():
    print('ENDPOINT HIT')
    return {
        'timeline_posts': [
            model_to_dict(p)
            for p in TimelinePost.select().order_by(TimelinePost.created_at.desc())
        ]
    }

@app.route('/api/timeline_post/<int:post_id>', methods=['DELETE'])
def delete_timeline_post(post_id):
    try:
        post = TimelinePost.get_by_id(post_id)
        post.delete_instance()
        return jsonify({
            'message': f'Post {post_id} deleted successfully'
        })
    except TimelinePost.DoesNotExist:
        abort(404, description=f'Post with ID {post_id} not found')