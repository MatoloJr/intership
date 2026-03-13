import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockInternships, mockApplications, getStatusColor, getStatusLabel } from "@/lib/mock-data";
import { PlusCircle, FileText, Download, Briefcase, Users, Clock } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const activePostings = mockInternships.filter((i) => i.status === "published").length;
  const totalApps = mockApplications.length;
  const pendingReviews = mockApplications.filter((a) => a.status === "pending").length;
  const shortlisted = mockApplications.filter((a) => a.status === "shortlisted" || a.status === "accepted").length;

  const handleExport = () => {
    const csvRows = [
      ["ID", "Name", "Internship", "Department", "Date", "Status"].join(","),
      ...mockApplications.map((a) => [a.id, a.applicantName, a.internshipTitle, a.department, a.dateApplied, a.status].join(","))
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "krcs-report.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Report exported!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <Link to="/admin/post-internship"><Button><PlusCircle className="h-4 w-4 mr-1" />Post Internship</Button></Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Postings", value: activePostings, icon: Briefcase, color: "text-primary" },
          { label: "Total Applications", value: totalApps, icon: FileText, color: "text-blue-600" },
          { label: "Pending Reviews", value: pendingReviews, icon: Clock, color: "text-amber-600" },
          { label: "Shortlisted", value: shortlisted, icon: Users, color: "text-green-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border border-border p-5 shadow-sm">
            <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
          <h3 className="font-bold text-foreground mb-4">Application Volume (30 days)</h3>
          <div className="h-40 flex items-end gap-1">
            {Array.from({ length: 30 }, (_, i) => {
              const h = Math.random() * 80 + 20;
              return <div key={i} className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t transition-colors" style={{ height: `${h}%` }} />;
            })}
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
          <h3 className="font-bold text-foreground mb-4">Applications by Department</h3>
          <div className="space-y-3">
            {[{ name: "Health", pct: 35 }, { name: "IT", pct: 28 }, { name: "Disaster Response", pct: 18 }, { name: "Communication", pct: 12 }, { name: "Finance", pct: 7 }].map((d) => (
              <div key={d.name} className="flex items-center gap-3 text-sm">
                <span className="w-28 text-muted-foreground">{d.name}</span>
                <div className="flex-1 bg-muted rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{ width: `${d.pct}%` }} /></div>
                <span className="text-foreground font-medium w-8 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-x-auto">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-foreground">Recent Applications</h3>
          <Link to="/admin/applications"><Button variant="ghost" size="sm">View All</Button></Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-semibold text-foreground">Name</th>
              <th className="text-left p-3 font-semibold text-foreground">Internship</th>
              <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">Date</th>
              <th className="text-left p-3 font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockApplications.map((app) => (
              <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="p-3 text-foreground font-medium">{app.applicantName}</td>
                <td className="p-3 text-muted-foreground">{app.internshipTitle}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{app.dateApplied}</td>
                <td className="p-3"><Badge className={`${getStatusColor(app.status)} border-0`}>{getStatusLabel(app.status)}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/admin/post-internship"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-2"><PlusCircle className="h-5 w-5" />Post New Internship</Button></Link>
        <Link to="/admin/applications"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-2"><FileText className="h-5 w-5" />Review Applications</Button></Link>
        <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" onClick={handleExport}><Download className="h-5 w-5" />Export Report</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
