"use client";

import { cn } from "@/lib/utils";

interface CheckoutFormProps {
  id?: string;
  className?: string;
}

const fieldLabelClass =
  "text-xs font-medium uppercase tracking-[0.2em] text-gray-500";
const inputClass =
  "mt-3 w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-0";

export default function CheckoutForm({
  id = "checkout-form",
  className,
}: CheckoutFormProps) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={cn(className)}
    >
      <h2
        id={`${id}-heading`}
        className="font-[family-name:var(--font-heading)] text-2xl font-semibold md:text-[1.65rem]"
      >
        Customer Information
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <label htmlFor={`${id}-first-name`} className={fieldLabelClass}>
            First Name
          </label>
          <input
            id={`${id}-first-name`}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${id}-last-name`} className={fieldLabelClass}>
            Last Name
          </label>
          <input
            id={`${id}-last-name`}
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-email`} className={fieldLabelClass}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-phone`} className={fieldLabelClass}>
            Phone
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </div>
      </div>
    </section>
  );
}
