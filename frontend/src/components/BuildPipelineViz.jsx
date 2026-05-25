import { useEffect, useRef } from "react";
import DOMPurify from "dompurify";

const PIPELINE_CSS = `
.tv-pipeline{width:100%;max-width:780px;margin:0 auto;padding:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif}
.tv-pipeline .ttl{text-align:center;margin-bottom:28px;animation:tvpFadeUp .5s ease both}
.tv-pipeline .ttl h3{font-size:22px;font-weight:800;letter-spacing:-.3px;margin:0}
.tv-pipeline .ttl p{font-size:11px;color:#aaa;margin:4px 0 0}
.tv-pipeline .steps{display:flex;flex-direction:column;gap:0;position:relative}
.tv-pipeline .steps::before{content:'';position:absolute;left:31px;top:50px;bottom:50px;width:2px;background:repeating-linear-gradient(to bottom,#e0e0e0 0,#e0e0e0 6px,transparent 6px,transparent 12px);z-index:0}
.tv-pipeline .step{display:flex;gap:16px;align-items:flex-start;position:relative;z-index:1;margin-bottom:8px;opacity:0}
.tv-pipeline .icon-wrap{width:64px;height:64px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;position:relative;background:#fff;border:2px solid #e0e0e0;overflow:visible}
.tv-pipeline .icon-wrap svg{width:32px;height:32px}
.tv-pipeline .step-num{position:absolute;top:-5px;right:-5px;width:18px;height:18px;border-radius:50%;font-size:9px;font-weight:800;display:grid;place-items:center;border:2px solid #fff}
.tv-pipeline .card{flex:1;background:#fff;border-radius:12px;border:1.5px solid #e8e6e0;padding:14px 16px;display:flex;flex-direction:column;gap:8px}
.tv-pipeline .card-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.tv-pipeline .card-title{font-size:13px;font-weight:800;color:#111;line-height:1.3}
.tv-pipeline .card-badge{font-size:9px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:3px 9px;border-radius:20px;white-space:nowrap}
.tv-pipeline .card-body{font-size:11px;color:#666;line-height:1.6}
.tv-pipeline .chip-row{display:flex;flex-wrap:wrap;gap:5px;margin-top:2px}
.tv-pipeline .chip{font-size:10px;font-weight:700;padding:3px 9px;border-radius:4px;border:1px solid;animation:tvpSlideRight .3s ease both}
.tv-pipeline .mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px}
.tv-pipeline .mini{border-radius:7px;padding:9px 11px;border:1px solid}
.tv-pipeline .mini-t{font-size:10px;font-weight:800;margin-bottom:4px}
.tv-pipeline .mini-l{list-style:none;display:flex;flex-direction:column;gap:2px}
.tv-pipeline .mini-l li{font-size:9px;color:#666;display:flex;align-items:center;gap:4px}
.tv-pipeline .mini-l li::before{content:'';width:4px;height:4px;border-radius:1px;background:currentColor;flex-shrink:0}
.tv-pipeline .prog-row{display:flex;align-items:center;gap:8px;margin-top:4px}
.tv-pipeline .prog-label{font-size:9px;font-weight:700;color:#888;width:64px;text-align:right;flex-shrink:0}
.tv-pipeline .prog-track{flex:1;height:5px;background:#f0eeea;border-radius:3px;overflow:hidden}
.tv-pipeline .prog-fill{height:100%;border-radius:3px;animation:tvpGrowBar .8s ease both var(--delay,.0s)}
.tv-pipeline .prog-pct{font-size:9px;font-weight:700;color:#888;width:28px;text-align:right;flex-shrink:0}
.tv-pipeline .sat-scene{background:#0a0e1a;border-radius:10px;overflow:hidden;height:200px;position:relative;margin-top:10px}
.tv-pipeline .sim-scene{background:#0a0f0a;border-radius:10px;overflow:hidden;height:220px;position:relative;margin-top:10px}
.tv-pipeline .launch-scene{background:#0d0d0d;border-radius:10px;overflow:hidden;height:190px;position:relative;margin-top:10px}
@keyframes tvpFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes tvpFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes tvpPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
@keyframes tvpBlink{0%,100%{opacity:1}50%{opacity:.2}}
@keyframes tvpBurnFlicker{0%,100%{transform:scaleY(1)scaleX(1)}40%{transform:scaleY(1.15)scaleX(.9)}80%{transform:scaleY(.9)scaleX(1.1)}}
@keyframes tvpGlow{0%,100%{opacity:.4}50%{opacity:.9}}
@keyframes tvpRise{0%{transform:translateX(-50%) translateY(0)}100%{transform:translateX(-50%) translateY(-260px)}}
@keyframes tvpGrowBar{from{width:0}to{width:var(--w)}}
@keyframes tvpSlideRight{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
@keyframes tvpDashFlow{to{stroke-dashoffset:-16}}
@keyframes tvpPing{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.2);opacity:0}}
@keyframes tvpLedBlink{0%,100%{fill:#00ff88;opacity:1}50%{fill:#004422;opacity:.4}}
`;

