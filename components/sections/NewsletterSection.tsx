"use client";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { newsletter } from "@/data/newsletter";

export default function NewsletterSection() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="bg-black py-16 text-white md:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[var(--primary)] sm:text-sm">
            {newsletter.eyebrow}
          </p>

          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold sm:text-4xl lg:text-5xl">
            {newsletter.title}
          </h2>

          <p className="mx-auto mt-5 max-w-xl font-[family-name:var(--font-body)] text-base leading-relaxed text-white/75 sm:text-lg">
            {newsletter.description}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-lg flex-col gap-4 sm:flex-row sm:items-center"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
            />
            <Button
              type="submit"
              className="shrink-0 uppercase tracking-[0.14em] text-[var(--foreground)] sm:w-auto"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
