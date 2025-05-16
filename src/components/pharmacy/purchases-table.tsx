
import React from 'react';
import { pharmacyService } from "@/services/pharmacyService";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

interface PurchasesTableProps {
  searchQuery: string;
}

export function PurchasesTable({ searchQuery }: PurchasesTableProps) {
  const purchases = pharmacyService.getPurchases();
  
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
            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((purchase) => (
                <TableRow key={purchase.purchase_id}>
                  <TableCell>{purchase.purchase_id}</TableCell>
                  <TableCell className="font-medium">{purchase.medicine_name}</TableCell>
                  <TableCell>{purchase.supplier_name}</TableCell>
                  <TableCell>{formatDate(purchase.purchase_date)}</TableCell>
                  <TableCell>{purchase.quantity}</TableCell>
                  <TableCell>{formatCurrency(purchase.total_cost)}</TableCell>
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
