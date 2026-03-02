import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowRight, CheckCircle2, Building2, Cpu, Code, 
  GraduationCap, Rocket, Send, ArrowLeft
} from "lucide-react";
import { toast } from "sonner";

const PartnerRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    partnerType: "",
    productCategory: [],
    description: "",
    motivation: "",
    agreeTerms: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const partnerTypes = [
    { id: "hardware", label: "Hardware Vendor", icon: Cpu, description: "RISC-V silicon, boards, or modules" },
    { id: "software", label: "Software Provider", icon: Code, description: "RTOS, middleware, or tools" },
    { id: "academic", label: "Academic Institution", icon: GraduationCap, description: "University or research lab" },
    { id: "integrator", label: "System Integrator", icon: Rocket, description: "Solution provider or consultancy" },
  ];

  const productCategories = [
    "Development Boards",
    "Microcontrollers",
    "SoCs / Processors",
    "RTOS / OS",
    "Development Tools",
    "SDKs / Libraries",
    "Debug Tools",
    "Security Solutions",
    "AI / ML Accelerators",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      productCategory: prev.productCategory.includes(category)
        ? prev.productCategory.filter(c => c !== category)
        : [...prev.productCategory, category]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.email || !formData.partnerType || !formData.agreeTerms) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Partnership application submitted successfully!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Application Submitted!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your interest in partnering with TrusteD-V. Our team will review your 
            application and get back to you within 5 business days.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Link to="/partners" className="text-sm text-primary hover:underline flex items-center gap-1 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Partners
            </Link>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Partner Registration</span>
            <h1 className="text-4xl font-bold text-foreground mt-2 mb-4">
              Become a Partner
            </h1>
            <p className="text-lg text-muted-foreground">
              Join our ecosystem and help shape the future of secure RISC-V development. 
              Fill out the form below to apply for partnership.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Partner Type Selection */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-foreground">Partner Type *</h2>
                <p className="text-sm text-muted-foreground">Select the category that best describes your organization</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {partnerTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = formData.partnerType === type.id;
                    return (
                      <div
                        key={type.id}
                        onClick={() => setFormData(prev => ({ ...prev, partnerType: type.id }))}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-primary/10" : "bg-slate-100"
                          }`}>
                            <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{type.label}</h3>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-foreground">Company Information</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Company / Organization Name *
                    </label>
                    <Input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Acme Technologies"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Website
                    </label>
                    <Input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Contact Name *
                    </label>
                    <Input
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Categories */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-foreground">Product Categories</h2>
                <p className="text-sm text-muted-foreground">Select all that apply to your offerings</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {productCategories.map((category) => {
                    const isSelected = formData.productCategory.includes(category);
                    return (
                      <Badge
                        key={category}
                        variant={isSelected ? "default" : "outline"}
                        className="cursor-pointer px-3 py-1.5"
                        onClick={() => handleCategoryToggle(category)}
                      >
                        {isSelected && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {category}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-foreground">About Your Organization</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Company Description *
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of your company and products/services..."
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Why do you want to partner with TrusteD-V?
                  </label>
                  <Textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    placeholder="Tell us about your goals and how we can work together..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Terms & Submit */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-6">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeTerms: checked }))}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    I agree to the TrusteD-V Partner Program Terms and Conditions and acknowledge that 
                    this application will be reviewed by the TrusteD-V partnership team. *
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto font-semibold"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PartnerRegistration;
