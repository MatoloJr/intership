import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockInternships } from "@/lib/mock-data";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ApplyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = mockInternships.find((i) => i.id === id);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "Jane Wanjiku", email: "jane@uon.ac.ke", phone: "+254712345678",
    university: "University of Nairobi", course: "Public Health", year: "3rd Year",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const refNumber = `APP-${Date.now().toString().slice(-6)}`;

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success("Application submitted successfully!");
    // Simulate email confirmation
    setTimeout(() => {
      toast("📧 Confirmation email sent!", {
        description: `A confirmation has been sent to ${form.email} with reference ${refNumber}`,
        duration: 6000,
      });
    }, 1500);
  };

  if (!internship) return <div className="min-h-screen flex items-center justify-center">Not found</div>;

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-8 max-w-md">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-2">Your application for <strong>{internship.title}</strong> has been received.</p>
            <p className="text-sm text-muted-foreground mb-4">Reference: {refNumber}</p>
            <div className="bg-muted rounded-lg p-4 mb-6 flex items-center gap-3 text-left">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <div className="text-sm text-muted-foreground">A confirmation email has been sent to <strong className="text-foreground">{form.email}</strong></div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate("/student/applications")}>View Applications</Button>
              <Button variant="outline" onClick={() => navigate("/internships")}>Browse More</Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground mb-1">Apply: {internship.title}</h1>
        <p className="text-muted-foreground mb-6">{internship.department} · {internship.location}</p>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Personal Details</h2>
              <div><Label>Full Name</Label><Input value={form.name} onChange={(e) => update("name", e.target.value)} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Email</Label><Input value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
                <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
              </div>
              <div><Label>University</Label><Input value={form.university} onChange={(e) => update("university", e.target.value)} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Course</Label><Input value={form.course} onChange={(e) => update("course", e.target.value)} /></div>
                <div><Label>Year</Label><Input value={form.year} onChange={(e) => update("year", e.target.value)} /></div>
              </div>
              <Button className="w-full" size="lg" onClick={() => setStep(2)}>Next: Documents</Button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="s2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Supporting Documents</h2>
              <div><Label>Cover Letter (PDF/Word)</Label><Input type="file" accept=".pdf,.doc,.docx" className="cursor-pointer" /></div>
              <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">✅ Your CV from your profile will be attached automatically.</div>
              <div><Label>Additional Documents (optional)</Label><Input type="file" multiple className="cursor-pointer" /></div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(3)}>Next: Review</Button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="s3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Review & Submit</h2>
              <div className="bg-card rounded-lg border border-border p-6 space-y-3">
                {Object.entries(form).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-muted-foreground capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-medium text-foreground">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1" size="lg" onClick={handleSubmit}>Submit Application</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ApplyForm;
