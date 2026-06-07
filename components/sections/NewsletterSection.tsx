"use client";

import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { newsletter } from "@/data/newsletter";

export default function NewsletterSection() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-white px-6 py-12 text-center sm:px-10">
          <SectionTitle title={newsletter.title} subtitle="Newsletter" />

          <p className="mb-8 text-gray-600 leading-relaxed">
            {newsletter.description}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
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
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
            />
            <Button type="submit" className="shrink-0 sm:w-auto">
              Subscribe
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
