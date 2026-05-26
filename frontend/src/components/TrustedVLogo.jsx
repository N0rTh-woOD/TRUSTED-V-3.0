/**
 * TRUSTED-V Wordmark — recreated from the brand logo BMP.
 *
 * Composition:
 * - "TRUSTED" : bold heavy sans-serif, generous letter-spacing, deep navy
 * - Hyphen   : solid rectangle aligned to mid-stroke height
 * - V        : two custom paths
 *     • Cyan wedge   = chunky triangle taking the LEFT half of the V, pointing down-right
 *     • Navy slash   = thin diagonal stroke ascending up-right from the cyan apex
 *   Both reach the same top-line as TRUSTED, meet at a sharp bottom apex.
 * - "POWERED BY BOSCH" : centered under the entire lockup, soft blue
 *
 * dark=true flips navy → white and softens the Bosch line for dark surfaces.
 */
const TrustedVLogo = ({ size = "md", className = "", showPoweredBy = false, dark = false }) => {
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

  // Viewbox sized to comfortably hold TRUSTED + hyphen + V
  // x: 0..720, height: 130 (no tagline) or 200 (with tagline)
  const vbHeight = showPoweredBy ? 200 : 130;

  return (
    <div className={className} data-testid="trustedv-logo">
      <svg
        width={w}
        height={(w * vbHeight) / 720}
        viewBox={`0 0 720 ${vbHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="TRUSTED-V"
      >
        {/* TRUSTED — bold sans, generous tracking */}
        <text
          x="0"
          y="100"
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="900"
          fontSize="112"
          fill={navy}
          letterSpacing="2"
        >
          TRUSTED
        </text>

        {/* Hyphen — horizontal bar at mid-stroke */}
        <rect x="540" y="62" width="32" height="16" fill={navy} />

        {/* Stylized V — recreated from BMP design */}
        {/* Cyan wedge: chunky triangle, top-left to bottom apex, points down-right.
            Coordinates within the 720-wide viewBox:
              top-left  : (588, 18)
              top-right : (648, 18)
              apex      : (662, 110)        */}
        <path d="M 588,18 L 648,18 L 662,110 Z" fill={cyan} />

        {/* Navy thin diagonal slash, ascending up-right from cyan apex.
            top-right of slash : (720, 18)
            top-left of slash  : (704, 18)
            apex (shared bottom): the cyan apex (662,110)
            inner bottom point : (650, 110) so the slash has a slight thickness */}
        <path d="M 650,110 L 662,110 L 720,18 L 704,18 Z" fill={navy} />

        {showPoweredBy && (
          <text
            x="360"
            y="172"
            textAnchor="middle"
            fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
            fontWeight="600"
            fontSize="22"
            fill={bosch}
            letterSpacing="7"
          >
            POWERED BY BOSCH
          </text>
        )}
      </svg>
    </div>
  );
};

export default TrustedVLogo;
