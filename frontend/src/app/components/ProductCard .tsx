"use client"

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-lg transition-shadow flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
        <p className="text-sm text-gray-700 mb-2">${product.price}</p>
        <div className="flex items-center space-x-2 mb-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              product.stock_status === "instock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {product.stock_status === "instock" ? "In Stock" : "Out of Stock"}
            {product.stock_quantity ? ` (${product.stock_quantity})` : ""}
          </span>
          {product.on_sale && (
            <span className="text-xs font-semibold bg-orange-100 text-orange-800 px-2 py-1 rounded">
              On Sale
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 font-medium">{product.category}</p>
        {product.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 rounded-full px-2 py-1 text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-4">
        Added {new Date(product.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}
