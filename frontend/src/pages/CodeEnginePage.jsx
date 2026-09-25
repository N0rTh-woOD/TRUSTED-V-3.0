import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Eyebrow, PrimaryCTA, SecondaryCTA, TVCard } from "@/components/ui-kit";

const WORKFLOW = [
  { step: "01", title: "Frame the target", text: "Start with the board, RISC-V target, runtime and security requirements that shape the project." },
  { step: "02", title: "Build a plan", text: "Create a clear implementation path across the application, platform services and secure boot chain." },
  { step: "03", title: "Review the output", text: "Keep engineers in control with reviewable project structure and code changes before they enter the workspace." },
];

const CodeEnginePage = () => (
  <div className="bg-white text-[#0B0F14]" data-testid="code-engine-page">
    <PageHero
      crumbs={[{ label: "Products", to: "/product-suite" }, { label: "AI Engines" }, { label: "Code Engine" }]}
      eyebrow="AI Engines"
      title={<>Code Engine for<br /><span className="text-[#003262]">RISC-V projects.</span></>}
      subtitle="Code Engine is the AI Engine in TRUSTED-V for shaping structured embedded projects around your target, runtime and security requirements."
    >
      <div className="tv-panel tv-panel-muted p-6 md:p-7" data-testid="code-engine-hero-panel">
        <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">AI Engine 01</div>
        <div className="mt-3 text-[20px] font-semibold text-[#0B0F14]">Code Engine</div>
        <p className="mt-2 text-[14px] leading-[1.6] text-[#5A6472]">Structured assistance for planning RISC-V embedded work inside the TRUSTED-V platform.</p>
        <Link to="/solution-builder" className="tv-arrow-link mt-5" data-testid="code-engine-open-builder">Open Solution Builder</Link>
      </div>
    </PageHero>

    <section className="tv-section border-b border-[#E5E4DF]" data-testid="code-engine-workflow">
      <div className="tv-container">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>How it fits</Eyebrow>
          <h2 className="tv-h2 mt-4">From engineering context to a reviewable starting point.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {WORKFLOW.map((item) => (
            <div key={item.step} className="tv-panel p-7 md:p-8" data-testid={`code-engine-step-${item.step}`}>
              <div className="font-mono text-[11px] tracking-[0.18em] text-[#2486C7]">{item.step}</div>
              <h3 className="mt-5 text-[21px] font-semibold text-[#0B0F14]">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-[#5A6472]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="tv-section border-b border-[#E5E4DF] bg-[#F7F7F5]" data-testid="code-engine-capabilities">
      <div className="tv-container grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <Eyebrow>Built for the platform</Eyebrow>
          <h2 className="tv-h2 mt-4">Context that starts with the system, not a blank prompt.</h2>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          <TVCard eyebrow="Target context" title="RISC-V-aware setup" description="Bring the selected target, board support, runtime and toolchain into one project conversation." data-testid="code-engine-target-context" />
          <TVCard eyebrow="Security context" title="Trust-aware planning" description="Keep secure boot, cryptography and attestation considerations visible from the first project decision." data-testid="code-engine-security-context" />
          <TVCard eyebrow="Engineering flow" title="Human review first" description="Use Code Engine as a structured starting point, then review the plan and changes in your development workflow." data-testid="code-engine-review-flow" />
          <TVCard eyebrow="Next step" title="Open the workspace" description="Move from the project plan into the Solution Builder when your team is ready to continue." to="/solution-builder" data-testid="code-engine-workspace-link" />
        </div>
      </div>
    </section>

    <section className="tv-section-tight" data-testid="code-engine-cta">
      <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <Eyebrow>AI Engines</Eyebrow>
          <h2 className="tv-h2 mt-4">Start the project with the right context.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrimaryCTA to="/solution-builder" data-testid="code-engine-cta-builder">Open Solution Builder</PrimaryCTA>
          <SecondaryCTA to="/contact" data-testid="code-engine-cta-contact">Talk to our engineers</SecondaryCTA>
        </div>
      </div>
    </section>
  </div>
);

export default CodeEnginePage;