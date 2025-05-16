
import React, { useState, useEffect } from 'react';
import { pharmacyService } from "@/services/pharmacyService";
import { Purchase } from "@/types/pharmacy";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface PurchasesTableProps {
  searchQuery: string;
}

export function PurchasesTable({ searchQuery }: PurchasesTableProps) {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      try {
        const data = await pharmacyService.getPurchases();
        setPurchases(data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPurchases();
  }, []);
  
  const filteredPurchases = purchases.filter(purchase => 
    purchase.medicine_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    purchase.supplier_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    purchase.purchase_date.includes(searchQuery)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Purchase History</h2>
      
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Medicine</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  <TableCell colSpan={6}>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredPurchases.length > 0 ? (
              filteredPurchases.map((purchase) => (
                <TableRow key={purchase.purchase_id}>
                  <TableCell>{purchase.purchase_id}</TableCell>
                  <TableCell className="font-medium">{purchase.medicine_name}</TableCell>
                  <TableCell>{purchase.supplier_name}</TableCell>
                  <TableCell>{formatDate(purchase.purchase_date)}</TableCell>
                  <TableCell>{purchase.quantity}</TableCell>
                  <TableCell>{formatCurrency(Number(purchase.total_cost))}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No purchases found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
