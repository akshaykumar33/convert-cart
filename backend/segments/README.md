
### Purpose
Evaluate product segments dynamically based on user-defined filter conditions. Evaluate and return products matching segment rules.

### Features
- Evaluate complex segment conditions with various operators
- Segment validation and evaluation APIs
- OpenAPI documentation
- Failure handling and logs
- Docker-ready for container deployment

### Project Structure
```plaintext
segments/
└── src/
    ├── apis/
    │   ├── middlewares/
    │   │   ├── error.ts
    │   │   └── logger.ts
    │   ├── models/
    │   │   └── Product.ts
    │   ├── routes/
    │   │   ├── health.ts
    │   │   └── segments.route.ts
    │   ├── services/
    │   │   └── segment.service.ts
    ├── docs/
    │   └── swagger.ts
    ├── utils/
    │   ├── config.ts
    │   ├── app.ts
    │   └── index.ts
    ├── tests/
    ├── .dockerignore
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├──  Dockerfile
```

### Getting Started - Local Development

1. Clone the repo and install dependencies:
```bash
git clone <https://github.com/akshaykumar33/convert-cart>
cd segments
npm install
```

2. Set up environment variables:
```bash
cp file.env.example .env
# Provide MONGO_URI and others
```

3. Run development server:
```bash
npm run dev
```

4. Access API docs at `http://localhost:8002/api-docs`.

### Docker Setup

- Build image:
```bash
docker build -t segments-service .
```

- Run container:
```bash
docker run -d -p 8002:8002 --name segments segments-service
```

***

### Running Tests
Each microservice has Jest configured.
```bash
npm test
```
or to watch changes:
```bash
npm run test:watch
```
