import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cpu, Zap, Code, Package, Layers, Download, ArrowRight, 
  CheckCircle2, Shield, Lock, Gauge, Wifi, Server, ChevronRight,
  ExternalLink
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Boot & Trusted Execution",
      description: "Hardware root of trust with secure boot chain, TPM integration, and trusted execution environments for critical applications.",
    },
    {
      icon: Cpu,
      title: "Optimized RISC-V Compilers",
      description: "State-of-the-art Rust toolchain with Pliron & Cranelift backends optimized specifically for RISC-V architectures.",
    },
    {
      icon: Code,
      title: "AI-Powered Development",
      description: "Intelligent code generation, smart hardware recommendations, and automated project scaffolding with best practices.",
    },
    {
      icon: Layers,
      title: "Comprehensive SDK Support",
      description: "Pre-integrated SDKs for heterogeneous chips including RISC-V, TPUs, and NPUs with unified development experience.",
    },
    {
      icon: Gauge,
      title: "Real-Time Performance",
      description: "RTOS integration with Zephyr, FreeRTOS, and Embassy for deterministic, low-latency embedded applications.",
    },
    {
      icon: Lock,
      title: "Functional Safety (ISO 26262)",
      description: "Safety-certified components and workflows for automotive, industrial, and medical device development.",
    },
  ];

  const hardwarePartners = [
    { name: "SiFive", description: "RISC-V IP & SoCs" },
    { name: "Espressif", description: "IoT Solutions" },
    { name: "StarFive", description: "High-Performance SBCs" },
    { name: "Canaan", description: "AI Accelerators" },
    { name: "Microchip", description: "PolarFire FPGA" },
    { name: "BeagleBoard", description: "Open Hardware" },
  ];

  const stats = [
    { value: "50+", label: "Supported Boards" },
    { value: "15+", label: "RTOS Options" },
    { value: "100+", label: "SDK Components" },
    { value: "24/7", label: "Community Support" },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary">RISC-V × Rust × Security</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6 leading-tight">
                Secure Embedded Systems Development
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                The complete platform for building secure, high-performance embedded systems with RISC-V and Rust. 
                From secure boot to AI deployment—everything you need in one integrated ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/solution-builder">
                  <Button 
                    data-testid="start-building-btn"
                    size="lg"
                    className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    Start Building
                    <ArrowRight className="ml-2 w-5 h-5" />
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
              
              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl blur-3xl" />
              <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl bg-white">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-muted-foreground">TrusteD-V Solution Builder</span>
                  </div>
                  <pre className="text-sm text-muted-foreground font-mono bg-slate-50 p-4 rounded-lg overflow-hidden">
<code className="text-xs">{`// Generated by TrusteD-V
#![no_std]
#![no_main]

use riscv_rt::entry;
use trusted_v_hal::prelude::*;

#[entry]
fn main() -> ! {
    // Secure boot verified
    let peripherals = Peripherals::take();
    let gpio = peripherals.GPIO.split();
    
    // Initialize secure channel
    let uart = Uart::new(peripherals.UART0)
        .with_encryption(AES256)
        .init();
    
    loop {
        // Your secure application
        wfi();
    }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-20 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Platform Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Complete Development Ecosystem
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for secure RISC-V embedded systems development—from hardware abstraction to production deployment.
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
                    <h3 className="font-semibold text-foreground mb-2 text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Hardware Partners */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Supported Hardware Ecosystem
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pre-integrated support for leading RISC-V hardware vendors and development platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {hardwarePartners.map((partner, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg border border-border p-6 text-center hover:shadow-md transition-shadow"
              >
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
      
      {/* Development Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Integrated Tools</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Professional Development Environment
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                TrusteD-V Studio provides a vertically integrated IDE with AI-powered assistance, 
                advanced debugging capabilities, and seamless hardware integration.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "SLM-based intelligent code completion and suggestions",
                  "Integrated probe.rs debugging with JTAG/SWD support",
                  "Real-time memory profiling and performance analysis",
                  "One-click secure deployment to target hardware",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-4">
                <Link to="/download-ide">
                  <Button className="font-medium">
                    <Download className="w-4 h-4 mr-2" />
                    Download IDE
                  </Button>
                </Link>
                <Link to="/developer-portal">
                  <Button variant="outline" className="font-medium">
                    Try Web IDE
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-xl overflow-hidden border border-border shadow-xl bg-slate-900">
                <div className="p-4 border-b border-slate-700 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-slate-400">TrusteD-V Studio</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 space-y-2">
                      <div className="text-xs text-slate-400 mb-2">Explorer</div>
                      {["src/", "├── main.rs", "├── lib.rs", "├── drivers/", "Cargo.toml", "memory.x"].map((item, i) => (
                        <div key={i} className="text-xs text-slate-300 font-mono">{item}</div>
                      ))}
                    </div>
                    <div className="col-span-9 bg-slate-800 rounded p-3">
                      <pre className="text-xs text-green-400 font-mono">
{`// AI Assistant: Detected ESP32-C3
// Suggested: WiFi + BLE initialization

use esp_wifi::wifi::*;

pub fn init_wireless() -> Result<()> {
    let config = WifiConfig::sta()?;
    config.set_security(WPA3);
    wifi.connect()?;
    Ok(())
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Secure Embedded Systems?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg leading-relaxed">
              Start your RISC-V journey today with AI-powered tools and production-ready templates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/solution-builder">
                <Button 
                  data-testid="get-started-cta-btn"
                  size="lg"
                  className="h-12 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90"
                >
                  Get Started Free
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/product-suite" className="hover:text-white">Product Suite</Link></li>
                <li><Link to="/hardware-catalog" className="hover:text-white">Hardware Catalog</Link></li>
                <li><Link to="/download-ide" className="hover:text-white">Download IDE</Link></li>
                <li><Link to="/solution-builder" className="hover:text-white">Solution Builder</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Developers</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/developer-portal" className="hover:text-white">Developer Portal</Link></li>
                <li><Link to="/blog" className="hover:text-white">Technical Blog</Link></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/partners" className="hover:text-white">Partner Network</Link></li>
                <li><Link to="/partner-registration" className="hover:text-white">Become a Partner</Link></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">TrusteD-V</span>
            </div>
            <p className="text-sm text-slate-400">
              © 2025 TrusteD-V. Secure RISC-V Development Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
