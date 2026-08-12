import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight, ExternalLink, Search } from "lucide-react";
import PageHero from "@/components/PageHero";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ipCatalog = [
  { name: "Ibex RISC-V Core", provider: "lowRISC / OpenTitan", type: "Processor Core", arch: "RV32IMC", license: "Apache 2.0", description: "Production-quality 32-bit RISC-V core with 2-stage pipeline. Ideal for microcontrollers and security applications.", github: "https://github.com/lowRISC/ibex", tags: ["Open Source", "Verified"] },
  { name: "OpenTitan Root of Trust", provider: "lowRISC / Google", type: "Security IP", arch: "RV32IMC", license: "Apache 2.0", description: "Open-source silicon root of trust. Secure boot, crypto acceleration and hardware identity.", github: "https://github.com/lowRISC/opentitan", tags: ["Open Source", "Security"] },
  { name: "CVA6 (Ariane) Core", provider: "OpenHW Group", type: "Processor Core", arch: "RV64GC", license: "Solderpad 2.1", description: "Application-class 64-bit RISC-V core with 6-stage pipeline, MMU, Linux-capable.", github: "https://github.com/openhwgroup/cva6", tags: ["Open Source", "Application Class"] },
  { name: "PULP RI5CY Core", provider: "ETH Zurich / PULP", type: "Processor Core", arch: "RV32IMFCXpulp", license: "Solderpad 2.0", description: "Energy-efficient 32-bit RISC-V core optimized for ultra-low-power IoT with DSP extensions.", github: "https://github.com/pulp-platform/riscv", tags: ["Open Source", "Low Power"] },
  { name: "DMA Controller IP", provider: "TRUSTED-V", type: "Peripheral IP", arch: "AXI4 / AHB", license: "Commercial", description: "High-performance multi-channel DMA with scatter-gather for RISC-V SoC integration.", tags: ["Commercial", "Peripheral"] },
  { name: "UART / SPI / I2C Controller", provider: "TRUSTED-V", type: "Peripheral IP", arch: "APB / AXI-Lite", license: "Commercial", description: "Standard communication peripherals packaged as configurable IP blocks.", tags: ["Commercial", "Peripheral"] },
];

