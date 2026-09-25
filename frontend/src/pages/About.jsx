import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import TrustRing from "@/components/TrustRing";
import { PoweredByBosch, BLUE_STEPS } from "@/components/TrustedVLogo";
import { Eyebrow } from "@/components/ui-kit";
import { ArrowUpRight } from "lucide-react";

const About = () => (
  <div className="bg-white text-[#0B0F14]">
    <PageHero
      crumbs={[{ label: "About" }]}
      eyebrow="About TRUSTED-V"
      title={<>Building trust in the<br />RISC-V ecosystem.</>}
      subtitle="A Bosch Global Software Technologies initiative — an open, modular platform for trustworthy edge silicon and mission-critical embedded software on RISC-V."
    />
    <Mission />
    <StructuralGaps />
    <RoadmapAndConsortium />
    <BackedByBosch />
    <CTA />
  </div>
);

const Mission = () => {
  const pillars = [
    { k: "01", title: "Security", desc: "Rust memory-safety, PQC-ready crypto, certifiable boot chain, vendor-neutral attestation." },
    { k: "02", title: "Performance", desc: "Hardware-aware tooling, deterministic RTOS and virtualization for real-time workloads." },
    { k: "03", title: "Time-to-Market", desc: "Pre-integrated IP and virtual platforms — ship firmware before RTL freezes." },
  ];
  return (
    <section className="tv-section border-b border-[#E5E4DF]" data-testid="about-mission">
      <div className="tv-container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="tv-h2 mt-4">Close the trust gap in RISC-V.</h2>
            <p className="mt-6 text-[16.5px] leading-[1.7] text-[#3A3A3A]">
              RISC-V&apos;s next growth phase is gated by trust, not silicon capability.
              Fragmented ISA extensions, unclear certification paths and inconsistent
              security postures block adoption where RISC-V is needed most.
            </p>
            <p className="mt-4 text-[16.5px] leading-[1.7] text-[#3A3A3A]">
              TRUSTED-V is the answer: one opinionated stack from IP integration to
              silicon sign-off — built to global standards, shipped in the open.
            </p>
          </div>
          <div className="lg:col-span-3 lg:col-start-6 hidden lg:block"><TrustRing /></div>
          <div className="lg:col-span-4 lg:col-start-9 space-y-3">
            {pillars.map((p, i) => (
              <div key={p.k} className="tv-panel relative overflow-hidden p-6 md:p-7">
                <span className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: BLUE_STEPS[i + 3] }} />
                <div className="pl-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">/ {p.k}</span>
                    <h3 className="text-[20px] font-semibold tracking-tight text-[#0B0F14]">{p.title}</h3>
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.65] text-[#5A6472]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StructuralGaps = () => {
  const gaps = [
    { n: "01", title: "ISA fragmentation", problem: "Every vendor ships a different ISA extension mix.", answer: "TRUSTED-V Verified locks a reference feature set." },
    { n: "02", title: "Unified security framework", problem: "No consistent root-of-trust or attestation model.", answer: "rBoot + rustBoot + Crypto Stack — one certifiable posture from ROM up." },
    { n: "03", title: "Supply-chain integrity", problem: "SBOMs and reproducible builds aren't the default.", answer: "SLSA L3 pipelines and signed toolchains, built into Jarvyn." },
    { n: "04", title: "SW-HW co-integration", problem: "Silicon and firmware teams debug weeks apart.", answer: "Virtual platforms let firmware ship before RTL freezes." },
    { n: "05", title: "Certification pathway", problem: "Certifications require months of retrofitting.", answer: "Evidence collection mapped to CC, PSA, ISO 26262, IEC 62443." },
    { n: "06", title: "Enterprise adoption", problem: "Enterprises need LTS and indemnification.", answer: "Backed by Bosch — commercial LTS, SLAs, support tiers." },
    { n: "07", title: "Platform security layer", problem: "PSA was built for Arm, leaving RISC-V behind.", answer: "A PSA L3-aligned security layer native to RISC-V." },
    { n: "08", title: "Platform coordination", problem: "Vendors optimise locally, not for the whole stack.", answer: "The TRUSTED-V platform aligns the engineering layers on one open reference." },
  ];
  return (
    <section className="tv-section border-b border-[#E5E4DF] bg-[#F7F7F5]" data-testid="structural-gaps">
      <div className="tv-container">
        <div className="mb-14 max-w-3xl">
          <Eyebrow>Why TRUSTED-V</Eyebrow>
          <h2 className="tv-h2 mt-4">Eight structural gaps we close.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gaps.map((g) => (
            <div key={g.n} className="tv-panel p-6 md:p-7">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">{g.n}</span>
                <h3 className="text-[17px] font-semibold tracking-tight text-[#0B0F14]">{g.title}</h3>
              </div>
              <p className="text-[13.5px] leading-[1.65] text-[#5A6472]">{g.problem}</p>
              <div className="mt-4 border-l-2 border-[#2486C7] pl-3">
                <p className="text-[13px] leading-[1.6] text-[#0B0F14]">{g.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RoadmapAndConsortium = () => {
  const phases = [
    { period: "2025 – 2026", title: "Foundation", state: "Active" },
    { period: "2026 – 2027", title: "Platform Growth", state: "Committed" },
    { period: "2027 – 2029", title: "Industry Adoption", state: "Planned" },
  ];
  const tiers = [
    { name: "Founding", desc: "IP vendors, Tier-1 OEMs and EDA leaders shaping the reference stack." },
    { name: "Principal", desc: "Silicon houses and software Tier-1s driving co-verified releases." },
    { name: "Associate", desc: "Integrators and OEMs building on TRUSTED-V Verified silicon." },
    { name: "Academic & Research", desc: "Universities and labs contributing open reference implementations." },
  ];
  return (
    <section className="tv-section border-b border-[#E5E4DF]" data-testid="roadmap-consortium">
      <div className="tv-container grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>Roadmap</Eyebrow>
          <h2 className="tv-h2 mt-4">Where we&apos;re heading.</h2>
          <ul className="mt-10 border-t border-[#0B0F14]">
            {phases.map((p) => (
              <li key={p.title} className="grid grid-cols-12 gap-4 py-6 border-b border-[#E5E4DF] items-baseline">
                <span className="col-span-4 text-[12px] font-mono tracking-widest text-[#5A6472]">{p.period}</span>
                <span className="col-span-5 text-[19px] md:text-[22px] text-[#0B0F14] font-medium">{p.title}</span>
                <span className={`col-span-3 justify-self-end text-[10px] font-semibold tracking-[0.2em] uppercase ${p.state === "Active" ? "text-[#0F6E56]" : "text-[#5A6472]"}`}>{p.state}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow>The consortium</Eyebrow>
          <h2 className="tv-h2 mt-4">Four tiers of partnership.</h2>
          <div className="mt-10 space-y-3">
            {tiers.map((t, i) => (
              <div key={t.name} className="border border-[#E5E4DF] rounded-md p-5 flex items-start gap-5" data-testid={`tier-${t.name.toLowerCase().replace(/\W+/g, "-")}`}>
                <span className="w-9 h-9 rounded-md flex-shrink-0 flex items-center justify-center font-mono text-[11px] font-semibold text-white" style={{ background: BLUE_STEPS[5 - i] }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-[17px] text-[#0B0F14] font-medium">{t.name}</h4>
                  <p className="mt-1 text-[13.5px] leading-[1.55] text-[#5A6472]">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BackedByBosch = () => (
  <section className="bg-[#00162B] text-white" data-testid="backed-by-bosch">
    <div className="tv-container tv-section">
      <div className="grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7">
          <PoweredByBosch dark className="text-[18px]" />
          <h2 className="tv-h2 mt-5">Engineering discipline meets<br />open-source velocity.</h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-[14.5px] leading-[1.7] text-white/70">
            Bosch Global Software Technologies leads TRUSTED-V — automotive-grade rigour and long-term support for open RISC-V.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="tv-section-tight border-b border-[#E5E4DF]" data-testid="about-cta">
    <div className="tv-container flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
      <h2 className="tv-h2">Join the RISC-V decade.</h2>
      <div className="flex gap-3">
        <Link to="/contact" className="tv-btn tv-btn-primary" data-testid="about-cta-primary">Partner with us <ArrowUpRight className="w-4 h-4" /></Link>
        <Link to="/product-suite" className="tv-btn tv-btn-outline" data-testid="about-cta-secondary">Explore products</Link>
      </div>
    </div>
  </section>
);

export default About;
