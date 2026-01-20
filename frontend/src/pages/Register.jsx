import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cpu, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(email, username, password);
      toast.success("Account created successfully!");
      navigate("/builder");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <Card className="w-full max-w-md bg-card border border-border/50 rounded-sm">
        <CardHeader className="border-b border-border/40 p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-sm bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(183,65,14,0.3)]">
              <Cpu className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <h2 className="font-mono font-bold uppercase tracking-tight text-2xl text-center text-foreground/90">
            Create Account
          </h2>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Start building RISC-V projects
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                Email
              </label>
              <Input
                data-testid="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="bg-muted/20 border-border/50 font-mono text-sm focus:ring-1 focus:ring-primary rounded-sm h-11"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                Username
              </label>
              <Input
                data-testid="username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="username"
                className="bg-muted/20 border-border/50 font-mono text-sm focus:ring-1 focus:ring-primary rounded-sm h-11"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                Password
              </label>
              <Input
                data-testid="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={6}
                className="bg-muted/20 border-border/50 font-mono text-sm focus:ring-1 focus:ring-primary rounded-sm h-11"
              />
            </div>

            <Button
              data-testid="register-btn"
              type="submit"
              disabled={loading}
              className="w-full rounded-sm font-mono uppercase tracking-wider text-xs h-11 shadow-[0_0_10px_rgba(183,65,14,0.3)] hover:shadow-[0_0_20px_rgba(183,65,14,0.5)] transition-all duration-300"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                data-testid="login-link"
                className="text-primary hover:underline font-mono"
              >
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;