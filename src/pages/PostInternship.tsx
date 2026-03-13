import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, X } from "lucide-react";
import { departments, locations, durations } from "@/lib/mock-data";
import { toast } from "sonner";

const PostInternship = () => {
  const [form, setForm] = useState({
    title: "", department: "", location: "", duration: "", positions: "1", deadline: "",
    stipendType: "unpaid", stipendAmount: "", description: "", status: "draft",
  });
  const [responsibilities, setResponsibilities] = useState([""]);
  const [requirements, setRequirements] = useState([""]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handlePublish = () => { toast.success("Internship published!"); };
  const handleDraft = () => { toast.success("Saved as draft"); };

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Post New Internship</h1>
      <div className="w-12 h-1 bg-primary" />

      <div className="space-y-5">
        <div><Label>Internship Title</Label><Input placeholder="e.g. Public Health Intern" value={form.title} onChange={(e) => update("title", e.target.value)} /></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Department</Label>
            <Select value={form.department} onValueChange={(v) => update("department", v)}>
              <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
              <SelectContent>{departments.map((d) => <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Location</Label>
            <Select value={form.location} onValueChange={(v) => update("location", v)}>
              <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
              <SelectContent>{locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Duration</Label>
            <Select value={form.duration} onValueChange={(v) => update("duration", v)}>
              <SelectTrigger><SelectValue placeholder="Duration" /></SelectTrigger>
              <SelectContent>{durations.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>Positions</Label><Input type="number" min="1" value={form.positions} onChange={(e) => update("positions", e.target.value)} /></div>
          <div><Label>Application Deadline</Label><Input type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} /></div>
        </div>

        <div className="flex items-center gap-4">
          <Label>Stipend</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Unpaid</span>
            <Switch checked={form.stipendType === "paid"} onCheckedChange={(c) => update("stipendType", c ? "paid" : "unpaid")} />
            <span className="text-sm text-muted-foreground">Paid</span>
          </div>
          {form.stipendType === "paid" && (
            <Input placeholder="Amount in KES" className="w-40" value={form.stipendAmount} onChange={(e) => update("stipendAmount", e.target.value)} />
          )}
        </div>

        <div><Label>Description</Label><Textarea rows={5} placeholder="Describe the internship..." value={form.description} onChange={(e) => update("description", e.target.value)} /></div>

        <div>
          <Label>Responsibilities</Label>
          {responsibilities.map((r, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <Input value={r} onChange={(e) => { const n = [...responsibilities]; n[i] = e.target.value; setResponsibilities(n); }} placeholder={`Responsibility ${i + 1}`} />
              {responsibilities.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => setResponsibilities(responsibilities.filter((_, j) => j !== i))}><Minus className="h-4 w-4" /></Button>
              )}
            </div>
          ))}
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => setResponsibilities([...responsibilities, ""])}><Plus className="h-4 w-4 mr-1" />Add</Button>
        </div>

        <div>
          <Label>Requirements</Label>
          {requirements.map((r, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <Input value={r} onChange={(e) => { const n = [...requirements]; n[i] = e.target.value; setRequirements(n); }} placeholder={`Requirement ${i + 1}`} />
              {requirements.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => setRequirements(requirements.filter((_, j) => j !== i))}><Minus className="h-4 w-4" /></Button>
              )}
            </div>
          ))}
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => setRequirements([...requirements, ""])}><Plus className="h-4 w-4 mr-1" />Add</Button>
        </div>

        <div>
          <Label>Skills</Label>
          <div className="flex gap-2 mt-2">
            <Input placeholder="Add a skill" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} />
            <Button variant="outline" onClick={addSkill}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((s) => (
              <Badge key={s} variant="secondary" className="gap-1">{s}<button onClick={() => setSkills(skills.filter((x) => x !== s))}><X className="h-3 w-3" /></button></Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" size="lg" onClick={handleDraft}>Save as Draft</Button>
          <Button size="lg" onClick={handlePublish}>Publish Now</Button>
        </div>
      </div>
    </div>
  );
};

export default PostInternship;
