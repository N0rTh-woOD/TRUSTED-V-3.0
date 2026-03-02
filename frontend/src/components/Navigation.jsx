import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Cpu, Zap, Package, FolderGit2, Download, LogOut, Shield, Menu, X, 
  Settings, BookOpen, Users, Info, Home, Layers, Code
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Main navigation items - visible to all
  const mainNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: Info },
    { path: "/product-suite", label: "Products", icon: Layers },
    { path: "/developer-portal", label: "Developer Portal", icon: Code },
    { path: "/hardware-catalog", label: "Hardware", icon: Cpu },
    { path: "/partners", label: "Partners", icon: Users },
  ];
  
  // Authenticated user items
  const authNavItems = [
    { path: "/solution-builder", label: "Solution Builder", icon: Zap },
    { path: "/projects", label: "My Projects", icon: FolderGit2 },
  ];
  
  const navItems = isAuthenticated ? [...mainNavItems, ...authNavItems] : mainNavItems;
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  return (
    <>
      {/* Bosch-style Red Top Border */}
      <div className="h-1 bg-[#E20015] w-full" />
      
      {/* Main Navigation */}
      <nav className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-foreground tracking-tight">
                  TrusteD-V
                </span>
                <span className="text-[10px] text-muted-foreground -mt-0.5 hidden sm:block font-medium">
                  Secure RISC-V Development Platform
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.slice(0, 6).map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                    className={`
                      px-3 py-2 text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            
            {/* Right Side - Auth */}
            <div className="hidden lg:flex items-center gap-2">
              {isAuthenticated && (
                <>
                  <Link
                    to="/solution-builder"
                    data-testid="nav-solution-builder"
                    className={`
                      px-3 py-2 text-sm font-medium transition-all duration-200
                      ${location.pathname === '/solution-builder' 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    Solution Builder
                  </Link>
                  <Link
                    to="/projects"
                    data-testid="nav-projects"
                    className={`
                      px-3 py-2 text-sm font-medium transition-all duration-200
                      ${location.pathname === '/projects' 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    My Projects
                  </Link>
                </>
              )}
              
              {isAdmin && (
                <Link
                  to="/admin"
                  data-testid="nav-admin"
                  className={`
                    px-3 py-2 text-sm font-medium flex items-center gap-1 transition-all duration-200
                    ${location.pathname.startsWith('/admin') 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}
              
              <div className="w-px h-6 bg-border mx-2" />
              
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/account"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="w-4 h-4" />
                  </Link>
                  <Button
                    data-testid="logout-btn"
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  data-testid="login-btn"
                  onClick={() => navigate("/login")}
                  size="sm"
                  className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90"
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
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
                            ? "bg-primary text-white"
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
                    className="px-4 py-3 rounded-md text-sm font-medium flex items-center gap-3 bg-primary text-white"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
