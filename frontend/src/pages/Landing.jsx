import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cpu, Zap, Code, Package, Layers, Download, ArrowRight, 
  CheckCircle2, Shield, Lock, Gauge, ChevronRight,
  Cog, Binary, GitBranch, Rocket, Wrench, CircuitBoard,
  Radio, FlaskConical, Flame, BarChart3, Server
} from "lucide-react";
import TrustedVLogo from "@/components/TrustedVLogo";
import { PartnerLogo } from "@/components/PartnerLogos";

const AnimatedCounter = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 40;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-bold text-primary">{count}{suffix}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

const RevealItem = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ── TrusteD-V Engine — Compact Architecture Card ── */
const engineLayers = [
  {
    name: "Application API",
    engine: "Code Engine",
    engineColor: "#B7410E",
    bg: "bg-blue-500",
    bgLight: "bg-blue-50",
    border: "border-blue-300",
    textColor: "text-blue-700",
    chips: ["REST", "SDK", "MQTT", "OTA"],
    chipBg: "bg-blue-600",
  },
  {
    name: "Middleware",
    engine: "Code Engine",
    engineColor: "#B7410E",
    bg: "bg-violet-500",
    bgLight: "bg-violet-50",
    border: "border-violet-300",
    textColor: "text-violet-700",
    chips: ["RTOS", "HAL", "Drivers", "Protocols"],
    chipBg: "bg-violet-600",
  },
  {
    name: "SoC / Module",
    engine: "Chip Engine",
    engineColor: "#0071c5",
    bg: "bg-green-500",
    bgLight: "bg-green-50",
    border: "border-green-300",
    textColor: "text-green-700",
    chips: ["CPU", "MEM", "WiFi", "SEC"],
    chipBg: "bg-green-600",
  },
  {
    name: "Discrete Chips",
    engine: "Chip Engine",
    engineColor: "#0071c5",
    bg: "bg-amber-500",
    bgLight: "bg-amber-50",
    border: "border-amber-300",
    textColor: "text-amber-700",
    chips: ["RISC-V", "Memory", "NPU"],
    chipBg: "bg-amber-600",
  },
  {
    name: "IP Blocks",
    engine: "Core Engine",
    engineColor: "#7B3F00",
    bg: "bg-stone-400",
    bgLight: "bg-stone-50",
    border: "border-stone-300",
    textColor: "text-stone-600",
    chips: ["Ibex", "OpenTitan", "DMA", "GPIO"],
    chipBg: "bg-stone-500",
  },
];

