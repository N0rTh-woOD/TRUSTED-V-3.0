import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink, ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";

const SecureBootPage = () => {
  const loaders = [
    {
      name: "rBoot",
      role: "First-stage bootloader",
      color: "#B7410E",
      desc: "Minimal, fast, security-critical first-stage. Initializes hardware, establishes chain of trust and hands off to the main firmware.",
      features: [
        "Minimal, security-critical first stage",
        "Hardware initialization for RISC-V targets",
        "Verified boot with ECDSA / EdDSA / ML-DSA",
        "Anti-rollback counters",
        "Secure key provisioning",
      ],
      repo: "https://github.com/",
    },
    {
      name: "rustBoot",
      role: "Second-stage & OTA",
      color: "#003262",
      desc: "Full-featured Rust bootloader. Handles A/B updates, OTA, over-the-air recovery and application-layer attestation.",
      features: [
        "A/B partition & rollback",
        "OTA update pipeline with signed manifests",
        "PQC-ready signature verification",
        "Recovery mode & fail-safe partitions",
        "Full Rust memory safety",
      ],
      repo: "https://github.com/",
    },
  ];

  const chain = [
    { step: "01", label: "Silicon RoT", desc: "Immutable root of trust in ROM / OTP" },
    { step: "02", label: "rBoot", desc: "First-stage verifies rustBoot" },
    { step: "03", label: "rustBoot", desc: "Second-stage verifies the application" },
    { step: "04", label: "Application", desc: "Attested, signed, PQC-ready firmware" },
  ];

  return (
    <div className="bg-white text-[#0A0A0A]" data-testid="secure-boot-page">
      <PageHero
        eyebrow="Secure Boot"
        title={
          <>
            A verified chain,<br />from ROM to app.
          </>
        }
        subtitle="rBoot and rustBoot form a complete, Rust-native secure-boot chain for RISC-V — certifiable against CC EAL4+, PSA L3 and ISO 26262."
      >
        <Link to="/product-suite" className="inline-flex items-center gap-1.5 text-[13px] text-[#6B6B6B] hover:text-[#003262] transition-colors" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back to products
        </Link>
      </PageHero>

      {/* Chain diagram */}
      <section className="tv-section-tight border-b border-[#E7E5E0] bg-[#FAFAF7]" data-testid="boot-chain">
        <div className="tv-container">
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6B6B6B] mb-6" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            The boot chain
          </div>
          <div className="grid md:grid-cols-4 gap-px bg-[#E7E5E0] border-y border-[#E7E5E0]">
            {chain.map((c) => (
              <div key={c.step} className="bg-[#FAFAF7] p-6 md:p-8 min-h-[160px]">
                <div className="text-[12px] font-mono tracking-widest text-[#003262]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  / {c.step}
                </div>
                <h3 className="mt-2 text-[22px] tracking-[-0.02em] text-[#0A0A0A]" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>
                  {c.label}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.55] text-[#4B4B4B] font-light" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two bootloaders */}
      <section className="tv-section border-b border-[#E7E5E0]" data-testid="boot-loaders">
        <div className="tv-container">
          <div className="grid md:grid-cols-2 gap-px bg-[#E7E5E0] border-y border-[#E7E5E0]">
            {loaders.map((l) => (
              <div key={l.name} className="bg-white p-8 md:p-12 border-t-[3px]" style={{ borderTopColor: l.color }} data-testid={`loader-${l.name.toLowerCase()}`}>
                <div className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: l.color, fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  {l.role}
                </div>
                <h2 className="mt-2 text-[26px] md:text-[34px] tracking-[-0.025em] text-[#0A0A0A]" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}>
                  {l.name}
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.65] text-[#3A3A3A] font-light" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
                  {l.desc}
                </p>
                <ul className="mt-6 space-y-3 border-t border-[#E7E5E0] pt-6">
                  {l.features.map((f) => (
                    <li key={f} className="text-[14px] text-[#0A0A0A] flex items-start gap-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                      <span className="w-1 h-1 mt-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={l.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-1.5 text-[12px] font-medium tracking-[0.12em] uppercase text-[#0A0A0A] border-b border-[#0A0A0A] pb-0.5 hover:text-[#003262] hover:border-[#003262] transition-colors"
                  style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-section-tight" data-testid="secboot-cta">
        <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="tv-h2">
            Ship the chip. Ship the certificate.
          </h2>
          <div className="flex gap-3">
            <Link to="/contact" className="tv-btn tv-btn-primary" data-testid="secboot-cta-contact">
              Certify with us <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/product/crypto-stack" className="tv-btn tv-btn-outline" data-testid="secboot-cta-crypto">
              Crypto Stack
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecureBootPage;
