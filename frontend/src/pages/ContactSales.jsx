import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  ArrowRight, CheckCircle2, Mail, Building2, User, 
  MessageSquare, Cpu, Phone
} from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ContactSales = () => {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get("plan") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    plan: planParam || "pro",
    message: "",
    teamSize: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const plans = [
    { value: "basic", label: "Basic" },
    { value: "pro", label: "Pro" },
    { value: "enterprise", label: "Enterprise" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/applications/sales-inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sales_inquiry",
          data: { ...form },
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Inquiry submitted successfully!");
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" data-testid="sales-success">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Thank You!</h2>
          <p className="text-muted-foreground mb-2">
            Your sales inquiry has been submitted. Our team will review your requirements and reach out within <strong>1-2 business days</strong>.
          </p>
          <p className="text-sm text-muted-foreground">
            Selected plan: <span className="font-semibold capitalize">{form.plan}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" data-testid="contact-sales-page">
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Sales</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4">
              Talk to Our Sales Team
            </h1>
            <p className="text-base text-muted-foreground">
              Tell us about your project requirements and team size. We'll help you find the right plan and get you started.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            {/* Form */}
            <Card className="lg:col-span-3 border-border">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="name" 
                          data-testid="sales-name"
                          className="pl-9" 
                          placeholder="Your name" 
                          value={form.name}
                          onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                          required 
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Work Email *</Label>
                      <div className="relative mt-1.5">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          data-testid="sales-email"
                          type="email" 
                          className="pl-9" 
                          placeholder="you@company.com" 
                          value={form.email}
                          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                          required 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium">Company *</Label>
                      <div className="relative mt-1.5">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="company" 
                          data-testid="sales-company"
                          className="pl-9" 
                          placeholder="Company name" 
                          value={form.company}
                          onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
                          required 
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                      <div className="relative mt-1.5">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="phone" 
                          data-testid="sales-phone"
                          className="pl-9" 
                          placeholder="+91 ..." 
                          value={form.phone}
                          onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="plan" className="text-sm font-medium">Interested Plan</Label>
                      <select 
                        id="plan"
                        data-testid="sales-plan"
                        className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        value={form.plan}
                        onChange={(e) => setForm(f => ({ ...f, plan: e.target.value }))}
                      >
                        {plans.map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="teamSize" className="text-sm font-medium">Team Size</Label>
                      <select 
                        id="teamSize"
                        data-testid="sales-team-size"
                        className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        value={form.teamSize}
                        onChange={(e) => setForm(f => ({ ...f, teamSize: e.target.value }))}
                      >
                        <option value="">Select</option>
                        <option value="1-5">1-5 developers</option>
                        <option value="6-20">6-20 developers</option>
                        <option value="21-50">21-50 developers</option>
                        <option value="50+">50+ developers</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium">Project Details *</Label>
                    <textarea 
                      id="message"
                      data-testid="sales-message"
                      className="mt-1.5 w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                      placeholder="Tell us about your RISC-V project, target hardware, and requirements..."
                      value={form.message}
                      onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    data-testid="sales-submit-btn"
                    className="w-full h-11 text-base font-semibold" 
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Inquiry"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Side info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">What happens next?</h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                      We review your requirements within 24 hours
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                      A solutions engineer will schedule a call
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                      We prepare a tailored proposal for your team
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Quick Contact</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      sales@trusted-v.com
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Cpu className="w-4 h-4 text-primary" />
                      RISC-V Solutions Team
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-slate-50 rounded-lg p-5 border border-border">
                <h4 className="font-semibold text-foreground text-sm mb-2">Looking for something else?</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/partner-registration" className="text-primary hover:underline">Become a Hardware Partner</a></li>
                  <li><a href="/board-support" className="text-primary hover:underline">Request Board Support</a></li>
                  <li><a href="/download-ide" className="text-primary hover:underline">Jarvyn IDE, coming soon</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSales;
