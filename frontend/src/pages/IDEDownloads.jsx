import { Link } from "react-router-dom";
import { ArrowUpRight, Check, X } from "lucide-react";
import { Eyebrow, Breadcrumbs } from "@/components/ui-kit";
import { BLUE_STEPS } from "@/components/TrustedVLogo";

const JARVYN_GIF = "https://customer-assets-m6fa6gv7.emergentagent.net/job_e0aa043e-675d-4863-909c-5d4926841718/artifacts/7kle5aa3_Jarvyn_newIde_1.gif";

/* Feature categories — each takes one step on the blue gradation */
const CATEGORIES = [
  { name: "Editor & AI", color: BLUE_STEPS[3] },
  { name: "Build & Security", color: BLUE_STEPS[4] },
  { name: "Runtime & Collaboration", color: BLUE_STEPS[5] },
  { name: "Platform", color: "#00162B" },
];
const categoryOf = (n) => CATEGORIES[Math.min(Math.floor((Number(n) - 1) / 6), 3)];

const features = [
  { n: "01", title: "Hardware-native platform", desc: "Built from the ground up for RISC-V and Rust — not a general-purpose editor fork." },
  { n: "02", title: "AI trained on embedded", desc: "Model tuned on GPIO, UART, device registers, HAL crates and peripheral modules." },
  { n: "03", title: "Native Rust analyzer", desc: "Real-time diagnostics, borrow-checker hints, macro expansion — first-class Rust." },
  { n: "04", title: "SVD-driven register view", desc: "Peripheral memory maps visualized, editable at bit-field resolution." },
  { n: "05", title: "Checkpoint system", desc: "Bookmark firmware state and roll back without touching git." },
  { n: "06", title: "Board Support Packages", desc: "Pre-configured BSPs for every certified TRUSTED-V board." },
  { n: "07", title: "Cargo-native build", desc: "Zero-config cross-compilation across every RISC-V target." },
  { n: "08", title: "Debugger & programmer", desc: "JTAG/SWD debug, flash and trace — all in one panel." },
  { n: "09", title: "Formal spec inspector", desc: "Static analysis against ISA extensions before you flash." },
  { n: "10", title: "Signed toolchain", desc: "SLSA L3 supply-chain guarantees — reproducible, signed artifacts." },
  { n: "11", title: "Secure Boot integration", desc: "One-click rBoot / rustBoot signing and provisioning." },
  { n: "12", title: "Crypto Stack browser", desc: "AES, SHA-3, ML-KEM, ML-DSA at your fingertips." },
  { n: "13", title: "RTOS project templates", desc: "TRUSTED-V RTOS, Embassy, Tock and RIOT starter kits." },
  { n: "14", title: "Trace & profiling", desc: "Cycle-accurate trace and Rust-aware flame graphs." },
  { n: "15", title: "Remote pair sessions", desc: "Live collaborative debugging with your team." },
  { n: "16", title: "Version-aware refactors", desc: "Refactor Rust code across HAL versions safely." },
  { n: "17", title: "Cross-target simulator", desc: "Run firmware in the TRUSTED-V simulator before deploying." },
  { n: "18", title: "Compliance evidence", desc: "Auto-collects artifacts for CC, PSA, ISO 26262 audits." },
  { n: "19", title: "Marketplace inside", desc: "Discover boards and IP without leaving the IDE." },
  { n: "20", title: "Multi-user workspaces", desc: "Shared configurations for regulated projects." },
  { n: "21", title: "First-class docs", desc: "Deep-linked docs, examples and API reference — offline-ready." },
];

const comparison = [
  ["Hardware-aware AI", true, false],
  ["Native Rust for embedded", true, "partial"],
  ["SVD register visualization", true, false],
  ["Checkpoints beyond git", true, false],
  ["Signed reproducible toolchain", true, false],
  ["Secure Boot integration", true, false],
  ["Cross-target simulator", true, false],
  ["Compliance evidence bundle", true, false],
];

