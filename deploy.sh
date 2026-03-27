#!/bin/bash

# 1. Stop all running containers
echo "Stopping all running containers..."
if [ "$(docker ps -aq)" ]; then
    docker stop $(docker ps -aq)
else
    echo "No running containers found."
fi

# 2. Remove all containers
echo "Removing all containers..."
if [ "$(docker ps -aq)" ]; then
    docker rm $(docker ps -aq)
else
    echo "No containers found to remove."
fi

# 3. Pull the latest image
echo "Pulling latest image..."
docker pull jaswanthr57/portfolio-app:latest

# 4. Recreate and start containers (app + caddy reverse proxy)
echo "Starting containers via Docker Compose..."
# Support both modern `docker compose` and older `docker-compose` commands
docker compose up -d 2>/dev/null || docker-compose up -d

# 5. Clean up old/dangling images
echo "Cleaning up old images..."
docker image prune -f

echo "Deployment complete! App is running securely on https://jaswanthreddy.tech"
