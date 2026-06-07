"use client";

import Button from "@/components/ui/Button";
import { CartItem } from "@/lib/store/cart-store";

interface CartSummaryProps {
  items: CartItem[];
}

function getSubtotal(items: CartItem[]) {
  return items.reduce(
    (total, item) => total + item.selectedSize.price * item.quantity,
    0
  );
}

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = getSubtotal(items);
  const estimatedTotal = subtotal;

  return (
    <aside className="h-fit rounded-3xl border border-[var(--border)] bg-white p-6 lg:sticky lg:top-8">
      <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)]">
        Cart Summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <dt className="text-gray-500">Subtotal</dt>
          <dd className="font-medium">${subtotal}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
          <dt className="text-lg font-semibold font-[family-name:var(--font-heading)]">
            Estimated Total
          </dt>
          <dd className="text-lg font-semibold">${estimatedTotal}</dd>
        </div>
      </dl>

      <Button className="mt-6 w-full" disabled={items.length === 0}>
        Checkout
      </Button>
    </aside>
  );
}
