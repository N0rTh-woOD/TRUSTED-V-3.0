import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const ProductSuite = () => {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="Product suite"
        title={
          <>
            Four modules.<br />One RISC-V platform.
          </>
        }
        subtitle="A modular, opinionated stack that spans the full path from IP integration to production silicon — with Rust-native software as the connective tissue."
      />

      <ModulesDetail />
      <IPIntegration />
      <SubBrands />
      <PricingCTA />
    </div>
  );
};

const ModulesDetail = () => {
  const modules = [
    {
      num: "01",
      id: "development",
      title: "Development Platform",
      desc: "The Rust-native RISC-V toolchain. Jarvyn IDE, WebIDE, debugger, programmer and trace — a single environment across every target.",
      items: [
        { name: "Jarvyn IDE", to: "/download-ide" },
        { name: "WebIDE", to: "/webide" },
        { name: "Debugger / Programmer / Trace", to: "/developer-portal" },
      ],
    },
    {
      num: "02",
      id: "virtualization",
      title: "Virtualization & Simulation",
      desc: "Virtual platforms, RISC-V hypervisor and cycle-approximate simulators. Ship firmware before RTL freezes.",
      items: [
        { name: "Virtual Platform", to: "/product-suite#virtualization" },
        { name: "RISC-V Hypervisor", to: "/product-suite#virtualization" },
        { name: "Simulator", to: "/product-suite#virtualization" },
      ],
    },
    {
      num: "03",
      id: "secure-software",
      title: "Secure Rust Software",
      desc: "Memory-safe firmware building blocks: rBoot, rustBoot, RTOS, HAL/PAC/HAM, Crypto Stack and SDKs — PQC-ready and certification-friendly.",
      items: [
        { name: "rBoot & rustBoot", to: "/product/secure-boot" },
        { name: "Crypto Stack", to: "/product/crypto-stack" },
        { name: "RTOS Benchmarks", to: "/product/rtos-benchmark" },
      ],
    },
    {
      num: "04",
      id: "signoff",
      title: "Silicon SignOff & Trust",
      desc: "SignOff Silicon, TRUSTED-V Verified and TVOTS — an independent, vendor-neutral certification programme for RISC-V SoCs.",
      items: [
        { name: "SignOff Silicon", to: "/product-suite#signoff" },
        { name: "TRUSTED-V Verified", to: "/product-suite#certification" },
        { name: "TVOTS", to: "/product-suite#signoff" },
      ],
    },
  ];

  return (
    <section className="border-b border-[#E7E5E0]" data-testid="modules-detail">
      {modules.map((m, idx) => (
        <div
          key={m.num}
          id={m.id}
          className={`border-b border-[#E7E5E0] ${idx % 2 === 1 ? "bg-[#FAFAF7]" : "bg-white"}`}
        >
          <div className="tv-container py-16 md:py-24 lg:py-28">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <span className="text-[13px] font-mono tracking-widest text-[#6B6B6B]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  / MODULE {m.num}
                </span>
                <h2
                  className="tv-h2"
                >
                  {m.title}
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p
                  className="text-[17px] md:text-[19px] leading-[1.6] text-[#3A3A3A] font-light"
                  style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}
                >
                  {m.desc}
                </p>
              </div>
              <div className="lg:col-span-4">
                <ul className="border-t border-[#0A0A0A]">
                  {m.items.map((it) => (
                    <li key={it.name}>
                      <Link
                        to={it.to}
                        className="group flex items-center justify-between py-4 border-b border-[#E7E5E0] hover:text-[#003262] transition-colors"
                        data-testid={`module-${m.num}-${it.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      >
                        <span className="text-[16px]" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>
                          {it.name}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#6B6B6B] group-hover:text-[#003262] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const IPIntegration = () => {
  const partners = [
    { name: "SiFive", note: "Performance RISC-V cores — P550, P870-A", featured: true },
    { name: "Akeana", note: "Automotive-grade RISC-V — 5100 series", featured: true },
    { name: "C-DAC", note: "VEGA processors — Indian sovereign silicon" },
    { name: "Mindgrove", note: "Secure IoT SoCs from IIT Madras" },
    { name: "Upbeat Tech", note: "Custom RISC-V accelerators" },
    { name: "OpenTitan", note: "Silicon root of trust · open source" },
  ];
  return (
    <section className="tv-section border-b border-[#E7E5E0] bg-[#00162B] text-white" id="ip" data-testid="ip-integration">
      <div className="tv-container">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-6">
            <span className="tv-eyebrow" style={{ color: "#FDB515" }}>
              <span className="text-[#FDB515]">RISC-V IP integration</span>
            </span>
            <h2
              className="tv-h2"
            >
              Bring your IP.<br />We&apos;ll bring the stack.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p
              className="text-[17px] leading-[1.6] text-white/70 font-light"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}
            >
              TRUSTED-V is IP-agnostic by design. Our reference stack is
              co-verified with leading RISC-V IP vendors, from performance cores
              to sovereign silicon programmes.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border-y border-white/10">
          {partners.map((p) => (
            <div key={p.name} className="bg-[#00162B] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                {p.featured && (
                  <span
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#FDB515] border border-[#FDB515]/40 px-2 py-0.5"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    Featured
                  </span>
                )}
              </div>
              <h3
                className="text-[20px] md:text-[24px] tracking-[-0.02em] text-white"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}
              >
                {p.name}
              </h3>
              <p
                className="mt-3 text-[14px] leading-[1.55] text-white/60 font-light"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}
              >
                {p.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SubBrands = () => {
  const brands = [
    { name: "TRUSTED-V Verified", accent: "#003262", desc: "The reference certification for RISC-V silicon and firmware. Vendor-neutral, evidence-driven." },
    { name: "SignOff Silicon", accent: "#0F6E56", desc: "Our silicon assurance service — from RTL review to post-tapeout attestation." },
    { name: "TRUSTED Certification", accent: "#B45309", desc: "Independent third-party programme for embedded systems built on TRUSTED-V." },
  ];
  return (
    <section id="certification" className="tv-section border-b border-[#E7E5E0]" data-testid="sub-brands">
      <div className="tv-container">
        <div className="mb-16 max-w-3xl">
          <span className="tv-eyebrow">A growing portfolio</span>
          <h2
            className="tv-h2"
          >
            More than a toolchain. A trust framework.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-[#E7E5E0] border-y border-[#E7E5E0]">
          {brands.map((b) => (
            <div key={b.name} className="bg-white p-8 md:p-10 min-h-[240px] border-t-[3px]" style={{ borderTopColor: b.accent }}>
              <h3 className="text-[22px] md:text-[26px] tracking-[-0.02em] text-[#0A0A0A]" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>
                {b.name}
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-[#4B4B4B] font-light" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCTA = () => (
  <section className="tv-section-tight" data-testid="pricing-cta">
    <div className="tv-container">
      <div className="grid md:grid-cols-3 gap-px bg-[#E7E5E0] border-y border-[#E7E5E0]">
        {[
          { tier: "Developer", price: "Free", desc: "Jarvyn IDE, WebIDE, community RTOS and Rust toolchain.", cta: "Download", to: "/download-ide" },
          { tier: "Pro", price: "Talk to sales", desc: "Commercial LTS, certified crypto stack, priority support.", cta: "Contact sales", to: "/contact?plan=pro" },
          { tier: "Enterprise", price: "Talk to sales", desc: "Silicon sign-off, custom certification, dedicated engineering.", cta: "Contact sales", to: "/contact?plan=enterprise" },
        ].map((p) => (
          <div key={p.tier} className="bg-white p-8 md:p-10 min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6B6B6B]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                {p.tier}
              </div>
              <div className="mt-4 text-[26px] md:text-[32px] tracking-[-0.025em] text-[#0A0A0A]" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>
                {p.price}
              </div>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-[#4B4B4B] font-light" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
                {p.desc}
              </p>
            </div>
            <Link to={p.to} className="tv-btn tv-btn-outline mt-8 w-fit" data-testid={`plan-${p.tier.toLowerCase()}`}>
              {p.cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductSuite;
