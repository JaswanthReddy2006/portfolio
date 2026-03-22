#!/bin/bash

echo "Starting deployment process..."

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm could not be found. Please install Node.js and npm first."
    exit 1
fi

# Install PM2 globally if not installed (PM2 is a production process manager for Node.js)
if ! command -v pm2 &> /dev/null
then
    echo "PM2 not found. Installing PM2 globally..."
    sudo npm install -g pm2
fi

echo "====================================="
echo "1. Setting up and starting Backend..."
echo "====================================="
cd backend
npm install
# Restart if it already exists, otherwise start it
pm2 restart portfolio-backend || pm2 start server.js --name "portfolio-backend"

echo "====================================="
echo "2. Setting up and starting Frontend..."
echo "====================================="
cd ..
npm install
npm run build

# Serve the built frontend using PM2's static server on port 8080 
# Note: You can change 8080 to 80 if you want it on the default HTTP port (requires sudo usually or port forwarding)
pm2 restart portfolio-frontend || pm2 serve dist 8080 --name "portfolio-frontend" --spa

# Save pm2 state so it restarts automatically on system reboot
pm2 save

echo "====================================="
echo "Deployment Complete!"
echo "====================================="
pm2 status
