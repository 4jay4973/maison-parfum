"use client";

import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product, FragranceNotes } from "@/types/product";
import { getBreadcrumbCategoryLabel } from "@/lib/product-display";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

function formatScentLine(notes: FragranceNotes): string {
  const accent = notes.top[0];
  const depth = notes.base[0] ?? notes.middle[0];

  if (accent && depth) {
    return `${accent} & ${depth}`;
  }

  return [...notes.top, ...notes.middle].slice(0, 2).join(" & ");
}

function formatPrice(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hydrated = useHydrated();
  const addItem = useCartStore((state) => state.addItem);
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(product.id)
  );

  const inWishlist = hydrated && isInWishlist;
  const defaultSize = product.sizes[product.sizes.length - 1];
  const isOutOfStock = product.stockStatus === "out_of_stock";
  const scentLine = formatScentLine(product.notes);
  const filledStars = Math.round(product.rating);

  function handleWishlistClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    toggleItem(product);
  }

  function handleAddToCart(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (!defaultSize || isOutOfStock) {
      return;
    }
    addItem(product, defaultSize.label);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative bg-[var(--muted)]">
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={inWishlist}
          className="absolute top-4 right-4 z-10 rounded-full p-1.5 text-gray-500 transition-colors hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        >
          <Heart
            size={18}
            className={cn(inWishlist && "fill-red-500 text-red-500")}
            aria-hidden
          />
        </button>

        <Link
          href={`/product/${product.slug}`}
          className="mx-auto block max-w-[210px] transition-transform duration-300 group-hover:scale-[1.02]"
        >
          <div className="aspect-[1/1] bg-[var(--muted)]">
            <ProductImage
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link
          href={`/product/${product.slug}`}
          className="transition-opacity hover:opacity-80"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--primary)]">
            {getBreadcrumbCategoryLabel(product.category)}
          </p>

          <h3 className="mt-1 font-[family-name:var(--font-heading)] text-lg font-semibold leading-snug sm:text-xl">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
          {scentLine}
        </p>

        <div className="mt-3 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                className={cn(
                  index < filledStars
                    ? "fill-[var(--primary)] text-[var(--primary)]"
                    : "fill-transparent text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="sr-only">{product.rating} out of 5 stars</span>
          <span className="text-xs text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-4">
          <p className="font-[family-name:var(--font-heading)] text-xl text-[var(--primary)]">
            {formatPrice(product.price)}
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag size={16} className="shrink-0" aria-hidden />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
}
