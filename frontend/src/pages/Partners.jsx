import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";

const partners = [
  {
    num: "01",
    name: "C-DAC",
    fullName: "Centre for Development of Advanced Computing",
    location: "Pune · Bengaluru · Trivandrum",
    description: "India's premier R&D organization in IT and electronics. Pioneer of Indian RISC-V silicon with the VEGA and DHRUV processor families.",
    products: ["VEGA ET1031 — 32-bit RISC-V MCU", "DHRUV64 — Dual-core 64-bit RISC-V", "ARIES development boards"],
    website: "https://vegaprocessors.in",
    accent: "#003262",
  },
  {
    num: "02",
    name: "Mindgrove",
    fullName: "Mindgrove Technologies",
    location: "Chennai — IIT Madras",
    description: "Indian semiconductor startup building secure RISC-V SoCs for IoT, industrial automation and AI edge applications.",
    products: ["Secure IoT SoC with hardware crypto", "Vision SoC with integrated NPU", "Industrial-grade ruggedized SoCs"],
    website: "https://mindgrove.in",
    accent: "#004A7F",
  },
  {
    num: "03",
    name: "Upbeat Tech",
    fullName: "Upbeat Technologies",
    location: "Bengaluru",
    description: "Emerging Indian RISC-V partner focused on edge AI and intelligent sensor platforms. Building next-gen RISC-V SoCs with integrated NPU.",
    products: ["Edge AI accelerators", "Intelligent sensor platforms", "Custom RISC-V co-processors"],
    website: "#",
    accent: "#2486C7",
  },
];

const globalIP = [
  { name: "SiFive", note: "Performance RISC-V IP" },
  { name: "Akeana", note: "Automotive-grade RISC-V" },
];

const Partners = () => {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero
        crumbs={[{ label: "Ecosystem" }]}
        eyebrow="Partners & ecosystem"
        title={
          <>
            An open network<br />of RISC-V builders.
          </>
        }
        subtitle="Co-verified with the best of Indian and global RISC-V IP, silicon and system partners."
      />

      {/* Indian partners */}
      <section className="border-b border-[#E7E5E0]" data-testid="indian-partners">
        <div className="tv-container tv-section">
          <div className="mb-14 max-w-3xl">
            <span className="tv-eyebrow">Indian silicon programme</span>
            <h2
              className="tv-h2"
            >
              Made in India.<br />
              <span className="text-[#003262]">Trusted globally.</span>
            </h2>
          </div>

          <div className="border-t border-[#0A0A0A]">
            {partners.map((p) => (
              <div key={p.name} className="grid lg:grid-cols-12 gap-8 lg:gap-10 py-12 md:py-16 border-b border-[#E7E5E0]" data-testid={`partner-${p.name.toLowerCase()}`}>
                <div className="lg:col-span-1">
                  <span className="text-[13px] font-mono tracking-widest text-[#6B6B6B]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    /{p.num}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <h3
                    className="text-[26px] md:text-[34px] tracking-[-0.025em] text-[#0A0A0A]"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}
                  >
                    {p.name}
                  </h3>
                  <div className="mt-2 text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    {p.fullName}
                  </div>
                  <div
                    className="mt-1 text-[11px] font-mono tracking-widest text-[#6B6B6B]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {p.location}
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[15.5px] leading-[1.65] text-[#3A3A3A] font-light" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
                    {p.description}
                  </p>
                </div>
                <div className="lg:col-span-3">
                  <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#6B6B6B] mb-3" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    Products
                  </div>
                  <ul className="space-y-2">
                    {p.products.map((prod) => (
                      <li key={prod} className="text-[13.5px] text-[#0A0A0A] flex items-start gap-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                        <span className="w-1 h-1 mt-2 rounded-full" style={{ background: p.accent }} />
                        {prod}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium tracking-[0.12em] uppercase text-[#0A0A0A] border-b border-[#0A0A0A] pb-0.5 hover:text-[#003262] hover:border-[#003262] transition-colors"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    Website <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global IP partners */}
      <section className="bg-[#00162B] text-white" data-testid="global-partners">
        <div className="tv-container tv-section">
          <div className="grid lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-7">
              <span className="tv-eyebrow" style={{ color: "#2486C7" }}>
                <span className="text-[#2486C7]">Global IP integration</span>
              </span>
              <h2
                className="tv-h2"
              >
                Co-verified with performance leaders.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="text-[16px] leading-[1.6] text-white/70 font-light" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
                TRUSTED-V ships pre-integrated stacks for the world&apos;s leading RISC-V IP families.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 border-y border-white/10">
            {globalIP.map((g) => (
              <div key={g.name} className="bg-[#00162B] p-8 md:p-12">
                <h3 className="text-[24px] md:text-[30px] tracking-[-0.02em] text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>
                  {g.name}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.55] text-white/60" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{g.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tv-section-tight border-b border-[#E7E5E0]" data-testid="partners-cta">
        <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="tv-h2">
            Bring your board or IP to TRUSTED-V.
          </h2>
          <div className="flex gap-3">
            <Link to="/partner-registration" className="tv-btn tv-btn-primary" data-testid="apply-partner">
              Apply as a partner <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/board-support" className="tv-btn tv-btn-outline" data-testid="request-board-support">
              Board support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
