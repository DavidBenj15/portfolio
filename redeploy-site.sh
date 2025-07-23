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
	echo "Error: could not find file '.env'. Exiting."
	exit 1
fi

if [ ! -f "docker-compose.prod.yml" ]; then
	echo "Error: could not find file 'docker-compose.prod.yml'. Exiting."
	exit 1
fi

docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build

echo "Success! Portfolio has been successfully redeployed."
