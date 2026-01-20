import { Link, useLocation, useNavigate } from "react-router-dom";
import { Cpu, Zap, Package, FolderGit2, Download, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  
  const publicNavItems = [
    { path: "/", label: "Home", icon: Cpu },
    { path: "/hardware", label: "Hardware", icon: Package },
    { path: "/ide", label: "IDE", icon: Download },
  ];
  
  const authNavItems = [
    { path: "/builder", label: "Builder", icon: Zap },
    { path: "/my-projects", label: "My Projects", icon: FolderGit2 },
  ];
  
  const navItems = isAuthenticated ? [...publicNavItems, ...authNavItems] : publicNavItems;
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  return (
    <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(183,65,14,0.3)]">
              <Cpu className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-mono font-bold text-lg uppercase tracking-wider text-foreground/90">
              RV-RUST
            </span>
          </Link>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                  className={`
                    px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider
                    flex items-center gap-2 transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(183,65,14,0.3)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
            
            {isAdmin && (
              <Link
                to="/admin"
                data-testid="nav-admin"
                className="px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden md:inline">Admin</span>
              </Link>
            )}
            
            {isAuthenticated ? (
              <Button
                data-testid="logout-btn"
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="ml-2 px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider"
              >
                <LogOut className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            ) : (
              <Button
                data-testid="login-btn"
                onClick={() => navigate("/login")}
                variant="outline"
                size="sm"
                className="ml-2 px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;