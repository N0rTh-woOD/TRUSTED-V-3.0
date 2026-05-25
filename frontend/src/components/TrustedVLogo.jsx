const TrustedVLogo = ({ size = "md", className = "", showPoweredBy = false }) => {
  // All sizes use the same visual proportions - just scaled
  const scales = {
    xs: { wrap: "scale-[0.5]", origin: "origin-left" },
    sm: { wrap: "scale-[0.6]", origin: "origin-left" },
    md: { wrap: "scale-[0.75]", origin: "origin-left" },
    lg: { wrap: "scale-[0.85]", origin: "origin-left" },
    xl: { wrap: "scale-[1.35]", origin: "origin-left" },
  };

  const s = scales[size] || scales.md;

  return (
    <div className={`${className}`}>
      <div className={`${s.wrap} ${s.origin} flex items-center gap-[14px]`} style={{ width: "fit-content" }}>
        <img src="/trustedv-rocket-logo.png" alt="" className="h-[56px] w-[56px] object-contain flex-shrink-0" />
        <div>
          <span className="block text-[36px] font-extrabold tracking-tight leading-none select-none whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}>
            <span style={{ color: "#003262" }}>TRusteD</span>
            <span style={{ color: "#FDB515" }}>-V</span>
          </span>
          {showPoweredBy && (
            <p className="text-[11px] text-slate-400 font-medium mt-[3px] text-center tracking-[0.18em] whitespace-nowrap">
              Powered by Bosch
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrustedVLogo;
