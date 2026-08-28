# TRUSTED-V — DESIGN SYSTEM

**Aesthetic name:** *Enterprise Semiconductor.*
**Reference points:** MIPS.com, SiFive.com, Arm developer docs, IBM Plex documentation sites, a
well-typeset silicon datasheet.
**One-line rule:** every pixel is either information or the space that makes information legible.

This file is normative. Copy the tokens and utilities verbatim; they are the contract that keeps
twenty pages looking like one product.

---

## 1. THE TEN LAWS

1. **Hairlines, not shadows.** Structure comes from 1px borders and `gap-px` grids on a
   border-coloured background. Shadows appear only on the login card, the IDE product window and
   the sticky header on scroll.
2. **Left-aligned, asymmetric, 12-column.** Centred layouts are used only inside the login form
   card. Section headers sit at 7/12 or 5/12, never centred.
3. **Two-to-three times more whitespace than feels necessary.** 80/96/112px vertical section rhythm.
4. **One dark band per page, maximum two.** Dark bands are structural punctuation, never decoration.
5. **Navy is the voice; gold is the accent; cyan is the signal.** Never all three at full strength in
   one component.
6. **Monospace carries metadata.** Eyebrows, layer tags, part numbers, ISA names, file paths,
   captions, counts. Never body copy.
7. **Diagrams are authored, not photographed.** Inline SVG or DOM blocks. No stock imagery anywhere
   on the site.
8. **Radii are small.** 6px buttons, 8–10px cards. Nothing is a pill except a status dot.
9. **Motion is a whisper.** Fade-up on entry, 150–250ms property transitions, a 2s pulsing status
   dot. Nothing bounces, nothing parallaxes, nothing floats.
10. **When you reach for another card grid, stop.** Ask what the structure of the information is —
    a stack, a chain, a table, a timeline, a topology — and draw *that*.

### Explicitly forbidden
Purple/violet hero gradients · glowing blobs · glass-morphism on light backgrounds · floating
animated shapes · emoji as icons · Inter / Roboto / system-font stacks · centred hero + three equal
cards · logo marquees · stock photos of people at whiteboards · counters that animate up to a number
· "trusted by" walls · pill buttons on primary actions · `transition: all`.

---

## 2. COLOUR TOKENS

Declared in `:root` in `src/index.css`. Use the CSS variables, or the literal hex when writing Tailwind
arbitrary values (the codebase uses both; hex literals dominate inside components).

```css
:root {
  /* Brand */
  --tv-navy:        #003262;  /* primary. Berkeley navy. Buttons, links, accents, eyebrows */
  --tv-navy-deep:   #001F3F;  /* hover state for navy */
  --tv-navy-darkest:#00162B;  /* dark section + footer + login pane background */
  --tv-cyan:        #00B4E0;  /* signal: focus rings, live badges, L04 band, ambient blurs */
  --tv-cyan-soft:   #E6F7FC;  /* outline-button hover fill, cyan tints */
  --tv-gold:        #FDB515;  /* RISC-V gold. Accent on dark only. Never on white text */
  --tv-green:       #0F6E56;  /* verified / operational / L03 band */
  --tv-rust:        #B7410E;  /* deprecation, warnings, rBoot, "X" in comparisons */

  /* Neutrals */
  --tv-bg:          #FFFFFF;
  --tv-surface:     #F7F7F5;  /* alternating section background */
  --tv-surface-2:   #EFEEE9;
  --tv-border:      #E5E4DF;  /* the hairline. Used everywhere */
  --tv-border-strong:#CFCEC8; /* outline-button border, scrollbar thumb */
  --tv-ink:         #0B0F14;  /* headings */
  --tv-ink-2:       #1A1F25;  /* nav links, strong body */
  --tv-muted:       #5A6472;  /* lede, secondary copy */
  --tv-muted-2:     #8A94A0;  /* tertiary */
}
```

**Legacy hex values that also appear in components** (keep consistent, do not "fix" them
selectively): `#0A0A0A` (page ink on product pages), `#E7E5E0` (page-level hairline), `#FAFAF7`
(alternating band), `#3A3A3A` / `#4B4B4B` (body), `#6B6B6B` (muted). Plus extended accents used only
in diagrams and category dots: `#5B21B6` (PQC / virtualization band), `#B45309` (amber / TRUSTED
Certification).

