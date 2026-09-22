/**
 * StackVisual — isometric "silicon → software" stack.
 * Intentionally static to keep the landing hero calm and stable.
 */
const CX = 246;
const W = 286;
const H = 126;
const D = 18;
const GAP = 92;
const BASE_Y = 386;
const RAIL_X = 436;

const LAYERS = [
  { label: "RISC-V SILICON", note: "SiFive · Akeana · C-DAC", top: "#00294F", side: "#001B36", ink: "#FFFFFF", sub: "rgba(255,255,255,0.58)", die: true },
  { label: "ROOT OF TRUST", note: "rBoot · rustBoot · crypto", top: "#004A7F", side: "#003262", ink: "#FFFFFF", sub: "rgba(255,255,255,0.62)" },
  { label: "RUST RUNTIME", note: "RTOS · HAL · hypervisor", top: "#2486C7", side: "#14669D", ink: "#FFFFFF", sub: "rgba(255,255,255,0.75)" },
  { label: "APPLICATION", note: "automotive · industrial · IoT", top: "#E4EFF8", side: "#AFCEE6", ink: "#003262", sub: "#0F6497", outline: "#7FB3DA" },
];

const y = (i) => BASE_Y - i * GAP;
const rhombus = (cy, w = W, h = H) => `${CX},${cy - h / 2} ${CX + w / 2},${cy} ${CX},${cy + h / 2} ${CX - w / 2},${cy}`;
const leftFace = (cy) => `${CX - W / 2},${cy} ${CX},${cy + H / 2} ${CX},${cy + H / 2 + D} ${CX - W / 2},${cy + D}`;
const rightFace = (cy) => `${CX},${cy + H / 2} ${CX + W / 2},${cy} ${CX + W / 2},${cy + D} ${CX},${cy + H / 2 + D}`;

const Plate = ({ l, index }) => {
  const cy = y(index);
  return (
    <g>
      <polygon points={leftFace(cy)} fill={l.side} />
      <polygon points={rightFace(cy)} fill={l.side} opacity="0.82" />
      <polygon points={rhombus(cy)} fill={l.top} stroke={l.outline || "rgba(255,255,255,0.10)"} strokeWidth="1" />

      {l.die && (
        <g opacity="0.28">
          {[-0.5, 0.5].map((a) =>
            [-0.5, 0.5].map((b) => (
              <polygon
                key={`${a}-${b}`}
                points={rhombus(cy, 124, 56)}
                transform={`translate(${(a + b) * 68},${(a - b) * 30})`}
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.8"
              />
            ))
          )}
        </g>
      )}

      <polygon
        points={rhombus(cy)}
        fill="none"
        stroke="#7FD2F0"
        strokeWidth="2.5"
        opacity="0.22"
      />

      <text x={CX} y={cy + 1} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="11.5" fontWeight="600" letterSpacing="1.6" fill={l.ink}>
        {l.label}
      </text>
      <text x={CX} y={cy + 18} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9.5" fill={l.sub}>
        {l.note}
      </text>

      {/* Attestation tap */}
      <line x1={CX + W / 2 - 6} y1={cy} x2={RAIL_X} y2={cy} stroke="#CFCEC8" strokeWidth="1" strokeDasharray="3 4" />
      <circle cx={RAIL_X} cy={cy} r="3.2" fill="#FFFFFF" stroke="#003262" strokeWidth="1.3" />
      <g>
        <circle cx={RAIL_X + 22} cy={cy} r="9" fill="#0F6E56" opacity="0.12" />
        <path d={`M${RAIL_X + 18},${cy} l3.2,3.4 l7,-7.6`} fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
};

const StackVisual = () => (
  <div className="relative aspect-[26/25] rounded-md border border-[#E5E4DF] bg-[#F7F7F5] overflow-hidden" data-testid="hero-visual">
    <div className="absolute inset-0 tv-grid-bg opacity-60" />
    <div className="absolute inset-0">
      <svg viewBox="0 0 520 500" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="tv-stack-glow" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#2486C7" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#2486C7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tv-rail-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#003262" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#2486C7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#003262" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="520" height="500" fill="url(#tv-stack-glow)" />
      <ellipse cx={CX} cy={BASE_Y + 62} rx="150" ry="26" fill="#003262" opacity="0.07" />

      <line x1={RAIL_X} y1={y(0) + 6} x2={RAIL_X} y2={y(3) - 44} stroke="url(#tv-rail-grad)" strokeWidth="1.5" />
      {LAYERS.map((l, index) => <Plate key={l.label} l={l} index={index} />)}

      <g>
        <circle cx={RAIL_X} cy={y(0)} r="8" fill="#2486C7" opacity="0.18" />
        <circle cx={RAIL_X} cy={y(0)} r="3.6" fill="#2486C7" />
      </g>

      <g>
        <rect x={RAIL_X - 50} y={y(3) - 62} width="100" height="22" rx="4" fill="#0F6E56" />
        <text x={RAIL_X} y={y(3) - 47} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fontWeight="600" letterSpacing="1.6" fill="#FFFFFF">
          ATTESTED
        </text>
      </g>

      <text x="26" y="150" fontFamily="'IBM Plex Mono', monospace" fontSize="9" letterSpacing="2.2" fill="#5A6472" transform="rotate(-90 26 150)">SOFTWARE ↑</text>
      <text x="26" y="432" fontFamily="'IBM Plex Mono', monospace" fontSize="9" letterSpacing="2.2" fill="#5A6472" transform="rotate(-90 26 432)">SILICON ↓</text>
      <line x1="34" y1="100" x2="34" y2="440" stroke="#CFCEC8" strokeWidth="1" />
      </svg>
    </div>
    <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.18em] uppercase text-[#5A6472]" data-testid="hero-visual-caption">
      Verified at every layer · illustrative
    </div>
  </div>
);

export default StackVisual;
