# TRUSTED-V — CORE PHILOSOPHY, PURPOSE & THE STORY

> Read this before you write code. `00_MASTER_PROMPT.md` tells you *what* to build;
> `02_DESIGN_SYSTEM.md` tells you *how it should look*. This file tells you **why it exists** — and
> why it must not look, sound or behave like a generic SaaS product.
>
> If you understand this document, you will make the right call on the hundred small decisions no
> spec can anticipate.

---

## PART I — THE CORE PHILOSOPHY

### The one-sentence philosophy

> **Openness without trust is unusable. TRUSTED-V exists to make open silicon trustworthy —
> end to end, in the open, provably.**

### The five beliefs the platform is built on

**1. Trust is an engineering property, not a marketing one.**
You cannot brand your way to trust. It has to be constructed: a root of trust in ROM, a verified
boot chain above it, a memory-safe language above that, an attestation quote at the top, and
evidence you can hand to an auditor. Every layer of TRUSTED-V is a link in that chain. The website
must behave the same way — no claim without a basis. This is why the entire site is forbidden from
carrying a single unverifiable number. **The credibility of the product and the credibility of the
page are the same asset.**

**2. Fragmentation is the enemy, not competition.**
RISC-V's openness is its greatest strength and its most expensive liability. Anyone can extend the
ISA, so everyone does — and portability quietly dies. TRUSTED-V's answer is not to close anything.
It is to define an **opinionated reference**: a validated feature set, a single boot chain, one
toolchain, one attestation model — that any vendor can adopt without surrendering their IP.
Opinionated, not proprietary.

**3. Memory safety is not optional in things that can kill you.**
Brakes, insulin pumps, grid relays, satellites. The majority of exploitable firmware defects are
memory-safety defects, and C gives you no structural defence. TRUSTED-V is **Rust-first, deliberately
and irreversibly** — not because Rust is fashionable, but because "we were careful" is not an
engineering argument at the scale of a vehicle fleet.

**4. Software must not wait for silicon.**
Historically firmware starts when the FPGA arrives, and the schedule absorbs the delay. That is a
business problem disguised as a technical one. Virtual platforms, a Type-1 hypervisor and a
cycle-approximate simulator let the entire stack boot on a virtual SoC before RTL freezes.
**Shift-left is not a slogan here; it is the product.**

**5. Sovereignty and openness are allies, not opposites.**
Nations increasingly need silicon they can inspect, build and certify domestically. Open ISAs make
that possible. TRUSTED-V is engineered in India, works with Indian sovereign programmes (C-DAC,
Mindgrove, Upbeat Tech), and is simultaneously co-verified with global performance IP (SiFive,
Akeana). **Made in India, engineered to global standards, shipped in the open.** All three at once —
that is the position.

### The design consequence of the philosophy

A platform built on those beliefs cannot be dressed in gradient blobs and glowing cards. The
aesthetic has to *encode* the values:

| Belief | Visual consequence |
|---|---|
| Trust is engineered | 1px hairlines, spec tables, monospace metadata, no decoration that isn't information |
| Fragmentation is the enemy | one grid, one type scale, one accent hierarchy across every page |
| Memory safety, real engineering | technical diagrams authored in SVG/DOM, never stock imagery |
| Ship before silicon | the architecture and topology diagrams are the hero visuals, not photos of people |
| Sovereign and open | Berkeley navy + RISC-V gold, quiet Indian-provenance markers, zero flag-waving |

**If a section could be dropped into any generic B2B SaaS site unchanged, it is wrong.**

---

## PART II — WHY THIS PLATFORM NEEDS TO EXIST

### The situation

RISC-V has already won the argument. It has not yet won the deployment. Open ISA, no licence fees,
freedom to extend — the strategic case is settled. But the industries that need RISC-V most —
automotive, industrial control, medical, defence, critical infrastructure — are the industries least
able to adopt an ecosystem where nobody owns the answer to *"who guarantees this?"*

### The eight structural gaps

These are the platform's raison d'être. Each gap is a real blocker, and each maps to a concrete
TRUSTED-V module. This table is the intellectual spine of the whole product, and it appears on the
About page almost verbatim.

