import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";

const RTOSBenchmarkPage = () => {
  const options = [
    {
      name: "TRUSTED-V RTOS",
      tag: "Rust-native",
      desc: "A custom Rust RTOS for RISC-V with memory-safe concurrency and deterministic scheduling.",
      features: ["100% Rust — memory safe by construction", "Compile-time peripheral verification", "Deterministic scheduler", "First-class RISC-V support"],
      featured: true,
    },
    {
      name: "Zephyr RTOS",
      tag: "Linux Foundation",
      desc: "Broadly supported RTOS with built-in networking and security subsystems.",
      features: ["Built-in networking stack", "Bluetooth & Wi-Fi drivers", "Security subsystem", "Wide RISC-V board support"],
    },
    {
      name: "FreeRTOS",
      tag: "Industry standard",
      desc: "Broad ecosystem RTOS, integrated with the Rust toolchain via C FFI bindings.",
      features: ["Well-established ecosystem", "Legacy compatibility", "C FFI bindings from Rust", "Pre-configured RISC-V targets"],
    },
    {
      name: "Embassy",
      tag: "Async-first",
      desc: "Async Rust framework for embedded — cooperative concurrency at compile time, no scheduler runtime required.",
      features: ["async / await native", "Zero-overhead concurrency", "No scheduler runtime", "Timer-based tasks"],
    },
  ];

  return (
    <div className="bg-white text-[#0B0F14]" data-testid="rtos-benchmark-page">
      <PageHero
        crumbs={[{ label: "Products", to: "/product-suite" }, { label: "RTOS Options" }]}
        eyebrow="RTOS choices"
        title={
          <>
            Real-time runtimes,<br />pre-integrated.
          </>
        }
        subtitle="TRUSTED-V ships integration and reference project templates for four production RTOS options — pick the runtime your project actually needs."
      />

      <section className="tv-section border-b border-[#E5E4DF]" data-testid="rtos-options">
        <div className="tv-container">
          <div className="mb-10 max-w-3xl">
            <span className="tv-eyebrow">Supported RTOS</span>
            <h2 className="tv-h2">
              Four runtimes. One toolchain.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {options.map((o) => (
              <div key={o.name} className={`tv-panel p-7 md:p-8 min-h-[250px] ${o.featured ? "border-[#2486C7]" : ""}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#5A6472]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{o.tag}</span>
                  {o.featured && <span className="text-[10px] font-mono text-[#003262] border border-[#003262]/40 px-2 py-0.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>native</span>}
                </div>
                <h3 className="text-[20px] md:text-[24px] tracking-[-0.02em] text-[#0B0F14]" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>{o.name}</h3>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-[#5A6472] font-light" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>{o.desc}</p>
                <ul className="mt-5 space-y-2 border-t border-[#E5E4DF] pt-5">
                  {o.features.map((f) => (
                    <li key={f} className="text-[13px] text-[#0B0F14] flex items-start gap-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                      <span className="w-1 h-1 mt-2 rounded-full bg-[#003262] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-section-tight" data-testid="rtos-cta">
        <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="tv-h2">
            Not sure which runtime fits? Let&apos;s talk.
          </h2>
          <div className="flex gap-3">
            <Link to="/contact" className="tv-btn tv-btn-primary" data-testid="rtos-cta-contact">
              Talk to an engineer <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/developer-portal" className="tv-btn tv-btn-outline" data-testid="rtos-cta-docs">
              Read the docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RTOSBenchmarkPage;
