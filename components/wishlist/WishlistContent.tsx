"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useHydrated } from "@/hooks/useHydrated";

export default function WishlistContent() {
  const hydrated = useHydrated();
  const items = useWishlistStore((state) => state.items);
  const displayItems = hydrated ? items : [];

  if (displayItems.length === 0) {
    return (
      <section className="py-12 md:py-16">
        <Container>
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-[var(--border)] bg-white px-6 py-16 text-center sm:px-10">
            <Heart
              size={40}
              className="text-[var(--primary)]"
              aria-hidden
            />
            <h2 className="mt-6 text-2xl font-semibold font-[family-name:var(--font-heading)]">
              Your wishlist is empty
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Save your favorite fragrances here and revisit them whenever
              you are ready to indulge.
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
        <p className="mb-8 text-sm text-gray-500">
          {displayItems.length}{" "}
          {displayItems.length === 1 ? "fragrance" : "fragrances"} saved
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="block transition hover:opacity-90"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
