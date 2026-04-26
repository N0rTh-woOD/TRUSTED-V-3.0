import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cpu, Shield, Target, Eye, ArrowRight, CheckCircle2, 
  Users, Globe, Zap, Lightbulb, Binary, Layers
} from "lucide-react";

// Animated counter component
const AnimatedCounter = ({ end, label, description }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 30;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end]);

  return (
    <div ref={ref} className="text-center p-6 rounded-xl bg-slate-50 border border-border hover:shadow-md transition-shadow">
      <div className="text-4xl font-bold text-primary mb-2">{count}</div>
      <div className="font-semibold text-foreground">{label}</div>
      <div className="text-sm text-muted-foreground mt-1">{description}</div>
    </div>
  );
};

const About = () => {
  const values = [
    { icon: Shield, title: "Security First", description: "Every component is designed with security as the foundation, from secure boot to trusted execution." },
    { icon: Zap, title: "Performance", description: "Optimized toolchains and real-time capable systems for demanding embedded applications." },
    { icon: Users, title: "Community Driven", description: "Open collaboration with the RISC-V and Rust communities to advance embedded development." },
    { icon: Globe, title: "Open Standards", description: "Built on open architectures and standards for maximum flexibility and vendor independence." },
  ];

  const team = [
    { role: "Architects", count: 4, description: "RISC-V & Security Architects" },
    { role: "Developers", count: 10, description: "Embedded Systems Engineers" },
    { role: "Researchers", count: 5, description: "AI/ML Research Scientists" },
    { role: "Support", count: 5, description: "Developer Relations Team" },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="about-page">
      {/* Hero Section with Slogan */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-6">
              About TrusteD-V
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
              Your RISC-V Embedded <span className="text-primary">AI Engine</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Building the Future of Secure Embedded Systems
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              TrusteD-V provides a comprehensive, vertically integrated platform for developing secure 
              embedded systems with RISC-V architecture and Rust programming language, designed and built in India.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-50 rounded-xl p-8 border border-border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To democratize secure embedded development by providing world-class tools, SDKs, and 
                comprehensive support for building trustworthy RISC-V systems.
              </p>
              <ul className="space-y-3">
                {["Enable secure-by-default embedded development", "Reduce time-to-market for RISC-V products", "Foster open innovation in embedded systems"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-primary/5 rounded-xl p-8 border border-primary/20 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A world where every embedded system is built on a foundation of security, 
                powered by open architectures, and developed with intelligent tools.
              </p>
              <ul className="space-y-3">
                {["Industry-leading secure development platform", "Global ecosystem of RISC-V innovation", "AI-assisted development as the standard"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Principles</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="bg-white border-border hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Technology</span>
              <h2 className="text-3xl font-bold text-foreground mt-2 mb-6">Built on Modern Foundations</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                TrusteD-V leverages cutting-edge technologies to provide unmatched security, 
                performance, and developer experience for embedded systems.
              </p>
              <div className="space-y-6">
                {[
                  { color: "bg-orange-100", textColor: "text-orange-600", label: "R", title: "Rust Programming Language", desc: "Memory-safe, zero-cost abstractions for reliable embedded software." },
                  { color: "bg-blue-100", icon: Cpu, title: "RISC-V Architecture", desc: "Open, extensible instruction set for custom and efficient processors." },
                  { color: "bg-green-100", icon: Shield, title: "Hardware Security Modules", desc: "Integrated HSM support for cryptographic operations and key storage." },
                  { color: "bg-purple-100", icon: Lightbulb, title: "AI-Powered Development", desc: "Jarvyn AI assistant for intelligent code generation and optimization." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex gap-4 group">
                      <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                        {item.label ? (
                          <span className={`${item.textColor} font-bold text-lg`}>{item.label}</span>
                        ) : (
                          <Icon className={`w-6 h-6 ${item.textColor || (i === 1 ? "text-blue-600" : i === 2 ? "text-green-600" : "text-purple-600")}`} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Platform Architecture - differentiated from landing page */}
            <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-xl p-8 border border-primary/20">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                Platform Architecture
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Application Layer", items: ["Jarvyn AI", "IDE", "Project Manager"], color: "bg-primary/15 text-primary border-primary/20" },
                  { label: "SDK & Middleware", items: ["Zephyr RTOS", "FreeRTOS", "Embassy", "Drivers"], color: "bg-green-500/15 text-green-700 border-green-500/20" },
                  { label: "Secure Foundation", items: ["Secure Boot", "Trusted HAL", "HSM", "TEE"], color: "bg-red-500/15 text-red-700 border-red-500/20" },
                  { label: "Hardware", items: ["RISC-V Cores", "TPU/NPU", "Peripherals", "Memory"], color: "bg-orange-500/15 text-orange-700 border-orange-500/20" },
                ].map((layer, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border border-border">
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">{layer.label}</div>
                    <div className="flex flex-wrap gap-2">
                      {layer.items.map((item) => (
                        <span key={item} className={`px-2.5 py-1 rounded-md text-xs font-medium border ${layer.color}`}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats - Animated Counters */}
      <section className="py-20 bg-white" data-testid="about-team-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Team</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Expert Team</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              A dedicated team of embedded systems experts, security researchers, and developer advocates.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((item, index) => (
              <AnimatedCounter 
                key={index} 
                end={item.count} 
                label={item.role} 
                description={item.description} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Ecosystem</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Partner with us to build the future of secure embedded systems, your RISC-V embedded AI engine.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/partner-registration">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Become a Partner <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/developer-portal">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
                Explore Developer Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
