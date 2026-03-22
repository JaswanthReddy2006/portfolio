#!/bin/bash

# 1. Start the Backend in the background
echo "Starting backend..."
cd backend
npm install
node server.js &  # The '&' runs it in the background
cd ..

# 2. Start the Frontend
echo "Starting frontend..."
npm install
npm run build
npm run preview & # Or serve the 'dist' folder using a static server
