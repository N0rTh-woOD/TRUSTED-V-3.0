import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Eyebrow, StepRail, PrimaryCTA, SecondaryCTA } from "@/components/ui-kit";
import { ENGAGEMENT_MODELS } from "@/data/engagement";

const EngagementModels = () => (
  <div className="bg-white text-[#0B0F14]" data-testid="engagement-page">
    <PageHero
      crumbs={[{ label: "Engagement models" }]}
      eyebrow="Engagement models"
      title={<>Two ways to build<br />with TRUSTED-V.</>}
      subtitle="Hand us the blueprint and we deliver the system, or bring your team onto our platform and ship faster."
    />
    <ModelsDetail />
    <WhichFits />
    <FinalCTA />
  </div>
);

const ModelsDetail = () => (
  <section className="border-b border-[#E5E4DF]" data-testid="engagement-models">
    {ENGAGEMENT_MODELS.map((m, idx) => {
      const dark = idx === 0;
      return (
        <div key={m.id} id={m.id} className={`border-b border-[#E5E4DF] ${dark ? "bg-[#00162B] text-white" : "bg-[#F7F7F5]"}`} data-testid={`engagement-${m.id}`}>
          <div className="tv-container tv-section">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <span className="tv-eyebrow" style={dark ? { color: "#2486C7" } : undefined}>
                  <span style={dark ? { color: "#2486C7" } : undefined}>{m.code} · {m.label}</span>
                </span>
                <h2 className={`tv-h2 mt-4 ${dark ? "text-white" : ""}`}>{m.tagline}</h2>
                <p className={`mt-6 text-[16px] leading-[1.65] max-w-md ${dark ? "text-white/70" : "text-[#5A6472]"}`}>{m.hook}</p>
                <div className={`mt-8 border-l-2 pl-4 text-[14px] leading-[1.6] ${dark ? "border-[#2486C7] text-white/85" : "border-[#004A7F] text-[#1A1F25]"}`}>
                  <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase block mb-1 opacity-70">Best fit</span>
                  {m.fit}
                </div>
                <Link to={m.cta.to} className={`mt-8 tv-btn ${dark ? "tv-btn-onDark" : "tv-btn-primary"}`} data-testid={`engagement-${m.id}-cta`}>
                  {m.cta.label} <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <div className={`rounded-md border p-7 md:p-9 ${dark ? "border-white/15 bg-white/[0.03]" : "border-[#E5E4DF] bg-white"}`}>
                  <div className={`font-mono text-[10.5px] tracking-[0.18em] uppercase mb-6 ${dark ? "text-white/50" : "text-[#5A6472]"}`}>How it works · 5 steps</div>
                  <StepRail steps={m.steps} dark={dark} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </section>
);

const WhichFits = () => {
  const rows = [
    ["You bring", "A specification or product idea", "An engineering team and codebase"],
    ["We provide", "Sourcing, PCB design, firmware, delivery", "IDE, marketplace, code generation, experts"],
    ["You receive", "A ready-to-deploy hardware + software system", "A subscription to the full development ecosystem"],
    ["Typical start", "Discovery call with our engineers", "Free tier — build in Jarvyn today"],
  ];
  return (
    <section className="tv-section border-b border-[#E5E4DF]" data-testid="engagement-compare">
      <div className="tv-container">
        <div className="mb-10 max-w-2xl">
          <Eyebrow>Which model fits</Eyebrow>
          <h2 className="tv-h2 mt-4">Pick your starting point.</h2>
        </div>
        <div className="border border-[#E5E4DF] rounded-md overflow-hidden">
          <div className="grid grid-cols-12 bg-[#F7F7F5] border-b border-[#E5E4DF] font-mono text-[10.5px] tracking-[0.16em] uppercase">
            <div className="col-span-2 px-5 py-4 text-[#5A6472]" />
            <div className="col-span-5 px-5 py-4 text-white bg-[#003262]">SaaS · Let's build it for you</div>
            <div className="col-span-5 px-5 py-4 text-[#003262] bg-[#E6F1F9]">PaaS · Your code, our ecosystem</div>
          </div>
          {rows.map(([k, a, b]) => (
            <div key={k} className="grid grid-cols-12 border-b border-[#E5E4DF] last:border-b-0 text-[14px]">
              <div className="col-span-2 px-5 py-4 font-mono text-[11px] tracking-[0.12em] uppercase text-[#5A6472]">{k}</div>
              <div className="col-span-5 px-5 py-4 text-[#0B0F14]">{a}</div>
              <div className="col-span-5 px-5 py-4 text-[#0B0F14]">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section className="tv-section-tight" data-testid="engagement-cta">
    <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-8">
      <h2 className="tv-h2">Not sure which fits? <span className="text-[#003262]">Ask us.</span></h2>
      <div className="flex gap-3">
        <PrimaryCTA to="/contact" data-testid="engagement-cta-contact">Talk to our engineers</PrimaryCTA>
        <SecondaryCTA to="/download-ide" data-testid="engagement-cta-ide">Start free with Jarvyn</SecondaryCTA>
      </div>
    </div>
  </section>
);

export default EngagementModels;
