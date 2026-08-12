# TRUSTED-V — Design Guidelines

**Theme:** Editorial Minimalist (MIPS-inspired)
**Applied:** Feb 2026

## Colors (retain)
- Berkeley Blue `#003262` — primary
- Cyan `#00B4E0` — accent
- Gold `#FDB515` — dark-section highlight, "-V" mark
- SignOff Green `#0F6E56` — status, success
- Rust orange `#B7410E` — logo accent only

## Neutrals
- Background `#FFFFFF`
- Off-white surface `#FAFAF7`
- Border `#E7E5E0`
- Ink `#0A0A0A` / `#1F1F1F`
- Muted `#6B6B6B`

## Typography
- **Headings:** Space Grotesk (400–500), tight tracking (-0.03em), massive display sizes (up to 140px on hero)
- **Body:** Outfit (300 default), 1.55–1.7 leading
- **Mono:** JetBrains Mono, for eyebrows/labels/code

## Utility classes (in `index.css`)
- `.tv-container` — 1440px max, generous padding
- `.tv-eyebrow` — bar + label eyebrow
- `.tv-display` — display heading
- `.tv-btn` (`.tv-btn-primary`, `.tv-btn-outline`, `.tv-btn-ghost`, `.tv-btn-gold`)
- `.tv-link` — animated bottom-border link
- `.tv-section` / `.tv-section-tight`
- `.tv-card`, `.tv-marquee`, `.tv-pulse-dot`

## Layout rules
- Left-aligned or asymmetric 12-col grids (no centered blocks of body text)
- Generous whitespace (`py-24` → `py-40` on desktop)
- Dividers as `1px` neutral borders (`bg-[#E7E5E0]`)
- Cards: barely-there borders, big padding, NO shadows

## Section rhythm
`Hero` → `Partner strip` → `Mission editorial paragraph` → `Numbered modules list` → `Industry focus grid` → `Standards list` → `Dark Bosch story` → `Roadmap` → `Final CTA`.

## Motion
- `tv-fade-up` — 700ms staggered reveal
- `tv-marquee` — logo strip
- `tv-pulse-dot` — status indicator
- Buttons: subtle `active:scale-98`

## Forbidden
- Purple/violet gradients
- Center-aligned long body text
- Inter/Roboto for headings
- Universal `transition: all`
- Emoji as icons
- Card grids with drop shadows

## Reference
- MIPS.com editorial layout
- Full spec: `/app/design_guidelines.json`
