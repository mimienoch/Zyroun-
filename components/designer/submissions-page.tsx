"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";
import { Icon } from "../ui/icon";
import { SearchBar } from "../ui/search-bar";
import { DesignerAppFooter } from "./designer-app-footer";
import { DesignerSidebar } from "./designer-sidebar";
import { UnavailableControl } from "./unavailable";

type Status = "winner" | "open" | "draft" | "rejected" | "closed" | "viewed";
type Tab = "all" | "active" | "feedback" | "completed";
type SortKey = "default" | "newest" | "oldest" | "prize";

type Submission = {
  id: string;
  title: string;
  contestBy: string;
  status: Status;
  prize: string;
  prizeValue: number;
  submittedLabel: string;
  submittedLong: string;
  submittedAt: number;
  messageCount: number;
  revisions: number;
  verified: boolean;
  image: string;
  href?: string;
};

const submissions: Submission[] = [
  {
    id: "winner",
    title: "Fintech App Redesign",
    contestBy: "Contest by Nexus Financial",
    status: "winner",
    prize: "$5,500",
    prizeValue: 5500,
    submittedLabel: "Submitted: Oct 24",
    submittedLong: "Submitted Oct 24, 2023",
    submittedAt: 20231024,
    messageCount: 5,
    revisions: 2,
    verified: true,
    image: "/images/category-uiux.png",
    href: "/jobs/nexus-banking",
  },
  {
    id: "open",
    title: "Mobile Banking UI Redesign",
    contestBy: "Contest by FinanceApp",
    status: "open",
    prize: "$50",
    prizeValue: 50,
    submittedLabel: "Submitted: Oct 20",
    submittedLong: "Submitted Oct 20, 2023",
    submittedAt: 20231020,
    messageCount: 2,
    revisions: 0,
    verified: true,
    image: "/images/category-uiux.png",
  },
  {
    id: "rejected",
    title: "Marketing Website Redesign",
    contestBy: "Contest by David Smith",
    status: "rejected",
    prize: "$1,500",
    prizeValue: 1500,
    submittedLabel: "Submitted: Oct 10",
    submittedLong: "Submitted Oct 10, 2023",
    submittedAt: 20231010,
    messageCount: 0,
    revisions: 1,
    verified: false,
    image: "/images/category-branding.png",
  },
  {
    id: "closed",
    title: "Fintech App Redesign",
    contestBy: "Contest by Nexus Financial",
    status: "closed",
    prize: "$5,500",
    prizeValue: 5500,
    submittedLabel: "Submitted: Oct 24",
    submittedLong: "Submitted Oct 24, 2023",
    submittedAt: 20231024,
    messageCount: 0,
    revisions: 1,
    verified: true,
    image: "/images/category-uiux.png",
    href: "/jobs/nexus-banking",
  },
  {
    id: "draft",
    title: "Healthcare App Wireframes",
    contestBy: "Contest by MediCare Plus",
    status: "draft",
    prize: "$3,200",
    prizeValue: 3200,
    submittedLabel: "Submitted: Not yet",
    submittedLong: "Not yet submitted",
    submittedAt: 0,
    messageCount: 0,
    revisions: 0,
    verified: false,
    image: "/images/category-uiux.png",
  },
  {
    id: "viewed",
    title: "E-commerce Brand Identity",
    contestBy: "Contest by Aura Wellness",
    status: "viewed",
    prize: "$2,800",
    prizeValue: 2800,
    submittedLabel: "Submitted: Oct 20",
    submittedLong: "Submitted Oct 20, 2023",
    submittedAt: 20231020,
    messageCount: 0,
    revisions: 0,
    verified: true,
    image: "/images/category-branding.png",
  },
];

const statusStyle: Record<
  Status,
  { label: string; badge: string; card: string; tab: Tab[]; muted?: boolean }
