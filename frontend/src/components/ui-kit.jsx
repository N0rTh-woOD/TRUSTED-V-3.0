/**
 * Reusable UI primitives — enterprise semiconductor design system.
 * Import: import { Eyebrow, SectionHeader, ArchitectureDiagram, TechnicalMetric, ... } from "@/components/ui-kit";
 */
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight, Check, X, Minus } from "lucide-react";
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

/* ─── TVCard — THE shared card primitive for the whole platform ───
   Light surface · 1px border · mono eyebrow · hover lift + blue accent rule. */
export const TVCard = ({
  to, href, eyebrow, title, description, bullets = [], meta, footer, children,
  muted = false, dark = false, arrow = true, size = "md", className = "", "data-testid": testId,
}) => {
  const pad = size === "sm" ? "p-6" : size === "lg" ? "p-8 md:p-10" : "p-7 md:p-8";
  const interactive = Boolean(to || href);
  const cls = [
    "tv-panel relative flex flex-col overflow-hidden group",
    muted && "tv-panel-muted",
    dark && "tv-panel-dark",
    interactive && "tv-panel-link tv-panel-accent",
    pad,
    className,
  ].filter(Boolean).join(" ");
  const ink = dark ? "text-white" : "text-[#0B0F14]";
  const sub = dark ? "text-white/65" : "text-[#5A6472]";
  const rule = dark ? "border-white/15" : "border-[#E5E4DF]";

  const body = (
    <>
      {(eyebrow || arrow) && (
        <div className="flex items-start justify-between gap-4 mb-4">
          {eyebrow ? (
            <span className={`font-mono text-[10.5px] tracking-[0.18em] uppercase ${dark ? "text-[#56A2D6]" : "text-[#004A7F]"}`}>{eyebrow}</span>
          ) : <span />}
          {interactive && arrow && (
            <ArrowUpRight className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${dark ? "text-white/70" : "text-[#5A6472] group-hover:text-[#003262]"}`} />
          )}
        </div>
      )}
      {title && <h3 className={`text-[19px] md:text-[21px] font-semibold tracking-tight leading-snug ${ink}`}>{title}</h3>}
      {description && <p className={`mt-2.5 text-[14px] leading-[1.65] ${sub}`}>{description}</p>}
      {bullets.length > 0 && (
        <ul className={`mt-5 pt-5 border-t space-y-2 ${rule}`}>
          {bullets.map((b) => (
            <li key={b} className={`flex items-start gap-2.5 text-[13.5px] ${dark ? "text-white/80" : "text-[#1A1F25]"}`}>
              <span className="w-1 h-1 rounded-full bg-[#2486C7] mt-2 flex-shrink-0" />{b}
            </li>
          ))}
        </ul>
      )}
      {children}
      {meta && <div className={`mt-4 font-mono text-[11.5px] ${dark ? "text-[#9DC8E8]" : "text-[#004A7F]"}`}>{meta}</div>}
      {footer && <div className={`mt-auto pt-5 border-t ${rule}`}>{footer}</div>}
    </>
  );

  if (href) return <a href={href} className={cls} data-testid={testId}>{body}</a>;
  if (to) return <Link to={to} className={cls} data-testid={testId}>{body}</Link>;
  return <div className={cls} data-testid={testId}>{body}</div>;
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

/* ─── CardShell — link when a destination exists, plain panel otherwise (no dead links) ─── */
const CardShell = ({ to, href, className = "", testId, children }) => {
  const interactive = Boolean(to || href);
  const cls = `tv-panel relative overflow-hidden group flex flex-col ${interactive ? "tv-panel-link tv-panel-accent" : ""} ${className}`;
  if (href) return <a href={href} className={cls} data-testid={testId}>{children}</a>;
  if (to) return <Link to={to} className={cls} data-testid={testId}>{children}</Link>;
  return <div className={cls} data-testid={testId}>{children}</div>;
};

/* ─── ProductCard — TVCard language, larger title ─── */
export const ProductCard = ({ eyebrow, title, description, bullets = [], to, className = "" }) => (
  <CardShell to={to} className={`p-7 md:p-8 ${className}`} testId={`product-card-${slug(title || "")}`}>
    <div className="flex items-start justify-between gap-4 mb-4">
      <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">{eyebrow}</span>
      {to && <ArrowUpRight className="w-4 h-4 text-[#5A6472] group-hover:text-[#003262] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />}
    </div>
    <h3 className="text-[22px] md:text-[24px] font-semibold tracking-tight leading-snug text-[#0B0F14]">{title}</h3>
    {description && <p className="mt-2.5 text-[14px] leading-[1.65] text-[#5A6472]">{description}</p>}
    {bullets.length > 0 && (
      <ul className="mt-5 space-y-2 pt-5 border-t border-[#E5E4DF]">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-[#1A1F25]">
            <span className="w-1 h-1 rounded-full bg-[#2486C7] mt-2 flex-shrink-0" /> {b}
          </li>
        ))}
      </ul>
    )}
  </CardShell>
);

/* ─── MarketCard ─── */
export const MarketCard = ({ label, headline, capabilities = [], to, className = "" }) => (
  <CardShell to={to} className={`p-7 md:p-8 ${className}`} testId={`market-card-${slug(label || "")}`}>
    <div className="flex items-start justify-between gap-4 mb-4">
      <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">{label}</span>
      {to && <ArrowUpRight className="w-4 h-4 text-[#5A6472] group-hover:text-[#003262] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />}
    </div>
    <h3 className="text-[19px] md:text-[21px] font-semibold tracking-tight leading-snug text-[#0B0F14]">{headline}</h3>
    {capabilities.length > 0 && (
      <ul className="mt-5 space-y-2 pt-5 border-t border-[#E5E4DF]">
        {capabilities.map((c) => (
          <li key={c} className="text-[13.5px] text-[#1A1F25] flex items-start gap-2.5">
            <span className="w-1 h-1 rounded-full bg-[#2486C7] mt-2 flex-shrink-0" /> {c}
          </li>
        ))}
      </ul>
    )}
  </CardShell>
);

/* ─── PartnerGrid — same card language, tiled ─── */
export const PartnerGrid = ({ partners = [], onDark = false }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" data-testid="partner-grid">
    {partners.map((p) => (
      <div
        key={p.name}
        className={`tv-panel ${onDark ? "tv-panel-dark" : ""} relative overflow-hidden px-5 py-6 flex flex-col items-start justify-between min-h-[118px]`}
      >
        <span className={`font-mono text-[10px] tracking-[0.18em] uppercase ${onDark ? "text-[#56A2D6]" : "text-[#004A7F]"}`}>Partner</span>
        <div>
          <div className={`text-[17px] font-semibold tracking-tight ${onDark ? "text-white" : "text-[#0B0F14]"}`}>{p.name}</div>
          {p.note && (
            <div className={`mt-1 text-[12px] ${onDark ? "text-white/60" : "text-[#5A6472]"}`}>{p.note}</div>
          )}
        </div>
      </div>
    ))}
  </div>
);

/* ─── ResourceCard ─── */
export const ResourceCard = ({ category, title, description, to }) => (
  <CardShell to={to} className="p-6" testId={`resource-card-${slug(title || "")}`}>
    <div className="flex items-start justify-between gap-4 mb-4">
      <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">{category}</span>
      {to && <ArrowUpRight className="w-4 h-4 text-[#5A6472] group-hover:text-[#003262] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />}
    </div>
    <h4 className="text-[17px] font-semibold tracking-tight text-[#0B0F14]">{title}</h4>
    {description && <p className="mt-2 text-[13.5px] text-[#5A6472] leading-relaxed">{description}</p>}
  </CardShell>
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
