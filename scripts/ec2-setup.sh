#!/bin/bash

# TrusteD-V - EC2 Initial Setup Script
# Run this on a fresh Ubuntu 22.04 EC2 instance
# Usage: chmod +x ec2-setup.sh && ./ec2-setup.sh

set -e

echo "=========================================="
echo "TrusteD-V Platform - EC2 Setup"
echo "with Local MongoDB Installation"
echo "=========================================="
echo ""

# Update system
echo "[1/8] Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install MongoDB 7.0
echo "[2/8] Installing MongoDB 7.0..."
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

# Configure MongoDB for local-only access
echo "[2.1/8] Configuring MongoDB..."
sudo tee /etc/mongod.conf > /dev/null <<EOF
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 127.0.0.1

processManagement:
  timeZoneInfo: /usr/share/zoneinfo
EOF

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
echo "MongoDB installed and running."

# Install Node.js 18
echo "[3/8] Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
echo "[4/8] Installing Yarn..."
sudo npm install -g yarn

# Install Python 3.11
echo "[5/8] Installing Python 3.11..."
sudo apt install -y python3.11 python3.11-venv python3-pip

# Install Nginx
echo "[6/8] Installing Nginx..."
sudo apt install -y nginx

# Install PM2
echo "[7/8] Installing PM2..."
sudo npm install -g pm2

# Install additional tools
echo "[8/8] Installing additional tools..."
sudo apt install -y git certbot python3-certbot-nginx curl

# Create application directory
echo "Creating application directory..."
sudo mkdir -p /var/www/trusted-v
sudo chown -R $USER:$USER /var/www/trusted-v

# Create PM2 log directory
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Installed versions:"
echo "  Node.js: $(node --version)"
echo "  Python:  $(python3.11 --version)"
echo "  MongoDB: $(mongod --version | head -1)"
echo "  Nginx:   $(nginx -v 2>&1)"
echo "  PM2:     $(pm2 --version)"
echo ""
echo "MongoDB Status:"
sudo systemctl status mongod --no-pager | head -5
echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1. Upload your application files:"
echo "   scp -r ./backend ./frontend ubuntu@<ec2-ip>:/var/www/trusted-v/"
echo ""
echo "2. Setup backend:"
echo "   cd /var/www/trusted-v/backend"
echo "   python3.11 -m venv venv"
echo "   source venv/bin/activate"
echo "   pip install -r requirements.txt"
echo "   pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/"
echo ""
echo "3. Create backend/.env file with:"
echo "   MONGO_URL=mongodb://localhost:27017"
echo "   DB_NAME=trusted_v_db"
echo "   JWT_SECRET=<generate with: openssl rand -hex 32>"
echo ""
echo "4. Setup frontend:"
echo "   cd /var/www/trusted-v/frontend"
echo "   yarn install"
echo "   yarn build"
echo ""
echo "5. Configure Nginx and start services"
echo "   See AWS_DEPLOYMENT_GUIDE.md for details"
echo ""
