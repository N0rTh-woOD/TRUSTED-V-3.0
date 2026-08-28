# TRUSTED-V — MASTER REBUILD PROMPT

> **How to use this file:** paste this entire document into any capable coding agent as the primary
> build instruction. Attach `01_PHILOSOPHY_AND_STORY.md` (the *why*, the narrative, the voice) and
> `02_DESIGN_SYSTEM.md` (the *how it looks*, exact tokens and component contracts). This file is the
> *what to build* — architecture, routes, data models, API contracts, page-by-section specs, copy
> blocks, `data-testid` map, phased build plan and acceptance tests.
>
> Read all three files fully before writing a single line of code.

---

## 0. ONE-PARAGRAPH BRIEF

Build **TRUSTED-V** — an enterprise-grade web platform for a Rust-native RISC-V compute platform.
It is simultaneously (a) a semiconductor-industry **marketing site** that must read like MIPS.com or
SiFive.com — precise, factual, editorial, zero hype — and (b) a real **developer product**: an
authenticated portal with a hardware/IP marketplace, an AI-assisted Rust firmware project generator,
IDE binary distribution, partner/board application intake, and a full admin back-office. It is a
Bosch Global Software Technologies (BGSW) initiative, designed and built in India, and the site's
credibility depends on **never stating a number, benchmark, customer count or certification that has
not actually been earned**.

---

## 1. NON-NEGOTIABLE RULES

These are the rules that previous builds got wrong. Treat them as hard constraints.

### 1.1 Content truth rules (highest priority)
1. **No fabricated metrics.** Never write "10B+ devices", "130+ years", "400K+ associates",
   "48-hour certification", "9× faster context switch", "~8 KB flash footprint", "#1 supplier",
   or any latency/throughput number. If a number is not verifiable, delete the number and keep the
   claim qualitative.
2. **No fake artefacts.** No whitepaper downloads, no press releases, no case studies, no customer
   testimonials, no "trusted by 500 teams" logo walls, no news carousel, no video library — unless
   real content is supplied.
3. **IP partners are exactly two: SiFive and Akeana.** Never add MIPS, MIPS ARC-V, Arm, Andes,
   Nuclei or any other IP vendor to the partner list. This is a factual/legal constraint.
4. **Indian silicon partners: C-DAC (VEGA / DHRUV / ARIES), Mindgrove (IIT Madras), Upbeat Tech.**
   Open cores that may be *referenced* as supported: CVA6 (Ariane), Ibex (lowRISC), OpenTitan,
   PULP RI5CY. These are ecosystem support statements, not partnerships.
5. **Standards may be named as alignment targets, never as achieved certifications.** Allowed
   phrasing: "ISO 26262 aligned", "PSA L3-aligned", "certification-friendly", "built to global
   standards". Forbidden phrasing: "ISO 26262 certified", "CC EAL4+ certified".
   Standard names usable in the footer strip: CC EAL4+, FIPS 140-3, PSA L3, ISO 26262, IEC 62443,
   SLSA L3, ISO/SAE 21434, ETSI EN 303 645.
6. **No version tags** like "v1.0", "Now in private preview", "Now shipping" anywhere in chrome.
7. **No em dashes in visible product copy** where a colon, comma or period reads better. (Editorial
   preference carried from earlier reviews; en dashes and `·` middots are used heavily instead.)
8. **CTA copy must be diversified.** Never repeat one CTA phrase site-wide. Canonical mapping:
   - Header → `Request a demo`
   - Landing hero → `Explore the platform` + `Talk to our engineers`
   - Landing final → `Start a project` + `Read the docs`
   - Virtualization band → `Explore virtualization` + `Book a technical deep-dive`
   - Footer → `Contact us`
   - IDE page → `Download Jarvyn` + `Try WebIDE`
   - Partners → `Apply as a partner` + `Board support`

### 1.2 Engineering rules
1. Backend: **FastAPI**, every route prefixed `/api`. Frontend calls only
   `process.env.REACT_APP_BACKEND_URL`. Backend reads only `os.environ` (`MONGO_URL`, `DB_NAME`,
   `JWT_SECRET`, `CORS_ORIGINS`, `EMERGENT_LLM_KEY`). No hardcoded URLs, no default fallbacks for
   secrets.
2. **File uploads must go to managed object storage, never to pod-local disk.** (Uploaded IDE
   binaries and hardware images. See §6.6.)
3. MongoDB: never return raw documents. All ids are string UUIDs (`str(uuid.uuid4())`), not
   ObjectIds. Timestamps: `datetime.now(timezone.utc)`.
4. Frontend is **.js / .jsx only** — no TypeScript. Path alias `@/` → `src/`.
5. Every interactive element and every user-facing value carries a unique kebab-case
   `data-testid` (see §8).
6. Components stay small. Each page file composes named section components defined in the same file
   or imported from `components/`. Target < 400 lines per page file; extract when longer.

---

## 2. STACK

| Layer | Choice |
|---|---|
| Frontend | React 18 (CRA-style, `.jsx`), React Router v6, TailwindCSS, shadcn/ui primitives, `lucide-react` icons, `sonner` toasts, `axios` |
| Backend | FastAPI, `motor` (async MongoDB), `passlib[bcrypt]`, `PyJWT`, `pydantic` v2 |
| DB | MongoDB |
| AI | Gemini 3 Flash via managed LLM gateway (single universal key, provider switchable from admin) |
| Storage | Managed object storage for binaries/images |
| Fonts | IBM Plex Sans, IBM Plex Mono, Sora (display, sparing) |

Directory shape:

```
/app
├── backend/
│   ├── server.py            # app + api_router; split into routes/ modules if > 800 lines
│   ├── storage.py           # object-storage helpers (init/put/get)
│   ├── requirements.txt
│   └── .env                 # MONGO_URL, DB_NAME, JWT_SECRET, CORS_ORIGINS, EMERGENT_LLM_KEY
└── frontend/
    ├── tailwind.config.js   # brand tokens + font families + radii
    ├── public/              # trustedv-brand-logo.png, make-in-india.jpg
    └── src/
        ├── index.css        # design-system layer (tv-* utilities). SEE 02_DESIGN_SYSTEM.md
        ├── App.js           # router + site auth lock
        ├── contexts/AuthContext.jsx
        ├── components/
        │   ├── ui/          # shadcn primitives
        │   ├── ui-kit.jsx   # enterprise primitives (Eyebrow, SectionHeader, ProductCard, …)
        │   ├── Navigation.jsx
        │   ├── Footer.jsx
        │   ├── PageHero.jsx
        │   ├── TrustedVLogo.jsx
        │   └── ProtectedRoute.jsx
        └── pages/
            ├── Landing.jsx  About.jsx  ProductSuite.jsx  Marketplace.jsx  Partners.jsx
            ├── DeveloperPortal.jsx  IDEDownloads.jsx  WebIDEPage.jsx
            ├── SecureBootPage.jsx  CryptoStackPage.jsx  RTOSBenchmarkPage.jsx
            ├── ContactPage.jsx  ContactSales.jsx  BoardSupportRequest.jsx
            ├── PartnerRegistration.jsx  Login.jsx  Register.jsx
            ├── SmartProjectBuilder.jsx  MyProjects.jsx  AccountSettings.jsx
            └── admin/  (Dashboard, Hardware, Middleware, Software, IDE, LLM, Applications, Users)
```

---

## 3. INFORMATION ARCHITECTURE

### 3.1 Routes

