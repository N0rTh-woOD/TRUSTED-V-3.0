import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, Monitor, Apple, Terminal, CheckCircle2, 
  Cpu, Code, Wrench, Zap, FileDown, HardDrive
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const IDEDownloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getPlatformColor = (platform) => {
    if (platform.toLowerCase().includes("windows")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (platform.toLowerCase().includes("mac")) return "bg-gray-100 text-gray-800 border-gray-200";
    return "bg-orange-100 text-orange-800 border-orange-200";
  };

  const features = [
    {
      icon: Code,
      title: "Intelligent Code Completion",
      description: "AI-powered suggestions and auto-completion for Rust embedded development",
    },
    {
      icon: Wrench,
      title: "Integrated Debugging",
      description: "Built-in probe-rs debugger with JTAG/SWD support for seamless hardware debugging",
    },
    {
      icon: Cpu,
      title: "Hardware Simulation",
      description: "QEMU integration for testing without physical hardware",
    },
    {
      icon: Zap,
      title: "One-Click Deployment",
      description: "Flash your firmware to target hardware with a single click",
    },
  ];

  const requirements = {
    windows: ["Windows 10 (64-bit) or later", "4 GB RAM minimum (8 GB recommended)", "2 GB disk space", "USB 2.0 port for debugging"],
    mac: ["macOS 11.0 (Big Sur) or later", "Apple Silicon or Intel processor", "4 GB RAM minimum (8 GB recommended)", "2 GB disk space"],
    linux: ["Ubuntu 20.04+, Fedora 34+, or equivalent", "4 GB RAM minimum (8 GB recommended)", "2 GB disk space", "libusb 1.0 for USB debugging"],
  };

  // Group downloads by name/version
  const groupedDownloads = downloads.reduce((acc, dl) => {
    const key = `${dl.name} v${dl.version}`;
    if (!acc[key]) {
      acc[key] = { name: dl.name, version: dl.version, platforms: [] };
    }
    acc[key].platforms.push(dl);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Download</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                TrusteD-V Studio
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                The complete integrated development environment for secure RISC-V embedded systems. 
                Features AI-powered assistance, advanced debugging, and seamless hardware integration.
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                <Badge className="bg-green-100 text-green-800 border-green-200 text-sm px-3 py-1">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Latest: v1.2.0
                </Badge>
                <span className="text-sm text-muted-foreground">Released Dec 2025</span>
              </div>
              
              {/* Quick Download Buttons */}
              <div className="flex flex-wrap gap-3">
                {["Windows", "macOS", "Linux"].map((platform) => {
                  const Icon = getPlatformIcon(platform);
                  return (
                    <Button key={platform} variant="outline" className="gap-2">
                      <Icon className="w-4 h-4" />
                      {platform}
                    </Button>
                  );
                })}
              </div>
            </div>
            
            {/* IDE Preview */}
            <div className="relative hidden lg:block">
              <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-slate-400">TrusteD-V Studio</span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3 bg-slate-800 rounded p-2">
                      <div className="text-[10px] text-slate-400 mb-2">Files</div>
                      {["src/", "├─ main.rs", "├─ lib.rs", "Cargo.toml"].map((f, i) => (
                        <div key={i} className="text-[10px] text-slate-300 py-0.5">{f}</div>
                      ))}
                    </div>
                    <div className="col-span-6 bg-slate-800 rounded p-2">
                      <pre className="text-[10px] text-green-400">
{`#[entry]
fn main() -> ! {
    let dp = Peripherals::take();
    let mut led = dp.PA5.output();
    loop {
        led.toggle();
        delay(500);
    }
}`}
                      </pre>
                    </div>
                    <div className="col-span-3 bg-slate-800 rounded p-2">
                      <div className="text-[10px] text-slate-400 mb-2">Debug</div>
                      <div className="text-[10px] text-cyan-400">● Connected</div>
                      <div className="text-[10px] text-slate-300 mt-1">SiFive HiFive1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">Key Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">Download TrusteD-V Studio</h2>
            <p className="text-muted-foreground mt-2">Choose your platform to get started</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="space-y-8">
              {Object.values(groupedDownloads).map((group, gIndex) => (
                <div key={gIndex}>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileDown className="w-5 h-5 text-primary" />
                    {group.name} <Badge variant="outline">v{group.version}</Badge>
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {group.platforms.map((dl, index) => {
                      const Icon = getPlatformIcon(dl.platform);
                      return (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-slate-600" />
                              </div>
                              <Badge className={getPlatformColor(dl.platform)}>{dl.platform}</Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {dl.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                              <span className="flex items-center gap-1">
                                <HardDrive className="w-4 h-4" />
                                {dl.size}
                              </span>
                            </div>
                            
                            <Button 
                              className="w-full" 
                              disabled={dl.download_url === "#"}
                              onClick={() => {
                                if (dl.download_url && dl.download_url !== "#") {
                                  window.open(dl.download_url, "_blank");
                                }
                              }}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              {dl.download_url === "#" ? "Coming Soon" : "Download"}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">System Requirements</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(requirements).map(([platform, reqs]) => {
              const Icon = getPlatformIcon(platform);
              return (
                <Card key={platform} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <h3 className="font-semibold text-foreground capitalize">{platform}</h3>
                    </div>
                    
                    <ul className="space-y-2">
                      {reqs.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
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

export default IDEDownloads;
