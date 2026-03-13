import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, Calendar, Users, DollarSign, Share2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InternshipCard from "@/components/InternshipCard";
import { mockInternships, getDaysUntilDeadline } from "@/lib/mock-data";
import { toast } from "sonner";

const InternshipDetail = () => {
  const { id } = useParams();
  const internship = mockInternships.find((i) => i.id === id);
  const similar = mockInternships.filter((i) => i.id !== id && i.department === internship?.department).slice(0, 3);
  const daysLeft = internship ? getDaysUntilDeadline(internship.deadline) : 0;

  if (!internship) return <div className="min-h-screen flex items-center justify-center text-foreground">Internship not found.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        {/* Header */}
        <div className="bg-primary">
          <div className="container mx-auto px-4 py-10">
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 mb-3">{internship.department}</Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">{internship.title}</h1>
            <div className="flex flex-wrap gap-4 text-primary-foreground/80 text-sm">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{internship.location}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{internship.duration}</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" />{internship.positions} positions</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
              {internship.stipend === "paid" && <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" />KES {internship.stipendAmount?.toLocaleString()}/month</span>}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">Overview</h2>
                <div className="w-10 h-0.5 bg-primary mb-4" />
                <p className="text-muted-foreground leading-relaxed">{internship.description}</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">Responsibilities</h2>
                <div className="w-10 h-0.5 bg-primary mb-4" />
                <ul className="space-y-2">{internship.responsibilities.map((r, i) => <li key={i} className="flex items-start gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />{r}</li>)}</ul>
              </section>
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">Requirements</h2>
                <div className="w-10 h-0.5 bg-primary mb-4" />
                <ul className="space-y-2">{internship.requirements.map((r, i) => <li key={i} className="flex items-start gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />{r}</li>)}</ul>
              </section>
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">Skills Required</h2>
                <div className="w-10 h-0.5 bg-primary mb-4" />
                <div className="flex flex-wrap gap-2">{internship.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-card rounded-lg border border-border p-6 shadow-sm sticky top-20">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${daysLeft <= 7 ? "text-primary" : "text-foreground"}`}>
                      {daysLeft > 0 ? `${daysLeft} days left` : "Closed"}
                    </div>
                    <div className="text-xs text-muted-foreground">to apply</div>
                  </div>
                  <Link to={`/internships/${internship.id}/apply`}>
                    <Button className="w-full" size="lg" disabled={daysLeft <= 0}>Apply Now</Button>
                  </Link>
                  <Button variant="outline" className="w-full" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); }}>
                    <Share2 className="h-4 w-4 mr-1" /> Share
                  </Button>
                </div>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground"><span>Applications</span><span className="font-semibold text-foreground">{internship.applicationsCount}</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Positions</span><span className="font-semibold text-foreground">{internship.positions}</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Stipend</span><Badge className={internship.stipend === "paid" ? "bg-accent text-accent-foreground border-0" : "bg-muted text-muted-foreground border-0"}>{internship.stipend === "paid" ? "Paid" : "Unpaid"}</Badge></div>
                </div>
              </div>
            </div>
          </div>

          {similar.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-foreground mb-4">Similar Internships</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similar.map((i) => <InternshipCard key={i.id} internship={i} />)}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Mobile sticky apply */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-3 z-40">
        <Link to={`/internships/${internship.id}/apply`}>
          <Button className="w-full" size="lg">Apply Now</Button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default InternshipDetail;
