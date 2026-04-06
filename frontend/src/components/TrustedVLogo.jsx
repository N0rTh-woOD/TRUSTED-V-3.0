const TrustedVLogo = ({ size = "md", showText = true, className = "" }) => {
  const sizes = {
    sm: { img: "h-8 w-8", text: "text-lg", subtext: "text-[9px]" },
    md: { img: "h-10 w-10", text: "text-xl", subtext: "text-[10px]" },
    lg: { img: "h-14 w-14", text: "text-2xl", subtext: "text-xs" },
    xl: { img: "h-20 w-20", text: "text-4xl", subtext: "text-sm" },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src="/trustedv-logo.png" alt="TrusteD-V" className={`${s.img} object-contain`} />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${s.text} text-foreground tracking-tight leading-none`}>
            TrusteD-V
          </span>
          <span className={`${s.subtext} text-muted-foreground font-medium tracking-wider uppercase`}>
            RISC-V Rust Platform
          </span>
        </div>
      )}
    </div>
  );
};

export default TrustedVLogo;
