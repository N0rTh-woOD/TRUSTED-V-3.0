import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cpu, ArrowRight, CheckCircle2, Users, Building2, 
  GraduationCap, Rocket, Globe, Award, MapPin
} from "lucide-react";

const Partners = () => {
  const partnerTypes = [
    {
      type: "Semiconductor Companies",
      icon: Cpu,
      description: "Leading Indian RISC-V silicon and processor IP providers",
      partners: [
        { 
          name: "InCore Semiconductors", 
          description: "RISC-V processor IP and SoC solutions, IIT Madras spin-off", 
          logo: "IC",
          location: "Chennai"
        },
        { 
          name: "Mindgrove Technologies", 
          description: "RISC-V SoCs for vision systems, CCTV, and dashcams", 
          logo: "MG",
          location: "Chennai"
        },
        { 
          name: "3rdiTech", 
          description: "Surveillance and imaging SoC development", 
          logo: "3T",
          location: "Bangalore"
        },
        { 
          name: "Netrasemi", 
          description: "RISC-V based video processing solutions", 
          logo: "NS",
          location: "Hyderabad"
        },
        { 
          name: "BigEndian Semiconductors", 
          description: "RISC-V SoCs for IoT and edge computing", 
          logo: "BE",
          location: "Bangalore"
        },
      ]
    },
    {
      type: "Government & Research",
      icon: Building2,
      description: "Government organizations driving RISC-V adoption in India",
      partners: [
        { 
          name: "C-DAC", 
          description: "VEGA RISC-V processors and ARIES development boards", 
          logo: "CD",
          location: "Pune"
        },
        { 
          name: "ISRO", 
          description: "Space-grade RISC-V solutions with IRIS chip", 
          logo: "IS",
          location: "Bangalore"
        },
        { 
          name: "SCL Chandigarh", 
          description: "Semiconductor fabrication for indigenous chips", 
          logo: "SC",
          location: "Chandigarh"
        },
      ]
    },
    {
      type: "Academic Partners",
      icon: GraduationCap,
      description: "Leading institutions advancing RISC-V research and development",
      partners: [
        { 
          name: "IIT Madras - Shakti", 
          description: "Open-source Shakti RISC-V processor development", 
          logo: "IIT",
          location: "Chennai"
        },
        { 
          name: "IIT Bombay", 
          description: "VLSI design and embedded systems research", 
          logo: "IIB",
          location: "Mumbai"
        },
        { 
          name: "IIIT Hyderabad", 
          description: "Computer architecture and SoC research", 
          logo: "IIH",
          location: "Hyderabad"
        },
      ]
    },
    {
      type: "System Integrators",
      icon: Rocket,
      description: "Companies integrating RISC-V solutions into products",
      partners: [
        { 
          name: "Tata Advanced Systems", 
          description: "Chip packaging and system integration", 
          logo: "TA",
          location: "Hyderabad"
        },
        { 
          name: "IGCAR", 
          description: "Nuclear applications with RISC-V FPGA deployments", 
          logo: "IG",
          location: "Kalpakkam"
        },
      ]
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: "India-First Ecosystem",
      description: "Join India's growing RISC-V semiconductor ecosystem with government support",
    },
    {
      icon: Users,
      title: "DIR-V Program Access",
      description: "Connect with Digital India RISC-V (DIR-V) initiatives and funding opportunities",
    },
    {
      icon: Award,
      title: "Technical Collaboration",
      description: "Access to Shakti and VEGA cores with priority integration support",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Partner Network</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Building India's RISC-V Ecosystem
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              TrusteD-V partners with leading Indian semiconductor companies, research institutions, 
              and government organizations to create a self-reliant RISC-V development ecosystem.
            </p>
            <div className="mt-8">
              <Link to="/partner-registration">
                <Button size="lg" className="font-semibold">
                  Become a Partner
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      {partnerTypes.map((category, catIndex) => {
        const Icon = category.icon;
        return (
          <section 
            key={catIndex} 
            className={`py-16 ${catIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{category.type}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.partners.map((partner, pIndex) => (
                  <Card key={pIndex} className="bg-white hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-lg">{partner.logo}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{partner.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
                          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {partner.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Government Initiatives */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Supported by Government Initiatives</h2>
            <p className="text-slate-400 mt-2">Part of India's semiconductor self-reliance mission</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-slate-800">
              <h3 className="font-semibold text-xl mb-2">DIR-V</h3>
              <p className="text-slate-400 text-sm">Digital India RISC-V program enabling 130+ SoC designs</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-slate-800">
              <h3 className="font-semibold text-xl mb-2">Chips to Startup (C2S)</h3>
              <p className="text-slate-400 text-sm">Supporting semiconductor startups with tools and funding</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-slate-800">
              <h3 className="font-semibold text-xl mb-2">DLI Scheme</h3>
              <p className="text-slate-400 text-sm">Design Linked Incentive for domestic chip design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Partnership Benefits</h2>
            <p className="text-primary-foreground/80 mt-2">Why partner with TrusteD-V?</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{benefit.title}</h3>
                  <p className="text-primary-foreground/80">{benefit.description}</p>
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
            Join India's growing RISC-V ecosystem and help build indigenous semiconductor capabilities.
          </p>
          <Link to="/partner-registration">
            <Button size="lg" className="font-semibold">
              Apply for Partnership
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Partners;
