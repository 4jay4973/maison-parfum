"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/lib/store/cart-store";

interface CartLineItemProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartLineItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartLineItemProps) {
  const { product, selectedSize, quantity } = item;
  const lineTotal = selectedSize.price * quantity;

  return (
    <article className="flex flex-col gap-6 border-b border-[var(--border)] py-8 sm:flex-row sm:items-center">
      <Link
        href={`/product/${product.slug}`}
        className="shrink-0 overflow-hidden rounded-3xl border border-[var(--border)] bg-white"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={240}
          className="h-40 w-32 object-cover sm:h-44 sm:w-36"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <Link
            href={`/product/${product.slug}`}
            className="mt-1 block text-lg font-medium transition hover:opacity-80"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-gray-500">{selectedSize.label}</p>
          <p className="mt-3 text-lg font-semibold">${selectedSize.price}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div
            className="flex items-center rounded-xl border border-[var(--border)]"
            role="group"
            aria-label={`Quantity for ${product.name}`}
          >
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => onUpdateQuantity(quantity - 1)}
              className="px-3 py-2 transition hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <Minus size={16} aria-hidden />
            </button>
            <span className="min-w-8 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => onUpdateQuantity(quantity + 1)}
              className="px-3 py-2 transition hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <Plus size={16} aria-hidden />
            </button>
          </div>

          <p className="min-w-20 text-right text-lg font-semibold">
            ${lineTotal}
          </p>

          <button
            type="button"
            aria-label={`Remove ${product.name} from cart`}
            onClick={onRemove}
            className="text-gray-500 transition hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            <Trash2 size={18} aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}
