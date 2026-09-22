import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  Eyebrow, SectionHeader, TechnicalMetric, ProductCard, MarketCard, PartnerGrid,
  PrimaryCTA, SecondaryCTA, GradientCard,
} from "@/components/ui-kit";
import StackVisual from "@/components/StackVisual";
import { ENGAGEMENT_MODELS } from "@/data/engagement";

const Landing = () => (
  <div className="bg-white text-[#0B0F14]">
    <Hero />
    <PlatformIntro />
    <RiscVIPCollaboration />
    <VirtualizationSpotlight />
    <PlatformArchitecture />
    <CoreTechnologies />
    <EngagementTeaser />
    <ProductFamilies />
    <Ecosystem />
    <ApplicationMarkets />
    <DeveloperExperience />
    <FinalCTA />
  </div>
);

/* ───────────── HERO ───────────── */
const Hero = () => {
  const proof = [
    { k: "RISC-V native", v: "RV32 · RV64 · Vector" },
    { k: "Language", v: "Rust-first, memory safe" },
    { k: "Security", v: "PQC-ready root of trust" },
    { k: "Deployment", v: "IP → SoC → firmware → apps" },
  ];
  return (
    <section className="relative bg-white overflow-hidden" data-testid="landing-hero">
      <div className="absolute inset-0 tv-grid-bg opacity-60 pointer-events-none" />
      <div className="absolute top-24 right-[-160px] w-[520px] h-[520px] rounded-full bg-[#2486C7]/10 blur-3xl pointer-events-none" />

      <div className="tv-container relative pt-14 md:pt-20 lg:pt-24 pb-14 md:pb-20 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 tv-fade-up">
            <div className="mb-5"><Eyebrow>RISC-V compute platform</Eyebrow></div>
            <h1 className="tv-h1" style={{ fontSize: "clamp(38px, 5vw, 64px)" }} data-testid="landing-hero-title">
              Secure <span className="text-[#003262]">RISC-V</span>,
              <br />silicon to software.
            </h1>
            <p className="tv-lede mt-6" data-testid="landing-hero-subtitle">
              A Rust-native platform that unifies RISC-V IP, virtualization, secure boot,
              cryptography and real-time software.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryCTA to="/product-suite" size="lg" data-testid="hero-cta-primary">Explore the platform</PrimaryCTA>
              <SecondaryCTA to="/contact" size="lg" data-testid="hero-cta-secondary">Talk to our engineers</SecondaryCTA>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#5A6472]">Co-verified with</span>
              {["SiFive", "Akeana", "C-DAC", "Mindgrove"].map((p) => (
                <span key={p} className="text-[13.5px] font-semibold text-[#0B0F14]/80">{p}</span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5"><StackVisual /></div>
        </div>

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

/* ───────────── PLATFORM INTRO ───────────── */
const PlatformIntro = () => (
  <section className="tv-section-tight border-t border-[#E5E4DF] bg-[#F7F7F5]" data-testid="platform-intro">
    <div className="tv-container">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3"><Eyebrow>What TRUSTED-V provides</Eyebrow></div>
        <div className="lg:col-span-9">
          <p className="text-[22px] md:text-[28px] leading-[1.3] text-[#0B0F14]" style={{ letterSpacing: "-0.01em" }}>
            One open, modular platform for mission-critical RISC-V —
            <span className="text-[#5A6472]"> IP, virtualization, secure boot, crypto, RTOS and tooling. </span>
            Engineered by Bosch. Built in India.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────── PLATFORM ARCHITECTURE ───────────── */
const PlatformArchitecture = () => {
  const groups = [
    { band: "Application", color: "#2486C7", tag: "L05", items: [
      { name: "Automotive", note: "ISO 26262 aligned" }, { name: "Industrial", note: "IEC 62443" },
      { name: "IoT & Consumer", note: "PSA L3" }, { name: "Robotics & Edge AI", note: "Real-time" } ] },
    { band: "Developer Toolchain", color: "#56A2D6", tag: "L04", items: [
      { name: "Jarvyn IDE", note: "Rust + RISC-V native" }, { name: "WebIDE", note: "Zero-install cloud" },
      { name: "SDK · cargo · LLVM", note: "Signed toolchain" }, { name: "Debugger · Trace", note: "SVD register view" } ] },
    { band: "Rust Runtime & OS", color: "#0F6E56", tag: "L03", items: [
      { name: "TRUSTED-V RTOS", note: "Memory-safe" }, { name: "Zephyr · FreeRTOS", note: "Ecosystem" },
      { name: "Embassy (async)", note: "Cooperative" }, { name: "HAL · PAC · HAM", note: "Peripheral access" } ] },
    { band: "Virtualization", color: "#004A7F", tag: "L02", items: [
      { name: "Type-1 Hypervisor", note: "Mixed-criticality" }, { name: "Virtual Platform", note: "Pre-silicon SoC" },
      { name: "Cycle-approx Simulator", note: "Bring-up" } ] },
    { band: "Secure Boot & Crypto", color: "#003262", tag: "L01", items: [
      { name: "rBoot", note: "First stage" }, { name: "rustBoot", note: "A/B · OTA · PQC" },
      { name: "Crypto Stack", note: "Classical + PQC" }, { name: "Attestation", note: "TVOTS quote" } ] },
    { band: "RISC-V IP & Silicon", color: "#00162B", tag: "L00", items: [
      { name: "SiFive", note: "Performance IP" }, { name: "Akeana", note: "Automotive-grade IP" },
      { name: "C-DAC · Mindgrove", note: "Indian silicon" }, { name: "Reference SoC", note: "Boards & kits" } ] },
  ];

  return (
    <section className="tv-section border-t border-[#E5E4DF] bg-[#F7F7F5]" data-testid="platform-architecture">
      <div className="tv-container">
        <SectionHeader
          eyebrow="Platform architecture"
          title={<>Six layers. <span className="text-[#003262]">One coherent stack</span>.</>}
          lede="Every layer interoperates — swap the IP, keep the toolchain; add an RTOS, keep the boot chain."
          action={<Link to="/product-suite" className="tv-arrow-link" data-testid="architecture-explore">Explore the suite</Link>}
        />
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="relative">
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[52px] pointer-events-none">
                <div className="absolute inset-x-0 top-4 bottom-4 border-l border-[#CFCEC8]" />
                <div className="absolute left-1/2 -translate-x-1/2 top-4 -rotate-90 origin-left translate-y-8 font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#5A6472] whitespace-nowrap">Software ↑</div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 -rotate-90 origin-left -translate-y-8 font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#5A6472] whitespace-nowrap">Silicon ↓</div>
              </div>
              <div className="md:pl-[52px] flex flex-col gap-2.5">
                {groups.map((g, idx) => (
                  <div key={g.band} className="group relative bg-white border border-[#E5E4DF] rounded-md overflow-hidden hover:border-[#003262] transition-colors" data-testid={`arch-band-${idx}`}>
                    <div className="absolute top-0 left-0 bottom-0 w-1" style={{ background: g.color }} />
                    <div className="pl-5 pr-4 py-4 md:py-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#5A6472]">{g.tag}</span>
                          <h3 className="text-[15px] md:text-[17px] font-semibold text-[#0B0F14]">{g.band}</h3>
                        </div>
                        <span className="hidden sm:inline-flex font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-sm" style={{ color: g.color, border: `1px solid ${g.color}30`, background: `${g.color}0d` }}>
                          {g.items.length} components
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {g.items.map((it) => (
                          <div key={it.name} className="border border-[#EDEBE5] rounded-sm px-3 py-2 bg-[#FAFAF7]">
                            <div className="text-[12.5px] font-medium text-[#0B0F14] leading-tight">{it.name}</div>
                            <div className="mt-0.5 font-mono text-[10px] text-[#5A6472]">{it.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <TechnicalMetric rows={[
              ["ISA", "RV32 · RV64 · Vector (RVV)"],
              ["Language", "Rust — no_std, embedded HAL"],
              ["Boot chain", "rBoot → rustBoot → App"],
              ["Attestation", "Silicon RoT + firmware"],
              ["Virtualization", "Type-1 hypervisor"],
              ["OS Support", "RTOS + Linux (via CVA6)"],
              ["Crypto", "Classical + Post-Quantum"],
            ]} />
            <div className="mt-6 border border-[#E5E4DF] rounded-md p-5 bg-white">
              <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#5A6472] mb-3">Boot flow</div>
              <div className="space-y-2 font-mono text-[12px] text-[#0B0F14]">
                {["01 · ROM RoT boots", "02 · verifies rBoot", "03 · verifies rustBoot", "04 · verifies App", "05 · attestation quote"].map((s) => (
                  <div key={s} className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#003262] mt-2 flex-shrink-0" /><span>{s}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────── RISC-V IP & COLLABORATIONS ───────────── */
const RiscVIPCollaboration = () => {
  const partners = [
    { name: "SiFive", role: "Performance RISC-V IP", note: "P550 · P870-A · U-series", focus: "Application-class cores co-verified with the TRUSTED-V boot chain, RTOS and Rust toolchain." },
    { name: "Akeana", role: "Automotive-grade RISC-V", note: "5100 series · ISO 26262 aligned", focus: "Safety-oriented IP pre-integrated with secure boot, attestation and Rust firmware." },
  ];
  return (
    <section className="tv-section border-t border-[#E5E4DF]" data-testid="riscv-ip">
      <div className="tv-container">
        <SectionHeader
          eyebrow="RISC-V IP & collaborations"
          title={<>Co-verified with leaders of the <span className="text-[#003262]">open RISC-V ecosystem</span>.</>}
          lede="IP-agnostic by design — pre-integrated with performance-class and automotive-grade RISC-V IP."
          action={<Link to="/partners" className="tv-arrow-link" data-testid="riscv-ip-partners">See all partners</Link>}
        />
        <div className="grid md:grid-cols-2 gap-6">
          {partners.map((p) => (
            <div key={p.name} className="border border-[#E5E4DF] rounded-md p-8 bg-white hover:border-[#003262] transition-colors flex flex-col" data-testid={`riscv-ip-${p.name.toLowerCase()}`}>
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#5A6472] mb-4">{p.role}</div>
              <h3 className="tv-h3" style={{ fontSize: "26px" }}>{p.name}</h3>
              <div className="mt-2 font-mono text-[12px] text-[#003262]">{p.note}</div>
              <p className="mt-5 text-[14px] leading-[1.65] text-[#5A6472] flex-1">{p.focus}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-[#E5E4DF] pt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#5A6472]">Also supported</span>
          {["C-DAC · VEGA / DHRUV", "Mindgrove", "Upbeat Tech", "CVA6", "Ibex", "OpenTitan"].map((n) => (
            <span key={n} className="text-[13.5px] font-medium text-[#0B0F14]">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────── VIRTUALIZATION ───────────── */
const VirtualizationSpotlight = () => (
  <section className="tv-section border-t border-[#E5E4DF] bg-[#00162B] text-white" data-testid="virtualization-spotlight">
    <div className="tv-container">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="mb-4"><span className="tv-eyebrow" style={{ color: "#2486C7" }}><span style={{ color: "#2486C7" }}>Virtualization & simulation</span></span></div>
          <h2 className="tv-h2 text-white">Ship firmware before <span className="text-[#56A2D6]">RTL freezes</span>.</h2>
          <p className="text-[16px] leading-[1.65] text-white/70 mt-6 max-w-xl">
            Boot the whole stack on a virtual SoC — long before silicon, FPGA or final RTL.
          </p>
          <ul className="mt-8 space-y-3">
            {["Virtual RISC-V SoC, configurable cores and peripherals", "Type-1 hypervisor for mixed-criticality", "Cycle-approximate simulator for bring-up", "Secure-boot and attestation testing in software"].map((f) => (
              <li key={f} className="flex items-start gap-3 text-[14.5px] text-white/85"><span className="w-1 h-1 rounded-full bg-[#2486C7] mt-2 flex-shrink-0" />{f}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/product-suite#virtualization" className="tv-btn tv-btn-onDark" data-testid="virt-cta-primary">Explore virtualization <ArrowUpRight className="w-4 h-4" /></Link>
            <Link to="/contact" className="tv-btn tv-btn-outline-onDark" data-testid="virt-cta-secondary">Book a technical deep-dive</Link>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="relative border border-white/15 rounded-md bg-white/[0.02] p-6 md:p-8">
            <div className="absolute inset-0 tv-grid-bg-dark opacity-40 rounded-md pointer-events-none" />
            <div className="relative space-y-2">
              {[
                { host: "Host: TRUSTED-V Hypervisor", tag: "TYPE-1" },
                { host: "VM 1 · Zephyr RTOS", tag: "SAFETY" },
                { host: "VM 2 · Rust async runtime", tag: "REAL-TIME" },
                { host: "VM 3 · Linux user-space (CVA6)", tag: "GENERAL" },
                { host: "Virtual RISC-V SoC (RV64GC + RVV)", tag: "GUEST HW" },
              ].map((r, i) => (
                <div key={r.host} className={`flex items-center justify-between border rounded-md px-4 py-3 ${i === 0 ? "bg-[#2486C7]/15 border-[#2486C7]/50" : "bg-white/[0.03] border-white/15"}`}>
                  <div>
                    <div className="font-mono text-[10.5px] tracking-widest uppercase text-white/50">Layer {String(i + 1).padStart(2, "0")}</div>
                    <div className="mt-1 text-[13.5px] font-medium text-white">{r.host}</div>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#56A2D6] border border-[#2486C7]/50 px-2 py-1 rounded-sm">{r.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────── CORE TECHNOLOGIES — Bosch blue gradation ───────────── */
const CoreTechnologies = () => {
  const items = [
    { title: "RISC-V native", desc: "RV32, RV64 and RVV. SiFive, Akeana and Indian silicon.", to: "/product-suite" },
    { title: "Security by construction", desc: "Rust memory safety, verified boot, classical + PQC crypto.", to: "/product/secure-boot" },
    { title: "Virtualization", desc: "Hypervisor and virtual platforms for pre-silicon bring-up.", to: "/product-suite#virtualization" },
    { title: "Real-time software", desc: "TRUSTED-V RTOS, Zephyr, FreeRTOS and Rust async runtimes.", to: "/product/rtos-benchmark" },
    { title: "Cryptography", desc: "AES, SHA-3, ECDSA, ML-KEM, ML-DSA — NIST FIPS mapped.", to: "/product/crypto-stack" },
    { title: "Rust developer tooling", desc: "Jarvyn IDE, WebIDE, signed toolchain, SVD register views.", to: "/developer-portal" },
  ];
  return (
    <section className="tv-section border-t border-[#E5E4DF]" data-testid="core-technologies">
      <div className="tv-container">
        <SectionHeader eyebrow="Core technologies" title="What the platform is made of." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => <GradientCard key={it.title} step={i} index={i} title={it.title} description={it.desc} to={it.to} />)}
        </div>
      </div>
    </section>
  );
};

/* ───────────── ENGAGEMENT TEASER ───────────── */
const EngagementTeaser = () => (
  <section className="tv-section border-t border-[#E5E4DF] bg-[#F7F7F5]" data-testid="engagement-teaser">
    <div className="tv-container">
      <SectionHeader
        eyebrow="How you work with us"
        title={<>Hand us the blueprint — <span className="text-[#003262]">or bring your team</span>.</>}
        action={<Link to="/engagement-models" className="tv-arrow-link" data-testid="engagement-teaser-link">Compare engagement models</Link>}
      />
      <div className="grid md:grid-cols-2 gap-4">
        {ENGAGEMENT_MODELS.map((m, idx) => {
          const dark = idx === 0;
          return (
            <Link
              key={m.id}
              to={`/engagement-models#${m.id}`}
              className={`group rounded-md p-8 flex flex-col transition-transform duration-200 hover:-translate-y-1 ${dark ? "bg-[#003262] text-white" : "bg-white border border-[#E5E4DF]"}`}
              data-testid={`engagement-teaser-${m.id}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[11px] tracking-[0.16em] uppercase ${dark ? "text-[#56A2D6]" : "text-[#004A7F]"}`}>{m.code} · {m.label}</span>
                <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${dark ? "text-white" : "text-[#003262]"}`} />
              </div>
              <h3 className={`mt-5 text-[24px] md:text-[28px] font-semibold tracking-tight ${dark ? "text-white" : "text-[#0B0F14]"}`}>{m.tagline}</h3>
              <p className={`mt-3 text-[14.5px] leading-[1.6] ${dark ? "text-white/70" : "text-[#5A6472]"}`}>{m.hook}</p>
              <ol className={`mt-7 pt-6 border-t flex flex-wrap gap-x-5 gap-y-2 ${dark ? "border-white/15" : "border-[#E5E4DF]"}`}>
                {m.steps.map((s, i) => (
                  <li key={s.title} className={`flex items-center gap-2 text-[12.5px] ${dark ? "text-white/85" : "text-[#1A1F25]"}`}>
                    <span className={`font-mono text-[10px] ${dark ? "text-[#56A2D6]" : "text-[#2486C7]"}`}>{String(i + 1).padStart(2, "0")}</span>{s.title}
                  </li>
                ))}
              </ol>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

/* ───────────── PRODUCT FAMILIES ───────────── */
const ProductFamilies = () => {
  const items = [
    { eyebrow: "MODULE 01", title: "Development Platform", description: "Jarvyn IDE, WebIDE, debugger and trace — one Rust-native environment.", bullets: ["Jarvyn IDE", "WebIDE (cloud)", "Debugger & programmer"], to: "/download-ide" },
    { eyebrow: "MODULE 02", title: "Virtualization & Simulation", description: "Virtual platforms and a RISC-V hypervisor for pre-silicon work.", bullets: ["Virtual platform", "RISC-V hypervisor", "Cycle-approximate simulator"], to: "/product-suite#virtualization" },
    { eyebrow: "MODULE 03", title: "Secure Rust Software", description: "rBoot, rustBoot, RTOS, HAL/PAC and Crypto Stack. PQC-ready.", bullets: ["rBoot & rustBoot", "Crypto Stack", "RTOS"], to: "/product/secure-boot" },
    { eyebrow: "MODULE 04", title: "Silicon SignOff & Trust", description: "Vendor-neutral certification for RISC-V SoCs.", bullets: ["SignOff Silicon", "TRUSTED-V Verified", "TVOTS"], to: "/product-suite#certification" },
  ];
  return (
    <section className="tv-section border-t border-[#E5E4DF]" data-testid="product-families">
      <div className="tv-container">
        <SectionHeader eyebrow="Product families" title="Four modules. One RISC-V platform." action={<Link to="/product-suite" className="tv-arrow-link">See the full suite</Link>} />
        <div className="grid md:grid-cols-2 gap-6">{items.map((p) => <ProductCard key={p.title} {...p} />)}</div>
      </div>
    </section>
  );
};

/* ───────────── ECOSYSTEM ───────────── */
const Ecosystem = () => (
  <section className="tv-section border-t border-[#E5E4DF] bg-[#F7F7F5]" data-testid="ecosystem">
    <div className="tv-container">
      <SectionHeader eyebrow="A growing partner network" title="Silicon, software and academic partners." action={<Link to="/partners" className="tv-arrow-link" data-testid="ecosystem-explore">Meet the partners</Link>} />
      <PartnerGrid partners={[
        { name: "SiFive", note: "Performance RISC-V IP" }, { name: "Akeana", note: "Automotive RISC-V" },
        { name: "C-DAC", note: "VEGA sovereign silicon" }, { name: "Mindgrove", note: "Secure IoT SoCs" },
        { name: "Upbeat Tech", note: "Edge-AI SoCs" }, { name: "OpenTitan", note: "Silicon root of trust" },
      ]} />
    </div>
  </section>
);

/* ───────────── APPLICATION MARKETS ───────────── */
const ApplicationMarkets = () => {
  const markets = [
    { label: "AUTOMOTIVE", headline: "Software-defined vehicles.", capabilities: ["Deterministic processing", "Secure execution", "ISO 26262 alignment"] },
    { label: "INDUSTRIAL", headline: "Factories and grids.", capabilities: ["Real-time RTOS", "IEC 62443 alignment", "Rugged deployment"] },
    { label: "IOT & CONSUMER", headline: "Connected devices.", capabilities: ["PSA L3-aligned", "PQC-ready", "Low-power RISC-V"] },
    { label: "ROBOTICS", headline: "Autonomous systems.", capabilities: ["Rust async runtime", "Hypervisor isolation", "Vision-capable RVV"] },
    { label: "DEFENCE & AEROSPACE", headline: "Sovereign missions.", capabilities: ["Vendor-neutral certification", "Attestation", "Hardware-anchored trust"] },
    { label: "EDGE AI", headline: "Physical AI on RISC-V.", capabilities: ["Virtual platforms", "RVV vector compute", "Deterministic scheduling"] },
  ];
  return (
    <section className="tv-section border-t border-[#E5E4DF]" data-testid="application-markets">
      <div className="tv-container">
        <SectionHeader eyebrow="Application markets" title="Where TRUSTED-V ships." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{markets.map((m) => <MarketCard key={m.label} {...m} />)}</div>
      </div>
    </section>
  );
};

/* ───────────── DEVELOPER EXPERIENCE ───────────── */
const DeveloperExperience = () => (
  <section className="tv-section border-t border-[#E5E4DF] bg-[#F7F7F5]" data-testid="developer-experience">
    <div className="tv-container">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <div className="mb-4"><Eyebrow>Developer experience</Eyebrow></div>
          <h2 className="tv-h2">Rust-native. RISC-V-first. Cargo everywhere.</h2>
          <p className="tv-lede mt-6">One environment for firmware and silicon engineers — SVD register view, signed toolchain, pre-integrated HAL/PAC crates.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/download-ide" className="tv-btn tv-btn-primary" data-testid="dev-cta-ide">Download Jarvyn <ArrowUpRight className="w-4 h-4" /></Link>
            <Link to="/webide" className="tv-btn tv-btn-outline" data-testid="dev-cta-webide">Try WebIDE <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
        <div className="lg:col-span-6"><CodeWindow /></div>
      </div>
    </div>
  </section>
);

const CodeWindow = () => (
  <div className="border border-[#E5E4DF] rounded-md bg-[#0B0F14] text-white overflow-hidden">
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/25" /><span className="w-2 h-2 rounded-full bg-white/25" /><span className="w-2 h-2 rounded-full bg-white/25" /></div>
      <span className="text-[11px] font-mono text-white/60">main.rs</span>
      <span className="text-[10px] font-mono text-[#56A2D6] tracking-widest">RV64GC</span>
    </div>
    <pre className="p-5 text-[12.5px] leading-[1.75] font-mono"><code>
      <span className="text-white/40">// TRUSTED-V — secure boot + attestation</span>{"\n"}
      <span className="text-[#56A2D6]">use</span> <span className="text-white">trusted_v::rboot::verify_chain;</span>{"\n"}
      <span className="text-[#56A2D6]">use</span> <span className="text-white">trusted_v::crypto::attest;</span>{"\n"}
      <span className="text-[#56A2D6]">use</span> <span className="text-white">trusted_v::rtos::launch;</span>{"\n\n"}
      <span className="text-[#9DC8E8]">#[no_std]</span>{"\n"}
      <span className="text-[#9DC8E8]">#[no_main]</span>{"\n"}
      <span className="text-[#56A2D6]">fn</span> <span className="text-white">main</span>() {"{"}{"\n"}
      {"    "}<span className="text-white/60">let</span> chain = verify_chain(<span className="text-[#0F6E56]">&BOOT_KEY</span>);{"\n"}
      {"    "}<span className="text-white/60">let</span> quote = attest(chain);{"\n"}
      {"    "}launch(<span className="text-[#0F6E56]">&quot;rt_secure&quot;</span>, quote);{"\n"}
      {"}"}
    </code></pre>
    <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 font-mono text-[11px]">
      <span className="text-white/50">$ cargo build --release</span>
      <span className="text-[#0F6E56]">✓ signed · verified</span>
    </div>
  </div>
);

/* ───────────── FINAL CTA ───────────── */
const FinalCTA = () => (
  <section className="tv-section-tight border-t border-[#E5E4DF]" data-testid="final-cta">
    <div className="tv-container">
      <div className="grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <div className="mb-4"><Eyebrow>Start building</Eyebrow></div>
          <h2 className="tv-h2">Start on <span className="text-[#003262]">RISC-V</span>. Ship on <span className="text-[#003262]">TRUSTED-V</span>.</h2>
        </div>
        <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
          <PrimaryCTA to="/contact" data-testid="final-cta-primary">Start a project</PrimaryCTA>
          <SecondaryCTA to="/engagement-models" data-testid="final-cta-secondary">Engagement models</SecondaryCTA>
        </div>
      </div>
    </div>
  </section>
);

export default Landing;
