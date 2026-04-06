import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, Shield, Code, Layers, Download, ArrowRight, 
  CheckCircle2, Zap, Server, Lock, Gauge, Terminal,
  GitBranch, Box, Wrench, FileCode, ExternalLink,
  Globe, BarChart3, Key
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
          name: "TrusteD-V WebIDE",
          description: "Full-featured browser-based development environment for RISC-V Rust projects. Compile, debug, and collaborate from anywhere — no local setup required.",
          icon: Globe,
          features: ["Cloud-based Rust compilation", "Integrated terminal & debugger", "Real-time collaboration", "Project templates & scaffolding", "Git integration & version control"],
          badge: "Cloud",
          link: "/developer-portal"
        },
      ]
    },
    {
      category: "Secure Foundation",
      items: [
        {
          name: "Secure Boot — rboot / rustBoot",
          description: "Hardware root of trust with verified boot chain. rboot provides lightweight first-stage boot for RISC-V, while rustBoot delivers a full Rust-native secure bootloader with A/B updates and anti-rollback.",
          icon: Shield,
          features: ["rboot: lightweight RISC-V first-stage loader", "rustBoot: Rust-native secure bootloader", "A/B firmware update with rollback", "Anti-rollback protection & key management", "Verified boot chain & signature checks"],
          badge: "Security"
        },
        {
          name: "Crypto Stack",
          description: "Comprehensive native cryptography stack for embedded RISC-V. Hardware-accelerated where available, with software fallbacks for all standard and post-quantum algorithms.",
          icon: Key,
          features: ["AES-256-GCM symmetric encryption", "RSA-4096 & ECC (P-256, Ed25519)", "SHA-3 / BLAKE3 hashing", "Post-quantum: Kyber & Dilithium", "Hardware crypto engine integration", "Side-channel attack mitigations"],
          badge: "Crypto"
        },
        {
          name: "Trusted HAL",
          description: "Hardware abstraction layer designed for security-critical applications with memory isolation, access control, and audit logging.",
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
          description: "Pre-integrated support for major real-time operating systems. TrusteD-V RTOS delivers 9x faster context switching than FreeRTOS with Rust memory safety guarantees.",
          icon: Layers,
          features: ["TrusteD-V RTOS (9x faster context switch)", "FreeRTOS & Zephyr RTOS", "Embassy async runtime", "Compile-time GPIO verification"],
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

  /* RTOS Benchmark data from the provided document */
  const benchmarks = [
    { name: "Task Creation", min: "319", avg: "2,643", vsFreeRTOS: "12x faster", status: "Excellent", statusColor: "text-green-600" },
    { name: "Context Switch", min: "~260", avg: "~520", vsFreeRTOS: "9x faster", status: "Excellent", statusColor: "text-green-600" },
    { name: "Mutex Lock (uncontended)", min: "593", avg: "1,335", vsFreeRTOS: "Similar", status: "Good", statusColor: "text-blue-600" },
    { name: "Mutex Unlock (uncontended)", min: "532", avg: "906", vsFreeRTOS: "Similar", status: "Good", statusColor: "text-blue-600" },
    { name: "Semaphore Signal", min: "540", avg: "925", vsFreeRTOS: "Similar", status: "Good", statusColor: "text-blue-600" },
    { name: "Queue Send", min: "591", avg: "1,171", vsFreeRTOS: "Similar", status: "Good", statusColor: "text-blue-600" },
    { name: "Mutex Lock (contended)", min: "1,101", avg: "4,979", vsFreeRTOS: "4x slower", status: "Acceptable", statusColor: "text-amber-600" },
    { name: "Semaphore Signal (contended)", min: "1,318", avg: "4,959", vsFreeRTOS: "5x slower", status: "Acceptable", statusColor: "text-amber-600" },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="product-suite-page">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Product Suite</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Complete Development Ecosystem
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              From secure boot to AI deployment — discover the comprehensive suite of tools and SDKs 
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
                const isHighlight = product.badge === "Flagship" || product.badge === "Cloud";
                return (
                  <Card key={prodIndex} data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, '-')}`} className={`bg-white border-border hover:shadow-lg transition-all duration-300 group overflow-hidden ${isHighlight ? "border-primary/20" : ""}`}>
                    {isHighlight && <div className="h-1.5 bg-gradient-to-r from-primary to-blue-400" />}
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                          isHighlight ? "bg-primary text-white" : "bg-primary/10 group-hover:bg-primary/15"
                        }`}>
                          <Icon className={`w-6 h-6 ${isHighlight ? "text-white" : "text-primary"}`} />
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
                          <Button 
                            size="sm" 
                            className={`w-full mt-2 transition-all ${
                              isHighlight 
                                ? "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg"
                                : "bg-transparent border border-border text-foreground hover:bg-primary hover:text-white hover:border-primary"
                            }`}
                          >
                            {product.badge === "Flagship" ? (
                              <>
                                <Download className="w-4 h-4 mr-1" />
                                Get {product.name.split("—")[0].trim()}
                              </>
                            ) : (
                              <>
                                Explore {product.name}
                                <ArrowRight className="w-4 h-4 ml-1" />
                              </>
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

      {/* ══ RTOS BENCHMARKING ══ */}
      <section className="py-20 bg-slate-900 text-white" data-testid="rtos-benchmark-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Performance</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">
              TrusteD-V RTOS Benchmark <span className="text-slate-400 font-normal">vs FreeRTOS</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm">
              All measurements in CPU cycles on equivalent RISC-V hardware. Lower is better. 
              TrusteD-V RTOS trades marginal IPC overhead for complete memory safety via Rust.
            </p>
          </div>
          
          {/* Benchmark Table */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="benchmark-table">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-4 text-slate-400 font-semibold">Benchmark</th>
                    <th className="text-right p-4 text-slate-400 font-semibold">Min (cycles)</th>
                    <th className="text-right p-4 text-slate-400 font-semibold">Avg (cycles)</th>
                    <th className="text-right p-4 text-slate-400 font-semibold">vs FreeRTOS</th>
                    <th className="text-right p-4 text-slate-400 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarks.map((b, i) => (
                    <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-750 transition-colors">
                      <td className="p-4 text-white font-medium">{b.name}</td>
                      <td className="p-4 text-right text-slate-300 font-mono text-xs">{b.min}</td>
                      <td className="p-4 text-right text-slate-300 font-mono text-xs">{b.avg}</td>
                      <td className="p-4 text-right">
                        <span className={`text-xs font-bold ${
                          b.vsFreeRTOS.includes('faster') ? 'text-green-400' : 
                          b.vsFreeRTOS === 'Similar' ? 'text-blue-400' : 'text-amber-400'
                        }`}>
                          {b.vsFreeRTOS}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          b.status === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                          b.status === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Key Takeaways */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
              <div className="text-2xl font-bold text-green-400 mb-1">9x</div>
              <div className="text-sm text-white font-semibold">Faster Context Switch</div>
              <div className="text-xs text-slate-400 mt-1">520 vs 4,620 cycles (FreeRTOS)</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
              <div className="text-2xl font-bold text-green-400 mb-1">12x</div>
              <div className="text-sm text-white font-semibold">Faster Task Creation</div>
              <div className="text-xs text-slate-400 mt-1">2,643 vs 33,000 cycles (FreeRTOS)</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
              <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
              <div className="text-sm text-white font-semibold">Memory Safe</div>
              <div className="text-xs text-slate-400 mt-1">Rust eliminates entire classes of bugs</div>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 mt-6 text-center">
            Verdict: TrusteD-V RTOS delivers fast context switching (9x), memory safety (Rust), type safety (compile-time), and sub-ms real-time response. 
            Contended IPC is 4-5x slower than FreeRTOS — an acceptable trade-off for safety-critical applications.
          </p>
        </div>
      </section>

      {/* Integration Pipeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Architecture</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Integrated Pipeline</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm">
              All components work together seamlessly to provide an end-to-end development experience.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {[
              "Requirements", "->", "Jarvyn IDE", "->", "Build & Config", "->",
              "Secure Boot", "->", "Debug & Test", "->", "Deploy"
            ].map((item, i) => (
              item === "->" ? (
                <ArrowRight key={i} className="w-6 h-6 text-primary hidden md:block" />
              ) : (
                <div key={i} className="px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm font-medium">
                  {item}
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-sm">
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
