import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, Download, Clock, FolderGit2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MyProjects = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await axios.get(`${API}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to load projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (projectId, version) => {
    try {
      const response = await axios.get(
        `${API}/projects/${projectId}/download/${version}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.info(response.data.message);
    } catch (error) {
      console.error("Failed to download:", error);
      toast.error("Download failed");
    }
  };

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
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Projects
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your RISC-V projects and versions
            </p>
          </div>
          <Button
            data-testid="new-project-btn"
            onClick={() => navigate("/builder")}
            className="h-11 px-6 shadow-lg shadow-primary/25"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card className="bg-card border border-border">
            <CardContent className="p-16 text-center">
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-6">
                <FolderGit2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Projects Yet
              </h3>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                Start building with the Smart Project Builder to create your first RISC-V project
              </p>
              <Button
                data-testid="start-building-btn"
                onClick={() => navigate("/builder")}
                className="h-11 px-8 shadow-lg shadow-primary/25"
              >
                Start Building
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                data-testid={`project-card-${project.id}`}
                className="bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <CardHeader className="p-6 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {project.versions.length}{" "}
                      {project.versions.length === 1 ? "Version" : "Versions"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-3">
                    {project.versions.map((version, index) => (
                      <div
                        key={index}
                        data-testid={`version-${index}`}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Package className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              Version {version.version}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>
                                {new Date(version.generated_at).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          data-testid={`download-btn-${index}`}
                          onClick={() => handleDownload(project.id, version.version)}
                          variant="outline"
                          size="sm"
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

export default MyProjects;
