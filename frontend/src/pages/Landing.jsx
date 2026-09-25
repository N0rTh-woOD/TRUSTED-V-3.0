import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  Eyebrow, SectionHeader, TechnicalMetric, ProductCard, MarketCard,
  PrimaryCTA, SecondaryCTA, TVCard,
} from "@/components/ui-kit";
import TrustedVLogo from "@/components/TrustedVLogo";
import { SERVICE_MODELS } from "@/data/services";

const Landing = () => (
  <div className="bg-white text-[#0B0F14]">
    <Hero />
    <AIEnginesPreview />
    <RiscVIPCollaboration />
    <VirtualizationSpotlight />
    <PlatformArchitecture />
    <ApplicationMarkets />
    <CoreTechnologies />
    <ServicesTeaser />
    <ProductFamilies />
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
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5" data-testid="hero-brand-lockup">
            <div className="border-l-[3px] border-[#2486C7] pl-6 md:pl-8 py-4">
              <TrustedVLogo size="2xl" className="w-fit" />
              <div className="mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-[#5A6472]">The complete RISC-V platform</div>
              <div className="mt-3 max-w-sm text-[18px] md:text-[21px] leading-[1.35] text-[#003262] font-medium">From IP to software to silicon.</div>
            </div>
          </div>
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
          </div>
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

/* ───────────── AI ENGINES ───────────── */
const AIEnginesPreview = () => (
  <section className="tv-section border-t border-[#E5E4DF] bg-[#F7F7F5]" data-testid="ai-engines-preview">
    <div className="tv-container">
      <div className="grid lg:grid-cols-12 gap-10 items-end mb-10 md:mb-14">
        <div className="lg:col-span-7">
          <Eyebrow>AI Engines</Eyebrow>
          <h2 className="tv-h2 mt-4">A focused AI layer for <span className="text-[#003262]">RISC-V engineering</span>.</h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-[15px] leading-[1.65] text-[#5A6472]">Code Engine brings target, runtime and security context into a structured starting point for embedded projects.</p>
        </div>
      </div>
      <TVCard
        eyebrow="AI Engine 01"
        title="Code Engine"
        description="Start with the system context, shape a project plan, and take reviewable work into the TRUSTED-V development workflow."
        bullets={["RISC-V target and board context", "Runtime and security requirements", "Reviewable project planning"]}
        to="/product/code-engine"
        className="min-h-[230px]"
        data-testid="ai-engines-code-engine"
      />
    </div>
  </section>
);

/* ───────────── PLATFORM ARCHITECTURE ───────────── */
const PlatformArchitecture = () => {
  /* One blue gradation, application (lightest) → silicon (deepest). */
  const groups = [
    { band: "Application", accent: "#9DC8E8", tag: "L05", items: [
      { name: "Automotive", note: "ISO 26262 aligned" }, { name: "Industrial", note: "IEC 62443" },
      { name: "IoT & Consumer", note: "PSA L3" }, { name: "Robotics & Edge AI", note: "Real-time" } ] },
    { band: "AI Engines", accent: "#56A2D6", tag: "L04", items: [
      { name: "Jarvyn IDE", note: "Rust + RISC-V native" }, { name: "WebIDE", note: "Zero-install cloud" },
      { name: "Code Engine", note: "AI-assisted project planning" }, { name: "Debugger · Trace", note: "SVD register view" } ] },
    { band: "Rust Runtime & OS", accent: "#2486C7", tag: "L03", items: [
      { name: "TRUSTED-V RTOS", note: "Memory-safe" }, { name: "Embassy (async)", note: "Cooperative" },
      { name: "HAL · PAC · HAM", note: "Peripheral access" }, { name: "Linux (via CVA6)", note: "Rich OS" } ] },
    { band: "Virtualization", accent: "#004A7F", tag: "L02", items: [
      { name: "Type-1 Hypervisor", note: "Mixed-criticality" }, { name: "Virtual Platform", note: "Pre-silicon SoC" },
      { name: "Cycle-approx Simulator", note: "Bring-up" } ] },
    { band: "Secure Boot & Crypto", accent: "#003262", tag: "L01", items: [
      { name: "rBoot", note: "First stage" }, { name: "rustBoot", note: "A/B · OTA · PQC" },
      { name: "Crypto Stack", note: "Classical + PQC" }, { name: "Attestation", note: "TVOTS quote" } ] },
    { band: "RISC-V IP & Silicon", accent: "#00162B", tag: "L00", items: [
      { name: "SiFive", note: "Performance RISC-V IP" }, { name: "Reference SoC", note: "Boards & kits" },
      { name: "RISC-V integration", note: "IP to firmware" }, { name: "Silicon trust", note: "Attestation-ready" } ] },
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
            <div className="flex items-stretch gap-4">
              {/* axis */}
              <div className="hidden md:flex flex-col items-center justify-between w-[26px] flex-shrink-0 py-1">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#5A6472] whitespace-nowrap [writing-mode:vertical-rl] rotate-180">Software</span>
                <span className="flex-1 w-px bg-[#CFCEC8] my-3" />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#5A6472] whitespace-nowrap [writing-mode:vertical-rl] rotate-180">Silicon</span>
              </div>

              <div className="flex-1 flex flex-col gap-3">
                {groups.map((g, idx) => (
                  <div
                    key={g.band}
                    className="tv-panel relative overflow-hidden hover:border-[#2486C7] hover:shadow-[0_14px_32px_-24px_rgba(0,50,98,0.35)]"
                    data-testid={`arch-band-${idx}`}
                  >
                    <span className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: g.accent }} />
                    <div className="pl-6 pr-5 py-5">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">{g.tag}</span>
                          <h3 className="text-[16px] md:text-[17px] font-semibold tracking-tight text-[#0B0F14]">{g.band}</h3>
                        </div>
                        <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.16em] uppercase text-[#5A6472]">
                          {g.items.length} modules
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {g.items.map((it) => (
                          <div key={it.name} className="tv-panel tv-panel-muted px-3 py-2.5">
                            <div className="text-[12.5px] font-medium text-[#0B0F14] leading-tight">{it.name}</div>
                            <div className="mt-1 font-mono text-[9.5px] tracking-wide uppercase text-[#5A6472]">{it.note}</div>
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
            <div className="tv-panel mt-4 p-6">
              <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F] mb-4">Boot flow</div>
              <div className="space-y-2.5 font-mono text-[12px] text-[#0B0F14]">
                {["01 · ROM RoT boots", "02 · verifies rBoot", "03 · verifies rustBoot", "04 · verifies App", "05 · attestation quote"].map((s) => (
                  <div key={s} className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-[#2486C7] mt-2 flex-shrink-0" /><span>{s}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────── SIFIVE COLLABORATION ───────────── */
const RiscVIPCollaboration = () => {
  return (
    <section className="tv-section border-t border-[#E5E4DF]" data-testid="riscv-ip">
      <div className="tv-container">
        <SectionHeader
          eyebrow="RISC-V IP collaboration"
          title={<>Build with <span className="text-[#003262]">SiFive and TRUSTED-V</span>.</>}
          lede="Bring SiFive RISC-V IP together with the TRUSTED-V software, security and virtualization platform."
          action={<Link to="/partners" className="tv-arrow-link" data-testid="riscv-ip-platform">See platform alignment</Link>}
        />
        <TVCard
          eyebrow="SiFive RISC-V IP"
          title="A coherent path from IP to trusted software."
          description="TRUSTED-V aligns the development workflow around SiFive RISC-V IP, so the virtual platform, toolchain, secure boot and application work share one technical foundation."
          bullets={["RISC-V software and toolchain alignment", "Virtualization and pre-silicon workflow", "Secure boot, crypto and attestation context"]}
          to="/partners"
          className="min-h-[230px]"
          data-testid="riscv-ip-sifive"
        />
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
          <div className="relative tv-panel tv-panel-dark p-6 md:p-8">
            <div className="absolute inset-0 tv-grid-bg-dark opacity-40 rounded-md pointer-events-none" />
            <div className="relative space-y-2">
              {[
                { host: "Host: TRUSTED-V Hypervisor", tag: "TYPE-1" },
                { host: "VM 1 · TRUSTED-V RTOS", tag: "SAFETY" },
                { host: "VM 2 · Rust async runtime", tag: "REAL-TIME" },
                { host: "VM 3 · Linux user-space (CVA6)", tag: "GENERAL" },
                { host: "Virtual RISC-V SoC (RV64GC + RVV)", tag: "GUEST HW" },
              ].map((r, i) => (
                <div key={r.host} className={`tv-panel ${i === 0 ? "" : "tv-panel-dark"} flex items-center justify-between px-4 py-3`} style={i === 0 ? { background: "rgba(36,134,199,0.15)", borderColor: "rgba(36,134,199,0.5)" } : undefined}>
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

/* ───────────── CORE TECHNOLOGIES ───────────── */
const CoreTechnologies = () => {
  const items = [
    { eyebrow: "ISA", title: "RISC-V native", desc: "RV32, RV64 and RVV, aligned with SiFive RISC-V IP.", to: "/product-suite" },
    { eyebrow: "Security", title: "Security by construction", desc: "Rust memory safety, verified boot, classical + PQC crypto.", to: "/product/secure-boot" },
    { eyebrow: "Pre-silicon", title: "Virtualization", desc: "Hypervisor and virtual platforms for pre-silicon bring-up.", to: "/product-suite#virtualization" },
    { eyebrow: "Runtime", title: "Real-time software", desc: "TRUSTED-V RTOS, Embassy async runtimes and Rust HAL crates.", to: "/product/rtos-benchmark" },
    { eyebrow: "Crypto", title: "Cryptography", desc: "AES, SHA-3, ECDSA, ML-KEM, ML-DSA — NIST FIPS mapped.", to: "/product/crypto-stack" },
    { eyebrow: "Tooling", title: "Rust developer tooling", desc: "Jarvyn IDE, WebIDE, signed toolchain, SVD register views.", to: "/developer-portal" },
  ];
  return (
    <section className="tv-section border-t border-[#E5E4DF]" data-testid="core-technologies">
      <div className="tv-container">
        <SectionHeader eyebrow="Core technologies" title="What the platform is made of." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <TVCard
              key={it.title}
              eyebrow={it.eyebrow}
              title={it.title}
              description={it.desc}
              to={it.to}
              className="min-h-[196px]"
              data-testid={`core-tech-${it.title.toLowerCase().replace(/\W+/g, "-")}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────── SERVICES TEASER ───────────── */
const ServicesTeaser = () => (
  <section className="tv-section border-t border-[#E5E4DF] bg-[#F7F7F5]" data-testid="services-teaser">
    <div className="tv-container">
      <SectionHeader
        eyebrow="How you work with us"
        title={<>Hand us the blueprint — <span className="text-[#003262]">or bring your team</span>.</>}
        action={<Link to="/services" className="tv-arrow-link" data-testid="services-teaser-link">Compare services</Link>}
      />
      <div className="grid md:grid-cols-2 gap-4">
        {SERVICE_MODELS.map((m) => (
          <TVCard
            key={m.id}
            eyebrow={`${m.code} · ${m.label}`}
            title={m.tagline}
            description={m.hook}
            to={`/services#${m.id}`}
            data-testid={`services-teaser-${m.id}`}
            footer={
              <ol className="flex flex-wrap gap-x-5 gap-y-2">
                {m.steps.map((s, i) => (
                  <li key={s.title} className="flex items-center gap-2 text-[12.5px] text-[#1A1F25]">
                    <span className="font-mono text-[10px] text-[#2486C7]">{String(i + 1).padStart(2, "0")}</span>{s.title}
                  </li>
                ))}
              </ol>
            }
          />
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── PRODUCT FAMILIES ───────────── */
const ProductFamilies = () => {
  const items = [
    { eyebrow: "MODULE 01", title: "Development Platform", description: "Jarvyn IDE, WebIDE, Code Engine, debugger and trace in one Rust-native environment.", bullets: ["Jarvyn IDE", "WebIDE (cloud)", "Code Engine"], to: "/product/code-engine" },
    { eyebrow: "MODULE 02", title: "Virtualization & Simulation", description: "Virtual platforms and a RISC-V hypervisor for pre-silicon work.", bullets: ["Virtual platform", "RISC-V hypervisor", "Cycle-approximate simulator"], to: "/product-suite#virtualization" },
    { eyebrow: "MODULE 03", title: "Secure Rust Software", description: "rBoot, rustBoot, RTOS, HAL/PAC and Crypto Stack. PQC-ready.", bullets: ["rBoot & rustBoot", "Crypto Stack", "RTOS"], to: "/product/secure-boot" },
    { eyebrow: "MODULE 04", title: "Silicon SignOff & Trust", description: "Vendor-neutral certification for RISC-V SoCs.", bullets: ["SignOff Silicon", "TRUSTED-V Verified", "TVOTS"], to: "/product-suite#certification" },
  ];
  return (
    <section className="tv-section border-t border-[#E5E4DF]" data-testid="product-families">
      <div className="tv-container">
        <SectionHeader eyebrow="Product families" title="Four modules. One RISC-V platform." action={<Link to="/product-suite" className="tv-arrow-link">See the full suite</Link>} />
        <div className="grid md:grid-cols-2 gap-4">{items.map((p) => <ProductCard key={p.title} {...p} />)}</div>
      </div>
    </section>
  );
};

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{markets.map((m) => <MarketCard key={m.label} {...m} />)}</div>
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
          <SecondaryCTA to="/services" data-testid="final-cta-secondary">Services</SecondaryCTA>
        </div>
      </div>
    </div>
  </section>
);

export default Landing;
