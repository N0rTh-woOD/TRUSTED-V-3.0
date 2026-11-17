import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Package, Clock, FolderGit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MyProjects = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProject, setExpandedProject] = useState(null);

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
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    try {
      await axios.delete(`${API}/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Project deleted successfully");
      loadProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const toggleExpand = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
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
              View your historical RISC-V project records
            </p>
          </div>
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
                Historical project records will appear here when available.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                data-testid={`project-card-${project.id}`}
                className="bg-card border border-border"
              >
                <CardHeader className="p-6 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {project.name}
                        </h3>
                        <Badge variant="secondary">
                          {project.versions?.length || 0} Versions
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                        <span>Updated: {new Date(project.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleExpand(project.id)}
                      >
                        {expandedProject === project.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {expandedProject === project.id && (
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-foreground mb-4">Version History</h4>
                    <div className="space-y-3">
                      {project.versions?.map((version, index) => (
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
                              {version.peripherals?.length > 0 && (
                                <div className="flex items-center gap-1 mt-1">
                                  {version.peripherals.slice(0, 3).map((p, i) => (
                                    <Badge key={i} variant="outline" className="text-[10px]">
                                      {p}
                                    </Badge>
                                  ))}
                                  {version.peripherals.length > 3 && (
                                    <Badge variant="outline" className="text-[10px]">
                                      +{version.peripherals.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>

                    {(!project.versions || project.versions.length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No versions generated yet
                      </p>
                    )}
                  </CardContent>
                )}

                {expandedProject !== project.id && project.versions?.length > 0 && (
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="w-4 h-4" />
                        <span>Latest: Version {project.versions[project.versions.length - 1]?.version}</span>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
