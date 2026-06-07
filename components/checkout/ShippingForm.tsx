"use client";

interface ShippingFormProps {
  id?: string;
}

export default function ShippingForm({
  id = "shipping-form",
}: ShippingFormProps) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="rounded-3xl border border-[var(--border)] bg-white p-6 md:p-8"
    >
      <h2
        id={`${id}-heading`}
        className="text-xl font-semibold font-[family-name:var(--font-heading)]"
      >
        Shipping Address
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-address`} className="text-sm font-medium">
            Address
          </label>
          <input
            id={`${id}-address`}
            name="address"
            type="text"
            required
            autoComplete="street-address"
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`${id}-address-line-2`}
            className="text-sm font-medium"
          >
            Apartment, suite, etc. (optional)
          </label>
          <input
            id={`${id}-address-line-2`}
            name="addressLine2"
            type="text"
            autoComplete="address-line2"
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label htmlFor={`${id}-city`} className="text-sm font-medium">
            City
          </label>
          <input
            id={`${id}-city`}
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label htmlFor={`${id}-state`} className="text-sm font-medium">
            State / Province
          </label>
          <input
            id={`${id}-state`}
            name="state"
            type="text"
            required
            autoComplete="address-level1"
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label htmlFor={`${id}-postal-code`} className="text-sm font-medium">
            Postal Code
          </label>
          <input
            id={`${id}-postal-code`}
            name="postalCode"
            type="text"
            required
            autoComplete="postal-code"
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label htmlFor={`${id}-country`} className="text-sm font-medium">
            Country
          </label>
          <input
            id={`${id}-country`}
            name="country"
            type="text"
            required
            autoComplete="country-name"
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>
      </div>
    </section>
  );
}
