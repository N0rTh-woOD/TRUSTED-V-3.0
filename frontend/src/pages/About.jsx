import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, Target, ArrowRight, CheckCircle2, 
  Zap, Clock, Users, Globe, Award, Cpu
} from "lucide-react";

const AnimatedCounter = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    const steps = 30, inc = end / steps;
    let cur = 0;
    const t = setInterval(() => { cur += inc; if (cur >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(cur)); }, 50);
    return () => clearInterval(t);
  }, [started, end]);
  return <div ref={ref} className="text-center"><div className="text-3xl font-bold text-primary">{count}{suffix}</div><div className="text-sm text-muted-foreground mt-1 font-medium">{label}</div></div>;
};

const About = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="about-page">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
              <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif", fontWeight: 800 }}><span style={{ color: "#003262" }}>RISC</span><span style={{ color: "#FDB515" }}>-V</span></span> Security, Powered by Bosch
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Bosch Global Software Technologies initiative building the world's first vertically integrated RISC-V security certification ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Pillars */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Mission</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-3">Secure RISC-V. By design. By default.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We are solving three critical challenges that prevent enterprises from adopting RISC-V at scale.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Security", desc: "No unified security certification exists for RISC-V today. We provide the full stack from secure boot to application, with a 5-layer certification path from Bronze to Platinum." },
              { icon: Zap, title: "Performance", desc: "Generic tools waste cycles. Our Rust-native stack and AI-powered silicon pipeline deliver optimized, deterministic performance on constrained embedded targets." },
              { icon: Clock, title: "Time-to-Market", desc: "From NL requirement to production silicon in weeks, not years. Three AI engines automate IP selection, SoC integration, and firmware generation." },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <Card key={i} className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us: 8 structural gaps */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why TRusteD-V?</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-3">8 Structural Gaps We Close</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">RISC-V adoption faces critical bottlenecks. TRusteD-V addresses each one with production-grade solutions.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { num: "01", title: "Security Certification", desc: "No CC/FIPS equivalent for RISC-V exists. We built TVOTS." },
              { num: "02", title: "Secure Boot", desc: "No standardised ROM-to-application boot chain. rBoot and rustBoot fix this." },
              { num: "03", title: "RTOS", desc: "No security-hardened, Rust-native RTOS for RISC-V. Ours is built from scratch." },
              { num: "04", title: "Toolchain", desc: "Generic IDEs lack RISC-V register and HAL intelligence. Jarvyn fills the gap." },
              { num: "05", title: "Silicon Pipeline", desc: "Months from spec to silicon. SignOff Silicon compresses this to weeks." },
              { num: "06", title: "IP Marketplace", desc: "Fragmented, unverified core ecosystem. Our marketplace certifies every IP." },
              { num: "07", title: "Production Grading", desc: "No production-readiness scoring. Bronze-to-Platinum grading provides this." },
              { num: "08", title: "Ecosystem Unity", desc: "No single vendor covers SW + HW + certification. TRusteD-V does." },
            ].map((g, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow">
                <span className="text-xs font-black text-primary">{g.num}</span>
                <h4 className="font-bold text-foreground text-sm mt-1 mb-1.5">{g.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Backed by Bosch */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Backed by Bosch</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Enterprise-grade foundation</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <AnimatedCounter end={136} suffix="+" label="Years of Bosch engineering" />
            <AnimatedCounter end={30000} suffix="+" label="BGSW engineers globally" />
            <AnimatedCounter end={40} suffix="+" label="Countries, one team" />
            <AnimatedCounter end={10} suffix="B+" label="Connected Bosch devices" />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["ISO 26262", "IEC 62443", "CC EAL4+", "FIPS 140-3", "Automotive SPICE", "ISO/SAE 21434"].map((cert) => (
              <span key={cert} className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200">{cert}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to build secure RISC-V systems?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Partner with Bosch to bring certified, production-grade RISC-V products to market.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Talk to Engineers <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/product-suite">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
