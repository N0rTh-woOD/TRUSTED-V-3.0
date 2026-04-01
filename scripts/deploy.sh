#!/bin/bash

# TrusteD-V - Application Deployment/Update Script
# Run this to deploy updates to the application

set -e

APP_DIR="/var/www/trusted-v"

echo "=========================================="
echo "TrusteD-V Platform - Deploy/Update"
echo "=========================================="
echo ""

cd $APP_DIR

# Pull latest changes (if using git)
if [ -d ".git" ]; then
    echo "[1/5] Pulling latest changes..."
    git pull origin main
else
    echo "[1/5] No git repository found, skipping pull..."
fi

# Backend setup
echo "[2/5] Updating backend dependencies..."
cd $APP_DIR/backend
source venv/bin/activate
pip install -q -r requirements.txt
pip install -q emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/

# Frontend build
echo "[3/5] Building frontend..."
cd $APP_DIR/frontend
yarn install --silent
yarn build

# Restart backend
echo "[4/5] Restarting backend..."
pm2 restart trusted-v-backend 2>/dev/null || pm2 start $APP_DIR/ecosystem.config.js

# Reload Nginx
echo "[5/5] Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo ""

# Show status
echo "Service Status:"
echo ""
pm2 status
echo ""
sudo systemctl status nginx --no-pager | head -5
echo ""
mongosh --quiet --eval "print('MongoDB: ' + db.serverStatus().ok)"
