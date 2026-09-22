/**
 * Reusable UI primitives — enterprise semiconductor design system.
 * Import: import { Eyebrow, SectionHeader, ArchitectureDiagram, TechnicalMetric, ... } from "@/components/ui-kit";
 */
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ChevronRight, Check, X, Minus } from "lucide-react";
import { BLUE_STEPS } from "@/components/TrustedVLogo";

const slug = (s) => String(s).toLowerCase().replace(/\W+/g, "-");

/* ─── Breadcrumbs — Home › Section › Page ─── */
export const Breadcrumbs = ({ items = [], className = "" }) => (
  <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1.5 font-mono text-[11.5px] ${className}`} data-testid="breadcrumbs">
    <Link to="/" className="text-[#5A6472] hover:text-[#003262] transition-colors" data-testid="breadcrumb-home">Home</Link>
    {items.map((it, i) => {
      const last = i === items.length - 1;
      return (
        <span key={it.label} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 text-[#CFCEC8]" />
          {!last && it.to ? (
            <Link to={it.to} className="text-[#5A6472] hover:text-[#003262] transition-colors" data-testid={`breadcrumb-${slug(it.label)}`}>{it.label}</Link>
          ) : (
            <span className="text-[#003262] font-medium" aria-current="page" data-testid={`breadcrumb-${slug(it.label)}`}>{it.label}</span>
          )}
        </span>
      );
    })}
  </nav>
);

/* ─── GradientCard — Bosch blue gradation, light → dark by step ─── */
export const GradientCard = ({ step = 0, index, title, description, to }) => {
  const bg = BLUE_STEPS[step % BLUE_STEPS.length];
  const onDark = step % BLUE_STEPS.length >= 2;
  const ink = onDark ? "#FFFFFF" : "#0B0F14";
  const muted = onDark ? "rgba(255,255,255,0.72)" : "#3A4A5A";
  return (
    <Link
      to={to || "#"}
      className="group relative flex flex-col justify-between rounded-md p-7 md:p-8 min-h-[220px] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(0,50,98,0.45)]"
      style={{ background: bg }}
      data-testid={`gradient-card-${slug(title)}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.16em]" style={{ color: onDark ? "rgba(255,255,255,0.6)" : "#004A7F" }}>
          {String((index ?? step) + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: ink }} />
      </div>
      <div className="mt-10">
        <h3 className="text-[20px] md:text-[22px] font-semibold tracking-tight" style={{ color: ink }}>{title}</h3>
        {description && <p className="mt-2 text-[14px] leading-[1.6]" style={{ color: muted }}>{description}</p>}
      </div>
    </Link>
  );
};

/* ─── StepRail — numbered vertical flow (engagement models) ─── */
export const StepRail = ({ steps = [], dark = false, compact = false }) => (
  <ol className="relative" data-testid="step-rail">
    {steps.map((s, i) => {
      const dot = BLUE_STEPS[Math.min(i + 1, BLUE_STEPS.length - 1)];
      const last = i === steps.length - 1;
      return (
        <li key={s.title} className={`relative flex gap-4 ${compact ? "pb-4" : "pb-7"} ${last ? "pb-0" : ""}`}>
          {!last && <span className={`absolute left-[15px] top-8 bottom-0 w-px ${dark ? "bg-white/15" : "bg-[#E5E4DF]"}`} />}
          <span
            className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-semibold flex-shrink-0"
            style={{ background: dark ? "rgba(255,255,255,0.08)" : dot, color: dark ? "#9DC8E8" : i < 1 ? "#003262" : "#fff", border: dark ? `1px solid ${dot}` : "none" }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-1">
            <div className={`text-[15px] font-semibold ${dark ? "text-white" : "text-[#0B0F14]"}`}>{s.title}</div>
            {s.desc && <div className={`mt-1 text-[13.5px] leading-[1.55] ${dark ? "text-white/65" : "text-[#5A6472]"}`}>{s.desc}</div>}
          </div>
        </li>
      );
    })}
  </ol>
);

/* ─── ComparisonModule — TRUSTED-V vs alternatives ─── */
const Mark = ({ v }) => {
  if (v === true) return <Check className="w-4 h-4 text-[#0F6E56]" aria-label="Yes" />;
  if (v === "partial") return <Minus className="w-4 h-4 text-[#56A2D6]" aria-label="Partial" />;
  return <X className="w-4 h-4 text-[#CFCEC8]" aria-label="No" />;
};
export const ComparisonModule = ({ columns = [], rows = [], className = "" }) => (
  <div className={`border border-[#E5E4DF] rounded-md overflow-hidden bg-white ${className}`} data-testid="comparison-module">
    <div className="grid grid-cols-12 border-b border-[#E5E4DF] bg-[#F7F7F5]">
      <div className="col-span-6 md:col-span-6 px-5 py-4 font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#5A6472]">Capability</div>
      {columns.map((c, i) => (
        <div
          key={c}
          className={`col-span-2 px-2 py-4 text-center font-mono text-[10.5px] tracking-[0.12em] uppercase ${i === 0 ? "bg-[#003262] text-white" : "text-[#5A6472]"}`}
        >
          {c}
        </div>
      ))}
    </div>
    {rows.map(([label, ...vals]) => (
      <div key={label} className="grid grid-cols-12 items-center border-b border-[#E5E4DF] last:border-b-0" data-testid={`comparison-row-${slug(label)}`}>
        <div className="col-span-6 px-5 py-3.5 text-[14px] text-[#0B0F14]">{label}</div>
        {vals.map((v, i) => (
          <div key={i} className={`col-span-2 py-3.5 flex justify-center ${i === 0 ? "bg-[#E6F1F9]/60" : ""}`}><Mark v={v} /></div>
        ))}
      </div>
    ))}
  </div>
);

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
                dark ? "text-[#2486C7] border-[#2486C7]/40" : "text-[#003262] border-[#003262]/25 bg-[#E6F7FC]"
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
              <span className={`tv-eyebrow ${dark ? "!text-[#2486C7]" : ""}`} style={dark ? { color: "#2486C7" } : undefined}>
                <span style={dark ? { color: "#2486C7" } : undefined}>{eyebrow}</span>
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
