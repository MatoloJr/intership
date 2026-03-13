export interface Internship {
  id: string;
  title: string;
  department: string;
  location: string;
  duration: string;
  deadline: string;
  stipend: "paid" | "unpaid";
  stipendAmount?: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  positions: number;
  applicationsCount: number;
  status: "published" | "draft" | "closed";
  postedDate: string;
  featured: boolean;
}

export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  department: string;
  applicantName: string;
  university: string;
  course: string;
  email: string;
  phone: string;
  dateApplied: string;
  status: "pending" | "under_review" | "shortlisted" | "accepted" | "rejected";
  timeline: { date: string; action: string }[];
}

export const departments = [
  { name: "Health", icon: "Heart" },
  { name: "Disaster Response", icon: "Shield" },
  { name: "Logistics", icon: "Truck" },
  { name: "Communication", icon: "Radio" },
  { name: "Finance", icon: "DollarSign" },
  { name: "Information Technology", icon: "Monitor" },
  { name: "Human Resources", icon: "Users" },
  { name: "Water & Sanitation", icon: "Droplets" },
];

export const locations = ["Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru", "Remote"];
export const durations = ["1 month", "3 months", "6 months", "1 year"];

export const mockInternships: Internship[] = [
  {
    id: "1",
    title: "Public Health Intern",
    department: "Health",
    location: "Nairobi",
    duration: "3 months",
    deadline: "2026-04-15",
    stipend: "paid",
    stipendAmount: 25000,
    description: "Join our public health team to support community health outreach programs across Nairobi County. You will work alongside experienced health professionals to deliver impactful health interventions.",
    responsibilities: ["Assist in community health outreach programs", "Support data collection and analysis", "Help prepare health education materials", "Participate in field visits"],
    requirements: ["Currently enrolled in public health or related course", "Minimum 3rd year university student", "Good communication skills"],
    skills: ["Data Analysis", "Community Engagement", "Report Writing"],
    positions: 3,
    applicationsCount: 45,
    status: "published",
    postedDate: "2026-03-01",
    featured: true,
  },
  {
    id: "2",
    title: "Disaster Risk Reduction Intern",
    department: "Disaster Response",
    location: "Mombasa",
    duration: "6 months",
    deadline: "2026-03-25",
    stipend: "paid",
    stipendAmount: 30000,
    description: "Support the disaster response team in developing early warning systems and community preparedness programs along the coastal region.",
    responsibilities: ["Assist in disaster preparedness training", "Support emergency response drills", "Help develop community early warning systems", "Document lessons learned from past responses"],
    requirements: ["Degree in disaster management or related field", "Ability to work under pressure", "Willingness to travel"],
    skills: ["Emergency Management", "GIS Mapping", "Training Facilitation"],
    positions: 2,
    applicationsCount: 28,
    status: "published",
    postedDate: "2026-03-05",
    featured: true,
  },
  {
    id: "3",
    title: "IT Support & Development Intern",
    department: "Information Technology",
    location: "Nairobi",
    duration: "3 months",
    deadline: "2026-04-01",
    stipend: "paid",
    stipendAmount: 20000,
    description: "Work with the IT department to maintain and improve internal systems, support digital transformation initiatives and assist in software development projects.",
    responsibilities: ["Provide IT helpdesk support", "Assist in web application development", "Help maintain network infrastructure", "Support data management tasks"],
    requirements: ["Studying Computer Science or IT", "Knowledge of web technologies", "Problem-solving skills"],
    skills: ["JavaScript", "Python", "Networking", "Database Management"],
    positions: 4,
    applicationsCount: 62,
    status: "published",
    postedDate: "2026-02-28",
    featured: true,
  },
  {
    id: "4",
    title: "Communications & Media Intern",
    department: "Communication",
    location: "Nairobi",
    duration: "3 months",
    deadline: "2026-04-10",
    stipend: "unpaid",
    description: "Support the communications department in content creation, social media management and media relations for KRCS campaigns and events.",
    responsibilities: ["Create content for social media platforms", "Assist in press releases and media briefs", "Support event photography and videography", "Monitor media coverage"],
    requirements: ["Studying journalism, communications, or related field", "Strong writing skills", "Proficiency in social media platforms"],
    skills: ["Content Writing", "Social Media", "Photography", "Video Editing"],
    positions: 2,
    applicationsCount: 35,
    status: "published",
    postedDate: "2026-03-08",
    featured: true,
  },
  {
    id: "5",
    title: "Finance & Grants Intern",
    department: "Finance",
    location: "Nairobi",
    duration: "6 months",
    deadline: "2026-05-01",
    stipend: "paid",
    stipendAmount: 22000,
    description: "Assist the finance team in grant management, financial reporting and budget tracking for various humanitarian programs.",
    responsibilities: ["Support grant financial reporting", "Assist in budget preparation", "Help with accounts reconciliation", "Support audit preparations"],
    requirements: ["Studying accounting, finance, or business administration", "Proficiency in Excel", "Attention to detail"],
    skills: ["Financial Analysis", "Excel", "QuickBooks", "Report Writing"],
    positions: 2,
    applicationsCount: 18,
    status: "published",
    postedDate: "2026-03-10",
    featured: false,
  },
  {
    id: "6",
    title: "Logistics & Supply Chain Intern",
    department: "Logistics",
    location: "Kisumu",
    duration: "3 months",
    deadline: "2026-04-20",
    stipend: "paid",
    stipendAmount: 20000,
    description: "Support the logistics team in managing supply chains for humanitarian relief operations across the western Kenya region.",
    responsibilities: ["Assist in warehouse management", "Support fleet management operations", "Help track and report on supplies distribution", "Assist in procurement processes"],
    requirements: ["Studying supply chain management or related field", "Valid driving license is an advantage", "Strong organizational skills"],
    skills: ["Supply Chain Management", "Inventory Management", "MS Office"],
    positions: 3,
    applicationsCount: 22,
    status: "published",
    postedDate: "2026-03-07",
    featured: true,
  },
];

