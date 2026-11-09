import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ArrowRight, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import TrustedVLogo from "@/components/TrustedVLogo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "./Login.css";

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
    <main className="login-minimal" data-testid="login-page">
      <div className="login-minimal-content">
        <div className="login-minimal-brand" data-testid="login-brand-lockup">
          <TrustedVLogo size="2xl" />
        </div>
        <div className="login-minimal-heading">
          <h1 data-testid="login-title">Welcome back.</h1>
          <p data-testid="login-subtitle">Sign in to your TRUSTED-V workspace.</p>
        </div>
        <form onSubmit={handleSubmit} className="login-minimal-form" data-testid="login-form" aria-busy={loading}>
          <div className="login-minimal-field">
            <Label htmlFor="login-email" data-testid="login-email-label">Work email</Label>
            <Input id="login-email" name="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@company.com" data-testid="email-input" />
          </div>
          <div className="login-minimal-field">
            <Label htmlFor="login-password" data-testid="login-password-label">Password</Label>
            <Input id="login-password" name="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" data-testid="password-input" />
          </div>
          <Button type="submit" disabled={loading} className="login-minimal-submit" data-testid="login-btn">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /><span role="status" data-testid="login-loading-status">Signing in…</span></> : <>Sign in<ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
          </Button>
        </form>
        <div className="login-minimal-note" data-testid="login-access-note"><LockKeyhole size={13} aria-hidden="true" /><span>Invite-only access</span></div>
      </div>
    </main>
  );
};

export default Login;