# TrusteD-V Platform - AWS Deployment Guide

Complete guide to deploy the TrusteD-V platform on AWS.

---

## Deployment Architecture

```
                    ┌─────────────────────────────────────────┐
                    │              AWS Cloud                   │
                    │                                          │
┌──────────┐       │  ┌─────────────┐    ┌─────────────────┐ │
│  Users   │──────▶│  │   Route 53  │───▶│  Load Balancer  │ │
└──────────┘       │  │   (DNS)     │    │  (ALB/Nginx)    │ │
                    │  └─────────────┘    └────────┬────────┘ │
                    │                              │          │
                    │         ┌────────────────────┴───┐      │
                    │         ▼                        ▼      │
                    │  ┌─────────────┐    ┌─────────────────┐ │
                    │  │  Frontend   │    │    Backend      │ │
                    │  │  (React)    │    │   (FastAPI)     │ │
                    │  │  Port 3000  │    │   Port 8001     │ │
                    │  └─────────────┘    └────────┬────────┘ │
                    │                              │          │
                    │                              ▼          │
                    │                    ┌─────────────────┐  │
                    │                    │  MongoDB Atlas  │  │
                    │                    │   (External)    │  │
                    │                    └─────────────────┘  │
                    └─────────────────────────────────────────┘
```

---

## Option 1: EC2 Deployment (Recommended for Full Control)

### Prerequisites
- AWS Account
- Domain name (optional but recommended)
- MongoDB Atlas account (free tier available)

---

### Step 1: Launch EC2 Instance

1. **Go to AWS Console** → EC2 → Launch Instance

2. **Choose AMI**: Ubuntu Server 22.04 LTS (64-bit)

3. **Instance Type**: 
   - Development/Testing: `t2.micro` (free tier) or `t2.small`
   - Production: `t2.medium` or `t3.medium`

4. **Key Pair**: Create new or use existing (download .pem file)

5. **Network Settings** (Security Group):
   ```
   Inbound Rules:
   - SSH (22) - Your IP
   - HTTP (80) - Anywhere (0.0.0.0/0)
   - HTTPS (443) - Anywhere (0.0.0.0/0)
   - Custom TCP (8001) - Anywhere (for API, optional)
   - Custom TCP (3000) - Anywhere (for dev, optional)
   ```

6. **Storage**: 20-30 GB gp3

7. **Launch Instance**

---

### Step 2: Connect to EC2

```bash
# Set permissions for key file
chmod 400 your-key.pem

# Connect via SSH
ssh -i your-key.pem ubuntu@<your-ec2-public-ip>
```

---

### Step 3: Install Dependencies on EC2

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
sudo npm install -g yarn

# Install Python 3.11
sudo apt install -y python3.11 python3.11-venv python3-pip

# Install Nginx
sudo apt install -y nginx

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Git
sudo apt install -y git

# Verify installations
node --version
python3.11 --version
nginx -v
pm2 --version
```

---

### Step 4: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account / Sign in
3. Create a new cluster (M0 Free Tier)
4. **Database Access**: Create user with password
5. **Network Access**: Add IP `0.0.0.0/0` (allow all) or your EC2 IP
6. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

### Step 5: Clone and Setup Project

```bash
# Create app directory
sudo mkdir -p /var/www/trusted-v
sudo chown -R ubuntu:ubuntu /var/www/trusted-v
cd /var/www/trusted-v

# Clone your repository (or upload files via SCP)
git clone <your-repo-url> .

# Or upload via SCP from local machine:
# scp -i your-key.pem -r ./backend ./frontend ubuntu@<ec2-ip>:/var/www/trusted-v/
```

---

### Step 6: Setup Backend

```bash
cd /var/www/trusted-v/backend

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/

# Create uploads directory
mkdir -p uploads/ide

# Create production .env file
nano .env
```

**Backend `.env` content:**
```env
MONGO_URL="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"
DB_NAME="trusted_v_production"
CORS_ORIGINS="https://yourdomain.com,http://yourdomain.com"
JWT_SECRET="generate-a-strong-random-secret-key-here-64-chars-minimum"
EMERGENT_LLM_KEY="your-emergent-api-key"
```

**Generate a secure JWT secret:**
```bash
openssl rand -hex 32
```

---

### Step 7: Setup Frontend

```bash
cd /var/www/trusted-v/frontend

# Install dependencies
yarn install