| # | Gap | The problem | What TRUSTED-V does |
|---|---|---|---|
| 01 | **ISA fragmentation** | Every vendor ships a subtly different extension mix; portability breaks silently | TRUSTED-V Verified validates ISA compliance and locks a reference feature set |
| 02 | **No unified security framework** | No consistent root of trust, boot chain or attestation model across vendors | rBoot + rustBoot + Crypto Stack form one certifiable posture from ROM up |
| 03 | **Supply-chain integrity** | SBOMs, signed artifacts and reproducible builds are not the default in embedded | SLSA L3-style pipelines and a signed toolchain, built into Jarvyn from day one |
| 04 | **SW–HW co-integration** | Silicon and firmware teams debug in different worlds, weeks apart | Virtual platforms and simulators let firmware ship before RTL freezes |
| 05 | **Certification pathway** | Automotive/industrial/IoT certification means months of retrofitting | Evidence collection and compliance mapping baked into the toolchain, aligned to CC, PSA, ISO 26262, IEC 62443 |
| 06 | **Enterprise adoption** | Enterprises need LTS, SLAs and indemnification — not GitHub goodwill | Backed by Bosch, with commercial LTS and enterprise support tiers |
| 07 | **Platform security layer** | PSA and its peers were designed around Arm, leaving RISC-V behind | A PSA L3-aligned platform security layer, native to RISC-V |
| 08 | **Ecosystem coordination** | IP, silicon, EDA and software vendors each optimise locally | The TRUSTED-V Consortium aligns partners around one open, production-hardened reference |

### Who it is for

- **Firmware and embedded engineers** — want to write Rust for a RISC-V board today, with a real
  debugger, real HAL crates and a toolchain that doesn't fight them.
- **Silicon and SoC teams** — integrating SiFive, Akeana or a sovereign core, and needing a software
  stack, boot chain and sign-off path that already exists.
- **Tier-1 / OEM platform architects** — must justify RISC-V to a safety board, and need a named
  entity accountable for LTS.
- **Security & compliance leads** — need attestation, PQC-readiness and audit evidence, not
  reassurance.
- **Sovereign silicon programmes and academia** — need an open reference implementation that meets
  global standards without a licence gate.

### Why the alternatives don't close the gap

- **Roll your own** — technically possible, and it costs years. Every team rebuilds the same boot
  chain, the same signing pipeline, the same evidence spreadsheets.
- **A proprietary end-to-end vendor** — solves trust by removing openness, which removes the reason
  you chose RISC-V.
- **Pure open-source assembly** — excellent components (Zephyr, OpenTitan, CVA6, Ibex, rustBoot), no
  integration contract, no LTS, no single accountable party.

**TRUSTED-V is the missing middle: integrated and accountable like a proprietary vendor, open and
extensible like the ecosystem it lives in.**

---

## PART III — THE BLOCKS, AND THE STORY THEY TELL

The platform is **six layers, four product modules, three trust brands**. The website's job is to
make that structure feel inevitable.

### The six-layer stack (bottom to top)

**L00 — RISC-V IP & Silicon.** *"Bring your IP. We'll bring the stack."*
Performance-class cores from **SiFive** (P550, P870-A, U-series). Automotive-grade RISC-V from
**Akeana** (5100 series). Indian sovereign silicon from **C-DAC** (VEGA, DHRUV, ARIES boards),
**Mindgrove** (IIT Madras) and **Upbeat Tech**. Open cores — **CVA6 (Ariane)**, **Ibex**,
**OpenTitan** — supported as first-class citizens.
*The strength:* IP-agnostic by construction. Swap the core, keep everything above it. Nobody is
locked in — which is precisely why they trust it.

**L01 — Secure Boot & Crypto.** *"A verified chain, from ROM to app."*
`Silicon RoT → rBoot → rustBoot → Application`. **rBoot** is the minimal, security-critical first
stage: hardware init, verified boot with ECDSA/EdDSA/ML-DSA, anti-rollback counters, key
provisioning. **rustBoot** is the full second stage: A/B partitions, signed OTA manifests, recovery
mode, PQC-ready verification — in memory-safe Rust. The **Crypto Stack** carries both worlds: AES,
SHA-2/3, SHAKE, ECDSA/EdDSA, RSA, ECDH, DRBGs *and* the NIST PQC set — ML-KEM (FIPS 203), ML-DSA
(FIPS 204), SLH-DSA (FIPS 205). **TVOTS** produces the attestation quote at the top.
*The strength:* the boot chain, the crypto and the attestation are one design, not three vendors
stapled together. And it is post-quantum ready today, on devices that will still be in the field in
2040.

**L02 — Virtualization.** *"Ship firmware before RTL freezes."*
A Type-1 hypervisor for mixed-criticality consolidation, a virtual RISC-V platform with configurable
cores and peripherals, and a cycle-approximate simulator for driver bring-up.
*The strength:* this is the single biggest schedule lever in the whole stack. A safety RTOS, a
real-time Rust runtime and a Linux user-space can share one virtual SoC, months before silicon.

**L03 — Rust Runtime & OS.** *"Memory-safe by construction."*
TRUSTED-V RTOS, plus first-class support for Zephyr, FreeRTOS and async Rust runtimes. HAL / PAC /
HAM crates give safe, typed peripheral access.
*The strength:* honesty about choice. The platform doesn't insist you abandon Zephyr — it makes every
option safe and comparable, and is transparent about the trade-offs.

