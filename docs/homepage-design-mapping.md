# Homepage design implementation map

Source: `TrusteDV-HomePage-DesignChanges-1.pdf` and `Raw-Images.zip`, supplied by the design team. Implemented 2026-10-16.

- [Original design PDF](https://customer-assets-jai6qajn.emergentagent.net/job_d1e988b1-d100-4516-b9f2-513b6ce1f2fa/artifacts/05e95bf2774a82ce_TrusteDV-HomePage-DesignChanges-1.pdf)
- [Original image pack](https://customer-assets-jai6qajn.emergentagent.net/job_d1e988b1-d100-4516-b9f2-513b6ce1f2fa/artifacts/a705716d36ebb31c_Raw-Images.zip)

## Interpretation and scope
- Pages 1–2 update the existing AI Engines and SiFive sections, not the primary brand hero.
- Pages 3–4 describe one six-market grid. Page 4 is the continuation of the three lower cards, not a new Edge AI section.
- Page 5 illustrates a four-module showcase with Secure Rust Software selected. The code-engineer image (`image 15`) is the central image shown in the PDF. The other three supplied engineering scenes complete this showcase. This is an inferred interaction, implemented with accessible tabs and previous/next controls.
- Pages 6–9 show successive positions of ONE six-technology carousel, moving one item at a time; there are no duplicated sections or copy blocks.
- User explicitly chose **visitor-controlled**: arrows, keyboard and swipe; no autoplay. Three technology cards on desktop, two on tablet, one on mobile; boundary controls disable.
- Hero, virtualization, architecture, services and final call-to-action are retained. The updated sequence after architecture is Markets → Product families → Core technologies → Services, matching the PDF's narrative while retaining unmentioned sections.
- Homepage module presentation order follows page 5 (Secure Rust Software is 02). Architecture layers and product capabilities are unchanged.
- Existing brand palette, IBM Plex type, `.tv-panel`, routes and contact flows are retained. No authentication, AI model integration, or backend business logic was changed.
- Developer navigation and the standalone Developer Experience section remain absent. Jarvyn IDE and WebIDE retain **Coming soon** status; the tooling card links to the IDE status page, not the hidden Developer Portal.
- Product fragment links now scroll to their actual destination below the fixed navigation.

## Exact image mapping
| PDF / slot | Original filename | Bundled asset slug |
|---|---|---|
| 1 · Code Engine | image 65.svg | code-engine |
| 2 · SiFive collaboration | image 39.svg | sifive-platform |
| 3 · Automotive | ChatGPT Image Sep 24, 2026, 02_37_39 PM 2.svg | market-automotive |
| 3 · Industrial | factories_and_grids_high_resolution 2.svg | market-industrial |
| 3 · IoT & Consumer | connected_devices_exact_HD 2.svg | market-connected |
| 3–4 · Robotics | autonomous_systems_exact_HD 2.svg | market-robotics |
| 3–4 · Defence & Aerospace | ChatGPT Image Sep 24, 2026, 02_55_05 PM 2.svg | market-aerospace |
| 3–4 · Edge AI | ChatGPT Image Sep 24, 2026, 02_58_54 PM 2.svg | market-edge-ai |
| 5 · Development Platform | image 14.svg | module-development |
| 5 · Secure Rust Software | image 15.svg | module-software |
| 5 · Virtualization & Simulation | image 16.svg | module-virtualization |
| 5 · Silicon SignOff & Trust | image 17.svg | module-silicon |
| 6–9 · RISC-V native | Futuristic RISC-V Chip Stack 1.svg | tech-riscv |
| 6–9 · Security | Glowing Glass Shield Lock 1.svg | tech-security |
| 6–9 · Virtualization | Layered Glass Platform with Holographic UI 1.svg | tech-virtualization |
| 6–9 · Real-time software | Futuristic Blue Gauge with Orange Warning Ring 1.svg | tech-runtime |
| 6–9 · Cryptography | Neon Glass Security Cube 1.svg | tech-crypto |
| 6–9 · Tooling | Futuristic Glass Code Workspace 1.svg | tech-tooling |

## Image handling
The SVG files wrap embedded raster images. `scripts/prepare_homepage_assets.py` extracts the original bitmaps and generates uncropped 640px and 1200px WebP variants. All 36 variants together are approximately 1.8 MB versus 52 MB of original SVGs. They are build-time assets, not application uploads, stored in `frontend/public/images/homepage/` and do not depend on external hotlinks or runtime file storage.

`HomepageImage` supplies intrinsic dimensions, responsive `srcSet`, alt text, lazy loading and async decoding. Main imagery is contained without losing subject details; the partially visible neighboring module pictures are decorative only.

## Implementation files
- `frontend/src/data/homepage.js`: source copy, links and mapped asset IDs.
- `frontend/src/data/homepage-images.json`: generated dimensions and original filenames.
- `frontend/src/components/homepage/`: feature sections, markets, product showcase, technology carousel, image/heading primitives, scoped styling.
- `frontend/src/pages/Landing.jsx`: homepage composition and retained sections.
- Existing Shadcn/Embla carousel and Radix tabs provide domain interaction; no new dependencies.

## Verification
- Production frontend build passed (existing repository warnings only).
- `/app/test_reports/iteration_37.json`: 100% frontend pass. Validated all 18 mappings, carousel arrows/keyboard/swipe/no-autoplay/boundaries/offscreen focus, all four module tabs and links, fragment scrolling, retained sections, and Developer visibility constraints.
- Responsive checks at 320, 768, 1024 and 1440px passed without horizontal overflow. Authenticated screenshot smoke also passed at 1920px.
- Final build log: `/app/test_reports/homepage-build.log`. External homepage and representative 640px/1200px assets returned HTTP 200 with correct image/webp content types.

## Follow-up: uploaded hero animation and login simplification (2026-10-16)
- User explicitly removed the four-column hero proof strip. Replaced the older logo-left/narrative-right composition with logo and narrative left, uploaded animation right. All mapped sections below the hero remain unchanged.
- [Original Hero Section Animation.gif](https://customer-assets-jai6qajn.emergentagent.net/job_d1e988b1-d100-4516-b9f2-513b6ce1f2fa/artifacts/4b98b9b0ccff7438_Hero%20Section%20Animation.gif) is bundled without re-encoding at `/images/homepage/hero-platform.gif`.
- 400×283, 91 frames, 6.07-second loop. First-frame `/images/homepage/hero-platform-poster.webp` is used when paused or reduced motion is preferred. Animation has a keyboard-accessible Pause/Play control; desktop is two columns and mobile stacks without image cropping.
- Login is now a minimal single-column form with a prominent logo. This is a presentation-only change; original sign-in logic, provider, credentials, session behavior and APIs are unchanged.
- Verified by `/app/test_reports/iteration_38.json`: both roles, login error/retry/session/logout, original GIF animation/looping, pause/reduced motion, 320/768/1024/1440 layouts, CTAs and retained sections. Build log: `/app/test_reports/hero-login-build.log`.