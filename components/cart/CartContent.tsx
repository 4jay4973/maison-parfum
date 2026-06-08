"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import CartLineItem from "@/components/cart/CartLineItem";
import OrderSummaryRail from "@/components/cart/OrderSummaryRail";
import { useCartStore } from "@/lib/store/cart-store";
import { useHydrated } from "@/hooks/useHydrated";

export default function CartContent() {
  const hydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const displayItems = hydrated ? items : [];

  if (displayItems.length === 0) {
    return (
      <section className="bg-[var(--background)] py-12 md:py-16">
        <Container>
          <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:px-6">
            <ShoppingBag
              size={40}
              className="text-[var(--primary)]"
              aria-hidden
            />
            <h2 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-semibold md:text-3xl">
              Your cart is empty
            </h2>
            <p className="mt-3 max-w-sm leading-relaxed text-gray-600">
              Discover our curated fragrances and add your favorites to begin
              your order.
            </p>
            <Link href="/collections" className="mt-8">
              <Button>Explore Collections</Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-[var(--background)] py-10 md:py-12 lg:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <div>
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-gray-500 md:mb-10">
              {displayItems.length}{" "}
              {displayItems.length === 1 ? "fragrance" : "fragrances"}
            </p>

            <div>
              {displayItems.map((item) => (
                <CartLineItem
                  key={`${item.product.id}-${item.selectedSize.label}`}
                  item={item}
                  onUpdateQuantity={(quantity) =>
                    updateQuantity(
                      item.product.id,
                      item.selectedSize.label,
                      quantity
                    )
                  }
                  onRemove={() =>
                    removeItem(item.product.id, item.selectedSize.label)
                  }
                />
              ))}
            </div>
          </div>

          <OrderSummaryRail items={displayItems} />
        </div>
      </Container>
    </section>
  );
}
