import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X, ArrowUpRight, Shield, LogOut, ChevronDown, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TrustedVLogo from "@/components/TrustedVLogo";

const NAV_ITEMS = [
  { label: "Products", key: "products", to: "/product-suite", hasMega: true, match: ["/product-suite", "/product/", "/download-ide", "/webide"] },
  { label: "Marketplace", to: "/marketplace" },
  { label: "Developers", to: "/developer-portal" },
  { label: "Platform", to: "/partners" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
];

const MEGA = [
  { title: "Development Platform", items: [
    { label: "Jarvyn IDE", to: "/download-ide", note: "Rust-native RISC-V IDE" },
    { label: "WebIDE", to: "/webide", note: "Zero-install cloud IDE" },
    { label: "Code Engine", to: "/product/code-engine", note: "AI-assisted project planning" },
    { label: "Developer Portal", to: "/developer-portal", note: "AI Engines, docs, quickstarts" },
  ] },
  { title: "Software & Security", items: [
    { label: "Secure Boot", to: "/product/secure-boot", note: "rBoot & rustBoot" },
    { label: "Crypto Stack", to: "/product/crypto-stack", note: "Classical + PQC" },
    { label: "RTOS Options", to: "/product/rtos-benchmark", note: "Rust-native RTOS & benchmarks" },
  ] },
  { title: "Silicon & IP", items: [
    { label: "Product Suite Overview", to: "/product-suite", note: "The full platform" },
    { label: "Marketplace", to: "/marketplace", note: "Boards & IP blocks" },
    { label: "Platform", to: "/partners", note: "Build with SiFive and TRUSTED-V" },
  ] },
];

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout, user } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const megaTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpenMega(null); setMobileOpen(false); }, [location.pathname]);

  const openMegaMenu = (name) => { clearTimeout(megaTimer.current); setOpenMega(name); };
  const scheduleClose = () => { clearTimeout(megaTimer.current); megaTimer.current = setTimeout(() => setOpenMega(null), 150); };

  const isActive = (it) => {
    const paths = it.match || [it.to];
    return paths.some((p) => location.pathname.startsWith(p));
  };
  const isHome = location.pathname === "/";
  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <header
      data-testid="site-nav"
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "border-b border-[#E5E4DF]" : "border-b border-[#E5E4DF]/60"}`}
    >
      <div className="tv-container">
        <div className="flex items-center justify-between h-[76px]">
          <Link to="/" className="relative flex items-center flex-shrink-0 py-2" data-testid="nav-brand" aria-current={isHome ? "page" : undefined}>
            <TrustedVLogo size="sm" />
            {isHome && <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#2486C7] rounded-full" data-testid="nav-brand-active" />}
          </Link>

          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={scheduleClose}>
            {NAV_ITEMS.map((it) => {
              const active = isActive(it) || openMega === it.key;
              return (
                <div key={it.label} className="relative" onMouseEnter={() => it.hasMega && openMegaMenu(it.key)}>
                  <Link
                    to={it.to}
                    onClick={() => setOpenMega(null)}
                    data-testid={`nav-${it.label.toLowerCase()}`}
                    aria-current={isActive(it) ? "page" : undefined}
                    className={`px-3.5 py-2 text-[14px] font-medium flex items-center gap-1 transition-colors ${active ? "tv-nav-pill" : "text-[#1A1F25] hover:text-[#003262]"}`}
                  >
                    {it.label}
                    {it.hasMega && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMega === it.key ? "rotate-180" : ""}`} />}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <AccountMenu user={user} isAdmin={isAdmin} onLogout={handleLogout} />
            ) : (
              <Link to="/login" data-testid="nav-login" className="text-[13.5px] font-medium text-[#1A1F25] hover:text-[#003262]">Sign in</Link>
            )}
            <Link to="/contact" data-testid="nav-contact-cta" className="tv-btn tv-btn-primary tv-btn-sm">
              Request a demo <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden p-2 -mr-2 text-[#1A1F25]" aria-label="Toggle menu" data-testid="nav-mobile-toggle">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {openMega === "products" && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-[#E5E4DF] shadow-[0_20px_40px_-24px_rgba(11,15,20,0.15)]"
            onMouseEnter={() => openMegaMenu("products")}
            onMouseLeave={scheduleClose}
            data-testid="mega-products"
          >
            <div className="tv-container py-10">
              <div className="grid grid-cols-12 gap-10">
                {MEGA.map((col) => <MegaCol key={col.title} {...col} />)}
                <div className="col-span-3 border-l border-[#E5E4DF] pl-8">
                  <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#5A6472] mb-3">All products</div>
                  <h4 className="tv-h4" style={{ fontSize: "18px" }}>The complete RISC-V platform</h4>
                  <p className="mt-2 text-[13px] text-[#5A6472] leading-relaxed">IP integration, virtual platforms, certified boot, cryptography and RTOS — unified.</p>
                  <Link to="/product-suite" className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#003262] hover:gap-2.5 transition-all" data-testid="mega-featured-cta">
                    View all products <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E5E4DF] bg-white">
          <div className="tv-container py-6 flex flex-col">
            <MobileGroup title="Products" links={[
              { label: "Product suite", to: "/product-suite" },
              { label: "Jarvyn IDE", to: "/download-ide" },
              { label: "WebIDE", to: "/webide" },
              { label: "Code Engine", to: "/product/code-engine" },
              { label: "Secure Boot", to: "/product/secure-boot" },
              { label: "Crypto Stack", to: "/product/crypto-stack" },
              { label: "RTOS", to: "/product/rtos-benchmark" },
            ]} />
            <MobileLink label="Marketplace" to="/marketplace" testid="mobile-nav-marketplace" />
            <MobileLink label="Developers" to="/developer-portal" testid="mobile-nav-developers" />
            <MobileLink label="Platform" to="/partners" testid="mobile-nav-platform" />
            <MobileLink label="Services" to="/services" testid="mobile-nav-services" />
            <MobileLink label="About" to="/about" testid="mobile-nav-about" />
            {isAdmin && <MobileLink label="Admin" to="/admin" testid="mobile-nav-admin" />}
            {isAuthenticated && <MobileLink label="Account settings" to="/account" testid="mobile-nav-account" />}
            <div className="pt-5 flex flex-col gap-2">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="tv-btn tv-btn-outline w-full" data-testid="mobile-nav-logout">Log out</button>
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
  );
};

