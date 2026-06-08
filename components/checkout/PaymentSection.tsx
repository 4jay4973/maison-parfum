"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldLabelClass =
  "text-xs font-medium uppercase tracking-[0.2em] text-gray-500";
const inputClass =
  "mt-3 w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:ring-0";

type PaymentMethod = "card" | "paypal";

interface PaymentSectionProps {
  className?: string;
}

export default function PaymentSection({ className }: PaymentSectionProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  return (
    <section
      aria-labelledby="payment-heading"
      className={className}
    >
      <h2
        id="payment-heading"
        className="font-[family-name:var(--font-heading)] text-2xl font-semibold md:text-[1.65rem]"
      >
        Payment
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        All transactions are secure and encrypted.
      </p>

      <div
        className="mt-8 grid gap-3 sm:grid-cols-2"
        role="radiogroup"
        aria-label="Payment method"
      >
        <button
          type="button"
          role="radio"
          aria-checked={paymentMethod === "card"}
          onClick={() => setPaymentMethod("card")}
          className={cn(
            "flex items-center gap-3 border px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
            paymentMethod === "card"
              ? "border-[var(--primary)] bg-white"
              : "border-[var(--border)] bg-transparent hover:border-[var(--primary)]/50"
          )}
        >
          <CreditCard
            size={20}
            className="shrink-0 text-[var(--primary)]"
            aria-hidden
          />
          <span className="text-sm font-medium uppercase tracking-[0.14em]">
            Credit Card
          </span>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={paymentMethod === "paypal"}
          onClick={() => setPaymentMethod("paypal")}
          className={cn(
            "flex items-center gap-3 border px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
            paymentMethod === "paypal"
              ? "border-[var(--primary)] bg-white"
              : "border-[var(--border)] bg-transparent hover:border-[var(--primary)]/50"
          )}
        >
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--primary)] text-[0.625rem] font-bold uppercase tracking-tight text-[var(--primary)]"
            aria-hidden
          >
            P
          </span>
          <span className="text-sm font-medium uppercase tracking-[0.14em]">
            PayPal
          </span>
        </button>
      </div>

      {paymentMethod === "card" && (
        <div className="mt-8 space-y-6">
          <div>
            <label htmlFor="payment-card-number" className={fieldLabelClass}>
              Card Number
            </label>
            <input
              id="payment-card-number"
              name="cardNumber"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="•••• •••• •••• ••••"
              className={inputClass}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="payment-expiry" className={fieldLabelClass}>
                Expiry Date
              </label>
              <input
                id="payment-expiry"
                name="expiry"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="payment-cvc" className={fieldLabelClass}>
                CVC
              </label>
              <input
                id="payment-cvc"
                name="cvc"
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="•••"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "paypal" && (
        <p className="mt-8 text-sm leading-relaxed text-gray-600">
          You will be redirected to PayPal to complete your purchase securely.
        </p>
      )}

    </section>
  );
}
