/**
 * TRUSTED-V Brand Logo — consistent sizing across the app.
 * Official brand colours (sampled from /trustedv-brand-logo.png):
 *   TRUSTED- / "Powered by Bosch"  → #004A7F
 *   V                              → #2486C7
 */
export const BOSCH_BLUE = { dark: "#004A7F", light: "#2486C7" };

/** Light → dark gradation used for cards, steps and accents site-wide. */
export const BLUE_STEPS = ["#E6F1F9", "#9DC8E8", "#56A2D6", "#2486C7", "#004A7F", "#003262"];

const TrustedVLogo = ({ size = "sm", className = "", dark = false }) => {
  const heights = { xs: 24, sm: 34, md: 40, lg: 56, xl: 88, "2xl": 120 };
  const h = heights[size] || heights.sm;
  const darkFilter = dark ? { filter: "brightness(1.6) saturate(0.85)" } : undefined;

  return (
    <div className={className} data-testid="trustedv-logo">
      <img
        src="/trustedv-brand-logo.png"
        alt="TRUSTED-V — Powered by Bosch"
        height={h}
        style={{ height: `${h}px`, width: "auto", display: "block", ...darkFilter }}
        draggable={false}
      />
    </div>
  );
};

/** Inline text lockup — use wherever "TRUSTED-V Powered by Bosch" is written out. */
export const PoweredByBosch = ({ dark = false, className = "" }) => (
  <span className={`inline-flex items-baseline gap-2 whitespace-nowrap ${className}`} data-testid="powered-by-bosch">
    <span className="font-bold tracking-tight" style={{ color: dark ? "#FFFFFF" : BOSCH_BLUE.dark }}>
      TRUSTED-<span style={{ color: BOSCH_BLUE.light }}>V</span>
    </span>
    <span className="text-[0.78em] font-medium" style={{ color: dark ? "#9DC8E8" : BOSCH_BLUE.dark }}>
      Powered by Bosch
    </span>
  </span>
);

export default TrustedVLogo;
