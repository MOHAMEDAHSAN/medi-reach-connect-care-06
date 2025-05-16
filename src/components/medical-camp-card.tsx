
import { MapPin, Calendar, User, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MedicalCampProps {
  id: string;
  name: string;
  type: string;
  distance: number;
  date: string;
  time: string;
  organizer: string;
  isFree?: boolean;
  isGovernmentScheme?: boolean;
  onClick?: () => void;
}

export function MedicalCampCard({
  id,
  name,
  type,
  distance,
  date,
  time,
  organizer,
  isFree = false,
  isGovernmentScheme = false,
  onClick
}: MedicalCampProps) {
  // Get different colors for different camp types
  const getTypeColor = (type: string) => {
    const types: Record<string, string> = {
      "Eye": "bg-blue-100 text-blue-600",
      "Dental": "bg-indigo-100 text-indigo-600",
      "General": "bg-green-100 text-green-600",
      "Women": "bg-pink-100 text-pink-600",
      "Children": "bg-orange-100 text-orange-600",
      "Blood Donation": "bg-red-100 text-red-600",
      "Vaccination": "bg-purple-100 text-purple-600"
    };
    
    return types[type] || "bg-gray-100 text-gray-600";
  };
  
  return (
    <div 
      className="ios-card cursor-pointer animate-fade-in" 
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <Badge className={cn("rounded-full font-medium border-0", getTypeColor(type))}>
          {type}
        </Badge>
        {isFree && (
          <Badge variant="outline" className="bg-green-50 text-health-green border-0">
            Free
          </Badge>
        )}
        {isGovernmentScheme && (
          <Badge variant="outline" className="bg-blue-50 text-apple-blue border-0">
            Govt. Scheme
          </Badge>
        )}
      </div>
      
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      
      <div className="space-y-2 my-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={14} className="text-apple-gray" />
          <span>{distance.toFixed(1)} km away</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={14} className="text-apple-gray" />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={14} className="text-apple-gray" />
          <span>{time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <User size={14} className="text-apple-gray" />
          <span>{organizer}</span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button variant="outline" className="flex-1 rounded-full border-apple-blue text-apple-blue hover:text-apple-blue hover:bg-blue-50">
          Save
        </Button>
        <Button className="flex-1 rounded-full bg-apple-blue hover:bg-apple-blue/90">
          Details
        </Button>
      </div>
    </div>
  );
}
