"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../button";
import { Progress } from "../ui/progress";
import { SearchBar } from "../ui/search-bar";
import { DashboardArticleCard } from "./dashboard-article-card";
import { DesignerAppFooter } from "./designer-app-footer";
import { DesignerSidebar } from "./designer-sidebar";
import { UnavailableControl } from "./unavailable";

const kpis = [
  {
    label: "Total Earnings",
    value: "$12,450",
    iconClass: "bg-[#f0fdf4] text-[#22c55e]",
    icon: (
      <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" aria-hidden>
        <path d="M5.6 6.7c1.7-.3 2.8-1.2 2.8-2.6C8.4 2.3 6.7 1.4 4.8 1.4 3 1.4 1.4 2.2 1.2 4H0c.2-2.8 2.4-4.4 4.8-4.5V0h1.2v-.1c2.6.1 4.4 1.6 4.4 3.9 0 2.1-1.5 3.4-3.6 3.9v.3c2.4.4 4 1.7 4 4 0 2.5-2.1 4.3-5 4.5V16H4.6v-.1C2 15.7 0 14 0 11.2h1.2c.2 1.8 1.7 2.7 3.4 2.8V8.1C2.8 7.8 1.4 6.7 1.4 5c0-1.5 1.1-2.6 2.8-2.8v4.5Z" />
      </svg>
    ),
    footer: (
      <p className="flex items-center font-sans text-sm">
        <span className="inline-flex items-center gap-1 font-medium text-[#22c55e]">
          <svg width="9" height="12" viewBox="0 0 9 12" fill="currentColor" aria-hidden>
            <path d="M4.5 0 9 7H0L4.5 0Zm0 12L0 5h9l-4.5 7Z" opacity="0" />
            <path d="M4.5 1.2 8.2 10H.8L4.5 1.2Z" />
          </svg>
          12.5%
        </span>
        <span className="ml-2 text-[#9ca3af]">vs last month</span>
      </p>
    ),
  },
  {
    label: "Submissions",
    value: "44",
    iconClass: "bg-[#eff6ff] text-z-300",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M3 1.5h6.2L14 6.3V14.5H3V1.5Zm6 .7V6h3.8L9 2.2Z" />
      </svg>
    ),
    footer: <p className="font-sans text-xs leading-4 text-[#9ca3af]/90">Site average: 105</p>,
  },
  {
    label: "Profile Views",
    value: "1,240",
    iconClass: "bg-[#faf5ff] text-z-300",
    icon: (
      <svg width="18" height="16" viewBox="0 0 18 16" fill="currentColor" aria-hidden>
        <path d="M9 2.5c3.4 0 6.3 2.1 8 6-1.7 3.9-4.6 6-8 6s-6.3-2.1-8-6c1.7-3.9 4.6-6 8-6Zm0 2.2A3.3 3.3 0 1 0 12.3 8 3.3 3.3 0 0 0 9 4.7Z" />
      </svg>
    ),
    footer: (
      <p className="flex items-center font-sans text-sm">
        <span className="inline-flex items-center gap-1 font-medium text-[#22c55e]">
          <svg width="9" height="12" viewBox="0 0 9 12" fill="currentColor" aria-hidden>
            <path d="M4.5 1.2 8.2 10H.8L4.5 1.2Z" />
          </svg>
          8.2%
        </span>
        <span className="ml-2 text-[#9ca3af]">vs last month</span>
      </p>
    ),
  },
];

const tabs = [
  { id: "matches", label: "Best Matches" },
  { id: "recent", label: "Most Recent" },
  { id: "saved", label: "Saved Jobs" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function DashboardPage({ children }: { children?: React.ReactNode }) {
  const [tab, setTab] = useState<TabId>("matches");
  const [saved, setSaved] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });
  const cards = tab === "saved" ? [0, 1, 2].filter((key) => saved[key]) : [0, 1, 2];

  return (
    <div className="flex min-h-0 w-full flex-col bg-n-100 lg:flex-row">
      <DesignerSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-w-0 flex-1 px-5 pt-10 pb-8 md:px-10">
          {children}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h1 className="font-sans text-2xl leading-8 font-bold text-[#1a1a1a]">Dashboard Overview</h1>
              <p className="mt-1 font-sans text-sm leading-5 text-[#6b7280]">
                Welcome back, Alex. Here&apos;s what&apos;s happening today.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <SearchBar
                className="w-full max-w-[258px] sm:w-[258px]"
                placeholder="Search projects..."
                aria-label="Search projects"
              />
              <UnavailableControl
                reason="Portfolio posting is not connected"
                className="inline-flex h-10 items-center gap-2.5 rounded-button bg-z-300 px-4 font-display text-xs font-bold text-white shadow-button"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 3.3v9.4M3.3 8h9.4" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
                </svg>
                Post Portfolio
              </UnavailableControl>
            </div>
          </div>

          <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-[#f3f4f6] bg-white p-6 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-sans text-sm font-medium leading-5 text-[#6b7280]">{item.label}</p>
                    <p className="mt-1 font-sans text-2xl leading-8 font-bold text-[#1a1a1a]">{item.value}</p>
                  </div>
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}>
                    {item.icon}
                  </span>
                </div>
                <div className="mt-4">{item.footer}</div>
              </article>
            ))}
            <article className="relative overflow-hidden rounded-2xl border border-[#f3f4f6] bg-white px-6 pt-6 pb-7 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-sm font-medium leading-5 text-[#6b7280]">Profile Completeness</p>
                  <p className="mt-1 font-sans text-2xl leading-8 font-bold text-[#1a1a1a]">85%</p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f1fdfe] text-[#57a9ff]">
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" aria-hidden>
                    <path d="M10 8a3.2 3.2 0 1 0-3.2-3.2A3.2 3.2 0 0 0 10 8Zm0 1.6c-3.2 0-6 1.6-6 4.2V16h12v-2.2c0-2.6-2.8-4.2-6-4.2Z" />
                  </svg>
                </span>
              </div>
              <Progress value={85} className="mt-4 h-1.5 bg-[#f3f4f6]" />
            </article>
          </section>

          <div className="mt-8 flex items-center justify-between gap-4 pt-2">
            <h2 className="font-display text-xl leading-7 font-bold text-[#1c1b3a]">Recommended for you</h2>
            <Link href="/jobs" className="shrink-0 font-display text-sm leading-[18px] font-bold text-[#334155]">
              See all Jobs
            </Link>
          </div>

          <div className="mt-8 flex gap-4 overflow-x-auto border-b border-n-300" role="tablist" aria-label="Job lists">
            {tabs.map((item) => {
              const current = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={current}
                  className={`h-11 shrink-0 px-2.5 font-sans text-sm ${
                    current
                      ? "border-b border-z-300 font-medium text-z-300"
                      : "font-normal text-black"
                  }`}
                  onClick={() => setTab(item.id)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-8">
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
            <div className="flex justify-center">
              <Button href="/jobs" variant="outline" size="lg">
                See all Jobs
              </Button>
            </div>
          </div>
        </main>
        <DesignerAppFooter />
      </div>
    </div>
  );
}
