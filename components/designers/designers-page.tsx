"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";

const filters = ["All Categories", "Any Location", "Availability", "Price Range"];

const popularTags = [
  { label: "UI/UX Design", active: true },
  { label: "SaaS Platforms", active: false },
  { label: "Figma Experts", active: false },
  { label: "Brand Identity", active: false },
];

const skillTags = [
  { label: "UI/UX Design", className: "bg-[#f3f0ff] text-[#7b61ff]" },
  { label: "SaaS", className: "bg-[#eff6ff] text-[#3683ff]" },
  { label: "Webflow", className: "bg-[#f0fdf4] text-[#16a34a]" },
];

const designers = Array.from({ length: 6 }, (_, index) => ({
  id: `naylia-${index + 1}`,
  name: "Naylia Rhamen",
  role: "Web Designer • Verified Client",
  rating: "5.0",
  reviews: "(124 reviews)",
  bio: "Award-winning product designer specializing in B2B SaaS platforms and design systems. Helping startups…",
  earnings: "$46,500",
  submissions: "2 per project",
  projects: "Participated in 101  Project",
}));

export function DesignersPage() {
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  return (
    <main className="flex w-full flex-col items-center bg-white">
      <section className="flex w-full flex-col gap-6 px-5 py-16 md:gap-6 md:px-20 md:py-[100px]">
        <h1 className="max-w-[996px] font-display text-[40px] leading-[1.05] font-extrabold text-[#0f172a] md:text-[72px] md:leading-[73px]">
          Discover{" "}
          <em className="bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text font-serif font-normal text-transparent italic">
            Top Design Talent
          </em>
        </h1>
        <p className="max-w-[1280px] font-display text-base leading-[25px] font-medium text-[#6b7280] md:h-[50px] md:text-[20px] md:leading-[25px]">
          Browse our curated network of exceptional UI/UX designers, brand
          strategists, and web
          <br className="hidden md:block" /> developers ready to bring your
          vision to life.
        </p>

        <div className="w-full max-w-[1280px] rounded-3xl border border-[#f3f4f6] bg-white px-5 py-6 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)] md:px-[55px] md:py-6 md:pl-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <form
              role="search"
              className="flex h-[42px] w-full items-center gap-2.5 rounded-[25px] border border-[#e5e7eb] bg-[#f9fafb] py-2.5 pr-5 pl-[18px] lg:w-[362px]"
              onSubmit={(event) => event.preventDefault()}
            >
              <FigmaAsset src="/images/icon-search.svg" alt="" />
              <input
                type="search"
                name="q"
                placeholder="Search by name, skill, or keyword..."
                className="min-w-0 flex-1 bg-transparent font-display text-sm font-medium text-[#0f172a] outline-none placeholder:text-[#64748b]"
                aria-label="Search by name, skill, or keyword"
              />
            </form>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:flex-1 lg:justify-end lg:gap-6">
              {filters.map((label) => (
                <label key={label} className="relative block min-w-0">
                  <span className="sr-only">{label}</span>
                  <select
                    defaultValue={label}
                    className="flex h-[41px] w-full appearance-none items-center rounded-xl border border-[#e5e7eb] bg-[#f9fafb] py-0 pr-10 pl-4 font-sans text-sm leading-none text-[#4b5563] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff] lg:w-[150px]"
                  >
                    <option>{label}</option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
                    <FigmaAsset src="/images/icon-chevron-down.svg" alt="" />
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-[#f3f4f6] pt-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pr-2 font-sans text-sm text-[#6b7280]">Popular:</span>
              {popularTags.map((tag) => (
                <span
                  key={tag.label}
                  className={`rounded px-3 py-1 font-display text-xs font-medium ${
                    tag.active
                      ? "bg-[#eff6ff] text-[#3683ff]"
                      : "border border-[#e5e7eb] bg-[#f9fafb] text-[#0f172a]"
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
            <p className="font-sans text-sm text-[#6b7280]">Showing 248 designers</p>
          </div>
        </div>
      </section>

      <section className="w-full px-5 pb-16 md:px-20 md:pb-[100px]">
        <ul className="mx-auto grid max-w-[1280px] gap-2.5 md:grid-cols-2 xl:grid-cols-3">
          {designers.map((designer) => (
            <li
              key={designer.id}
              className="flex flex-col gap-[18px] rounded-lg bg-white p-6 shadow-[inset_0_0_0_1px_#e5e7eb]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="relative size-20 shrink-0">
                    <Image
                      src="/images/designer-naylia.png"
                      alt=""
                      width={80}
                      height={80}
                      className="size-20 rounded-full"
                    />
                    <span className="absolute right-0 bottom-0 size-5 rounded-full border-[1.67px] border-white bg-[#16a34a]" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-bold text-[#0f172a]">
                      {designer.name}
                    </h2>
                    <p className="mt-1.5 font-display text-sm font-medium text-[#64748b]">
                      {designer.role}
                    </p>
                    <p className="mt-1.5 flex items-center gap-1 font-display text-xs font-bold text-[#0f172a]">
                      <FigmaAsset src="/images/icon-star-gold.svg" alt="" />
                      {designer.rating}
                      <span className="font-medium text-[#64748b]">{designer.reviews}</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f9fafb] shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                  aria-pressed={Boolean(saved[designer.id])}
                  aria-label={saved[designer.id] ? "Remove from saved" : "Save designer"}
                  onClick={() =>
                    setSaved((current) => ({
                      ...current,
                      [designer.id]: !current[designer.id],
                    }))
                  }
                >
                  <FigmaAsset src="/images/icon-heart.svg" alt="" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillTags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`rounded px-3 py-1 font-display text-xs font-medium ${tag.className}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <p className="px-2.5 py-2.5 font-display text-sm leading-[18px] font-medium text-[#0f172a] md:h-[74px]">
                {designer.bio}
              </p>

              <div className="grid grid-cols-2 gap-[18px]">
                <div className="flex h-[63px] flex-col gap-1 rounded-lg bg-[#f9fafb] px-3 py-3">
                  <p className="font-display text-xs leading-[15px] font-medium text-[#64748b]">
                    Total earnings
                  </p>
                  <p className="font-display text-base leading-5 font-bold text-[#0f172a]">
                    {designer.earnings}
                  </p>
                </div>
                <div className="flex h-[63px] flex-col gap-1 rounded-lg bg-[#f9fafb] px-3 py-3">
                  <p className="font-display text-xs leading-[15px] font-medium text-[#64748b]">
                    Avg  Submissions
                  </p>
                  <p className="font-display text-base leading-5 font-bold text-[#16a34a]">
                    {designer.submissions}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-[#e5e7eb] pt-4">
                <p className="font-display text-xs font-medium text-black">{designer.projects}</p>
                <Button
                  href="#"
                  variant="ghost"
                  size="lg"
                  justify="between"
                  iconPosition="end"
                  icon={<FigmaAsset src="/images/icon-arrow-up-right.svg" alt="" />}
                  className="w-[161px] shrink-0"
                >
                  View Profile
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <nav
          className="mt-6 flex items-center justify-center gap-1"
          aria-label="Designer results pages"
        >
          <span className="inline-flex size-10">
            <FigmaAsset
              src="/images/designer-page-prev.png"
              alt="Previous page"
              className="size-10"
            />
          </span>
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#7b61ff] text-[9px] font-medium text-white shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]">
            1
          </span>
          <span className="inline-flex size-10 items-center justify-center rounded-full border border-[#e5e7eb] text-[9px] font-medium text-[#0f172a] shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]">
            2
          </span>
          <span className="inline-flex size-10 items-center justify-center rounded-full border border-[#e5e7eb] text-[9px] font-medium text-[#0f172a] shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]">
            3
          </span>
          <FigmaAsset
            src="/images/designer-page-ellipsis.png"
            alt=""
            className="size-10"
          />
          <span className="inline-flex size-10">
            <FigmaAsset
              src="/images/designer-page-next.png"
              alt="Next page"
              className="size-10"
            />
          </span>
        </nav>
      </section>
    </main>
  );
}
