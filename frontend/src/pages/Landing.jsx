import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  Eyebrow, SectionHeader, TechnicalMetric,
  PrimaryCTA, SecondaryCTA, TVCard,
} from "@/components/ui-kit";
import { SERVICE_MODELS } from "@/data/services";
import { HomeHero } from "@/components/homepage/HomeHero";
import { RiscVIPCollaboration } from "@/components/homepage/FeatureSections";
import { ApplicationMarkets } from "@/components/homepage/ApplicationMarkets";
import { TechnologyCarousel } from "@/components/homepage/TechnologyCarousel";
import { ProductShowcase } from "@/components/homepage/ProductShowcase";
import "@/components/homepage/homepage.css";

const Landing = () => (
  <div className="home-refresh bg-white text-[#0B0F14]" data-testid="homepage">
    <HomeHero />
    <RiscVIPCollaboration />
    <VirtualizationSpotlight />
    <PlatformArchitecture />
    <ApplicationMarkets />
    <ProductShowcase />
    <TechnologyCarousel />
    <ServicesTeaser />
    <FinalCTA />
  </div>
);

/* ───────────── PLATFORM ARCHITECTURE ───────────── */
const PlatformArchitecture = () => {
  /* One blue gradation, application (lightest) → silicon (deepest). */
  const groups = [
    { band: "Application", accent: "#9DC8E8", tag: "L05", items: [
      { name: "Automotive", note: "ISO 26262 aligned" }, { name: "Industrial", note: "IEC 62443" },
      { name: "IoT & Consumer", note: "PSA L3" }, { name: "Robotics & Edge AI", note: "Real-time" } ] },
    { band: "Development Toolchain", accent: "#56A2D6", tag: "L04", items: [
      { name: "Jarvyn IDE", note: "Rust + RISC-V native" }, { name: "WebIDE", note: "Zero-install cloud" },
      { name: "Debugger · Trace", note: "SVD register view" }, { name: "Toolchain integration", note: "Build and flash workflow" } ] },
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