**L04 — Developer Toolchain.** *"Rust-native. RISC-V-first. Cargo everywhere."*
**Jarvyn IDE** — purpose-built, not a fork: hardware-aware AI trained on GPIO/UART/register code, a
native Rust analyzer, SVD-driven register views at bit-field resolution, checkpoints beyond git,
BSPs for every certified board, JTAG/SWD debug and trace, and a signed reproducible toolchain.
**WebIDE** for zero-install access. Debugger, programmer, simulator, and compliance evidence
collection in the same panel.
*The strength:* the tooling knows about the hardware. A general-purpose editor can only ever guess.

**L05 — Application.** *"Where TRUSTED-V ships."*
Automotive (ISO 26262 aligned), industrial (IEC 62443), IoT & consumer (PSA L3), robotics, defence &
aerospace, edge AI.
*The strength:* the certification story is pre-wired at the bottom, so it is available at the top.

### The four product modules (how the layers are sold)

| Module | What it is | Layers |
|---|---|---|
| **01 Development Platform** | Jarvyn IDE, WebIDE, debugger, programmer, trace | L04 |
| **02 Virtualization & Simulation** | Virtual platform, hypervisor, simulator | L02 |
| **03 Secure Rust Software** | rBoot, rustBoot, RTOS, HAL/PAC/HAM, Crypto Stack, SDKs | L01, L03 |
| **04 Silicon SignOff & Trust** | SignOff Silicon, TRUSTED-V Verified, TVOTS | L00, cross-cutting |

### The three trust brands

- **TRUSTED-V Verified** (navy) — the reference certification for RISC-V silicon and firmware.
  Vendor-neutral, evidence-driven.
- **SignOff Silicon** (green) — the silicon assurance service, from RTL review to post-tapeout
  attestation.
- **TRUSTED Certification** (amber) — an independent third-party programme for embedded systems built
  on TRUSTED-V.

### The consortium

Four tiers, because an ecosystem needs a membrane, not a wall: **Founding** (IP vendors, Tier-1 OEMs,
EDA leaders shaping the reference), **Principal** (silicon houses and software Tier-1s driving
co-verified releases), **Associate** (integrators and OEMs building on Verified silicon),
**Academic & Research** (universities and labs contributing to open reference implementations).

### The roadmap

`2025–2026 Foundation (Active)` → `2026–2027 Ecosystem Growth (Committed)` →
`2027–2029 Industry Adoption (Planned)`. Three phases, honestly labelled by confidence level. Note
what is absent: no revenue projections, no unit forecasts, no "market leader by" claims.

---

## PART IV — THE NARRATIVE ARC OF THE HOMEPAGE

The homepage is not a feature list. It is an argument, delivered in eleven moves, and it is
deliberately ordered so that a skimming semiconductor buyer hits the *unique* value first.

1. **Hero — the claim.** "Build secure, software-defined compute systems on RISC-V." A reference SoC
   die rendered in SVG says *we are close to the silicon* before a word is read. `Co-verified with
   SiFive · Akeana · C-DAC · Mindgrove` earns the right to continue.
2. **Platform intro — the frame.** One oversized two-tone sentence. What this is, who built it, where
   it comes from. No cards. Confidence is quiet.
3. **RISC-V IP & collaborations — the credibility.** Two wide cards, not three. SiFive for
   performance, Akeana for automotive safety. Then, honestly separated, "also supported" — sovereign
   programmes and open cores. **Named partners come before named features**, because in this industry
   who you are co-verified with *is* the feature.
4. **Virtualization — the differentiator.** The page's only dark band this high, with gold accents,
   and a five-layer topology diagram. This is the section that makes a schedule-owner lean in: *ship
   firmware before RTL freezes.*
5. **Platform architecture — the proof.** Six coloured bands, `L05` down to `L00`, each with its
   real component tiles and a spec sidebar showing the boot data flow. This replaced an earlier
   card-grid version because a card grid says "we have features" while a block diagram says
   **"we have a system."**
6. **Core technologies — the primitives.** Six modules, each also purchasable alone.
7. **Product families — the commercial shape.** The same six layers, re-cut into four buyable modules.
8. **Ecosystem — the network.** Six hairline cells. Names as type, never logos: partners are peers,
   not decoration.
9. **Application markets — the destination.** Six domains, each with three concrete capabilities.
   The reader finds themselves on the page.
10. **Developer experience — the human moment.** Real Rust in a real terminal window:
    `verify_chain → attest → launch`, and `✓ signed · verified` in the status bar. Twelve lines of
    code carry more conviction than a paragraph of adjectives.
