import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight, Check, Download, X } from "lucide-react";
import PageHero from "@/components/PageHero";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
  { n: "13", title: "RTOS project templates", desc: "Zephyr, FreeRTOS, Tock and RIOT starter kits." },
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
  const [builds, setBuilds] = useState([]);
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/ide-downloads`).then(r => setBuilds(r.data.filter(b => b.filename))).catch(() => {});
  }, []);

  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="Jarvyn IDE"
        title={
          <>
            An IDE built for<br />RISC-V and Rust.
          </>
        }
        subtitle="Jarvyn is the Rust-native RISC-V development environment. Purpose-built for embedded, mission-critical firmware from day one."
      >
        <div className="border border-[#E7E5E0] p-8" data-testid="ide-download-panel">
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6B6B6B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Latest release
          </div>
          {builds.length === 0 ? (
            <div className="text-[14px] text-[#6B6B6B]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Builds will appear here shortly.
            </div>
          ) : (
            <div className="space-y-3">
              {builds.slice(0, 3).map((b) => (
                <a
                  key={b.id}
                  href={`${BACKEND_URL}/api/ide-downloads/${b.id}/download`}
                  className="group flex items-center justify-between py-3 border-b border-[#E7E5E0] last:border-b-0"
                  data-testid={`download-${b.id}`}
                >
                  <div>
                    <div className="text-[15px] text-[#0A0A0A]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                      {b.platform || b.os} · v{b.version}
                    </div>
                    <div className="text-[12px] text-[#6B6B6B] mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {b.filename}
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-[#003262] group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>
          )}
        </div>
      </PageHero>

      {/* 21 Features */}
      <section className="tv-section border-b border-[#E7E5E0]" data-testid="ide-features">
        <div className="tv-container">
          <div className="mb-14 max-w-3xl">
            <span className="tv-eyebrow">Twenty-one reasons</span>
            <h2 className="tv-display mt-4 text-[36px] md:text-[52px] text-[#0A0A0A]" style={{ letterSpacing: "-0.03em", lineHeight: "1.02" }}>
              Purpose-built, not repurposed.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E7E5E0] border-y border-[#E7E5E0]">
            {features.map((f) => (
              <div key={f.n} className="bg-white p-8 min-h-[200px]" data-testid={`ide-feature-${f.n}`}>
                <div className="text-[12px] font-mono tracking-widest text-[#003262] mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  / {f.n}
                </div>
                <h3 className="text-[17px] tracking-[-0.015em] text-[#0A0A0A]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                  {f.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-[#4B4B4B] font-light" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="tv-section border-b border-[#E7E5E0] bg-[#FAFAF7]" data-testid="ide-comparison">
        <div className="tv-container">
          <div className="mb-12 max-w-3xl">
            <span className="tv-eyebrow">Jarvyn vs general-purpose IDEs</span>
            <h2 className="tv-display mt-4 text-[32px] md:text-[48px] text-[#0A0A0A]" style={{ letterSpacing: "-0.03em", lineHeight: "1.02" }}>
              What only a purpose-built IDE can do.
            </h2>
          </div>

          <div className="border-t border-[#0A0A0A]">
            <div className="grid grid-cols-12 gap-4 py-4 border-b border-[#0A0A0A] text-[11px] font-semibold tracking-[0.2em] uppercase text-[#6B6B6B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div className="col-span-7">Capability</div>
              <div className="col-span-2 text-center text-[#003262]">Jarvyn</div>
              <div className="col-span-3 text-center">General IDE</div>
            </div>
            {comparison.map(([label, jarvyn, other]) => (
              <div key={label} className="grid grid-cols-12 gap-4 py-4 border-b border-[#E7E5E0] items-center">
                <div className="col-span-7 text-[15px]" style={{ fontFamily: "'Outfit', sans-serif" }}>{label}</div>
                <div className="col-span-2 flex justify-center">
                  {jarvyn === true && <Check className="w-4 h-4 text-[#0F6E56]" />}
                </div>
                <div className="col-span-3 flex justify-center">
                  {other === true && <Check className="w-4 h-4 text-[#0F6E56]" />}
                  {other === "partial" && <span className="text-[11px] font-mono text-[#6B6B6B]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>partial</span>}
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
          <h2 className="tv-display text-[36px] md:text-[52px] text-[#0A0A0A] leading-[0.98] max-w-2xl" style={{ letterSpacing: "-0.03em" }}>
            Skip the fork. Ship the firmware.
          </h2>
          <div className="flex gap-3">
            <Link to="/webide" className="tv-btn tv-btn-primary" data-testid="ide-cta-webide">
              Try WebIDE <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="tv-btn tv-btn-outline" data-testid="ide-cta-contact">
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IDEDownloads;
