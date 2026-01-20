import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Zap, Code, Package, Layers, Download, ArrowRight } from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Cpu,
      title: "AI-Powered Hardware Selection",
      description: "Describe your project requirements and get intelligent recommendations for RISC-V boards and peripherals",
    },
    {
      icon: Layers,
      title: "Middleware Recommendations",
      description: "Automatically select the best RTOS, BSP, and SDK for your specific hardware and application needs",
    },
    {
      icon: Code,
      title: "Project Template Generation",
      description: "Generate complete Rust project templates with drivers, bootloaders, and all necessary supporting files",
    },
    {
      icon: Package,
      title: "Version Management",
      description: "Track project versions as requirements evolve, with automatic detection of hardware and software changes",
    },
    {
      icon: Download,
      title: "Instant Downloads",
      description: "Download complete project packages and IDE binaries optimized for RISC-V Rust development",
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Continuous requirement analysis to keep your project aligned with best practices and optimal configurations",
    },
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1762279388956-1c098163a2a8?crop=entropy&cs=srgb&fm=jpg&q=85')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-sm border border-primary/30 bg-primary/10">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">RISC-V × Rust</span>
            </div>
            <h1 className="font-mono font-bold uppercase tracking-tight text-4xl sm:text-5xl lg:text-6xl text-foreground/90 mb-6">
              AI-Powered Embedded<br />Systems Platform
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Revolutionize your RISC-V development workflow. Describe your requirements, get intelligent hardware recommendations, 
              and generate production-ready Rust projects in minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/builder">
                <Button 
                  data-testid="start-building-btn"
                  className="rounded-sm font-mono uppercase tracking-wider text-xs h-12 px-8 shadow-[0_0_10px_rgba(183,65,14,0.3)] hover:shadow-[0_0_20px_rgba(183,65,14,0.5)] transition-all duration-300"
                >
                  Start Building <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/hardware">
                <Button 
                  data-testid="explore-hardware-btn"
                  variant="outline"
                  className="rounded-sm font-mono uppercase tracking-wider text-xs h-12 px-8 border border-border hover:bg-muted/50 hover:text-foreground transition-colors"
                >
                  Explore Hardware
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-24 bg-card/30">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-mono font-bold uppercase tracking-tight text-3xl md:text-4xl text-foreground/90 mb-4">
              Complete Development Ecosystem
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for RISC-V embedded systems development in one intelligent platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  data-testid={`feature-card-${index}`}
                  className="bg-card border border-border/50 rounded-sm hover:border-primary/50 transition-colors duration-300"
                >
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-mono font-bold uppercase tracking-tight text-sm text-foreground/90">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Hardware Showcase */}
      <section className="py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-mono font-bold uppercase tracking-tight text-3xl md:text-4xl text-foreground/90 mb-6">
                Curated RISC-V Hardware
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Access a comprehensive database of RISC-V development boards, from microcontrollers to high-performance SBCs. 
                Each board is fully documented with specifications, peripherals, and compatibility information.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span className="text-sm text-muted-foreground">SiFive, StarFive, Espressif, and more</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span className="text-sm text-muted-foreground">Detailed peripheral specifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span className="text-sm text-muted-foreground">Middleware compatibility matrix</span>
                </li>
              </ul>
              <Link to="/hardware">
                <Button 
                  data-testid="view-catalog-btn"
                  className="rounded-sm font-mono uppercase tracking-wider text-xs h-10 px-6 shadow-[0_0_10px_rgba(183,65,14,0.3)] hover:shadow-[0_0_20px_rgba(183,65,14,0.5)] transition-all duration-300"
                >
                  View Catalog
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-sm overflow-hidden border border-border/50">
              <img 
                src="https://images.unsplash.com/photo-1562408590-e32931084e23?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="RISC-V hardware"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-card/30">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-mono font-bold uppercase tracking-tight text-3xl md:text-4xl text-foreground/90 mb-6">
              Ready to Build?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Start your RISC-V project today with AI-powered guidance and intelligent automation.
            </p>
            <Link to="/chat">
              <Button 
                data-testid="get-started-cta-btn"
                className="rounded-sm font-mono uppercase tracking-wider text-xs h-12 px-8 shadow-[0_0_10px_rgba(183,65,14,0.3)] hover:shadow-[0_0_20px_rgba(183,65,14,0.5)] transition-all duration-300"
              >
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;