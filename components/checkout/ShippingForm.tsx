"use client";

import { cn } from "@/lib/utils";

interface ShippingFormProps {
  id?: string;
  className?: string;
}

const fieldLabelClass =
  "text-xs font-medium uppercase tracking-[0.2em] text-gray-500";
const inputClass =
  "mt-3 w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-0";

export default function ShippingForm({
  id = "shipping-form",
  className,
}: ShippingFormProps) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={cn(className)}
    >
      <h2
        id={`${id}-heading`}
        className="font-[family-name:var(--font-heading)] text-2xl font-semibold md:text-[1.65rem]"
      >
        Shipping Address
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-x-8">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-address`} className={fieldLabelClass}>
            Address
          </label>
          <input
            id={`${id}-address`}
            name="address"
            type="text"
            required
            autoComplete="street-address"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`${id}-address-line-2`}
            className={fieldLabelClass}
          >
            Apartment, suite, etc. (optional)
          </label>
          <input
            id={`${id}-address-line-2`}
            name="addressLine2"
            type="text"
            autoComplete="address-line2"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${id}-city`} className={fieldLabelClass}>
            City
          </label>
          <input
            id={`${id}-city`}
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${id}-state`} className={fieldLabelClass}>
            State / Province
          </label>
          <input
            id={`${id}-state`}
            name="state"
            type="text"
            required
            autoComplete="address-level1"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${id}-postal-code`} className={fieldLabelClass}>
            Postal Code
          </label>
          <input
            id={`${id}-postal-code`}
            name="postalCode"
            type="text"
            required
            autoComplete="postal-code"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${id}-country`} className={fieldLabelClass}>
            Country
          </label>
          <input
            id={`${id}-country`}
            name="country"
            type="text"
            required
            autoComplete="country-name"
            className={inputClass}
          />
        </div>
      </div>
    </section>
  );
}
