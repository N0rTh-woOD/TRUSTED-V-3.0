import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, Shield, Code, Layers, Download, ArrowRight, 
  CheckCircle2, Zap, Lock, Gauge, Terminal,
  GitBranch, Box, Wrench, ExternalLink,
  Globe, Key
} from "lucide-react";
import PageHero from "@/components/PageHero";

const ProductSuite = () => {
  const products = [
    {
      category: "Development Tools",
      items: [
        {
          name: "TRUSTED-V IDE Jarvyn",
          description: "AI-native development environment with Jarvyn AI assistant, integrated debugging, one-click firmware flashing, and RISC-V native support.",
          icon: Terminal,
          features: ["Jarvyn AI code assistant", "Integrated debugger (probe-rs / LLDB)", "Smart Builder engine", "One-click build & flash"],
          badge: "Flagship",
          link: "/download-ide",
        },
        {
          name: "TRUSTED-V WebIDE",
          description: "Full-featured browser-based development environment for RISC-V Rust projects. Compile, debug, and collaborate from anywhere, no local setup required.",
          icon: Globe,
          features: ["Cloud-based Rust compilation", "Integrated terminal & debugger", "Real-time collaboration", "Project templates & scaffolding", "Git integration & version control"],
          badge: "Cloud",
          link: "/webide",
        },
      ]
    },
    {
      category: "Secure Foundation",
      items: [
        {
          name: "Secure Boot: rboot / rustBoot",
          description: "Hardware root of trust with verified boot chain. rboot provides lightweight first-stage boot for RISC-V, while rustBoot delivers a full Rust-native secure bootloader with A/B updates.",
          icon: Shield,
          features: ["rboot: lightweight RISC-V first-stage loader", "rustBoot: Rust-native secure bootloader", "A/B firmware update with rollback", "Anti-rollback protection & key management"],
          badge: "Security",
          link: "/product/secure-boot",
        },
        {
          name: "Crypto Stack",
          description: "Comprehensive native cryptography stack for embedded RISC-V. Hardware-accelerated where available, with post-quantum algorithm support.",
          icon: Key,
          features: ["AES-256-GCM / RSA-4096 / ECC", "SHA-3 / BLAKE3 hashing", "Post-quantum: Kyber & Dilithium", "Hardware crypto engine integration"],
          badge: "Crypto",
          link: "/product/crypto-stack",
        },
        {
          name: "Trusted HAL",
          description: "Hardware abstraction layer designed for security-critical applications with memory isolation, access control, and audit logging.",
          icon: Lock,
          features: ["Memory isolation", "Peripheral access control", "Secure communication", "Audit logging"],
          badge: "Security",
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
          badge: "SDK",
        },
        {
          name: "RTOS Integration",
          description: "Pre-integrated support for major real-time operating systems. TRUSTED-V RTOS delivers 9x faster context switching than FreeRTOS.",
          icon: Layers,
          features: ["TRUSTED-V RTOS (9x faster context switch)", "FreeRTOS & Zephyr RTOS", "Embassy async runtime"],
          badge: "Middleware",
          link: "/product/rtos-benchmark",
        },
        {
          name: "AI Accelerator SDK",
          description: "SDK for integrating AI inference on edge devices with NPU/TPU support.",
          icon: Cpu,
          features: ["NPU drivers", "Model optimization", "Inference runtime", "Benchmarking"],
          badge: "AI",
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
          badge: "Debug",
        },
        {
          name: "Simulation Environment",
          description: "Virtual prototyping environment for testing without physical hardware using QEMU and custom simulators.",
          icon: GitBranch,
          features: ["QEMU integration", "Peripheral simulation", "CI/CD support", "Fault injection"],
          badge: "Testing",
        },
        {
          name: "Performance Profiler",
          description: "Real-time performance analysis for code execution, memory usage, and power consumption.",
          icon: Gauge,
          features: ["Execution profiling", "Memory analysis", "Power estimation", "Benchmark suite"],
          badge: "Profiling",
        },
      ]
    },
  ];

  const getBadgeColor = (badge) => {
    const colors = {
      "Flagship": "bg-primary text-white",
      "Cloud": "bg-blue-500 text-white",
      "Security": "bg-red-100 text-red-800 border-red-200",
      "Crypto": "bg-amber-100 text-amber-800 border-amber-200",
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
    <div className="min-h-screen bg-white" data-testid="product-suite-page">
      {/* Hero */}
      <PageHero
        eyebrow="Product Suite"
        title="Complete Development Ecosystem"
        subtitle="From secure boot to AI deployment, discover the comprehensive suite of tools and SDKs for building production-ready RISC-V embedded systems with Rust."
      />

      {/* Products by Category */}
      {products.map((category, catIndex) => (
        <section key={catIndex} className={`py-14 lg:py-16 ${catIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
              <div className="w-16 h-1 bg-primary mt-2" />
            </div>
            
            <div className={`grid gap-6 ${category.items.length <= 2 ? 'md:grid-cols-2 max-w-5xl' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
              {category.items.map((product, prodIndex) => {
                const Icon = product.icon;
                const isHighlight = product.badge === "Flagship" || product.badge === "Cloud";
                return (
                  <Card key={prodIndex} data-testid={`product-${product.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className={`bg-white border-border hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col ${isHighlight ? "border-primary/20" : ""}`}>
                    {isHighlight && <div className="h-1.5 bg-gradient-to-r from-primary to-blue-400" />}
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
                          isHighlight ? "bg-primary text-white" : "bg-primary/10 group-hover:bg-primary/15"
                        }`}>
                          <Icon className={`w-5 h-5 ${isHighlight ? "text-white" : "text-primary"}`} />
                        </div>
                        <Badge className={getBadgeColor(product.badge)}>{product.badge}</Badge>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mt-3">{product.name}</h3>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      <ul className="space-y-2 mb-4 flex-1">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {product.link && (
                        <Link to={product.link}>
                          <Button 
                            size="sm" 
                            className={`w-full mt-auto transition-all ${
                              isHighlight 
                                ? "bg-primary text-white hover:bg-primary/90"
                                : "bg-transparent border border-border text-foreground hover:bg-primary hover:text-white hover:border-primary"
                            }`}
                          >
                            {product.badge === "Flagship" ? (
                              <>Learn More <ArrowRight className="w-4 h-4 ml-1" /></>
                            ) : (
                              <>Learn More <ArrowRight className="w-4 h-4 ml-1" /></>
                            )}
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

      {/* Integration Pipeline */}
      <section className="py-16 lg:py-20 bg-white border-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Architecture</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Integrated Pipeline</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm">
              All components work together to provide an end-to-end development experience.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4 items-center">
            {[
              "Requirements", "Jarvyn IDE", "Build & Config",
              "Secure Boot", "Debug & Test", "Deploy"
            ].map((item, i, arr) => (
              <div key={i} className="flex items-center gap-3 lg:gap-4">
                <div className="px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm font-medium whitespace-nowrap">{item}</div>
                {i < arr.length - 1 && <ArrowRight className="w-5 h-5 text-primary hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore TRUSTED-V IDE Jarvyn or browse detailed product documentation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/download-ide">
              <Button size="lg" className="font-semibold">
                Learn More About IDE <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/developer-portal">
              <Button size="lg" variant="outline" className="font-semibold">
                <Code className="w-4 h-4 mr-2" /> Developer Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSuite;
