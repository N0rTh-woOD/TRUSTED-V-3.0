import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ContactPage = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", country: "", product: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}/api/applications/sales-inquiry`, {
        type: "contact",
        data: form,
      });
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch.");
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white" data-testid="contact-page">
      {/* Hero */}
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Talk to our engineering team about RISC-V solutions, partnerships, or custom development."
      />

      {/* Contact info + Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
            {/* Left: Info cards */}
            <div className="space-y-5">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Headquarters</h3>
                      <p className="text-sm text-muted-foreground">Bosch Global Software Technologies</p>
                      <p className="text-sm text-muted-foreground">Bangalore, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">partnerships@trusted-v.com</p>
                      <p className="text-sm text-muted-foreground">support@trusted-v.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Global Offices</h3>
                      <p className="text-sm text-muted-foreground">Bangalore | Coimbatore | Hyderabad</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Form */}
            <Card className="border-border">
              <CardContent className="p-6 sm:p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">Message Sent</h3>
                    <p className="text-sm text-muted-foreground">Our engineering team will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">First Name *</label>
                        <Input required value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))} data-testid="contact-first-name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Last Name *</label>
                        <Input required value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))} data-testid="contact-last-name" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Work Email *</label>
                      <Input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} data-testid="contact-email" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Company</label>
                        <Input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Country</label>
                        <Input value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Product Interest</label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={form.product} onChange={e => setForm(p => ({ ...p, product: e.target.value }))}>
                        <option value="">Select a product</option>
                        <option value="software-toolchain">TRUSTED-V Software & Toolchain</option>
                        <option value="signoff-silicon">SignOff Silicon</option>
                        <option value="ide-jarvyn">Jarvyn IDE</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Message *</label>
                      <Textarea required rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} data-testid="contact-message" />
                    </div>
                    <Button type="submit" className="w-full" disabled={submitting} data-testid="contact-submit">
                      {submitting ? "Sending..." : <>Send Message <Send className="w-4 h-4 ml-2" /></>}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
