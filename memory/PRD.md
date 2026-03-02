# TrusteD-V Platform - Product Requirements Document

## Overview
**TrusteD-V** is an AI-powered development platform for building secure embedded systems with RISC-V architecture and Rust programming language, focused on the Indian RISC-V ecosystem with a Bosch subsidiary association.

## Original Problem Statement
Build an "AI coding platform for Embedded systems with RISC-V centric using RUST language" that:
- Analyzes user prompts to suggest the best hardware and peripherals
- Selects appropriate middleware (e.g., RTOS)
- Generates base template projects (drivers, boot-loaders, etc.)
- Allows users to download generated projects as versioned ZIP files
- Provides a professional, interactive, user-friendly UI (Bosch-inspired)
- Includes admin panel to manage hardware/software catalogs
- Focuses on Indian RISC-V companies - specifically Mindgrove and C-DAC only
- Conveys Bosch association subtly through branding without explicit mention

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

### Phase 2: Hardware Catalog - Mindgrove & C-DAC Only ✓
- [x] Hardware catalog with only supported RISC-V boards:
  **C-DAC Boards:**
  - ARIES V3.0 - ₹2,500 (VEGA ET1031 32-bit)
  - ARIES IoT v2 - ₹1,800 (VEGA RISC-V 32-bit)
  - VEGA DHRUV64 Evaluation - ₹25,000 (Dual-Core 64-bit)
  
  **Mindgrove Boards:**
  - Mindgrove Secure IoT SoC - ₹4,500 (32-bit with Crypto Engine)
  - Mindgrove Vision SoC Dev Kit - ₹18,000 (64-bit with Vision NPU)
  - Mindgrove Industrial SoC - ₹6,500 (32-bit Industrial Grade)
- [x] Software components (Shakti BSP, VEGA SDK, etc.)

### Phase 3: Partner Ecosystem Focus ✓
- [x] Partners page transformed to "Become a Partner" focus
- [x] Partnership opportunities (Hardware, Software, Enterprise, Academic)
- [x] Partnership process (Application → Review → Agreement → Launch)
- [x] Partner registration form
- [x] No partners listed (TrusteD-V is building the ecosystem)

### Phase 4: IDE Binary Upload ✓
- [x] Admin can upload IDE binaries for Windows/Mac/Linux
- [x] File upload API with progress tracking
- [x] Public download page shows "Coming Soon" until binary uploaded
- [x] Supported formats: .exe, .dmg, .pkg, .deb, .rpm, .tar.gz, .zip, .AppImage

### Phase 5: Professional UI with Bosch Branding ✓
- [x] Bosch-inspired design (white background, blue primary)
- [x] Red accent border at top of all pages
- [x] Bosch logo subtly integrated in navigation header
- [x] Bosch logo in footer (conveys association without explicit mention)
- [x] Full HD (1920x1080) layout support
- [x] Professional navigation with mobile responsiveness
- [x] Clean login page (no credentials displayed)

## Page Structure

### Public Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero, features, C-DAC & Mindgrove ecosystem |
| `/about` | About | Mission, vision, technology stack |
| `/product-suite` | Products | Development tools, SDKs |
| `/developer-portal` | Developer Portal | Documentation, SDKs |
| `/hardware-catalog` | Hardware | C-DAC and Mindgrove boards only |
| `/partners` | Partner With Us | How to become a partner |
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
| `/admin/hardware` | Hardware | CRUD for boards |
| `/admin/middleware` | Middleware | RTOS and frameworks |
| `/admin/software` | Software | BSPs, SDKs |
| `/admin/ide` | IDE Downloads | Upload binaries |
| `/admin/llm` | LLM Settings | AI configuration |

## API Endpoints

### Public
- `GET /api/hardware` - C-DAC and Mindgrove boards only (6 total)
- `GET /api/middleware` - RTOS options
- `GET /api/ide-downloads` - IDE versions
- `GET /api/ide-downloads/{id}/download` - Download binary (if available)

### Admin (Requires Admin Token)
- `POST /api/admin/ide-downloads/{id}/upload` - Upload IDE binary
- CRUD for hardware, middleware, software, IDE

## Key Design Decisions
1. **Bosch Association**: Logo placed subtly in header and footer - conveys corporate backing without explicit text
2. **Hardware Focus**: Only Mindgrove and C-DAC chips supported - these are the current working partners
3. **Partner Strategy**: Page focuses on "how to become a partner" rather than listing partners
4. **Full HD Support**: Layout expands properly on 1920x1080 screens with wider max-width

## Deployment
- **AWS Ready**: Environment variables, no hardcoded values
- **CI/CD Compatible**: Standard build commands
- **Frontend**: `yarn build`
- **Backend**: `pip install -r requirements.txt`

## Future Tasks (Prioritized)
- [ ] **P0**: Refactor server.py into FastAPI routers (auth, admin, projects, ide)
- [ ] **P1**: Complete "Solution Builder" AI code generation refinement
- [ ] **P2**: Add company logo upload in admin settings
- [ ] **P3**: Project versioning UI enhancements
- [ ] **P4**: Notification system for project updates

## Testing
- Backend: 15 pytest tests - 100% passing
- Frontend: 41 Playwright E2E tests - 100% passing
- Last test run: December 2025

---
*Last Updated: December 2025*
