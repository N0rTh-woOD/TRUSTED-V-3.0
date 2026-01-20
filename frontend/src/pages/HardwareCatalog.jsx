import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, Cpu, Zap, HardDrive, Layers } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HardwareCatalog = () => {
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    loadHardware();
  }, []);
  
  const loadHardware = async () => {
    try {
      const response = await axios.get(`${API}/hardware`);
      setHardware(response.data);
    } catch (error) {
      console.error("Failed to load hardware:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredHardware = hardware.filter(hw => 
    hw.name.toLowerCase().includes(search.toLowerCase()) ||
    hw.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
    hw.core.toLowerCase().includes(search.toLowerCase())
  );
  
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-mono font-bold uppercase tracking-tight text-3xl md:text-4xl text-foreground/90 mb-2">
            Hardware Catalog
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            Browse our curated collection of RISC-V development boards
          </p>
          
          <Input
            data-testid="hardware-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, manufacturer, or core..."
            className="max-w-md bg-muted/20 border-border/50 font-mono text-sm focus:ring-1 focus:ring-primary rounded-sm h-11"
          />
        </div>
        
        {/* Hardware Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHardware.map((hw) => (
            <Card 
              key={hw.id}
              data-testid={`hardware-card-${hw.id}`}
              className="bg-card border border-border/50 rounded-sm hover:border-primary/50 transition-colors duration-300"
            >
              <CardHeader className="border-b border-border/40 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-mono font-bold uppercase tracking-tight text-lg text-foreground/90 mb-1">
                      {hw.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{hw.manufacturer}</p>
                  </div>
                  <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {hw.description}
                </p>
                
                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/70 uppercase tracking-widest font-mono">
                      <Cpu className="w-3 h-3" />
                      <span>Core</span>
                    </div>
                    <p className="text-sm font-mono text-foreground">{hw.core}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/70 uppercase tracking-widest font-mono">
                      <Zap className="w-3 h-3" />
                      <span>Speed</span>
                    </div>
                    <p className="text-sm font-mono text-foreground">{hw.clock_speed}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/70 uppercase tracking-widest font-mono">
                      <Layers className="w-3 h-3" />
                      <span>Memory</span>
                    </div>
                    <p className="text-sm font-mono text-foreground">{hw.memory}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/70 uppercase tracking-widest font-mono">
                      <HardDrive className="w-3 h-3" />
                      <span>Flash</span>
                    </div>
                    <p className="text-sm font-mono text-foreground">{hw.flash}</p>
                  </div>
                </div>
                
                {/* Peripherals */}
                <div className="pt-4 border-t border-border/40">
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-3">
                    Peripherals
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {hw.peripherals.map((peripheral, index) => (
                      <Badge 
                        key={index}
                        data-testid={`peripheral-${index}`}
                        variant="secondary" 
                        className="font-mono text-xs"
                      >
                        {peripheral.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredHardware.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hardware found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HardwareCatalog;