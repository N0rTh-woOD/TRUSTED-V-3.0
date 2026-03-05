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
- **Site-wide authentication lock** - requires user login to access platform during development

## Tech Stack
- **Backend**: FastAPI, MongoDB (motor), Pydantic, JWT authentication
- **Frontend**: React 18, React Router, TailwindCSS, Shadcn/UI components
- **AI Integration**: Gemini 3 Flash via Emergent LLM Key (emergentintegrations)
- **Design System**: Bosch-inspired (white background, blue primary, red accent border)

## Credentials
- **Admin**: admin@trusted-v.com / bosch@2425
- **Sample Users**: 
  - developer@example.com / dev@12345
  - engineer@example.com / eng@12345
  - tester@example.com / test@12345

## Implemented Features (as of Dec 2025)

### Phase 1: Core Platform ✓
- [x] JWT-based authentication (login/register)
- [x] User account management (profile, password change)
- [x] Admin dashboard with database management
- [x] MongoDB integration for data persistence
- [x] **Site-wide authentication lock** - all pages require login during development

### Phase 2: Professional Branding ✓
- [x] **TrusteD-V Logo** - Professional shield icon with chip design
- [x] **"RISC-V × Rust Platform"** tagline
- [x] **Rust prominently featured** - Benefits section, orange badges, code examples
- [x] **RISC-V prominently featured** - Blue badges, architecture diagrams
- [x] **Bosch logo** - Subtle placement on far right of header (next to Sign In/Logout)
- [x] **Clean login page** - No development mode banner, regular sign-in flow
- [x] Full HD (1920px) layout support
- [x] Mobile responsive header with hamburger menu

### Phase 3: Hardware Catalog - Mindgrove & C-DAC Only ✓
- [x] Hardware catalog with only supported RISC-V boards:
  **C-DAC Boards:**
  - ARIES V3.0 - ₹2,500 (VEGA ET1031 32-bit)
  - ARIES IoT v2 - ₹1,800 (VEGA RISC-V 32-bit)
  - VEGA DHRUV64 Evaluation - ₹25,000 (Dual-Core 64-bit)
  
  **Mindgrove Boards:**
  - Mindgrove Secure IoT SoC - ₹4,500 (32-bit with Crypto Engine)
  - Mindgrove Vision SoC Dev Kit - ₹18,000 (64-bit with Vision NPU)
  - Mindgrove Industrial SoC - ₹6,500 (32-bit Industrial Grade)

### Phase 4: Partner Ecosystem Focus ✓
- [x] Partners page transformed to "Become a Partner" focus
- [x] Partnership opportunities (Hardware, Software, Enterprise, Academic)
- [x] Partnership process (Application → Review → Agreement → Launch)
- [x] Partner registration form

### Phase 5: IDE Binary Management ✓
- [x] Admin can upload IDE binaries for Windows/Mac/Linux
- [x] Public download page shows "Coming Soon" until binary uploaded

## Page Structure

### Public Pages (Require Authentication when SITE_LOCK_ENABLED=true)
| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero with Rust/RISC-V highlights, features |
| `/about` | About | Mission, vision, technology stack |
| `/product-suite` | Products | Development tools, SDKs |
| `/developer-portal` | Developer Portal | Documentation, SDKs |
| `/hardware-catalog` | Hardware | C-DAC and Mindgrove boards only |
| `/partners` | Partner With Us | How to become a partner |
| `/partner-registration` | Partner Registration | Application form |
| `/download-ide` | IDE Downloads | Binary download (when available) |
| `/blog` | Blog | Technical articles |

### Auth Pages (Always Accessible)
| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Simple sign-in (no dev mode banner) |
| `/register` | Register | New account creation |

### Protected Pages (Require Authentication)
| Route | Page | Description |
|-------|------|-------------|
| `/solution-builder` | Solution Builder | AI-powered project generation |
| `/projects` | My Projects | User's project dashboard |
| `/account` | Account Settings | Profile management |

### Admin Pages (Admin Role Required)
| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Dashboard | Stats and quick links |
| `/admin/hardware` | Hardware | CRUD for boards |
| `/admin/middleware` | Middleware | RTOS and frameworks |
| `/admin/software` | Software | BSPs, SDKs |
| `/admin/ide` | IDE Downloads | Upload binaries |
| `/admin/llm` | LLM Settings | AI configuration |

## Site Lock Configuration
The site-wide authentication is controlled by `SITE_LOCK_ENABLED` in `App.js`:
- `true` (default): All routes require authentication; unauthenticated users redirected to /login
- `false`: Site publicly accessible; only protected routes require authentication

## Key Design Decisions
1. **TrusteD-V Branding**: Professional logo with shield + chip design, consistent color
2. **Bosch Association**: Logo placed on far right of header, not on login page
3. **Rust Prominence**: Orange badges, dedicated section, code examples
4. **RISC-V Prominence**: Blue badges, architecture diagrams, hardware focus
5. **Hardware Focus**: Only Mindgrove and C-DAC chips supported
6. **Partner Strategy**: Page focuses on "how to become a partner"
7. **Site Lock**: Simple authentication wrapper for development phase

## Future Tasks (Prioritized)
- [ ] **P0**: Refactor server.py into FastAPI routers
- [ ] **P1**: Complete "Solution Builder" AI code generation refinement
- [ ] **P2**: Add company logo upload in admin settings
- [ ] **P3**: Project versioning UI enhancements

---
*Last Updated: December 2025*
