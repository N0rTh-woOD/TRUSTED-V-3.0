import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  Eyebrow,
  SectionHeader,
  ArchitectureDiagram,
  TechnicalMetric,
  ProductCard,
  MarketCard,
  PartnerGrid,
  PrimaryCTA,
  SecondaryCTA,
} from "@/components/ui-kit";

/**
 * Landing — TRUSTED-V homepage.
 * Story-driven, semiconductor-grade layout per attached design spec.
 * Skips News/Videos/Whitepapers because that content doesn't exist yet.
 */
const Landing = () => (
  <div className="bg-white text-[#0B0F14]">
    <Hero />
    <PlatformIntro />
    <PlatformArchitecture />
    <CoreTechnologies />
    <ProductFamilies />
    <Ecosystem />
    <ApplicationMarkets />
    <DeveloperExperience />
    <FinalCTA />
  </div>
);

/* ─────────────────────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────────────────────── */
const Hero = () => {
  const proof = [
    { k: "RISC-V native", v: "RV32 · RV64 · Vector" },
    { k: "Language", v: "Rust-first, memory safe" },
    { k: "Security", v: "PQC-ready root of trust" },
    { k: "Deployment", v: "IP → SoC → firmware → apps" },
  ];
  return (
    <section className="relative bg-white overflow-hidden" data-testid="landing-hero">
      <div className="tv-container pt-16 md:pt-20 lg:pt-24 pb-14 md:pb-20 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 tv-fade-up">
            <div className="mb-5"><Eyebrow>RISC-V compute platform</Eyebrow></div>
            <h1 className="tv-h1" data-testid="landing-hero-title">
              Build secure, software-defined
              <br />
              compute systems on <span className="text-[#003262]">RISC-V</span>.
            </h1>
            <p className="tv-lede mt-6" data-testid="landing-hero-subtitle">
              TRUSTED-V is a Rust-native platform that unifies RISC-V IP integration,
              virtualization, secure boot, cryptography and real-time software — engineered
              for mission-critical silicon and shipped in the open.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryCTA to="/product-suite" size="lg" data-testid="hero-cta-primary">Explore the platform</PrimaryCTA>
              <SecondaryCTA to="/contact" size="lg" data-testid="hero-cta-secondary">Talk to an engineer</SecondaryCTA>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SiliconVisual />
          </div>
        </div>

        {/* Proof strip — factual capability descriptors, not fabricated numbers */}
        <div className="mt-14 md:mt-20 border-t border-[#E5E4DF] grid grid-cols-2 md:grid-cols-4">
          {proof.map((p, i) => (
            <div key={p.k} className={`py-6 pr-6 ${i > 0 ? "md:border-l md:border-[#E5E4DF] md:pl-6" : ""}`}>
              <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#5A6472]">{p.k}</div>
              <div className="mt-2 text-[14px] md:text-[15px] font-medium text-[#0B0F14]">{p.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** SiliconVisual — a minimalist SoC-inspired SVG (no AI slop) */
const SiliconVisual = () => (
  <div className="relative aspect-[5/4] rounded-md border border-[#E5E4DF] bg-[#F7F7F5] overflow-hidden" data-testid="hero-visual">
    <div className="absolute inset-0 tv-grid-bg opacity-70" />
    <svg viewBox="0 0 500 400" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* Die outline */}
      <rect x="80" y="60" width="340" height="280" rx="8" fill="#FFFFFF" stroke="#003262" strokeWidth="1.5" />
      {/* Pins top */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={`t${i}`} x={95 + i * 22} y="45" width="10" height="15" fill="#003262" opacity="0.35" />
      ))}
      {/* Pins bottom */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={`b${i}`} x={95 + i * 22} y="340" width="10" height="15" fill="#003262" opacity="0.35" />
      ))}
      {/* Pins left */}
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={`l${i}`} x="65" y={80 + i * 26} width="15" height="10" fill="#003262" opacity="0.35" />
      ))}
      {/* Pins right */}
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={`r${i}`} x="420" y={80 + i * 26} width="15" height="10" fill="#003262" opacity="0.35" />
      ))}
      {/* Core blocks */}
      <rect x="110" y="90" width="130" height="110" rx="4" fill="#E6F7FC" stroke="#003262" />
      <text x="175" y="150" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="12" fill="#003262" fontWeight="600">RISC-V CORE</text>
      <text x="175" y="168" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="#5A6472">RV64GC</text>

      <rect x="260" y="90" width="130" height="110" rx="4" fill="#FFFFFF" stroke="#003262" />
      <text x="325" y="150" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="12" fill="#003262" fontWeight="600">VECTOR</text>
      <text x="325" y="168" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="#5A6472">RVV 1.0</text>

      <rect x="110" y="220" width="80" height="90" rx="4" fill="#FFFFFF" stroke="#003262" />
      <text x="150" y="270" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="#003262" fontWeight="600">RoT</text>

      <rect x="205" y="220" width="80" height="90" rx="4" fill="#FFFFFF" stroke="#003262" />
      <text x="245" y="270" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="#003262" fontWeight="600">HYPER</text>

      <rect x="300" y="220" width="90" height="90" rx="4" fill="#FDF6E0" stroke="#B45309" />
      <text x="345" y="265" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="#B45309" fontWeight="600">SECURE</text>
      <text x="345" y="280" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="#B45309" fontWeight="600">SUBSYSTEM</text>

      {/* Data-flow trace lines */}
      <path d="M 240 145 L 260 145" stroke="#003262" strokeWidth="1.2" fill="none" />
      <path d="M 190 265 L 205 265" stroke="#003262" strokeWidth="1.2" fill="none" />
      <path d="M 285 265 L 300 265" stroke="#003262" strokeWidth="1.2" fill="none" />

      {/* Coordinate label */}
      <text x="90" y="76" fontFamily="IBM Plex Mono" fontSize="9" fill="#5A6472">0x0000</text>
      <text x="380" y="76" fontFamily="IBM Plex Mono" fontSize="9" fill="#5A6472" textAnchor="end">TRUSTED-V/1.0</text>
    </svg>
    <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-widest uppercase text-[#5A6472]">
      Reference SoC · illustrative
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   PLATFORM INTRO
   ───────────────────────────────────────────────────────────── */
const PlatformIntro = () => (
  <section className="tv-section-tight border-t border-[#E5E4DF] bg-[#F7F7F5]" data-testid="platform-intro">
    <div className="tv-container">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3"><Eyebrow>What TRUSTED-V provides</Eyebrow></div>
        <div className="lg:col-span-9">
          <p className="text-[22px] md:text-[28px] leading-[1.3] font-normal text-[#0B0F14]" style={{ letterSpacing: "-0.01em" }}>
            An open, modular platform for mission-critical RISC-V systems —
            <span className="text-[#5A6472]"> spanning IP integration, virtualization,
            secure boot, cryptography, real-time software and developer tooling. </span>
            Engineered by Bosch. Built in India. Shipped in the open.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   FULL PLATFORM ARCHITECTURE — the centerpiece
   ───────────────────────────────────────────────────────────── */
const PlatformArchitecture = () => {
  const layers = [
    { label: "Applications", sub: "Automotive · Industrial · IoT · Robotics", badge: "L08" },
    { label: "SDK & Runtime", sub: "Jarvyn IDE, WebIDE, cargo, LLVM, HAL/PAC", badge: "L07" },
    { label: "Virtualization", sub: "RISC-V hypervisor & virtual platforms", badge: "L06" },
    { label: "OS & RTOS", sub: "Zephyr · FreeRTOS · Embassy · TRUSTED-V RTOS" },
    { label: "Secure Microkernel", sub: "Rust-native, memory-safe, deterministic" },
    { label: "Crypto & Root of Trust", sub: "AES, SHA-3, ECDSA, ML-KEM, ML-DSA" },
    { label: "rBoot / rustBoot", sub: "Verified boot chain, PQC-ready" },
    { label: "RISC-V Processor IP", sub: "SiFive · Akeana · MIPS ARC-V · C-DAC · Mindgrove" },
    { label: "Silicon Platform", sub: "SoC, boards, evaluation kits", badge: "L00" },
  ];
  return (
    <section className="tv-section border-t border-[#E5E4DF]" data-testid="platform-architecture">
      <div className="tv-container">
        <SectionHeader
          eyebrow="Platform architecture"
          title={<>From <span className="text-[#003262]">silicon</span> to <span className="text-[#003262]">applications</span>, in one stack.</>}
          lede="Every layer is designed to interoperate. Ship a reference SoC. Boot a certified firmware chain. Run a Rust-native application. All within TRUSTED-V."
        />
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <ArchitectureDiagram layers={layers} />
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            <TechnicalMetric rows={[
              ["ISA", "RV32 · RV64 · Vector (RVV)"],
              ["Language", "Rust — no_std, embedded HAL"],
              ["Boot chain", "rBoot → rustBoot → App"],
              ["Attestation", "Silicon RoT + firmware"],
              ["Virtualization", "Type-1 hypervisor"],
              ["OS Support", "RTOS + Linux (via CVA6)"],
              ["Crypto", "Classical + Post-Quantum"],
            ]} />
            <Link
              to="/product-suite"
              className="tv-arrow-link mt-6"
              data-testid="architecture-explore"
            >
              Explore the product suite
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   CORE TECHNOLOGIES
   ───────────────────────────────────────────────────────────── */
const CoreTechnologies = () => {
  const items = [
    { title: "RISC-V native", desc: "First-class support for RV32, RV64 and RVV. Integration with SiFive, Akeana, MIPS ARC-V and Indian silicon programmes.", to: "/product-suite" },
    { title: "Security by construction", desc: "Rust memory safety, verified boot with rBoot/rustBoot, a cryptographic library covering classical and post-quantum.", to: "/product/secure-boot" },
    { title: "Virtualization", desc: "A RISC-V hypervisor and virtual platforms for mixed-criticality systems and pre-silicon firmware bring-up.", to: "/product-suite#virtualization" },
    { title: "Real-time software", desc: "Deterministic scheduling, RTOS integration and Rust async runtimes. Zephyr, FreeRTOS, Embassy and TRUSTED-V RTOS.", to: "/product/rtos-benchmark" },
    { title: "Cryptography", desc: "AES, SHA-3, ECDSA, EdDSA, ML-KEM, ML-DSA — mapped to NIST FIPS and international standards.", to: "/product/crypto-stack" },
    { title: "Rust developer tooling", desc: "Jarvyn IDE and WebIDE, cargo-based cross-compilation, signed toolchain artifacts and SVD register views.", to: "/developer-portal" },
  ];
  return (
    <section className="tv-section border-t border-[#E5E4DF] bg-[#F7F7F5]" data-testid="core-technologies">
      <div className="tv-container">
        <SectionHeader
          eyebrow="Core technologies"
          title="What the platform is made of."
          lede="The engineering primitives that power TRUSTED-V — each shipped as a standalone module, and pre-integrated when combined."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <ProductCard key={it.title} title={it.title} description={it.desc} to={it.to} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   PRODUCT FAMILIES
   ───────────────────────────────────────────────────────────── */
const ProductFamilies = () => {
  const items = [
    { eyebrow: "MODULE 01", title: "Development Platform", description: "Jarvyn IDE, WebIDE, debugger, programmer, trace — a single Rust-native environment across every RISC-V target.", bullets: ["Jarvyn IDE", "WebIDE (cloud)", "Debugger & programmer"], to: "/download-ide" },
    { eyebrow: "MODULE 02", title: "Virtualization & Simulation", description: "Virtual platforms and a RISC-V hypervisor. Evaluate SoCs before silicon or FPGA freezes.", bullets: ["Virtual platform", "RISC-V hypervisor", "Cycle-approximate simulator"], to: "/product-suite#virtualization" },
    { eyebrow: "MODULE 03", title: "Secure Rust Software", description: "rBoot, rustBoot, RTOS, HAL/PAC and Crypto Stack. Memory-safe, PQC-ready, certification-friendly.", bullets: ["rBoot & rustBoot", "Crypto Stack", "RTOS"], to: "/product/secure-boot" },
    { eyebrow: "MODULE 04", title: "Silicon SignOff & Trust", description: "SignOff Silicon, TRUSTED-V Verified and TVOTS — vendor-neutral certification for RISC-V SoCs.", bullets: ["SignOff Silicon", "TRUSTED-V Verified", "TVOTS"], to: "/product-suite#certification" },
  ];
  return (
    <section className="tv-section border-t border-[#E5E4DF]" data-testid="product-families">
      <div className="tv-container">
        <SectionHeader
          eyebrow="Product families"
          title="Four modules. One RISC-V platform."
          action={<Link to="/product-suite" className="tv-arrow-link">See the full suite</Link>}
        />
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   ECOSYSTEM
   ───────────────────────────────────────────────────────────── */
const Ecosystem = () => {
  const silicon = [
    { name: "SiFive", note: "Performance RISC-V IP" },
    { name: "Akeana", note: "Automotive RISC-V" },
    { name: "MIPS ARC-V", note: "eXtensible RISC-V" },
    { name: "C-DAC", note: "VEGA sovereign silicon" },
    { name: "Mindgrove", note: "Secure IoT SoCs" },
    { name: "Upbeat Tech", note: "Edge-AI SoCs" },
  ];
  return (
    <section className="tv-section border-t border-white/0 bg-[#00162B] text-white" data-testid="ecosystem">
      <div className="tv-container">
        <div className="grid lg:grid-cols-12 gap-8 mb-10 md:mb-14">
          <div className="lg:col-span-7">
            <div className="mb-4">
              <span className="tv-eyebrow" style={{ color: "#FDB515" }}>
                <span style={{ color: "#FDB515" }}>An open RISC-V ecosystem</span>
              </span>
            </div>
            <h2 className="tv-h2 text-white">Bring your IP. We bring the stack.</h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="text-[15px] leading-[1.65] text-white/70">
              TRUSTED-V is co-verified with the leading RISC-V IP families — from performance
              cores to Indian sovereign silicon programmes.
            </p>
          </div>
        </div>
        <PartnerGrid partners={silicon} onDark />
        <div className="mt-10">
          <Link to="/partners" className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-white border-b border-white/40 pb-0.5 hover:border-[#FDB515] hover:text-[#FDB515] transition-colors" data-testid="ecosystem-explore">
            Meet the partners <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   APPLICATION MARKETS
   ───────────────────────────────────────────────────────────── */
const ApplicationMarkets = () => {
  const markets = [
    { label: "AUTOMOTIVE", headline: "Secure compute for software-defined vehicles.", capabilities: ["Deterministic processing", "Secure execution", "ISO 26262 alignment"] },
    { label: "INDUSTRIAL", headline: "Deterministic control for factories and grids.", capabilities: ["Real-time RTOS", "IEC 62443 alignment", "Rugged deployment"] },
    { label: "IOT & CONSUMER", headline: "Root of trust for connected devices.", capabilities: ["PSA L3-aligned", "PQC-ready", "Low-power RISC-V"] },
    { label: "ROBOTICS", headline: "Real-time compute for autonomous systems.", capabilities: ["Rust async runtime", "Hypervisor isolation", "Vision-capable RVV"] },
    { label: "DEFENCE & AEROSPACE", headline: "Sovereign silicon for critical missions.", capabilities: ["Vendor-neutral certification", "Attestation", "Hardware-anchored trust"] },
    { label: "EDGE AI", headline: "Physical AI on virtualized RISC-V.", capabilities: ["Virtual platforms", "RVV vector compute", "Deterministic scheduling"] },
  ];
  return (
    <section className="tv-section border-t border-[#E5E4DF]" data-testid="application-markets">
      <div className="tv-container">
        <SectionHeader
          eyebrow="Application markets"
          title="Where TRUSTED-V ships."
          lede="From safety-critical automotive ECUs to sovereign defence silicon, TRUSTED-V is architected for systems that cannot fail — and cannot be untrusted."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((m) => (
            <MarketCard key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   DEVELOPER EXPERIENCE
   ───────────────────────────────────────────────────────────── */
const DeveloperExperience = () => (
  <section className="tv-section border-t border-[#E5E4DF] bg-[#F7F7F5]" data-testid="developer-experience">
    <div className="tv-container">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <div className="mb-4"><Eyebrow>Developer experience</Eyebrow></div>
          <h2 className="tv-h2">Rust-native. RISC-V-first. Cargo everywhere.</h2>
          <p className="tv-lede mt-6">
            The Jarvyn IDE and cloud WebIDE give firmware and silicon engineers one
            environment — with an SVD-driven register view, signed toolchain artifacts,
            and pre-integrated Rust HAL/PAC crates for every certified board.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/download-ide" className="tv-btn tv-btn-primary" data-testid="dev-cta-ide">
              Download Jarvyn <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/webide" className="tv-btn tv-btn-outline" data-testid="dev-cta-webide">
              Try WebIDE <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6">
          <CodeWindow />
        </div>
      </div>
    </div>
  </section>
);

const CodeWindow = () => (
  <div className="border border-[#E5E4DF] rounded-md bg-[#0B0F14] text-white overflow-hidden">
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-white/25" />
        <span className="w-2 h-2 rounded-full bg-white/25" />
        <span className="w-2 h-2 rounded-full bg-white/25" />
      </div>
      <span className="text-[11px] font-mono text-white/60">main.rs</span>
      <span className="text-[10px] font-mono text-[#FDB515] tracking-widest">RV64GC</span>
    </div>
    <pre className="p-5 text-[12.5px] leading-[1.75] font-mono">
      <code>
        <span className="text-white/40">// TRUSTED-V — secure boot + attestation</span>{"\n"}
        <span className="text-[#00B4E0]">use</span> <span className="text-white">trusted_v::rboot::verify_chain;</span>{"\n"}
        <span className="text-[#00B4E0]">use</span> <span className="text-white">trusted_v::crypto::attest;</span>{"\n"}
        <span className="text-[#00B4E0]">use</span> <span className="text-white">trusted_v::rtos::launch;</span>{"\n\n"}
        <span className="text-[#FDB515]">#[no_std]</span>{"\n"}
        <span className="text-[#FDB515]">#[no_main]</span>{"\n"}
        <span className="text-[#00B4E0]">fn</span> <span className="text-white">main</span>() {"{"}{"\n"}
        {"    "}<span className="text-white/60">let</span> chain = verify_chain(<span className="text-[#0F6E56]">&BOOT_KEY</span>);{"\n"}
        {"    "}<span className="text-white/60">let</span> quote = attest(chain);{"\n"}
        {"    "}launch(<span className="text-[#0F6E56]">&quot;rt_secure&quot;</span>, quote);{"\n"}
        {"}"}
      </code>
    </pre>
    <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 font-mono text-[11px]">
      <span className="text-white/50">$ cargo build --release</span>
      <span className="text-[#0F6E56]">✓ signed · verified</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   FINAL CTA
   ───────────────────────────────────────────────────────────── */
const FinalCTA = () => (
  <section className="tv-section-tight border-t border-[#E5E4DF]" data-testid="final-cta">
    <div className="tv-container">
      <div className="grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <div className="mb-4"><Eyebrow>Start building</Eyebrow></div>
          <h2 className="tv-h2">
            Start on <span className="text-[#003262]">RISC-V</span>.
            Ship on <span className="text-[#003262]">TRUSTED-V</span>.
          </h2>
        </div>
        <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
          <PrimaryCTA to="/contact" data-testid="final-cta-primary">Talk to an engineer</PrimaryCTA>
          <SecondaryCTA to="/product-suite" data-testid="final-cta-secondary">Read the docs</SecondaryCTA>
        </div>
      </div>
    </div>
  </section>
);

export default Landing;
