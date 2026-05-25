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

### Phase 11: Major Content Overhaul from HTML v8 (Completed - May 2026)
- **Home page**: Added "Made in India, Engineered by Bosch to the World" badge, updated hero description for two sub-brands, added 4 stat cards (Software & Toolchain, SignOff Silicon, 48hrs certification, Bronze to Platinum). New sections: "Our Products" (two sub-brand cards), Security & Standards Compliance strip (10 certifications), Industry Focus (IoT, Industrial, Consumer Electronics), Strategic Roadmap (3 phases). Replaced old Business Plans and Hardware Partners sections.
- **Contact page**: New `/contact` route with "Get in Touch" hero, contact info cards (HQ Bangalore, emails, offices), full form (First/Last Name, Work Email, Company, Country, Product Interest dropdown, Message) submitting to existing sales-inquiry API.
- **About page**: Overhauled with "RISC-V Security, Powered by Bosch" hero, 3 mission pillars (Security, Performance, Time-to-Market), "8 Structural Gaps We Close" grid, "Backed by Bosch" animated stats (136+ years, 30000+ engineers, 40+ countries, 10B+ devices), certification badges.
- **Navigation**: Added "Contact" link. All 7 items visible on desktop.
- **All links verified**: Hero CTAs, sub-brand cards, footer, nav all point to correct routes.
- **Removed "RISC-V RUST PLATFORM" subtitle** from `TrustedVLogo.jsx` across all pages.
- **TrustedVLogo component redesigned**: 6 size presets (xs/sm/md/lg/xl/hero), `showPoweredBy` prop for cohesive "POWERED BY BOSCH" lockup, `dark` prop for footer. Uses Helvetica Neue, font-extrabold. Colors: T/eD=slate-800, rust=#B7410E, -V=#C8A200.
- **Brand lockup sizes**: Nav=md(32px), Login=lg(44px)+poweredBy, Hero=hero(72px)+poweredBy, Footer=sm(28px)+poweredBy+dark.
- **RISC-V official Berkeley Blue (#003262)** in hero heading.
- **Mobile responsive**: All brand elements scale properly on 390px. Engine diagram hidden on mobile.
- **All 24 tests passed** (iteration_28).
- **IDE Page (IDEDownloads.jsx)**: Overhauled with PDF report content — 21 purpose-built features (Hardware-Aware AI, Native Rust Analyzer, SVD visualization, Checkpoint system, etc.), comparison table vs general IDEs (8 aspects), Benefits section, professional dark hero. Unused imports cleaned.
- **Crypto Stack Page (CryptoStackPage.jsx)**: Complete rewrite with user-provided algorithm data — 8 categories: Hashing (SHA-2/SHA-3, SHAKE — BLAKE removed), PQC Signatures (ML-DSA, SLH-DSA), PQC Key Exchange (ML-KEM), Symmetric Encryption (AES + modes with CBC/CFB deprecation note), Classical Signatures (ECDSA/EdDSA, RSA), Classical Key Exchange (ECDH, RSA-KEM), Randomness (PRNG DRBG), Future/Advanced (Side-Channel Protections). Color-coded category headers, monospaced variant tags, NIST FIPS standards references, dark hero with standards compliance card.
- **Developer Portal Quick Start**: Upgraded code example with proper Rust syntax highlighting (GitHub dark theme colors), line numbers, terminal output bar, side info cards (What This Does + Supported Boards), dark section background.

### Phase 12: Landing Hero White-Theme Premium Redesign (Completed - Feb 2026)
- **Hero background**: Switched from dark `#0c1020` to clean white with subtle dotted grid mask, accent halos (Berkeley Blue + Saffron Gold), and a tri-color top accent bar (Blue → Teal → Gold).
- **Hybrid layout**: 7/5 split — editorial left column + Jarvyn IDE code preview right column. Fills space with no large voids.
- **Editorial left**: Larger TrusteD-V brand lockup, animated "Made in India · Engineered by Bosch to the World" badge, headline with gold highlight underline on "from Silicon to Application", refined description with inline bold accent.
- **Buttons CSS**: Solid Berkeley Blue primary (with depth shadow + hover lift), outline-to-dark hover-invert secondary, ghost "Download Jarvyn IDE" tertiary with chevron micro-animation. All on rounded-lg, 12-unit height, transition-all duration-200.
- **Stat strip**: 3-column divider stat row (48 hr / 5-Layer / 2 Products) anchoring the left column.
- **Right visual**: Code window with macOS-style chrome (traffic lights, file title, live indicator), Rust code preview using TRusteD-V `rboot::verify_chain`, `crypto::attest`, `rtos::launch`, status bar with `cargo build --release ✓ verified`. Two floating glass cards: ISA badge (RV32/RV64 GC) top-left, Verified badge (CC EAL4+ · PSA L3) bottom-right.
- **Feature pills**: Refreshed white-bg pills with colored icon tiles and hover lift.
- **Trust strip**: Bottom border strip with global standards (CC EAL4+ · FIPS 140-3 · PSA L3 · ISO 26262 · IEC 62443 · SLSA L3).
- **Smooth transition**: "Our Products" heading polished with line-accent eyebrow and stronger hierarchy.

### Phase 13: About Page Rebuilt from v8 HTML (Completed - Feb 2026)
- **Hero**: Dark `#0c1020` with tri-color top accent bar, "About Us" eyebrow, "Building trust in the RISC-V ecosystem." headline with gold "-V" mark, BGSW initiative subtitle.
- **Mission section**: 2-col layout (1.4fr/1fr) — left text block with "Our Mission" eyebrow, headline "The RISC-V ecosystem's next growth phase is gated by trust — not silicon capability.", two paragraphs with inline TRusteD-V Blue and SignOff Silicon Green brand accents. Right column: three pillar blocks (Security, Performance, Time-to-Market) with `border-l-4 border-[#003262]` and tinted background.
- **Why Us — 8 Structural Gaps**: 2-col grid of 8 cards. Each card: numbered badge tile, problem paragraph, and a highlighted "answer" box with `border-l-[3px] border-[#6B9AFF]` on `bg-[#003262]/[0.06]`. All copy verbatim from v8 HTML (ISA Fragmentation, Unified Security Framework, Supply Chain, SW-HW Integration, Certification Standards, Enterprise Adoption, Platform Security Layer, Ecosystem Coordination).
- **Strategic Roadmap + Consortium**: 2-col on slate-50/70 background. Left: vertical timeline with 3 phases (Foundation active, Ecosystem Growth, Industry Adoption) and styled dot markers. Right: TRusteD-V Consortium intro + 4 tiers (Founding / Principal / Associate / Academic & Research) each with colored dot indicator.
- **Backed by Bosch**: Centered. New stats per v8 HTML: 130+ Years, 60+ Countries, 400K+ Associates, #1 Global automotive supplier. Cert badges row below.
- **CTA**: Berkeley Blue section with refined Shadcn-style buttons (matching new Landing hero style).
- All TrusteD-V brand colors preserved: Berkeley Blue `#003262`, Gold `#FDB515`, SignOff Silicon Green `#0F6E56`.

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
*Last Updated: February 2026*
