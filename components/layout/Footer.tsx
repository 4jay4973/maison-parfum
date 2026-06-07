import Link from "next/link";
import Container from "@/components/layout/Container";
import { navLinks } from "@/data/navigation";

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--secondary)] text-[var(--secondary-foreground)]">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="text-2xl font-semibold tracking-wide font-[family-name:var(--font-heading)]"
            >
              Maison Parfum
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Luxury fragrances crafted for the modern connoisseur.
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-center gap-3 md:items-start"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-400 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end">
            <p className="mb-4 text-sm uppercase tracking-widest text-gray-500">
              Follow Us
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-end">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-400 transition hover:text-[var(--primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Maison Parfum. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
