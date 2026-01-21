import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, Package, Layers, Users, FolderGit2, Settings, Database } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await axios.get(`${API}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const adminSections = [
    {
      title: "Hardware Management",
      description: "Add, edit, and remove RISC-V hardware boards",
      icon: Package,
      link: "/admin/hardware",
      count: stats?.hardware || 0,
      color: "text-primary",
    },
    {
      title: "Middleware Management",
      description: "Manage RTOS, frameworks, and middleware",
      icon: Layers,
      link: "/admin/middleware",
      count: stats?.middleware || 0,
      color: "text-secondary",
    },
    {
      title: "User Management",
      description: "View and manage platform users",
      icon: Users,
      link: "/admin/users",
      count: stats?.users || 0,
      color: "text-foreground",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="mb-8">
          <h1 className="font-mono font-bold uppercase tracking-tight text-3xl md:text-4xl text-foreground/90 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage platform content and users
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border border-border/50 rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-1">
                    Hardware
                  </p>
                  <p className="text-3xl font-mono font-bold text-foreground/90">
                    {stats?.hardware || 0}
                  </p>
                </div>
                <Package className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border/50 rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-1">
                    Middleware
                  </p>
                  <p className="text-3xl font-mono font-bold text-foreground/90">
                    {stats?.middleware || 0}
                  </p>
                </div>
                <Layers className="w-10 h-10 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border/50 rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-1">
                    Users
                  </p>
                  <p className="text-3xl font-mono font-bold text-foreground/90">
                    {stats?.users || 0}
                  </p>
                </div>
                <Users className="w-10 h-10 text-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border/50 rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-1">
                    Projects
                  </p>
                  <p className="text-3xl font-mono font-bold text-foreground/90">
                    {stats?.projects || 0}
                  </p>
                </div>
                <FolderGit2 className="w-10 h-10 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.link} to={section.link}>
                <Card
                  data-testid={`admin-section-${section.title.toLowerCase().replace(' ', '-')}`}
                  className="bg-card border border-border/50 rounded-sm hover:border-primary/50 transition-all duration-300 cursor-pointer h-full"
                >
                  <CardHeader className="border-b border-border/40 p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${section.color}`} />
                      </div>
                      <div>
                        <h3 className="font-mono font-bold uppercase tracking-tight text-base text-foreground/90">
                          {section.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {section.count} items
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;