import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, Cpu, Zap, HardDrive, Layers, Search } from "lucide-react";

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
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Hardware Catalog
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Browse our curated collection of RISC-V development boards
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              data-testid="hardware-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, manufacturer, or core..."
              className="pl-10 h-11"
            />
          </div>
        </div>
        
        {/* Hardware Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHardware.map((hw) => (
            <Card 
              key={hw.id}
              data-testid={`hardware-card-${hw.id}`}
              className="bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {hw.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{hw.manufacturer}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 pt-0 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {hw.description}
                </p>
                
                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Core</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{hw.core}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Speed</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{hw.clock_speed}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Memory</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{hw.memory}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>Flash</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{hw.flash}</p>
                  </div>
                </div>
                
                {/* Peripherals */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground font-medium mb-3">
                    Peripherals
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {hw.peripherals.map((peripheral, index) => (
                      <Badge 
                        key={index}
                        data-testid={`peripheral-${index}`}
                        variant="secondary"
                        className="text-xs"
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
          <div className="text-center py-16">
            <Cpu className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No hardware found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HardwareCatalog;
