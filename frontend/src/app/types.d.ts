 interface Product {
  id: number;
  title: string;
  price: string;
  stock_status: string;
  stock_quantity?: number;
  category: string;
  tags: string[];
  on_sale: boolean;
  created_at: string;
}