| Route | Page | Access |
|---|---|---|
| `/` | Landing | site-locked |
| `/about` | About | site-locked |
| `/product-suite` | ProductSuite (anchors `#development`, `#virtualization`, `#secure-software`, `#signoff`, `#ip`, `#certification`) | site-locked |
| `/product/secure-boot` | SecureBootPage | site-locked |
| `/product/crypto-stack` | CryptoStackPage | site-locked |
| `/product/rtos-benchmark` | RTOSBenchmarkPage | site-locked |
| `/marketplace` (alias `/hardware-catalog`) | Marketplace | site-locked |
| `/developer-portal` | DeveloperPortal | site-locked |
| `/download-ide` (alias `/ide`) | IDEDownloads | site-locked |
| `/webide` | WebIDEPage | site-locked |
| `/partners` | Partners | site-locked |
| `/partner-registration` | PartnerRegistration | site-locked |
| `/board-support` | BoardSupportRequest | site-locked |
| `/contact` | ContactPage | site-locked |
| `/contact-sales` | ContactSales (accepts `?plan=pro|enterprise`) | site-locked |
| `/blog` | Blog | site-locked |
| `/login` | Login | public |
| `/register` | redirect → `/` (registration disabled) | – |
| `/solution-builder` (alias `/builder`) | SmartProjectBuilder | authenticated |
| `/projects` (alias `/my-projects`) | MyProjects | authenticated |
| `/account` | AccountSettings | authenticated |
| `/admin`, `/admin/hardware`, `/admin/middleware`, `/admin/software`, `/admin/ide`, `/admin/llm`, `/admin/applications`, `/admin/users` | Admin pages | admin only |

### 3.2 Site auth lock
`App.js` exports a single flag `const SITE_LOCK_ENABLED = true;`. When true and the visitor is
unauthenticated, **every** route renders `<Login />` and all paths redirect to `/login`. Flipping the
flag to `false` makes the marketing pages public without any other code change. Keep it a single
literal so it is a one-line release switch.

Also in `App.js`: a `<ScrollToTop />` component that scrolls to top on `pathname` change, a
`ThemeProvider` (default `light`, storage key `trusted-v-theme`), `AuthProvider`, `<Navigation />`,
`<main>` with routes, `<Footer />`, `<Toaster />`.

### 3.3 Header (`Navigation.jsx`)
- Sticky, **76px** tall, solid white (never transparent), 1px bottom border `#E5E4DF`; on scroll > 8px
  add a hairline shadow. No announcement bar.
- Left: `TrustedVLogo size="sm"` (34px) linking `/`.
- Nav items, 14px medium, `#1A1F25`, hover/active `#003262`:
  `Home` (`/`), `Products` (mega, **also a real link** to `/product-suite`), `Marketplace`,
  `Developers` (`/developer-portal`), `Ecosystem` (`/partners`), `About`.
