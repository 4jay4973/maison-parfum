"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentSection from "@/components/checkout/PaymentSection";
import CheckoutProgress from "@/components/checkout/CheckoutProgress";
import OrderSummaryRail, {
  getSubtotal,
} from "@/components/cart/OrderSummaryRail";
import { formatProductPrice } from "@/lib/product-display";
import { useCartStore } from "@/lib/store/cart-store";
import { useHydrated } from "@/hooks/useHydrated";

export default function CheckoutContent() {
  const hydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  const displayItems = hydrated ? items : [];
  const subtotal = getSubtotal(displayItems);
  const isEmpty = displayItems.length === 0;

  if (hydrated && isEmpty) {
    return (
      <section className="bg-[var(--background)] py-12 md:py-16">
        <Container>
          <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:px-6">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold md:text-3xl">
              Nothing to checkout
            </h2>
            <p className="mt-3 max-w-sm leading-relaxed text-gray-600">
              Add fragrances to your cart before proceeding to checkout.
            </p>
            <Link href="/cart" className="mt-8">
              <Button>View Cart</Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="bg-[var(--background)] pb-24 pt-10 md:pb-16 md:pt-12 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
            <div>
              <CheckoutProgress className="mb-10 md:mb-12" />

              <div className="divide-y divide-[var(--border)]/70">
                <CheckoutForm className="pb-10 md:pb-12" />
                <ShippingForm className="py-10 md:py-12" />
                <PaymentSection className="pt-10 md:pt-12" />
              </div>
            </div>

            <OrderSummaryRail
              items={displayItems}
              primaryActionLabel="Place Order"
              hidePrimaryActionOnMobile
              showLineItems
            />
          </div>
        </Container>
      </section>

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--background)]/95 px-4 py-4 backdrop-blur-sm lg:hidden"
        aria-hidden={isEmpty}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
              Total
            </p>
            <p className="font-[family-name:var(--font-heading)] text-xl text-[var(--primary)]">
              {formatProductPrice(subtotal)}
            </p>
          </div>

          <button
            type="button"
            disabled={isEmpty}
            className="inline-flex min-w-[10rem] flex-1 items-center justify-center rounded-xl bg-black px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-xs sm:flex-none"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
