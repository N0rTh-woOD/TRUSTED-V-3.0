const TrustedVLogo = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: { img: "h-7 w-7", text: "text-base" },
    md: { img: "h-9 w-9", text: "text-lg" },
    lg: { img: "h-12 w-12", text: "text-2xl" },
    xl: { img: "h-16 w-16", text: "text-3xl" },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/trustedv-logo.png" alt="TrusteD-V" className={`${s.img} object-contain`} />
      <span className={`font-bold ${s.text} tracking-tight leading-none`}>
        <span className="text-foreground">T</span>
        <span className="text-[#B7410E]">rust</span>
        <span className="text-foreground">eD</span>
        <span className="text-[#C8A200]">-V</span>
      </span>
    </div>
  );
};

export default TrustedVLogo;
