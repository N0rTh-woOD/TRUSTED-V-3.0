import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, Cpu, Code,
  Bug, Sparkles, Brain,
  FileCode, Settings, Eye, Save, Terminal as TerminalIcon,
  MonitorSmartphone, Wrench, FileText,
  GitBranch, FolderTree, Play, SplitSquareHorizontal,
  FileSearch, AlertTriangle, Package, HardDrive
} from "lucide-react";

const IDEDownloads = () => {

  const keyFeatures = [
    {
      icon: HardDrive,
      title: "Hardware-Focused Development Platform",
      description: "Built for semiconductor, embedded system, and hardware developers. Supports workflows with chips, peripheral devices, registers, and hardware-level programming, far more efficient than general-purpose IDEs.",
    },
    {
      icon: Brain,
      title: "AI Trained on Hardware-Specific Knowledge",
      description: "AI trained on GPIO communication, UART interfaces, device registers, HAL packages, embedded crates, and peripheral modules. Access relevant hardware information directly within the IDE while coding.",
    },
    {
      icon: Code,
      title: "Built-in Rust Analyzer (Native Integration)",
      description: "Rust analyzer integrated directly into the IDE core, no external plugins needed. Real-time code analysis, intelligent auto-completion, faster error detection, and consistent Rust development support.",
    },
    {
      icon: Eye,
      title: "Hover-Based Insights",
      description: "View detailed information about variables, functions, and types by hovering. Access relevant documentation and contextual details without leaving the workspace.",
    },
    {
      icon: Sparkles,
      title: "Integrated AI Assistance Panel",
      description: "Interact with an intelligent AI system directly while coding, ask questions, receive debugging support, generate code, create files, and get contextual documentation insights without context switching.",
    },
    {
      icon: Wrench,
      title: "Built-from-Scratch Architecture",
      description: "Developed from the ground up for better performance optimization, tighter feature integration, improved flexibility, and a cleaner user experience. Not a fork of any existing editor.",
    },
    {
      icon: FolderTree,
      title: "Structured Project File Explorer",
      description: "Navigation designed for hardware and embedded development involving multiple modules, crates, configuration files, and device-related components.",
    },
    {
      icon: Settings,
      title: "Integrated Development Controls",
      description: "File management, search and replacement, run/build options, and terminal integration, a familiar workflow supporting advanced hardware development within a single environment.",
    },
    {
      icon: SplitSquareHorizontal,
      title: "Split Editor for Multitasking",
      description: "Split editor views allow developers to work on multiple files simultaneously, essential when referencing datasheets alongside firmware code.",
    },
    {
      icon: GitBranch,
      title: "Integrated Git Version Control",
      description: "Built-in Git support for committing changes, tracking file modifications, and managing repositories, no reliance on external tools, smoother workflow for collaborative projects.",
    },
    {
      icon: Save,
      title: "Auto-Save (Every 30 Seconds)",
      description: "Automatically saves changes at regular intervals, preventing loss of work due to unexpected interruptions. Focus on coding without manual saving.",
    },
    {
      icon: Bug,
      title: "Integrated Debugging Support",
      description: "Set breakpoints, step through code execution, inspect variable values, and analyze program behavior in real time. Crucial for understanding code-device interaction in embedded systems.",
    },
    {
      icon: Play,
      title: "Build and Run Support",
      description: "Compile and execute programs directly within the IDE. Essential for rapid testing and iteration to verify device behavior and program correctness without external tools.",
    },
    {
      icon: TerminalIcon,
      title: "Integrated Terminal",
      description: "Execute build commands, scripts, version control operations, and interact with development tools directly within the IDE, reduces context switching for hardware workflows.",
    },
    {
      icon: AlertTriangle,
      title: "Real-Time Diagnostics & Error Detection",
      description: "Identify errors, warnings, and potential issues while writing code. Highlights syntax errors, type mismatches, unused variables, with suggestions for resolving issues.",
    },
    {
      icon: Package,
      title: "Crate Version Suggestions in Cargo.toml",
      description: "Intelligent suggestions for selecting crate versions. Recommends latest stable versions for dependencies, ensuring compatibility and simplifying dependency management.",
    },
    {
      icon: FileText,
      title: "TOML Validation Support",
      description: "Validates TOML files in real time, identifies syntax errors, invalid configurations, and incorrect dependency definitions. Reduces build failures and improves reliability.",
    },
    {
      icon: Cpu,
      title: "Manual Hardware Selection + AI Config",
      description: "Select target hardware platform, peripherals, and middleware from a welcome interface. AI generates relevant project files, configurations, and code tailored to your hardware setup.",
    },
    {
      icon: FileSearch,
      title: "Checkpoints for Every Manual Save",
      description: "Every manual save creates a snapshot of the current code state. Track changes over time and revert to previous versions, useful during experimentation, debugging, and iterative development.",
    },
    {
      icon: FileCode,
      title: "Integrated Logs System",
      description: "Records build outputs, runtime messages, errors, and debugging information. Track application behavior, identify issues, and analyze system performance in one place.",
    },
    {
      icon: MonitorSmartphone,
      title: "SVD Support for Hardware Visualization",
      description: "Structured visualization of hardware components, registers, peripherals, memory mappings. View device-level configuration within the IDE, reducing reliance on external datasheets.",
    },
  ];

  const comparisonData = [
    { aspect: "Development Focus", general: "Software, web, and application development workflows", ours: "Hardware and semiconductor development using Rust" },
    { aspect: "AI Assistance", general: "Generic coding suggestions without deep hardware awareness", ours: "AI trained on GPIO, UART, peripheral communication, embedded crates" },
    { aspect: "Rust Tooling", general: "Requires installing rust-analyzer plugin/extension", ours: "Built-in native Rust analyzer, no plugins needed" },
    { aspect: "Hardware Awareness", general: "Limited. Relies on external datasheets and documentation", ours: "Designed with awareness of registers, peripherals, device-level interactions" },
    { aspect: "Documentation Access", general: "External docs, datasheets, and online resources needed", ours: "AI provides contextual hardware info directly inside the IDE" },
    { aspect: "Setup Complexity", general: "Multiple plugins, toolchains, and extensions required", ours: "Built-in tools simplify setup for hardware-focused Rust development" },
    { aspect: "Context Switching", general: "Frequent switching between IDE, docs, and datasheets", ours: "Integrated AI + hardware support, everything within the IDE" },
    { aspect: "Project Structure", general: "Optimized for software modules and application files", ours: "Handles hardware modules, crates, config files, device components" },
  ];

  const motivations = [
    "Providing a specialized environment for hardware-focused Rust development",
    "Reducing dependency on external documentation and plugins",
    "Improving developer productivity through integrated AI assistance",
    "Supporting device-level programming for chips, peripherals, and embedded systems",
    "Delivering a modern, streamlined experience with a clean interface",
  ];

  const benefits = [
    "Faster hardware-focused Rust development workflow",
    "Reduced need to search external documentation",
    "Seamless AI-assisted coding and debugging support",
    "No dependency on plugin installation for core Rust tooling",
    "Improved productivity through a specialized development environment",
    "Optimized platform for embedded and semiconductor development",
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
                Modern code editors like Zed and Lapce offer high performance for general programming, but aren't designed for hardware-focused development. 
                Jarvyn extends beyond with specialized tooling, AI assistance trained on hardware knowledge, and integrated Rust support tailored for embedded systems.
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
            
            {/* Problem Statement Card */}
            <div className="bg-[#252a3e] rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">The Problem</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  General-purpose IDEs are optimized for software development, not hardware
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  Hardware-specific tools are limited to specific ecosystems
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  Developers rely on external docs, plugins, and fragmented workflows
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Our Solution</h3>
              <div className="space-y-3">
                {motivations.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All 21 Key Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Capabilities</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              21 purpose-built features for hardware and embedded system development, from AI-powered code generation to SVD hardware visualization.
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
              See how a purpose-built hardware IDE differs from VS Code, IntelliJ, Zed, and Lapce.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full text-sm border-collapse" data-testid="ide-comparison-table">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground w-[180px]">Aspect</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">General IDEs <span className="text-xs font-normal">(VS Code, Zed, Lapce)</span></th>
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

      {/* Benefits */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Jarvyn</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Benefits</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground font-medium">{b}</p>
              </div>
            ))}
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
