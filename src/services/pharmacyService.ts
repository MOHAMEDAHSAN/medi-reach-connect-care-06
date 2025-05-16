
import { Medicine, Supplier, Purchase, Sale } from "@/types/pharmacy";

// Sample data for Medicines
const medicinesData: Medicine[] = [
  {
    medicine_id: 1,
    name: "Paracetamol",
    category: "Analgesic",
    manufacturer: "Johnson & Johnson",
    price: 5.99,
    quantity_in_stock: 150,
    expiry_date: "2025-06-15"
  },
  {
    medicine_id: 2,
    name: "Amoxicillin",
    category: "Antibiotic",
    manufacturer: "Pfizer",
    price: 12.50,
    quantity_in_stock: 80,
    expiry_date: "2024-12-01"
  },
  {
    medicine_id: 3,
    name: "Loratadine",
    category: "Antihistamine",
    manufacturer: "Bayer",
    price: 8.75,
    quantity_in_stock: 100,
    expiry_date: "2025-03-22"
  },
  {
    medicine_id: 4,
    name: "Ibuprofen",
    category: "Anti-inflammatory",
    manufacturer: "GSK",
    price: 7.25,
    quantity_in_stock: 120,
    expiry_date: "2025-05-10"
  },
  {
    medicine_id: 5,
    name: "Metformin",
    category: "Antidiabetic",
    manufacturer: "Merck",
    price: 15.30,
    quantity_in_stock: 60,
    expiry_date: "2024-10-18"
  }
];

// Sample data for Suppliers
const suppliersData: Supplier[] = [
  {
    supplier_id: 1,
    name: "MediPharma Distributors",
    contact_number: "+1-555-123-4567",
    email: "contact@medipharma.com"
  },
  {
    supplier_id: 2,
    name: "Global Health Supplies",
    contact_number: "+1-555-234-5678",
    email: "sales@globalhealthsupplies.com"
  },
  {
    supplier_id: 3,
    name: "PharmaPlus Inc.",
    contact_number: "+1-555-345-6789",
    email: "info@pharmaplus.com"
  },
  {
    supplier_id: 4,
    name: "MediTech Suppliers",
    contact_number: "+1-555-456-7890",
    email: "orders@meditechsuppliers.com"
  }
];

// Sample data for Purchases
const purchasesData: Purchase[] = [
  {
    purchase_id: 1,
    medicine_id: 1,
    supplier_id: 2,
    purchase_date: "2023-10-15",
    quantity: 50,
    total_cost: 249.50
  },
  {
    purchase_id: 2,
    medicine_id: 2,
    supplier_id: 1,
    purchase_date: "2023-11-02",
    quantity: 30,
    total_cost: 337.50
  },
  {
    purchase_id: 3,
    medicine_id: 3,
    supplier_id: 3,
    purchase_date: "2023-11-10",
    quantity: 40,
    total_cost: 320.00
  },
  {
    purchase_id: 4,
    medicine_id: 4,
    supplier_id: 2,
    purchase_date: "2023-12-05",
    quantity: 45,
    total_cost: 303.75
  },
  {
    purchase_id: 5,
    medicine_id: 5,
    supplier_id: 4,
    purchase_date: "2024-01-10",
    quantity: 25,
    total_cost: 357.50
  }
];

// Sample data for Sales
const salesData: Sale[] = [
  {
    sale_id: 1,
    medicine_id: 1,
    sale_date: "2024-01-05",
    quantity_sold: 10,
    total_amount: 59.90
  },
  {
    sale_id: 2,
    medicine_id: 3,
    sale_date: "2024-01-08",
    quantity_sold: 5,
    total_amount: 43.75
  },
  {
    sale_id: 3,
    medicine_id: 2,
    sale_date: "2024-01-12",
    quantity_sold: 8,
    total_amount: 100.00
  },
  {
    sale_id: 4,
    medicine_id: 4,
    sale_date: "2024-01-15",
    quantity_sold: 12,
    total_amount: 87.00
  },
  {
    sale_id: 5,
    medicine_id: 1,
    sale_date: "2024-01-18",
    quantity_sold: 7,
    total_amount: 41.93
  }
];

// Pharmacy service to handle CRUD operations
export const pharmacyService = {
  // Medicines
  getMedicines: () => {
    return [...medicinesData];
  },
  getMedicineById: (id: number) => {
    return medicinesData.find(med => med.medicine_id === id);
  },
  
  // Suppliers
  getSuppliers: () => {
    return [...suppliersData];
  },
  getSupplierById: (id: number) => {
    return suppliersData.find(sup => sup.supplier_id === id);
  },
  
  // Purchases
  getPurchases: () => {
    return purchasesData.map(purchase => {
      const medicine = medicinesData.find(m => m.medicine_id === purchase.medicine_id);
      const supplier = suppliersData.find(s => s.supplier_id === purchase.supplier_id);
      
      return {
        ...purchase,
        medicine_name: medicine?.name,
        supplier_name: supplier?.name
      };
    });
  },
  
  // Sales
  getSales: () => {
    return salesData.map(sale => {
      const medicine = medicinesData.find(m => m.medicine_id === sale.medicine_id);
      
      return {
        ...sale,
        medicine_name: medicine?.name
      };
    });
  }
};
