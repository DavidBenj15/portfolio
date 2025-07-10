#!/bin/bash

cd ~
if [ ! -d portfolio ]; then
	echo "Could not find directory '~/portfolio'"
	echo "Cloning portfolio from github..."
	git clone https://github.com/DavidBenj15/portfolio.git portfolio
fi

echo "Changing into portfolio directory"
cd portfolio

echo "Fetching latest changes from GitHub..."
git fetch && git reset origin/main --hard

if [ ! -f ".env" ]; then
	pwd
	ls -la
	echo "Error: .env file not found. Exiting."
	exit 1
fi

if [ ! -d python3-virtualenv ]; then
	echo "Could not find directory 'python3-virtualenv'"
	echo "Creating new virtual environment 'python3-virtualenv'..."
	python -m venv python3-virtualenv
fi

echo "Activating virtual environment and installing dependencies..."
source python3-virtualenv/bin/activate
pip3 install -r requirements.txt

echo "Restarting 'myportfolio.service' service..."
systemctl restart myportfolio.service

echo "Success! Portfolio has been successfully redeployed."
