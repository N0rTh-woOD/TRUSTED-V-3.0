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

/* ── TrusteD-V Engine — Isometric 3D Diagram from artifact ── */
const EngineArchDiagram = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (!document.getElementById('tv-eng-css')) {
      const s = document.createElement('style');
      s.id = 'tv-eng-css';
      s.textContent = `
.tv-eng{width:100%;font-family:'Helvetica Neue',Arial,sans-serif}
.tv-eng .canvas{position:relative;width:340px;margin:0 auto;height:780px;overflow:visible}
.tv-eng .exhaust{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:400px;height:180px;pointer-events:none;z-index:1}
.tv-eng .stack{position:absolute;left:50%;transform:translateX(-50%);bottom:175px;width:340px;z-index:2}
.tv-eng .slab-row{position:relative;width:340px}
.tv-eng .conn{display:flex;justify-content:center;align-items:center;gap:8px;padding:3px 0}
.tv-eng .cdot{width:3px;height:3px;border-radius:50%;background:#ccc}
.tv-eng .r1{animation:tvEr .5s ease both .0s,tvEb1 4s ease-in-out infinite 1.2s}
.tv-eng .r2{animation:tvEr .5s ease both .12s,tvEb2 4s ease-in-out infinite 1.5s}
.tv-eng .r3{animation:tvEr .5s ease both .24s,tvEb3 4s ease-in-out infinite 1.8s}
.tv-eng .r4{animation:tvEr .5s ease both .36s,tvEb4 4s ease-in-out infinite 2.1s}
.tv-eng .r5{animation:tvEr .5s ease both .48s,tvEb5 3.6s ease-in-out infinite 2.4s}
.tv-eng .rnose{animation:tvEr .5s ease both .60s,tvEb5 3.6s ease-in-out infinite 2.4s}
@keyframes tvEr{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes tvEb1{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes tvEb2{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes tvEb3{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes tvEb4{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes tvEb5{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
.tv-eng .fo{animation:tvEfo .7s ease-in-out infinite;transform-origin:center bottom}
.tv-eng .fm{animation:tvEfm .5s ease-in-out infinite .06s;transform-origin:center bottom}
.tv-eng .fc{animation:tvEfc .38s ease-in-out infinite .03s;transform-origin:center bottom}
@keyframes tvEfo{0%,100%{transform:scaleY(1)scaleX(1)}33%{transform:scaleY(1.1)scaleX(.91)}66%{transform:scaleY(.9)scaleX(1.07)}}
@keyframes tvEfm{0%,100%{transform:scaleY(1)scaleX(1)}40%{transform:scaleY(1.17)scaleX(.87)}80%{transform:scaleY(.88)scaleX(1.09)}}
@keyframes tvEfc{0%,100%{transform:scaleY(1)scaleX(1)}50%{transform:scaleY(1.24)scaleX(.83)}}
.tv-eng .gp{animation:tvEgp .55s ease-in-out infinite}
@keyframes tvEgp{0%,100%{opacity:.4}50%{opacity:.75}}
.tv-eng .sp{animation:tvEsp 1.3s ease-out infinite var(--sd,0s);transform-origin:center center}
@keyframes tvEsp{0%{opacity:1;transform:translate(0,0)scale(1)}100%{opacity:0;transform:translate(var(--sx),var(--sy))scale(0)}}
.tv-eng .sm1{animation:tvEsm 2.2s ease-out infinite 0s}
.tv-eng .sm2{animation:tvEsm 2.2s ease-out infinite .72s}
.tv-eng .sm3{animation:tvEsm 2.2s ease-out infinite 1.44s}
@keyframes tvEsm{0%{opacity:.25;transform:translateY(0)scale(1)}100%{opacity:0;transform:translateY(-90px)scale(2.4)}}
.tv-eng .legend{display:flex;justify-content:center;gap:12px;margin-top:10px;flex-wrap:wrap}
.tv-eng .li{display:flex;align-items:center;gap:4px;font-size:9px;color:#999}
.tv-eng .ld{width:8px;height:8px;border-radius:2px;flex-shrink:0}
.tv-eng .ekey{display:flex;justify-content:center;gap:14px;margin-top:6px;flex-wrap:wrap}
.tv-eng .ek{display:flex;align-items:center;gap:4px;font-size:9px;font-weight:800}
.tv-eng .ekd{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.tv-eng .eks{font-weight:400;color:#aaa;font-size:8px}
      `;
      document.head.appendChild(s);
    }
  }, []);

  const html = `<div class="canvas">
<div class="exhaust"><svg width="400" height="180" viewBox="50 30 400 190" overflow="visible">
<ellipse class="gp" cx="250" cy="210" rx="160" ry="13" fill="#FF8C00" opacity=".18"/>
<ellipse class="gp" cx="250" cy="210" rx="110" ry="9" fill="#FFA500" opacity=".24"/>
<ellipse class="gp" cx="250" cy="210" rx="68" ry="6" fill="#FFD700" opacity=".32"/>
<path d="M214,122 Q174,150 102,180 Q144,162 204,144 Z" fill="#FF5500" opacity=".18"/>
<path d="M286,122 Q326,150 398,180 Q356,162 296,144 Z" fill="#FF5500" opacity=".18"/>
<ellipse class="sm1" cx="210" cy="116" rx="40" ry="20" fill="#c0c0c0" opacity=".2"/>
<ellipse class="sm2" cx="290" cy="106" rx="32" ry="18" fill="#ccc" opacity=".17"/>
<ellipse class="sm3" cx="250" cy="94" rx="24" ry="14" fill="#ddd" opacity=".14"/>
<g class="fo"><path d="M200,135 Q180,96 202,60 Q216,28 230,10 Q240,0 250,2 Q260,0 270,10 Q284,28 298,60 Q320,96 300,135 Z" fill="#FF4400" opacity=".5"/></g>
<g class="fm"><path d="M213,135 Q198,100 214,72 Q225,46 237,24 Q243,10 250,12 Q257,10 263,24 Q275,46 286,72 Q302,100 287,135 Z" fill="#FF8800" opacity=".75"/></g>
<g class="fc"><path d="M226,135 Q215,104 228,78 Q237,56 245,38 Q248,24 250,26 Q252,24 255,38 Q263,56 272,78 Q285,104 274,135 Z" fill="#FFB800" opacity=".9"/></g>
<g class="fc"><path d="M235,135 Q228,108 237,86 Q243,66 248,50 Q249,38 250,40 Q251,38 252,50 Q257,66 263,86 Q272,108 265,135 Z" fill="#FFE840" opacity=".97"/><path d="M241,135 Q238,112 243,92 Q247,76 250,62 Q253,76 257,92 Q262,112 259,135 Z" fill="#FFFFF0" opacity="1"/></g>
<circle class="sp" style="--sx:-32px;--sy:-48px;--sd:0s" cx="224" cy="116" r="2.5" fill="#FFD700"/>
<circle class="sp" style="--sx:36px;--sy:-40px;--sd:.22s" cx="276" cy="120" r="2" fill="#FF8C00"/>
<circle class="sp" style="--sx:-22px;--sy:-66px;--sd:.45s" cx="234" cy="102" r="2" fill="#FFE840"/>
<circle class="sp" style="--sx:26px;--sy:-58px;--sd:.67s" cx="266" cy="108" r="2.5" fill="#FFD700"/>
<circle class="sp" style="--sx:-44px;--sy:-30px;--sd:.9s" cx="214" cy="128" r="2" fill="#FF6600"/>
<circle class="sp" style="--sx:48px;--sy:-24px;--sd:1.1s" cx="286" cy="128" r="2.5" fill="#FFB800"/>
<path d="M212,138 Q210,118 226,112 L250,108 L274,112 Q290,118 288,138 Z" fill="#C8C6BE" stroke="#9A9890" stroke-width="1.2"/>
<path d="M220,112 L250,108 L280,112 L275,117 L250,114 L225,117 Z" fill="#B4B2A9"/>
<line x1="225" y1="112" x2="222" y2="136" stroke="#9A9890" stroke-width=".5" opacity=".5"/>
<line x1="237" y1="109" x2="234" y2="136" stroke="#9A9890" stroke-width=".5" opacity=".5"/>
<line x1="250" y1="108" x2="250" y2="136" stroke="#9A9890" stroke-width=".5" opacity=".5"/>
<line x1="263" y1="109" x2="266" y2="136" stroke="#9A9890" stroke-width=".5" opacity=".5"/>
<line x1="275" y1="112" x2="278" y2="136" stroke="#9A9890" stroke-width=".5" opacity=".5"/>
</svg></div>
<div class="stack">
<div class="slab-row rnose" style="margin-bottom:0"><svg width="340" height="100" viewBox="0 0 340 100" overflow="visible"><path d="M24,96 C52,94 84,72 114,50 C140,32 157,14 170,4 C183,14 200,32 226,50 C256,72 288,94 316,96 Z" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1.8"/><path d="M170,4 C183,14 200,32 226,50 C256,72 288,94 316,96 L296,96 C270,94 242,74 218,54 C196,36 180,18 170,4 Z" fill="#A5D6A7" stroke="none"/><line x1="170" y1="4" x2="60" y2="96" stroke="#2E7D32" stroke-width=".6" opacity=".3"/><line x1="170" y1="4" x2="110" y2="96" stroke="#2E7D32" stroke-width=".6" opacity=".3"/><line x1="170" y1="4" x2="170" y2="96" stroke="#2E7D32" stroke-width=".6" opacity=".25"/><line x1="170" y1="4" x2="230" y2="96" stroke="#2E7D32" stroke-width=".6" opacity=".3"/><line x1="170" y1="4" x2="280" y2="96" stroke="#2E7D32" stroke-width=".6" opacity=".3"/><path d="M24,96 C52,94 84,72 114,50 C140,32 157,14 170,4 C183,14 200,32 226,50 C256,72 288,94 316,96" fill="none" stroke="#1B5E20" stroke-width="2"/><circle cx="36" cy="95" r="2.2" fill="#2E7D32" opacity=".55"/><circle cx="76" cy="88" r="2.2" fill="#2E7D32" opacity=".55"/><circle cx="116" cy="72" r="2.2" fill="#2E7D32" opacity=".55"/><circle cx="148" cy="54" r="2.2" fill="#2E7D32" opacity=".55"/><circle cx="192" cy="54" r="2.2" fill="#2E7D32" opacity=".55"/><circle cx="224" cy="72" r="2.2" fill="#2E7D32" opacity=".55"/><circle cx="264" cy="88" r="2.2" fill="#2E7D32" opacity=".55"/><circle cx="304" cy="95" r="2.2" fill="#2E7D32" opacity=".55"/><circle cx="170" cy="4" r="3.5" fill="#1B5E20"/></svg></div>
<div class="slab-row r5" style="margin-top:-2px"><svg width="340" height="84" viewBox="0 0 340 84" overflow="visible"><polygon points="170,6 316,46 170,66 24,46" fill="#E6F1FB" stroke="#185FA5" stroke-width="1.4"/><polygon points="316,46 316,68 170,88 170,66" fill="#2E7CC8" stroke="#185FA5" stroke-width="1.4"/><polygon points="24,46 24,68 170,88 170,66" fill="#5EA4E8" stroke="#185FA5" stroke-width="1.4"/><rect x="76" y="26" width="34" height="14" rx="7" fill="#185FA5" stroke="#0C447C" stroke-width=".8"/><rect x="116" y="20" width="40" height="14" rx="7" fill="#185FA5" stroke="#0C447C" stroke-width=".8"/><rect x="162" y="20" width="40" height="14" rx="7" fill="#185FA5" stroke="#0C447C" stroke-width=".8"/><rect x="208" y="26" width="34" height="14" rx="7" fill="#185FA5" stroke="#0C447C" stroke-width=".8"/><text x="93" y="36" text-anchor="middle" font-size="8" fill="#E6F1FB" font-family="'Helvetica Neue',sans-serif" font-weight="700">REST</text><text x="136" y="30" text-anchor="middle" font-size="8" fill="#E6F1FB" font-family="'Helvetica Neue',sans-serif" font-weight="700">SDK</text><text x="182" y="30" text-anchor="middle" font-size="8" fill="#E6F1FB" font-family="'Helvetica Neue',sans-serif" font-weight="700">MQTT</text><text x="225" y="36" text-anchor="middle" font-size="8" fill="#E6F1FB" font-family="'Helvetica Neue',sans-serif" font-weight="700">OTA</text><text x="243" y="80" text-anchor="middle" font-size="10" fill="#fff" stroke="#042C53" stroke-width="3" paint-order="stroke" font-family="'Helvetica Neue',sans-serif" font-weight="800" letter-spacing=".5">APPLICATION API</text></svg></div>
<div class="conn r4"><div class="cdot"></div><div class="cdot"></div><div class="cdot"></div></div>
<div class="slab-row r4"><svg width="340" height="82" viewBox="0 0 340 82" overflow="visible"><polygon points="170,6 316,44 170,64 24,44" fill="#EEEDFE" stroke="#534AB7" stroke-width="1.4"/><polygon points="316,44 316,66 170,86 170,64" fill="#7F77DD" stroke="#534AB7" stroke-width="1.4"/><polygon points="24,44 24,66 170,86 170,64" fill="#AFA9EC" stroke="#534AB7" stroke-width="1.4"/><rect x="52" y="16" width="54" height="12" rx="2" fill="#7F77DD" stroke="#534AB7" stroke-width=".6"/><rect x="112" y="13" width="54" height="12" rx="2" fill="#7F77DD" stroke="#534AB7" stroke-width=".6"/><rect x="172" y="13" width="54" height="12" rx="2" fill="#7F77DD" stroke="#534AB7" stroke-width=".6"/><rect x="232" y="16" width="54" height="12" rx="2" fill="#7F77DD" stroke="#534AB7" stroke-width=".6"/><text x="79" y="25" text-anchor="middle" font-size="8" fill="#EEEDFE" font-family="'Helvetica Neue',sans-serif" font-weight="700">RTOS</text><text x="139" y="22" text-anchor="middle" font-size="8" fill="#EEEDFE" font-family="'Helvetica Neue',sans-serif" font-weight="700">HAL</text><text x="199" y="22" text-anchor="middle" font-size="8" fill="#EEEDFE" font-family="'Helvetica Neue',sans-serif" font-weight="700">Drivers</text><text x="259" y="25" text-anchor="middle" font-size="8" fill="#EEEDFE" font-family="'Helvetica Neue',sans-serif" font-weight="700">Protocols</text><text x="243" y="78" text-anchor="middle" font-size="10" fill="#fff" stroke="#26215C" stroke-width="3" paint-order="stroke" font-family="'Helvetica Neue',sans-serif" font-weight="800" letter-spacing=".5">MIDDLEWARE</text></svg></div>
<div class="conn r3"><div class="cdot"></div><div class="cdot"></div><div class="cdot"></div></div>
<div class="slab-row r3"><svg width="340" height="100" viewBox="0 0 340 100" overflow="visible"><polygon points="170,8 316,54 170,78 24,54" fill="#EAF3DE" stroke="#3B6D11" stroke-width="1.4"/><polygon points="316,54 316,80 170,104 170,78" fill="#639922" stroke="#3B6D11" stroke-width="1.4"/><polygon points="24,54 24,80 170,104 170,78" fill="#97C459" stroke="#3B6D11" stroke-width="1.4"/><rect x="96" y="24" width="148" height="44" rx="5" fill="#C0DD97" stroke="#3B6D11" stroke-width="1.2"/><rect x="104" y="30" width="32" height="18" rx="3" fill="#639922" stroke="#27500A" stroke-width=".7"/><rect x="142" y="30" width="28" height="18" rx="3" fill="#639922" stroke="#27500A" stroke-width=".7"/><rect x="176" y="30" width="28" height="18" rx="3" fill="#639922" stroke="#27500A" stroke-width=".7"/><rect x="210" y="30" width="28" height="18" rx="3" fill="#639922" stroke="#27500A" stroke-width=".7"/><text x="120" y="42" text-anchor="middle" font-size="8" fill="#EAF3DE" font-family="'Helvetica Neue',sans-serif" font-weight="700">CPU</text><text x="156" y="42" text-anchor="middle" font-size="8" fill="#EAF3DE" font-family="'Helvetica Neue',sans-serif" font-weight="700">MEM</text><text x="190" y="42" text-anchor="middle" font-size="8" fill="#EAF3DE" font-family="'Helvetica Neue',sans-serif" font-weight="700">WiFi</text><text x="224" y="42" text-anchor="middle" font-size="8" fill="#EAF3DE" font-family="'Helvetica Neue',sans-serif" font-weight="700">SEC</text><rect x="104" y="50" width="134" height="5" rx="2" fill="#3B6D11" stroke="#27500A" stroke-width=".5"/><text x="243" y="96" text-anchor="middle" font-size="10" fill="#fff" stroke="#173404" stroke-width="3" paint-order="stroke" font-family="'Helvetica Neue',sans-serif" font-weight="800" letter-spacing=".5">SoC / MODULE</text></svg></div>
<div class="conn r2"><div class="cdot"></div><div class="cdot"></div><div class="cdot"></div></div>
<div class="slab-row r2"><svg width="340" height="90" viewBox="0 0 340 90" overflow="visible"><polygon points="170,8 316,50 170,72 24,50" fill="#FEF3E2" stroke="#D4960A" stroke-width="1.4"/><polygon points="316,50 316,74 170,96 170,72" fill="#D4960A" stroke="#BA7517" stroke-width="1.4"/><polygon points="24,50 24,74 170,96 170,72" fill="#EF9F27" stroke="#BA7517" stroke-width="1.4"/><rect x="68" y="30" width="48" height="34" rx="4" fill="#EF9F27" stroke="#BA7517" stroke-width="1.2"/><rect x="75" y="37" width="34" height="20" rx="2.5" fill="#BA7517"/><rect x="78" y="40" width="28" height="14" rx="1.5" fill="#633806"/><text x="92" y="50" text-anchor="middle" font-size="8" fill="#FEF3E2" font-family="'Helvetica Neue',sans-serif" font-weight="700">RISC-V</text><line x1="68" y1="38" x2="60" y2="38" stroke="#BA7517" stroke-width="1.5"/><line x1="68" y1="44" x2="60" y2="44" stroke="#BA7517" stroke-width="1.5"/><line x1="68" y1="50" x2="60" y2="50" stroke="#BA7517" stroke-width="1.5"/><line x1="116" y1="38" x2="124" y2="38" stroke="#BA7517" stroke-width="1.5"/><line x1="116" y1="44" x2="124" y2="44" stroke="#BA7517" stroke-width="1.5"/><line x1="116" y1="50" x2="124" y2="50" stroke="#BA7517" stroke-width="1.5"/><rect x="146" y="24" width="48" height="34" rx="4" fill="#EF9F27" stroke="#BA7517" stroke-width="1.2"/><rect x="153" y="31" width="34" height="20" rx="2.5" fill="#BA7517"/><rect x="156" y="34" width="28" height="14" rx="1.5" fill="#633806"/><text x="170" y="44" text-anchor="middle" font-size="8" fill="#FEF3E2" font-family="'Helvetica Neue',sans-serif" font-weight="700">Mem</text><rect x="224" y="30" width="48" height="34" rx="4" fill="#EF9F27" stroke="#BA7517" stroke-width="1.2"/><rect x="231" y="37" width="34" height="20" rx="2.5" fill="#BA7517"/><rect x="234" y="40" width="28" height="14" rx="1.5" fill="#633806"/><text x="248" y="50" text-anchor="middle" font-size="8" fill="#FEF3E2" font-family="'Helvetica Neue',sans-serif" font-weight="700">NPU</text><line x1="224" y1="38" x2="216" y2="38" stroke="#BA7517" stroke-width="1.5"/><line x1="224" y1="44" x2="216" y2="44" stroke="#BA7517" stroke-width="1.5"/><line x1="224" y1="50" x2="216" y2="50" stroke="#BA7517" stroke-width="1.5"/><line x1="272" y1="38" x2="280" y2="38" stroke="#BA7517" stroke-width="1.5"/><line x1="272" y1="44" x2="280" y2="44" stroke="#BA7517" stroke-width="1.5"/><line x1="272" y1="50" x2="280" y2="50" stroke="#BA7517" stroke-width="1.5"/><text x="243" y="88" text-anchor="middle" font-size="10" fill="#fff" stroke="#412402" stroke-width="3" paint-order="stroke" font-family="'Helvetica Neue',sans-serif" font-weight="800" letter-spacing=".5">DISCRETE CHIPS</text></svg></div>
<div class="conn r1"><div class="cdot"></div><div class="cdot"></div><div class="cdot"></div></div>
<div class="slab-row r1"><svg width="340" height="88" viewBox="0 0 340 88" overflow="visible"><polygon points="170,8 316,50 170,70 24,50" fill="#F5F4F0" stroke="#B4B2A9" stroke-width="1.4"/><polygon points="316,50 316,72 170,92 170,70" fill="#888780" stroke="#B4B2A9" stroke-width="1.4"/><polygon points="24,50 24,72 170,92 170,70" fill="#B4B2A9" stroke="#B4B2A9" stroke-width="1.4"/><rect x="60" y="38" width="28" height="20" rx="3" fill="#D3D1C7" stroke="#888780" stroke-width=".9"/><rect x="96" y="32" width="28" height="20" rx="3" fill="#D3D1C7" stroke="#888780" stroke-width=".9"/><rect x="132" y="28" width="28" height="20" rx="3" fill="#D3D1C7" stroke="#888780" stroke-width=".9"/><rect x="168" y="28" width="28" height="20" rx="3" fill="#D3D1C7" stroke="#888780" stroke-width=".9"/><rect x="204" y="32" width="28" height="20" rx="3" fill="#D3D1C7" stroke="#888780" stroke-width=".9"/><rect x="240" y="38" width="28" height="20" rx="3" fill="#D3D1C7" stroke="#888780" stroke-width=".9"/><rect x="63" y="41" width="22" height="14" rx="1.5" fill="#B4B2A9" stroke="#5F5E5A" stroke-width=".4"/><rect x="99" y="35" width="22" height="14" rx="1.5" fill="#B4B2A9" stroke="#5F5E5A" stroke-width=".4"/><rect x="135" y="31" width="22" height="14" rx="1.5" fill="#B4B2A9" stroke="#5F5E5A" stroke-width=".4"/><rect x="171" y="31" width="22" height="14" rx="1.5" fill="#B4B2A9" stroke="#5F5E5A" stroke-width=".4"/><rect x="207" y="35" width="22" height="14" rx="1.5" fill="#B4B2A9" stroke="#5F5E5A" stroke-width=".4"/><rect x="243" y="41" width="22" height="14" rx="1.5" fill="#B4B2A9" stroke="#5F5E5A" stroke-width=".4"/><text x="74" y="50" text-anchor="middle" font-size="7" fill="#2C2C2A" font-family="'Helvetica Neue',sans-serif" font-weight="700">Ibex</text><text x="110" y="44" text-anchor="middle" font-size="7" fill="#2C2C2A" font-family="'Helvetica Neue',sans-serif" font-weight="700">OT</text><text x="146" y="40" text-anchor="middle" font-size="7" fill="#2C2C2A" font-family="'Helvetica Neue',sans-serif" font-weight="700">DMA</text><text x="182" y="40" text-anchor="middle" font-size="7" fill="#2C2C2A" font-family="'Helvetica Neue',sans-serif" font-weight="700">NPU</text><text x="218" y="44" text-anchor="middle" font-size="7" fill="#2C2C2A" font-family="'Helvetica Neue',sans-serif" font-weight="700">MEM</text><text x="254" y="50" text-anchor="middle" font-size="7" fill="#2C2C2A" font-family="'Helvetica Neue',sans-serif" font-weight="700">GPIO</text><text x="243" y="84" text-anchor="middle" font-size="10" fill="#fff" stroke="#2C2C2A" stroke-width="3" paint-order="stroke" font-family="'Helvetica Neue',sans-serif" font-weight="800" letter-spacing=".5">IP BLOCKS</text></svg></div>
</div></div>
<div class="legend">
<div class="li"><div class="ld" style="background:#D3D1C7;border:1px solid #9A9890"></div>IP blocks</div>
<div class="li"><div class="ld" style="background:#EF9F27;border:1px solid #BA7517"></div>Discrete chips</div>
<div class="li"><div class="ld" style="background:#639922;border:1px solid #3B6D11"></div>SoC / Module</div>
<div class="li"><div class="ld" style="background:#7F77DD;border:1px solid #534AB7"></div>Middleware</div>
<div class="li"><div class="ld" style="background:#378ADD;border:1px solid #185FA5"></div>Application API</div>
</div>
<div class="ekey">
<div class="ek" style="color:#B7410E"><div class="ekd" style="background:#B7410E"></div>Code Engine <span class="eks">API + MW</span></div>
<div class="ek" style="color:#0071c5"><div class="ekd" style="background:#0071c5"></div>Chip Engine <span class="eks">SoC + Chips</span></div>
<div class="ek" style="color:#7B3F00"><div class="ekd" style="background:#7B3F00"></div>Core Engine <span class="eks">IP Blocks</span></div>
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
const RocketLaunchScene = () => {
  return (
    <div className="relative w-full max-w-[500px] h-[260px] rounded-xl overflow-hidden border border-slate-200 shadow-lg" data-testid="rocket-launch-scene">
      <style>{`
        @keyframes tvBlink{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes tvGlow{0%,100%{opacity:.25}50%{opacity:.5}}
        @keyframes tvPulse{0%,100%{transform:scale(1);opacity:.3}50%{transform:scale(1.15);opacity:.15}}
        @keyframes tvBurn{0%,100%{transform:scaleY(1)scaleX(1)}33%{transform:scaleY(1.12)scaleX(.88)}66%{transform:scaleY(.88)scaleX(1.1)}}
        @keyframes tvRise{0%{transform:translateX(-50%) translateY(0)}100%{transform:translateX(-50%) translateY(-220px)}}
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 500 260" style={{position:'absolute',inset:0}}>
        <rect x="0" y="0" width="500" height="260" fill="#0d0d0d"/>
        {/* Stars */}
        <circle cx="25" cy="18" r="1" fill="#fff" opacity=".7" style={{animation:'tvBlink 2s infinite'}}/>
        <circle cx="70" cy="35" r=".8" fill="#fff" opacity=".5" style={{animation:'tvBlink 2.5s infinite .4s'}}/>
        <circle cx="110" cy="12" r="1.2" fill="#fff" opacity=".8" style={{animation:'tvBlink 1.8s infinite .8s'}}/>
        <circle cx="170" cy="30" r=".9" fill="#fff" opacity=".6" style={{animation:'tvBlink 2.2s infinite .2s'}}/>
        <circle cx="240" cy="14" r="1" fill="#fff" opacity=".7" style={{animation:'tvBlink 2.8s infinite 1s'}}/>
        <circle cx="310" cy="28" r=".8" fill="#fff" opacity=".5" style={{animation:'tvBlink 2.1s infinite .6s'}}/>
        <circle cx="370" cy="10" r="1.1" fill="#fff" opacity=".8" style={{animation:'tvBlink 1.9s infinite .3s'}}/>
        <circle cx="430" cy="25" r=".9" fill="#fff" opacity=".6" style={{animation:'tvBlink 2.4s infinite .9s'}}/>
        <circle cx="480" cy="40" r=".7" fill="#fff" opacity=".5" style={{animation:'tvBlink 2.7s infinite .1s'}}/>
        <circle cx="55" cy="55" r=".7" fill="#fff" opacity=".4" style={{animation:'tvBlink 3s infinite .7s'}}/>
        <circle cx="150" cy="65" r=".9" fill="#fff" opacity=".5" style={{animation:'tvBlink 2.3s infinite 1.2s'}}/>
        <circle cx="350" cy="55" r="1" fill="#fff" opacity=".6" style={{animation:'tvBlink 2.6s infinite .5s'}}/>
        <circle cx="460" cy="70" r=".8" fill="#fff" opacity=".4" style={{animation:'tvBlink 1.7s infinite 1.4s'}}/>
        {/* Ground */}
        <rect x="0" y="230" width="500" height="30" fill="#1a2a1a"/>
        <rect x="0" y="225" width="500" height="6" fill="#2a3a2a"/>
        {/* Launchpad */}
        <rect x="222" y="205" width="56" height="18" rx="2" fill="#333"/>
        <rect x="230" y="198" width="8" height="25" rx="2" fill="#444"/>
        <rect x="262" y="198" width="8" height="25" rx="2" fill="#444"/>
        {/* Ground glow */}
        <ellipse cx="250" cy="228" rx="50" ry="10" fill="#FF6600" opacity=".25" style={{animation:'tvGlow .5s ease-in-out infinite'}}/>
        <ellipse cx="250" cy="228" rx="34" ry="7" fill="#FF8800" opacity=".3" style={{animation:'tvGlow .5s ease-in-out infinite .15s'}}/>
        <ellipse cx="250" cy="228" rx="20" ry="4" fill="#FFD700" opacity=".4" style={{animation:'tvGlow .5s ease-in-out infinite .05s'}}/>
        {/* Smoke */}
        <ellipse cx="210" cy="218" rx="22" ry="11" fill="#555" opacity=".3" style={{animation:'tvPulse 1.8s ease-in-out infinite'}}/>
        <ellipse cx="290" cy="216" rx="18" ry="9" fill="#555" opacity=".25" style={{animation:'tvPulse 1.8s ease-in-out infinite .4s'}}/>
        <ellipse cx="250" cy="212" rx="14" ry="8" fill="#666" opacity=".2" style={{animation:'tvPulse 1.8s ease-in-out infinite .8s'}}/>
        {/* TrusteD-V label */}
        <text x="250" y="253" textAnchor="middle" fontSize="10" fill="#5DCAA5" fontFamily="'Helvetica Neue',sans-serif" fontWeight="700" letterSpacing="2">TRUSTED-V LAUNCH</text>
      </svg>
      {/* Rising rocket */}
      <div style={{position:'absolute',left:'50%',bottom:'36px',transform:'translateX(-50%)',animation:'tvRise 3.5s ease-in both 1.5s'}}>
        <svg width="44" height="80" viewBox="0 0 48 86" style={{overflow:'visible'}}>
          <path d="M24 4 C20 16 16 30 16 42 L32 42 C32 30 28 16 24 4Z" fill="#C8E6C9" stroke="#2E7D32" strokeWidth="1.2"/>
          <rect x="16" y="42" width="16" height="26" rx="2" fill="#E8EAF0" stroke="#9aa0b8" strokeWidth="1"/>
          <rect x="16" y="50" width="16" height="4" fill="#2E7D32" opacity=".6"/>
          <circle cx="24" cy="60" r="3.5" fill="#0a1830" stroke="#7a8298" strokeWidth=".8"/>
          <path d="M16 60 L8 72 L14 68 L16 64Z" fill="#97C459"/>
          <path d="M32 60 L40 72 L34 68 L32 64Z" fill="#97C459"/>
          <path d="M18 68 Q18 76 21 78 L24 80 L27 78 Q30 76 30 68Z" fill="#888"/>
          <g style={{animation:'tvBurn .55s ease-in-out infinite',transformOrigin:'24px 80px'}}>
            <path d="M19 80 Q16 92 19 98 Q22 106 24 104 Q26 106 29 98 Q32 92 29 80Z" fill="#FF5500" opacity=".6"/>
          </g>
          <g style={{animation:'tvBurn .42s ease-in-out infinite .07s',transformOrigin:'24px 80px'}}>
            <path d="M20 80 Q18 90 20 96 Q22 102 24 100 Q26 102 28 96 Q30 90 28 80Z" fill="#FF9900" opacity=".8"/>
          </g>
          <g style={{animation:'tvBurn .33s ease-in-out infinite .03s',transformOrigin:'24px 80px'}}>
            <path d="M21 80 Q20 88 21 93 Q22.5 98 24 96 Q25.5 98 27 93 Q28 88 27 80Z" fill="#FFE040" opacity=".95"/>
            <path d="M22.5 80 Q22 86 23 90 Q23.5 93 24 92 Q24.5 93 25 90 Q26 86 25.5 80Z" fill="#FFFFF0"/>
          </g>
        </svg>
      </div>
    </div>
  );
};

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
        
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-12 md:py-16 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              {/* Logo + Powered by Bosch */}
              <div className="mb-6">
                <img src="/trustedv-rocket-logo.png" alt="TrusteD-V" className="h-28 sm:h-36 w-auto object-contain mb-3" data-testid="hero-logo" />
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-semibold text-slate-500 tracking-wide">Powered by</span>
                  <img src="/bosch-logo.png" alt="Bosch" className="h-5 sm:h-6 object-contain" />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-5 leading-tight" data-testid="hero-heading">
                Build your secure <span className="text-primary">RISC-V</span> Solution
              </h1>
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
                The silicon-to-application platform for RISC-V embedded development. 
                From IP blocks to production firmware, everything powered by <strong>Rust</strong>.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
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
              
              {/* Made in India */}
              <div data-testid="made-in-india-badge" className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex flex-col gap-0 w-12 h-8 rounded overflow-hidden shadow-sm flex-shrink-0 border border-slate-200/50">
                  <div className="flex-1 bg-[#FF9933]" />
                  <div className="flex-1 bg-white relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[9px] h-[9px] rounded-full border-[1.5px] border-[#000080]" />
                    </div>
                  </div>
                  <div className="flex-1 bg-[#138808]" />
                </div>
                <div>
                  <span className="text-lg font-bold text-slate-800 tracking-wide block leading-tight">Made in India</span>
                  <span className="text-xs text-slate-500 font-medium">Engineered for the world</span>
                </div>
              </div>
            </div>
            
            {/* Rocket Launch Scene */}
            <div className="hidden lg:flex items-center justify-center">
              <RocketLaunchScene />
            </div>
          </div>
          
          {/* Mobile: Rocket below */}
          <div className="lg:hidden flex flex-col items-center mt-8 mb-4">
            <RocketLaunchScene />
          </div>
        </div>
      </section>

      {/* ══ 4 DOMAINS ══ */}
      <section className="py-12 bg-white border-t border-border" data-testid="domains-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-8">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Industries We Serve</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">We Cater to 4 Key Domains</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
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
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-colors" style={{ backgroundColor: `${domain.color}12` }}>
                        <Icon className="w-7 h-7 transition-colors" style={{ color: domain.color }} />
                      </div>
                      <h3 className="font-bold text-foreground text-base mb-1.5">{domain.title}</h3>
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
      <section className="py-20 bg-white border-t border-border overflow-hidden" data-testid="simulation-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">TrusteD-V Engine</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
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
      <section className="py-20 bg-white border-t border-border" data-testid="pricing-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Licensing & Plans</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
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
      <section className="py-20 bg-primary">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
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
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
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
