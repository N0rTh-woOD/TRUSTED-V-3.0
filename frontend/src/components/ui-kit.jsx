/**
 * Reusable UI primitives — enterprise semiconductor design system.
 * Import: import { Eyebrow, SectionHeader, ArchitectureDiagram, TechnicalMetric, ... } from "@/components/ui-kit";
 */
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";

/* ─── Eyebrow ─── */
export const Eyebrow = ({ children, alt = false, className = "", ...rest }) => (
  <span className={`${alt ? "tv-eyebrow-alt" : "tv-eyebrow"} ${className}`} {...rest}>{children}</span>
);

/* ─── SectionHeader — eyebrow + H2 + optional lede + optional right-aligned action ─── */
export const SectionHeader = ({ eyebrow, title, lede, action, align = "left", className = "" }) => {
  const isCenter = align === "center";
  return (
    <div className={`grid lg:grid-cols-12 gap-8 mb-10 md:mb-14 ${isCenter ? "text-center" : ""} ${className}`}>
      <div className={isCenter ? "lg:col-span-12" : "lg:col-span-7"}>
        {eyebrow && <div className="mb-4"><Eyebrow>{eyebrow}</Eyebrow></div>}
        {title && <h2 className="tv-h2">{title}</h2>}
        {lede && <p className="tv-lede mt-5">{lede}</p>}
      </div>
      {action && !isCenter && <div className="lg:col-span-4 lg:col-start-9 flex items-end justify-start lg:justify-end">{action}</div>}
    </div>
  );
};

/* ─── CTA Button variants (short helpers) ─── */
export const PrimaryCTA = ({ to, href, children, size = "md", ...rest }) => {
  const cls = `tv-btn tv-btn-primary ${size === "lg" ? "tv-btn-lg" : ""}`;
  return href ? (
    <a href={href} className={cls} {...rest}>{children}<ArrowUpRight className="w-4 h-4" strokeWidth={2} /></a>
  ) : (
    <Link to={to || "#"} className={cls} {...rest}>{children}<ArrowUpRight className="w-4 h-4" strokeWidth={2} /></Link>
  );
};
export const SecondaryCTA = ({ to, href, children, size = "md", onDark = false, ...rest }) => {
  const cls = `tv-btn ${onDark ? "tv-btn-outline-onDark" : "tv-btn-outline"} ${size === "lg" ? "tv-btn-lg" : ""}`;
  return href ? (
    <a href={href} className={cls} {...rest}>{children}</a>
  ) : (
    <Link to={to || "#"} className={cls} {...rest}>{children}</Link>
  );
};

