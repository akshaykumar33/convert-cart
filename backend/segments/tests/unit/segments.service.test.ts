import * as segmentService from '../../src/apis/services/segment.service';
import { describe,expect,it } from '@jest/globals';

describe('Segment Service Unit Tests', () => {
  describe('validateAndParseConditions', () => {
    it('should parse valid conditions correctly', () => {
      const conditions = ['price > 1000', 'stock_status contains instock'];
      const parsed = segmentService.validateAndParseConditions(conditions);
      expect(parsed).toBeInstanceOf(Array);
      expect(parsed.length).toBe(2);
      const fields = parsed.map((c) => c.field);
      expect(fields).toContain('price');
      expect(fields).toContain('stock_status');
    });

    it('should throw on empty condition string', () => {
      expect(() => segmentService.validateAndParseConditions([''])).toThrow('Condition cannot be empty');
    });

    it('should not throw on unsupported fields but warn', () => {
      expect(() => segmentService.validateAndParseConditions(['unsupportedfield = something'])).not.toThrow();
    });
  });

  
});
