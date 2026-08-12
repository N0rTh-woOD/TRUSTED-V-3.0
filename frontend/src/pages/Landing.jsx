import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Circle } from "lucide-react";

/**
 * Landing — TRUSTED-V home
 * MIPS-inspired: massive editorial hero, minimal iconography, generous whitespace,
 * asymmetric sections, dark accent block for gravitas.
 */
const Landing = () => {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <Hero />
      <PartnerStrip />
      <MissionStatement />
      <Modules />
      <IndustryFocus />
      <Standards />
      <BoschStory />
      <Roadmap />
      <CTA />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────────────────────── */
const Hero = () => (
  <section
    className="relative bg-white overflow-hidden border-b border-[#E7E5E0]"
    data-testid="landing-hero"
  >
    <div className="tv-container pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-20 lg:pb-24">
      <div className="tv-fade-up">
        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <span className="tv-eyebrow">The complete RISC-V platform</span>
          <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] uppercase text-[#6B6B6B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <IndiaFlag />
            <span>Made in India · Engineered by Bosch</span>
          </span>
        </div>

        <h1
          className="tv-display text-[30px] sm:text-[38px] md:text-[48px] lg:text-[56px] leading-[0.98] tracking-[-0.03em] text-[#0A0A0A] max-w-[18ch]"
          data-testid="landing-hero-title"
        >
          Software to Silicon,{" "}
          <span className="text-[#003262]">Rust‑Native RISC‑V.</span>
        </h1>

        <div className="mt-10 grid lg:grid-cols-12 gap-10 items-end">
          <p
            className="lg:col-span-6 text-[15px] md:text-[17px] leading-[1.6] text-[#3A3A3A] font-light"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            data-testid="landing-hero-subtitle"
          >
            TRUSTED-V is an open, modular platform for building trustworthy edge
            silicon and mission-critical embedded software — from IP integration
            and virtual platforms to certified boot, cryptography, and RTOS,
            unified under one brand.
          </p>

          <div className="lg:col-span-6 lg:col-start-7 flex flex-wrap items-center gap-4">
            <Link to="/product-suite" className="tv-btn tv-btn-primary" data-testid="hero-cta-primary">
              Explore the platform <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="tv-btn tv-btn-outline" data-testid="hero-cta-secondary">
              Request a demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   PARTNER STRIP
   ───────────────────────────────────────────────────────────── */
const PartnerStrip = () => {
  const partners = [
    "SiFive", "Akeana", "MIPS ARC-V", "C-DAC", "Mindgrove", "Upbeat Tech",
    "SiFive", "Akeana", "MIPS ARC-V", "C-DAC", "Mindgrove", "Upbeat Tech",
  ];
  return (
    <section className="border-b border-[#E7E5E0]" data-testid="partner-strip">
      <div className="tv-container py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div
            className="md:w-56 shrink-0 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6B6B6B]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            An open IP ecosystem
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-14 md:gap-20 items-center whitespace-nowrap tv-marquee-slow">
              {partners.map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="text-[22px] md:text-[26px] text-[#0A0A0A]/75 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   MISSION STATEMENT — big editorial paragraph
   ───────────────────────────────────────────────────────────── */
const MissionStatement = () => (
  <section className="tv-section border-b border-[#E7E5E0]" data-testid="mission-statement">
    <div className="tv-container">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-3">
          <span className="tv-eyebrow">Our thesis</span>
        </div>
        <div className="lg:col-span-9">
          <p
            className="tv-display text-[22px] md:text-[28px] lg:text-[34px] leading-[1.25] text-[#0A0A0A]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            The RISC-V ecosystem&apos;s next growth phase is gated by{" "}
            <span className="text-[#003262]">trust</span>, not silicon
            capability. TRUSTED-V closes the structural gaps between IP, software,
            and silicon — so mission-critical systems can ship on RISC-V, safely,
            at scale.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   4 MODULES — MIPS-style large numbered list
   ───────────────────────────────────────────────────────────── */
const Modules = () => {
  const modules = [
    {
      num: "01",
      title: "Development Platform",
      lede: "Jarvyn IDE, WebIDE, debugger, programmer and trace — one Rust-native toolchain across every RISC-V target.",
      links: [
        { label: "Jarvyn IDE", to: "/download-ide" },
        { label: "WebIDE", to: "/webide" },
      ],
    },
    {
      num: "02",
      title: "Virtualization & Simulation",
      lede: "Virtual platforms, RISC-V hypervisor and simulators. Evaluate IP, subsystems and full SoCs before silicon, FPGA or even RTL.",
      links: [{ label: "Explore", to: "/product-suite#virtualization" }],
    },
    {
      num: "03",
      title: "Secure Rust Software",
      lede: "rBoot, rustBoot, RTOS, HAL/PAC/HAM, Crypto Stack and SDKs. Memory-safe firmware, PQC-ready, certification-friendly.",
      links: [
        { label: "Secure Boot", to: "/product/secure-boot" },
        { label: "Crypto Stack", to: "/product/crypto-stack" },
        { label: "RTOS", to: "/product/rtos-benchmark" },
      ],
    },
    {
      num: "04",
      title: "Silicon SignOff & Trust",
      lede: "SignOff Silicon, TRUSTED-V Verified and TVOTS — an independent, vendor-neutral certification programme for RISC-V SoCs.",
      links: [{ label: "Certification", to: "/product-suite#certification" }],
    },
  ];

  return (
    <section id="modules" className="tv-section border-b border-[#E7E5E0]" data-testid="modules-section">
      <div className="tv-container">
        <div className="grid lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-4">
            <span className="tv-eyebrow">The four modules</span>
            <h2
              className="tv-display mt-5 text-[24px] md:text-[30px] lg:text-[36px] text-[#0A0A0A]"
              style={{ letterSpacing: "-0.025em", lineHeight: "1.05" }}
            >
              One brand.<br />Four modules.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 flex items-end">
            <p
              className="text-[15px] md:text-[16px] text-[#3A3A3A] font-light leading-[1.65]"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              A modular architecture built around the workloads that define
              Physical AI, secure embedded and next-gen edge silicon. Each
              module ships independently. Together, they form the complete
              RISC-V development stack.
            </p>
          </div>
        </div>

        <div className="border-t border-[#E7E5E0]">
          {modules.map((m) => (
            <Link
              key={m.num}
              to={m.links[0].to}
              className="group grid lg:grid-cols-12 gap-6 lg:gap-10 py-10 md:py-14 border-b border-[#E7E5E0] transition-colors duration-300 hover:bg-[#FAFAF7]"
              data-testid={`module-${m.num}`}
            >
              <div className="lg:col-span-2">
                <span
                  className="text-[13px] font-mono tracking-widest text-[#6B6B6B]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  / {m.num}
                </span>
              </div>
              <div className="lg:col-span-5">
                <h3
                  className="text-[22px] md:text-[26px] lg:text-[30px] leading-[1.1] tracking-[-0.015em] text-[#0A0A0A] group-hover:text-[#003262] transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                >
                  {m.title}
                </h3>
              </div>
              <div className="lg:col-span-4">
                <p
                  className="text-[14.5px] leading-[1.65] text-[#3A3A3A] font-light"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                >
                  {m.lede}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {m.links.map((l) => (
                    <span
                      key={l.label}
                      className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#003262] border-b border-[#003262]/40 pb-0.5"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-1 flex items-start justify-end">
                <ArrowUpRight className="w-6 h-6 text-[#6B6B6B] group-hover:text-[#003262] group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   INDUSTRY FOCUS
   ───────────────────────────────────────────────────────────── */
const IndustryFocus = () => {
  const industries = [
    { name: "Automotive", note: "ISO 26262, ISO/SAE 21434 aligned. Safe firmware & bootchain." },
    { name: "Industrial", note: "IEC 62443 certifiable. Deterministic RTOS." },
    { name: "IoT", note: "PSA L3, ETSI EN 303 645. PQC-ready root of trust." },
    { name: "Consumer Electronics", note: "Low-power RISC-V + Rust for connected devices." },
    { name: "Defence & Aerospace", note: "Sovereign silicon path. Vendor-neutral certification." },
    { name: "Data Center & Edge AI", note: "Virtualized RISC-V for Physical AI workloads." },
  ];
  return (
    <section className="tv-section border-b border-[#E7E5E0] bg-[#FAFAF7]" data-testid="industry-focus">
      <div className="tv-container">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <span className="tv-eyebrow">Where TRUSTED-V ships</span>
            <h2
              className="tv-display mt-5 text-[24px] md:text-[30px] lg:text-[36px] text-[#0A0A0A]"
              style={{ letterSpacing: "-0.025em", lineHeight: "1.05" }}
            >
              Built for<br />mission-critical.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p
              className="text-[15px] md:text-[16px] text-[#3A3A3A] font-light leading-[1.65]"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              From safety-critical automotive ECUs to sovereign defence silicon,
              TRUSTED-V is architected for systems that cannot fail — and cannot
              be untrusted.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E7E5E0]">
          {industries.map((ind) => (
            <div key={ind.name} className="bg-[#FAFAF7] p-8 md:p-10 min-h-[220px] flex flex-col justify-between">
              <div>
                <div
                  className="text-[11px] font-mono tracking-widest text-[#6B6B6B] mb-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Vertical
                </div>
                <h3
                  className="text-[20px] md:text-[22px] tracking-[-0.015em] text-[#0A0A0A]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                >
                  {ind.name}
                </h3>
              </div>
              <p
                className="mt-4 text-[13.5px] leading-[1.6] text-[#4B4B4B] font-light"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                {ind.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   STANDARDS
   ───────────────────────────────────────────────────────────── */
const Standards = () => {
  const rows = [
    ["CC EAL4+", "Common Criteria evaluation"],
    ["FIPS 140-3", "Cryptographic module validation"],
    ["PSA Level 3", "Arm Platform Security Architecture"],
    ["ISO 26262", "Automotive functional safety"],
    ["IEC 62443", "Industrial cybersecurity"],
    ["SLSA L3", "Supply-chain integrity"],
    ["ISO/SAE 21434", "Road vehicle cybersecurity"],
    ["ETSI EN 303 645", "Consumer IoT security"],
  ];
  return (
    <section className="tv-section border-b border-[#E7E5E0]" data-testid="standards-section">
      <div className="tv-container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="tv-eyebrow">Standards & compliance</span>
            <h2
              className="tv-display mt-5 text-[28px] md:text-[36px] lg:text-[40px] text-[#0A0A0A]"
              style={{ letterSpacing: "-0.025em", lineHeight: "1.05" }}
            >
              Certifiable by design.
            </h2>
            <p
              className="mt-5 text-[14.5px] leading-[1.7] text-[#3A3A3A] font-light"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              Every module is architected against the standards that matter in
              automotive, industrial, IoT, defence and medical. Certification
              targets we build toward — not brag about.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-[#0A0A0A]">
              {rows.map(([code, desc], i) => (
                <div
                  key={code}
                  className="grid grid-cols-12 gap-4 py-4 md:py-5 border-b border-[#E7E5E0] items-baseline"
                >
                  <span
                    className="col-span-1 text-[12px] text-[#6B6B6B]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="col-span-5 text-[16px] md:text-[18px] text-[#0A0A0A]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, letterSpacing: "-0.01em" }}
                  >
                    {code}
                  </span>
                  <span
                    className="col-span-6 text-[13.5px] text-[#4B4B4B] font-light"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                  >
                    {desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   BOSCH STORY — dark section (story only, no stat claims)
   ───────────────────────────────────────────────────────────── */
const BoschStory = () => {
  return (
    <section className="bg-[#00162B] text-white" data-testid="bosch-story">
      <div className="tv-container tv-section">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <span className="tv-eyebrow" style={{ color: "#FDB515" }}>
              <span className="text-[#FDB515]">Powered by Bosch</span>
            </span>
            <h2
              className="tv-display mt-5 text-[22px] md:text-[28px] lg:text-[34px] leading-[1.02] text-white"
              style={{ letterSpacing: "-0.025em" }}
            >
              Made in India.<br />Engineered by Bosch<br />to the world.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p
              className="text-[15px] md:text-[16px] leading-[1.7] text-white/70 font-light"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              TRUSTED-V is a Bosch Global Software Technologies (BGSW)
              initiative — built with the discipline of automotive-grade
              engineering and the velocity of India&apos;s semiconductor
              mission. A neutral, open, production-hardened stack for the
              RISC-V decade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   ROADMAP — MIPS-style horizontal stages
   ───────────────────────────────────────────────────────────── */
const Roadmap = () => {
  const phases = [
    { period: "2025 – 2026", title: "Foundation", state: "Active", desc: "Jarvyn IDE, WebIDE, Rust toolchain, rBoot, rustBoot, RTOS and Crypto Stack GA. First TRUSTED-V Verified silicon." },
    { period: "2026 – 2027", title: "Ecosystem Growth", state: "Committed", desc: "Virtualization suite, hypervisor, SiFive/Akeana/MIPS ARC-V co-verified stacks, expanded certification labs." },
    { period: "2027 – 2029", title: "Industry Adoption", state: "Planned", desc: "TRUSTED-V Consortium, sovereign silicon partnerships, automotive Tier-1 rollouts, ecosystem SDK marketplace." },
  ];
  return (
    <section className="tv-section border-b border-[#E7E5E0]" data-testid="roadmap-section">
      <div className="tv-container">
        <div className="mb-14 max-w-3xl">
          <span className="tv-eyebrow">Roadmap</span>
          <h2
            className="tv-display mt-5 text-[24px] md:text-[30px] lg:text-[36px] text-[#0A0A0A]"
            style={{ letterSpacing: "-0.025em", lineHeight: "1.05" }}
          >
            The plan, in the open.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#E7E5E0] border-t border-[#0A0A0A]">
          {phases.map((p) => (
            <div key={p.title} className="bg-white p-8 md:p-10 min-h-[280px] flex flex-col">
              <div className="flex items-center gap-3">
                <span
                  className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#6B6B6B]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {p.period}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase px-2 py-1 border ${
                    p.state === "Active"
                      ? "text-[#0F6E56] border-[#0F6E56]/40 bg-[#0F6E56]/5"
                      : "text-[#6B6B6B] border-[#E7E5E0]"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {p.state === "Active" && <Circle className="w-1.5 h-1.5 fill-[#0F6E56] stroke-none" />}
                  {p.state}
                </span>
              </div>
              <h3
                className="mt-5 text-[22px] md:text-[26px] tracking-[-0.015em] text-[#0A0A0A]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
              >
                {p.title}
              </h3>
              <p
                className="mt-4 text-[13.5px] leading-[1.6] text-[#4B4B4B] font-light"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   FINAL CTA
   ───────────────────────────────────────────────────────────── */
const CTA = () => (
  <section className="tv-section" data-testid="final-cta">
    <div className="tv-container">
      <div className="grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <h2
            className="tv-display text-[26px] md:text-[36px] lg:text-[44px] text-[#0A0A0A] leading-[1]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Start on <span className="text-[#003262]">RISC-V.</span><br />
            Ship on <span className="text-[#003262]">TRUSTED-V.</span>
          </h2>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-3 items-start">
          <Link to="/contact" className="tv-btn tv-btn-primary" data-testid="final-cta-primary">
            Talk to an engineer <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link to="/product-suite" className="tv-btn tv-btn-outline" data-testid="final-cta-secondary">
            Read the docs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   India flag
   ───────────────────────────────────────────────────────────── */
const IndiaFlag = () => (
  <svg viewBox="0 0 30 20" width="20" height="14" className="rounded-[1.5px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
    <rect width="30" height="6.67" y="0" fill="#FF9933" />
    <rect width="30" height="6.66" y="6.67" fill="#FFFFFF" />
    <rect width="30" height="6.67" y="13.33" fill="#138808" />
    <circle cx="15" cy="10" r="1.9" fill="none" stroke="#000080" strokeWidth="0.35" />
    <circle cx="15" cy="10" r="0.35" fill="#000080" />
  </svg>
);

export default Landing;
