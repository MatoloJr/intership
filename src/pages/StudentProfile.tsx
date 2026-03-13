import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Camera, Save } from "lucide-react";
import { toast } from "sonner";

const StudentProfile = () => {
  const [form, setForm] = useState({
    name: "Jane Wanjiku",
    email: "jane@uon.ac.ke",
    phone: "+254712345678",
    county: "Nairobi",
    university: "University of Nairobi",
    course: "Public Health",
    year: "3rd Year",
    bio: "Passionate about community health and humanitarian work. Currently pursuing a degree in Public Health with a focus on epidemiology.",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const completionFields = Object.values(form).filter((v) => v.trim() !== "").length;
  const totalFields = Object.keys(form).length;
  const completion = Math.round((completionFields / totalFields) * 100);

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
      <div className="w-12 h-1 bg-primary" />

      {/* Profile completion */}
      <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Profile Completion</span>
          <span className="text-sm font-bold text-primary">{completion}%</span>
        </div>
        <Progress value={completion} className="h-2" />
        {completion < 100 && (
          <p className="text-xs text-muted-foreground mt-2">Complete your profile to get better internship recommendations.</p>
        )}
      </div>

      {/* Avatar */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
              JW
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-card border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-muted transition-colors">
              <Camera className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
          <div>
            <h2 className="font-bold text-foreground text-lg">{form.name}</h2>
            <p className="text-sm text-muted-foreground">{form.university}</p>
            <p className="text-sm text-muted-foreground">{form.course} · {form.year}</p>
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-foreground">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Full Name</Label><Input value={form.name} onChange={(e) => update("name", e.target.value)} /></div>
          <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
          <div><Label>Phone Number</Label><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
          <div><Label>County/Location</Label><Input value={form.county} onChange={(e) => update("county", e.target.value)} /></div>
        </div>
      </div>

      {/* Academic Details */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-foreground">Academic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>University/College</Label><Input value={form.university} onChange={(e) => update("university", e.target.value)} /></div>
          <div><Label>Course of Study</Label><Input value={form.course} onChange={(e) => update("course", e.target.value)} /></div>
          <div><Label>Year of Study</Label><Input value={form.year} onChange={(e) => update("year", e.target.value)} /></div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-foreground">Bio</h3>
        <Textarea rows={4} value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="Tell us about yourself..." />
      </div>

      {/* Documents */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-foreground">Documents</h3>
        <div>
          <Label>CV / Resume (PDF)</Label>
          <Input type="file" accept=".pdf" className="cursor-pointer mt-1" />
          <p className="text-xs text-muted-foreground mt-1">Your CV will be auto-attached to all applications.</p>
        </div>
        <div>
          <Label>Profile Photo</Label>
          <Input type="file" accept="image/*" className="cursor-pointer mt-1" />
        </div>
      </div>

      <Button size="lg" onClick={handleSave} className="w-full sm:w-auto">
        <Save className="h-4 w-4 mr-1" />Save Changes
      </Button>
    </div>
  );
};

export default StudentProfile;
