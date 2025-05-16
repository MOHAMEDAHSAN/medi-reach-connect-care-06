
import { useState, useEffect } from "react";
import { HealthCard } from "@/components/health-card";
import { MedicalCampCard } from "@/components/medical-camp-card";
import { Heart, Ambulance, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for medical camps
const medicalCamps = [
  {
    id: "camp1",
    name: "Eye Care Camp",
    type: "Eye",
    distance: 2.5,
    date: "May 20, 2025",
    time: "9:00 AM - 2:00 PM",
    organizer: "City Hospital",
    isFree: true,
    isGovernmentScheme: false,
  },
  {
    id: "camp2",
    name: "General Health Checkup",
    type: "General",
    distance: 1.8,
    date: "May 22, 2025",
    time: "10:00 AM - 4:00 PM",
    organizer: "Health Ministry",
    isFree: true,
    isGovernmentScheme: true,
  },
  {
    id: "camp3",
    name: "Dental Care Camp",
    type: "Dental",
    distance: 3.2,
    date: "May 25, 2025",
    time: "9:00 AM - 12:00 PM",
    organizer: "Smile Foundation",
    isFree: true,
    isGovernmentScheme: false,
  },
  {
    id: "camp4",
    name: "Women's Health Camp",
    type: "Women",
    distance: 4.1,
    date: "May 28, 2025",
    time: "10:00 AM - 3:00 PM",
    organizer: "Medicare Hospital",
    isFree: false,
    isGovernmentScheme: false,
  },
  {
    id: "camp5",
    name: "Children's Vaccination Drive",
    type: "Children",
    distance: 5.3,
    date: "June 1, 2025",
    time: "9:00 AM - 5:00 PM",
    organizer: "Health Department",
    isFree: true,
    isGovernmentScheme: true,
  },
];

// Mock data for emergency services
const emergencyServices = [
  { name: "Emergency Ambulance", phone: "108", icon: <Ambulance size={18} /> },
  { name: "Covid Helpline", phone: "1075", icon: <Info size={18} /> },
  { name: "Cardiac Ambulance", phone: "1050", icon: <Heart size={18} /> },
];

export default function HomeTab() {
  const [recommendedCamps, setRecommendedCamps] = useState<typeof medicalCamps>([]);
  
  // Simulate fetching recommended camps based on user preferences
  useEffect(() => {
    // In a real app, this would come from an API based on user's health assessment
    setRecommendedCamps([medicalCamps[0], medicalCamps[2]]);
  }, []);

  return (
    <div className="pb-20 pt-2">
      <div className="container px-4 mx-auto">
        {recommendedCamps.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="space-y-4">
              {recommendedCamps.map((camp) => (
                <MedicalCampCard key={camp.id} {...camp} />
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Emergency Services</h2>
          <div className="space-y-3">
            {emergencyServices.map((service, index) => (
              <HealthCard
                key={index}
                title={service.name}
                icon={service.icon}
                indicatorColor="red"
                compact
              >
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold text-lg">{service.phone}</span>
                  <Button
                    size="sm"
                    className="rounded-full bg-apple-red hover:bg-apple-red/90"
                  >
                    Call Now
                  </Button>
                </div>
              </HealthCard>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Nearby Medical Camps</h2>
            <Button variant="link" className="text-apple-blue p-0 h-auto">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {medicalCamps.slice(0, 3).map((camp) => (
              <MedicalCampCard key={camp.id} {...camp} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Government Schemes</h2>
            <Button variant="link" className="text-apple-blue p-0 h-auto">
              See All
            </Button>
          </div>
          
          <div className="space-y-4">
            {medicalCamps
              .filter(camp => camp.isGovernmentScheme)
              .map((camp) => (
                <MedicalCampCard key={camp.id} {...camp} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
