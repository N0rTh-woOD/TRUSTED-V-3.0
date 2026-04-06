import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cpu, Zap, Code, Package, Layers, Download, ArrowRight, 
  CheckCircle2, Shield, Lock, Gauge, ChevronRight,
  Cog, Binary, GitBranch, Rocket, Wrench, CircuitBoard,
  Radio, FlaskConical, Flame, BarChart3, Server
} from "lucide-react";
import TrustedVLogo from "@/components/TrustedVLogo";

const AnimatedCounter = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 40;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-bold text-primary">{count}{suffix}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

const RevealItem = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ── TrusteD-V Engine Architecture — Full SVG Visualization ── */
const engineCSS = `
@keyframes eng-rise { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
@keyframes eng-bob1 { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-5px) } }
@keyframes eng-bob2 { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-6px) } }
@keyframes eng-bob3 { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-7px) } }
@keyframes eng-bob4 { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
@keyframes eng-bob5 { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-9px) } }
@keyframes eng-fo { 0%,100%{transform:scaleY(1)scaleX(1)} 33%{transform:scaleY(1.1)scaleX(.91)} 66%{transform:scaleY(.9)scaleX(1.07)} }
@keyframes eng-fm { 0%,100%{transform:scaleY(1)scaleX(1)} 40%{transform:scaleY(1.17)scaleX(.87)} 80%{transform:scaleY(.88)scaleX(1.09)} }
@keyframes eng-fc { 0%,100%{transform:scaleY(1)scaleX(1)} 50%{transform:scaleY(1.24)scaleX(.83)} }
@keyframes eng-gp { 0%,100%{opacity:.4} 50%{opacity:.75} }
@keyframes eng-spark { 0%{opacity:1;transform:translate(0,0)scale(1)} 100%{opacity:0;transform:translate(var(--sx),var(--sy))scale(0)} }
@keyframes eng-sm { 0%{opacity:.25;transform:translateY(0)scale(1)} 100%{opacity:0;transform:translateY(-90px)scale(2.4)} }
`;