const EngineArchCard = () => {
  const [hoveredLayer, setHoveredLayer] = useState(null);
  
  return (
    <div data-testid="engine-arch-diagram" className="w-full rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 text-center border-b border-slate-100">
        <h3 className="text-lg font-extrabold tracking-tight">
          <span className="text-foreground">T</span>
          <span className="text-[#B7410E]">rust</span>
          <span className="text-foreground">eD</span>
          <span className="text-[#C8A200]">-V</span>
          <span className="text-[#2E7D32]"> Engine</span>
        </h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">Three AI agents — silicon to application</p>
      </div>
      
      {/* Layers Stack */}
      <div className="px-4 py-4 space-y-1.5">
        {engineLayers.map((layer, i) => {
          const isFirst = i === 0;
          const showEngineBadge = i === 0 || layer.engine !== engineLayers[i - 1].engine;
          return (
            <div key={layer.name}>
              {showEngineBadge && (
                <div className="flex items-center gap-1.5 mb-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.engineColor }} />
                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: layer.engineColor }}>{layer.engine}</span>
                </div>
              )}
              <div
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg ${layer.bgLight} ${layer.border} border cursor-default transition-all duration-200 hover:shadow-md`}
                onMouseEnter={() => setHoveredLayer(i)}
                onMouseLeave={() => setHoveredLayer(null)}
              >
                {/* Color accent bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${layer.bg}`} />
                
                {/* Layer name */}
                <div className={`text-xs font-bold ${layer.textColor} min-w-[90px] pl-2`}>{layer.name}</div>
                
                {/* Chips */}
                <div className="flex flex-wrap gap-1 flex-1">
                  {layer.chips.map((chip) => (
                    <span key={chip} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${layer.chipBg} text-white`}>
                      {chip}
                    </span>
                  ))}
                </div>
                
                {/* Arrow connector */}
                {!isFirst && (
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
                    <ChevronRight className="w-3 h-3 text-slate-300 rotate-[-90deg]" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Engine Legend + Exhaust gradient */}
      <div className="px-4 pb-2">
        <div className="flex justify-center gap-4 py-2 flex-wrap">
          {[
            { name: "Core Engine", color: "#7B3F00", sub: "IP Blocks" },
            { name: "Chip Engine", color: "#0071c5", sub: "SoC + Chips" },
            { name: "Code Engine", color: "#B7410E", sub: "Firmware + API" },
          ].map((e) => (
            <div key={e.name} className="flex items-center gap-1 text-[9px]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }} />
              <span className="font-bold" style={{ color: e.color }}>{e.name}</span>
              <span className="text-muted-foreground">{e.sub}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom exhaust glow */}
      <div className="h-1.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60" />
    </div>
  );
};

/* ── 7-Stage Build Simulation ── */
const simulationStages = [
  {
    num: 1, title: "Requirement", badge: "Input", 
    color: "#111", badgeBg: "#111", badgeText: "#fff",
    icon: Wrench, 
    desc: "Natural language mission input parsed by TrusteD-V Engine to identify domain, constraints, and target architecture.",
    details: ["Mission specification", "Domain detection", "Architecture selection"]
  },
  {
    num: 2, title: "Requirement Decomposition", badge: "Analysis",
    color: "#5F5E5A", badgeBg: "#F1EFE8", badgeText: "#444",
    icon: Layers,
    desc: "Requirements broken into functional blocks — Sensing, Compute, Power, Security — mapped to hardware and software needs.",
    details: ["Sensing & I/O mapping", "Compute & NPU allocation", "Security requirements"]
  },
  {
    num: 3, title: "Core Engine — IP Accumulation", badge: "Core Engine",
    color: "#7B3F00", badgeBg: "#7B3F00", badgeText: "#FEF9F2",
    icon: CircuitBoard,
    desc: "Open-source and commercial IPs selected, verified, and composed into the RISC-V architecture.",
    chips: ["Ibex RV32IMC", "OpenTitan", "NPU IP", "AES-256", "DMA ctrl", "UART/SPI/I2C"],
    progress: [{ label: "Open IP", pct: 78, color: "#EF9F27" }, { label: "Custom IP", pct: 22, color: "#BA7517" }]
  },
  {
    num: 4, title: "Chip Engine — SoC Integration", badge: "Chip Engine",
    color: "#0071c5", badgeBg: "#0071c5", badgeText: "#fff",
    icon: Cpu,
    desc: "IPs fused into chips, unified into SoC with AXI bus fabric. PCB designed and BOM finalized.",
    details: ["RISC-V SoC unified", "RF chip (LoRa+UHF)", "Memory map locked", "PCB + BOM ready"]
  },
  {
    num: 5, title: "Code Engine — Firmware & API", badge: "Code Engine",
    color: "#B7410E", badgeBg: "#B7410E", badgeText: "#fff",
    icon: Code,
    desc: "Rust firmware auto-generated from hardware abstraction map. Full middleware and application API stack built.",
    progress: [
      { label: "Firmware", pct: 100, color: "#B7410E" }, 
      { label: "Middleware", pct: 100, color: "#D85A30" }, 
      { label: "APIs", pct: 100, color: "#F0997B" }
    ]
  },
  {
    num: 6, title: "Simulation & Testing", badge: "Verification",
    color: "#0F6E56", badgeBg: "#0F6E56", badgeText: "#E1F5EE",
    icon: FlaskConical,
    desc: "Hardware and software tested together in a closed-loop simulation environment before tape-out.",
    progress: [
      { label: "HW sim", pct: 100, color: "#0F6E56" },
      { label: "SW sim", pct: 98, color: "#1D9E75" },
      { label: "Coverage", pct: 98, color: "#5DCAA5" }
    ]
  },
  {
    num: 7, title: "Production Ready", badge: "Launch",
    color: "#2E7D32", badgeBg: "#2E7D32", badgeText: "#fff",
    icon: Rocket,
    desc: "Verified, validated, and cleared for production deployment. Complete bill of materials and manufacturing files ready.",
    summary: ["10 IP blocks", "3 chips", "SoC unified", "RTOS+HAL", "All tests pass"]
  },
];

const Landing = () => {
  const rustBenefits = [
    { title: "Memory Safety", description: "Eliminates buffer overflows, null pointer dereferences, and data races at compile time" },
    { title: "Zero-Cost Abstractions", description: "High-level features compile to efficient machine code with no runtime overhead" },
    { title: "Fearless Concurrency", description: "Ownership system prevents data races, enabling safe multi-threaded embedded code" },
    { title: "No Garbage Collection", description: "Deterministic memory management perfect for real-time embedded systems" },
  ];

  const riscvRustBenefits = [
    { icon: Shield, title: "Secure by Default", description: "Rust's memory safety combined with RISC-V's hardware security extensions creates a robust security foundation." },
    { icon: Gauge, title: "Optimal Performance", description: "RISC-V's clean ISA pairs with Rust's zero-cost abstractions for maximum efficiency on constrained devices." },
    { icon: Code, title: "Modern Toolchain", description: "Cargo build system, integrated testing, and LLVM support for RISC-V targets accelerate development." },
    { icon: GitBranch, title: "Open Ecosystem", description: "Both RISC-V and Rust are open-source, vendor-neutral technologies ensuring long-term sustainability." },
  ];

  const features = [
    { icon: Shield, title: "Secure Boot & TEE", description: "Hardware root of trust with verified boot chain via rboot/rustBoot, TPM integration, and trusted execution." },
    { icon: Cpu, title: "RISC-V Optimized Compilers", description: "State-of-the-art Rust toolchain with Pliron & Cranelift backends optimized for RISC-V targets." },
    { icon: Zap, title: "AI-Powered IDE — Jarvyn", description: "Context-aware code generation, debugging, hardware-aware suggestions, and one-click flashing." },
    { icon: Layers, title: "Comprehensive SDK", description: "Pre-integrated SDKs for heterogeneous chips including RISC-V cores, TPUs, and NPUs." },
    { icon: Cog, title: "RTOS Integration", description: "FreeRTOS, Zephyr, Embassy — with TrusteD-V RTOS benchmarks showing 9x faster context switching." },
    { icon: Lock, title: "Crypto Stack", description: "Native AES-256, RSA, ECC, SHA-3, and post-quantum cryptography support for embedded security." },
  ];

  const hardwarePartners = [
    { name: "C-DAC", description: "VEGA Processors" },
    { name: "C-DAC", description: "DHRUV64 SoCs" },
    { name: "Mindgrove", description: "Secure IoT" },
    { name: "Mindgrove", description: "Vision SoCs" },
    { name: "Upbeat Tech", description: "Edge AI" },
    { name: "C-DAC", description: "ARIES Boards" },
  ];

  const pricingTiers = [
    {
      name: "Basic",
      tagline: "Platform Access",
      price: "Per-core / Annual",
      desc: "Core platform access for individual developers and small teams. RISC-V Rust software, toolchain, and IDE with annual or per-core licensing.",
      features: [
        "TrusteD-V IDE — Jarvyn (Community)",
        "RISC-V Rust SDK access",
        "Community support",
        "Standard BSP templates",
        "Public documentation",
      ],
      cta: "Get Started",
      link: "/download-ide",
      highlight: false,
    },
    {
      name: "Pro",
      tagline: "Advanced Tools + Support",
      price: "Per-project / Annual",
      desc: "Advanced toolchain, priority support, and extended middleware. Per-project or annual licensing with engineering services and marketplace access.",
      features: [
        "Everything in Basic",
        "Jarvyn AI code assistant (Full)",
        "RTOS integration suite",
        "Secure Boot configuration tool",
        "Priority engineering support",
        "Marketplace access (per-device)",
        "Hardware simulation environment",
      ],
      cta: "Talk to Sales",
      link: "/contact-sales?plan=pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      tagline: "Customization + SLA",
      price: "Custom / SLA",
      desc: "Full customization, dedicated professional services, integration support, and SLA-backed guarantees for production deployments.",
      features: [
        "Everything in Pro",
        "Custom BSP development",
        "Dedicated security audit",
        "On-premise deployment option",
        "SLA-backed support (99.9%)",
        "White-label IDE option",
        "Hardware partner integration",
        "Compliance certification support",
      ],
      cta: "Contact Enterprise",
      link: "/contact-sales?plan=enterprise",
      highlight: false,
    },
  ];

  const archLayers = [
    { label: "Application Layer", color: "primary", items: ["Jarvyn AI", "IDE", "Project Manager"] },
    { label: "Rust SDK & Middleware", color: "orange", items: ["Embassy", "RTIC", "embedded-hal", "Drivers"] },
    { label: "Secure Foundation", color: "green", items: ["Secure Boot", "Trusted HAL", "HSM", "TEE"] },
    { label: "RISC-V Hardware", color: "blue", items: ["C-DAC VEGA", "Mindgrove", "Upbeat Tech", "DHRUV64"] },
  ];

  const archColorMap = {
    primary: "bg-primary/20",
    orange: "bg-orange-500/20",
    green: "bg-green-500/20",
    blue: "bg-blue-500/20",
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* ══ HERO SECTION ══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-12 md:py-16 relative">
          {/* Top: Branding + message row */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-12">
            <div>
              <div className="mb-6">
                <TrustedVLogo size="xl" />
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-sm font-bold text-orange-600">Rust</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-bold text-primary">RISC-V</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span className="text-sm font-bold text-green-600">Secure</span>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-5 leading-tight">
                Build Secure <span className="text-primary">RISC-V</span> Systems with <span className="text-orange-500">Rust</span>
              </h1>
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
                The silicon-to-application platform for RISC-V embedded development. 
                Three AI engines — from IP blocks to production firmware — everything powered by <strong>Rust</strong>.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/download-ide">
                  <Button data-testid="start-building-btn" size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    Download IDE <Download className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/developer-portal">
                  <Button data-testid="explore-portal-btn" variant="outline" size="lg" className="h-12 px-8 text-base font-semibold">
                    Developer Portal
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-4 gap-6 pt-6 border-t border-border">
                <AnimatedCounter end={6} suffix="+" label="RISC-V Boards" />
                <AnimatedCounter end={5} suffix="+" label="RTOS Options" />
                <AnimatedCounter end={15} suffix="" label="Team Members" />
                <AnimatedCounter end={3} suffix="" label="Hardware Partners" />
              </div>
            </div>
            
            {/* Engine Preview on large screens */}
            <div className="hidden lg:flex items-start justify-center">
              <div className="w-full max-w-[440px]">
                <EngineArchCard />
              </div>
            </div>
          </div>
          
          {/* Mobile: show engine below on smaller screens */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="w-full max-w-[400px]">
              <EngineArchCard />
            </div>
          </div>
        </div>
      </section>

      {/* ══ MADE IN INDIA — Single prominent placement ══ */}
      <section data-testid="made-in-india-badge" className="relative overflow-hidden">
        <div className="h-[3px] flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>
        <div className="bg-gradient-to-r from-[#FF9933]/[0.04] via-white to-[#138808]/[0.04] py-4">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4">
            <div className="flex flex-col gap-0 w-8 h-[22px] rounded-[3px] overflow-hidden shadow-sm flex-shrink-0 border border-slate-200/50">
              <div className="flex-1 bg-[#FF9933]" />
              <div className="flex-1 bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[7px] h-[7px] rounded-full border-[1.5px] border-[#000080]" />
                </div>
              </div>
              <div className="flex-1 bg-[#138808]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-bold text-slate-800 tracking-wide">Made in India</span>
              <span className="hidden sm:inline text-xs text-slate-400 font-medium">|</span>
              <span className="hidden sm:inline text-xs text-slate-500 font-medium">Engineered for the world</span>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </section>

      {/* ══ 7-STAGE BUILD SIMULATION ══ */}
      <section className="py-20 bg-white border-t border-border overflow-hidden" data-testid="simulation-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">TrusteD-V Engine</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Requirement <span className="text-muted-foreground font-normal mx-1">&rarr;</span> IP <span className="text-muted-foreground font-normal mx-1">&rarr;</span> Chips <span className="text-muted-foreground font-normal mx-1">&rarr;</span> SoC <span className="text-muted-foreground font-normal mx-1">&rarr;</span> Firmware <span className="text-muted-foreground font-normal mx-1">&rarr;</span> Sim <span className="text-muted-foreground font-normal mx-1">&rarr;</span> Launch
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              See the complete build pipeline — from a natural-language requirement to production-ready hardware and firmware.
            </p>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Connecting line */}
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-slate-200 via-slate-300 to-green-300 hidden md:block" />
            
            <div className="space-y-6">
              {simulationStages.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <RevealItem key={i} delay={i * 100}>
                    <div className="flex gap-4 md:gap-6 items-start relative" data-testid={`sim-stage-${stage.num}`}>
                      {/* Step circle */}
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-2"
                        style={{ backgroundColor: `${stage.color}10`, borderColor: stage.color }}
                      >
                        <Icon className="w-6 h-6" style={{ color: stage.color }} />
                        <span 
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center border-2 border-white"
                          style={{ backgroundColor: stage.color, color: "#fff" }}
                        >
                          {stage.num}
                        </span>
                      </div>
                      
                      {/* Card */}
                      <div 
                        className="flex-1 rounded-xl border bg-white p-4 hover:shadow-md transition-shadow"
                        style={{ borderColor: `${stage.color}30` }}
                      >
                        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                          <h4 className="font-bold text-sm text-foreground">{stage.title}</h4>
                          <span 
                            className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: stage.badgeBg, color: stage.badgeText }}
                          >
                            {stage.badge}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2">{stage.desc}</p>
                        
                        {/* Chips */}
                        {stage.chips && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {stage.chips.map((chip, j) => (
                              <span 
                                key={j} 
                                className="text-[10px] font-semibold px-2 py-0.5 rounded border"
                                style={{ 
                                  backgroundColor: `${stage.color}08`, 
                                  borderColor: `${stage.color}30`, 
                                  color: stage.color 
                                }}
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Details list */}
                        {stage.details && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                            {stage.details.map((d, j) => (
                              <span key={j} className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-current" />
                                {d}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Progress bars */}
                        {stage.progress && (
                          <div className="space-y-1.5 mt-3">
                            {stage.progress.map((p, j) => (
                              <div key={j} className="flex items-center gap-2">
                                <span className="text-[9px] font-medium text-muted-foreground w-16 text-right">{p.label}</span>
                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${p.pct}%`, backgroundColor: p.color }}
                                  />
                                </div>
                                <span className="text-[9px] font-medium w-8" style={{ color: p.color }}>
                                  {p.pct === 100 ? "PASS" : `${p.pct}%`}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Summary chips for launch */}
                        {stage.summary && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {stage.summary.map((s, j) => (
                              <span 
                                key={j} 
                                className="text-[9px] font-bold px-2 py-1 rounded-md border"
                                style={{ 
                                  backgroundColor: `${stage.color}10`, 
                                  borderColor: `${stage.color}30`,
                                  color: stage.color 
                                }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </div>
            
            {/* Engine legend */}
            <div className="flex justify-center gap-6 mt-10 flex-wrap">
              {[
                { name: "Core Engine", color: "#7B3F00", sub: "IP blocks" },
                { name: "Chip Engine", color: "#0071c5", sub: "SoC + chips" },
                { name: "Code Engine", color: "#B7410E", sub: "Firmware + API" },
                { name: "Verification", color: "#0F6E56", sub: "HW + SW sim" },
              ].map((e, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                  <span className="font-bold" style={{ color: e.color }}>{e.name}</span>
                  <span className="text-muted-foreground">{e.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY RUST ══ */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white border-t border-orange-100">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
              <span className="text-lg font-bold text-orange-600">Rust</span>
              <span className="text-sm text-orange-600/80">Programming Language</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Why <span className="text-orange-500">Rust</span> for Embedded Systems?
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              Rust provides memory safety without garbage collection, making it the perfect language 
              for secure, high-performance embedded development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rustBenefits.map((benefit, index) => (
              <RevealItem key={index} delay={index * 120}>
                <Card className="bg-white border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-5 h-5 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RISC-V x RUST ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">RISC-V</span>
                </div>
                <span className="text-2xl font-light text-muted-foreground">x</span>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                  <span className="text-sm font-bold text-orange-500">Rust</span>
                </div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
                The Perfect Combination for Secure Embedded Systems
              </h2>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                RISC-V's open, extensible architecture combined with Rust's memory safety creates 
                the most secure and efficient foundation for modern embedded development.
              </p>
              
              <div className="space-y-6">
                {riscvRustBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <RevealItem key={index} delay={index * 250}>
                      <div className="flex gap-4 group">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                          <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
                        </div>
                      </div>
                    </RevealItem>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-8 text-white shadow-2xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Binary className="w-5 h-5 text-[#6b9aff]" />
                Platform Architecture
              </h3>
              <div className="space-y-4">
                {archLayers.map((layer, i) => (
                  <RevealItem key={i} delay={i * 200}>
                    <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600 transition-colors">
                      <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider">{layer.label}</div>
                      <div className="flex flex-wrap gap-2">
                        {layer.items.map((item) => (
                          <span key={item} className={`px-2.5 py-1 ${archColorMap[layer.color]} rounded-md text-xs font-medium text-white`}>{item}</span>
                        ))}
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ══ PLATFORM CAPABILITIES ══ */}
      <section className="py-20 bg-slate-50 border-t border-border">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Platform Capabilities</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Complete Development Ecosystem
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need for secure RISC-V embedded development with Rust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <RevealItem key={index} delay={index * 100}>
                  <Card data-testid={`feature-card-${index}`} className="bg-white border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 text-lg">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </RevealItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ BUSINESS PLANS ══ */}
      <section className="py-20 bg-white border-t border-border" data-testid="pricing-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Licensing & Plans</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Flexible Plans for Every Team
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              From individual developers to enterprise deployments — choose the plan that scales with your RISC-V projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <RevealItem key={index} delay={index * 150}>
                <Card 
                  data-testid={`pricing-tier-${tier.name.toLowerCase()}`}
                  className={`relative overflow-hidden h-full flex flex-col ${
                    tier.highlight 
                      ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]" 
                      : "border-border hover:shadow-lg"
                  } transition-all duration-300`}
                >
                  {tier.highlight && <div className="h-1.5 bg-gradient-to-r from-primary to-orange-400" />}
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{tier.tagline}</p>
                    </div>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-foreground">{tier.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{tier.desc}</p>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {tier.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-primary" : "text-green-500"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link to={tier.link}>
                      <Button 
                        className={`w-full ${tier.highlight ? "bg-primary text-white hover:bg-primary/90" : ""}`}
                        variant={tier.highlight ? "default" : "outline"}
                      >
                        {tier.cta} <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-xs text-muted-foreground">
              4 revenue streams: RISC-V Software & Toolchain (annual/per-core), Engineering Services (custom dev), Marketplace Platform (per-device/per-deployment), Professional Services (integration & support).
            </p>
          </div>
        </div>
      </section>
      
      {/* ══ HARDWARE PARTNERS ══ */}
      <section className="py-20 bg-slate-50 border-t border-border">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Hardware Ecosystem</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Supported <span className="text-primary">RISC-V</span> Hardware
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pre-integrated support for C-DAC, Mindgrove, and Upbeat Tech RISC-V development platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {hardwarePartners.map((partner, index) => (
              <RevealItem key={index} delay={index * 80}>
                <div className="bg-white rounded-lg border border-border p-5 text-center hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-3">
                    <PartnerLogo name={partner.name} className="h-6" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{partner.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{partner.description}</p>
                </div>
              </RevealItem>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/marketplace">
              <Button variant="outline" className="font-medium">
                View Full Marketplace <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* ══ CTA ══ */}
      <section className="py-20 bg-primary">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Secure Embedded Systems with <span className="text-orange-300">Rust</span>?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-base sm:text-lg leading-relaxed">
              Start your RISC-V journey today with TrusteD-V IDE — Jarvyn, AI-powered tools, and production-ready Rust templates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/download-ide">
                <Button data-testid="get-started-cta-btn" size="lg" className="h-12 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90">
                  Download IDE <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/partner-registration">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold border-white/30 text-white hover:bg-white/10">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/product-suite" className="hover:text-white transition-colors">Product Suite</Link></li>
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/download-ide" className="hover:text-white transition-colors">Download IDE</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Developers</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">Developer Portal</Link></li>
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">API Reference</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/team" className="hover:text-white transition-colors">Our Team</Link></li>
                <li><Link to="/partners" className="hover:text-white transition-colors">Partners</Link></li>
                <li><Link to="/partner-registration" className="hover:text-white transition-colors">Become a Partner</Link></li>
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
            <div className="flex items-center gap-6">
              <TrustedVLogo size="sm" />
              <div className="flex items-center gap-2 pl-6 border-l border-slate-700">
                <img src="/bosch-logo.png" alt="" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <p className="text-sm text-slate-400">&copy; 2026 TrusteD-V. Secure RISC-V Development Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
