import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, Shield, Layers, ArrowRight, 
  CheckCircle2, Zap, Lock, Terminal,
  Box, ExternalLink,
  Globe, Key, Server, Radio, Boxes, Award, Code
} from "lucide-react";
import PageHero from "@/components/PageHero";

const ProductSuite = () => {
  // Four modules — per PDF strategic recommendation, Bosch-simple layout
  const modules = [
    {
      id: "development-platform",
      moduleLabel: "Module 01",
      category: "RISC-V Development Platform",
      tagline: "The control-center of your RISC-V workflow.",
      description: "TRUSTED-V IDE orchestrates the entire lifecycle — from IP selection and virtual prototyping to on-chip debug and production deployment.",
      accent: "#003262",
      items: [
        {
          name: "TRUSTED-V IDE (Jarvyn)",
          description: "AI-native embedded IDE with the Jarvyn assistant, integrated debugger, one-click flash, Rust Analyzer, board/SoC selector, device-tree, memory map, register viewer and Smart Builder engine.",
          icon: Terminal,
          features: [
            "Jarvyn AI code assistant",
            "Integrated debugger (probe-rs / LLDB)",
            "Board & SoC selector",
            "Smart Builder engine",
            "One-click build & flash",
          ],
          badge: "Flagship",
          link: "/download-ide",
        },
        {
          name: "TRUSTED-V WebIDE",
          description: "Full-featured browser-based development environment for RISC-V Rust projects. Compile, debug and collaborate from anywhere — no local setup required.",
          icon: Globe,
          features: [
            "Cloud-based Rust compilation",
            "Integrated terminal & debugger",
            "Real-time collaboration",
            "Project templates & scaffolding",
            "Git integration & version control",
          ],
          badge: "Cloud",
          link: "/webide",
        },
        {
          name: "Debugger, Programmer & Trace",
          description: "Complete debug toolkit for RISC-V: JTAG/SWD, multi-core trace, flash programming, and per-instruction inspection across virtual and physical targets.",
          icon: Boxes,
          features: [
            "JTAG / SWD debug support",
            "Multi-core trace & register view",
            "Flash / EEPROM programmer",
            "Peripheral viewer + SVD",
          ],
          badge: "Debug",
        },
      ],
    },
    {
      id: "virtualization",
      moduleLabel: "Module 02",
      category: "Virtualization & Simulation",
      tagline: "Virtualize RISC-V before you touch silicon.",
      description: "Full CPU, SoC, memory and peripheral models with snapshots, trace and automated CI hooks — validated for SiFive and Akeana IP portfolios. Ship 6–12 months ahead of hardware, with zero rework at silicon bring-up.",
      accent: "#00B4E0",
      items: [
        {
          name: "TRUSTED-V Virtual Platform",
          description: "Cycle-accurate RISC-V virtual hardware. Pre-built virtual boards for SiFive Performance, Intelligence, Essential series and Akeana 100/1000/5100 — with snapshot/rewind and full trace.",
          icon: Zap,
          features: [
            "SiFive P550 / Performance / Essential virtual boards",
            "Akeana 100 / 1000 / 5100 virtual boards",
            "Snapshots, rewind & trace viewer",
            "Automated CI / regression harness",
            "Device models & scripting API",
          ],
          badge: "Virtualization",
          link: "/product-suite",
        },
        {
          name: "RISC-V Hypervisor",
          description: "Lightweight, memory-safe Rust hypervisor for the RISC-V H-extension. Run RTOS + Linux + AI guests side-by-side on the same core, with hardware isolation and deterministic scheduling.",
          icon: Server,
          features: [
            "RISC-V H-extension support",
            "Multi-guest: RTOS + Linux + AI",
            "Memory-safe Rust core",
            "Deterministic real-time guest",
          ],
          badge: "Hypervisor",
        },
        {
          name: "RISC-V Simulator",
          description: "Fast functional simulator for early software development and CI. Boot Rust firmware in milliseconds, iterate at code-review speed.",
          icon: Cpu,
          features: [
            "Fast functional simulation",
            "QEMU-compatible device models",
            "CI/CD integration",
            "Fault injection & fuzzing hooks",
          ],
          badge: "Testing",
        },
      ],
    },
    {
      id: "secure-rust",
      moduleLabel: "Module 03",
      category: "Secure Rust Software",
      tagline: "Rust-Native. RISC-V-Native. Production-Ready.",
      description: "A memory-safe foundation for RISC-V — from ROM-resident boot through hardware abstraction, RTOS, drivers, cryptography and application layers.",
      accent: "#0F6E56",
      items: [
        {
          name: "Secure Boot — rBoot / rustBoot",
          description: "Hardware root of trust with a verified boot chain. rBoot delivers a lightweight first-stage loader; rustBoot provides a full Rust-native secure bootloader with A/B updates, anti-rollback and TEE readiness.",
          icon: Shield,
          features: [
            "rBoot: lightweight first-stage loader",
            "rustBoot: Rust-native SBL",
            "A/B firmware update with rollback",
            "Anti-rollback + key management",
            "TCG DICE / PSA / CC EAL4+ aligned",
          ],
          badge: "Security",
          link: "/product/secure-boot",
        },
        {
          name: "TRUSTED-V RTOS",
          description: "Security-hardened Rust RTOS for RV32 and RV64 with memory isolation, capability-based access, deterministic scheduling and 9× faster context switching than FreeRTOS.",
          icon: Layers,
          features: [
            "Rust-native RTOS (RV32/RV64)",
            "Memory isolation & capabilities",
            "Deterministic scheduling",
            "9× faster context switch vs FreeRTOS",
          ],
          badge: "Middleware",
          link: "/product/rtos-benchmark",
        },
        {
          name: "HAL, PAC & HAM",
          description: "Hardware Abstraction Layer, Peripheral Access Crate and Hardware Abstraction Map — a coherent, auditable interface between hardware and software across every RISC-V ISA variant.",
          icon: Lock,
          features: [
            "Portable HAL across RV32/RV64 SoCs",
            "Peripheral Access Crate (PAC)",
            "Hardware Abstraction Map (HAM)",
            "Audit logging & access control",
          ],
          badge: "Foundation",
        },
        {
          name: "Crypto Stack",
          description: "Production-grade Rust cryptography for embedded RISC-V. Hardware-accelerated where available, with post-quantum algorithms and FIPS 140-3 aligned modules.",
          icon: Key,
          features: [
            "AES-256-GCM / RSA-4096 / ECC",
            "SHA-3 / BLAKE3 hashing",
            "PQC: ML-KEM (Kyber), ML-DSA (Dilithium)",
            "Hardware crypto engine integration",
          ],
          badge: "Crypto",
          link: "/product/crypto-stack",
        },
        {
          name: "RISC-V Rust SDK",
          description: "Comprehensive SDK for building on TRUSTED-V — peripheral drivers, HAL implementations, board support and reference projects for every supported RISC-V platform.",
          icon: Box,
          features: [
            "Peripheral drivers",
            "HAL / BSP implementations",
            "Reference example projects",
            "Cargo-based tooling",
          ],
          badge: "SDK",
        },
        {
          name: "AI Accelerator SDK",
          description: "Compile, quantize and deploy AI inference on RISC-V edge devices with vector + matrix + NPU acceleration support.",
          icon: Cpu,
          features: [
            "Vector + matrix + NPU support",
            "Model quantization & compression",
            "Inference runtime for RISC-V",
            "Benchmarking suite",
          ],
          badge: "AI",
        },
      ],
    },
    {
      id: "silicon-signoff",
      moduleLabel: "Module 04",
      category: "Silicon SignOff & Trust",
      tagline: "From architecture requirements to production-ready silicon.",
      description: "AI-powered silicon pipeline plus the industry's only RISC-V-native 5-layer certification programme — Bronze to Platinum, cryptographically signed and independently verifiable.",
      accent: "#B45309",
      items: [
        {
          name: "SignOff Silicon",
          description: "AI-powered platform that converts natural-language requirements into production-ready silicon. Three engines — Core, Chip and Code — plus a certified Cores Marketplace and 7-step chip pipeline.",
          icon: Cpu,
          features: [
            "AI Engines: Core / Chip / Code",
            "Certified Cores Marketplace",
            "NL → Silicon 7-step pipeline",
            "Automated firmware generation",
          ],
          badge: "AI",
          link: "/marketplace",
        },
        {
          name: "TRUSTED-V Verified",
          description: "The industry's only RISC-V-native 5-layer certification — Silicon → Firmware → Integration → System → Application. Independent, third-party, cryptographically-signed evidence packages.",
          icon: Award,
          features: [
            "5-layer Bronze → Platinum grading",
            "Independent third-party validation",
            "Signed evidence packages",
            "Public Chip Registry (TVCR)",
          ],
          badge: "Certification",
        },
        {
          name: "TVOTS On-Chip Test Suite",
          description: "Automated on-chip test-execution framework. Runs the full TRUSTED-V Verified certification on real silicon in under 48 hours — no manual re-testing loops.",
          icon: Zap,
          features: [
            "On-chip test execution",
            "48-hour certification run",
            "Automated evidence collection",
            "CI-integrated regression",
          ],
          badge: "Testing",
        },
      ],
    },
  ];

  const getBadgeColor = (badge) => {
    const colors = {
      "Flagship": "bg-primary text-white",
      "Cloud": "bg-blue-500 text-white",
      "Virtualization": "bg-cyan-100 text-cyan-800 border-cyan-200",
      "Hypervisor": "bg-cyan-100 text-cyan-800 border-cyan-200",
      "Security": "bg-red-100 text-red-800 border-red-200",
      "Crypto": "bg-amber-100 text-amber-800 border-amber-200",
      "SDK": "bg-green-100 text-green-800 border-green-200",
      "Middleware": "bg-blue-100 text-blue-800 border-blue-200",
      "Foundation": "bg-slate-100 text-slate-800 border-slate-200",
      "AI": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "Debug": "bg-orange-100 text-orange-800 border-orange-200",
      "Testing": "bg-cyan-100 text-cyan-800 border-cyan-200",
      "Certification": "bg-yellow-100 text-yellow-900 border-yellow-200",
    };
    return colors[badge] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-white" data-testid="product-suite-page">
      {/* Hero */}
      <PageHero
        eyebrow="Product Suite"
        title={<>The Complete <span style={{ fontFamily: "'Georgia', serif" }}><span style={{ color: "#003262" }}>RISC</span><span style={{ color: "#00B4E0" }}>-V</span></span> Platform. Four modules. One integrated platform.</>}
        subtitle="From IP integration and virtualization to secure Rust software and trusted silicon certification — TRUSTED-V unifies every stage of the RISC-V development lifecycle."
      />

      {/* Module navigator strip */}
      <section className="bg-slate-50 border-b border-slate-200/60 py-6" data-testid="pillar-navigator">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em] mr-2">Explore</span>
            {modules.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold text-slate-700 hover:shadow-sm transition-all"
                style={{ borderLeftColor: m.accent, borderLeftWidth: "3px" }}
                data-testid={`pillar-nav-${m.id}`}
              >
                <span className="text-[10px] font-bold" style={{ color: m.accent }}>{m.moduleLabel}</span>
                {m.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      {modules.map((mod, mIndex) => (
        <section
          key={mod.id}
          id={mod.id}
          className={`py-16 lg:py-20 ${mIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
          data-testid={`pillar-section-${mod.id}`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Module header */}
            <div className="mb-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: mod.accent }}>{mod.moduleLabel}</span>
                <span className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: `${mod.accent}55` }} />
              </div>
              <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-slate-900 tracking-tight leading-[1.1] mb-3">
                {mod.category}
              </h2>
              <p className="text-[15px] sm:text-[16px] font-medium mb-3" style={{ color: mod.accent }}>{mod.tagline}</p>
              <p className="text-[14.5px] text-slate-600 leading-[1.7]">{mod.description}</p>
              <div className="w-16 h-1 mt-6" style={{ backgroundColor: mod.accent }} />
            </div>

            {/* Products in this module */}
            <div className={`grid gap-6 ${mod.items.length <= 2 ? 'md:grid-cols-2 max-w-5xl' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
              {mod.items.map((product) => {
                const Icon = product.icon;
                return (
                  <Card
                    key={product.name}
                    data-testid={`product-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="bg-white border-slate-200 hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div
                          className="w-11 h-11 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${mod.accent}15` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: mod.accent }} />
                        </div>
                        <Badge className={getBadgeColor(product.badge)}>{product.badge}</Badge>
                      </div>
                      <h3 className="font-semibold text-[17px] text-foreground mt-3 leading-tight">{product.name}</h3>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <p className="text-[13.5px] text-muted-foreground mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      <ul className="space-y-2 mb-4 flex-1">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: mod.accent }} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {product.link && (
                        <Link to={product.link}>
                          <Button
                            size="sm"
                            className="w-full mt-auto transition-all bg-transparent border text-slate-700 hover:text-white"
                            style={{ borderColor: `${mod.accent}80` }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = mod.accent; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = ""; }}
                          >
                            Learn More <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ══ STRATEGIC COLLABORATIONS — SiFive & Akeana ══ */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200/60" data-testid="collab-section">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#003262]">
              <span className="w-7 h-px bg-[#003262]/45" /> Strategic Collaborations
            </span>
            <h2 className="text-[28px] sm:text-[34px] font-bold text-slate-900 tracking-tight leading-[1.12] mt-3 mb-4">
              Deep integration with <span className="text-[#003262]">SiFive</span> and <span className="text-[#0F6E56]">Akeana</span>.
            </h2>
            <p className="text-[15.5px] text-slate-600 leading-[1.75] font-light">
              TRUSTED-V is co-engineered with the two RISC-V IP portfolios shaping the future of embedded, edge and high-performance compute. Native virtual platforms, tuned toolchains, verified BSPs and a shared certification pipeline &mdash; out of the box.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6" data-testid="collab-partner-cards">
            {/* SiFive */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 lg:p-8 hover:shadow-md transition-shadow" data-testid="collab-sifive">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003262] to-[#1A4FA8] flex items-center justify-center text-white text-[16px] font-black flex-shrink-0">SF</div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#003262]">RISC-V IP Partner</div>
                  <h3 className="text-[22px] font-bold text-slate-900 leading-tight mt-1">SiFive</h3>
                  <p className="text-[13px] text-slate-500 mt-0.5">Global RISC-V IP leader &mdash; from IoT to data-center.</p>
                </div>
              </div>
              <p className="text-[14px] text-slate-600 leading-[1.7] mb-5">
                Full-stack support across SiFive Performance, Intelligence, Automotive and Essential series. TRUSTED-V ships virtual boards, tuned Rust HAL/PAC, verified BSPs and validated certification profiles for every SiFive family.
              </p>
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[
                  "Performance P550 / P570 / P870",
                  "Intelligence X280 / X390",
                  "Essential E-series (RV32)",
                  "Automotive AX45MP",
                ].map((line) => (
                  <div key={line} className="flex items-start gap-2 text-[12.5px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#003262] mt-0.5 flex-shrink-0" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-200/70 flex items-center gap-4 text-[11.5px] text-slate-500">
                <span><span className="font-bold text-slate-800">4</span> virtual boards</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span><span className="font-bold text-slate-800">Tuned</span> Rust toolchain</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span><span className="font-bold text-slate-800">TRUSTED-V</span> Verified</span>
              </div>
            </div>

            {/* Akeana */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 lg:p-8 hover:shadow-md transition-shadow" data-testid="collab-akeana">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F6E56] to-[#137d63] flex items-center justify-center text-white text-[16px] font-black flex-shrink-0">AK</div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F6E56]">RISC-V IP Partner</div>
                  <h3 className="text-[22px] font-bold text-slate-900 leading-tight mt-1">Akeana</h3>
                  <p className="text-[13px] text-slate-500 mt-0.5">Deeply embedded to server-class OoO cores.</p>
                </div>
              </div>
              <p className="text-[14px] text-slate-600 leading-[1.7] mb-5">
                End-to-end support for Akeana&apos;s 100, 1000 and 5100 series &mdash; from ultra-low-power controllers to Linux-capable out-of-order cores. TRUSTED-V provides matched virtual platforms, boot &amp; RTOS, and a certification-ready flow.
              </p>
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[
                  "100 Series (embedded, RV32)",
                  "1000 Series (mid-range, RV32/64)",
                  "5100 Series (Linux, OoO)",
                  "Vector + Matrix extensions",
                ].map((line) => (
                  <div key={line} className="flex items-start gap-2 text-[12.5px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F6E56] mt-0.5 flex-shrink-0" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-200/70 flex items-center gap-4 text-[11.5px] text-slate-500">
                <span><span className="font-bold text-slate-800">3</span> virtual boards</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span><span className="font-bold text-slate-800">Rust</span> BSP + drivers</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span><span className="font-bold text-slate-800">TRUSTED-V</span> Verified</span>
              </div>
            </div>
          </div>

          {/* Integration diagram — how SiFive/Akeana IP flows through TRUSTED-V */}
          <div className="mt-10 bg-slate-50 rounded-2xl border border-slate-200/70 p-6 lg:p-8" data-testid="collab-flow">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">How it works</div>
            <div className="grid md:grid-cols-5 gap-3 items-center">
              {[
                { title: "Select IP", sub: "SiFive · Akeana", accent: "#003262" },
                { title: "Virtual Board", sub: "TRUSTED-V VP", accent: "#00B4E0" },
                { title: "Rust Software", sub: "HAL · RTOS · Apps", accent: "#0F6E56" },
                { title: "CI Validation", sub: "TVOTS suite", accent: "#7B3F00" },
                { title: "Silicon Ready", sub: "TRUSTED-V Verified", accent: "#B45309" },
              ].map((step, i, arr) => (
                <div key={step.title} className="flex items-center gap-3">
                  <div className="flex-1 bg-white rounded-lg border border-slate-200 p-3">
                    <div className="text-[13px] font-bold text-slate-900 leading-tight">{step.title}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: step.accent }}>{step.sub}</div>
                  </div>
                  {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY TRUSTED-V (Bosch-style value bullets) ══ */}
      <section className="py-14 lg:py-16 bg-slate-50 border-t border-slate-200/60" data-testid="why-trustedv-section">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#003262]">
              <span className="w-7 h-px bg-[#003262]/45" /> Why TRUSTED-V?
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-bold text-slate-900 tracking-tight leading-[1.12] mt-3">
              Built for teams shipping <span className="text-[#003262]">production RISC-V products</span>.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: "IP Freedom", d: "Choose SiFive, Akeana or any RVA23-class core — one development environment." },
              { t: "Virtual First", d: "Ship software 6–12 months before silicon exists. Zero rework at bring-up." },
              { t: "Memory-Safe Rust", d: "Rust-native security stack — from ROM boot through RTOS to applications." },
              { t: "Independent Trust", d: "5-layer TRUSTED-V Verified certification, cryptographically signed." },
            ].map((v) => (
              <div key={v.t} className="bg-white rounded-lg border border-slate-200 p-5 hover:border-slate-300 transition-colors" data-testid={`why-${v.t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <div className="w-8 h-1 bg-[#003262] mb-3" />
                <div className="text-[15px] font-bold text-slate-900 mb-2 leading-tight">{v.t}</div>
                <div className="text-[13px] text-slate-600 leading-[1.6]">{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISC-V IP Integration section */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200/60" data-testid="ip-integration-section">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#003262] mb-3">
                <span className="w-7 h-px bg-[#003262]/45" /> RISC-V IP Integration
              </span>
              <h2 className="text-[28px] sm:text-[34px] font-bold text-slate-900 tracking-tight leading-[1.12] mb-4">
                Choose your <span className="text-[#003262]">RISC-V IP</span>.<br />Keep your development environment.
              </h2>
              <p className="text-[15.5px] text-slate-600 leading-[1.75] font-light mb-6">
                TRUSTED-V natively integrates with leading RISC-V processor and system IP vendors. Swap cores, mix vendors, add custom instructions &mdash; your Rust codebase, virtual platform and certification workflow stay unchanged.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-lg mb-8">
                {[
                  { k: "IP Freedom", v: "Vendor-neutral abstraction" },
                  { k: "Hardware Agility", v: "Change CPU, keep code" },
                  { k: "Compatibility Engine", v: "Automatic ISA matching" },
                  { k: "Custom Instructions", v: "TRUSTED-V IP Forge hooks" },
                ].map((item) => (
                  <div key={item.k} className="bg-slate-50 border border-slate-200/70 rounded-lg p-3">
                    <div className="text-[13px] font-bold text-slate-900 leading-tight">{item.k}</div>
                    <div className="text-[11.5px] text-slate-500 mt-0.5">{item.v}</div>
                  </div>
                ))}
              </div>
              <Link to="/marketplace">
                <Button className="h-11 px-6 text-[13px] font-semibold" data-testid="explore-ip-marketplace">
                  Explore Cores Marketplace <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "SiFive",
                  desc: "P550/P570, Performance, Intelligence, Essential series — from IoT to data-center.",
                  tag: "Global Leader",
                  gradient: "from-[#003262] to-[#1A4FA8]",
                  initials: "SF",
                },
                {
                  name: "Akeana",
                  desc: "100 / 1000 / 5100 series — deeply embedded to server-class OoO cores.",
                  tag: "Performance IP",
                  gradient: "from-[#0F6E56] to-[#137d63]",
                  initials: "AK",
                },
                {
                  name: "MIPS ARC-V",
                  desc: "RMX (ultra-low power), RHX (real-time) and RPX (64-bit SMP Linux) portfolio.",
                  tag: "Broad Ecosystem",
                  gradient: "from-[#B45309] to-[#c76a13]",
                  initials: "M",
                },
                {
                  name: "C-DAC / Mindgrove",
                  desc: "India-native RISC-V cores — VEGA and SHAKTI families for domestic silicon.",
                  tag: "Made in India",
                  gradient: "from-[#FF9933] to-[#138808]",
                  initials: "IN",
                },
              ].map((partner) => (
                <div
                  key={partner.name}
                  className="bg-white rounded-xl border border-slate-200/80 p-5 hover:shadow-lg hover:border-slate-300 transition-all"
                  data-testid={`ip-partner-${partner.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${partner.gradient} flex items-center justify-center text-white text-[13px] font-black mb-3`}>
                    {partner.initials}
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-900 mb-1">{partner.name}</h4>
                  <span className="text-[10px] font-semibold text-[#003262] uppercase tracking-wider">{partner.tag}</span>
                  <p className="text-[12px] text-slate-600 leading-[1.6] mt-2">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Pipeline */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Continuous Lifecycle</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">One integrated pipeline. IP to production.</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm">
              Every product in TRUSTED-V is designed to work together across the complete RISC-V development lifecycle.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 lg:gap-4 items-center">
            {[
              "Select IP", "Virtualize", "Develop (Rust)", "Debug & Test", "Silicon SignOff", "TRUSTED-V Verified"
            ].map((item, i, arr) => (
              <div key={item} className="flex items-center gap-3 lg:gap-4">
                <div className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-medium whitespace-nowrap shadow-sm">{item}</div>
                {i < arr.length - 1 && <ArrowRight className="w-5 h-5 text-primary hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-white border-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Start with any module. Grow into the platform.</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Download the IDE, spin up a SiFive or Akeana virtual board, or request a full evaluation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/download-ide">
              <Button size="lg" className="font-semibold" data-testid="cta-download-ide-products">
                Download TRUSTED-V IDE <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/developer-portal">
              <Button size="lg" variant="outline" className="font-semibold" data-testid="cta-developer-portal">
                <Code className="w-4 h-4 mr-2" /> Developer Portal
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="font-semibold" data-testid="cta-talk-sales">
                Request a Demo <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSuite;
