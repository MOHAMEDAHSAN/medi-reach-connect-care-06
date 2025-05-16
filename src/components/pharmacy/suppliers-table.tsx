
import React, { useState, useEffect } from 'react';
import { pharmacyService } from "@/services/pharmacyService";
import { Supplier } from "@/types/pharmacy";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface SuppliersTableProps {
  searchQuery: string;
}

export function SuppliersTable({ searchQuery }: SuppliersTableProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const data = await pharmacyService.getSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSuppliers();
  }, []);
  
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.contact_number.includes(searchQuery)
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Suppliers</h2>
      
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(3).fill(0).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.supplier_id}>
                  <TableCell>{supplier.supplier_id}</TableCell>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contact_number}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No suppliers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
