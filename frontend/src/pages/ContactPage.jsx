import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "@/components/PageHero";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const prefillPlan = searchParams.get("plan") || "";
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    country: "",
    interest: prefillPlan ? `Plan: ${prefillPlan}` : "",
    message: "",
  });

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/applications/sales-inquiry`, {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        company: form.company,
        country: form.country,
        product_interest: form.interest,
        message: form.message,
      });
      toast.success("Thank you. Our team will get back to you within 1 business day.");
      setForm({ firstName: "", lastName: "", email: "", company: "", country: "", interest: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-[#0B0F14]">
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s build<br />on RISC-V, together.
          </>
        }
        subtitle="Talk to our engineering team about IP integration, certification, commercial LTS, or partnership on TRUSTED-V."
      />

      <section className="border-b border-[#E5E4DF]" data-testid="contact-body">
        <div className="tv-container py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left: Contact cards */}
            <div className="lg:col-span-5 space-y-8">
              <ContactCard
                icon={<MapPin className="w-4 h-4" />}
                label="Headquarters"
                lines={["Bosch Global Software Technologies", "Bengaluru, India"]}
              />
              <ContactCard
                icon={<Mail className="w-4 h-4" />}
                label="Sales & partnerships"
                lines={["sales@trusted-v.com", "partners@trusted-v.com"]}
              />
              <ContactCard
                icon={<Mail className="w-4 h-4" />}
                label="Engineering & support"
                lines={["engineering@trusted-v.com", "support@trusted-v.com"]}
              />
              <ContactCard
                icon={<Phone className="w-4 h-4" />}
                label="Regional offices"
                lines={["Stuttgart · Yokohama · Detroit · Bengaluru"]}
              />

              <div className="border-t border-[#E5E4DF] pt-8">
                <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5A6472] mb-3" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  Prefer a direct path?
                </div>
                <div className="flex flex-col gap-3">
                  <Link to="/board-support" className="tv-link" data-testid="link-board-support">
                    Request board support <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link to="/partner-registration" className="tv-link" data-testid="link-partner-reg">
                    Apply as a partner <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <form onSubmit={onSubmit} className="space-y-8" data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-8">
                  <Field label="First name *" value={form.firstName} onChange={onChange("firstName")} testid="input-first-name" />
                  <Field label="Last name" value={form.lastName} onChange={onChange("lastName")} testid="input-last-name" />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <Field label="Work email *" type="email" value={form.email} onChange={onChange("email")} testid="input-email" />
                  <Field label="Company" value={form.company} onChange={onChange("company")} testid="input-company" />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <Field label="Country" value={form.country} onChange={onChange("country")} testid="input-country" />
                  <SelectField
                    label="Product interest"
                    value={form.interest}
                    onChange={onChange("interest")}
                    testid="input-interest"
                    options={[
                      "", "Development Platform (IDE)", "Virtualization", "Secure Rust Software", "Silicon SignOff", "Certification", "Consortium / Partnership", "Plan: pro", "Plan: enterprise",
                    ]}
                  />
                </div>
                <Textarea label="Message *" value={form.message} onChange={onChange("message")} testid="input-message" />

                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="tv-btn tv-btn-primary disabled:opacity-60"
                    data-testid="contact-submit"
                  >
                    {submitting ? "Sending..." : "Send message"} <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <span className="text-[12px] text-[#5A6472] font-light" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    We reply within 1 business day.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactCard = ({ icon, label, lines }) => (
  <div className="border-t border-[#E5E4DF] pt-6">
    <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5A6472]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <span className="text-[#003262]">{icon}</span>
      {label}
    </div>
    {lines.map((l) => (
      <div key={l} className="mt-2 text-[15px] text-[#0B0F14]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
        {l}
      </div>
    ))}
  </div>
);

const Field = ({ label, value, onChange, type = "text", testid }) => (
  <label className="block">
    <span className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5A6472] mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {label}
    </span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      data-testid={testid}
      className="w-full bg-transparent border-b border-[#0B0F14] py-3 text-[16px] text-[#0B0F14] focus:outline-none focus:border-[#003262] transition-colors"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    />
  </label>
);

const SelectField = ({ label, value, onChange, options, testid }) => (
  <label className="block">
    <span className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5A6472] mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {label}
    </span>
    <select
      value={value}
      onChange={onChange}
      data-testid={testid}
      className="w-full bg-transparent border-b border-[#0B0F14] py-3 text-[16px] text-[#0B0F14] focus:outline-none focus:border-[#003262] transition-colors"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {options.map((o) => (
        <option key={o} value={o}>{o || "Select an option"}</option>
      ))}
    </select>
  </label>
);

const Textarea = ({ label, value, onChange, testid }) => (
  <label className="block">
    <span className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5A6472] mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {label}
    </span>
    <textarea
      rows={5}
      value={value}
      onChange={onChange}
      data-testid={testid}
      className="w-full bg-transparent border-b border-[#0B0F14] py-3 text-[16px] text-[#0B0F14] resize-none focus:outline-none focus:border-[#003262] transition-colors"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    />
  </label>
);

export default ContactPage;
