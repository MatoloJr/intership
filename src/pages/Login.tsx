import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import krcsLogo from "@/assets/krcs-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login successful!");
    navigate("/student/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="text-center">
          <img src={krcsLogo} alt="KRCS" className="h-24 w-24 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-primary-foreground mb-3">Welcome Back</h2>
          <p className="text-primary-foreground/80 text-lg">Continue your internship journey.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <img src={krcsLogo} alt="KRCS" className="h-8 w-8" />
            <span className="font-bold text-foreground">KRCS Internship Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Student Login</h1>
          <p className="text-muted-foreground mb-6">Enter your credentials to access your dashboard</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div><Label>Password</Label><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <div className="text-right"><a href="#" className="text-sm text-primary hover:underline">Forgot Password?</a></div>
            <Button type="submit" className="w-full" size="lg">Login</Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
