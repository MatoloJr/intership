import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import krcsLogo from "@/assets/krcs-logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={krcsLogo} alt="KRCS Logo" className="h-10 w-10 object-contain" />
          <span className="text-lg font-bold text-foreground hidden sm:block">KRCS Internship Portal</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/internships">
            <Button variant="ghost">Browse Internships</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Student Login</Button>
          </Link>
          <Link to="/admin/login">
            <Button variant="default">Admin Login</Button>
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border p-4 flex flex-col gap-3">
          <Link to="/internships" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Browse Internships</Button>
          </Link>
          <Link to="/login" onClick={() => setMobileOpen(false)}>
            <Button variant="outline" className="w-full">Student Login</Button>
          </Link>
          <Link to="/admin/login" onClick={() => setMobileOpen(false)}>
            <Button variant="default" className="w-full">Admin Login</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
