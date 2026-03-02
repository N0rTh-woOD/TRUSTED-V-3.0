import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cpu, ArrowRight, CheckCircle2, Users, Building2, 
  GraduationCap, Rocket, Globe, Award, Handshake,
  Target, Zap, Shield, Code, Package, TrendingUp
} from "lucide-react";

const Partners = () => {
  const partnershipTypes = [
    {
      icon: Cpu,
      title: "Hardware Partners",
      description: "Silicon vendors and board manufacturers looking to integrate with TrusteD-V ecosystem",
      benefits: [
        "Official board support in our platform",
        "Featured in hardware catalog",
        "Joint marketing opportunities",
        "Early access to SDK updates"
      ]
    },
    {
      icon: Code,
      title: "Software Partners",
      description: "RTOS vendors, SDK providers, and tool developers expanding RISC-V support",
      benefits: [
        "Integration with TrusteD-V Studio",
        "Access to testing infrastructure",
        "Co-development opportunities",
        "Technical documentation support"
      ]
    },
    {
      icon: Building2,
      title: "Enterprise Partners",
      description: "Organizations deploying RISC-V solutions at scale seeking platform support",
      benefits: [
        "Dedicated technical support",
        "Custom integration services",
        "Priority feature development",
        "Enterprise licensing options"
      ]
    },
    {
      icon: GraduationCap,
      title: "Academic Partners",
      description: "Research institutions and universities advancing RISC-V education and research",
      benefits: [
        "Free academic licenses",
        "Research collaboration",
        "Student project support",
        "Publication opportunities"
      ]
    }
  ];

  const partnershipProcess = [
    {
      step: "01",
      title: "Submit Application",
      description: "Fill out our partnership application form with your organization details and partnership goals"
    },
    {
      step: "02",
      title: "Technical Review",
      description: "Our team evaluates technical compatibility and identifies integration opportunities"
    },
    {
      step: "03",
      title: "Partnership Agreement",
      description: "Define partnership terms, scope of collaboration, and mutual commitments"
    },
    {
      step: "04",
      title: "Integration & Launch",
      description: "Work together on integration, testing, and joint go-to-market activities"
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: "India-First Ecosystem",
      description: "Join India's growing RISC-V semiconductor ecosystem backed by government initiatives",
    },
    {
      icon: Users,
      title: "Growing Developer Community",
      description: "Access our growing community of embedded systems developers and engineers",
    },
    {
      icon: Award,
      title: "Technical Excellence",
      description: "Collaborate with experts in Rust, RISC-V, and secure embedded systems development",
    },
    {
      icon: TrendingUp,
      title: "Market Growth",
      description: "Position your products in the rapidly growing RISC-V and embedded security market",
    },
  ];

  const focusAreas = [
    "RISC-V processor IP and SoC development",
    "Embedded security and trusted execution",
    "Rust toolchain and compiler development",
    "Industrial and automotive applications",
    "IoT and edge computing solutions",
    "AI/ML acceleration for embedded systems"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Partner With Us</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Join the TrusteD-V Ecosystem
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're building India's premier RISC-V development platform. Partner with us to shape 
              the future of secure embedded systems and grow together in this emerging market.
            </p>
            <div className="mt-8">
              <Link to="/partner-registration">
                <Button size="lg" className="font-semibold" data-testid="become-partner-btn">
                  Become a Partner
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Partnership Opportunities</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Multiple ways to collaborate based on your organization's expertise and goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="bg-white border border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{type.title}</h3>
                        <p className="text-muted-foreground mt-1">{type.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {type.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Focus</span>
              <h2 className="text-3xl font-bold text-foreground mt-2 mb-6">
                Strategic Focus Areas
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We're particularly interested in partnerships that advance these key technology areas 
                within the RISC-V and secure embedded systems domain.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {focusAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Partnership Goals</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Security First</h4>
                    <p className="text-sm text-muted-foreground">Building trusted computing foundations for India</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Indigenous Innovation</h4>
                    <p className="text-sm text-muted-foreground">Supporting Indian semiconductor ecosystem growth</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Mutual Growth</h4>
                    <p className="text-sm text-muted-foreground">Creating value for all ecosystem participants</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Partnership Process</h2>
            <p className="text-muted-foreground mt-2">Simple steps to become a TrusteD-V partner</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipProcess.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/10 absolute -top-4 left-0">{item.step}</div>
                <div className="pt-8">
                  <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                {index < partnershipProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 w-8">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Partner With TrusteD-V?</h2>
            <p className="text-primary-foreground/80 mt-2">Benefits of joining our ecosystem</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{benefit.title}</h3>
                  <p className="text-primary-foreground/80 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Partner?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us in building India's RISC-V development ecosystem. Submit your partnership 
            application today and let's explore how we can grow together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/partner-registration">
              <Button size="lg" className="font-semibold" data-testid="apply-partnership-btn">
                Apply for Partnership
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="font-semibold">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