const IDEDownloads = () => {
  return (
    <div className="bg-white text-[#0B0F14]">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-white border-b border-[#E5E4DF] overflow-hidden" data-testid="ide-hero">
        <div className="absolute inset-0 tv-grid-bg opacity-60 pointer-events-none" />
        <div className="absolute -top-32 -right-40 w-[520px] h-[520px] rounded-full bg-[#00B4E0]/8 blur-3xl pointer-events-none" />

        <div className="tv-container relative pt-8 md:pt-10 pb-8 md:pb-12">
          <Breadcrumbs items={[{ label: "Products", to: "/product-suite" }, { label: "Jarvyn IDE" }]} className="mb-10" />
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="mb-5"><Eyebrow>Jarvyn IDE</Eyebrow></div>
              <h1 className="tv-h1" style={{ fontSize: "clamp(34px, 5vw, 56px)" }} data-testid="ide-hero-title">
                An IDE built for<br />
                <span className="text-[#003262]">RISC-V and Rust.</span>
              </h1>
              <p className="tv-lede mt-5" data-testid="ide-hero-subtitle">
                Jarvyn IDE is currently in development. Follow the platform for release updates
                and early-access information.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="tv-btn tv-btn-primary tv-btn-lg cursor-default opacity-65" data-testid="ide-hero-coming-soon">Jarvyn IDE · Coming soon</span>
                <Link to="/contact" className="tv-btn tv-btn-outline tv-btn-lg" data-testid="ide-hero-contact-cta">Request launch updates</Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-[#E5E4DF] rounded-md p-6 md:p-7 bg-white shadow-[0_16px_40px_-24px_rgba(11,15,20,0.12)]" data-testid="ide-download-panel">
                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">Coming soon</div>
                <h2 className="mt-3 text-[22px] font-semibold text-[#0B0F14]">Jarvyn IDE</h2>
                <p className="mt-3 text-[14px] leading-[1.6] text-[#5A6472]">The public download is not available yet. Release details will be shared here when Jarvyn is ready.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Jarvyn IDE preview (real product screenshot) ── */}
        <div className="tv-container pb-16 md:pb-24">
          <figure className="relative rounded-lg border border-[#E5E4DF] bg-[#0B0F14] overflow-hidden shadow-[0_40px_80px_-40px_rgba(11,15,20,0.35)]" data-testid="ide-hero-screenshot">
            {/* window chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#0B0F14]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <span className="font-mono text-[11px] text-white/60 truncate">
                Jarvyn IDE — qemu-hello / src / main.rs
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#56A2D6]">
                RV32
              </span>
            </div>
            <img
              src={JARVYN_GIF}
              alt="Jarvyn IDE — building, running and debugging a RISC-V Rust project in QEMU"
              className="block w-full h-auto"
              loading="lazy"
              data-testid="ide-hero-gif"
            />
            <figcaption className="absolute bottom-3 left-4 font-mono text-[10px] tracking-widest uppercase text-white/50">
              Live · Build → Run → Debug (QEMU)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 21 Features */}
      <section className="tv-section border-b border-[#E5E4DF]" data-testid="ide-features">
        <div className="tv-container">
          <div className="mb-14 max-w-3xl">
            <span className="tv-eyebrow">Twenty-one reasons</span>
            <h2 className="tv-h2">
              Purpose-built, not repurposed.
            </h2>
          </div>

          <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2" data-testid="ide-feature-legend">
            {CATEGORIES.map((c) => (
              <span key={c.name} className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-[#5A6472]">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c.color }} />{c.name}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const cat = categoryOf(f.n);
              return (
                <div key={f.n} className="tv-panel p-6 min-h-[175px]" data-testid={`ide-feature-${f.n}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm font-mono text-[11px] font-semibold text-white" style={{ background: cat.color }}>{f.n}</span>
                    <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase" style={{ color: cat.color }}>{cat.name}</span>
                  </div>
                  <h3 className="text-[17px] tracking-[-0.015em] text-[#0B0F14] font-medium">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-[#5A6472]">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="tv-section border-b border-[#E5E4DF] bg-[#F7F7F5]" data-testid="ide-comparison">
        <div className="tv-container">
          <div className="mb-12 max-w-3xl">
            <span className="tv-eyebrow">Jarvyn vs general-purpose IDEs</span>
            <h2 className="tv-h2">
              What only a purpose-built IDE can do.
            </h2>
          </div>

          <div className="border-t border-[#0B0F14]">
            <div className="grid grid-cols-12 gap-4 py-4 border-b border-[#0B0F14] text-[11px] font-semibold tracking-[0.2em] uppercase text-[#5A6472]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              <div className="col-span-7">Capability</div>
              <div className="col-span-2 text-center text-[#003262]">Jarvyn</div>
              <div className="col-span-3 text-center">General IDE</div>
            </div>
            {comparison.map(([label, jarvyn, other]) => (
              <div key={label} className="grid grid-cols-12 gap-4 py-4 border-b border-[#E5E4DF] items-center">
                <div className="col-span-7 text-[15px]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{label}</div>
                <div className="col-span-2 flex justify-center">
                  {jarvyn === true && <Check className="w-4 h-4 text-[#0F6E56]" />}
                </div>
                <div className="col-span-3 flex justify-center">
                  {other === true && <Check className="w-4 h-4 text-[#0F6E56]" />}
                  {other === "partial" && <span className="text-[11px] font-mono text-[#5A6472]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>partial</span>}
                  {other === false && <X className="w-4 h-4 text-[#B7410E]" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tv-section-tight" data-testid="ide-cta">
        <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="tv-h2">Jarvyn IDE is <span className="text-[#003262]">coming soon</span>.</h2>
          <div className="flex gap-3">
            <span className="tv-btn tv-btn-primary cursor-default opacity-65" data-testid="ide-cta-coming-soon">Coming soon</span>
            <Link to="/contact" className="tv-btn tv-btn-outline" data-testid="ide-cta-contact">
              Request launch updates <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IDEDownloads;
