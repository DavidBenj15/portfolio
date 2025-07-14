#!/bin/bash

cd app
source venv/bin/activate
export FLASK_ENV=development
flask run