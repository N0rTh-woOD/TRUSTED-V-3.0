# TrusteD-V Platform — Product Requirements Document

## Original Problem Statement
Build a highly professional "AI coding platform for Embedded systems with RISC-V centric using RUST language," branded as "TrusteD-V". The platform should feature Bosch-inspired professional UI, authentic content focused on Indian RISC-V companies (Mindgrove and C-DAC), and comprehensive developer tools.

## User Personas
- **Embedded Engineers**: Primary users building firmware on RISC-V with Rust
- **Hardware Partners**: C-DAC and Mindgrove teams integrating their boards
- **Platform Admins**: Managing IDE binaries, hardware catalog, and partners

## Core Requirements
1. **Branding**: "TrusteD-V" — RISC-V Rust platform (no "+" in branding)
2. **IDE**: "TrusteD-V IDE — Jarvyn" with AI-native development features
3. **Hardware Focus**: Exclusively Indian RISC-V hardware (C-DAC, Mindgrove)
4. **Auth Lock**: Entire site behind authentication while in development
5. **Admin Panel**: Manage IDE binaries, hardware catalog, partners, team

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

### Phase 3 — Review V1 Implementation (Completed - Feb 2026)
- **Branding Fix**: Removed "+" from "RISC-V + Rust" across all pages
- **IDE Rename**: "TrusteD-V Studio" → "TrusteD-V IDE — Jarvyn" everywhere
- **Solution Builder Removed**: From navigation, landing, products, and all references
- **IDE Download Page**: Complete redesign with uploaded Jarvyn IDE screenshots, dark hero theme, platform-specific download buttons (VSCode/Cursor inspired)
- **Team Page**: Removed all photos (colored background avatars with initials only), removed LinkedIn/email links
- **Hardware Catalog**: Added actual product images (Unsplash), fixed broken navigation buttons
- **Partners Page**: Rewritten to focus exclusively on C-DAC and Mindgrove with detailed integration info
- **Partner Registration**: Added full Terms & Conditions (10 clauses) with mandatory acceptance
- **Developer Portal**: Complete redesign with expandable/collapsible sections (Tuya/Cursor inspired), real SDK links, RTOS docs
- **Landing Page**: Animated number counters, updated footer to 2026, corrected CTAs
- **IDE Binary Upload→Download**: Admin uploads immediately update download availability

## Key DB Schema
- `users`: {username, email, hashed_password, role}
- `hardware`: {id, name, type, arch, description, image_url, company, price, peripherals}
- `ide_downloads`: {id, name, version, platform, download_url, size, description, filename, uploaded_at}

## Key API Endpoints
- `POST /api/auth/login` — User login
- `GET /api/hardware` — Hardware catalog
- `GET /api/ide-downloads` — IDE download listings
- `POST /api/admin/ide-downloads/{id}/upload` — Upload IDE binary (admin)
- `GET /api/ide-downloads/{id}/download` — Download IDE binary (public)
- `GET /api/admin/stats` — Admin dashboard stats

## Prioritized Backlog

### P0 — Critical
- Refactor monolithic `server.py` into modular FastAPI APIRouter modules

### P1 — High
- Complete team member photos (replace placeholders as photos are provided)
- Enhance project versioning UI in "My Projects"

### P2 — Medium
- Public release (remove site-wide auth lock when ready)
- Customer testimonials/case studies section
- Company logo upload in admin settings

### P3 — Future
- Interactive roadmap with real milestones
- Enhanced AI code generation prompts
- Web IDE browser-based development

## 3rd Party Integrations
- Gemini 3 Flash via emergentintegrations (Emergent LLM Key)

---
*Last Updated: February 2026*
