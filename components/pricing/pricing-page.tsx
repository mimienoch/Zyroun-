"use client";

import { useState } from "react";
import Link from "next/link";
import { FigmaAsset } from "../figma-asset";
import { FaqItem } from "../ui/faq";
import { Switch } from "../ui/switch";

const MIN_PRIZE = 500;
const MAX_PRIZE = 10000;
const DEFAULT_PRIZE = 2500;

const faqs = [
  {
    question: "What happens if I don't like any designs?",
    answer:
      "For standard contests, we offer a 100% money-back guarantee. If you don't receive designs you love within the contest period, we'll refund your prize pool in full.",
  },
  {
    question: "How do participation payments work?",
    answer:
      "By toggling participation payments, you commit to paying a smaller fixed fee to up to 3 shortlisted designers, even if they don't win the final prize. This signals to top-tier designers that your project is serious, resulting in higher quality submissions.",
  },
  {
    question: "Who owns the copyright?",
    answer:
      "Once you select a winning design and release the payment, full copyright and ownership of the design files are transferred to you automatically through our platform's legal agreement.",
  },
];

function money(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export function PricingPage() {
  const [prize, setPrize] = useState(DEFAULT_PRIZE);
  const [participation, setParticipation] = useState(false);
  const fee = Math.round(prize * 0.1);
  const total = prize + fee;
  const prizePercent = ((prize - MIN_PRIZE) / (MAX_PRIZE - MIN_PRIZE)) * 100;
  const prizeTrack = `linear-gradient(90deg, #7b61ff, #5ce1e6) 0 / ${prizePercent}% 100% no-repeat, #f3f0ff`;

  return (
    <main className="flex w-full flex-col items-center bg-white">
      <section className="flex w-full flex-col items-center gap-6 px-5 py-16 md:px-20 md:py-[100px]">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0px_4px_6.7px_rgba(0,0,0,0.05)]">
          <span className="size-2 rounded-full bg-[#7b61ff]" />
          <p className="font-display text-xs font-bold tracking-wide text-[#7b61ff] uppercase">
            Transparent pricing
          </p>
        </div>
        <h1 className="max-w-[1280px] text-center font-display text-[40px] leading-[1.05] font-extrabold text-[#0f172a] md:text-[72px] md:leading-[73px]">
          Set your budget,
          <br />
          <em className="bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text font-serif font-normal text-transparent italic">
            attract top talent.
          </em>
        </h1>
        <p className="max-w-[672px] text-center font-display text-base font-medium text-[#64748b] md:text-[20px] md:leading-[28px]">
          Flexible pricing for any project size. Choose your prize pool and
          optionally reward participating designers to increase submission
          quality.
        </p>
      </section>

      <section
        id="budget-selector"
        className="w-full max-w-[976px] px-5 pb-8 md:px-0 md:pb-0"
      >
        <div className="rounded-[32px] bg-white p-6 shadow-[0px_4px_6.7px_rgba(0,0,0,0.05)] md:p-12">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <div className="flex flex-col items-center gap-8">
              <h2 className="w-full font-sans text-2xl leading-8 font-bold text-[#0f172a]">
                Customize Your Contest
              </h2>

              <div className="flex w-full flex-col gap-2">
                <div className="flex items-end justify-between">
                  <p className="pb-0.5 font-sans text-sm leading-5 font-medium tracking-[0.7px] text-[#4b5563] uppercase">
                    Prize pool
                  </p>
                  <p className="font-serif text-[30px] leading-9 font-bold text-[#0f172a]">
                    {money(prize)}
                    {prize >= MAX_PRIZE ? "+" : ""}
                  </p>
                </div>
                <input
                  type="range"
                  min={MIN_PRIZE}
                  max={MAX_PRIZE}
                  step={50}
                  value={prize}
                  onChange={(event) => setPrize(Number(event.target.value))}
                  className="prize-slider"
                  style={{ ["--prize-track" as string]: prizeTrack }}
                  aria-label="Prize pool"
                />
                <div className="flex justify-between pt-2 font-sans text-xs leading-4 text-[#4b5563]">
                  <span>$500</span>
                  <span>$10,000+</span>
                </div>
              </div>

              <div className="flex w-full max-w-[384px] items-start gap-3 rounded-[10px] bg-white p-4 shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="font-display text-sm font-bold text-[#0f172a]">
                    Participation Payments
                  </p>
                  <p className="font-sans text-xs text-[#0f172a]">
                    Guarantee payment to up to 3 shortlisted designers to
                    attract higher quality pitches.
                  </p>
                </div>
                <Switch
                  checked={participation}
                  onCheckedChange={setParticipation}
                  aria-label="Participation payments"
                />
              </div>

              <Link
                href="#post-project"
                className="inline-flex h-14 w-full items-center justify-center rounded-[30px] bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] font-display text-xl font-bold text-white shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
              >
                Start Your Project
              </Link>
            </div>

            <div className="relative rounded-3xl bg-white p-8 shadow-[0px_4px_6.7px_rgba(0,0,0,0.05)]">
              <span className="absolute -top-[15px] right-[33px] rounded-full bg-white px-4 py-1.5 font-display text-xs font-bold text-transparent shadow-[0px_0px_1.8px_rgba(124,58,237,0.18)] [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(90deg,#7b61ff,#5ce1e6)_border-box] [background-clip:padding-box,border-box] border border-transparent">
                <span className="bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text">
                  Recommended
                </span>
              </span>
              <h3 className="border-b border-[#f9fafb] pb-4 font-sans text-xl leading-7 font-bold text-[#0f172a]">
                Estimated Breakdown
              </h3>
              <div className="flex flex-col gap-4 pt-6 pb-2">
                <div className="flex items-center justify-between">
                  <p className="font-sans text-base leading-6 text-[#4b5563]">
                    Winning Prize
                  </p>
                  <p className="font-sans text-base leading-6 font-medium text-[#0f172a]">
                    {money(prize)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-sans text-base leading-6 text-[#4b5563]">
                    Platform Fee (10%)
                  </p>
                  <p className="font-sans text-base leading-6 font-medium text-[#0f172a]">
                    {money(fee)}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-end justify-between border-t border-[#f9fafb] pt-6">
                <p className="font-sans text-lg leading-7 font-medium text-[#0f172a]">
                  Total Investment
                </p>
                <p className="bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text font-serif text-4xl leading-10 font-bold text-transparent">
                  {money(total)}
                </p>
              </div>
              <div className="mt-9 flex items-center gap-3 rounded-[10px] bg-white p-4 shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]">
                <FigmaAsset src="/images/icon-send-purple.svg" alt="" />
                <p className="font-sans text-xs text-[#4b5563]">
                  This budget typically attracts{" "}
                  <strong className="font-bold text-[#7b61ff]">
                    15-25 high-quality
                  </strong>{" "}
                  design submissions within{" "}
                  <strong className="font-bold text-[#7b61ff]">7 days</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="w-full px-5 py-16 md:px-[272px] md:pt-[144px] md:pb-24"
      >
        <div className="mx-auto flex max-w-[896px] flex-col gap-16 px-0 md:px-6">
          <h2 className="text-center font-poppins text-[28px] leading-9 font-bold text-black md:text-4xl md:leading-10">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((item) => (
              <FaqItem key={item.question} question={item.question}>
                {item.answer}
              </FaqItem>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
