import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Zap,
  Terminal,
  BadgeCheck,
} from "lucide-react";

// Single source of truth — RISC-V IP ecosystem partners
// Used in the inline hero partner strip AND in the ecosystem-card footer.
const ecosystemPartners = [
  { name: "SiFive",     short: "SiFive",    initials: "SF", grad: "from-[#003262] to-[#1A4FA8]" },
  { name: "Akeana",     short: "Akeana",    initials: "AK", grad: "from-[#0F6E56] to-[#137d63]" },
  { name: "MIPS ARC-V", short: "MIPS",      initials: "M",  grad: "from-[#B45309] to-[#c76a13]" },
  { name: "C-DAC",      short: "C-DAC",     initials: "C",  grad: "from-[#1565C0] to-[#1976d2]" },
  { name: "Mindgrove",  short: "Mindgrove", initials: "MG", grad: "from-[#2E7D32] to-[#388e3c]" },
];

const pillars = [
  {
    id: "dev",
    number: "01",
    title: "Development Platform",
    subtitle: "IDE (Jarvyn) · WebIDE · Debugger",
    icon: Terminal,
    accent: "#003262",
    highlight: false,
  },
  {
    id: "virt",
    number: "02",
    title: "Virtualization & Simulation",
    subtitle: "Virtual Platform · RISC-V Hypervisor",
    icon: Zap,
    accent: "#00B4E0",
    highlight: true, // NEW badge + stronger border/shadow
  },
  {
    id: "rust",
    number: "03",
    title: "Secure Rust Software",
    subtitle: "rBoot · rustBoot · RTOS · HAL",
    icon: Shield,
    accent: "#0F6E56",
    highlight: false,
  },
  {
    id: "silicon",
    number: "04",
    title: "Silicon SignOff & Trust",
    subtitle: "SignOff · TVOTS · Verified",
    icon: BadgeCheck,
    accent: "#B45309",
    highlight: false,
  },
];

