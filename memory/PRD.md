# TrusteD-V Platform - Product Requirements Document

## Overview
**TrusteD-V** is an AI-powered development platform for building secure embedded systems with RISC-V architecture and Rust programming language, focused on the Indian RISC-V ecosystem.

## Original Problem Statement
Build an "AI coding platform for Embedded systems with RISC-V centric using RUST language" that:
- Analyzes user prompts to suggest the best hardware and peripherals
- Selects appropriate middleware (e.g., RTOS)
- Generates base template projects (drivers, boot-loaders, etc.)
- Allows users to download generated projects as versioned ZIP files
- Provides a professional, interactive, user-friendly UI (Bosch-inspired)
- Includes admin panel to manage hardware/software catalogs
- Focuses on Indian RISC-V companies and hardware

## Tech Stack
- **Backend**: FastAPI, MongoDB (motor), Pydantic, JWT authentication
- **Frontend**: React 18, React Router, TailwindCSS, Shadcn/UI components
- **AI Integration**: Gemini 3 Flash via Emergent LLM Key (emergentintegrations)
- **Design System**: Bosch-inspired (white background, blue primary, red accent border)

## Credentials (CONFIDENTIAL - NOT DISPLAYED ON PLATFORM)
- **Admin**: admin@trusted-v.com / bosch@2425
- **Sample Users**: (created but not displayed anywhere)
  - developer@example.com / dev@12345
  - engineer@example.com / eng@12345
  - tester@example.com / test@12345

## Implemented Features (as of Dec 2025)

### Phase 1: Core Platform ✓
- [x] JWT-based authentication (login/register)
- [x] User account management (profile, password change)
- [x] Admin dashboard with database management
- [x] MongoDB integration for data persistence
- [x] Credentials hidden from login page

### Phase 2: Indian RISC-V Hardware ✓
- [x] Hardware catalog with only Indian RISC-V boards:
  - ARIES V3.0 (C-DAC) - ₹2,500
  - ARIES IoT (C-DAC) - ₹1,800
  - Shakti E-Class Board (IIT Madras / InCore) - ₹3,500
  - Shakti C-Class Arty (IIT Madras / InCore) - ₹15,000
  - VEGA DHRUV64 Evaluation (C-DAC) - ₹25,000
  - IRIS Development Kit (ISRO / IIT Madras) - ₹50,000
- [x] Software components (Shakti BSP, VEGA SDK, etc.)

### Phase 3: Indian Partners ✓
- [x] Partners page with Indian companies:
  - **Semiconductor**: InCore Semiconductors, Mindgrove Technologies, 3rdiTech, Netrasemi, BigEndian
  - **Government**: C-DAC, ISRO, SCL Chandigarh
  - **Academic**: IIT Madras (Shakti), IIT Bombay, IIIT Hyderabad
  - **Integrators**: Tata Advanced Systems, IGCAR
- [x] Government initiatives section (DIR-V, C2S, DLI)
- [x] Partner registration form

### Phase 4: IDE Binary Upload ✓
- [x] Admin can upload IDE binaries for Windows/Mac/Linux
- [x] File upload API with progress tracking
- [x] Public download page shows "Coming Soon" until binary uploaded
- [x] Supported formats: .exe, .dmg, .pkg, .deb, .rpm, .tar.gz, .zip, .AppImage

### Phase 5: Professional UI ✓
- [x] Bosch-inspired design (white background, blue primary)
- [x] Red accent border at top of all pages
- [x] Professional navigation with mobile responsiveness
- [x] Clean login page (no credentials displayed)
- [x] All pages professionally designed

## Page Structure

### Public Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero, features, Indian partners |
| `/about` | About | Mission, vision, technology stack |
| `/product-suite` | Products | Development tools, SDKs |
| `/developer-portal` | Developer Portal | Documentation, SDKs |
| `/hardware-catalog` | Hardware | Indian RISC-V boards only |
| `/partners` | Partners | Indian companies only |
| `/partner-registration` | Partner Registration | Application form |
| `/download-ide` | IDE Downloads | Binary download (when available) |
| `/blog` | Blog | Technical articles |
| `/login` | Login | Authentication (no credentials shown) |
| `/register` | Register | New account creation |

### Protected Pages (Authenticated Users Only)
| Route | Page | Description |
|-------|------|-------------|
| `/solution-builder` | Solution Builder | AI-powered project generation |
| `/projects` | My Projects | User's project dashboard |
| `/account` | Account Settings | Profile management |

### Admin Pages (Admin Only)
| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Dashboard | Stats and quick links |
| `/admin/hardware` | Hardware | CRUD for Indian boards |
| `/admin/middleware` | Middleware | RTOS and frameworks |
| `/admin/software` | Software | BSPs, SDKs |
| `/admin/ide` | IDE Downloads | Upload binaries |
| `/admin/llm` | LLM Settings | AI configuration |

## API Endpoints

### Public
- `GET /api/hardware` - Indian RISC-V boards
- `GET /api/middleware` - RTOS options
- `GET /api/ide-downloads` - IDE versions
- `GET /api/ide-downloads/{id}/download` - Download binary (if available)

### Admin (Requires Admin Token)
- `POST /api/admin/ide-downloads/{id}/upload` - Upload IDE binary
- CRUD for hardware, middleware, software, IDE

## Deployment
- **AWS Ready**: Environment variables, no hardcoded values
- **CI/CD Compatible**: Standard build commands
- **Frontend**: `yarn build`
- **Backend**: `pip install -r requirements.txt`

## Future Tasks
- [ ] Add more Indian RISC-V boards as they become available
- [ ] Integrate with DIR-V program APIs
- [ ] Add company logo upload in admin settings
- [ ] Refactor server.py into routers

---
*Last Updated: December 2025*
