"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";
import { DesignerAppFooter } from "../designer/designer-app-footer";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Icon } from "../ui/icon";
import { Pagination } from "../ui/pagination";
import { Rating } from "../ui/rating";
import { Snackbar } from "../ui/snackbar";
import { ClientSidebar } from "./client-sidebar";
import { clientProjects } from "./client-data";
import {
  briefForProject,
  canSelectWinner,
  discussionNotes,
  recentActivity,
  statusCopy,
  submissionsForProject,
  type ClientSubmission,
  type DesignerLevel,
} from "./client-submissions-data";

type ViewTab = "designs" | "brief" | "discussions";
type RatingFilter = "all" | "45" | "48";
type MyRatingFilter = "all" | "unrated" | "4plus" | "5";
type SortKey = "newest" | "oldest" | "rating";
type Dialog = "preview" | "feedback" | "winner" | null;
type StarValue = 1 | 2 | 3 | 4 | 5;

const PAGE_SIZE = 9;

function Stars({ rating }: { rating: number }) {
  return <Rating value={rating} size="sm" />;
}

function SubmissionStars({
  value,
  onChange,
  disabled,
  label,
}: {
  value: number | null;
  onChange?: (value: StarValue) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <Rating
        value={value ?? 0}
        size="sm"
        disabled={disabled}
        onChange={onChange ? (next) => onChange(next as StarValue) : undefined}
        label={label}
      />
      {value ? <span className="font-sans text-xs text-[#6b7280]">{value}/5</span> : null}
    </span>
  );
}

function DialogShell({
  title,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Close dialog overlay" className="absolute inset-0 bg-[#0f172a]/70" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={`relative max-h-[92vh] w-full overflow-auto rounded-2xl bg-white shadow-[0px_24px_60px_rgba(0,0,0,0.28)] ${
          wide ? "max-w-5xl" : "max-w-lg"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-3">
          <h2 id="dialog-title" className="font-sans text-base font-semibold text-[#111827]">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-lg text-[#6b7280] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 2l8 8M10 2 2 10" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <span className="relative inline-flex min-w-[124px]">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[37px] w-full appearance-none rounded-lg border border-[#d1d5db] bg-[#efefef] py-2 pr-10 pl-5 font-sans text-sm text-black outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
      >
        {children}
      </select>
      <Icon
        name="chevron-down"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#6b7280]"
      />
    </span>
  );
}

function CardOverflowMenu({
  designer,
  onSelectWinner,
  onAward,
  onArchive,
}: {
  designer: string;
  onSelectWinner: () => void;
  onAward: () => void;
  onArchive: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="absolute top-3 right-3 z-10" ref={menuRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`More actions for ${designer}`}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((current) => !current);
        }}
        className="inline-flex size-8 items-center justify-center rounded-full bg-white/95 text-[#111827] shadow-[0_1px_4px_rgba(0,0,0,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
      >
        <Icon name="more-horizontal" className="size-4" />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 mt-1 w-60 rounded-lg border border-[#e5e7eb] bg-white py-1 shadow-[0px_8px_24px_rgba(0,0,0,0.08)]"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onSelectWinner();
            }}
            className="block w-full px-3 py-2 text-left font-sans text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
          >
            Select as winner
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onAward();
            }}
            className="block w-full px-3 py-2 text-left font-sans text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
          >
            Award participation payment
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onArchive();
            }}
            className="block w-full px-3 py-2 text-left font-sans text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
          >
            Archive design
          </button>
        </div>
      ) : null}
    </div>
  );
}

function EditBriefLink() {
  return (
    <Link
      href="/post-project"
      className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#7b61ff] px-5 font-sans text-base text-white focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 20 20 4M9 4h11v11" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      Edit Brief
    </Link>
  );
}

