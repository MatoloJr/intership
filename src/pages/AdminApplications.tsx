import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { mockApplications, getStatusColor, getStatusLabel, departments } from "@/lib/mock-data";
import { Search, Download, Eye } from "lucide-react";
import { toast } from "sonner";
import type { Application } from "@/lib/mock-data";

const AdminApplications = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [selected, setSelected] = useState<Application | null>(null);
  const [applications, setApplications] = useState(mockApplications);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  let filtered = [...applications];
  if (search) filtered = filtered.filter((a) => a.applicantName.toLowerCase().includes(search.toLowerCase()) || a.internshipTitle.toLowerCase().includes(search.toLowerCase()));
  if (statusFilter !== "all") filtered = filtered.filter((a) => a.status === statusFilter);
  if (deptFilter !== "all") filtered = filtered.filter((a) => a.department === deptFilter);

  const handleStatusChange = (appId: string, newStatus: Application["status"]) => {
    setApplications(applications.map((a) =>
      a.id === appId ? { ...a, status: newStatus, timeline: [...a.timeline, { date: new Date().toISOString().split("T")[0], action: `Status changed to ${getStatusLabel(newStatus)}` }] } : a
    ));
    toast.success(`Application status updated to ${getStatusLabel(newStatus)}`);
  };

  const handleBulkStatusChange = (newStatus: Application["status"]) => {
    if (selectedIds.length === 0) { toast.error("No applications selected"); return; }
    setApplications(applications.map((a) =>
      selectedIds.includes(a.id) ? { ...a, status: newStatus, timeline: [...a.timeline, { date: new Date().toISOString().split("T")[0], action: `Bulk status changed to ${getStatusLabel(newStatus)}` }] } : a
    ));
    toast.success(`${selectedIds.length} applications updated`);
    setSelectedIds([]);
  };

  const handleExport = () => {
    const csvRows = [
      ["ID", "Name", "University", "Course", "Internship", "Department", "Date", "Status"].join(","),
      ...filtered.map((a) => [a.id, a.applicantName, a.university, a.course, a.internshipTitle, a.department, a.dateApplied, a.status].join(","))
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "applications.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Applications exported as CSV!");
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) setSelectedIds([]);
    else setSelectedIds(filtered.map((a) => a.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-foreground">Applications</h1>
        <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-1" />Export CSV</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search applicants..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Department" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((d) => <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-foreground">{selectedIds.length} selected</span>
          <Button size="sm" variant="outline" onClick={() => handleBulkStatusChange("under_review")}>Move to Review</Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkStatusChange("shortlisted")}>Shortlist</Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkStatusChange("accepted")}>Accept</Button>
          <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleBulkStatusChange("rejected")}>Reject</Button>
        </div>
      )}

      <div className="bg-card rounded-lg border border-border shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="p-3 w-10"><Checkbox checked={selectedIds.length === filtered.length && filtered.length > 0} onCheckedChange={toggleSelectAll} /></th>
              <th className="text-left p-3 font-semibold text-foreground">Applicant</th>
              <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">University</th>
              <th className="text-left p-3 font-semibold text-foreground">Internship</th>
              <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">Date</th>
              <th className="text-left p-3 font-semibold text-foreground">Status</th>
              <th className="text-left p-3 font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="p-3"><Checkbox checked={selectedIds.includes(app.id)} onCheckedChange={() => toggleSelect(app.id)} /></td>
                <td className="p-3 font-medium text-foreground">{app.applicantName}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{app.university}</td>
                <td className="p-3 text-muted-foreground">{app.internshipTitle}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{app.dateApplied}</td>
                <td className="p-3"><Badge className={`${getStatusColor(app.status)} border-0`}>{getStatusLabel(app.status)}</Badge></td>
                <td className="p-3">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelected(app)}><Eye className="h-4 w-4 mr-1" />View</Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                      {selected && (
                        <>
                          <SheetHeader>
                            <SheetTitle>{selected.applicantName}</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                                {selected.applicantName.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <div>
                                <div className="font-semibold text-foreground">{selected.applicantName}</div>
                                <div className="text-sm text-muted-foreground">{selected.university}</div>
                                <div className="text-sm text-muted-foreground">{selected.course}</div>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="text-foreground">{selected.email}</span></div>
                              <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="text-foreground">{selected.phone}</span></div>
                              <div className="flex justify-between"><span className="text-muted-foreground">Applied For</span><span className="text-foreground">{selected.internshipTitle}</span></div>
                              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="text-foreground">{selected.dateApplied}</span></div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-2">Timeline</h4>
                              {selected.timeline.map((t, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-sm mb-2">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0" />
                                  <div><span className="text-foreground">{t.action}</span><span className="text-muted-foreground ml-2"> {t.date}</span></div>
                                </div>
                              ))}
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-2">Update Status</h4>
                              <Select defaultValue={selected.status} onValueChange={(v) => handleStatusChange(selected.id, v as Application["status"])}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="under_review">Under Review</SelectItem>
                                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                  <SelectItem value="accepted">Accepted</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-2">Internal Notes</h4>
                              <Textarea placeholder="Add notes about this applicant..." />
                            </div>
                            <div className="flex gap-3">
                              <Button variant="outline" className="flex-1"><Download className="h-4 w-4 mr-1" />Download CV</Button>
                            </div>
                          </div>
                        </>
                      )}
                    </SheetContent>
                  </Sheet>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminApplications;
