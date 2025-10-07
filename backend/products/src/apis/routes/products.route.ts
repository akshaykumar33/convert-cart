import { Router, Request, Response, NextFunction } from 'express';
import { getProductsQuerySchema } from '@/apis/validators/product.validators';
import { productService } from '@/apis/services/product.service';
import { logger } from '@/apis/middlewares/logger';
import { z } from 'zod';

const router = Router();


/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Retrieve paginated list of products
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         required: false
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by product category
 *       - in: query
 *         name: stock_status
 *         schema:
 *           type: string
 *           enum: [instock, outofstock, onbackorder]
 *         required: false
 *         description: Filter by stock status
 *       - in: query
 *         name: on_sale
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Filter by sale status
 *     responses:
 *       200:
 *         description: List of products with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                      type: integer
 *                     page:
 *                      type: integer
 *                     limit:
 *                      type: integer
 *                     pages:
 *                      type: integer
 *       400:
 *         description: Invalid query parameter
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = getProductsQuerySchema.parse(req.query);
    const page = parsed.page ?? 1;
    const limit = parsed.limit ?? 20;
    const filter = {
      category: parsed.category,
      stock_status: parsed.stock_status,
      on_sale: parsed.on_sale
    };

    const data = await productService.getProducts(filter, page, limit);
    res.json(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      logger.warn('Invalid query parameters: %o', err.issues);
      return res.status(400).json({ errors: err.issues });
    }
    next(err);
  }
});

/**
 * @openapi
 * /api/products/sync:
 *   post:
 *     summary: Trigger a product sync from WooCommerce
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Sync process started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 */
router.post('/sync', async (_req, res, next) => {
  try {
    const result = await productService.syncAll(100);
    res.json({ message: 'Sync started', result });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get product detail by id
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Numeric id of the product to get
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
    const product = await productService.getById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

export default router;
