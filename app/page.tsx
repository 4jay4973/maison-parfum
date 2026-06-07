import Navbar from "@/components/layout/Navbar";
import Container from "@/components/layout/Container";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}