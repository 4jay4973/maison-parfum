import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import OlfactoryJourney from "@/components/product/OlfactoryJourney";
import IngredientsAccordion from "@/components/product/IngredientsAccordion";
import ProductReviews from "@/components/product/ProductReviews";
import CuratedPairingsSection from "@/components/product/CuratedPairingsSection";
import {
  getAllProductSlugs,
  getProductBySlug,
} from "@/lib/products";
import { getCuratedPairings } from "@/lib/product-pairings";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | Maison Parfum" };
  }

  return {
    title: `${product.name} | Maison Parfum`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const pairings = getCuratedPairings(product.slug);

  return (
    <>
      <Navbar />

      <main>
        <section className="py-10 md:py-14 lg:py-16">
          <Container>
            <ProductBreadcrumbs product={product} />

            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
              <ProductGallery product={product} />
              <ProductInfo product={product} />
            </div>
          </Container>
        </section>

        <OlfactoryJourney notes={product.notes} />
        <IngredientsAccordion description={product.description} />
        <ProductReviews product={product} />
        <CuratedPairingsSection pairings={pairings} />
      </main>

      <Footer />
    </>
  );
}
