import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, CheckCircle2,
  Shield, Cpu, Layers, Zap, Lock,
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
  // Single source of truth — RISC-V IP ecosystem partners (used in hero strip + hero ecosystem card footer)
  const ecosystemPartners = [
    { name: "SiFive",     short: "SiFive",    initials: "SF", grad: "from-[#003262] to-[#1A4FA8]" },
    { name: "Akeana",     short: "Akeana",    initials: "AK", grad: "from-[#0F6E56] to-[#137d63]" },
    { name: "MIPS ARC-V", short: "MIPS",      initials: "M",  grad: "from-[#B45309] to-[#c76a13]" },
    { name: "C-DAC",      short: "C-DAC",     initials: "C",  grad: "from-[#1565C0] to-[#1976d2]" },
    { name: "Mindgrove",  short: "Mindgrove", initials: "MG", grad: "from-[#2E7D32] to-[#388e3c]" },
  ];

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
      {/* ══ HERO — IP · Virtualization · Collaborations ══ */}
      <section className="relative overflow-hidden bg-white" data-testid="hero-section">
        {/* Subtle dotted grid */}
        <div className="absolute inset-0 opacity-[0.45] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)", backgroundSize: "28px 28px", maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)" }} />
        {/* Soft accent halos */}
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] bg-[#003262]/[0.05] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] bg-[#00B4E0]/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-16 lg:pt-20 pb-14 lg:pb-20 relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT — Message */}
            <div className="lg:col-span-7">
              {/* TRUSTED-V logo (compact) */}
              <img
                src="/trustedv-brand-logo.png"
                alt="TRUSTED-V — Powered by Bosch"
                className="h-[88px] sm:h-[100px] lg:h-[112px] w-auto mb-6"
                draggable={false}
                data-testid="hero-logo"
              />

              {/* Made-in-India ribbon */}
              <div className="inline-flex items-stretch rounded-md overflow-hidden ring-1 ring-slate-200 shadow-sm mb-6" data-testid="hero-made-in-india-badge">
                <span className="flex flex-col w-[24px] flex-shrink-0">
                  <span className="block flex-1 bg-[#FF9933]" />
                  <span className="block flex-1 bg-white relative">
                    <span className="absolute inset-0 m-auto w-[9px] h-[9px] rounded-full border border-[#000080]/70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </span>
                  <span className="block flex-1 bg-[#138808]" />
                </span>
                <span className="flex items-center px-3 py-1.5 bg-slate-50">
                  <span className="text-[10.5px] font-bold text-[#0A2A6B] uppercase tracking-[0.14em] mr-2">Made in India</span>
                  <span className="w-px h-3 bg-slate-300 mr-2" />
                  <span className="text-[10.5px] font-medium text-slate-600 tracking-wide">Engineered by Bosch to the World</span>
                </span>
              </div>

              {/* Headline — sharper, IP-first */}
              <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-bold tracking-tight leading-[1.05] mb-5" data-testid="hero-heading">
                <span className="block text-slate-900">The Complete</span>
                <span className="block">
                  <span className="whitespace-nowrap inline-block" style={{ fontFamily: "'Georgia', serif", fontSize: "0.98em" }}>
                    <span style={{ color: "#0A2A6B" }}>RISC</span><span style={{ color: "#00B4E0" }}>-V</span>
                  </span>{" "}
                  <span className="text-[#0A2A6B]">Platform</span>
                </span>
                <span className="block text-slate-800 text-[22px] sm:text-[26px] lg:text-[30px] font-medium mt-3 tracking-[-0.01em]">
                  From <span className="text-[#0A2A6B] font-semibold">IP</span> to <span className="text-[#0A2A6B] font-semibold">Software</span> to <span className="text-[#0A2A6B] font-semibold">Silicon</span>.
                </span>
              </h1>

              {/* Subtitle — IP · Virtualization · Collaboration */}
              <p className="text-[15.5px] sm:text-[17px] leading-[1.7] max-w-2xl text-slate-600 font-normal mb-7" data-testid="hero-subtitle">
                Choose any <span className="font-semibold text-[#0A2A6B]">RISC-V processor IP</span>. <span className="font-semibold text-[#0A2A6B]">Virtualize</span> before silicon exists. Ship <span className="font-semibold text-[#0A2A6B]">secure Rust software</span>. One integrated ecosystem — built with the world&apos;s leading IP vendors.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8" data-testid="hero-cta-row">
                <Link to="/contact">
                  <Button className="h-11 px-6 text-[13.5px] font-semibold bg-[#0A2A6B] hover:bg-[#003262] text-white shadow-sm" data-testid="hero-cta-primary">
                    Talk to Engineers <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/product-suite">
                  <Button variant="outline" className="h-11 px-6 text-[13.5px] font-semibold border-slate-300 text-slate-700 hover:border-[#0A2A6B] hover:text-[#0A2A6B]" data-testid="hero-cta-secondary">
                    Explore the Platform
                  </Button>
                </Link>
              </div>

              {/* RISC-V IP Ecosystem strip — compact partners row */}
              <div className="pt-6 border-t border-slate-200/70" data-testid="hero-partner-strip">
                <div className="flex items-center gap-x-4 gap-y-3 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 whitespace-nowrap">
                    RISC-V IP Ecosystem
                  </span>
                  <div className="flex items-center gap-x-5 gap-y-2 flex-wrap">
                    {ecosystemPartners.map((p) => (
                      <div key={p.name} className="inline-flex items-center gap-1.5" data-testid={`hero-partner-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                        <span className={`w-5 h-5 rounded-[4px] bg-gradient-to-br ${p.grad} flex items-center justify-center text-white text-[8.5px] font-black leading-none`}>{p.initials}</span>
                        <span className="text-[12.5px] font-semibold text-slate-700 tracking-tight">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Ecosystem Stack Card (replaces chip image) */}
            <div className="lg:col-span-5 relative flex items-center justify-center" data-testid="hero-ecosystem-stack">
              <div className="relative w-full max-w-[440px]">
                {/* Ambient halo */}
                <div className="absolute -inset-6 bg-gradient-to-br from-[#003262]/12 via-[#00B4E0]/10 to-[#FDB515]/10 rounded-[36px] blur-2xl opacity-70 pointer-events-none" />

                {/* Main ecosystem card */}
                <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-br from-white to-slate-50/80 border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(10,42,107,0.22)] p-6" data-testid="hero-ecosystem-card">
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#0A2A6B]">TRUSTED-V Platform</div>
                      <div className="text-[13px] font-bold text-slate-800 mt-1 leading-tight">Four pillars. One ecosystem.</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9.5px] font-semibold text-slate-500 uppercase tracking-wider">Live</span>
                    </div>
                  </div>

                  {/* Four pillar stack — Virtualization highlighted */}
                  <div className="space-y-2">
                    {/* Pillar 01 — Development Platform */}
                    <div className="group flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 hover:border-[#003262]/40 hover:shadow-sm transition-all bg-white" data-testid="hero-pillar-dev">
                      <div className="w-9 h-9 rounded-lg bg-[#003262]/10 flex items-center justify-center flex-shrink-0">
                        <Terminal className="w-4 h-4 text-[#003262]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[12px] font-bold text-slate-900 leading-tight">Development Platform</span>
                          <span className="text-[8.5px] font-semibold text-slate-400 uppercase tracking-wider">01</span>
                        </div>
                        <div className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">IDE (Jarvyn) · WebIDE · Debugger</div>
                      </div>
                    </div>

                    {/* Pillar 02 — Virtualization (HIGHLIGHTED) */}
                    <div className="group relative flex items-center gap-3 p-3 rounded-xl border-2 border-[#00B4E0]/40 shadow-[0_4px_20px_-4px_rgba(0,180,224,0.28)] bg-gradient-to-br from-[#00B4E0]/[0.04] to-white" data-testid="hero-pillar-virt">
                      <span className="absolute -top-1.5 -right-1.5 text-[8.5px] font-bold bg-[#00B4E0] text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wider shadow-sm">New</span>
                      <div className="w-9 h-9 rounded-lg bg-[#00B4E0]/15 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-[#00B4E0]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[12px] font-bold text-slate-900 leading-tight">Virtualization &amp; Simulation</span>
                          <span className="text-[8.5px] font-semibold text-[#00B4E0]/80 uppercase tracking-wider">02</span>
                        </div>
                        <div className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">Virtual Platform · RISC-V Hypervisor</div>
                      </div>
                    </div>

                    {/* Pillar 03 — Secure Rust */}
                    <div className="group flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 hover:border-[#0F6E56]/40 hover:shadow-sm transition-all bg-white" data-testid="hero-pillar-rust">
                      <div className="w-9 h-9 rounded-lg bg-[#0F6E56]/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-[#0F6E56]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[12px] font-bold text-slate-900 leading-tight">Secure Rust Software</span>
                          <span className="text-[8.5px] font-semibold text-slate-400 uppercase tracking-wider">03</span>
                        </div>
                        <div className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">rBoot · rustBoot · RTOS · HAL</div>
                      </div>
                    </div>

                    {/* Pillar 04 — Silicon */}
                    <div className="group flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 hover:border-[#B45309]/40 hover:shadow-sm transition-all bg-white" data-testid="hero-pillar-silicon">
                      <div className="w-9 h-9 rounded-lg bg-[#B45309]/10 flex items-center justify-center flex-shrink-0">
                        <BadgeCheck className="w-4 h-4 text-[#B45309]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[12px] font-bold text-slate-900 leading-tight">Silicon SignOff &amp; Trust</span>
                          <span className="text-[8.5px] font-semibold text-slate-400 uppercase tracking-wider">04</span>
                        </div>
                        <div className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">SignOff · TVOTS · Verified</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer — Runs on any RISC-V IP */}
                  <div className="mt-5 pt-4 border-t border-slate-200/70" data-testid="hero-ecosystem-footer">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2.5">Runs on any RISC-V IP</div>
                    <div className="flex items-center gap-x-2.5 gap-y-2 flex-wrap">
                      {ecosystemPartners.map((p) => (
                        <span key={p.name} className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-slate-600">
                          <span className={`w-4 h-4 rounded-[3px] bg-gradient-to-br ${p.grad} flex items-center justify-center text-white text-[7.5px] font-black leading-none`}>{p.initials}</span>
                          {p.short}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating "Build → Deploy" tag below card */}
                <div className="mt-4 flex items-center justify-center gap-x-2 gap-y-1 flex-wrap px-2" data-testid="hero-lifecycle-chip">
                  {["Build", "Virtualize", "Secure", "Validate", "Deploy"].map((step, idx, arr) => (
                    <span key={step} className="inline-flex items-center">
                      <span className="text-[10px] font-bold text-[#0A2A6B] uppercase tracking-[0.14em]">{step}</span>
                      {idx < arr.length - 1 && <ArrowRight className="w-3 h-3 text-slate-300 mx-1.5" />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ RISC-V WITHOUT FRAGMENTATION ══ */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200/60" data-testid="fragmentation-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A2A6B]">
              <span className="w-7 h-px bg-[#0A2A6B]/50" /> RISC-V Without Fragmentation
            </span>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-slate-900 tracking-tight leading-[1.12] mt-3 mb-4">
              RISC-V gives you <span className="text-[#0A2A6B]">freedom</span>. <br className="hidden sm:block" />
              TRUSTED-V gives you <span className="text-[#00B4E0]">continuity</span>.
            </h2>
            <p className="text-[15.5px] sm:text-[16px] text-slate-600 leading-[1.75] font-light">
              The RISC-V ISA is open &mdash; but the ecosystem is fragmented. Every vendor, every custom extension, every RTOS creates a new integration burden. TRUSTED-V is the layer that makes RISC-V easy to consume: one unified development environment across every processor, every SoC, every workload.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "IP Freedom",
                subtitle: "Choose. Never rebuild.",
                desc: "Swap between SiFive, Akeana, MIPS ARC-V or any RVA23-class core — without rebuilding your software workflow. The TRUSTED-V HAL + PAC layer abstracts ISA variants.",
                accent: "#0A2A6B",
                icon: Cpu,
              },
              {
                title: "Hardware Agility",
                subtitle: "Change the CPU. Keep the code.",
                desc: "Change the underlying processor without rewriting drivers, firmware or applications. Your Rust codebase stays portable across the entire RISC-V landscape.",
                accent: "#00B4E0",
                icon: Layers,
              },
              {
                title: "Virtual First. Silicon Ready.",
                subtitle: "Ship before silicon exists.",
                desc: "Develop, test and validate on virtual RISC-V hardware before physical boards or silicon are available. Then transition seamlessly to real chips — zero rework.",
                accent: "#FDB515",
                icon: Zap,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealItem key={item.title} delay={i * 100}>
                  <div className="bg-white rounded-xl border border-slate-200/80 p-6 h-full flex flex-col hover:shadow-lg hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.accent}12` }}>
                        <Icon className="w-5 h-5" style={{ color: item.accent }} />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-slate-900 leading-tight">{item.title}</h3>
                        <p className="text-[11.5px] font-semibold uppercase tracking-[0.1em] mt-0.5" style={{ color: item.accent }}>{item.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-[13.5px] text-slate-600 leading-[1.7] flex-1">{item.desc}</p>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FOUR PILLARS — PRODUCT ARCHITECTURE ══ */}
      <section className="py-20 bg-white relative" data-testid="four-pillars-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#003262] uppercase tracking-[0.18em]">
              <span className="w-6 h-px bg-[#003262]/40" /> The TRUSTED-V Platform <span className="w-6 h-px bg-[#003262]/40" />
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4 tracking-tight">
              One platform. <span className="text-[#003262]">Four pillars.</span> <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}><span style={{ color: "#003262" }}>RISC</span><span style={{ color: "#00B4E0" }}>-V</span></span> unified.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              An integrated ecosystem that connects processor IP, virtualization, secure Rust software, silicon signoff and trusted certification into one continuous development lifecycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 — RISC-V Development Platform */}
            <RevealItem>
              <div className="bg-white rounded-xl border-2 border-[#003262]/15 p-6 hover:shadow-xl transition-all hover:border-[#003262]/35 h-full flex flex-col" data-testid="pillar-development-platform">
                <span className="text-[10px] font-bold text-[#003262] uppercase tracking-[0.18em] mb-3">Pillar 01</span>
                <div className="w-12 h-12 rounded-xl bg-[#003262]/10 flex items-center justify-center mb-4">
                  <Terminal className="w-6 h-6 text-[#003262]" />
                </div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2 leading-tight">RISC-V Development Platform</h3>
                <p className="text-[12.5px] text-slate-500 uppercase tracking-wider font-semibold mb-3">IDE · WebIDE · Debugger</p>
                <p className="text-[13.5px] text-slate-600 leading-[1.65] mb-4">
                  The control-center for RISC-V development. TRUSTED-V IDE (Jarvyn) orchestrates the entire workflow &mdash; from IP selection to production deployment.
                </p>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {["Jarvyn AI code assistant", "Rust Analyzer + toolchain", "Board/SoC selection & flash", "Debugger, profiler, trace viewer"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12px] text-slate-600 leading-snug"><CheckCircle2 className="w-3.5 h-3.5 text-[#003262] mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to="/product-suite" className="inline-flex items-center text-[13px] font-semibold text-[#003262] hover:underline mt-auto">
                  Explore Platform <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </RevealItem>

            {/* Pillar 2 — Virtualization & Simulation (NEW) */}
            <RevealItem delay={100}>
              <div className="bg-white rounded-xl border-2 border-[#00B4E0]/25 p-6 hover:shadow-xl transition-all hover:border-[#00B4E0]/45 h-full flex flex-col relative overflow-hidden" data-testid="pillar-virtualization">
                <span className="absolute top-4 right-4 text-[9px] font-bold bg-[#00B4E0] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                <span className="text-[10px] font-bold text-[#00B4E0] uppercase tracking-[0.18em] mb-3">Pillar 02</span>
                <div className="w-12 h-12 rounded-xl bg-[#00B4E0]/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#00B4E0]" />
                </div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2 leading-tight">Virtualization &amp; Simulation</h3>
                <p className="text-[12.5px] text-slate-500 uppercase tracking-wider font-semibold mb-3">Virtual Platform · Hypervisor</p>
                <p className="text-[13.5px] text-slate-600 leading-[1.65] mb-4">
                  Virtualize RISC-V before you touch silicon. Full CPU, SoC, memory and peripheral models with snapshots, trace, and automated CI test hooks.
                </p>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {["CPU + SoC virtualization", "Virtual peripherals & interrupts", "RISC-V Hypervisor (H-extension)", "Snapshots, trace, CI test runner"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12px] text-slate-600 leading-snug"><CheckCircle2 className="w-3.5 h-3.5 text-[#00B4E0] mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to="/product-suite" className="inline-flex items-center text-[13px] font-semibold text-[#00B4E0] hover:underline mt-auto">
                  Explore Virtualization <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </RevealItem>

            {/* Pillar 3 — Secure Rust Software */}
            <RevealItem delay={200}>
              <div className="bg-white rounded-xl border-2 border-[#0F6E56]/20 p-6 hover:shadow-xl transition-all hover:border-[#0F6E56]/40 h-full flex flex-col" data-testid="pillar-secure-rust">
                <span className="text-[10px] font-bold text-[#0F6E56] uppercase tracking-[0.18em] mb-3">Pillar 03</span>
                <div className="w-12 h-12 rounded-xl bg-[#0F6E56]/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[#0F6E56]" />
                </div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2 leading-tight">Secure Rust Software</h3>
                <p className="text-[12.5px] text-slate-500 uppercase tracking-wider font-semibold mb-3">rBoot · rustBoot · RTOS · HAL</p>
                <p className="text-[13.5px] text-slate-600 leading-[1.65] mb-4">
                  Rust-native. RISC-V-native. Production-ready. Memory-safe foundation from ROM boot through HAL, RTOS, drivers, virtualization and applications.
                </p>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {["rBoot: hardware root of trust", "rustBoot: TEE-ready SBL", "TRUSTED-V RTOS (RV32/64)", "HAL, PAC, HAM & Crypto Stack"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12px] text-slate-600 leading-snug"><CheckCircle2 className="w-3.5 h-3.5 text-[#0F6E56] mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to="/product/secure-boot" className="inline-flex items-center text-[13px] font-semibold text-[#0F6E56] hover:underline mt-auto">
                  Explore Secure Rust <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </RevealItem>

            {/* Pillar 4 — Silicon SignOff & Trust */}
            <RevealItem delay={300}>
              <div className="bg-white rounded-xl border-2 border-[#B45309]/15 p-6 hover:shadow-xl transition-all hover:border-[#B45309]/35 h-full flex flex-col" data-testid="pillar-silicon-signoff">
                <span className="text-[10px] font-bold text-[#B45309] uppercase tracking-[0.18em] mb-3">Pillar 04</span>
                <div className="w-12 h-12 rounded-xl bg-[#B45309]/10 flex items-center justify-center mb-4">
                  <BadgeCheck className="w-6 h-6 text-[#B45309]" />
                </div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2 leading-tight">Silicon SignOff &amp; Trust</h3>
                <p className="text-[12.5px] text-slate-500 uppercase tracking-wider font-semibold mb-3">SignOff · Verified · TVOTS</p>
                <p className="text-[13.5px] text-slate-600 leading-[1.65] mb-4">
                  From architecture requirements to production-ready silicon. Independent, cryptographically-signed certification with 5-layer Bronze&nbsp;→&nbsp;Platinum grading.
                </p>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {["Silicon SignOff: NL → chip pipeline", "TVOTS 5-layer on-chip test suite", "TRUSTED-V Verified certification", "Public Chip Registry (TVCR)"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12px] text-slate-600 leading-snug"><CheckCircle2 className="w-3.5 h-3.5 text-[#B45309] mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to="/about" className="inline-flex items-center text-[13px] font-semibold text-[#B45309] hover:underline mt-auto">
                  Explore Silicon &amp; Trust <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      {/* ══ VIRTUALIZE BEFORE SILICON ══ */}
      <section className="py-16 lg:py-20 bg-[#0c1020] relative overflow-hidden" data-testid="virtualize-first-section">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)" }} />
        <div className="absolute -top-20 right-1/4 w-[420px] h-[420px] bg-[#00B4E0]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-[380px] h-[380px] bg-[#003262]/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#00B4E0] mb-4">
                <span className="w-7 h-px bg-[#00B4E0]/60" /> Virtual First. Silicon Ready.
              </span>
              <h2 className="text-[30px] sm:text-[36px] lg:text-[40px] font-bold text-white tracking-tight leading-[1.12] mb-5">
                Virtualize <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}><span className="text-white">RISC</span><span style={{ color: "#00B4E0" }}>-V</span></span> before you touch silicon.
              </h2>
              <p className="text-[15.5px] text-slate-300/85 leading-[1.75] font-light mb-8 max-w-xl">
                Silicon programs slip because software waits for hardware. TRUSTED-V flips the model: develop, integrate and validate on <span className="text-white font-medium">virtual RISC-V platforms</span> before your first tape-out. Then transition seamlessly to real silicon &mdash; without rework.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-lg mb-8">
                {[
                  { k: "Ship 6–12 months earlier", v: "Parallelize hardware + software" },
                  { k: "Snapshots + trace", v: "Reproduce any bug, any time" },
                  { k: "Automated CI testing", v: "Regression on virtual boards" },
                  { k: "Zero rework transition", v: "Same code — virtual → silicon" },
                ].map((item) => (
                  <div key={item.k} className="bg-white/[0.04] border border-white/10 rounded-lg p-3">
                    <div className="text-[12.5px] font-bold text-white leading-tight">{item.k}</div>
                    <div className="text-[10.5px] text-slate-400 mt-1 leading-snug">{item.v}</div>
                  </div>
                ))}
              </div>
              <Link to="/product-suite">
                <Button className="h-11 px-6 text-[13px] font-semibold bg-[#00B4E0] text-slate-900 hover:bg-[#00c9f5]" data-testid="virtualize-cta">
                  Explore TRUSTED-V Virtual Platform <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Right: virtualization flow diagram */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a1428] to-[#101a35] p-6 backdrop-blur-sm">
                <div className="text-[10px] font-bold text-[#00B4E0] uppercase tracking-[0.2em] mb-4">Virtual First Workflow</div>
                <div className="space-y-3">
                  {[
                    { step: "01", title: "Select RISC-V IP", desc: "SiFive · Akeana · MIPS ARC-V", active: true },
                    { step: "02", title: "Generate Virtual Platform", desc: "CPU + SoC + peripherals model" },
                    { step: "03", title: "Develop Rust Software", desc: "rBoot → RTOS → application" },
                    { step: "04", title: "Validate on Virtual Board", desc: "Trace, snapshot, CI regression" },
                    { step: "05", title: "Silicon Bring-Up", desc: "Same code runs on real chip" },
                    { step: "06", title: "TRUSTED-V Verified", desc: "TVOTS certification & sign-off" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3 group">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-black transition-colors ${s.active ? "bg-[#00B4E0] text-slate-900" : "bg-white/[0.06] text-slate-400 border border-white/10"}`}>
                        {s.step}
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <div className="text-[13px] font-semibold text-white leading-tight">{s.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                Engineered to the world&apos;s most demanding security standards.
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
      
      {/* ══ WHO IS TRUSTED-V FOR ══ */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200/70" data-testid="audiences-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#003262]">
              <span className="w-7 h-px bg-[#003262]/45" /> Who is TRUSTED-V For?
            </span>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-slate-900 tracking-tight leading-[1.12] mt-3 mb-4">
              One platform. <span className="text-[#003262]">Every RISC-V.</span> Every team.
            </h2>
            <p className="text-[15.5px] text-slate-600 leading-[1.75] font-light">
              Whether you are shipping a $2 sensor or a $2,000 data-center accelerator &mdash; TRUSTED-V meets you where you are in the RISC-V journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Developers", desc: "Build RISC-V applications without fighting hardware fragmentation.", accent: "#003262" },
              { title: "Embedded Engineers", desc: "Develop secure Rust firmware across every RISC-V platform.", accent: "#00B4E0" },
              { title: "Silicon Designers", desc: "Select, configure and validate processor & system IP.", accent: "#0F6E56" },
              { title: "IP Vendors", desc: "Deliver RISC-V IP through a standardized development ecosystem.", accent: "#B45309" },
              { title: "OS / RTOS Vendors", desc: "Validate your software across virtual and physical RISC-V platforms.", accent: "#6B3FA0" },
              { title: "AI / Accelerator Developers", desc: "Build scalar, vector and accelerator-based RISC-V workloads.", accent: "#C62828" },
              { title: "OEMs", desc: "Evaluate complete RISC-V platforms before committing to silicon.", accent: "#0071c5" },
              { title: "Enterprises", desc: "Reduce integration risk. Establish a trusted development lifecycle.", accent: "#7B3F00" },
            ].map((aud, i) => (
              <RevealItem key={aud.title} delay={i * 60}>
                <div className="bg-white rounded-lg border border-slate-200/80 p-5 h-full hover:border-slate-300 hover:shadow-md transition-all group" data-testid={`audience-${aud.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-1 h-6 rounded-full transition-all group-hover:h-8" style={{ backgroundColor: aud.accent }} />
                    <h3 className="text-[14.5px] font-bold text-slate-900 leading-tight">{aud.title}</h3>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-[1.65]">{aud.desc}</p>
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
              The Complete <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}><span className="text-white">RISC</span><span style={{ color: "#00B4E0" }}>-V</span></span> Platform. Ready when you are.
            </h2>
            <p className="text-blue-200/85 mb-8 text-base sm:text-lg leading-relaxed">
              From IP selection and virtual prototyping to production silicon and certification &mdash; partner with Bosch to bring trusted RISC-V products to market.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="h-12 px-8 text-base font-semibold bg-white text-[#003262] hover:bg-white/90" data-testid="cta-talk-engineers">
                  Talk to Engineers <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/download-ide">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold border-white/30 text-white hover:bg-white/10" data-testid="cta-download-ide">
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
