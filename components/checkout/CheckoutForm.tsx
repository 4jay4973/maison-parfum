"use client";

interface CheckoutFormProps {
  id?: string;
}

export default function CheckoutForm({ id = "checkout-form" }: CheckoutFormProps) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="rounded-3xl border border-[var(--border)] bg-white p-6 md:p-8"
    >
      <h2
        id={`${id}-heading`}
        className="text-xl font-semibold font-[family-name:var(--font-heading)]"
      >
        Customer Information
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-first-name`} className="text-sm font-medium">
            First Name
          </label>
          <input
            id={`${id}-first-name`}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label htmlFor={`${id}-last-name`} className="text-sm font-medium">
            Last Name
          </label>
          <input
            id={`${id}-last-name`}
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-email`} className="text-sm font-medium">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-phone`} className="text-sm font-medium">
            Phone
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>
      </div>
    </section>
  );
}