- **Products mega-menu**: opens on hover (150ms close delay), closes on route change. Full-bleed
  white panel under the header, `grid-cols-12`, four columns of 3:
  - *Development Platform* → Jarvyn IDE (`/download-ide`, "Rust-native RISC-V IDE"), WebIDE
    (`/webide`, "Zero-install cloud IDE"), Developer Portal ("SDK, docs, quickstarts")
  - *Software & Security* → Secure Boot ("rBoot & rustBoot"), Crypto Stack ("Classical + PQC"),
    RTOS Options ("Rust-native, Zephyr, FreeRTOS")
  - *Silicon & IP* → Product Suite Overview ("The full platform"), Marketplace ("Boards & IP
    blocks"), Ecosystem ("SiFive, Akeana, C-DAC")
  - *All products* (left border divider): h4 "The complete RISC-V platform", 13px note, CTA
    "View all products" → `/product-suite`
- Right cluster: `Admin` link (admins only, shield icon), `Settings` gear → `/account`,
  `Log out` / `Sign in`, then primary CTA `Request a demo` → `/contact` (`tv-btn tv-btn-primary tv-btn-sm`).
- Mobile (< lg): hamburger toggle; drawer with a "Products" group (Product suite, Jarvyn IDE, WebIDE,
  Secure Boot, Crypto Stack, RTOS), then flat links, then full-width Sign in + Request a demo buttons.

### 3.4 Footer (`Footer.jsx`)
Dark `#00162B`, white text, three stacked bands:
1. **Brand + links** — left column (4/12): `TrustedVLogo size="md" dark`, 14px paragraph
   *"The complete RISC-V platform. From IP to software to silicon. Rust-native. Secure by design.
   Made in India, engineered by Bosch to the world."*, then underlined CTA `Contact us`.
   Right (8/12): five link columns with mono uppercase headings —
   **Products** (Product Suite, Jarvyn IDE, WebIDE, Marketplace) ·
   **Technology** (Secure Boot, Crypto Stack, RTOS) ·
   **Developers** (Developer Portal, Download IDE, Board Support) ·
   **Ecosystem** (Partners, Partner Registration) ·
   **Company** (About, Contact).
2. **Standards row** — mono label `Built to global standards` + the eight standard names as flat
   mono text (no badges, no logos).
3. **Base row** — `© {year} TRUSTED-V. A Bosch initiative. All rights reserved.` on the left;
   `Powered by Bosch` and a pulsing green dot + `All systems operational` on the right.

Only link to destinations that exist. No social icons unless real accounts are supplied.

---

## 4. PAGE SPECS (section by section, with copy)

Type classes (`tv-h1`, `tv-h2`, `tv-lede`, `tv-eyebrow`…) and components (`Eyebrow`,
`SectionHeader`, `ProductCard`, `MarketCard`, `PartnerGrid`, `TechnicalMetric`, `PrimaryCTA`,
`SecondaryCTA`, `PageHero`) are defined in `02_DESIGN_SYSTEM.md`. Use them; do not invent parallel
styles.

### 4.1 Landing (`/`) — eleven sections, in this exact order

The order matters: the *differentiators* (IP integration, virtualization) come **before** the
architecture diagram, so a skimming semiconductor buyer hits the unique value in the first two
scrolls.

`Hero → PlatformIntro → RiscVIPCollaboration → VirtualizationSpotlight → PlatformArchitecture →
CoreTechnologies → ProductFamilies → Ecosystem → ApplicationMarkets → DeveloperExperience → FinalCTA`

**1. Hero** (`data-testid="landing-hero"`) — white, subtle dot-grid backdrop at 60% opacity, one
cyan ambient blur circle top-right. 12-col grid: text 7 cols, visual 5 cols.
- Eyebrow: `RISC-V compute platform`
- H1 (`tv-h1`): `Build secure, software-defined` / newline / `compute systems on ` + `RISC-V` in
  `#003262` + `.`
- Lede: *"TRUSTED-V is a Rust-native platform that unifies RISC-V IP integration, virtualization,
  secure boot, cryptography and real-time software, engineered for mission-critical silicon and
  shipped in the open."*
- CTAs: `Explore the platform` → `/product-suite` (primary, lg) · `Talk to our engineers` →
  `/contact` (secondary, lg)
- Inline partner strip: mono label `Co-verified with` then `SiFive · Akeana · C-DAC · Mindgrove`
  as 13.5px semibold text. **No logo images, no marquee.**
- Right visual: hand-authored **inline SVG reference SoC die** (`data-testid="hero-visual"`), 5:4
  aspect, `#F7F7F5` surface, 1px border: die outline rect stroked `#003262`; 14 pin rects top and
  bottom, 10 left and right at 35% opacity; interior blocks labelled in IBM Plex Mono —
  `RISC-V CORE / RV64GC` (cyan-soft fill), `VECTOR / RVV 1.0`, `RoT`, `HYPER`, and a
  `SECURE SUBSYSTEM` block in amber `#B45309`; three short trace lines between blocks; corner
  labels `0x0000` and `TRUSTED-V/1.0`; bottom-left caption `Reference SoC · illustrative`.
- Below the grid: a 4-column proof strip separated by 1px borders (mono uppercase key / 15px value):
  `RISC-V native → RV32 · RV64 · Vector` | `Language → Rust-first, memory safe` |
  `Security → PQC-ready root of trust` | `Deployment → IP → SoC → firmware → apps`

**2. PlatformIntro** (`platform-intro`) — `#F7F7F5`, tight rhythm. 3-col eyebrow
`What TRUSTED-V provides` beside a 9-col oversized statement (22→28px, line-height 1.3):
*"An open, modular platform for mission-critical RISC-V systems — spanning IP integration,
virtualization, secure boot, cryptography, real-time software and developer tooling. Engineered by
Bosch. Built in India. Shipped in the open."* The middle clause is set in muted grey; the first and
last sentences in ink. That two-tone treatment is the whole visual idea — no cards.

**3. RiscVIPCollaboration** (`riscv-ip`) — white.
SectionHeader: eyebrow `RISC-V IP & collaborations`; title *"Co-verified with the leaders of the
**open RISC-V ecosystem**."* (bold span in `#003262`); lede *"TRUSTED-V is IP-agnostic by design.
Our reference stack ships pre-integrated with performance-class and automotive-grade RISC-V IP, with
room to extend to any RISC-V family."*; action link `See all partners` → `/partners`.
Two wide cards (`md:grid-cols-2`), never three:
- **SiFive** — role `Performance RISC-V IP`, mono note `P550 · P870-A · U-series cores`,
  body: *"High-performance application-class cores co-verified with the TRUSTED-V boot chain, RTOS
  and Rust toolchain."*
- **Akeana** — role `Automotive-grade RISC-V`, mono note `5100 series · ISO 26262 aligned`,
  body: *"Safety-oriented RISC-V IP pre-integrated with TRUSTED-V secure boot, attestation and Rust
  firmware stacks."*

Then a bordered "Also supported" band: 4-col paragraph *"Indian sovereign silicon programmes —
C-DAC (VEGA / DHRUV), Mindgrove and Upbeat Tech — plus open cores such as CVA6, Ibex and
OpenTitan."* beside an 8-col 3-column list: `C-DAC · VEGA / DHRUV`, `Mindgrove · IoT SoC`,
`Upbeat Tech · Edge AI`, `CVA6 (Ariane)`, `Ibex · lowRISC`, `OpenTitan RoT`.

**4. VirtualizationSpotlight** (`virtualization-spotlight`) — dark `#00162B`, gold accents. Only
one dark band this high on the page; it is the page's visual anchor.
- Eyebrow in gold `#FDB515`: `Virtualization & simulation`
- H2: `Ship firmware before ` + `RTL freezes` (gold) + `.`
- Body: *"The TRUSTED-V virtual platform, RISC-V hypervisor and cycle-approximate simulator let
  firmware, OS and application teams boot the entire stack on a virtual SoC, long before silicon,
  FPGA, or even final RTL is available."*
- Bulleted list (gold dots): virtual RISC-V SoC with configurable core count and peripherals ·
  Type-1 hypervisor for mixed-criticality workloads · cycle-approximate simulator for performance and
  driver bring-up · attestation and secure-boot testing in pure software.
- CTAs: `Explore virtualization` → `/product-suite#virtualization` (white-on-dark) ·
  `Book a technical deep-dive` → `/contact` (outline-on-dark)
- Right: **5-layer hypervisor topology diagram** — stacked bordered rows, each with mono
  `Layer 01…05`, a 13.5px label and a gold tag chip. Rows top→bottom:
  `Host: TRUSTED-V Hypervisor` **TYPE-1** (gold-tinted, highlighted) ·
  `VM 1 · Zephyr RTOS` **SAFETY** · `VM 2 · Rust async runtime` **REAL-TIME** ·
  `VM 3 · Linux user-space (CVA6)` **GENERAL** · `Virtual RISC-V SoC (RV64GC + RVV)` **GUEST HW**.
  Caption bottom-right: `Illustrative topology · TRUSTED-V/1.0`.

**5. PlatformArchitecture** (`platform-architecture`) — `#F7F7F5`. **This is the centrepiece and it
must not be a card grid.** It is a coloured-band block diagram.
SectionHeader: eyebrow `Platform architecture`; title *"Six layers. **One coherent stack**."*;
lede *"TRUSTED-V is a full-stack RISC-V platform. Every layer is designed to interoperate: swap the
IP, keep the toolchain; add an RTOS, keep the boot chain. Ship real silicon, real firmware, real
applications."*; action `Explore the suite` → `/product-suite`.
Layout: 8 cols diagram + 4 cols spec sidebar.
- A 52px left rail with a vertical hairline and two rotated mono annotations: `Software ↑` at the
  top, `Silicon ↓` at the bottom.
- Six stacked band cards, each: 4px coloured left strip, mono layer tag, band title, a right-aligned
  `N components` chip tinted with the band colour, and an inner 4-column grid of component tiles
  (12.5px name + 10px mono note on `#FAFAF7`). Bands top→bottom (`L05` down to `L00`):

  | Tag | Band | Colour | Components (name — note) |
  |---|---|---|---|
  | L05 | Application | `#003262` | Automotive — ISO 26262 aligned · Industrial — IEC 62443 · IoT & Consumer — PSA L3 · Robotics & Edge AI — Real-time |
  | L04 | Developer Toolchain | `#00B4E0` | Jarvyn IDE — Rust + RISC-V native · WebIDE — Zero-install cloud · SDK · cargo · LLVM — Signed toolchain · Debugger · Trace — SVD register view |
  | L03 | Rust Runtime & OS | `#0F6E56` | TRUSTED-V RTOS — Memory-safe · Zephyr · FreeRTOS — Ecosystem · Embassy (async) — Cooperative · HAL · PAC · HAM — Peripheral access |
  | L02 | Virtualization | `#5B21B6` | Type-1 Hypervisor — Mixed-criticality · Virtual Platform — Pre-silicon SoC · Cycle-approx Simulator — Bring-up |
  | L01 | Secure Boot & Crypto | `#B45309` | rBoot — First stage · rustBoot — A/B · OTA · PQC · Crypto Stack — Classical + PQC · Attestation — TVOTS quote |
  | L00 | RISC-V IP & Silicon | `#0B0F14` | SiFive — Performance IP · Akeana — Automotive-grade IP · C-DAC · Mindgrove — Indian silicon · Reference SoC — Boards & kits |

- Sidebar: `TechnicalMetric` spec sheet rows — `ISA → RV32 · RV64 · Vector (RVV)`,
  `Language → Rust — no_std, embedded HAL`, `Boot chain → rBoot → rustBoot → App`,
  `Attestation → Silicon RoT + firmware`, `Virtualization → Type-1 hypervisor`,
  `OS Support → RTOS + Linux (via CVA6)`, `Crypto → Classical + Post-Quantum`.
  Below it a `Data flow` panel with five mono steps: `01 · Silicon boots ROM RoT`,
  `02 · ROM verifies rBoot`, `03 · rBoot verifies rustBoot`, `04 · rustBoot verifies App`,
  `05 · Attestation quote sent`.

**6. CoreTechnologies** (`core-technologies`) — `#F7F7F5`. Eyebrow `Core technologies`, H2
*"What the platform is made of."*, lede *"The engineering primitives that power TRUSTED-V, each
shipped as a standalone module, and pre-integrated when combined."* Six `ProductCard`s
(3-col desktop): RISC-V native → `/product-suite` · Security by construction →
`/product/secure-boot` · Virtualization → `/product-suite#virtualization` · Real-time software →
`/product/rtos-benchmark` · Cryptography → `/product/crypto-stack` · Rust developer tooling →
`/developer-portal`. (Descriptions: one sentence each, naming real technologies only.)

**7. ProductFamilies** (`product-families`) — white. Eyebrow `Product families`, H2 *"Four modules.
One RISC-V platform."*, action `See the full suite`. Four `ProductCard`s (2-col) with
`MODULE 01…04` eyebrows and 3 bullets each:
`Development Platform` → `/download-ide` · `Virtualization & Simulation` →
`/product-suite#virtualization` · `Secure Rust Software` → `/product/secure-boot` ·
`Silicon SignOff & Trust` → `/product-suite#certification`.

**8. Ecosystem** (`ecosystem`) — `#F7F7F5`. Eyebrow `A growing partner network`, H2 *"Silicon,
software and academic partners."*, lede about spanning the RISC-V value chain, action
`Meet the partners`. `PartnerGrid` of 6 hairline cells (name + mono note):
SiFive — Performance RISC-V IP · Akeana — Automotive RISC-V · C-DAC — VEGA sovereign silicon ·
Mindgrove — Secure IoT SoCs · Upbeat Tech — Edge-AI SoCs · OpenTitan — Silicon root of trust.

**9. ApplicationMarkets** (`application-markets`) — white. Eyebrow `Application markets`, H2
*"Where TRUSTED-V ships."*, lede *"From safety-critical automotive ECUs to sovereign defence
silicon, TRUSTED-V is architected for systems that cannot fail, and cannot be untrusted."*
Six `MarketCard`s (3-col), each mono label + headline + three capability lines:
`AUTOMOTIVE` "Secure compute for software-defined vehicles." · `INDUSTRIAL` "Deterministic control
for factories and grids." · `IOT & CONSUMER` "Root of trust for connected devices." · `ROBOTICS`
"Real-time compute for autonomous systems." · `DEFENCE & AEROSPACE` "Sovereign silicon for critical
missions." · `EDGE AI` "Physical AI on virtualized RISC-V."

**10. DeveloperExperience** (`developer-experience`) — `#F7F7F5`. Left 6 cols: eyebrow
`Developer experience`, H2 *"Rust-native. RISC-V-first. Cargo everywhere."*, lede about Jarvyn +
WebIDE + SVD register view + signed toolchain + HAL/PAC crates, CTAs `Download Jarvyn` →
`/download-ide` and `Try WebIDE` → `/webide`. Right 6 cols: a **code window** — `#0B0F14` surface,
macOS chrome with three muted dots, mono filename `main.rs`, gold `RV64GC` badge; syntax-tinted Rust:

```rust
// TRUSTED-V — secure boot + attestation
use trusted_v::rboot::verify_chain;
use trusted_v::crypto::attest;
use trusted_v::rtos::launch;

#[no_std]
#[no_main]
fn main() {
    let chain = verify_chain(&BOOT_KEY);
    let quote = attest(chain);
    launch("rt_secure", quote);
}
```

Status bar: `$ cargo build --release` on the left, green `✓ signed · verified` on the right.

**11. FinalCTA** (`final-cta`) — white, tight. Eyebrow `Start building`, H2 *"Start on **RISC-V**.
Ship on **TRUSTED-V**."* (both marks `#003262`), CTAs `Start a project` → `/contact` and
`Read the docs` → `/product-suite`.

### 4.2 Login (`/login`) — premium two-pane, no marketing chrome
Full-viewport `grid lg:grid-cols-[1.15fr_1fr]`.
- **Left pane** (hidden on mobile): `#00162B`, dark dot-grid at 40%, one navy blur top-left and one
  cyan blur bottom-right. Three vertical zones:
  - Top: `TrustedVLogo size="2xl" dark` → **120px tall**. The logo is deliberately dominant.
  - Middle: gold eyebrow `The complete RISC-V platform`; H1 (clamp 34→48px, line-height 1.05)
    `Software to Silicon,` / `Rust-Native RISC-V.` (second line gold); paragraph *"An open, modular
    platform for building trustworthy edge silicon and mission-critical embedded software. Made in
    India, engineered by Bosch to the world."*; then a 2×2 trust grid — icon tile (8×8, white 6%
    fill, gold icon) + 13px label + 11.5px mono sub:
    `Cpu / RISC-V native / RV32 · RV64 · Vector` · `Shield / Secure by design / rBoot · rustBoot ·
    PQC` · `Layers / Full stack / IP → SoC → firmware → apps` · `KeyRound / Attestable / TVOTS
    quote-based trust`.
  - Bottom: mono `Powered by Bosch · Made in India` and a pulsing green dot + `All systems
    operational`.
