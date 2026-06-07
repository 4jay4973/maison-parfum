import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import CartContent from "@/components/cart/CartContent";

export const metadata: Metadata = {
  title: "Cart | Maison Parfum",
  description: "Review your selected fragrances and proceed to checkout.",
};

export default function CartPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="border-b border-[var(--border)] bg-[var(--muted)] py-12 md:py-16">
          <Container>
            <p className="mb-2 text-sm uppercase tracking-widest text-gray-500">
              Your Selection
            </p>
            <h1 className="text-3xl font-semibold md:text-5xl font-[family-name:var(--font-heading)]">
              Shopping Cart
            </h1>
          </Container>
        </section>

        <CartContent />
      </main>

      <Footer />
    </>
  );
}
