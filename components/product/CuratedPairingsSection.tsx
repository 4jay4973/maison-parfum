import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { ResolvedPairing } from "@/lib/product-pairings";

interface CuratedPairingsSectionProps {
  pairings: ResolvedPairing[];
}

interface PairingCardProps {
  pairing: ResolvedPairing;
}

function PairingCard({ pairing }: PairingCardProps) {
  const { product, title, description } = pairing;

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--muted)] sm:aspect-[3/4]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>

        <div className="flex flex-1 flex-col pt-6 text-center md:pt-8 md:text-left">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--primary)]">
            {product.name}
          </p>

          <h3 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-semibold leading-snug sm:text-[1.65rem]">
            {title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 sm:text-[0.9375rem]">
            {description}
          </p>

          <span
            className="mt-5 inline-block text-xs font-medium uppercase tracking-[0.2em] text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--primary)]"
            aria-hidden
          >
            Explore
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function CuratedPairingsSection({
  pairings,
}: CuratedPairingsSectionProps) {
  if (pairings.length === 0) {
    return null;
  }

  return (
    <section
      className="border-t border-[var(--border)] bg-[var(--background)] py-16 md:py-20 lg:py-24"
      aria-label="Curated fragrance pairings"
    >
      <Container>
        <SectionTitle
          subtitle="Curated for You"
          title="Layer With"
          subtitleTone="gold"
        />

        <ul className="grid list-none gap-12 sm:gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14 lg:grid-cols-3 lg:gap-x-10">
          {pairings.map((pairing) => (
            <li key={pairing.product.id}>
              <PairingCard pairing={pairing} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
