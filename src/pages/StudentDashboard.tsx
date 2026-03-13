import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import InternshipCard from "@/components/InternshipCard";
import { mockInternships, mockApplications, getStatusColor, getStatusLabel } from "@/lib/mock-data";
import { Calendar, Clock } from "lucide-react";

const statusCounts = {
  pending: mockApplications.filter((a) => a.status === "pending").length,
  under_review: mockApplications.filter((a) => a.status === "under_review").length,
  shortlisted: mockApplications.filter((a) => a.status === "shortlisted").length,
  rejected: mockApplications.filter((a) => a.status === "rejected").length,
};

const StudentDashboard = () => {
  const recommended = mockInternships.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-primary rounded-lg p-6 text-primary-foreground">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Welcome back, Jane! 👋</h1>
        <p className="text-primary-foreground/80 text-sm mb-3">Your profile is 75% complete. Complete it to get better recommendations.</p>
        <Progress value={75} className="h-2 bg-primary-foreground/20" />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {([["pending", "Pending", "🟡"], ["under_review", "Under Review", "🔵"], ["shortlisted", "Shortlisted", "🟢"], ["rejected", "Rejected", "🔴"]] as const).map(([key, label, emoji]) => (
          <div key={key} className="bg-card rounded-lg border border-border p-4 shadow-sm">
            <div className="text-2xl mb-1">{emoji}</div>
            <div className="text-2xl font-bold text-foreground">{statusCounts[key]}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* Recommended */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3">Recommended For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommended.map((i) => <InternshipCard key={i.id} internship={i} />)}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
          <h3 className="font-bold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {mockApplications.slice(0, 3).map((app) => (
              <div key={app.id} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0" />
                <div>
                  <p className="text-foreground">{app.timeline[app.timeline.length - 1].action}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{app.timeline[app.timeline.length - 1].date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" /> Upcoming Deadlines
          </h3>
          <div className="space-y-3">
            {mockInternships.slice(0, 3).map((i) => (
              <div key={i.id} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{i.title}</span>
                <Badge className="bg-primary/10 text-primary border-0 text-xs">{new Date(i.deadline).toLocaleDateString()}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
