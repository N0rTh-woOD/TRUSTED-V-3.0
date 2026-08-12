/**
 * TRUSTED-V Brand Logo — consistent sizing across the app.
 * Uses the official brand asset at /trustedv-brand-logo.png.
 *
 * Standard sizes (all in px height, width auto):
 * - xs: 24  (compact contexts)
 * - sm: 34  (default in header/nav)
 * - md: 40  (footer, login)
 * - lg: 56  (feature contexts)
 * - xl: 88  (marketing)
 */
const TrustedVLogo = ({ size = "sm", className = "", dark = false }) => {
  const heights = {
    xs: 24,
    sm: 34,
    md: 40,
    lg: 56,
    xl: 88,
    "2xl": 120,
  };
  const h = heights[size] || heights.sm;

  const darkFilter = dark
    ? { filter: "brightness(1.6) saturate(0.85)" }
    : undefined;

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

export default TrustedVLogo;
