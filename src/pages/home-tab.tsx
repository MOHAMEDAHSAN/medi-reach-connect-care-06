
import { useState, useEffect } from "react";
import { HealthCard } from "@/components/health-card";
import { MedicalCampCard } from "@/components/medical-camp-card";
import { Heart, Ambulance, Info, Calendar, Pill, User, Check, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  { name: "Emergency Ambulance", phone: "108", icon: <Ambulance size={16} /> },
  { name: "Covid Helpline", phone: "1075", icon: <Info size={16} /> },
  { name: "Cardiac Ambulance", phone: "1050", icon: <Heart size={16} /> },
];

// Mock data for applications
const applications = [
  { 
    id: "app1", 
    name: "Appointment Booking", 
    description: "Book doctor appointments", 
    icon: <Calendar size={18} /> 
  },
  { 
    id: "app2", 
    name: "Medication Tracker", 
    description: "Track your medications", 
    icon: <Pill size={18} /> 
  },
  { 
    id: "app3", 
    name: "Health Profile", 
    description: "Update your health profile", 
    icon: <User size={18} /> 
  },
  { 
    id: "app4", 
    name: "Symptom Checker", 
    description: "Check your symptoms", 
    icon: <Check size={18} /> 
  },
];

// Mock data for appointments
const appointments = [
  {
    id: "appt1",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "May 18, 2025",
    time: "10:30 AM",
    location: "City Hospital",
  },
  {
    id: "appt2",
    doctorName: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: "May 24, 2025",
    time: "2:15 PM",
    location: "Medical Center",
  }
];

// Animation variants for staggered entry
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

export default function HomeTab() {
  const [recommendedCamps, setRecommendedCamps] = useState<typeof medicalCamps>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Simulate fetching recommended camps based on user preferences
  useEffect(() => {
    // In a real app, this would come from an API based on user's health assessment
    setRecommendedCamps([medicalCamps[0], medicalCamps[2]]);
  }, []);

  const categories = [
    { id: "all", name: "All" },
    { id: "near", name: "Near Me" },
    { id: "free", name: "Free Camps" },
    { id: "govt", name: "Govt. Schemes" },
    { id: "emergency", name: "Emergency" },
  ];

  return (
    <div className="pb-24 pt-3 bg-background">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container px-5 mx-auto max-w-4xl"
      >
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-3 mb-7">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-full whitespace-nowrap transition-all duration-200",
                activeCategory === category.id 
                  ? "bg-apple-blue hover:bg-apple-blue/90" 
                  : "border-gray-200 hover:border-apple-blue/50"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Applications Section */}
        <motion.section 
          className="mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <h2 className="text-xl font-semibold mb-4">Applications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {applications.map((app) => (
              <motion.div key={app.id} variants={item}>
                <Card className="h-full hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer bg-white">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-apple-blue/10 flex items-center justify-center text-apple-blue mb-3 mt-2">
                      {app.icon}
                    </div>
                    <h3 className="font-medium text-sm">{app.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{app.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Upcoming Appointments Section */}
        <motion.section 
          className="mb-8"
          variants={container}
          initial="hidden"
          animate="show"
          transition={{ delayChildren: 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            <Button variant="link" className="text-apple-blue p-0 h-auto hover:underline text-sm">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <motion.div key={appointment.id} variants={item}>
                  <HealthCard
                    title={appointment.doctorName}
                    icon={<CalendarClock size={16} />}
                    indicatorColor="blue"
                  >
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-600 text-xs rounded-full px-2 py-0.5">{appointment.specialty}</span>
                    </div>
                    <div className="mt-3 space-y-1.5 text-sm">
                      <div className="flex items-start">
                        <div className="w-20 text-gray-500 text-xs">Date</div>
                        <div>{appointment.date}</div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-20 text-gray-500 text-xs">Time</div>
                        <div>{appointment.time}</div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-20 text-gray-500 text-xs">Location</div>
                        <div>{appointment.location}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1 rounded-full text-xs">
                        Reschedule
                      </Button>
                      <Button size="sm" className="flex-1 rounded-full bg-apple-blue text-xs">
                        Directions
                      </Button>
                    </div>
                  </HealthCard>
                </motion.div>
              ))
            ) : (
              <motion.div variants={item}>
                <Card className="p-6 text-center">
                  <p className="text-gray-500 mb-3">No upcoming appointments</p>
                  <Button className="rounded-full bg-apple-blue mx-auto">Book Appointment</Button>
                </Card>
              </motion.div>
            )}
          </div>
        </motion.section>
        
        {recommendedCamps.length > 0 && (
          <motion.section 
            className="mb-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="space-y-4">
              {recommendedCamps.map((camp) => (
                <motion.div key={camp.id} variants={item}>
                  <MedicalCampCard key={camp.id} {...camp} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section 
          className="mb-8"
          variants={container}
          initial="hidden"
          animate="show"
          transition={{ delayChildren: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Emergency Services</h2>
          <div className="space-y-3">
            {emergencyServices.map((service, index) => (
              <motion.div key={index} variants={item}>
                <HealthCard
                  title={service.name}
                  icon={service.icon}
                  indicatorColor="red"
                  compact
                >
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-base">{service.phone}</span>
                    <Button
                      size="sm"
                      className="rounded-full bg-apple-red hover:bg-apple-red/90 transition-colors duration-200 text-xs py-1 px-3 h-auto"
                    >
                      Call Now
                    </Button>
                  </div>
                </HealthCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="mb-8"
          variants={container}
          initial="hidden"
          animate="show"
          transition={{ delayChildren: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Nearby Medical Camps</h2>
            <Button variant="link" className="text-apple-blue p-0 h-auto hover:underline text-sm">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {medicalCamps.slice(0, 3).map((camp) => (
              <motion.div key={camp.id} variants={item}>
                <MedicalCampCard key={camp.id} {...camp} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          transition={{ delayChildren: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Government Schemes</h2>
            <Button variant="link" className="text-apple-blue p-0 h-auto hover:underline text-sm">
              See All
            </Button>
          </div>
          
          <div className="space-y-4 pb-4">
            {medicalCamps
              .filter(camp => camp.isGovernmentScheme)
              .map((camp) => (
                <motion.div key={camp.id} variants={item}>
                  <MedicalCampCard key={camp.id} {...camp} />
                </motion.div>
              ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
