import { z } from 'zod';

export const getProductsQuerySchema = z.object({
  page: z.preprocess((v) => v ? Number(v) : undefined, z.number().int().positive().optional()),
  limit: z.preprocess((v) => v ? Number(v) : undefined, z.number().int().positive().max(100).optional()),
  category: z.string().min(1).optional(),
  stock_status: z.enum(['instock', 'outofstock', 'onbackorder']).optional(),
  on_sale: z.preprocess((v) => {
    if (v === 'true' || v === 'false') return v === 'true';
    return undefined;
  }, z.boolean().optional())
});
export type GetProductsQuery = z.infer<typeof getProductsQuerySchema>;
