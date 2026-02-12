# TrusteD-V: AI-Powered RISC-V Embedded Development Platform

## Original Problem Statement
Build an AI coding platform for Embedded systems with RISC-V centric using RUST language.

## Platform Identity
- **Brand Name**: TrusteD-V
- **Tagline**: RISC-V Development Platform
- **IDE Name**: TrusteD-V Studio
- **Theme**: Bosch-inspired corporate aesthetic (Primary: #005691)

## Core Requirements
1. **AI-Powered Hardware Selection**: Analyze user prompts to suggest best hardware and peripherals from a database
2. **Middleware Selection**: Select appropriate middleware (e.g., RTOS) based on requirements
3. **Project Template Generation**: Generate base template projects (drivers, boot-loaders, etc.)
4. **Interactive UI**: Visual cards for hardware, checkboxes for middleware
5. **Project Versioning**: Download generated projects as versioned ZIP files
6. **Hardware Catalog**: Comprehensive catalog of supported RISC-V hardware
7. **Admin Panel**: Manage hardware, software components databases (NOT user management)
8. **User Self-Service**: Users manage their own accounts, projects, and versions

## User Personas
- **Embedded Developer**: Needs to quickly set up RISC-V projects with proper hardware/software combinations
- **Admin**: Manages platform databases (hardware, software components, IDE downloads)

## Tech Stack
- **Backend**: FastAPI, MongoDB, JWT Authentication
- **Frontend**: React, TailwindCSS, Shadcn/UI
- **Design Theme**: Bosch-inspired corporate aesthetic (Blue #005691, white/light gray backgrounds)

---

## What's Been Implemented

### ✅ Completed (Jan 22, 2025)

#### Smart Project Builder (NEW - AI Code Generation)
- **4-Step Workflow**: Describe → Hardware → Software → Generate
- **AI Code Generation**: Uses Gemini 3 Flash via Emergent LLM Key
- **Generated Files**: Complete Rust project structure
  - Cargo.toml with dependencies
  - memory.x linker script for selected hardware
  - .cargo/config.toml for target configuration
  - src/main.rs with peripheral initialization
  - src/lib.rs with board configuration
  - src/drivers/ with GPIO, UART drivers
  - README.md with setup instructions
- **ZIP Download**: Downloadable project packages
- **Project Versioning**: Track iterations as requirements change

#### Admin LLM Configuration (NEW)
- Configure AI provider (Gemini, OpenAI, Anthropic)
- Select model (Gemini 3 Flash, GPT-5.2, Claude Sonnet 4.5, etc.)
- Choose API key type (Emergent Key or Custom)
- Stored in database for easy switching

#### UI Redesign
- Implemented Bosch-inspired corporate design (Primary: #005691)
- Light theme with white/gray backgrounds
- Clean Inter typography, professional card layouts
- Mobile responsive navigation

#### Authentication System
- JWT-based user authentication
- User registration and login flows
- Admin role support
- Protected routes

#### Admin Panel (Database Management)
- **Dashboard**: Stats for Hardware, Middleware, Software Components, IDE Downloads
- **Hardware Management**: CRUD operations for RISC-V boards
- **Middleware Management**: CRUD for RTOS, frameworks
- **Software Components**: NEW - BSP, SDK, Driver, Bootloader, Library management
  - Filter by component type
  - Color-coded type badges
- **IDE Downloads**: NEW - Manage IDE versions for different platforms
- **NO User Management** - users manage their own accounts

#### User Account Settings (NEW)
- Profile editing (username, email)
- Password change
- Project statistics dashboard
- Account deletion with confirmation

#### Main Application Pages
- Landing page with features showcase
- Hardware Catalog with search
- IDE Downloads page
- Smart Project Builder (placeholder)
- My Projects page

---

## Prioritized Backlog

### P0 - Critical
- None currently (Core features implemented)

### P1 - High Priority
1. **Enhanced Code Templates**
   - Add more hardware-specific templates
   - Improve peripheral driver implementations
   - Add example applications

### P2 - Medium Priority
1. **Project Sharing & Collaboration**
   - Share projects with other users
   - Collaborative editing

2. **Real-time Code Preview**
   - Show generated code in UI before download
   - Syntax highlighting

### P3 - Future Enhancements
1. **IDE Integration** - Host actual IDE binaries
2. **CI/CD Integration** - Automated build pipelines
3. **Hardware Simulator** - In-browser RISC-V emulator
4. **Backend Refactoring** - Split server.py into modular routers

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
  "peripherals": [{"name": "string", "type": "string", "interface": "string"}]
}
```

### Software Components Collection (NEW)
```json
{
  "id": "string",
  "name": "string",
  "type": "RTOS|BSP|SDK|Driver|Bootloader|Framework|Library",
  "version": "string",
  "description": "string",
  "compatible_cores": ["string"],
  "compatible_hardware": ["string"],
  "features": ["string"],
  "download_url": "string",
  "documentation_url": "string",
  "created_at": "datetime"
}
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### User Account (Self-Service)
- `PUT /api/account/profile` - Update profile
- `PUT /api/account/password` - Change password
- `DELETE /api/account` - Delete own account
- `GET /api/account/projects/stats` - Get project statistics

### Public
- `GET /api/hardware` - List all hardware
- `GET /api/middleware` - List all middleware
- `GET /api/software-components` - List software components (with optional type filter)
- `GET /api/component-types` - Get valid component types
- `GET /api/ide-downloads` - List IDE downloads

### Admin (Database Management)
- `GET /api/admin/stats` - Get platform stats
- Hardware CRUD: POST/PUT/DELETE `/api/admin/hardware`
- Middleware CRUD: POST/PUT/DELETE `/api/admin/middleware`
- Software Components CRUD: POST/PUT/DELETE `/api/admin/software-components`
- IDE Downloads CRUD: POST/PUT/DELETE `/api/admin/ide-downloads`

---

## Test Credentials
- **Admin**: admin@trusted-v.com / admin123
- **Standard User**: Create via registration

## Key Files
- `/app/backend/server.py` - All backend APIs
- `/app/frontend/src/App.js` - Frontend routes
- `/app/frontend/src/pages/admin/AdminSoftware.jsx` - Software components management
- `/app/frontend/src/pages/AccountSettings.jsx` - User account settings