const EngineArchDiagram = () => {
  useEffect(() => {
    if (!document.getElementById('engine-anim-css')) {
      const style = document.createElement('style');
      style.id = 'engine-anim-css';
      style.textContent = engineCSS;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="relative" data-testid="engine-arch-diagram">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden" style={{ padding: '28px 16px 20px' }}>
        {/* Title */}
        <div className="text-center mb-5">
          <h3 className="text-lg font-extrabold tracking-tight" style={{ letterSpacing: '-0.5px' }}>
            <span style={{ color: '#111' }}>T</span>
            <span style={{ color: '#B7410E' }}>rust</span>
            <span style={{ color: '#111' }}>eD</span>
            <span style={{ color: '#C8A200' }}>-V</span>
            <span style={{ color: '#2E7D32' }}> Engine</span>
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1 tracking-wide">Silicon-to-Application Platform — AI Agents + Hardware</p>
        </div>

        {/* Engine Stack + Brackets */}
        <div className="relative mx-auto" style={{ maxWidth: 440 }}>
          <div className="flex">
            {/* Left callouts + Stack */}
            <div className="flex-1">
              {/* Layer 5: APPLICATION API */}
              <div style={{ animation: 'eng-rise .5s ease both .48s, eng-bob5 3.6s ease-in-out infinite 2.4s' }}>
                <svg width="100%" viewBox="0 0 340 84" overflow="visible" className="block">
                  <polygon points="30,10 310,10 340,30 340,60 310,84 30,84 0,60 0,30" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.4"/>
                  <polygon points="0,60 30,84 310,84 340,60 340,74 310,84 30,84 0,74" fill="#2E7CC8" stroke="#185FA5" strokeWidth="1.4"/>
                  <polygon points="0,30 0,60 30,84 30,52" fill="#5EA4E8" stroke="#185FA5" strokeWidth="1.4"/>
                  {/* API boxes */}
                  <rect x="55" y="28" width="52" height="28" rx="4" fill="#185FA5" stroke="#0C447C" strokeWidth=".8"/>
                  <text x="81" y="46" fontSize="8" fill="#E6F1FB" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">REST</text>
                  <rect x="117" y="28" width="52" height="28" rx="4" fill="#185FA5" stroke="#0C447C" strokeWidth=".8"/>
                  <text x="143" y="46" fontSize="8" fill="#E6F1FB" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">SDK</text>
                  <rect x="179" y="28" width="52" height="28" rx="4" fill="#185FA5" stroke="#0C447C" strokeWidth=".8"/>
                  <text x="205" y="46" fontSize="8" fill="#E6F1FB" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">MQTT</text>
                  <rect x="241" y="28" width="52" height="28" rx="4" fill="#185FA5" stroke="#0C447C" strokeWidth=".8"/>
                  <text x="267" y="46" fontSize="8" fill="#E6F1FB" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">OTA</text>
                  <text x="170" y="76" fontSize="10" fill="#ffffff" stroke="#042C53" strokeWidth="3" paintOrder="stroke" fontFamily="'Helvetica Neue',sans-serif" fontWeight="800" textAnchor="middle" letterSpacing=".5">APPLICATION API</text>
                </svg>
              </div>
              {/* connector */}
              <div className="flex justify-center items-center gap-2 py-0.5">
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
              </div>

              {/* Layer 4: MIDDLEWARE */}
              <div style={{ animation: 'eng-rise .5s ease both .36s, eng-bob4 4s ease-in-out infinite 2.1s' }}>
                <svg width="100%" viewBox="0 0 340 82" overflow="visible" className="block">
                  <polygon points="30,8 310,8 340,28 340,56 310,82 30,82 0,56 0,28" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1.4"/>
                  <polygon points="0,56 30,82 310,82 340,56 340,68 310,82 30,82 0,68" fill="#7F77DD" stroke="#534AB7" strokeWidth="1.4"/>
                  <polygon points="0,28 0,56 30,82 30,50" fill="#AFA9EC" stroke="#534AB7" strokeWidth="1.4"/>
                  <rect x="42" y="24" width="56" height="24" rx="3" fill="#7F77DD" stroke="#534AB7" strokeWidth=".6"/>
                  <text x="70" y="40" fontSize="8" fill="#EEEDFE" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">RTOS</text>
                  <rect x="107" y="24" width="50" height="24" rx="3" fill="#7F77DD" stroke="#534AB7" strokeWidth=".6"/>
                  <text x="132" y="40" fontSize="8" fill="#EEEDFE" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">HAL</text>
                  <rect x="166" y="24" width="56" height="24" rx="3" fill="#7F77DD" stroke="#534AB7" strokeWidth=".6"/>
                  <text x="194" y="40" fontSize="8" fill="#EEEDFE" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">Drivers</text>
                  <rect x="231" y="24" width="62" height="24" rx="3" fill="#7F77DD" stroke="#534AB7" strokeWidth=".6"/>
                  <text x="262" y="40" fontSize="8" fill="#EEEDFE" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">Protocols</text>
                  {/* Sub labels */}
                  <rect x="50" y="54" width="44" height="14" rx="2" fill="#534AB7" stroke="#3C3489" strokeWidth=".5"/>
                  <text x="72" y="64" fontSize="7" fill="#CECBF6" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">Power Mgmt</text>
                  <rect x="104" y="54" width="52" height="14" rx="2" fill="#534AB7" stroke="#3C3489" strokeWidth=".5"/>
                  <text x="130" y="64" fontSize="7" fill="#CECBF6" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">Network Stack</text>
                  <rect x="166" y="54" width="48" height="14" rx="2" fill="#534AB7" stroke="#3C3489" strokeWidth=".5"/>
                  <text x="190" y="64" fontSize="7" fill="#CECBF6" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">Bootloader</text>
                  <text x="170" y="78" fontSize="10" fill="#ffffff" stroke="#26215C" strokeWidth="3" paintOrder="stroke" fontFamily="'Helvetica Neue',sans-serif" fontWeight="800" textAnchor="middle" letterSpacing=".5">MIDDLEWARE</text>
                </svg>
              </div>
              <div className="flex justify-center items-center gap-2 py-0.5">
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
              </div>

              {/* Layer 3: SoC / MODULE */}
              <div style={{ animation: 'eng-rise .5s ease both .24s, eng-bob3 4s ease-in-out infinite 1.8s' }}>
                <svg width="100%" viewBox="0 0 340 100" overflow="visible" className="block">
                  <polygon points="30,8 310,8 340,32 340,66 310,100 30,100 0,66 0,32" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1.4"/>
                  <polygon points="0,66 30,100 310,100 340,66 340,80 310,100 30,100 0,80" fill="#639922" stroke="#3B6D11" strokeWidth="1.4"/>
                  <polygon points="0,32 0,66 30,100 30,62" fill="#97C459" stroke="#3B6D11" strokeWidth="1.4"/>
                  <rect x="52" y="26" width="236" height="44" rx="5" fill="#C0DD97" stroke="#3B6D11" strokeWidth="1.2"/>
                  <rect x="62" y="32" width="48" height="30" rx="3" fill="#639922" stroke="#27500A" strokeWidth=".7"/>
                  <text x="86" y="51" fontSize="8" fill="#EAF3DE" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">CPU</text>
                  <rect x="118" y="32" width="48" height="30" rx="3" fill="#639922" stroke="#27500A" strokeWidth=".7"/>
                  <text x="142" y="51" fontSize="8" fill="#EAF3DE" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">MEM</text>
                  <rect x="174" y="32" width="48" height="30" rx="3" fill="#639922" stroke="#27500A" strokeWidth=".7"/>
                  <text x="198" y="51" fontSize="8" fill="#EAF3DE" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">WiFi</text>
                  <rect x="230" y="32" width="48" height="30" rx="3" fill="#639922" stroke="#27500A" strokeWidth=".7"/>
                  <text x="254" y="51" fontSize="8" fill="#EAF3DE" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">SEC</text>
                  {/* Bus lines */}
                  <rect x="62" y="68" width="216" height="3" rx="1" fill="#3B6D11" stroke="#27500A" strokeWidth=".5"/>
                  <circle cx="86" cy="78" r="3" fill="#3B6D11" opacity=".55"/>
                  <circle cx="142" cy="78" r="3" fill="#3B6D11" opacity=".55"/>
                  <circle cx="198" cy="78" r="3" fill="#3B6D11" opacity=".55"/>
                  <circle cx="254" cy="78" r="3" fill="#3B6D11" opacity=".55"/>
                  <text x="170" y="94" fontSize="10" fill="#ffffff" stroke="#173404" strokeWidth="3" paintOrder="stroke" fontFamily="'Helvetica Neue',sans-serif" fontWeight="800" textAnchor="middle" letterSpacing=".5">SoC / MODULE</text>
                </svg>
              </div>
              <div className="flex justify-center items-center gap-2 py-0.5">
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
              </div>

              {/* Layer 2: DISCRETE CHIPS */}
              <div style={{ animation: 'eng-rise .5s ease both .12s, eng-bob2 4s ease-in-out infinite 1.5s' }}>
                <svg width="100%" viewBox="0 0 340 90" overflow="visible" className="block">
                  <polygon points="30,8 310,8 340,28 340,62 310,90 30,90 0,62 0,28" fill="#FEF3E2" stroke="#D4960A" strokeWidth="1.4"/>
                  <polygon points="0,62 30,90 310,90 340,62 340,74 310,90 30,90 0,74" fill="#D4960A" stroke="#BA7517" strokeWidth="1.4"/>
                  <polygon points="0,28 0,62 30,90 30,56" fill="#EF9F27" stroke="#BA7517" strokeWidth="1.4"/>
                  {/* Chips */}
                  <rect x="48" y="22" width="70" height="42" rx="5" fill="#EF9F27" stroke="#BA7517" strokeWidth="1.2"/>
                  <rect x="54" y="28" width="58" height="12" rx="2" fill="#BA7517" stroke="#633806" strokeWidth=".5"/>
                  <text x="83" y="37" fontSize="7" fill="#FEF3E2" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">RISC-V CPU</text>
                  <rect x="54" y="44" width="58" height="14" rx="2" fill="#BA7517" stroke="#633806" strokeWidth=".6"/>
                  <rect x="136" y="22" width="70" height="42" rx="5" fill="#EF9F27" stroke="#BA7517" strokeWidth="1.2"/>
                  <rect x="142" y="28" width="58" height="12" rx="2" fill="#BA7517" stroke="#633806" strokeWidth=".5"/>
                  <text x="171" y="37" fontSize="7" fill="#FEF3E2" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">Memory</text>
                  <rect x="142" y="44" width="58" height="14" rx="2" fill="#BA7517" stroke="#633806" strokeWidth=".6"/>
                  <rect x="224" y="22" width="70" height="42" rx="5" fill="#EF9F27" stroke="#BA7517" strokeWidth="1.2"/>
                  <rect x="230" y="28" width="58" height="12" rx="2" fill="#BA7517" stroke="#633806" strokeWidth=".5"/>
                  <text x="259" y="37" fontSize="7" fill="#FEF3E2" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">NPU</text>
                  <rect x="230" y="44" width="58" height="14" rx="2" fill="#BA7517" stroke="#633806" strokeWidth=".6"/>
                  {/* Connecting traces */}
                  <line x1="118" y1="43" x2="136" y2="43" stroke="#BA7517" strokeWidth="1.5" strokeDasharray="3 2" opacity=".7"/>
                  <line x1="206" y1="43" x2="224" y2="43" stroke="#BA7517" strokeWidth="1.5" strokeDasharray="3 2" opacity=".7"/>
                  <text x="170" y="82" fontSize="10" fill="#ffffff" stroke="#412402" strokeWidth="3" paintOrder="stroke" fontFamily="'Helvetica Neue',sans-serif" fontWeight="800" textAnchor="middle" letterSpacing=".5">DISCRETE CHIPS</text>
                </svg>
              </div>
              <div className="flex justify-center items-center gap-2 py-0.5">
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
                <span className="w-[3px] h-[3px] rounded-full bg-slate-300"/>
              </div>

              {/* Layer 1: IP BLOCKS */}
              <div style={{ animation: 'eng-rise .5s ease both .00s, eng-bob1 4s ease-in-out infinite 1.2s' }}>
                <svg width="100%" viewBox="0 0 340 88" overflow="visible" className="block">
                  <polygon points="30,8 310,8 340,30 340,60 310,88 30,88 0,60 0,30" fill="#F5F4F0" stroke="#B4B2A9" strokeWidth="1.4"/>
                  <polygon points="0,60 30,88 310,88 340,60 340,72 310,88 30,88 0,72" fill="#888780" stroke="#B4B2A9" strokeWidth="1.4"/>
                  <polygon points="0,30 0,60 30,88 30,54" fill="#B4B2A9" stroke="#B4B2A9" strokeWidth="1.4"/>
                  {/* IP blocks */}
                  <rect x="36" y="22" width="40" height="36" rx="4" fill="#D3D1C7" stroke="#888780" strokeWidth=".9"/>
                  <rect x="40" y="26" width="32" height="10" rx="2" fill="#B4B2A9" stroke="#5F5E5A" strokeWidth=".4"/>
                  <text x="56" y="48" fontSize="7" fill="#2C2C2A" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">Ibex</text>
                  <rect x="86" y="22" width="40" height="36" rx="4" fill="#D3D1C7" stroke="#888780" strokeWidth=".9"/>
                  <rect x="90" y="26" width="32" height="10" rx="2" fill="#B4B2A9" stroke="#5F5E5A" strokeWidth=".4"/>
                  <text x="106" y="48" fontSize="7" fill="#2C2C2A" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">OT</text>
                  <rect x="136" y="22" width="40" height="36" rx="4" fill="#D3D1C7" stroke="#888780" strokeWidth=".9"/>
                  <rect x="140" y="26" width="32" height="10" rx="2" fill="#B4B2A9" stroke="#5F5E5A" strokeWidth=".4"/>
                  <text x="156" y="48" fontSize="7" fill="#2C2C2A" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">DMA</text>
                  <rect x="186" y="22" width="40" height="36" rx="4" fill="#D3D1C7" stroke="#888780" strokeWidth=".9"/>
                  <rect x="190" y="26" width="32" height="10" rx="2" fill="#B4B2A9" stroke="#5F5E5A" strokeWidth=".4"/>
                  <text x="206" y="48" fontSize="7" fill="#2C2C2A" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">NPU</text>
                  <rect x="236" y="22" width="40" height="36" rx="4" fill="#D3D1C7" stroke="#888780" strokeWidth=".9"/>
                  <rect x="240" y="26" width="32" height="10" rx="2" fill="#B4B2A9" stroke="#5F5E5A" strokeWidth=".4"/>
                  <text x="256" y="48" fontSize="7" fill="#2C2C2A" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">MEM</text>
                  <rect x="286" y="22" width="40" height="36" rx="4" fill="#D3D1C7" stroke="#888780" strokeWidth=".9"/>
                  <rect x="290" y="26" width="32" height="10" rx="2" fill="#B4B2A9" stroke="#5F5E5A" strokeWidth=".4"/>
                  <text x="306" y="48" fontSize="7" fill="#2C2C2A" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" textAnchor="middle">GPIO</text>
                  {/* connecting traces */}
                  <line x1="76" y1="40" x2="86" y2="40" stroke="#888780" strokeWidth=".6" strokeDasharray="3 2"/>
                  <line x1="126" y1="40" x2="136" y2="40" stroke="#888780" strokeWidth=".6" strokeDasharray="3 2"/>
                  <line x1="176" y1="40" x2="186" y2="40" stroke="#888780" strokeWidth=".6" strokeDasharray="3 2"/>
                  <line x1="226" y1="40" x2="236" y2="40" stroke="#888780" strokeWidth=".6" strokeDasharray="3 2"/>
                  <line x1="276" y1="40" x2="286" y2="40" stroke="#888780" strokeWidth=".6" strokeDasharray="3 2"/>
                  <text x="170" y="80" fontSize="10" fill="#ffffff" stroke="#2C2C2A" strokeWidth="3" paintOrder="stroke" fontFamily="'Helvetica Neue',sans-serif" fontWeight="800" textAnchor="middle" letterSpacing=".5">IP BLOCKS</text>
                </svg>
              </div>

              {/* Exhaust plume (simplified) */}
              <div className="relative flex justify-center" style={{ height: 60, pointerEvents: 'none' }}>
                <svg width="200" height="60" viewBox="0 0 200 60" className="block">
                  <ellipse cx="100" cy="8" rx="60" ry="6" fill="#FF8C00" opacity=".18" style={{ animation: 'eng-gp .55s ease-in-out infinite' }}/>
                  <ellipse cx="100" cy="12" rx="44" ry="5" fill="#FFA500" opacity=".24" style={{ animation: 'eng-gp .55s ease-in-out infinite .1s' }}/>
                  <ellipse cx="100" cy="16" rx="28" ry="4" fill="#FFD700" opacity=".32" style={{ animation: 'eng-gp .55s ease-in-out infinite .2s' }}/>
                  {/* Outer flame */}
                  <g style={{ animation: 'eng-fo .7s ease-in-out infinite', transformOrigin: '100px 6px' }}>
                    <path d="M72,6 Q60,28 68,44 Q80,58 100,55 Q120,58 132,44 Q140,28 128,6Z" fill="#FF4400" opacity=".15"/>
                  </g>
                  {/* Mid flame */}
                  <g style={{ animation: 'eng-fm .5s ease-in-out infinite .06s', transformOrigin: '100px 6px' }}>
                    <path d="M78,6 Q70,24 76,38 Q86,50 100,48 Q114,50 124,38 Q130,24 122,6Z" fill="#FF8800" opacity=".3"/>
                  </g>
                  {/* Core flame */}
                  <g style={{ animation: 'eng-fc .38s ease-in-out infinite .03s', transformOrigin: '100px 6px' }}>
                    <path d="M86,6 Q80,20 84,32 Q92,42 100,40 Q108,42 116,32 Q120,20 114,6Z" fill="#FFE840" opacity=".45"/>
                    <path d="M90,6 Q86,16 88,26 Q94,34 100,32 Q106,34 112,26 Q114,16 110,6Z" fill="#FFFFF0" opacity=".6"/>
                  </g>
                  {/* Sparks */}
                  <circle r="2" cx="100" cy="10" fill="#FFD700" style={{ animation: 'eng-spark 1.3s ease-out infinite', '--sx': '-30px', '--sy': '35px' }}/>
                  <circle r="1.5" cx="100" cy="10" fill="#FF8C00" style={{ animation: 'eng-spark 1.3s ease-out infinite .3s', '--sx': '25px', '--sy': '40px' }}/>
                  <circle r="1.8" cx="100" cy="10" fill="#FFE840" style={{ animation: 'eng-spark 1.3s ease-out infinite .6s', '--sx': '-18px', '--sy': '30px' }}/>
                  <circle r="1.2" cx="100" cy="10" fill="#FF6600" style={{ animation: 'eng-spark 1.3s ease-out infinite .9s', '--sx': '22px', '--sy': '32px' }}/>
                </svg>
              </div>
            </div>

            {/* Right-side engine brackets */}
            <div className="hidden xl:flex flex-col justify-between relative" style={{ width: 90, marginLeft: 8 }}>
              {/* Code Engine bracket — spans top 2 layers */}
              <div className="flex items-center" style={{ flex: '2' }}>
                <svg width="18" height="100%" viewBox="0 0 18 100" preserveAspectRatio="none" className="flex-shrink-0">
                  <line x1="2" y1="4" x2="10" y2="4" stroke="#B7410E" strokeWidth="1.5"/>
                  <line x1="10" y1="4" x2="10" y2="96" stroke="#B7410E" strokeWidth="1.5"/>
                  <line x1="2" y1="96" x2="10" y2="96" stroke="#B7410E" strokeWidth="1.5"/>
                  <circle cx="10" cy="50" r="3" fill="#B7410E"/>
                </svg>
                <div className="ml-1.5">
                  <span className="text-[10px] font-extrabold block leading-tight" style={{ color: '#B7410E' }}>Code Engine</span>
                  <span className="text-[8px] text-muted-foreground block">API + Middleware</span>
                </div>
              </div>
              {/* Chip Engine bracket — spans middle 2 layers */}
              <div className="flex items-center" style={{ flex: '2.2' }}>
                <svg width="18" height="100%" viewBox="0 0 18 100" preserveAspectRatio="none" className="flex-shrink-0">
                  <line x1="2" y1="4" x2="10" y2="4" stroke="#0071c5" strokeWidth="1.5"/>
                  <line x1="10" y1="4" x2="10" y2="96" stroke="#0071c5" strokeWidth="1.5"/>
                  <line x1="2" y1="96" x2="10" y2="96" stroke="#0071c5" strokeWidth="1.5"/>
                  <circle cx="10" cy="50" r="3" fill="#0071c5"/>
                </svg>
                <div className="ml-1.5">
                  <span className="text-[10px] font-extrabold block leading-tight" style={{ color: '#0071c5' }}>Chip Engine</span>
                  <span className="text-[8px] text-muted-foreground block">SoC + Chips</span>
                </div>
              </div>
              {/* Core Engine bracket — spans bottom layer */}
              <div className="flex items-center" style={{ flex: '1' }}>
                <svg width="18" height="100%" viewBox="0 0 18 100" preserveAspectRatio="none" className="flex-shrink-0">
                  <line x1="2" y1="10" x2="10" y2="10" stroke="#7B3F00" strokeWidth="1.5"/>
                  <line x1="10" y1="10" x2="10" y2="90" stroke="#7B3F00" strokeWidth="1.5"/>
                  <line x1="2" y1="90" x2="10" y2="90" stroke="#7B3F00" strokeWidth="1.5"/>
                  <circle cx="10" cy="50" r="3" fill="#7B3F00"/>
                </svg>
                <div className="ml-1.5">
                  <span className="text-[10px] font-extrabold block leading-tight" style={{ color: '#7B3F00' }}>Core Engine</span>
                  <span className="text-[8px] text-muted-foreground block">IP Blocks</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-border flex-wrap">
          {[
            { color: '#E6F1FB', stroke: '#185FA5', label: 'Application' },
            { color: '#EEEDFE', stroke: '#534AB7', label: 'Middleware' },
            { color: '#EAF3DE', stroke: '#3B6D11', label: 'SoC' },
            { color: '#FEF3E2', stroke: '#D4960A', label: 'Chips' },
            { color: '#F5F4F0', stroke: '#B4B2A9', label: 'IP' },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm border" style={{ backgroundColor: l.color, borderColor: l.stroke }}/>
              <span className="text-[9px] text-muted-foreground font-medium">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── 7-Stage Build Simulation ── */
const simulationStages = [
  {
    num: 1, title: "Requirement", badge: "Input", 
    color: "#111", badgeBg: "#111", badgeText: "#fff",
    icon: Wrench, 
    desc: "Natural language mission input parsed by TrusteD-V Engine to identify domain, constraints, and target architecture.",
    details: ["Mission specification", "Domain detection", "Architecture selection"]
  },
  {
    num: 2, title: "Requirement Decomposition", badge: "Analysis",
    color: "#5F5E5A", badgeBg: "#F1EFE8", badgeText: "#444",
    icon: Layers,
    desc: "Requirements broken into functional blocks — Sensing, Compute, Power, Security — mapped to hardware and software needs.",
    details: ["Sensing & I/O mapping", "Compute & NPU allocation", "Security requirements"]
  },
  {
    num: 3, title: "Core Engine — IP Accumulation", badge: "Core Engine",
    color: "#7B3F00", badgeBg: "#7B3F00", badgeText: "#FEF9F2",
    icon: CircuitBoard,
    desc: "Open-source and commercial IPs selected, verified, and composed into the RISC-V architecture.",
    chips: ["Ibex RV32IMC", "OpenTitan", "NPU IP", "AES-256", "DMA ctrl", "UART/SPI/I2C"],
    progress: [{ label: "Open IP", pct: 78, color: "#EF9F27" }, { label: "Custom IP", pct: 22, color: "#BA7517" }]
  },
  {
    num: 4, title: "Chip Engine — SoC Integration", badge: "Chip Engine",
    color: "#0071c5", badgeBg: "#0071c5", badgeText: "#fff",
    icon: Cpu,
    desc: "IPs fused into chips, unified into SoC with AXI bus fabric. PCB designed and BOM finalized.",
    details: ["RISC-V SoC unified", "RF chip (LoRa+UHF)", "Memory map locked", "PCB + BOM ready"]
  },
  {
    num: 5, title: "Code Engine — Firmware & API", badge: "Code Engine",
    color: "#B7410E", badgeBg: "#B7410E", badgeText: "#fff",
    icon: Code,
    desc: "Rust firmware auto-generated from hardware abstraction map. Full middleware and application API stack built.",
    progress: [
      { label: "Firmware", pct: 100, color: "#B7410E" }, 
      { label: "Middleware", pct: 100, color: "#D85A30" }, 
      { label: "APIs", pct: 100, color: "#F0997B" }
    ]
  },
  {
    num: 6, title: "Simulation & Testing", badge: "Verification",
    color: "#0F6E56", badgeBg: "#0F6E56", badgeText: "#E1F5EE",
    icon: FlaskConical,
    desc: "Hardware and software tested together in a closed-loop simulation environment before tape-out.",
    progress: [
      { label: "HW sim", pct: 100, color: "#0F6E56" },
      { label: "SW sim", pct: 98, color: "#1D9E75" },
      { label: "Coverage", pct: 98, color: "#5DCAA5" }
    ]
  },
  {
    num: 7, title: "Production Ready", badge: "Launch",
    color: "#2E7D32", badgeBg: "#2E7D32", badgeText: "#fff",
    icon: Rocket,
    desc: "Verified, validated, and cleared for production deployment. Complete bill of materials and manufacturing files ready.",
    summary: ["10 IP blocks", "3 chips", "SoC unified", "RTOS+HAL", "All tests pass"]
  },
];

const Landing = () => {
  const rustBenefits = [
    { title: "Memory Safety", description: "Eliminates buffer overflows, null pointer dereferences, and data races at compile time" },
    { title: "Zero-Cost Abstractions", description: "High-level features compile to efficient machine code with no runtime overhead" },
    { title: "Fearless Concurrency", description: "Ownership system prevents data races, enabling safe multi-threaded embedded code" },
    { title: "No Garbage Collection", description: "Deterministic memory management perfect for real-time embedded systems" },
  ];

  const riscvRustBenefits = [
    { icon: Shield, title: "Secure by Default", description: "Rust's memory safety combined with RISC-V's hardware security extensions creates a robust security foundation." },
    { icon: Gauge, title: "Optimal Performance", description: "RISC-V's clean ISA pairs with Rust's zero-cost abstractions for maximum efficiency on constrained devices." },
    { icon: Code, title: "Modern Toolchain", description: "Cargo build system, integrated testing, and LLVM support for RISC-V targets accelerate development." },
    { icon: GitBranch, title: "Open Ecosystem", description: "Both RISC-V and Rust are open-source, vendor-neutral technologies ensuring long-term sustainability." },
  ];

  const features = [
    { icon: Shield, title: "Secure Boot & TEE", description: "Hardware root of trust with verified boot chain via rboot/rustBoot, TPM integration, and trusted execution." },
    { icon: Cpu, title: "RISC-V Optimized Compilers", description: "State-of-the-art Rust toolchain with Pliron & Cranelift backends optimized for RISC-V targets." },
    { icon: Zap, title: "AI-Powered IDE — Jarvyn", description: "Context-aware code generation, debugging, hardware-aware suggestions, and one-click flashing." },
    { icon: Layers, title: "Comprehensive SDK", description: "Pre-integrated SDKs for heterogeneous chips including RISC-V cores, TPUs, and NPUs." },
    { icon: Cog, title: "RTOS Integration", description: "FreeRTOS, Zephyr, Embassy — with TrusteD-V RTOS benchmarks showing 9x faster context switching." },
    { icon: Lock, title: "Crypto Stack", description: "Native AES-256, RSA, ECC, SHA-3, and post-quantum cryptography support for embedded security." },
  ];

  const hardwarePartners = [
    { name: "C-DAC", description: "VEGA Processors" },
    { name: "C-DAC", description: "DHRUV64 SoCs" },
    { name: "Mindgrove", description: "Secure IoT" },
    { name: "Mindgrove", description: "Vision SoCs" },
    { name: "Upbeat Tech", description: "Edge AI" },
    { name: "C-DAC", description: "ARIES Boards" },
  ];

  const pricingTiers = [
    {
      name: "Basic",
      tagline: "Platform Access",
      price: "Contact Sales",
      desc: "Core platform access for individual developers and small teams getting started with RISC-V Rust development.",
      features: [
        "TrusteD-V IDE — Jarvyn (Community)",
        "RISC-V Rust SDK access",
        "Community support",
        "Standard BSP templates",
        "Public documentation",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      tagline: "Advanced Tools + Support",
      price: "Contact Sales",
      desc: "Advanced toolchain, priority support, and extended middleware for professional embedded teams.",
      features: [
        "Everything in Basic",
        "Jarvyn AI code assistant (Full)",
        "RTOS integration suite",
        "Secure Boot configuration tool",
        "Priority engineering support",
        "CI/CD pipeline templates",
        "Hardware simulation environment",
      ],
      cta: "Talk to Sales",
      highlight: true,
    },
    {
      name: "Enterprise",
      tagline: "Customization + SLA",
      price: "Custom",
      desc: "Full platform customization, dedicated support, and SLA-backed guarantees for production deployments.",
      features: [
        "Everything in Pro",
        "Custom BSP development",
        "Dedicated security audit",
        "On-premise deployment option",
        "SLA-backed support (99.9%)",
        "White-label IDE option",
        "Hardware partner integration",
        "Compliance certification support",
      ],
      cta: "Contact Enterprise",
      highlight: false,
    },
  ];

  const archLayers = [
    { label: "Application Layer", color: "primary", items: ["Jarvyn AI", "IDE", "Project Manager"] },
    { label: "Rust SDK & Middleware", color: "orange", items: ["Embassy", "RTIC", "embedded-hal", "Drivers"] },
    { label: "Secure Foundation", color: "green", items: ["Secure Boot", "Trusted HAL", "HSM", "TEE"] },
    { label: "RISC-V Hardware", color: "blue", items: ["C-DAC VEGA", "Mindgrove", "Upbeat Tech", "DHRUV64"] },
  ];

  const archColorMap = {
    primary: "bg-primary/20",
    orange: "bg-orange-500/20",
    green: "bg-green-500/20",
    blue: "bg-blue-500/20",
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* ══ HERO SECTION ══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="mb-8">
                <TrustedVLogo size="xl" />
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-sm font-bold text-orange-600">Rust</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-bold text-primary">RISC-V</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span className="text-sm font-bold text-green-600">Secure</span>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight mb-6 leading-tight">
                Build Secure <span className="text-primary">RISC-V</span> Systems with <span className="text-orange-500">Rust</span>
              </h1>
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                The silicon-to-application platform for RISC-V embedded development. 
                From IP blocks to production firmware — everything powered by <strong>Rust</strong>.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/download-ide">
                  <Button data-testid="start-building-btn" size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    Download IDE <Download className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/developer-portal">
                  <Button data-testid="explore-portal-btn" variant="outline" size="lg" className="h-12 px-8 text-base font-semibold">
                    Developer Portal
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
                <AnimatedCounter end={6} suffix="+" label="RISC-V Boards" />
                <AnimatedCounter end={5} suffix="+" label="RTOS Options" />
                <AnimatedCounter end={15} suffix="" label="Team Members" />
                <AnimatedCounter end={3} suffix="" label="Hardware Partners" />
              </div>
            </div>
            
            {/* Engine Architecture Diagram */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-2xl blur-3xl" />
              <div className="relative">
                <EngineArchDiagram />
                {/* Subtle "Designed in India" */}
                <div className="flex items-center justify-end gap-1.5 mt-3 opacity-60">
                  <span className="text-[10px] text-muted-foreground font-medium tracking-wide">Designed in India</span>
                  <span className="text-[10px]">&#x1F1EE;&#x1F1F3;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7-STAGE BUILD SIMULATION ══ */}
      <section className="py-20 bg-white border-t border-border overflow-hidden" data-testid="simulation-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">TrusteD-V Engine</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Requirement <span className="text-muted-foreground font-normal mx-1">&rarr;</span> IP <span className="text-muted-foreground font-normal mx-1">&rarr;</span> Chips <span className="text-muted-foreground font-normal mx-1">&rarr;</span> SoC <span className="text-muted-foreground font-normal mx-1">&rarr;</span> Firmware <span className="text-muted-foreground font-normal mx-1">&rarr;</span> Sim <span className="text-muted-foreground font-normal mx-1">&rarr;</span> Launch
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              See the complete build pipeline — from a natural-language requirement to production-ready hardware and firmware.
            </p>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Connecting line */}
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-slate-200 via-slate-300 to-green-300 hidden md:block" />
            
            <div className="space-y-6">
              {simulationStages.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <RevealItem key={i} delay={i * 100}>
                    <div className="flex gap-4 md:gap-6 items-start relative" data-testid={`sim-stage-${stage.num}`}>
                      {/* Step circle */}
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-2"
                        style={{ backgroundColor: `${stage.color}10`, borderColor: stage.color }}
                      >
                        <Icon className="w-6 h-6" style={{ color: stage.color }} />
                        <span 
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center border-2 border-white"
                          style={{ backgroundColor: stage.color, color: "#fff" }}
                        >
                          {stage.num}
                        </span>
                      </div>
                      
                      {/* Card */}
                      <div 
                        className="flex-1 rounded-xl border bg-white p-4 hover:shadow-md transition-shadow"
                        style={{ borderColor: `${stage.color}30` }}
                      >
                        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                          <h4 className="font-bold text-sm text-foreground">{stage.title}</h4>
                          <span 
                            className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: stage.badgeBg, color: stage.badgeText }}
                          >
                            {stage.badge}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2">{stage.desc}</p>
                        
                        {/* Chips */}
                        {stage.chips && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {stage.chips.map((chip, j) => (
                              <span 
                                key={j} 
                                className="text-[10px] font-semibold px-2 py-0.5 rounded border"
                                style={{ 
                                  backgroundColor: `${stage.color}08`, 
                                  borderColor: `${stage.color}30`, 
                                  color: stage.color 
                                }}
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Details list */}
                        {stage.details && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                            {stage.details.map((d, j) => (
                              <span key={j} className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-current" />
                                {d}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Progress bars */}
                        {stage.progress && (
                          <div className="space-y-1.5 mt-3">
                            {stage.progress.map((p, j) => (
                              <div key={j} className="flex items-center gap-2">
                                <span className="text-[9px] font-medium text-muted-foreground w-16 text-right">{p.label}</span>
                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${p.pct}%`, backgroundColor: p.color }}
                                  />
                                </div>
                                <span className="text-[9px] font-medium w-8" style={{ color: p.color }}>
                                  {p.pct === 100 ? "PASS" : `${p.pct}%`}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Summary chips for launch */}
                        {stage.summary && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {stage.summary.map((s, j) => (
                              <span 
                                key={j} 
                                className="text-[9px] font-bold px-2 py-1 rounded-md border"
                                style={{ 
                                  backgroundColor: `${stage.color}10`, 
                                  borderColor: `${stage.color}30`,
                                  color: stage.color 
                                }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </div>
            
            {/* Engine legend */}
            <div className="flex justify-center gap-6 mt-10 flex-wrap">
              {[
                { name: "Core Engine", color: "#7B3F00", sub: "IP blocks" },
                { name: "Chip Engine", color: "#0071c5", sub: "SoC + chips" },
                { name: "Code Engine", color: "#B7410E", sub: "Firmware + API" },
                { name: "Verification", color: "#0F6E56", sub: "HW + SW sim" },
              ].map((e, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                  <span className="font-bold" style={{ color: e.color }}>{e.name}</span>
                  <span className="text-muted-foreground">{e.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY RUST ══ */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white border-t border-orange-100">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
              <span className="text-lg font-bold text-orange-600">Rust</span>
              <span className="text-sm text-orange-600/80">Programming Language</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Why <span className="text-orange-500">Rust</span> for Embedded Systems?
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              Rust provides memory safety without garbage collection, making it the perfect language 
              for secure, high-performance embedded development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rustBenefits.map((benefit, index) => (
              <RevealItem key={index} delay={index * 120}>
                <Card className="bg-white border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-5 h-5 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RISC-V x RUST ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">RISC-V</span>
                </div>
                <span className="text-2xl font-light text-muted-foreground">x</span>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                  <span className="text-sm font-bold text-orange-500">Rust</span>
                </div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
                The Perfect Combination for Secure Embedded Systems
              </h2>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                RISC-V's open, extensible architecture combined with Rust's memory safety creates 
                the most secure and efficient foundation for modern embedded development.
              </p>
              
              <div className="space-y-6">
                {riscvRustBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <RevealItem key={index} delay={index * 250}>
                      <div className="flex gap-4 group">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                          <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
                        </div>
                      </div>
                    </RevealItem>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-8 text-white shadow-2xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Binary className="w-5 h-5 text-[#6b9aff]" />
                Platform Architecture
              </h3>
              <div className="space-y-4">
                {archLayers.map((layer, i) => (
                  <RevealItem key={i} delay={i * 200}>
                    <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600 transition-colors">
                      <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider">{layer.label}</div>
                      <div className="flex flex-wrap gap-2">
                        {layer.items.map((item) => (
                          <span key={item} className={`px-2.5 py-1 ${archColorMap[layer.color]} rounded-md text-xs font-medium text-white`}>{item}</span>
                        ))}
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ══ PLATFORM CAPABILITIES ══ */}
      <section className="py-20 bg-slate-50 border-t border-border">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Platform Capabilities</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Complete Development Ecosystem
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need for secure RISC-V embedded development with Rust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <RevealItem key={index} delay={index * 100}>
                  <Card data-testid={`feature-card-${index}`} className="bg-white border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 text-lg">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </RevealItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ BUSINESS PLANS ══ */}
      <section className="py-20 bg-white border-t border-border" data-testid="pricing-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Licensing & Plans</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Flexible Plans for Every Team
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              From individual developers to enterprise deployments — choose the plan that scales with your RISC-V projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <RevealItem key={index} delay={index * 150}>
                <Card 
                  data-testid={`pricing-tier-${tier.name.toLowerCase()}`}
                  className={`relative overflow-hidden h-full flex flex-col ${
                    tier.highlight 
                      ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]" 
                      : "border-border hover:shadow-lg"
                  } transition-all duration-300`}
                >
                  {tier.highlight && <div className="h-1.5 bg-gradient-to-r from-primary to-orange-400" />}
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{tier.tagline}</p>
                    </div>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-foreground">{tier.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{tier.desc}</p>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {tier.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-primary" : "text-green-500"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/partner-registration">
                      <Button 
                        className={`w-full ${tier.highlight ? "bg-primary text-white hover:bg-primary/90" : ""}`}
                        variant={tier.highlight ? "default" : "outline"}
                      >
                        {tier.cta} <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-xs text-muted-foreground">
              Annual / per-core / per-project licensing available. Per-device and per-deployment pricing for platform subscriptions.
            </p>
          </div>
        </div>
      </section>
      
      {/* ══ HARDWARE PARTNERS ══ */}
      <section className="py-20 bg-slate-50 border-t border-border">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Hardware Ecosystem</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Supported <span className="text-primary">RISC-V</span> Hardware
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pre-integrated support for C-DAC, Mindgrove, and Upbeat Tech RISC-V development platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {hardwarePartners.map((partner, index) => (
              <RevealItem key={index} delay={index * 80}>
                <div className="bg-white rounded-lg border border-border p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Cpu className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{partner.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{partner.description}</p>
                </div>
              </RevealItem>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/marketplace">
              <Button variant="outline" className="font-medium">
                View Full Marketplace <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* ══ CTA ══ */}
      <section className="py-20 bg-primary">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Secure Embedded Systems with <span className="text-orange-300">Rust</span>?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-base sm:text-lg leading-relaxed">
              Start your RISC-V journey today with TrusteD-V IDE — Jarvyn, AI-powered tools, and production-ready Rust templates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/download-ide">
                <Button data-testid="get-started-cta-btn" size="lg" className="h-12 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90">
                  Download IDE <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/partner-registration">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold border-white/30 text-white hover:bg-white/10">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/product-suite" className="hover:text-white transition-colors">Product Suite</Link></li>
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/download-ide" className="hover:text-white transition-colors">Download IDE</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Developers</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">Developer Portal</Link></li>
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/developer-portal" className="hover:text-white transition-colors">API Reference</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/team" className="hover:text-white transition-colors">Our Team</Link></li>
                <li><Link to="/partners" className="hover:text-white transition-colors">Partners</Link></li>
                <li><Link to="/partner-registration" className="hover:text-white transition-colors">Become a Partner</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <TrustedVLogo size="sm" />
              <div className="flex items-center gap-2 pl-6 border-l border-slate-700">
                <img src="/bosch-logo.png" alt="" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <p className="text-sm text-slate-400">&copy; 2026 TrusteD-V. Secure RISC-V Development Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
