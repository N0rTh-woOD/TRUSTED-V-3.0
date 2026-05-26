import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, CheckCircle2,
  Shield, Cpu, Code, Layers, Zap, Lock,
  Award, Globe, Terminal, BadgeCheck
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
      features: ["TRUSTED-V IDE Jarvyn (Community)", "RISC-V Rust SDK access", "Community support", "Basic project templates"],
      cta: "Get Started", link: "/download-ide",
    },
    {
      name: "Pro", tagline: "Professional Teams", price: "Talk to Sales", highlight: true,
      desc: "Full platform access for professional embedded development teams building production RISC-V products.",
      features: ["Full IDE + WebIDE access", "AI-powered code generation", "Priority hardware support", "Advanced debugging tools", "Team collaboration", "Email support"],
      cta: "Talk to Sales", link: "/contact?plan=pro",
    },
    {
      name: "Enterprise", tagline: "Custom Solutions", price: "Talk to Sales", highlight: false,
      desc: "Tailored solutions for enterprises with custom hardware, dedicated support, and SLA guarantees.",
      features: ["Everything in Pro", "Custom IP block integration", "On-premise deployment", "Dedicated account manager", "SLA guarantees", "Custom training"],
      cta: "Talk to Sales", link: "/contact?plan=enterprise",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white" data-testid="hero-section">
        {/* Subtle dotted grid */}
        <div className="absolute inset-0 opacity-[0.45] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)", backgroundSize: "28px 28px", maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)" }} />
        {/* Soft accent halos */}
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] bg-[#003262]/[0.05] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] bg-[#00B4E0]/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-16 lg:pt-20 pb-14 lg:pb-20 relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT — Editorial */}
            <div className="lg:col-span-7">
              {/* Brand + Made-in-India ribbon row */}
              <div className="flex flex-col gap-3 mb-7" data-testid="hero-brand-lockup">
                <TrustedVLogo size="xl" showPoweredBy={true} />
              </div>

              {/* Made-in-India intelligent badge: pill on the side */}
              <div className="inline-flex items-stretch rounded-md overflow-hidden ring-1 ring-slate-200 shadow-sm mb-7" data-testid="hero-made-in-india-badge">
                {/* India flag block */}
                <span className="flex flex-col w-[26px] flex-shrink-0">
                  <span className="block flex-1 bg-[#FF9933]" />
                  <span className="block flex-1 bg-white relative">
                    <span className="absolute inset-0 m-auto w-[10px] h-[10px] rounded-full border border-[#000080]/70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </span>
                  <span className="block flex-1 bg-[#138808]" />
                </span>
                {/* Text */}
                <span className="flex items-center px-3 py-1.5 bg-slate-50">
                  <span className="text-[11px] font-bold text-[#0A2A6B] uppercase tracking-[0.14em] mr-2">Made in India</span>
                  <span className="w-px h-3.5 bg-slate-300 mr-2" />
                  <span className="text-[11px] font-medium text-slate-600 tracking-wide">Engineered by Bosch to the World</span>
                </span>
              </div>

              <h1 className="text-[36px] sm:text-[44px] lg:text-[50px] font-bold tracking-tight mb-6 leading-[1.1]" data-testid="hero-heading">
                <span className="block text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #0A2A6B 0%, #1A4FA8 100%)" }}>
                  Rust-Native{" "}
                  <span className="whitespace-nowrap inline-block" style={{ fontFamily: "'Georgia', serif", fontSize: "0.92em" }}>
                    <span style={{ color: "#0A2A6B" }}>RISC</span><span style={{ color: "#00B4E0" }}>-V</span>
                  </span>
                </span>
                <span className="block text-slate-800">Software Platform</span>
              </h1>

              <p className="text-[16px] sm:text-[17px] leading-[1.75] max-w-2xl text-slate-600 font-normal">
                The world's first vertically integrated <span className="font-semibold text-[#0A2A6B]">RISC-V security platform</span>. Multiple specialised products under one trusted brand &mdash; a Rust-native software &amp; toolchain ecosystem, an AI-powered silicon pipeline, and an independent certification programme &mdash; from requirement to production-ready chip.
              </p>

              {/* Small key-points row */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7" data-testid="hero-keypoints">
                {[
                  { dot: "#0A2A6B", text: "Rust-native security" },
                  { dot: "#00B4E0", text: "RISC-V RV32 & RV64" },
                  { dot: "#FDB515", text: "Independent certification" },
                ].map((kp) => (
                  <span key={kp.text} className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: kp.dot }} />
                    {kp.text}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — TRUSTED-V Certified Chip with hover-to-reveal internal layers */}
            <div className="lg:col-span-5 relative flex items-center justify-center" data-testid="hero-chip-reveal">
              <div className="relative w-full max-w-[460px] group" style={{ aspectRatio: "664 / 768" }}>
                {/* Soft ambient glow */}
                <div className="absolute -inset-6 bg-gradient-to-br from-[#003262]/15 via-[#00B4E0]/10 to-[#FDB515]/15 rounded-[36px] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Stage container */}
                <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#0a1428] ring-1 ring-white/10 shadow-[0_30px_70px_-20px_rgba(0,40,98,0.45)]">
                  {/* Default layer: TRUSTED-V certified chip */}
                  <img
                    src="/chip-trustedv.png"
                    alt="TRUSTED-V Certified Chip"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0 group-hover:scale-[1.08] group-hover:blur-[2px]"
                    data-testid="chip-default-image"
                    draggable={false}
                  />

                  {/* Hover layer: exploded layered architecture */}
                  <img
                    src="/chip-layers.png"
                    alt="TRUSTED-V Internal Layered Architecture"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 scale-[0.94] translate-y-3 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"
                    data-testid="chip-hover-image"
                    draggable={false}
                  />

                  {/* Tech grid overlay (very subtle) */}
                  <div
                    className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(0,180,224,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,180,224,0.6) 1px, transparent 1px)",
                      backgroundSize: "48px 48px",
                    }}
                  />

                  {/* Scan line that sweeps on hover */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00B4E0] to-transparent shadow-[0_0_20px_rgba(0,180,224,0.6)] -top-1 opacity-0 group-hover:opacity-100 group-hover:animate-[scanLine_1.4s_ease-in-out_forwards]" />
                  </div>

                  {/* Corner HUD brackets */}
                  {["top-3 left-3 border-l-2 border-t-2", "top-3 right-3 border-r-2 border-t-2", "bottom-3 left-3 border-l-2 border-b-2", "bottom-3 right-3 border-r-2 border-b-2"].map((pos) => (
                    <span
                      key={pos}
                      className={`absolute ${pos} w-5 h-5 border-[#00B4E0]/60 group-hover:border-[#00B4E0] transition-colors duration-500 pointer-events-none`}
                    />
                  ))}

                  {/* TRUSTED-V Certified badge (top-left) */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-white/40 rounded-full pl-1.5 pr-3 py-1 shadow-lg">
                    <span className="w-5 h-5 rounded-full bg-[#0A2A6B] flex items-center justify-center">
                      <svg viewBox="0 0 12 12" className="w-3 h-3 text-[#00B4E0]" fill="currentColor">
                        <path d="M4.5 9.2L1.8 6.5l1-1L4.5 7.2l4.7-4.7 1 1z" />
                      </svg>
                    </span>
                    <span className="text-[10px] font-bold text-[#0A2A6B] uppercase tracking-[0.12em]">TRUSTED-V Certified</span>
                  </div>

                  {/* Hover hint pill (bottom) — shows label that swaps copy on hover */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-3.5 py-1.5 shadow-lg border border-white/50 flex items-center gap-2 transition-all duration-500 group-hover:bg-[#0A2A6B] group-hover:border-[#00B4E0]/40">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#00B4E0] opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B4E0]" />
                      </span>
                      <span className="text-[11px] font-semibold text-[#0A2A6B] group-hover:text-white tracking-wide transition-colors duration-500">
                        <span className="group-hover:hidden">Hover to inspect inner layers</span>
                        <span className="hidden group-hover:inline">Unified Integrated System &middot; IP to SoC</span>
                      </span>
                    </div>
                  </div>

                  {/* Layer-name pills that float in on hover (top-right) */}
                  <div className="absolute top-16 right-3 flex flex-col gap-1.5 pointer-events-none">
                    {[
                      { name: "Application API", c: "#3B82F6", delay: 0 },
                      { name: "Middleware", c: "#A855F7", delay: 80 },
                      { name: "SoC / Module", c: "#22C55E", delay: 160 },
                      { name: "Discrete Chips", c: "#F59E0B", delay: 240 },
                      { name: "IP Blocks", c: "#94A3B8", delay: 320 },
                    ].map((l) => (
                      <span
                        key={l.name}
                        className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out bg-white/95 backdrop-blur-sm rounded-md px-2 py-0.5 text-[10px] font-bold shadow-md border-l-[3px]"
                        style={{ borderLeftColor: l.c, color: "#0A2A6B", transitionDelay: `${l.delay}ms` }}
                      >
                        {l.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Caption strip below stage */}
                <div className="mt-4 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#003262]">From Silicon to Application</p>
                  <p className="text-[12.5px] text-slate-600 mt-1 font-medium">Every layer engineered, validated, and certified.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ OUR PRODUCTS ══ */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#003262] uppercase tracking-[0.18em]">
              <span className="w-6 h-px bg-[#003262]/40" /> Our Products <span className="w-6 h-px bg-[#003262]/40" />
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4 tracking-tight">A growing portfolio under <span className="text-[#003262]">one trusted brand</span>.</h2>
            <p className="text-slate-600 leading-relaxed">TRUSTED-V brings together specialised products spanning the complete RISC-V journey &mdash; from secure software foundation, to AI-generated silicon, to independent third-party certification.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Software & Toolchain */}
            <RevealItem>
              <div className="bg-white rounded-xl border-2 border-[#003262]/15 p-6 hover:shadow-xl transition-all hover:border-[#003262]/30 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-[#003262]/10 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-[#003262]" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">TRUSTED-V Software &amp; Toolchain</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">A complete Rust-based RISC-V software ecosystem from ROM-resident secure bootloader through a security-hardened RTOS, validation framework, and a full development toolchain.</p>
                <ul className="space-y-2 mb-5 flex-1">
                  {["Rust Software Stack: rBoot, rustBoot, RTOS RV32/64, HAL & Crypto", "Toolchain & IDE: Flash Analyzer, Debugger, Simulator, Compiler", "TRUSTED-V Verified: 5-layer Bronze to Platinum support"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3.5 h-3.5 text-[#003262] mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to="/product-suite" className="inline-flex items-center text-sm font-semibold text-[#003262] hover:underline mt-auto">
                  Explore Software &amp; Toolchain <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </RevealItem>
            {/* SignOff Silicon */}
            <RevealItem delay={100}>
              <div className="bg-white rounded-xl border-2 border-[#0F6E56]/15 p-6 hover:shadow-xl transition-all hover:border-[#0F6E56]/30 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-[#0F6E56]/10 flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-[#0F6E56]" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">SignOff Silicon</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">An AI-powered RISC-V solution platform that converts natural language requirements into production-ready silicon: three engines, a certified Cores Marketplace, and a 7-step chip-to-deployment pipeline.</p>
                <ul className="space-y-2 mb-5 flex-1">
                  {["AI Engine: Core Engine, Chip Engine, Code Engine", "Cores Marketplace: certified RISC-V core catalogue with scoring", "Solution Engine: NL requirement to production-ready chip"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3.5 h-3.5 text-[#0F6E56] mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to="/product-suite" className="inline-flex items-center text-sm font-semibold text-[#0F6E56] hover:underline mt-auto">
                  Explore SignOff Silicon <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </RevealItem>
            {/* TRUSTED Certification */}
            <RevealItem delay={200}>
              <div className="bg-white rounded-xl border-2 border-[#B45309]/15 p-6 hover:shadow-xl transition-all hover:border-[#B45309]/30 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-[#B45309]/10 flex items-center justify-center mb-4">
                  <BadgeCheck className="w-6 h-6 text-[#B45309]" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">TRUSTED Certification</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">An independent, vendor-neutral third-party certification programme for RISC-V silicon, IP, and software stacks &mdash; backed by the TVOTS 5-layer test suite and signed, cryptographically verifiable evidence packages.</p>
                <ul className="space-y-2 mb-5 flex-1">
                  {["TVOTS On-Chip Test Suite: 5-layer Bronze to Platinum grading", "Independent third-party validation & signed certificates", "Public Chip Registry (TVCR) of certified silicon and IP"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3.5 h-3.5 text-[#B45309] mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to="/about" className="inline-flex items-center text-sm font-semibold text-[#B45309] hover:underline mt-auto">
                  Learn about TRUSTED Certification <ArrowRight className="w-4 h-4 ml-1" />
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
              { icon: Zap, title: "48-Hour Certification", desc: "Full TRUSTED-V Verified certification run on real silicon in under 48 hours.", color: "#E65100" },
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
      <section className="py-20 bg-[#0c1020] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-20 right-0 w-[480px] h-[480px] bg-[#003262]/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 w-[420px] h-[420px] bg-[#FDB515]/[0.05] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FDB515] mb-4">
                <span className="w-7 h-px bg-[#FDB515]/60" /> Standards Compliance
              </span>
              <h2 className="text-3xl sm:text-[36px] font-bold text-white tracking-tight leading-[1.15] mb-4">
                Engineered to the world's most demanding security standards.
              </h2>
              <p className="text-[15px] text-slate-300/80 leading-[1.75] font-light mb-6">
                Every TRUSTED-V product is designed, tested, and certified against the global frameworks that regulate safety-critical industries &mdash; from automotive to industrial control to defence.
              </p>
              <div className="flex flex-wrap gap-2 text-[11.5px] text-slate-400">
                <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1">Automotive</span>
                <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1">Industrial</span>
                <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1">IoT</span>
                <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1">Defence</span>
                <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1">Medical</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: "CC EAL4+", desc: "Common Criteria" }, { name: "FIPS 140-3", desc: "Cryptographic Module" },
                { name: "PSA Certified L3", desc: "Platform Security" }, { name: "ISO 26262", desc: "Automotive ASIL-D" },
                { name: "IEC 62443", desc: "Industrial Security" }, { name: "SESIP L3", desc: "IoT Platforms" },
                { name: "NIST SP 800-193", desc: "Firmware Resilience" }, { name: "TCG DICE", desc: "Device Attestation" },
                { name: "SLSA Level 3", desc: "Supply Chain" }, { name: "IEC 61508", desc: "Functional Safety" },
                { name: "ISO/SAE 21434", desc: "Auto Cybersecurity" }, { name: "ETSI EN 303 645", desc: "IoT Consumer" },
              ].map((cert) => (
                <div key={cert.name} className="group bg-white/[0.04] border border-white/10 rounded-lg p-3.5 hover:bg-white/[0.07] hover:border-white/20 transition-all">
                  <div className="text-[13px] font-bold text-white leading-tight">{cert.name}</div>
                  <div className="text-[10.5px] text-slate-400 mt-1">{cert.desc}</div>
                </div>
              ))}
            </div>
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
              { icon: "📱", title: "Consumer Electronics", desc: "Full 5-layer TRUSTED-V Verified path, OTA update security, fast re-certification cycles.", tags: ["ISO/IEC 15408", "ETSI", "OTA Secure"] },
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
              { phase: "Phase 1", subtitle: "Foundation", title: "Build & Certify", items: ["TVOTS v1.0 release (open-source)", "First TRUSTED-V Verified certificate", "Consortium formation & TSC", "TV-STD-001 to 006 published", "Chip Registry (TVCR) live"], active: true },
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
            <p className="text-sm text-slate-400">&copy; 2026 TRUSTED-V. Secure RISC-V Development Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
