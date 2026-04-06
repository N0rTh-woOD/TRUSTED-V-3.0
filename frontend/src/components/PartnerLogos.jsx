const logos = {
  cdac: ({ className = "" }) => (
    <svg className={className} viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="4" width="24" height="24" rx="4" fill="#1565C0" />
      <text x="12" y="21" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="sans-serif">C</text>
      <text x="32" y="22" fill="#1565C0" fontSize="14" fontWeight="800" fontFamily="'Helvetica Neue',Arial,sans-serif" letterSpacing="-0.5">C-DAC</text>
    </svg>
  ),
  mindgrove: ({ className = "" }) => (
    <svg className={className} viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="4" width="24" height="24" rx="4" fill="#2E7D32" />
      <text x="12" y="21" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="sans-serif">M</text>
      <text x="32" y="22" fill="#2E7D32" fontSize="13" fontWeight="700" fontFamily="'Helvetica Neue',Arial,sans-serif" letterSpacing="-0.3">Mindgrove</text>
    </svg>
  ),
  upbeat: ({ className = "" }) => (
    <svg className={className} viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="4" width="24" height="24" rx="4" fill="#E65100" />
      <text x="12" y="21" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="sans-serif">U</text>
      <text x="32" y="22" fill="#E65100" fontSize="13" fontWeight="700" fontFamily="'Helvetica Neue',Arial,sans-serif" letterSpacing="-0.3">Upbeat Tech</text>
    </svg>
  ),
};

export const PartnerLogo = ({ name, className = "" }) => {
  const key = name?.toLowerCase().replace(/[^a-z]/g, "");
  const match = key?.includes("mindgrove") ? "mindgrove" 
    : key?.includes("cdac") || key?.includes("dac") ? "cdac"
    : key?.includes("upbeat") ? "upbeat" 
    : null;
  
  if (!match || !logos[match]) return null;
  const LogoComponent = logos[match];
  return <LogoComponent className={className} />;
};

export default PartnerLogo;
