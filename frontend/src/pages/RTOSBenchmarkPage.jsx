import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, ArrowRight, ArrowLeft, CheckCircle2, 
  Gauge, Shield, Zap, Code
} from "lucide-react";

const RTOSBenchmarkPage = () => {
  const benchmarks = [
    { name: "Task Creation", min: "319", avg: "2,643", vsFreeRTOS: "12x faster", status: "Excellent" },
    { name: "Context Switch", min: "~260", avg: "~520", vsFreeRTOS: "9x faster", status: "Excellent" },
    { name: "Mutex Lock (uncontended)", min: "593", avg: "1,335", vsFreeRTOS: "Similar", status: "Good" },
    { name: "Mutex Unlock (uncontended)", min: "532", avg: "906", vsFreeRTOS: "Similar", status: "Good" },
    { name: "Semaphore Signal", min: "540", avg: "925", vsFreeRTOS: "Similar", status: "Good" },
    { name: "Queue Send", min: "591", avg: "1,171", vsFreeRTOS: "Similar", status: "Good" },
    { name: "Mutex Lock (contended)", min: "1,101", avg: "4,979", vsFreeRTOS: "4x slower", status: "Acceptable" },
    { name: "Semaphore Signal (contended)", min: "1,318", avg: "4,959", vsFreeRTOS: "5x slower", status: "Acceptable" },
  ];

  const rtosOptions = [
    { name: "TrusteD-V RTOS", desc: "Custom Rust RTOS built for RISC-V with memory-safe concurrency and 9x faster context switching.", features: ["9x faster context switch", "12x faster task creation", "100% memory safe (Rust)", "Compile-time GPIO verification", "Sub-ms real-time response"] },
    { name: "FreeRTOS", desc: "Industry-standard RTOS with broad ecosystem support. Supported via C FFI bindings in TrusteD-V.", features: ["Broad ecosystem", "Legacy project support", "C FFI bindings", "Pre-configured for RISC-V"] },
    { name: "Zephyr RTOS", desc: "Linux Foundation-backed RTOS with built-in networking and security features.", features: ["Built-in networking", "Bluetooth & WiFi", "Security subsystem", "RISC-V support"] },
    { name: "Embassy", desc: "Async Rust framework for embedded. No RTOS needed — cooperative multitasking at compile time.", features: ["Async/await native", "Zero-overhead concurrency", "No scheduler overhead", "Timer-based task execution"] },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="rtos-benchmark-page">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-blue-50/50 to-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/product-suite" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Layers className="w-7 h-7 text-blue-600" />
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">Middleware</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            RTOS Integration & Benchmarks
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Pre-integrated support for TrusteD-V RTOS, FreeRTOS, Zephyr, and Embassy. See real benchmarks 
            comparing TrusteD-V RTOS against FreeRTOS on equivalent RISC-V hardware.
          </p>
        </div>
      </section>

      {/* RTOS Options */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Supported RTOS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {rtosOptions.map((rtos, i) => (
              <Card key={i} className={`border-border ${i === 0 ? 'border-blue-200 bg-blue-50/30' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-bold text-lg text-foreground">{rtos.name}</h3>
                    {i === 0 && <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-[10px]">Recommended</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{rtos.desc}</p>
                  <ul className="space-y-2">
                    {rtos.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${i === 0 ? 'text-blue-500' : 'text-green-500'}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benchmark Table */}
      <section className="py-16 bg-slate-900 text-white" data-testid="rtos-benchmark-section">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Performance</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-3">
              TrusteD-V RTOS <span className="text-slate-400 font-normal">vs FreeRTOS</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              All measurements in CPU cycles on equivalent RISC-V hardware. Lower is better. 
              TrusteD-V RTOS trades marginal IPC overhead for complete memory safety via Rust.
            </p>
          </div>
          
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="benchmark-table">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-4 text-slate-400 font-semibold">Benchmark</th>
                    <th className="text-right p-4 text-slate-400 font-semibold">Min (cycles)</th>
                    <th className="text-right p-4 text-slate-400 font-semibold">Avg (cycles)</th>
                    <th className="text-right p-4 text-slate-400 font-semibold">vs FreeRTOS</th>
                    <th className="text-right p-4 text-slate-400 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarks.map((b, i) => (
                    <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-750">
                      <td className="p-4 text-white font-medium">{b.name}</td>
                      <td className="p-4 text-right text-slate-300 font-mono text-xs">{b.min}</td>
                      <td className="p-4 text-right text-slate-300 font-mono text-xs">{b.avg}</td>
                      <td className="p-4 text-right">
                        <span className={`text-xs font-bold ${
                          b.vsFreeRTOS.includes('faster') ? 'text-green-400' : 
                          b.vsFreeRTOS === 'Similar' ? 'text-blue-400' : 'text-amber-400'
                        }`}>
                          {b.vsFreeRTOS}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          b.status === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                          b.status === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Key Takeaways */}
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
              <div className="text-2xl font-bold text-green-400 mb-1">9x</div>
              <div className="text-sm text-white font-semibold">Faster Context Switch</div>
              <div className="text-xs text-slate-400 mt-1">520 vs 4,620 cycles (FreeRTOS)</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
              <div className="text-2xl font-bold text-green-400 mb-1">12x</div>
              <div className="text-sm text-white font-semibold">Faster Task Creation</div>
              <div className="text-xs text-slate-400 mt-1">2,643 vs 33,000 cycles (FreeRTOS)</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
              <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
              <div className="text-sm text-white font-semibold">Memory Safe</div>
              <div className="text-xs text-slate-400 mt-1">Rust eliminates entire classes of bugs</div>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 mt-6 text-center">
            Verdict: TrusteD-V RTOS delivers fast context switching (9x), memory safety (Rust), and sub-ms real-time response. 
            Contended IPC is 4-5x slower than FreeRTOS — an acceptable trade-off for safety-critical applications.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-blue-600">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Get Started with TrusteD-V RTOS</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact-sales?plan=pro">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-white/90 font-semibold">
                Talk to Sales <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/developer-portal">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RTOSBenchmarkPage;
