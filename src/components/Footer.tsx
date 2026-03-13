import { Link } from "react-router-dom";
import krcsLogo from "@/assets/krcs-logo.png";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src={krcsLogo} alt="KRCS" className="h-8 w-8 object-contain" />
            <span className="font-bold text-lg">KRCS Internship Portal</span>
          </div>
          <p className="text-sm opacity-80">Empowering the next generation of humanitarian leaders through hands-on experience.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/internships" className="hover:opacity-100 transition-opacity">Browse Internships</Link></li>
            <li><Link to="/register" className="hover:opacity-100 transition-opacity">Student Registration</Link></li>
            <li><Link to="/login" className="hover:opacity-100 transition-opacity">Student Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">About KRCS</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
            <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
            <li><Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:opacity-100 transition-opacity">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Connect With Us</h4>
          <div className="flex gap-3">
            {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold hover:bg-primary/40 transition-colors">
                {s[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-primary/20 text-center text-sm opacity-60">
        <p className="text-background/60 text-sm text-center md:text-left">
          © {new Date().getFullYear()} Kenya Red Cross Society. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
