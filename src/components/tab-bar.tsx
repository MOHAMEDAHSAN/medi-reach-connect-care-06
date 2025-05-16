
import { Home, Calendar, User, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabBarProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export function TabBar({ activeTab, onChange }: TabBarProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "plan", label: "My Plan", icon: Calendar },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "profile", label: "Profile", icon: User },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-20">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors",
                isActive ? "text-apple-blue" : "text-gray-400"
              )}
              onClick={() => onChange(tab.id)}
            >
              <tab.icon size={22} className={cn(isActive && "text-apple-blue")} />
              <span className="text-xs mt-1">{tab.label}</span>
              {isActive && (
                <div className="h-1 w-1 rounded-full bg-apple-blue mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
