import { IProduct } from '../../src/apis/models/Product';

export const sampleProducts: Partial<IProduct>[] = [
  {
    id: 1,
    title: 'Test Product 1',
    price: '49.99',
    stock_status: 'instock',
    stock_quantity: 12,
    category: 'Category1',
    tags: ['tag1', 'tag2'],
    on_sale: false,
    created_at: new Date(),
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: '149.99',
    stock_status: 'outofstock',
    stock_quantity: 0,
    category: 'Category2',
    tags: ['tag3'],
    on_sale: true,
    created_at: new Date(),
  },
];
