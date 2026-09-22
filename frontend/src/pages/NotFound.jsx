import { Eyebrow, PrimaryCTA, SecondaryCTA, TVCard } from "@/components/ui-kit";

const SUGGESTIONS = [
  { eyebrow: "Platform", title: "Product suite", description: "IP integration, virtualization, secure boot, crypto and RTOS.", to: "/product-suite" },
  { eyebrow: "Tools", title: "Jarvyn IDE", description: "The Rust-native RISC-V development environment.", to: "/download-ide" },
  { eyebrow: "Ecosystem", title: "Partners", description: "SiFive, Akeana, C-DAC, Mindgrove and more.", to: "/partners" },
];

const NotFound = () => (
  <div className="bg-white text-[#0B0F14]">
    <section className="relative overflow-hidden border-b border-[#E5E4DF]" data-testid="notfound-page">
      <div className="absolute inset-0 tv-grid-bg opacity-60 pointer-events-none" />
      <div className="tv-container relative pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="mb-5"><Eyebrow>Error 404</Eyebrow></div>
        <h1 className="tv-h1" style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }} data-testid="notfound-title">
          This page isn&apos;t part of the <span className="text-[#003262]">platform</span>.
        </h1>
        <p className="tv-lede mt-6 max-w-xl">
          The link may be out of date. Head back to the homepage or pick a destination below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryCTA to="/" size="lg" data-testid="notfound-home-cta">Back to home</PrimaryCTA>
          <SecondaryCTA to="/contact" size="lg" data-testid="notfound-contact-cta">Contact us</SecondaryCTA>
        </div>
      </div>
    </section>
    <section className="tv-section-tight">
      <div className="tv-container grid md:grid-cols-3 gap-4">
        {SUGGESTIONS.map((s) => (
          <TVCard key={s.title} {...s} data-testid={`notfound-suggestion-${s.title.toLowerCase().replace(/\W+/g, "-")}`} />
        ))}
      </div>
    </section>
  </div>
);

export default NotFound;
