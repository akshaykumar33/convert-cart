***

# Product & Segment Platform

An extensible, production-grade platform for managing products and running advanced, rule-based product segmentations. Built with a microservices-first architecture and a modern React-based frontend.

***

## 🔗 Repository & Demo Links

- **Mono-Repo GitHub:** [github.com/akshaykumar33/convert-cart](https://github.com/akshaykumar33/convert-cart)
- **Products Microservice**
    - GitHub: [github.com/akshaykumar33/convert-cart/products](https://github.com/akshaykumar33/convert-cart/tree/main/backend/products)
    - Live: [https://convert-cart.onrender.com](https://convert-cart.onrender.com)
- **Segments Microservice**
    - GitHub: [github.com/akshaykumar33/convert-cart/segments](https://github.com/akshaykumar33/convert-cart/tree/main/backend/segments)
    - Live: [https://convert-cart-segments.onrender.com](https://convert-cart-segments.onrender.com)
- **Frontend**
    - GitHub: [github.com/akshaykumar33/convert-cart/frontend](https://github.com/akshaykumar33/convert-cart/tree/main/frontend)
    - Live: [https://convert-cart-five.vercel.app](https://convert-cart-five.vercel.app/)
- **Video Demo:** [Video Walkthrough](https://app.usebubbles.com/jvQKDsBjXBcos4WaxG7Tkd/convert-cart)

***

## 🚀 Overview

This platform lets you:
- Ingest and manage large-scale product catalogs.
- Automatically sync from major e-commerce sources (e.g., WooCommerce).
- Define and evaluate advanced product segments through a flexible, rule-based API.
- Browse and analyze products/segments in a modern, interactive frontend.

***

## 🏗️ Project Structure

```plaintext
convert-cart/
├── backend/
│   ├── products/
│   │   └── src/
│   │       ├── apis/
│   │       │   ├── middlewares/
│   │       │   ├── models/
│   │       │   │   └── Product.ts
│   │       │   ├── routes/
│   │       │   │   ├── health.ts
│   │       │   │   └── products.route.ts
│   │       │   ├── services/
│   │       │   │   ├── product.service.ts
│   │       │   │   └── wooCommerce.service.ts
│   │       │   └── validators/
│   │       │       └── product.validators.ts
│   │       ├── docs/
│   │       │   └── swagger.ts
│   │       ├── types/
│   │       │   └── types.d.ts
│   │       ├── utils/
│   │       │   ├── config.ts
│   │       │   ├── sync.ts
│   │       │   ├── app.ts
│   │       │   └── index.ts
│   │       └── tests/
│   │
│   ├── segments/
│   │   └── src/
│   │       ├── apis/
│   │       │   ├── middlewares/
│   │       │   │   ├── error.ts
│   │       │   │   └── logger.ts
│   │       │   ├── models/
│   │       │   │   └── Product.ts
│   │       │   ├── routes/
│   │       │   │   ├── health.ts
│   │       │   │   └── segments.route.ts
│   │       │   ├── services/
│   │       │   │   └── segment.service.ts
│   │       ├── docs/
│   │       │   └── swagger.ts
│   │       ├── utils/
│   │       │   ├── config.ts
│   │       │   ├── app.ts
│   │       │   └── index.ts
│   │       └── tests/
│   │
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── FilterConditions.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── PrettyJsonViewer.tsx
│   │   │   │   ├── Skeleton.tsx
│   │   │   │   └── ...etc
│   │   │   ├── Products.tsx
│   │   │   ├── Segments.tsx
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── config.ts
│   │   │   └── globals.css
│   │   ├── types.d.ts
│   │   └── favicon.jpg
│   └── tests/
│
└── README.md  # This file
```

***

## ⚙️ Key Technologies

- **Backend:** Node.js, Express, TypeScript, MongoDB, Swagger, Jest, Docker
- **Frontend:** React, Next.js (App Router), TypeScript, Tailwind CSS (or CSS Modules), Vercel & Render

***

## 📑 How it Works

- **Products Service**: Ingests, manages, and serves product catalog via a REST API. Supports syncing with WooCommerce. JSON schemas and validation included.
- **Segments Service**: Accepts user-defined conditions (e.g., "price > 1000"), evaluates them using flexible logic, and returns dynamic segment results and aggregations.
- **Frontend**: Users browse products, define segments, and visualize results in a modern, SPA-style interface. All API integration and state handled in React.

***

## 🚩 Quickstart (Development)

1. **Clone the monorepo**
   ```bash
   git clone https://github.com/akshaykumar33/convert-cart
   ```

2. **Backend Setup**  
   - For each microservice (`products`, `segments`):
     ```bash
     cd backend/products
     cp file.env.example .env
     npm install
     npm run dev
     ```
     - Update MongoDB URI and required ENV vars in `.env`.
     - API docs: `http://localhost:8001/api-docs` (products) and `http://localhost:8002/api-docs` (segments)

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   - Update backend API URLs in `src/app/config.ts` as needed.

4. **[Optional] Docker Compose**
   - See `docker-compose.yml` (if provided) to run everything, including MongoDB, with one command.
   - use command `docker-compose up --build -d`

***

## 📝 API Reference

- **Products API Swagger:** `/api-docs` on products service
- **Segments API Swagger:** `/api-docs` on segments service

***

## 📺 Video Walkthrough

- [Watch the demo here](https://app.usebubbles.com/jvQKDsBjXBcos4WaxG7Tkd/convert-cart)

***

