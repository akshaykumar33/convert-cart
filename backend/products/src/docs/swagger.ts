import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 12345 },
            title: { type: 'string', example: 'Wireless Headphones' },
            price: { type: 'string', example: '199.99' },
            stock_status: { type: 'string', enum: ['instock', 'outofstock', 'onbackorder'], example: 'instock' },
            stock_quantity: { type: 'integer', nullable: true, example: 10 },
            category: { type: 'string', example: 'Electronics' },
            tags: {
              type: 'array',
              items: { type: 'string' },
              example: ['audio', 'wireless']
            },
            on_sale: { type: 'boolean', example: true },
            created_at: { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00Z' }
          },
          required: ['id', 'title', 'price', 'stock_status', 'category', 'on_sale', 'created_at']
        }
      }
    }
  },
  apis: ['src/apis/routes/*.ts'], 
});
