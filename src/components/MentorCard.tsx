import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, DollarSign, MapPin, Calendar } from "lucide-react";
import { Mentor } from "@/data/mockMentors";

interface MentorCardProps {
  mentor: Mentor;
  onBook: (mentor: Mentor) => void;
}

const MentorCard = ({ mentor, onBook }: MentorCardProps) => {
  return (
    <Card className="mentor-card-hover cursor-pointer h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
              mentor.available ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{mentor.name}</h3>
            <p className="text-sm text-muted-foreground">{mentor.title}</p>
            <p className="text-sm font-medium text-primary">{mentor.company}</p>
            
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{mentor.rating}</span>
                <span>({mentor.reviewCount})</span>
              </div>
              
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>${mentor.hourlyRate}/hr</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {mentor.bio}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {mentor.expertise.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {mentor.expertise.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{mentor.expertise.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{mentor.nextAvailable}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{mentor.timezone}</span>
          </div>
        </div>
        
        <Button 
          className="w-full"
          variant={mentor.available ? "hero" : "outline"}
          disabled={!mentor.available}
          onClick={() => onBook(mentor)}
        >
          <Calendar className="h-4 w-4 mr-2" />
          {mentor.available ? "Book Session" : "Not Available"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MentorCard;