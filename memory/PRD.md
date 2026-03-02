# TrusteD-V Platform - Product Requirements Document

## Overview
**TrusteD-V** is an AI-powered development platform for building secure embedded systems with RISC-V architecture and Rust programming language. The platform provides tools, SDKs, and AI-assisted code generation for developing production-ready embedded applications.

## Original Problem Statement
Build an "AI coding platform for Embedded systems with RISC-V centric using RUST language" that:
- Analyzes user prompts to suggest the best hardware and peripherals
- Selects appropriate middleware (e.g., RTOS)
- Generates base template projects (drivers, boot-loaders, etc.)
- Allows users to download generated projects as versioned ZIP files
- Provides a professional, interactive, user-friendly UI
- Includes admin panel to manage hardware/software catalogs and user accounts

## Tech Stack
- **Backend**: FastAPI, MongoDB (motor), Pydantic, JWT authentication
- **Frontend**: React 18, React Router, TailwindCSS, Shadcn/UI components
- **AI Integration**: Gemini 3 Flash via Emergent LLM Key (emergentintegrations)
- **Design System**: Bosch-inspired professional theme (white background, blue primary, red accent border)

## Current Credentials
- **Admin**: admin@trusted-v.com / bosch@2425

## Implemented Features (as of Dec 2025)

### Phase 1: Core Platform ✓
- [x] JWT-based authentication (login/register)
- [x] User account management (profile, password change)
- [x] Admin dashboard with database management
- [x] MongoDB integration for data persistence

### Phase 2: Content Management ✓
- [x] Hardware catalog with RISC-V development boards
- [x] Software components database (RTOS, BSPs, SDKs, Drivers)
- [x] Middleware management (FreeRTOS, Zephyr, Embassy, RT-Thread)
- [x] IDE downloads management for Windows/macOS/Linux

### Phase 3: AI-Powered Features ✓
- [x] Smart Project Builder with AI code generation
- [x] Hardware recommendation engine
- [x] Project versioning and ZIP download
- [x] Configurable LLM settings (admin-managed)

### Phase 4: Professional UI Redesign ✓
- [x] Bosch-inspired design system
- [x] Red accent border at top of all pages
- [x] Professional navigation with mobile responsiveness
- [x] White background with blue primary colors
- [x] Inter font family for professional typography

### Phase 5: New Pages & Features ✓
- [x] Landing page with hero section and feature cards
- [x] About page with mission/vision/values
- [x] Product Suite page with categorized offerings
- [x] Developer Portal with SDKs and resources
- [x] Enhanced Hardware Catalog with filtering
- [x] Partners page with partner network
- [x] Partner Registration form
- [x] IDE Downloads page with platform support
- [x] Technical Blog with articles

## Page Structure

### Public Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero, features, stats, CTA |
| `/about` | About | Mission, vision, technology stack |
| `/product-suite` | Products | Development tools, SDKs, middleware |
| `/developer-portal` | Developer Portal | Documentation, SDKs, community |
| `/hardware-catalog` | Hardware | RISC-V board catalog with filters |
| `/partners` | Partners | Partner network showcase |
| `/partner-registration` | Partner Registration | Application form |
| `/download-ide` | IDE Downloads | Windows/macOS/Linux downloads |
| `/blog` | Blog | Technical articles and tutorials |
| `/login` | Login | Authentication |
| `/register` | Register | New account creation |

### Protected Pages (Authenticated)
| Route | Page | Description |
|-------|------|-------------|
| `/solution-builder` | Solution Builder | AI-powered project generation |
| `/projects` | My Projects | User's project dashboard |
| `/account` | Account Settings | Profile and password management |

### Admin Pages
| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Dashboard | Stats and quick links |
| `/admin/hardware` | Hardware Management | CRUD for RISC-V boards |
| `/admin/middleware` | Middleware Management | RTOS and frameworks |
| `/admin/software` | Software Components | BSPs, SDKs, drivers |
| `/admin/ide` | IDE Downloads | Manage IDE binaries |
| `/admin/llm` | LLM Settings | AI provider configuration |

## Hardware Database
Real RISC-V boards currently in catalog:
1. SiFive HiFive1 Rev B (RISC-V E31, 320 MHz)
2. Kendryte K210 (Dual Core 64-bit, 400 MHz, AI accelerator)
3. ESP32-C3 (Single Core 32-bit, WiFi/BLE)
4. StarFive VisionFive 2 (Quad Core 64-bit, 1.5 GHz)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Public APIs
- `GET /api/hardware` - List all hardware
- `GET /api/middleware` - List middleware options
- `GET /api/ide-downloads` - List IDE downloads

### Protected APIs
- `POST /api/projects/generate` - Generate project with AI
- `GET /api/projects` - User's projects
- `GET /api/projects/{id}/download` - Download project ZIP
- `PUT /api/users/me` - Update profile
- `DELETE /api/users/me` - Delete account

### Admin APIs
- `GET/POST /api/admin/hardware` - Manage hardware
- `GET/POST /api/admin/middleware` - Manage middleware
- `GET/POST /api/admin/software` - Manage software
- `GET/POST /api/admin/ide-downloads` - Manage IDE downloads
- `GET/POST /api/admin/llm-settings` - Configure LLM

## Test Results (Latest)
- **Backend**: 100% (15/15 tests passed)
- **Frontend**: 100% (25/25 E2E tests passed)
- **Test files**: `/app/backend/tests/test_api.py`, `/app/tests/e2e/`

## Deployment Considerations
- AWS Amplify / EC2 compatible
- Environment variables managed via .env files
- MongoDB Atlas for production database
- CI/CD ready with GitHub integration

## Pending/Future Tasks

### P1 - High Priority
- [ ] Add file upload for IDE binaries (admin)
- [ ] Implement actual IDE download functionality
- [ ] Add more RISC-V hardware to catalog

### P2 - Medium Priority
- [ ] Refactor server.py into separate routers
- [ ] Enhance project versioning UI
- [ ] Add notification system

### P3 - Low Priority/Backlog
- [ ] Web IDE integration
- [ ] User project sharing
- [ ] Community forum integration
- [ ] ISO 26262 certification workflow

---
*Last Updated: December 2025*