/* ─── ArchitectureDiagram — the platform stack, as a first-class visual ─── */
export const ArchitectureDiagram = ({ layers = [], dark = false, className = "" }) => (
  <div className={`relative ${className}`} data-testid="architecture-diagram">
    <div className="flex flex-col gap-[6px]">
      {layers.map((layer, idx) => (
        <div
          key={layer.label}
          className={`relative border ${dark ? "border-white/15 bg-white/[0.03]" : "border-[#E5E4DF] bg-white"} rounded-md px-5 py-4 md:px-6 md:py-5 flex items-center justify-between transition-colors hover:border-[#003262]`}
          style={{ marginLeft: `${Math.min(idx, 3) * 4}px` }}
          data-testid={`arch-layer-${idx}`}
        >
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[11px] tracking-widest opacity-60"
              style={{ color: dark ? "rgba(255,255,255,0.6)" : "#5A6472" }}
            >
              L{String(idx + 1).padStart(2, "0")}
            </span>
            <div>
              <div className={`text-[15px] md:text-[17px] font-semibold ${dark ? "text-white" : "text-[#0B0F14]"}`}>
                {layer.label}
              </div>
              {layer.sub && (
                <div className={`text-[12px] md:text-[13px] mt-0.5 ${dark ? "text-white/60" : "text-[#5A6472]"}`}>
                  {layer.sub}
                </div>
              )}
            </div>
          </div>
          {layer.badge && (
            <span
              className={`text-[10px] font-mono tracking-[0.16em] uppercase px-2 py-1 border rounded-sm ${
                dark ? "text-[#FDB515] border-[#FDB515]/40" : "text-[#003262] border-[#003262]/25 bg-[#E6F7FC]"
              }`}
            >
              {layer.badge}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

/* ─── TechnicalMetric — reads like a spec sheet ─── */
export const TechnicalMetric = ({ rows = [], className = "" }) => (
  <div className={`border border-[#E5E4DF] rounded-md bg-white ${className}`} data-testid="technical-metric">
    {rows.map(([k, v], i) => (
      <div
        key={k}
        className={`grid grid-cols-12 gap-4 px-5 py-3 items-baseline ${i > 0 ? "border-t border-[#E5E4DF]" : ""}`}
      >
        <span className="col-span-5 font-mono text-[11px] tracking-widest uppercase text-[#5A6472]">{k}</span>
        <span className="col-span-7 font-mono text-[13px] text-[#0B0F14]">{v}</span>
      </div>
    ))}
  </div>
);

/* ─── ProductCard ─── */
export const ProductCard = ({ eyebrow, title, description, bullets = [], to, className = "" }) => (
  <Link
    to={to || "#"}
    className={`group block border border-[#E5E4DF] rounded-md p-8 bg-white hover:border-[#003262] transition-colors ${className}`}
    data-testid={`product-card-${(title || "").toLowerCase().replace(/\W+/g, "-")}`}
  >
    {eyebrow && <div className="mb-3"><Eyebrow alt>{eyebrow}</Eyebrow></div>}
    <div className="flex items-start justify-between gap-4">
      <h3 className="tv-h3" style={{ fontSize: "24px" }}>{title}</h3>
      <ArrowUpRight className="w-5 h-5 text-[#5A6472] group-hover:text-[#003262] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
    </div>
    {description && <p className="tv-body mt-3 text-[15px] text-[#5A6472]">{description}</p>}
    {bullets.length > 0 && (
      <ul className="mt-5 space-y-2 pt-4 border-t border-[#E5E4DF]">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-[#1A1F25]">
            <span className="w-1 h-1 rounded-full bg-[#003262] mt-2 flex-shrink-0" /> {b}
          </li>
        ))}
      </ul>
    )}
  </Link>
);

/* ─── MarketCard ─── */
export const MarketCard = ({ label, headline, capabilities = [], to, className = "" }) => (
  <Link
    to={to || "#"}
    className={`group block border border-[#E5E4DF] rounded-md p-8 bg-white hover:border-[#003262] transition-colors ${className}`}
  >
    <div className="mb-4 font-mono text-[11px] tracking-[0.16em] uppercase text-[#5A6472]">{label}</div>
    <h3 className="tv-h3" style={{ fontSize: "22px" }}>{headline}</h3>
    {capabilities.length > 0 && (
      <ul className="mt-5 space-y-1.5">
        {capabilities.map((c) => (
          <li key={c} className="text-[13.5px] text-[#1A1F25] flex items-start gap-2">
            <span className="text-[#003262] font-mono">›</span> {c}
          </li>
        ))}
      </ul>
    )}
    <div className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-[#003262] font-semibold group-hover:gap-2.5 transition-all">
      Explore <ArrowRight className="w-3.5 h-3.5" />
    </div>
  </Link>
);

/* ─── PartnerGrid ─── */
export const PartnerGrid = ({ partners = [], onDark = false }) => (
  <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px ${onDark ? "bg-white/10" : "bg-[#E5E4DF]"}`}>
    {partners.map((p) => (
      <div
        key={p.name}
        className={`${onDark ? "bg-[#00162B]" : "bg-white"} px-6 py-8 flex flex-col items-start justify-between min-h-[112px]`}
      >
        <div className={`text-[18px] md:text-[20px] font-semibold tracking-tight ${onDark ? "text-white" : "text-[#0B0F14]"}`}>
          {p.name}
        </div>
        {p.note && (
          <div className={`mt-2 text-[11px] font-mono tracking-widest uppercase ${onDark ? "text-white/60" : "text-[#5A6472]"}`}>
            {p.note}
          </div>
        )}
      </div>
    ))}
  </div>
);

/* ─── ResourceCard ─── */
export const ResourceCard = ({ category, title, description, to }) => (
  <Link
    to={to || "#"}
    className="group block border border-[#E5E4DF] rounded-md p-6 bg-white hover:border-[#003262] transition-colors"
  >
    <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#5A6472] mb-3">{category}</div>
    <h4 className="tv-h4">{title}</h4>
    {description && <p className="mt-2 text-[13.5px] text-[#5A6472] leading-relaxed">{description}</p>}
    <div className="mt-5 text-[13px] text-[#003262] font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
      Read <ArrowRight className="w-3.5 h-3.5" />
    </div>
  </Link>
);

/* ─── CTASection ─── */
export const CTASection = ({ eyebrow, title, primary, secondary, dark = false, "data-testid": testId = "cta-section" }) => (
  <section
    className={`${dark ? "bg-[#00162B] text-white" : "bg-white border-t border-[#E5E4DF]"} tv-section`}
    data-testid={testId}
  >
    <div className="tv-container">
      <div className="grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          {eyebrow && (
            <div className="mb-4">
              <span className={`tv-eyebrow ${dark ? "!text-[#FDB515]" : ""}`} style={dark ? { color: "#FDB515" } : undefined}>
                <span style={dark ? { color: "#FDB515" } : undefined}>{eyebrow}</span>
              </span>
            </div>
          )}
          <h2 className={`tv-h2 ${dark ? "text-white" : ""}`}>{title}</h2>
        </div>
        <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
          {primary && primary}
          {secondary && secondary}
        </div>
      </div>
    </div>
  </section>
);
