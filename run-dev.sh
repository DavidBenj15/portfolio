#!/bin/bash

cd app
source venv/bin/activate
pip3 install -r requirements.txt
export FLASK_ENV=development
flask run