import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, Download, Clock, Cpu } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProjectsDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadProjects();
  }, []);
  
  const loadProjects = async () => {
    try {
      const response = await axios.get(`${API}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = (projectId, version) => {
    toast.info(`Project download feature coming soon! (ID: ${projectId}, Version: ${version})`);
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
            Projects Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your generated RISC-V Rust projects and download versions
          </p>
        </div>
        
        {projects.length === 0 ? (
          <Card className="bg-card border border-border/50 rounded-sm">
            <CardContent className="p-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-mono font-bold uppercase text-lg text-foreground/90 mb-2">
                No Projects Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start a conversation with the AI assistant to generate your first project
              </p>
              <Button
                data-testid="start-chat-btn"
                onClick={() => window.location.href = '/chat'}
                className="rounded-sm font-mono uppercase tracking-wider text-xs h-10 px-6 shadow-[0_0_10px_rgba(183,65,14,0.3)] hover:shadow-[0_0_20px_rgba(183,65,14,0.5)] transition-all duration-300"
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <Card 
                key={project.id}
                data-testid={`project-card-${project.id}`}
                className="bg-card border border-border/50 rounded-sm hover:border-primary/50 transition-colors duration-300"
              >
                <CardHeader className="border-b border-border/40 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-mono font-bold uppercase tracking-tight text-lg text-foreground/90 mb-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {project.versions.length} {project.versions.length === 1 ? 'Version' : 'Versions'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  {/* Versions */}
                  <div className="space-y-3">
                    {project.versions.map((version, index) => (
                      <div 
                        key={index}
                        data-testid={`version-${index}`}
                        className="flex items-center justify-between p-4 rounded-sm bg-muted/20 border border-border/40"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center">
                            <Package className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-mono text-sm font-bold text-foreground/90">
                              Version {version.version}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(version.generated_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          data-testid={`download-btn-${index}`}
                          onClick={() => handleDownload(project.id, version.version)}
                          variant="outline"
                          size="sm"
                          className="rounded-sm font-mono uppercase tracking-wider text-xs"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsDashboard;