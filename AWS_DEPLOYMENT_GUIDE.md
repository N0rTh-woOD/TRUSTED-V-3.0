# TrusteD-V Platform - AWS Deployment Guide
## With Self-Hosted MongoDB (Internal Database)

Complete guide to deploy the TrusteD-V platform on AWS with MongoDB running locally on your infrastructure.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      AWS EC2 Instance                        │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │   Nginx     │───▶│  Frontend   │    │    MongoDB      │  │
│  │  (Port 80)  │    │  (React)    │    │  (Port 27017)   │  │
│  └──────┬──────┘    └─────────────┘    └────────▲────────┘  │
│         │                                       │            │
│         │           ┌─────────────┐             │            │
│         └──────────▶│   Backend   │─────────────┘            │
│                     │  (FastAPI)  │                          │
│                     │  Port 8001  │                          │
│                     └─────────────┘                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │    Users     │
                    └──────────────┘
```

**Benefits of Self-Hosted MongoDB:**
- No external dependencies
- Data stays within your AWS infrastructure
- No additional costs (MongoDB Atlas charges)
- Full control over database configuration
- Better latency (same machine/network)

---

## Prerequisites

- AWS Account
- Domain name (optional but recommended)
- Basic Linux command line knowledge

---

## Step 1: Launch EC2 Instance

### 1.1 Go to AWS Console → EC2 → Launch Instance

### 1.2 Configuration:

| Setting | Value |
|---------|-------|
| **Name** | trusted-v-server |
| **AMI** | Ubuntu Server 22.04 LTS (64-bit) |
| **Instance Type** | t2.small (min) or t2.medium (recommended) |
| **Key Pair** | Create new or use existing |
| **Storage** | 30 GB gp3 (for app + database) |

### 1.3 Security Group (Inbound Rules):

| Type | Port | Source | Description |
|------|------|--------|-------------|
| SSH | 22 | Your IP | SSH access |
| HTTP | 80 | 0.0.0.0/0 | Web traffic |
| HTTPS | 443 | 0.0.0.0/0 | Secure web traffic |
| Custom TCP | 8001 | 0.0.0.0/0 | API (optional, for debugging) |

> **Note:** MongoDB port 27017 is NOT exposed to internet - it's only accessible locally.

### 1.4 Launch the Instance

---

## Step 2: Connect to EC2

```bash
# Set permissions for key file
chmod 400 your-key.pem

# Connect via SSH
ssh -i your-key.pem ubuntu@<your-ec2-public-ip>
```

---

## Step 3: Run Initial Setup Script

Copy and run this script on your EC2 instance:

```bash
# Download and run setup script
curl -O https://raw.githubusercontent.com/your-repo/scripts/ec2-setup.sh
chmod +x ec2-setup.sh
./ec2-setup.sh
```

Or run these commands manually:

```bash
#!/bin/bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install MongoDB 7.0
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
sudo npm install -g yarn

# Install Python 3.11
sudo apt install -y python3.11 python3.11-venv python3-pip

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Install Git
sudo apt install -y git

# Verify MongoDB is running
sudo systemctl status mongod
```

---

## Step 4: Configure MongoDB

### 4.1 Create Database User (Optional but Recommended)

```bash
# Connect to MongoDB shell
mongosh

# In MongoDB shell:
use admin
db.createUser({
  user: "trustedv_admin",
  pwd: "your-secure-password-here",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
})

# Create application database and user
use trusted_v_db
db.createUser({
  user: "trustedv_app",
  pwd: "your-app-password-here",
  roles: [{ role: "readWrite", db: "trusted_v_db" }]
})

exit
```

### 4.2 Enable MongoDB Authentication (Optional)

```bash
sudo nano /etc/mongod.conf
```

Add/modify these lines:
```yaml
security:
  authorization: enabled

net:
  port: 27017
  bindIp: 127.0.0.1  # Only allow local connections
```

Restart MongoDB:
```bash
sudo systemctl restart mongod
```

### 4.3 Verify MongoDB is Running

```bash
sudo systemctl status mongod
mongosh --eval "db.serverStatus().ok"
```

---

## Step 5: Setup Application Directory

```bash
# Create app directory
sudo mkdir -p /var/www/trusted-v
sudo chown -R ubuntu:ubuntu /var/www/trusted-v
cd /var/www/trusted-v

# Clone your repository
git clone <your-repo-url> .

# Or upload via SCP from local machine:
# scp -i your-key.pem -r ./* ubuntu@<ec2-ip>:/var/www/trusted-v/
```

---

## Step 6: Setup Backend

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
```

### 6.1 Create Backend Environment File

```bash
nano /var/www/trusted-v/backend/.env
```

**Content (WITHOUT authentication):**
```env
# MongoDB - Local Instance (No Auth)
MONGO_URL=mongodb://localhost:27017
DB_NAME=trusted_v_db

# Security
JWT_SECRET=generate-a-64-character-random-string-here-use-openssl-rand-hex-32

# CORS - Update with your domain
CORS_ORIGINS=https://yourdomain.com,http://yourdomain.com,http://localhost

# Emergent LLM Key (for AI features)
EMERGENT_LLM_KEY=your-emergent-api-key
```

**Content (WITH authentication):**
```env
# MongoDB - Local Instance (With Auth)
MONGO_URL=mongodb://trustedv_app:your-app-password-here@localhost:27017/trusted_v_db?authSource=trusted_v_db
DB_NAME=trusted_v_db

# Security
JWT_SECRET=generate-a-64-character-random-string-here-use-openssl-rand-hex-32

# CORS
CORS_ORIGINS=https://yourdomain.com,http://yourdomain.com

# Emergent LLM Key
EMERGENT_LLM_KEY=your-emergent-api-key
```

