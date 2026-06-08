"use client";

import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/lib/store/cart-store";
import { formatProductPrice } from "@/lib/product-display";
import { FragranceNotes } from "@/types/product";

interface CartLineItemProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

function formatScentLine(notes: FragranceNotes): string {
  const accent = notes.top[0];
  const depth = notes.base[0] ?? notes.middle[0];

  if (accent && depth) {
    return `${accent} & ${depth}`;
  }

  return [...notes.top, ...notes.middle].slice(0, 2).join(" & ");
}

export default function CartLineItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartLineItemProps) {
  const { product, selectedSize, quantity } = item;
  const lineTotal = selectedSize.price * quantity;
  const scentLine = formatScentLine(product.notes);

  return (
    <article className="flex flex-col gap-6 border-b border-[var(--border)]/70 py-10 last:border-b-0 sm:flex-row sm:items-start sm:gap-8 md:gap-10 md:py-12">
      <Link
        href={`/product/${product.slug}`}
        className="mx-auto shrink-0 sm:mx-0"
      >
        <div className="bg-[var(--muted)] px-5 py-6 sm:px-6 sm:py-8">
          <div className="aspect-[4/5] w-[min(100%,11rem)] bg-[var(--muted)] p-4 sm:w-44 md:w-48">
            <ProductImage
              src={product.image}
              alt={product.name}
              width={400}
              height={500}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-6 sm:pt-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gray-500">
              {selectedSize.label}
            </p>
            <Link
              href={`/product/${product.slug}`}
              className="mt-2 block font-[family-name:var(--font-heading)] text-2xl font-semibold leading-snug transition-opacity hover:opacity-80 md:text-[1.65rem]"
            >
              {product.name}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              {scentLine}
            </p>
            <p className="mt-4 font-[family-name:var(--font-heading)] text-xl text-[var(--primary)]">
              {formatProductPrice(selectedSize.price)}
            </p>
          </div>

          <p className="font-[family-name:var(--font-heading)] text-xl text-[var(--primary)] sm:text-right md:text-2xl">
            {formatProductPrice(lineTotal)}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
              Quantity
            </p>
            <div
              className="mt-3 inline-flex items-center gap-4 border border-[var(--border)] px-4 py-2"
              role="group"
              aria-label={`Quantity for ${product.name}`}
            >
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => onUpdateQuantity(quantity - 1)}
                className="text-gray-500 transition hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                <Minus size={16} aria-hidden />
              </button>
              <span className="min-w-[1.5rem] text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => onUpdateQuantity(quantity + 1)}
                className="text-gray-500 transition hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                <Plus size={16} aria-hidden />
              </button>
            </div>
          </div>

          <button
            type="button"
            aria-label={`Remove ${product.name} from cart`}
            onClick={onRemove}
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            <Trash2 size={16} aria-hidden />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </article>
  );
}
