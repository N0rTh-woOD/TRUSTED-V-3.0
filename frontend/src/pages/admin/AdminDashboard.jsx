import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, Package, Layers, Download, Database, ArrowRight, Brain, Bell, Cpu, Building2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const statCards = [
    { label: "Hardware Boards", value: stats?.hardware || 0, icon: Package, color: "text-primary" },
    { label: "RTOS/Middleware", value: stats?.middleware || 0, icon: Layers, color: "text-blue-500" },
    { label: "Software Components", value: stats?.software_components || 0, icon: Database, color: "text-green-500" },
    { label: "IDE Downloads", value: stats?.ide_downloads || 0, icon: Download, color: "text-amber-500" },
  ];

  const adminSections = [
    {
      title: "Hardware Database",
      description: "Manage RISC-V development boards, microcontrollers, and their specifications",
      icon: Package,
      link: "/admin/hardware",
      count: stats?.hardware || 0,
    },
    {
      title: "RTOS & Middleware",
      description: "Manage real-time operating systems, async frameworks, and middleware",
      icon: Layers,
      link: "/admin/middleware",
      count: stats?.middleware || 0,
    },
    {
      title: "Software Components",
      description: "Manage BSPs, SDKs, Drivers, Bootloaders, and Libraries",
      icon: Database,
      link: "/admin/software",
      count: stats?.software_components || 0,
    },
    {
      title: "IDE Downloads",
      description: "Manage IDE versions and download links for different platforms",
      icon: Download,
      link: "/admin/ide",
      count: stats?.ide_downloads || 0,
    },
    {
      title: "LLM Configuration",
      description: "Configure AI model for code generation (provider, model, API key)",
      icon: Brain,
      link: "/admin/llm",
      count: null,
    },
    {
      title: "Applications",
      description: "Review board support requests and partnership applications",
      icon: Bell,
      link: "/admin/applications",
      count: (stats?.board_support_requests || 0) + (stats?.partnership_applications || 0),
      pending: stats?.pending_notifications || 0,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage platform databases and content
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-card border border-border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Software Component Types Breakdown */}
        {stats?.software_by_type && (
          <Card className="bg-card border border-border mb-8">
            <CardHeader className="p-6 pb-4">
              <h3 className="font-semibold text-foreground">Software Components by Type</h3>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {Object.entries(stats.software_by_type).map(([type, count]) => (
                  <div key={type} className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">{count}</p>
                    <p className="text-xs text-muted-foreground">{type}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Management Sections */}
        <h2 className="text-xl font-semibold text-foreground mb-4">Database Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.link} to={section.link}>
                <Card
                  data-testid={`admin-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all h-full group"
                >
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      {section.title}
                      {section.pending > 0 && (
                        <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0.5">{section.pending} new</Badge>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {section.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {section.count !== null ? `${section.count} items` : "Settings"}
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
