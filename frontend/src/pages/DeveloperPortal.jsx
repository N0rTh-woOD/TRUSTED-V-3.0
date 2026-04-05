import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, BookOpen, Download, Zap, Terminal, FileCode, 
  GitBranch, ExternalLink, ArrowRight, Search, 
  PlayCircle, Users, MessageSquare, Cpu, Wrench,
  ChevronDown, ChevronRight, Layers, Shield, Box,
  Sparkles, Rocket
} from "lucide-react";

// Expandable Section Component (inspired by Tuya/Cursor)
const ExpandableSection = ({ title, icon: Icon, badge, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-lg bg-white overflow-hidden transition-all duration-300 hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
        data-testid={`expand-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge && <Badge variant="outline" className="text-xs">{badge}</Badge>}
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-5 pb-5 pt-2 border-t border-border">
          {children}
        </div>
      </div>
    </div>
  );
};

const DeveloperPortal = () => {
  const quickLinks = [
    { title: "Getting Started", description: "Set up your environment and create your first RISC-V Rust project.", icon: PlayCircle, link: "/download-ide", badge: "Start Here" },
    { title: "API Reference", description: "Complete API documentation for all TrusteD-V SDKs and libraries.", icon: FileCode, link: "/developer-portal", badge: "Docs" },
    { title: "Hardware Guides", description: "Board-specific setup instructions and peripheral configuration.", icon: Cpu, link: "/hardware-catalog", badge: "Hardware" },
    { title: "Code Examples", description: "Ready-to-use examples for common embedded patterns.", icon: Code, link: "/developer-portal", badge: "Examples" },
  ];

  const sdks = [
    { name: "riscv-rust-quickstart", version: "1.0.0", description: "Minimal template for RISC-V embedded Rust projects", downloads: "15K+", link: "https://github.com/riscv-rust/riscv-rust-quickstart" },
    { name: "embedded-hal", version: "1.0.0", description: "Hardware abstraction traits for embedded systems", downloads: "500K+", link: "https://crates.io/crates/embedded-hal" },
    { name: "riscv", version: "0.11.x", description: "Low-level access to RISC-V processors", downloads: "200K+", link: "https://crates.io/crates/riscv" },
    { name: "riscv-rt", version: "0.12.x", description: "Minimal runtime for RISC-V microcontrollers", downloads: "150K+", link: "https://crates.io/crates/riscv-rt" },
    { name: "embassy-executor", version: "0.6.x", description: "Async executor for embedded systems — no alloc, no std", downloads: "80K+", link: "https://crates.io/crates/embassy-executor" },
    { name: "probe-rs", version: "0.24.x", description: "Modern debugging toolkit for ARM and RISC-V targets", downloads: "120K+", link: "https://probe.rs" },
  ];

  const resources = [
    { title: "Rust Embedded Book", description: "Official guide to embedded Rust development", type: "Book", link: "https://docs.rust-embedded.org/book/" },
    { title: "RISC-V Specifications", description: "Official RISC-V ISA specifications", type: "Spec", link: "https://riscv.org/technical/specifications/" },
    { title: "Embassy Framework", description: "Modern async framework for embedded", type: "Framework", link: "https://embassy.dev" },
    { title: "Zephyr RTOS Docs", description: "Zephyr project documentation", type: "RTOS", link: "https://docs.zephyrproject.org" },
    { title: "C-DAC VEGA Documentation", description: "Official documentation for VEGA processors", type: "Hardware", link: "https://vegaprocessors.in" },
    { title: "Mindgrove Technologies", description: "Mindgrove SoC documentation and resources", type: "Hardware", link: "https://mindgrove.in" },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="developer-portal-page">
      {/* Hero - inspired by Tuya Developer */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Developer Portal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
                Build with TrusteD-V
              </h1>
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Documentation, tools, SDKs, and resources for developing secure RISC-V embedded systems with Rust.
              </p>
            </div>
            
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search docs, APIs, SDKs..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-600 rounded-lg bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  data-testid="dev-portal-search"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={index} to={item.link}>
                  <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group bg-white">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <Badge variant="outline" className="text-xs">{item.badge}</Badge>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expandable Documentation Sections - Inspired by Cursor/Tuya */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Documentation</h2>
            <p className="text-muted-foreground mt-1">Explore guides, references, and tutorials</p>
          </div>
          
          <div className="space-y-3">
            <ExpandableSection title="Getting Started with RISC-V Rust" icon={PlayCircle} badge="Beginner" defaultOpen={true}>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Get your RISC-V Rust development environment set up in minutes.</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { step: "1", title: "Install TrusteD-V IDE — Jarvyn", desc: "Download and install the IDE for your platform" },
                    { step: "2", title: "Configure Rust Toolchain", desc: "The IDE auto-configures rustup with RISC-V targets" },
                    { step: "3", title: "Select Your Board", desc: "Choose from C-DAC or Mindgrove boards in the Smart Builder" },
                    { step: "4", title: "Build & Flash", desc: "One-click compile and flash to your target hardware" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-border">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{item.step}</div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/download-ide">
                  <Button size="sm" className="mt-2">
                    <Download className="w-4 h-4 mr-2" />
                    Download IDE
                  </Button>
                </Link>
              </div>
            </ExpandableSection>

            <ExpandableSection title="Hardware Configuration Guides" icon={Cpu} badge="6 Boards">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">Board-specific setup instructions for all supported RISC-V hardware.</p>
                {[
                  { board: "C-DAC ARIES V3.0", chip: "VEGA ET1031", desc: "32-bit RISC-V development board for IoT applications" },
                  { board: "C-DAC ARIES IoT v2", chip: "VEGA RISC-V", desc: "Compact IoT development with wireless connectivity" },
                  { board: "C-DAC DHRUV64 Evaluation", chip: "Dual-Core 64-bit", desc: "High-performance 64-bit RISC-V evaluation platform" },
                  { board: "Mindgrove Secure IoT SoC", chip: "32-bit + Crypto", desc: "Security-first IoT SoC with hardware crypto engine" },
                  { board: "Mindgrove Vision SoC Dev Kit", chip: "64-bit + NPU", desc: "AI-capable SoC with integrated vision processing" },
                  { board: "Mindgrove Industrial SoC", chip: "32-bit Industrial", desc: "Industrial-grade reliability for harsh environments" },
                ].map((item) => (
                  <div key={item.board} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{item.board}</h4>
                        <p className="text-xs text-muted-foreground">{item.chip} — {item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
                <Link to="/hardware-catalog">
                  <Button variant="outline" size="sm" className="mt-2">View Full Catalog <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </Link>
              </div>
            </ExpandableSection>

            <ExpandableSection title="RTOS & Middleware Integration" icon={Layers} badge="5 Options">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">Supported real-time operating systems and middleware frameworks.</p>
                {[
                  { name: "Embassy", desc: "Modern async/await framework for embedded Rust — no alloc, no std", link: "https://embassy.dev" },
                  { name: "FreeRTOS (Rust bindings)", desc: "Industry-standard RTOS with safe Rust FFI bindings", link: "https://freertos.org" },
                  { name: "Zephyr RTOS", desc: "Scalable RTOS with extensive driver support and networking", link: "https://zephyrproject.org" },
                  { name: "RTIC (Real-Time Interrupt-driven Concurrency)", desc: "Concurrency framework for resource-constrained devices", link: "https://rtic.rs" },
                  { name: "Bare Metal", desc: "Direct hardware access with no_std Rust — maximum control", link: "#" },
                ].map((item) => (
                  <a key={item.name} href={item.link} target={item.link !== "#" ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-border hover:border-primary/30 transition-colors">
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </a>
                ))}
              </div>
            </ExpandableSection>

            <ExpandableSection title="Secure Development Workflow" icon={Shield} badge="Security">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">Build secure firmware with hardware root of trust and verified boot chains.</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { title: "Secure Boot", desc: "Chain of trust from bootloader to application with anti-rollback" },
                    { title: "Hardware Security Module", desc: "Cryptographic key management and secure storage via HSM" },
                    { title: "Trusted Execution", desc: "TEE isolation for security-critical code execution" },
                  ].map((item) => (
                    <div key={item.title} className="p-4 rounded-lg bg-slate-50 border border-border">
                      <Shield className="w-5 h-5 text-primary mb-2" />
                      <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection title="AI-Powered Development with Jarvyn" icon={Sparkles} badge="AI">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">Leverage Jarvyn AI for intelligent code generation, debugging assistance, and hardware-aware suggestions.</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { title: "Context-Aware Code Completion", desc: "Jarvyn understands your codebase, board config, and datasheets to provide accurate suggestions" },
                    { title: "Intelligent Bug Detection", desc: "AI-powered analysis that catches FIFO overflows, DMA misconfigurations, and memory safety issues" },
                    { title: "Datasheet Integration", desc: "Ask Jarvyn about register configurations, peripheral setup, and hardware-specific details" },
                    { title: "Project Scaffolding", desc: "Generate complete project templates with Cargo.toml, drivers, HAL, and RTOS configuration" },
                  ].map((item) => (
                    <div key={item.title} className="p-3 rounded-lg bg-slate-50 border border-border">
                      <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ExpandableSection>
          </div>
        </div>
      </section>

      {/* SDKs & Libraries */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Code className="w-6 h-6 text-primary" />
              SDKs & Libraries
            </h2>
            <p className="text-muted-foreground mt-1">Essential crates and tools for RISC-V Rust development</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sdks.map((sdk, index) => (
              <a key={index} href={sdk.link} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="h-full bg-white hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-mono font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{sdk.name}</h4>
                      <Badge variant="outline" className="text-xs font-mono">v{sdk.version}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{sdk.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{sdk.downloads} downloads</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">Quick Start Example</h2>
            <p className="text-muted-foreground mt-2">Get up and running with a simple blinky example on RISC-V</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-slate-400">src/main.rs — TrusteD-V IDE Jarvyn</span>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
<code className="text-green-400">{`#![no_std]
#![no_main]

use panic_halt as _;
use riscv_rt::entry;
use embedded_hal::digital::OutputPin;

// Use the HAL for your specific board
use your_board_hal::{Peripherals, gpio::GpioExt};

#[entry]
fn main() -> ! {
    // Take ownership of peripherals
    let dp = Peripherals::take().unwrap();
    
    // Configure GPIO pin as output
    let gpioa = dp.GPIOA.split();
    let mut led = gpioa.pa5.into_push_pull_output();

    loop {
        // Toggle LED
        led.set_high().unwrap();
        delay_ms(500);
        led.set_low().unwrap();
        delay_ms(500);
    }
}`}</code>
              </pre>
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
              <Link to="/download-ide">
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Download IDE
                </Button>
              </Link>
              <a href="https://github.com/riscv-rust/riscv-rust-quickstart" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <GitBranch className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              External Resources
            </h2>
            <p className="text-muted-foreground mt-1">Community resources and official documentation</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <a key={index} href={resource.link} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm">{resource.title}</h4>
                  <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{resource.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">Join the Community</h2>
            <p className="text-muted-foreground mt-2">Connect with other embedded Rust developers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: MessageSquare, title: "Discord", desc: "Chat with developers and get help in real-time", btn: "Join Server" },
              { icon: GitBranch, title: "GitHub", desc: "Contribute to open source projects and report issues", btn: "View Repos" },
              { icon: Users, title: "Forum", desc: "Discuss topics and share knowledge with the community", btn: "Visit Forum" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                    <Button variant="outline" size="sm">{item.btn}</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperPortal;