const PIPELINE_HTML = `
<div class="ttl">
  <h3><span style="color:#111">T</span><span style="color:#B7410E">rust</span><span style="color:#111">eD</span><span style="color:#FDB515">-V</span><span style="color:#2E7D32"> Engine</span> <span style="color:#888;font-weight:400;font-size:14px">Build Pipeline</span></h3>
  <p>Requirement &#8594; IP &#8594; Chips &#8594; SoC &#8594; Firmware &#8594; Simulation &#8594; Launch</p>
</div>
<div class="steps">

<!-- STEP 1 -->
<div class="step" style="animation:tvpFadeUp .5s ease both .1s">
  <div class="icon-wrap" style="border-color:#111;background:#111">
    <span class="step-num" style="background:#111;color:#fff">1</span>
    <svg viewBox="0 0 40 40" fill="none">
      <circle cx="18" cy="13" r="6" fill="#fff" opacity=".9"/>
      <path d="M6 34c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="#fff" opacity=".7"/>
      <rect x="22" y="6" width="14" height="10" rx="3" fill="#FDB515"/>
      <path d="M22 14l-3 3v-3z" fill="#FDB515"/>
      <line x1="25" y1="9" x2="33" y2="9" stroke="#111" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="25" y1="12" x2="31" y2="12" stroke="#111" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="card" style="border-color:#111">
    <div class="card-top">
      <div class="card-title">"Build a RISC-V satellite to monitor the environment"</div>
      <span class="card-badge" style="background:#111;color:#fff">Requirement</span>
    </div>
    <div class="card-body">Natural language mission &#8594; TrusteD-V Engine parses intent, identifies domain (satellite &#183; environment &#183; RISC-V) and activates all three engines.</div>
  </div>
</div>

<!-- STEP 2 -->
<div class="step" style="animation:tvpFadeUp .5s ease both .5s">
  <div class="icon-wrap" style="border-color:#5F5E5A;background:#F1EFE8">
    <span class="step-num" style="background:#5F5E5A;color:#fff">2</span>
    <svg viewBox="0 0 40 40" fill="none">
      <rect x="15" y="15" width="10" height="10" rx="2" fill="#444" opacity=".8"/>
      <rect x="4" y="4" width="10" height="10" rx="2" fill="#888780"/>
      <rect x="26" y="4" width="10" height="10" rx="2" fill="#888780"/>
      <rect x="4" y="26" width="10" height="10" rx="2" fill="#888780"/>
      <rect x="26" y="26" width="10" height="10" rx="2" fill="#888780"/>
      <line x1="20" y1="15" x2="9" y2="14" stroke="#B4B2A9" stroke-width="1.2" stroke-dasharray="2 2"/>
      <line x1="20" y1="15" x2="31" y2="14" stroke="#B4B2A9" stroke-width="1.2" stroke-dasharray="2 2"/>
      <line x1="20" y1="25" x2="9" y2="26" stroke="#B4B2A9" stroke-width="1.2" stroke-dasharray="2 2"/>
      <line x1="20" y1="25" x2="31" y2="26" stroke="#B4B2A9" stroke-width="1.2" stroke-dasharray="2 2"/>
    </svg>
  </div>
  <div class="card" style="border-color:#B4B2A9">
    <div class="card-top">
      <div class="card-title">Requirement Decomposition</div>
      <span class="card-badge" style="background:#F1EFE8;color:#444441">Analysis</span>
    </div>
    <div class="mini-grid">
      <div class="mini" style="background:#FAFAF8;border-color:#D3D1C7"><div class="mini-t" style="color:#444">Sensing</div><ul class="mini-l"><li style="color:#555">CO&#8322; &#183; air quality</li><li style="color:#555">Temp + humidity</li><li style="color:#555">VNIR imaging</li></ul></div>
      <div class="mini" style="background:#FAFAF8;border-color:#D3D1C7"><div class="mini-t" style="color:#444">Compute</div><ul class="mini-l"><li style="color:#555">RISC-V CPU</li><li style="color:#555">NPU inference</li><li style="color:#555">LoRa + UHF</li></ul></div>
      <div class="mini" style="background:#FAFAF8;border-color:#D3D1C7"><div class="mini-t" style="color:#444">Power</div><ul class="mini-l"><li style="color:#555">Solar MPPT</li><li style="color:#555">Battery mgmt</li><li style="color:#555">NAND flash</li></ul></div>
      <div class="mini" style="background:#FAFAF8;border-color:#D3D1C7"><div class="mini-t" style="color:#444">Security</div><ul class="mini-l"><li style="color:#555">Root-of-trust</li><li style="color:#555">Crypto AES-256</li><li style="color:#555">IMU &#183; GPS</li></ul></div>
    </div>
  </div>
</div>

<!-- STEP 3: CORE ENGINE -->
<div class="step" style="animation:tvpFadeUp .5s ease both 1.0s">
  <div class="icon-wrap" style="border-color:#7B3F00;background:#FEF3E2">
    <span class="step-num" style="background:#7B3F00;color:#fff">3</span>
    <svg viewBox="0 0 40 40" fill="none">
      <rect x="7" y="7" width="26" height="26" rx="4" fill="#FEF3E2" stroke="#EF9F27" stroke-width="1.5"/>
      <rect x="12" y="12" width="7" height="7" rx="1.5" fill="#EF9F27"/>
      <rect x="21" y="12" width="7" height="7" rx="1.5" fill="#BA7517"/>
      <rect x="12" y="21" width="7" height="7" rx="1.5" fill="#BA7517"/>
      <rect x="21" y="21" width="7" height="7" rx="1.5" fill="#EF9F27"/>
      <line x1="7" y1="16" x2="2" y2="16" stroke="#EF9F27" stroke-width="1.5"/>
      <line x1="7" y1="24" x2="2" y2="24" stroke="#EF9F27" stroke-width="1.5"/>
      <line x1="33" y1="16" x2="38" y2="16" stroke="#EF9F27" stroke-width="1.5"/>
      <line x1="33" y1="24" x2="38" y2="24" stroke="#EF9F27" stroke-width="1.5"/>
      <line x1="16" y1="7" x2="16" y2="2" stroke="#EF9F27" stroke-width="1.5"/>
      <line x1="24" y1="7" x2="24" y2="2" stroke="#EF9F27" stroke-width="1.5"/>
      <line x1="16" y1="33" x2="16" y2="38" stroke="#EF9F27" stroke-width="1.5"/>
      <line x1="24" y1="33" x2="24" y2="38" stroke="#EF9F27" stroke-width="1.5"/>
    </svg>
  </div>
  <div class="card" style="border-color:#EF9F27">
    <div class="card-top">
      <div class="card-title">Core Engine &#8212; IP Accumulation</div>
      <span class="card-badge" style="background:#7B3F00;color:#FEF9F2">Core Engine</span>
    </div>
    <div class="card-body">Open-source + commercial IPs selected, verified, and composed into the RISC-V architecture.</div>
    <div class="chip-row">
      <span class="chip" style="background:#FFF8EE;border-color:#EF9F27;color:#7B3F00;animation-delay:.0s">Ibex RV32IMC</span>
      <span class="chip" style="background:#FFF8EE;border-color:#EF9F27;color:#7B3F00;animation-delay:.1s">OpenTitan</span>
      <span class="chip" style="background:#FFF8EE;border-color:#EF9F27;color:#7B3F00;animation-delay:.2s">NPU IP</span>
      <span class="chip" style="background:#FFF8EE;border-color:#EF9F27;color:#7B3F00;animation-delay:.3s">ADC IP</span>
      <span class="chip" style="background:#FFF8EE;border-color:#EF9F27;color:#7B3F00;animation-delay:.4s">LoRa PHY</span>
      <span class="chip" style="background:#FFF8EE;border-color:#EF9F27;color:#7B3F00;animation-delay:.5s">AES-256</span>
      <span class="chip" style="background:#FFF8EE;border-color:#EF9F27;color:#7B3F00;animation-delay:.6s">MPPT IP</span>
      <span class="chip" style="background:#FFF8EE;border-color:#EF9F27;color:#7B3F00;animation-delay:.7s">DMA ctrl</span>
      <span class="chip" style="background:#FFF8EE;border-color:#EF9F27;color:#7B3F00;animation-delay:.8s">UART/SPI/I2C</span>
      <span class="chip" style="background:#FEF3E2;border-color:#D4960A;color:#633806;animation-delay:.9s">Custom sensor bus</span>
    </div>
    <div style="margin-top:6px">
      <div class="prog-row"><span class="prog-label">Open IP</span><div class="prog-track"><div class="prog-fill" style="--w:78%;width:0;background:#EF9F27;--delay:1.2s"></div></div><span class="prog-pct">78%</span></div>
      <div class="prog-row"><span class="prog-label">Custom IP</span><div class="prog-track"><div class="prog-fill" style="--w:22%;width:0;background:#BA7517;--delay:1.4s"></div></div><span class="prog-pct">22%</span></div>
    </div>
  </div>
</div>

<!-- STEP 4: CHIP ENGINE -->
<div class="step" style="animation:tvpFadeUp .5s ease both 1.6s">
  <div class="icon-wrap" style="border-color:#0071c5;background:#E6F1FB">
    <span class="step-num" style="background:#0071c5;color:#fff">4</span>
    <svg viewBox="0 0 40 40" fill="none">
      <rect x="10" y="10" width="20" height="20" rx="3" fill="#E6F1FB" stroke="#185FA5" stroke-width="1.5"/>
      <rect x="14" y="14" width="12" height="12" rx="2" fill="#185FA5"/>
      <rect x="16" y="16" width="8" height="8" rx="1" fill="#0C447C"/>
      <line x1="14" y1="5" x2="14" y2="10" stroke="#378ADD" stroke-width="1.5"/>
      <line x1="20" y1="5" x2="20" y2="10" stroke="#378ADD" stroke-width="1.5"/>
      <line x1="26" y1="5" x2="26" y2="10" stroke="#378ADD" stroke-width="1.5"/>
      <line x1="14" y1="30" x2="14" y2="35" stroke="#378ADD" stroke-width="1.5"/>
      <line x1="20" y1="30" x2="20" y2="35" stroke="#378ADD" stroke-width="1.5"/>
      <line x1="26" y1="30" x2="26" y2="35" stroke="#378ADD" stroke-width="1.5"/>
      <line x1="5" y1="14" x2="10" y2="14" stroke="#378ADD" stroke-width="1.5"/>
      <line x1="5" y1="20" x2="10" y2="20" stroke="#378ADD" stroke-width="1.5"/>
      <line x1="5" y1="26" x2="10" y2="26" stroke="#378ADD" stroke-width="1.5"/>
      <line x1="30" y1="14" x2="35" y2="14" stroke="#378ADD" stroke-width="1.5"/>
      <line x1="30" y1="20" x2="35" y2="20" stroke="#378ADD" stroke-width="1.5"/>
      <line x1="30" y1="26" x2="35" y2="26" stroke="#378ADD" stroke-width="1.5"/>
    </svg>
  </div>
  <div class="card" style="border-color:#185FA5">
    <div class="card-top">
      <div class="card-title">Chip Engine &#8212; SoC Integration + PCB</div>
      <span class="card-badge" style="background:#0071c5;color:#fff">Chip Engine</span>
    </div>
    <div class="card-body">IPs fused into chips &#183; chips unified into SoC &#183; PCB designed with AXI bus fabric.</div>
    <div class="mini-grid">
      <div class="mini" style="background:#EAF3FB;border-color:#85B7EB"><div class="mini-t" style="color:#0C447C">Chips Formed</div><ul class="mini-l"><li style="color:#185FA5">RISC-V SoC</li><li style="color:#185FA5">RF chip (LoRa+UHF)</li><li style="color:#185FA5">Power mgmt IC</li></ul></div>
      <div class="mini" style="background:#EAF3FB;border-color:#85B7EB"><div class="mini-t" style="color:#0C447C">SoC Unified</div><ul class="mini-l"><li style="color:#185FA5">Memory map locked</li><li style="color:#185FA5">AXI bus fabric</li><li style="color:#185FA5">PCB + BOM ready</li></ul></div>
    </div>
    <!-- satellite scene -->
    <div class="sat-scene">
      <svg width="100%" height="100%" style="position:absolute;inset:0">
        <circle cx="8%" cy="15%" r="1.2" fill="#fff" opacity=".8" style="animation:tvpBlink 2.1s infinite"/>
        <circle cx="20%" cy="8%" r=".8" fill="#fff" opacity=".6" style="animation:tvpBlink 3.0s infinite .5s"/>
        <circle cx="35%" cy="20%" r="1" fill="#fff" opacity=".7" style="animation:tvpBlink 2.5s infinite 1s"/>
        <circle cx="55%" cy="6%" r="1.3" fill="#fff" opacity=".9" style="animation:tvpBlink 1.8s infinite .3s"/>
        <circle cx="70%" cy="18%" r=".9" fill="#fff" opacity=".7" style="animation:tvpBlink 2.8s infinite .8s"/>
        <circle cx="85%" cy="10%" r="1.1" fill="#fff" opacity=".8" style="animation:tvpBlink 2.3s infinite 1.5s"/>
        <circle cx="15%" cy="40%" r=".8" fill="#fff" opacity=".5" style="animation:tvpBlink 2.6s infinite 1.1s"/>
        <circle cx="78%" cy="38%" r=".8" fill="#fff" opacity=".6" style="animation:tvpBlink 2.9s infinite .4s"/>
        <circle cx="50%" cy="170" r="55" fill="#1a4a8a"/>
        <ellipse cx="38%" cy="168" rx="16" ry="10" fill="#2a6a2a" opacity=".8"/>
        <ellipse cx="58%" cy="162" rx="12" ry="8" fill="#2a6a2a" opacity=".7"/>
        <circle cx="50%" cy="170" r="60" fill="none" stroke="#4a9aff" stroke-width="6" opacity=".2"/>
        <circle cx="50%" cy="170" r="68" fill="none" stroke="#4a9aff" stroke-width="1" opacity=".2" style="animation:tvpPulse 2s ease-in-out infinite"/>
        <line x1="50%" y1="80" x2="50%" y2="120" stroke="#4a9aff" stroke-width="1" stroke-dasharray="4 4" opacity=".5" style="animation:tvpBlink 1.5s ease-in-out infinite"/>
      </svg>
      <div style="position:absolute;top:18px;left:50%;transform:translateX(-50%);animation:tvpFloat 3s ease-in-out infinite">
        <svg width="110" height="52" viewBox="0 0 110 52">
          <rect x="0" y="14" width="30" height="22" rx="3" fill="#1a3a7a"/>
          <line x1="0" y1="20" x2="30" y2="20" stroke="#378ADD" stroke-width=".6" opacity=".6"/>
          <line x1="0" y1="26" x2="30" y2="26" stroke="#378ADD" stroke-width=".6" opacity=".6"/>
          <line x1="0" y1="32" x2="30" y2="32" stroke="#378ADD" stroke-width=".6" opacity=".6"/>
          <line x1="10" y1="14" x2="10" y2="36" stroke="#378ADD" stroke-width=".6" opacity=".6"/>
          <line x1="20" y1="14" x2="20" y2="36" stroke="#378ADD" stroke-width=".6" opacity=".6"/>
          <rect x="30" y="23" width="9" height="5" rx="1" fill="#888"/>
          <rect x="39" y="6" width="32" height="38" rx="5" fill="#c8ccd8" stroke="#9aa0b8" stroke-width="1"/>
          <rect x="39" y="16" width="32" height="5" fill="#d8dce8"/>
          <circle cx="55" cy="36" r="4.5" fill="#0a1830" stroke="#7a8298" stroke-width=".8"/>
          <circle cx="53" cy="34" r="2" fill="#3060a0" opacity=".7"/>
          <rect x="71" y="23" width="9" height="5" rx="1" fill="#888"/>
          <rect x="80" y="14" width="30" height="22" rx="3" fill="#1a3a7a"/>
          <line x1="80" y1="20" x2="110" y2="20" stroke="#378ADD" stroke-width=".6" opacity=".6"/>
          <line x1="80" y1="26" x2="110" y2="26" stroke="#378ADD" stroke-width=".6" opacity=".6"/>
          <line x1="80" y1="32" x2="110" y2="32" stroke="#378ADD" stroke-width=".6" opacity=".6"/>
          <line x1="90" y1="14" x2="90" y2="36" stroke="#378ADD" stroke-width=".6" opacity=".6"/>
          <line x1="100" y1="14" x2="100" y2="36" stroke="#378ADD" stroke-width=".6" opacity=".6"/>
          <line x1="55" y1="6" x2="55" y2="0" stroke="#aaa" stroke-width="1.5"/>
          <circle cx="55" cy="0" r="2.5" fill="#ff4444" style="animation:tvpBlink 1s ease-in-out infinite"/>
          <path d="M46 6 Q55 0 64 6" fill="none" stroke="#378ADD" stroke-width=".8" stroke-dasharray="3 2" opacity=".6"/>
          <path d="M40 10 Q55 -5 70 10" fill="none" stroke="#378ADD" stroke-width=".6" stroke-dasharray="3 2" opacity=".4"/>
        </svg>
      </div>
    </div>
  </div>
</div>

<!-- STEP 5: CODE ENGINE -->
<div class="step" style="animation:tvpFadeUp .5s ease both 2.2s">
  <div class="icon-wrap" style="border-color:#B7410E;background:#FFF0EB">
    <span class="step-num" style="background:#B7410E;color:#fff">5</span>
    <svg viewBox="0 0 40 40" fill="none">
      <rect x="4" y="6" width="32" height="28" rx="4" fill="#FFF0EB" stroke="#B7410E" stroke-width="1.5"/>
      <rect x="4" y="6" width="32" height="8" rx="4" fill="#B7410E"/>
      <rect x="4" y="10" width="32" height="4" fill="#B7410E"/>
      <circle cx="10" cy="10" r="2" fill="#fff" opacity=".8"/>
      <circle cx="17" cy="10" r="2" fill="#fff" opacity=".6"/>
      <circle cx="24" cy="10" r="2" fill="#fff" opacity=".4"/>
      <text x="7" y="26" font-size="8" fill="#B7410E" font-family="monospace" font-weight="700">&lt;/&gt;</text>
      <line x1="8" y1="30" x2="22" y2="30" stroke="#EF9F27" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="8" y1="34" x2="18" y2="34" stroke="#B7410E" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>
    </svg>
  </div>
  <div class="card" style="border-color:#B7410E">
    <div class="card-top">
      <div class="card-title">Code Engine &#8212; Firmware &#183; Middleware &#183; API</div>
      <span class="card-badge" style="background:#B7410E;color:#fff">Code Engine</span>
    </div>
    <div class="card-body">Rust firmware auto-generated from hardware abstraction map. Full software stack built against the SoC register definition.</div>
    <div class="mini-grid">
      <div class="mini" style="background:#FFF0EB;border-color:#F0997B"><div class="mini-t" style="color:#712B13">Middleware</div><ul class="mini-l"><li style="color:#993C1D">FreeRTOS port</li><li style="color:#993C1D">HAL + drivers</li><li style="color:#993C1D">Sensor fusion</li></ul></div>
      <div class="mini" style="background:#FFF0EB;border-color:#F0997B"><div class="mini-t" style="color:#712B13">Application API</div><ul class="mini-l"><li style="color:#993C1D">REST endpoints</li><li style="color:#993C1D">OTA + telemetry SDK</li><li style="color:#993C1D">MQTT cloud bridge</li></ul></div>
    </div>
    <div style="margin-top:6px">
      <div class="prog-row"><span class="prog-label">Firmware</span><div class="prog-track"><div class="prog-fill" style="--w:100%;width:0;background:#B7410E;--delay:2.6s"></div></div><span class="prog-pct">100%</span></div>
      <div class="prog-row"><span class="prog-label">Middleware</span><div class="prog-track"><div class="prog-fill" style="--w:100%;width:0;background:#D85A30;--delay:2.8s"></div></div><span class="prog-pct">100%</span></div>
      <div class="prog-row"><span class="prog-label">APIs</span><div class="prog-track"><div class="prog-fill" style="--w:100%;width:0;background:#F0997B;--delay:3.0s"></div></div><span class="prog-pct">100%</span></div>
    </div>
  </div>
</div>

<!-- STEP 6: SIMULATION -->
<div class="step" style="animation:tvpFadeUp .6s ease both 2.9s">
  <div class="icon-wrap" style="border-color:#0F6E56;background:#E1F5EE">
    <span class="step-num" style="background:#0F6E56;color:#fff">6</span>
    <svg viewBox="0 0 40 40" fill="none">
      <rect x="3" y="5" width="34" height="26" rx="4" fill="#E1F5EE" stroke="#0F6E56" stroke-width="1.5"/>
      <rect x="3" y="5" width="34" height="6" rx="4" fill="#0F6E56"/>
      <rect x="3" y="7" width="34" height="4" fill="#0F6E56"/>
      <rect x="6" y="14" width="28" height="14" rx="2" fill="#04342C"/>
      <polyline points="7,21 10,21 12,17 14,25 16,17 18,25 20,21 23,21 25,17 27,21 30,21 33,21" fill="none" stroke="#1D9E75" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" style="animation:tvpBlink 2s ease-in-out infinite"/>
      <line x1="6" y1="18" x2="34" y2="18" stroke="#1D9E75" stroke-width=".3" opacity=".4"/>
      <line x1="6" y1="24" x2="34" y2="24" stroke="#1D9E75" stroke-width=".3" opacity=".4"/>
      <circle cx="12" cy="34" r="2" fill="#0F6E56"/>
      <circle cx="20" cy="34" r="2" fill="#0F6E56"/>
      <circle cx="28" cy="34" r="2" fill="#0F6E56"/>
    </svg>
  </div>
  <div class="card" style="border-color:#0F6E56">
    <div class="card-top">
      <div class="card-title">Simulation &amp; Testing &#8212; Hardware + Software</div>
      <span class="card-badge" style="background:#0F6E56;color:#E1F5EE">Verification</span>
    </div>
    <div class="card-body">Unified hardware and software tested together in a closed-loop simulation environment before tape-out and deployment.</div>
    <div class="sim-scene">
      <svg width="100%" height="220" viewBox="0 0 600 220" style="position:absolute;inset:0">
        <rect x="0" y="0" width="600" height="220" fill="#0a0f0a"/>
        <line x1="0" y1="40" x2="600" y2="40" stroke="#1a2a1a" stroke-width=".5"/>
        <line x1="0" y1="80" x2="600" y2="80" stroke="#1a2a1a" stroke-width=".5"/>
        <line x1="0" y1="120" x2="600" y2="120" stroke="#1a2a1a" stroke-width=".5"/>
        <line x1="0" y1="160" x2="600" y2="160" stroke="#1a2a1a" stroke-width=".5"/>
        <line x1="100" y1="0" x2="100" y2="220" stroke="#1a2a1a" stroke-width=".5"/>
        <line x1="200" y1="0" x2="200" y2="220" stroke="#1a2a1a" stroke-width=".5"/>
        <line x1="300" y1="0" x2="300" y2="220" stroke="#1a2a1a" stroke-width=".5"/>
        <line x1="400" y1="0" x2="400" y2="220" stroke="#1a2a1a" stroke-width=".5"/>
        <line x1="500" y1="0" x2="500" y2="220" stroke="#1a2a1a" stroke-width=".5"/>
        <rect x="60" y="60" width="80" height="80" rx="6" fill="#0d1a0d" stroke="#1D9E75" stroke-width="1.5"/>
        <rect x="72" y="72" width="56" height="56" rx="3" fill="#0F6E56" opacity=".4"/>
        <rect x="78" y="78" width="44" height="44" rx="2" fill="#04342C"/>
        <text x="100" y="96" text-anchor="middle" font-size="8" fill="#5DCAA5" font-family="monospace" font-weight="700">RISC-V</text>
        <text x="100" y="108" text-anchor="middle" font-size="7" fill="#1D9E75" font-family="monospace">SoC</text>
        <circle cx="132" cy="70" r="4" style="animation:tvpLedBlink 1.1s ease-in-out infinite"/>
        <line x1="60" y1="80" x2="40" y2="80" stroke="#1D9E75" stroke-width="1" stroke-dasharray="3 2" style="animation:tvpDashFlow .8s linear infinite"/>
        <line x1="60" y1="96" x2="40" y2="96" stroke="#1D9E75" stroke-width="1" stroke-dasharray="3 2" style="animation:tvpDashFlow .8s linear infinite .2s"/>
        <line x1="60" y1="112" x2="40" y2="112" stroke="#1D9E75" stroke-width="1" stroke-dasharray="3 2" style="animation:tvpDashFlow .8s linear infinite .4s"/>
        <line x1="140" y1="80" x2="200" y2="80" stroke="#1D9E75" stroke-width="1" stroke-dasharray="3 2" style="animation:tvpDashFlow .8s linear infinite"/>
        <line x1="140" y1="96" x2="200" y2="96" stroke="#1D9E75" stroke-width="1" stroke-dasharray="3 2" style="animation:tvpDashFlow .8s linear infinite .3s"/>
        <line x1="140" y1="112" x2="200" y2="112" stroke="#1D9E75" stroke-width="1" stroke-dasharray="3 2" style="animation:tvpDashFlow .8s linear infinite .5s"/>
        <line x1="100" y1="60" x2="100" y2="40" stroke="#1D9E75" stroke-width="1" stroke-dasharray="3 2" style="animation:tvpDashFlow .8s linear infinite"/>
        <line x1="100" y1="140" x2="100" y2="170" stroke="#1D9E75" stroke-width="1" stroke-dasharray="3 2" style="animation:tvpDashFlow .8s linear infinite .2s"/>
        <rect x="210" y="65" width="60" height="55" rx="5" fill="#0d130d" stroke="#378ADD" stroke-width="1.2"/>
        <rect x="220" y="75" width="40" height="35" rx="2" fill="#042C53" opacity=".6"/>
        <text x="240" y="91" text-anchor="middle" font-size="7" fill="#85B7EB" font-family="monospace" font-weight="700">RF</text>
        <text x="240" y="102" text-anchor="middle" font-size="6" fill="#378ADD" font-family="monospace">LoRa</text>
        <circle cx="263" cy="68" r="3.5" style="animation:tvpLedBlink 1.6s ease-in-out infinite .3s"/>
        <path d="M240 65 Q250 55 260 65" fill="none" stroke="#378ADD" stroke-width=".8" stroke-dasharray="3 2" opacity=".7" style="animation:tvpPulse 1.2s ease-in-out infinite"/>
        <path d="M232 60 Q250 46 268 60" fill="none" stroke="#378ADD" stroke-width=".6" stroke-dasharray="3 2" opacity=".4" style="animation:tvpPulse 1.2s ease-in-out infinite .3s"/>
        <path d="M224 54 Q250 36 276 54" fill="none" stroke="#378ADD" stroke-width=".5" stroke-dasharray="3 2" opacity=".2" style="animation:tvpPulse 1.2s ease-in-out infinite .6s"/>
        <line x1="210" y1="90" x2="200" y2="90" stroke="#378ADD" stroke-width="1" stroke-dasharray="3 2" style="animation:tvpDashFlow .8s linear infinite"/>
        <line x1="270" y1="90" x2="320" y2="90" stroke="#378ADD" stroke-width="1" stroke-dasharray="3 2" style="animation:tvpDashFlow .8s linear infinite .4s"/>
        <rect x="320" y="70" width="70" height="50" rx="5" fill="#1a0d0d" stroke="#EF9F27" stroke-width="1.2"/>
        <text x="355" y="88" text-anchor="middle" font-size="7" fill="#FAC775" font-family="monospace" font-weight="700">CO&#8322;</text>
        <text x="355" y="99" text-anchor="middle" font-size="7" fill="#FAC775" font-family="monospace">SENSOR</text>
        <text x="355" y="110" text-anchor="middle" font-size="6" fill="#BA7517" font-family="monospace">ADC ready</text>
        <circle cx="382" cy="73" r="3" style="animation:tvpLedBlink 1.3s ease-in-out infinite .6s"/>
        <rect x="420" y="60" width="60" height="45" rx="5" fill="#1a100d" stroke="#D85A30" stroke-width="1.2"/>
        <text x="450" y="80" text-anchor="middle" font-size="7" fill="#F0997B" font-family="monospace" font-weight="700">POWER</text>
        <text x="450" y="91" text-anchor="middle" font-size="7" fill="#D85A30" font-family="monospace">MPPT</text>
        <rect x="428" y="98" width="44" height="4" rx="2" fill="#2a1a0d"/>
        <rect x="428" y="98" width="36" height="4" rx="2" fill="#EF9F27" style="animation:tvpBlink 2s ease-in-out infinite"/>
        <circle cx="472" cy="63" r="3" style="animation:tvpLedBlink 0.9s ease-in-out infinite .1s"/>
        <rect x="370" y="140" width="200" height="65" rx="6" fill="#04120a" stroke="#1D9E75" stroke-width="1.2"/>
        <text x="380" y="153" font-size="7" fill="#1D9E75" font-family="monospace">UART Monitor</text>
        <text x="380" y="164" font-size="6.5" fill="#5DCAA5" font-family="monospace" style="animation:tvpBlink 3s ease-in-out infinite">[ OK ] Boot sequence</text>
        <text x="380" y="174" font-size="6.5" fill="#5DCAA5" font-family="monospace" style="animation:tvpBlink 3s ease-in-out infinite .5s">[ OK ] HAL init complete</text>
        <text x="380" y="184" font-size="6.5" fill="#5DCAA5" font-family="monospace" style="animation:tvpBlink 3s ease-in-out infinite 1s">[ OK ] Sensor CO2=412ppm</text>
        <text x="380" y="194" font-size="6.5" fill="#9FE1CB" font-family="monospace" style="animation:tvpBlink 1s ease-in-out infinite 1.5s">&#9612;</text>
        <rect x="30" y="140" width="220" height="65" rx="6" fill="#04120a" stroke="#1D9E75" stroke-width="1.2"/>
        <text x="40" y="153" font-size="7" fill="#1D9E75" font-family="monospace">Signal Analysis</text>
        <polyline points="38,180 50,165 58,185 66,162 74,178 82,165 90,182 98,168 106,180 114,165 122,182 130,170 138,180 146,165 154,180 162,168 170,178 178,165 186,182 194,170 202,180 210,168 218,178 226,165 234,180 242,168" fill="none" stroke="#1D9E75" stroke-width="1.2" stroke-linecap="round" style="animation:tvpBlink 1.5s ease-in-out infinite"/>
        <line x1="38" y1="173" x2="242" y2="173" stroke="#1D9E75" stroke-width=".4" opacity=".3"/>
        <line x1="38" y1="185" x2="242" y2="185" stroke="#1D9E75" stroke-width=".4" opacity=".3"/>
        <line x1="38" y1="161" x2="242" y2="161" stroke="#1D9E75" stroke-width=".4" opacity=".3"/>
        <circle cx="48" cy="153" r="3" fill="#1D9E75" style="animation:tvpPing 1.5s ease-out infinite"/>
        <circle cx="48" cy="153" r="3" fill="#1D9E75"/>
        <text x="56" y="157" font-size="6" fill="#5DCAA5" font-family="monospace">HW pass</text>
        <circle cx="48" cy="163" r="3" fill="#1D9E75" style="animation:tvpPing 1.5s ease-out infinite .5s"/>
        <circle cx="48" cy="163" r="3" fill="#1D9E75"/>
        <text x="56" y="167" font-size="6" fill="#5DCAA5" font-family="monospace">SW pass</text>
        <rect x="510" y="140" width="76" height="22" rx="4" fill="#0F6E56" opacity=".9"/>
        <text x="548" y="155" text-anchor="middle" font-size="8" fill="#E1F5EE" font-family="monospace" font-weight="700">ALL PASS</text>
        <rect x="510" y="166" width="76" height="18" rx="4" fill="#1D3A1D" stroke="#1D9E75" stroke-width=".8"/>
        <text x="548" y="179" text-anchor="middle" font-size="7" fill="#5DCAA5" font-family="monospace">Coverage 98%</text>
        <rect x="510" y="188" width="76" height="18" rx="4" fill="#1D3A1D" stroke="#1D9E75" stroke-width=".8"/>
        <text x="548" y="201" text-anchor="middle" font-size="7" fill="#9FE1CB" font-family="monospace">Latency 2.4ms</text>
      </svg>
    </div>
    <div style="margin-top:10px">
      <div class="prog-row"><span class="prog-label" style="width:80px">HW sim</span><div class="prog-track"><div class="prog-fill" style="--w:100%;width:0;background:#0F6E56;--delay:3.2s"></div></div><span class="prog-pct" style="color:#0F6E56">PASS</span></div>
      <div class="prog-row"><span class="prog-label" style="width:80px">SW sim</span><div class="prog-track"><div class="prog-fill" style="--w:98%;width:0;background:#1D9E75;--delay:3.4s"></div></div><span class="prog-pct" style="color:#1D9E75">98%</span></div>
      <div class="prog-row"><span class="prog-label" style="width:80px">Integration</span><div class="prog-track"><div class="prog-fill" style="--w:100%;width:0;background:#5DCAA5;--delay:3.6s"></div></div><span class="prog-pct" style="color:#5DCAA5">PASS</span></div>
      <div class="prog-row"><span class="prog-label" style="width:80px">Coverage</span><div class="prog-track"><div class="prog-fill" style="--w:98%;width:0;background:#9FE1CB;--delay:3.8s"></div></div><span class="prog-pct" style="color:#9FE1CB">98%</span></div>
    </div>
    <div class="mini-grid" style="margin-top:8px">
      <div class="mini" style="background:#E1F5EE;border-color:#5DCAA5"><div class="mini-t" style="color:#085041">Hardware Tests</div><ul class="mini-l"><li style="color:#0F6E56">SoC register access</li><li style="color:#0F6E56">Peripheral I/O timing</li><li style="color:#0F6E56">Power consumption</li><li style="color:#0F6E56">RF link budget</li></ul></div>
      <div class="mini" style="background:#E1F5EE;border-color:#5DCAA5"><div class="mini-t" style="color:#085041">Software Tests</div><ul class="mini-l"><li style="color:#0F6E56">Boot sequence</li><li style="color:#0F6E56">Sensor data pipeline</li><li style="color:#0F6E56">OTA update flow</li><li style="color:#0F6E56">API endpoint tests</li></ul></div>
    </div>
  </div>
</div>

<!-- STEP 7: LAUNCH -->
<div class="step" style="animation:tvpFadeUp .6s ease both 3.7s">
  <div class="icon-wrap" style="border-color:#2E7D32;background:#EAF3DE">
    <span class="step-num" style="background:#2E7D32;color:#fff">7</span>
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M20 4 C16 14 15 24 15 28 L20 32 L25 28 C25 24 24 14 20 4Z" fill="#2E7D32"/>
      <path d="M15 28 L10 34 L15 32Z" fill="#639922"/>
      <path d="M25 28 L30 34 L25 32Z" fill="#639922"/>
      <ellipse cx="20" cy="18" rx="3.5" ry="3.5" fill="#E6F1FB" stroke="#185FA5" stroke-width=".8"/>
      <path d="M17 32 Q18 38 20 36 Q22 38 23 32Z" fill="#FF8800" style="animation:tvpBurnFlicker .5s ease-in-out infinite;transform-origin:20px 32px"/>
      <path d="M18.5 32 Q19.5 35 20 34 Q20.5 35 21.5 32Z" fill="#FFE040" style="animation:tvpBurnFlicker .4s ease-in-out infinite .1s;transform-origin:20px 32px"/>
    </svg>
  </div>
  <div class="card" style="border-color:#2E7D32;background:#EAF3DE">
    <div class="card-top">
      <div class="card-title">Production Ready &#8212; Verified &amp; Cleared for Launch</div>
      <span class="card-badge" style="background:#2E7D32;color:#fff"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#7dff8a;margin-right:5px;animation:tvpBlink 1.2s infinite"></span>Launch Ready</span>
    </div>
    <div class="launch-scene">
      <svg width="100%" height="190" viewBox="0 0 600 190" style="position:absolute;inset:0">
        <rect x="0" y="0" width="600" height="190" fill="#0d0d0d"/>
        <circle cx="30" cy="18" r="1" fill="#fff" opacity=".7" style="animation:tvpBlink 2s infinite"/>
        <circle cx="80" cy="35" r=".8" fill="#fff" opacity=".5" style="animation:tvpBlink 2.5s infinite .4s"/>
        <circle cx="130" cy="12" r="1.2" fill="#fff" opacity=".8" style="animation:tvpBlink 1.8s infinite .8s"/>
        <circle cx="200" cy="30" r=".9" fill="#fff" opacity=".6" style="animation:tvpBlink 2.2s infinite .2s"/>
        <circle cx="280" cy="14" r="1" fill="#fff" opacity=".7" style="animation:tvpBlink 2.8s infinite 1s"/>
        <circle cx="360" cy="28" r=".8" fill="#fff" opacity=".5" style="animation:tvpBlink 2.1s infinite .6s"/>
        <circle cx="430" cy="10" r="1.1" fill="#fff" opacity=".8" style="animation:tvpBlink 1.9s infinite .3s"/>
        <circle cx="510" cy="25" r=".9" fill="#fff" opacity=".6" style="animation:tvpBlink 2.4s infinite .9s"/>
        <circle cx="570" cy="40" r=".7" fill="#fff" opacity=".5" style="animation:tvpBlink 2.7s infinite .1s"/>
        <rect x="0" y="168" width="600" height="22" fill="#1a2a1a"/>
        <rect x="0" y="163" width="600" height="6" fill="#2a3a2a"/>
        <rect x="268" y="143" width="64" height="20" rx="2" fill="#333"/>
        <rect x="276" y="135" width="9" height="28" rx="2" fill="#444"/>
        <rect x="315" y="135" width="9" height="28" rx="2" fill="#444"/>
        <ellipse cx="300" cy="167" rx="55" ry="10" fill="#FF6600" opacity=".25" style="animation:tvpGlow .5s ease-in-out infinite"/>
        <ellipse cx="300" cy="167" rx="38" ry="7" fill="#FF8800" opacity=".3" style="animation:tvpGlow .5s ease-in-out infinite .15s"/>
        <ellipse cx="300" cy="167" rx="22" ry="4" fill="#FFD700" opacity=".4" style="animation:tvpGlow .5s ease-in-out infinite .05s"/>
        <ellipse cx="255" cy="156" rx="24" ry="12" fill="#555" opacity=".3" style="animation:tvpPulse 1.8s ease-in-out infinite"/>
        <ellipse cx="345" cy="153" rx="20" ry="10" fill="#555" opacity=".25" style="animation:tvpPulse 1.8s ease-in-out infinite .4s"/>
        <ellipse cx="300" cy="150" rx="15" ry="9" fill="#666" opacity=".2" style="animation:tvpPulse 1.8s ease-in-out infinite .8s"/>
      </svg>
      <div style="position:absolute;left:50%;bottom:26px;transform:translateX(-50%);animation:tvpRise 3.5s ease-in both 4.0s">
        <svg width="48" height="86" viewBox="0 0 48 86" style="overflow:visible">
          <path d="M24 4 C20 16 16 30 16 42 L32 42 C32 30 28 16 24 4Z" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1.2"/>
          <rect x="16" y="42" width="16" height="26" rx="2" fill="#E8EAF0" stroke="#9aa0b8" stroke-width="1"/>
          <rect x="16" y="50" width="16" height="4" fill="#2E7D32" opacity=".6"/>
          <circle cx="24" cy="60" r="3.5" fill="#0a1830" stroke="#7a8298" stroke-width=".8"/>
          <path d="M16 60 L8 72 L14 68 L16 64Z" fill="#97C459"/>
          <path d="M32 60 L40 72 L34 68 L32 64Z" fill="#97C459"/>
          <path d="M18 68 Q18 76 21 78 L24 80 L27 78 Q30 76 30 68Z" fill="#888"/>
          <g style="animation:tvpBurnFlicker .55s ease-in-out infinite;transform-origin:24px 80px">
            <path d="M19 80 Q16 92 19 98 Q22 106 24 104 Q26 106 29 98 Q32 92 29 80Z" fill="#FF5500" opacity=".6"/>
          </g>
          <g style="animation:tvpBurnFlicker .42s ease-in-out infinite .07s;transform-origin:24px 80px">
            <path d="M20 80 Q18 90 20 96 Q22 102 24 100 Q26 102 28 96 Q30 90 28 80Z" fill="#FF9900" opacity=".8"/>
          </g>
          <g style="animation:tvpBurnFlicker .33s ease-in-out infinite .03s;transform-origin:24px 80px">
            <path d="M21 80 Q20 88 21 93 Q22.5 98 24 96 Q25.5 98 27 93 Q28 88 27 80Z" fill="#FFE040" opacity=".95"/>
            <path d="M22.5 80 Q22 86 23 90 Q23.5 93 24 92 Q24.5 93 25 90 Q26 86 25.5 80Z" fill="#FFFFF0"/>
          </g>
        </svg>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-top:10px">
      <div style="text-align:center;padding:7px 4px;background:#FEF9F2;border:1px solid #EF9F27;border-radius:6px"><div style="font-size:8px;font-weight:800;color:#7B3F00;text-transform:uppercase">IP</div><div style="font-size:8px;color:#854F0B;margin-top:2px">10 blocks</div></div>
      <div style="text-align:center;padding:7px 4px;background:#E6F1FB;border:1px solid #185FA5;border-radius:6px"><div style="font-size:8px;font-weight:800;color:#0C447C;text-transform:uppercase">Chips</div><div style="font-size:8px;color:#185FA5;margin-top:2px">3 chips</div></div>
      <div style="text-align:center;padding:7px 4px;background:#EAF3DE;border:1px solid #3B6D11;border-radius:6px"><div style="font-size:8px;font-weight:800;color:#27500A;text-transform:uppercase">SoC</div><div style="font-size:8px;color:#3B6D11;margin-top:2px">unified</div></div>
      <div style="text-align:center;padding:7px 4px;background:#EEEDFE;border:1px solid #534AB7;border-radius:6px"><div style="font-size:8px;font-weight:800;color:#3C3489;text-transform:uppercase">MW</div><div style="font-size:8px;color:#534AB7;margin-top:2px">RTOS+HAL</div></div>
      <div style="text-align:center;padding:7px 4px;background:#E1F5EE;border:1px solid #0F6E56;border-radius:6px"><div style="font-size:8px;font-weight:800;color:#085041;text-transform:uppercase">SIM</div><div style="font-size:8px;color:#0F6E56;margin-top:2px">All pass</div></div>
    </div>
  </div>
</div>

</div><!-- /steps -->

<div style="display:flex;justify-content:center;gap:20px;margin-top:22px;flex-wrap:wrap">
  <div style="display:flex;align-items:center;gap:6px;font-size:11px"><span style="width:8px;height:8px;border-radius:50%;background:#7B3F00"></span><span style="font-weight:800;color:#7B3F00">Core Engine</span><span style="color:#bbb;font-size:10px">IP blocks</span></div>
  <div style="display:flex;align-items:center;gap:6px;font-size:11px"><span style="width:8px;height:8px;border-radius:50%;background:#0071c5"></span><span style="font-weight:800;color:#0071c5">Chip Engine</span><span style="color:#bbb;font-size:10px">SoC &#183; chips</span></div>
  <div style="display:flex;align-items:center;gap:6px;font-size:11px"><span style="width:8px;height:8px;border-radius:50%;background:#B7410E"></span><span style="font-weight:800;color:#B7410E">Code Engine</span><span style="color:#bbb;font-size:10px">Firmware &#183; API</span></div>
  <div style="display:flex;align-items:center;gap:6px;font-size:11px"><span style="width:8px;height:8px;border-radius:50%;background:#0F6E56"></span><span style="font-weight:800;color:#0F6E56">Verification</span><span style="color:#bbb;font-size:10px">HW + SW sim</span></div>
</div>
`;

export const BuildPipelineViz = () => {
  const ready = useRef(false);

  useEffect(() => {
    if (ready.current) return;
    ready.current = true;
    if (!document.getElementById("tv-pipeline-css")) {
      const style = document.createElement("style");
      style.id = "tv-pipeline-css";
      style.textContent = PIPELINE_CSS;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      data-testid="build-pipeline-viz"
      className="tv-pipeline"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(PIPELINE_HTML, { ADD_TAGS: ['style'], ADD_ATTR: ['style', 'class'] }) }}
    />
  );
};

export default BuildPipelineViz;
