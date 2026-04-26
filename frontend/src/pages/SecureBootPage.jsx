import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, ArrowRight, CheckCircle2, ExternalLink, 
  GitBranch, Lock, Cpu, ArrowLeft, Zap, RefreshCw, Key
} from "lucide-react";

const SecureBootPage = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="secure-boot-page">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-red-50/50 to-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/product-suite" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <Badge className="bg-red-100 text-red-800 border-red-200">Security</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Secure Boot: rboot & rustBoot
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Hardware root of trust with verified boot chain for RISC-V. Two complementary bootloaders designed for different stages and use cases.
          </p>
        </div>
      </section>

      {/* Two bootloaders side by side */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* rboot */}
            <Card className="border-border overflow-hidden" data-testid="rboot-card">
              <div className="h-1.5 bg-gradient-to-r from-orange-400 to-orange-600" />
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">rboot</h2>
                    <p className="text-xs text-muted-foreground">Lightweight First-Stage Bootloader</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Minimal, fast, and secure first-stage bootloader for RISC-V. rboot handles the initial 
                  hardware initialization and chain-of-trust verification before handing off to the main firmware.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Minimal footprint (~8KB flash)",
                    "First-stage hardware init for RISC-V",
                    "Signature verification of next-stage image",
                    "Written in Rust, no unsafe C dependencies",
                    "Support for SPI/QSPI flash boot",
                    "Watchdog timer integration",
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://github.com/niclas-plog/rboot" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full">
                    <GitBranch className="w-4 h-4 mr-2" /> View rboot on GitHub <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* rustBoot */}
            <Card className="border-border overflow-hidden" data-testid="rustboot-card">
              <div className="h-1.5 bg-gradient-to-r from-primary to-red-600" />
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">rustBoot</h2>
                    <p className="text-xs text-muted-foreground">Rust-Native Secure Bootloader</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Full-featured secure bootloader written entirely in Rust. rustBoot provides A/B firmware updates, 
                  anti-rollback protection, and cryptographic signature verification for production deployments.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "A/B firmware update with automatic rollback",
                    "Anti-rollback counter protection",
                    "Ed25519 / ECDSA signature verification",
                    "Encrypted firmware images (AES-256)",
                    "Key management and secure provisioning",
                    "Support for RISC-V, ARM Cortex-M, and more",
                    "Production-tested, safety-critical grade",
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://github.com/niclas-plog/rustBoot" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full">
                    <GitBranch className="w-4 h-4 mr-2" /> View rustBoot on GitHub <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Boot Chain Diagram */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-foreground text-center mb-10">Verified Boot Chain</h3>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
            {[
              { label: "Power On", sub: "Hardware Reset", color: "bg-slate-200 text-slate-700" },
              { label: "rboot", sub: "First-Stage Loader", color: "bg-orange-100 text-orange-800 border border-orange-200" },
              { label: "Signature Check", sub: "Ed25519 / ECDSA", color: "bg-red-50 text-red-700 border border-red-200" },
              { label: "rustBoot", sub: "Secure Bootloader", color: "bg-primary/10 text-primary border border-primary/20" },
              { label: "Firmware", sub: "A or B Slot", color: "bg-green-100 text-green-800 border border-green-200" },
              { label: "Application", sub: "User Code", color: "bg-blue-100 text-blue-800 border border-blue-200" },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-3 lg:gap-4">
                <div className={`px-4 py-3 rounded-lg text-center min-w-[110px] ${step.color}`}>
                  <div className="text-sm font-bold">{step.label}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{step.sub}</div>
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-5 h-5 text-muted-foreground hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-foreground text-center mb-10">Security Features</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: "Hardware Root of Trust", desc: "Chain of trust starting from immutable ROM, through bootloader stages to application code." },
              { icon: RefreshCw, title: "A/B Updates", desc: "Dual firmware slots enable seamless over-the-air updates with automatic fallback on failure." },
              { icon: Key, title: "Key Management", desc: "Secure provisioning, key rotation, and revocation for firmware signing and encryption." },
              { icon: Shield, title: "Anti-Rollback", desc: "Monotonic counter prevents downgrade attacks by enforcing minimum firmware version." },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Card key={i} className="border-border hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1.5">{feat.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Integrate Secure Boot into Your Project</h3>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto text-sm">
            Get started with rboot and rustBoot in your RISC-V Rust project. 
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact-sales?plan=pro">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Talk to Sales <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/developer-portal">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
                Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecureBootPage;
