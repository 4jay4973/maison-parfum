import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { discoveryQuizCta } from "@/data/discovery-quiz";

export default function DiscoveryQuizCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--secondary)] via-black to-[#2a1f14] py-16 text-white md:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,164,92,0.18),transparent_55%)]"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[var(--primary)] sm:text-sm">
            {discoveryQuizCta.eyebrow}
          </p>

          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {discoveryQuizCta.title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-body)] text-base leading-relaxed text-white/75 sm:text-lg">
            {discoveryQuizCta.description}
          </p>

          <Link href={discoveryQuizCta.ctaHref} className="mt-8 inline-block">
            <Button className="uppercase tracking-[0.18em] text-[var(--foreground)]">
              {discoveryQuizCta.ctaLabel}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
