# TrusteD-V Platform — Product Requirements Document

## Original Problem Statement
Build a highly professional "AI coding platform for Embedded systems with RISC-V centric using RUST language," branded as "TrusteD-V". The platform should feature Bosch-inspired professional UI, authentic content focused on Indian RISC-V companies (Mindgrove, C-DAC, Upbeat Tech), and comprehensive developer tools including IDE, WebIDE, hardware marketplace, and AI-powered development.

## User Personas
- **Embedded Engineers**: Primary users building firmware on RISC-V with Rust
- **Hardware Partners**: C-DAC, Mindgrove, and Upbeat Tech teams integrating their boards
- **Platform Admins**: Managing IDE binaries, hardware catalog, partners, and applications

## Core Requirements
1. **Branding**: "TrusteD-V" — RISC-V Rust platform (no "+" in branding)
2. **IDE**: "TrusteD-V IDE — Jarvyn" with AI-native development features
3. **WebIDE**: Cloud-capable counterpart with full compilation and collaboration features
4. **Hardware Focus**: Indian RISC-V hardware (C-DAC, Mindgrove, Upbeat Tech)
5. **Auth Lock**: Entire site behind authentication while in development
6. **Admin Panel**: Manage IDE binaries, hardware catalog, applications, partners, team
7. **Made in India**: Subtle "Designed in India" angle — present but not dominant

## Architecture
- **Frontend**: React + TailwindCSS + Shadcn UI
- **Backend**: FastAPI + MongoDB (motor async driver)
- **Auth**: JWT-based with bcrypt hashing
- **Deployment**: Docker + Docker Compose + Nginx (AWS ready)
- **AI**: Gemini 3 Flash via emergentintegrations (Emergent LLM Key)

## What's Been Implemented

### Phase 1 — Foundation (Completed)
- Full-stack React + FastAPI + MongoDB setup
- JWT authentication with admin roles
- Hardware catalog (C-DAC + Mindgrove boards only)
- Admin dashboard with CRUD operations
- Bosch-inspired UI with red primary theme

### Phase 2 — Branding & Content (Completed)
- TrusteD-V logo and Bosch subtle branding
- Team page with 5 rows (Leadership, Management, Architecture, Engineering, Security & Quality)
- Site-wide auth lock in App.js
- Landing page with business capabilities
- AWS deployment docs, Docker configs, architecture diagrams

### Phase 3 — Review V1 (Completed - Feb 2026)
- Removed "+" from branding, renamed IDE to "TrusteD-V IDE — Jarvyn"
- IDE download page with Jarvyn screenshots (VSCode-style)
- Team page: colored backgrounds only, no photos/social links
- Hardware catalog: actual images + fixed broken links
- Partners page: exclusively C-DAC and Mindgrove
- Partner registration: full T&C with mandatory acceptance
- Developer portal: expandable sections (Tuya/Cursor inspired)
- Landing page: animated counters, corrected CTAs

### Phase 4 — UI Polish & Application System (Completed - Feb 2026)
- Storytelling animation: 5-step animated journey
- About page: animated team stats
- Board Support Request & Partnership application forms
- Admin Applications panel with review/approve/reject workflow
- Hardware image upload via Admin panel

### Phase 5 — Content Overhaul & Engine Visualization (Completed - Apr 2026)
- **Navigation**: "Hardware" tab replaced with "Marketplace" (Hardware + IP)
- **Landing Hero**: TrusteD-V Engine Architecture diagram (5-layer stack: Application API → Middleware → SoC/Module → Discrete Chips → IP Blocks with Code/Chip/Core Engine labels)
- **"Designed in India"**: Subtle flag + text below the engine diagram (not dominant)
- **7-Stage Build Simulation**: Full Requirement → IP → Chips → SoC → Firmware → Simulation → Launch pipeline with step cards, progress bars, IP chips, and engine badges
- **Business Plans**: 3-tier pricing (Basic/Pro/Enterprise) with flexible licensing model
- **Crypto Stack**: New product card with AES-256-GCM, RSA-4096, ECC, SHA-3/BLAKE3, post-quantum (Kyber/Dilithium), hardware crypto engine integration
- **Secure Boot Expanded**: rboot (lightweight RISC-V first-stage) + rustBoot (Rust-native secure bootloader with A/B updates, anti-rollback)
- **WebIDE Repositioned**: "TrusteD-V WebIDE" with Cloud badge — full-featured browser IDE with cloud compilation, real-time collaboration, Git integration
- **RTOS Benchmarking**: Full comparison table (TrusteD-V RTOS vs FreeRTOS) — 9x faster context switch, 12x faster task creation, memory safety via Rust
- **Upbeat Tech**: Added as third hardware partner (edge AI, intelligent sensors) across Landing, Partners, and Architecture layers
- **Platform Architecture**: Updated to include Upbeat Tech in RISC-V Hardware layer

## Key DB Schema
- `users`: {username, email, hashed_password, role}
- `hardware`: {id, name, type, arch, description, image_url, company, price, peripherals}
- `ide_downloads`: {id, name, version, platform, download_url, size, description, filename, uploaded_at}
- `board_support_requests`: {id, company_name, contact_name, email, board_name, description, status, submitted_at}
- `partnership_applications`: {id, company_name, contact_name, email, partnership_type, description, status, submitted_at}

## Key API Endpoints
- `POST /api/auth/login` — User login
- `GET /api/hardware` — Hardware catalog
- `GET /api/ide-downloads` — IDE download listings
- `POST /api/admin/ide-downloads/{id}/upload` — Upload IDE binary (admin)
- `GET /api/ide-downloads/{id}/download` — Download IDE binary
- `POST /api/admin/hardware/{id}/upload-image` — Upload hardware image (admin)
- `POST /api/applications/board-support` — Submit board support request
- `POST /api/applications/partnership` — Submit partnership application
- `GET /api/admin/applications/board-support` — List board requests (admin)
- `GET /api/admin/applications/partnership` — List partner apps (admin)
- `GET /api/admin/notifications` — Pending notification counts (admin)

## Prioritized Backlog

### P0 — Critical
- Refactor monolithic `server.py` into modular FastAPI APIRouter modules

### P1 — High
- Complete "Solution Builder" functionality (AI code generation)
- Complete team member photos (replace placeholders as photos are provided)

### P2 — Medium
- Public release (remove site-wide auth lock when ready)
- Customer testimonials/case studies section
- Company logo upload in admin settings

### P3 — Future
- Enhanced project versioning UI in "My Projects"
- Enhanced AI code generation prompts
- Email notifications for new applications

## 3rd Party Integrations
- Gemini 3 Flash via emergentintegrations (Emergent LLM Key)

---
*Last Updated: April 2026*
