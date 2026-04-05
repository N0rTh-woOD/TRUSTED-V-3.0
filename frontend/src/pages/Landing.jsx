import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cpu, Zap, Code, Package, Layers, Download, ArrowRight, 
  CheckCircle2, Shield, Lock, Gauge, ChevronRight,
  Cog, Binary, GitBranch
} from "lucide-react";
import TrustedVLogo from "@/components/TrustedVLogo";

// Animated counter component
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

const Landing = () => {
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
                  <Button 
                    data-testid="start-building-btn"
                    size="lg"
                    className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    Download IDE
                    <Download className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/developer-portal">
                  <Button 
                    data-testid="explore-portal-btn"
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-base font-semibold"
                  >
                    Developer Portal
                  </Button>
                </Link>
              </div>
              
              {/* Animated Stats Row */}
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
            
            {/* Platform Capabilities Panel */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-2xl blur-3xl" />
              <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl bg-white">
                <div className="p-5 border-b border-border bg-slate-50">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    What You Get
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Complete development ecosystem for RISC-V</p>
                </div>
                
                <div className="p-5 space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-foreground">TrusteD-V IDE — Jarvyn</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">AI-native IDE with Jarvyn assistant, integrated debugger, and one-click firmware flashing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50 border border-green-100">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-foreground">Indian RISC-V Hardware Support</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Pre-configured BSPs for C-DAC VEGA/ARIES and Mindgrove SoCs with peripheral drivers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50/50 border border-orange-100">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-foreground">Downloadable Project Archives</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Export complete Cargo projects as ZIP files with build scripts, documentation, and version history</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50/50 border border-purple-100">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <Cog className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-foreground">RTOS & Middleware Selection</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Choose from FreeRTOS, Zephyr, Embassy, or bare-metal configurations for your project</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 border-t border-border bg-slate-50">
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
              <Card key={index} className="bg-white border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* RISC-V Rust Benefits */}
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
              
              <div className="space-y-6">
                {riscvRustBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* TrusteD-V Architecture - dark panel */}
            <div className="bg-slate-900 rounded-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Binary className="w-5 h-5 text-primary" />
                TrusteD-V Architecture
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-2">Application Layer</div>
                  <div className="flex flex-wrap gap-2">
                    {["Jarvyn AI", "IDE", "Project Manager"].map((item) => (
                      <span key={item} className="px-2 py-1 bg-primary/20 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-2">Rust SDK & Middleware</div>
                  <div className="flex flex-wrap gap-2">
                    {["Embassy", "RTIC", "embedded-hal", "Drivers"].map((item) => (
                      <span key={item} className="px-2 py-1 bg-orange-500/20 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-2">Secure Foundation</div>
                  <div className="flex flex-wrap gap-2">
                    {["Secure Boot", "Trusted HAL", "HSM", "TEE"].map((item) => (
                      <span key={item} className="px-2 py-1 bg-green-500/20 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-2">RISC-V Hardware</div>
                  <div className="flex flex-wrap gap-2">
                    {["C-DAC VEGA", "Mindgrove", "DHRUV64", "Vision NPU"].map((item) => (
                      <span key={item} className="px-2 py-1 bg-blue-500/20 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
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
                <Card 
                  key={index}
                  data-testid={`feature-card-${index}`}
                  className="bg-white border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
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
              <div key={index} className="bg-slate-50 rounded-lg border border-border p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">{partner.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{partner.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/hardware-catalog">
              <Button variant="outline" className="font-medium">
                View Full Hardware Catalog
                <ChevronRight className="ml-1 w-4 h-4" />
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
                <Button 
                  data-testid="get-started-cta-btn"
                  size="lg"
                  className="h-12 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90"
                >
                  Download IDE
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/partner-registration">
                <Button 
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base font-semibold border-white/30 text-white hover:bg-white/10"
                >
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
                <li><Link to="/blog" className="hover:text-white transition-colors">Technical Blog</Link></li>
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">API Reference</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/team" className="hover:text-white transition-colors">Our Team</Link></li>
                <li><Link to="/partners" className="hover:text-white transition-colors">Partner With Us</Link></li>
                <li><Link to="/partner-registration" className="hover:text-white transition-colors">Become a Partner</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Security</Link></li>
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
            <p className="text-sm text-slate-400">
              &copy; 2026 TrusteD-V. Secure RISC-V Development Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
