"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import CartLineItem from "@/components/cart/CartLineItem";
import CartSummary from "@/components/cart/CartSummary";
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
      <section className="py-12 md:py-16">
        <Container>
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-[var(--border)] bg-white px-6 py-16 text-center sm:px-10">
            <ShoppingBag
              size={40}
              className="text-[var(--primary)]"
              aria-hidden
            />
            <h2 className="mt-6 text-2xl font-semibold font-[family-name:var(--font-heading)]">
              Your cart is empty
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
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
    <section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="mb-2 text-sm text-gray-500">
              {displayItems.length}{" "}
              {displayItems.length === 1 ? "item" : "items"}
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

          <CartSummary items={displayItems} />
        </div>
      </Container>
    </section>
  );
}
