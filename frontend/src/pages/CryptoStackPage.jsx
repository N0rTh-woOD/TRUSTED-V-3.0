import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Key, ArrowRight, CheckCircle2, ExternalLink, 
  ArrowLeft, Shield, Lock, Cpu, Fingerprint
} from "lucide-react";

const CryptoStackPage = () => {
  const algorithms = [
    {
      category: "Symmetric Encryption",
      items: [
        { name: "AES-256-GCM", desc: "Authenticated encryption with associated data", status: "Production" },
        { name: "ChaCha20-Poly1305", desc: "High-performance stream cipher with MAC", status: "Production" },
        { name: "AES-128-CBC", desc: "Legacy block cipher for backward compat", status: "Supported" },
      ]
    },
    {
      category: "Asymmetric Encryption",
      items: [
        { name: "RSA-4096", desc: "Standard public-key cryptography", status: "Production" },
        { name: "ECC P-256", desc: "NIST elliptic curve for key agreement", status: "Production" },
        { name: "Ed25519", desc: "Fast and secure EdDSA signatures", status: "Production" },
        { name: "X25519", desc: "Curve25519 key exchange", status: "Production" },
      ]
    },
    {
      category: "Hashing",
      items: [
        { name: "SHA-3 (256/512)", desc: "NIST standard Keccak hash family", status: "Production" },
        { name: "BLAKE3", desc: "High-performance cryptographic hash", status: "Production" },
        { name: "SHA-256", desc: "Widely deployed hash for signatures", status: "Production" },
      ]
    },
    {
      category: "Post-Quantum Cryptography",
      items: [
        { name: "ML-KEM (Kyber)", desc: "Lattice-based key encapsulation (NIST PQC)", status: "Preview" },
        { name: "ML-DSA (Dilithium)", desc: "Lattice-based digital signatures (NIST PQC)", status: "Preview" },
        { name: "SLH-DSA (SPHINCS+)", desc: "Hash-based stateless signatures", status: "Planned" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="crypto-stack-page">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-amber-50/50 to-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/product-suite" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Key className="w-7 h-7 text-amber-600" />
            </div>
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">Crypto</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            TrusteD-V Crypto Stack
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Comprehensive native cryptography for embedded RISC-V. Hardware-accelerated where available, 
            with software fallbacks and post-quantum algorithm support.
          </p>
        </div>
      </section>

      {/* Algorithm Tables */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {algorithms.map((group, gi) => (
            <div key={gi} data-testid={`crypto-group-${gi}`}>
              <h2 className="text-xl font-bold text-foreground mb-4">{group.category}</h2>
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-border">
                        <th className="text-left p-4 font-semibold text-muted-foreground">Algorithm</th>
                        <th className="text-left p-4 font-semibold text-muted-foreground">Description</th>
                        <th className="text-right p-4 font-semibold text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((alg, ai) => (
                        <tr key={ai} className="border-b border-border/50 last:border-0">
                          <td className="p-4 font-medium text-foreground whitespace-nowrap">{alg.name}</td>
                          <td className="p-4 text-muted-foreground">{alg.desc}</td>
                          <td className="p-4 text-right">
                            <Badge className={
                              alg.status === "Production" ? "bg-green-100 text-green-800 border-green-200" :
                              alg.status === "Preview" ? "bg-blue-100 text-blue-800 border-blue-200" :
                              "bg-slate-100 text-slate-600 border-slate-200"
                            }>
                              {alg.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-foreground text-center mb-10">Security Features</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, title: "HW Acceleration", desc: "Uses RISC-V crypto extensions and hardware engines when available." },
              { icon: Shield, title: "Side-Channel Resistant", desc: "Constant-time implementations to protect against timing attacks." },
              { icon: Fingerprint, title: "Secure Key Storage", desc: "Integration with TPM, HSM, and secure enclaves for key material." },
              { icon: Lock, title: "FIPS Compliance", desc: "Algorithms aligned with NIST FIPS 140-3 and PQC standards." },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Card key={i} className="border-border hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-amber-600" />
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
            Available as part of the TrusteD-V SDK. Contact sales for post-quantum crypto preview access.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact-sales?plan=pro">
              <Button size="lg" className="bg-white text-amber-700 hover:bg-white/90 font-semibold">
                Talk to Sales <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/developer-portal">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
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
