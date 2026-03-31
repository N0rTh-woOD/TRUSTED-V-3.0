# TrusteD-V Platform - Local Development Setup Guide

Complete guide to run the TrusteD-V RISC-V + Rust Development Platform locally.

---

## Prerequisites

### 1. Node.js (v18 or higher)
```bash
# Check if installed
node --version
npm --version

# Install on Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install on macOS (using Homebrew)
brew install node

# Install on Windows
# Download from https://nodejs.org/
```

### 2. Python (v3.9 or higher)
```bash
# Check if installed
python3 --version
pip3 --version

# Install on Ubuntu/Debian
sudo apt-get install python3 python3-pip python3-venv

# Install on macOS
brew install python3

# Install on Windows
# Download from https://www.python.org/downloads/
```

### 3. MongoDB (v6.0 or higher)
```bash
# Option A: Install MongoDB locally
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# macOS
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0

# Windows
# Download from https://www.mongodb.com/try/download/community

# Option B: Use MongoDB Atlas (Cloud - Free Tier)
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create a free cluster
# 3. Get connection string
```

### 4. Yarn (Package Manager)
```bash
# Install Yarn globally
npm install -g yarn

# Verify installation
yarn --version
```

---

## Project Structure

```
trusted-v/
├── backend/
│   ├── .env                 # Backend environment variables
│   ├── requirements.txt     # Python dependencies
│   ├── server.py           # FastAPI application
│   └── uploads/            # Uploaded IDE binaries
│       └── ide/
├── frontend/
│   ├── .env                # Frontend environment variables
│   ├── package.json        # Node.js dependencies
│   ├── public/
│   │   ├── bosch-logo.png
│   │   └── team/           # Team member photos
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── pages/
│       └── App.js
└── README.md
```

---

## Step-by-Step Setup

### Step 1: Clone/Download the Project

```bash
# If using Git
git clone <your-repository-url>
cd trusted-v

# Or download and extract the ZIP file
```

### Step 2: Setup MongoDB

#### Option A: Local MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod

# Verify it's running
sudo systemctl status mongod

# MongoDB will be available at: mongodb://localhost:27017
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free M0 cluster
3. Create a database user with password
4. Get connection string (looks like): 
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 3: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
.\venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Create uploads directory
mkdir -p uploads/ide
```

### Step 4: Configure Backend Environment Variables

Create or edit `backend/.env`:

```env
# MongoDB Connection
MONGO_URL=mongodb://localhost:27017
DB_NAME=trusted_v_db

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# LLM Integration (Optional - for AI features)
EMERGENT_API_KEY=your-emergent-api-key-if-available
```

**For MongoDB Atlas, use:**
```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
DB_NAME=trusted_v_db
```

### Step 5: Setup Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Install Node.js dependencies
yarn install
```

### Step 6: Configure Frontend Environment Variables

Create or edit `frontend/.env`:

```env
# Backend API URL (for local development)
REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## Running the Application

### Terminal 1: Start MongoDB (if local)
```bash
# MongoDB should already be running as a service
# If not:
sudo systemctl start mongod

# Or run manually:
mongod --dbpath /var/lib/mongodb
```

### Terminal 2: Start Backend Server
```bash
cd backend

# Activate virtual environment
source venv/bin/activate  # Linux/macOS
# .\venv\Scripts\activate  # Windows

# Run FastAPI server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# You should see:
# INFO:     Uvicorn running on http://0.0.0.0:8001
# INFO:     Started reloader process
```

### Terminal 3: Start Frontend Server
```bash
cd frontend

# Run React development server
yarn start

# You should see:
# Compiled successfully!
# Local:            http://localhost:3000
```

---

## Accessing the Application

### URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs (Swagger UI)

### Default Credentials
```
Admin Account:
Email: admin@trusted-v.com
Password: bosch@2425

Sample User Accounts:
Email: developer@example.com
Password: dev@12345

Email: engineer@example.com
Password: eng@12345
```

---

## Database Seeding

The database is automatically seeded with sample data when the backend starts for the first time. This includes:

- Admin user
- Sample users
- Hardware catalog (C-DAC and Mindgrove boards)
- Middleware options (RTOS)
- Software components
- IDE download entries

To reset the database:
```bash
# Connect to MongoDB
mongosh

# Drop the database
use trusted_v_db
db.dropDatabase()

# Restart the backend server to re-seed
```

---

## Troubleshooting

### Backend Issues

**1. MongoDB Connection Error**
```
Error: Connection refused to localhost:27017
```
Solution:
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

**2. Module Not Found Error**
```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

**3. Port Already in Use**
```bash
# Find process using port 8001
lsof -i :8001

# Kill the process
kill -9 <PID>
```

### Frontend Issues

**1. Node Modules Issues**
```bash
# Remove node_modules and reinstall
rm -rf node_modules
yarn install
```

**2. Port 3000 Already in Use**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or run on different port
PORT=3001 yarn start
```

**3. CORS Errors**
Make sure backend is running and `REACT_APP_BACKEND_URL` is correctly set in `frontend/.env`

### Database Issues

**1. View Database Contents**
```bash
mongosh
use trusted_v_db
show collections
db.users.find().pretty()
db.hardware.find().pretty()
```

**2. Reset Specific Collection**
```bash
mongosh
use trusted_v_db
db.users.drop()
# Restart backend to re-seed
```

---

## Development Workflow

### Making Backend Changes
- Edit files in `backend/`
- Server auto-reloads with `--reload` flag
- Check terminal for errors

### Making Frontend Changes
- Edit files in `frontend/src/`
- Browser auto-refreshes (Hot Reload)
- Check browser console for errors

### Adding Team Member Photos
1. Place photos in `frontend/public/team/`
2. Name format: `firstname.jpg` (lowercase)
3. Example: `yashwanth.jpg`, `sriram.jpg`

---

## Production Build

### Build Frontend for Production
```bash
cd frontend
yarn build

# Output will be in frontend/build/
```

### Run Backend in Production
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --workers 4
```

---

## Environment Variables Reference

### Backend (`backend/.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| MONGO_URL | MongoDB connection string | `mongodb://localhost:27017` |
| DB_NAME | Database name | `trusted_v_db` |
| JWT_SECRET | Secret key for JWT tokens | `your-secret-key` |
| EMERGENT_API_KEY | API key for LLM features | `ek_xxxx` |

### Frontend (`frontend/.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_BACKEND_URL | Backend API URL | `http://localhost:8001` |

---

## Quick Start Commands

```bash
# One-liner to start everything (after initial setup)

# Terminal 1 - Backend
cd backend && source venv/bin/activate && uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Terminal 2 - Frontend
cd frontend && yarn start
```

---

## Support

For issues or questions:
- Check the troubleshooting section above
- Review backend logs in terminal
- Check browser developer console for frontend errors
- Verify all environment variables are set correctly

---

*Last Updated: December 2025*
