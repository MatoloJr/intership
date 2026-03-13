import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InternshipCard from "@/components/InternshipCard";
import { mockInternships, departments, locations, durations } from "@/lib/mock-data";

const Internships = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [department, setDepartment] = useState("all");
  const [location, setLocation] = useState("all");
  const [duration, setDuration] = useState("all");
  const [stipend, setStipend] = useState("all");
  const [sort, setSort] = useState("newest");

  // Sync search from URL params
  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearch(q);
  }, [searchParams]);

  let filtered = mockInternships.filter((i) => i.status === "published");
  if (search) filtered = filtered.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || i.department.toLowerCase().includes(search.toLowerCase()) || i.location.toLowerCase().includes(search.toLowerCase()));
  if (department !== "all") filtered = filtered.filter((i) => i.department === department);
  if (location !== "all") filtered = filtered.filter((i) => i.location === location);
  if (duration !== "all") filtered = filtered.filter((i) => i.duration === duration);
  if (stipend !== "all") filtered = filtered.filter((i) => i.stipend === stipend);

  if (sort === "newest") filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  else if (sort === "deadline") filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  else if (sort === "popular") filtered.sort((a, b) => b.applicationsCount - a.applicationsCount);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Browse Internships</h1>
        <div className="w-12 h-1 bg-primary mb-6" />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="lg:w-64 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((d) => <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger><SelectValue placeholder="Location" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger><SelectValue placeholder="Duration" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                {durations.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={stipend} onValueChange={setStipend}>
              <SelectTrigger><SelectValue placeholder="Stipend" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full" onClick={() => { setSearch(""); setDepartment("all"); setLocation("all"); setDuration("all"); setStipend("all"); }}>
              Clear Filters
            </Button>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{filtered.length} internships found</span>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="deadline">Deadline Soonest</SelectItem>
                  <SelectItem value="popular">Most Applied</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-primary/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No internships found</h3>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((i) => <InternshipCard key={i.id} internship={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Internships;
