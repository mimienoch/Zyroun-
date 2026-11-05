"use client";

import { useMemo, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Icon } from "../ui/icon";
import { Pagination } from "../ui/pagination";
import { SearchBar } from "../ui/search-bar";
import { Tag } from "../ui/tag";
import { DashboardArticleCard } from "./dashboard-article-card";
import { DesignerAppFooter } from "./designer-app-footer";
import { DesignerSidebar } from "./designer-sidebar";

const categories = [
  { label: "UI/UX Design", count: "245" },
  { label: "Brand Identity", count: "182" },
  { label: "Web Design", count: "304" },
  { label: "Illustration", count: "95" },
];

const tabs = [
  { id: "matches", label: "Best Matches" },
  { id: "recent", label: "Most Recent" },
  { id: "saved", label: "Saved Jobs" },
] as const;

type TabId = (typeof tabs)[number]["id"];
type Payment = "guaranteed" | "participation" | null;

export function BrowseJobsPage() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["UI/UX Design"]);
  const [payment, setPayment] = useState<Payment>("guaranteed");
  const [minBudget, setMinBudget] = useState("$500");
  const [maxBudget, setMaxBudget] = useState("$5k+");
  const [tab, setTab] = useState<TabId>("matches");
  const [sort, setSort] = useState("budget");
  const [page, setPage] = useState(1);
  const [saved, setSaved] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });

  const chips = [
    ...selectedCategories.map((label) => ({ id: `cat-${label}`, label, kind: "category" as const })),
    ...(payment === "guaranteed"
      ? [{ id: "pay-guaranteed", label: "Guaranteed Payment", kind: "payment" as const }]
      : []),
    ...(payment === "participation"
      ? [{ id: "pay-participation", label: "Participation Paid", kind: "payment" as const }]
      : []),
  ];

  const cards = useMemo(() => {
    const keys = [0, 1, 2];
    if (tab === "saved") return keys.filter((key) => saved[key]);
    const listed = tab === "recent" ? [...keys].reverse() : keys;
    return listed;
  }, [tab, saved]);

  function toggleCategory(label: string) {
    setSelectedCategories((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  }

  function resetFilters() {
    setQuery("");
    setSelectedCategories([]);
    setPayment(null);
    setMinBudget("$500");
    setMaxBudget("$5k+");
  }

  function removeChip(id: string) {
    if (id.startsWith("cat-")) {
      toggleCategory(id.slice(4));
      return;
    }
    setPayment(null);
  }

  return (
    <div className="flex min-h-0 w-full flex-col bg-n-100 lg:flex-row">
      <DesignerSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-w-0 flex-1 px-5 py-10 md:px-10">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
            <aside className="w-full shrink-0 rounded-lg border border-[#f1f5f9] bg-white px-6 pt-6 pb-12 xl:w-[290px]">
              <div className="flex items-center justify-between gap-4">
                <h1 className="font-display text-lg font-bold text-[#1c1b3a]">Filters</h1>
                <button
                  type="button"
                  className="font-display text-sm font-semibold text-z-300"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
              <SearchBar
                className="mt-6 w-full"
                placeholder="Search keywords"
                aria-label="Search keywords"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
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
                        name="payment-structure"
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
              {chips.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <p className="pr-2 font-sans text-sm font-medium text-n-500">Active Filters:</p>
                  {chips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => removeChip(chip.id)}
                      aria-label={`Remove ${chip.label} filter`}
                    >
                      <Tag
                        type="category"
                        className="border border-z-200 text-z-400"
                        trailing={<Icon name="x" className="size-[11px] text-z-400" />}
                      >
                        {chip.label}
                      </Tag>
                    </button>
                  ))}
                  <button
                    type="button"
                    className="font-display text-xs font-medium text-z-300"
                    onClick={resetFilters}
                  >
                    Clear All
                  </button>
                </div>
              ) : (
                <p className="font-sans text-sm font-medium text-n-500">Active Filters: none</p>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl font-bold text-[#1c1b3a]">Recommended for you</h2>
                <label className="flex items-center gap-2">
                  <span className="font-display text-sm font-medium text-n-500">Sort by:</span>
                  <span className="relative">
                    <select
                      value={sort}
                      onChange={(event) => setSort(event.target.value)}
                      className="h-[41px] w-[175px] appearance-none rounded-input border border-n-300 bg-n-100 py-3.5 pr-10 pl-4 font-sans text-sm text-n-500 outline-none focus-visible:border-z-300"
                    >
                      <option value="budget">Highest Budget</option>
                    </select>
                    <Icon
                      name="chevron-down"
                      className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-n-500"
                    />
                  </span>
                </label>
              </div>

              <div className="mt-6 flex gap-4 overflow-x-auto border-b border-n-300" role="tablist" aria-label="Job lists">
                {tabs.map((item) => {
                  const current = tab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={current}
                      className={`h-11 shrink-0 px-2.5 font-sans text-sm ${
                        current ? "border-b border-z-300 font-medium text-z-300" : "font-normal text-black"
                      }`}
                      onClick={() => setTab(item.id)}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-8">
                {cards.length === 0 ? (
                  <p className="rounded-lg border border-n-300 bg-white p-6 font-sans text-sm text-n-500">
                    No saved jobs yet. Use the heart on a listing to keep it here.
                  </p>
                ) : (
                  cards.map((key) => (
                    <DashboardArticleCard
                      key={`${tab}-${key}`}
                      saved={Boolean(saved[key])}
                      onToggleSave={() => setSaved((current) => ({ ...current, [key]: !current[key] }))}
                    />
                  ))
                )}
              </div>

              <div className="mt-8 flex flex-col items-center justify-between gap-4 bg-n-100 px-4 py-4 sm:flex-row">
                <p className="font-sans text-sm text-black">
                  Showing {cards.length} of 10 results
                </p>
                <Pagination
                  page={page}
                  pageCount={4}
                  onPageChange={setPage}
                  className="bg-transparent p-0"
                />
              </div>
            </section>
          </div>
        </main>
        <DesignerAppFooter />
      </div>
    </div>
  );
}