### Band colour map (architecture diagram — fixed)
`L05 Application #003262` · `L04 Developer Toolchain #00B4E0` · `L03 Rust Runtime & OS #0F6E56` ·
`L02 Virtualization #5B21B6` · `L01 Secure Boot & Crypto #B45309` · `L00 RISC-V IP & Silicon #0B0F14`

### Usage ratios (target)
White/`#F7F7F5` surfaces ≈ 70% · ink and greys ≈ 20% · navy ≈ 7% · gold + cyan + green + rust
combined ≈ 3%.

---

## 3. TYPOGRAPHY

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Sora:wght@400;500;600;700&display=swap');
```

- **IBM Plex Sans** — everything. Headings 500–700, body 400, light 300 for long body passages.
- **IBM Plex Mono** — eyebrows, layer tags, part numbers, captions, code, filenames, counts.
- **Sora** — display only, used sparingly (available as `font-display` in Tailwind). Never for body.
- Base: `17px / 1.55`, ink `--tv-ink`, antialiased, `text-rendering: optimizeLegibility`.
- Headings: weight 600, `letter-spacing -0.01em`, `line-height 1.1`.
- `::selection { background: #003262; color: #fff; }`

### The scale (copy verbatim)

```css
.tv-h1  { font-weight:700; font-size:clamp(40px,6.2vw,72px); line-height:1.03; letter-spacing:-0.02em; }
.tv-h2  { font-weight:600; font-size:clamp(30px,3.6vw,48px); line-height:1.08; letter-spacing:-0.015em; }
.tv-h3  { font-weight:600; font-size:clamp(22px,2.2vw,30px); line-height:1.15; letter-spacing:-0.01em; }
.tv-h4  { font-weight:600; font-size:20px; line-height:1.25; letter-spacing:-0.005em; }
.tv-lede{ font-weight:400; font-size:clamp(16px,1.35vw,19px); line-height:1.55; color:var(--tv-muted); max-width:700px; }
.tv-body   { font-size:16px;   line-height:1.6; color:var(--tv-ink-2); }
.tv-small  { font-size:14px;   line-height:1.5; color:var(--tv-muted); }
.tv-caption{ font-size:12px;   line-height:1.4; color:var(--tv-muted); }
```

**Per-page H1 overrides** (deliberate, keep them): secondary pages and the IDE hero use
`style={{ fontSize: "clamp(34px, 5vw, 56px)" }}`; the login pane uses
`clamp(34px, 3.6vw, 48px)` with `line-height: 1.05`. Only the landing hero gets the full 72px.

### Eyebrow — the signature element

```css
.tv-eyebrow {
  display:inline-flex; align-items:center; gap:10px;
  font-family:'IBM Plex Mono',monospace; font-size:12px; font-weight:500;
  letter-spacing:0.14em; text-transform:uppercase; color:var(--tv-navy);
}
.tv-eyebrow::before { content:''; width:22px; height:1px; background:var(--tv-navy); display:inline-block; }
.tv-eyebrow-alt { /* same, colour var(--tv-muted), no rule */ }
```

Every section starts with an eyebrow. On dark bands, override the colour to `#FDB515` (and wrap the
label in a span with the same colour so the `::before` rule and the text match).

### Inline emphasis
Within an H2, wrap the emphasised clause in a `<span>` coloured `#003262` on light or `#FDB515` on
dark. Never underline, never italicise, never use a highlighter background.

The `RiscV` helper renders the wordmark as `RISC` in navy + `-V` in gold — use it when "RISC-V"
appears inside a headline.

---

## 4. LAYOUT

```css
.tv-container { width:100%; max-width:var(--grid-max); margin-inline:auto; padding-inline:24px; }
@media (min-width:768px)  { .tv-container { padding-inline:40px; } }
@media (min-width:1280px) { .tv-container { padding-inline:56px; } }

.tv-section       { padding-block:80px; }
.tv-section-lg    { padding-block:96px; }
.tv-section-tight { padding-block:56px; }
@media (min-width:768px)  { .tv-section{padding-block:96px}  .tv-section-lg{padding-block:120px} .tv-section-tight{padding-block:72px} }
@media (min-width:1280px) { .tv-section{padding-block:112px} .tv-section-lg{padding-block:140px} .tv-section-tight{padding-block:80px} }
```

- `--grid-max` is the max content width (≈1440px). Gutters 24 / 40 / 56px.
- Grid: `grid lg:grid-cols-12` with `gap-10` to `gap-16`. Canonical splits: `7 / 5` (hero),
  `4 / 4 / 4` (module rows), `5 / 6 offset 7` (about, IP), `8 / 4` (architecture + sidebar),
  `12` (tables and hairline grids).
- Alternate section backgrounds `#FFFFFF` → `#F7F7F5` (or `#FAFAF7`) and separate every section with
  `border-b border-[#E5E4DF]` (or `#E7E5E0` on product pages).
- **The hairline grid pattern** — the single most-used layout device:
  ```jsx
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E7E5E0] border-y border-[#E7E5E0]">
    {items.map(i => <div key={i.id} className="bg-white p-8 min-h-[240px]">…</div>)}
  </div>
  ```
  The 1px gaps *are* the borders. Cells carry the surface colour of their section.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. Header height **76px**; the
  marketplace toolbar sticks at `top-[64px]`.

---

## 5. BUTTONS & LINKS

```css
.tv-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px;
  height:48px; padding:0 24px; font-weight:600; font-size:15px; border-radius:6px;
  border:1px solid transparent; line-height:1; white-space:nowrap; cursor:pointer;
  transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease, transform 150ms ease; }
.tv-btn-lg { height:54px; padding:0 28px; font-size:16px; }
.tv-btn-sm { height:40px; padding:0 16px; font-size:14px; }

.tv-btn-primary        { background:#003262; color:#fff; border-color:#003262; }
.tv-btn-primary:hover  { background:#001F3F; border-color:#001F3F; }
.tv-btn-primary:active { transform:scale(0.985); }

.tv-btn-outline        { background:transparent; color:var(--tv-ink); border-color:#CFCEC8; }
.tv-btn-outline:hover  { border-color:#003262; color:#003262; background:#E6F7FC; }

.tv-btn-ghost          { background:transparent; color:#003262; border-color:transparent; padding:0 4px; }
.tv-btn-onDark         { background:#fff; color:#003262; border-color:#fff; }
.tv-btn-onDark:hover   { background:#FDB515; border-color:#FDB515; color:var(--tv-ink); }
.tv-btn-outline-onDark { background:transparent; color:#fff; border-color:rgba(255,255,255,.35); }
.tv-btn-outline-onDark:hover { border-color:#fff; }

.tv-arrow-link { display:inline-flex; align-items:center; gap:6px; color:#003262;
  font-weight:600; font-size:14px; transition: gap 200ms ease, color 200ms ease; }
.tv-arrow-link:hover { color:#001F3F; gap:10px; }
.tv-arrow-link::after { content:'→'; font-family:'IBM Plex Mono',monospace; font-size:14px; }
```

- Buttons carry a trailing `ArrowUpRight` (16px) for navigation, `ArrowRight` for progression,
  `Download` for downloads. Icon after the label, never before.
- The `.tv-arrow-link` gap-widening hover is the house micro-interaction. Use it for every
  "see more" link.
- Underlined-uppercase tertiary link (used for external/GitHub links):
  `text-[12px] font-medium tracking-[0.12em] uppercase border-b border-[#0A0A0A] pb-0.5`, hovering to
  navy border and text.

---

## 6. SURFACES, BACKDROPS, MOTION

```css
.tv-card       { background:#fff; border:1px solid var(--tv-border); border-radius:10px; padding:32px;
                 transition: border-color 200ms, transform 200ms, box-shadow 200ms; }
.tv-card:hover { border-color:#003262; }
.tv-card-lift:hover { transform:translateY(-2px); box-shadow:0 12px 32px -18px rgba(0,50,98,.25); }
.tv-card-flat  { background:var(--tv-surface); border-radius:10px; padding:32px; }

.tv-grid-bg      { background-image: linear-gradient(to right, rgba(11,15,20,.035) 1px, transparent 1px),
                                     linear-gradient(to bottom, rgba(11,15,20,.035) 1px, transparent 1px);
                   background-size:48px 48px; }
.tv-grid-bg-dark { same, rgba(255,255,255,.05); }
.tv-hr { border-top:1px solid var(--tv-border); }
```

- **Ambient blurs** are allowed, at most two per section, always `pointer-events-none`, always a
  single brand colour at ≤10% opacity, always `blur-3xl`, always clipped by `overflow-hidden`.
  Example: `absolute -top-32 -right-40 w-[520px] h-[520px] rounded-full bg-[#00B4E0]/8 blur-3xl`.
- **Motion vocabulary — this is all of it:**
  ```css
  @keyframes tv-fade-up   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  .tv-fade-up  { animation: tv-fade-up 500ms cubic-bezier(.2,.7,.2,1) both; }
  @keyframes tv-pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.55;transform:scale(1.35)} }
  .tv-pulse-dot{ animation: tv-pulse-dot 2s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce){ *{animation-duration:.01ms!important;transition-duration:.01ms!important} }
  ```
  Stagger entrances with `animation-delay` in 60–80ms steps, maximum four steps.
- **Focus & scrollbar:**
  ```css
  *:focus-visible { outline:2px solid #00B4E0; outline-offset:3px; border-radius:2px; }
  ::-webkit-scrollbar { width:10px; } ::-webkit-scrollbar-thumb { background:#CFCEC8; border-radius:4px; }
  ```

---

## 7. `ui-kit.jsx` — COMPONENT CONTRACTS

Import from `@/components/ui-kit`. These eleven exports cover most of the marketing surface; build
new sections from them before writing bespoke markup.

| Export | Props | Renders |
|---|---|---|
| `Eyebrow` | `{children, alt}` | `span.tv-eyebrow` (or `-alt`) |
| `SectionHeader` | `{eyebrow, title, lede, action, align}` | 12-col header: 7 cols eyebrow + `tv-h2` + `tv-lede`, `action` right-aligned at the baseline as a `tv-arrow-link` |
| `PrimaryCTA` | `{to \| href, size, children}` | `Link`/`a` with `tv-btn tv-btn-primary` (+ `tv-btn-lg/sm`) and a trailing `ArrowUpRight` |
| `SecondaryCTA` | `{to \| href, size, onDark, children}` | `tv-btn-outline` or `tv-btn-outline-onDark` |
| `ArchitectureDiagram` | `{layers:[{tag,title,color,components:[{name,note}]}], dark}` | The banded layer stack: coloured left strip, mono tag, title, `N components` chip, inner 4-col component tiles |
| `TechnicalMetric` | `{rows:[{label,value}]}` | Spec-sheet rows — mono uppercase label left, 15px value right, hairline dividers |
| `ProductCard` | `{eyebrow, title, description, bullets, to}` | Hairline card, mono eyebrow, `tv-h4` title, description, bullet list with small square markers, footer arrow link |
| `MarketCard` | `{label, headline, capabilities, to}` | Mono uppercase label, headline, three capability lines |
| `PartnerGrid` | `{partners:[{name,note}], onDark}` | `gap-px` hairline grid of name + mono note cells |
| `ResourceCard` | `{category, title, description, to}` | Category label + title + description + arrow |
| `CTASection` | `{eyebrow, title, primary, secondary, dark}` | Closing band: `tv-h2` left, button pair right, `md:flex-row md:items-end justify-between` |

Also: `PageHero` (`@/components/PageHero`) with `{eyebrow, title, subtitle, align, size, children}` —
when `children` is present it becomes a 7/5 split with the child in the right column; and the named
export `RiscV` for the two-tone wordmark.
`TrustedVLogo` (`@/components/TrustedVLogo`) with `{size, dark}` where
`xs 24 · sm 34 · md 40 · lg 56 · xl 88 · 2xl 120` px height, width auto, and `dark` applies
`filter: brightness(1.6) saturate(0.85)`. **Header uses `sm`, footer `md`, login left pane `2xl`.**

Shadcn primitives live in `components/ui/` and are used for dialogs, selects, tabs and inputs inside
admin and forms — restyle them with the tokens above rather than accepting their defaults.
Toasts: `sonner`. Icons: `lucide-react` at `strokeWidth 1.5–1.75`, sizes 14/16/20px only.

---

## 8. RECURRING PATTERNS (build these, not new inventions)

**Spec table** — 12-col rows on hairline dividers, mono uppercase header row with a solid ink top
border. Used for crypto categories, comparisons, roadmaps, technical metrics.

**Numbered editorial row** — mono `/01` index in a 1-col rail, then name / description / detail in
4/4/3. Used for partners and product modules. This pattern is how you present a list of *entities*
without cards.

**Layer band** — a 4px coloured left strip + mono tag + title + count chip + inner tiles. Used for
architecture. This is how you present a *system*.

**Chain / topology stack** — stacked bordered rows, one highlighted, mono `Layer 0N` tags, an
illustrative caption bottom-right. Used for the hypervisor topology and the boot chain. This is how
you present *hierarchy or sequence*.

**Code window** — `#0B0F14` surface, macOS chrome (`#FF5F57 / #FEBC2E / #28C840` dots when depicting
a real app; muted grey dots for illustrative code), mono filename centre, coloured target badge
right, syntax-tinted mono body (comments `#6B7A8A`, keywords `#00B4E0`, strings `#FDB515`, fn names
`#7EE787`), status bar with `$ cargo build --release` left and `✓ signed · verified` in green right.

**Status dot** — `w-1.5 h-1.5 rounded-full bg-[#0F6E56] tv-pulse-dot` + mono label. Used for
"All systems operational" and "stable".

**Proof strip** — 2/4-column row of `mono uppercase key` over `15px value`, separated by 1px borders.
Used under the landing hero. This replaces stat counters: qualitative facts, not fake numbers.

**Featured chip** — `text-[10px] font-semibold tracking-[0.2em] uppercase` in gold with a 40%-opacity
gold border, 2px/0.5 padding. Only for SiFive and Akeana on the IP grid.

---

## 9. ACCESSIBILITY & QUALITY BAR

- Cyan focus ring on every focusable element; never remove it.
- Body text ≥ 13.5px; captions ≥ 11px and only in mono metadata roles.
- Contrast: white on `#003262` and on `#00162B` passes AA; gold `#FDB515` is used **only on dark**
  and never for long text; muted `#5A6472` on white passes AA for body sizes.
- Every image has a descriptive `alt`. The Jarvyn GIF's alt describes the workflow it shows.
- Every icon-only control has an `aria-label`.
- All motion respects `prefers-reduced-motion`.
- `data-testid` on every interactive element and every user-facing value (see §8 of the master
  prompt).
- Zero console errors and no horizontal scroll at 390px.

---

## 10. TAILWIND CONFIG EXTENSIONS

```js
theme: {
  extend: {
    fontFamily: {
      sans:    ["'IBM Plex Sans'", "system-ui", "sans-serif"],
      mono:    ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      display: ["'Sora'", "'IBM Plex Sans'", "sans-serif"],
    },
    colors: {
      navy:   { DEFAULT: "#003262", deep: "#001F3F", darkest: "#00162B" },
      cyan:   { DEFAULT: "#00B4E0", soft: "#E6F7FC" },
      gold:   "#FDB515",
      verified: "#0F6E56",
      rust:   "#B7410E",
      ink:    { DEFAULT: "#0B0F14", 2: "#1A1F25" },
      surface:{ DEFAULT: "#F7F7F5", 2: "#EFEEE9" },
      hairline:{ DEFAULT: "#E5E4DF", strong: "#CFCEC8" },
    },
    borderRadius: { sm: "4px", DEFAULT: "6px", md: "8px", lg: "10px" },
    maxWidth: { container: "1440px" },
  }
}
```

Keep the shadcn HSL variables in `:root` intact so `components/ui/*` continues to work; set
`--ring: 197 100% 44%` so shadcn focus rings match the cyan focus colour.

---

## 11. FIVE-SECOND SELF-REVIEW

Before you ship a section, answer these. Any "no" means rework.

1. Does it open with a mono eyebrow?
2. Is the structure carried by 1px hairlines rather than shadows?
3. Is it left-aligned or deliberately asymmetric?
4. Could this exact block appear on a generic SaaS site? *(a "yes" here is a failure)*
5. Does every number on it correspond to a standard, an ISA, a key size or a real count?
6. Is the information's true shape — stack, chain, table, timeline, topology — the shape on screen?
