const TrustedVLogo = ({ size = "md", className = "", showPoweredBy = false, dark = false }) => {
  const sizes = {
    xs: { img: "h-6 w-6", text: "text-sm", gap: "gap-1.5" },
    sm: { img: "h-7 w-7", text: "text-base", gap: "gap-2" },
    md: { img: "h-8 w-8", text: "text-lg", gap: "gap-2" },
    lg: { img: "h-11 w-11", text: "text-2xl", gap: "gap-2.5" },
    xl: { img: "h-14 w-14", text: "text-3xl", gap: "gap-3" },
    hero: { img: "h-[72px] w-[72px]", text: "text-[40px]", gap: "gap-4" },
  };

  const s = sizes[size] || sizes.md;
  const baseColor = dark ? "text-white" : "text-slate-800";
  const subColor = dark ? "text-slate-400" : "text-slate-400";

  return (
    <div className={`${className}`}>
      <div className={`flex items-center ${s.gap}`}>
        <img src="/trustedv-rocket-logo.png" alt="" className={`${s.img} object-contain flex-shrink-0`} />
        <span className={`font-extrabold ${s.text} tracking-tight leading-none select-none`} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          <span className={baseColor}>T</span>
          <span style={{ color: "#B7410E" }}>rust</span>
          <span className={baseColor}>eD</span>
          <span style={{ color: "#C8A200" }}>-V</span>
        </span>
      </div>
      {showPoweredBy && (
        <div className="flex items-center gap-1.5 mt-1 ml-0.5">
          <span className={`text-[11px] ${subColor} font-medium tracking-wide uppercase`}>Powered by</span>
          <img src="/bosch-logo.png" alt="Bosch" className="h-[14px] object-contain" />
        </div>
      )}
    </div>
  );
};

export default TrustedVLogo;
