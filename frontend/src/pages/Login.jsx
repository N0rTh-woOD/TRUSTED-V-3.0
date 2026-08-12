import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ArrowUpRight } from "lucide-react";
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
    <div className="min-h-screen grid lg:grid-cols-2 bg-white text-[#0A0A0A]" data-testid="login-page">
      {/* Left: editorial brand pane */}
      <div className="hidden lg:flex flex-col justify-between bg-[#00162B] text-white p-16">
        <TrustedVLogo size="sm" />
        <div>
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/50 mb-6" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            The complete RISC-V platform
          </div>
          <h1
            className="tv-h2"
          >
            Software to Silicon,<br />
            <span className="text-[#FDB515]">Rust-Native RISC-V.</span>
          </h1>
          <p className="mt-6 text-[15px] leading-[1.7] text-white/60 font-light max-w-md" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
            An open, modular platform for building trustworthy edge silicon and mission-critical embedded software.
          </p>
        </div>
        <div className="text-[11px] font-mono text-white/40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          Powered by Bosch · Made in India
        </div>
      </div>

      {/* Right: form pane */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10">
            <TrustedVLogo size="sm" />
          </div>
          <span className="tv-eyebrow">Sign in</span>
          <h2 className="tv-h2">
            Welcome back.
          </h2>
          <p className="mt-3 text-[15px] text-[#6B6B6B] font-light" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
            Access the TRUSTED-V platform, your projects, and the marketplace.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6" data-testid="login-form">
            <label className="block">
              <span className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#6B6B6B] mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="email-input"
                className="w-full bg-transparent border-b border-[#0A0A0A] py-3 text-[16px] focus:outline-none focus:border-[#003262] transition-colors"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
              />
            </label>
            <label className="block">
              <span className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#6B6B6B] mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="password-input"
                className="w-full bg-transparent border-b border-[#0A0A0A] py-3 text-[16px] focus:outline-none focus:border-[#003262] transition-colors"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              data-testid="login-btn"
              className="tv-btn tv-btn-primary w-full justify-center disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>Sign in <ArrowUpRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-10 text-[12px] text-[#6B6B6B] font-mono" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            Access is invite-only during private preview.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
