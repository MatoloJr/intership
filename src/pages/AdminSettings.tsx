import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Shield, Bell, User } from "lucide-react";
import { toast } from "sonner";

const AdminSettings = () => {
  const [profile, setProfile] = useState({ name: "Admin User", email: "admin@redcross.or.ke", phone: "+254 20 3950000" });
  const [notifications, setNotifications] = useState({ newApp: true, withdrawn: true, emailDigest: false });

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <div className="w-12 h-1 bg-primary" />

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-1" />Profile</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-1" />Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4 mr-1" />Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-4">
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-foreground">Admin Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Name</Label><Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
              <div><Label>Email</Label><Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></div>
              <div><Label>Phone</Label><Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></div>
            </div>
            <Button onClick={() => toast.success("Profile updated!")}><Save className="h-4 w-4 mr-1" />Save Profile</Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm space-y-5">
            <h3 className="font-bold text-foreground">Notification Preferences</h3>
            {[
              { key: "newApp" as const, label: "New Application Submitted", desc: "Get notified when a student submits an application" },
              { key: "withdrawn" as const, label: "Application Withdrawn", desc: "Get notified when a student withdraws their application" },
              { key: "emailDigest" as const, label: "Daily Email Digest", desc: "Receive a daily summary of all activity" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <Switch checked={notifications[item.key]} onCheckedChange={(c) => setNotifications({ ...notifications, [item.key]: c })} />
              </div>
            ))}
            <Button onClick={() => toast.success("Notification preferences saved!")}><Save className="h-4 w-4 mr-1" />Save</Button>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-foreground">Change Password</h3>
            <div><Label>Current Password</Label><Input type="password" /></div>
            <div><Label>New Password</Label><Input type="password" /></div>
            <div><Label>Confirm New Password</Label><Input type="password" /></div>
            <Button onClick={() => toast.success("Password changed successfully!")}><Save className="h-4 w-4 mr-1" />Update Password</Button>
          </div>
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">2FA Status</span>
              <Switch onCheckedChange={(c) => toast.success(c ? "2FA enabled" : "2FA disabled")} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
