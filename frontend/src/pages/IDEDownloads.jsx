import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, Monitor } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const IDEDownloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadDownloads();
  }, []);
  
  const loadDownloads = async () => {
    try {
      const response = await axios.get(`${API}/ide-downloads`);
      setDownloads(response.data);
    } catch (error) {
      console.error("Failed to load IDE downloads:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = (download) => {
    toast.info(`Download link coming soon for ${download.platform}`);
  };
  
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
            IDE Downloads
          </h1>
          <p className="text-muted-foreground text-sm">
            Download the complete RISC-V Rust Studio IDE for your platform
          </p>
        </div>
        
        {/* IDE Info */}
        <Card className="bg-card border border-border/50 rounded-sm mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-mono font-bold uppercase tracking-tight text-lg text-foreground/90 mb-2">
                  RISC-V Rust Studio
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  A complete integrated development environment tailored for RISC-V embedded systems development with Rust. 
                  Includes the full Rust toolchain, debugger support, RISC-V emulator, and project templates.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="font-mono text-xs">
                    Rust Toolchain
                  </Badge>
                  <Badge variant="secondary" className="font-mono text-xs">
                    GDB Debugger
                  </Badge>
                  <Badge variant="secondary" className="font-mono text-xs">
                    RISC-V Emulator
                  </Badge>
                  <Badge variant="secondary" className="font-mono text-xs">
                    Project Templates
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Platform Downloads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {downloads.map((download) => (
            <Card 
              key={download.id}
              data-testid={`ide-download-${download.platform.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-card border border-border/50 rounded-sm hover:border-primary/50 transition-colors duration-300"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono font-bold uppercase tracking-tight text-base text-foreground/90">
                    {download.platform}
                  </h3>
                  <Badge variant="outline" className="font-mono text-xs">
                    v{download.version}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {download.description}
                </p>
                
                <div className="pt-2 border-t border-border/40">
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-1">
                    Size
                  </p>
                  <p className="text-sm font-mono text-foreground">{download.size}</p>
                </div>
                
                <Button
                  data-testid={`download-ide-btn-${download.platform.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleDownload(download)}
                  className="w-full rounded-sm font-mono uppercase tracking-wider text-xs h-10 shadow-[0_0_10px_rgba(183,65,14,0.3)] hover:shadow-[0_0_20px_rgba(183,65,14,0.5)] transition-all duration-300 mt-2"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Installation Note */}
        <Card className="bg-card border border-border/50 rounded-sm mt-8">
          <CardContent className="p-6">
            <h3 className="font-mono font-bold uppercase tracking-tight text-sm text-foreground/90 mb-3">
              Installation Instructions
            </h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-mono text-primary">1.</span>
                <span>Download the IDE for your platform</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-primary">2.</span>
                <span>Extract the downloaded archive to your preferred location</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-primary">3.</span>
                <span>Run the installer or launch the IDE executable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-primary">4.</span>
                <span>Import your generated project ZIP files and start development</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IDEDownloads;