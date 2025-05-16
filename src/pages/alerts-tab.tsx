
import { Bell, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { HealthCard } from "@/components/health-card";

const notifications = [
  {
    id: "notif1",
    title: "Reminder: Eye Care Camp Tomorrow",
    message: "Don't forget your appointment at City Hospital at 9:00 AM.",
    time: "1 day ago",
    type: "reminder",
    icon: <Calendar size={16} />
  },
  {
    id: "notif2",
    title: "New Medical Camp Near You",
    message: "Free health checkup camp at Community Center on June 10, 2025.",
    time: "2 days ago",
    type: "new",
    icon: <Heart size={16} />
  },
  {
    id: "notif3",
    title: "Health Risk Assessment",
    message: "Your health risk assessment shows you should consider a cardiac checkup.",
    time: "3 days ago",
    type: "alert",
    icon: <Bell size={16} />
  }
];

export default function AlertsTab() {
  const getNotificationStyle = (type: string) => {
    const types: Record<string, { color: string, bg: string }> = {
      "reminder": { color: "text-apple-blue", bg: "bg-blue-50" },
      "new": { color: "text-green-600", bg: "bg-green-50" },
      "alert": { color: "text-orange-600", bg: "bg-orange-50" }
    };
    
    return types[type] || { color: "text-gray-600", bg: "bg-gray-50" };
  };
  
  return (
    <div className="pb-20 pt-2">
      <div className="container px-4 mx-auto">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          
          <div className="space-y-4">
            {notifications.map((notification) => {
              const style = getNotificationStyle(notification.type);
              
              return (
                <HealthCard
                  key={notification.id}
                  title={notification.title}
                  icon={notification.icon}
                >
                  <p className="text-gray-600 mt-2">{notification.message}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-400">{notification.time}</span>
                    <Badge className={`${style.bg} ${style.color} border-0`}>
                      {notification.type === "reminder" && "Reminder"}
                      {notification.type === "new" && "New"}
                      {notification.type === "alert" && "Alert"}
                    </Badge>
                  </div>
                </HealthCard>
              );
            })}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          
          <HealthCard
            title="Notification Preferences"
            icon={<Bell size={18} />}
          >
            <div className="space-y-4 mt-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reminders" className="text-base">Appointment Reminders</Label>
                  <p className="text-sm text-gray-500">Get notified about upcoming appointments</p>
                </div>
                <Switch id="reminders" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="new-camps" className="text-base">New Medical Camps</Label>
                  <p className="text-sm text-gray-500">Receive updates about new camps near you</p>
                </div>
                <Switch id="new-camps" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="health-alerts" className="text-base">Health Alerts</Label>
                  <p className="text-sm text-gray-500">Get important health-related alerts</p>
                </div>
                <Switch id="health-alerts" defaultChecked />
              </div>
            </div>
            
            <Button className="w-full mt-6 rounded-full bg-apple-blue">
              Save Preferences
            </Button>
          </HealthCard>
        </section>
      </div>
    </div>
  );
}

// Missing Badge component import
import { Badge } from "@/components/ui/badge";
