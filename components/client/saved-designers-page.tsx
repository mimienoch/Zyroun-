"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";
import { ClientSidebar } from "./client-sidebar";
import {
  savedDesignerCategories,
  savedDesignersSeed,
  type SavedCategory,
  type SavedDesigner,
} from "./saved-designers-data";

type CategoryFilter = "All Categories" | SavedCategory;

function profileHref(designer: SavedDesigner) {
  return `/designers/${designer.slug}?from=saved`;
}

function SavedDesignerCard({
  designer,
  onUnsave,
}: {
  designer: SavedDesigner;
  onUnsave: (id: string) => void;
}) {
  const href = profileHref(designer);
  return (
    <article className="relative flex flex-col rounded-3xl border border-[#f3f4f6] bg-white p-6 shadow-[0px_8px_30px_rgba(0,0,0,0.04)]">
      <button
        type="button"
        aria-pressed="true"
        aria-label={`Remove ${designer.name} from saved designers`}
        onClick={() => onUnsave(designer.id)}
        className="absolute top-6 right-6 inline-flex size-10 items-center justify-center rounded-full bg-[#fef2f2] text-[#ef4444] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
      >
        <svg width="18" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 20s-7-4.4-9-8.2C1.4 8.7 3.2 5 7 5c2 0 3.2 1 5 3 1.8-2 3-3 5-3 3.8 0 5.6 3.7 4 6.8-2 3.8-9 8.2-9 8.2Z" />
        </svg>
      </button>

      <div className="flex items-start gap-[16px] pr-12">
        <div className="relative mt-2 size-14 shrink-0">
          <Image
            src={designer.avatar}
            alt=""
            width={56}
            height={56}
            className="size-14 rounded-full object-cover"
          />
          <span
            className={`absolute right-0 bottom-0 size-3.5 rounded-full border-2 border-white ${
              designer.online ? "bg-[#22c55e]" : "bg-[#d1d5db]"
            }`}
          />
          <span className="sr-only">{designer.online ? "Online" : "Offline"}</span>
        </div>
        <div>
          <h2 className="font-sans text-lg font-bold leading-7 text-[#111827]">{designer.name}</h2>
          <p className="font-sans text-sm leading-5 text-[#4b5563]">{designer.role}</p>
          <p className="mt-1 flex items-center gap-1 font-sans text-sm leading-5">
            <FigmaAsset src="/images/icon-star-gold.svg" alt="" />
            <span className="font-medium text-[#111827]">{designer.rating.toFixed(1)}</span>
            <span className="text-[#9ca3af]">({designer.reviews} reviews)</span>
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {designer.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-[#7b61ff]/10 px-3 py-1 font-sans text-xs font-medium text-[#7b61ff]"
          >
            {tag}
          </li>
        ))}
      </ul>

      <p className="mt-4 line-clamp-2 font-sans text-sm leading-[22.75px] text-[#4b5563]">{designer.bio}</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {designer.portfolio.map((item) => (
          <Link
            key={item.src}
            href={href}
            className="overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
          >
            <Image src={item.src} alt={item.alt} width={148} height={64} className="h-16 w-full object-cover" />
          </Link>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#f3f4f6] pt-4">
        <div>
          <p className="font-sans text-xs font-semibold tracking-[0.6px] text-[#4b5563] uppercase">Starting at</p>
          <p className="font-sans text-xl font-bold leading-7 text-[#111827]">
            ${designer.hourly}
            <span className="ml-0.5 text-sm font-normal text-[#9ca3af]">/hr</span>
          </p>
        </div>
        <Button href={href} size="sm" className="w-[128px]">
          View Profile
        </Button>
      </div>
    </article>
  );
}

export function SavedDesignersPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(savedDesignersSeed);
  const [category, setCategory] = useState<CategoryFilter>("All Categories");
  const [undo, setUndo] = useState<SavedDesigner | null>(null);

  const visible = useMemo(() => {
    if (category === "All Categories") return saved;
    return saved.filter((item) => item.category === category);
  }, [saved, category]);

  function goBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/projects");
  }

  function unsave(id: string) {
    const removed = saved.find((item) => item.id === id);
    setSaved((current) => current.filter((item) => item.id !== id));
    setUndo(removed ?? null);
  }

  function restore() {
    if (!undo) return;
    setSaved((current) => {
      if (current.some((item) => item.id === undo.id)) return current;
      const next = [...current, undo];
      return savedDesignersSeed.filter((item) => next.some((entry) => entry.id === item.id));
    });
    setUndo(null);
  }

  const countLabel =
    visible.length === 1 ? "Showing 1 saved designer" : `Showing ${visible.length} saved designers`;

  return (
    <div className="flex min-h-0 w-full bg-[#f8fafc] lg:flex-row lg:items-stretch">
      <ClientSidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden bg-[#f8fafc]">
        <div className="px-5 py-8 sm:px-12">
          <div className="flex items-start gap-5">
            <button
              type="button"
              aria-label="Go back"
              onClick={goBack}
              className="mt-2 text-[#4b5563] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
            >
              <svg width="17" height="16" viewBox="0 0 18 16" fill="none" aria-hidden>
                <path d="M7 1 1 8l6 7M1 8h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div>
              <h1 className="font-sans text-3xl font-bold leading-9 text-[#111827]">Your Saved Talent</h1>
              <p className="mt-1 max-w-[645px] font-sans text-base leading-7 text-[#6b7280]">
                Review and manage the exceptional UI/UX designers, brand strategists, and web developers you&apos;ve
                bookmarked for future projects.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#f3f4f6] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-sans text-sm text-[#4b5563]">Filter by:</p>
              <label className="sr-only" htmlFor="saved-category">
                Category
              </label>
              <select
                id="saved-category"
                value={category}
                onChange={(event) => setCategory(event.target.value as CategoryFilter)}
                className="h-[37px] rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-4 font-sans text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
              >
                {savedDesignerCategories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <p className="font-sans text-sm text-[#6b7280]">{countLabel}</p>
          </div>

          {undo ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3">
              <p className="font-sans text-sm text-[#4b5563]">
                {undo.name} was removed from this list. Changes stay in this session only.
              </p>
              <button
                type="button"
                onClick={restore}
                className="font-sans text-sm font-medium text-[#7b61ff] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
              >
                Undo
              </button>
            </div>
          ) : null}

          {visible.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-[#f3f4f6] bg-white px-6 py-16 text-center shadow-[0px_8px_30px_rgba(0,0,0,0.04)]">
              <p className="font-sans text-lg font-semibold text-[#111827]">
                {saved.length === 0 ? "No saved designers yet." : "No saved designers match this category."}
              </p>
              <p className="mt-2 font-sans text-sm text-[#6b7280]">
                {saved.length === 0
                  ? "Browse the marketplace and bookmark talent for later."
                  : "Try All Categories, or browse the marketplace for more talent."}
              </p>
              <Button href="/designers" size="sm" className="mt-5">
                Browse designers
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {visible.map((designer) => (
                <SavedDesignerCard key={designer.id} designer={designer} onUnsave={unsave} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
