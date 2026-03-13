import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { mockApplications, getStatusColor, getStatusLabel } from "@/lib/mock-data";
import { ChevronDown, ChevronUp, LayoutGrid, List, Star } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { Application } from "@/lib/mock-data";

const MyApplications = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [view, setView] = useState<"card" | "table">("card");
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [feedbackApp, setFeedbackApp] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  const handleWithdraw = (id: string) => {
    setApplications(applications.filter((a) => a.id !== id));
    toast.success(`Application ${id} withdrawn successfully`);
  };

  const handleFeedback = (id: string) => {
    if (!feedbackText.trim()) { toast.error("Please enter your feedback"); return; }
    toast.success("Thank you for your feedback!");
    setFeedbackApp(null);
    setFeedbackText("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Applications</h1>
          <p className="text-sm text-muted-foreground">{applications.length} applications</p>
        </div>
        <div className="flex gap-1">
          <Button variant={view === "card" ? "default" : "ghost"} size="icon" onClick={() => setView("card")}><LayoutGrid className="h-4 w-4" /></Button>
          <Button variant={view === "table" ? "default" : "ghost"} size="icon" onClick={() => setView("table")}><List className="h-4 w-4" /></Button>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-lg border border-border">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-primary/40" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Applications Yet</h3>
          <p className="text-muted-foreground text-sm">Start browsing internships and apply to get started!</p>
        </div>
      ) : view === "card" ? (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer" onClick={() => setExpanded(expanded === app.id ? null : app.id)}>
                <div>
                  <h3 className="font-semibold text-foreground">{app.internshipTitle}</h3>
                  <p className="text-sm text-muted-foreground">{app.department} · Applied {app.dateApplied}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${getStatusColor(app.status)} border-0`}>{getStatusLabel(app.status)}</Badge>
                  {expanded === app.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </div>
              {expanded === app.id && (
                <div className="border-t border-border px-5 py-4 bg-muted/30 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Status Timeline</h4>
                    <div className="space-y-2 mb-4">
                      {app.timeline.map((t, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0" />
                          <div>
                            <span className="text-foreground">{t.action}</span>
                            <span className="text-muted-foreground ml-2"> {t.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {app.status !== "rejected" && app.status !== "accepted" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">Withdraw</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Withdraw Application?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone. You will need to re-apply if you change your mind.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleWithdraw(app.id)} className="bg-destructive text-destructive-foreground">Withdraw</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                    <Button variant="outline" size="sm" onClick={() => setFeedbackApp(feedbackApp === app.id ? null : app.id)}>
                      <Star className="h-3.5 w-3.5 mr-1" />Give Feedback
                    </Button>
                  </div>

                  {feedbackApp === app.id && (
                    <div className="bg-card rounded-lg border border-border p-4 space-y-3">
                      <h5 className="text-sm font-semibold text-foreground">Your Feedback</h5>
                      <Textarea placeholder="Share your experience or suggestions..." value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} rows={3} />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleFeedback(app.id)}>Submit Feedback</Button>
                        <Button size="sm" variant="ghost" onClick={() => { setFeedbackApp(null); setFeedbackText(""); }}>Cancel</Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">Internship</th>
                <th className="text-left p-3 font-semibold text-foreground">Department</th>
                <th className="text-left p-3 font-semibold text-foreground">Applied</th>
                <th className="text-left p-3 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="p-3 text-foreground font-medium">{app.internshipTitle}</td>
                  <td className="p-3 text-muted-foreground">{app.department}</td>
                  <td className="p-3 text-muted-foreground">{app.dateApplied}</td>
                  <td className="p-3"><Badge className={`${getStatusColor(app.status)} border-0`}>{getStatusLabel(app.status)}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
