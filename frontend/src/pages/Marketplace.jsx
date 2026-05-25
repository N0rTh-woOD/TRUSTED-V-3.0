import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Cpu, Search, Filter, ExternalLink, ChevronDown, 
  Layers, Box, Shield, Code, Zap, ArrowRight,
  GitBranch
} from "lucide-react";
import { PartnerLogo } from "@/components/PartnerLogos";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ipCatalog = [
  {
    name: "Ibex RISC-V Core",
    provider: "lowRISC / OpenTitan",
    type: "Processor Core",
    arch: "RV32IMC",
    license: "Apache 2.0",
    description: "Production-quality 32-bit RISC-V core with 2-stage pipeline. Ideal for microcontrollers and security applications.",
    features: ["32-bit RISC-V (RV32IMC)", "2-stage pipeline", "JTAG debug support", "Formal verification"],
    github: "https://github.com/lowRISC/ibex",
    tags: ["Open Source", "Verified"],
  },
  {
    name: "OpenTitan Root of Trust",
    provider: "lowRISC / Google",
    type: "Security IP",
    arch: "RV32IMC",
    license: "Apache 2.0",
    description: "Open-source silicon root of trust (RoT) project. Provides secure boot, crypto acceleration, and hardware identity.",
    features: ["Secure boot ROM", "AES/HMAC/KMAC accelerators", "Key manager", "Entropy source (CSRNG)"],
    github: "https://github.com/lowRISC/opentitan",
    tags: ["Open Source", "Security"],
  },
  {
    name: "CVA6 (Ariane) Core",
    provider: "OpenHW Group",
    type: "Processor Core",
    arch: "RV64GC",
    license: "Solderpad 2.1",
    description: "Application-class 64-bit RISC-V core with 6-stage pipeline, MMU, and Linux-capable. Suitable for SoC projects.",
    features: ["64-bit RISC-V (RV64GC)", "6-stage pipeline", "MMU (Sv39)", "Linux-capable"],
    github: "https://github.com/openhwgroup/cva6",
    tags: ["Open Source", "Application Class"],
  },
  {
    name: "PULP RI5CY Core",
    provider: "ETH Zurich / PULP",
    type: "Processor Core",
    arch: "RV32IMFCXpulp",
    license: "Solderpad 2.0",
    description: "Energy-efficient 32-bit RISC-V core optimized for ultra-low-power IoT applications with DSP extensions.",
    features: ["RV32IMFCXpulp", "4-stage pipeline", "DSP extensions", "Ultra-low-power"],
    github: "https://github.com/pulp-platform/riscv",
    tags: ["Open Source", "Low Power"],
  },
  {
    name: "DMA Controller IP",
    provider: "TrusteD-V",
    type: "Peripheral IP",
    arch: "AXI4 / AHB",
    license: "Commercial",
    description: "High-performance multi-channel DMA controller with scatter-gather support for RISC-V SoC integration.",
    features: ["Multi-channel (up to 8)", "Scatter-gather", "AXI4 & AHB interfaces", "Configurable FIFO depth"],
    tags: ["Commercial", "Peripheral"],
  },
  {
    name: "UART/SPI/I2C Controller",
    provider: "TrusteD-V",
    type: "Peripheral IP",
    arch: "APB / AXI-Lite",
    license: "Commercial",
    description: "Standard communication peripherals packaged as configurable IP blocks for RISC-V SoC integration.",
    features: ["UART (16550 compatible)", "SPI master/slave", "I2C multi-master", "DMA-capable"],
    tags: ["Commercial", "Peripheral"],
  },
];

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("hardware");
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadHardware(); }, []);

  const loadHardware = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/hardware`);
      setHardware(res.data);
    } catch (error) {
    } finally { setLoading(false); }
  };

  const manufacturers = useMemo(() => {
    const unique = [...new Set(hardware.map(h => h.manufacturer))];
    return ["all", ...unique];
  }, [hardware]);

  const filteredHardware = useMemo(() => {
    return hardware.filter(hw => {
      const matchesSearch = !searchQuery || 
        hw.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hw.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hw.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMfr = selectedManufacturer === "all" || hw.manufacturer === selectedManufacturer;
      return matchesSearch && matchesMfr;
    });
  }, [hardware, searchQuery, selectedManufacturer]);

  const filteredIP = useMemo(() => {
    if (!searchQuery) return ipCatalog;
    return ipCatalog.filter(ip => 
      ip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ip.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ip.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white" data-testid="marketplace-page">
      {/* Hero */}
      <section className="py-14 lg:py-16 bg-gradient-to-b from-slate-50 to-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Marketplace</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
              Hardware & IP Marketplace
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Browse RISC-V development boards from our hardware partners and discover open-source and commercial IP blocks for your SoC designs.
            </p>
          </div>

          {/* Partner logos strip */}
          <div className="flex items-center gap-8 mt-8 pt-6 border-t border-border flex-wrap">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Partners:</span>
            <PartnerLogo name="cdac" className="h-7 opacity-70 hover:opacity-100 transition-opacity" />
            <PartnerLogo name="mindgrove" className="h-7 opacity-70 hover:opacity-100 transition-opacity" />
            <PartnerLogo name="upbeat" className="h-7 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Tabs + Search */}
      <section className="sticky top-16 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3">
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              <button 
                data-testid="tab-hardware"
                onClick={() => { setActiveTab("hardware"); setSearchQuery(""); }}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  activeTab === "hardware" 
                    ? "bg-white text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Cpu className="w-4 h-4 inline mr-1.5" /> Hardware ({hardware.length})
              </button>
              <button 
                data-testid="tab-ip"
                onClick={() => { setActiveTab("ip"); setSearchQuery(""); setSelectedManufacturer("all"); }}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  activeTab === "ip" 
                    ? "bg-white text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="w-4 h-4 inline mr-1.5" /> IP Blocks ({ipCatalog.length})
              </button>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  data-testid="marketplace-search"
                  placeholder={activeTab === "hardware" ? "Search boards..." : "Search IP blocks..."}
                  className="pl-9 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {activeTab === "hardware" && manufacturers.length > 2 && (
                <select 
                  data-testid="manufacturer-filter"
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                  value={selectedManufacturer}
                  onChange={(e) => setSelectedManufacturer(e.target.value)}
                >
                  {manufacturers.map(m => (
                    <option key={m} value={m}>{m === "all" ? "All Partners" : m}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "hardware" ? (
            /* HARDWARE TAB */
            loading ? (
              <div className="text-center py-20 text-muted-foreground">Loading hardware catalog...</div>
            ) : filteredHardware.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">No hardware boards match your search.</div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6" data-testid="hardware-grid">
                {filteredHardware.map((hw, i) => (
                  <Card key={i} className="border-border hover:shadow-lg transition-shadow overflow-hidden group">
                    {hw.image_url && (
                      <div className="h-44 bg-slate-50 overflow-hidden">
                        <img src={hw.image_url.startsWith("http") ? hw.image_url : `${BACKEND_URL}${hw.image_url}`} alt={hw.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform" />
                      </div>
                    )}
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <PartnerLogo name={hw.manufacturer?.toLowerCase().includes("mindgrove") ? "mindgrove" : hw.manufacturer?.toLowerCase().includes("c-dac") || hw.manufacturer?.toLowerCase().includes("cdac") ? "cdac" : "upbeat"} className="h-4" />
                          <span className="text-xs text-muted-foreground font-medium">{hw.manufacturer}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{hw.core || hw.arch || "RISC-V"}</Badge>
                      </div>
                      <h3 className="font-bold text-foreground mb-1.5">{hw.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{hw.description}</p>
                      {hw.peripherals && hw.peripherals.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {hw.peripherals.slice(0, 4).map((p, j) => (
                            <span key={j} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{typeof p === "string" ? p : p.name}</span>
                          ))}
                          {hw.peripherals.length > 4 && <span className="text-[10px] text-muted-foreground">+{hw.peripherals.length - 4}</span>}
                        </div>
                      )}
                      {hw.price && (
                        <div className="text-sm font-bold text-primary">{hw.price}</div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          ) : (
            /* IP BLOCKS TAB */
            filteredIP.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">No IP blocks match your search.</div>
            ) : (
              <div className="space-y-4" data-testid="ip-grid">
                {filteredIP.map((ip, i) => (
                  <Card key={i} className="border-border hover:shadow-md transition-shadow" data-testid={`ip-${i}`}>
                    <CardContent className="p-5 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className="font-bold text-lg text-foreground">{ip.name}</h3>
                            {ip.tags.map((tag, j) => (
                              <Badge key={j} className={
                                tag === "Open Source" ? "bg-green-100 text-green-800 border-green-200" :
                                tag === "Security" ? "bg-red-100 text-red-800 border-red-200" :
                                tag === "Commercial" ? "bg-blue-100 text-blue-800 border-blue-200" :
                                "bg-slate-100 text-slate-600 border-slate-200"
                              }>{tag}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                            <span><strong>Provider:</strong> {ip.provider}</span>
                            <span><strong>Type:</strong> {ip.type}</span>
                            <span><strong>ISA:</strong> {ip.arch}</span>
                            {ip.license && <span><strong>License:</strong> {ip.license}</span>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{ip.description}</p>
                          <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                            {ip.features.map((f, j) => (
                              <span key={j} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {f}
                              </span>
                            ))}
                          </div>
                        </div>
                        {ip.github && (
                          <div className="flex-shrink-0">
                            <a href={ip.github} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                <GitBranch className="w-4 h-4 mr-1.5" /> GitHub <ExternalLink className="w-3 h-3 ml-1.5" />
                              </Button>
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-slate-50 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">Want to List Your Hardware or IP?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm">
            Partner with TrusteD-V to reach RISC-V developers and SoC designers.
          </p>
          <Link to="/partner-registration">
            <Button size="lg" className="font-semibold">
              Become a Partner <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
