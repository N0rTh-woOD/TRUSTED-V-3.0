/**
 * TRUSTED-V Brand Logo
 * Uses the official brand asset at /trustedv-brand-logo.png (transparent background,
 * deep blue with cyan V slash, "Powered by Bosch" baked in).
 *
 * Size prop controls the rendered HEIGHT in px. Width auto-scales to maintain aspect ratio.
 * `showPoweredBy` is preserved as a no-op for API compatibility — the tagline is always
 * present in the brand asset.
 */
const TrustedVLogo = ({ size = "md", className = "", showPoweredBy = false, dark = false }) => {
  // Logo aspect ratio: 2560 x 568 ≈ 4.5 : 1
  const heights = {
    xs: 24,
    sm: 30,
    md: 38,
    lg: 48,
    xl: 80,
    "2xl": 110,
  };
  const h = heights[size] || heights.md;

  // On dark backgrounds we apply a subtle filter to lift the navy to a brighter
  // hue so it stays readable; the cyan V remains visually distinct either way.
  const darkFilter = dark
    ? { filter: "brightness(1.6) saturate(0.85)" }
    : undefined;

  return (
    <div className={className} data-testid="trustedv-logo">
      <img
        src="/trustedv-brand-logo.png"
        alt="TRUSTED-V — Powered by Bosch"
        height={h}
        style={{ height: `${h}px`, width: "auto", ...darkFilter }}
        draggable={false}
      />
    </div>
  );
};

export default TrustedVLogo;
