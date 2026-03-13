import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockInternships } from "@/lib/mock-data";
import { Search, Edit, Eye, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Internship } from "@/lib/mock-data";

const ManagePostings = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [postings, setPostings] = useState(mockInternships);
  const [previewItem, setPreviewItem] = useState<Internship | null>(null);

  const filtered = postings.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (id: string) => {
    navigate(`/admin/post-internship?edit=${id}`);
    toast.info("Edit mode - modify and republish the posting");
  };

  const handleCopy = (internship: Internship) => {
    const newPosting = { ...internship, id: `copy-${Date.now()}`, title: `${internship.title} (Copy)`, status: "draft" as const };
    setPostings([newPosting, ...postings]);
    toast.success("Posting duplicated as draft!");
  };

  const handleDelete = (id: string) => {
    setPostings(postings.filter((p) => p.id !== id));
    toast.success("Posting deleted successfully");
  };

  const toggleStatus = (id: string) => {
    setPostings(postings.map((p) =>
      p.id === id ? { ...p, status: p.status === "published" ? "draft" : p.status === "draft" ? "published" : p.status } as Internship : p
    ));
    toast.success("Status updated");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Manage Postings</h1>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search postings..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-3 font-semibold text-foreground">Title</th>
              <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">Department</th>
              <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">Deadline</th>
              <th className="text-left p-3 font-semibold text-foreground">Apps</th>
              <th className="text-left p-3 font-semibold text-foreground">Status</th>
              <th className="text-left p-3 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="p-3 font-medium text-foreground">{i.title}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{i.department}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{new Date(i.deadline).toLocaleDateString()}</td>
                <td className="p-3 text-foreground">{i.applicationsCount}</td>
                <td className="p-3">
                  <button onClick={() => toggleStatus(i.id)}>
                    <Badge className={`cursor-pointer ${i.status === "published" ? "bg-green-100 text-green-800 border-0" : i.status === "draft" ? "bg-muted text-muted-foreground border-0" : "bg-red-100 text-red-800 border-0"}`}>
                      {i.status}
                    </Badge>
                  </button>
                </td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(i.id)} title="Edit">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPreviewItem(i)} title="Preview">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(i)} title="Duplicate">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" title="Delete">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Posting?</AlertDialogTitle>
                          <AlertDialogDescription>This will permanently delete "{i.title}". This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(i.id)} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewItem} onOpenChange={() => setPreviewItem(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {previewItem && (
            <>
              <DialogHeader>
                <DialogTitle>{previewItem.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Department:</span> <span className="font-medium text-foreground">{previewItem.department}</span></div>
                  <div><span className="text-muted-foreground">Location:</span> <span className="font-medium text-foreground">{previewItem.location}</span></div>
                  <div><span className="text-muted-foreground">Duration:</span> <span className="font-medium text-foreground">{previewItem.duration}</span></div>
                  <div><span className="text-muted-foreground">Deadline:</span> <span className="font-medium text-foreground">{new Date(previewItem.deadline).toLocaleDateString()}</span></div>
                  <div><span className="text-muted-foreground">Positions:</span> <span className="font-medium text-foreground">{previewItem.positions}</span></div>
                  <div><span className="text-muted-foreground">Stipend:</span> <Badge className={previewItem.stipend === "paid" ? "bg-accent text-accent-foreground border-0" : "bg-muted text-muted-foreground border-0"}>{previewItem.stipend === "paid" ? `KES ${previewItem.stipendAmount?.toLocaleString()}` : "Unpaid"}</Badge></div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{previewItem.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Responsibilities</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">{previewItem.responsibilities.map((r, i) => <li key={i}>• {r}</li>)}</ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Requirements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">{previewItem.requirements.map((r, i) => <li key={i}>• {r}</li>)}</ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">{previewItem.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagePostings;
