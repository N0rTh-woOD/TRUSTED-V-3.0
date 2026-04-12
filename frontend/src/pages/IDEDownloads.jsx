import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, Cpu, Code, Zap, ChevronRight,
  Bug, Layers, Rocket, Shield, Sparkles, Brain,
  FileCode, Settings, Eye, Save, Terminal as TerminalIcon,
  Cog, MonitorSmartphone, Wrench, Box, FileText
} from "lucide-react";

const IDEDownloads = () => {

  const coreFeatures = [
    {
      icon: Brain,
      title: "Hardware-Aware AI Engine",
      description: "Jarvyn AI is trained specifically on GPIO, UART, SPI, I2C, timers, registers, HAL, and embedded Rust crates. Not a generic LLM — a dedicated embedded intelligence.",
      highlights: ["Context-aware code generation", "Hardware config auto-detection", "Datasheet-informed suggestions"],
    },
    {
      icon: Code,
      title: "Built-in Rust Analyzer",
      description: "Native Rust Analyzer integration — not a plugin. Real-time type inference, error diagnostics, auto-completion, and macro expansion built directly into the editor core.",
      highlights: ["Zero-config setup", "Live error diagnostics", "Macro expansion support"],
    },
    {
      icon: Bug,
      title: "Integrated Debugging",
      description: "Full probe-rs and LLDB debugging with breakpoints, variable inspection, call stack, register view, and peripheral state visualization — all within the IDE.",
      highlights: ["probe-rs + LLDB support", "Register & peripheral view", "SWD/JTAG interfaces"],
    },
    {
      icon: Eye,
      title: "Hover-Based Hardware Insights",
      description: "Hover over any register name, HAL function, or peripheral reference to see real-time documentation, bit-field layouts, and configuration details from SVD files.",
      highlights: ["Register bit-field visualization", "SVD file integration", "Live documentation overlay"],
    },
    {
      icon: Sparkles,
      title: "AI Assistance Panel",
      description: "Dedicated side panel for Jarvyn AI — ask hardware questions, generate driver code, debug peripheral issues, and get architecture recommendations without leaving your editor.",
      highlights: ["Natural language queries", "Driver code generation", "Architecture guidance"],
    },
    {
      icon: Layers,
      title: "Smart Builder Engine",
      description: "Project scaffolding with pre-configured Cargo.toml, driver setup, and HAL integration. Supports bare-metal, FreeRTOS, Zephyr, and Embassy async frameworks.",
      highlights: ["Template-based scaffolding", "Auto Cargo.toml management", "Multi-framework support"],
    },
  ];

  const technicalCapabilities = [
    {
      icon: MonitorSmartphone,
      title: "SVD Support & Hardware Visualization",
      description: "Load System View Description files to visualize the entire peripheral map of your target MCU. See register addresses, bit fields, and access types at a glance.",
    },
    {
      icon: FileText,
      title: "TOML Validation & Crate Suggestions",
      description: "Real-time TOML validation for Cargo.toml with AI-powered crate version suggestions. Jarvyn recommends compatible embedded crates based on your target hardware.",
    },
    {
      icon: Settings,
      title: "Manual Hardware Selection + AI Config",
      description: "Choose your target board and MCU manually, then let Jarvyn AI auto-configure memory maps, linker scripts, and peripheral initialization code.",
    },
    {
      icon: Save,
      title: "Checkpoint System + Auto-Save",
      description: "Every manual save creates a named checkpoint for instant rollback. Auto-save triggers every 30 seconds. Never lose work, even during hardware debugging crashes.",
    },
    {
      icon: TerminalIcon,
      title: "Integrated Logs & Terminal",
      description: "Built-in serial monitor, UART logger, and system terminal. View real-time device output alongside your code with configurable baud rates and filters.",
    },
    {
      icon: Cpu,
      title: "RISC-V Native Toolchain",
      description: "First-class RISC-V support with pre-configured cross-compilation targets. Supports C-DAC VEGA, Mindgrove Secure IoT, and custom RISC-V boards out of the box.",
    },
  ];

  const architectureHighlights = [
    { label: "Built-from-scratch", detail: "Not a VS Code fork. Custom architecture optimized for embedded workflows." },
    { label: "Offline capable", detail: "Core features work without internet. AI assistance available offline with local models." },
    { label: "Minimal footprint", detail: "Designed for resource-constrained development machines. Under 500MB installed." },
    { label: "Plugin-free core", detail: "Rust Analyzer, debugger, and terminal are native — no plugin overhead." },
  ];

  const supportedBoards = [
    { name: "C-DAC VEGA Processors", desc: "THEJAS32 (RV32IM) and THEJAS64 (RV64GC)" },
    { name: "Mindgrove Secure IoT SoC", desc: "Custom RISC-V core with security extensions" },
    { name: "Upbeat Tech", desc: "RISC-V development platforms" },
    { name: "ESP32-C3 / C6", desc: "Espressif RISC-V WiFi/BLE SoCs" },
    { name: "Custom RISC-V targets", desc: "Any RV32/RV64 with SVD file support" },
  ];

  const whatsNew = [
    { version: "1.2.0", date: "Feb 2026", items: ["Jarvyn AI context-aware completions", "SVD hardware visualization", "Checkpoint rollback system", "TOML crate suggestions"] },
    { version: "1.1.0", date: "Dec 2025", items: ["Embassy async framework support", "RISC-V vector extension debugging", "Auto-save (30s interval)", "Integrated serial monitor"] },
    { version: "1.0.0", date: "Oct 2025", items: ["Initial release with Rust toolchain", "C-DAC VEGA board support", "Integrated probe-rs debugger", "Smart Builder engine"] },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="ide-downloads-page">
      {/* Hero */}
      <section className="relative bg-[#1a1d2e] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d2e] via-[#1e2235] to-[#252a3e]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#4a7dff]/20 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-[#4a7dff]" />
              </div>
              <Badge className="bg-[#4a7dff]/10 text-[#6b9aff] border-[#4a7dff]/30 text-xs">v1.2.0 — Latest</Badge>
              <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs">Built from Scratch</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
              TrusteD-V IDE
              <span className="block text-[#6b9aff] text-2xl md:text-3xl mt-2 font-medium">Jarvyn</span>
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
              The AI-native development environment for RISC-V embedded systems. 
              Built from scratch — not a VS Code fork. Hardware-aware AI, native Rust Analyzer, 
              integrated debugging, and one-click firmware deployment.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              {["Hardware-aware AI", "Native Rust Analyzer", "SVD visualization", "Checkpoint system", "Offline capable"].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Core Features</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Purpose-Built for Embedded Rust</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed for embedded development — from hardware-aware AI to integrated debugging and SVD visualization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} data-testid={`ide-feature-${index}`} className="bg-white border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 group h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-base">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{feature.description}</p>
                    <div className="mt-auto space-y-1">
                      {feature.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-primary/80">
                          <ChevronRight className="w-3 h-3 flex-shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Architecture</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Built Different</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {architectureHighlights.map((item, i) => (
              <div key={i} className="p-5 rounded-lg bg-slate-50 border border-slate-200 hover:border-primary/30 transition-colors">
                <h4 className="font-bold text-sm text-foreground mb-1">{item.label}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="py-20 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Capabilities</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Deep Technical Integration</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalCapabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="flex gap-4 p-5 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-1">{cap.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported Boards */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Hardware Support</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Supported RISC-V Boards</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {supportedBoards.map((board, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 bg-slate-50">
                <Cpu className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{board.name}</h4>
                  <p className="text-xs text-muted-foreground">{board.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's New */}
      <section className="py-20 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Changelog</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">What's New</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {whatsNew.map((release, i) => (
              <Card key={i} className={`bg-white ${i === 0 ? "border-primary/30 shadow-md" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={i === 0 ? "bg-primary text-white" : "bg-slate-100 text-slate-700"}>v{release.version}</Badge>
                    <span className="text-sm text-muted-foreground">{release.date}</span>
                    {i === 0 && <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Latest</Badge>}
                  </div>
                  <ul className="space-y-2">
                    {release.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IDEDownloads;
