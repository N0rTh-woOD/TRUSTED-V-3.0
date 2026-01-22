import { Link, useLocation, useNavigate } from "react-router-dom";
import { Cpu, Zap, Package, FolderGit2, Download, LogOut, Shield, Menu, X, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const publicNavItems = [
    { path: "/", label: "Home", icon: Cpu },
    { path: "/hardware", label: "Hardware", icon: Package },
    { path: "/ide", label: "IDE", icon: Download },
  ];
  
  const authNavItems = [
    { path: "/builder", label: "Builder", icon: Zap },
    { path: "/my-projects", label: "My Projects", icon: FolderGit2 },
    { path: "/account", label: "Account", icon: Settings },
  ];
  
  const navItems = isAuthenticated ? [...publicNavItems, ...authNavItems] : publicNavItems;
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <Cpu className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base text-foreground tracking-tight">
                RV-RUST
              </span>
              <span className="text-[10px] text-muted-foreground -mt-0.5 hidden sm:block">
                RISC-V Development Platform
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium
                    flex items-center gap-2 transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {isAdmin && (
              <Link
                to="/admin"
                data-testid="nav-admin"
                className={`
                  px-4 py-2 rounded-md text-sm font-medium
                  flex items-center gap-2 transition-all duration-200
                  ${location.pathname.startsWith('/admin') 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }
                `}
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
            
            <div className="w-px h-6 bg-border mx-2" />
            
            {isAuthenticated ? (
              <Button
                data-testid="logout-btn"
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                data-testid="login-btn"
                onClick={() => navigate("/login")}
                size="sm"
                className="px-5 py-2 text-sm font-medium"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      px-4 py-3 rounded-md text-sm font-medium
                      flex items-center gap-3 transition-all duration-200
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-md text-sm font-medium flex items-center gap-3 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
              )}
              
              <div className="h-px bg-border my-2" />
              
              {isAuthenticated ? (
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="px-4 py-3 rounded-md text-sm font-medium flex items-center gap-3 text-muted-foreground hover:text-foreground hover:bg-muted w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-md text-sm font-medium flex items-center gap-3 bg-primary text-primary-foreground"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
