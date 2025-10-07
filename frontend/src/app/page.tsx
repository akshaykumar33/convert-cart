"use client"
import  { Suspense, useState } from "react";
import Products from "@/app/components/pages/Products";
import Segments from "@/app/components/pages/Segments"

export default function Home() {
  const [tab, setTab] = useState<"products" | "segments">("products");

  return (
    <div className="py-3 max-w-5xl mx-auto">
      <nav className="flex space-x-4 border-b pb-4 mb-2">
        <button
          className={`pb-2 text-lg font-semibold ${
            tab === "products" ? "border-b-4 border-blue-600" : ""
          }`}
          onClick={() => setTab("products")}
        >
          Products
        </button>
        <button
          className={`pb-2 text-lg font-semibold ${
            tab === "segments" ? "border-b-4 border-blue-600" : ""
          }`}
          onClick={() => setTab("segments")}
        >
          Segments
        </button>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        {tab === "products" && <Products />}
        {tab === "segments" && <Segments />}
      </Suspense>
    </div>
  );
}
