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

### Phase 6 — Pages, Marketplace & Logos (Completed - Apr 2026)
- Products page: 4 clean categories, desktop-aligned 3-column grid
- Dedicated detail pages: Secure Boot, Crypto Stack, RTOS Benchmark
- Marketplace: Tabbed Hardware + IP Blocks
- Partner logos: SVG components for C-DAC, Mindgrove, Upbeat Tech
- Business plans: 4 revenue streams
- Contact Sales page with plan pre-selection
- Sales inquiry API

### Phase 7 — Content Overhaul + Auth Lockdown (Completed - Apr 2026)
- Removed sections: "Complete Development Ecosystem", Team page, "Why Rust", "Perfect Combination"
- Pipeline reverted to card-based 7-stage pipeline
- Registration disabled at API level
- Demo credentials saved to test_credentials.md only (not shown on UI)

### Phase 9: Landing Page Hero Rewrite + Em Dash Cleanup (Completed - Apr 2026)
- **Hero rewrite**: Bigger TrusteD-V logo (trustedv-rocket-logo.png), "Powered by Bosch" slogan, heading "Build your secure RISC-V Solution", removed Rust/RISC-V/Secure pill badges.
- **Stats removed**: Removed animated counter section (6+ boards, 5+ RTOS, 15 Team, 3 Partners). Replaced with inline Made in India badge with tricolor flag.
- **Rocket launch scene**: Replaced engine architecture diagram with animated rocket launch SVG from HTML artifact (stars, launchpad, flames with tvBurn animation, rocket rises with tvRise).
- **4 Domain cards**: Added "We Cater to 4 Key Domains" section: Automotive, IoT, Consumer Electronics, Data Center.
- **Em dash cleanup**: Removed all em dashes (—) from visible content text across all pages (Landing, IDEDownloads, CryptoStack, SecureBoot, RTOS Benchmark, About, Partners, AdminIDE). Replaced with colons, commas, or periods as appropriate.
- **AnimatedCounter removed**: Deleted unused component and cleaned up imports (Shield, Zap, Package, Lock, Flame, BarChart3).

### Phase 9.1: Engine v7 + Make in India Image (Completed - Apr 2026)
- **Engine v7 diagram restored**: Replaced rocket launch scene with the original isometric 3D engine diagram (v7 with improved gradients) in the hero section. Shows 5 layers: IP Blocks, Discrete Chips, SoC/Module, Middleware, Application API with animated exhaust.
- **Make in India globe image**: Replaced small text badge with the user's uploaded "Make in India" globe image (make-in-india.jpg) showing India highlighted on Earth with chip overlay. Displayed prominently below CTA buttons.
- **Slogans reflected**: "Powered by Bosch" and "Build your secure RISC-V Solution" properly placed in hero section.
- **IDE Page (IDEDownloads.jsx)**: Overhauled with PDF report content — 21 purpose-built features (Hardware-Aware AI, Native Rust Analyzer, SVD visualization, Checkpoint system, etc.), comparison table vs general IDEs (8 aspects), Benefits section, professional dark hero. Unused imports cleaned.
- **Crypto Stack Page (CryptoStackPage.jsx)**: Complete rewrite with user-provided algorithm data — 8 categories: Hashing (SHA-2/SHA-3, SHAKE — BLAKE removed), PQC Signatures (ML-DSA, SLH-DSA), PQC Key Exchange (ML-KEM), Symmetric Encryption (AES + modes with CBC/CFB deprecation note), Classical Signatures (ECDSA/EdDSA, RSA), Classical Key Exchange (ECDH, RSA-KEM), Randomness (PRNG DRBG), Future/Advanced (Side-Channel Protections). Color-coded category headers, monospaced variant tags, NIST FIPS standards references, dark hero with standards compliance card.
- **Developer Portal Quick Start**: Upgraded code example with proper Rust syntax highlighting (GitHub dark theme colors), line numbers, terminal output bar, side info cards (What This Does + Supported Boards), dark section background.

## Key Pages & Routes
| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero + Engine + Simulation + Pricing + Partners |
| `/about` | About | Company info, animated counters |
| `/product-suite` | Products | 4 categories, Learn More links |
| `/product/secure-boot` | Secure Boot | rboot + rustBoot, GitHub, boot chain |
| `/product/crypto-stack` | Crypto Stack | 8-category algorithm reference tables |
| `/product/rtos-benchmark` | RTOS Benchmarks | 4 RTOS options, comparison table |
| `/marketplace` | Marketplace | Hardware + IP tabs with logos |
| `/developer-portal` | Developers | SDK docs, expandable sections |
| `/download-ide` | IDE Download | 21 features, comparison, benefits |
| `/contact-sales` | Sales | Inquiry form with plan selection |
| `/partner-registration` | Partner Registration | Partnership application |
| `/board-support` | Board Support | Board support request |
| `/partners` | Partners | C-DAC, Mindgrove, Upbeat Tech |
| `/admin/*` | Admin | Dashboard, Hardware, IDE, Applications |

## Key API Endpoints
- `POST /api/auth/login` — User login
- `POST /api/auth/register` — DISABLED (returns 400/403)
- `GET /api/hardware` — Hardware catalog
- `GET /api/ide-downloads` — IDE listings
- `POST /api/applications/sales-inquiry` — Sales inquiry
- `GET /api/admin/applications/sales-inquiries` — Admin: view inquiries
- `POST /api/applications/board-support` — Board support request
- `POST /api/applications/partnership` — Partnership application

## Prioritized Backlog
### P1 — High
- Refactor monolithic `server.py` into modular APIRouter modules
- Complete "Solution Builder" AI code generation

### P2 — Medium
- Admin panel: sales inquiries tab in AdminApplications.jsx
- Customer testimonials/case studies section

### P3 — Future
- Public release (remove auth lock)
- Enhanced project versioning UI in "My Projects"
- Email notifications for applications

## 3rd Party Integrations
- Gemini 3 Flash via emergentintegrations (Emergent LLM Key)

---
*Last Updated: April 2026*
