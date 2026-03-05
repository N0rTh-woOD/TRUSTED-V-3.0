import { Shield, Cpu } from "lucide-react";

/**
 * TrusteD-V Professional Logo Component
 * A modern, professional logo combining security (shield) with embedded systems (chip)
 * The "D-V" represents "Development-Verified" in RISC-V context
 */
const TrustedVLogo = ({ size = "md", showText = true, className = "" }) => {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-lg", subtext: "text-[9px]", iconInner: "w-4 h-4" },
    md: { icon: "w-10 h-10", text: "text-xl", subtext: "text-[10px]", iconInner: "w-5 h-5" },
    lg: { icon: "w-14 h-14", text: "text-2xl", subtext: "text-xs", iconInner: "w-7 h-7" },
    xl: { icon: "w-20 h-20", text: "text-4xl", subtext: "text-sm", iconInner: "w-10 h-10" },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Mark - Shield with embedded chip */}
      <div className={`${s.icon} relative`}>
        {/* Outer Shield - Gradient background */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/80 shadow-lg shadow-primary/25" />
        
        {/* Inner design - Chip pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Circuit lines decoration */}
          <div className="absolute inset-1 border border-white/20 rounded-md" />
          
          {/* Central shield icon */}
          <Shield className={`${s.iconInner} text-white relative z-10`} strokeWidth={2.5} />
        </div>
        
        {/* Corner accents representing chip pins */}
        <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-2 bg-primary rounded-l-sm" />
        <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1 h-2 bg-primary rounded-r-sm" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-0.5 h-1 w-2 bg-primary rounded-t-sm" />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-1 w-2 bg-primary rounded-b-sm" />
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${s.text} text-foreground tracking-tight leading-none`}>
            Truste<span className="text-primary">D-V</span>
          </span>
          <span className={`${s.subtext} text-muted-foreground font-medium tracking-wide`}>
            RISC-V × Rust Platform
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * TrusteD-V Icon Only - For favicon and compact spaces
 */
export const TrustedVIcon = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#gradient)" />
      
      {/* Inner border */}
      <rect x="5" y="5" width="30" height="30" rx="5" stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none" />
      
      {/* Shield shape */}
      <path 
        d="M20 8L28 12V20C28 25.5 24.5 29.5 20 32C15.5 29.5 12 25.5 12 20V12L20 8Z" 
        fill="white"
        fillOpacity="0.9"
      />
      
      {/* V mark inside shield */}
      <path 
        d="M16 17L20 24L24 17" 
        stroke="hsl(207, 90%, 35%)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Chip pins */}
      <rect x="0" y="17" width="3" height="6" rx="1" fill="hsl(207, 90%, 35%)" />
      <rect x="37" y="17" width="3" height="6" rx="1" fill="hsl(207, 90%, 35%)" />
      <rect x="17" y="0" width="6" height="3" rx="1" fill="hsl(207, 90%, 35%)" />
      <rect x="17" y="37" width="6" height="3" rx="1" fill="hsl(207, 90%, 35%)" />
      
      <defs>
        <linearGradient id="gradient" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(207, 90%, 40%)" />
          <stop offset="1" stopColor="hsl(207, 90%, 30%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default TrustedVLogo;
