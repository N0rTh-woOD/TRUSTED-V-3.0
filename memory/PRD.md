# TrusteD-V Platform — Product Requirements Document

## Original Problem Statement
Build a highly professional "AI coding platform for Embedded systems with RISC-V centric using RUST language," branded as "TrusteD-V". The platform should feature Bosch-inspired professional UI, authentic content focused on Indian RISC-V companies (Mindgrove, C-DAC, Upbeat Tech), and comprehensive developer tools including IDE, WebIDE, hardware marketplace, IP marketplace, and AI-powered development.

## User Personas
- **Embedded Engineers**: Primary users building firmware on RISC-V with Rust
- **Hardware Partners**: C-DAC, Mindgrove, and Upbeat Tech teams integrating their boards
- **SoC Designers**: Engineers looking for RISC-V IP blocks for their custom chips
- **Platform Admins**: Managing IDE binaries, hardware catalog, partners, and applications

## Core Requirements
1. **Branding**: "TrusteD-V" — RISC-V Rust platform
2. **IDE**: "TrusteD-V IDE — Jarvyn" with AI-native development features
3. **WebIDE**: Cloud-capable counterpart with full compilation and collaboration features
4. **Hardware + IP Marketplace**: Tabbed marketplace for development boards AND IP blocks
5. **Auth Lock**: Entire site behind authentication while in development
6. **Admin Panel**: Manage IDE binaries, hardware catalog, applications, sales inquiries
7. **Made in India**: Subtle "Designed in India" angle — present but not dominant
8. **Dedicated Product Pages**: Secure Boot, Crypto Stack, RTOS Benchmarks with GitHub links
9. **Partner Logos**: SVG logos for C-DAC, Mindgrove, Upbeat Tech used throughout

## Architecture
- **Frontend**: React + TailwindCSS + Shadcn UI
- **Backend**: FastAPI + MongoDB (motor async driver)
- **Auth**: JWT-based with bcrypt hashing
- **Deployment**: Docker + Docker Compose + Nginx (AWS ready)
- **AI**: Gemini 3 Flash via emergentintegrations (Emergent LLM Key)

## What's Been Implemented

### Phase 1-4 (Completed - Feb 2026)
- Full-stack setup, JWT auth, admin dashboard, hardware catalog
- Team page, Bosch branding, IDE rebranded to Jarvyn
- Board Support & Partnership application forms
- Hardware image upload, storytelling animations

### Phase 5 — Content Overhaul (Completed - Apr 2026)
- Navigation: "Hardware" → "Marketplace"
- Landing: Engine visualization (exact replica of HTML artifact), 7-stage simulation, business plans
- Product Suite: Crypto Stack, Secure Boot (rboot/rustBoot), RTOS Benchmarks
- Partners: Upbeat Tech added, WebIDE repositioned as capable counterpart

### Phase 6.1 — Landing Page UI Refinement (Completed - Apr 2026)
- **Engine visualization redesigned**: Replaced massive raw-HTML SVG engine diagram (~760px canvas) with a compact React/Tailwind `EngineArchCard` component showing 5 layers (Application API, Middleware, SoC/Module, Discrete Chips, IP Blocks) with 3 engine groupings (Code, Chip, Core) — no empty space, well-aligned
- **"Made in India" consolidated**: Removed duplicate badges (was in hero left + under engine). Now a single full-width tricolor banner (saffron/white/green stripe + flag + "Made in India | Engineered for the world") between hero and simulation sections
- **Engine diagram overlap fix**: No longer an issue since the raw HTML diagram was replaced with the compact card

### Phase 6 — Pages, Marketplace & Logos (Completed - Apr 2026)
- **Products page**: Removed HSM Integration, 4 clean categories, desktop-aligned 3-column grid
- **Dedicated detail pages**: `/product/secure-boot` (rboot + rustBoot with GitHub links, boot chain diagram), `/product/crypto-stack` (algorithm tables: Symmetric/Asymmetric/Hashing/Post-Quantum with status badges), `/product/rtos-benchmark` (4 RTOS options, benchmark table with 9x/12x metrics)
- **Marketplace**: New tabbed page — Hardware tab (from API with partner logos, images, peripherals) + IP Blocks tab (Ibex, OpenTitan, CVA6, PULP RI5CY, DMA Controller, UART/SPI/I2C — with GitHub links)
- **Partner logos**: SVG PartnerLogo component for C-DAC (blue), Mindgrove (green), Upbeat Tech (orange) — used in Marketplace header, hardware cards, Landing page, Partners page
- **Business plans**: Aligned with document — 4 revenue streams (per-core/annual, per-project, per-device/per-deployment, custom/SLA)
- **Contact Sales page**: Dedicated form with plan pre-selection, team size, project details
- **Sales inquiry API**: `POST /api/applications/sales-inquiry` + admin endpoint

## Key Pages & Routes
| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero + Engine + Simulation + Pricing + Partners |
| `/about` | About | Company info, animated counters |
| `/product-suite` | Products | 4 categories, Learn More links |
| `/product/secure-boot` | Secure Boot | rboot + rustBoot, GitHub, boot chain |
| `/product/crypto-stack` | Crypto Stack | Algorithm tables, security features |
| `/product/rtos-benchmark` | RTOS Benchmarks | 4 RTOS options, comparison table |
| `/marketplace` | Marketplace | Hardware + IP tabs with logos |
| `/developer-portal` | Developers | SDK docs, expandable sections |
| `/download-ide` | IDE Download | Jarvyn IDE binaries |
| `/contact-sales` | Sales | Inquiry form with plan selection |
| `/partner-registration` | Partner Registration | Partnership application |
| `/board-support` | Board Support | Board support request |
| `/team` | Team | 5-row team hierarchy |
| `/partners` | Partners | C-DAC, Mindgrove, Upbeat Tech |
| `/admin/*` | Admin | Dashboard, Hardware, IDE, Applications |

## Key API Endpoints
- `POST /api/auth/login` — User login
- `GET /api/hardware` — Hardware catalog
- `GET /api/ide-downloads` — IDE listings
- `POST /api/applications/sales-inquiry` — Sales inquiry
- `GET /api/admin/applications/sales-inquiries` — Admin: view inquiries
- `POST /api/applications/board-support` — Board support request
- `POST /api/applications/partnership` — Partnership application

## Prioritized Backlog
### P0 — Critical
- Refactor monolithic `server.py` into modular APIRouter modules

### P1 — High
- Complete "Solution Builder" AI code generation
- Team member photos (as provided)

### P2 — Medium
- Public release (remove auth lock)
- Admin panel: sales inquiries tab
- Customer testimonials

### P3 — Future
- Enhanced project versioning
- Email notifications for applications

## 3rd Party Integrations
- Gemini 3 Flash via emergentintegrations (Emergent LLM Key)

---
*Last Updated: April 2026*
