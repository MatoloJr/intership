import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, UserPlus, Briefcase, CheckCircle, Heart, Shield, Truck, Radio, DollarSign, Monitor, Users, Droplets, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InternshipCard from "@/components/InternshipCard";
import { mockInternships, testimonials, departments } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  Heart, Shield, Truck, Radio, DollarSign, Monitor, Users, Droplets,
};

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 30);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary-foreground">{count.toLocaleString()}+</div>
      <div className="text-sm text-primary-foreground/80 mt-1">{label}</div>
    </div>
  );
}

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const featured = mockInternships.filter((i) => i.featured);

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/internships?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/internships");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary opacity-90" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4 leading-tight">
              Shape Your Future with Kenya Red Cross Society
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Explore Internship Opportunities
            </p>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by keyword, location, or department..."
                  className="pl-10 h-12 bg-card text-foreground border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" variant="hero" size="xl" className="sm:w-auto">Search</Button>
            </form>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/internships">
                <Button variant="hero" size="xl">Browse Internships</Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="hero-outline" size="xl">Admin Login</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary py-8">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatedCounter target={24} label="Active Internships" />
          <AnimatedCounter target={1250} label="Applications Received" />
          <AnimatedCounter target={8} label="Departments Hiring" />
          <AnimatedCounter target={340} label="Students Placed" />
        </div>
      </section>

      {/* Featured Internships */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Internships</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 6).map((i) => (
              <InternshipCard key={i.id} internship={i} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/internships"><Button size="lg">View All Internships</Button></Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">How It Works</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: UserPlus, title: "Create Account", desc: "Sign up with your university details and upload your CV" },
              { icon: Search, title: "Browse & Apply", desc: "Explore internships across departments and apply with one click" },
              { icon: CheckCircle, title: "Get Selected", desc: "Track your application status and get notified when you're selected" },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="text-center bg-card rounded-lg p-8 shadow-sm"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm text-primary font-semibold mb-2">Step {idx + 1}</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Departments We Offer</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {departments.map((dept) => {
              const Icon = iconMap[dept.icon] || Briefcase;
              return (
                <div key={dept.name} className="bg-card rounded-lg p-5 text-center shadow-sm hover:shadow-md hover:border-primary/20 border border-border transition-all">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-semibold text-foreground">{dept.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">What Our Interns Say</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-3" />
          </div>
          <div className="max-w-2xl mx-auto relative">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-lg p-8 shadow-sm text-center"
            >
              <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {testimonials[testimonialIdx].avatar}
              </div>
              <p className="text-muted-foreground italic mb-4">"{testimonials[testimonialIdx].quote}"</p>
              <div className="font-bold text-foreground">{testimonials[testimonialIdx].name}</div>
              <div className="text-sm text-muted-foreground">{testimonials[testimonialIdx].role} · {testimonials[testimonialIdx].university}</div>
            </motion.div>
            <div className="flex justify-center gap-3 mt-4">
              <Button variant="outline" size="icon" onClick={() => setTestimonialIdx((p) => (p === 0 ? testimonials.length - 1 : p - 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)} className={`w-2 h-2 rounded-full transition-colors ${i === testimonialIdx ? "bg-primary" : "bg-muted-foreground/30"}`} />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={() => setTestimonialIdx((p) => (p + 1) % testimonials.length)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
