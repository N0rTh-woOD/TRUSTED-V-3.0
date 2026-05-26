import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Cpu, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const BoardSupportRequest = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    board_name: "",
    board_manufacturer: "",
    architecture: "RISC-V",
    description: "",
    use_case: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company_name || !formData.contact_name || !formData.email || !formData.board_name || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}/api/applications/board-support`, formData);
      toast.success("Board support request submitted successfully!");
      setSubmitted(true);
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" data-testid="board-support-success">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Request Submitted</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for your board support request. Our team will review it and get back to you within 3-5 business days.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/hardware-catalog"><Button variant="outline">View Hardware Catalog</Button></Link>
            <Link to="/"><Button>Back to Home</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" data-testid="board-support-page">
      <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/hardware-catalog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Hardware Catalog
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Request Board Support</h1>
              <p className="text-muted-foreground">Submit a request to add support for your RISC-V board</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <Card>
              <CardHeader><h2 className="text-lg font-semibold text-foreground">Contact Information</h2></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Company Name *</label>
                    <Input value={formData.company_name} onChange={(e) => setFormData(prev => ({...prev, company_name: e.target.value}))} placeholder="Your company" data-testid="board-company-input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Contact Name *</label>
                    <Input value={formData.contact_name} onChange={(e) => setFormData(prev => ({...prev, contact_name: e.target.value}))} placeholder="Your name" data-testid="board-contact-input" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email *</label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))} placeholder="your@email.com" data-testid="board-email-input" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><h2 className="text-lg font-semibold text-foreground">Board Details</h2></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Board Name *</label>
                    <Input value={formData.board_name} onChange={(e) => setFormData(prev => ({...prev, board_name: e.target.value}))} placeholder="e.g., MyBoard V2" data-testid="board-name-input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Board Manufacturer *</label>
                    <Input value={formData.board_manufacturer} onChange={(e) => setFormData(prev => ({...prev, board_manufacturer: e.target.value}))} placeholder="e.g., C-DAC" data-testid="board-manufacturer-input" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Architecture</label>
                  <Input value={formData.architecture} onChange={(e) => setFormData(prev => ({...prev, architecture: e.target.value}))} placeholder="RISC-V" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Board Description *</label>
                  <Textarea value={formData.description} onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} placeholder="Describe the board specs, processor, memory, peripherals..." rows={4} data-testid="board-description-input" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Intended Use Case</label>
                  <Textarea value={formData.use_case} onChange={(e) => setFormData(prev => ({...prev, use_case: e.target.value}))} placeholder="How do you plan to use this board with TRUSTED-V?" rows={3} />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full md:w-auto font-semibold" disabled={submitting} data-testid="submit-board-request-btn">
              {submitting ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Submitting...</>
              ) : (
                <><Send className="w-4 h-4 mr-2" />Submit Request</>
              )}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BoardSupportRequest;
