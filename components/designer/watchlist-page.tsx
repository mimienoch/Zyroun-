"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { Icon } from "../ui/icon";
import { SearchBar } from "../ui/search-bar";
import { DashboardArticleCard } from "./dashboard-article-card";
import { DesignerAppFooter } from "./designer-app-footer";
import { DesignerSidebar } from "./designer-sidebar";

const categories = [
  { label: "UI/UX Design", count: "245" },
  { label: "Brand Identity", count: "182" },
  { label: "Web Design", count: "304" },
  { label: "Illustration", count: "95" },
];

type Payment = "guaranteed" | "participation" | null;
type SortKey = "recent" | "deadline" | "budget";

const cardIds = [0, 1, 2, 3];

export function WatchlistPage() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["UI/UX Design"]);
  const [payment, setPayment] = useState<Payment>("guaranteed");
  const [minBudget, setMinBudget] = useState("$500");
  const [maxBudget, setMaxBudget] = useState("$5k+");
  const [sort, setSort] = useState<SortKey>("recent");
  const [page, setPage] = useState(1);
  const [saved, setSaved] = useState<Record<number, boolean>>({ 0: true, 1: true, 2: true, 3: true });

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let list = cardIds.filter((id) => saved[id]);
    if (needle && !`naylia rhamen ui/ux design guaranteed participation`.includes(needle)) {
      list = [];
    }
    if (selectedCategories.length > 0 && !selectedCategories.includes("UI/UX Design")) {
      list = [];
    }
    if (sort === "deadline" || sort === "budget") {
      list = [...list].reverse();
    }
    return list;
  }, [saved, query, selectedCategories, sort]);

  const pageCount = 3;
  const visible = page === 1 ? filtered : [];

  function toggleCategory(label: string) {
    setSelectedCategories((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
    setPage(1);
  }

  function resetFilters() {
    setQuery("");
    setSelectedCategories(["UI/UX Design"]);
    setPayment("guaranteed");
    setMinBudget("$500");
    setMaxBudget("$5k+");
    setPage(1);
  }

  function removeAllSaved() {
    setSaved({ 0: false, 1: false, 2: false, 3: false });
    setPage(1);
  }

  const savedCount = cardIds.filter((id) => saved[id]).length;

  return (
    <div className="flex w-full flex-col bg-[#f8fafc] lg:flex-row lg:items-start">
      <DesignerSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex min-h-[1084px] min-w-0 flex-col bg-[#f8fafc]">
          <header className="flex min-h-24 flex-col justify-center gap-3 border-b border-[#e2e8f0] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-0">
            <div>
              <h1 className="font-sans text-xl font-semibold leading-7 text-[#1e293b]">Watchlist</h1>
              <p className="font-sans text-sm leading-5 text-[#64748b]">Jobs you&apos;ve saved for later</p>
            </div>
            <button
              type="button"
              disabled={savedCount === 0}
              onClick={removeAllSaved}
              aria-label="Remove saved jobs"
              className="inline-flex items-center gap-2 font-sans text-sm text-[#64748b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300 disabled:opacity-40"
            >
              <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden>
                <path
                  d="M1 3.5h11M5 3.5V2.4A1.4 1.4 0 0 1 6.4 1h.2A1.4 1.4 0 0 1 8 2.4V3.5M2.4 3.5 3.1 12a1.2 1.2 0 0 0 1.2 1.1h4.4A1.2 1.2 0 0 0 9.9 12l.7-8.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              Remove Selected
            </button>
          </header>

          <div className="flex min-h-[815px] flex-col px-5 pt-8 pb-0 sm:px-8">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
              <aside className="w-full shrink-0 rounded-lg border border-[#e2e8f0] bg-white px-6 pt-6 pb-12 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] xl:w-64">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-lg font-bold text-[#1c1b3a]">Filters</h2>
                  <button type="button" className="font-display text-sm font-semibold text-z-300" onClick={resetFilters}>
                    Reset
                  </button>
                </div>
                <SearchBar
                  className="mt-6 w-full"
                  placeholder="Search keywords"
                  aria-label="Search keywords"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                />

                <fieldset className="mt-6">
                  <legend className="font-display text-sm font-bold tracking-wide text-n-900 uppercase">
                    Design Category
                  </legend>
                  <ul className="mt-4 flex flex-col gap-3">
                    {categories.map((item) => (
                      <li key={item.label} className="flex h-6 items-center justify-between gap-3">
                        <Checkbox
                          checked={selectedCategories.includes(item.label)}
                          onChange={() => toggleCategory(item.label)}
                          label={item.label}
                        />
                        <span className="rounded-tag bg-[#f1f5f9] px-2 py-1 font-display text-xs font-semibold text-[#94a3b8]">
                          {item.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                </fieldset>

                <div className="mt-6 h-px bg-[#f1f5f9]" />

                <fieldset className="mt-6">
                  <legend className="font-display text-sm font-bold tracking-wide text-n-900 uppercase">
                    Budget Range
                  </legend>
                  <div className="mt-4 flex items-center gap-4">
                    <label className="flex h-[58px] min-w-0 flex-1 flex-col items-center justify-center rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2">
                      <span className="font-display text-xs text-n-500">Min</span>
                      <input
                        value={minBudget}
                        onChange={(event) => setMinBudget(event.target.value)}
                        className="w-full bg-transparent text-center font-display text-sm font-bold text-[#1c1b3a] outline-none"
                      />
                    </label>
                    <span className="font-display text-base text-[#cbd5e1]">-</span>
                    <label className="flex h-[58px] min-w-0 flex-1 flex-col items-center justify-center rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2">
                      <span className="font-display text-xs text-n-500">Max</span>
                      <input
                        value={maxBudget}
                        onChange={(event) => setMaxBudget(event.target.value)}
                        className="w-full bg-transparent text-center font-display text-sm font-bold text-[#1c1b3a] outline-none"
                      />
                    </label>
                  </div>
                </fieldset>

                <div className="mt-6 h-px bg-[#f1f5f9]" />

                <fieldset className="mt-6">
                  <legend className="font-display text-sm font-bold tracking-wide text-n-900 uppercase">
                    Payment Structure
                  </legend>
                  <div className="mt-4 flex flex-col gap-3">
                    {(
                      [
                        { id: "guaranteed", label: "Guaranteed Payment" },
                        { id: "participation", label: "Participation Paid" },
                      ] as const
                    ).map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center gap-3 font-display text-sm font-medium text-[#334155]"
                      >
                        <span
                          className={`inline-flex size-5 items-center justify-center rounded-full border ${
                            payment === item.id ? "border-z-300" : "border-[#cbd5e1]"
                          }`}
                        >
                          {payment === item.id ? <span className="size-2.5 rounded-full bg-z-300" /> : null}
                        </span>
                        <input
                          type="radio"
                          name="watchlist-payment"
                          className="sr-only"
                          checked={payment === item.id}
                          onChange={() => setPayment(item.id)}
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </aside>

              <section className="min-w-0 flex-1">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-sans text-sm leading-5 text-[#64748b]">Showing {filtered.length} saved jobs</p>
                  <label className="flex items-center gap-2 font-sans text-sm text-[#64748b]">
                    Sort by:
                    <select
                      value={sort}
                      onChange={(event) => setSort(event.target.value as SortKey)}
                      className="bg-transparent font-sans text-sm text-[#1e293b] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300"
                    >
                      <option value="recent">Recently Saved</option>
                      <option value="deadline">Deadline</option>
                      <option value="budget">Highest Budget</option>
                    </select>
                  </label>
                </div>

                {visible.length === 0 ? (
                  <div className="rounded-xl border border-[#e2e8f0] bg-white px-6 py-16 text-center">
                    <p className="font-sans text-base font-semibold text-[#1e293b]">
                      {page > 1
                        ? "No more saved jobs on this page."
                        : savedCount === 0
                          ? "Your watchlist is empty."
                          : "No saved jobs match these filters."}
                    </p>
                    <p className="mt-2 font-sans text-sm text-[#64748b]">
                      {page > 1
                        ? "This pagination is local demo data only."
                        : savedCount === 0
                          ? "Save jobs from Browse Jobs to compare them later."
                          : "Try another search, category, or payment filter."}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                      {savedCount > 0 ? (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 font-sans text-sm text-[#1e293b]"
                        >
                          Reset
                        </button>
                      ) : (
                        <Link
                          href="/jobs"
                          className="rounded-lg bg-[#7b61ff] px-4 py-2 font-sans text-sm font-medium text-white"
                        >
                          Browse Jobs
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {visible.map((id) => (
                      <DashboardArticleCard
                        key={id}
                        saved={Boolean(saved[id])}
                        onToggleSave={() =>
                          setSaved((current) => ({ ...current, [id]: !current[id] }))
                        }
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 py-6">
            <PageButton
              label="Previous page"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              <Icon name="chevron-left" className="size-4" />
            </PageButton>
            {[1, 2, 3].map((value) => (
              <PageButton key={value} label={`Page ${value}`} active={page === value} onClick={() => setPage(value)}>
                {value}
              </PageButton>
            ))}
            <span className="inline-flex size-10 items-center justify-center text-[#0f172a]" aria-hidden>
              <Icon name="more-horizontal" className="size-4" />
            </span>
            <PageButton
              label="Next page"
              disabled={page >= pageCount}
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            >
              <Icon name="chevron-right" className="size-4" />
            </PageButton>
          </div>
        </main>
        <DesignerAppFooter />
      </div>
    </div>
  );
}

function PageButton({
  children,
  label,
  active = false,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex size-10 items-center justify-center rounded-full font-sans text-[10px] font-medium shadow-[0_2px_3.5px_rgba(0,0,0,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300 ${
        active
          ? "bg-z-300 text-white"
          : "border border-[#e5e7eb] bg-white text-[#0f172a] disabled:text-[#9ca3af]"
      }`}
    >
      {children}
    </button>
  );
}
