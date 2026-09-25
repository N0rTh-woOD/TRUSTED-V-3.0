import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Eyebrow, PrimaryCTA, SecondaryCTA, TVCard } from "@/components/ui-kit";

const PLATFORM_FOUNDATIONS = [
  { eyebrow: "RISC-V IP", title: "SiFive alignment", description: "Build the software and system workflow around SiFive RISC-V IP, from platform definition through embedded development." },
  { eyebrow: "Pre-silicon", title: "Virtualization & simulation", description: "Use virtual platforms and a Type-1 hypervisor to establish the firmware workflow before the target system is available." },
  { eyebrow: "Trusted software", title: "Secure by construction", description: "Keep secure boot, cryptography and attestation in the platform conversation from the first technical decision." },
];

const Partners = () => (
  <div className="bg-white text-[#0B0F14]" data-testid="platform-page">
    <PageHero
      crumbs={[{ label: "Platform" }]}
      eyebrow="Platform"
      title={<>Build with <span className="text-[#003262]">SiFive</span><br />and TRUSTED-V.</>}
      subtitle="A coherent route from SiFive RISC-V IP through virtualization, secure software and the development workflow."
    />

    <section className="tv-section border-b border-[#E5E4DF]" data-testid="platform-sifive">
      <div className="tv-container grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <Eyebrow>SiFive RISC-V IP</Eyebrow>
          <h2 className="tv-h2 mt-4">One technical foundation from IP to application.</h2>
          <p className="tv-lede mt-5">TRUSTED-V brings the platform layers together around SiFive RISC-V IP, keeping the software, security and pre-silicon workflow connected.</p>
        </div>
        <div className="lg:col-span-7">
          <div className="tv-panel tv-panel-muted p-7 md:p-9" data-testid="platform-sifive-detail">
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#004A7F]">Build with SiFive and TRUSTED-V</div>
            <p className="mt-4 text-[18px] leading-[1.55] text-[#0B0F14]">Align SiFive RISC-V IP with the TRUSTED-V virtual platform, Code Engine, Jarvyn tooling and trusted software layers.</p>
            <Link to="/contact" className="tv-arrow-link mt-6" data-testid="platform-sifive-contact">Discuss your platform</Link>
          </div>
        </div>
      </div>
    </section>

    <section className="tv-section border-b border-[#E5E4DF] bg-[#F7F7F5]" data-testid="platform-foundations">
      <div className="tv-container">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>Platform foundations</Eyebrow>
          <h2 className="tv-h2 mt-4">The layers that keep engineering work connected.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {PLATFORM_FOUNDATIONS.map((item) => <TVCard key={item.title} {...item} data-testid={`platform-${item.title.toLowerCase().replace(/\W+/g, "-")}`} />)}
        </div>
      </div>
    </section>

    <section className="tv-section-tight" data-testid="platform-cta">
      <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-8">
        <h2 className="tv-h2">Bring the IP. Build the complete system.</h2>
        <div className="flex flex-wrap gap-3">
          <PrimaryCTA to="/contact" data-testid="platform-cta-contact">Start a technical discussion</PrimaryCTA>
          <SecondaryCTA to="/product/code-engine" data-testid="platform-cta-code-engine">Explore Code Engine</SecondaryCTA>
        </div>
      </div>
    </section>
  </div>
);

export default Partners;