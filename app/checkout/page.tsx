import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import CheckoutContent from "@/components/checkout/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout | Maison Parfum",
  description:
    "Complete your order of luxury fragrances from Maison Parfum.",
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="border-b border-[var(--border)] bg-[var(--muted)] py-12 md:py-16">
          <Container>
            <p className="mb-2 text-sm uppercase tracking-widest text-gray-500">
              Secure Checkout
            </p>
            <h1 className="text-3xl font-semibold md:text-5xl font-[family-name:var(--font-heading)]">
              Checkout
            </h1>
          </Container>
        </section>

        <CheckoutContent />
      </main>

      <Footer />
    </>
  );
}
