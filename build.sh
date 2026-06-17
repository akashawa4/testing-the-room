#!/bin/bash
set -e

# Install dependencies if needed
npm install

# Make vite executable
chmod +x node_modules/.bin/vite

# Run the build
npm run build 