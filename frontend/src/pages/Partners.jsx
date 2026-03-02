import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, ArrowRight, CheckCircle2, Users, Building2, 
  GraduationCap, Rocket, Globe, Award
} from "lucide-react";

const Partners = () => {
  const partnerTypes = [
    {
      type: "Hardware Vendors",
      icon: Cpu,
      description: "Leading RISC-V silicon and development board manufacturers",
      partners: [
        { name: "SiFive", description: "RISC-V IP cores and development boards", logo: "SF" },
        { name: "Espressif", description: "ESP32-C series RISC-V IoT solutions", logo: "ES" },
        { name: "StarFive", description: "High-performance RISC-V SBCs", logo: "ST" },
        { name: "Canaan", description: "Kendryte AI accelerator chips", logo: "CA" },
        { name: "Microchip", description: "PolarFire RISC-V FPGA SoC", logo: "MC" },
        { name: "BeagleBoard", description: "Open-source RISC-V hardware", logo: "BB" },
      ]
    },
    {
      type: "Software Partners",
      icon: Building2,
      description: "RTOS, toolchain, and middleware providers",
      partners: [
        { name: "Zephyr Project", description: "Scalable RTOS for connected devices", logo: "ZP" },
        { name: "FreeRTOS", description: "Market-leading real-time kernel", logo: "FR" },
        { name: "RT-Thread", description: "Open-source IoT operating system", logo: "RT" },
        { name: "Embassy", description: "Async Rust embedded framework", logo: "EM" },
      ]
    },
    {
      type: "Academic Partners",
      icon: GraduationCap,
      description: "Universities and research institutions advancing RISC-V",
      partners: [
        { name: "IIT Madras", description: "Shakti RISC-V processor development", logo: "IIT" },
        { name: "UC Berkeley", description: "RISC-V architecture originators", logo: "UCB" },
        { name: "ETH Zurich", description: "PULP Platform research", logo: "ETH" },
      ]
    },
    {
      type: "Integration Partners",
      icon: Rocket,
      description: "System integrators and solution providers",
      partners: [
        { name: "Antmicro", description: "Open hardware design services", logo: "AM" },
        { name: "lowRISC", description: "Open-source silicon foundation", logo: "LR" },
      ]
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Global Visibility",
      description: "Showcase your products to thousands of embedded developers worldwide",
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Connect with a growing community of RISC-V and Rust enthusiasts",
    },
    {
      icon: Award,
      title: "Technical Support",
      description: "Priority integration support and co-marketing opportunities",
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
              Building Together
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              TrusteD-V partners with leading hardware vendors, software providers, and academic 
              institutions to create the most comprehensive RISC-V development ecosystem.
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
                        <div>
                          <h3 className="font-semibold text-foreground">{partner.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
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
            Join our growing ecosystem and help shape the future of secure embedded development.
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
