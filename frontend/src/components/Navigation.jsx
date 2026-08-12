import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Shield, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TrustedVLogo from "@/components/TrustedVLogo";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { path: "/product-suite", label: "Products" },
    { path: "/marketplace", label: "Marketplace" },
    { path: "/developer-portal", label: "Developers" },
    { path: "/download-ide", label: "IDE" },
    { path: "/partners", label: "Partners" },
    { path: "/about", label: "About" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header
        data-testid="site-nav"
        className={`sticky top-0 z-50 bg-white transition-[border,box-shadow] duration-200 ${
          scrolled ? "border-b border-[#E7E5E0] shadow-[0_1px_0_rgba(0,0,0,0.02)]" : "border-b border-transparent"
        }`}
      >
        <div className="tv-container">
          <div className="flex items-center justify-between h-[64px]">
            {/* Brand */}
            <Link to="/" className="flex items-center flex-shrink-0" data-testid="nav-brand">
              <TrustedVLogo size="sm" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {nav.map((item) => {
                const isActive =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                    className={`relative text-[13px] font-medium tracking-[0.005em] transition-colors duration-200 py-2 ${
                      isActive ? "text-[#003262]" : "text-[#1F1F1F] hover:text-[#003262]"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#003262]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right */}
            <div className="hidden lg:flex items-center gap-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  data-testid="nav-admin"
                  className="text-[13px] font-medium text-[#1F1F1F] hover:text-[#003262] flex items-center gap-1.5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </Link>
              )}

              {isAuthenticated ? (
                <div className="flex items-center gap-3.5">
                  <Link
                    to="/account"
                    className="text-[#6B6B6B] hover:text-[#003262] transition-colors"
                    aria-label="Account settings"
                    data-testid="nav-account"
                  >
                    <Settings className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    data-testid="nav-logout"
                    className="text-[13px] font-medium text-[#1F1F1F] hover:text-[#003262] flex items-center gap-1.5"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  data-testid="nav-login"
                  className="text-[13px] font-medium text-[#1F1F1F] hover:text-[#003262]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Sign in
                </Link>
              )}

              <Link
                to="/contact"
                data-testid="nav-contact-cta"
                className="tv-btn tv-btn-primary"
                style={{ padding: "0.55rem 0.95rem", fontSize: "12.5px" }}
              >
                Request a demo <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 -mr-2 text-[#1F1F1F]"
              aria-label="Toggle menu"
              data-testid="nav-mobile-toggle"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#E7E5E0] bg-white">
            <div className="tv-container py-6 flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                  className="py-3 text-[15px] font-medium text-[#1F1F1F] hover:text-[#003262] border-b border-[#F3F3EE]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-[15px] font-medium text-[#1F1F1F] flex items-center gap-2 border-b border-[#F3F3EE]"
                >
                  <Shield className="w-4 h-4" /> Admin
                </Link>
              )}
              <div className="pt-4 flex flex-col gap-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="tv-btn tv-btn-outline w-full justify-center"
                    data-testid="mobile-nav-logout"
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="tv-btn tv-btn-outline w-full justify-center"
                    data-testid="mobile-nav-login"
                  >
                    Sign in
                  </Link>
                )}
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="tv-btn tv-btn-primary w-full justify-center"
                  data-testid="mobile-nav-contact-cta"
                >
                  Request a demo <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navigation;
