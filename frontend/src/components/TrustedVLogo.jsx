/**
 * TRUSTED-V Wordmark
 * - "TRUSTED" in deep navy (#0A2A6B)
 * - Stylized "V" = cyan left wedge (#00B4E0) + navy right wedge
 * - Optional "POWERED BY BOSCH" tagline in soft blue (#5B7CB8)
 * - On dark backgrounds, navy flips to white and tagline to light blue
 */
const TrustedVLogo = ({ size = "md", className = "", showPoweredBy = false, dark = false }) => {
  // size = rendered SVG width in px
  const widths = {
    xs: 96,
    sm: 130,
    md: 170,
    lg: 210,
    xl: 320,
    "2xl": 400,
  };
  const w = widths[size] || widths.md;

  const navy = dark ? "#FFFFFF" : "#0A2A6B";
  const cyan = "#00B4E0";
  const bosch = dark ? "#9DB7E0" : "#5B7CB8";

  const vbHeight = showPoweredBy ? 200 : 130;

  return (
    <div className={className} data-testid="trustedv-logo">
      <svg
        width={w}
        height={(w * vbHeight) / 560}
        viewBox={`0 0 560 ${vbHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="TRUSTED-V"
      >
        {/* TRUSTED wordmark */}
        <text
          x="0"
          y="98"
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="900"
          fontSize="106"
          fill={navy}
          letterSpacing="-3"
        >
          TRUSTED
        </text>

        {/* Hyphen */}
        <rect x="430" y="68" width="22" height="13" fill={navy} rx="1.5" />

        {/* Stylized V — left wedge (cyan) */}
        <path d="M 462,20 L 498,20 L 512,108 L 492,108 Z" fill={cyan} />
        {/* Stylized V — right wedge (navy) */}
        <path d="M 492,108 L 512,108 L 548,20 L 512,20 Z" fill={navy} />

        {showPoweredBy && (
          <text
            x="280"
            y="170"
            textAnchor="middle"
            fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
            fontWeight="600"
            fontSize="20"
            fill={bosch}
            letterSpacing="6"
          >
            POWERED BY BOSCH
          </text>
        )}
      </svg>
    </div>
  );
};

export default TrustedVLogo;