- **Right pane**: `#F7F7F5`, centred 440px white card (1px border, soft 20/50 shadow, radius lg,
  p-8/10). Eyebrow `Sign in`, H2 `Welcome back.`, sub *"Access the TRUSTED-V platform, your projects
  and the marketplace."* Fields use uppercase 11px tracked labels; inputs sit on `#F7F7F5` and turn
  white with a navy border on focus. `Work email` (placeholder `you@company.com`), `Password` with a
  `Forgot?` link on the label row. Full-width primary submit `Sign in` (spinner while loading).
  Card footer: mono `Invite-only preview` + `Request access` → `/contact`. Below the card, 11.5px
  centred `By signing in, you agree to our Terms and Privacy policy.`
- Success → `toast.success("Welcome back.")` then navigate `/` (replace). Failure → `toast.error`
  with `error.response.data.detail` or `"Invalid credentials"`.
- **No version tag, no demo credentials printed on screen, ever.**

### 4.3 IDE Downloads (`/download-ide`) — Jarvyn
Custom hero (not `PageHero`), because the product GIF is the hero.
- **Hero row** (`ide-hero`): 7 cols text — eyebrow `Jarvyn IDE`, H1 (clamp 34→56) `An IDE built
  for` / `RISC-V and Rust.` (second line navy), lede *"Jarvyn is the Rust-native RISC-V development
  environment. Purpose-built for embedded, mission-critical firmware, with a hardware-aware editor,
  signed toolchain and integrated QEMU debug from day one."*, CTAs `Download Jarvyn` (href = first
  available build's download URL, else `#downloads`) and `Try WebIDE`.
  5 cols — **latest-release panel** (`ide-download-panel`): mono `Latest release` + pulsing green
  `stable`; up to three build rows fetched from `GET /api/ide-downloads` filtered to entries that
  have a `filename`; each row shows `{platform} · v{version}` plus a truncated mono filename and a
  download icon, linking to `/api/ide-downloads/{id}/download`. Empty state: *"Builds will appear
  here shortly."*
- **Product window** below the hero, full container width (`ide-hero-screenshot`): a `#0B0F14`
  rounded figure with **real macOS chrome** (red `#FF5F57`, amber `#FEBC2E`, green `#28C840` dots),
  mono title `Jarvyn IDE — qemu-hello / src / main.rs`, cyan `RV32` badge, then the product GIF as a
  block `w-full h-auto` image (`data-testid="ide-hero-gif"`, `loading="lazy"`, descriptive alt) and
  an absolute mono caption `Live · Build → Run → Debug (QEMU)`. Big drop shadow. This is the only
  place in the site where a screen recording is used, and it must never be cropped by a fixed
  aspect ratio.
- **21 features** (`ide-features`): eyebrow `Twenty-one reasons`, H2 *"Purpose-built, not
  repurposed."*, then a hairline 3-column grid (`gap-px` on a border-coloured background) of 21
  cells, each with a navy mono `/ 01` index, a 17px title and a 13.5px description. Titles:
  Hardware-native platform · AI trained on embedded · Native Rust analyzer · SVD-driven register
  view · Checkpoint system · Board Support Packages · Cargo-native build · Debugger & programmer ·
  Formal spec inspector · Signed toolchain · Secure Boot integration · Crypto Stack browser · RTOS
  project templates · Trace & profiling · Remote pair sessions · Version-aware refactors ·
  Cross-target simulator · Compliance evidence · Marketplace inside · Multi-user workspaces ·
  First-class docs.
- **Comparison** (`ide-comparison`) on `#FAFAF7`: eyebrow `Jarvyn vs general-purpose IDEs`, H2
  *"What only a purpose-built IDE can do."*, then a 12-col table (`Capability` 7 / `Jarvyn` 2 /
  `General IDE` 3) with green checks, red `X`, or a mono `partial`. Rows: Hardware-aware AI ·
  Native Rust for embedded (`partial` for general) · SVD register visualization · Checkpoints beyond
  git · Signed reproducible toolchain · Secure Boot integration · Cross-target simulator ·
  Compliance evidence bundle. **No timing or size numbers in this table.**
- **CTA** (`ide-cta`): H2 *"Skip the fork. Ship the firmware."* + `Try WebIDE` / `Talk to sales`.

### 4.4 Product Suite (`/product-suite`)
`PageHero` — eyebrow `Product suite`, title `Four modules.` / `One RISC-V platform.`, subtitle
*"A modular, opinionated stack that spans the full path from IP integration to production silicon,
with Rust-native software as the connective tissue."*
1. **ModulesDetail** — four full-width alternating bands (`bg-white` / `#FAFAF7`), each `id` anchored
   (`development`, `virtualization`, `secure-software`, `signoff`). 12-col: 4 cols mono
   `/ MODULE 01` + H2 title, 4 cols 17–19px description, 4 cols a bordered link list of three
   sub-products with hover-lifting arrows.
