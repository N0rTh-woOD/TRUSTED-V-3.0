import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { ComparisonModule, Eyebrow } from "@/components/ui-kit";
import { BLUE_STEPS } from "@/components/TrustedVLogo";
import { SERVICE_MODELS } from "@/data/services";

const ProductSuite = () => (
  <div className="bg-white text-[#0B0F14]">
    <PageHero
      crumbs={[{ label: "Products" }]}
      eyebrow="Product suite"
      title={<>Four modules.<br />One RISC-V platform.</>}
      subtitle="From IP integration to production silicon, with Rust-native software as the connective tissue."
    />
    <ModulesDetail />
    <AIEngines />
    <Comparison />
    <SubBrands />
    <ServicesBlock />
    <PricingCTA />
  </div>
);

/* Each module takes one step on the Bosch blue gradation */
const MODULE_COLORS = [BLUE_STEPS[3], BLUE_STEPS[4], BLUE_STEPS[5], "#00162B"];

const ModulesDetail = () => {
  const modules = [
    { num: "01", id: "development", title: "Development Platform", desc: "Jarvyn IDE, WebIDE, debugger, programmer and trace — one Rust-native environment for every target.",
      items: [{ name: "Jarvyn IDE", to: "/download-ide" }, { name: "WebIDE", to: "/webide" }, { name: "Code Engine", to: "/product/code-engine" }] },
    { num: "02", id: "virtualization", title: "Virtualization & Simulation", desc: "Virtual platforms, RISC-V hypervisor and cycle-approximate simulators. Ship firmware before RTL freezes.",
      items: [{ name: "Virtual Platform", to: "/product-suite#virtualization" }, { name: "RISC-V Hypervisor", to: "/product-suite#virtualization" }, { name: "Simulator", to: "/product-suite#virtualization" }] },
    { num: "03", id: "secure-software", title: "Secure Rust Software", desc: "rBoot, rustBoot, RTOS, HAL/PAC/HAM and Crypto Stack — memory-safe, PQC-ready, certification-friendly.",
      items: [{ name: "rBoot & rustBoot", to: "/product/secure-boot" }, { name: "Crypto Stack", to: "/product/crypto-stack" }, { name: "RTOS Benchmarks", to: "/product/rtos-benchmark" }] },
    { num: "04", id: "signoff", title: "Silicon SignOff & Trust", desc: "SignOff Silicon, TRUSTED-V Verified and TVOTS — vendor-neutral certification for RISC-V SoCs.",
      items: [{ name: "SignOff Silicon", to: "/product-suite#signoff" }, { name: "TRUSTED-V Verified", to: "/product-suite#certification" }, { name: "TVOTS", to: "/product-suite#signoff" }] },
  ];

  return (
    <section className="border-b border-[#E5E4DF]" data-testid="modules-detail">
      {modules.map((m, idx) => {
        const color = MODULE_COLORS[idx];
        return (
          <div key={m.num} id={m.id} className={`border-b border-[#E5E4DF] ${idx % 2 === 1 ? "bg-[#F7F7F5]" : "bg-white"}`}>
            <div className="tv-container py-16 md:py-20 lg:py-24">
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                  <span className="inline-flex items-center gap-2 font-mono text-[12px] tracking-widest text-white px-2.5 py-1 rounded-sm" style={{ background: color }} data-testid={`module-tag-${m.num}`}>
                    MODULE {m.num}
                  </span>
                  <h2 className="tv-h2 mt-4">{m.title}</h2>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[17px] leading-[1.6] text-[#3A3A3A]">{m.desc}</p>
                </div>
                <div className="lg:col-span-4">
                  <ul className="border-t" style={{ borderColor: color }}>
                    {m.items.map((it) => (
                      <li key={it.name}>
                        <Link to={it.to} className="group flex items-center justify-between py-4 border-b border-[#E5E4DF] hover:text-[#003262] transition-colors" data-testid={`module-${m.num}-${it.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                          <span className="flex items-center gap-3 text-[16px] font-medium">
                            <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: color }} />{it.name}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-[#5A6472] group-hover:text-[#003262] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

const AIEngines = () => {
  const engines = [
    { name: "Code Engine", note: "Structured AI assistance for RISC-V project planning", featured: true, to: "/product/code-engine" },
    { name: "Target context", note: "Bring board, RISC-V target and runtime requirements into the project conversation" },
    { name: "Security context", note: "Keep secure boot, cryptography and attestation requirements visible from the start" },
    { name: "Reviewable flow", note: "Move from a structured project plan into your engineering workflow" },
  ];
  return (
    <section className="tv-section border-b border-[#E5E4DF] bg-[#00162B] text-white" id="ai-engines" data-testid="ai-engines">
      <div className="tv-container">
        <div className="grid lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-6">
            <span className="tv-eyebrow" style={{ color: "#2486C7" }}><span style={{ color: "#2486C7" }}>AI Engines</span></span>
            <h2 className="tv-h2 mt-4">Bring engineering context.<br />Start with a better plan.</h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-[17px] leading-[1.6] text-white/70">Code Engine is the first AI Engine in TRUSTED-V, designed to guide project framing around the target system.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {engines.map((engine) => (
            engine.to ? (
              <Link key={engine.name} to={engine.to} className="tv-panel tv-panel-dark tv-panel-link tv-panel-accent relative overflow-hidden p-7 md:p-8" data-testid="ai-engine-code-engine">
                {engine.featured && <span className="inline-block mb-4 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#56A2D6] border border-[#2486C7]/50 px-2 py-0.5">Available now</span>}
                <h3 className="text-[20px] md:text-[24px] tracking-[-0.02em] text-white font-medium">{engine.name}</h3>
                <p className="mt-3 text-[14px] leading-[1.55] text-white/60">{engine.note}</p>
                <ArrowUpRight className="mt-6 w-4 h-4 text-[#56A2D6]" />
              </Link>
            ) : (
            <div key={engine.name} className="tv-panel tv-panel-dark p-7 md:p-8" data-testid={`ai-engine-${engine.name.toLowerCase().replace(/\W+/g, "-")}`}>
              <h3 className="text-[20px] md:text-[24px] tracking-[-0.02em] text-white font-medium">{engine.name}</h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-white/60">{engine.note}</p>
            </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

const Comparison = () => (
  <section className="tv-section border-b border-[#E5E4DF]" data-testid="platform-comparison">
    <div className="tv-container">
      <div className="mb-10 max-w-2xl">
        <Eyebrow>TRUSTED-V vs alternatives</Eyebrow>
        <h2 className="tv-h2 mt-4">What only an integrated platform delivers.</h2>
      </div>
      <ComparisonModule
        columns={["TRUSTED-V", "General toolchain", "Single-vendor stack"]}
        rows={[
          ["Rust-native, memory-safe firmware stack", true, "partial", false],
          ["SiFive-aligned RISC-V platform", true, false, false],
          ["Certifiable secure boot + PQC crypto", true, false, "partial"],
          ["Pre-silicon virtual platform & hypervisor", true, false, "partial"],
          ["Vendor-neutral silicon sign-off", true, false, false],
          ["Hardware-aware IDE + cloud WebIDE", true, "partial", false],
          ["Backed by Bosch · commercial LTS", true, false, "partial"],
        ]}
      />
    </div>
  </section>
);

const SubBrands = () => {
  const brands = [
    { name: "TRUSTED-V Verified", accent: BLUE_STEPS[3], desc: "Reference certification for RISC-V silicon and firmware. Vendor-neutral, evidence-driven." },
    { name: "SignOff Silicon", accent: BLUE_STEPS[4], desc: "Silicon assurance — from RTL review to post-tapeout attestation." },
    { name: "TRUSTED Certification", accent: BLUE_STEPS[5], desc: "Independent third-party programme for systems built on TRUSTED-V." },
  ];
  return (
    <section id="certification" className="tv-section border-b border-[#E5E4DF] bg-[#F7F7F5]" data-testid="sub-brands">
      <div className="tv-container">
        <div className="mb-14 max-w-3xl">
          <Eyebrow>A growing portfolio</Eyebrow>
          <h2 className="tv-h2 mt-4">More than a toolchain. A trust framework.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {brands.map((b) => (
            <div key={b.name} className="tv-panel relative overflow-hidden p-7 md:p-8 min-h-[200px]">
              <span className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: b.accent }} />
              <div className="pl-3">
                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">Programme</div>
                <h3 className="mt-3 text-[21px] md:text-[23px] font-semibold tracking-tight text-[#0B0F14]">{b.name}</h3>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-[#5A6472]">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesBlock = () => (
  <section className="tv-section-tight border-b border-[#E5E4DF]" data-testid="products-services">
    <div className="tv-container grid lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-4">
        <Eyebrow>Services</Eyebrow>
        <h2 className="tv-h3 mt-4">Two ways to build with us.</h2>
        <Link to="/services" className="tv-arrow-link mt-5" data-testid="products-services-link">Compare services</Link>
      </div>
      <div className="lg:col-span-8 grid md:grid-cols-2 gap-4">
        {SERVICE_MODELS.map((m) => (
          <Link key={m.id} to={`/services#${m.id}`} className="tv-panel tv-panel-link tv-panel-accent relative overflow-hidden group p-6 flex items-start justify-between gap-4" data-testid={`products-services-${m.id}`}>
            <div>
              <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">{m.code}</div>
              <div className="mt-2 text-[18px] font-semibold tracking-tight text-[#0B0F14]">{m.tagline}</div>
              <div className="mt-1.5 text-[13px] text-[#5A6472]">{m.steps.map((s) => s.title).join(" → ")}</div>
            </div>
            <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-[#5A6472] group-hover:text-[#003262] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const PricingCTA = () => (
  <section className="tv-section-tight" data-testid="pricing-cta">
    <div className="tv-container">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { tier: "Developer", price: "Free", desc: "Jarvyn IDE, WebIDE, community RTOS and Rust toolchain.", cta: "Download", to: "/download-ide" },
          { tier: "Pro", price: "Talk to sales", desc: "Commercial LTS, certified crypto stack, priority support.", cta: "Contact sales", to: "/contact?plan=pro" },
          { tier: "Enterprise", price: "Talk to sales", desc: "Silicon sign-off, custom certification, dedicated engineering.", cta: "Contact sales", to: "/contact?plan=enterprise" },
        ].map((p) => (
          <div key={p.tier} className="tv-panel p-7 md:p-8 min-h-[260px] flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">{p.tier}</div>
              <div className="mt-4 text-[26px] md:text-[30px] tracking-[-0.025em] text-[#0B0F14] font-semibold">{p.price}</div>
              <p className="mt-3 text-[14px] leading-[1.65] text-[#5A6472]">{p.desc}</p>
            </div>
            <Link to={p.to} className="tv-btn tv-btn-outline mt-8 w-fit" data-testid={`plan-${p.tier.toLowerCase()}`}>{p.cta} <ArrowRight className="w-4 h-4" /></Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductSuite;
