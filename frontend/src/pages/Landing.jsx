import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cpu, Zap, Code, Package, Layers, Download, ArrowRight, 
  CheckCircle2, Shield, Lock, Gauge, ChevronRight,
  Cog, Binary, GitBranch, Rocket, Wrench, CircuitBoard
} from "lucide-react";
import TrustedVLogo from "@/components/TrustedVLogo";

// Animated counter with intersection observer
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

// Staggered reveal item
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
        visible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Landing = () => {
  const [activePanel, setActivePanel] = useState("features"); // "features" | "architecture"

  const rustBenefits = [
    { title: "Memory Safety", description: "Eliminates buffer overflows, null pointer dereferences, and data races at compile time" },
    { title: "Zero-Cost Abstractions", description: "High-level features compile to efficient machine code with no runtime overhead" },
    { title: "Fearless Concurrency", description: "Ownership system prevents data races, enabling safe multi-threaded embedded code" },
    { title: "No Garbage Collection", description: "Deterministic memory management perfect for real-time embedded systems" },
  ];

  const riscvRustBenefits = [
    { icon: Shield, title: "Secure by Default", description: "Rust's memory safety combined with RISC-V's hardware security extensions creates a robust security foundation for embedded systems." },
    { icon: Gauge, title: "Optimal Performance", description: "RISC-V's clean ISA pairs perfectly with Rust's zero-cost abstractions for maximum efficiency on resource-constrained devices." },
    { icon: Code, title: "Modern Toolchain", description: "Cargo build system, integrated testing, and excellent LLVM support for RISC-V targets accelerate development." },
    { icon: GitBranch, title: "Open Ecosystem", description: "Both RISC-V and Rust are open-source, vendor-neutral technologies ensuring long-term sustainability." },
  ];

  const features = [
    { icon: Shield, title: "Secure Boot & TEE", description: "Hardware root of trust with secure boot chain, TPM integration, and trusted execution environments." },
    { icon: Cpu, title: "RISC-V Optimized Compilers", description: "State-of-the-art Rust toolchain with Pliron & Cranelift backends optimized for RISC-V." },
    { icon: Zap, title: "AI-Powered IDE", description: "Jarvyn AI assistant with context-aware code generation, debugging, and hardware-aware suggestions." },
    { icon: Layers, title: "Comprehensive SDK", description: "Pre-integrated SDKs for heterogeneous chips including RISC-V cores, TPUs, and NPUs." },
    { icon: Cog, title: "Real-Time Support", description: "RTOS integration with Zephyr, FreeRTOS, and Embassy for deterministic embedded applications." },
    { icon: Lock, title: "Functional Safety", description: "ISO 26262 compliant workflows for automotive, industrial, and medical device development." },
  ];

  const hardwarePartners = [
    { name: "C-DAC", description: "VEGA Processors" },
    { name: "C-DAC", description: "DHRUV64 SoCs" },
    { name: "Mindgrove", description: "Secure IoT" },
    { name: "Mindgrove", description: "Vision SoCs" },
    { name: "Mindgrove", description: "Industrial" },
    { name: "C-DAC", description: "ARIES Boards" },
  ];

  const featureItems = [
    { icon: Zap, color: "blue", title: "TrusteD-V IDE — Jarvyn", desc: "AI-native IDE with Jarvyn assistant, integrated debugger, and one-click firmware flashing" },
    { icon: Cpu, color: "green", title: "Indian RISC-V Hardware Support", desc: "Pre-configured BSPs for C-DAC VEGA/ARIES and Mindgrove SoCs with peripheral drivers" },
    { icon: Package, color: "orange", title: "Downloadable Project Archives", desc: "Export complete Cargo projects as ZIP files with build scripts, documentation, and version history" },
    { icon: Cog, color: "purple", title: "RTOS & Middleware Selection", desc: "Choose from FreeRTOS, Zephyr, Embassy, or bare-metal configurations for your project" },
  ];

  const archLayers = [
    { label: "Application Layer", color: "primary", items: ["Jarvyn AI", "IDE", "Project Manager"] },
    { label: "Rust SDK & Middleware", color: "orange", items: ["Embassy", "RTIC", "embedded-hal", "Drivers"] },
    { label: "Secure Foundation", color: "green", items: ["Secure Boot", "Trusted HAL", "HSM", "TEE"] },
    { label: "RISC-V Hardware", color: "blue", items: ["C-DAC VEGA", "Mindgrove", "DHRUV64", "Vision NPU"] },
  ];

  const colorMap = {
    blue: { bg: "bg-blue-50/50", border: "border-blue-100", icon: "bg-primary/10 text-primary" },
    green: { bg: "bg-green-50/50", border: "border-green-100", icon: "bg-green-500/10 text-green-600" },
    orange: { bg: "bg-orange-50/50", border: "border-orange-100", icon: "bg-orange-500/10 text-orange-600" },
    purple: { bg: "bg-purple-50/50", border: "border-purple-100", icon: "bg-purple-500/10 text-purple-600" },
  };

  const archColorMap = {
    primary: "bg-primary/20",
    orange: "bg-orange-500/20",
    green: "bg-green-500/20",
    blue: "bg-blue-500/20",
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="mb-8">
                <TrustedVLogo size="xl" />
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
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
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight mb-6 leading-tight">
                The Complete <span className="text-primary">RISC-V</span> <span className="text-orange-500">Rust</span> Development Platform
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Build secure, high-performance embedded systems with India's premier RISC-V development ecosystem. 
                From secure boot to AI deployment — everything powered by <strong>Rust</strong>.
              </p>
              
              <div className="flex flex-wrap gap-4">
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
              
              <div className="grid grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
                <AnimatedCounter end={6} suffix="+" label="RISC-V Boards" />
                <AnimatedCounter end={5} suffix="+" label="RTOS Options" />
                <AnimatedCounter end={15} suffix="" label="Team Members" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Made in</div>
                  <div className="text-xs text-muted-foreground mt-1">India</div>
                </div>
              </div>
            </div>
            
            {/* Overlapping Animated Panel - Toggle between "What You Get" and "Architecture" */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-2xl blur-3xl" />
              <div className="relative">
                {/* Panel Toggle Tabs */}
                <div className="flex mb-0 relative z-10">
                  <button 
                    data-testid="panel-features-tab"
                    onClick={() => setActivePanel("features")}
                    className={`flex-1 py-3 px-5 text-sm font-semibold rounded-t-xl transition-all duration-300 ${
                      activePanel === "features" 
                        ? "bg-white text-foreground border border-border border-b-white shadow-sm" 
                        : "bg-slate-100 text-muted-foreground hover:text-foreground border border-transparent"
                    }`}
                  >
                    <Layers className="w-4 h-4 inline mr-2" />
                    What You Get
                  </button>
                  <button 
                    data-testid="panel-architecture-tab"
                    onClick={() => setActivePanel("architecture")}
                    className={`flex-1 py-3 px-5 text-sm font-semibold rounded-t-xl transition-all duration-300 ${
                      activePanel === "architecture" 
                        ? "bg-slate-900 text-white border border-slate-700 border-b-slate-900 shadow-sm" 
                        : "bg-slate-200 text-muted-foreground hover:text-foreground border border-transparent"
                    }`}
                  >
                    <Binary className="w-4 h-4 inline mr-2" />
                    TrusteD-V Architecture
                  </button>
                </div>
                
                {/* Features Panel */}
                <div className={`rounded-b-xl rounded-tr-none overflow-hidden transition-all duration-500 ${
                  activePanel === "features" ? "opacity-100 max-h-[600px]" : "opacity-0 max-h-0 absolute"
                }`}>
                  <div className="border border-border border-t-0 shadow-2xl bg-white rounded-b-xl">
                    <div className="p-5 space-y-3">
                      {featureItems.map((item, i) => {
                        const Icon = item.icon;
                        const c = colorMap[item.color];
                        return (
                          <RevealItem key={i} delay={i * 150}>
                            <div className={`flex items-start gap-3 p-3 rounded-lg ${c.bg} border ${c.border} hover:shadow-md transition-shadow`}>
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${c.icon.split(" ")[0]}`}>
                                <Icon className={`w-4 h-4 ${c.icon.split(" ").pop()}`} />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm text-foreground">{item.title}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                              </div>
                            </div>
                          </RevealItem>
                        );
                      })}
                    </div>
                    <div className="p-5 border-t border-border bg-slate-50 rounded-b-xl">
                      <p className="text-xs text-muted-foreground mb-3 font-medium">Supported Hardware Partners</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md border border-border">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-xs font-medium text-foreground">C-DAC</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md border border-border">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-xs font-medium text-foreground">Mindgrove</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Architecture Panel */}
                <div className={`rounded-b-xl overflow-hidden transition-all duration-500 ${
                  activePanel === "architecture" ? "opacity-100 max-h-[600px]" : "opacity-0 max-h-0 absolute"
                }`}>
                  <div className="bg-slate-900 border border-slate-700 border-t-0 shadow-2xl rounded-b-xl p-6">
                    <div className="space-y-3">
                      {archLayers.map((layer, i) => (
                        <RevealItem key={i} delay={i * 200}>
                          <div className="bg-slate-800 rounded-lg p-4">
                            <div className="text-xs text-slate-400 mb-2">{layer.label}</div>
                            <div className="flex flex-wrap gap-2">
                              {layer.items.map((item) => (
                                <span key={item} className={`px-2 py-1 ${archColorMap[layer.color]} rounded text-xs text-white`}>{item}</span>
                              ))}
                            </div>
                          </div>
                        </RevealItem>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storytelling Journey - Animated sequence */}
      <section className="py-20 bg-white border-t border-border overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">From Concept to Deployment</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how TrusteD-V transforms your embedded development journey
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-red-300 via-primary to-green-400 hidden lg:block" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {[
                { 
                  icon: Wrench, color: "bg-red-500", border: "border-red-200", 
                  title: "The Challenge",
                  desc: "Complex hardware, fragmented tools, security vulnerabilities",
                  visual: "bg-red-50"
                },
                { 
                  icon: Shield, color: "bg-primary", border: "border-primary/20",
                  title: "TrusteD-V",
                  desc: "Unified secure platform for RISC-V embedded development",
                  visual: "bg-primary/5"
                },
                { 
                  icon: Code, color: "bg-orange-500", border: "border-orange-200",
                  title: "Rust Integration",
                  desc: "Memory-safe firmware with zero-cost abstractions",
                  visual: "bg-orange-50"
                },
                { 
                  icon: Layers, color: "bg-purple-500", border: "border-purple-200",
                  title: "Security Layer",
                  desc: "Secure boot, HSM, and TEE overlay on your firmware",
                  visual: "bg-purple-50"
                },
                { 
                  icon: Rocket, color: "bg-green-500", border: "border-green-200",
                  title: "Production Ready",
                  desc: "Compiled, tested, and deployed to real hardware",
                  visual: "bg-green-50"
                },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <RevealItem key={index} delay={index * 200}>
                    <div className="relative text-center group">
                      {/* Step circle */}
                      <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      {/* Content card */}
                      <div className={`${step.visual} rounded-xl p-5 border ${step.border} group-hover:shadow-md transition-shadow`}>
                        <h4 className="font-semibold text-foreground text-sm mb-1">{step.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                      
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-border flex items-center justify-center z-20">
                        <span className="text-[10px] font-bold text-muted-foreground">{index + 1}</span>
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Rust Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white border-t border-orange-100">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
              <span className="text-lg font-bold text-orange-600">Rust</span>
              <span className="text-sm text-orange-600/80">Programming Language</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Why <span className="text-orange-500">Rust</span> for Embedded Systems?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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

      {/* RISC-V Rust Benefits - Animated one by one */}
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
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                The Perfect Combination for Secure Embedded Systems
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                RISC-V's open, extensible architecture combined with Rust's memory safety creates 
                the most secure and efficient foundation for modern embedded development.
              </p>
              
              {/* Animated points one by one */}
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
            
            {/* TrusteD-V Architecture - differentiated dark panel */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-8 text-white shadow-2xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Binary className="w-5 h-5 text-[#6b9aff]" />
                TrusteD-V Architecture
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
      
      {/* Features Grid */}
      <section className="py-20 bg-slate-50 border-t border-border">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Platform Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Complete Development Ecosystem
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
      
      {/* Hardware Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Hardware Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Supported <span className="text-primary">RISC-V</span> Hardware
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pre-integrated support for C-DAC and Mindgrove RISC-V development platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {hardwarePartners.map((partner, index) => (
              <RevealItem key={index} delay={index * 80}>
                <div className="bg-slate-50 rounded-lg border border-border p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Cpu className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{partner.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{partner.description}</p>
                </div>
              </RevealItem>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/hardware-catalog">
              <Button variant="outline" className="font-medium">
                View Full Hardware Catalog <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Secure Embedded Systems with <span className="text-orange-300">Rust</span>?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg leading-relaxed">
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

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/product-suite" className="hover:text-white transition-colors">Product Suite</Link></li>
                <li><Link to="/hardware-catalog" className="hover:text-white transition-colors">Hardware Catalog</Link></li>
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
