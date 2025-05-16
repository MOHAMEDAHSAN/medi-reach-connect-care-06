
import { useState, useEffect } from "react";
import { OnboardingForm } from "@/components/onboarding-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { TabBar } from "@/components/tab-bar";
import HomeTab from "@/pages/home-tab";
import PlanTab from "@/pages/plan-tab";
import AlertsTab from "@/pages/alerts-tab";
import ProfileTab from "@/pages/profile-tab";

export function MediReachApp() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [userData, setUserData] = useState<{
    name: string;
    age: number;
    gender: string;
    city: string;
    language: string;
  } | null>(null);
  
  // Check if user data exists in local storage on mount
  useEffect(() => {
    const savedUserData = localStorage.getItem("medireach_user");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setOnboardingComplete(true);
    }
  }, []);
  
  const handleOnboardingComplete = (userData: {
    name: string;
    age: number;
    gender: string;
    city: string;
    language: string;
  }) => {
    setUserData(userData);
    setOnboardingComplete(true);
    
    // Save user data to local storage
    localStorage.setItem("medireach_user", JSON.stringify(userData));
  };
  
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("medireach_user");
    setUserData(null);
    setOnboardingComplete(false);
  };
  
  if (!onboardingComplete) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white p-4">
        <div className="w-full max-w-md mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">MediReach</h1>
          <p className="text-gray-500 mt-2">Access healthcare services near you</p>
        </div>
        <OnboardingForm onComplete={handleOnboardingComplete} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {userData && <DashboardHeader userName={userData.name} />}
      
      <main>
        {activeTab === "home" && <HomeTab />}
        {activeTab === "plan" && <PlanTab />}
        {activeTab === "alerts" && <AlertsTab />}
        {activeTab === "profile" && userData && (
          <ProfileTab 
            userData={userData} 
            onLogout={handleLogout}
          />
        )}
      </main>
      
      <TabBar activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
