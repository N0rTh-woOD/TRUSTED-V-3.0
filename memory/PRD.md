# TrusteD-V Platform — Product Requirements Document

## Original Problem Statement
Build a highly professional "AI coding platform for Embedded systems with RISC-V centric using RUST language," branded as "TrusteD-V". The platform should feature Bosch-inspired professional UI, authentic content focused on Indian RISC-V companies (Mindgrove and C-DAC), and comprehensive developer tools.

## User Personas
- **Embedded Engineers**: Primary users building firmware on RISC-V with Rust
- **Hardware Partners**: C-DAC and Mindgrove teams integrating their boards
- **Platform Admins**: Managing IDE binaries, hardware catalog, partners, and applications

## Core Requirements
1. **Branding**: "TrusteD-V" — RISC-V Rust platform (no "+" in branding)
2. **IDE**: "TrusteD-V IDE — Jarvyn" with AI-native development features
3. **Hardware Focus**: Exclusively Indian RISC-V hardware (C-DAC, Mindgrove)
4. **Auth Lock**: Entire site behind authentication while in development
5. **Admin Panel**: Manage IDE binaries, hardware catalog, applications, partners, team

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
- Removed Solution Builder entirely
- IDE download page with Jarvyn screenshots (VSCode-style)
- Team page: colored backgrounds only, no photos/social links
- Hardware catalog: actual images + fixed broken links
- Partners page: exclusively C-DAC and Mindgrove
- Partner registration: full T&C with mandatory acceptance
- Developer portal: expandable sections (Tuya/Cursor inspired)
- Landing page: animated counters, corrected CTAs

### Phase 4 — UI Polish & Application System (Completed - Feb 2026)
- **Improved TrusteD-V icon**: Chip-like design with shield, V watermark, and circuit board pins
- **Storytelling animation**: 5-step animated journey (Challenge → TrusteD-V → Rust → Security → Production)
- **Animated "Perfect Combination" section**: Points animate one-by-one on scroll
- **Overlapping tabbed panels**: "What You Get" / "TrusteD-V Architecture" toggle with animation
- **About page**: "Your RISC-V Embedded AI Engine" slogan, animated team stats (Architects 4, Developers 10, Researchers 5, Support 5)
- **Platform Architecture differentiation**: Different color scheme from TrusteD-V Architecture
- **Product Suite**: Enhanced IDE/Web IDE cards with gradient bars and action buttons
- **Hardware images**: Different stock images per board with admin upload provision
- **Board Support Request form** (/board-support): Separate form with DB storage
- **Partnership Application form** (/partner-registration): Real API submission with DB storage
- **Admin Applications panel** (/admin/applications): Tabs for board support + partnership, notification badges, review/approve/reject workflow
- **Hardware image upload**: Admin can upload images per board from admin panel
- **Updated roadmap**: Corrected milestone data

## Key DB Schema
- `users`: {username, email, hashed_password, role}
- `hardware`: {id, name, type, arch, description, image_url, company, price, peripherals}
- `ide_downloads`: {id, name, version, platform, download_url, size, description, filename, uploaded_at}
- `board_support_requests`: {id, company_name, contact_name, email, board_name, board_manufacturer, architecture, description, use_case, status, submitted_at, reviewed_at, admin_notes}
- `partnership_applications`: {id, company_name, contact_name, email, phone, website, company_type, partnership_type, description, products, agree_terms, status, submitted_at, reviewed_at, admin_notes}

## Key API Endpoints
- `POST /api/auth/login` — User login
- `GET /api/hardware` — Hardware catalog
- `GET /api/ide-downloads` — IDE download listings
- `POST /api/admin/ide-downloads/{id}/upload` — Upload IDE binary (admin)
- `GET /api/ide-downloads/{id}/download` — Download IDE binary
- `POST /api/admin/hardware/{id}/upload-image` — Upload hardware image (admin)
- `GET /api/hardware-images/{filename}` — Serve hardware image
- `POST /api/applications/board-support` — Submit board support request
- `POST /api/applications/partnership` — Submit partnership application
- `GET /api/admin/applications/board-support` — List board requests (admin)
- `GET /api/admin/applications/partnership` — List partner apps (admin)
- `PUT /api/admin/applications/board-support/{id}` — Update request status (admin)
- `PUT /api/admin/applications/partnership/{id}` — Update app status (admin)
- `GET /api/admin/notifications` — Pending notification counts (admin)

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
- Web IDE browser-based development
- Enhanced AI code generation prompts
- Email notifications for new applications

## 3rd Party Integrations
- Gemini 3 Flash via emergentintegrations (Emergent LLM Key)

---
*Last Updated: February 2026*