const PillarRow = ({ pillar }) => {
  const Icon = pillar.icon;
  if (pillar.highlight) {
    return (
      <div
        className="group relative flex items-center gap-3 p-3 rounded-xl border-2 border-[#00B4E0]/40 shadow-[0_4px_20px_-4px_rgba(0,180,224,0.28)] bg-gradient-to-br from-[#00B4E0]/[0.04] to-white"
        data-testid={`hero-pillar-${pillar.id}`}
      >
        <span className="absolute -top-1.5 -right-1.5 text-[8.5px] font-bold bg-[#00B4E0] text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wider shadow-sm">
          New
        </span>
        <div className="w-9 h-9 rounded-lg bg-[#00B4E0]/15 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-[#00B4E0]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-[12px] font-bold text-slate-900 leading-tight">{pillar.title}</span>
            <span className="text-[8.5px] font-semibold text-[#00B4E0]/80 uppercase tracking-wider">{pillar.number}</span>
          </div>
          <div className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">{pillar.subtitle}</div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="group flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 hover:shadow-sm transition-all bg-white"
      style={{
        // Border tint on hover — matches accent color
        borderColor: undefined,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${pillar.accent}66`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
      data-testid={`hero-pillar-${pillar.id}`}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${pillar.accent}1A` }}
      >
        <Icon className="w-4 h-4" style={{ color: pillar.accent }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[12px] font-bold text-slate-900 leading-tight">{pillar.title}</span>
          <span className="text-[8.5px] font-semibold text-slate-400 uppercase tracking-wider">{pillar.number}</span>
        </div>
        <div className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">{pillar.subtitle}</div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white" data-testid="hero-section">
      {/* Subtle dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }}
      />
      {/* Soft accent halos */}
      <div className="absolute -top-32 -right-32 w-[560px] h-[560px] bg-[#003262]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] bg-[#00B4E0]/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-16 lg:pt-20 pb-14 lg:pb-20 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT — Message */}
          <div className="lg:col-span-7">
            <img
              src="/trustedv-brand-logo.png"
              alt="TRUSTED-V — Powered by Bosch"
              className="h-[88px] sm:h-[100px] lg:h-[112px] w-auto mb-6"
              draggable={false}
              data-testid="hero-logo"
            />

            {/* Made-in-India ribbon */}
            <div
              className="inline-flex items-stretch rounded-md overflow-hidden ring-1 ring-slate-200 shadow-sm mb-6"
              data-testid="hero-made-in-india-badge"
            >
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

            {/* Headline */}
            <h1
              className="text-[34px] sm:text-[44px] lg:text-[52px] font-bold tracking-tight leading-[1.05] mb-5"
              data-testid="hero-heading"
            >
              <span className="block text-slate-900">The Complete</span>
              <span className="block">
                <span
                  className="whitespace-nowrap inline-block"
                  style={{ fontFamily: "'Georgia', serif", fontSize: "0.98em" }}
                >
                  <span style={{ color: "#0A2A6B" }}>RISC</span>
                  <span style={{ color: "#00B4E0" }}>-V</span>
                </span>{" "}
                <span className="text-[#0A2A6B]">Platform</span>
              </span>
              <span className="block text-slate-800 text-[22px] sm:text-[26px] lg:text-[30px] font-medium mt-3 tracking-[-0.01em]">
                From <span className="text-[#0A2A6B] font-semibold">IP</span> to{" "}
                <span className="text-[#0A2A6B] font-semibold">Software</span> to{" "}
                <span className="text-[#0A2A6B] font-semibold">Silicon</span>.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-[15.5px] sm:text-[17px] leading-[1.7] max-w-2xl text-slate-600 font-normal mb-7"
              data-testid="hero-subtitle"
            >
              Choose any <span className="font-semibold text-[#0A2A6B]">RISC-V processor IP</span>.{" "}
              <span className="font-semibold text-[#0A2A6B]">Virtualize</span> before silicon exists. Ship{" "}
              <span className="font-semibold text-[#0A2A6B]">secure Rust software</span>. One integrated ecosystem — built with the world&apos;s leading IP vendors.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8" data-testid="hero-cta-row">
              <Link to="/contact">
                <Button
                  className="h-11 px-6 text-[13.5px] font-semibold bg-[#0A2A6B] hover:bg-[#003262] text-white shadow-sm"
                  data-testid="hero-cta-primary"
                >
                  Talk to Engineers <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/product-suite">
                <Button
                  variant="outline"
                  className="h-11 px-6 text-[13.5px] font-semibold border-slate-300 text-slate-700 hover:border-[#0A2A6B] hover:text-[#0A2A6B]"
                  data-testid="hero-cta-secondary"
                >
                  Explore the Platform
                </Button>
              </Link>
            </div>

            {/* RISC-V IP Ecosystem strip */}
            <div className="pt-6 border-t border-slate-200/70" data-testid="hero-partner-strip">
              <div className="flex items-center gap-x-4 gap-y-3 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 whitespace-nowrap">
                  RISC-V IP Ecosystem
                </span>
                <div className="flex items-center gap-x-5 gap-y-2 flex-wrap">
                  {ecosystemPartners.map((p) => (
                    <div
                      key={p.name}
                      className="inline-flex items-center gap-1.5"
                      data-testid={`hero-partner-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-[4px] bg-gradient-to-br ${p.grad} flex items-center justify-center text-white text-[8.5px] font-black leading-none`}
                      >
                        {p.initials}
                      </span>
                      <span className="text-[12.5px] font-semibold text-slate-700 tracking-tight">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Ecosystem Stack Card */}
          <div
            className="lg:col-span-5 relative flex items-center justify-center"
            data-testid="hero-ecosystem-stack"
          >
            <div className="relative w-full max-w-[440px]">
              {/* Ambient halo */}
              <div className="absolute -inset-6 bg-gradient-to-br from-[#003262]/12 via-[#00B4E0]/10 to-[#FDB515]/10 rounded-[36px] blur-2xl opacity-70 pointer-events-none" />

              {/* Main ecosystem card */}
              <div
                className="relative rounded-[22px] overflow-hidden bg-gradient-to-br from-white to-slate-50/80 border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(10,42,107,0.22)] p-6"
                data-testid="hero-ecosystem-card"
              >
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

                {/* Four pillar stack */}
                <div className="space-y-2">
                  {pillars.map((p) => (
                    <PillarRow key={p.id} pillar={p} />
                  ))}
                </div>

                {/* Footer — Runs on any RISC-V IP */}
                <div className="mt-5 pt-4 border-t border-slate-200/70" data-testid="hero-ecosystem-footer">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2.5">Runs on any RISC-V IP</div>
                  <div className="flex items-center gap-x-2.5 gap-y-2 flex-wrap">
                    {ecosystemPartners.map((p) => (
                      <span
                        key={p.name}
                        className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-slate-600"
                      >
                        <span
                          className={`w-4 h-4 rounded-[3px] bg-gradient-to-br ${p.grad} flex items-center justify-center text-white text-[7.5px] font-black leading-none`}
                        >
                          {p.initials}
                        </span>
                        {p.short}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating "Build → Deploy" tag below card */}
              <div
                className="mt-4 flex items-center justify-center gap-x-2 gap-y-1 flex-wrap px-2"
                data-testid="hero-lifecycle-chip"
              >
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
  );
};

export default HeroSection;
