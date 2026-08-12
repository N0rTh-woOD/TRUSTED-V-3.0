import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, Info } from "lucide-react";
import PageHero from "@/components/PageHero";

const CryptoStackPage = () => {
  const categories = [
    {
      name: "Hashing",
      accent: "#0F6E56",
      items: [
        { algo: "SHA-2 / SHA-3", variants: "224, 256, 384, 512", std: "NIST FIPS 180-4 · FIPS 202" },
        { algo: "SHAKE", variants: "SHAKE-128, SHAKE-256", std: "NIST FIPS 202 (XOF)" },
      ],
    },
    {
      name: "PQC Signatures",
      accent: "#5B21B6",
      items: [
        { algo: "ML-DSA (Dilithium)", variants: "NIST FIPS 204", std: "Lattice-based" },
        { algo: "SLH-DSA (SPHINCS+)", variants: "NIST FIPS 205", std: "Hash-based" },
      ],
    },
    {
      name: "PQC Key Exchange",
      accent: "#5B21B6",
      items: [
        { algo: "ML-KEM (Kyber)", variants: "NIST FIPS 203", std: "Lattice-based KEM" },
      ],
    },
    {
      name: "Symmetric Encryption",
      accent: "#003262",
      items: [
        { algo: "AES", variants: "128, 192, 256-bit keys", std: "NIST FIPS 197" },
        { algo: "Modes of Operation", variants: "GCM, CTR, XTS, CFB, CBC", std: "GCM / XTS recommended", note: "CBC and CFB are formally deprecated; included strictly for legacy compatibility." },
      ],
    },
    {
      name: "Classical Signatures",
      accent: "#B45309",
      items: [
        { algo: "ECDSA / EdDSA", variants: "P-192 – P-521, Ed25519, Ed448", std: "NIST FIPS 186-5" },
        { algo: "RSA", variants: "2048 / 3072 / 4096-bit", std: "PKCS#1 v2.2" },
      ],
    },
    {
      name: "Classical Key Exchange",
      accent: "#B45309",
      items: [
        { algo: "ECDH", variants: "X25519, X448, NIST P-Curves", std: "RFC 7748 · NIST SP 800-56A" },
        { algo: "RSA-KEM / RSAES", variants: "OAEP, PKCS#1 v1.5", std: "Optimal Asymmetric Encryption Padding" },
      ],
    },
    {
      name: "Randomness",
      accent: "#0F6E56",
      items: [
        { algo: "PRNG / DRBG", variants: "CTR-DRBG, HMAC-DRBG, Hash-DRBG", std: "NIST SP 800-90A" },
      ],
    },
    {
      name: "Future / Advanced",
      accent: "#6B6B6B",
      items: [
        { algo: "Side-Channel Protections", variants: "Masking, blinding, constant-time impls", std: "Roadmap" },
      ],
    },
  ];

  return (
    <div className="bg-white text-[#0A0A0A]" data-testid="crypto-stack-page">
      <PageHero
        eyebrow="Crypto Stack"
        title={
          <>
            The cryptographic toolkit<br />for the RISC-V decade.
          </>
        }
        subtitle="A curated, Rust-native cryptographic stack — classical, PQC and side-channel-hardened primitives, mapped to NIST FIPS and international standards."
      >
        <Link to="/product-suite" className="inline-flex items-center gap-1.5 text-[13px] text-[#6B6B6B] hover:text-[#003262] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back to products
        </Link>
      </PageHero>

      <section className="tv-section-tight border-b border-[#E7E5E0]" data-testid="crypto-categories">
        <div className="tv-container">
          <div className="space-y-10">
            {categories.map((c) => (
              <div key={c.name} className="border-t border-[#0A0A0A]" data-testid={`crypto-cat-${c.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="flex items-baseline justify-between py-6 border-b border-[#E7E5E0]">
                  <div className="flex items-baseline gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: c.accent }} />
                    <h2 className="text-[22px] md:text-[28px] tracking-[-0.02em] text-[#0A0A0A]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                      {c.name}
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {String(c.items.length).padStart(2, "0")} items
                  </span>
                </div>
                {c.items.map((it) => (
                  <div key={it.algo} className="grid grid-cols-12 gap-4 py-5 border-b border-[#E7E5E0] items-baseline">
                    <div className="col-span-12 md:col-span-3 text-[16px] text-[#0A0A0A]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                      {it.algo}
                    </div>
                    <div className="col-span-12 md:col-span-4 text-[13px] font-mono text-[#0A0A0A]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {it.variants}
                    </div>
                    <div className="col-span-12 md:col-span-4 text-[13.5px] text-[#4B4B4B] font-light" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                      {it.std}
                    </div>
                    {it.note && (
                      <div className="col-span-12 md:col-span-1 md:justify-self-end text-[11px] text-[#B7410E] flex items-center gap-1" title={it.note} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        <Info className="w-3.5 h-3.5" /> note
                      </div>
                    )}
                    {it.note && (
                      <div className="col-span-12 text-[12px] text-[#B7410E] font-light pl-4 border-l-2 border-[#B7410E]/30" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                        {it.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-section-tight" data-testid="crypto-cta">
        <div className="tv-container flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="tv-display text-[36px] md:text-[52px] text-[#0A0A0A] leading-[0.98] max-w-2xl" style={{ letterSpacing: "-0.03em" }}>
            Certified crypto, on your silicon.
          </h2>
          <div className="flex gap-3">
            <Link to="/contact" className="tv-btn tv-btn-primary" data-testid="crypto-cta-contact">
              Talk to sales <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/product/secure-boot" className="tv-btn tv-btn-outline" data-testid="crypto-cta-secboot">
              Secure Boot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CryptoStackPage;
