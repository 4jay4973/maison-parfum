import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import WishlistContent from "@/components/wishlist/WishlistContent";

export const metadata: Metadata = {
  title: "Wishlist | Maison Parfum",
  description:
    "View and manage your saved luxury fragrances from Maison Parfum.",
};

export default function WishlistPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="border-b border-[var(--border)] bg-[var(--muted)] py-12 md:py-16">
          <Container>
            <p className="mb-2 text-sm uppercase tracking-widest text-gray-500">
              Saved
            </p>
            <h1 className="text-3xl font-semibold md:text-5xl font-[family-name:var(--font-heading)]">
              Wishlist
            </h1>
          </Container>
        </section>

        <WishlistContent />
      </main>

      <Footer />
    </>
  );
}
