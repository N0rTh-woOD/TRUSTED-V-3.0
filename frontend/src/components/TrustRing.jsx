/** TrustRing — looping illustration for the About page (blue gradation). */
const TrustRing = () => (
  <div className="relative w-full max-w-[360px] mx-auto aspect-square" data-testid="about-illustration">
    <svg viewBox="0 0 320 320" className="w-full h-full" aria-hidden="true">
      <circle cx="160" cy="160" r="142" fill="none" stroke="#E6F1F9" strokeWidth="16" />
      <g className="tv-spin-slow">
        <circle cx="160" cy="160" r="142" fill="none" stroke="#9DC8E8" strokeWidth="16" strokeDasharray="70 820" strokeLinecap="round" />
        <circle cx="160" cy="18" r="6" fill="#2486C7" />
      </g>
      <circle cx="160" cy="160" r="106" fill="none" stroke="#9DC8E8" strokeWidth="1.2" strokeDasharray="4 6" />
      <g className="tv-spin-rev">
        <circle cx="160" cy="160" r="106" fill="none" stroke="#2486C7" strokeWidth="10" strokeDasharray="30 636" strokeLinecap="round" />
        <circle cx="266" cy="160" r="5" fill="#004A7F" />
      </g>
      <circle cx="160" cy="160" r="72" fill="#E6F1F9" />
      <circle cx="160" cy="160" r="56" fill="#004A7F" />
      <path d="M140 160 l13 13 l28 -30" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {[["IP", 160, 44], ["SOC", 262, 218], ["FW", 58, 218]].map(([t, x, y]) => (
        <g key={t}>
          <rect x={x - 22} y={y - 11} width="44" height="22" rx="11" fill="#fff" stroke="#9DC8E8" />
          <text x={x} y={y + 3.5} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9.5" fontWeight="600" letterSpacing="1.2" fill="#004A7F">{t}</text>
        </g>
      ))}
    </svg>
  </div>
);

export default TrustRing;
