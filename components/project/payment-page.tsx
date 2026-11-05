"use client";

import { FormEvent, useState } from "react";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";
import { authInputClass } from "../auth/auth-card";
import { SupportHeader } from "./support-header";

const cards = [
  { id: "visa", label: "Visa ending in 4242", meta: "Expires 12/25" },
  { id: "mc", label: "Mastercard ending in 8899", meta: "Expires 08/24" },
];

export function PaymentPage() {
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Carter");
  const [company, setCompany] = useState("Acme Corp LLC");
  const [country, setCountry] = useState("United States");
  const [method, setMethod] = useState("cards");
  const [card, setCard] = useState("visa");
  const [promoOpen, setPromoOpen] = useState(false);
  const [promo, setPromo] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  function onPay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = "Enter a first name.";
    if (!lastName.trim()) next.lastName = "Enter a last name.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setNotice("Payment is a UI preview only. No charge is processed.");
    }
  }

  return (
    <>
      <SupportHeader />
      <main className="bg-white px-5 py-10 md:px-10">
        <form
          onSubmit={onPay}
          noValidate
          className="mx-auto grid w-full max-w-[1200px] gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
        >
          <div>
            <h1 className="font-sans text-[28px] font-bold text-[#0f172a]">
              Complete your payment
            </h1>
            <p className="mt-2 font-sans text-sm text-[#64748b]">
              Securely pay for milestone 2 of &quot;E-commerce Website Redesign&quot;
            </p>
            <section className="mt-8 rounded-2xl border border-[#e5e7eb] bg-white p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full border border-[#e5e7eb] font-sans text-xs text-[#64748b]">
                    1
                  </span>
                  <h2 className="font-sans text-lg font-semibold text-[#0f172a]">
                    Billing Details
                  </h2>
                </div>
                <button type="button" className="font-sans text-sm text-[#7b61ff]">
                  Edit
                </button>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-sans text-sm font-medium text-[#374151]">
                    First Name
                  </span>
                  <input
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className={authInputClass}
                  />
                  {errors.firstName ? (
                    <span className="font-sans text-xs text-[#dc2626]">
                      {errors.firstName}
                    </span>
                  ) : null}
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-sans text-sm font-medium text-[#374151]">
                    Last Name
                  </span>
                  <input
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className={authInputClass}
                  />
                  {errors.lastName ? (
                    <span className="font-sans text-xs text-[#dc2626]">
                      {errors.lastName}
                    </span>
                  ) : null}
                </label>
              </div>
              <label className="mt-4 flex flex-col gap-2">
                <span className="font-sans text-sm font-medium text-[#374151]">
                  Company Name (Optional)
                </span>
                <input
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  className={authInputClass}
                />
              </label>
              <label className="mt-4 flex flex-col gap-2">
                <span className="font-sans text-sm font-medium text-[#374151]">Country</span>
                <span className="relative">
                  <select
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    className={`${authInputClass} appearance-none pr-10`}
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
                    <FigmaAsset src="/images/icon-chevron-down.svg" alt="" className="size-3" />
                  </span>
                </span>
              </label>
            </section>

            <section className="mt-6 rounded-2xl border border-[#e5e7eb] bg-white p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#7b61ff] font-sans text-xs text-white">
                  2
                </span>
                <h2 className="font-sans text-lg font-semibold text-[#0f172a]">
                  Payment Options
                </h2>
              </div>
              <div className="mt-6 flex gap-8 border-b border-[#e5e7eb]">
                {[
                  { id: "cards", label: "Credit & Debit Cards" },
                  { id: "bank", label: "Bank Transfer" },
                  { id: "wallets", label: "Digital Wallets" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id)}
                    className={`-mb-px pb-3 font-sans text-sm ${
                      method === item.id
                        ? "border-b-2 border-[#7b61ff] bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text font-medium text-transparent"
                        : "text-[#6b7280]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {method === "cards" ? (
                <div className="mt-5 flex flex-col gap-3">
                  {cards.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-4 ${
                        card === item.id ? "border-[#5ce1e6]" : "border-[#e5e7eb]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="card"
                        checked={card === item.id}
                        onChange={() => setCard(item.id)}
                        className="accent-[#7b61ff]"
                      />
                      <div>
                        <p className="font-sans text-sm font-medium text-[#0f172a]">
                          {item.label}
                        </p>
                        <p className="font-sans text-xs text-[#9ca3af]">{item.meta}</p>
                      </div>
                    </label>
                  ))}
                  <button
                    type="button"
                    className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] px-4 py-4 text-left font-sans text-sm font-medium text-[#0f172a]"
                  >
                    <span className="flex size-5 items-center justify-center rounded-md border border-[#e5e7eb]">
                      +
                    </span>
                    Add a new credit or debit card
                  </button>
                </div>
              ) : (
                <p className="mt-5 font-sans text-sm text-[#64748b]">
                  This option is shown in the design only. No payment provider is connected.
                </p>
              )}
              <p className="mt-6 flex items-center justify-center gap-2 font-sans text-xs text-[#9ca3af]">
                <FigmaAsset src="/images/auth-icon-lock.svg" alt="" />
                Payments are secure and encrypted.
              </p>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.06)]">
            <h2 className="font-sans text-lg font-bold text-[#0f172a]">Order Summary</h2>
            <div className="mt-4 flex gap-3 border-b border-[#f3f4f6] pb-4">
              <FigmaAsset
                src="/images/avatar-elena.png"
                alt=""
                className="size-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-sans text-sm font-semibold text-[#0f172a]">
                  E-commerce Website Redesign
                </p>
                <p className="font-sans text-xs text-[#64748b]">
                  Milestone 2: Frontend Development
                </p>
                <p className="mt-1 flex items-center gap-1 font-sans text-xs text-[#9ca3af]">
                  <FigmaAsset
                    src="/images/avatar-sarah.png"
                    alt=""
                    className="size-4 rounded-full"
                  />
                  by Sarah Jenkins
                </p>
              </div>
            </div>
            <dl className="mt-4 space-y-3 font-sans text-sm text-[#64748b]">
              <div className="flex justify-between">
                <dt>Milestone Amount</dt>
                <dd className="text-[#0f172a]">$2,450.00</dd>
              </div>
              <div className="flex justify-between">
                <dt>Service Fee (5%)</dt>
                <dd className="text-[#0f172a]">$122.50</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tax / VAT</dt>
                <dd className="text-[#0f172a]">$0.00</dd>
              </div>
            </dl>
            {promoOpen ? (
              <input
                value={promo}
                onChange={(event) => setPromo(event.target.value)}
                placeholder="Enter promo code"
                className={`${authInputClass} mt-4 h-9`}
              />
            ) : (
              <button
                type="button"
                onClick={() => setPromoOpen(true)}
                className="mt-4 font-sans text-sm text-[#7b61ff]"
              >
                Enter promo code
              </button>
            )}
            <div className="mt-6 flex items-end justify-between border-t border-[#f3f4f6] pt-4">
              <p className="font-sans text-sm font-semibold text-[#0f172a]">Total</p>
              <div className="text-right">
                <p className="font-sans text-xl font-bold text-[#0f172a]">$2,572.50</p>
                <p className="font-sans text-[10px] text-[#9ca3af]">Includes applicable taxes</p>
              </div>
            </div>
            <Button
              type="submit"
              className="mt-5 w-full"
              icon={<FigmaAsset src="/images/auth-icon-lock.svg" alt="" />}
            >
              Pay $2,572.50
            </Button>
            {notice ? (
              <p className="mt-3 font-sans text-xs text-[#64748b]">{notice}</p>
            ) : null}
            <p className="mt-3 text-center font-sans text-[11px] text-[#9ca3af]">
              By completing this order, you agree to our Terms of Service.
            </p>
          </aside>
        </form>
      </main>
    </>
  );
}
