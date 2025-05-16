
import React from 'react';
import { pharmacyService } from "@/services/pharmacyService";
import { Medicine } from "@/types/pharmacy";
import { 
  Table, 
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

interface MedicinesTableProps {
  searchQuery: string;
}

export function MedicinesTable({ searchQuery }: MedicinesTableProps) {
  const medicines = pharmacyService.getMedicines();
  
  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
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
  
  const getStockStatus = (medicine: Medicine) => {
    const expiryDate = new Date(medicine.expiry_date);
    const today = new Date();
    const monthsUntilExpiry = (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    if (medicine.quantity_in_stock <= 10) {
      return <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">Low Stock</span>;
    } else if (monthsUntilExpiry <= 3) {
      return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">Expiring Soon</span>;
    } else {
      return <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">In Stock</span>;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Medicines Inventory</h2>
      
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((medicine) => (
                <TableRow key={medicine.medicine_id}>
                  <TableCell>{medicine.medicine_id}</TableCell>
                  <TableCell className="font-medium">{medicine.name}</TableCell>
                  <TableCell>{medicine.category}</TableCell>
                  <TableCell>{medicine.manufacturer}</TableCell>
                  <TableCell>{formatCurrency(medicine.price)}</TableCell>
                  <TableCell>{medicine.quantity_in_stock}</TableCell>
                  <TableCell>{formatDate(medicine.expiry_date)}</TableCell>
                  <TableCell>{getStockStatus(medicine)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No medicines found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