> = {
  winner: {
    label: "Winner Selected",
    badge: "bg-gradient-to-r from-z-300 to-z-cyan text-white",
    card: "border-transparent bg-white",
    tab: ["completed"],
  },
  open: {
    label: "Open",
    badge: "bg-[#16a34a] text-[#f0fdf4]",
    card: "border-[#bbf7d0] bg-[linear-gradient(180deg,#f0fdf4_0%,#ffffff_72%)]",
    tab: ["active"],
  },
  draft: {
    label: "Draft",
    badge: "bg-[#3683ff] text-[#eff6ff]",
    card: "border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_72%)]",
    tab: ["active"],
  },
  rejected: {
    label: "Rejected",
    badge: "bg-[#ff0000] text-white",
    card: "border-[#fecaca] bg-[#ffeded]",
    tab: ["completed"],
  },
  closed: {
    label: "Closed",
    badge: "bg-[#5e6366] text-white",
    card: "border-[#dde2e5] bg-[linear-gradient(180deg,#faf5ff_0%,#ffffff_72%)]",
    tab: ["completed"],
    muted: true,
  },
  viewed: {
    label: "Viewed",
    badge: "bg-[#14b8a6] text-white",
    card: "border-[#99f6e4] bg-[linear-gradient(180deg,#f0fdfa_0%,#ffffff_72%)]",
    tab: ["active", "feedback"],
  },
};

const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "All Submissions" },
  { id: "active", label: "Active Contests" },
  { id: "feedback", label: "Awaiting Feedback" },
  { id: "completed", label: "Completed" },
];

const allStatuses = Object.keys(statusStyle) as Status[];

