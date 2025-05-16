
import { useState } from "react";
import { User, Settings, Heart, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HealthCard } from "@/components/health-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ProfileTabProps {
  userData: {
    name: string;
    age: number;
    gender: string;
    city: string;
    language: string;
  };
  onLogout: () => void;
}

export default function ProfileTab({ userData, onLogout }: ProfileTabProps) {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  
  const userInitials = userData.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  
  return (
    <div className="pb-20 pt-2">
      <div className="container px-4 mx-auto">
        <section className="flex flex-col items-center mb-8 text-center">
          <Avatar className="h-24 w-24 border-2 border-gray-100 mb-4">
            <AvatarImage src="" />
            <AvatarFallback className="bg-apple-blue text-white text-2xl">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-semibold">{userData.name}</h1>
          <p className="text-gray-500">{userData.city}</p>
          
          <Button 
            variant="outline" 
            className="mt-4 rounded-full"
          >
            Edit Profile
          </Button>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          
          <HealthCard
            title="User Details"
            icon={<User size={18} />}
          >
            <div className="mt-3 space-y-2">
              <div className="flex items-start">
                <div className="w-24 text-gray-500">Age</div>
                <div>{userData.age} years</div>
              </div>
              <div className="flex items-start">
                <div className="w-24 text-gray-500">Gender</div>
                <div className="capitalize">{userData.gender}</div>
              </div>
              <div className="flex items-start">
                <div className="w-24 text-gray-500">City</div>
                <div>{userData.city}</div>
              </div>
              <div className="flex items-start">
                <div className="w-24 text-gray-500">Language</div>
                <div className="capitalize">{userData.language}</div>
              </div>
            </div>
          </HealthCard>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Health Assessment</h2>
          
          <HealthCard
            title="Take Health Risk Assessment"
            icon={<Heart size={18} />}
            indicatorColor="blue"
          >
            <p className="text-gray-600 mt-2">
              Answer a few questions about your health to get personalized recommendations.
            </p>
            <Button className="w-full mt-4 rounded-full bg-apple-blue">
              Start Assessment
            </Button>
          </HealthCard>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">App Settings</h2>
          
          <HealthCard
            title="Settings"
            icon={<Settings size={18} />}
          >
            <div className="space-y-4 mt-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="text-base">Notifications</Label>
                  <p className="text-sm text-gray-500">Enable push notifications</p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="location" className="text-base">Location Services</Label>
                  <p className="text-sm text-gray-500">Allow access to your location</p>
                </div>
                <Switch 
                  id="location" 
                  checked={locationServices}
                  onCheckedChange={setLocationServices}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-base">Language</p>
                  <p className="text-sm text-gray-500">Change app language</p>
                </div>
                <Button variant="ghost" className="p-1">
                  <ChevronRight size={18} />
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-base">Privacy Policy</p>
                </div>
                <Button variant="ghost" className="p-1">
                  <ChevronRight size={18} />
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-base">Terms of Service</p>
                </div>
                <Button variant="ghost" className="p-1">
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </HealthCard>
        </section>
        
        <Button 
          variant="outline" 
          className="w-full rounded-full mt-6 text-red-500 border-red-200 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut size={16} className="mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
