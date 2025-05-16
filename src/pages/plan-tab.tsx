
import { HealthCard } from "@/components/health-card";
import { Calendar, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data for the health plan
const savedCamps = [
  {
    id: "plan1",
    name: "Eye Care Camp",
    type: "Eye",
    date: "May 20, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "City Hospital, Main Street",
  },
  {
    id: "plan2",
    name: "Dental Care Camp",
    type: "Dental",
    date: "May 25, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Smile Foundation, Park Avenue",
  }
];

const recommendedCamps = [
  {
    id: "rec1",
    name: "Blood Pressure Screening",
    type: "General",
    date: "June 5, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Health Ministry Center, Downtown",
  }
];

export default function PlanTab() {
  // Helper function to get a badge style based on camp type
  const getTypeStyle = (type: string) => {
    const types: Record<string, string> = {
      "Eye": "bg-blue-100 text-blue-600",
      "Dental": "bg-indigo-100 text-indigo-600",
      "General": "bg-green-100 text-green-600",
      "Women": "bg-pink-100 text-pink-600",
      "Children": "bg-orange-100 text-orange-600"
    };
    
    return types[type] || "bg-gray-100 text-gray-600";
  };
  
  return (
    <div className="pb-20 pt-2">
      <div className="container px-4 mx-auto">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Visits</h2>
          
          {savedCamps.length > 0 ? (
            <div className="space-y-4">
              {savedCamps.map((camp) => (
                <HealthCard
                  key={camp.id}
                  title={camp.name}
                  icon={<Calendar size={18} />}
                  indicatorColor="blue"
                >
                  <Badge className={`rounded-full font-medium border-0 mt-2 ${getTypeStyle(camp.type)}`}>
                    {camp.type}
                  </Badge>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start">
                      <div className="w-24 text-gray-500 text-sm">Date</div>
                      <div>{camp.date}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-24 text-gray-500 text-sm">Time</div>
                      <div>{camp.time}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-24 text-gray-500 text-sm">Location</div>
                      <div>{camp.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1 rounded-full">
                      Cancel
                    </Button>
                    <Button className="flex-1 rounded-full bg-apple-blue">
                      Get Directions
                    </Button>
                  </div>
                </HealthCard>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No upcoming visits scheduled</p>
              <Button className="mt-4 rounded-full bg-apple-blue">
                Find Medical Camps
              </Button>
            </div>
          )}
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          
          {recommendedCamps.map((camp) => (
            <HealthCard
              key={camp.id}
              title={camp.name}
              icon={<Check size={18} />}
              indicatorColor="green"
            >
              <Badge className={`rounded-full font-medium border-0 mt-2 ${getTypeStyle(camp.type)}`}>
                {camp.type}
              </Badge>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-start">
                  <div className="w-24 text-gray-500 text-sm">Date</div>
                  <div>{camp.date}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-24 text-gray-500 text-sm">Time</div>
                  <div>{camp.time}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-24 text-gray-500 text-sm">Location</div>
                  <div>{camp.location}</div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1 rounded-full border-apple-blue text-apple-blue hover:text-apple-blue hover:bg-blue-50">
                  Dismiss
                </Button>
                <Button className="flex-1 rounded-full bg-apple-blue">
                  Add to Plan
                </Button>
              </div>
            </HealthCard>
          ))}
        </section>
      </div>
    </div>
  );
}