export function SubmissionsPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ winner: true });
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Status[]>(allStatuses);
  const [sort, setSort] = useState<SortKey>("default");
  const [page, setPage] = useState(1);
  const filterId = useId();
  const filterRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = submissions.filter((item) => {
      if (tab !== "all" && !statusStyle[item.status].tab.includes(tab)) return false;
      if (!statusFilter.includes(item.status)) return false;
      if (
        q &&
        !`${item.title} ${item.contestBy} ${statusStyle[item.status].label}`.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
    if (sort !== "default") {
      rows.sort((a, b) => {
        if (sort === "prize") return b.prizeValue - a.prizeValue;
        if (sort === "oldest") return a.submittedAt - b.submittedAt;
        return b.submittedAt - a.submittedAt;
      });
    }
    return rows;
  }, [tab, query, statusFilter, sort]);

  const pageCount = 3;
  const visible = page === 1 ? filtered : [];

  const filtersActive =
    query.trim().length > 0 || statusFilter.length !== allStatuses.length || sort !== "default" || tab !== "all";

  function clearFilters() {
    setQuery("");
    setTab("all");
    setStatusFilter(allStatuses);
    setSort("default");
    setPage(1);
  }

  function toggleStatus(status: Status) {
    setStatusFilter((current) =>
      current.includes(status) ? current.filter((item) => item !== status) : [...current, status],
    );
  }

  useEffect(() => {
    if (!filterOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFilterOpen(false);
        filterButtonRef.current?.focus();
      }
    };
    const onPointer = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        !filterButtonRef.current?.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [filterOpen]);

  const left = visible.filter((item) => item.status === "winner" || item.status === "open");
  const right = visible.filter((item) => item.status !== "winner" && item.status !== "open");
  const stacked = sort !== "default" || tab !== "all" || query.trim().length > 0 || statusFilter.length !== allStatuses.length;

  return (
    <div className="flex w-full flex-col bg-white lg:flex-row lg:items-start">
      <DesignerSidebar />
      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <main className="flex min-h-[1169px] min-w-0 flex-col bg-[#f8fafc]">
          <header className="flex min-h-24 flex-col justify-center gap-4 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-0">
            <h1 className="font-sans text-xl font-semibold leading-7 text-[#1e293b]">Submissions</h1>
            <SearchBar
              className="w-full sm:w-[240px]"
              placeholder="Search submissions..."
              aria-label="Search submissions"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </header>

          <div className="relative flex min-h-[63px] items-center justify-between gap-4 overflow-x-auto border-b border-[#e5e7eb] bg-[#f8fafc] px-5 sm:px-10">
            <div className="flex gap-4" role="tablist" aria-label="Submission filters">
              {tabs.map((item) => {
                const current = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={current}
                    onClick={() => {
                      setTab(item.id);
                      setPage(1);
                    }}
                    className={`h-[62px] shrink-0 px-2.5 font-sans text-sm ${
                      current ? "border-b border-z-300 font-medium text-z-300" : "font-normal text-black"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="relative shrink-0">
              <button
                ref={filterButtonRef}
                type="button"
                className="flex size-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#0f172a] shadow-[0_2px_3.5px_rgba(0,0,0,0.1)]"
                aria-expanded={filterOpen}
                aria-controls={filterId}
                aria-haspopup="dialog"
                aria-label="Open filters"
                onClick={() => setFilterOpen((open) => !open)}
              >
                <Icon name="sliders" className="size-4" />
              </button>
              {filterOpen ? (
                <div
                  ref={filterRef}
                  id={filterId}
                  role="dialog"
                  aria-label="Filter submissions"
                  className="absolute top-12 right-0 z-20 w-[min(280px,calc(100vw-2.5rem))] rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.18)]"
                >
                  <p className="font-sans text-sm font-semibold text-[#1e293b]">Status</p>
                  <ul className="mt-2 flex flex-col gap-2">
                    {allStatuses.map((status) => (
                      <li key={status}>
                        <label className="flex items-center gap-2 font-sans text-sm text-[#475569]">
                          <input
                            type="checkbox"
                            checked={statusFilter.includes(status)}
                            onChange={() => toggleStatus(status)}
                          />
                          {statusStyle[status].label}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <label className="mt-4 block font-sans text-sm font-semibold text-[#1e293b]" htmlFor={`${filterId}-sort`}>
                    Sort
                  </label>
                  <select
                    id={`${filterId}-sort`}
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortKey)}
                    className="mt-2 h-9 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 font-sans text-sm text-[#1e293b]"
                  >
                    <option value="default">Design order</option>
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="prize">Highest prize</option>
                  </select>
                  <button type="button" className="mt-3 font-sans text-sm font-medium text-z-300" onClick={clearFilters}>
                    Clear filters
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex min-h-[837px] flex-col px-5 py-6 sm:px-8">
            {visible.length === 0 ? (
              <div className="rounded-xl border border-[#e2e8f0] bg-white px-6 py-16 text-center">
                <p className="font-sans text-base font-semibold text-[#1e293b]">
                  {page > 1
                    ? "No more submissions on this page."
                    : "No submissions match these filters."}
                </p>
                <p className="mt-2 font-sans text-sm text-[#64748b]">
                  {page > 1
                    ? "This pagination is local demo data only."
                    : "Try another tab, search term, or status."}
                </p>
                {filtersActive ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 h-10 rounded-lg bg-[#9b82f3] px-4 font-sans text-sm font-medium text-white"
                  >
                    Clear filters
                  </button>
                ) : null}
              </div>
            ) : stacked ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {visible.map((item) => (
                  <SubmissionCard
                    key={item.id}
                    item={item}
                    open={Boolean(expanded[item.id])}
                    onToggle={() => setExpanded((current) => ({ ...current, [item.id]: !current[item.id] }))}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-[37px]">
                <div className="flex min-w-0 flex-1 flex-col gap-6">
                  {left.map((item) => (
                    <SubmissionCard
                      key={item.id}
                      item={item}
                      open={Boolean(expanded[item.id])}
                      onToggle={() => setExpanded((current) => ({ ...current, [item.id]: !current[item.id] }))}
                    />
                  ))}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-6">
                  {right.map((item) => (
                    <SubmissionCard
                      key={item.id}
                      item={item}
                      open={Boolean(expanded[item.id])}
                      onToggle={() => setExpanded((current) => ({ ...current, [item.id]: !current[item.id] }))}
                    />
                  ))}
                </div>
              </div>
            )}
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
              <PageButton
                key={value}
                label={`Page ${value}`}
                active={page === value}
                onClick={() => setPage(value)}
              >
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

function SubmissionCard({
  item,
  open,
  onToggle,
}: {
  item: Submission;
  open: boolean;
  onToggle: () => void;
}) {
  const style = statusStyle[item.status];
  const panelId = `submission-panel-${item.id}`;

  return (
    <article
      className={`overflow-hidden rounded-xl border shadow-[0px_1px_2px_rgba(0,0,0,0.05)] ${style.card} ${
        open ? "bg-white" : ""
      }`}
    >
      {open ? (
        <div className="relative bg-[#f3f4f6]">
          <FigmaAsset src={item.image} alt="" className="h-[220px] w-full object-cover sm:h-[366px]" />
          <span
            className={`absolute top-3 right-3 rounded px-3 py-1.5 font-sans text-xs font-medium shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${style.badge}`}
          >
            {style.label}
          </span>
        </div>
      ) : null}

      <div className={open ? "px-5 pt-0 pb-3" : "p-6"}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {open ? null : (
              <span className={`inline-flex h-6 items-center rounded px-3 font-sans text-xs font-medium ${style.badge}`}>
                {style.label}
              </span>
            )}
            <h2 className={`font-sans font-semibold text-[#1e293b] ${open ? "text-base leading-6" : "mt-2 text-lg leading-7"}`}>
              {item.href ? (
                <Link href={item.href} className="hover:underline">
                  {item.title}
                </Link>
              ) : (
                item.title
              )}
            </h2>
            <p className="mt-1 font-sans text-sm text-[#64748b]">{open ? item.submittedLong : item.contestBy}</p>
          </div>
          <button
            type="button"
            className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md text-[#64748b]"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? `Collapse ${item.title}` : `Expand ${item.title}`}
            onClick={onToggle}
          >
            <Icon name="chevron-down" className={`size-4 ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        {open ? (
          <div id={panelId} className="mt-3">
            <div className="flex flex-wrap items-center gap-3">
              {item.verified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#dcfce7] px-2.5 py-1 font-sans text-xs font-semibold text-[#15803d]">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M1.5 5.2 3.8 7.4 8.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  File Verified
                </span>
              ) : (
                <span className="font-sans text-xs text-[#64748b]">Not submitted</span>
              )}
              <span className="inline-flex items-center gap-1 font-sans text-xs text-[#64748b]">
                {item.revisions} revisions
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="font-sans text-sm text-[#64748b]">Prize Amount</p>
              <p className="font-sans text-sm font-medium text-[#1e293b]">{item.prize}</p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="font-sans text-sm text-[#64748b]">Feedback</p>
              <Link href="/messages" className="font-sans text-sm font-medium text-[#9b82f3]">
                {item.messageCount} messages
              </Link>
            </div>
            <div className="mt-4">
              {item.href ? (
                <Button href={item.href} variant="outline" size="sm" className="w-[124px]">
                  View Project
                </Button>
              ) : item.status === "draft" ? (
                <UnavailableControl
                  reason="This draft has no connected editor yet"
                  className="inline-flex h-10 items-center rounded-full bg-[#9b82f3] px-4 font-sans text-sm font-medium text-white"
                >
                  Continue draft
                </UnavailableControl>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="font-sans text-sm font-medium text-[#1e293b]">Prize: {item.prize}</p>
            <p className="font-sans text-sm text-[#64748b]">{item.submittedLabel}</p>
            {style.muted ? (
              <span className="ml-auto font-sans text-sm font-medium text-[#5e6366]">{item.messageCount} messages</span>
            ) : (
              <Link href="/messages" className="ml-auto font-sans text-sm font-medium text-[#9b82f3]">
                {item.messageCount} messages
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
