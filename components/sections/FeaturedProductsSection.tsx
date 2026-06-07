import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export default function FeaturedProductsSection() {
  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          subtitle="Best Sellers"
          title="Featured Fragrances"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}