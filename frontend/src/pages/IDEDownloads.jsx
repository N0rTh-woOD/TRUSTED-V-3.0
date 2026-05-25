import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, Cpu, Code,
  Bug, Sparkles, Brain,
  Settings, Eye, Download,
  MonitorSmartphone, SplitSquareHorizontal,
  FileSearch, Package, HardDrive, Loader2
} from "lucide-react";
import axios from "axios";
import PageHero from "@/components/PageHero";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const IDEDownloads = () => {
  const [ideBuilds, setIdeBuilds] = useState([]);
  const [loadingBuilds, setLoadingBuilds] = useState(true);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/ide-downloads`)
      .then(res => setIdeBuilds(res.data.filter(b => b.filename)))
      .catch(() => {})
      .finally(() => setLoadingBuilds(false));
  }, []);

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
    { title: "Hardware-Aware AI", desc: "HAL and register intelligence brought directly to your cursor." },
    { title: "Native Rust Core", desc: "Built-in Rust Analyzer and SVD visualization, zero plugin bloat." },
    { title: "Unified Workflow", desc: "Integrated debugger, auto-save, and checkpoints for a seamless chip-to-code journey." },
    { title: "Pure Performance", desc: "A streamlined, fast interface that respects your machine's resources." },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="ide-downloads-page">
      {/* Hero */}
      <PageHero
        eyebrow="Jarvyn IDE · Built from Scratch"
        title={<>The IDE built for <span className="text-[#003262]">hardware developers</span></>}
        subtitle="A hardware-focused development environment for RISC-V Rust projects. Built from the ground up to eliminate context switching between datasheets, editors, and toolchains."
      >
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-[0_30px_60px_-20px_rgba(2,6,23,0.25)] bg-[#1e1e2e]">
          <img src="/jarvyn-ide-screenshot.png" alt="Jarvyn IDE" className="w-full h-full object-cover object-top" data-testid="ide-hero-image" />
        </div>
      </PageHero>

      {/* Problem & Solution */}
      <section className="py-16 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 border-l-4 border-l-red-400 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                </div>
                <h3 className="text-[11px] font-bold text-red-700 uppercase tracking-[0.18em]">The Problem</h3>
              </div>
              <p className="text-[14px] text-slate-700 leading-relaxed">
                Generic editors and vendor-locked toolchains force embedded developers into a fragmented workflow of bloated plugins and endless datasheet context-switching.
              </p>
            </div>

            {/* Solution */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 border-l-4 border-l-[#003262] shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-full bg-[#003262]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#003262]" />
                </div>
                <h3 className="text-[11px] font-bold text-[#003262] uppercase tracking-[0.18em]">The Jarvyn Solution</h3>
              </div>
              <div className="space-y-2.5">
                {solutionPillars.map((p, i) => (
                  <div key={p.title} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-[#003262]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-[#003262]">{i + 1}</span>
                    </div>
                    <div className="text-[13px] leading-snug">
                      <span className="font-bold text-slate-900">{p.title}</span>
                      <span className="text-slate-600 ml-1.5">{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features (12 after merge) - Interactive hover */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Capabilities</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              12 purpose-built capabilities for hardware and embedded system development. Hover to explore.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} data-testid={`ide-feature-${index}`} className="relative bg-white border border-border rounded-xl p-5 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group cursor-pointer overflow-hidden h-[72px] hover:h-auto">
                  {/* Always visible: icon + title */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-tight">{feature.title}</h3>
                  </div>
                  {/* Revealed on hover */}
                  <div className="mt-3 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[200px] transition-all duration-300 ease-in-out overflow-hidden">
                    <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-3">{feature.description}</p>
                  </div>
                </div>
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

      {/* Download Section */}
      <section className="py-16 bg-slate-50 border-t border-border" data-testid="ide-download-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Get Started</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Download Jarvyn IDE</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose your platform and start building RISC-V embedded systems with Rust.
            </p>
          </div>
          
          {loadingBuilds ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : ideBuilds.length > 0 ? (
            <div className={`grid gap-5 max-w-3xl mx-auto ${ideBuilds.length === 1 ? 'grid-cols-1 max-w-xs' : ideBuilds.length === 2 ? 'sm:grid-cols-2 max-w-lg' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
              {ideBuilds.map((build) => (
                <div key={build.id} className="bg-white rounded-xl border border-border p-5 text-center hover:shadow-lg transition-shadow" data-testid={`ide-build-${build.id}`}>
                  <div className="text-3xl mb-2">
                    {build.platform?.toLowerCase().includes("windows") ? "🪟" : build.platform?.toLowerCase().includes("mac") ? "🍎" : "🐧"}
                  </div>
                  <h4 className="font-bold text-foreground text-sm">{build.platform}</h4>
                  {build.version && <p className="text-xs text-muted-foreground mt-1">v{build.version}</p>}
                  {build.size && build.size !== "Pending" && <p className="text-xs text-muted-foreground mb-3">{build.size}</p>}
                  <a href={`${BACKEND_URL}/api/ide-downloads/${build.id}/download`} download>
                    <Button size="sm" className="w-full mt-2" data-testid={`download-btn-${build.id}`}>
                      <Download className="w-4 h-4 mr-2" /> Download
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-border max-w-md mx-auto">
              <Download className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No builds available yet. Check back soon.</p>
            </div>
          )}
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
