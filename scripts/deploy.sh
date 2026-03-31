#!/bin/bash

# TrusteD-V Deployment Script
# Run this after initial setup to deploy updates

set -e

APP_DIR="/var/www/trusted-v"

echo "=========================================="
echo "TrusteD-V Platform - Deploy Script"
echo "=========================================="

cd $APP_DIR

# Pull latest changes (if using git)
if [ -d ".git" ]; then
    echo "Pulling latest changes..."
    git pull origin main
fi

# Backend setup
echo "Setting up backend..."
cd $APP_DIR/backend
source venv/bin/activate
pip install -r requirements.txt
pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/

# Frontend build
echo "Building frontend..."
cd $APP_DIR/frontend
yarn install
yarn build

# Restart services
echo "Restarting services..."
pm2 restart trusted-v-backend || pm2 start $APP_DIR/ecosystem.config.js
sudo systemctl reload nginx

echo "=========================================="
echo "Deployment complete!"
echo "=========================================="

# Show status
pm2 status
sudo systemctl status nginx --no-pager
