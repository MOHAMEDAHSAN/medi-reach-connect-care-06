
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const userInitials = userName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  
  return (
    <div className="sticky top-0 z-10 bg-background pt-4 pb-2">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">
              Hello, {userName.split(' ')[0]}
            </h1>
            <p className="text-gray-500 text-sm">Find healthcare services near you</p>
          </div>
          
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarImage src="" />
            <AvatarFallback className="bg-apple-blue text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className={`relative transition-all duration-200 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search camps, hospitals, services..."
            className="pl-10 py-6 rounded-xl bg-secondary border-0"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-3 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-gray-200 bg-background whitespace-nowrap"
          >
            All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-gray-200 bg-background whitespace-nowrap"
          >
            Near Me
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-gray-200 bg-background whitespace-nowrap"
          >
            Free Camps
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-gray-200 bg-background whitespace-nowrap"
          >
            Govt. Schemes
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-gray-200 bg-background whitespace-nowrap"
          >
            Emergency
          </Button>
        </div>
      </div>
    </div>
  );
}
