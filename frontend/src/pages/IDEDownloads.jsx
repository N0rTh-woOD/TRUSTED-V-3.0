import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, Cpu, Code,
  Bug, Sparkles, Brain,
  Settings, Eye,
  MonitorSmartphone, SplitSquareHorizontal,
  FileSearch, Package, HardDrive
} from "lucide-react";

const IDEDownloads = () => {

  const keyFeatures = [
    {
      icon: HardDrive,
      title: "Hardware-Focused Development Platform",
      description: "Built from the ground up, not a fork of any existing editor, to ensure peak performance and deep integration for semiconductor and embedded development. It streamlines hardware-level programming, register management, and peripheral integration in a way general-purpose IDEs cannot.",
    },
    {
      icon: Brain,
      title: "AI Trained on Hardware-Specific Knowledge",
      description: "AI trained on GPIO communication, UART interfaces, device registers, HAL packages, embedded crates, and peripheral modules. Access relevant hardware information directly within the IDE while coding.",
    },
    {
      icon: Code,
      title: "Native Rust Analyzer & Real-Time Diagnostics",
      description: "A natively integrated Rust core that provides high-performance, plugin-free code intelligence. By removing external dependencies, you get faster error detection, real-time syntax highlighting, and hardware-aware type checking for a seamless embedded development experience.",
    },
    {
      icon: Eye,
      title: "Hover-Based Insights",
      description: "View detailed information about variables, functions, and types by hovering. Access relevant documentation and contextual details without leaving the workspace.",
    },
    {
      icon: Sparkles,
      title: "Integrated AI Assistance Panel",
      description: "An integrated AI panel providing real-time debugging, code generation, and contextual insights directly within your workspace to eliminate context switching.",
    },
    {
      icon: Settings,
      title: "Unified Development Workspace",
      description: "Consolidate your entire workflow into a single environment. Integrated development controls including file management, terminal access, and build/run options provide a familiar yet powerful interface designed specifically to handle complex hardware development without context switching.",
    },
    {
      icon: SplitSquareHorizontal,
      title: "Split Editor for Multitasking",
      description: "A high-productivity split-view editor designed for simultaneous multitasking, enabling developers to reference datasheets or register maps side-by-side with active firmware code.",
    },
    {
      icon: Bug,
      title: "Integrated Debugging Support",
      description: "Set breakpoints, step through code execution, inspect variable values, and analyze program behavior in real time. Crucial for understanding code-device interaction in embedded systems.",
    },
    {
      icon: Package,
      title: "Intelligent Cargo & TOML Management",
      description: "Streamline your project configuration with real-time TOML validation and smart crate version suggestions. Instantly identify syntax errors or invalid dependency definitions in your Cargo.toml to reduce build failures and ensure a reliable firmware environment.",
    },
    {
      icon: Cpu,
      title: "Manual Hardware Selection + AI Config",
      description: "Select target hardware platform, peripherals, and middleware from a welcome interface. AI generates relevant project files, configurations, and code tailored to your hardware setup.",
    },
    {
      icon: FileSearch,
      title: "Checkpoints for Every Manual Save",
      description: "An automated snapshot system that creates a versioned checkpoint on every manual save, allowing developers to effortlessly track experiments and revert to stable states during iterative hardware debugging.",
    },
    {
      icon: MonitorSmartphone,
      title: "SVD Support for Hardware Visualization",
      description: "Structured visualization of hardware components: registers, peripherals, memory mappings. View device-level configuration within the IDE, reducing reliance on external datasheets.",
    },
  ];

  const comparisonData = [
    { aspect: "Development Focus", general: "Software, web, and application development workflows", ours: "Hardware and semiconductor development using Rust" },
    { aspect: "AI Assistance", general: "Generic coding suggestions without deep hardware awareness", ours: "AI trained on GPIO, UART, peripheral communication, embedded crates" },
    { aspect: "Rust Tooling", general: "Requires installing rust-analyzer plugin or extension", ours: "Built-in native Rust analyzer, no plugins needed" },
    { aspect: "Hardware Awareness", general: "Limited, relies on external datasheets and documentation", ours: "Designed with awareness of registers, peripherals, device-level interactions" },
    { aspect: "Documentation Access", general: "External docs, datasheets, and online resources needed", ours: "AI provides contextual hardware info directly inside the IDE" },
    { aspect: "Setup Complexity", general: "Multiple plugins, toolchains, and extensions required", ours: "Built-in tools simplify setup for hardware-focused Rust development" },
    { aspect: "Context Switching", general: "Frequent switching between IDE, docs, and datasheets", ours: "Integrated AI + hardware support, everything within the IDE" },
    { aspect: "Project Structure", general: "Optimized for software modules and application files", ours: "Handles hardware modules, crates, config files, device components" },
  ];

  const solutionPillars = [
    { title: "Hardware-Aware Intelligence", desc: "Integrated AI trained on HALs, registers, and protocols to bring documentation directly to your cursor." },
    { title: "Native Rust Core", desc: "No more plugin bloat. High-performance Rust Analyzer and SVD visualization out of the box." },
    { title: "Unified Workflow", desc: "From register-level programming to real-time diagnostics, every tool supports the journey from chip to code." },
    { title: "Built for Performance", desc: "A modern, streamlined interface that respects your machine's resources and your developer's intuition." },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="ide-downloads-page">
      {/* Hero */}
      <section className="relative bg-[#1a1d2e] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d2e] via-[#1e2235] to-[#252a3e]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-[#4a7dff]/10 text-[#6b9aff] border-[#4a7dff]/30 text-xs">Jarvyn Rust IDE</Badge>
                <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs">Built from Scratch</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                The IDE Built for
                <span className="block text-[#6b9aff]">Hardware Developers</span>
              </h1>
              
              <p className="text-base text-slate-400 leading-relaxed mb-6 max-w-xl">
                A high-performance IDE built from the ground up to bridge the gap between software and silicon, combining native Rust intelligence with hardware-aware AI and specialized debugging tools for the modern embedded developer.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {["Hardware-aware AI", "Native Rust Analyzer", "SVD visualization", "Checkpoint system", "Auto-save", "Integrated debugger"].map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 text-sm text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Problem / Solution Card */}
            <div className="bg-[#252a3e] rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">The Problem</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                General-purpose IDEs are built for high-level software, leaving hardware developers stranded between generic editors and clunky, vendor-locked toolchains. Today's embedded workflow is a struggle of fragmented plugins, constant context-switching for datasheets, and fragile environments that aren't optimized for the metal.
              </p>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">The Solution</h3>
              <p className="text-sm text-slate-300/80 mb-4">Jarvyn reclaims the hardware development experience by providing a ground-up environment designed specifically for the complexities of embedded Rust.</p>
              <div className="space-y-3">
                {solutionPillars.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div><span className="font-semibold text-white">{p.title}:</span> {p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features (12 after merge) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Capabilities</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              12 purpose-built capabilities for hardware and embedded system development, from hardware-aware AI to SVD visualization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} data-testid={`ide-feature-${index}`} className="bg-white border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 group h-full">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                        <Icon className="w-4.5 h-4.5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm leading-tight">{feature.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Comparison</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Jarvyn vs General IDEs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how a purpose-built hardware IDE differs from general-purpose code editors.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full text-sm border-collapse" data-testid="ide-comparison-table">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground w-[180px]">Aspect</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">General IDEs</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary">Jarvyn IDE</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-slate-50/50" : ""}`}>
                    <td className="py-3 px-4 font-medium text-foreground text-xs">{row.aspect}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{row.general}</td>
                    <td className="py-3 px-4 text-foreground text-xs font-medium">{row.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Conclusion / CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Purpose-Built for the Future of Embedded</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto text-base leading-relaxed">
            The increasing complexity of embedded systems and semiconductor development demands specialized tools beyond traditional software-focused IDEs. 
            Jarvyn combines hardware-focused tooling, built-in Rust analyzer, and AI assistance trained on hardware knowledge to streamline your workflow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-primary-foreground/70">
            {["Semiconductor Dev", "Embedded Systems", "RISC-V", "Peripheral Programming", "Chip Design"].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IDEDownloads;
