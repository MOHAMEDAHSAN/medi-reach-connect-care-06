
import React, { useState, useEffect } from 'react';
import { TabBar } from "@/components/tab-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MedicinesTable } from "@/components/pharmacy/medicines-table";
import { SuppliersTable } from "@/components/pharmacy/suppliers-table";
import { PurchasesTable } from "@/components/pharmacy/purchases-table";
import { SalesTable } from "@/components/pharmacy/sales-table";
import { HealthCard } from "@/components/health-card";
import { ArrowUpRight, PackageSearch, Users, ShoppingCart, CreditCard } from "lucide-react";
import { pharmacyService } from "@/services/pharmacyService";

export function PharmacyDashboard() {
  const [activeTab, setActiveTab] = useState("medicines");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [medicineCount, setMedicineCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [saleCount, setSaleCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchCounts = async () => {
      setIsLoading(true);
      try {
        const medicines = await pharmacyService.getMedicines();
        const suppliers = await pharmacyService.getSuppliers();
        const purchases = await pharmacyService.getPurchases();
        const sales = await pharmacyService.getSales();
        
        setMedicineCount(medicines.length);
        setSupplierCount(suppliers.length);
        setPurchaseCount(purchases.length);
        setSaleCount(sales.length);
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCounts();
  }, []);

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "medicines":
        return <MedicinesTable searchQuery={searchQuery} />;
      case "suppliers":
        return <SuppliersTable searchQuery={searchQuery} />;
      case "purchases":
        return <PurchasesTable searchQuery={searchQuery} />;
      case "sales":
        return <SalesTable searchQuery={searchQuery} />;
      default:
        return <MedicinesTable searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white py-4 px-4 mb-4 shadow-sm">
        <h1 className="text-2xl font-bold">Pharmacy Inventory Management</h1>
        <p className="text-gray-500">Manage your medicines, suppliers, purchases, and sales</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <HealthCard 
          title="Total Medicines" 
          icon={<PackageSearch />}
          indicatorColor="green"
        >
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">{isLoading ? '...' : medicineCount}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-apple-blue"
              onClick={() => setActiveTab("medicines")}
            >
              View <ArrowUpRight size={16} />
            </Button>
          </div>
        </HealthCard>
        
        <HealthCard 
          title="Suppliers" 
          icon={<Users />}
          indicatorColor="blue"
        >
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">{isLoading ? '...' : supplierCount}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-apple-blue"
              onClick={() => setActiveTab("suppliers")}
            >
              View <ArrowUpRight size={16} />
            </Button>
          </div>
        </HealthCard>
        
        <HealthCard 
          title="Recent Purchases" 
          icon={<ShoppingCart />}
          indicatorColor="yellow"
        >
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">{isLoading ? '...' : purchaseCount}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-apple-blue"
              onClick={() => setActiveTab("purchases")}
            >
              View <ArrowUpRight size={16} />
            </Button>
          </div>
        </HealthCard>
        
        <HealthCard 
          title="Recent Sales" 
          icon={<CreditCard />}
          indicatorColor="red"
        >
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">{isLoading ? '...' : saleCount}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-apple-blue"
              onClick={() => setActiveTab("sales")}
            >
              View <ArrowUpRight size={16} />
            </Button>
          </div>
        </HealthCard>
      </div>

      {/* Pharmacy Content Tabs */}
      <div className="bg-white shadow-sm rounded-xl mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab("medicines")}
              className={`px-3 py-2 font-medium rounded-lg text-sm ${activeTab === "medicines" ? "bg-apple-blue text-white" : "text-gray-600"}`}
            >
              Medicines
            </button>
            <button 
              onClick={() => setActiveTab("suppliers")}
              className={`px-3 py-2 font-medium rounded-lg text-sm ${activeTab === "suppliers" ? "bg-apple-blue text-white" : "text-gray-600"}`}
            >
              Suppliers
            </button>
            <button 
              onClick={() => setActiveTab("purchases")}
              className={`px-3 py-2 font-medium rounded-lg text-sm ${activeTab === "purchases" ? "bg-apple-blue text-white" : "text-gray-600"}`}
            >
              Purchases
            </button>
            <button 
              onClick={() => setActiveTab("sales")}
              className={`px-3 py-2 font-medium rounded-lg text-sm ${activeTab === "sales" ? "bg-apple-blue text-white" : "text-gray-600"}`}
            >
              Sales
            </button>
          </div>
          <div className="w-64">
            <Input 
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full"
            />
          </div>
        </div>

        <div className="p-4">
          {renderActiveTabContent()}
        </div>
      </div>
      
      {/* Bottom Tab Bar */}
      <TabBar activeTab="home" onChange={() => {}} />
    </div>
  );
}
