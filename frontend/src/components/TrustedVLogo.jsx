import { Shield, Cpu } from "lucide-react";

const TrustedVLogo = ({ size = "md", showText = true, className = "" }) => {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-lg", subtext: "text-[9px]", iconInner: "w-4 h-4", circuit: "inset-[3px]" },
    md: { icon: "w-10 h-10", text: "text-xl", subtext: "text-[10px]", iconInner: "w-5 h-5", circuit: "inset-[3px]" },
    lg: { icon: "w-14 h-14", text: "text-2xl", subtext: "text-xs", iconInner: "w-7 h-7", circuit: "inset-1" },
    xl: { icon: "w-20 h-20", text: "text-4xl", subtext: "text-sm", iconInner: "w-10 h-10", circuit: "inset-1.5" },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${s.icon} relative group`}>
        {/* Outer container - chip shape with rounded corners */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1565C0] via-[#1976D2] to-[#0D47A1] shadow-lg shadow-primary/30 transition-shadow group-hover:shadow-xl group-hover:shadow-primary/40" />
        
        {/* Inner circuit pattern */}
        <div className={`absolute ${s.circuit} border border-white/15 rounded-md`} />
        
        {/* Central shield + V mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <Shield className={`${s.iconInner} text-white drop-shadow-sm`} strokeWidth={2} />
            {/* V watermark over shield */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 24" fill="none">
              <path d="M9 10L12 16L15 10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        
        {/* Chip pins - 4 sides */}
        <div className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-[3px] h-[6px] bg-[#1565C0] rounded-l-sm" />
        <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[3px] h-[6px] bg-[#1565C0] rounded-r-sm" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-[3px] h-[3px] w-[6px] bg-[#1565C0] rounded-t-sm" />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] h-[3px] w-[6px] bg-[#1565C0] rounded-b-sm" />
        
        {/* Subtle corner dots */}
        <div className="absolute top-[2px] left-[2px] w-[2px] h-[2px] rounded-full bg-white/20" />
        <div className="absolute top-[2px] right-[2px] w-[2px] h-[2px] rounded-full bg-white/20" />
        <div className="absolute bottom-[2px] left-[2px] w-[2px] h-[2px] rounded-full bg-white/20" />
        <div className="absolute bottom-[2px] right-[2px] w-[2px] h-[2px] rounded-full bg-white/20" />
      </div>

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
      <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#tv_grad)" />
      <rect x="4.5" y="4.5" width="31" height="31" rx="6" stroke="white" strokeOpacity="0.15" strokeWidth="0.8" fill="none" />
      
      {/* Shield path */}
      <path 
        d="M20 8L28 12V20C28 25.5 24.5 29.5 20 32C15.5 29.5 12 25.5 12 20V12L20 8Z" 
        fill="white"
        fillOpacity="0.92"
      />
      
      {/* V checkmark */}
      <path 
        d="M16 16.5L20 23.5L24 16.5" 
        stroke="#1565C0" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Chip pins */}
      <rect x="0" y="16" width="3" height="8" rx="1.5" fill="#1565C0" />
      <rect x="37" y="16" width="3" height="8" rx="1.5" fill="#1565C0" />
      <rect x="16" y="0" width="8" height="3" rx="1.5" fill="#1565C0" />
      <rect x="16" y="37" width="8" height="3" rx="1.5" fill="#1565C0" />
      
      {/* Corner pins */}
      <circle cx="6" cy="6" r="1" fill="white" fillOpacity="0.3" />
      <circle cx="34" cy="6" r="1" fill="white" fillOpacity="0.3" />
      <circle cx="6" cy="34" r="1" fill="white" fillOpacity="0.3" />
      <circle cx="34" cy="34" r="1" fill="white" fillOpacity="0.3" />
      
      <defs>
        <linearGradient id="tv_grad" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1976D2" />
          <stop offset="0.5" stopColor="#1565C0" />
          <stop offset="1" stopColor="#0D47A1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default TrustedVLogo;
