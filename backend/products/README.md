### Purpose
Manage product data, provide product lookup, filtering, and CRUD operations, and integrate external e-commerce data sources such as WooCommerce.

### Features
- Product listing, filtering, pagination
- Robust validation and error handling
- Integration with WooCommerce for data synchronization
- API documented via Swagger/OpenAPI
- Logging and monitoring support

### Project Structure
```plaintext
 products/
    └── src/
        ├── apis/
        │   ├── middlewares/
        │   ├── models/
        │   │   └── Product.ts
        │   ├── routes/
        │   │   ├── health.ts
        │   │   └── products.route.ts
        │   ├── services/
        │   │   ├── product.service.ts
        │   │   └── wooCommerce.service.ts
        │   └── validators/
        │       └── product.validators.ts
        ├── docs/
        │   └── swagger.ts
        ├── types/
        │   └── types.d.ts
        ├── utils/
        │   ├── config.ts
        │   ├── sync.ts
        │   ├── app.ts
        │   └── index.ts
        └── tests/
        ├── .dockerignore
        ├── .env
        ├── .env.example
        ├── .gitignore
        ├── .dockerignore
        ├──  Dockerfile
```

### Getting Started - Local Development

1. Clone the repo and install dependencies:
```bash
git clone <repo-url>
cd products-service
npm install
```

2. Create `.env` file from example and fill required variables:
```bash
cp file.env.example .env
# Update according to your environment variables like MONGO_URI
```

3. Run development server:
```bash
npm run dev
```

4. Visit `http://localhost:8001/api-docs` to view Swagger UI.

### Docker Setup

- Build image:
```bash
docker build -t products-service .
```

- Run container:
```bash
docker run -d -p 8001:8001 --name products products-service
```

***