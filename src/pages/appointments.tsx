
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, CalendarClock, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { HealthCard } from "@/components/health-card";
import { MedConnectLogo } from "@/components/med-connect-logo";

// Mock data for appointments
const upcomingAppointments = [
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

const pastAppointments = [
  {
    id: "past1",
    doctorName: "Dr. Lisa Wong",
    specialty: "General Practitioner",
    date: "April 10, 2025",
    time: "9:00 AM",
    location: "Community Clinic",
  },
  {
    id: "past2",
    doctorName: "Dr. James Miller",
    specialty: "Orthopedic Surgeon",
    date: "March 15, 2025",
    time: "11:45 AM",
    location: "Specialists Hospital",
  }
];

// Animation variants
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

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <MedConnectLogo size="small" />
            </Link>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold mb-2">My Appointments</h1>
          <p className="text-muted-foreground">Manage your healthcare appointments</p>
        </motion.div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
            >
              {upcomingAppointments.map((appointment) => (
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
              ))}
              
              <motion.div variants={item} className="mt-6">
                <Button className="w-full bg-apple-blue hover:bg-apple-blue/90 rounded-full">
                  <Calendar className="mr-2 h-4 w-4" /> Book New Appointment
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
            >
              {pastAppointments.map((appointment) => (
                <motion.div key={appointment.id} variants={item}>
                  <Card className="bg-gray-50 border-gray-100">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{appointment.doctorName}</h3>
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-0.5 mt-1">{appointment.specialty}</span>
                        </div>
                        <span className="text-sm text-gray-500">{appointment.date}</span>
                      </div>
                      <div className="mt-3 space-y-1.5 text-sm">
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
                        <Button variant="outline" size="sm" className="text-xs">
                          View Details
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Book Similar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
