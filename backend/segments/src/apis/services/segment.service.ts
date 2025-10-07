import { ProductModel } from '@/apis/models/Product';
import { z } from 'zod';

// Validate non-empty string input
export const conditionSchema = z.string().min(1);

// Escape regex input to avoid ReDoS and invalid patterns
function escapeRegExp(str: string) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Validate and parse condition strings
export function validateAndParseConditions(conditions: string[]) {
  console.log('validateAndParseConditions called with:', conditions);

  const parsed: Array<{ field: string; operator: string; value: any }> = [];
  const allowedFields = [
    'id', 'title', 'price', 'stock_status', 'stock_quantity',
    'category', 'tags', 'on_sale', 'created_at'
  ];

  const operatorRegex = /^(>=|<=|!=|>|<|=|contains|not_contains)$/;

  for (const cond of conditions) {
    const trimmed = cond.trim();
    if (!trimmed) throw new Error('Condition cannot be empty');

    const m = trimmed.match(/^(\w+)\s*(>=|<=|!=|>|<|=|contains|not_contains)\s*(.+)$/);
    if (!m) throw new Error(`Invalid condition format: "${cond}"`);

    const [, field, operator, rawValue] = m;
    const normalizedField = field.toLowerCase();

    if (!allowedFields.includes(normalizedField) && normalizedField !== 'brand') {
      console.warn(`Field "${field}" is not supported and will be ignored.`);
      continue;
    }

    if (!operatorRegex.test(operator)) throw new Error(`Invalid operator "${operator}"`);

    let value: any = rawValue.trim().replace(/^["']|["']$/g, '');

    if (!value && field !== 'stock_status') {
      throw new Error(`Value cannot be empty for field "${field}"`);
    }

    // Parse field types
    if (field === 'id' || field === 'stock_quantity') {
      value = Number(value);
      if (isNaN(value)) throw new Error(`Invalid number for field "${field}": "${rawValue}"`);
    } else if (field === 'price') {
      value = Number(value);
      if (isNaN(value)) throw new Error(`Invalid price value: "${rawValue}"`);
    } else if (field === 'on_sale') {
      if (!['true', 'false'].includes(value.toLowerCase())) {
        throw new Error('on_sale must be "true" or "false"');
      }
      value = value.toLowerCase() === 'true';
    } else if (field === 'created_at') {
      const d = new Date(value);
      if (isNaN(d.getTime())) throw new Error(`Invalid date: "${rawValue}"`);
      value = d;
    } else if (normalizedField === 'brand' || field === 'tags' || field === 'category') {
      value = value.toLowerCase();
    }

    parsed.push({ field, operator, value });
  }

  console.log('Parsed conditions:', parsed);
  return parsed;
}

// Main evaluation function
export async function evaluateSegment(conditions: string[]) {
  try {
    const parsed = validateAndParseConditions(conditions);
    console.log("parsed", parsed)
    const match: any = {};
    const andConditions: any[] = [];
    let needsAggregation = false;

    for (const c of parsed) {
      const regexValue = new RegExp(escapeRegExp(c.value), 'i');

      // Tags
      if (c.field === 'tags') {
        if (['=', 'contains'].includes(c.operator)) {
          andConditions.push({ tags: { $regex: regexValue } });
        } else if (['!=', 'not_contains'].includes(c.operator)) {
          andConditions.push({ tags: { $not: { $regex: regexValue } } });
        }
        continue;
      }

      // Brand as tag
      if (c.field.toLowerCase() === 'brand') {
        const regex = new RegExp(escapeRegExp(c.value), 'i');
        if (['=', 'contains'].includes(c.operator)) {
          andConditions.push({ tags: { $regex: regex } });
        } else if (['!=', 'not_contains'].includes(c.operator)) {
          andConditions.push({ tags: { $not: { $regex: regex } } });
        }
      }


      // Price handled separately
      if (c.field === 'price') {
        needsAggregation = true;
        continue;
      }

      const opMap: Record<string, string> = {
        '>': '$gt',
        '<': '$lt',
        '>=': '$gte',
        '<=': '$lte',
        '=': '$eq',
        '!=': '$ne',
      };

      const mongoOp = opMap[c.operator];
      if (mongoOp) {
        let condition;

        if (c.field === 'category') {
          
          condition = {
            [c.field]: { $regex: escapeRegExp(c.value), $options: 'i' }
          };
        }

        else if (mongoOp === '$eq') {
          condition = {
            [c.field]: c.value
          };
        } else {
          condition = {
            [c.field]: { [mongoOp]: c.value }
          };
        }

        andConditions.push(condition);
      }


    }
      console.log("beore and",andConditions)
    if (andConditions.length > 0) {
      match.$and = andConditions;
    }

    console.log('Final match object:', match);

    let products: any[] = [];

    if (needsAggregation) {
      // Aggregate pipeline for price filtering
      const pipeline: any[] = [
        {
          $match: {
            price: {
              $exists: true,
              $nin: [null, ''],
              $regex: '^[0-9]+(\\.[0-9]{0,2})?$',
            },
          },
        },
        {
          $addFields: {
            priceAsNumber: {
              $convert: {
                input: '$price',
                to: 'double',
                onError: 0,
                onNull: 0,
              },
            },
          },
        },
      ];

      // Build price match object
      const priceConditions: any = {};
      for (const c of parsed.filter((p) => p.field === 'price')) {
        const opMap: Record<string, any> = {
          '>': { $gt: c.value },
          '<': { $lt: c.value },
          '>=': { $gte: c.value },
          '<=': { $lte: c.value },
          '=': { $eq: c.value },
          '!=': { $ne: c.value },
        };
        priceConditions['priceAsNumber'] = {
          ...(priceConditions['priceAsNumber'] || {}),
          ...opMap[c.operator],
        };
      }

      const finalMatch = { ...match };
      if (Object.keys(priceConditions).length) {
        finalMatch.$and = finalMatch.$and || [];
        finalMatch.$and.push({ priceAsNumber: priceConditions.priceAsNumber });
      }

      pipeline.push({ $match: finalMatch });
      pipeline.push({ $project: { priceAsNumber: 0, __v: 0 } });

      products = await ProductModel.aggregate(pipeline).exec();
    } else {
      products = await ProductModel.find(match).select('-__v').lean().exec();
    }

    // Warn if invalid price formats are found
    const invalidPrices = products.filter(
      (p) => !/^[0-9]+(\.[0-9]{0,2})?$/.test(p.price)
    );
    if (invalidPrices.length) {
      console.warn('Invalid price values found:', invalidPrices);
    }

    return {
      products,
      parsedConditions: parsed,
    };
  } catch (error: any) {
    console.error('evaluateSegment error:', error);
    throw new Error(`Failed to evaluate segment: ${error.message}`);
  }
}