**Generate JWT Secret:**
```bash
openssl rand -hex 32
```

---

## Step 7: Setup Frontend

```bash
cd /var/www/trusted-v/frontend

# Install dependencies
yarn install

# Create environment file
nano .env
```

**Frontend .env content:**
```env
REACT_APP_BACKEND_URL=https://yourdomain.com
# Or for IP-based: REACT_APP_BACKEND_URL=http://<ec2-public-ip>
```

**Build for production:**
```bash
yarn build
```

---

## Step 8: Configure PM2 (Process Manager)

```bash
cd /var/www/trusted-v

# Create PM2 config
nano ecosystem.config.js
```

**Content:**
```javascript
module.exports = {
  apps: [
    {
      name: 'trusted-v-backend',
      cwd: '/var/www/trusted-v/backend',
      script: 'venv/bin/uvicorn',
      args: 'server:app --host 127.0.0.1 --port 8001',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
    },
  ],
};
```

**Start the backend:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
# Copy and run the command it outputs
```

---

## Step 9: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/trusted-v
```

**Content:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    # For IP-based: server_name _;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Frontend
    root /var/www/trusted-v/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8001/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
        client_max_body_size 100M;
    }

    # Uploaded files
    location /uploads/ {
        alias /var/www/trusted-v/backend/uploads/;
    }
}
```

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/trusted-v /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

---

## Step 10: Setup SSL (HTTPS)

```bash
# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## Step 11: Verify Deployment

```bash
# Check all services
sudo systemctl status mongod
pm2 status
sudo systemctl status nginx

# Test MongoDB
mongosh --eval "db.serverStatus().ok"

# Test Backend
curl http://localhost:8001/api/health

# Test from browser
# http://your-ec2-ip or https://yourdomain.com
```

---

## Database Backup & Restore

### Backup MongoDB

```bash
# Create backup directory
mkdir -p /var/backups/mongodb

# Backup entire database
mongodump --db trusted_v_db --out /var/backups/mongodb/$(date +%Y%m%d)

# Backup with authentication
mongodump --db trusted_v_db --username trustedv_app --password your-password --authenticationDatabase trusted_v_db --out /var/backups/mongodb/$(date +%Y%m%d)
```

### Restore MongoDB

```bash
# Restore database
mongorestore --db trusted_v_db /var/backups/mongodb/20250101/trusted_v_db

# Restore with authentication
mongorestore --db trusted_v_db --username trustedv_app --password your-password --authenticationDatabase trusted_v_db /var/backups/mongodb/20250101/trusted_v_db
```

### Automated Backups (Cron)

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * mongodump --db trusted_v_db --out /var/backups/mongodb/$(date +\%Y\%m\%d) && find /var/backups/mongodb -mtime +7 -delete
```

---

## Monitoring & Logs

### View Logs

```bash
# Backend logs
pm2 logs trusted-v-backend

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Monitor Resources

```bash
# PM2 monitoring
pm2 monit

# System resources
htop

# Disk usage
df -h

# MongoDB stats
mongosh --eval "db.stats()"
```

---

## Troubleshooting

### MongoDB Won't Start

```bash
# Check status
sudo systemctl status mongod

# Check logs
sudo tail -50 /var/log/mongodb/mongod.log

# Check permissions
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown -R mongodb:mongodb /var/log/mongodb

# Restart
sudo systemctl restart mongod
```

### Backend Connection Error

```bash
# Test MongoDB connection
mongosh --eval "db.adminCommand('ping')"

# Check backend logs
pm2 logs trusted-v-backend --lines 50

# Verify environment variables
cat /var/www/trusted-v/backend/.env
```

### 502 Bad Gateway

```bash
# Check if backend is running
pm2 status
curl http://localhost:8001/api/health

# Restart backend
pm2 restart trusted-v-backend
```

---

## Quick Commands Reference

```bash
# Start all services
sudo systemctl start mongod
pm2 start all
sudo systemctl start nginx

# Stop all services
pm2 stop all
sudo systemctl stop nginx
sudo systemctl stop mongod

# Restart all services
sudo systemctl restart mongod
pm2 restart all
sudo systemctl restart nginx

# View status
sudo systemctl status mongod && pm2 status && sudo systemctl status nginx

# Deploy updates
cd /var/www/trusted-v
git pull
cd frontend && yarn build
pm2 restart trusted-v-backend
```

---

## Security Checklist

- [ ] MongoDB only listening on localhost (127.0.0.1)
- [ ] MongoDB authentication enabled
- [ ] Strong passwords for database users
- [ ] JWT_SECRET is a strong random string
- [ ] SSL/HTTPS enabled
- [ ] Security groups properly configured
- [ ] Regular backups configured
- [ ] System updates applied

---

## Estimated Costs (AWS)

| Resource | Type | Monthly Cost |
|----------|------|--------------|
| EC2 | t2.micro (free tier) | $0 (first year) |
| EC2 | t2.small | ~$17 |
| EC2 | t2.medium | ~$34 |
| EBS Storage | 30 GB gp3 | ~$2.50 |
| Data Transfer | First 100 GB | Free |
| **Total (t2.small)** | | **~$20/month** |

---

*Last Updated: December 2025*
