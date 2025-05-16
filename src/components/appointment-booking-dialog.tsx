
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { CalendarClock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookAppointment: (appointment: {
    doctorName: string;
    specialty: string;
    date: Date;
    time: string;
    location: string;
  }) => void;
}

export function AppointmentBookingDialog({
  open,
  onOpenChange,
  onBookAppointment,
}: AppointmentBookingDialogProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !doctorName || !specialty || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to book your appointment.",
        variant: "destructive",
      });
      return;
    }

    onBookAppointment({
      doctorName,
      specialty,
      date,
      time,
      location,
    });
    
    // Reset form
    setDate(undefined);
    setTime("");
    setDoctorName("");
    setSpecialty("");
    setLocation("");
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book New Appointment</DialogTitle>
          <DialogDescription>
            Fill in the details to schedule your appointment with a doctor.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctorName" className="text-right">
                Doctor
              </Label>
              <Input
                id="doctorName"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="Dr. Name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialty" className="text-right">
                Specialty
              </Label>
              <Input
                id="specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="e.g. Cardiologist"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Hospital/Clinic Name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Date</Label>
              <div className="col-span-3">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  className="border rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-apple-blue rounded-full">
              <CalendarClock className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
