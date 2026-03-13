import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Mail, Phone, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

const faqs = [
  { q: "How do I apply for an internship?", a: "Browse available internships, click 'View Details', then click 'Apply Now'. Fill in the multi-step application form and submit. You'll receive a confirmation with a reference number." },
  { q: "Can I apply for multiple internships?", a: "Yes! You can apply for as many internships as you qualify for. Each application is reviewed independently." },
  { q: "How do I check my application status?", a: "Go to 'My Applications' in your dashboard. You'll see the status of each application with a detailed timeline of updates." },
  { q: "Can I withdraw an application?", a: "Yes, you can withdraw any pending or under-review application from the 'My Applications' page. Note that this action cannot be undone." },
  { q: "What documents do I need to apply?", a: "You'll need your CV/Resume (PDF format) and a cover letter. Some positions may require additional documents like academic transcripts." },
  { q: "How long does the review process take?", a: "Typically, applications are reviewed within 14 working days. You'll be notified of any status changes via email and in-app notifications." },
  { q: "Is there a stipend for interns?", a: "Some internships are paid with a monthly stipend. This is clearly indicated on each internship listing with the amount in KES." },
  { q: "How do I update my profile?", a: "Navigate to the 'Profile' page from the sidebar. You can update your personal details, academic information and upload new documents." },
];

const StudentHelp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubject, setFeedbackSubject] = useState("");

  const filteredFaqs = faqs.filter((f) => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleFeedback = () => {
    if (!feedbackSubject.trim() || !feedbackText.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Feedback submitted! We'll get back to you soon.");
    setFeedbackSubject("");
    setFeedbackText("");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
      <div className="w-12 h-1 bg-primary" />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search FAQs..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {/* FAQs */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h2 className="font-bold text-lg text-foreground mb-4">Frequently Asked Questions</h2>
        {filteredFaqs.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No results found. Try a different search or contact us below.</p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left font-medium text-foreground">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      {/* Contact & Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-card rounded-lg border border-border shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-foreground">Contact Us</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <span>internships@redcross.or.ke</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <span>+254 20 3950000</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span>Live chat: Mon-Fri, 8AM-5PM</span>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-card rounded-lg border border-border shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-foreground">Submit Feedback</h3>
          <Input placeholder="Subject" value={feedbackSubject} onChange={(e) => setFeedbackSubject(e.target.value)} />
          <Textarea placeholder="Your message..." rows={3} value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} />
          <Button onClick={handleFeedback} className="w-full"><Send className="h-4 w-4 mr-1" />Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default StudentHelp;
