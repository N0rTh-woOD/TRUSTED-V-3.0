import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ArrowUpRight, Shield, Cpu, KeyRound, Layers } from "lucide-react";
import { toast } from "sonner";
import TrustedVLogo from "@/components/TrustedVLogo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result && result.access_token) {
        toast.success("Welcome back.");
        setTimeout(() => navigate("/", { replace: true }), 100);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.15fr_1fr] bg-white text-[#0B0F14]" data-testid="login-page">
      {/* Left — brand + technical narrative */}
      <div className="hidden lg:flex relative flex-col justify-between bg-[#00162B] text-white overflow-hidden">
        {/* Ambient grid + accent lines */}
        <div className="absolute inset-0 tv-grid-bg-dark opacity-40" />
        <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-[#003262]/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-56 -right-40 w-[520px] h-[520px] rounded-full bg-[#00B4E0]/10 blur-3xl pointer-events-none" />

        <div className="relative p-14 xl:p-16">
          <TrustedVLogo size="lg" dark />
          <div className="mt-3 font-mono text-[10.5px] tracking-[0.22em] uppercase text-white/50">
            v1.0 · Rust-native RISC-V platform
          </div>
        </div>

        <div className="relative px-14 xl:px-16">
          <div className="tv-eyebrow" style={{ color: "#FDB515" }}>
            <span style={{ color: "#FDB515" }}>The complete RISC-V platform</span>
          </div>
          <h1
            className="tv-h1 mt-5 text-white"
            style={{ fontSize: "clamp(34px, 3.6vw, 48px)", lineHeight: 1.05 }}
          >
            Software to Silicon,<br />
            <span className="text-[#FDB515]">Rust-Native RISC-V.</span>
          </h1>
          <p className="mt-5 text-[15px] leading-[1.7] text-white/65 max-w-md">
            An open, modular platform for building trustworthy edge silicon
            and mission-critical embedded software. Made in India,
            engineered by Bosch to the world.
          </p>

          {/* Trust feature strip */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 max-w-lg">
            {[
              { Icon: Cpu, label: "RISC-V native", sub: "RV32 · RV64 · Vector" },
              { Icon: Shield, label: "Secure by design", sub: "rBoot · rustBoot · PQC" },
              { Icon: Layers, label: "Full stack", sub: "IP → SoC → firmware → apps" },
              { Icon: KeyRound, label: "Attestable", sub: "TVOTS quote-based trust" },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <span className="mt-0.5 w-8 h-8 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#FDB515]">
                  <f.Icon className="w-4 h-4" strokeWidth={1.6} />
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-white">{f.label}</div>
                  <div className="text-[11.5px] font-mono text-white/50 mt-0.5">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative p-14 xl:p-16 pt-8 flex items-center justify-between">
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-white/40">
            Powered by Bosch · Made in India
          </div>
          <div className="flex items-center gap-2 font-mono text-[10.5px] text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56] tv-pulse-dot" />
            All systems operational
          </div>
        </div>
      </div>

      {/* Right — form pane */}
      <div className="flex items-center justify-center bg-[#F7F7F5] px-6 py-16 md:px-10 md:py-24">
        <div className="w-full max-w-[440px]">
          <div className="lg:hidden mb-10 flex items-center justify-between">
            <TrustedVLogo size="sm" />
            <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#5A6472]">v1.0</span>
          </div>

          <div className="bg-white border border-[#E5E4DF] rounded-lg shadow-[0_20px_50px_-30px_rgba(11,15,20,0.15)] p-8 md:p-10">
            <div className="mb-8">
              <span className="tv-eyebrow">Sign in</span>
              <h2 className="tv-h2 mt-4" style={{ fontSize: "clamp(26px, 3vw, 32px)" }}>
                Welcome back.
              </h2>
              <p className="mt-3 text-[14.5px] text-[#5A6472] leading-relaxed">
                Access the TRUSTED-V platform, your projects and the marketplace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" data-testid="login-form">
              <label className="block">
                <span className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5A6472] mb-2">
                  Work email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="email-input"
                  className="w-full bg-[#F7F7F5] border border-[#E5E4DF] rounded-md px-4 py-3 text-[15px] text-[#0B0F14] focus:outline-none focus:border-[#003262] focus:bg-white transition-colors"
                  placeholder="you@company.com"
                />
              </label>
              <label className="block">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5A6472]">
                    Password
                  </span>
                  <a href="#" className="text-[11.5px] text-[#003262] hover:text-[#001F3F]" tabIndex={-1}>
                    Forgot?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="password-input"
                  className="w-full bg-[#F7F7F5] border border-[#E5E4DF] rounded-md px-4 py-3 text-[15px] text-[#0B0F14] focus:outline-none focus:border-[#003262] focus:bg-white transition-colors"
                  placeholder="••••••••"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                data-testid="login-btn"
                className="tv-btn tv-btn-primary w-full disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>Sign in <ArrowUpRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#E5E4DF] flex items-center justify-between">
              <div className="font-mono text-[11px] text-[#5A6472]">
                Invite-only preview
              </div>
              <Link to="/contact" className="text-[12.5px] font-semibold text-[#003262] hover:text-[#001F3F] inline-flex items-center gap-1.5">
                Request access <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-[11.5px] text-[#5A6472]">
            By signing in, you agree to our Terms and Privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
