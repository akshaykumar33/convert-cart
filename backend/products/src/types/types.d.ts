export type StockStatus = 'instock' | 'outofstock' | 'onbackorder';

export interface ProductDTO {
  id: number;
  title: string;
  price: string;
  stock_status: StockStatus;
  stock_quantity?: number | null;
  category: string;
  tags: string[];
  on_sale: boolean;
  created_at: string; 
}
