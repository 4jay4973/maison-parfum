import Link from "next/link";
import Container from "./Container";
import { Heart, Search, ShoppingBag } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-semibold tracking-wide"
            style={{
              fontFamily: "var(--font-heading)",
            }}
          >
            Maison Parfum
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden gap-8 md:flex">
            <Link href="#">Collections</Link>
            <Link href="#">Best Sellers</Link>
            <Link href="#">Discovery Quiz</Link>
            <Link href="#">About</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Search size={20} />
            <Heart size={20} />
            <ShoppingBag size={20} />
          </div>
        </div>
      </Container>
    </header>
  );
}