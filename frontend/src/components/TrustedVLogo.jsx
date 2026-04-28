const TrustedVLogo = ({ size = "md", className = "", showPoweredBy = false, dark = false }) => {
  const sizes = {
    xs: { img: "h-6 w-6", text: "text-sm", gap: "gap-1.5", pb: "text-[8px]", pbh: "h-[9px]" },
    sm: { img: "h-7 w-7", text: "text-base", gap: "gap-2", pb: "text-[9px]", pbh: "h-[10px]" },
    md: { img: "h-8 w-8", text: "text-lg", gap: "gap-2", pb: "text-[10px]", pbh: "h-[12px]" },
    lg: { img: "h-11 w-11", text: "text-2xl", gap: "gap-2.5", pb: "text-[11px]", pbh: "h-[13px]" },
    xl: { img: "h-14 w-14", text: "text-3xl", gap: "gap-3", pb: "text-[12px]", pbh: "h-[14px]" },
  };

  const s = sizes[size] || sizes.md;
  const subColor = dark ? "text-slate-400" : "text-slate-400";

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      <img src="/trustedv-rocket-logo.png" alt="" className={`${s.img} object-contain flex-shrink-0`} />
      <div>
        <span className={`font-extrabold ${s.text} tracking-tight leading-none select-none block`} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          <span style={{ color: "#003262" }}>TrusteD</span>
          <span style={{ color: "#FDB515" }}>-V</span>
        </span>
        {showPoweredBy && (
          <p className={`${s.pb} ${subColor} font-medium mt-0.5 text-center tracking-[0.15em]`}>Powered by <img src="/bosch-logo.png" alt="Bosch" className={`${s.pbh} inline-block align-middle ml-0.5`} /></p>
        )}
      </div>
    </div>
  );
};

export default TrustedVLogo;
