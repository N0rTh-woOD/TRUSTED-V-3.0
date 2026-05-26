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
        title={<>TRUSTED-V <span className="text-[#003262]">WebIDE</span></>}
        subtitle="A full-featured browser-based development environment for RISC-V Rust projects. Compile, debug, and collaborate from anywhere with no local setup required."
      >
        <div className="flex flex-col gap-3">
          <Link to="/product-suite" className="inline-flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-[#003262] transition-colors w-fit">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
          </Link>
          {/* Code Window (moved from Home hero) */}
          <div className="relative rounded-2xl bg-[#0b1020] border border-slate-200 shadow-[0_30px_60px_-20px_rgba(2,6,23,0.35)] overflow-hidden ring-1 ring-slate-900/5">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f1530] border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-[11px] font-mono text-slate-400">main.rs &mdash; WebIDE</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Live</span>
              </div>
            </div>
            {/* Code body */}
            <pre className="text-[12.5px] leading-[1.7] font-mono p-5 overflow-hidden text-slate-200 select-none">
<span className="text-slate-500">{`// Boot RISC-V securely from ROM`}</span>{"\n"}
<span className="text-[#c792ea]">use</span> <span className="text-[#82aaff]">trustedv</span>::{`{`}<span className="text-[#ffcb6b]">rboot</span>, <span className="text-[#ffcb6b]">rtos</span>, <span className="text-[#ffcb6b]">crypto</span>{`}`};{"\n\n"}
<span className="text-[#c792ea]">#[</span><span className="text-[#82aaff]">no_std</span><span className="text-[#c792ea]">]</span>{"\n"}
<span className="text-[#c792ea]">#[</span><span className="text-[#82aaff]">entry</span><span className="text-[#c792ea]">]</span>{"\n"}
<span className="text-[#c792ea]">fn</span> <span className="text-[#82aaff]">main</span>() {"->"} ! {`{`}{"\n"}
{"  "}<span className="text-slate-500">{`// Immutable root of trust`}</span>{"\n"}
{"  "}<span className="text-[#c792ea]">let</span> chain = <span className="text-[#ffcb6b]">rboot</span>::<span className="text-[#82aaff]">verify_chain</span>()?;{"\n"}
{"  "}<span className="text-[#ffcb6b]">crypto</span>::<span className="text-[#82aaff]">attest</span>(&amp;chain, <span className="text-[#c3e88d]">"PSA-L3"</span>);{"\n\n"}
{"  "}<span className="text-slate-500">{`// Hand off to hardened RTOS`}</span>{"\n"}
{"  "}<span className="text-[#ffcb6b]">rtos</span>::<span className="text-[#82aaff]">launch</span>(<span className="text-[#82aaff]">App</span>::<span className="text-[#82aaff]">new</span>())<span className="text-[#89ddff]">.</span><span className="text-[#82aaff]">run</span>(){"\n"}
{`}`}
            </pre>
            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#0f1530] border-t border-white/5 text-[11px] font-mono">
              <div className="flex items-center gap-3 text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#6B9AFF]" />RISC-V RV64GC</span>
                <span className="text-slate-600">&middot;</span>
                <span>cargo build --release</span>
              </div>
              <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />verified</span>
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
            The TRUSTED-V WebIDE is currently in early access. Contact sales for cloud workspace provisioning.
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
