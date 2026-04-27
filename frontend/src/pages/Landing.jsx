import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cpu, Code, Layers, Download, ArrowRight, 
  CheckCircle2, ChevronRight,
  Cog, Rocket, Wrench, CircuitBoard,
  Radio, FlaskConical, Server
} from "lucide-react";
import TrustedVLogo from "@/components/TrustedVLogo";
import { PartnerLogo } from "@/components/PartnerLogos";

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

/* ── TrusteD-V Engine v7 — Isometric 3D Diagram from artifact ── */
const EngineArchDiagram = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (!document.getElementById('tv-eng-css')) {
      const s = document.createElement('style');
      s.id = 'tv-eng-css';
      s.textContent = `
.tv-eng{width:100%;font-family:'Helvetica Neue',Arial,sans-serif;overflow:hidden}
.tv-eng .canvas{position:relative;width:300px;margin:0 auto;height:680px;overflow:visible}
.tv-eng .exhaust{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);width:320px;height:150px;pointer-events:none;z-index:1}
.tv-eng .stack{position:absolute;left:50%;bottom:150px;transform:translateX(-50%);width:300px;z-index:2}
.tv-eng .slab{position:relative;width:300px}
.tv-eng .ll,.tv-eng .lr{display:none}
.tv-eng .conn{display:flex;justify-content:center;align-items:center;gap:6px;padding:2px 0}
.tv-eng .cdot{width:2.5px;height:2.5px;border-radius:50%;background:#ccc}
@keyframes tvEr{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes tvEb0{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes tvEb1{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes tvEb2{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes tvEb3{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes tvEb4{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes tvEb5{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
.tv-eng .a0{animation:tvEr .45s ease both .00s,tvEb0 4.2s ease-in-out infinite 1.0s}
.tv-eng .a1{animation:tvEr .45s ease both .10s,tvEb1 4.2s ease-in-out infinite 1.2s}
.tv-eng .a2{animation:tvEr .45s ease both .20s,tvEb2 4.2s ease-in-out infinite 1.4s}
.tv-eng .a3{animation:tvEr .45s ease both .30s,tvEb3 4.2s ease-in-out infinite 1.6s}
.tv-eng .a4{animation:tvEr .45s ease both .40s,tvEb4 4.2s ease-in-out infinite 1.8s}
.tv-eng .a5{animation:tvEr .45s ease both .50s,tvEb5 3.8s ease-in-out infinite 2.0s}
@keyframes tvEfo{0%,100%{transform:scaleY(1)scaleX(1)}40%{transform:scaleY(1.12)scaleX(.9)}80%{transform:scaleY(.9)scaleX(1.1)}}
@keyframes tvEfm{0%,100%{transform:scaleY(1)scaleX(1)}35%{transform:scaleY(1.18)scaleX(.87)}75%{transform:scaleY(.9)scaleX(1.1)}}
@keyframes tvEfc{0%,100%{transform:scaleY(1)scaleX(1)}50%{transform:scaleY(1.26)scaleX(.84)}}
@keyframes tvEgp{0%,100%{opacity:.3}50%{opacity:.7}}
@keyframes tvEsp{0%{opacity:1;transform:translate(0,0)scale(1)}100%{opacity:0;transform:translate(var(--sx),var(--sy))scale(0)}}
@keyframes tvEsm{0%{opacity:.22;transform:translateY(0)scale(1)}100%{opacity:0;transform:translateY(-55px)scale(2.2)}}
.tv-eng .fo{animation:tvEfo .72s ease-in-out infinite;transform-origin:center top}
.tv-eng .fm{animation:tvEfm .52s ease-in-out infinite .08s;transform-origin:center top}
.tv-eng .fc{animation:tvEfc .4s ease-in-out infinite .04s;transform-origin:center top}
.tv-eng .gp{animation:tvEgp .6s ease-in-out infinite}
.tv-eng .sp{animation:tvEsp 1.4s ease-out infinite var(--sd,0s)}
.tv-eng .sm1{animation:tvEsm 2.1s ease-out infinite 0s}
.tv-eng .sm2{animation:tvEsm 2.1s ease-out infinite .7s}
.tv-eng .legend{display:flex;justify-content:center;gap:10px;margin-top:10px;flex-wrap:wrap}
.tv-eng .li{display:flex;align-items:center;gap:4px;font-size:9px;color:#888}
.tv-eng .ld{width:8px;height:8px;border-radius:2px;flex-shrink:0}
.tv-eng .ekey{display:flex;justify-content:center;gap:14px;margin-top:6px;flex-wrap:wrap}
.tv-eng .ek{display:flex;align-items:center;gap:4px;font-size:9px;font-weight:800}
.tv-eng .ekd{width:7px;height:7px;border-radius:50%}
      `;
      document.head.appendChild(s);
    }
  }, []);

  const html = `<div class="canvas">
<div class="exhaust"><svg width="360" height="165" viewBox="0 0 360 165" overflow="visible">
<ellipse class="gp" cx="180" cy="158" rx="140" ry="11" fill="#FF8C00" opacity=".2"/>
<ellipse class="gp" cx="180" cy="158" rx="96" ry="7" fill="#FFB800" opacity=".26"/>
<ellipse class="gp" cx="180" cy="158" rx="58" ry="4" fill="#FFE040" opacity=".32"/>
<path d="M155,22 Q112,65 52,114 Q108,84 152,56 Z" fill="#FF5500" opacity=".11"/>
<path d="M205,22 Q248,65 308,114 Q252,84 208,56 Z" fill="#FF5500" opacity=".11"/>
<ellipse class="sm1" cx="152" cy="16" rx="30" ry="16" fill="#d0d0d0" opacity=".16"/>
<ellipse class="sm2" cx="208" cy="12" rx="24" ry="14" fill="#ccc" opacity=".13"/>
<g class="fo"><path d="M144,0 Q122,32 136,76 Q154,114 165,136 Q172,152 180,144 Q188,152 195,136 Q206,114 224,76 Q238,32 216,0 Z" fill="#FF4400" opacity=".42"/></g>
<g class="fm"><path d="M153,0 Q135,28 146,70 Q160,104 169,124 Q174,138 180,132 Q186,138 191,124 Q200,104 214,70 Q225,28 207,0 Z" fill="#FF8800" opacity=".68"/></g>
<g class="fc"><path d="M161,0 Q147,24 155,62 Q165,94 172,112 Q176,124 180,118 Q184,124 188,112 Q195,94 205,62 Q213,24 199,0 Z" fill="#FFB800" opacity=".86"/><path d="M166,0 Q156,20 161,54 Q169,82 174,98 Q177,108 180,104 Q183,108 186,98 Q191,82 199,54 Q204,20 194,0 Z" fill="#FFE040" opacity=".95"/><path d="M170,0 Q163,17 166,46 Q172,70 176,84 Q178,92 180,88 Q182,92 184,84 Q188,70 194,46 Q197,17 190,0 Z" fill="#FFF8C0" opacity="1"/><path d="M173,0 Q169,14 171,38 Q175,58 178,70 Q179,76 180,72 Q181,76 182,70 Q185,58 189,38 Q191,14 187,0 Z" fill="#FFFFF0" opacity="1"/></g>
<circle class="sp" style="--sx:-26px;--sy:42px;--sd:0s" cx="155" cy="32" r="2" fill="#FFD700"/>
<circle class="sp" style="--sx:28px;--sy:38px;--sd:.28s" cx="205" cy="28" r="1.8" fill="#FF8C00"/>
<circle class="sp" style="--sx:-16px;--sy:58px;--sd:.55s" cx="162" cy="20" r="1.5" fill="#FFE840"/>
<circle class="sp" style="--sx:20px;--sy:52px;--sd:.80s" cx="198" cy="24" r="2" fill="#FFD700"/>
<circle class="sp" style="--sx:-36px;--sy:30px;--sd:1.1s" cx="146" cy="44" r="1.5" fill="#FF6600"/>
<circle class="sp" style="--sx:38px;--sy:26px;--sd:1.35s" cx="214" cy="40" r="1.8" fill="#FFB800"/>
</svg></div>
<div class="stack">
<div class="slab a5" style="margin-bottom:0"><svg width="300" height="80" viewBox="0 0 300 80" overflow="visible"><path d="M18,78 C44,76 72,56 100,38 C126,22 142,10 150,2 C158,10 174,22 200,38 C228,56 256,76 282,78 Z" fill="#b8d8a8" stroke="#2E7D32" stroke-width="1.6"/><path d="M150,2 C158,10 174,22 200,38 C228,56 256,76 282,78 L266,78 C244,76 218,58 196,42 C174,26 160,14 150,2 Z" fill="#80b060"/><path d="M150,2 C158,10 174,22 200,38 C228,56 256,76 282,78" fill="none" stroke="#c8f0a8" stroke-width="1" opacity=".35"/><path d="M150,2 C142,10 126,22 100,38 C72,56 44,76 18,78" fill="none" stroke="#1B5E20" stroke-width="1.8"/><path d="M150,2 C158,10 174,22 200,38 C228,56 256,76 282,78" fill="none" stroke="#1B5E20" stroke-width="1.8"/><line x1="150" y1="2" x2="50" y2="78" stroke="#2E7D32" stroke-width=".5" opacity=".28"/><line x1="150" y1="2" x2="98" y2="78" stroke="#2E7D32" stroke-width=".5" opacity=".28"/><line x1="150" y1="2" x2="150" y2="78" stroke="#2E7D32" stroke-width=".4" opacity=".22"/><line x1="150" y1="2" x2="202" y2="78" stroke="#2E7D32" stroke-width=".5" opacity=".28"/><line x1="150" y1="2" x2="250" y2="78" stroke="#2E7D32" stroke-width=".5" opacity=".28"/><circle cx="28" cy="77" r="2" fill="#2E7D32" opacity=".5"/><circle cx="64" cy="70" r="2" fill="#2E7D32" opacity=".5"/><circle cx="100" cy="56" r="2" fill="#2E7D32" opacity=".5"/><circle cx="128" cy="42" r="2" fill="#2E7D32" opacity=".5"/><circle cx="172" cy="42" r="2" fill="#2E7D32" opacity=".5"/><circle cx="200" cy="56" r="2" fill="#2E7D32" opacity=".5"/><circle cx="236" cy="70" r="2" fill="#2E7D32" opacity=".5"/><circle cx="272" cy="77" r="2" fill="#2E7D32" opacity=".5"/><circle cx="150" cy="2" r="3" fill="#1B5E20"/></svg></div>
<div class="slab a4" style="margin-top:-1px"><svg width="300" height="72" viewBox="0 0 300 72" overflow="visible"><defs><linearGradient id="api-top" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#daeaf8"/><stop offset="50%" stop-color="#c0d8f0"/><stop offset="100%" stop-color="#a8c8e8"/></linearGradient><linearGradient id="api-r" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1e5898"/><stop offset="100%" stop-color="#103870"/></linearGradient><linearGradient id="api-l" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#3878c0"/><stop offset="100%" stop-color="#1e5898"/></linearGradient></defs><polygon points="150,4 278,38 150,58 22,38" fill="url(#api-top)" stroke="#103870" stroke-width="1.3"/><polygon points="278,38 278,60 150,80 150,58" fill="url(#api-r)" stroke="#103870" stroke-width="1.3"/><polygon points="22,38 22,60 150,80 150,58" fill="url(#api-l)" stroke="#103870" stroke-width="1.3"/><rect x="68" y="22" width="28" height="12" rx="6" fill="#103870" stroke="#082050" stroke-width=".8"/><rect x="103" y="16" width="34" height="12" rx="6" fill="#103870" stroke="#082050" stroke-width=".8"/><rect x="143" y="16" width="34" height="12" rx="6" fill="#103870" stroke="#082050" stroke-width=".8"/><rect x="183" y="22" width="28" height="12" rx="6" fill="#103870" stroke="#082050" stroke-width=".8"/><text x="82" y="30" text-anchor="middle" font-size="7" fill="#c8e8ff" font-family="'Helvetica Neue',sans-serif" font-weight="700">REST</text><text x="120" y="24" text-anchor="middle" font-size="7" fill="#c8e8ff" font-family="'Helvetica Neue',sans-serif" font-weight="700">SDK</text><text x="160" y="24" text-anchor="middle" font-size="7" fill="#c8e8ff" font-family="'Helvetica Neue',sans-serif" font-weight="700">MQTT</text><text x="197" y="30" text-anchor="middle" font-size="7" fill="#c8e8ff" font-family="'Helvetica Neue',sans-serif" font-weight="700">OTA</text><text x="214" y="71" text-anchor="middle" font-size="9" fill="#c8e8ff" stroke="#082050" stroke-width="3" paint-order="stroke" font-family="'Helvetica Neue',sans-serif" font-weight="800" letter-spacing=".4">APPLICATION API</text></svg><div class="ll"><div class="ldot" style="background:#1e5898"></div><div class="lline" style="background:linear-gradient(to left,#1e5898,#ddd)"></div><div><span class="lname" style="color:#103870">Application API</span><span class="lsub">REST · SDK · MQTT · OTA</span></div></div></div>
<div class="conn a3"><div class="cdot"></div><div class="cdot"></div><div class="cdot"></div></div>
<div class="slab a3"><svg width="300" height="70" viewBox="0 0 300 70" overflow="visible"><defs><linearGradient id="mw-top" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e4e2fc"/><stop offset="50%" stop-color="#ccc8f4"/><stop offset="100%" stop-color="#b0acec"/></linearGradient><linearGradient id="mw-r" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4840b0"/><stop offset="100%" stop-color="#302880"/></linearGradient><linearGradient id="mw-l" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#6860c8"/><stop offset="100%" stop-color="#4840b0"/></linearGradient></defs><polygon points="150,4 278,36 150,56 22,36" fill="url(#mw-top)" stroke="#302880" stroke-width="1.3"/><polygon points="278,36 278,57 150,77 150,56" fill="url(#mw-r)" stroke="#302880" stroke-width="1.3"/><polygon points="22,36 22,57 150,77 150,56" fill="url(#mw-l)" stroke="#302880" stroke-width="1.3"/><rect x="42" y="13" width="44" height="11" rx="2" fill="#4840b0" stroke="#302880" stroke-width=".6"/><rect x="92" y="10" width="44" height="11" rx="2" fill="#4840b0" stroke="#302880" stroke-width=".6"/><rect x="142" y="10" width="44" height="11" rx="2" fill="#4840b0" stroke="#302880" stroke-width=".6"/><rect x="194" y="13" width="44" height="11" rx="2" fill="#4840b0" stroke="#302880" stroke-width=".6"/><text x="64" y="21" text-anchor="middle" font-size="7" fill="#d8d4ff" font-family="'Helvetica Neue',sans-serif" font-weight="700">RTOS</text><text x="114" y="18" text-anchor="middle" font-size="7" fill="#d8d4ff" font-family="'Helvetica Neue',sans-serif" font-weight="700">HAL</text><text x="164" y="18" text-anchor="middle" font-size="7" fill="#d8d4ff" font-family="'Helvetica Neue',sans-serif" font-weight="700">Drivers</text><text x="216" y="21" text-anchor="middle" font-size="7" fill="#d8d4ff" font-family="'Helvetica Neue',sans-serif" font-weight="700">Protocols</text><text x="214" y="69" text-anchor="middle" font-size="9" fill="#d8d4ff" stroke="#201860" stroke-width="2.8" paint-order="stroke" font-family="'Helvetica Neue',sans-serif" font-weight="800" letter-spacing=".4">MIDDLEWARE</text></svg><div class="lr"><div class="ldot" style="background:#4840b0"></div><div class="lline" style="background:linear-gradient(to right,#4840b0,#ddd)"></div><div><span class="lname" style="color:#302880">Middleware</span><span class="lsub">RTOS · HAL · Drivers</span></div></div></div>
<div class="conn a2"><div class="cdot"></div><div class="cdot"></div><div class="cdot"></div></div>
<div class="slab a2"><svg width="300" height="86" viewBox="0 0 300 86" overflow="visible"><defs><linearGradient id="soc-top" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d8f0d0"/><stop offset="50%" stop-color="#b8d898"/><stop offset="100%" stop-color="#98c070"/></linearGradient><linearGradient id="soc-r" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#3a6c10"/><stop offset="100%" stop-color="#224806"/></linearGradient><linearGradient id="soc-l" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#5a9020"/><stop offset="100%" stop-color="#3a6c10"/></linearGradient><linearGradient id="die-soc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b0cc80"/><stop offset="100%" stop-color="#88a858"/></linearGradient><linearGradient id="core-soc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a6c10"/><stop offset="100%" stop-color="#224806"/></linearGradient></defs><polygon points="150,5 278,46 150,70 22,46" fill="url(#soc-top)" stroke="#224806" stroke-width="1.3"/><polygon points="278,46 278,68 150,92 150,70" fill="url(#soc-r)" stroke="#224806" stroke-width="1.3"/><polygon points="22,46 22,68 150,92 150,70" fill="url(#soc-l)" stroke="#224806" stroke-width="1.3"/><rect x="78" y="16" width="144" height="42" rx="5" fill="url(#die-soc)" stroke="#224806" stroke-width="1.1"/><rect x="84" y="20" width="24" height="14" rx="2.5" fill="url(#core-soc)" stroke="#142e04" stroke-width=".6"/><rect x="116" y="20" width="24" height="14" rx="2.5" fill="url(#core-soc)" stroke="#142e04" stroke-width=".6"/><rect x="155" y="20" width="24" height="14" rx="2.5" fill="url(#core-soc)" stroke="#142e04" stroke-width=".6"/><rect x="190" y="20" width="24" height="14" rx="2.5" fill="url(#core-soc)" stroke="#142e04" stroke-width=".6"/><text x="96" y="29" text-anchor="middle" font-size="7" fill="#d8ffb0" font-family="'Helvetica Neue',sans-serif" font-weight="700">CPU</text><text x="128" y="29" text-anchor="middle" font-size="7" fill="#d8ffb0" font-family="'Helvetica Neue',sans-serif" font-weight="700">MEM</text><text x="167" y="29" text-anchor="middle" font-size="7" fill="#d8ffb0" font-family="'Helvetica Neue',sans-serif" font-weight="700">WiFi</text><text x="202" y="29" text-anchor="middle" font-size="7" fill="#d8ffb0" font-family="'Helvetica Neue',sans-serif" font-weight="700">SEC</text><rect x="78" y="44" width="144" height="5" rx="2" fill="#224806" stroke="#142e04" stroke-width=".5"/><text x="214" y="84" text-anchor="middle" font-size="9" fill="#d8ffb0" stroke="#142e04" stroke-width="2.8" paint-order="stroke" font-family="'Helvetica Neue',sans-serif" font-weight="800" letter-spacing=".4">SoC / MODULE</text></svg><div class="ll"><div class="ldot" style="background:#3a6c10"></div><div class="lline" style="background:linear-gradient(to left,#3a6c10,#ddd)"></div><div><span class="lname" style="color:#224806">SoC / Module</span><span class="lsub">CPU · Mem · WiFi · SEC</span></div></div></div>
<div class="conn a1"><div class="cdot"></div><div class="cdot"></div><div class="cdot"></div></div>
<div class="slab a1"><svg width="300" height="80" viewBox="0 0 300 80" overflow="visible"><defs><linearGradient id="dc-top" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8f0d8"/><stop offset="50%" stop-color="#ecdaa0"/><stop offset="100%" stop-color="#d8b868"/></linearGradient><linearGradient id="dc-r" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#885010"/><stop offset="100%" stop-color="#603008"/></linearGradient><linearGradient id="dc-l" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#b07828"/><stop offset="100%" stop-color="#885010"/></linearGradient><linearGradient id="chip-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c08020"/><stop offset="100%" stop-color="#885010"/></linearGradient><linearGradient id="die-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#583808"/><stop offset="100%" stop-color="#382404"/></linearGradient></defs><polygon points="150,5 278,42 150,64 22,42" fill="url(#dc-top)" stroke="#603008" stroke-width="1.3"/><polygon points="278,42 278,62 150,84 150,64" fill="url(#dc-r)" stroke="#603008" stroke-width="1.3"/><polygon points="22,42 22,62 150,84 150,64" fill="url(#dc-l)" stroke="#603008" stroke-width="1.3"/><rect x="40" y="18" width="58" height="42" rx="4" fill="url(#chip-body)" stroke="#603008" stroke-width="1.2"/><rect x="48" y="26" width="42" height="28" rx="2.5" fill="url(#die-fill)" stroke="#382404" stroke-width=".6"/><text x="69" y="42" text-anchor="middle" font-size="7.5" fill="#f0c858" font-family="'Helvetica Neue',sans-serif" font-weight="700">RISC-V</text><line x1="40" y1="24" x2="33" y2="24" stroke="#b07828" stroke-width="1.4"/><line x1="40" y1="30" x2="33" y2="30" stroke="#b07828" stroke-width="1.4"/><line x1="40" y1="36" x2="33" y2="36" stroke="#b07828" stroke-width="1.4"/><line x1="40" y1="42" x2="33" y2="42" stroke="#b07828" stroke-width="1.4"/><line x1="40" y1="48" x2="33" y2="48" stroke="#b07828" stroke-width="1.4"/><line x1="98" y1="24" x2="105" y2="24" stroke="#b07828" stroke-width="1.4"/><line x1="98" y1="30" x2="105" y2="30" stroke="#b07828" stroke-width="1.4"/><line x1="98" y1="36" x2="105" y2="36" stroke="#b07828" stroke-width="1.4"/><line x1="98" y1="42" x2="105" y2="42" stroke="#b07828" stroke-width="1.4"/><line x1="98" y1="48" x2="105" y2="48" stroke="#b07828" stroke-width="1.4"/><rect x="121" y="12" width="58" height="42" rx="4" fill="url(#chip-body)" stroke="#603008" stroke-width="1.2"/><rect x="129" y="20" width="42" height="28" rx="2.5" fill="url(#die-fill)" stroke="#382404" stroke-width=".6"/><text x="150" y="36" text-anchor="middle" font-size="7.5" fill="#f0c858" font-family="'Helvetica Neue',sans-serif" font-weight="700">Mem</text><rect x="202" y="18" width="58" height="42" rx="4" fill="url(#chip-body)" stroke="#603008" stroke-width="1.2"/><rect x="210" y="26" width="42" height="28" rx="2.5" fill="url(#die-fill)" stroke="#382404" stroke-width=".6"/><text x="231" y="42" text-anchor="middle" font-size="7.5" fill="#f0c858" font-family="'Helvetica Neue',sans-serif" font-weight="700">NPU</text><text x="214" y="76" text-anchor="middle" font-size="9" fill="#f0d898" stroke="#382404" stroke-width="2.8" paint-order="stroke" font-family="'Helvetica Neue',sans-serif" font-weight="800" letter-spacing=".4">DISCRETE CHIPS</text></svg><div class="lr"><div class="ldot" style="background:#885010"></div><div class="lline" style="background:linear-gradient(to right,#885010,#ddd)"></div><div><span class="lname" style="color:#603008">Discrete Chips</span><span class="lsub">RISC-V · Mem · NPU</span></div></div></div>
<div class="conn a0"><div class="cdot"></div><div class="cdot"></div><div class="cdot"></div></div>
<div class="slab a0"><svg width="300" height="88" viewBox="0 0 300 88" overflow="visible"><defs><linearGradient id="ip-top" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8f7f4"/><stop offset="50%" stop-color="#e0ddd8"/><stop offset="100%" stop-color="#c8c5c0"/></linearGradient><linearGradient id="ip-r" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#585550"/><stop offset="100%" stop-color="#383530"/></linearGradient><linearGradient id="ip-l" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#888480"/><stop offset="100%" stop-color="#585550"/></linearGradient><linearGradient id="ip-chip" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c8c6c0"/><stop offset="100%" stop-color="#a0a09a"/></linearGradient><linearGradient id="ip-die" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#787470"/><stop offset="100%" stop-color="#585450"/></linearGradient></defs><polygon points="150,5 278,40 150,60 22,40" fill="url(#ip-top)" stroke="#383530" stroke-width="1.3"/><polygon points="278,40 278,60 150,80 150,60" fill="url(#ip-r)" stroke="#383530" stroke-width="1.3"/><polygon points="22,40 22,60 150,80 150,60" fill="url(#ip-l)" stroke="#383530" stroke-width="1.3"/><rect x="40" y="28" width="26" height="20" rx="3" fill="url(#ip-chip)" stroke="#585550" stroke-width=".8"/><rect x="73" y="22" width="26" height="20" rx="3" fill="url(#ip-chip)" stroke="#585550" stroke-width=".8"/><rect x="106" y="17" width="26" height="20" rx="3" fill="url(#ip-chip)" stroke="#585550" stroke-width=".8"/><rect x="148" y="16" width="26" height="20" rx="3" fill="url(#ip-chip)" stroke="#585550" stroke-width=".8"/><rect x="178" y="18" width="26" height="20" rx="3" fill="url(#ip-chip)" stroke="#585550" stroke-width=".8"/><rect x="214" y="22" width="26" height="20" rx="3" fill="url(#ip-chip)" stroke="#585550" stroke-width=".8"/><rect x="43" y="31" width="20" height="14" rx="2" fill="url(#ip-die)" stroke="#383530" stroke-width=".3"/><rect x="76" y="25" width="20" height="14" rx="2" fill="url(#ip-die)" stroke="#383530" stroke-width=".3"/><rect x="109" y="20" width="20" height="14" rx="2" fill="url(#ip-die)" stroke="#383530" stroke-width=".3"/><rect x="151" y="19" width="20" height="14" rx="2" fill="url(#ip-die)" stroke="#383530" stroke-width=".3"/><rect x="181" y="21" width="20" height="14" rx="2" fill="url(#ip-die)" stroke="#383530" stroke-width=".3"/><rect x="217" y="25" width="20" height="14" rx="2" fill="url(#ip-die)" stroke="#383530" stroke-width=".3"/><text x="53" y="40" text-anchor="middle" font-size="6.5" fill="#282624" font-family="'Helvetica Neue',sans-serif" font-weight="700">Ibex</text><text x="86" y="34" text-anchor="middle" font-size="6.5" fill="#282624" font-family="'Helvetica Neue',sans-serif" font-weight="700">OT</text><text x="119" y="29" text-anchor="middle" font-size="6.5" fill="#282624" font-family="'Helvetica Neue',sans-serif" font-weight="700">DMA</text><text x="161" y="28" text-anchor="middle" font-size="6.5" fill="#282624" font-family="'Helvetica Neue',sans-serif" font-weight="700">NPU</text><text x="191" y="30" text-anchor="middle" font-size="6.5" fill="#282624" font-family="'Helvetica Neue',sans-serif" font-weight="700">MEM</text><text x="227" y="34" text-anchor="middle" font-size="6.5" fill="#282624" font-family="'Helvetica Neue',sans-serif" font-weight="700">GPIO</text><polygon points="112,60 188,60 200,68 100,68" fill="url(#ip-chip)" stroke="#888480" stroke-width="1.1"/><path d="M100,68 Q93,76 97,82 L150,86 L203,82 Q207,76 200,68 Z" fill="#b0aaa8" stroke="#888480" stroke-width="1.1"/><text x="214" y="76" text-anchor="middle" font-size="9" fill="#f0eee8" stroke="#282624" stroke-width="2.8" paint-order="stroke" font-family="'Helvetica Neue',sans-serif" font-weight="800" letter-spacing=".4">IP BLOCKS</text></svg><div class="ll"><div class="ldot" style="background:#585550"></div><div class="lline" style="background:linear-gradient(to left,#585550,#ddd)"></div><div><span class="lname" style="color:#383530">IP Blocks</span><span class="lsub">Ibex · OT · DMA · NPU</span></div></div></div>
</div></div>
<div class="legend">
<div class="li"><div class="ld" style="background:#e0ddd8;border:1px solid #888480"></div>IP blocks</div>
<div class="li"><div class="ld" style="background:#c08020;border:1px solid #885010"></div>Discrete chips</div>
<div class="li"><div class="ld" style="background:#5a9020;border:1px solid #3a6c10"></div>SoC / Module</div>
<div class="li"><div class="ld" style="background:#5848b8;border:1px solid #3a3088"></div>Middleware</div>
<div class="li"><div class="ld" style="background:#2868b0;border:1px solid #103870"></div>Application API</div>
</div>
<div class="ekey">
<div class="ek" style="color:#B7410E"><div class="ekd" style="background:#B7410E"></div>Code Engine <span style="font-weight:400;color:#bbb;font-size:9px">API · MW</span></div>
<div class="ek" style="color:#0071c5"><div class="ekd" style="background:#0071c5"></div>Chip Engine <span style="font-weight:400;color:#bbb;font-size:9px">SoC · Chips</span></div>
<div class="ek" style="color:#7B3F00"><div class="ekd" style="background:#7B3F00"></div>Core Engine <span style="font-weight:400;color:#bbb;font-size:9px">IP Blocks</span></div>
</div>`;

  return (
    <div data-testid="engine-arch-diagram" className="tv-eng">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

/* ── 7-Stage Build Simulation ── */
const simulationStages = [
  { num: 1, title: "Requirement", badge: "Input", color: "#111", badgeBg: "#111", badgeText: "#fff", icon: Wrench, desc: "Natural language mission input parsed by TrusteD-V Engine to identify domain, constraints, and target architecture.", details: ["Mission specification", "Domain detection", "Architecture selection"] },
  { num: 2, title: "Requirement Decomposition", badge: "Analysis", color: "#5F5E5A", badgeBg: "#F1EFE8", badgeText: "#444", icon: Layers, desc: "Requirements broken into functional blocks (Sensing, Compute, Power, Security) and mapped to hardware and software needs.", details: ["Sensing & I/O mapping", "Compute & NPU allocation", "Security requirements"] },
  { num: 3, title: "Core Engine: IP Accumulation", badge: "Core Engine", color: "#7B3F00", badgeBg: "#7B3F00", badgeText: "#FEF9F2", icon: CircuitBoard, desc: "Open-source and commercial IPs selected, verified, and composed into the RISC-V architecture.", chips: ["Ibex RV32IMC", "OpenTitan", "NPU IP", "AES-256", "DMA ctrl", "UART/SPI/I2C"], progress: [{ label: "Open IP", pct: 78, color: "#EF9F27" }, { label: "Custom IP", pct: 22, color: "#BA7517" }] },
  { num: 4, title: "Chip Engine: SoC Integration", badge: "Chip Engine", color: "#0071c5", badgeBg: "#0071c5", badgeText: "#fff", icon: Cpu, desc: "IPs fused into chips, unified into SoC with AXI bus fabric. PCB designed and BOM finalized.", details: ["RISC-V SoC unified", "RF chip (LoRa+UHF)", "Memory map locked", "PCB + BOM ready"] },
  { num: 5, title: "Code Engine: Firmware & API", badge: "Code Engine", color: "#B7410E", badgeBg: "#B7410E", badgeText: "#fff", icon: Code, desc: "Rust firmware auto-generated from hardware abstraction map. Full middleware and application API stack built.", progress: [{ label: "Firmware", pct: 100, color: "#B7410E" }, { label: "Middleware", pct: 100, color: "#D85A30" }, { label: "APIs", pct: 100, color: "#F0997B" }] },
  { num: 6, title: "Simulation & Testing", badge: "Verification", color: "#0F6E56", badgeBg: "#0F6E56", badgeText: "#E1F5EE", icon: FlaskConical, desc: "Hardware and software tested together in a closed-loop simulation environment before tape-out.", progress: [{ label: "HW sim", pct: 100, color: "#0F6E56" }, { label: "SW sim", pct: 98, color: "#1D9E75" }, { label: "Coverage", pct: 98, color: "#5DCAA5" }] },
  { num: 7, title: "Production Ready", badge: "Launch", color: "#2E7D32", badgeBg: "#2E7D32", badgeText: "#fff", icon: Rocket, desc: "Verified, validated, and cleared for production deployment. Complete bill of materials and manufacturing files ready.", summary: ["10 IP blocks", "3 chips", "SoC unified", "RTOS+HAL", "All tests pass"] },
];

/* ── Rocket Launch Scene from HTML artifact ── */
/* removed - replaced with v7 engine diagram */

const Landing = () => {
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
      price: "Per-core / Annual",
      desc: "Core platform access for individual developers and small teams. RISC-V Rust software, toolchain, and IDE with annual or per-core licensing.",
      features: [
        "TrusteD-V IDE Jarvyn (Community)",
        "RISC-V Rust SDK access",
        "Community support",
        "Standard BSP templates",
        "Public documentation",
      ],
      cta: "Get Started",
      link: "/download-ide",
      highlight: false,
    },
    {
      name: "Pro",
      tagline: "Advanced Tools + Support",
      price: "Per-project / Annual",
      desc: "Advanced toolchain, priority support, and extended middleware. Per-project or annual licensing with engineering services and marketplace access.",
      features: [
        "Everything in Basic",
        "Jarvyn AI code assistant (Full)",
        "RTOS integration suite",
        "Secure Boot configuration tool",
        "Priority engineering support",
        "Marketplace access (per-device)",
        "Hardware simulation environment",
      ],
      cta: "Talk to Sales",
      link: "/contact-sales?plan=pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      tagline: "Customization + SLA",
      price: "Custom / SLA",
      desc: "Full customization, dedicated professional services, integration support, and SLA-backed guarantees for production deployments.",
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
      link: "/contact-sales?plan=enterprise",
      highlight: false,
    },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      {/* ══ HERO SECTION ══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 relative">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left: Brand + Content + MII */}
            <div>
              {/* Brand Lockup: Logo + TrusteD-V + Powered by Bosch */}
              <div className="flex items-start gap-4 mb-6" data-testid="hero-brand-lockup">
                <img src="/trustedv-rocket-logo.png" alt="" className="h-[80px] w-[80px] sm:h-[96px] sm:w-[96px] object-contain flex-shrink-0" data-testid="hero-logo" />
                <div className="pt-2">
                  <span className="block text-[36px] sm:text-[44px] font-extrabold tracking-tight leading-none select-none" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                    <span className="text-slate-800">T</span>
                    <span style={{ color: "#B7410E" }}>rust</span>
                    <span className="text-slate-800">eD</span>
                    <span style={{ color: "#C8A200" }}>-V</span>
                  </span>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[11px] text-slate-400 font-semibold tracking-widest uppercase">Powered by</span>
                    <img src="/bosch-logo.png" alt="Bosch" className="h-[16px] object-contain" />
                  </div>
                </div>
              </div>
              
              {/* Heading + Description */}
              <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-foreground tracking-tight mb-3 leading-[1.2]" data-testid="hero-heading">
                Build your secure{" "}
                <span className="text-[#003262]">RISC-V</span> Solution
              </h1>
              
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-md">
                The silicon-to-application platform for RISC-V embedded development. 
                From IP blocks to production firmware, everything powered by <strong className="text-foreground">Rust</strong>.
              </p>
              
              {/* Made in India - Large */}
              <div data-testid="made-in-india-badge">
                <img 
                  src="/make-in-india.jpg" 
                  alt="Make in India" 
                  className="w-full max-w-[420px] rounded-xl shadow-xl border border-slate-200/80" 
                />
                <p className="text-sm text-muted-foreground mt-3 font-medium">Designed in India, Engineered in Bosch to the world</p>
              </div>
            </div>
            
            {/* Right: Engine Diagram - desktop only */}
            <div className="hidden lg:block" data-testid="hero-engine-col">
              <div className="text-center mb-1">
                <h3 className="text-xs font-extrabold tracking-tight">
                  <span className="text-foreground">T</span>
                  <span className="text-[#B7410E]">rust</span>
                  <span className="text-foreground">eD</span>
                  <span className="text-[#C8A200]">-V</span>
                  <span className="text-[#2E7D32]"> Engine</span>
                </h3>
              </div>
              <EngineArchDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4 DOMAINS ══ */}
      <section className="py-10 bg-white border-t border-border" data-testid="domains-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Industries We Serve</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">We Cater to 4 Key Domains</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Cog, title: "Automotive", desc: "ADAS, telematics, and in-vehicle networking on RISC-V.", color: "#0071c5" },
              { icon: Radio, title: "IoT", desc: "Smart sensors, edge gateways, and connected devices.", color: "#2E7D32" },
              { icon: Cpu, title: "Consumer Electronics", desc: "Wearables, home automation, and multimedia SoCs.", color: "#B7410E" },
              { icon: Server, title: "Data Center", desc: "Accelerators, SmartNICs, and infrastructure processors.", color: "#7B3F00" },
            ].map((domain, i) => {
              const Icon = domain.icon;
              return (
                <RevealItem key={i} delay={i * 100}>
                  <Card data-testid={`domain-card-${i}`} className="text-center hover:shadow-lg transition-all border-border group h-full">
                    <CardContent className="p-5">
                      <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-colors" style={{ backgroundColor: `${domain.color}12` }}>
                        <Icon className="w-6 h-6 transition-colors" style={{ color: domain.color }} />
                      </div>
                      <h3 className="font-bold text-foreground text-sm mb-1">{domain.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{domain.desc}</p>
                    </CardContent>
                  </Card>
                </RevealItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 7-STAGE BUILD PIPELINE ══ */}
      <section className="py-16 bg-white border-t border-border overflow-hidden" data-testid="simulation-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">TrusteD-V Engine</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">
              Requirement &rarr; IP &rarr; Chips &rarr; SoC &rarr; Firmware &rarr; Sim &rarr; Launch
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              See the complete build pipeline: from a natural-language requirement to production-ready hardware and firmware.
            </p>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-slate-200 via-slate-300 to-green-300 hidden md:block" />
            
            <div className="space-y-6">
              {simulationStages.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <RevealItem key={i} delay={i * 100}>
                    <div className="flex gap-4 md:gap-6 items-start relative" data-testid={`sim-stage-${stage.num}`}>
                      <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-2" style={{ backgroundColor: `${stage.color}10`, borderColor: stage.color }}>
                        <Icon className="w-6 h-6" style={{ color: stage.color }} />
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center border-2 border-white" style={{ backgroundColor: stage.color, color: "#fff" }}>{stage.num}</span>
                      </div>
                      <div className="flex-1 rounded-xl border bg-white p-4 hover:shadow-md transition-shadow" style={{ borderColor: `${stage.color}30` }}>
                        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                          <h4 className="font-bold text-sm text-foreground">{stage.title}</h4>
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ backgroundColor: stage.badgeBg, color: stage.badgeText }}>{stage.badge}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2">{stage.desc}</p>
                        {stage.chips && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {stage.chips.map((chip, j) => (
                              <span key={j} className="text-[10px] font-semibold px-2 py-0.5 rounded border" style={{ backgroundColor: `${stage.color}08`, borderColor: `${stage.color}30`, color: stage.color }}>{chip}</span>
                            ))}
                          </div>
                        )}
                        {stage.details && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                            {stage.details.map((d, j) => (
                              <span key={j} className="text-[10px] text-muted-foreground flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-current" />{d}</span>
                            ))}
                          </div>
                        )}
                        {stage.progress && (
                          <div className="space-y-1.5 mt-3">
                            {stage.progress.map((p, j) => (
                              <div key={j} className="flex items-center gap-2">
                                <span className="text-[9px] font-medium text-muted-foreground w-16 text-right">{p.label}</span>
                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-1000" style={{ width: `${p.pct}%`, backgroundColor: p.color }} /></div>
                                <span className="text-[9px] font-medium w-8" style={{ color: p.color }}>{p.pct === 100 ? "PASS" : `${p.pct}%`}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {stage.summary && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {stage.summary.map((s, j) => (
                              <span key={j} className="text-[9px] font-bold px-2 py-1 rounded-md border" style={{ backgroundColor: `${stage.color}10`, borderColor: `${stage.color}30`, color: stage.color }}>{s}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </div>
            
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

      {/* ══ BUSINESS PLANS ══ */}
      <section className="py-16 bg-white border-t border-border" data-testid="pricing-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Licensing & Plans</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">
              Flexible Plans for Every Team
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              From individual developers to enterprise deployments, choose the plan that scales with your RISC-V projects.
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
                    <Link to={tier.link}>
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
              4 revenue streams: RISC-V Software & Toolchain (annual/per-core), Engineering Services (custom dev), Marketplace Platform (per-device/per-deployment), Professional Services (integration & support).
            </p>
          </div>
        </div>
      </section>
      
      {/* ══ HARDWARE PARTNERS ══ */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Hardware Ecosystem</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">
              Supported <span className="text-[#003262]">RISC-V</span> Hardware
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pre-integrated support for C-DAC, Mindgrove, and Upbeat Tech RISC-V development platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {hardwarePartners.map((partner, index) => (
              <RevealItem key={index} delay={index * 80}>
                <div className="bg-white rounded-lg border border-border p-5 text-center hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-3">
                    <PartnerLogo name={partner.name} className="h-6" />
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
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
              Ready to Build Secure Embedded Systems with <span className="text-orange-300">Rust</span>?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-base sm:text-lg leading-relaxed">
              Start your RISC-V journey today with TrusteD-V IDE Jarvyn, AI-powered tools, and production-ready Rust templates.
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/product-suite" className="hover:text-white transition-colors">Product Suite</Link></li>
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/download-ide" className="hover:text-white transition-colors">IDE Jarvyn</Link></li>
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
            <TrustedVLogo size="sm" showPoweredBy={true} dark={true} />
            <p className="text-sm text-slate-400">&copy; 2026 TrusteD-V. Secure RISC-V Development Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
