import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import TrustedVLogo from "@/components/TrustedVLogo";

/**
 * Footer — structured multi-column (spec §8).
 * Only real, existing destinations. No links to sections we don't have.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  const cols = [
    {
      title: "Products",
      links: [
        { label: "Product Suite", to: "/product-suite" },
        { label: "Jarvyn IDE", to: "/download-ide" },
        { label: "WebIDE", to: "/webide" },
        { label: "Marketplace", to: "/marketplace" },
      ],
    },
    {
      title: "Technology",
      links: [
        { label: "Secure Boot", to: "/product/secure-boot" },
        { label: "Crypto Stack", to: "/product/crypto-stack" },
        { label: "RTOS", to: "/product/rtos-benchmark" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "Developer Portal", to: "/developer-portal" },
        { label: "Download IDE", to: "/download-ide" },
        { label: "Board Support", to: "/board-support" },
      ],
    },
    {
      title: "Ecosystem",
      links: [
        { label: "Partners", to: "/partners" },
        { label: "Partner Registration", to: "/partner-registration" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-[#00162B] text-white" data-testid="site-footer">
      {/* Top: brand + link columns */}
      <div className="tv-container pt-20 md:pt-24 pb-14 border-b border-white/10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <TrustedVLogo size="md" dark />
            <p
              className="mt-6 text-[14px] leading-[1.65] text-white/60 max-w-sm"
            >
              The complete RISC-V platform. From IP to software to silicon.
              Rust-native. Secure by design. Made in India, engineered by Bosch
              to the world.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/90 border-b border-white/40 pb-1 hover:border-[#FDB515] hover:text-[#FDB515] transition-colors"
              data-testid="footer-cta"
            >
              Contact us <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-5 gap-8">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-white/50 mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-[13.5px] text-white/80 hover:text-white transition-colors"
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

      {/* Standards row */}
      <div className="tv-container py-6 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40 mr-2">
            Built to global standards
          </span>
          {["CC EAL4+", "FIPS 140-3", "PSA L3", "ISO 26262", "IEC 62443", "SLSA L3", "ISO/SAE 21434", "ETSI EN 303 645"].map((s) => (
            <span key={s} className="font-mono text-[11px] text-white/60">{s}</span>
          ))}
        </div>
      </div>

      {/* Base */}
      <div className="tv-container py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <p className="text-[11.5px] text-white/50">© {year} TRUSTED-V. A Bosch initiative. All rights reserved.</p>
        <div className="flex items-center gap-6 text-[11.5px] text-white/50">
          <span>Powered by Bosch</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0F6E56] tv-pulse-dot" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
