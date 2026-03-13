import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import krcsLogo from "@/assets/krcs-logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", county: "", university: "", course: "", yearOfStudy: "", password: "", confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Registration successful! Welcome to KRCS.");
    navigate("/student/dashboard");
  };

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="text-center">
          <img src={krcsLogo} alt="KRCS" className="h-24 w-24 mx-auto mb-6 brightness-0 invert" />
          <h2 className="text-3xl font-bold text-primary-foreground mb-3">Join KRCS</h2>
          <p className="text-primary-foreground/80 text-lg">Start your journey in humanitarian service today.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <img src={krcsLogo} alt="KRCS" className="h-8 w-8" />
            <span className="font-bold text-foreground">KRCS Internship Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Create Account</h1>
          <p className="text-muted-foreground mb-6">Fill in your details to get started</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Full Name</Label><Input required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Email</Label><Input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
              <div><Label>Phone</Label><Input required value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
            </div>
            <div><Label>County / Location</Label><Input required value={form.county} onChange={(e) => update("county", e.target.value)} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>University / College</Label><Input required value={form.university} onChange={(e) => update("university", e.target.value)} /></div>
              <div><Label>Course of Study</Label><Input required value={form.course} onChange={(e) => update("course", e.target.value)} /></div>
            </div>
            <div><Label>Year of Study</Label><Input required value={form.yearOfStudy} onChange={(e) => update("yearOfStudy", e.target.value)} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Password</Label><Input type="password" required value={form.password} onChange={(e) => update("password", e.target.value)} /></div>
              <div><Label>Confirm Password</Label><Input type="password" required value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} /></div>
            </div>
            <Button type="submit" className="w-full" size="lg">Create Account</Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
