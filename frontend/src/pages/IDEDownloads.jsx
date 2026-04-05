import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, Monitor, Apple, Terminal, CheckCircle2, 
  Cpu, Code, Wrench, Zap, HardDrive, ChevronRight,
  Bug, Layers, Rocket, Shield, Play, Box, Sparkles
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const IDEDownloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/ide-downloads`);
      setDownloads(res.data);
    } catch (error) {
      console.error("Failed to load downloads:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPlatformIcon = (platform) => {
    if (platform.toLowerCase().includes("windows")) return Monitor;
    if (platform.toLowerCase().includes("mac")) return Apple;
    return Terminal;
  };

  const handleDownload = (ide) => {
    if (ide.download_url && ide.download_url !== "#" && ide.filename) {
      const link = document.createElement("a");
      link.href = `${BACKEND_URL}${ide.download_url}`;
      link.download = ide.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const isDownloadAvailable = (ide) => {
    return ide.download_url && ide.download_url !== "#" && ide.filename;
  };

  const features = [
    {
      icon: Sparkles,
      title: "Jarvyn AI Assistant",
      description: "Built-in AI co-pilot that understands your codebase, hardware config, and datasheets. Get contextual code suggestions and bug fixes in real-time.",
    },
    {
      icon: Bug,
      title: "Integrated Debugging",
      description: "Full probe-rs and LLDB debugging with breakpoints, variable inspection, call stack, and register view — all within the IDE.",
    },
    {
      icon: Cpu,
      title: "RISC-V Native Support",
      description: "First-class support for RISC-V targets with C-DAC VEGA and Mindgrove boards. Auto-configured toolchains and BSP integration.",
    },
    {
      icon: Layers,
      title: "Smart Builder Engine",
      description: "Project scaffolding with pre-configured Cargo.toml, drivers, and HAL setup. Supports bare-metal, FreeRTOS, Zephyr, and Embassy.",
    },
    {
      icon: Play,
      title: "One-Click Build & Flash",
      description: "Compile and flash firmware to your target board with a single click. Supports JTAG, SWD, and serial interfaces.",
    },
    {
      icon: Shield,
      title: "Secure Development",
      description: "Built-in secure boot workflow, cryptographic key management, and trusted execution environment configuration.",
    },
  ];

  const screenshots = [
    { src: "/ide/jarvyn-editor.png", alt: "Jarvyn IDE - Full Editor with AI Assistant, Debugging, and Terminal" },
    { src: "/ide/jarvyn-welcome.png", alt: "Jarvyn IDE - Welcome Screen with Smart Builder Configuration" },
  ];

  const requirements = {
    Windows: { icon: Monitor, reqs: ["Windows 10 (64-bit) or later", "8 GB RAM (16 GB recommended)", "2 GB available disk space", "USB 2.0+ for hardware debugging", "Visual C++ Redistributable 2019+"] },
    macOS: { icon: Apple, reqs: ["macOS 12.0 (Monterey) or later", "Apple Silicon or Intel processor", "8 GB RAM (16 GB recommended)", "2 GB available disk space", "Xcode Command Line Tools"] },
    Linux: { icon: Terminal, reqs: ["Ubuntu 22.04+, Fedora 38+, or equivalent", "8 GB RAM (16 GB recommended)", "2 GB available disk space", "libusb 1.0 for USB debugging", "GCC 11+ or Clang 14+"] },
  };

  const whatsNew = [
    { version: "1.2.0", date: "Feb 2026", items: ["Jarvyn AI context-aware completions", "Multi-board project support", "Improved LLDB integration"] },
    { version: "1.1.0", date: "Dec 2025", items: ["Embassy async framework support", "RISC-V vector extension debugging", "Terminal multiplexer"] },
    { version: "1.0.0", date: "Oct 2025", items: ["Initial release with Rust toolchain", "C-DAC VEGA board support", "Integrated probe-rs debugger"] },
  ];

  // Group downloads for display
  const platformDownloads = downloads.reduce((acc, dl) => {
    acc[dl.platform] = dl;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white" data-testid="ide-downloads-page">
      {/* Hero Section - Dark theme like the IDE */}
      <section className="relative bg-[#1a1d2e] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d2e] via-[#1e2235] to-[#252a3e]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#4a7dff]/20 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-[#4a7dff]" />
                </div>
                <Badge className="bg-[#4a7dff]/10 text-[#6b9aff] border-[#4a7dff]/30 text-xs">
                  v1.2.0 — Latest Release
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
                TrusteD-V IDE
                <span className="block text-[#6b9aff] text-2xl md:text-3xl mt-2 font-medium">Jarvyn</span>
              </h1>
              
              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                The AI-native development environment for RISC-V embedded systems. 
                Built for Rust. Powered by Jarvyn AI. Designed for hardware engineers.
              </p>
              
              {/* Platform Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {["Windows", "macOS", "Linux"].map((platform) => {
                  const Icon = getPlatformIcon(platform);
                  const dl = platformDownloads[platform];
                  const available = dl && isDownloadAvailable(dl);
                  return (
                    <Button
                      key={platform}
                      data-testid={`download-${platform.toLowerCase()}-btn`}
                      onClick={() => available && handleDownload(dl)}
                      disabled={!available}
                      className={`h-12 px-6 gap-2 font-medium transition-all ${
                        platform === "Windows" 
                          ? "bg-[#4a7dff] hover:bg-[#3a6aee] text-white shadow-lg shadow-[#4a7dff]/25" 
                          : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{platform}</span>
                      {available && dl.size && (
                        <span className="text-xs opacity-60">({dl.size})</span>
                      )}
                      {!available && <span className="text-xs opacity-60">(Soon)</span>}
                    </Button>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  Free to use
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  Rust toolchain included
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  RISC-V ready
                </span>
              </div>
            </div>
            
            {/* IDE Screenshot Showcase */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#4a7dff]/20 to-purple-500/20 rounded-2xl blur-2xl" />
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <img 
                    src={screenshots[activeScreenshot].src}
                    alt={screenshots[activeScreenshot].alt}
                    className="w-full h-auto"
                    data-testid="ide-screenshot"
                  />
                </div>
                {/* Screenshot Selector */}
                <div className="flex gap-2 mt-4 justify-center">
                  {screenshots.map((ss, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveScreenshot(i)}
                      className={`w-16 h-10 rounded-md overflow-hidden border-2 transition-all ${
                        activeScreenshot === i ? "border-[#4a7dff] scale-105" : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={ss.src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">
              Everything You Need to Build Firmware
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A vertically integrated IDE purpose-built for embedded Rust development on RISC-V hardware.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} data-testid={`ide-feature-${index}`} className="bg-white border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-base">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-20 bg-white" data-testid="ide-downloads-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Download</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">
              Get TrusteD-V IDE — Jarvyn
            </h2>
            <p className="text-muted-foreground">Available for Windows, macOS, and Linux</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {["Windows", "macOS", "Linux"].map((platform) => {
                const dl = platformDownloads[platform];
                const Icon = getPlatformIcon(platform);
                const available = dl && isDownloadAvailable(dl);
                return (
                  <Card 
                    key={platform} 
                    data-testid={`download-card-${platform.toLowerCase()}`}
                    className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${
                      available ? "border-primary/30 shadow-md" : "border-border"
                    }`}
                  >
                    <div className={`h-2 ${available ? "bg-primary" : "bg-slate-200"}`} />
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                        available ? "bg-primary/10" : "bg-slate-100"
                      }`}>
                        <Icon className={`w-8 h-8 ${available ? "text-primary" : "text-slate-400"}`} />
                      </div>
                      
                      <h3 className="font-semibold text-lg text-foreground mb-1">{platform}</h3>
                      
                      {dl ? (
                        <>
                          <p className="text-sm text-muted-foreground mb-1">
                            {dl.name} v{dl.version}
                          </p>
                          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                            {available && (
                              <>
                                <HardDrive className="w-3 h-3" />
                                <span>{dl.size}</span>
                              </>
                            )}
                          </div>
                          
                          <Button 
                            className="w-full" 
                            disabled={!available}
                            onClick={() => handleDownload(dl)}
                            data-testid={`download-btn-${platform.toLowerCase()}`}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            {available ? "Download" : "Coming Soon"}
                          </Button>
                          
                          {available && (
                            <p className="text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Ready to download
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-muted-foreground mb-4">Coming soon</p>
                          <Button className="w-full" disabled>
                            <Download className="w-4 h-4 mr-2" />
                            Coming Soon
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* What's New */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Changelog</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">What's New</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {whatsNew.map((release, i) => (
              <Card key={i} className={`bg-white ${i === 0 ? "border-primary/30 shadow-md" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={i === 0 ? "bg-primary text-white" : "bg-slate-100 text-slate-700"}>
                      v{release.version}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{release.date}</span>
                    {i === 0 && <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Latest</Badge>}
                  </div>
                  <ul className="space-y-2">
                    {release.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Requirements</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">System Requirements</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {Object.entries(requirements).map(([platform, { icon: Icon, reqs }]) => (
              <Card key={platform} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">{platform}</h3>
                  </div>
                  <ul className="space-y-3">
                    {reqs.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IDEDownloads;
