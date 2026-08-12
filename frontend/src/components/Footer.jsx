import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/**
 * Footer — dark navy, big brand wordmark, minimal columns (MIPS-inspired)
 */
const Footer = () => {
  const year = new Date().getFullYear();

  const cols = [
    {
      title: "Platform",
      links: [
        { label: "Product Suite", to: "/product-suite" },
        { label: "Jarvyn IDE", to: "/download-ide" },
        { label: "WebIDE", to: "/webide" },
        { label: "Marketplace", to: "/marketplace" },
        { label: "Developer Portal", to: "/developer-portal" },
      ],
    },
    {
      title: "Modules",
      links: [
        { label: "Secure Boot", to: "/product/secure-boot" },
        { label: "Crypto Stack", to: "/product/crypto-stack" },
        { label: "RTOS Benchmarks", to: "/product/rtos-benchmark" },
        { label: "Virtualization", to: "/product-suite#virtualization" },
        { label: "SignOff Silicon", to: "/product-suite#signoff" },
      ],
    },
    {
      title: "Ecosystem",
      links: [
        { label: "Partners", to: "/partners" },
        { label: "Board Support", to: "/board-support" },
        { label: "Partner Registration", to: "/partner-registration" },
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-[#00162B] text-white" data-testid="site-footer">
      {/* Top big brand block */}
      <div className="tv-container pt-24 pb-16 border-b border-white/10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <div
              className="text-[52px] md:text-[72px] lg:text-[88px] leading-[0.95] tracking-[-0.03em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}
            >
              <span className="text-white">TRUSTED</span>
              <span className="text-[#FDB515]">-V</span>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-white/60 max-w-md" style={{ fontFamily: "'Outfit', sans-serif" }}>
              The complete RISC-V platform. From IP to software to silicon.
              Rust-native. Secure by design. Made in India, engineered by Bosch to the world.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium tracking-wide uppercase border-b border-white/40 pb-1 hover:border-[#FDB515] hover:text-[#FDB515] transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              data-testid="footer-cta"
            >
              Talk to our engineers <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            {cols.map((col) => (
              <div key={col.title}>
                <h4
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50 mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-[14px] text-white/80 hover:text-white transition-colors"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        data-testid={`footer-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Standards strip */}
      <div className="tv-container py-8 border-b border-white/10">
        <div
          className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40 mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Built to global standards
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] text-white/70" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <span>CC EAL4+</span>
          <span>FIPS 140-3</span>
          <span>PSA L3</span>
          <span>ISO 26262</span>
          <span>IEC 62443</span>
          <span>SLSA L3</span>
          <span>ISO/SAE 21434</span>
          <span>ETSI EN 303 645</span>
        </div>
      </div>

      {/* Base */}
      <div className="tv-container py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-[12px] text-white/50" style={{ fontFamily: "'Outfit', sans-serif" }}>
          © {year} TRUSTED-V. A Bosch initiative. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-[12px] text-white/50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <span>Powered by Bosch</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0F6E56] tv-pulse-dot" />
            <span>All systems operational</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
