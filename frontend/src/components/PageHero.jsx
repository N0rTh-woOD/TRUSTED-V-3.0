/**
 * PageHero — MIPS-inspired editorial header used across secondary pages.
 * Large display headline, minimal decoration, generous whitespace.
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
  const py = size === "compact" ? "pt-20 pb-14 md:pt-24 md:pb-16" : "pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24";

  return (
    <section
      className="relative overflow-hidden bg-white border-b border-[#E7E5E0]"
      data-testid={testId}
    >
      <div className={`tv-container relative ${py}`}>
        {children ? (
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <PageHeroContent eyebrow={eyebrow} title={title} subtitle={subtitle} center={false} />
            </div>
            <div className="lg:col-span-5">{children}</div>
          </div>
        ) : (
          <div className={isCenter ? "max-w-3xl mx-auto text-center" : "max-w-4xl"}>
            <PageHeroContent eyebrow={eyebrow} title={title} subtitle={subtitle} center={isCenter} />
          </div>
        )}
      </div>

      {/* Bottom hairline detail */}
      <div className="tv-container">
        <div className="grid grid-cols-12 opacity-40 pointer-events-none">
          <div className="col-span-1 border-l border-[#E7E5E0] h-6"></div>
          <div className="col-span-1 border-l border-[#E7E5E0] h-6"></div>
          <div className="col-span-1 border-l border-[#E7E5E0] h-6"></div>
          <div className="col-span-1 border-l border-[#E7E5E0] h-6"></div>
          <div className="col-span-8 border-l border-r border-[#E7E5E0] h-6"></div>
        </div>
      </div>
    </section>
  );
};

const PageHeroContent = ({ eyebrow, title, subtitle, center }) => (
  <>
    {eyebrow && (
      <div className={`${center ? "flex justify-center" : ""} mb-6`} data-testid="page-hero-eyebrow">
        <span className="tv-eyebrow">{eyebrow}</span>
      </div>
    )}
    {title && (
      <h1
        className="tv-display text-[26px] sm:text-[32px] md:text-[42px] lg:text-[48px] text-[#0A0A0A] mb-6"
        data-testid="page-hero-title"
      >
        {title}
      </h1>
    )}
    {subtitle && (
      <p
        className="text-[15px] md:text-[17px] text-[#4B4B4B] leading-[1.6] font-light max-w-2xl"
        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
        data-testid="page-hero-subtitle"
      >
        {subtitle}
      </p>
    )}
  </>
);

/** Branded RISC-V wordmark. */
export const RiscV = () => (
  <span className="whitespace-nowrap">
    <span style={{ color: "#003262" }}>RISC</span>
    <span style={{ color: "#FDB515" }}>-V</span>
  </span>
);

export default PageHero;
