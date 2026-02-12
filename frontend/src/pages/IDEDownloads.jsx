import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, Monitor, CheckCircle2 } from "lucide-react";
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

  const features = [
    "Rust Toolchain",
    "GDB Debugger",
    "RISC-V Emulator",
    "Project Templates",
  ];

  const installSteps = [
    "Download the IDE for your platform",
    "Extract the downloaded archive to your preferred location",
    "Run the installer or launch the IDE executable",
    "Import your generated project ZIP files and start development",
  ];
  
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
            IDE Downloads
          </h1>
          <p className="text-muted-foreground text-lg">
            Download the complete TrusteD-V Studio IDE for your platform
          </p>
        </div>
        
        {/* IDE Info */}
        <Card className="bg-card border border-border mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Monitor className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  TrusteD-V Studio
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A complete integrated development environment tailored for RISC-V embedded systems development with Rust. 
                  Includes the full Rust toolchain, debugger support, RISC-V emulator, and project templates.
                </p>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Platform Downloads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {downloads.map((download) => (
            <Card 
              key={download.id}
              data-testid={`ide-download-${download.platform.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-foreground">
                    {download.platform}
                  </h3>
                  <Badge variant="outline">
                    v{download.version}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {download.description}
                </p>
                
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Size</p>
                  <p className="text-sm font-medium text-foreground">{download.size}</p>
                </div>
                
                <Button
                  data-testid={`download-ide-btn-${download.platform.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleDownload(download)}
                  className="w-full h-11 shadow-lg shadow-primary/25"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Installation Note */}
        <Card className="bg-card border border-border">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4">
              Installation Instructions
            </h3>
            <ol className="space-y-3">
              {installSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IDEDownloads;
