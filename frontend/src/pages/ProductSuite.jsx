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
  // Four pillars per PDF strategic recommendation
  const pillars = [
    {
      id: "development-platform",
      pillar: "Pillar 01",
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
      pillar: "Pillar 02",
      category: "Virtualization & Simulation",
      tagline: "Virtualize RISC-V before you touch silicon.",
      description: "Full CPU, SoC, memory and peripheral models with snapshots, trace and automated CI hooks. Ship 6–12 months ahead of hardware — with zero rework at silicon bring-up.",
      accent: "#00B4E0",
      badgeNew: true,
      items: [
        {
          name: "TRUSTED-V Virtual Platform",
          description: "Cycle-accurate RISC-V virtual hardware. Model any RVA23-class SoC — CPU, memory, virtual peripherals, virtual interrupts, storage and networking — with snapshot/rewind and full trace.",
          icon: Zap,
          features: [
            "CPU virtualization (RV32/RV64, H-ext)",
            "SoC + virtual memory + peripherals",
            "Snapshots, rewind & trace viewer",
            "Automated CI / regression harness",
            "Device models & scripting API",
          ],
          badge: "New",
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
          badge: "New",
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
      pillar: "Pillar 03",
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
      pillar: "Pillar 04",
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
      "New": "bg-[#00B4E0] text-white",
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
        title={<>The Complete <span style={{ fontFamily: "'Georgia', serif" }}><span style={{ color: "#003262" }}>RISC</span><span style={{ color: "#00B4E0" }}>-V</span></span> Platform. Four pillars. One ecosystem.</>}
        subtitle="From IP integration and virtualization to secure Rust software and trusted silicon certification — TRUSTED-V unifies every stage of the RISC-V development lifecycle."
      />

      {/* Pillar navigator strip */}
      <section className="bg-slate-50 border-b border-slate-200/60 py-6" data-testid="pillar-navigator">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em] mr-2">Explore</span>
            {pillars.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold text-slate-700 hover:shadow-sm transition-all"
                style={{ borderLeftColor: p.accent, borderLeftWidth: "3px" }}
                data-testid={`pillar-nav-${p.id}`}
              >
                <span className="text-[10px] font-bold" style={{ color: p.accent }}>{p.pillar}</span>
                {p.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      {pillars.map((pillar, pIndex) => (
        <section
          key={pillar.id}
          id={pillar.id}
          className={`py-16 lg:py-20 ${pIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
          data-testid={`pillar-section-${pillar.id}`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Pillar header */}
            <div className="mb-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: pillar.accent }}>{pillar.pillar}</span>
                <span className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: `${pillar.accent}55` }} />
                {pillar.badgeNew && (
                  <span className="text-[9.5px] font-bold text-white bg-[#00B4E0] px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                )}
              </div>
              <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-slate-900 tracking-tight leading-[1.1] mb-3">
                {pillar.category}
              </h2>
              <p className="text-[15px] sm:text-[16px] font-medium mb-3" style={{ color: pillar.accent }}>{pillar.tagline}</p>
              <p className="text-[14.5px] text-slate-600 leading-[1.7]">{pillar.description}</p>
              <div className="w-16 h-1 mt-6" style={{ backgroundColor: pillar.accent }} />
            </div>

            {/* Products in this pillar */}
            <div className={`grid gap-6 ${pillar.items.length <= 2 ? 'md:grid-cols-2 max-w-5xl' : pillar.items.length <= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
              {pillar.items.map((product) => {
                const Icon = product.icon;
                const isHighlight = product.badge === "Flagship" || product.badge === "Cloud" || product.badge === "New";
                return (
                  <Card
                    key={product.name}
                    data-testid={`product-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className={`bg-white border-border hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col ${isHighlight ? "border-2" : ""}`}
                    style={isHighlight ? { borderColor: `${pillar.accent}30` } : {}}
                  >
                    {isHighlight && <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${pillar.accent}, ${pillar.accent}80)` }} />}
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div
                          className="w-11 h-11 rounded-lg flex items-center justify-center transition-colors"
                          style={{ backgroundColor: `${pillar.accent}${isHighlight ? '' : '15'}`, color: isHighlight ? "#fff" : pillar.accent }}
                        >
                          <Icon className="w-5 h-5" style={{ color: isHighlight ? "#fff" : pillar.accent }} />
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
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: pillar.accent }} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {product.link && (
                        <Link to={product.link}>
                          <Button
                            size="sm"
                            className={`w-full mt-auto transition-all bg-transparent border text-slate-700 hover:text-white`}
                            style={{ borderColor: `${pillar.accent}80` }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = pillar.accent; e.currentTarget.style.color = "#fff"; }}
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
          <h2 className="text-3xl font-bold text-foreground mb-4">Start with any pillar. Grow into the platform.</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Download the IDE, spin up the virtual platform, or talk to our engineers about a complete evaluation.
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
                Talk to Sales <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSuite;
