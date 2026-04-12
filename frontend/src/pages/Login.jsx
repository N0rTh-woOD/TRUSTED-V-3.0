import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, LogIn } from "lucide-react";
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
        toast.success("Welcome back!");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 100);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Bosch-style top border */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#E20015] z-50" />
      
      <Card className="w-full max-w-md bg-card border border-border shadow-2xl">
        <CardHeader className="space-y-6 p-8 pb-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <TrustedVLogo size="lg" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                Welcome Back
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Sign in to access the platform
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                data-testid="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                data-testid="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="h-11"
              />
            </div>

            <Button
              data-testid="login-btn"
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base font-medium shadow-lg shadow-primary/25"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Demo Credentials</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email:</span>
                <code className="text-xs bg-white px-2 py-0.5 rounded border font-mono">demo@trusted-v.com</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Password:</span>
                <code className="text-xs bg-white px-2 py-0.5 rounded border font-mono">demo@2025</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
