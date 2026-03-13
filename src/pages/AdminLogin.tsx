import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import krcsLogo from "@/assets/krcs-logo.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Admin login successful!");
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-secondary items-center justify-center p-12">
        <div className="text-center">
          <img src={krcsLogo} alt="KRCS" className="h-24 w-24 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-secondary-foreground mb-3">Admin Portal</h2>
          <p className="text-secondary-foreground/80 text-lg">Manage internship postings and applications.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-foreground mb-1">Admin Login</h1>
          <p className="text-muted-foreground mb-6">Enter your staff credentials</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Staff Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div><Label>Password</Label><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <Button type="submit" className="w-full" size="lg">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
