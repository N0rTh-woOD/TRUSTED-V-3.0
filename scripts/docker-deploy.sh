#!/bin/bash

# TrusteD-V - Docker Deployment Script
# Usage: chmod +x docker-deploy.sh && ./docker-deploy.sh

set -e

echo "=========================================="
echo "TrusteD-V Platform - Docker Deployment"
echo "=========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker not found. Installing..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo "Docker installed. Please log out and log back in, then run this script again."
    exit 0
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose not found. Installing..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo ""
    echo "⚠️  Please edit .env file with your configuration!"
    echo "   nano .env"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo ""
echo "Building and starting containers..."
echo ""

# Build and start
docker-compose down --remove-orphans 2>/dev/null || true
docker-compose build --no-cache
docker-compose up -d

echo ""
echo "Waiting for services to be healthy..."
sleep 10

# Check status
echo ""
echo "=========================================="
echo "Container Status:"
echo "=========================================="
docker-compose ps

echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo ""
echo "Access the application:"
echo "  Frontend: http://localhost"
echo "  Backend:  http://localhost:8001"
echo "  API Docs: http://localhost:8001/docs"
echo ""
echo "Default login:"
echo "  Email:    admin@trusted-v.com"
echo "  Password: bosch@2425"
echo ""
echo "Useful commands:"
echo "  View logs:     docker-compose logs -f"
echo "  Stop:          docker-compose down"
echo "  Restart:       docker-compose restart"
echo "  Rebuild:       docker-compose up -d --build"
echo ""
