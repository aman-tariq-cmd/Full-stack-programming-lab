import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, products } from "../data";

interface ProductPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const id = Number(params.id);

  if (isNaN(id)) notFound();

  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="group-hover:-translate-x-0.5 transition-transform duration-150"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>
      </div>

      {/* Product detail */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 text-gray-600 text-xs font-medium rounded-full">
                {product.category}
              </span>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center p-8 lg:p-12 gap-6">
              <div>
                <p className="text-sm font-medium text-indigo-600 uppercase tracking-widest mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.title}
                </h1>
                <p className="text-gray-500 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-400 text-sm">USD</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200">
                  Add to Cart
                </button>
                <Link
                  href="/products"
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gray-400 hover:text-gray-900 transition-colors duration-200 text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
