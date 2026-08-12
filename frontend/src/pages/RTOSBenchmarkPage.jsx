import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";

const RTOSBenchmarkPage = () => {
  const options = [
    { name: "TRUSTED-V RTOS", tag: "Rust-native", desc: "Custom Rust RTOS for RISC-V with memory-safe concurrency and 9× faster context switching.", features: ["9× faster context switch", "12× faster task creation", "100% memory safe (Rust)", "Compile-time GPIO verification"], featured: true },
    { name: "Zephyr RTOS", tag: "Linux Foundation", desc: "Broadly supported RTOS with built-in networking and security subsystems.", features: ["Built-in networking", "Bluetooth & WiFi", "Security subsystem", "First-class RISC-V"] },
    { name: "FreeRTOS", tag: "Industry standard", desc: "Broad ecosystem RTOS, supported via C FFI bindings from Rust.", features: ["Ecosystem breadth", "Legacy compatibility", "C FFI bindings", "Pre-configured RISC-V"] },
    { name: "Embassy", tag: "Async-first", desc: "Async Rust framework for embedded. No RTOS scheduler needed — cooperative at compile time.", features: ["async / await native", "Zero-overhead concurrency", "No scheduler runtime", "Timer-based tasks"] },
  ];

  const bench = [
    { op: "Task creation", min: "319", avg: "2,643", vs: "12× faster", grade: "excellent" },
    { op: "Context switch", min: "~260", avg: "~520", vs: "9× faster", grade: "excellent" },
    { op: "Mutex lock (uncontended)", min: "593", avg: "1,335", vs: "similar", grade: "good" },
    { op: "Mutex unlock (uncontended)", min: "532", avg: "906", vs: "similar", grade: "good" },
    { op: "Semaphore signal", min: "540", avg: "925", vs: "similar", grade: "good" },
    { op: "Queue send", min: "591", avg: "1,171", vs: "similar", grade: "good" },
    { op: "Mutex lock (contended)", min: "1,101", avg: "4,979", vs: "4× slower", grade: "acceptable" },
    { op: "Semaphore signal (contended)", min: "1,318", avg: "4,959", vs: "5× slower", grade: "acceptable" },
  ];

  const gradeColor = { excellent: "#0F6E56", good: "#003262", acceptable: "#B45309" };

  return (
    <div className="bg-white text-[#0A0A0A]" data-testid="rtos-benchmark-page">
      <PageHero
        eyebrow="RTOS Benchmarks"
        title={
          <>
            Deterministic RTOS.<br />Measured on real silicon.
          </>
        }
        subtitle="TRUSTED-V ships pre-integrated support for four production RTOS options — with published, reproducible benchmarks across every certified board."
      >
        <Link to="/product-suite" className="inline-flex items-center gap-1.5 text-[13px] text-[#6B6B6B] hover:text-[#003262] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back to products
        </Link>
      </PageHero>

      <section className="tv-section border-b border-[#E7E5E0]" data-testid="rtos-options">
        <div className="tv-container">
          <div className="mb-12 max-w-3xl">
            <span className="tv-eyebrow">Supported RTOS</span>
            <h2 className="tv-display mt-4 text-[32px] md:text-[48px] text-[#0A0A0A]" style={{ letterSpacing: "-0.03em", lineHeight: "1.02" }}>
              Pick the runtime your project needs.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-[#E7E5E0] border-y border-[#E7E5E0]">
            {options.map((o) => (
              <div key={o.name} className={`bg-white p-8 md:p-10 min-h-[280px] ${o.featured ? "border-t-[3px] border-[#003262]" : ""}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#6B6B6B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{o.tag}</span>
                  {o.featured && <span className="text-[10px] font-mono text-[#003262] border border-[#003262]/40 px-2 py-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>featured</span>}
                </div>
                <h3 className="text-[26px] md:text-[30px] tracking-[-0.02em] text-[#0A0A0A]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>{o.name}</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[#4B4B4B] font-light" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>{o.desc}</p>
                <ul className="mt-5 space-y-2 border-t border-[#E7E5E0] pt-5">
                  {o.features.map((f) => (
                    <li key={f} className="text-[13.5px] text-[#0A0A0A] flex items-start gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
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

      <section className="tv-section border-b border-[#E7E5E0] bg-[#FAFAF7]" data-testid="rtos-bench">
        <div className="tv-container">
          <div className="mb-10 max-w-3xl">
            <span className="tv-eyebrow">Benchmarks — TRUSTED-V RTOS vs FreeRTOS</span>
            <h2 className="tv-display mt-4 text-[32px] md:text-[48px] text-[#0A0A0A]" style={{ letterSpacing: "-0.03em", lineHeight: "1.02" }}>
              Published. Reproducible.
            </h2>
            <p className="mt-4 text-[13px] font-mono text-[#6B6B6B]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              measurements in nanoseconds · RV32IMC @ 100 MHz · lower is better
            </p>
          </div>

          <div className="border-t border-[#0A0A0A]">
            <div className="grid grid-cols-12 gap-4 py-4 border-b border-[#0A0A0A] text-[11px] font-semibold tracking-[0.2em] uppercase text-[#6B6B6B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div className="col-span-6">Operation</div>
              <div className="col-span-2 text-right">Min</div>
              <div className="col-span-2 text-right">Avg</div>
              <div className="col-span-2 text-right">vs FreeRTOS</div>
            </div>
            {bench.map((b) => (
              <div key={b.op} className="grid grid-cols-12 gap-4 py-4 border-b border-[#E7E5E0] items-baseline">
                <div className="col-span-6 text-[15px]" style={{ fontFamily: "'Outfit', sans-serif" }}>{b.op}</div>
                <div className="col-span-2 text-right text-[14px] font-mono text-[#0A0A0A]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{b.min}</div>
                <div className="col-span-2 text-right text-[14px] font-mono text-[#0A0A0A]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{b.avg}</div>
                <div className="col-span-2 text-right text-[13px] font-medium" style={{ color: gradeColor[b.grade], fontFamily: "'Space Grotesk', sans-serif" }}>{b.vs}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-section-tight" data-testid="rtos-cta">
        <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="tv-display text-[36px] md:text-[52px] text-[#0A0A0A] leading-[0.98] max-w-2xl" style={{ letterSpacing: "-0.03em" }}>
            Real-time, done right.
          </h2>
          <div className="flex gap-3">
            <Link to="/contact" className="tv-btn tv-btn-primary" data-testid="rtos-cta-contact">
              Talk to sales <ArrowUpRight className="w-4 h-4" />
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
