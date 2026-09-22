/**
 * StackVisual — animated isometric "silicon → software" stack.
 * Pulses travel up the attestation rail; each layer lights a verification mark.
 * Pure SVG + SMIL, brand blue gradation only.
 */
const CX = 250, W = 300, H = 150, D = 16;
const RAIL_X = 440, RAIL_TOP = 80, RAIL_BOTTOM = 400;
const DUR = "3.6s";

const LAYERS = [
  { cy: 380, top: "#003262", side: "#00162B", ink: "#fff", sub: "rgba(255,255,255,0.65)", title: "RISC-V SILICON", note: "SiFive · Akeana · C-DAC", die: true },
  { cy: 289, top: "#004A7F", side: "#003262", ink: "#fff", sub: "rgba(255,255,255,0.65)", title: "ROOT OF TRUST", note: "rBoot · rustBoot · Crypto" },
  { cy: 198, top: "#2486C7", side: "#004A7F", ink: "#fff", sub: "rgba(255,255,255,0.75)", title: "RUST RUNTIME", note: "RTOS · HAL · Hypervisor" },
  { cy: 107, top: "#E6F1F9", side: "#9DC8E8", ink: "#003262", sub: "#004A7F", title: "APPLICATION", note: "Automotive · Industrial · IoT", stroke: "#2486C7" },
];

const rhombus = (cy, w = W, h = H) => `${CX},${cy - h / 2} ${CX + w / 2},${cy} ${CX},${cy + h / 2} ${CX - w / 2},${cy}`;
const leftFace = (cy) => `${CX - W / 2},${cy} ${CX},${cy + H / 2} ${CX},${cy + H / 2 + D} ${CX - W / 2},${cy + D}`;
const rightFace = (cy) => `${CX},${cy + H / 2} ${CX + W / 2},${cy} ${CX + W / 2},${cy + D} ${CX},${cy + H / 2 + D}`;
const frac = (cy) => (RAIL_BOTTOM - cy) / (RAIL_BOTTOM - RAIL_TOP);

const Plate = ({ l }) => {
  const t0 = frac(l.cy).toFixed(3);
  const t1 = (frac(l.cy) + 0.05).toFixed(3);
  return (
    <g>
      <polygon points={leftFace(l.cy)} fill={l.side} />
      <polygon points={rightFace(l.cy)} fill={l.side} opacity="0.85" />
      <polygon points={rhombus(l.cy)} fill={l.top} stroke={l.stroke || "none"} strokeWidth="1" />
      {l.die && <polygon points={rhombus(l.cy, 120, 60)} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" transform={`translate(0,-${H / 2 - 36})`} />}
      {/* activation glow */}
      <polygon points={rhombus(l.cy)} fill="none" stroke="#00B4E0" strokeWidth="2" opacity="0">
        <animate attributeName="opacity" values="0;0;0.9;0;0" keyTimes={`0;${t0};${t1};${(+t1 + 0.08).toFixed(3)};1`} dur={DUR} repeatCount="indefinite" />
      </polygon>
      <text x={CX} y={l.cy + 20} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11.5" fontWeight="600" letterSpacing="1.5" fill={l.ink}>{l.title}</text>
      <text x={CX} y={l.cy + 36} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9" fill={l.sub}>{l.note}</text>
      {/* connector + verification mark */}
      <line x1={CX + W / 2} y1={l.cy} x2={RAIL_X} y2={l.cy} stroke="#CFCEC8" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx={RAIL_X} cy={l.cy} r="3" fill="#fff" stroke="#003262" strokeWidth="1.2" />
      <path d={`M${RAIL_X + 12},${l.cy} l4,4 l9,-10`} fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="22" strokeDashoffset="22">
        <animate attributeName="stroke-dashoffset" values="22;22;0;0;22" keyTimes={`0;${t0};${t1};0.985;1`} dur={DUR} repeatCount="indefinite" />
      </path>
    </g>
  );
};

const StackVisual = () => (
  <div className="relative aspect-[26/25] rounded-md border border-[#E5E4DF] bg-[#F7F7F5] overflow-hidden" data-testid="hero-visual">
    <div className="absolute inset-0 tv-grid-bg opacity-70" />
    <svg viewBox="0 0 520 500" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <g className="tv-float">
        {/* attestation rail */}
        <line x1={RAIL_X} y1={RAIL_BOTTOM} x2={RAIL_X} y2={RAIL_TOP} stroke="#003262" strokeWidth="1.2" opacity="0.35" />
        <text x={RAIL_X} y={RAIL_BOTTOM + 18} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8.5" letterSpacing="1.5" fill="#5A6472">ATTEST</text>

        {LAYERS.map((l) => <Plate key={l.title} l={l} />)}

        {/* pulses */}
        {[0, 1.8].map((delay) => (
          <circle key={delay} r="4.5" fill="#00B4E0">
            <animateMotion dur={DUR} begin={`${delay}s`} repeatCount="indefinite" path={`M${RAIL_X},${RAIL_BOTTOM} L${RAIL_X},${RAIL_TOP}`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur={DUR} begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* verified badge */}
        <g opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.3;1;1;0.3" keyTimes="0;0.9;0.95;0.985;1" dur={DUR} repeatCount="indefinite" />
          <rect x={RAIL_X - 44} y={RAIL_TOP - 34} width="88" height="22" rx="11" fill="#0F6E56" />
          <text x={RAIL_X} y={RAIL_TOP - 19} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="600" letterSpacing="1.5" fill="#fff">VERIFIED</text>
        </g>
      </g>

      {/* axis annotation */}
      <text x="24" y="120" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="2" fill="#5A6472" transform="rotate(-90 24 120)">SOFTWARE ↑</text>
      <text x="24" y="470" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="2" fill="#5A6472" transform="rotate(-90 24 470)">SILICON ↓</text>
    </svg>
    <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-widest uppercase text-[#5A6472]">
      Attested at every layer · illustrative
    </div>
  </div>
);

export default StackVisual;