export function ClientSubmissionsPage({ projectId: projectIdProp }: { projectId?: string }) {
  const params = useParams();
  const projectId = projectIdProp ?? String(params.projectId ?? "");
  const project = clientProjects.find((entry) => entry.id === projectId);
  const seeded = useMemo(() => (project ? submissionsForProject(project) : []), [project]);
  const [submissions, setSubmissions] = useState<ClientSubmission[]>(seeded);
  const brief = project ? briefForProject(project) : null;
  const winnerAllowed = project ? canSelectWinner(project.status) : false;
  const presetWinner = seeded.find((item) => item.badge === "Selected" && !winnerAllowed)?.id ?? null;

  const [tab, setTab] = useState<ViewTab>("designs");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const [myRatingFilter, setMyRatingFilter] = useState<MyRatingFilter>("all");
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const [levelFilter, setLevelFilter] = useState<"all" | DesignerLevel>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [myRatings, setMyRatings] = useState<Record<string, StarValue>>({});
  const [checked, setChecked] = useState<string[]>([]);
  const [winnerId, setWinnerId] = useState<string | null>(presetWinner);
  const [dialog, setDialog] = useState<Dialog>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackNotice, setFeedbackNotice] = useState("");
  const [shareNotice, setShareNotice] = useState("");
  const [actionNotice, setActionNotice] = useState("");
  const [awarded, setAwarded] = useState<string[]>([]);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [zoom, setZoom] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSubmissions(seeded);
    setAwarded([]);
    setWinnerId(presetWinner);
    setPage(1);
  }, [seeded, presetWinner]);

  const filtered = useMemo(() => {
    let list = submissions.filter((item) => {
      if (ratingFilter === "45" && item.rating < 4.5) return false;
      if (ratingFilter === "48" && item.rating < 4.8) return false;
      if (levelFilter !== "all" && item.level !== levelFilter) return false;
      const mine = myRatings[item.id];
      if (myRatingFilter === "unrated" && mine) return false;
      if (myRatingFilter === "4plus" && (!mine || mine < 4)) return false;
      if (myRatingFilter === "5" && mine !== 5) return false;
      if (favouritesOnly && !favourites.includes(item.id)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "oldest") return a.createdAt - b.createdAt;
      if (sort === "rating") return b.rating - a.rating;
      return b.createdAt - a.createdAt;
    });
    return list;
  }, [ratingFilter, myRatingFilter, favouritesOnly, favourites, levelFilter, sort, submissions, myRatings]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const active = submissions.find((item) => item.id === activeId) ?? null;
  const activity = showAllActivity ? recentActivity : recentActivity.slice(0, 6);

  useEffect(() => {
    if (!dialog) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (dialog === "feedback" || dialog === "winner") setDialog("preview");
        else closeDialog();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [dialog]);

  function closeDialog() {
    setDialog(null);
    setZoom(1);
    setFeedback("");
    setFeedbackNotice("");
  }

  function openPreview(id: string) {
    setActiveId(id);
    setZoom(1);
    setDialog("preview");
  }

  function resetFilters() {
    setRatingFilter("all");
    setMyRatingFilter("all");
    setFavouritesOnly(false);
    setLevelFilter("all");
    setSort("newest");
    setPage(1);
  }

  function rateSubmission(id: string, value: StarValue) {
    if (!winnerAllowed) return;
    setMyRatings((current) => ({ ...current, [id]: value }));
  }

  function toggleFavourite(id: string) {
    setFavourites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function submitFeedback(event: FormEvent) {
    event.preventDefault();
    if (!active) return;
    if (winnerAllowed && !myRatings[active.id]) {
      setFeedbackNotice("Choose a 1–5 star rating for this design.");
      return;
    }
    if (!feedback.trim()) {
      setFeedbackNotice("Enter feedback before submitting.");
      return;
    }
    setFeedbackNotice("Saved locally for this session. Nothing was sent to a server.");
    setFeedback("");
  }

  async function sharePage() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShareNotice("Link copied");
    } catch {
      setShareNotice(url);
    }
    window.setTimeout(() => setShareNotice(""), 2500);
  }

  function confirmWinner() {
    if (!active || winnerId || !winnerAllowed) return;
    setWinnerId(active.id);
    setDialog("preview");
  }


  function archiveDesign(id: string) {
    const item = submissions.find((entry) => entry.id === id);
    setSubmissions((current) => current.filter((entry) => entry.id !== id));
    setChecked((current) => current.filter((entry) => entry !== id));
    if (activeId === id) closeDialog();
    setActionNotice(
      item
        ? `${item.designer}’s design was archived locally. Nothing was sent to a server.`
        : "Design archived locally.",
    );
  }

  function awardPayment(id: string) {
    const item = submissions.find((entry) => entry.id === id);
    setAwarded((current) => (current.includes(id) ? current : [...current, id]));
    setActionNotice(
      item
        ? `Participation payment for ${item.designer} was recorded locally. Nothing was sent to a server.`
        : "Participation payment recorded locally.",
    );
  }

  if (!project || !brief) {
    return (
      <div className="flex w-full flex-col bg-[#f8f9fa] lg:flex-row lg:items-start">
        <ClientSidebar showNeedDesigner={false} />
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="min-w-0 flex-1 px-8 py-16">
            <h1 className="font-sans text-2xl font-semibold text-[#111827]">Project not found</h1>
            <p className="mt-2 font-sans text-sm text-[#6b7280]">This id is not in the local demo project list.</p>
            <Link href="/projects" className="mt-6 inline-flex font-sans text-sm text-[#7b61ff]">
              Back to My Projects
            </Link>
          </main>
          <DesignerAppFooter />
        </div>
      </div>
    );
  }

  const status = statusCopy[project.status];

  return (
    <div className="flex w-full flex-col bg-[#f8f9fa] lg:flex-row lg:items-start">
      <ClientSidebar showNeedDesigner={false} />
      <div className="flex min-w-0 flex-1 flex-col">
      <main className="min-w-0 flex-1 bg-white">
        <div className="flex flex-col gap-4 border-b border-[#e5e7eb] px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/projects"
              aria-label="Back to projects"
              className="text-[#4b5563] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
            >
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden>
                <path d="M7 1 1 8l6 7M1 8h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Link>
            <div>
              <h1 className="font-sans text-3xl font-semibold leading-9 text-[#111827]">{project.title}</h1>
              <p className="mt-1 font-sans text-base text-[#6b7280]">{project.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-lg px-4 py-2 font-sans text-sm font-medium ${status.className}`}>{status.label}</span>
            <button
              type="button"
              onClick={sharePage}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-5 font-sans text-base text-[#374151] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.7" />
                <path d="m8.5 10.5 7-4M8.5 13.5l7 4" stroke="currentColor" strokeWidth="1.7" />
              </svg>
              Share
            </button>
            <EditBriefLink />
          </div>
        </div>
        {shareNotice ? <p className="px-8 pt-3 font-sans text-sm text-[#7b61ff]">{shareNotice}</p> : null}
        {actionNotice ? (
          <div className="px-8 pt-3">
            <Snackbar onDismiss={() => setActionNotice("")}>{actionNotice}</Snackbar>
          </div>
        ) : null}

        <nav className="flex gap-2 overflow-x-auto border-b border-[#e5e7eb] px-5 sm:px-8" aria-label="Project sections">
          {(
            [
              ["designs", `Designs (${submissions.length})`],
              ["brief", "Brief"],
              ["discussions", "Discussions"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-current={tab === id ? "page" : undefined}
              onClick={() => setTab(id)}
              className={`shrink-0 px-6 py-3 font-sans text-base focus-visible:outline-2 focus-visible:outline-[#7b61ff] ${
                tab === id ? "border-b-2 border-[#7b61ff] font-medium text-[#7b61ff]" : "text-[#6b7280]"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="px-5 py-6 sm:px-8">
          {tab === "brief" ? (
            <section className="rounded-xl border border-[#e5e7eb] bg-white p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="font-sans text-lg font-semibold text-[#111827]">Project brief</h2>
                <EditBriefLink />
              </div>
              <p className="mt-3 font-sans text-sm leading-6 text-[#6b7280]">{brief.summary}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm text-[#111827]">
                {brief.goals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {tab === "discussions" ? (
            <section className="rounded-xl border border-[#e5e7eb] bg-white p-6">
              <h2 className="font-sans text-lg font-semibold text-[#111827]">Discussions</h2>
              <p className="mt-1 font-sans text-sm text-[#6b7280]">Local notes only. Nothing is posted to a server.</p>
              <ul className="mt-4 divide-y divide-[#e5e7eb]">
                {discussionNotes.map((note) => (
                  <li key={note.id} className="py-3">
                    <p className="font-sans text-sm font-medium text-[#111827]">{note.author}</p>
                    <p className="font-sans text-sm text-[#6b7280]">{note.body}</p>
                    <p className="mt-1 font-sans text-xs text-[#9ca3af]">{note.time}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {tab === "designs" ? (
            <>
              <div className="mb-6 flex flex-col gap-3 rounded-xl border border-[#e5e7eb] bg-white px-6 py-4 lg:flex-row lg:items-center">
                <p className="inline-flex items-center gap-2 font-sans text-base text-[#374151]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 6h16l-6 8v6l-4-2v-4L4 6Z" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  Filter & Sort:
                </p>
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
                  <FilterSelect
                    id="rating-filter"
                    label="Designer marketplace rating"
                    value={ratingFilter}
                    onChange={(value) => {
                      setRatingFilter(value as RatingFilter);
                      setPage(1);
                    }}
                  >
                    <option value="all">Designer rating: All</option>
                    <option value="45">Designer rating: 4.5+</option>
                    <option value="48">Designer rating: 4.8+</option>
                  </FilterSelect>
                  <FilterSelect
                    id="my-rating-filter"
                    label="Rated by me"
                    value={myRatingFilter}
                    onChange={(value) => {
                      setMyRatingFilter(value as MyRatingFilter);
                      setPage(1);
                    }}
                  >
                    <option value="all">Rated by me: All</option>
                    <option value="unrated">Rated by me: Unrated</option>
                    <option value="4plus">Rated by me: 4+</option>
                    <option value="5">Rated by me: 5</option>
                  </FilterSelect>
                  <button
                    type="button"
                    aria-pressed={favouritesOnly}
                    onClick={() => {
                      setFavouritesOnly((current) => !current);
                      setPage(1);
                    }}
                    className={`inline-flex h-[37px] items-center rounded-lg border px-5 font-sans text-sm focus-visible:outline-2 focus-visible:outline-[#7b61ff] ${
                      favouritesOnly
                        ? "border-[#7b61ff] bg-[#f7eeff] text-[#7b61ff]"
                        : "border-[#d1d5db] bg-[#efefef] text-[#374151]"
                    }`}
                  >
                    Favourites only
                  </button>
                  <FilterSelect
                    id="level-filter"
                    label="Designer level"
                    value={levelFilter}
                    onChange={(value) => {
                      setLevelFilter(value as "all" | DesignerLevel);
                      setPage(1);
                    }}
                  >
                    <option value="all">All Designer Levels</option>
                    <option value="junior">Junior</option>
                    <option value="mid">Mid-level</option>
                    <option value="senior">Senior</option>
                    <option value="expert">Expert</option>
                  </FilterSelect>
                  <FilterSelect
                    id="sort-filter"
                    label="Sort"
                    value={sort}
                    onChange={(value) => {
                      setSort(value as SortKey);
                      setPage(1);
                    }}
                  >
                    <option value="newest">Sort: Newest First</option>
                    <option value="oldest">Sort: Oldest First</option>
                    <option value="rating">Sort: Highest Rated</option>
                  </FilterSelect>
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 font-sans text-sm text-[#7b61ff] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M5 15a7 7 0 0 0 12 2M19 9A7 7 0 0 0 7 7" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                  Reset
                </button>
              </div>

              {visible.length === 0 ? (
                <div className="rounded-xl border border-[#e5e7eb] px-6 py-16 text-center">
                  <p className="font-sans font-semibold text-[#111827]">
                    {submissions.length === 0 ? "No submissions yet for this project." : "No submissions match these filters."}
                  </p>
                  {submissions.length === 0 ? (
                    <p className="mt-2 font-sans text-sm text-[#6b7280]">Draft contests stay empty until designers submit work.</p>
                  ) : (
                    <button type="button" onClick={resetFilters} className="mt-3 font-sans text-sm text-[#7b61ff]">
                      Reset filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {visible.map((item) => {
                    const isWinner = winnerId === item.id;
                    const badge = isWinner ? "Selected" : item.badge;
                    return (
                      <article key={item.id} className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => openPreview(item.id)}
                            aria-label={`Open ${item.designer} design preview`}
                            className="block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                          >
                            <FigmaAsset src={item.preview} alt={item.previewAlt} className="h-64 w-full object-cover" />
                          </button>
                          <CardOverflowMenu
                            designer={item.designer}
                            onSelectWinner={() => {
                              setActiveId(item.id);
                              setDialog("winner");
                            }}
                            onAward={() => awardPayment(item.id)}
                            onArchive={() => archiveDesign(item.id)}
                          />
                          {item.badge === "Selected" ? (
                            <label className="absolute top-4 left-4 inline-flex">
                              <span className="sr-only">Select {item.designer}</span>
                              <Checkbox
                                checked={checked.includes(item.id)}
                                onChange={() =>
                                  setChecked((current) =>
                                    current.includes(item.id)
                                      ? current.filter((id) => id !== item.id)
                                      : [...current, item.id],
                                  )
                                }
                              />
                            </label>
                          ) : null}
                        </div>
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <Link
                                href={`/designers/${item.designerSlug}?from=projects`}
                                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                              >
                                <FigmaAsset src={item.avatar} alt="" className="size-10 rounded-full object-cover" />
                              </Link>
                              <div>
                                <Link
                                  href={`/designers/${item.designerSlug}?from=projects`}
                                  className="font-sans text-base font-medium text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                                >
                                  {item.designer}
                                </Link>
                                <p className="flex items-center gap-1 font-sans text-xs text-[#6b7280]">
                                  <Stars rating={item.rating} />
                                  <span>Designer {item.rating.toFixed(1)}</span>
                                </p>
                              </div>
                            </div>
                            <Badge tone={badge === "Selected" || isWinner ? "green" : badge === "Popular" ? "gold" : "blue"}>
                              {isWinner ? "Selected" : item.badge}
                            </Badge>
                          </div>
                          <div className="mt-3">
                            <p className="mb-1 font-sans text-xs text-[#6b7280]">Your rating of this design</p>
                            <SubmissionStars
                              value={myRatings[item.id] ?? null}
                              onChange={(value) => rateSubmission(item.id, value)}
                              disabled={!winnerAllowed}
                              label={`Rate ${item.designer} submission`}
                            />
                            {awarded.includes(item.id) ? (
                              <p className="mt-1 font-sans text-xs text-[#059669]">Participation payment recorded locally.</p>
                            ) : null}
                            {!winnerAllowed ? (
                              <p className="mt-1 font-sans text-xs text-[#9ca3af]">
                                Ratings can be viewed. New ratings are only open on Open or In Review contests.
                              </p>
                            ) : null}
                          </div>
                          <div className="mt-3 flex gap-2">
                            {item.badge === "Selected" || isWinner ? (
                              <Button
                                type="button"
                                variant="solid"
                                size="sm"
                                className="flex-1"
                                disabled={Boolean(winnerId) || !winnerAllowed}
                                onClick={() => {
                                  setActiveId(item.id);
                                  setDialog("winner");
                                }}
                              >
                                Select Winner
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => {
                                  setActiveId(item.id);
                                  setDialog("feedback");
                                }}
                              >
                                Give Feedback
                              </Button>
                            )}
                            <button
                              type="button"
                              aria-pressed={favourites.includes(item.id)}
                              aria-label={favourites.includes(item.id) ? "Remove favourite" : "Favourite submission"}
                              onClick={() => toggleFavourite(item.id)}
                              className="inline-flex h-[42px] w-12 items-center justify-center rounded-lg border border-[#d1d5db] bg-white text-[#6b7280] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill={favourites.includes(item.id) ? "#7b61ff" : "none"} stroke={favourites.includes(item.id) ? "#7b61ff" : "currentColor"} strokeWidth="1.8">
                                <path d="M12 20s-7-4.4-9-8.2C1.4 8.7 3.2 5 7 5c2 0 3.2 1 5 3 1.8-2 3-3 5-3 3.8 0 5.6 3.7 4 6.8-2 3.8-9 8.2-9 8.2Z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <Pagination page={safePage} pageCount={pageCount} onPageChange={setPage} />
              </div>
            </>
          ) : null}

          <section className="mt-8 rounded-xl border border-[#e5e7eb] bg-white p-6">
            <h2 className="font-sans text-lg font-semibold text-[#111827]">Recent Activity</h2>
            <ul className="mt-4 space-y-4">
              {activity.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <FigmaAsset src={item.avatar} alt="" className="size-10 rounded-full object-cover" />
                  <div>
                    <p className="font-sans text-sm text-[#111827]">{item.text}</p>
                    <p className="mt-1 font-sans text-xs text-[#6b7280]">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setShowAllActivity((open) => !open)}
              className="mt-4 w-full text-center font-sans text-sm text-[#7b61ff] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
            >
              {showAllActivity ? "Show less activity" : "View All Activity"}
            </button>
          </section>
        </div>
      </main>
      <DesignerAppFooter />
      </div>

      {dialog === "preview" && active ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0f172a]">
          <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white">
            <h2 id="dialog-title" className="font-sans text-base font-semibold">
              {active.designer}
            </h2>
            <button
              type="button"
              aria-label="Close full screen preview"
              onClick={closeDialog}
              className="inline-flex size-9 items-center justify-center rounded-lg text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Icon name="x" className="size-4" />
            </button>
          </header>
          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-auto p-4">
              <div style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}>
                <FigmaAsset
                  src={active.preview}
                  alt={active.previewAlt}
                  className="max-h-[calc(100vh-5rem)] w-auto max-w-full object-contain"
                />
              </div>
            </div>
            <aside className="max-h-[40vh] overflow-auto bg-white p-5 lg:max-h-none lg:w-80 lg:shrink-0">
              <div className="flex items-center gap-3">
                <Link href={`/designers/${active.designerSlug}?from=projects`}>
                  <FigmaAsset src={active.avatar} alt="" className="size-10 rounded-full object-cover" />
                </Link>
                <div>
                  <Link
                    href={`/designers/${active.designerSlug}?from=projects`}
                    className="font-sans text-sm font-semibold text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                  >
                    {active.designer}
                  </Link>
                  <p className="font-sans text-xs text-[#6b7280]">Designer rating {active.rating.toFixed(1)}</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="mb-1 font-sans text-xs text-[#6b7280]">Your rating of this design</p>
                <SubmissionStars
                  value={myRatings[active.id] ?? null}
                  onChange={(value) => rateSubmission(active.id, value)}
                  disabled={!winnerAllowed}
                  label={`Rate ${active.designer} submission`}
                />
              </div>
              <p className="mt-3 font-sans text-sm text-[#6b7280]">{active.previewAlt}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((value) => Math.max(1, value - 0.25))}
                  className="rounded-lg border border-[#e5e7eb] px-3 py-1 font-sans text-sm"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((value) => Math.min(2.5, value + 0.25))}
                  className="rounded-lg border border-[#e5e7eb] px-3 py-1 font-sans text-sm"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => setDialog("feedback")}
                className="mt-4 w-full rounded-lg border border-[#d1d5db] px-4 py-2 font-sans text-sm text-[#374151]"
              >
                Give Feedback
              </button>
              <button
                type="button"
                disabled={Boolean(winnerId) || !winnerAllowed}
                onClick={() => setDialog("winner")}
                className="mt-2 w-full rounded-lg bg-[#7b61ff] px-4 py-2 font-sans text-sm text-white disabled:opacity-50"
              >
                Select Winner
              </button>
              <p className="mt-3 font-sans text-xs text-[#9ca3af]">Demo only. Favourites, feedback, and winners stay in this session.</p>
            </aside>
          </div>
        </div>
      ) : null}

      {dialog === "feedback" && active ? (
        <DialogShell title={`Feedback for ${active.designer}`} onClose={() => setDialog(activeId ? "preview" : null)}>
          <form className="p-5" onSubmit={submitFeedback}>
            <p className="font-sans text-sm text-[#6b7280]">{active.previewAlt}</p>
            <div className="mt-4">
              <p className="font-sans text-sm text-[#111827]">Your rating of this design</p>
              <SubmissionStars
                value={myRatings[active.id] ?? null}
                onChange={(value) => rateSubmission(active.id, value)}
                disabled={!winnerAllowed}
                label={`Rate ${active.designer} submission`}
              />
            </div>
            <label className="mt-4 block font-sans text-sm text-[#111827]">
              Feedback
              <textarea
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                rows={5}
                className="mt-2 w-full rounded-lg border border-[#e5e7eb] p-3 font-sans text-sm outline-none focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
              />
            </label>
            {feedbackNotice ? <p className="mt-2 font-sans text-sm text-[#7b61ff]">{feedbackNotice}</p> : null}
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setDialog("preview")} className="rounded-lg px-4 py-2 font-sans text-sm text-[#6b7280]">
                Cancel
              </button>
              <button type="submit" className="rounded-lg bg-[#7b61ff] px-4 py-2 font-sans text-sm text-white">
                Submit
              </button>
            </div>
          </form>
        </DialogShell>
      ) : null}

      {dialog === "winner" && active ? (
        <DialogShell title="Select winner" onClose={() => setDialog("preview")}>
          <div className="p-5">
            <p className="font-sans text-sm text-[#6b7280]">
              {!winnerAllowed
                ? "This contest is closed or still a draft, so a winner cannot be selected."
                : winnerId
                  ? "A winner is already selected for this demo contest."
                  : `Select ${active.designer} as the winner of ${project.title}? This is a local demo and will not finalize a real contest.`}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setDialog("preview")} className="rounded-lg px-4 py-2 font-sans text-sm text-[#6b7280]">
                Cancel
              </button>
              <button
                type="button"
                ref={closeRef}
                disabled={Boolean(winnerId) || !winnerAllowed}
                onClick={confirmWinner}
                className="rounded-lg bg-[#7b61ff] px-4 py-2 font-sans text-sm text-white disabled:opacity-50"
              >
                Confirm winner
              </button>
            </div>
          </div>
        </DialogShell>
      ) : null}
    </div>
  );
}
