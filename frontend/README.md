***

# Product & Segment Frontend

## Overview
This repository implements the user interface for managing products and evaluating product segments. It is primarily built with **Next.js**, **React**, and **TypeScript**, and follows a clean modular approach to connect frontend users to backend microservices.

***

## Purpose

- Provide an interactive frontend for product catalog browsing and segment evaluation.
- Offer a filterable, paginated view of products.
- Enable dynamic creation and analysis of custom segments using flexible conditions.
- Showcase backend data and operations visually, suitable for ecommerce dashboards or business analysis.

***

## Key Features

- **Segment Evaluation:** Users can input flexible conditions to run segment queries and view results with formatted output.
- **Product Catalog:** Fast product listing with search, filtering, sorting, and pagination.
- **Reusable UI Components:** Includes skeleton loaders, modals, cards, filter forms, pretty JSON viewers, and more.
- **Type Safety:** Strong TypeScript typing with shared interfaces across modules.
- **Configurable API Integration:** Easily switch backend endpoints or environments.
- **Modern Design:** Responsive layout and easily skinnable using global styles.
- **Required Libraries** React Synthetic and Awesome icons with shadcn and tailwind css.
***

## Project Structure

```
src/
│
├── app/                     # Next.js routing and pages
│   ├── components/
│   │   ├── FilterConditions.tsx    # Segment filter UI
│   │   ├── ProductCard.tsx         # Product display card
│   │   ├── PrettyJsonViewer.tsx    # JSON viewer for responses
│   │   ├── Skeleton.tsx            # Skeleton placeholders
|   |__ ui/
│   │   ├── button.tsx              # Common button styles
│   │   ├── card.tsx                # Generic card UI
│   │   ├── textarea.tsx            # Resizable textarea
│   ├── Products.tsx          # Product listing page
│   ├── Segments.tsx          # Segment evaluation page
│   ├── page.tsx              # Home/entry page
│   ├── layout.tsx            # Layout container
│   ├── config.ts             # API endpoints/config
│   ├── globals.css           # Global styles
│
├── types.d.ts                # Shared type definitions (Product, Segment, etc.)
│
└── ...
```

***

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Installation

```bash
git clone <repo-url>
cd <frontend-folder>
npm install
```

### Environment Configuration

Set API URLs and other configs in `src/app/config.ts`:

```typescript
export const SEGMENTS_API_URL = "http://localhost:8002";
export const PRODUCTS_API_URL = "http://localhost:8001";
```

Adapt the ports/endpoints to your running backend microservices.

### Running Locally

```bash
npm run dev
```
Open `http://localhost:7000` to view the application in development mode.

***

## Scripts

- `dev`: Start development Next.js server
- `build`: Create production build
- `start`: Launch production server
- `lint`: Run ESLint
- `test`: Run Jest unit/integration tests (if implemented)

***

## Docker Setup

Build and run the frontend as a container:

```bash
docker build -t frontend-app .
docker run -d -p 7000:7000 --name frontend-app frontend-app
```

If your backend runs on other ports/containers, use Docker Compose or set network aliases as needed.

***

## Customization & Development

- **Pages:** Edit `Products.tsx` or `Segments.tsx` for custom data views.
- **UI Components:** Extend or reuse the generic components in `app/components/`.
- **Types:** Update types or interfaces in `types.d.ts` for new API fields.
- **Global Styles:** Adjust styling via `globals.css`, using Tailwind, CSS Modules, or other approaches (adapt if your project differs).

***

## Testing

For component or integration tests (if implemented):

```bash
npm run test
```

***

