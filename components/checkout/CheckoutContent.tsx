"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import ShippingForm from "@/components/checkout/ShippingForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCartStore } from "@/lib/store/cart-store";
import { useHydrated } from "@/hooks/useHydrated";

function PaymentPlaceholder() {
  return (
    <section
      aria-labelledby="payment-heading"
      className="rounded-3xl border border-[var(--border)] bg-white p-6 md:p-8"
    >
      <h2
        id="payment-heading"
        className="text-xl font-semibold font-[family-name:var(--font-heading)]"
      >
        Payment
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Secure payment processing will be available soon.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm font-medium">Card Number</p>
          <div className="mt-2 h-12 rounded-xl bg-[var(--muted)]" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium">Expiry Date</p>
            <div className="mt-2 h-12 rounded-xl bg-[var(--muted)]" />
          </div>
          <div>
            <p className="text-sm font-medium">CVC</p>
            <div className="mt-2 h-12 rounded-xl bg-[var(--muted)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CheckoutContent() {
  const hydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  const displayItems = hydrated ? items : [];

  if (hydrated && displayItems.length === 0) {
    return (
      <section className="py-12 md:py-16">
        <Container>
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-[var(--border)] bg-white px-6 py-16 text-center sm:px-10">
            <h2 className="text-2xl font-semibold font-[family-name:var(--font-heading)]">
              Nothing to checkout
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
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
    <section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div className="space-y-8">
            <CheckoutForm />
            <ShippingForm />
            <PaymentPlaceholder />
          </div>

          <OrderSummary />
        </div>
      </Container>
    </section>
  );
}
