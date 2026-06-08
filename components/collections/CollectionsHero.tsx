import Image from "next/image";
import Container from "@/components/layout/Container";
import { collectionsPage } from "@/data/collections-page";

export default function CollectionsHero() {
  return (
    <section
      id="collections-hero"
      className="relative overflow-hidden bg-black text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-[var(--secondary)] to-black"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="grid min-h-[42svh] items-end gap-8 pb-12 pt-24 sm:min-h-[44svh] sm:pb-14 sm:pt-28 lg:min-h-[48svh] lg:grid-cols-2 lg:items-center lg:gap-12 lg:pb-16 lg:pt-32">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[var(--primary)] sm:text-sm">
              {collectionsPage.hero.eyebrow}
            </p>

            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              {collectionsPage.hero.title}
            </h1>

            <p className="mt-5 max-w-lg font-[family-name:var(--font-body)] text-base leading-relaxed text-white/75 sm:text-lg">
              {collectionsPage.hero.description}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-xs lg:hidden">
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent"
              aria-hidden
            />
            <Image
              src="/images/hero-perfume.png"
              alt=""
              width={500}
              height={620}
              priority
              className="mx-auto h-auto w-full max-h-[32vh] object-contain object-bottom"
            />
          </div>
        </div>
      </Container>

      <div
        className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-[52%] lg:block"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/90" />
        <Image
          src="/images/hero-perfume.png"
          alt=""
          width={800}
          height={1000}
          priority
          className="absolute bottom-0 right-0 h-[88%] w-auto max-w-none object-contain"
        />
      </div>
    </section>
  );
}
