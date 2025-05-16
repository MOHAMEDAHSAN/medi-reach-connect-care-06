
import React, { useState, useEffect } from 'react';
import { pharmacyService } from "@/services/pharmacyService";
import { Sale } from "@/types/pharmacy";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface SalesTableProps {
  searchQuery: string;
}

export function SalesTable({ searchQuery }: SalesTableProps) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const data = await pharmacyService.getSales();
        setSales(data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSales();
  }, []);
  
  const filteredSales = sales.filter(sale => 
    sale.medicine_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.sale_date.includes(searchQuery)
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
      <h2 className="text-xl font-bold mb-4">Sales History</h2>
      
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Medicine</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-12 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredSales.length > 0 ? (
              filteredSales.map((sale) => (
                <TableRow key={sale.sale_id}>
                  <TableCell>{sale.sale_id}</TableCell>
                  <TableCell className="font-medium">{sale.medicine_name}</TableCell>
                  <TableCell>{formatDate(sale.sale_date)}</TableCell>
                  <TableCell>{sale.quantity_sold}</TableCell>
                  <TableCell>{formatCurrency(Number(sale.total_amount))}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No sales found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
