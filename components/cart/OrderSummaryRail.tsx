"use client";

import ProductImage from "@/components/ui/ProductImage";
import { CartItem } from "@/lib/store/cart-store";
import { formatProductPrice } from "@/lib/product-display";
import CheckoutTrustIndicators from "@/components/checkout/CheckoutTrustIndicators";
import { cn } from "@/lib/utils";

interface OrderSummaryRailProps {
  items: CartItem[];
  className?: string;
  primaryActionLabel?: string;
  hidePrimaryActionOnMobile?: boolean;
  showLineItems?: boolean;
}

function getSubtotal(items: CartItem[]) {
  return items.reduce(
    (total, item) => total + item.selectedSize.price * item.quantity,
    0
  );
}

export default function OrderSummaryRail({
  items,
  className,
  primaryActionLabel = "Checkout",
  hidePrimaryActionOnMobile = false,
  showLineItems = false,
}: OrderSummaryRailProps) {
  const subtotal = getSubtotal(items);
  const isEmpty = items.length === 0;

  return (
    <aside
      className={cn(
        "bg-[var(--muted)] px-6 py-8 sm:px-8 sm:py-10 lg:sticky lg:top-24 lg:self-start lg:px-10 lg:py-12",
        className
      )}
      aria-label="Order summary"
    >
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold md:text-[1.65rem]">
        Order Summary
      </h2>

      {showLineItems && items.length > 0 && (
        <ul className="mt-8 space-y-6 border-b border-[var(--border)]/60 pb-8">
          {items.map((item) => {
            const lineTotal = item.selectedSize.price * item.quantity;

            return (
              <li
                key={`${item.product.id}-${item.selectedSize.label}`}
                className="flex gap-4"
              >
                <div className="shrink-0 bg-[var(--background)] p-2">
                  <ProductImage
                    src={item.product.image}
                    alt={item.product.name}
                    width={72}
                    height={90}
                    className="h-16 w-12 object-contain sm:h-[4.5rem] sm:w-14"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-[family-name:var(--font-heading)] text-base font-semibold leading-snug">
                    {item.product.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-500">
                    {item.selectedSize.label} · Qty {item.quantity}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-heading)] text-sm text-[var(--primary)]">
                    {formatProductPrice(lineTotal)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <dl className="mt-8 space-y-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <dt className="text-gray-600">Subtotal</dt>
          <dd className="font-medium text-[var(--foreground)]">
            {formatProductPrice(subtotal)}
          </dd>
        </div>

        <div className="text-sm leading-relaxed text-gray-600">
          <dt className="sr-only">Shipping</dt>
          <dd>
            Complimentary shipping on qualifying orders. Final shipping calculated
            at checkout.
          </dd>
        </div>

        <p className="text-sm leading-relaxed text-gray-600">
          Two complimentary samples are included with every Maison order.
        </p>

        <div className="flex items-center justify-between gap-4 border-t border-[var(--border)]/60 pt-5">
          <dt className="font-[family-name:var(--font-heading)] text-xl font-semibold">
            Total
          </dt>
          <dd className="font-[family-name:var(--font-heading)] text-2xl text-[var(--primary)]">
            {formatProductPrice(subtotal)}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        disabled={isEmpty}
        className={cn(
          "mt-8 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
          hidePrimaryActionOnMobile && "hidden lg:inline-flex"
        )}
      >
        {primaryActionLabel}
      </button>

      <CheckoutTrustIndicators className="mt-8 border-t border-[var(--border)]/60 pt-8" />
    </aside>
  );
}

export { getSubtotal };
