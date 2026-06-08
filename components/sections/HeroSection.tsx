import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-[var(--secondary)] to-black"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="grid min-h-[calc(100svh-0px)] items-center gap-10 pb-16 pt-24 sm:pt-28 lg:min-h-[88svh] lg:grid-cols-2 lg:gap-12 lg:pb-20 lg:pt-32">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[var(--primary)] sm:text-sm">
              The Art of Fragrance
            </p>

            <h1 className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl xl:text-7xl">
              The Art of Invisible Presence
            </h1>

            <p className="mb-10 max-w-lg font-[family-name:var(--font-body)] text-base leading-relaxed text-white/75 sm:text-lg">
              Rare essences distilled into wearable poetry. Discover fragrances
              crafted to linger long after you have left the room.
            </p>

            <Link href="/collections">
              <Button className="uppercase tracking-[0.18em] text-[var(--foreground)]">
                Discover Your Signature Scent
              </Button>
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent lg:hidden"
              aria-hidden
            />
            <Image
              src="/images/hero-perfume.png"
              alt="Maison Parfum signature bottle"
              width={600}
              height={750}
              priority
              className="mx-auto h-auto w-full max-h-[42vh] object-contain object-bottom"
            />
          </div>
        </div>
      </Container>

      {/* <div
        className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-[58%] lg:block"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/25 to-black/90" />
        <Image
          src="/images/hero-perfume.png"
          alt=""
          width={900}
          height={1100}
          priority
          className="absolute bottom-0 right-0 h-[92%] w-auto max-w-none object-contain"
        />
      </div> */}
    </section>
  );
}
