import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield, Zap, Clock, ArrowRight,
} from "lucide-react";
import PageHero, { RiscV } from "@/components/PageHero";

const AnimatedNumber = ({ value, label, color = "#003262" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={ref} className="text-center" data-testid={`bosch-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className={`text-4xl sm:text-[44px] font-bold leading-none mb-1.5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ color }}>{value}</div>
      <div className="text-[12px] text-slate-600 leading-snug max-w-[150px] mx-auto">{label}</div>
    </div>
  );
};

const Eyebrow = ({ children, center = false, color = "#003262" }) => (
  <span className={`inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em] mb-3 ${center ? "justify-center" : ""}`} style={{ color }}>
    <span className="w-6 h-px" style={{ backgroundColor: `${color}66` }} />
    {children}
  </span>
);

const About = () => {
  const pillars = [
    { title: "Security", desc: "Formal-method driven validation at every stack layer. A component that cannot demonstrate security correctness cannot carry the TRUSTED-V Verified mark.", icon: Shield },
    { title: "Performance", desc: "Benchmarked, standardised, reproducible metrics. Every verified platform publishes latency, throughput, and power figures under documented, repeatable conditions.", icon: Zap },
    { title: "Time-to-Market", desc: "Pre-validated stacks, reusable test suites, and AI-powered tooling that measurably reduce time from silicon tape-out to production deployment.", icon: Clock },
  ];

  const gaps = [
    { n: "01", title: "ISA Fragmentation", problem: "The proliferation of custom ISA extensions leads to a fragmented hardware landscape, which hinders software portability and complicates security auditing across the ecosystem.", answer: "TRUSTED-V provides a standardised HAL and PAC layer that abstracts ISA variants, ensuring portable, auditable software across all RISC-V implementations." },
    { n: "02", title: "Lack of a Unified Security Framework", problem: "The absence of a standardised security framework, including a hardware root-of-trust and Trusted Execution Environments (TEEs), creates significant vulnerabilities addressed in more mature architectures.", answer: "TRUSTED-V delivers rBoot (hardware RoT) and rustBoot (TEE-ready SBL), formally aligned to TCG DICE, PSA, and CC EAL4+ from the ground up." },
    { n: "03", title: "Supply Chain and Counterfeit Risks", problem: "The open-source model, while fostering innovation, elevates supply chain risks by enabling less-vetted manufacturers, increasing the potential for counterfeit or tampered hardware to go undetected.", answer: "The TRUSTED-V Verified programme and TVOTS On-Chip Test Suite provide cryptographically signed, independently verifiable proof of silicon authenticity and compliance." },
    { n: "04", title: "Software-Hardware Integration Gaps", problem: "Inconsistent hardware-software interfaces, fragmented toolchains, and opaque firmware result in an expanded attack surface and a higher likelihood of security exploits.", answer: "TRUSTED-V's Hardware Abstraction Map (HAM) and unified toolchain create a coherent, auditable interface between hardware and software at every layer." },
    { n: "05", title: "Lack of Certification Standards", problem: "The absence of a recognised compliance framework impedes RISC-V adoption in safety-critical and regulated markets such as medical, automotive, and defence, which require stringent validation.", answer: "TRUSTED-V Verified is the industry's only RISC-V-native 5-layer certification framework, covering Silicon through Application with Bronze to Platinum grades and signed evidence packages." },
    { n: "06", title: "Barriers to Enterprise Adoption", problem: "Enterprise uptake is significantly hindered by unclear vendor accountability, lack of service-level agreements, and insufficient indemnification, which creates unacceptable business and legal risks.", answer: "Backed by Bosch Global Software Technologies, TRUSTED-V brings enterprise-grade accountability, SLA frameworks, and the legal indemnification large organisations require." },
    { n: "07", title: "Absence of a Standardised Platform Security Layer", problem: "With no equivalent to ARM TrustZone or Intel TXT, each implementer must build their own trust infrastructure from scratch, leading to duplicated effort and inconsistent security baselines.", answer: "TRUSTED-V is the RISC-V equivalent: a defined, open, reusable platform security layer that any silicon vendor or system integrator can adopt instead of reinventing from zero." },
    { n: "08", title: "Fragmented Ecosystem Coordination", problem: "A lack of coordination among stakeholders has resulted in parallel and often incompatible development efforts, duplicated work, and failure to produce a converged, interoperable trust model.", answer: "The TRUSTED-V Consortium provides a vendor-neutral governance body, open standards (TV-STD-001 to 006), and a shared Chip Registry that converges the ecosystem around a single trust baseline." },
  ];

  const roadmap = [
    { phase: "Phase 1 · Foundation", title: "Build the trust infrastructure", desc: "TVOTS v1.0 release, first TRUSTED-V Verified certificate, Consortium formed with TSC governance, all six TV-STD standards published, Chip Registry live.", active: true },
    { phase: "Phase 2 · Ecosystem Growth", title: "Scale across silicon and verticals", desc: "10+ RISC-V silicon targets certified, 20+ IP blocks, IoT / Industrial / Consumer verticals covered, TVOTS v2.0, 10+ Principal Members." },
    { phase: "Phase 3 · Industry Adoption", title: "Become the RISC-V trust standard", desc: "Regulatory recognition, RISC-V International integration, open reference platform, procurement framework integrations, self-sustaining consortium." },
  ];

  const consortium = [
    { dot: "#003262", title: "Founding Members", desc: "Permanent TSC seat, full voting rights, standards authoring, RF IP policy commitment" },
    { dot: "#6B9AFF", title: "Principal Members", desc: "Elected TSC seat, technical contribution, 2-year rotation, directory listing" },
    { dot: "#94a3b8", title: "Associate Members", desc: "Observer status, advisory input, pre-release test suite access" },
    { dot: "#0F6E56", title: "Academic & Research Partners", desc: "Non-commercial TVOTS access, joint publications, formal methods research" },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="about-page">
      {/* ══ HERO ══ */}
      <PageHero
        eyebrow="About Us"
        title={<>Building trust in the <RiscV /> ecosystem.</>}
        subtitle="TRUSTED-V is a Bosch Global Software Technologies initiative providing the secure software infrastructure and AI-powered silicon pipeline the RISC-V industry needs."
        data-testid="about-hero"
      />

      {/* ══ MISSION + PILLARS ══ */}
      <section className="py-20 bg-white" data-testid="about-mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
            <div>
              <Eyebrow>Our Mission</Eyebrow>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight leading-[1.2] mb-4">
                The{" "}
                <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}>
                  <span style={{ color: "#003262" }}>RISC</span><span style={{ color: "#FDB515" }}>-V</span>
                </span>{" "}
                ecosystem's next growth phase is gated by trust &mdash; not silicon capability.
              </h2>
              <p className="text-[15px] text-slate-600 leading-[1.8] font-light mb-5">
                The RISC-V ecosystem is growing rapidly across every vertical from deeply embedded IoT to high-performance computing. Yet the ecosystem operates without a common trust infrastructure. Every silicon vendor, IP licensor, and software team runs ad-hoc tests with no shared baseline.
              </p>
              <p className="text-[15px] text-slate-600 leading-[1.8] font-light">
                Bosch Global Software Technologies is building that infrastructure &mdash; open, vendor-neutral, and purpose-built for the speed and openness of RISC-V. <span className="font-semibold text-[#003262]">TRUSTED-V Software &amp; Toolchain</span> secures the software stack. <span className="font-semibold text-[#0F6E56]">SignOff Silicon</span> automates the silicon pipeline.
              </p>
            </div>

            <div className="space-y-3.5" data-testid="mission-pillars">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="bg-[#003262]/[0.04] border-l-4 border-[#003262] rounded-md p-5 transition-all hover:bg-[#003262]/[0.07]">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Icon className="w-4 h-4 text-[#003262]" />
                      <h4 className="text-[12.5px] font-bold uppercase tracking-wider text-[#003262]">{p.title}</h4>
                    </div>
                    <p className="text-[13px] text-slate-600 leading-[1.65]">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY US — 8 STRUCTURAL GAPS ══ */}
      <section className="pb-20 bg-white" data-testid="about-why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <Eyebrow>Why Us?</Eyebrow>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight leading-[1.2] mb-3">
              The{" "}
              <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}>
                <span style={{ color: "#003262" }}>RISC</span><span style={{ color: "#FDB515" }}>-V</span>
              </span>{" "}
              ecosystem has a trust problem. TRUSTED-V solves it.
            </h2>
            <p className="text-[15.5px] text-slate-600 leading-[1.75] font-light">
              Eight structural gaps in the RISC-V ecosystem today make TRUSTED-V not just useful but essential for any production deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {gaps.map((g) => (
              <div key={g.n} className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 border-l-4 border-l-[#003262] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex gap-4 items-start" data-testid={`gap-card-${g.n}`}>
                <span className="flex-shrink-0 w-8 h-8 rounded-md bg-[#003262]/10 flex items-center justify-center text-[11px] font-bold text-[#003262] tracking-wider">
                  {g.n}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[15px] font-bold text-slate-900 mb-1.5 leading-snug">{g.title}</h4>
                  <p className="text-[13px] text-slate-600 leading-[1.65] mb-3">{g.problem}</p>
                  <div className="text-[12.5px] text-[#002347] bg-[#003262]/[0.06] border-l-[3px] border-[#6B9AFF] rounded-r-md py-2 px-3 leading-[1.6]">
                    {g.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ROADMAP + CONSORTIUM ══ */}
      <section className="py-20 bg-slate-50/70 border-t border-slate-200/80" data-testid="about-roadmap-consortium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Roadmap */}
            <div>
              <Eyebrow>Strategic Roadmap</Eyebrow>
              <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight leading-[1.2] mb-6">From foundation to global standard</h2>
              <div className="pl-6 border-l-2 border-slate-200 space-y-7">
                {roadmap.map((r) => (
                  <div key={r.phase} className="relative" data-testid={`roadmap-${r.phase.split(" ")[1].toLowerCase()}`}>
                    <span className="absolute -left-[2rem] top-1 w-3 h-3 rounded-full border-[3px] border-white shadow-[0_0_0_2px_#003262]" style={{ backgroundColor: r.active ? "#003262" : "#94a3b8", boxShadow: r.active ? "0 0 0 2px #003262" : "0 0 0 2px #cbd5e1" }} />
                    <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#003262] mb-1">{r.phase}</div>
                    <h4 className="text-[15px] font-bold text-slate-900 mb-1.5">{r.title}</h4>
                    <p className="text-[13px] text-slate-600 leading-[1.7]">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Consortium */}
            <div>
              <Eyebrow>Consortium</Eyebrow>
              <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight leading-[1.2] mb-3">TRUSTED-V Consortium</h2>
              <p className="text-[14px] text-slate-600 leading-[1.75] mb-5">
                The formal governing body &mdash; open, membership-based, and vendor-neutral &mdash; responsible for maintaining standards and managing the certification programme.
              </p>
              <div className="space-y-2.5">
                {consortium.map((c) => (
                  <div key={c.title} className="bg-white border border-slate-200 rounded-md py-3.5 px-5 flex gap-3 items-start hover:border-slate-300 transition-colors" data-testid={`consortium-tier-${c.title.split(" ")[0].toLowerCase()}`}>
                    <span className="mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.dot }} />
                    <div className="flex-1">
                      <h5 className="text-[13px] font-bold text-slate-900 mb-0.5">{c.title}</h5>
                      <p className="text-[12px] text-slate-600 leading-snug">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BACKED BY BOSCH ══ */}
      <section className="py-20 bg-white border-t border-slate-200/80" data-testid="about-backed-by-bosch">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow center>Backed by Bosch</Eyebrow>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight leading-[1.2] mb-3">The engineering heritage of a world leader</h2>
          <p className="text-[15.5px] text-slate-600 leading-[1.75] font-light max-w-2xl mx-auto mb-12">
            Bosch Global Software Technologies brings over 130 years of engineering excellence and deep embedded systems expertise to TRUSTED-V.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <AnimatedNumber value="130+" label="Years of engineering excellence" />
            <AnimatedNumber value="60+" label="Countries of global presence" />
            <AnimatedNumber value="400K+" label="Associates worldwide" />
            <AnimatedNumber value="#1" label="Global automotive supplier" />
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 mt-12">
            {["ISO 26262", "IEC 62443", "CC EAL4+", "FIPS 140-3", "Automotive SPICE", "ISO/SAE 21434"].map((cert) => (
              <span key={cert} className="text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5">{cert}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-16 bg-[#003262]" data-testid="about-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to build secure{" "}
            <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}>
              <span className="text-white">RISC</span><span style={{ color: "#FDB515" }}>-V</span>
            </span>{" "}
            systems?
          </h2>
          <p className="text-blue-200/80 mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Partner with Bosch to bring certified, production-grade RISC-V products to market.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact">
              <Button size="lg" className="group h-12 px-7 text-[15px] font-semibold bg-white text-[#003262] hover:bg-white/95 rounded-lg shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-all" data-testid="about-cta-contact">
                Talk to Engineers <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link to="/product-suite">
              <Button size="lg" variant="outline" className="h-12 px-7 text-[15px] font-semibold border-white/30 text-white hover:bg-white/10 hover:border-white/60 rounded-lg transition-all" data-testid="about-cta-products">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
