import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, CheckCircle2, ChevronRight,
  Shield, Cpu, Code, Layers, Zap, Lock,
  Award, Globe, Terminal
} from "lucide-react";
import TrustedVLogo from "@/components/TrustedVLogo";

const RevealItem = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Landing = () => {
  const pricingTiers = [
    {
      name: "Basic", tagline: "Individual Developer", price: "Free", highlight: false,
      desc: "Community access for individual developers and students exploring RISC-V with Rust.",
      features: ["TRusteD-V IDE Jarvyn (Community)", "RISC-V Rust SDK access", "Community support", "Basic project templates"],
      cta: "Get Started", link: "/download-ide",
    },
    {
      name: "Pro", tagline: "Professional Teams", price: "$499/yr", highlight: true,
      desc: "Full platform access for professional embedded development teams building production RISC-V products.",
      features: ["Full IDE + WebIDE access", "AI-powered code generation", "Priority hardware support", "Advanced debugging tools", "Team collaboration", "Email support"],
      cta: "Start Pro Trial", link: "/contact-sales?plan=pro",
    },
    {
      name: "Enterprise", tagline: "Custom Solutions", price: "Custom", highlight: false,
      desc: "Tailored solutions for enterprises with custom hardware, dedicated support, and SLA guarantees.",
      features: ["Everything in Pro", "Custom IP block integration", "On-premise deployment", "Dedicated account manager", "SLA guarantees", "Custom training"],
      cta: "Contact Sales", link: "/contact-sales?plan=enterprise",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white" data-testid="hero-section">
        {/* Subtle dotted grid */}
        <div className="absolute inset-0 opacity-[0.5] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.07) 1px, transparent 0)", backgroundSize: "28px 28px", maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)" }} />
        {/* Soft accent halo (single, Berkeley Blue) */}
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] bg-[#003262]/[0.06] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-14 lg:pt-16 pb-12 lg:pb-16 relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT — Editorial */}
            <div className="lg:col-span-7">
              <div className="mb-5" data-testid="hero-brand-lockup">
                <TrustedVLogo size="xl" showPoweredBy={true} />
              </div>

              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full pl-1.5 pr-3.5 py-1 mb-5" data-testid="hero-made-in-india-badge">
                <span className="inline-flex items-center gap-px h-4 rounded-full overflow-hidden">
                  <span className="block w-1.5 h-4 bg-[#FF9933]" />
                  <span className="block w-1.5 h-4 bg-white border-y border-slate-200" />
                  <span className="block w-1.5 h-4 bg-[#138808]" />
                </span>
                <span className="text-[11.5px] sm:text-[12px] font-semibold text-slate-700 tracking-wide">Made in India &middot; Engineered by Bosch to the World</span>
              </div>

              <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-bold text-slate-900 tracking-tight mb-5 leading-[1.08]" data-testid="hero-heading">
                Secure{" "}
                <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}>
                  <span style={{ color: "#003262" }}>RISC</span><span style={{ color: "#FDB515" }}>-V</span>
                </span>
                <br className="hidden sm:block" />
                from Silicon to Application
              </h1>

              <p className="text-[15.5px] sm:text-[16.5px] text-slate-600 leading-[1.7] mb-7 max-w-2xl font-light">
                The world's first vertically integrated <span className="font-semibold text-slate-800">RISC-V security platform</span>. Two products under one brand: a Rust-native software &amp; toolchain ecosystem, and an AI-powered silicon pipeline from requirement to production-ready chip.
              </p>

              <div className="flex flex-wrap gap-3 mb-8" data-testid="hero-cta-row">
                <Link to="/product-suite">
                  <Button size="lg" className="group h-11 px-6 text-[14px] font-semibold bg-[#003262] hover:bg-[#002347] text-white rounded-md shadow-[0_8px_24px_-12px_rgba(0,50,98,0.5)] hover:shadow-[0_12px_28px_-12px_rgba(0,50,98,0.65)] transition-all duration-200" data-testid="hero-cta-products">
                    Explore Products
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="h-11 px-6 text-[14px] font-semibold border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 rounded-md transition-all duration-200" data-testid="hero-cta-contact">
                    Talk to Engineers
                  </Button>
                </Link>
                <Link to="/download-ide">
                  <Button variant="ghost" size="lg" className="h-11 px-3 text-[14px] font-semibold text-slate-700 hover:text-[#003262] hover:bg-transparent rounded-md group" data-testid="hero-cta-jarvyn">
                    <Terminal className="w-4 h-4 mr-1.5" /> Download Jarvyn IDE
                    <ChevronRight className="ml-1 w-4 h-4 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </div>

              {/* Stat strip */}
              <div className="grid grid-cols-3 max-w-xl border-y border-slate-200 divide-x divide-slate-200" data-testid="hero-stat-row">
                {[
                  { value: "48 hr", label: "Certification Run" },
                  { value: "5-Layer", label: "TVOTS Grading" },
                  { value: "2 Products", label: "One Trusted Brand" },
                ].map((s) => (
                  <div key={s.label} className="py-3.5 px-3 first:pl-0 last:pr-0">
                    <div className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight">{s.value}</div>
                    <div className="text-[10.5px] uppercase tracking-[0.13em] text-slate-500 mt-0.5 font-semibold">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Visual: Jarvyn IDE Code Preview */}
            <div className="lg:col-span-5 relative" data-testid="hero-code-preview">
              {/* Floating badge top-left */}
              <div className="absolute -top-4 -left-4 sm:-left-6 z-20 bg-white rounded-xl border border-slate-200 shadow-xl px-3.5 py-2.5 flex items-center gap-2.5 hidden sm:flex">
                <div className="w-8 h-8 rounded-lg bg-[#003262]/10 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-[#003262]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ISA</div>
                  <div className="text-[12px] font-bold text-slate-900 -mt-0.5">RV32 / RV64 GC</div>
                </div>
              </div>

              {/* Floating badge bottom-right */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 z-20 bg-white rounded-xl border border-slate-200 shadow-xl px-3.5 py-2.5 flex items-center gap-2.5 hidden sm:flex">
                <div className="w-8 h-8 rounded-lg bg-[#FDB515]/15 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#B45309]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Verified</div>
                  <div className="text-[12px] font-bold text-slate-900 -mt-0.5">CC EAL4+ · PSA L3</div>
                </div>
              </div>

              {/* Code Window */}
              <div className="relative rounded-2xl bg-[#0b1020] border border-slate-200 shadow-[0_30px_60px_-20px_rgba(2,6,23,0.35)] overflow-hidden ring-1 ring-slate-900/5">
                {/* Window chrome */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f1530] border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">main.rs &mdash; Jarvyn IDE</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Live</span>
                  </div>
                </div>
                {/* Code body */}
                <pre className="text-[12.5px] leading-[1.7] font-mono p-5 overflow-hidden text-slate-200 select-none">
<span className="text-slate-500">{`// Boot RISC-V securely from ROM`}</span>{"\n"}
<span className="text-[#c792ea]">use</span> <span className="text-[#82aaff]">trustedv</span>::{`{`}<span className="text-[#ffcb6b]">rboot</span>, <span className="text-[#ffcb6b]">rtos</span>, <span className="text-[#ffcb6b]">crypto</span>{`}`};{"\n\n"}
<span className="text-[#c792ea]">#[</span><span className="text-[#82aaff]">no_std</span><span className="text-[#c792ea]">]</span>{"\n"}
<span className="text-[#c792ea]">#[</span><span className="text-[#82aaff]">entry</span><span className="text-[#c792ea]">]</span>{"\n"}
<span className="text-[#c792ea]">fn</span> <span className="text-[#82aaff]">main</span>() {"->"} ! {`{`}{"\n"}
{"  "}<span className="text-slate-500">{`// Immutable root of trust`}</span>{"\n"}
{"  "}<span className="text-[#c792ea]">let</span> chain = <span className="text-[#ffcb6b]">rboot</span>::<span className="text-[#82aaff]">verify_chain</span>()?;{"\n"}
{"  "}<span className="text-[#ffcb6b]">crypto</span>::<span className="text-[#82aaff]">attest</span>(&amp;chain, <span className="text-[#c3e88d]">"PSA-L3"</span>);{"\n\n"}
{"  "}<span className="text-slate-500">{`// Hand off to hardened RTOS`}</span>{"\n"}
{"  "}<span className="text-[#ffcb6b]">rtos</span>::<span className="text-[#82aaff]">launch</span>(<span className="text-[#82aaff]">App</span>::<span className="text-[#82aaff]">new</span>())<span className="text-[#89ddff]">.</span><span className="text-[#82aaff]">run</span>(){"\n"}
{`}`}
                </pre>
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#0f1530] border-t border-white/5 text-[11px] font-mono">
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#6B9AFF]" />RISC-V RV64GC</span>
                    <span className="text-slate-600">·</span>
                    <span>cargo build --release</span>
                  </div>
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature pills row */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3" data-testid="hero-feature-pills">
            {[
              { icon: Shield, label: "CC EAL4+ / FIPS 140-3", tone: "#003262" },
              { icon: Cpu, label: "RISC-V RV32 & RV64", tone: "#0F6E56" },
              { icon: Lock, label: "Rust Memory Safety", tone: "#B7410E" },
              { icon: Zap, label: "48-hour Certification", tone: "#B45309" },
            ].map((p) => (
              <div key={p.label} className="group flex items-center gap-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg px-3.5 py-3 transition-all hover:shadow-md hover:-translate-y-0.5">
                <span className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${p.tone}12` }}>
                  <p.icon className="w-4 h-4" style={{ color: p.tone }} />
                </span>
                <span className="text-[12.5px] font-semibold text-slate-800 leading-tight">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="border-t border-slate-200/80 bg-slate-50/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Built to global standards</span>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-semibold text-slate-600">
              <span>CC EAL4+</span>
              <span className="text-slate-300">·</span>
              <span>FIPS 140-3</span>
              <span className="text-slate-300">·</span>
              <span>PSA Certified L3</span>
              <span className="text-slate-300">·</span>
              <span>ISO 26262 ASIL-D</span>
              <span className="text-slate-300">·</span>
              <span>IEC 62443</span>
              <span className="text-slate-300">·</span>
              <span>SLSA L3</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TWO PRODUCTS ══ */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#003262] uppercase tracking-[0.18em]">
              <span className="w-6 h-px bg-[#003262]/40" /> Our Products <span className="w-6 h-px bg-[#003262]/40" />
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4 tracking-tight">One brand. <span className="text-[#003262]">Two specialised products.</span></h2>
            <p className="text-slate-600 leading-relaxed">Under TRusteD-V, two distinct products address the complete RISC-V journey: from secure software foundation to AI-generated, production-certified silicon.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Software & Toolchain */}
            <RevealItem>
              <div className="bg-white rounded-xl border-2 border-[#003262]/15 p-6 hover:shadow-xl transition-all hover:border-[#003262]/30 h-full">
                <div className="w-12 h-12 rounded-xl bg-[#003262]/10 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-[#003262]" />
                </div>
                <span className="text-[10px] font-bold text-[#003262] uppercase tracking-wider">Sub-brand 01</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-3">TRusteD-V Software & Toolchain</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">A complete Rust-based RISC-V software ecosystem from ROM-resident secure bootloader through a security-hardened RTOS, validation framework, and a full development toolchain.</p>
                <ul className="space-y-2 mb-5">
                  {["Rust Software Stack: rBoot, rustBoot, RTOS RV32/64, HAL & Crypto", "Toolchain & IDE: Flash Analyzer, Debugger, Simulator, Compiler", "TRusteD-V Verified: 5-layer Bronze to Platinum certification"].map((f, i) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3.5 h-3.5 text-[#003262] mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to="/product-suite" className="inline-flex items-center text-sm font-semibold text-[#003262] hover:underline">
                  Explore Software & Toolchain <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </RevealItem>
            {/* SignOff Silicon */}
            <RevealItem delay={100}>
              <div className="bg-white rounded-xl border-2 border-[#0F6E56]/15 p-6 hover:shadow-xl transition-all hover:border-[#0F6E56]/30 h-full">
                <div className="w-12 h-12 rounded-xl bg-[#0F6E56]/10 flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-[#0F6E56]" />
                </div>
                <span className="text-[10px] font-bold text-[#0F6E56] uppercase tracking-wider">Sub-brand 02</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-3">SignOff Silicon</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">An AI-powered RISC-V solution platform that converts natural language requirements into production-ready silicon: three engines, a certified Cores Marketplace, and a 7-step chip-to-deployment pipeline.</p>
                <ul className="space-y-2 mb-5">
                  {["AI Engine: Core Engine, Chip Engine, Code Engine", "Cores Marketplace: certified RISC-V core catalogue with scoring", "Solution Engine: NL requirement to production-ready chip"].map((f, i) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3.5 h-3.5 text-[#0F6E56] mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to="/product-suite" className="inline-flex items-center text-sm font-semibold text-[#0F6E56] hover:underline">
                  Explore SignOff Silicon <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DELIVER ══ */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Platform Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">Full-stack RISC-V security, delivered</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "Secure Boot Chain", desc: "ROM-resident rBoot + rustBoot: immutable root of trust through multi-stage verified boot.", color: "#003262" },
              { icon: Terminal, title: "Jarvyn IDE", desc: "Purpose-built embedded Rust IDE with native analyzer, SVD visualization, and AI-powered hardware intelligence.", color: "#B7410E" },
              { icon: Award, title: "TVOTS Certification", desc: "5-layer Bronze to Platinum production readiness grading: firmware, silicon, integration, system, deployment.", color: "#0F6E56" },
              { icon: Layers, title: "Security-Hardened RTOS", desc: "Rust-native RTOS for RV32/RV64 with memory isolation, capability-based access, and deterministic scheduling.", color: "#7B3F00" },
              { icon: Cpu, title: "AI Silicon Pipeline", desc: "Three AI engines convert NL requirements into verified SoC designs with automated firmware generation.", color: "#0071c5" },
              { icon: Globe, title: "Cores Marketplace", desc: "Certified RISC-V IP catalogue with trust scoring, compliance badges, and one-click integration.", color: "#6B3FA0" },
              { icon: Lock, title: "Crypto Stack", desc: "Post-quantum ready: ML-KEM, ML-DSA, AES-256-GCM, SHA-3, Ed25519 with hardware acceleration support.", color: "#C62828" },
              { icon: Zap, title: "48-Hour Certification", desc: "Full TRusteD-V Verified certification run on real silicon in under 48 hours.", color: "#E65100" },
            ].map((cap, i) => {
              const Icon = cap.icon;
              return (
                <RevealItem key={i} delay={i * 60}>
                  <div className="bg-white rounded-xl border border-border p-5 hover:shadow-lg transition-all h-full group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors" style={{ backgroundColor: `${cap.color}10` }}>
                      <Icon className="w-5 h-5" style={{ color: cap.color }} />
                    </div>
                    <h4 className="font-bold text-foreground text-sm mb-1.5">{cap.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cap.desc}</p>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ SECURITY CERTIFICATIONS ══ */}
      <section className="py-12 bg-[#0c1020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Security & Standards Compliance</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">Built to the world's most demanding security standards</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { name: "CC EAL4+", desc: "Common Criteria" }, { name: "FIPS 140-3", desc: "Cryptographic Module" },
              { name: "PSA Certified L3", desc: "Platform Security" }, { name: "ISO 26262", desc: "Automotive ASIL-D" },
              { name: "IEC 62443", desc: "Industrial Security" }, { name: "SESIP L3", desc: "IoT Platforms" },
              { name: "NIST SP 800-193", desc: "Firmware Resilience" }, { name: "TCG DICE", desc: "Device Attestation" },
              { name: "SLSA Level 3", desc: "Supply Chain" }, { name: "IEC 61508", desc: "Functional Safety SIL-2" },
            ].map((cert, i) => (
              <div key={cert.name} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center hover:bg-white/10 transition-colors">
                <div className="text-sm font-bold text-white">{cert.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRY VERTICALS ══ */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Industry Focus</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">Trusted in every industry that demands reliability</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: "📡", title: "IoT & Edge", desc: "PSA/SESIP certified, constrained-device optimised, 10+ year lifecycle support with lightweight certification path.", tags: ["PSA L3", "SESIP", "ETSI EN 303 645"] },
              { icon: "🏭", title: "Industrial", desc: "IEC 61508 SIL-2, IEC 62443 cybersecurity, deterministic RTOS, harsh environment characterization and validation.", tags: ["IEC 61508", "IEC 62443", "SIL-2"] },
              { icon: "📱", title: "Consumer Electronics", desc: "Full 5-layer TRusteD-V Verified path, OTA update security, fast re-certification cycles.", tags: ["ISO/IEC 15408", "ETSI", "OTA Secure"] },
            ].map((v, i) => (
              <RevealItem key={v.title} delay={i * 100}>
                <Card className="border-border hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <span className="text-3xl block mb-3">{v.icon}</span>
                    <h3 className="font-bold text-foreground text-base mb-2">{v.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{v.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {v.tags.map((t) => <span key={t} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>)}
                    </div>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BUSINESS PLANS ══ */}
      <section className="py-16 bg-slate-50 border-t border-border" data-testid="pricing-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Licensing & Plans</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">Flexible Plans for Every Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <RevealItem key={tier.name} delay={0}>
                <Card className={`relative overflow-hidden h-full flex flex-col ${tier.highlight ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]" : "border-border hover:shadow-lg"} transition-all`}>
                  {tier.highlight && <div className="h-1.5 bg-gradient-to-r from-primary to-orange-400" />}
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{tier.tagline}</p>
                    </div>
                    <span className="text-2xl font-bold text-foreground mb-4 block">{tier.price}</span>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{tier.desc}</p>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-primary" : "text-green-500"}`} />{f}
                        </li>
                      ))}
                    </ul>
                    <Link to={tier.link}><Button className={`w-full ${tier.highlight ? "" : ""}`} variant={tier.highlight ? "default" : "outline"}>{tier.cta} <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>
      
      {/* ══ STRATEGIC ROADMAP ══ */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Strategic Roadmap</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">Three phases to industry adoption</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { phase: "Phase 1", subtitle: "Foundation", title: "Build & Certify", items: ["TVOTS v1.0 release (open-source)", "First TRusteD-V Verified certificate", "Consortium formation & TSC", "TV-STD-001 to 006 published", "Chip Registry (TVCR) live"], active: true },
              { phase: "Phase 2", subtitle: "Ecosystem Growth", title: "Scale & Expand", items: ["10+ silicon targets certified", "20+ IP blocks certified", "IoT, Industrial, Consumer verticals", "TVOTS v2.0 with AI/ML benchmarks", "10+ Consortium Principal Members"] },
              { phase: "Phase 3", subtitle: "Industry Adoption", title: "Standardize & Lead", items: ["Regulatory recognition", "RISC-V International integration", "Open reference platform", "Procurement framework integrations", "Self-sustaining consortium"] },
            ].map((r, i) => (
              <RevealItem key={r.phase} delay={i * 100}>
                <div className={`rounded-xl border p-6 h-full ${r.active ? "bg-primary/5 border-primary/30" : "bg-slate-50 border-border"}`}>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{r.phase} {r.subtitle}</span>
                  <h3 className="text-lg font-bold text-foreground mt-1 mb-3">{r.title}</h3>
                  <ul className="space-y-2">
                    {r.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${r.active ? "text-primary" : "text-slate-400"}`} />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>
      
      {/* ══ CTA ══ */}
      <section className="py-16 bg-[#003262]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
              Ready to build secure <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}><span className="text-white">RISC</span><span style={{ color: "#FDB515" }}>-V</span></span> systems?
            </h2>
            <p className="text-blue-200/80 mb-8 text-base sm:text-lg leading-relaxed">
              Partner with Bosch to bring certified, production-grade RISC-V products to market.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="h-12 px-8 text-base font-semibold bg-white text-[#003262] hover:bg-white/90">
                  Talk to Engineers <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/download-ide">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold border-white/30 text-white hover:bg-white/10">
                  Download IDE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/product-suite" className="hover:text-white transition-colors">Product Suite</Link></li>
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/download-ide" className="hover:text-white transition-colors">IDE Jarvyn</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Developers</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">Developer Portal</Link></li>
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/webide" className="hover:text-white transition-colors">WebIDE</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/partners" className="hover:text-white transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <TrustedVLogo size="sm" showPoweredBy={true} dark={true} />
            <p className="text-sm text-slate-400">&copy; 2026 TRusteD-V. Secure RISC-V Development Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
