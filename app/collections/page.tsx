import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollectionsHero from "@/components/collections/CollectionsHero";
import CollectionsCategoryGrid from "@/components/collections/CollectionsCategoryGrid";
import CollectionsCatalog from "@/components/collections/CollectionsCatalog";
import { products } from "@/data/products";

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

        <Suspense fallback={null}>
          <CollectionsCatalog products={products} />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
