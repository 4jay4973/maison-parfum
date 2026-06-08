import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import CollectionsHero from "@/components/collections/CollectionsHero";
import CollectionsCategoryGrid from "@/components/collections/CollectionsCategoryGrid";
import CollectionsToolbar from "@/components/collections/CollectionsToolbar";
import CollectionsFilters from "@/components/collections/CollectionsFilters";
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
      <Navbar transparentOverHero heroId="collections-hero" />

      <main>
        <CollectionsHero />
        <CollectionsCategoryGrid />

        <section className="py-14 md:py-20 lg:py-24">
          <Container>
            <CollectionsToolbar
              showing={products.length}
              total={collectionsPage.catalog.totalCount}
            />

            <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
              <CollectionsFilters />

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
