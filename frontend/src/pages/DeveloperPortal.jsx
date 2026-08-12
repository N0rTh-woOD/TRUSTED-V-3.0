import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import PageHero from "@/components/PageHero";

const sections = [
  {
    title: "Getting started",
    items: [
      { name: "Installing Jarvyn", desc: "Step-by-step guide for macOS, Linux and Windows." },
      { name: "Your first RISC-V project", desc: "From `cargo new` to blinking an LED on a certified board." },
      { name: "WebIDE quickstart", desc: "Zero-install cloud path — code, build, simulate." },
    ],
  },
  {
    title: "Rust toolchain",
    items: [
      { name: "Cross-compiling to RISC-V", desc: "`riscv32imac-unknown-none-elf`, `riscv64gc-unknown-none-elf` and more." },
      { name: "`no_std` embedded patterns", desc: "Panic handlers, memory maps, singleton peripherals." },
      { name: "HAL & PAC layers", desc: "Hardware access at the right level of abstraction." },
    ],
  },
  {
    title: "Security",
    items: [
      { name: "rBoot & rustBoot", desc: "Certifiable boot chains, signed with your keys." },
      { name: "Crypto Stack", desc: "AES-GCM, SHA-3, ML-KEM, ML-DSA, PQC-ready building blocks." },
      { name: "Attestation & TVOTS", desc: "Prove your silicon is what it claims to be." },
    ],
  },
  {
    title: "RTOS & runtime",
    items: [
      { name: "Zephyr integration", desc: "First-class Zephyr project templates and drivers." },
      { name: "FreeRTOS on RISC-V", desc: "Deterministic scheduling and inter-task communication." },
      { name: "Tock & RIOT", desc: "Memory-safe RTOS choices for security-critical firmware." },
    ],
  },
  {
    title: "Virtualization",
    items: [
      { name: "Virtual platforms", desc: "Model your SoC before RTL freezes." },
      { name: "RISC-V hypervisor", desc: "Type-1 hypervisor for mixed-criticality systems." },
      { name: "Simulator API", desc: "Boot firmware in-process — no board required." },
    ],
  },
  {
    title: "Certification",
    items: [
      { name: "Turnaround & evidence", desc: "Prepare your evidence bundle inside Jarvyn." },
      { name: "TRUSTED-V Verified", desc: "Vendor-neutral silicon certification programme." },
      { name: "Compliance mapping", desc: "CC, PSA, ISO 26262, IEC 62443 auto-mapped." },
    ],
  },
];

const DeveloperPortal = () => {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="Developer portal"
        title={
          <>
            Docs, SDKs and<br />reference builds.
          </>
        }
        subtitle="Everything you need to ship on TRUSTED-V — from your first `cargo build` to a certified silicon tape-out."
      >
        <QuickStart />
      </PageHero>

      <section className="tv-section border-b border-[#E7E5E0]" data-testid="dev-sections">
        <div className="tv-container">
          <div className="border-t border-[#0A0A0A]">
            {sections.map((s) => <Section key={s.title} section={s} />)}
          </div>
        </div>
      </section>

      <section className="tv-section-tight" data-testid="dev-cta">
        <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="tv-display text-[28px] md:text-[38px] text-[#0A0A0A] leading-[0.98] max-w-2xl" style={{ letterSpacing: "-0.03em" }}>
            Ready to write your first line of TRUSTED-V?
          </h2>
          <div className="flex gap-3">
            <Link to="/download-ide" className="tv-btn tv-btn-primary" data-testid="dev-cta-ide">
              Download Jarvyn <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/webide" className="tv-btn tv-btn-outline" data-testid="dev-cta-webide">
              Open WebIDE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const Section = ({ section }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E7E5E0]" data-testid={`dev-section-${section.title.toLowerCase().replace(/\s+/g, "-")}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-8 md:py-10 group"
      >
        <h3
          className="text-[22px] md:text-[28px] tracking-[-0.015em] text-[#0A0A0A] group-hover:text-[#003262] transition-colors text-left"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
        >
          {section.title}
        </h3>
        <ChevronDown className={`w-6 h-6 text-[#6B6B6B] transition-transform ${open ? "rotate-180 text-[#003262]" : ""}`} />
      </button>
      {open && (
        <div className="pb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.items.map((it) => (
            <div key={it.name} className="border border-[#E7E5E0] p-6 hover:border-[#0A0A0A] transition-colors">
              <h4 className="text-[16px] tracking-[-0.01em] text-[#0A0A0A]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                {it.name}
              </h4>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[#4B4B4B] font-light" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const QuickStart = () => (
  <div className="border border-[#E7E5E0] bg-[#0A0A0A] text-white overflow-hidden" style={{ borderRadius: 4 }}>
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
      <span className="text-[11px] text-white/60 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        quick-start.sh
      </span>
      <span className="text-[10px] text-[#0F6E56] font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>ready</span>
    </div>
    <pre className="p-5 text-[12.5px] leading-[1.9]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <span className="text-white/40"># Install</span>{"\n"}
      <span className="text-[#00B4E0]">$</span> curl -fsSL trusted-v.com/install | sh{"\n"}
      {"\n"}
      <span className="text-white/40"># Create a project</span>{"\n"}
      <span className="text-[#00B4E0]">$</span> jarvyn new blink --board=vega-et1031{"\n"}
      {"\n"}
      <span className="text-white/40"># Build & flash</span>{"\n"}
      <span className="text-[#00B4E0]">$</span> cd blink && jarvyn flash{"\n"}
      <span className="text-[#0F6E56]">→ verified boot ✓  signed  ✓  flashed to /dev/ttyUSB0</span>
    </pre>
  </div>
);

export default DeveloperPortal;
