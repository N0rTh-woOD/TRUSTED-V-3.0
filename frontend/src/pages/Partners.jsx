import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, CheckCircle2, ArrowRight, Building2, 
  Globe, Wrench, Shield, Package, ExternalLink
} from "lucide-react";

const Partners = () => {
  const partners = [
    {
      name: "C-DAC",
      fullName: "Centre for Development of Advanced Computing",
      description: "India's premier R&D organization in IT and electronics. C-DAC has been at the forefront of RISC-V processor development in India with the VEGA and DHRUV series of processors.",
      type: "Hardware Partner",
      logo: null,
      color: "primary",
      website: "https://vegaprocessors.in",
      contributions: [
        "VEGA ET1031 — 32-bit RISC-V microcontroller for IoT",
        "DHRUV64 — Dual-core 64-bit RISC-V processor",
        "ARIES development boards with full BSP support",
        "VEGA SDK and peripheral driver libraries",
      ],
      integration: [
        "Pre-configured BSP for TrusteD-V IDE — Jarvyn",
        "One-click build and flash support",
        "Debugger integration via JTAG/SWD",
        "Peripheral driver libraries in Rust",
      ],
    },
    {
      name: "Mindgrove Technologies",
      fullName: "Mindgrove Technologies Pvt. Ltd.",
      description: "Indian semiconductor startup building custom RISC-V SoCs for IoT, industrial automation, and AI edge applications. Pioneers in hardware security for RISC-V.",
      type: "Hardware Partner",
      logo: null,
      color: "green",
      website: "https://mindgrove.in",
      contributions: [
        "Secure IoT SoC — 32-bit with hardware crypto engine",
        "Vision SoC — 64-bit with integrated NPU for AI inference",
        "Industrial SoC — 32-bit ruggedized for harsh environments",
        "Hardware security modules and TEE support",
      ],
      integration: [
        "Pre-configured BSP for TrusteD-V IDE — Jarvyn",
        "Secure boot chain configuration tool",
        "AI model deployment via Vision SoC NPU",
        "Hardware crypto acceleration APIs",
      ],
    },
    {
      name: "Upbeat Tech",
      fullName: "Upbeat Technologies",
      description: "Emerging Indian RISC-V partner specializing in edge AI and intelligent sensor platforms. Building next-generation RISC-V SoCs with integrated NPU for on-device inference.",
      type: "Hardware Partner",
      logo: null,
      color: "orange",
      website: "#",
      contributions: [
        "Edge AI SoC — RISC-V with integrated neural processing unit",
        "Intelligent sensor fusion platform",
        "Low-power edge inference accelerator",
        "Smart industrial controller board",
      ],
      integration: [
        "Pre-configured BSP for TrusteD-V IDE — Jarvyn",
        "Edge AI model deployment pipeline",
        "Sensor fusion SDK integration",
        "Power-optimized firmware templates",
      ],
    },
  ];

  const partnerBenefits = [
    { icon: Package, title: "BSP Integration", description: "Your boards ship with pre-configured Board Support Packages in TrusteD-V IDE — Jarvyn." },
    { icon: Wrench, title: "Toolchain Support", description: "Full Rust toolchain optimization and testing for your RISC-V silicon." },
    { icon: Globe, title: "Developer Reach", description: "Access to the TrusteD-V developer community building with RISC-V and Rust." },
    { icon: Shield, title: "Security Certification", description: "Joint security validation and certification for secure boot workflows." },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="partners-page">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-6">
              <Building2 className="w-4 h-4" />
              Hardware Partners
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Built with India's <span className="text-primary">RISC-V</span> Pioneers
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              TrusteD-V partners with Indian RISC-V hardware companies to deliver 
              a native, integrated development experience for the Indian semiconductor ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {partners.map((partner, index) => (
              <Card key={index} data-testid={`partner-card-${index}`} className="overflow-hidden border-border hover:shadow-xl transition-all duration-300">
                <div className={`h-2 ${partner.color === "primary" ? "bg-primary" : partner.color === "green" ? "bg-green-500" : "bg-orange-500"}`} />
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Partner Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          partner.color === "primary" ? "bg-primary/10" : partner.color === "green" ? "bg-green-500/10" : "bg-orange-500/10"
                        }`}>
                          <Cpu className={`w-7 h-7 ${partner.color === "primary" ? "text-primary" : partner.color === "green" ? "text-green-600" : "text-orange-600"}`} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-foreground">{partner.name}</h2>
                          <p className="text-sm text-muted-foreground">{partner.fullName}</p>
                        </div>
                      </div>
                      
                      <Badge className={`mb-4 ${partner.color === "primary" ? "bg-primary/10 text-primary border-primary/20" : partner.color === "green" ? "bg-green-100 text-green-800 border-green-200" : "bg-orange-100 text-orange-800 border-orange-200"}`}>
                        {partner.type}
                      </Badge>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">{partner.description}</p>
                      
                      <h3 className="font-semibold text-foreground mb-3">Hardware Products</h3>
                      <ul className="space-y-2 mb-6">
                        {partner.contributions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${partner.color === "primary" ? "text-primary" : partner.color === "green" ? "text-green-500" : "text-orange-500"}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      
                      <a href={partner.website} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          Visit Website <ExternalLink className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </a>
                    </div>
                    
                    {/* Integration Details */}
                    <div className="bg-slate-50 rounded-lg p-6">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-primary" />
                        TrusteD-V Integration
                      </h3>
                      <ul className="space-y-3">
                        {partner.integration.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 p-3 bg-white rounded-md border border-border">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Partnership Benefits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">What hardware partners get when they integrate with TrusteD-V</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="bg-white hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Become a Hardware Partner</h2>
          <p className="text-primary-foreground/80 mb-8">
            If you are an Indian RISC-V hardware company, we'd love to integrate your boards into TrusteD-V.
          </p>
          <Link to="/partner-registration">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              Apply for Partnership <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Partners;
