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

### Phase 15 — Unified Card Design System, Hero Rebuild, Zephyr Purge (Jun 2026)
Verified by testing_agent (iteration_35.json): 9/9 PASS, 100% frontend.
- **Hero visual rebuilt** (`StackVisual.jsx`): cleaner isometric silicon→software stack (proportions W286/H126/gap92, die grid on the silicon plate, soft radial glow, base shadow, attestation rail with per-layer check marks + ATTESTED badge). **All SMIL removed** (`animateMotion`/`animate`/`keyTimes` gone) — motion is now CSS `transform`/`opacity` only: `tv-stack-drift`, `tv-rail-pulse`, `tv-plate-flash`, `tv-check-in`, `tv-attest-badge`. Fixes the jerky animation.
- **ONE card design system** — new `.tv-panel` family in `index.css`: `.tv-panel` (white, 1px #E5E4DF, 6px radius), `.tv-panel-muted` (#F7F7F5), `.tv-panel-dark`, `.tv-panel-link` (hover lift + #2486C7 border + shadow), `.tv-panel-accent` (left blue rule scales in on hover).
  - New shared primitive `TVCard` + internal `CardShell` in `ui-kit.jsx`. `GradientCard` **deleted**.
  - `ProductCard`, `MarketCard`, `ResourceCard`, `PartnerGrid` rebuilt on `.tv-panel`. `CardShell` renders a plain `div` when no destination — **no more `to="#"` dead links**.
  - All legacy `gap-px bg-[#E5E4DF] border-y` tiled grids converted to `gap-4` + `.tv-panel` cards across ProductSuite, Marketplace, About, SecureBoot, WebIDE, IDEDownloads, Partners, RTOSBenchmark.
  - Palette normalised site-wide: `#0A0A0A→#0B0F14`, `#4B4B4B`/`#6B6B6B→#5A6472`, `#FAFAF7→#F7F7F5`, `#E7E5E0→#E5E4DF`. Inline `font-family` overrides stripped from card bodies.
- **Platform Architecture restyled**: single blue gradation accent strips (`#9DC8E8 → #00162B`, application→silicon) instead of 6 unrelated colours; uniform `.tv-panel-muted` module tiles; cleaner vertical SOFTWARE/SILICON axis.
- **Core Technologies**: numbering removed, no icons — mono eyebrow (ISA / SECURITY / PRE-SILICON / RUNTIME / CRYPTO / TOOLING) + title + description + hover arrow.
- **Zephyr · FreeRTOS removed platform-wide** (Landing, Navigation mega-menu, DeveloperPortal, IDEDownloads, Blog, BuildPipelineViz, admin form placeholders) — replaced with TRUSTED-V RTOS / Embassy async / Tock. **Only `/product/rtos-benchmark` retains them by design** (kept as a comparison). Backend middleware seed catalog untouched.
- **Navigation hardening**: new `NotFound.jsx` 404 page wired as `path="*"` catch-all in `App.js` (no more blank screens); `Home` link added to the footer Company column; logo returns home from every page.

### Phase 14 — Engagement Models, Reviewer UI Suggestions, Animated Hero (Jun 2026)
Verified by testing_agent (iteration_34.json): 15/15 PASS.
- **Business models** (from `website_updates_models.pdf`): shared data `/frontend/src/data/engagement.js`; new `/engagement-models` page (SaaS "Let's build it for you" · PaaS "Your code, our ecosystem", 5-step `StepRail` each, fit table, CTAs → `/contact?plan=saas|paas`); homepage `EngagementTeaser`; Products page `EngagementBlock`; nav item "Engagement" + footer link.
- **Reviewer suggestions (all 11 applied)**: account dropdown (`nav-account-menu` → Admin / Account settings / Log out), Home nav link removed (logo underline `nav-brand-active` on `/`), active nav pill (`tv-nav-pill`), `Breadcrumbs` on all PageHero pages (replaced "Back to products"), Bosch blue gradation `GradientCard`s on homepage Core Technologies, mega-menu hover bar (`tv-mega-row`), IDE features colour-coded by 4 categories + legend, Products module tags on gradation, unified blue accents (removed teal/yellow/rust tier dots, gold eyebrows on dark sections → #2486C7), `TrustRing` animated illustration on About, `ComparisonModule` ("TRUSTED-V vs alternatives") on Products.
- **Hero**: new `StackVisual.jsx` — animated isometric silicon→software stack (SMIL pulses up an attestation rail, per-layer verification checks, VERIFIED badge, float).
- **Brand colours**: `BOSCH_BLUE` (#004A7F / #2486C7) + `BLUE_STEPS` scale + `PoweredByBosch` lockup used in Footer, Login, About.
- **Text reduction** across Landing, About, ProductSuite, IDE, Marketplace, Partners.
- Deferred by user: ChatGPT/OpenAI model integration (next round).

### Phase 13d — Content Correction & Login Logo (Feb 14, 2026)
- **Removed all MIPS ARC-V references** — TRUSTED-V's real IP partnerships are SiFive and Akeana only. Cleaned:
  - Landing hero co-verified partner strip (now: SiFive · Akeana · C-DAC · Mindgrove)
  - RISC-V IP & Collaborations section (now 2 wide cards: SiFive + Akeana; MIPS ARC-V card deleted)
  - Platform Architecture "RISC-V IP & Silicon" band tiles (replaced MIPS ARC-V with individual SiFive + Akeana tiles)
  - Core Technologies "RISC-V native" description
  - Ecosystem section silicon list (added OpenTitan RoT in place)
  - Partners page globalIP list (down to 2 partners)
  - ProductSuite IPIntegration grid (added OpenTitan, dropped MIPS ARC-V)
  - Deleted the unused legacy `/app/frontend/src/components/HeroSection.jsx` (contained the last MIPS ARC-V reference)
- **Removed the "v1.0" / "v1.0 · Rust-native RISC-V platform" tags** from Login page (desktop + mobile) and from Landing hero eyebrow
- **Enlarged the Login page logo** — TrustedVLogo bumped to size `2xl` (120px height); mobile view uses `md` (40px) — now proportionally dominant against the trust feature strip

### Phase 13c — Homepage & Login Redesign (Feb 14, 2026)
Verified visually across 6 flows (login → landing → IP → virtualization → new architecture → products navigation).

**Homepage reorder + new architecture visual:**
- New section order: Hero → Intro → **RISC-V IP & Collaborations** → **Virtualization Spotlight** → **Platform Architecture** → Core Tech → Products → Ecosystem → Markets → Developer Exp → CTA
- Enhanced Hero with subtle grid backdrop, cyan ambient blur and inline "Co-verified with SiFive · Akeana · MIPS ARC-V · C-DAC · Mindgrove" partner strip
- **Redesigned Platform Architecture** as a coloured-band block diagram (6 grouped bands with side accent strip, component tiles inside each band, vertical "SOFTWARE ↑ / SILICON ↓" axis annotation, side Data Flow narrative)

**Products navigation:**
- `nav-products` is now a real Link — hovering opens the mega-menu, clicking navigates to `/product-suite`
- Mega-menu "Featured" card replaced with "All products" tile + "View all products" CTA to `/product-suite`

**Login page fully redesigned:**
- Bigger brand pane with lg-size logo, ambient navy gradient + subtle grid, "v1.0" version tag
- Four-feature trust grid (RISC-V native, Secure by design, Full stack, Attestable) with mono captions
- Form now on a white card (border + soft shadow), grey field surface, Forgot? link, "Request access" CTA in card footer
- Footer status: "All systems operational" pulse dot + "Powered by Bosch · Made in India"

### Phase 13b — User Feedback Fixes (Feb 12, 2026)
Verified by testing_agent (iteration_33.json): 13/13 PASS.
- Removed the "Now in private preview" announcement bar entirely
- Added explicit **Home** link in the main nav (data-testid `nav-home`)
- Diversified CTAs to eliminate "Talk to an engineer" repetition:
  - Nav → "Request a demo"
  - Landing hero secondary → "Talk to our engineers"
  - Landing final CTA → "Start a project"
  - Footer → "Contact us"
  - Virtualization section → "Book a technical deep-dive"
- Rebuilt `TrustedVLogo` sizing scale (xs 24 / sm 34 / md 40 / lg 56 / xl 88) — consistent across nav, footer and login
- Homepage expanded with two new sections:
  1. **RISC-V IP & Collaborations** — SiFive · Akeana · MIPS ARC-V featured cards plus "Also supported" strip (C-DAC, Mindgrove, Upbeat Tech, CVA6, Ibex, OpenTitan)
  2. **Virtualization Spotlight** — dark section with 5-layer hypervisor topology diagram and dedicated CTAs
- Reordered homepage sections for stronger narrative: Hero → Intro → Architecture → RISC-V IP → Virtualization → Core Tech → Products → Ecosystem → Markets → Developer Experience → CTA

### Phase 13 — Enterprise Semiconductor Design System (Feb 12, 2026)
Design authority: user-supplied Design Specification PDF. Executed as an intelligent adaptation (not a MIPS clone, not a blind spec copy).

**Design system rebuilt from the ground up:**
- Type stack: **IBM Plex Sans** (body/UI), **IBM Plex Mono** (technical/code), **Sora** (selective display)
- Type utilities: `.tv-h1` (H1 40-72px clamp), `.tv-h2` (30-48), `.tv-h3` (22-30), `.tv-h4` (20), `.tv-lede` (16-19)
- Spacing scale + section rhythm (80/96/112 default, 96/120/140 lg, 56/72/80 tight)
- Radii tokens 6/10/16, button height 48/54, 22-28 padding
- Announcement bar (36px), Header (76px) w/ **Products mega-menu** (multi-column + featured item)
- Full colour palette preserved (Berkeley Navy #003262, Cyan, Gold, SignOff Green)

**Reusable component library (`/app/frontend/src/components/ui-kit.jsx`):**
- Eyebrow, SectionHeader, PrimaryCTA, SecondaryCTA
- **ArchitectureDiagram** — the platform stack, first-class visual with layer labels (L01…L09)
- **TechnicalMetric** — spec-sheet style key/value list
- ProductCard, MarketCard, PartnerGrid, ResourceCard, CTASection

**Homepage restructured as a 9-section engineering story** (skipped News/Videos/Whitepapers per user "only add what we have real content for"):
Announcement → Header → Hero (with **SoC SVG visual**) → Platform Intro → **Full Platform Architecture** (9-layer stack + spec table) → Core Technologies → Product Families → Ecosystem (dark, partner grid) → Application Markets → Developer Experience (with Rust code window) → Final CTA → Footer

**All other pages restyled to the same system:**
About, ProductSuite, ContactPage, Marketplace, Partners, DeveloperPortal, IDEDownloads, WebIDEPage, SecureBoot, CryptoStack, RTOSBenchmark, Login — all use `tv-h1/h2/h3/lede` classes and share the new nav/footer/eyebrow language.

**Verified content — nothing fabricated:**
Only real partners, real standards names, real modules. No fake stats, benchmarks, timelines or countries.

### Phase 12b — Content Cleanup & Font Rightsizing (Feb 12, 2026)
- Reduced font scale platform-wide: Landing hero 140px → 56px; section headings 72px → 36-44px; body 21px → 15-17px
- Tightened Navigation: 72px → 64px height, 13.5px → 13px font, tighter spacing
- Reduced button padding and section vertical rhythm for a more balanced feel
- **Removed ALL made-up numeric claims:**
  - Landing data strip (4 / 48hr / 60+ / 10B+) — entire strip removed
  - Landing "NOW SHIPPING v1.0" status badge — removed
  - Landing dark section 4-stat grid (130+ / 400K+ / 60+ / #1) — removed, kept the story text only
  - About "Backed by Bosch" 4-stat grid — same treatment
  - RTOS benchmark table with specific ns numbers — removed
  - "9× faster context switch", "12× faster task creation" claims on RTOS cards — removed
  - Secure Boot "~8 KB flash footprint" specific size claim — removed
  - "48-hour certification turnaround" mentions across About + Developer Portal — replaced with neutral language
- Kept only factual/verifiable content: standards names, partner company names, module names, Bosch parent brand, Made in India

### Phase 12 — MIPS-Inspired Full Redesign (Completed — Feb 12, 2026)
- Complete platform redesign inspired by mips.com editorial minimalism
- New global theme: Space Grotesk (display) + Outfit (body) + JetBrains Mono; retained brand palette (Berkeley Blue #003262, Cyan #00B4E0, Gold #FDB515, SignOff Green #0F6E56)
- New CSS design system in /app/frontend/src/index.css (tv-container, tv-eyebrow, tv-display, tv-btn variants, tv-section, tv-card, motion keyframes)
- New global components:
  - Navigation.jsx — sticky minimal top bar with underline-active nav, "Request a demo" primary CTA
  - Footer.jsx — dark navy footer with big brand wordmark, 3 link columns, standards row
  - PageHero.jsx — reusable large editorial header (up to 88px display)
- 11 pages fully rewritten:
  - Landing — 140px hero, partner marquee, mission editorial paragraph, 4 numbered module rows, industry grid, standards list, dark Bosch story, roadmap, final CTA
  - About — mission (3 pillars), 8 structural gaps grid, roadmap + consortium tiers, Backed by Bosch
  - ProductSuite — 4-module alternating rows, dark IP integration section (SiFive/Akeana/MIPS ARC-V + C-DAC/Mindgrove/Upbeat), sub-brands, pricing tiers
  - Contact — 2-col with contact cards + form (submits to /api/applications/sales-inquiry)
  - Marketplace — sticky toolbar with Hardware/IP tabs + search
  - Partners — numbered Indian partner rows + dark Global IP section
  - DeveloperPortal — quick-start terminal + 6 expandable doc sections
  - IDEDownloads — hero + 21-feature grid + comparison table
  - WebIDEPage — hero with code window preview + 3 features
  - SecureBootPage / CryptoStackPage / RTOSBenchmarkPage — sub-product pages
  - Login — 2-column editorial (dark navy left pane + form right pane)
- Testing (iteration_32.json): 21/21 checks PASS, 100% frontend success, zero console errors

### Phase 11 — Ecosystem-First Strategy (Completed - Aug 2026)
- Landing + Products pages restructured to 4-Module ecosystem architecture
- HeroSection extracted; Indian flag fixed; Pillar → Module; SiFive/Akeana featured
- Content aligned with competitor research (SiFive, Akeana, MIPS, Bosch)

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

### Phase 14: Bosch-Grade Uniform Page Headers + Hero Refinement (Completed - Feb 2026)
- **Navigation**: Removed Bosch red top border (`#E20015`), replaced with thin 2px Berkeley Blue (`#003262`) brand strip. Softer shadow on nav bar.
- **Landing Hero**: Removed the multi-color tri-gradient strip; replaced gold-highlight underline + ping-dot Made-in-India badge with a refined tricolor flag chip + slate-50 background. Reduced heading size from `lg:text-[62px]` to `lg:text-[52px]`, tightened spacing, smaller button height (12 → 11), single soft Berkeley Blue accent halo for clean Bosch-grade look.
- **TrustedVLogo `xl` size**: Reduced from `scale-[1.8]` to `scale-[1.35]` for proper visual weight in hero contexts.
- **New `PageHero` component** at `/app/frontend/src/components/PageHero.jsx`: Reusable uniform page header with light theme, Berkeley Blue eyebrow line decoration, large slate-900 headline, optional right column for visuals/CTAs. Exports `RiscV` branded wordmark helper.
- **Applied PageHero to all secondary pages** for consistent top section: About, ProductSuite, ContactPage, Marketplace (with partner logos), Partners, DeveloperPortal (with search), WebIDEPage (with browser mockup), CryptoStackPage (with standards card), SecureBootPage, RTOSBenchmarkPage, IDEDownloads (with IDE screenshot + light problem/solution panels moved to dedicated section).
- **ProductSuite "Development Tools"**: 2-card grid expanded from `max-w-3xl` to `max-w-5xl` so the Jarvyn IDE and WebIDE cards have proper presence alongside other multi-card categories.

### Phase 15: TRUSTED-V Re-Branding + Hero Re-imagining + 3rd Product (Completed - Feb 2026)
- **Brand-wide rename**: "TRusteD-V" / "TrusteD-V" → "TRUSTED-V" in all body copy across all pages via sed bulk replace. Component name `TrustedVLogo` preserved.
- **Logo lockup**: `TrustedVLogo` now renders "TRUSTED" in Berkeley Blue and "-V" in Gold; new SVG wrapper file at `/public/trustedv-rocket-logo.svg` (xlink:href + href for compatibility) — PNG used in rendering for guaranteed render.
- **Landing Hero**: New tagline "Rust-Native RISC-V Software Platform" replacing "Secure RISC-V from Silicon to Application". Removed Explore Products / Talk to Engineers / Download Jarvyn CTAs. Removed 48hr/5-Layer/2-Products stat row. Removed bottom "Built to global standards" trust strip (duplicated certs section). Removed code preview from right column; replaced with a large prominent rocket+chip+RISC-V emblem (78% col width, max 420px) with soft Berkeley Blue → Gold halo and drop-shadow. India flag now rendered as inline SVG (orange/white/green with navy chakra) instead of emoji.
- **Code window relocated**: The rich Jarvyn-themed code preview moved to WebIDEPage right column (replacing the simpler browser mockup).
- **Our Products section**: Expanded from 2 → 3 cards (`md:grid-cols-2 lg:grid-cols-3`, `max-w-6xl`). New 3rd card: **TRUSTED Certification** with `BadgeCheck` icon, dark amber accent `#B45309`, describing independent vendor-neutral 3rd-party certification programme. Removed all "Sub-brand 01 / 02" badges. Updated heading to "A growing portfolio under one trusted brand" and subtitle to allow more brands.
- **Pricing section**: Replaced `$499/yr` (Pro) and `Custom` (Enterprise) with `Talk to Sales`; updated CTAs accordingly with `/contact?plan=*` links.
- **Standards Compliance section**: Redesigned (was duplicating the removed hero "Built to global standards" strip). New 2-column layout (1fr / 1.4fr): left intro panel with "Standards Compliance" eyebrow, large headline, paragraph, and industry tags (Automotive / Industrial / IoT / Defence / Medical). Right: 3-column 12-cert grid (added ISO/SAE 21434 and ETSI EN 303 645) with hover-glow cards.

## Key Pages & Routes
| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero + Engine + Simulation + Pricing + Partners |
| `/about` | About | Company info, animated counters |
| `/product-suite` | Products | 4 categories, Learn More links |
| `/product/secure-boot` | Secure Boot | rboot + rustBoot, GitHub, boot chain |
| `/product/crypto-stack` | Crypto Stack | 8-category algorithm reference tables |
| `/product/rtos-benchmark` | RTOS Benchmarks | 4 RTOS options, comparison table |
| `/engagement-models` | Engagement Models | SaaS / PaaS 5-step flows, fit table, CTAs |
| `*` | NotFound (404) | Catch-all — brand 404 with home CTA + 3 suggestion cards |
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
- **ChatGPT / OpenAI model integration** (user-requested, deferred from Jun 2026 round — call integration_expert first)
- Refactor monolithic `server.py` into modular APIRouter modules
- Complete "Solution Builder" AI code generation
- Refactor `SmartProjectBuilder.jsx` (916 lines) into smaller components

### P2 — Medium
- Admin panel: sales inquiries tab in AdminApplications.jsx
- Customer testimonials/case studies section
- Fix React "index as key" anti-patterns in SmartProjectBuilder, Marketplace, Partners, AdminSoftware
- Add Python type hints across backend

### P3 — Future
- Public release (remove auth lock)
- Enhanced project versioning UI in "My Projects"
- Email notifications for applications
- Replace placeholder user avatar initials

## 3rd Party Integrations
- Gemini 3 Flash via emergentintegrations (Emergent LLM Key)

## Strategic Positioning (Aug 2026)
Per strategic PDF: TRUSTED-V repositioned as **"The Complete RISC-V Platform — From IP to Software to Silicon"** — a full integrated ecosystem, not just a Rust-based software platform.

**Four Pillars Product Architecture:**
1. **RISC-V Development Platform** — IDE (Jarvyn), WebIDE, Debugger/Programmer/Trace
2. **Virtualization & Simulation** (NEW) — Virtual Platform, RISC-V Hypervisor, Simulator
3. **Secure Rust Software** — rBoot, rustBoot, RTOS, HAL/PAC/HAM, Crypto Stack, SDKs
4. **Silicon SignOff & Trust** — SignOff Silicon, TRUSTED-V Verified, TVOTS

**Partner Ecosystem highlighted (SiFive, Akeana, C-DAC, Mindgrove, Upbeat Tech)** across Landing + Products pages.
> CORRECTION (Jun 2026): There is NO MIPS / MIPS ARC-V tie-up. IP partners are **SiFive and Akeana only**. Any earlier mention above is void.

## Recent Changes Log
- **Jun 2026 — Hero animation smoothing**
  - Final user direction: `StackVisual.jsx` is now completely static. Removed every hero-specific animation selector, keyframe, animation class, and delay from the landing illustration; its outlines, checks, rail, badge and stack now render at stable fixed opacity.
  - Verified manually in the external preview: authenticated with the admin test account and confirmed the static homepage hero renders without console errors or layout shifts.

- **Jun 2026 — Rebuild Kit + Object Storage**
  - Authored `/app/docs/rebuild-kit/` — full-fidelity rebuild documentation set: `00_MASTER_PROMPT.md` (941 lines: stack, routes, models, API contract, page-by-section specs with copy, data-testid map, 9-phase build plan, acceptance tests), `01_PHILOSOPHY_AND_STORY.md` (core philosophy, 8 structural gaps, 6-layer block story, homepage narrative arc, voice & tone, past mistakes), `02_DESIGN_SYSTEM.md` (exact tokens, type scale, layout rhythm, ui-kit contracts, forbidden patterns), `README.md`.
  - Zipped to `/app/docs/TRUSTED-V_Rebuild_Kit.zip` and published at `/TRUSTED-V_Rebuild_Kit.zip` (frontend/public) for download.
  - **Migrated all file uploads from pod-local disk to Emergent managed object storage** (`/app/backend/storage.py`). Affects IDE binary upload/download and hardware image upload/serve. Removed `uploads/ide` and `uploads/hardware` dirs and the `FileResponse` disk reads. Mongo now stores `storage_path` / `image_storage_path`. Verified end-to-end via curl (upload → download byte-identical; image serves as image/png). Fixes the deployment blocker where uploads vanished on pod restart.
  - Note: the API key must be read *lazily inside* `init_storage()` — reading it at module import time fails because `storage.py` is imported before `load_dotenv()`.

- **Aug 2026**: Landing.jsx + ProductSuite.jsx upgraded to reflect PDF's ecosystem-first positioning. Added: Partner Strip, "RISC-V Without Fragmentation" section, 4-pillar architecture (added Virtualization pillar), Virtual First workflow diagram, "Who is TRUSTED-V For?" audience segmentation, "RISC-V IP Integration" section on Products page featuring SiFive/Akeana/MIPS ARC-V/C-DAC/Mindgrove.
- **Feb 2026**: Hero chip hover-reveal animation, standardized RISC-V colors (Navy #003262 + Cyan #00B4E0), unified PageHero component across secondary pages, updated tagline.

---
*Last Updated: August 2026*
