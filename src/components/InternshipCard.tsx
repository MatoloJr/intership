import { Link } from "react-router-dom";
import { MapPin, Clock, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Internship, getDaysUntilDeadline } from "@/lib/mock-data";

interface Props {
  internship: Internship;
}

const InternshipCard = ({ internship }: Props) => {
  const daysLeft = getDaysUntilDeadline(internship.deadline);
  const urgent = daysLeft <= 7 && daysLeft > 0;

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 overflow-hidden group">
      <div className="h-1 bg-primary group-hover:h-1.5 transition-all" />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary" className="text-xs">{internship.department}</Badge>
          <Badge className={internship.stipend === "paid" ? "bg-accent text-accent-foreground border-0" : "bg-muted text-muted-foreground border-0"}>
            {internship.stipend === "paid" ? `KES ${internship.stipendAmount?.toLocaleString()}` : "Unpaid"}
          </Badge>
        </div>

        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{internship.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{internship.description}</p>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{internship.location}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{internship.duration}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{internship.positions} positions</span>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium flex items-center gap-1 ${urgent ? "text-primary" : "text-muted-foreground"}`}>
            <Calendar className="h-3.5 w-3.5" />
            {daysLeft > 0 ? (urgent ? `Closes in ${daysLeft} days` : `${daysLeft} days left`) : "Closed"}
          </span>
          <Link to={`/internships/${internship.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
