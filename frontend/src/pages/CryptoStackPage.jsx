import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Key, ArrowRight, CheckCircle2, 
  ArrowLeft, Shield, Lock, Cpu, Fingerprint, Info
} from "lucide-react";

const CryptoStackPage = () => {
  const cryptoCategories = [
    {
      category: "Hashing",
      color: "emerald",
      items: [
        { algorithm: "SHA-2 / SHA-3", variants: "224, 256, 384, 512", standard: "NIST FIPS 180-4 / FIPS 202" },
        { algorithm: "SHAKE", variants: "SHAKE-128, SHAKE-256", standard: "NIST FIPS 202 (Extendable Output)" },
      ]
    },
    {
      category: "PQC Signatures",
      color: "violet",
      items: [
        { algorithm: "ML-DSA (Dilithium)", variants: "NIST FIPS 204", standard: "Lattice-based" },
        { algorithm: "SLH-DSA (SPHINCS+)", variants: "NIST FIPS 205", standard: "Hash-based" },
      ]
    },
    {
      category: "PQC Key Exchange",
      color: "violet",
      items: [
        { algorithm: "ML-KEM (Kyber)", variants: "NIST FIPS 203", standard: "Lattice-based KEM" },
      ]
    },
    {
      category: "Symmetric Encryption",
      color: "blue",
      items: [
        { algorithm: "AES", variants: "128, 192, 256-bit keys", standard: "NIST FIPS 197" },
        { algorithm: "Modes of Operation", variants: "GCM, CTR, XTS, CFB, CBC", standard: null, note: "CBC/CFB formally deprecated; included strictly for backward compatibility with legacy systems." },
      ]
    },
    {
      category: "Classical Signatures",
      color: "amber",
      items: [
        { algorithm: "ECDSA / EdDSA", variants: "NIST P-Curves (192\u2013521), Ed25519, Ed448", standard: "NIST FIPS 186-5" },
        { algorithm: "RSA", variants: "2048, 3072, 4096-bit", standard: "PKCS#1 v2.2" },
      ]
    },
    {
      category: "Classical Key Exchange",
      color: "amber",
      items: [
        { algorithm: "ECDH", variants: "X25519, X448, NIST P-Curves", standard: "RFC 7748 / NIST SP 800-56A" },
        { algorithm: "RSA-KEM / RSAES", variants: "OAEP, PKCS#1 v1.5", standard: "Optimal Asymmetric Encryption Padding" },
      ]
    },
    {
      category: "Randomness",
      color: "teal",
      items: [
        { algorithm: "PRNG (DRBG)", variants: "HMAC-DRBG, CTR-DRBG, Hash-DRBG", standard: "NIST SP 800-90A compliant" },
      ]
    },
    {
      category: "Future / Advanced",
      color: "rose",
      items: [
        { algorithm: "Side-Channel Protections", variants: "Masking, SCA Resistance, QRNG Integration", standard: "Active research & integration" },
      ]
    },
  ];

  const categoryColorMap = {
    emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", headerBg: "bg-emerald-500" },
    violet: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", badge: "bg-violet-100 text-violet-800 border-violet-200", headerBg: "bg-violet-500" },
    blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100 text-blue-800 border-blue-200", headerBg: "bg-blue-500" },
    amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", badge: "bg-amber-100 text-amber-800 border-amber-200", headerBg: "bg-amber-500" },
    teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700", badge: "bg-teal-100 text-teal-800 border-teal-200", headerBg: "bg-teal-500" },
    rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", badge: "bg-rose-100 text-rose-800 border-rose-200", headerBg: "bg-rose-500" },
  };

  return (
    <div className="min-h-screen bg-white" data-testid="crypto-stack-page">
      {/* Hero */}
      <section className="relative bg-[#1a1d2e] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d2e] via-[#1e2235] to-[#252a3e]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <Link to="/product-suite" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-8 transition-colors" data-testid="back-to-products">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <Key className="w-6 h-6 text-amber-400" />
                </div>
                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">Cryptography</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                TrusteD-V
                <span className="block text-amber-400">Crypto Stack</span>
              </h1>
              <p className="text-base text-slate-400 leading-relaxed max-w-xl">
                Comprehensive native cryptography for embedded RISC-V systems. 
                Hardware-accelerated where available, with post-quantum algorithm support 
                aligned to the latest NIST FIPS standards.
              </p>
            </div>
            
            <div className="bg-[#252a3e] rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Standards Compliance</h3>
              <div className="space-y-3">
                {[
                  "NIST FIPS 197 / 180-4 / 186-5 / 202",
                  "NIST FIPS 203 (ML-KEM), 204 (ML-DSA), 205 (SLH-DSA)",
                  "NIST SP 800-90A (DRBG), SP 800-56A (Key Agreement)",
                  "RFC 7748 (X25519/X448 Key Exchange)",
                  "PKCS#1 v2.2, PKCS#11 Key Management",
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithm Reference */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Algorithm Reference</span>
            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Supported Algorithms & Standards</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Full coverage from classical to post-quantum cryptography, each algorithm implemented in Rust for embedded RISC-V targets.
            </p>
          </div>

          <div className="space-y-6">
            {cryptoCategories.map((group, gi) => {
              const colors = categoryColorMap[group.color];
              return (
                <div key={gi} data-testid={`crypto-group-${gi}`} className="rounded-xl border border-border overflow-hidden bg-white">
                  <div className={`${colors.headerBg} px-5 py-3 flex items-center gap-3`}>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">{group.category}</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm" data-testid={`crypto-table-${gi}`}>
                      <thead>
                        <tr className="bg-slate-50 border-b border-border">
                          <th className="text-left p-4 font-semibold text-muted-foreground w-[220px]">Algorithm / Standard</th>
                          <th className="text-left p-4 font-semibold text-muted-foreground">Variants & Details</th>
                          <th className="text-left p-4 font-semibold text-muted-foreground w-[260px]">Reference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((alg, ai) => (
                          <tr key={ai} className="border-b border-border/50 last:border-0">
                            <td className="p-4 font-medium text-foreground whitespace-nowrap">
                              {alg.algorithm}
                            </td>
                            <td className="p-4 text-foreground">
                              <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">{alg.variants}</span>
                              {alg.note && (
                                <div className="flex items-start gap-1.5 mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2.5 py-1.5">
                                  <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                  {alg.note}
                                </div>
                              )}
                            </td>
                            <td className="p-4 text-muted-foreground text-xs">
                              {alg.standard || "\u2014"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-foreground text-center mb-10">Security Architecture</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, title: "HW Acceleration", desc: "Uses RISC-V crypto extensions (Zkn, Zks) and dedicated hardware engines when available." },
              { icon: Shield, title: "Side-Channel Resistant", desc: "Constant-time implementations with masking techniques to protect against timing and power analysis attacks." },
              { icon: Fingerprint, title: "Secure Key Storage", desc: "Integration with TPM, HSM, and secure enclaves for cryptographic key material protection." },
              { icon: Lock, title: "FIPS Compliance", desc: "All algorithms aligned with NIST FIPS 140-3 validation requirements and PQC standards." },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Card key={i} data-testid={`crypto-feature-${i}`} className="border-border hover:shadow-md transition-shadow group">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 group-hover:bg-amber-500 transition-colors">
                      <Icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1.5">{feat.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-amber-600">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Integrate the Crypto Stack</h3>
          <p className="text-amber-100 mb-6 max-w-xl mx-auto text-sm">
            Available as part of the TrusteD-V SDK. Contact sales for post-quantum crypto access and hardware acceleration support.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact-sales?plan=pro">
              <Button size="lg" className="bg-white text-amber-700 hover:bg-white/90 font-semibold" data-testid="crypto-cta-sales">
                Talk to Sales <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/developer-portal">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold" data-testid="crypto-cta-docs">
                Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CryptoStackPage;
