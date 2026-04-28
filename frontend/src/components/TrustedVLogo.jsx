const TrustedVLogo = ({ size = "md", className = "", showPoweredBy = false, dark = false }) => {
  const sizes = {
    xs: { img: "h-6 w-6", text: "text-sm", gap: "gap-1.5", pb: "text-[8px]", pbh: "h-[10px]", pbls: "0.2em" },
    sm: { img: "h-7 w-7", text: "text-base", gap: "gap-2", pb: "text-[9px]", pbh: "h-[11px]", pbls: "0.22em" },
    md: { img: "h-8 w-8", text: "text-lg", gap: "gap-2", pb: "text-[9px]", pbh: "h-[12px]", pbls: "0.25em" },
    lg: { img: "h-11 w-11", text: "text-2xl", gap: "gap-2.5", pb: "text-[10px]", pbh: "h-[13px]", pbls: "0.28em" },
    xl: { img: "h-14 w-14", text: "text-3xl", gap: "gap-3", pb: "text-[11px]", pbh: "h-[14px]", pbls: "0.3em" },
  };

  const s = sizes[size] || sizes.md;
  const baseColor = dark ? "text-white" : "text-slate-800";
  const subColor = dark ? "text-slate-400" : "text-slate-400";

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      <img src="/trustedv-rocket-logo.png" alt="" className={`${s.img} object-contain flex-shrink-0`} />
      <div>
        <span className={`font-extrabold ${s.text} tracking-tight leading-none select-none block`} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          <span className={baseColor}>T</span>
          <span style={{ color: "#B7410E" }}>rust</span>
          <span className={baseColor}>eD</span>
          <span style={{ color: "#FDB515" }}>-V</span>
        </span>
        {showPoweredBy && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`${s.pb} ${subColor} font-semibold uppercase`} style={{ letterSpacing: s.pbls }}>Powered by</span>
            <img src="/bosch-logo.png" alt="Bosch" className={`${s.pbh} object-contain`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrustedVLogo;