11. **Final CTA — the invitation.** "Start on RISC-V. Ship on TRUSTED-V."

**Why this order works:** claim → frame → credibility → differentiator → proof → parts → packages →
network → destination → craft → invitation. Every step earns the next.

---

## PART V — STRENGTHS, ADVANTAGES, AND HONEST LIMITS

### Strengths
1. **Full-stack coherence** — IP to application, one design authority. Nobody else in RISC-V spans
   silicon sign-off *and* an IDE.
2. **Rust-native by decision** — memory safety as an architectural property, not a coding guideline.
3. **Trust as a first-class deliverable** — attestation, PQC, signed artifacts and audit evidence are
   product features, not roadmap items.
4. **IP-agnostic** — the reason a competitor's customer can still adopt it.
5. **Shift-left virtualization** — the schedule advantage that finance understands.
6. **Bosch-backed** — automotive-grade rigour, LTS and an accountable counterparty.
7. **Made in India, global standards** — sovereign relevance without sovereign isolation.
8. **Open where it counts** — open reference implementations, commercial support where enterprises
   need it.

### Advantages over each alternative
- *vs building it yourself:* years of boot-chain, signing and evidence work already done.
- *vs a proprietary end-to-end vendor:* you keep your IP choice and your exit.
- *vs assembling open source:* an integration contract, LTS, and one phone number.
- *vs an Arm-based platform:* no licence gate, sovereign-friendly, and a security layer designed for
  RISC-V rather than ported to it.

### Honest limits (state these; do not hide them)
- The **WebIDE cloud environment is currently a mock**. Label it as a preview; never simulate a boot
  that isn't happening.
- Certifications are **alignment targets**, not achieved certificates, until they are achieved.
- The platform is **invite-only** today. Say "invite-only preview", not "now generally available".
- The consortium tiers are a **structure**, not a roster. Do not invent members.

---

## PART VI — VOICE & TONE

**We sound like:** a principal engineer writing a design document for peers who will disagree with
them. Precise, declarative, technically dense, unhurried. Short sentences carrying real nouns —
`RV64GC`, `ML-KEM`, `SVD`, `anti-rollback counter`, `attestation quote`.

**We never sound like:** a growth-marketing landing page. No "revolutionary", "game-changing",
"seamless", "unleash", "supercharge", "10x". No exclamation marks. No emoji. No rhetorical questions.
No first-person-plural cheerleading.

**Headline pattern:** a short declarative, often two clauses, occasionally with the second clause set
in navy or gold for emphasis.
*Good:* "Ship firmware before RTL freezes." · "A verified chain, from ROM to app." · "Six layers. One
coherent stack." · "Purpose-built, not repurposed." · "Skip the fork. Ship the firmware." · "Bring
your IP. We'll bring the stack."
*Bad:* "Unlock the power of RISC-V!" · "The future of embedded is here." · "Transform your silicon
journey."

**Body pattern:** name real technologies. Prefer a specific noun over an adjective. If a sentence
survives the deletion of its adjectives, delete them.

**Numbers:** only ISA names, key sizes, standard numbers and curve names. Never performance,
adoption, headcount or duration.

---

## PART VII — THE THREE MISTAKES PREVIOUS BUILDS MADE

Learn these so you don't repeat them.

1. **Inventing credibility.** Early versions carried "10B+ devices", "130+ years", "400K+
   associates", "48-hour certification", "9× faster context switch". Every one had to be surgically
   removed. A single fabricated number destroys more trust than ten missing ones. **When you don't
   have the number, write the sentence without it.**
2. **Listing a partner that isn't one.** An early build listed MIPS ARC-V among the IP partners. It
   is not a partner. Partner lists are legal statements — SiFive and Akeana, and nothing else.
3. **Reaching for cards.** The architecture section began life as a nine-card grid and said nothing.
   Rebuilt as a six-band block diagram with real component tiles, it became the most persuasive
   section on the site. **When you catch yourself making another card grid, ask what the actual
   structure of the information is, and draw that instead.**

---

## PART VIII — THE ONE-PARAGRAPH PITCH (for reuse anywhere)

> TRUSTED-V is a full-stack, Rust-native platform for building trustworthy RISC-V compute systems.
> It unifies RISC-V IP integration, virtualization and pre-silicon simulation, secure boot and
> post-quantum-ready cryptography, real-time software, and a purpose-built developer toolchain — plus
> an independent silicon sign-off and certification programme. It is co-verified with SiFive and
> Akeana, works with Indian sovereign silicon programmes from C-DAC, Mindgrove and Upbeat Tech, and
> is led by Bosch Global Software Technologies. Open where openness matters. Accountable where
> accountability matters. Made in India, engineered to global standards, shipped in the open.
