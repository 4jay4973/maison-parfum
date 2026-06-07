import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { collectionsPage } from "@/data/collections-page";

export const metadata: Metadata = {
  title: "Collections | Maison Parfum",
  description:
    "Explore our curated collection of luxury fragrances crafted for the modern connoisseur.",
};

export default function CollectionsPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Page Header */}
        <section className="border-b border-[var(--border)] bg-[var(--muted)] py-12 md:py-16">
          <Container>
            <p className="mb-2 text-sm uppercase tracking-widest text-gray-500">
              {collectionsPage.header.subtitle}
            </p>
            <h1 className="text-3xl font-semibold md:text-5xl font-[family-name:var(--font-heading)]">
              {collectionsPage.header.title}
            </h1>
          </Container>
        </section>

        {/* Catalog */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold md:text-3xl font-[family-name:var(--font-heading)]">
                  {collectionsPage.collectionTitle}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {products.length} fragrances
                </p>
              </div>

              {/* Sort Dropdown Placeholder */}
              <div className="w-full sm:w-56">
                <label htmlFor="sort-products" className="sr-only">
                  Sort products
                </label>
                <select
                  id="sort-products"
                  disabled
                  aria-label="Sort products"
                  className="w-full cursor-not-allowed rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-gray-500"
                >
                  {collectionsPage.sortOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
              {/* Filter Sidebar Placeholder */}
              <aside className="h-fit rounded-3xl border border-[var(--border)] bg-white p-6">
                <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                  Filters
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Refine your search by fragrance notes, price, and brand.
                </p>
                <div className="mt-6 space-y-6">
                  {collectionsPage.filters.map((filter) => (
                    <div key={filter}>
                      <p className="text-sm font-medium">{filter}</p>
                      <div className="mt-3 h-10 rounded-xl bg-[var(--muted)]" />
                    </div>
                  ))}
                </div>
              </aside>

              {/* Product Grid */}
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
