import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Shield, Users, Globe, Award, Target } from "lucide-react";

const AboutUs = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1">
      {/* Hero */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">About Kenya Red Cross Society</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">Empowering communities, building resilience and nurturing the next generation of humanitarian leaders through our internship programme.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
            <Target className="h-8 w-8 text-primary mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-3">Our Mission</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">To prevent and alleviate human suffering through mobilization of the power of humanity by providing quality humanitarian services to the most vulnerable communities.</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
            <Globe className="h-8 w-8 text-primary mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-3">Our Vision</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">To be the leading humanitarian organization in Kenya, providing timely and effective assistance to people affected by disasters and other emergencies.</p>
          </div>
        </div>

        {/* Values */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Our Core Values</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-3 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Heart, title: "Humanity", desc: "We serve people in need without discrimination." },
              { icon: Shield, title: "Integrity", desc: "We act with honesty, transparency and accountability." },
              { icon: Users, title: "Volunteerism", desc: "We harness the power of volunteers in service delivery." },
              { icon: Globe, title: "Neutrality", desc: "We remain impartial in all our humanitarian operations." },
              { icon: Award, title: "Excellence", desc: "We strive for the highest standards in all we do." },
              { icon: Target, title: "Innovation", desc: "We embrace creative solutions to humanitarian challenges." },
            ].map((v) => (
              <div key={v.title} className="bg-card rounded-lg border border-border p-6 shadow-sm text-center">
                <v.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Internship Programme */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Our Internship Programme</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-3 mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-6">The KRCS Internship Programme provides university students and recent graduates with hands-on experience in humanitarian work. Interns gain exposure to real-world challenges across departments including Health, Disaster Response, IT, Logistics, Finance and Communications.</p>
          <div className="grid grid-cols-3 gap-4">
            {[{ num: "500+", label: "Interns Placed" }, { num: "8", label: "Departments" }, { num: "47", label: "Counties Reached" }].map((s) => (
              <div key={s.label} className="bg-primary/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{s.num}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default AboutUs;