# Create production .env
nano .env
```

**Frontend `.env` content:**
```env
REACT_APP_BACKEND_URL=https://yourdomain.com
# Or if using IP: REACT_APP_BACKEND_URL=http://<ec2-public-ip>
```

**Build for production:**
```bash
yarn build
```

---

### Step 8: Configure PM2 (Process Manager)

Create PM2 ecosystem file:

```bash
cd /var/www/trusted-v
nano ecosystem.config.js
```

**ecosystem.config.js content:**
```javascript
module.exports = {
  apps: [
    {
      name: 'trusted-v-backend',
      cwd: '/var/www/trusted-v/backend',
      script: 'venv/bin/uvicorn',
      args: 'server:app --host 0.0.0.0 --port 8001',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
```

**Start the backend:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
# Run the command it outputs to enable auto-start on reboot
```

---

### Step 9: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/trusted-v
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    # Or use: server_name _;  for IP-based access

    # Frontend - Serve React build
    location / {
        root /var/www/trusted-v/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API - Proxy to FastAPI
    location /api/ {
        proxy_pass http://127.0.0.1:8001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
        client_max_body_size 100M;
    }

    # Uploaded files (IDE binaries)
    location /uploads/ {
        alias /var/www/trusted-v/backend/uploads/;
    }

    # Team images
    location /team/ {
        alias /var/www/trusted-v/frontend/build/team/;
    }
}
```

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/trusted-v /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

### Step 10: Setup SSL with Let's Encrypt (For HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
# Test renewal:
sudo certbot renew --dry-run
```

---

### Step 11: Verify Deployment

```bash
# Check PM2 status
pm2 status

# Check Nginx status
sudo systemctl status nginx

# Check backend logs
pm2 logs trusted-v-backend

# Test API
curl http://localhost:8001/api/health
```

**Access your application:**
- http://your-ec2-ip (or https://yourdomain.com)
- Login: admin@trusted-v.com / bosch@2425

---

## Option 2: Docker Deployment

### Dockerfile for Backend

Create `/var/www/trusted-v/backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/

# Copy application
COPY . .

# Create uploads directory
RUN mkdir -p uploads/ide

# Expose port
EXPOSE 8001

# Run application
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

### Dockerfile for Frontend

Create `/var/www/trusted-v/frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source and build
COPY . .
RUN yarn build

# Production image with Nginx
FROM nginx:alpine

# Copy build files
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Frontend Nginx Config

Create `/var/www/trusted-v/frontend/nginx.conf`:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Docker Compose

Create `/var/www/trusted-v/docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=${MONGO_URL}
      - DB_NAME=${DB_NAME}
      - JWT_SECRET=${JWT_SECRET}
      - EMERGENT_LLM_KEY=${EMERGENT_LLM_KEY}
      - CORS_ORIGINS=${CORS_ORIGINS}
    volumes:
      - ./backend/uploads:/app/uploads
    restart: unless-stopped

  frontend:
    build: 
      context: ./frontend
      args:
        - REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - backend
      - frontend
    restart: unless-stopped
```

### Run with Docker

```bash
# Install Docker
sudo apt install -y docker.io docker-compose

# Create .env file for docker-compose
nano .env
```

**.env for Docker:**
```env
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net
DB_NAME=trusted_v_production
JWT_SECRET=your-secret-key
EMERGENT_LLM_KEY=your-key
CORS_ORIGINS=https://yourdomain.com
REACT_APP_BACKEND_URL=https://yourdomain.com
```

```bash
# Build and run
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## AWS Services Quick Reference

| Service | Purpose | Cost (Approx) |
|---------|---------|---------------|
| EC2 t2.micro | Server (Free tier eligible) | Free / $8-10/mo |
| EC2 t2.small | Server | ~$17/mo |
| EC2 t2.medium | Server (Production) | ~$34/mo |
| Route 53 | Domain DNS | $0.50/mo per zone |
| ACM | SSL Certificate | Free |
| MongoDB Atlas M0 | Database (Free tier) | Free |
| MongoDB Atlas M10 | Database (Production) | ~$57/mo |

---

## Deployment Checklist

- [ ] EC2 instance launched with correct security groups
- [ ] SSH access working
- [ ] Node.js, Python, Nginx installed
- [ ] MongoDB Atlas cluster created and configured
- [ ] Project files uploaded/cloned
- [ ] Backend dependencies installed (including emergentintegrations)
- [ ] Frontend built for production
- [ ] Environment variables configured
- [ ] PM2 running backend
- [ ] Nginx configured and running
- [ ] SSL certificate installed (for HTTPS)
- [ ] Application accessible via browser
- [ ] Admin login working

---

## Troubleshooting

### Backend not starting
```bash
pm2 logs trusted-v-backend --lines 100
cd /var/www/trusted-v/backend
source venv/bin/activate
python -c "import server"  # Check for import errors
```

### Nginx 502 Bad Gateway
```bash
# Check if backend is running
curl http://localhost:8001/api/health

# Check PM2
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### MongoDB Connection Issues
```bash
# Test connection from EC2
python3 -c "from pymongo import MongoClient; c = MongoClient('your-connection-string'); print(c.list_database_names())"
```

### Permission Issues
```bash
sudo chown -R ubuntu:ubuntu /var/www/trusted-v
chmod -R 755 /var/www/trusted-v
```

---

## Maintenance Commands

```bash
# Update application
cd /var/www/trusted-v
git pull origin main

# Rebuild frontend
cd frontend && yarn build

# Restart backend
pm2 restart trusted-v-backend

# View logs
pm2 logs

# Monitor resources
pm2 monit
htop
```

---

*Last Updated: December 2025*