2. **IPIntegration** (`#ip`, dark `#00162B`) — gold eyebrow `RISC-V IP integration`, H2 *"Bring your
   IP. We'll bring the stack."*, right-aligned paragraph about being IP-agnostic. Hairline 3-col
   grid of six cells: **SiFive** (Featured) "Performance RISC-V cores — P550, P870-A", **Akeana**
   (Featured) "Automotive-grade RISC-V — 5100 series", C-DAC "VEGA processors — Indian sovereign
   silicon", Mindgrove "Secure IoT SoCs from IIT Madras", Upbeat Tech "Custom RISC-V accelerators",
   OpenTitan "Silicon root of trust · open source".
3. **SubBrands** (`#certification`) — eyebrow `A growing portfolio`, H2 *"More than a toolchain. A
   trust framework."*, three cells with 3px coloured top borders: **TRUSTED-V Verified** (`#003262`),
   **SignOff Silicon** (`#0F6E56`), **TRUSTED Certification** (`#B45309`).
4. **PricingCTA** — three hairline cells: `Developer / Free / Download → /download-ide`,
   `Pro / Talk to sales → /contact?plan=pro`, `Enterprise / Talk to sales →
   /contact?plan=enterprise`. **Never print a currency figure.**

### 4.5 About (`/about`)
`PageHero` — eyebrow `About TRUSTED-V`, title `Building trust in the` / `RISC-V ecosystem.`,
subtitle naming the BGSW initiative.
1. **Mission** — 5 cols: eyebrow `Our mission`, H2 *"Close the trust gap in RISC-V."*, two 16.5px
   paragraphs (fragmentation / unclear certification paths gate adoption; TRUSTED-V is the
   opinionated answer). 6 cols: three pillar blocks with 3px navy left borders — `/ 01 Security`,
   `/ 02 Performance`, `/ 03 Time-to-Market`.
2. **StructuralGaps** — `#FAFAF7`, eyebrow `Why TRUSTED-V`, H2 *"Eight structural gaps we close."*,
   2-col hairline grid of 8 cells. Each: mono number, title, the *problem* in muted text, then the
   *answer* in a navy-left-bordered inset. The eight: ISA fragmentation · Unified security framework
   · Supply-chain integrity · SW-HW co-integration · Certification pathway · Enterprise adoption ·
   Platform security layer · Ecosystem coordination.
3. **RoadmapAndConsortium** — left: eyebrow `Roadmap`, H2 *"Where we're heading."*, a 12-col
   timeline list — `2025 – 2026 Foundation (Active, green)`, `2026 – 2027 Ecosystem Growth
   (Committed)`, `2027 – 2029 Industry Adoption (Planned)`. Right: eyebrow `The consortium`, H2
   *"Four tiers of partnership."*, four bordered rows with colour dots — Founding `#003262`,
   Principal `#00B4E0`, Associate `#0F6E56`, Academic & Research `#FDB515`.
4. **BackedByBosch** — dark `#00162B`, gold eyebrow `Powered by Bosch`, H2 *"Engineering discipline
   meets open-source velocity."*, right paragraph: *"Bosch Global Software Technologies leads the
   TRUSTED-V initiative, bringing automotive-grade rigour and long-term support commitments to open
   RISC-V."* **No stat grid. This section used to carry four fake numbers; it must stay qualitative.**
5. **CTA** — H2 *"Join the RISC-V decade."* + `Partner with us` / `Explore products`.

### 4.6 Partners (`/partners`)
`PageHero` — eyebrow `Partners & ecosystem`, title `An open network` / `of RISC-V builders.`
1. **Indian silicon programme** — eyebrow, H2 *"Made in India."* / *"Trusted globally."* (second
   line navy). Then numbered 12-col rows on hairline dividers, one per partner: `/01` mono index ·
   name (26→34px) + full legal name + mono location · description · products list with accent dots
   + an underlined `Website` external link.
   - **C-DAC** — Centre for Development of Advanced Computing, `Pune · Bengaluru · Trivandrum`,
     accent `#003262`, products: `VEGA ET1031 — 32-bit RISC-V MCU`, `DHRUV64 — Dual-core 64-bit
     RISC-V`, `ARIES development boards`, site `https://vegaprocessors.in`
   - **Mindgrove** — Mindgrove Technologies, `Chennai — IIT Madras`, accent `#0F6E56`, products:
     secure IoT SoC with hardware crypto, vision SoC with integrated NPU, industrial-grade
     ruggedized SoCs, site `https://mindgrove.in`
   - **Upbeat Tech** — Upbeat Technologies, `Bengaluru`, accent `#B7410E`, products: edge AI
     accelerators, intelligent sensor platforms, custom RISC-V co-processors
2. **Global IP integration** — dark, gold eyebrow, H2 *"Co-verified with performance leaders."*,
   hairline grid with **exactly two** cells: SiFive "Performance RISC-V IP", Akeana
   "Automotive-grade RISC-V".
3. **CTA** — H2 *"Bring your board or IP to TRUSTED-V."* + `Apply as a partner` → `/partner-registration`,
   `Board support` → `/board-support`.

### 4.7 Marketplace (`/marketplace`)
`PageHero` — eyebrow `Marketplace`, title `Boards, IP,` / `and everything between.`
- **Sticky toolbar** (`marketplace-toolbar`, sticky under the header, white/95 + backdrop blur):
  two underline tabs `Hardware boards {count}` / `IP blocks {count}` and a 320px search input with a
  leading magnifier. Search filters name/manufacturer/core/peripherals (hardware) and
  name/provider/type/arch/description (IP), case-insensitive, client-side via `useMemo`.
- **Hardware tab** — cards from `GET /api/hardware`: uppercase manufacturer, 22px name, clamped
  3-line description, footer row with mono core and an arrow. Hairline `gap-px` grid.
- **IP tab** — a static curated catalogue (real, open-source, verifiable): Ibex RISC-V Core
  (lowRISC/OpenTitan, RV32IMC, Apache 2.0) · OpenTitan Root of Trust · CVA6 (Ariane) Core (OpenHW,
  RV64GC, Solderpad 2.1) · PULP RI5CY Core (ETH Zurich, RV32IMFCXpulp) · DMA Controller IP
  (TRUSTED-V, AXI4/AHB, Commercial) · UART/SPI/I2C Controller (TRUSTED-V, APB/AXI-Lite, Commercial).
  Each card: type label, licence chip, name, provider, description, mono arch, GitHub link when
  open-source.
- Empty state: *"No {label} match your search."*
- Closing band on `#FAFAF7`: H2 *"Certified boards from C-DAC, Mindgrove, Upbeat Tech and more."* +
  `Meet the partners`.
- **Use stable keys** (`board.id`, `ip.name`) — never array index.

### 4.8 Secure Boot (`/product/secure-boot`)
`PageHero` — eyebrow `Secure Boot`, title `A verified chain,` / `from ROM to app.`, subtitle naming
rBoot + rustBoot and *alignment* with CC EAL4+, PSA L3 and ISO 26262. Child slot: a `Back to
products` link.
1. **Boot chain** (`#FAFAF7`) — label `The boot chain`, then a 4-cell hairline row:
   `/ 01 Silicon RoT` (immutable root of trust in ROM/OTP) → `/ 02 rBoot` (first stage verifies
   rustBoot) → `/ 03 rustBoot` (second stage verifies the application) → `/ 04 Application`
   (attested, signed, PQC-ready firmware).
2. **Two bootloaders** — 2-col hairline cells with 3px coloured top borders.
   - **rBoot** (`#B7410E`, "First-stage bootloader") — minimal security-critical first stage;
     features: minimal first stage · hardware init for RISC-V targets · verified boot with
     ECDSA/EdDSA/ML-DSA · anti-rollback counters · secure key provisioning.
   - **rustBoot** (`#003262`, "Second-stage & OTA") — A/B partition & rollback · OTA pipeline with
     signed manifests · PQC-ready signature verification · recovery mode & fail-safe partitions ·
     full Rust memory safety.
   Each ends with an underlined `GitHub` external link.
3. **CTA** — H2 *"Ship the chip. Ship the certificate."* + `Certify with us` / `Crypto Stack`.
**No flash-footprint or boot-time numbers.**

### 4.9 Crypto Stack (`/product/crypto-stack`)
`PageHero` — eyebrow `Crypto Stack`, title `The cryptographic toolkit` / `for the RISC-V decade.`
Then eight categories, each rendered as a spec table: a header row (colour dot + category name +
mono `NN items`) over 12-col rows of `algorithm` / mono `variants` / `standard`.

