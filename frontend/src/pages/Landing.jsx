import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Zap, Code, Package, Layers, Download, ArrowRight, CheckCircle2 } from "lucide-react";

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

  const benefits = [
    "Supported RISC-V cores from leading manufacturers",
    "Comprehensive middleware compatibility matrix",
    "Production-ready Rust project templates",
    "Dedicated development IDE with debugger support",
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">RISC-V × Rust Development</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6 leading-tight">
                AI-Powered Embedded Systems Platform
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Revolutionize your RISC-V development workflow. Describe your requirements, get intelligent hardware recommendations, 
                and generate production-ready Rust projects in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/builder">
                  <Button 
                    data-testid="start-building-btn"
                    size="lg"
                    className="h-12 px-8 text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    Start Building
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/hardware">
                  <Button 
                    data-testid="explore-hardware-btn"
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-base font-medium"
                  >
                    Explore Hardware
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl opacity-30" />
              <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1562408590-e32931084e23?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                  alt="RISC-V hardware"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">RISC-V Development Boards</p>
                      <p className="text-muted-foreground text-xs">Curated hardware catalog</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Development Ecosystem
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                  className="bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-xl overflow-hidden border border-border shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                  alt="Circuit board"
                  className="w-full h-[350px] object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Curated RISC-V Hardware
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Access a comprehensive database of RISC-V development boards, from microcontrollers to high-performance SBCs. 
                Each board is fully documented with specifications, peripherals, and compatibility information.
              </p>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/hardware">
                <Button 
                  data-testid="view-catalog-btn"
                  className="h-11 px-6"
                >
                  View Catalog
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Build?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg leading-relaxed">
              Start your RISC-V project today with AI-powered guidance and interactive configuration.
            </p>
            <Link to="/builder">
              <Button 
                data-testid="get-started-cta-btn"
                variant="secondary"
                size="lg"
                className="h-12 px-8 text-base font-medium bg-white text-primary hover:bg-white/90"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Cpu className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">RV-RUST</span>
            </div>
            <p className="text-sm text-muted-foreground">
              RISC-V Embedded Development Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
