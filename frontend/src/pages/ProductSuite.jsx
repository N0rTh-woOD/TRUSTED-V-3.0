import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, Shield, Code, Layers, Download, ArrowRight, 
  CheckCircle2, Zap, Server, Lock, Gauge, Terminal,
  GitBranch, Box, Wrench, FileCode, ExternalLink
} from "lucide-react";

const ProductSuite = () => {
  const products = [
    {
      category: "Development Tools",
      items: [
        {
          name: "TrusteD-V IDE — Jarvyn",
          description: "AI-native development environment with Jarvyn AI assistant, integrated debugging, one-click firmware flashing, and RISC-V native support.",
          icon: Terminal,
          features: ["Jarvyn AI code assistant", "Integrated debugger (probe-rs / LLDB)", "Smart Builder engine", "One-click build & flash"],
          badge: "Flagship",
          link: "/download-ide"
        },
        {
          name: "Web IDE",
          description: "Browser-based development environment for quick prototyping and collaborative development without local setup.",
          icon: Code,
          features: ["Zero installation", "Cloud compilation", "Project sharing", "Live preview"],
          badge: "Beta",
          link: "/developer-portal"
        },
      ]
    },
    {
      category: "Secure Foundation",
      items: [
        {
          name: "Secure Bootloader",
          description: "Hardware root of trust implementation with verified boot chain, secure firmware updates, and anti-rollback protection.",
          icon: Shield,
          features: ["Chain of trust", "Secure OTA updates", "Anti-rollback", "Key management"],
          badge: "Security"
        },
        {
          name: "Trusted HAL",
          description: "Hardware abstraction layer designed for security-critical applications with isolation and access control.",
          icon: Lock,
          features: ["Memory isolation", "Peripheral access control", "Secure communication", "Audit logging"],
          badge: "Security"
        },
        {
          name: "HSM Integration",
          description: "Seamless integration with Hardware Security Modules for cryptographic operations and secure key storage.",
          icon: Server,
          features: ["Key generation", "Cryptographic operations", "Secure storage", "Attestation"],
          badge: "Security"
        },
      ]
    },
    {
      category: "SDKs & Middleware",
      items: [
        {
          name: "RISC-V Rust SDK",
          description: "Comprehensive SDK for RISC-V development in Rust with optimized libraries, drivers, and examples.",
          icon: Box,
          features: ["Peripheral drivers", "HAL implementations", "Example projects", "Documentation"],
          badge: "SDK"
        },
        {
          name: "RTOS Integration",
          description: "Pre-integrated support for major real-time operating systems including Zephyr, FreeRTOS, and Embassy.",
          icon: Layers,
          features: ["Zephyr RTOS", "FreeRTOS", "Embassy async", "RT-Thread"],
          badge: "Middleware"
        },
        {
          name: "AI Accelerator SDK",
          description: "SDK for integrating AI inference capabilities on edge devices with NPU/TPU support.",
          icon: Cpu,
          features: ["NPU drivers", "Model optimization", "Inference runtime", "Benchmarking"],
          badge: "AI"
        },
      ]
    },
    {
      category: "Debugging & Testing",
      items: [
        {
          name: "Probe.rs Integration",
          description: "Advanced debugging toolkit with support for JTAG/SWD protocols, memory inspection, and trace analysis.",
          icon: Wrench,
          features: ["JTAG/SWD support", "Memory inspection", "Trace analysis", "Flash programming"],
          badge: "Debug"
        },
        {
          name: "Simulation Environment",
          description: "Virtual prototyping environment for testing without physical hardware using QEMU and custom simulators.",
          icon: GitBranch,
          features: ["QEMU integration", "Peripheral simulation", "CI/CD support", "Fault injection"],
          badge: "Testing"
        },
        {
          name: "Performance Profiler",
          description: "Real-time performance analysis tools for optimizing code execution, memory usage, and power consumption.",
          icon: Gauge,
          features: ["Execution profiling", "Memory analysis", "Power estimation", "Benchmark suite"],
          badge: "Profiling"
        },
      ]
    },
  ];

  const getBadgeColor = (badge) => {
    const colors = {
      "Flagship": "bg-primary text-white",
      "Beta": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "AI-Powered": "bg-purple-100 text-purple-800 border-purple-200",
      "Security": "bg-red-100 text-red-800 border-red-200",
      "SDK": "bg-green-100 text-green-800 border-green-200",
      "Middleware": "bg-blue-100 text-blue-800 border-blue-200",
      "AI": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "Debug": "bg-orange-100 text-orange-800 border-orange-200",
      "Testing": "bg-cyan-100 text-cyan-800 border-cyan-200",
      "Profiling": "bg-pink-100 text-pink-800 border-pink-200",
    };
    return colors[badge] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Product Suite</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Complete Development Ecosystem
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From secure boot to AI deployment—discover the comprehensive suite of tools and SDKs 
              for building production-ready RISC-V embedded systems.
            </p>
          </div>
        </div>
      </section>

      {/* Products by Category */}
      {products.map((category, catIndex) => (
        <section key={catIndex} className={`py-16 ${catIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
              <div className="w-16 h-1 bg-primary mt-2" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((product, prodIndex) => {
                const Icon = product.icon;
                return (
                  <Card key={prodIndex} className="bg-white border-border hover:shadow-lg transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <Badge className={getBadgeColor(product.badge)}>{product.badge}</Badge>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mt-4">{product.name}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      <ul className="space-y-2 mb-4">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {product.link && (
                        <Link to={product.link}>
                          <Button variant="outline" size="sm" className="w-full mt-2 group-hover:bg-primary group-hover:text-white transition-colors">
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Integration Diagram */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Architecture</span>
            <h2 className="text-3xl font-bold text-white mt-2">Integrated Pipeline</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              All components work together seamlessly to provide an end-to-end development experience.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {[
              "Requirements",
              "→",
              "Jarvyn IDE",
              "→",
              "Build & Config",
              "→",
              "Secure Build",
              "→",
              "Debug & Test",
              "→",
              "Deploy"
            ].map((item, i) => (
              item === "→" ? (
                <ArrowRight key={i} className="w-6 h-6 text-primary hidden md:block" />
              ) : (
                <div key={i} className="px-4 py-3 bg-slate-800 rounded-lg text-sm font-medium">
                  {item}
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Download TrusteD-V IDE — Jarvyn or explore the Developer Portal to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/download-ide">
              <Button size="lg" className="font-semibold">
                <Download className="w-4 h-4 mr-2" />
                Download IDE
              </Button>
            </Link>
            <Link to="/developer-portal">
              <Button size="lg" variant="outline" className="font-semibold">
                <Code className="w-4 h-4 mr-2" />
                Developer Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSuite;
