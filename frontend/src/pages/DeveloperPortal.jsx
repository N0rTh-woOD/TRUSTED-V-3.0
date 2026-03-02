import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, BookOpen, Download, Zap, Terminal, FileCode, 
  GitBranch, ExternalLink, ArrowRight, Search, 
  PlayCircle, Users, MessageSquare, Cpu, Wrench
} from "lucide-react";

const DeveloperPortal = () => {
  const quickLinks = [
    {
      title: "Getting Started Guide",
      description: "Set up your development environment and create your first RISC-V project in minutes.",
      icon: PlayCircle,
      link: "#",
      badge: "Tutorial"
    },
    {
      title: "API Reference",
      description: "Complete API documentation for all TrusteD-V SDKs and libraries.",
      icon: FileCode,
      link: "#",
      badge: "Docs"
    },
    {
      title: "Hardware Guides",
      description: "Board-specific setup instructions and peripheral configuration guides.",
      icon: Cpu,
      link: "/hardware-catalog",
      badge: "Hardware"
    },
    {
      title: "Code Examples",
      description: "Ready-to-use examples for common embedded patterns and use cases.",
      icon: Code,
      link: "#",
      badge: "Examples"
    },
  ];

  const sdks = [
    {
      name: "riscv-rust-quickstart",
      version: "1.0.0",
      description: "Minimal template for RISC-V embedded Rust projects",
      downloads: "15K+",
      link: "https://github.com/riscv-rust/riscv-rust-quickstart"
    },
    {
      name: "embedded-hal",
      version: "1.0.0",
      description: "Hardware abstraction traits for embedded systems",
      downloads: "500K+",
      link: "https://crates.io/crates/embedded-hal"
    },
    {
      name: "riscv",
      version: "0.11.x",
      description: "Low-level access to RISC-V processors",
      downloads: "200K+",
      link: "https://crates.io/crates/riscv"
    },
    {
      name: "riscv-rt",
      version: "0.12.x",
      description: "Minimal runtime for RISC-V microcontrollers",
      downloads: "150K+",
      link: "https://crates.io/crates/riscv-rt"
    },
  ];

  const tools = [
    {
      name: "TrusteD-V Studio",
      description: "Full-featured IDE with debugging support",
      icon: Terminal,
      platforms: ["Windows", "macOS", "Linux"],
      link: "/download-ide"
    },
    {
      name: "probe-rs",
      description: "Modern debugging toolkit for embedded Rust",
      icon: Wrench,
      platforms: ["Cross-platform"],
      link: "https://probe.rs"
    },
    {
      name: "Solution Builder",
      description: "AI-powered project generator",
      icon: Zap,
      platforms: ["Web"],
      link: "/solution-builder"
    },
  ];

  const resources = [
    {
      title: "Rust Embedded Book",
      description: "Official guide to embedded Rust development",
      type: "Book",
      link: "https://docs.rust-embedded.org/book/"
    },
    {
      title: "RISC-V Specifications",
      description: "Official RISC-V ISA specifications",
      type: "Spec",
      link: "https://riscv.org/technical/specifications/"
    },
    {
      title: "Embassy Framework",
      description: "Modern async framework for embedded",
      type: "Framework",
      link: "https://embassy.dev"
    },
    {
      title: "Zephyr RTOS Docs",
      description: "Zephyr project documentation",
      type: "RTOS",
      link: "https://docs.zephyrproject.org"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Developer Portal</span>
              <h1 className="text-4xl font-bold text-foreground mt-2 mb-4">
                Build with TrusteD-V
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Documentation, tools, SDKs, and resources for developing secure RISC-V embedded systems.
              </p>
            </div>
            
            {/* Search */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={index} to={item.link}>
                  <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-xs">{item.badge}</Badge>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* SDKs & Libraries */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                SDKs & Libraries
              </h2>
              <div className="space-y-4">
                {sdks.map((sdk, index) => (
                  <Card key={index} className="bg-white hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{sdk.name}</h4>
                            <Badge variant="outline" className="text-xs">v{sdk.version}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{sdk.description}</p>
                          <span className="text-xs text-muted-foreground">{sdk.downloads} downloads</span>
                        </div>
                        <a 
                          href={sdk.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline">
                  View All Libraries
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Development Tools */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary" />
                  Development Tools
                </h2>
                <div className="space-y-3">
                  {tools.map((tool, index) => {
                    const Icon = tool.icon;
                    return (
                      <Link key={index} to={tool.link}>
                        <Card className="bg-white hover:shadow-sm hover:border-primary/30 transition-all cursor-pointer">
                          <CardContent className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-medium text-foreground text-sm">{tool.name}</h4>
                              <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* External Resources */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  External Resources
                </h2>
                <div className="space-y-2">
                  {resources.map((resource, index) => (
                    <a 
                      key={index}
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-lg bg-white border border-border hover:border-primary/30 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground text-sm">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground">{resource.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">{resource.type}</Badge>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">Quick Start Example</h2>
            <p className="text-muted-foreground mt-2">Get up and running with a simple blinky example</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-slate-400">src/main.rs</span>
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
}

fn delay_ms(ms: u32) {
    // Simple busy-wait delay
    for _ in 0..ms * 1000 {
        cortex_m::asm::nop();
    }
}`}</code>
              </pre>
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
              <Link to="/solution-builder">
                <Button>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Full Project
                </Button>
              </Link>
              <Button variant="outline">
                <GitBranch className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">Join the Community</h2>
            <p className="text-muted-foreground mt-2">Connect with other developers and get support</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Discord</h3>
                <p className="text-sm text-muted-foreground mb-4">Chat with developers and get help in real-time</p>
                <Button variant="outline" size="sm">Join Server</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <GitBranch className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">GitHub</h3>
                <p className="text-sm text-muted-foreground mb-4">Contribute to open source projects and report issues</p>
                <Button variant="outline" size="sm">View Repos</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Forum</h3>
                <p className="text-sm text-muted-foreground mb-4">Discuss topics and share knowledge with the community</p>
                <Button variant="outline" size="sm">Visit Forum</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperPortal;
