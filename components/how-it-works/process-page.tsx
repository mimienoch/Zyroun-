"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";

const cardShadow =
  "rounded-[32px] border border-[#e5e7eb] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]";
const stepNumber =
  "absolute top-1/2 left-1/2 z-10 hidden size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] p-px shadow-[0px_4px_6px_-4px_rgba(200,121,65,0.1),0px_10px_15px_-3px_rgba(200,121,65,0.1)] md:flex";
const stepNumberInner =
  "flex size-full items-center justify-center rounded-full bg-white";

const faqs = [
  {
    question: "How many designs will I receive?",
    answer:
      "On average, clients receive 30-80 unique design concepts per contest. Higher-tier packages typically attract 100+ submissions from our premium designers.",
  },
  {
    question: "What if I don't like any of the designs?",
    answer: null,
  },
  {
    question: "Do I own the copyright to my design?",
    answer: null,
  },
  {
    question: "How are designers vetted?",
    answer: null,
  },
  {
    question: "Can I request revisions after selecting a winner?",
    answer: null,
  },
];

export function ProcessPage() {
  const [open, setOpen] = useState(0);

  return (
    <main className="flex w-full flex-col items-center bg-white">
      <section className="flex w-full flex-col items-center bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_55%)] px-5 py-16 md:px-20 md:py-[100px]">
        <div className="mx-auto flex w-full max-w-[896px] flex-col items-center gap-[30px] px-0 md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]">
            <FigmaAsset src="/images/hiw-spark.png" alt="" className="h-4 w-[18px]" />
            <p className="font-display text-xs font-bold tracking-wide text-[#7b61ff] uppercase">
              The Zyroun process
            </p>
          </div>
          <h1 className="max-w-[722px] text-center font-display text-[40px] leading-[1.1] font-extrabold text-[#0f172a] md:text-[48px] md:leading-[60px]">
            From idea to{" "}
            <em className="font-serif text-[36px] font-normal text-[#7b61ff] italic md:text-[40px]">
              perfection
            </em>{" "}
            in 3 simple steps
          </h1>
          <p className="max-w-[672px] text-center font-display text-base font-medium text-[#4b5563] md:text-[20px]">
            Our streamlined platform ensures you get world-class design work,
            safely and securely, with no hidden surprises.
          </p>
          <Button
            href="#post-project"
            icon={<FigmaAsset src="/images/icon-send.svg" alt="" />}
            className="h-14 gap-[17px] px-6 text-base"
          >
            Start a Project
          </Button>
        </div>
      </section>

      <section className="w-full bg-[#f9fafb] px-5 py-16 md:px-20 md:py-[100px]">
        <div className="relative mx-auto max-w-[800px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-8 hidden w-px bg-gradient-to-b from-[#7b61ff] to-[#5ce1e6] md:left-1/2 md:block"
          />
          <ol className="flex flex-col gap-[73px]">
            <li className="relative grid items-center gap-8 md:grid-cols-2 md:gap-0">
              <div className="md:pr-12 md:text-right">
                <h2 className="font-display text-2xl font-bold text-[#0f172a]">
                  Define Your Vision
                </h2>
                <p className="mt-3 font-sans text-base text-[#4b5563] md:ml-auto md:max-w-[295px]">
                  Submit your project brief with our intuitive curation tool.
                  Detail your aesthetic preferences and technical requirements.
                </p>
              </div>
              <div className={stepNumber}>
                <span className={stepNumberInner}>
                  <span className="bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text font-serif text-xl leading-7 font-normal not-italic text-transparent">
                    01
                  </span>
                </span>
              </div>
              <div className="md:pl-12">
                <div className={cardShadow}>
                  <div className="flex items-center gap-4">
                    <FigmaAsset src="/images/hiw-brief-doc.svg" alt="" />
                    <p className="text-sm font-medium text-[#4b5563]">Smart Briefing</p>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f9fafb]">
                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6]" />
                  </div>
                </div>
              </div>
            </li>

            <li className="relative grid items-center gap-8 md:grid-cols-2 md:gap-0">
              <div className="order-2 md:order-1 md:pr-12 md:text-right">
                <div className="flex justify-start md:justify-end">
                  <Image
                    src="/images/hiw-avatar-1.png"
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 rounded-full border-2 border-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
                  />
                  <Image
                    src="/images/hiw-avatar-2.png"
                    alt=""
                    width={40}
                    height={40}
                    className="-ml-1 size-10 rounded-full border-2 border-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
                  />
                  <Image
                    src="/images/hiw-avatar-3.png"
                    alt=""
                    width={40}
                    height={40}
                    className="-ml-1 size-10 rounded-full border-2 border-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
                  />
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-2 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                  <span className="size-2 rounded-full bg-[#16a34a]" />
                  <p className="text-xs font-medium text-[#4b5563]">3 Matches Found</p>
                </div>
              </div>
              <div className={stepNumber}>
                <span className={stepNumberInner}>
                  <span className="bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text font-serif text-xl leading-7 font-normal not-italic text-transparent">
                    02
                  </span>
                </span>
              </div>
              <div className="order-1 md:order-2 md:pl-12">
                <h2 className="font-display text-2xl font-bold text-[#0f172a]">
                  Receive Multiple Concepts
                </h2>
                <p className="mt-3 font-sans text-base text-[#4b5563]">
                  Once your contest goes live, talented designers from around the
                  world submit their unique interpretations of your brief. You&apos;ll
                  typically receive 20-100+ concepts within 3-7 days.
                </p>
              </div>
            </li>

            <li className="relative grid items-center gap-8 md:grid-cols-2 md:gap-0">
              <div className="md:pr-12 md:text-right">
                <h2 className="font-display text-2xl font-bold text-[#0f172a]">
                  Select Your Winner
                </h2>
                <p className="mt-3 font-sans text-base text-[#4b5563] md:ml-auto md:max-w-[295px]">
                  Choose your favorite design and award the prize to the winning
                  designer. You&apos;ll receive all final files, full copyright
                  ownership, and ongoing support.
                </p>
              </div>
              <div className={stepNumber}>
                <span className={stepNumberInner}>
                  <span className="bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text font-serif text-xl leading-7 font-normal not-italic text-transparent">
                    03
                  </span>
                </span>
              </div>
              <div className="md:pl-12">
                <div className={cardShadow}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#4b5563]">Design File V2</p>
                    <span className="rounded bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] px-2 py-1 text-xs font-medium text-white">
                      Approved
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="flex size-8 items-center justify-center rounded bg-[#f9fafb]">
                      <FigmaAsset src="/images/hiw-check.svg" alt="" />
                    </div>
                    <div className="flex size-8 items-center justify-center rounded bg-[#f9fafb]">
                      <FigmaAsset src="/images/hiw-download.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="flex w-full flex-col gap-10 bg-white px-5 py-16 md:flex-row md:items-start md:justify-between md:gap-[31px] md:px-[104px] md:py-[100px]">
        <div className="flex max-w-[662px] flex-col gap-9">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]">
            <FigmaAsset src="/images/hiw-git-pr.svg" alt="" />
            <p className="font-display text-xs font-bold tracking-wide text-[#7b61ff] uppercase">
              Frequently asked questions
            </p>
          </div>
          <h2 className="font-display text-[40px] leading-[1.05] font-extrabold text-[#0f172a] md:text-[72px] md:leading-[73px]">
            Frequently asked
            <br />
            <em className="font-serif font-normal italic">questions</em>
          </h2>
          <p className="font-display text-xs font-medium text-[#0f172a]">
            Everything you need to know about running a design contest on Zyroun.
          </p>
        </div>
        <div className="flex w-full max-w-[418px] flex-col gap-2">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <button
                key={item.question}
                type="button"
                className={`flex w-full items-start gap-[21px] rounded-[10px] bg-[#f9fafb] p-4 text-left shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff] ${
                  isOpen ? "" : "md:min-h-[72px] md:items-center"
                }`}
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-bold text-[#0f172a]">
                    {item.question}
                  </span>
                  {isOpen && item.answer ? (
                    <span className="mt-3.5 block font-sans text-xs text-[#0f172a]">
                      {item.answer}
                    </span>
                  ) : null}
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[20px] bg-[#7b61ff] text-white">
                  <FigmaAsset
                    src="/images/icon-chevron-down.svg"
                    alt=""
                    className={isOpen ? "rotate-180 brightness-0 invert" : "brightness-0 invert"}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        id="post-project"
        className="w-full bg-[#f9fafb] px-5 py-16 md:px-20 md:py-[100px]"
      >
        <div className="mx-auto flex max-w-[896px] flex-col items-center gap-[37px] text-center">
          <h2 className="font-display text-[32px] leading-tight font-extrabold text-[#0f172a] md:text-[40px] md:leading-[48px]">
            Ready to get{" "}
            <em className="font-serif font-normal text-[#7b61ff] italic">started?</em>
          </h2>
          <p className="max-w-[672px] font-display text-base font-medium text-[#0f172a] md:text-[20px]">
            Launch your design contest today and receive dozens of unique concepts
            from talented designers worldwide.
          </p>
          <Button href="#post-project" className="w-[146px]">
            Post a Project
          </Button>
        </div>
      </section>
    </main>
  );
}
