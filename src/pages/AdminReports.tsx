import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockInternships, mockApplications, departments } from "@/lib/mock-data";
import { Download, FileText, Users, Briefcase, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AdminReports = () => {
  const [period, setPeriod] = useState("month");

  const totalApps = mockApplications.length;
  const accepted = mockApplications.filter((a) => a.status === "accepted").length;
  const rejected = mockApplications.filter((a) => a.status === "rejected").length;
  const pending = mockApplications.filter((a) => a.status === "pending" || a.status === "under_review").length;
  const activePostings = mockInternships.filter((i) => i.status === "published").length;
  const conversionRate = totalApps > 0 ? Math.round((accepted / totalApps) * 100) : 0;

  const deptStats = departments.map((d) => ({
    name: d.name,
    apps: mockApplications.filter((a) => a.department === d.name).length,
    postings: mockInternships.filter((i) => i.department === d.name).length,
  })).filter((d) => d.apps > 0 || d.postings > 0);

  const handleExport = (type: string) => {
    toast.success(`${type} report downloaded!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExport("Full")}>
            <Download className="h-4 w-4 mr-1" />Export All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Applications", value: totalApps, icon: FileText, color: "text-blue-600" },
          { label: "Active Postings", value: activePostings, icon: Briefcase, color: "text-primary" },
          { label: "Accepted", value: accepted, icon: Users, color: "text-green-600" },
          { label: "Conversion Rate", value: `${conversionRate}%`, icon: TrendingUp, color: "text-amber-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border border-border p-5 shadow-sm">
            <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Application Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Application Status Breakdown</h3>
            <Button variant="ghost" size="sm" onClick={() => handleExport("Status")}><Download className="h-3.5 w-3.5" /></Button>
          </div>
          <div className="space-y-3">
            {[
              { label: "Pending / Under Review", count: pending, color: "bg-amber-500" },
              { label: "Accepted", count: accepted, color: "bg-green-500" },
              { label: "Rejected", count: rejected, color: "bg-red-500" },
              { label: "Shortlisted", count: mockApplications.filter((a) => a.status === "shortlisted").length, color: "bg-blue-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-sm">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="flex-1 text-muted-foreground">{item.label}</span>
                <span className="font-bold text-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">By Department</h3>
            <Button variant="ghost" size="sm" onClick={() => handleExport("Department")}><Download className="h-3.5 w-3.5" /></Button>
          </div>
          <div className="space-y-3">
            {deptStats.map((d) => (
              <div key={d.name} className="flex items-center gap-3 text-sm">
                <span className="flex-1 text-muted-foreground">{d.name}</span>
                <Badge className="bg-primary/10 text-primary border-0">{d.apps} apps</Badge>
                <Badge variant="secondary">{d.postings} posts</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* University Breakdown */}
      <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">Applications by University</h3>
          <Button variant="ghost" size="sm" onClick={() => handleExport("University")}><Download className="h-3.5 w-3.5" /></Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">University</th>
                <th className="text-left p-3 font-semibold text-foreground">Applications</th>
                <th className="text-left p-3 font-semibold text-foreground">Accepted</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(new Set(mockApplications.map((a) => a.university))).map((uni) => {
                const uniApps = mockApplications.filter((a) => a.university === uni);
                return (
                  <tr key={uni} className="border-b border-border last:border-0">
                    <td className="p-3 text-foreground">{uni}</td>
                    <td className="p-3 text-muted-foreground">{uniApps.length}</td>
                    <td className="p-3 text-muted-foreground">{uniApps.filter((a) => a.status === "accepted").length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
        <h3 className="font-bold text-foreground mb-4">Export Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button variant="outline" onClick={() => handleExport("Applications CSV")}><Download className="h-4 w-4 mr-1" />Applications (CSV)</Button>
          <Button variant="outline" onClick={() => handleExport("Postings CSV")}><Download className="h-4 w-4 mr-1" />Postings (CSV)</Button>
          <Button variant="outline" onClick={() => handleExport("Summary PDF")}><Download className="h-4 w-4 mr-1" />Summary (PDF)</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
