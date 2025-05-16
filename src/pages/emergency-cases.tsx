
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Ambulance, Heart, Info, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HealthCard } from "@/components/health-card";
import { MedConnectLogo } from "@/components/med-connect-logo";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for emergency services
const emergencyServices = [
  { name: "Emergency Ambulance", phone: "108", icon: <Ambulance size={16} /> },
  { name: "Covid Helpline", phone: "1075", icon: <Info size={16} /> },
  { name: "Cardiac Ambulance", phone: "1050", icon: <Heart size={16} /> },
];

// Mock data for emergency scenarios
const emergencyScenarios = [
  {
    id: "emergency1",
    title: "Heart Attack",
    symptoms: ["Chest pain or pressure", "Shortness of breath", "Pain in arms, neck, jaw or back"],
    actions: [
      "Call emergency services immediately (108)",
      "Make the person sit or lie down in a comfortable position",
      "Loosen tight clothing",
      "If the person is unconscious, start CPR if trained"
    ],
    doctorAdvice: "Time is critical in heart attacks. Don't wait to see if symptoms improve - call for emergency help right away. If available, chew aspirin (unless allergic).",
    doctor: "Dr. James Wilson, Cardiologist"
  },
  {
    id: "emergency2",
    title: "Severe Bleeding",
    symptoms: ["Blood soaking through bandage", "Spurting blood", "Blood pooling on the ground"],
    actions: [
      "Apply direct pressure to the wound using a clean cloth",
      "Keep pressure applied until medical help arrives",
      "If possible, elevate the injured area above the heart",
      "Don't remove the cloth if it becomes soaked - add more on top"
    ],
    doctorAdvice: "Apply firm, continuous pressure. For severe bleeding, use a tourniquet only as a last resort when direct pressure fails and professional help is far away.",
    doctor: "Dr. Sarah Johnson, Emergency Medicine"
  },
  {
    id: "emergency3",
    title: "Stroke",
    symptoms: ["Facial drooping", "Arm weakness", "Speech difficulties", "Time to call emergency"],
    actions: [
      "Call emergency services immediately (108)",
      "Note the time when symptoms first appeared",
      "Have the person lie down with head slightly elevated",
      "Don't give the person anything to eat or drink"
    ],
    doctorAdvice: "Remember FAST: Face dropping, Arm weakness, Speech difficulties, Time to call emergency. Time is critical - every minute counts for better recovery outcomes.",
    doctor: "Dr. Michael Lee, Neurologist"
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

export default function EmergencyCasesPage() {
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
          <h1 className="text-2xl font-bold mb-2 text-apple-red">Emergency Help</h1>
          <p className="text-muted-foreground">Quick access to emergency services and medical advice</p>
        </motion.div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Emergency Services</h2>
          <div className="space-y-3">
            {emergencyServices.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
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
                      <PhoneCall className="h-3 w-3 mr-1" /> Call Now
                    </Button>
                  </div>
                </HealthCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Emergency Scenarios</h2>
          <Tabs defaultValue="heart" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="heart">Heart</TabsTrigger>
              <TabsTrigger value="bleeding">Bleeding</TabsTrigger>
              <TabsTrigger value="stroke">Stroke</TabsTrigger>
            </TabsList>
            
            {emergencyScenarios.map((scenario) => (
              <TabsContent key={scenario.id} value={scenario.id.split('emergency')[1]}>
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={item}>
                    <Card className="mb-4 border-apple-red/20">
                      <CardContent className="p-5">
                        <h3 className="text-lg font-semibold text-apple-red mb-3">{scenario.title}</h3>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-2">Symptoms:</h4>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            {scenario.symptoms.map((symptom, idx) => (
                              <li key={idx}>{symptom}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-2">What to Do:</h4>
                          <ol className="list-decimal pl-5 text-sm space-y-2">
                            {scenario.actions.map((action, idx) => (
                              <li key={idx}>{action}</li>
                            ))}
                          </ol>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mt-4">
                          <h4 className="font-medium text-sm mb-2">Doctor's Advice:</h4>
                          <p className="text-sm text-gray-700">{scenario.doctorAdvice}</p>
                          <p className="text-xs text-right mt-2 text-gray-500">— {scenario.doctor}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div variants={item}>
                    <Button
                      className="w-full rounded-full bg-apple-red hover:bg-apple-red/90 transition-colors"
                    >
                      <PhoneCall className="h-4 w-4 mr-2" /> Call Emergency Services (108)
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>
    </div>
  );
}