const AccountMenu = ({ user, isAdmin, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const initial = (user?.username || user?.email || "U").charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-[#E5E4DF] hover:border-[#2486C7] transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
        data-testid="nav-account-menu"
      >
        <span className="w-7 h-7 rounded-full bg-[#004A7F] text-white text-[12px] font-semibold flex items-center justify-center">{initial}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#5A6472] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E4DF] rounded-md shadow-[0_20px_40px_-24px_rgba(11,15,20,0.25)] py-2 z-50" data-testid="nav-account-dropdown">
          <div className="px-4 py-2 border-b border-[#E5E4DF]">
            <div className="text-[13px] font-semibold text-[#0B0F14] truncate">{user?.username || "Account"}</div>
            <div className="text-[11.5px] text-[#5A6472] truncate">{user?.email}</div>
          </div>
          {isAdmin && <MenuItem to="/admin" Icon={Shield} label="Admin" testid="nav-admin" />}
          <MenuItem to="/account" Icon={Settings} label="Account settings" testid="nav-account" />
          <button onClick={onLogout} role="menuitem" className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-[13.5px] text-[#1A1F25] border-l-2 border-transparent hover:bg-[#E6F1F9] hover:border-[#2486C7] transition-colors" data-testid="nav-logout">
            <LogOut className="w-3.5 h-3.5" /> Log out
          </button>
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ to, Icon, label, testid }) => (
  <Link to={to} role="menuitem" className="flex items-center gap-2.5 px-4 py-2 text-[13.5px] text-[#1A1F25] border-l-2 border-transparent hover:bg-[#E6F1F9] hover:border-[#2486C7] transition-colors" data-testid={testid}>
    <Icon className="w-3.5 h-3.5" /> {label}
  </Link>
);

const MegaCol = ({ title, items }) => (
  <div className="col-span-3">
    <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#5A6472] mb-4">{title}</div>
    <ul className="space-y-1">
      {items.map((it) => (
        <li key={it.label}>
          <Link to={it.to} className="tv-mega-row group" data-testid={`mega-${it.label.toLowerCase().replace(/\W+/g, "-")}`}>
            <div className="text-[14px] font-medium text-[#0B0F14] group-hover:text-[#003262] transition-colors">{it.label}</div>
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
        <Link key={l.label} to={l.to} className="text-[15px] font-medium text-[#1A1F25]" data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\W+/g, "-")}`}>
          {l.label}
        </Link>
      ))}
    </div>
  </div>
);

const MobileLink = ({ label, to, testid }) => (
  <Link to={to} className="py-3 text-[15px] font-medium text-[#1A1F25] border-b border-[#E5E4DF]" data-testid={testid}>{label}</Link>
);

export default Navigation;
