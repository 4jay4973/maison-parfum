"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { CartItem, useCartStore } from "@/lib/store/cart-store";
import { useHydrated } from "@/hooks/useHydrated";

function getSubtotal(items: CartItem[]) {
  return items.reduce(
    (total, item) => total + item.selectedSize.price * item.quantity,
    0
  );
}

export default function OrderSummary() {
  const hydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  const displayItems = hydrated ? items : [];
  const subtotal = getSubtotal(displayItems);
  const estimatedTotal = subtotal;

  return (
    <aside className="h-fit rounded-3xl border border-[var(--border)] bg-white p-6 lg:sticky lg:top-8">
      <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)]">
        Order Summary
      </h2>

      {displayItems.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">
          Your cart is empty.{" "}
          <Link href="/collections" className="underline hover:text-gray-800">
            Continue shopping
          </Link>
        </p>
      ) : (
        <ul className="mt-6 space-y-6">
          {displayItems.map((item) => {
            const lineTotal = item.selectedSize.price * item.quantity;

            return (
              <li
                key={`${item.product.id}-${item.selectedSize.label}`}
                className="flex gap-4 border-b border-[var(--border)] pb-6 last:border-b-0 last:pb-0"
              >
                <div className="shrink-0 overflow-hidden rounded-xl border border-[var(--border)]">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={80}
                    height={96}
                    className="h-20 w-16 object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {item.product.brand}
                    </p>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.selectedSize.label}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Qty {item.quantity}</span>
                    <span className="font-semibold">${lineTotal}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <dl className="mt-6 space-y-4 border-t border-[var(--border)] pt-6">
        <div className="flex items-center justify-between text-sm">
          <dt className="text-gray-500">Subtotal</dt>
          <dd className="font-medium">${subtotal}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-lg font-semibold font-[family-name:var(--font-heading)]">
            Estimated Total
          </dt>
          <dd className="text-lg font-semibold">${estimatedTotal}</dd>
        </div>
      </dl>

      <Button className="mt-6 w-full" disabled={displayItems.length === 0}>
        Place Order
      </Button>
    </aside>
  );
}
