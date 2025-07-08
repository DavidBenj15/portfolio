#!/bin/bash

# Load environment variables
set -a
source .env
set +a

# Test POST
RESPONSE=$(curl -X POST $URL/api/timeline_post -d \
'name=David&email=davidnbenjamin15@gmail.com&content=Content added from bash test script')

# Test GET
curl $URL/api/timeline_post

# Finally: DELETE inserted post
TARGET_ID=$(echo "$RESPONSE" | jq -r '.id')
echo "ID: $TARGET_ID"
curl -X DELETE $URL/api/timeline_post/$TARGET_ID