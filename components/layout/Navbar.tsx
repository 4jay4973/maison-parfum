"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { useCartStore } from "@/lib/store/cart-store";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";

interface NavbarProps {
  transparent?: boolean;
  transparentOverHero?: boolean;
  heroId?: string;
}

function isNavActive(href: string, pathname: string): boolean {
  if (href === "#" || href === "") {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({
  transparent = false,
  transparentOverHero = false,
  heroId = "collections-hero",
}: NavbarProps) {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(transparentOverHero);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = hydrated
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const isTransparent = transparent || (transparentOverHero && isOverHero);

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

  useEffect(() => {
    if (!transparentOverHero) {
      return;
    }

    const hero = document.getElementById(heroId);

    if (!hero) {
      return;
    }

    function updateNavbarTheme() {
      if (!hero) {
        return;
      }

      const heroBottom = hero.getBoundingClientRect().bottom;
      setIsOverHero(heroBottom > 72);
    }

    updateNavbarTheme();
    window.addEventListener("scroll", updateNavbarTheme, { passive: true });
    window.addEventListener("resize", updateNavbarTheme);

    return () => {
      window.removeEventListener("scroll", updateNavbarTheme);
      window.removeEventListener("resize", updateNavbarTheme);
    };
  }, [transparentOverHero, heroId]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function linkClassName(isActive: boolean) {
    return cn(
      "rounded-full px-3.5 py-2 text-sm transition-colors lg:px-4",
      isActive
        ? isTransparent
          ? "bg-white/15 text-[var(--primary)]"
          : "bg-[var(--muted)] text-[var(--primary)]"
        : isTransparent
          ? "text-white/85 hover:text-[var(--primary)]"
          : "text-[var(--foreground)]/80 hover:text-[var(--primary)]"
    );
  }

  function utilityClassName(isActive: boolean) {
    return cn(
      "inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] lg:px-3",
      isActive
        ? "text-[var(--primary)]"
        : isTransparent
          ? "text-white/85 hover:text-[var(--primary)]"
          : "text-[var(--foreground)]/80 hover:text-[var(--primary)]"
    );
  }

  return (
    <header
      className={cn(
        transparentOverHero
          ? cn(
              "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
              isTransparent
                ? "border-b border-white/10 bg-transparent text-white"
                : "border-b border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
            )
          : isTransparent
            ? "absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-transparent text-white"
            : "border-b border-[var(--border)] bg-[var(--background)]"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link
            href="/"
            className={cn(
              "shrink-0 font-[family-name:var(--font-heading)] text-base font-semibold uppercase tracking-[0.28em] transition-opacity hover:opacity-80 lg:text-lg",
              isTransparent ? "text-white" : "text-[var(--foreground)]"
            )}
          >
            Maison
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden flex-1 justify-center md:flex"
          >
            <ul className="flex items-center gap-0.5 lg:gap-1">
              {navLinks.map((link) => {
                const isActive = isNavActive(link.href, pathname);

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={linkClassName(isActive)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              aria-current={
                isNavActive("/wishlist", pathname) ? "page" : undefined
              }
              className={utilityClassName(isNavActive("/wishlist", pathname))}
            >
              <Heart size={18} aria-hidden />
              <span className="hidden lg:inline">Wishlist</span>
            </Link>

            <Link
              href="/account"
              aria-label="Account"
              aria-current={
                isNavActive("/account", pathname) ? "page" : undefined
              }
              className={utilityClassName(isNavActive("/account", pathname))}
            >
              <User size={18} aria-hidden />
              <span className="hidden lg:inline">Account</span>
            </Link>

            <Link
              href="/cart"
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
              aria-current={
                isNavActive("/cart", pathname) ||
                isNavActive("/checkout", pathname)
                  ? "page"
                  : undefined
              }
              className={cn(
                utilityClassName(
                  isNavActive("/cart", pathname) ||
                    isNavActive("/checkout", pathname)
                ),
                "relative"
              )}
            >
              <ShoppingBag size={18} aria-hidden />
              <span className="hidden lg:inline">Cart</span>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-semibold leading-none text-[var(--foreground)]"
                  aria-hidden
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className={cn(
                "ml-1 rounded-full p-2 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                isTransparent
                  ? "text-white hover:text-[var(--primary)]"
                  : "text-[var(--foreground)] hover:text-[var(--primary)]"
              )}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Main navigation"
          aria-hidden={!isMenuOpen}
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out md:hidden",
            isMenuOpen
              ? "max-h-96 border-t opacity-100"
              : "max-h-0 border-t-transparent opacity-0",
            isTransparent
              ? isMenuOpen
                ? "border-white/10 bg-black/95"
                : "border-transparent"
              : isMenuOpen
                ? "border-[var(--border)]"
                : "border-transparent"
          )}
        >
          <div className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const isActive = isNavActive(link.href, pathname);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? isTransparent
                        ? "bg-white/10 text-[var(--primary)]"
                        : "bg-[var(--muted)] text-[var(--primary)]"
                      : isTransparent
                        ? "text-white/90 hover:text-[var(--primary)]"
                        : "text-[var(--foreground)] hover:text-[var(--primary)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div
              className={cn(
                "mt-3 flex flex-col gap-1 border-t pt-3",
                isTransparent ? "border-white/10" : "border-[var(--border)]"
              )}
            >
              <Link
                href="/wishlist"
                onClick={closeMenu}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm transition-colors",
                  isNavActive("/wishlist", pathname)
                    ? "text-[var(--primary)]"
                    : isTransparent
                      ? "text-white/90"
                      : "text-[var(--foreground)]"
                )}
              >
                Wishlist
              </Link>
              <Link
                href="/account"
                onClick={closeMenu}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm transition-colors",
                  isNavActive("/account", pathname)
                    ? "text-[var(--primary)]"
                    : isTransparent
                      ? "text-white/90"
                      : "text-[var(--foreground)]"
                )}
              >
                Account
              </Link>
              <Link
                href="/cart"
                onClick={closeMenu}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                  isNavActive("/cart", pathname) ||
                    isNavActive("/checkout", pathname)
                    ? "text-[var(--primary)]"
                    : isTransparent
                      ? "text-white/90"
                      : "text-[var(--foreground)]"
                )}
              >
                Cart
                {cartCount > 0 && (
                  <span className="rounded-full bg-[var(--primary)] px-2 py-0.5 text-[10px] font-semibold text-[var(--foreground)]">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
