import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Contact Us</h1>
            <p className="text-primary-foreground/80">Have questions? We'd love to hear from you.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Get In Touch</h2>
              <div className="w-12 h-1 bg-primary" />
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Address", value: "Kenya Red Cross Society Headquarters\nSouth C, Bellevue, off Mombasa Road\nP.O. Box 40712-00100, Nairobi" },
                  { icon: Phone, label: "Phone", value: "+254 20 3950000\n+254 703 037000" },
                  { icon: Mail, label: "Email", value: "internships@redcross.or.ke\ninfo@redcross.or.ke" },
                  { icon: Clock, label: "Working Hours", value: "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 bg-card rounded-lg border border-border p-4 shadow-sm">
                    <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground text-sm">{item.label}</div>
                      <div className="text-sm text-muted-foreground whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Name *</Label><Input value={form.name} onChange={(e) => update("name", e.target.value)} /></div>
                  <div><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
                </div>
                <div><Label>Subject</Label><Input value={form.subject} onChange={(e) => update("subject", e.target.value)} /></div>
                <div><Label>Message *</Label><Textarea rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} /></div>
                <Button type="submit" className="w-full" size="lg"><Send className="h-4 w-4 mr-1" />Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
