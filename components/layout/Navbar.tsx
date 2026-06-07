"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-semibold tracking-wide font-[family-name:var(--font-heading)]"
          >
            Maison Parfum
          </Link>

          {/* Desktop Menu */}
          <nav
            aria-label="Main navigation"
            className="hidden gap-8 md:flex"
          >
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <Search size={20} />
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <Heart size={20} />
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <ShoppingBag size={20} />
            </Link>

            <button
              type="button"
              className="md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <nav
          id="mobile-navigation"
          aria-label="Main navigation"
          aria-hidden={!isMenuOpen}
          className={cn(
            "overflow-hidden border-[var(--border)] transition-all duration-300 ease-in-out md:hidden",
            isMenuOpen
              ? "max-h-64 border-t opacity-100"
              : "max-h-0 border-t-transparent opacity-0"
          )}
        >
          <div className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  );
}