export const mockApplications: Application[] = [
  {
    id: "APP-001",
    internshipId: "1",
    internshipTitle: "Public Health Intern",
    department: "Health",
    applicantName: "Jane Wanjiku",
    university: "University of Nairobi",
    course: "Public Health",
    email: "jane@uon.ac.ke",
    phone: "+254712345678",
    dateApplied: "2026-03-10",
    status: "under_review",
    timeline: [
      { date: "2026-03-10", action: "Application submitted" },
      { date: "2026-03-11", action: "Application received and under review" },
    ],
  },
  {
    id: "APP-002",
    internshipId: "3",
    internshipTitle: "IT Support & Development Intern",
    department: "Information Technology",
    applicantName: "John Ochieng",
    university: "Jomo Kenyatta University",
    course: "Computer Science",
    email: "john@jkuat.ac.ke",
    phone: "+254723456789",
    dateApplied: "2026-03-08",
    status: "shortlisted",
    timeline: [
      { date: "2026-03-08", action: "Application submitted" },
      { date: "2026-03-09", action: "Application under review" },
      { date: "2026-03-11", action: "Shortlisted for interview" },
    ],
  },
  {
    id: "APP-003",
    internshipId: "2",
    internshipTitle: "Disaster Risk Reduction Intern",
    department: "Disaster Response",
    applicantName: "Mary Akinyi",
    university: "Maseno University",
    course: "Disaster Management",
    email: "mary@maseno.ac.ke",
    phone: "+254734567890",
    dateApplied: "2026-03-12",
    status: "pending",
    timeline: [
      { date: "2026-03-12", action: "Application submitted" },
    ],
  },
  {
    id: "APP-004",
    internshipId: "4",
    internshipTitle: "Communications & Media Intern",
    department: "Communication",
    applicantName: "Peter Kamau",
    university: "Daystar University",
    course: "Journalism",
    email: "peter@daystar.ac.ke",
    phone: "+254745678901",
    dateApplied: "2026-03-06",
    status: "rejected",
    timeline: [
      { date: "2026-03-06", action: "Application submitted" },
      { date: "2026-03-08", action: "Application reviewed" },
      { date: "2026-03-10", action: "Application not successful" },
    ],
  },
  {
    id: "APP-005",
    internshipId: "5",
    internshipTitle: "Finance & Grants Intern",
    department: "Finance",
    applicantName: "Sarah Muthoni",
    university: "Strathmore University",
    course: "Business Administration",
    email: "sarah@strathmore.edu",
    phone: "+254756789012",
    dateApplied: "2026-03-11",
    status: "accepted",
    timeline: [
      { date: "2026-03-11", action: "Application submitted" },
      { date: "2026-03-12", action: "Fast-tracked review" },
      { date: "2026-03-12", action: "Accepted - Offer sent" },
    ],
  },
];

export const testimonials = [
  {
    name: "Grace Mwende",
    role: "Former Health Intern",
    university: "University of Nairobi",
    quote: "My internship at KRCS was transformative. I gained hands-on experience in community health that my classroom couldn't provide. The mentorship was exceptional.",
    avatar: "GM",
  },
  {
    name: "David Kipchoge",
    role: "Former IT Intern",
    university: "JKUAT",
    quote: "Working with the KRCS IT team opened doors I never imagined. I developed real systems that serve thousands of people across Kenya.",
    avatar: "DK",
  },
  {
    name: "Amina Hassan",
    role: "Former Disaster Response Intern",
    university: "Maseno University",
    quote: "The disaster response internship taught me resilience and leadership. I was part of real emergency response operations that saved lives.",
    avatar: "AH",
  },
];

export function getDaysUntilDeadline(deadline: string): number {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diff = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getStatusColor(status: Application["status"]): string {
  switch (status) {
    case "pending": return "bg-accent text-accent-foreground";
    case "under_review": return "bg-blue-100 text-blue-800";
    case "shortlisted": return "bg-green-100 text-green-800";
    case "accepted": return "bg-emerald-100 text-emerald-800";
    case "rejected": return "bg-red-100 text-red-800";
    default: return "bg-muted text-muted-foreground";
  }
}

export function getStatusLabel(status: Application["status"]): string {
  switch (status) {
    case "pending": return "Pending";
    case "under_review": return "Under Review";
    case "shortlisted": return "Shortlisted";
    case "accepted": return "Accepted";
    case "rejected": return "Rejected";
    default: return status;
  }
}