const Marketplace = () => {
  const [tab, setTab] = useState("hardware");
  const [hardware, setHardware] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/hardware`).then(r => setHardware(r.data)).catch(() => setHardware([]));
  }, []);

  const filteredHW = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return hardware;
    return hardware.filter((h) =>
      [h.name, h.manufacturer, h.core, h.peripherals].join(" ").toLowerCase().includes(s)
    );
  }, [hardware, q]);

  const filteredIP = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ipCatalog;
    return ipCatalog.filter((ip) =>
      [ip.name, ip.provider, ip.type, ip.arch, ip.description].join(" ").toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="Marketplace"
        title={
          <>
            Boards, IP,<br />and everything between.
          </>
        }
        subtitle="A curated catalog of RISC-V development boards from Indian and global partners, plus a growing library of processor cores, security IP and peripherals."
      />

      {/* Tabs + search */}
      <section className="border-b border-[#E7E5E0] sticky top-[64px] z-30 bg-white/95 backdrop-blur" data-testid="marketplace-toolbar">
        <div className="tv-container flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-1">
            <TabBtn active={tab === "hardware"} onClick={() => setTab("hardware")} testid="tab-hardware">
              Hardware boards <span className="ml-2 text-[11px] text-[#6B6B6B]">{hardware.length}</span>
            </TabBtn>
            <TabBtn active={tab === "ip"} onClick={() => setTab("ip")} testid="tab-ip">
              IP blocks <span className="ml-2 text-[11px] text-[#6B6B6B]">{ipCatalog.length}</span>
            </TabBtn>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="Search boards or IP..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 text-[14px] bg-transparent border border-[#E7E5E0] focus:outline-none focus:border-[#003262]"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
              data-testid="marketplace-search"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="tv-section-tight" data-testid="marketplace-list">
        <div className="tv-container">
          {tab === "hardware" && (
            <>
              {filteredHW.length === 0 ? (
                <EmptyState label="hardware boards" />
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E7E5E0] border-y border-[#E7E5E0]">
                  {filteredHW.map((b) => <HardwareCard key={b.id || b.name} board={b} />)}
                </div>
              )}
            </>
          )}
          {tab === "ip" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E7E5E0] border-y border-[#E7E5E0]">
              {filteredIP.map((ip) => <IPCard key={ip.name} ip={ip} />)}
            </div>
          )}
        </div>
      </section>

      {/* Partner intro */}
      <section className="tv-section-tight border-t border-[#E7E5E0] bg-[#FAFAF7]">
        <div className="tv-container grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <span className="tv-eyebrow">Our hardware partners</span>
            <h2
              className="tv-h2"
            >
              Certified boards from C-DAC, Mindgrove, Upbeat Tech and more.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex md:justify-end gap-3">
            <Link to="/partners" className="tv-btn tv-btn-outline" data-testid="marketplace-partners-cta">
              Meet the partners <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const TabBtn = ({ active, onClick, children, testid }) => (
  <button
    onClick={onClick}
    data-testid={testid}
    className={`px-4 py-2 text-[13px] font-medium tracking-[0.05em] transition-colors border-b-2 ${
      active ? "border-[#003262] text-[#003262]" : "border-transparent text-[#6B6B6B] hover:text-[#0A0A0A]"
    }`}
    style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
  >
    {children}
  </button>
);

const HardwareCard = ({ board }) => (
  <div className="bg-white p-8 min-h-[240px] flex flex-col justify-between hover:bg-[#FAFAF7] transition-colors" data-testid={`hw-${board.id || board.name}`}>
    <div>
      <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#6B6B6B] mb-3" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
        {board.manufacturer}
      </div>
      <h3 className="text-[22px] tracking-[-0.015em] text-[#0A0A0A]" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>
        {board.name}
      </h3>
      <p className="mt-3 text-[13px] leading-[1.55] text-[#4B4B4B] font-light line-clamp-3" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
        {board.description || board.peripherals}
      </p>
    </div>
    <div className="mt-6 pt-6 border-t border-[#E7E5E0] flex items-center justify-between">
      <span className="text-[12px] font-mono text-[#003262]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        {board.core}
      </span>
      <ArrowUpRight className="w-4 h-4 text-[#6B6B6B]" />
    </div>
  </div>
);

const IPCard = ({ ip }) => (
  <div className="bg-white p-8 min-h-[240px] flex flex-col justify-between hover:bg-[#FAFAF7] transition-colors" data-testid={`ip-${ip.name.toLowerCase().replace(/\W+/g, "-")}`}>
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#6B6B6B]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
          {ip.type}
        </span>
        <span className="text-[10px] font-mono text-[#0F6E56] border border-[#0F6E56]/30 px-1.5 py-0.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          {ip.license}
        </span>
      </div>
      <h3 className="text-[22px] tracking-[-0.015em] text-[#0A0A0A]" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>
        {ip.name}
      </h3>
      <div className="mt-1 text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{ip.provider}</div>
      <p className="mt-3 text-[13px] leading-[1.55] text-[#4B4B4B] font-light line-clamp-3" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
        {ip.description}
      </p>
    </div>
    <div className="mt-6 pt-6 border-t border-[#E7E5E0] flex items-center justify-between">
      <span className="text-[12px] font-mono text-[#003262]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        {ip.arch}
      </span>
      {ip.github ? (
        <a href={ip.github} target="_blank" rel="noreferrer" className="text-[12px] text-[#0A0A0A] hover:text-[#003262] flex items-center gap-1" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
          GitHub <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <ArrowUpRight className="w-4 h-4 text-[#6B6B6B]" />
      )}
    </div>
  </div>
);

const EmptyState = ({ label }) => (
  <div className="py-24 text-center">
    <p className="text-[15px] text-[#6B6B6B]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      No {label} match your search.
    </p>
  </div>
);

export default Marketplace;
