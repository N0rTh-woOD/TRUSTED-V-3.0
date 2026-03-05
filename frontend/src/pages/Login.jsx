import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, Lock, Shield } from "lucide-react";
import { toast } from "sonner";
import TrustedVLogo from "@/components/TrustedVLogo";

const Login = ({ developmentMode = false }) => {
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
        // Use setTimeout to ensure state updates are processed before navigation
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
          {/* Development Mode Banner */}
          {developmentMode && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 -mx-2">
              <div className="flex items-center gap-2 text-amber-800">
                <Lock className="w-5 h-5" />
                <span className="font-semibold text-sm">Development Mode</span>
              </div>
              <p className="text-amber-700 text-xs mt-1">
                This platform is under development. Admin authentication required for access.
              </p>
            </div>
          )}
          
          <div className="flex flex-col items-center justify-center gap-4">
            <TrustedVLogo size="lg" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                {developmentMode ? "Admin Access Required" : "Welcome Back"}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {developmentMode 
                  ? "Sign in with admin credentials to access the platform"
                  : "Sign in to access your RISC-V projects"
                }
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
                placeholder="admin@trusted-v.com"
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
                  <Shield className="w-4 h-4 mr-2" />
                  {developmentMode ? "Access Platform" : "Sign In"}
                </>
              )}
            </Button>
          </form>

          {!developmentMode && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  data-testid="register-link"
                  className="text-primary hover:underline font-medium"
                >
                  Create Account
                </Link>
              </p>
            </div>
          )}

          {/* Bosch association footer */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-3">
              <img 
                src="/bosch-logo.png" 
                alt="" 
                className="h-5 opacity-60"
              />
              <span className="text-xs text-muted-foreground">
                Secure RISC-V Development Platform
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
