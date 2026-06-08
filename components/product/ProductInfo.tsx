"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Product, StockStatus } from "@/types/product";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import {
  formatProductPrice,
  getProductCategoryLine,
  getShortScentStory,
} from "@/lib/product-display";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/hooks/useHydrated";
import ProductTrustBadges from "@/components/product/ProductTrustBadges";

interface ProductInfoProps {
  product: Product;
}

const stockLabels: Record<StockStatus, string> = {
  in_stock: "In Stock",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const hydrated = useHydrated();
  const defaultSizeIndex = Math.min(1, product.sizes.length - 1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(defaultSizeIndex);
  const [quantity, setQuantity] = useState(1);
  const [giftPackaging, setGiftPackaging] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(product.id)
  );
  const showInWishlist = hydrated && isInWishlist;

  const selectedSize = product.sizes[selectedSizeIndex];
  const isOutOfStock = product.stockStatus === "out_of_stock";
  const filledStars = Math.round(product.rating);
  const shortStory = getShortScentStory(product.description);

  function handleAddToCart() {
    addItem(product, selectedSize.label, quantity);
  }

  function handleToggleWishlist() {
    toggleItem(product);
  }

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => Math.min(10, current + 1));
  }

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--primary)] sm:text-sm">
        {getProductCategoryLine(product.category)}
      </p>

      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
        {product.name}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-0.5" aria-hidden>
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "text-sm",
                index < filledStars
                  ? "text-[var(--primary)]"
                  : "text-gray-300"
              )}
            >
              ★
            </span>
          ))}
        </div>
        <span className="sr-only">{product.rating} out of 5 stars</span>
        <span className="text-sm text-gray-500">
          {product.rating} ({product.reviewCount.toLocaleString()} reviews)
        </span>
      </div>

      <p className="mt-5 font-[family-name:var(--font-heading)] text-2xl text-[var(--primary)] md:text-3xl">
        {formatProductPrice(selectedSize.price)}
      </p>

      <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-600">
        {shortStory}
      </p>

      <div className="mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
          Size
        </p>
        <div
          className="mt-3 flex flex-wrap gap-2"
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
                "rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                selectedSizeIndex === index
                  ? "bg-[var(--primary)] text-white"
                  : "border border-[var(--border)] bg-white text-gray-600 hover:border-[var(--primary)]"
              )}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
            Quantity
          </p>
          <div
            className="mt-3 inline-flex items-center gap-4 border border-[var(--border)] px-4 py-2"
            role="group"
            aria-label="Product quantity"
          >
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="text-gray-500 transition hover:text-[var(--foreground)] disabled:opacity-40"
            >
              <Minus size={16} aria-hidden />
            </button>
            <span className="min-w-[1.5rem] text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              type="button"
              onClick={increaseQuantity}
              disabled={quantity >= 10}
              aria-label="Increase quantity"
              className="text-gray-500 transition hover:text-[var(--foreground)] disabled:opacity-40"
            >
              <Plus size={16} aria-hidden />
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={giftPackaging}
            onChange={(event) => setGiftPackaging(event.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)] accent-[var(--primary)]"
          />
          Luxury Gift Packaging +$10
        </label>
      </div>

      <div className="mt-8">
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag size={18} aria-hidden />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>

        <button
          type="button"
          onClick={handleToggleWishlist}
          className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-[var(--primary)]"
        >
          <Heart
            size={16}
            className={cn(showInWishlist && "fill-red-500 text-red-500")}
            aria-hidden
          />
          {showInWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
        </button>

        {!isOutOfStock && product.stockStatus === "low_stock" && (
          <p className="mt-3 text-xs text-amber-700">
            {stockLabels.low_stock} — order soon
          </p>
        )}

        <ProductTrustBadges />
      </div>
    </div>
  );
}
