import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, Package, Layers, Users, FolderGit2, ArrowRight } from "lucide-react";

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
    { label: "Hardware", value: stats?.hardware || 0, icon: Package, color: "text-primary" },
    { label: "Middleware", value: stats?.middleware || 0, icon: Layers, color: "text-blue-500" },
    { label: "Users", value: stats?.users || 0, icon: Users, color: "text-green-500" },
    { label: "Projects", value: stats?.projects || 0, icon: FolderGit2, color: "text-amber-500" },
  ];

  const adminSections = [
    {
      title: "Hardware Management",
      description: "Add, edit, and remove RISC-V hardware boards from the catalog",
      icon: Package,
      link: "/admin/hardware",
      count: stats?.hardware || 0,
    },
    {
      title: "Middleware Management",
      description: "Manage RTOS, frameworks, and middleware components",
      icon: Layers,
      link: "/admin/middleware",
      count: stats?.middleware || 0,
    },
    {
      title: "User Management",
      description: "View and manage platform users and their permissions",
      icon: Users,
      link: "/admin/users",
      count: stats?.users || 0,
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
            Manage platform content and users
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

        {/* Management Sections */}
        <h2 className="text-xl font-semibold text-foreground mb-4">Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.link} to={section.link}>
                <Card
                  data-testid={`admin-section-${section.title.toLowerCase().replace(' ', '-')}`}
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
                    <h3 className="font-semibold text-foreground mb-2">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {section.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {section.count} items
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
