import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, PlusCircle, FileText, Users, BarChart3, Settings, LogOut, Menu, X, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import krcsLogo from "@/assets/krcs-logo.png";
import NotificationDropdown from "./NotificationDropdown";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Post Internship", icon: PlusCircle, path: "/admin/post-internship" },
  { label: "Manage Postings", icon: Briefcase, path: "/admin/postings" },
  { label: "Applications", icon: FileText, path: "/admin/applications" },
  { label: "Reports", icon: BarChart3, path: "/admin/reports" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const adminNotifications = [
  { id: "1", title: "New Application", message: "Mary Akinyi applied for Disaster Risk Reduction Intern", time: "2 hours ago", read: false },
  { id: "2", title: "New Application", message: "Peter Kamau applied for Communications & Media Intern", time: "5 hours ago", read: false },
  { id: "3", title: "Application Withdrawn", message: "John Ochieng withdrew IT Support application", time: "1 day ago", read: true },
  { id: "4", title: "New Application", message: "Sarah Muthoni applied for Finance & Grants Intern", time: "2 days ago", read: true },
  { id: "5", title: "Deadline Alert", message: "Disaster Risk Reduction Intern closes in 5 days", time: "3 days ago", read: true },
];

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(adminNotifications);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-card border-b border-border h-16 flex items-center px-4 justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu className="h-5 w-5" /></button>
          <Link to="/" className="flex items-center gap-2">
            <img src={krcsLogo} alt="KRCS" className="h-8 w-8 object-contain" />
            <span className="font-bold text-foreground hidden sm:block">KRCS Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <NotificationDropdown notifications={notifications} onMarkAllRead={handleMarkAllRead} />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">AD</div>
            <span className="text-sm font-medium text-foreground hidden sm:block">Admin User</span>
          </div>
          <Link to="/"><Button variant="ghost" size="icon"><LogOut className="h-4 w-4" /></Button></Link>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-secondary text-secondary-foreground pt-20 lg:pt-4 transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
          <button className="lg:hidden absolute top-4 right-4 text-secondary-foreground" onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-secondary-foreground"
                    : "text-secondary-foreground/70 hover:bg-sidebar-accent hover:text-secondary-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        {sidebarOpen && <div className="lg:hidden fixed inset-0 z-30 bg-foreground/20" onClick={() => setSidebarOpen(false)} />}
        <main className="flex-1 p-4 md:p-6 overflow-auto"><Outlet /></main>
      </div>
    </div>
  );
};

export default AdminLayout;
