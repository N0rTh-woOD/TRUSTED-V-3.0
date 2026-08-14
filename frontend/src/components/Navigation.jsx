import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  Menu, X, ArrowUpRight, Shield, LogOut, ChevronDown, Settings,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TrustedVLogo from "@/components/TrustedVLogo";

/**
 * Header — professional semiconductor site nav.
 * - Announcement bar (36px)
 * - Main nav (76px), max-width 1440
 * - Products mega-menu (multi-column) on hover / click
 * - IBM Plex Sans 14–15px, medium weight
 */
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState(null); // 'products' | null
  const megaTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpenMega(null); setMobileOpen(false); }, [location.pathname]);

  const openMegaMenu = (name) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setOpenMega(name);
  };
  const scheduleClose = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setOpenMega(null), 150);
  };

  const items = [
    { label: "Home", to: "/" },
    { label: "Products", key: "products", hasMega: true },
    { label: "Marketplace", to: "/marketplace" },
    { label: "Developers", to: "/developer-portal" },
    { label: "Ecosystem", to: "/partners" },
    { label: "About", to: "/about" },
  ];

  const isActivePath = (to) =>
    to && (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <>
      {/* Main nav */}
      <header
        data-testid="site-nav"
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
          scrolled ? "border-b border-[#E5E4DF] shadow-[0_1px_0_rgba(11,15,20,0.03)]" : "border-b border-[#E5E4DF]/60"
        }`}
      >
        <div className="tv-container">
          <div className="flex items-center justify-between h-[76px]">
            <Link to="/" className="flex items-center flex-shrink-0" data-testid="nav-brand">
              <TrustedVLogo size="sm" />
            </Link>

            {/* Desktop */}
            <nav className="hidden lg:flex items-center gap-1" onMouseLeave={scheduleClose}>
              {items.map((it) => {
                const active = it.to ? isActivePath(it.to) : openMega === it.key;
                return (
                  <div
                    key={it.label}
                    className="relative"
                    onMouseEnter={() => it.hasMega && openMegaMenu(it.key)}
                  >
                    {it.hasMega ? (
                      <>
                        <Link
                          to="/product-suite"
                          onMouseEnter={() => openMegaMenu(it.key)}
                          onClick={() => setOpenMega(null)}
                          data-testid={`nav-${it.label.toLowerCase()}`}
                          className={`px-3.5 py-2 text-[14px] font-medium flex items-center gap-1 transition-colors ${
                            active ? "text-[#003262]" : "text-[#1A1F25] hover:text-[#003262]"
                          }`}
                        >
                          {it.label}
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMega === it.key ? "rotate-180" : ""}`} />
                        </Link>
                      </>
                    ) : (
                      <Link
                        to={it.to}
                        data-testid={`nav-${it.label.toLowerCase()}`}
                        className={`px-3.5 py-2 text-[14px] font-medium transition-colors ${
                          active ? "text-[#003262]" : "text-[#1A1F25] hover:text-[#003262]"
                        }`}
                      >
                        {it.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              {isAdmin && (
                <Link to="/admin" data-testid="nav-admin" className="text-[13.5px] font-medium text-[#1A1F25] hover:text-[#003262] inline-flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Admin
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="text-[#5A6472] hover:text-[#003262]" data-testid="nav-account" aria-label="Account">
                    <Settings className="w-4 h-4" />
                  </Link>
                  <button onClick={handleLogout} data-testid="nav-logout" className="text-[13.5px] font-medium text-[#1A1F25] hover:text-[#003262] inline-flex items-center gap-1.5">
                    <LogOut className="w-3.5 h-3.5" /> Log out
                  </button>
                </>
              ) : (
                <Link to="/login" data-testid="nav-login" className="text-[13.5px] font-medium text-[#1A1F25] hover:text-[#003262]">
                  Sign in
                </Link>
              )}
              <Link to="/contact" data-testid="nav-contact-cta" className="tv-btn tv-btn-primary tv-btn-sm">
                Request a demo <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 -mr-2 text-[#1A1F25]"
              aria-label="Toggle menu"
              data-testid="nav-mobile-toggle"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mega menu */}
          {openMega === "products" && (
            <div
              className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-[#E5E4DF] shadow-[0_20px_40px_-24px_rgba(11,15,20,0.15)]"
              onMouseEnter={() => openMegaMenu("products")}
              onMouseLeave={scheduleClose}
              data-testid="mega-products"
            >
              <div className="tv-container py-10">
                <div className="grid grid-cols-12 gap-10">
                  <MegaCol title="Development Platform" items={[
                    { label: "Jarvyn IDE", to: "/download-ide", note: "Rust-native RISC-V IDE" },
                    { label: "WebIDE", to: "/webide", note: "Zero-install cloud IDE" },
                    { label: "Developer Portal", to: "/developer-portal", note: "SDK, docs, quickstarts" },
                  ]} />
                  <MegaCol title="Software & Security" items={[
                    { label: "Secure Boot", to: "/product/secure-boot", note: "rBoot & rustBoot" },
                    { label: "Crypto Stack", to: "/product/crypto-stack", note: "Classical + PQC" },
                    { label: "RTOS Options", to: "/product/rtos-benchmark", note: "Rust-native, Zephyr, FreeRTOS" },
                  ]} />
                  <MegaCol title="Silicon & IP" items={[
                    { label: "Product Suite Overview", to: "/product-suite", note: "The full platform" },
                    { label: "Marketplace", to: "/marketplace", note: "Boards & IP blocks" },
                    { label: "Ecosystem", to: "/partners", note: "SiFive, Akeana, C-DAC" },
                  ]} />
                  <div className="col-span-3 border-l border-[#E5E4DF] pl-8">
                    <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#5A6472] mb-3">All products</div>
                    <h4 className="tv-h4" style={{ fontSize: "18px" }}>The complete RISC-V platform</h4>
                    <p className="mt-2 text-[13px] text-[#5A6472] leading-relaxed">From IP integration and virtual platforms to certified boot, cryptography and RTOS — unified as TRUSTED-V.</p>
                    <Link to="/product-suite" className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#003262] hover:gap-2.5 transition-all" data-testid="mega-featured-cta">
                      View all products <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#E5E4DF] bg-white">
            <div className="tv-container py-6 flex flex-col">
              <MobileGroup title="Products" links={[
                { label: "Product suite", to: "/product-suite" },
                { label: "Jarvyn IDE", to: "/download-ide" },
                { label: "WebIDE", to: "/webide" },
                { label: "Secure Boot", to: "/product/secure-boot" },
                { label: "Crypto Stack", to: "/product/crypto-stack" },
                { label: "RTOS", to: "/product/rtos-benchmark" },
              ]} />
              <MobileLink label="Marketplace" to="/marketplace" testid="mobile-nav-marketplace" />
              <MobileLink label="Developers" to="/developer-portal" testid="mobile-nav-developers" />
              <MobileLink label="Ecosystem" to="/partners" testid="mobile-nav-ecosystem" />
              <MobileLink label="About" to="/about" testid="mobile-nav-about" />
              {isAdmin && <MobileLink label="Admin" to="/admin" testid="mobile-nav-admin" />}
              <div className="pt-5 flex flex-col gap-2">
                {isAuthenticated ? (
                  <button onClick={() => { handleLogout(); }} className="tv-btn tv-btn-outline w-full" data-testid="mobile-nav-logout">Log out</button>
                ) : (
                  <Link to="/login" className="tv-btn tv-btn-outline w-full" data-testid="mobile-nav-login">Sign in</Link>
                )}
                <Link to="/contact" className="tv-btn tv-btn-primary w-full" data-testid="mobile-nav-contact-cta">
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

const MegaCol = ({ title, items }) => (
  <div className="col-span-3">
    <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#5A6472] mb-4">{title}</div>
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it.label}>
          <Link
            to={it.to}
            className="group block"
            data-testid={`mega-${it.label.toLowerCase().replace(/\W+/g, "-")}`}
          >
            <div className="text-[14px] font-medium text-[#0B0F14] group-hover:text-[#003262] transition-colors">
              {it.label}
            </div>
            {it.note && <div className="text-[12px] text-[#5A6472] mt-0.5">{it.note}</div>}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const MobileGroup = ({ title, links }) => (
  <div className="py-3 border-b border-[#E5E4DF]">
    <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#5A6472] mb-2">{title}</div>
    <div className="flex flex-col gap-2">
      {links.map((l) => (
        <Link
          key={l.label}
          to={l.to}
          className="text-[15px] font-medium text-[#1A1F25]"
          data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\W+/g, "-")}`}
        >
          {l.label}
        </Link>
      ))}
    </div>
  </div>
);

const MobileLink = ({ label, to, testid }) => (
  <Link to={to} className="py-3 text-[15px] font-medium text-[#1A1F25] border-b border-[#E5E4DF]" data-testid={testid}>
    {label}
  </Link>
);

export default Navigation;
