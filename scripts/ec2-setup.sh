#!/bin/bash

# TrusteD-V AWS EC2 Setup Script
# Run this on a fresh Ubuntu 22.04 EC2 instance

set -e

echo "=========================================="
echo "TrusteD-V Platform - EC2 Setup Script"
echo "=========================================="

# Update system
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
echo "Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
echo "Installing Yarn..."
sudo npm install -g yarn

# Install Python 3.11
echo "Installing Python 3.11..."
sudo apt install -y python3.11 python3.11-venv python3-pip

# Install Nginx
echo "Installing Nginx..."
sudo apt install -y nginx

# Install PM2
echo "Installing PM2..."
sudo npm install -g pm2

# Install Git
echo "Installing Git..."
sudo apt install -y git

# Install Certbot for SSL
echo "Installing Certbot..."
sudo apt install -y certbot python3-certbot-nginx

# Create application directory
echo "Creating application directory..."
sudo mkdir -p /var/www/trusted-v
sudo chown -R $USER:$USER /var/www/trusted-v

echo "=========================================="
echo "Installation complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Clone your repository to /var/www/trusted-v"
echo "2. Setup backend: cd backend && python3.11 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
echo "3. Setup frontend: cd frontend && yarn install && yarn build"
echo "4. Configure environment variables"
echo "5. Setup Nginx configuration"
echo "6. Start application with PM2"
echo ""
echo "Installed versions:"
node --version
python3.11 --version
nginx -v
pm2 --version