| Category | Accent | Entries |
|---|---|---|
| Hashing | `#0F6E56` | SHA-2 / SHA-3 — 224, 256, 384, 512 — NIST FIPS 180-4 · FIPS 202; SHAKE — SHAKE-128, SHAKE-256 — FIPS 202 (XOF) |
| PQC Signatures | `#5B21B6` | ML-DSA (Dilithium) — NIST FIPS 204 — lattice-based; SLH-DSA (SPHINCS+) — FIPS 205 — hash-based |
| PQC Key Exchange | `#5B21B6` | ML-KEM (Kyber) — NIST FIPS 203 — lattice-based KEM |
| Symmetric Encryption | `#003262` | AES — 128/192/256 — FIPS 197; Modes — GCM, CTR, XTS, CFB, CBC — GCM/XTS recommended, **note:** CBC and CFB are formally deprecated, included strictly for legacy compatibility |
| Classical Signatures | `#B45309` | ECDSA / EdDSA — P-192…P-521, Ed25519, Ed448 — FIPS 186-5; RSA — 2048/3072/4096 — PKCS#1 v2.2 |
| Classical Key Exchange | `#B45309` | ECDH — X25519, X448, NIST P-curves — RFC 7748 · SP 800-56A; RSA-KEM / RSAES — OAEP, PKCS#1 v1.5 |
| Randomness | `#0F6E56` | PRNG / DRBG — CTR-DRBG, HMAC-DRBG, Hash-DRBG — SP 800-90A |
| Future / Advanced | `#6B6B6B` | Side-Channel Protections — masking, blinding, constant-time impls — Roadmap |

Deprecation notes render in rust-orange with a left border. **BLAKE is intentionally absent.**
CTA: H2 *"Certified crypto, on your silicon."* + `Talk to sales` / `Secure Boot`.

### 4.10 RTOS (`/product/rtos-benchmark`)
`PageHero` eyebrow `RTOS choices`. Present the four options (TRUSTED-V RTOS, Zephyr, FreeRTOS, and a
Rust async runtime such as Embassy/Tock) as qualitative capability cards: memory model, scheduling,
language, licence, best-fit workload. **There is no benchmark table and no nanosecond figures** — the
page name is historical; the content must stay comparative and honest. CTA: `Talk to sales` /
`Read the docs`.

### 4.11 Developer Portal (`/developer-portal`)
`PageHero` eyebrow `Developer portal`, with a search input in the hero child slot. Body: a
quick-start dark code block (Rust, line numbers, GitHub-dark token colours, terminal output bar) plus
six expandable documentation sections (Getting started, Toolchain & targets, HAL/PAC crates, Secure
boot & signing, RTOS integration, Debugging & trace). CTA: `Download Jarvyn` / `Try WebIDE`.

### 4.12 WebIDE (`/webide`)
`PageHero` eyebrow `WebIDE — Cloud edition` with the rich Rust code-window mockup in the hero child
slot, then three feature blocks (zero install, shared workspaces, same toolchain as Jarvyn) and a CTA
(`Download Jarvyn` / `Launch WebIDE`). **The cloud environment is currently a mock — the launch
button must not pretend to boot a container.** Label it honestly.

### 4.13 Contact (`/contact`) and Contact Sales (`/contact-sales`)
Two-column: left contact cards (HQ Bengaluru, sales and engineering emails, links to `/board-support`
and `/partner-registration`); right a minimal form — First name, Last name, Work email, Company,
Country, Product interest (select), Message — posting to `POST /api/applications/sales-inquiry`.
Light 1px borders, no heavy boxes. `/contact-sales` pre-selects the plan from `?plan=`.
On success: success toast + inline confirmation; on failure: error toast with the API detail.

### 4.14 Board Support (`/board-support`) and Partner Registration (`/partner-registration`)
Single-column forms on a `PageHero`, posting to `POST /api/applications/board-support` and
`POST /api/applications/partnership`. Fields exactly match the models in §5.7 / §5.8. Partner form
requires an explicit `agree_terms` checkbox before submit is enabled.

