import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cpu, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
        // Use setTimeout to ensure state updates are processed before navigation
        setTimeout(() => {
          navigate("/builder", { replace: true });
        }, 100);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-muted/30">
      <Card className="w-full max-w-md bg-card border border-border shadow-xl">
        <CardHeader className="space-y-4 p-8 pb-6">
          <div className="flex items-center justify-center">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <Cpu className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to access your RISC-V projects
            </p>
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
                placeholder="you@example.com"
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
                "Sign In"
              )}
            </Button>
          </form>

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

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Demo credentials: admin@rvrust.com / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
