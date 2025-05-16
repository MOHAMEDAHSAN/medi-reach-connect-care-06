
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MedicinesTable } from "@/components/pharmacy/medicines-table";
import { SuppliersTable } from "@/components/pharmacy/suppliers-table";
import { SalesTable } from "@/components/pharmacy/sales-table";
import { PurchasesTable } from "@/components/pharmacy/purchases-table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MedConnectLogo } from "@/components/med-connect-logo";
import { MobileNavigation } from "@/components/mobile-navigation";

// Navigation items for both desktop and mobile
const navigationItems = [
  { title: "Dashboard", href: "/" },
  { title: "Health Risk Assessment", href: "/risk-assessment" }
];

export function PharmacyDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MedConnectLogo size="medium" />
          
          <nav className="hidden md:flex gap-6 mr-4">
            {navigationItems.map((item) => (
              <Link 
                key={item.href} 
                to={item.href} 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-sm md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search medicines, suppliers..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <MobileNavigation items={navigationItems} />
          </div>
        </div>
      </header>
      
      <div className="container px-4 md:px-6 py-6">
        <Tabs defaultValue="medicines" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="medicines">Medicines</TabsTrigger>
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
            </TabsList>
            
            <div className="hidden sm:block">
              <Button variant="outline" asChild>
                <Link to="/risk-assessment">
                  Health Risk Assessment
                </Link>
              </Button>
            </div>
          </div>
          
          <TabsContent value="medicines" className="space-y-4">
            <MedicinesTable searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="suppliers" className="space-y-4">
            <SuppliersTable searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <SalesTable searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="purchases" className="space-y-4">
            <PurchasesTable searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
