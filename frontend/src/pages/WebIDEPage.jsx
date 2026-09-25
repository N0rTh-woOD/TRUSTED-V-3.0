import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";

const WebIDEPage = () => {
  return (
    <div className="bg-white text-[#0B0F14]">
      <PageHero
        crumbs={[{ label: "Products", to: "/product-suite" }, { label: "WebIDE" }]}
        eyebrow="WebIDE · Coming soon"
        title={
          <>
            WebIDE is<br /><span className="text-[#003262]">coming soon.</span>
          </>
        }
        subtitle="The browser-based TRUSTED-V development environment is in development. Release and early-access details will be shared here."
      >
        <ComingSoonPanel />
      </PageHero>

      <section className="tv-section border-b border-[#E5E4DF]" data-testid="webide-features">
        <div className="tv-container grid md:grid-cols-3 gap-4">
          {[
            { n: "01", title: "Cloud toolchain", desc: "A browser-first RISC-V development workflow is planned for the WebIDE release." },
            { n: "02", title: "Simulator-backed", desc: "Virtual platform and simulator workflows are planned for the browser experience." },
            { n: "03", title: "Team workflow", desc: "Collaborative engineering workflows are being shaped for the upcoming release." },
          ].map((f) => (
            <div key={f.n} className="tv-panel p-7 md:p-8">
              <div className="text-[12px] font-mono tracking-widest text-[#003262]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>/ {f.n}</div>
              <h3 className="mt-3 text-[22px] tracking-[-0.015em] text-[#0B0F14]" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>{f.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#5A6472] font-light" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tv-section-tight" data-testid="webide-cta">
        <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="tv-h2">
            WebIDE is coming soon.
          </h2>
          <div className="flex gap-3">
            <span className="tv-btn tv-btn-primary cursor-default opacity-65" data-testid="webide-coming-soon">Coming soon</span>
            <Link to="/contact" className="tv-btn tv-btn-outline" data-testid="webide-cta-contact">Request launch updates <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const ComingSoonPanel = () => (
  <div className="border border-[#E5E4DF] bg-[#0B0F14] text-white overflow-hidden" style={{ borderRadius: 4 }}>
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      </div>
      <span className="text-[11px] text-white/60 font-mono" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        WebIDE · planned browser workspace
      </span>
      <span className="text-[10px] text-[#FDB515] tracking-widest">COMING SOON</span>
    </div>
    <pre className="p-5 text-[12.5px] leading-[1.7] font-mono" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <code>
        <span className="text-white/40">// TRUSTED-V WebIDE</span>{"\n"}
        <span className="text-[#56A2D6]">status</span> <span className="text-white">= </span><span className="text-[#FDB515]">coming_soon</span>{"\n\n"}
        <span className="text-white/60">// Planned: browser workspace, RISC-V tooling,</span>{"\n"}
        <span className="text-white/60">// virtual platform workflows and team collaboration.</span>
      </code>
    </pre>
    <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 text-[11px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <span className="text-white/50">Release status</span>
      <span className="text-[#FDB515]">in development</span>
    </div>
  </div>
);

export default WebIDEPage;
