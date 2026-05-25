import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, CheckCircle2, ChevronRight,
  Shield, Cpu, Code, Layers, Zap, Lock,
  Award, Globe, Terminal
} from "lucide-react";
import TrustedVLogo from "@/components/TrustedVLogo";

const RevealItem = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Landing = () => {
  const pricingTiers = [
    {
      name: "Basic", tagline: "Individual Developer", price: "Free", highlight: false,
      desc: "Community access for individual developers and students exploring RISC-V with Rust.",
      features: ["TRusteD-V IDE Jarvyn (Community)", "RISC-V Rust SDK access", "Community support", "Basic project templates"],
      cta: "Get Started", link: "/download-ide",
    },
    {
      name: "Pro", tagline: "Professional Teams", price: "$499/yr", highlight: true,
      desc: "Full platform access for professional embedded development teams building production RISC-V products.",
      features: ["Full IDE + WebIDE access", "AI-powered code generation", "Priority hardware support", "Advanced debugging tools", "Team collaboration", "Email support"],
      cta: "Start Pro Trial", link: "/contact-sales?plan=pro",
    },
    {
      name: "Enterprise", tagline: "Custom Solutions", price: "Custom", highlight: false,
      desc: "Tailored solutions for enterprises with custom hardware, dedicated support, and SLA guarantees.",
      features: ["Everything in Pro", "Custom IP block integration", "On-premise deployment", "Dedicated account manager", "SLA guarantees", "Custom training"],
      cta: "Contact Sales", link: "/contact-sales?plan=enterprise",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-[#0c1020]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#003262]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FDB515]/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <div className="max-w-4xl">
            <div className="mb-8" data-testid="hero-brand-lockup">
              <TrustedVLogo size="xl" showPoweredBy={true} dark={true} />
            </div>
            
            <div className="inline-flex items-center gap-2 bg-[#FF9933]/10 border border-[#FF9933]/25 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
              <span className="text-sm font-semibold text-[#FFB366]">Made in India, Engineered by Bosch to the World</span>
            </div>
            
            <h1 className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold text-white tracking-tight mb-5 leading-[1.05]" data-testid="hero-heading">
              Secure{" "}
              <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}><span style={{ color: "#6B9AFF" }}>RISC</span><span style={{ color: "#FDB515" }}>-V</span></span>{" "}
              from Silicon<br className="hidden sm:block" /> to Application
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl">
              The world's first vertically integrated RISC-V security platform. Two products under one brand: a Rust-based software and toolchain ecosystem, and an AI-powered silicon pipeline from requirement to production.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/product-suite">
                <Button size="lg" className="h-13 px-8 text-base font-semibold bg-white text-[#0c1020] hover:bg-white/90 shadow-lg" data-testid="hero-cta-products">
                  Explore Products <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="h-13 px-8 text-base font-semibold border-white/20 text-white hover:bg-white/10" data-testid="hero-cta-contact">
                  Talk to Engineers
                </Button>
              </Link>
            </div>
            
            {/* Hero feature pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Shield, label: "CC EAL4+ / FIPS 140-3" },
                { icon: Cpu, label: "RISC-V RV32 & RV64" },
                { icon: Lock, label: "Rust Memory Safety" },
                { icon: Zap, label: "48hr Certification" },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5">
                  <p.icon className="w-4 h-4 text-[#6B9AFF] flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-300">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TWO PRODUCTS ══ */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Products</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">One brand. Two specialised products.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Under TRusteD-V, two distinct products address the complete RISC-V journey: from secure software foundation to AI-generated, production-certified silicon.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Software & Toolchain */}
            <RevealItem>
              <div className="bg-white rounded-xl border-2 border-[#003262]/15 p-6 hover:shadow-xl transition-all hover:border-[#003262]/30 h-full">
                <div className="w-12 h-12 rounded-xl bg-[#003262]/10 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-[#003262]" />
                </div>
                <span className="text-[10px] font-bold text-[#003262] uppercase tracking-wider">Sub-brand 01</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-3">TRusteD-V Software & Toolchain</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">A complete Rust-based RISC-V software ecosystem from ROM-resident secure bootloader through a security-hardened RTOS, validation framework, and a full development toolchain.</p>
                <ul className="space-y-2 mb-5">
                  {["Rust Software Stack: rBoot, rustBoot, RTOS RV32/64, HAL & Crypto", "Toolchain & IDE: Flash Analyzer, Debugger, Simulator, Compiler", "TRusteD-V Verified: 5-layer Bronze to Platinum certification"].map((f, i) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3.5 h-3.5 text-[#003262] mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to="/product-suite" className="inline-flex items-center text-sm font-semibold text-[#003262] hover:underline">
                  Explore Software & Toolchain <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </RevealItem>
            {/* SignOff Silicon */}
            <RevealItem delay={100}>
              <div className="bg-white rounded-xl border-2 border-[#0F6E56]/15 p-6 hover:shadow-xl transition-all hover:border-[#0F6E56]/30 h-full">
                <div className="w-12 h-12 rounded-xl bg-[#0F6E56]/10 flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-[#0F6E56]" />
                </div>
                <span className="text-[10px] font-bold text-[#0F6E56] uppercase tracking-wider">Sub-brand 02</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-3">SignOff Silicon</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">An AI-powered RISC-V solution platform that converts natural language requirements into production-ready silicon: three engines, a certified Cores Marketplace, and a 7-step chip-to-deployment pipeline.</p>
                <ul className="space-y-2 mb-5">
                  {["AI Engine: Core Engine, Chip Engine, Code Engine", "Cores Marketplace: certified RISC-V core catalogue with scoring", "Solution Engine: NL requirement to production-ready chip"].map((f, i) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3.5 h-3.5 text-[#0F6E56] mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link to="/product-suite" className="inline-flex items-center text-sm font-semibold text-[#0F6E56] hover:underline">
                  Explore SignOff Silicon <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DELIVER ══ */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Platform Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">Full-stack RISC-V security, delivered</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "Secure Boot Chain", desc: "ROM-resident rBoot + rustBoot: immutable root of trust through multi-stage verified boot.", color: "#003262" },
              { icon: Terminal, title: "Jarvyn IDE", desc: "Purpose-built embedded Rust IDE with native analyzer, SVD visualization, and AI-powered hardware intelligence.", color: "#B7410E" },
              { icon: Award, title: "TVOTS Certification", desc: "5-layer Bronze to Platinum production readiness grading: firmware, silicon, integration, system, deployment.", color: "#0F6E56" },
              { icon: Layers, title: "Security-Hardened RTOS", desc: "Rust-native RTOS for RV32/RV64 with memory isolation, capability-based access, and deterministic scheduling.", color: "#7B3F00" },
              { icon: Cpu, title: "AI Silicon Pipeline", desc: "Three AI engines convert NL requirements into verified SoC designs with automated firmware generation.", color: "#0071c5" },
              { icon: Globe, title: "Cores Marketplace", desc: "Certified RISC-V IP catalogue with trust scoring, compliance badges, and one-click integration.", color: "#6B3FA0" },
              { icon: Lock, title: "Crypto Stack", desc: "Post-quantum ready: ML-KEM, ML-DSA, AES-256-GCM, SHA-3, Ed25519 with hardware acceleration support.", color: "#C62828" },
              { icon: Zap, title: "48-Hour Certification", desc: "Full TRusteD-V Verified certification run on real silicon in under 48 hours.", color: "#E65100" },
            ].map((cap, i) => {
              const Icon = cap.icon;
              return (
                <RevealItem key={i} delay={i * 60}>
                  <div className="bg-white rounded-xl border border-border p-5 hover:shadow-lg transition-all h-full group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors" style={{ backgroundColor: `${cap.color}10` }}>
                      <Icon className="w-5 h-5" style={{ color: cap.color }} />
                    </div>
                    <h4 className="font-bold text-foreground text-sm mb-1.5">{cap.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cap.desc}</p>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ SECURITY CERTIFICATIONS ══ */}
      <section className="py-12 bg-[#0c1020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Security & Standards Compliance</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">Built to the world's most demanding security standards</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { name: "CC EAL4+", desc: "Common Criteria" }, { name: "FIPS 140-3", desc: "Cryptographic Module" },
              { name: "PSA Certified L3", desc: "Platform Security" }, { name: "ISO 26262", desc: "Automotive ASIL-D" },
              { name: "IEC 62443", desc: "Industrial Security" }, { name: "SESIP L3", desc: "IoT Platforms" },
              { name: "NIST SP 800-193", desc: "Firmware Resilience" }, { name: "TCG DICE", desc: "Device Attestation" },
              { name: "SLSA Level 3", desc: "Supply Chain" }, { name: "IEC 61508", desc: "Functional Safety SIL-2" },
            ].map((cert, i) => (
              <div key={cert.name} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center hover:bg-white/10 transition-colors">
                <div className="text-sm font-bold text-white">{cert.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRY VERTICALS ══ */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Industry Focus</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">Trusted in every industry that demands reliability</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: "📡", title: "IoT & Edge", desc: "PSA/SESIP certified, constrained-device optimised, 10+ year lifecycle support with lightweight certification path.", tags: ["PSA L3", "SESIP", "ETSI EN 303 645"] },
              { icon: "🏭", title: "Industrial", desc: "IEC 61508 SIL-2, IEC 62443 cybersecurity, deterministic RTOS, harsh environment characterization and validation.", tags: ["IEC 61508", "IEC 62443", "SIL-2"] },
              { icon: "📱", title: "Consumer Electronics", desc: "Full 5-layer TRusteD-V Verified path, OTA update security, fast re-certification cycles.", tags: ["ISO/IEC 15408", "ETSI", "OTA Secure"] },
            ].map((v, i) => (
              <RevealItem key={v.title} delay={i * 100}>
                <Card className="border-border hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <span className="text-3xl block mb-3">{v.icon}</span>
                    <h3 className="font-bold text-foreground text-base mb-2">{v.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{v.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {v.tags.map((t) => <span key={t} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>)}
                    </div>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BUSINESS PLANS ══ */}
      <section className="py-16 bg-slate-50 border-t border-border" data-testid="pricing-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Licensing & Plans</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">Flexible Plans for Every Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <RevealItem key={tier.name} delay={0}>
                <Card className={`relative overflow-hidden h-full flex flex-col ${tier.highlight ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]" : "border-border hover:shadow-lg"} transition-all`}>
                  {tier.highlight && <div className="h-1.5 bg-gradient-to-r from-primary to-orange-400" />}
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{tier.tagline}</p>
                    </div>
                    <span className="text-2xl font-bold text-foreground mb-4 block">{tier.price}</span>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{tier.desc}</p>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-primary" : "text-green-500"}`} />{f}
                        </li>
                      ))}
                    </ul>
                    <Link to={tier.link}><Button className={`w-full ${tier.highlight ? "" : ""}`} variant={tier.highlight ? "default" : "outline"}>{tier.cta} <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>
      
      {/* ══ STRATEGIC ROADMAP ══ */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Strategic Roadmap</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">Three phases to industry adoption</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { phase: "Phase 1", subtitle: "Foundation", title: "Build & Certify", items: ["TVOTS v1.0 release (open-source)", "First TRusteD-V Verified certificate", "Consortium formation & TSC", "TV-STD-001 to 006 published", "Chip Registry (TVCR) live"], active: true },
              { phase: "Phase 2", subtitle: "Ecosystem Growth", title: "Scale & Expand", items: ["10+ silicon targets certified", "20+ IP blocks certified", "IoT, Industrial, Consumer verticals", "TVOTS v2.0 with AI/ML benchmarks", "10+ Consortium Principal Members"] },
              { phase: "Phase 3", subtitle: "Industry Adoption", title: "Standardize & Lead", items: ["Regulatory recognition", "RISC-V International integration", "Open reference platform", "Procurement framework integrations", "Self-sustaining consortium"] },
            ].map((r, i) => (
              <RevealItem key={r.phase} delay={i * 100}>
                <div className={`rounded-xl border p-6 h-full ${r.active ? "bg-primary/5 border-primary/30" : "bg-slate-50 border-border"}`}>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{r.phase} {r.subtitle}</span>
                  <h3 className="text-lg font-bold text-foreground mt-1 mb-3">{r.title}</h3>
                  <ul className="space-y-2">
                    {r.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${r.active ? "text-primary" : "text-slate-400"}`} />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>
      
      {/* ══ CTA ══ */}
      <section className="py-16 bg-[#003262]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
              Ready to build secure <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}><span className="text-white">RISC</span><span style={{ color: "#FDB515" }}>-V</span></span> systems?
            </h2>
            <p className="text-blue-200/80 mb-8 text-base sm:text-lg leading-relaxed">
              Partner with Bosch to bring certified, production-grade RISC-V products to market.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="h-12 px-8 text-base font-semibold bg-white text-[#003262] hover:bg-white/90">
                  Talk to Engineers <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/download-ide">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold border-white/30 text-white hover:bg-white/10">
                  Download IDE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/product-suite" className="hover:text-white transition-colors">Product Suite</Link></li>
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/download-ide" className="hover:text-white transition-colors">IDE Jarvyn</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Developers</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">Developer Portal</Link></li>
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/webide" className="hover:text-white transition-colors">WebIDE</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/partners" className="hover:text-white transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <TrustedVLogo size="sm" showPoweredBy={true} dark={true} />
            <p className="text-sm text-slate-400">&copy; 2026 TRusteD-V. Secure RISC-V Development Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
