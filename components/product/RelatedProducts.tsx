import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-[var(--border)] bg-[var(--muted)] py-16 md:py-20">
      <Container>
        <SectionTitle
          subtitle="You May Also Like"
          title="Related Fragrances"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
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
