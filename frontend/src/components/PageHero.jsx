/**
 * Uniform Page Hero
 * Used as the top section on every secondary page (About, Products, Contact, etc.)
 * Light theme, Berkeley Blue (#003262) accent, Bosch-grade professional aesthetic.
 *
 * Props:
 *  eyebrow      — small label above title (e.g. "About Us")
 *  title        — main page title (string or node, use <RiscV/> for branded mark)
 *  subtitle     — short description paragraph
 *  align        — "left" (default) | "center"
 *  children     — optional right-column content (badges, image, CTAs)
 *  size         — "default" | "compact"
 */

const PageHero = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  children,
  size = "default",
  "data-testid": testId = "page-hero",
}) => {
  const isCenter = align === "center";
  const py = size === "compact" ? "py-14 md:py-16" : "py-16 md:py-20 lg:py-24";

  return (
    <section className={`relative overflow-hidden bg-white border-b border-slate-200/80`} data-testid={testId}>
      {/* Subtle dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.07) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
        }}
      />
      {/* Soft Berkeley Blue halo */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-[#003262]/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${py} relative`}>
        {children ? (
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <PageHeroContent eyebrow={eyebrow} title={title} subtitle={subtitle} center={false} />
            </div>
            <div className="lg:col-span-5">{children}</div>
          </div>
        ) : (
          <div className={isCenter ? "max-w-3xl mx-auto text-center" : "max-w-3xl"}>
            <PageHeroContent eyebrow={eyebrow} title={title} subtitle={subtitle} center={isCenter} />
          </div>
        )}
      </div>
    </section>
  );
};

const PageHeroContent = ({ eyebrow, title, subtitle, center }) => (
  <>
    {eyebrow && (
      <span
        className={`inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#003262] mb-4 ${center ? "justify-center" : ""}`}
        data-testid="page-hero-eyebrow"
      >
        <span className="w-7 h-px bg-[#003262]/45" />
        {eyebrow}
      </span>
    )}
    {title && (
      <h1
        className="text-[34px] sm:text-[42px] lg:text-[48px] font-bold text-slate-900 tracking-tight leading-[1.08] mb-5"
        data-testid="page-hero-title"
      >
        {title}
      </h1>
    )}
    {subtitle && (
      <p
        className="text-[15.5px] sm:text-[17px] text-slate-600 leading-[1.7] font-light max-w-2xl"
        data-testid="page-hero-subtitle"
      >
        {subtitle}
      </p>
    )}
  </>
);

/** Branded RISC-V wordmark, reusable inside any title node. */
export const RiscV = () => (
  <span className="whitespace-nowrap" style={{ fontFamily: "'Georgia', serif" }}>
    <span style={{ color: "#003262" }}>RISC</span>
    <span style={{ color: "#00B4E0" }}>-V</span>
  </span>
);

export default PageHero;
