#!/bin/bash

SESSION_NAME="portfolio_server"

cd ~/portfolio

# Kill all existing tmux sessions
tmux kill-server

# Fetch latest changes from GitHub
git fetch && git reset origin/main --hard

# Activate venv and install dependencies
source python3-virtualenv/bin/activate
pip3 install -r requirements.txt

# Start server on detatched tmux session
tmux new-session -d -s $SESSION_NAME 'cd ~/portfolio && source python3-virtualenv/bin/activate && cd app && export FLASK_APP=__init__.py && flask run --host=0.0.0.0 > ../flask.log 2>&1'


