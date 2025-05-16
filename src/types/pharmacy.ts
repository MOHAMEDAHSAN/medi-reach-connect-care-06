
// Pharmacy database models

export interface Medicine {
  medicine_id: number;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  quantity_in_stock: number;
  expiry_date: string; // ISO format date string
}

export interface Supplier {
  supplier_id: number;
  name: string;
  contact_number: string;
  email: string;
}

export interface Purchase {
  purchase_id: number;
  medicine_id: number;
  supplier_id: number;
  purchase_date: string; // ISO format date string
  quantity: number;
  total_cost: number;
  
  // For UI display (not in actual DB schema)
  medicine_name?: string;
  supplier_name?: string;
}

export interface Sale {
  sale_id: number;
  medicine_id: number;
  sale_date: string; // ISO format date string
  quantity_sold: number;
  total_amount: number;
  
  // For UI display (not in actual DB schema)
  medicine_name?: string;
}
