import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe, ArrowLeft, CheckCircle2, ArrowRight,
  Terminal, GitBranch, Users, Cloud, Code, Cpu, Lock
} from "lucide-react";
import PageHero from "@/components/PageHero";

const WebIDEPage = () => {
  const features = [
    { icon: Cloud, title: "Cloud-Based Compilation", desc: "Compile Rust for RISC-V targets directly in the browser. No local toolchain setup required." },
    { icon: Terminal, title: "Integrated Terminal", desc: "Full terminal access for build commands, flashing, and device interaction from your browser." },
    { icon: Code, title: "Rust Analyzer Built-in", desc: "Code intelligence, autocomplete, and error detection powered by native Rust analyzer." },
    { icon: Users, title: "Real-Time Collaboration", desc: "Pair program with team members on the same project simultaneously with live cursors." },
    { icon: GitBranch, title: "Git Integration", desc: "Clone, commit, push, and manage branches directly within the WebIDE workspace." },
    { icon: Cpu, title: "Hardware Target Selection", desc: "Select your RISC-V board and the WebIDE configures the build environment automatically." },
    { icon: Lock, title: "Secure Workspace", desc: "Isolated containers per session. Your code and credentials never leave the secure environment." },
    { icon: Globe, title: "Access Anywhere", desc: "Work from any device with a browser. Your projects sync across sessions automatically." },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="webide-page">
      {/* Hero */}
      <PageHero
        eyebrow="WebIDE · Cloud-Native"
        title={<>TrusteD-V <span className="text-[#003262]">WebIDE</span></>}
        subtitle="A full-featured browser-based development environment for RISC-V Rust projects. Compile, debug, and collaborate from anywhere with no local setup required."
      >
        <div className="flex flex-col gap-3">
          <Link to="/product-suite" className="inline-flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-[#003262] transition-colors w-fit">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
          </Link>
          {/* Browser mockup */}
          <div className="bg-[#0b1020] rounded-xl border border-slate-200 overflow-hidden shadow-[0_30px_60px_-20px_rgba(2,6,23,0.35)] ring-1 ring-slate-900/5">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0f1530] border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[11px] text-slate-400 font-mono">webide.trusted-v.com</span>
            </div>
            <div className="p-4 font-mono text-[11px] leading-relaxed">
              <div className="text-slate-500">// main.rs</div>
              <div><span className="text-[#ff7b72]">#![</span><span className="text-[#d2a8ff]">no_std</span><span className="text-[#ff7b72]">]</span></div>
              <div><span className="text-[#ff7b72]">#![</span><span className="text-[#d2a8ff]">no_main</span><span className="text-[#ff7b72]">]</span></div>
              <div className="text-slate-600 mt-2">// Cloud-compiled for RISC-V</div>
              <div><span className="text-[#ff7b72]">use</span> <span className="text-[#c9d1d9]">riscv_rt::</span><span className="text-[#d2a8ff]">entry</span><span className="text-[#c9d1d9]">;</span></div>
              <div className="mt-2"><span className="text-[#ff7b72]">#[</span><span className="text-[#d2a8ff]">entry</span><span className="text-[#ff7b72]">]</span></div>
              <div><span className="text-[#ff7b72]">fn</span> <span className="text-[#79c0ff]">main</span><span className="text-[#c9d1d9]">() -&gt; ! {"{"}</span></div>
              <div className="text-slate-500">{"    "}// Your firmware here</div>
              <div><span className="text-[#c9d1d9]">{"    "}</span><span className="text-[#ff7b72]">loop</span> <span className="text-[#c9d1d9]">{"{}"}</span></div>
              <div className="text-[#c9d1d9]">{"}"}</div>
              <div className="mt-3 border-t border-white/10 pt-2">
                <span className="text-[#28c840]">$</span> <span className="text-slate-400">cargo build --target riscv32imac</span>
                <div className="text-[#28c840] mt-1">Compiling firmware v0.1.0 ... Done &#10003;</div>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Capabilities</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Everything in Your Browser</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No installations, no toolchain headaches. The full RISC-V Rust development experience, accessible from any device.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Card key={i} data-testid={`webide-feature-${i}`} className="border-border hover:shadow-md transition-shadow group">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3 group-hover:bg-cyan-500 transition-colors">
                      <Icon className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1.5 text-sm">{feat.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Start Building in the Cloud</h3>
          <p className="text-cyan-100 mb-6 max-w-xl mx-auto text-sm">
            The TrusteD-V WebIDE is currently in early access. Contact sales for cloud workspace provisioning.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact-sales?plan=pro">
              <Button size="lg" className="bg-white text-cyan-700 hover:bg-white/90 font-semibold" data-testid="webide-cta-sales">
                Request Access <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/download-ide">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold" data-testid="webide-cta-desktop">
                Desktop IDE Instead
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebIDEPage;
