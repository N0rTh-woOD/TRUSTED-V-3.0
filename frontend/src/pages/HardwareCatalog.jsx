import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Cpu, Search, Filter, ExternalLink, ChevronDown, 
  Wifi, Zap, Server, Gauge, MemoryStick, HardDrive
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const HardwareCatalog = () => {
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCore, setSelectedCore] = useState("all");
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");

  useEffect(() => {
    loadHardware();
  }, []);

  const loadHardware = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/hardware`);
      setHardware(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Extract unique values for filters
  const cores = useMemo(() => {
    const unique = [...new Set(hardware.map(h => h.core))];
    return ["all", ...unique];
  }, [hardware]);

  const manufacturers = useMemo(() => {
    const unique = [...new Set(hardware.map(h => h.manufacturer))];
    return ["all", ...unique];
  }, [hardware]);

  // Filter hardware
  const filteredHardware = useMemo(() => {
    return hardware.filter(hw => {
      const matchesSearch = !searchQuery || 
        hw.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hw.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hw.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCore = selectedCore === "all" || hw.core === selectedCore;
      const matchesManufacturer = selectedManufacturer === "all" || hw.manufacturer === selectedManufacturer;
      
      return matchesSearch && matchesCore && matchesManufacturer;
    });
  }, [hardware, searchQuery, selectedCore, selectedManufacturer]);

  const getCoreColor = (core) => {
    if (core.includes("64")) return "bg-purple-100 text-purple-800 border-purple-200";
    if (core.includes("32")) return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Hardware Catalog</span>
            <h1 className="text-4xl font-bold text-foreground mt-2 mb-4">
              RISC-V Development Boards
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive catalog of supported RISC-V development boards, from microcontrollers to high-performance SBCs. 
              Each board is fully tested and compatible with TRUSTED-V tools.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-border sticky top-[68px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search boards by name, manufacturer, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Core Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCore}
                onChange={(e) => setSelectedCore(e.target.value)}
                className="px-3 py-2 border border-border rounded-md text-sm bg-white"
              >
                <option value="all">All Cores</option>
                {cores.filter(c => c !== "all").map(core => (
                  <option key={core} value={core}>{core}</option>
                ))}
              </select>
            </div>
            
            {/* Manufacturer Filter */}
            <select
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm bg-white"
            >
              <option value="all">All Manufacturers</option>
              {manufacturers.filter(m => m !== "all").map(mfr => (
                <option key={mfr} value={mfr}>{mfr}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Hardware Grid */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-muted-foreground mt-4">Loading hardware catalog...</p>
            </div>
          ) : filteredHardware.length === 0 ? (
            <div className="text-center py-12">
              <Cpu className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No hardware found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredHardware.length} of {hardware.length} boards
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHardware.map((hw) => (
                  <Card 
                    key={hw.id} 
                    className="bg-white hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    data-testid={`hardware-card-${hw.id}`}
                  >
                    {/* Hardware Image */}
                    <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
                      {hw.image_url ? (
                        <img src={hw.image_url.startsWith("/api") ? `${BACKEND_URL}${hw.image_url}` : hw.image_url} alt={hw.name} className="w-full h-full object-cover" />
                      ) : (
                        <Cpu className="w-16 h-16 text-slate-300" />
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge className={getCoreColor(hw.core)}>{hw.core}</Badge>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-white/90 text-foreground border-0 text-xs font-medium shadow-sm">{hw.manufacturer}</Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                            {hw.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{hw.manufacturer}</p>
                        </div>
                        {hw.price && (
                          <span className="font-semibold text-primary">{hw.price}</span>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {hw.description}
                      </p>
                      
                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Gauge className="w-3.5 h-3.5 text-primary" />
                          <span>{hw.clock_speed}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MemoryStick className="w-3.5 h-3.5 text-primary" />
                          <span>{hw.memory}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <HardDrive className="w-3.5 h-3.5 text-primary" />
                          <span>{hw.flash}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Zap className="w-3.5 h-3.5 text-primary" />
                          <span>{hw.peripherals?.length || 0} peripherals</span>
                        </div>
                      </div>
                      
                      {/* Peripherals */}
                      {hw.peripherals && hw.peripherals.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {hw.peripherals.slice(0, 5).map((p, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                              {p.name}
                            </span>
                          ))}
                          {hw.peripherals.length > 5 && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                              +{hw.peripherals.length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        View Details
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Can't find your board?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We're constantly adding new hardware support. Contact us to request support for your specific development board.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/board-support">
              <Button>Request Board Support</Button>
            </Link>
            <Link to="/partner-registration">
              <Button variant="outline">Become a Hardware Partner</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HardwareCatalog;