### 4.15 Solution Builder (`/solution-builder`) — authenticated
A multi-step wizard that produces a real, downloadable Rust firmware project.
Steps: **1** name + description → **2** pick hardware (from `/api/hardware`) → **3** pick middleware
/ software components (filtered by compatibility with the chosen board's core) → **4** select
peripherals → **5** free-text additional requirements → **6** generate.
On generate, `POST /api/projects/generate` returns a file list; render it as a file-tree + code
viewer, then offer `GET /api/projects/{id}/download/{version}` as a ZIP. Show every generated path
(`Cargo.toml`, `memory.x`, `.cargo/config.toml`, `build.rs`, `src/main.rs`, `README.md`).
Restyle to the `tv-*` system: hairline step rail, mono step indices, no coloured progress blobs.
Keys must be stable ids, never indices.

### 4.16 My Projects (`/projects`) and Account (`/account`)
Projects: list from `GET /api/projects` with version count, board name, updated timestamp, download
and delete actions. Account: profile update (`PUT /api/account/profile`), password change
(`PUT /api/account/password`), project stats (`GET /api/account/projects/stats`), and a destructive
delete-account action behind a confirm dialog.

---

## 5. DATA MODELS (MongoDB collections + Pydantic)

All ids: `str = Field(default_factory=lambda: str(uuid.uuid4()))`.
All models: `model_config = ConfigDict(extra="ignore")`.

### 5.1 `users`
`id, email (EmailStr, unique), username, password_hash, is_admin: bool = False, created_at`
Login payload returns `{access_token, token_type, user}` where `user` never includes `password_hash`.

### 5.2 `hardware`
`id, name, manufacturer, core, clock_speed, memory, flash, peripherals: List[{name, type, interface}],
description, image_url?, price?, image_storage_path?, created_at`

### 5.3 `middleware`
`id, name, type, version, description, compatible_cores: List[str], compatible_hardware: List[str],
logo_url?, download_url?, documentation_url?`

### 5.4 `software_components`
Same shape as middleware plus `features: List[str]`, `created_at`.
`COMPONENT_TYPES = ["RTOS", "BSP", "SDK", "Driver", "Bootloader", "Framework", "Library"]`

### 5.5 `projects`
`id, user_id, name, description, hardware_id, middleware_ids: List[str], peripherals: List[str],
bsp_id?, sdk_id?, versions: List[ProjectVersion], created_at, updated_at`
`ProjectVersion = {version: int, generated_at, requirements, hardware_id, middleware_ids,
peripherals, bsp_id?, sdk_id?}`

### 5.6 `ide_downloads`
`id, name, version, platform, download_url, size, description, filename?, storage_path?, uploaded_at?`

### 5.7 `board_support_requests`
`id, company_name, contact_name, email, board_name, board_manufacturer, architecture="RISC-V",
description, use_case="", status="pending", submitted_at, reviewed_at?, admin_notes=""`

### 5.8 `partnership_applications`
`id, company_name, contact_name, email, phone, website, company_type, partnership_type, description,
products, agree_terms: bool, status="pending", submitted_at, reviewed_at?, admin_notes=""`

### 5.9 `sales_inquiries`
Free-form dict from the contact form + `id, status, submitted_at`.

### 5.10 `chat_messages`
`id, session_id, user_id?, role, content, timestamp` — **session_id is mandatory** for all AI chat.

### 5.11 `llm_settings` (singleton, `id = "llm_settings"`)
`provider ("gemini"|"openai"|"anthropic"), model (default "gemini-3-flash-preview"),
api_key_type ("emergent"|"custom"), custom_api_key?, updated_at, updated_by?`

---

## 6. API CONTRACT

All under `/api`. Auth = `Authorization: Bearer <jwt>`; JWT HS256, 7-day expiry, payload carries the
user id and `is_admin`. `get_current_user` and `get_current_admin_user` are FastAPI dependencies.

### 6.1 Auth
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/auth/login` | – | `{email, password}` → `Token`. 401 on bad credentials. |
| POST | `/auth/register` | – | **Disabled by design** — always 403. Invite-only platform. |
| GET | `/auth/me` | user | Current user, no hash. |

### 6.2 Catalogue (public reads)
`GET /hardware` · `GET /hardware/{id}` · `GET /middleware` ·
`GET /middleware/compatible/{core}` · `GET /software-components?component_type=` ·
`GET /software-components/compatible/{hardware_id}` · `GET /component-types` ·
`GET /ide-downloads` · `GET /llm-providers`

### 6.3 Projects (user)
`GET /projects` · `POST /projects` · `PUT /projects/{id}` · `DELETE /projects/{id}` ·
`POST /projects/generate` (LLM codegen, creates a new version) ·
`GET /projects/{id}/versions` · `GET /projects/{id}/download/{version}` (ZIP stream)

### 6.4 Account (user)
`PUT /account/profile` · `PUT /account/password` · `DELETE /account` ·
`GET /account/projects/stats`

### 6.5 AI chat (user)
`POST /chat` `{message, session_id}` → `{response, session_id, suggested_hardware?,
suggested_middleware?}` · `GET /chat/history/{session_id}`
Conversation state is keyed by `session_id`; the system prompt is built from the current
hardware/middleware catalogue so recommendations reference only real inventory.

### 6.6 Uploads — **object storage, not disk**
| Method | Path | Auth |
|---|---|---|
| POST | `/admin/ide-downloads/{ide_id}/upload` | admin |
| GET | `/ide-downloads/{ide_id}/download` | public |
| POST | `/admin/hardware/{hw_id}/upload-image` | admin |
| GET | `/hardware-images/{filename}` | public |

Implementation contract (`backend/storage.py`):

```python
STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "<managed-storage-host>"
STORAGE_URL  = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
STORAGE_PREFIX = "trusted-v"

init_storage(force=False) -> storage_key      # POST /init {"emergent_key": <API key>}; cache module-level
put_object(path, data, content_type) -> dict  # PUT  /objects/{path} with X-Storage-Key
get_object(path) -> (bytes, content_type)     # GET  /objects/{path} with X-Storage-Key
```

Rules that must be respected:
- Read the API key **lazily inside `init_storage()`** (`os.environ.get(...)` at call time). Reading it
  at import time breaks when the module is imported before `load_dotenv()` runs. This exact bug cost
  a debugging cycle — do not repeat it.
- On a `404` from `/objects/*`, call `init_storage(force=True)` once and retry.
- Call `init_storage()` in the FastAPI `startup` event and log success/failure. Never crash startup.
- Object paths: `trusted-v/ide/{ide_id}_{safe_filename}` and `trusted-v/hardware/{hw_id}{ext}`.
- Mongo is the source of truth: persist `storage_path` (IDE) / `image_storage_path` (hardware)
  alongside `filename`, `size` (human-readable string) and `uploaded_at`.
- Downloads stream from storage through the backend (`StreamingResponse` in 1MB chunks for binaries,
  `Response` with the correct image MIME for images). Never expose storage URLs to the browser.
- Allowed IDE extensions: `.exe .dmg .pkg .deb .rpm .tar.gz .zip .AppImage`. Allowed image
  extensions: `.png .jpg .jpeg .webp`. Reject anything else with 400.
- Storage has **no delete API** — implement soft delete in Mongo if needed.

### 6.7 Admin
CRUD for hardware, middleware, software components, IDE downloads:
`POST/PUT/DELETE /admin/{hardware|middleware|software-components|ide-downloads}[/{id}]`
Users: `GET /admin/users`, `DELETE /admin/users/{id}` (an admin may not delete themselves).
Stats: `GET /admin/stats`. Notifications: `GET /admin/notifications` →
`{board_support_pending, partnership_pending, total_pending}`.
Applications: `GET /admin/applications/{sales-inquiries|board-support|partnership}`,
`PUT /admin/applications/{board-support|partnership}/{id}` (status + admin_notes),
`DELETE /admin/applications/{board-support|partnership}/{id}`.
LLM: `GET|PUT /admin/llm-settings`.

### 6.8 Public intake
`POST /applications/board-support` · `POST /applications/partnership` ·
`POST /applications/sales-inquiry`

### 6.9 Seeding
On startup, idempotently seed: one admin user (credentials from env or a documented default written
to `memory/test_credentials.md`, **never rendered in the UI**), a starter hardware catalogue of real
RISC-V boards from C-DAC / Mindgrove / SiFive-class parts, middleware/software components, and IDE
download placeholder rows for Windows / macOS / Linux. Seeding must be safe to run on every boot.

---

## 7. AI CODE GENERATION (`POST /projects/generate`)

1. Resolve the selected hardware, middleware and software components from Mongo.
2. Build a **deterministic scaffold first** from templates — `Cargo.toml` (target triple + HAL/PAC
   deps from the board record), `memory.x` (flash/RAM origins and lengths from the board record),
   `.cargo/config.toml` (runner + rustflags), `build.rs`.
3. Then ask the configured LLM (default Gemini 3 Flash through the managed gateway, provider/model
   read from `llm_settings`) to write `src/main.rs` and module files, giving it the board's
   peripherals, the chosen components and the user's free-text requirements as structured context.
4. Validate the response is valid JSON of `{path, content}` objects. On any failure, fall back to a
   **hand-written template project** that always compiles conceptually (blinky + UART), and tell the
   user the fallback was used. Never return an empty project and never surface a raw stack trace.
5. Append a new `ProjectVersion` and return `{project_id, version, files, message}`.
6. `GET /projects/{id}/download/{version}` zips the stored files in memory and streams them.

---

## 8. `data-testid` MAP (must exist)

**Chrome** — `site-nav`, `nav-brand`, `nav-home`, `nav-products`, `nav-marketplace`,
`nav-developers`, `nav-ecosystem`, `nav-about`, `nav-admin`, `nav-account`, `nav-login`,
`nav-logout`, `nav-contact-cta`, `nav-mobile-toggle`, `mega-products`, `mega-jarvyn-ide`,
`mega-webide`, `mega-featured-cta`, `mobile-nav-*`, `site-footer`, `footer-cta`, `footer-*`,
`trustedv-logo`, `page-hero`, `page-hero-eyebrow`, `page-hero-title`, `page-hero-subtitle`.

**Landing** — `landing-hero`, `landing-hero-title`, `landing-hero-subtitle`, `hero-cta-primary`,
`hero-cta-secondary`, `hero-visual`, `platform-intro`, `riscv-ip`, `riscv-ip-sifive`,
`riscv-ip-akeana`, `riscv-ip-partners`, `virtualization-spotlight`, `virt-cta-primary`,
`virt-cta-secondary`, `platform-architecture`, `arch-band-0…5`, `architecture-explore`,
`technical-metric`, `core-technologies`, `product-families`, `ecosystem`, `ecosystem-explore`,
`application-markets`, `developer-experience`, `dev-cta-ide`, `dev-cta-webide`, `final-cta`,
`final-cta-primary`, `final-cta-secondary`.

**Login** — `login-page`, `login-form`, `email-input`, `password-input`, `login-btn`.

**IDE** — `ide-hero`, `ide-hero-title`, `ide-hero-subtitle`, `ide-hero-cta-primary`,
`ide-hero-cta-secondary`, `ide-download-panel`, `download-{id}`, `ide-hero-screenshot`,
`ide-hero-gif`, `ide-features`, `ide-feature-01…21`, `ide-comparison`, `ide-cta`, `ide-cta-webide`,
`ide-cta-contact`.

**Products / About / Partners / Marketplace** — `modules-detail`, `module-{num}-{slug}`,
`ip-integration`, `sub-brands`, `pricing-cta`, `plan-developer|pro|enterprise`, `about-mission`,
`structural-gaps`, `roadmap-consortium`, `backed-by-bosch`, `about-cta-primary`,
`about-cta-secondary`, `indian-partners`, `partner-c-dac|mindgrove|upbeat-tech`, `global-partners`,
`apply-partner`, `request-board-support`, `marketplace-toolbar`, `tab-hardware`, `tab-ip`,
`marketplace-search`, `marketplace-list`, `hw-{id}`, `ip-{slug}`, `marketplace-partners-cta`.

**Sub-products / forms / builder / admin** — `secure-boot-page`, `boot-chain`, `boot-loaders`,
`loader-rboot`, `loader-rustboot`, `crypto-stack-page`, `crypto-categories`, `crypto-cat-{slug}`,
`rtos-benchmark-page`, `rtos-options`, `dev-sections`, `webide-features`, `webide-launch`,
`contact-body`, `contact-form`, `contact-submit`, `project-name-input`,
`project-description-input`, `additional-requirements-input`, `generate-project-btn`,
`download-project-btn`, and for every admin table: `admin-{entity}-table`,
`admin-{entity}-add-btn`, `admin-{entity}-row-{id}`, `admin-{entity}-edit-{id}`,
`admin-{entity}-delete-{id}`, `admin-{entity}-save-btn`.

---

## 9. ADMIN BACK-OFFICE

Shared shell: page title + eyebrow, hairline data tables (no shadowed cards), inline dialogs from
`components/ui/dialog`, `sonner` toasts on every mutation, optimistic list refresh after save.

| Page | Purpose |
|---|---|
| `/admin` | Counts from `GET /admin/stats` + pending-application badges from `GET /admin/notifications` |
| `/admin/hardware` | CRUD boards incl. nested peripherals editor + image upload → object storage |
| `/admin/middleware` | CRUD middleware with compatible-core multi-select |
| `/admin/software` | CRUD software components, typed by `COMPONENT_TYPES`, features list |
| `/admin/ide` | CRUD IDE rows + binary upload with a real progress indicator; shows stored size/filename |
| `/admin/llm` | Provider/model selector, `emergent` vs `custom` key mode; never echo a stored key back |
| `/admin/applications` | Tabs: **Board Support**, **Partnership**, **Sales Inquiries**; per-row status change + admin notes + delete |
| `/admin/users` | List users, delete (self-delete blocked) |

Uploads must show per-phase progress (reading → uploading → finalising) and handle large binaries
without freezing the UI.

---

## 10. BUILD PLAN (each phase independently testable)

**Phase 1 — Skeleton & auth.** FastAPI app with `/api` router, Mongo connection, JWT auth, admin
seeding, `GET /auth/me`. React app with router, `AuthContext`, `ProtectedRoute`/`AdminRoute`, the
site-lock switch, and the Login page.
*Test:* `curl` login returns a token; a wrong password returns 401; unauthenticated browser hits
`/` and lands on `/login`; correct login lands on `/`.

**Phase 2 — Design system.** `index.css` `tv-*` layer, `tailwind.config.js` tokens, `ui-kit.jsx`,
`Navigation`, `Footer`, `PageHero`, `TrustedVLogo`.
*Test:* a scratch page renders every `tv-h1…tv-caption`, every button variant and every ui-kit
component; mega-menu opens on hover and the Products label still navigates on click.

**Phase 3 — Catalogue backend.** Hardware / middleware / software CRUD + compatibility endpoints +
seed data.
*Test:* `GET /api/hardware` returns seeded boards; `GET /api/middleware/compatible/{core}` filters
correctly; a non-admin token gets 403 on every `/admin/*` write.

**Phase 4 — Object storage.** `storage.py`, both upload endpoints, both download endpoints.
*Test:* upload a small file as admin → download it back byte-identical; upload a `.txt` → 400;
restart the backend and confirm the previously uploaded file still downloads (proves it is not on
pod disk).

**Phase 5 — Marketing surface.** Landing (all eleven sections), About, ProductSuite, Partners,
Marketplace, the three sub-product pages, Developer Portal, WebIDE, IDE Downloads.
*Test:* every nav, footer, mega-menu and in-page CTA resolves to a real route (no 404, no `#`
placeholders except the honestly-labelled WebIDE launch); no fabricated number appears anywhere
(grep the built bundle for `10B`, `130+`, `400K`, `48-hour`, `9×`, `#1`); no occurrence of `MIPS`.

**Phase 6 — Intake forms.** Contact, Contact Sales, Board Support, Partner Registration + the three
public POST endpoints + the admin Applications tabs.
*Test:* submit each form from the browser, then confirm the record appears in the matching admin tab
and that `GET /admin/notifications` counts increment.

**Phase 7 — Solution Builder + AI.** `/chat` with session ids, `/projects/generate`, versions, ZIP
download, `MyProjects`, `AccountSettings`.
*Test:* generate a project for a seeded board; assert the response contains `Cargo.toml`,
`memory.x` and `src/main.rs`; download the ZIP and confirm it opens; send three chat turns on one
`session_id` and confirm the third answer references the first; force an LLM failure and confirm the
template fallback returns a usable project with an honest message.

**Phase 8 — Admin back-office.** All eight admin pages.
*Test:* create → edit → delete one record of each entity type through the UI; confirm the public
catalogue reflects the change.

**Phase 9 — Hardening.** Split `server.py` into `routes/` modules (`auth`, `catalog`, `projects`,
`uploads`, `applications`, `admin`) once it passes ~800 lines; add Python type hints; replace any
`key={index}` with stable ids; run an accessibility pass (focus rings, alt text, contrast).

---

## 11. TESTING & ACCEPTANCE

Functional acceptance (must all pass before calling the build done):
1. Site lock: unauthenticated access to any route renders Login; the flag flip makes marketing pages
   public with no other change.
2. Admin login → every `/admin/*` page loads and mutates successfully.
3. Non-admin token receives 403 on every admin endpoint.
4. IDE binary round-trip survives a backend restart.
5. Hardware image renders in the marketplace card and in the admin table.
6. All four intake forms persist and appear in admin.
7. Solution Builder produces a downloadable ZIP.
8. Multi-turn chat retains context per `session_id`.
9. Zero console errors on every route.
10. Mobile 390px: nav drawer works, no horizontal scroll, the IDE GIF is not cropped, hero SVG hides
    or scales gracefully.

Content acceptance:
11. Grep the repo for `MIPS`, `ARC-V`, `10B`, `130+`, `400K+`, `48-hour`, `EAL4+ certified`,
    `v1.0`, `private preview` — all must return zero hits in user-visible strings.
12. Every CTA string appears in only its designated location (§1.1.8).
13. Every claim on the site is either a standard name, a partner name, a module name, or a
    qualitative statement.

Credentials used by tests live in `memory/test_credentials.md` and are **never** printed in the UI.

---

## 12. DEPLOYMENT NOTES

- Backend binds `0.0.0.0:8001`; frontend serves on `3000`; the ingress routes `/api/*` to the
  backend and everything else to the frontend. Do not change ports.
- Everything configurable comes from env: `MONGO_URL`, `DB_NAME`, `JWT_SECRET`, `CORS_ORIGINS`,
  `EMERGENT_LLM_KEY`, `INTEGRATION_PROXY_URL`, `REACT_APP_BACKEND_URL`. No defaults for secrets.
- No writes to the application filesystem at runtime. All user content goes to object storage or
  Mongo.
- Docker Compose + Nginx configs are appropriate for self-hosting; keep the reverse proxy's
  `client_max_body_size` large enough for IDE binaries and stream uploads rather than buffering.

---

## 13. ASSETS

| Asset | Path / source | Use |
|---|---|---|
| Brand logo | `/trustedv-brand-logo.png` | `TrustedVLogo` at every size (24/34/40/56/88/120px, width auto) |
| Jarvyn IDE screen recording | supplied GIF, hosted asset URL | IDE page product window only |
| Make in India globe | `/make-in-india.jpg` | optional, About/Landing India context |
| Reference SoC diagram | **inline SVG, authored in code** | Landing hero |
| Hypervisor topology | **DOM/CSS blocks** | Virtualization section |
| Architecture bands | **DOM/CSS blocks** | Platform architecture section |

No stock photography anywhere. No third-party logo images for partners — partner names are set as
type. Every diagram is authored in SVG or DOM so it stays crisp, themeable and accurate.

---

## 14. WHAT "DONE" LOOKS LIKE

A visitor who has never heard of RISC-V understands within one scroll that this is a serious
silicon-adjacent engineering platform. A firmware engineer finds the download, the docs and the
board list in under three clicks. A silicon buyer finds SiFive and Akeana named on the first
differentiator section. A procurement lawyer finds nothing on the page that cannot be substantiated.
And an admin can add a board, upload a binary and answer a partnership request without touching the
database.
