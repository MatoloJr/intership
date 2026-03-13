import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Inbox, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  type: "notification" | "message";
}

const mockMessages: Message[] = [
  { id: "1", from: "KRCS Admin", subject: "Application Received - Public Health Intern", preview: "Your application for Public Health Intern has been received...", body: "Dear Jane,\n\nThank you for your application for the Public Health Intern position at Kenya Red Cross Society. We have received your application and it is currently under review.\n\nWe will get back to you within 14 working days.\n\nBest regards,\nKRCS Recruitment Team", date: "2026-03-10", read: true, type: "notification" },
  { id: "2", from: "KRCS HR Department", subject: "Interview Invitation - IT Support Intern", preview: "Congratulations! You have been shortlisted for an interview...", body: "Dear Jane,\n\nCongratulations! You have been shortlisted for the IT Support & Development Intern position.\n\nPlease find the interview details below:\n- Date: March 20, 2026\n- Time: 10:00 AM\n- Venue: KRCS Headquarters, South C, Nairobi\n\nPlease confirm your attendance by replying to this message.\n\nBest regards,\nKRCS HR Department", date: "2026-03-11", read: false, type: "message" },
  { id: "3", from: "System", subject: "New Internship Matching Your Profile", preview: "A new internship in Health department has been posted...", body: "Hi Jane,\n\nA new internship opportunity matching your profile has been posted:\n\n- Position: Community Health Assistant\n- Department: Health\n- Location: Nairobi\n- Duration: 3 months\n\nVisit the internships page to apply.\n\nBest,\nKRCS Portal", date: "2026-03-12", read: false, type: "notification" },
];

const StudentMessages = () => {
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;
    toast.success("Reply sent!");
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Messages</h1>
      <div className="w-12 h-1 bg-primary" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-3 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Inbox className="h-4 w-4" /> Inbox
              <Badge className="bg-primary text-primary-foreground border-0 ml-auto">{mockMessages.filter((m) => !m.read).length}</Badge>
            </div>
          </div>
          <div className="divide-y divide-border">
            {mockMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedMsg(msg)}
                className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${selectedMsg?.id === msg.id ? "bg-muted/50" : ""} ${!msg.read ? "border-l-2 border-l-primary" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${!msg.read ? "font-bold text-foreground" : "text-muted-foreground"}`}>{msg.from}</span>
                  <span className="text-xs text-muted-foreground">{msg.date}</span>
                </div>
                <p className={`text-sm ${!msg.read ? "font-semibold text-foreground" : "text-foreground"} truncate`}>{msg.subject}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.preview}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border shadow-sm">
          {selectedMsg ? (
            <div className="p-6 space-y-4">
              <div className="border-b border-border pb-4">
                <h2 className="font-bold text-lg text-foreground">{selectedMsg.subject}</h2>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">From: {selectedMsg.from}</span>
                  <span className="text-sm text-muted-foreground">{selectedMsg.date}</span>
                </div>
              </div>
              <div className="whitespace-pre-line text-sm text-foreground leading-relaxed">{selectedMsg.body}</div>
              {selectedMsg.type === "message" && (
                <div className="pt-4 border-t border-border space-y-3">
                  <Textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write your reply..." rows={3} />
                  <Button onClick={handleReply} disabled={!replyText.trim()}><Send className="h-4 w-4 mr-1" />Send Reply</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-3 text-primary/20" />
              <p className="text-sm">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentMessages;
