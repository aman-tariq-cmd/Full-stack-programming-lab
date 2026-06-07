import Link from "next/link";
import { products } from "./data";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-sm font-medium text-indigo-600 uppercase tracking-widest mb-2">
            Our Collection
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Products</h1>
          <p className="text-gray-500 text-lg max-w-xl">
            Thoughtfully designed objects for work and home. {products.length}{" "}
            items available.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 text-gray-600 text-xs font-medium rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <h2 className="font-semibold text-gray-900 text-lg leading-snug group-hover:text-indigo-600 transition-colors duration-200">
                  {product.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-indigo-600 group-hover:underline">
                    View details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
