import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { ArrowUpRight } from "lucide-react";

const About = () => {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="About TRUSTED-V"
        title={
          <>
            Building trust in the<br />RISC-V ecosystem.
          </>
        }
        subtitle="TRUSTED-V is a Bosch Global Software Technologies initiative — an open, modular platform for building trustworthy edge silicon and mission-critical embedded software on RISC-V."
      />

      <Mission />
      <StructuralGaps />
      <RoadmapAndConsortium />
      <BackedByBosch />
      <CTA />
    </div>
  );
};

const Mission = () => {
  const pillars = [
    { k: "01", title: "Security", desc: "Rust memory-safety, PQC-ready cryptography, certifiable boot chain and vendor-neutral silicon attestation." },
    { k: "02", title: "Performance", desc: "Hardware-aware tooling, deterministic RTOS and virtualization tuned for real-time, mission-critical workloads." },
    { k: "03", title: "Time-to-Market", desc: "Pre-integrated IP, virtual platforms and 48-hour certification turnaround — ship the certificate, not just the chip." },
  ];
  return (
    <section className="tv-section border-b border-[#E7E5E0]" data-testid="about-mission">
      <div className="tv-container">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="tv-eyebrow">Our mission</span>
            <h2
              className="tv-display mt-6 text-[36px] md:text-[52px] lg:text-[64px] text-[#0A0A0A]"
              style={{ letterSpacing: "-0.03em", lineHeight: "1.02" }}
            >
              Close the trust gap in RISC-V.
            </h2>
            <p
              className="mt-8 text-[16.5px] leading-[1.7] text-[#3A3A3A] font-light"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              The RISC-V ecosystem&apos;s next growth phase is gated by trust, not
              silicon capability. Fragmentation across ISA extensions, unclear
              certification paths and inconsistent security postures are blocking
              adoption in the industries where RISC-V is most needed.
            </p>
            <p
              className="mt-5 text-[16.5px] leading-[1.7] text-[#3A3A3A] font-light"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              TRUSTED-V is our answer: a complete, opinionated stack that unifies
              IP integration, virtualization, secure Rust software and silicon
              sign-off — built to global standards, shipped in the open.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 space-y-px bg-[#E7E5E0]">
            {pillars.map((p) => (
              <div key={p.k} className="bg-white p-8 md:p-10 border-l-[3px] border-[#003262]">
                <div className="flex items-baseline gap-4">
                  <span
                    className="text-[13px] font-mono tracking-widest text-[#6B6B6B]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    / {p.k}
                  </span>
                  <h3
                    className="text-[24px] md:text-[28px] tracking-[-0.02em] text-[#0A0A0A]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                  >
                    {p.title}
                  </h3>
                </div>
                <p
                  className="mt-3 text-[14.5px] leading-[1.65] text-[#4B4B4B] font-light pl-8"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                >
                  {p.desc}
                </p>
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
    { n: "01", title: "ISA fragmentation", problem: "Every vendor ships a subtly different RISC-V ISA extension mix, breaking portability.", answer: "TRUSTED-V Verified profile validates ISA compliance and locks a reference feature set." },
    { n: "02", title: "Unified security framework", problem: "No consistent root-of-trust, boot chain or attestation model across RISC-V vendors.", answer: "rBoot + rustBoot + Crypto Stack form a single, certifiable security posture from ROM up." },
    { n: "03", title: "Supply-chain integrity", problem: "SBOMs, signed artifacts and reproducible builds are not the default in embedded RISC-V.", answer: "SLSA L3 build pipelines and signed toolchains are baked into Jarvyn from day one." },
    { n: "04", title: "SW-HW co-integration", problem: "Silicon teams and firmware teams debug in different worlds, weeks apart.", answer: "Virtual platforms and RISC-V simulators let firmware ship before RTL freezes." },
    { n: "05", title: "Certification pathway", problem: "Automotive, industrial and IoT certifications require months of retrofitting.", answer: "48-hour certification turnaround with pre-mapped evidence for CC, PSA, ISO 26262 and IEC 62443." },
    { n: "06", title: "Enterprise adoption", problem: "Enterprises need commercial support, LTS and indemnification — not GitHub goodwill.", answer: "TRUSTED-V is backed by Bosch, with commercial LTS, SLAs and enterprise support tiers." },
    { n: "07", title: "Platform security layer", problem: "PSA and equivalent frameworks were built for Arm, leaving RISC-V behind.", answer: "TRUSTED-V ships a PSA L3-aligned platform security layer native to RISC-V." },
    { n: "08", title: "Ecosystem coordination", problem: "IP, silicon, EDA and software vendors optimize locally, not for the whole stack.", answer: "The TRUSTED-V Consortium aligns partners around a shared, open, production-hardened reference." },
  ];

  return (
    <section className="tv-section border-b border-[#E7E5E0] bg-[#FAFAF7]" data-testid="structural-gaps">
      <div className="tv-container">
        <div className="mb-16 max-w-3xl">
          <span className="tv-eyebrow">Why TRUSTED-V</span>
          <h2
            className="tv-display mt-6 text-[36px] md:text-[52px] lg:text-[64px] text-[#0A0A0A]"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.02" }}
          >
            Eight structural gaps we close.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[#E7E5E0] border-y border-[#E7E5E0]">
          {gaps.map((g) => (
            <div key={g.n} className="bg-[#FAFAF7] p-8 md:p-10">
              <div className="flex items-baseline gap-4 mb-3">
                <span
                  className="text-[12px] font-mono tracking-widest text-[#003262]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {g.n}
                </span>
                <h3
                  className="text-[20px] md:text-[24px] tracking-[-0.015em] text-[#0A0A0A]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                >
                  {g.title}
                </h3>
              </div>
              <p className="text-[14px] leading-[1.6] text-[#4B4B4B] font-light" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                {g.problem}
              </p>
              <div className="mt-4 border-l-2 border-[#003262] pl-4">
                <p className="text-[13.5px] leading-[1.6] text-[#0A0A0A]" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}>
                  {g.answer}
                </p>
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
    { period: "2026 – 2027", title: "Ecosystem Growth", state: "Committed" },
    { period: "2027 – 2029", title: "Industry Adoption", state: "Planned" },
  ];
  const tiers = [
    { name: "Founding", color: "#003262", desc: "IP vendors, Tier-1 OEMs, EDA leaders shaping the reference stack." },
    { name: "Principal", color: "#00B4E0", desc: "Silicon houses, software Tier-1s driving co-verified module releases." },
    { name: "Associate", color: "#0F6E56", desc: "System integrators and OEMs building on TRUSTED-V Verified silicon." },
    { name: "Academic & Research", color: "#FDB515", desc: "Universities and labs contributing to open reference implementations." },
  ];
  return (
    <section className="tv-section border-b border-[#E7E5E0]" data-testid="roadmap-consortium">
      <div className="tv-container grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <span className="tv-eyebrow">Roadmap</span>
          <h2
            className="tv-display mt-6 text-[32px] md:text-[44px] lg:text-[52px] text-[#0A0A0A]"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
          >
            Where we&apos;re heading.
          </h2>
          <ul className="mt-10 border-t border-[#0A0A0A]">
            {phases.map((p) => (
              <li key={p.title} className="grid grid-cols-12 gap-4 py-6 border-b border-[#E7E5E0] items-baseline">
                <span className="col-span-4 text-[12px] font-mono tracking-widest text-[#6B6B6B]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {p.period}
                </span>
                <span className="col-span-5 text-[19px] md:text-[22px] text-[#0A0A0A]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                  {p.title}
                </span>
                <span
                  className={`col-span-3 justify-self-end text-[10px] font-semibold tracking-[0.2em] uppercase ${
                    p.state === "Active" ? "text-[#0F6E56]" : "text-[#6B6B6B]"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {p.state}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <span className="tv-eyebrow">The consortium</span>
          <h2
            className="tv-display mt-6 text-[32px] md:text-[44px] lg:text-[52px] text-[#0A0A0A]"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
          >
            Four tiers of partnership.
          </h2>
          <div className="mt-10 space-y-4">
            {tiers.map((t) => (
              <div key={t.name} className="border border-[#E7E5E0] p-6 flex items-start gap-5">
                <span className="w-2.5 h-2.5 mt-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
                <div>
                  <h4 className="text-[17px] text-[#0A0A0A]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                    {t.name}
                  </h4>
                  <p className="mt-1 text-[13.5px] leading-[1.55] text-[#4B4B4B] font-light" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BackedByBosch = () => {
  const stats = [
    { k: "130+", label: "Years engineering" },
    { k: "400K+", label: "Associates" },
    { k: "60+", label: "Countries" },
    { k: "#1", label: "Auto supplier" },
  ];
  return (
    <section className="bg-[#00162B] text-white" data-testid="backed-by-bosch">
      <div className="tv-container tv-section">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="tv-eyebrow" style={{ color: "#FDB515" }}>
              <span className="text-[#FDB515]">Backed by Bosch</span>
            </span>
            <h2
              className="tv-display mt-6 text-[40px] md:text-[64px] lg:text-[80px] text-white leading-[0.98]"
              style={{ letterSpacing: "-0.035em" }}
            >
              A century-and-a-half of<br />engineering discipline.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[16px] leading-[1.65] text-white/70 font-light" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
              Bosch Global Software Technologies leads the TRUSTED-V initiative,
              bringing automotive-grade rigour, LTS commitments and worldwide
              scale to open RISC-V.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border-y border-white/10">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#00162B] p-8 md:p-10">
              <div className="text-[44px] md:text-[64px] leading-none text-[#FDB515] tracking-[-0.03em]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                {s.k}
              </div>
              <div className="mt-4 text-[11px] font-medium tracking-[0.2em] uppercase text-white/50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="tv-section-tight border-b border-[#E7E5E0]" data-testid="about-cta">
    <div className="tv-container flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
      <h2 className="tv-display text-[36px] md:text-[52px] lg:text-[64px] text-[#0A0A0A] leading-[0.98] max-w-2xl" style={{ letterSpacing: "-0.03em" }}>
        Join the RISC-V decade.
      </h2>
      <div className="flex gap-3">
        <Link to="/contact" className="tv-btn tv-btn-primary" data-testid="about-cta-primary">
          Partner with us <ArrowUpRight className="w-4 h-4" />
        </Link>
        <Link to="/product-suite" className="tv-btn tv-btn-outline" data-testid="about-cta-secondary">
          Explore products
        </Link>
      </div>
    </div>
  </section>
);

export default About;
