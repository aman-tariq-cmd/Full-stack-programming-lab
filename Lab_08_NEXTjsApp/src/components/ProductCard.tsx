import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, title, description, price, image, category, rating } = product;

  return (
    <Link
      href={`/products/${id}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone hover:border-amber/50 hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-50">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-cream/90 backdrop-blur-sm text-ink-700 text-xs font-medium rounded-full">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-display font-bold text-ink-900 text-lg leading-snug group-hover:text-amber transition-colors duration-200">
          {title}
        </h3>

        <p className="text-ink-500 text-sm leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-stone/60">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star
              size={14}
              className="fill-amber text-amber"
            />
            <span className="text-sm font-medium text-ink-700">
              {rating.rate.toFixed(1)}
            </span>
            <span className="text-xs text-ink-400">({rating.count})</span>
          </div>

          {/* Price */}
          <span className="font-display font-bold text-ink-900 text-lg">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
