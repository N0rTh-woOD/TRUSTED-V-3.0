import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";

const WebIDEPage = () => {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="WebIDE — Cloud edition"
        title={
          <>
            Code RISC-V<br />anywhere. Zero setup.
          </>
        }
        subtitle="A full Rust-native RISC-V IDE in your browser. Cloud toolchain, live collaboration, simulator-backed debug. No install."
      >
        <CodeWindow />
      </PageHero>

      <section className="tv-section border-b border-[#E7E5E0]" data-testid="webide-features">
        <div className="tv-container grid md:grid-cols-3 gap-px bg-[#E7E5E0] border-y border-[#E7E5E0]">
          {[
            { n: "01", title: "Cloud toolchain", desc: "Rust nightly, LLVM, cargo, gcc-riscv — pre-warmed, always current." },
            { n: "02", title: "Simulator-backed", desc: "Boot your firmware inside the TRUSTED-V simulator without hardware." },
            { n: "03", title: "Live collaboration", desc: "Pair-program on RISC-V firmware with cursors and shared debug sessions." },
          ].map((f) => (
            <div key={f.n} className="bg-white p-8 md:p-10">
              <div className="text-[12px] font-mono tracking-widest text-[#003262]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>/ {f.n}</div>
              <h3 className="mt-3 text-[22px] tracking-[-0.015em] text-[#0A0A0A]" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>{f.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#4B4B4B] font-light" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tv-section-tight" data-testid="webide-cta">
        <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="tv-h2">
            Prefer the full IDE?
          </h2>
          <div className="flex gap-3">
            <Link to="/download-ide" className="tv-btn tv-btn-primary" data-testid="webide-cta-download">
              Download Jarvyn <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a href="#" className="tv-btn tv-btn-outline" data-testid="webide-launch">
              Launch WebIDE <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const CodeWindow = () => (
  <div className="border border-[#E7E5E0] bg-[#0A0A0A] text-white overflow-hidden" style={{ borderRadius: 4 }}>
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      </div>
      <span className="text-[11px] text-white/60 font-mono" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        main.rs — WebIDE
      </span>
      <span className="text-[10px] text-[#FDB515] tracking-widest">RV64GC</span>
    </div>
    <pre className="p-5 text-[12.5px] leading-[1.7] font-mono" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <code>
        <span className="text-white/40">// TRUSTED-V — WebIDE example</span>{"\n"}
        <span className="text-[#FDB515]">use</span> <span className="text-white">trusted_v::rboot::verify_chain;</span>{"\n"}
        <span className="text-[#FDB515]">use</span> <span className="text-white">trusted_v::crypto::attest;</span>{"\n"}
        <span className="text-[#FDB515]">use</span> <span className="text-white">trusted_v::rtos::launch;</span>{"\n"}
        {"\n"}
        <span className="text-[#00B4E0]">#[no_std]</span>{"\n"}
        <span className="text-[#00B4E0]">#[no_main]</span>{"\n"}
        <span className="text-[#FDB515]">fn</span> <span className="text-white">main</span>() {`{`}{"\n"}
        {"    "}<span className="text-white/60">let</span> chain = verify_chain(<span className="text-[#0F6E56]">&BOOT_KEY</span>);{"\n"}
        {"    "}<span className="text-white/60">let</span> quote = attest(chain);{"\n"}
        {"    "}launch(<span className="text-[#0F6E56]">&quot;rt_secure&quot;</span>, quote);{"\n"}
        {`}`}
      </code>
    </pre>
    <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 text-[11px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <span className="text-white/50">$ cargo build --release</span>
      <span className="text-[#0F6E56]">✓ verified</span>
    </div>
  </div>
);

export default WebIDEPage;
