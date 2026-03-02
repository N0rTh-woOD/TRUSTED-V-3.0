import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cpu, Shield, Target, Eye, ArrowRight, CheckCircle2, 
  Users, Globe, Zap, Award, BookOpen, Lightbulb
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Every component is designed with security as the foundation, from secure boot to trusted execution.",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimized toolchains and real-time capable systems for demanding embedded applications.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Open collaboration with the RISC-V and Rust communities to advance embedded development.",
    },
    {
      icon: Globe,
      title: "Open Standards",
      description: "Built on open architectures and standards for maximum flexibility and vendor independence.",
    },
  ];

  const milestones = [
    { year: "2023", title: "Platform Foundation", description: "Initial development of secure RISC-V toolchain" },
    { year: "2024", title: "SDK Launch", description: "Release of comprehensive SDK with 50+ board support" },
    { year: "2025", title: "AI Integration", description: "AI-powered development assistant and code generation" },
    { year: "Future", title: "Hardware Certification", description: "ISO 26262 certified development workflows" },
  ];

  const team = [
    { role: "Architecture", count: "15+", description: "RISC-V & Security Architects" },
    { role: "Development", count: "50+", description: "Embedded Systems Engineers" },
    { role: "Research", count: "10+", description: "AI/ML Research Scientists" },
    { role: "Support", count: "20+", description: "Developer Relations Team" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Bosch-style top border is in Navigation */}
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">About TrusteD-V</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Building the Future of Secure Embedded Systems
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              TrusteD-V provides a comprehensive, vertically integrated platform for developing secure 
              embedded systems with RISC-V architecture and Rust programming language.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-50 rounded-xl p-8 border border-border">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To democratize secure embedded development by providing world-class tools, SDKs, and 
                comprehensive support for building trustworthy RISC-V systems.
              </p>
              <ul className="space-y-3">
                {[
                  "Enable secure-by-default embedded development",
                  "Reduce time-to-market for RISC-V products",
                  "Foster open innovation in embedded systems",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A world where every embedded system is built on a foundation of security, 
                powered by open architectures, and developed with intelligent tools.
              </p>
              <ul className="space-y-3">
                {[
                  "Industry-leading secure development platform",
                  "Global ecosystem of RISC-V innovation",
                  "AI-assisted development as the standard",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {item}
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
              <h2 className="text-3xl font-bold text-foreground mt-2 mb-6">
                Built on Modern Foundations
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                TrusteD-V leverages cutting-edge technologies to provide unmatched security, 
                performance, and developer experience for embedded systems.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold text-lg">R</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Rust Programming Language</h4>
                    <p className="text-sm text-muted-foreground">Memory-safe, zero-cost abstractions for reliable embedded software.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">RISC-V Architecture</h4>
                    <p className="text-sm text-muted-foreground">Open, extensible instruction set for custom and efficient processors.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Hardware Security Modules</h4>
                    <p className="text-sm text-muted-foreground">Integrated HSM support for cryptographic operations and key storage.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">AI-Powered Development</h4>
                    <p className="text-sm text-muted-foreground">Intelligent code generation and optimization using latest LLM models.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">Platform Architecture</h3>
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-2">Application Layer</div>
                  <div className="flex flex-wrap gap-2">
                    {["AI Assistant", "Web IDE", "Solution Builder"].map((item) => (
                      <span key={item} className="px-2 py-1 bg-primary/20 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-2">SDK & Middleware</div>
                  <div className="flex flex-wrap gap-2">
                    {["Zephyr RTOS", "FreeRTOS", "Embassy", "Drivers"].map((item) => (
                      <span key={item} className="px-2 py-1 bg-green-500/20 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-2">Secure Foundation</div>
                  <div className="flex flex-wrap gap-2">
                    {["Secure Boot", "Trusted HAL", "HSM", "TEE"].map((item) => (
                      <span key={item} className="px-2 py-1 bg-red-500/20 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-2">Hardware</div>
                  <div className="flex flex-wrap gap-2">
                    {["RISC-V Cores", "TPU/NPU", "Peripherals", "Memory"].map((item) => (
                      <span key={item} className="px-2 py-1 bg-orange-500/20 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Journey</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Platform Roadmap</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex gap-6 pb-12 last:pb-0">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10 flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{milestone.year}</span>
                  </div>
                  <div className="flex-1 pt-3">
                    <h3 className="font-semibold text-foreground text-lg">{milestone.title}</h3>
                    <p className="text-muted-foreground mt-1">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 bg-white">
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
              <div key={index} className="text-center p-6 rounded-xl bg-slate-50 border border-border">
                <div className="text-4xl font-bold text-primary mb-2">{item.count}</div>
                <div className="font-semibold text-foreground">{item.role}</div>
                <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Ecosystem</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Partner with us to build the future of secure embedded systems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/partner-registration">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Become a Partner
                <ArrowRight className="ml-2 w-4 h-4" />
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
