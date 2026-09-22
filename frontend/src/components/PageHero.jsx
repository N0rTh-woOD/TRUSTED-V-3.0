import { Breadcrumbs } from "@/components/ui-kit";

/**
 * PageHero — the reusable page header for secondary pages.
 * `crumbs` renders breadcrumb navigation (Home is prepended automatically).
 */
const PageHero = ({
  eyebrow,
  title,
  subtitle,
  crumbs,
  align = "left",
  children,
  size = "default",
  "data-testid": testId = "page-hero",
}) => {
  const isCenter = align === "center";
  const py =
    size === "compact"
      ? "pt-10 pb-12 md:pt-12 md:pb-16"
      : "pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-14 lg:pb-24";

  return (
    <section className="relative bg-white border-b border-[#E5E4DF]" data-testid={testId}>
      <div className={`tv-container ${py}`}>
        {crumbs && <Breadcrumbs items={crumbs} className={`mb-10 md:mb-12 ${isCenter ? "justify-center" : ""}`} />}
        {children ? (
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
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
      <div className={`${center ? "flex justify-center" : ""} mb-5`} data-testid="page-hero-eyebrow">
        <span className="tv-eyebrow">{eyebrow}</span>
      </div>
    )}
    {title && (
      <h1 className="tv-h1" style={{ fontSize: "clamp(34px, 5vw, 56px)" }} data-testid="page-hero-title">
        {title}
      </h1>
    )}
    {subtitle && (
      <p className="tv-lede mt-5" data-testid="page-hero-subtitle">
        {subtitle}
      </p>
    )}
  </>
);

/** Branded RISC-V wordmark helper */
export const RiscV = () => (
  <span className="whitespace-nowrap">
    <span style={{ color: "#003262" }}>RISC</span>
    <span style={{ color: "#FDB515" }}>-V</span>
  </span>
);

export default PageHero;
