import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import FragranceNotes from "@/components/product/FragranceNotes";
import RelatedProducts from "@/components/product/RelatedProducts";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

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

  const relatedProducts = getRelatedProducts(product);

  return (
    <>
      <Navbar />

      <main>
        <section className="py-12 md:py-16">
          <Container>
            <div className="grid items-start gap-12 lg:grid-cols-2">
              <ProductGallery product={product} />
              <div>
                <ProductInfo product={product} />
                <FragranceNotes notes={product.notes} />
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-[var(--border)] py-12 md:py-16">
          <Container>
            <h2 className="text-2xl font-semibold md:text-3xl font-[family-name:var(--font-heading)]">
              About This Fragrance
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
              {product.description}
            </p>
          </Container>
        </section>

        <RelatedProducts products={relatedProducts} />
      </main>

      <Footer />
    </>
  );
}
