import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-white">
      <div className="overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={600}
          className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500">
          {product.brand}
        </p>

        <h3 className="mt-1 text-lg font-medium">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm">
          <span>⭐ {product.rating}</span>
          <span className="text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        <p className="mt-4 text-xl font-semibold">
          ${product.price}
        </p>
      </div>
    </article>
  );
}