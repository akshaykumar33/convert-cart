import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  id: number;
  title: string;
  price: string; 
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity?: number | null;
  category: string;
  tags: string[];
  on_sale: boolean;
  created_at: Date;
  synced_at?: Date;
}

const productSchema = new Schema<IProduct>({
  id: { type: Number, required: true, unique: true, index: true },
  title: { type: String, required: true, index: true },
  price: {
  type: String,
  required: true,
  index: true,
  match: [/^\d+(\.\d{1,2})?$/, 'Price must be a valid number string (e.g., "10" or "10.99")'],
  validate: {
    validator: (value: string) => {
      return value !== '' && !isNaN(Number(value));
    },
    message: 'Price must be a non-empty string representing a valid number',
  },
},
  stock_status: { type: String, required: true, enum: ['instock', 'outofstock', 'onbackorder'], index: true },
  stock_quantity: { type: Number, default: null, index: true },
  category: { type: String, required: true, index: true },
  tags: [{ type: String, index: true }],
  on_sale: { type: Boolean, required: true, default: false, index: true },
  created_at: { type: Date, required: true, index: true },
  synced_at: { type: Date, default: Date.now }
}, { timestamps: true });

// Useful compound indexes
productSchema.index({ category: 1, on_sale: 1 });
productSchema.index({ stock_status: 1, price: 1 });
productSchema.index({ created_at: -1 });

export const ProductModel = model<IProduct>('Product', productSchema);
export default ProductModel;
