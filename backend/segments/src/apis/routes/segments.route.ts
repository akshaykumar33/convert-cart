import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { evaluateSegment } from '@/apis/services/segment.service';
import { logger } from '@/apis/middlewares/logger';

const router = Router();

const evaluateSchema = z.object({
  conditions: z.array(z.string().min(1)).min(1)
});

/**
 * @openapi
 * /api/segments/evaluate:
 *   post:
 *     summary: Evaluate product segments based on rules
 *     tags:
 *       - Segments
 *     requestBody:
 *       description: List of text-based conditions to apply
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conditions:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               conditions:
 *                 - "price > 1000"
 *                 - "stock_status = instock"
 *     responses:
 *       200:
 *         description: List of products matching segment conditions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conditions:
 *                   type: array
 *                   items:
 *                     type: string
 *                 totalMatched:
 *                   type: integer
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 evaluatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid conditions format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.post('/evaluate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { conditions } = evaluateSchema.parse(req.body);
    // console.log("conditions",conditions,"req.body",req.body)
    const result = await evaluateSegment(conditions);
    res.json({
      conditions,
      totalMatched: result.products.length,
      products: result.products,
      evaluatedAt: new Date().toISOString()
    });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ errors: err.issues });
    logger.warn('Segment evaluate error: %o', err?.message || err);
    next(err);
  }
});

/**
 * @openapi
 * /api/segments/validate:
 *   post:
 *     summary: Validate segment conditions syntax without execution
 *     tags:
 *       - Segments
 *     requestBody:
 *       description: Conditions to validate
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conditions:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               conditions:
 *                 - "price > 1000"
 *                 - "stock_status = instock"
 *     responses:
 *       200:
 *         description: Validation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 conditions:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid input format
 */
router.post('/validate', (req: Request, res: Response) => {
  try {
    const { conditions } = evaluateSchema.parse(req.body);
    // For now just return valid true; deeper validation in service layer
    res.json({ valid: true, conditions });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ errors: err.issues });
    res.status(400).json({ valid: false, error: (err as Error).message });
  }
});

/**
 * @openapi
 * /api/segments/fields:
 *   get:
 *     summary: Get segmentation fields, operators, and examples
 *     tags:
 *       - Segments
 *     responses:
 *       200:
 *         description: Fields supported in segmentation conditions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fields:
 *                   type: object
 *                   additionalProperties:
 *                     type: object
 *                 operators:
 *                   type: object
 *                   additionalProperties:
 *                     type: array
 *                     items:
 *                       type: string
 *                 examples:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/fields', (_req: Request, res: Response) => {
  res.json({
    fields: {
      id: { type: 'number', description: 'Product ID' },
      title: { type: 'string', description: 'Product title' },
      price: { type: 'number', description: 'Price' },
      stock_status: { type: 'string', values: ['instock', 'outofstock', 'onbackorder'], description: 'Stock status' },
      stock_quantity: { type: 'number', description: 'Items in stock' },
      category: { type: 'string', description: 'Category' },
      tags: { type: 'array', description: 'Tags' },
      on_sale: { type: 'boolean', description: 'On sale status' },
      created_at: { type: 'date', description: 'Date created' }
    },
    operators: {
      number: ['>', '<', '>=', '<=', '=', '!='],
      string: ['=', '!='],
      boolean: ['=', '!='],
      array: ['contains', 'not_contains']
    },
    examples: [
      'price > 1000',
      'stock_status = instock',
      'on_sale = true',
      'category = Electronics',
      'stock_quantity >= 10',
      'tags contains gaming'
    ]
  });
});

export default router;
