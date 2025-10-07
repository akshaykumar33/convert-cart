"use client"

import { useEffect, useState } from "react";
import { ProductCard } from "@/app/components/ProductCard ";
import { PRODUCTS_API_URL } from "@/app/config/config";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(PRODUCTS_API_URL+`/api/products?page=${pageNum}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.pagination.pages);
      setPage(data.pagination.page);
    } catch (err:any) {
      setError(err?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl text-center font-bold mb-6">Products</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn btn-primary disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="btn btn-primary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
