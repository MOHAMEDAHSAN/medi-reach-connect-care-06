
import { Medicine, Supplier, Purchase, Sale } from "@/types/pharmacy";
import { supabase } from "@/integrations/supabase/client";

// Pharmacy service to handle CRUD operations with Supabase
export const pharmacyService = {
  // Medicines
  getMedicines: async () => {
    const { data, error } = await supabase
      .from('medicines')
      .select('*');
    
    if (error) {
      console.error('Error fetching medicines:', error);
      return [];
    }
    
    return data as Medicine[];
  },
  
  getMedicineById: async (id: number) => {
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .eq('medicine_id', id)
      .single();
    
    if (error) {
      console.error('Error fetching medicine by ID:', error);
      return null;
    }
    
    return data as Medicine;
  },
  
  // Suppliers
  getSuppliers: async () => {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*');
    
    if (error) {
      console.error('Error fetching suppliers:', error);
      return [];
    }
    
    return data as Supplier[];
  },
  
  getSupplierById: async (id: number) => {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .eq('supplier_id', id)
      .single();
    
    if (error) {
      console.error('Error fetching supplier by ID:', error);
      return null;
    }
    
    return data as Supplier;
  },
  
  // Purchases
  getPurchases: async () => {
    const { data, error } = await supabase
      .from('purchases')
      .select(`
        *,
        medicines (name),
        suppliers (name)
      `);
    
    if (error) {
      console.error('Error fetching purchases:', error);
      return [];
    }
    
    // Format the data to match our expected structure
    return data.map(purchase => ({
      purchase_id: purchase.purchase_id,
      medicine_id: purchase.medicine_id,
      supplier_id: purchase.supplier_id,
      purchase_date: purchase.purchase_date,
      quantity: purchase.quantity,
      total_cost: purchase.total_cost,
      medicine_name: purchase.medicines?.name,
      supplier_name: purchase.suppliers?.name
    })) as Purchase[];
  },
  
  // Sales
  getSales: async () => {
    const { data, error } = await supabase
      .from('sales')
      .select(`
        *,
        medicines (name)
      `);
    
    if (error) {
      console.error('Error fetching sales:', error);
      return [];
    }
    
    // Format the data to match our expected structure
    return data.map(sale => ({
      sale_id: sale.sale_id,
      medicine_id: sale.medicine_id,
      sale_date: sale.sale_date,
      quantity_sold: sale.quantity_sold,
      total_amount: sale.total_amount,
      medicine_name: sale.medicines?.name
    })) as Sale[];
  }
};
