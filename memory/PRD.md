# RV-RUST: AI-Powered RISC-V Embedded Development Platform

## Original Problem Statement
Build an AI coding platform for Embedded systems with RISC-V centric using RUST language.

## Core Requirements
1. **AI-Powered Hardware Selection**: Analyze user prompts to suggest best hardware and peripherals from a database
2. **Middleware Selection**: Select appropriate middleware (e.g., RTOS) based on requirements
3. **Project Template Generation**: Generate base template projects (drivers, boot-loaders, etc.)
4. **Interactive UI**: Visual cards for hardware, checkboxes for middleware
5. **Project Versioning**: Download generated projects as versioned ZIP files
6. **Hardware Catalog**: Comprehensive catalog of supported RISC-V hardware
7. **Admin Panel**: Manage hardware, middleware, and users

## User Personas
- **Embedded Developer**: Needs to quickly set up RISC-V projects with proper hardware/software combinations
- **Admin**: Manages platform content including hardware catalog and middleware options

## Tech Stack
- **Backend**: FastAPI, MongoDB, JWT Authentication
- **Frontend**: React, TailwindCSS, Shadcn/UI
- **Design Theme**: Bosch-inspired corporate aesthetic (Blue #005691, white/light gray backgrounds)

---

## What's Been Implemented

### ✅ Completed (Jan 22, 2025)

#### Authentication System
- JWT-based user authentication
- User registration and login flows
- Admin role support
- Protected routes for authenticated users

#### Admin Panel
- Dashboard with stats (Hardware, Middleware, Users, Projects)
- Hardware Management (CRUD operations)
- Middleware Management (CRUD operations)  
- User Management (view/delete users)

#### Main Application Pages
- Landing page with features showcase
- Hardware Catalog with search functionality
- IDE Downloads page
- Smart Project Builder (UI placeholder with AI chat interface)
- My Projects page

#### UI Redesign (Jan 22, 2025)
- Implemented Bosch-inspired corporate design
- Primary color: #005691 (Bosch Blue)
- Light theme with white/gray backgrounds
- Clean, minimal layouts
- Inter font for typography
- Mobile responsive navigation

### 🔧 Login Navigation Fix (Jan 22, 2025)
- Fixed login flow timing issue
- Navigation to /builder works correctly after login
- Auth state properly synchronized

---

## Prioritized Backlog

### P0 - Critical
- None currently

### P1 - High Priority
1. **Implement Interactive Smart Project Builder**
   - Connect AI chat to LLM for intelligent suggestions
   - Hardware/middleware selection with compatibility checking
   - Project configuration workflow

2. **Project ZIP Generation**
   - Generate downloadable project packages
   - Include selected drivers, bootloader, templates

### P2 - Medium Priority
1. **Project Versioning System**
   - Save/manage different versions of user projects
   - Version history and restore functionality

2. **Real AI Integration**
   - Integrate Emergent LLM key for prompt analysis
   - Intelligent hardware recommendations

### P3 - Future Enhancements
1. **Notification System**
   - Alert users when changes require hardware/software updates

2. **IDE Download Functionality**
   - Host and serve actual IDE binaries

3. **Backend Refactoring**
   - Split server.py into modular routers (auth, admin, projects)

---

## Database Schema

### Users Collection
```json
{
  "id": "string",
  "email": "string",
  "username": "string",
  "password_hash": "string",
  "is_admin": "boolean",
  "created_at": "datetime"
}
```

### Hardware Collection
```json
{
  "id": "string",
  "name": "string",
  "manufacturer": "string",
  "core": "string",
  "clock_speed": "string",
  "memory": "string",
  "flash": "string",
  "description": "string",
  "image_url": "string",
  "price": "string",
  "peripherals": [{"name": "string", "interface": "string"}]
}
```

### Middleware Collection
```json
{
  "id": "string",
  "name": "string",
  "type": "string",
  "version": "string",
  "description": "string",
  "compatible_cores": ["string"]
}
```

### Projects Collection
```json
{
  "id": "string",
  "user_id": "string",
  "name": "string",
  "description": "string",
  "hardware_id": "string",
  "middleware_ids": ["string"],
  "peripherals": ["string"],
  "requirements": "string",
  "versions": [{"version": "number", "generated_at": "datetime"}]
}
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Public
- `GET /api/hardware` - List all hardware
- `GET /api/middleware` - List all middleware
- `GET /api/middleware/compatible/{core}` - Get compatible middleware for core
- `GET /api/ide-downloads` - List IDE downloads

### Protected (User)
- `POST /api/chat` - AI chat endpoint
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/{id}/download/{version}` - Download project

### Admin
- `GET /api/admin/stats` - Get platform stats
- `GET /api/admin/users` - List all users
- `DELETE /api/admin/users/{id}` - Delete user
- `POST /api/admin/hardware` - Create hardware
- `PUT /api/admin/hardware/{id}` - Update hardware
- `DELETE /api/admin/hardware/{id}` - Delete hardware
- `POST /api/admin/middleware` - Create middleware
- `PUT /api/admin/middleware/{id}` - Update middleware
- `DELETE /api/admin/middleware/{id}` - Delete middleware

---

## Test Credentials
- **Admin**: admin@rvrust.com / admin123
- **Standard User**: Create via registration

---

## Key Files
- `/app/backend/server.py` - All backend APIs
- `/app/frontend/src/App.js` - Frontend routes
- `/app/frontend/src/index.css` - Design theme variables
- `/app/frontend/src/contexts/AuthContext.jsx` - Auth state management
- `/app/frontend/src/pages/SmartProjectBuilder.jsx` - Main builder UI
