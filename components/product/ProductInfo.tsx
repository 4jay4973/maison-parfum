"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import { Product, StockStatus } from "@/types/product";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/hooks/useHydrated";

interface ProductInfoProps {
  product: Product;
}

const stockLabels: Record<StockStatus, string> = {
  in_stock: "In Stock",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
};

const stockStyles: Record<StockStatus, string> = {
  in_stock: "text-emerald-700",
  low_stock: "text-amber-700",
  out_of_stock: "text-gray-500",
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const hydrated = useHydrated();
  const defaultSizeIndex = product.sizes.length - 1;
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(defaultSizeIndex);

  const addItem = useCartStore((state) => state.addItem);
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(product.id)
  );
  const showInWishlist = hydrated && isInWishlist;

  const selectedSize = product.sizes[selectedSizeIndex];
  const isOutOfStock = product.stockStatus === "out_of_stock";

  function handleAddToCart() {
    addItem(product, selectedSize.label);
  }

  function handleToggleWishlist() {
    toggleItem(product);
  }

  return (
    <div>
      <p className="text-sm uppercase tracking-widest text-gray-500">
        {product.brand}
      </p>

      <h1 className="mt-2 text-3xl font-semibold md:text-5xl font-[family-name:var(--font-heading)]">
        {product.name}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span aria-label={`Rated ${product.rating} out of 5`}>
          ★ {product.rating}
        </span>
        <span className="text-gray-500">({product.reviewCount} reviews)</span>
        <span
          className={cn(
            "font-medium capitalize",
            stockStyles[product.stockStatus]
          )}
        >
          {stockLabels[product.stockStatus]}
        </span>
      </div>

      <div className="mt-8 border-t border-[var(--border)] pt-8">
        <p className="text-sm uppercase tracking-widest text-gray-500">Price</p>
        <p className="mt-2 text-3xl font-semibold font-[family-name:var(--font-heading)]">
          ${selectedSize.price}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {selectedSize.label} · {product.category} collection
        </p>
      </div>

      <div className="mt-8">
        <p className="text-sm font-medium">Select Size</p>
        <div
          className="mt-3 flex flex-wrap gap-3"
          role="group"
          aria-label="Select product size"
        >
          {product.sizes.map((size, index) => (
            <button
              key={size.label}
              type="button"
              aria-pressed={selectedSizeIndex === index}
              onClick={() => setSelectedSizeIndex(index)}
              className={cn(
                "rounded-xl border px-4 py-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                selectedSizeIndex === index
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border)] bg-white text-gray-600 hover:border-[var(--primary)]"
              )}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button
          className="w-full sm:flex-1"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button
          variant="secondary"
          className="w-full gap-2 sm:w-auto"
          onClick={handleToggleWishlist}
        >
          <Heart
            size={18}
            className={showInWishlist ? "fill-current" : undefined}
            aria-hidden
          />
          {showInWishlist ? "In Wishlist" : "Wishlist"}
        </Button>
      </div>
    </div>
  );
}
