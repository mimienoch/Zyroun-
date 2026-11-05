"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FigmaAsset } from "../figma-asset";
import { DesignerAppFooter } from "../designer/designer-app-footer";
import { ClientSidebar, NeedDesignerCard } from "./client-sidebar";
import {
  clientProjects,
  clientStats,
  clientThreads,
  seedActionItems,
  tabCounts,
  type ActionItem,
  type ClientProject,
  type ProjectStatus,
} from "./client-data";

type DashTab = "mine" | "open" | "closed" | "drafts" | "messages";
type SortKey = "recent" | "oldest" | "name";
type StatusFilter = "all" | ProjectStatus;

const statusStyle: Record<ProjectStatus, string> = {
  "in-progress": "bg-[#ecfdf5] text-[#059669]",
  blocked: "bg-[#fee2e2] text-[#dc2626]",
  review: "bg-[#fffbeb] text-[#d97706]",
  closed: "bg-[#f3f4f6] text-[#6b7280]",
  draft: "bg-[#f3f0ff] text-[#7b61ff]",
};

const accentBar: Record<ClientProject["accent"], string> = {
  green: "bg-[#10b981]",
  red: "bg-[#ef4444]",
  orange: "bg-[#f59e0b]",
};

const stats = [
  { label: "Total Projects", value: String(clientStats.totalProjects), iconBg: "bg-[#a855f7]/10", icon: "folder", iconColor: "#7b61ff" },
  { label: "Active Contests", value: String(clientStats.activeContests), iconBg: "bg-[#10b981]/10", icon: "zap", iconColor: "#10b981" },
  { label: "Total Submissions", value: String(clientStats.totalSubmissions), iconBg: "bg-[#f59e0b]/10", icon: "layers", iconColor: "#f59e0b" },
  { label: "Pending Feedback", value: String(clientStats.pendingFeedback), iconBg: "bg-[#ef4444]/10", icon: "alert", iconColor: "#ef4444" },
];

function StatIcon({ name, color }: { name: string; color: string }) {
  if (name === "zap") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" fill={color} />
      </svg>
    );
  }
  if (name === "layers") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" stroke={color} strokeWidth="1.8" />
      </svg>
    );
  }
  if (name === "alert") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
        <path d="M12 8v5M12 16.5h.01" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16v14H4zM8 6V4h8v2" fill={color} />
    </svg>
  );
}

function ProjectCard({
  project,
  onMessage,
  onArchive,
}: {
  project: ClientProject;
  onMessage: () => void;
  onArchive: (id: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <article className="relative overflow-hidden rounded-xl border border-[#e5e7eb]/50 bg-white p-6 shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.03),0px_4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-sans text-[15px] font-semibold leading-[19px] text-[#111827]">
          <Link
            href={`/projects/${project.id}`}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
          >
            {project.title}
          </Link>
        </h3>
        <span className={`shrink-0 rounded px-2 py-1 font-sans text-[11px] font-medium capitalize ${statusStyle[project.status]}`}>
          {project.status === "in-progress" ? "in progress" : project.status}
        </span>
      </div>
      <p className="mt-4 line-clamp-2 font-sans text-sm leading-5 text-[#6b7280]">{project.description}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="font-sans text-[11px] tracking-wide text-[#6b7280] uppercase">Designers</p>
          <div className="mt-2 flex items-center">
            {project.avatars.map((src, index) => (
              <FigmaAsset
                key={src}
                src={src}
                alt=""
                className={`size-8 rounded-full border-2 border-white object-cover ${index > 0 ? "-ml-2" : ""}`}
              />
            ))}
            {project.extraDesigners ? (
              <span className="ml-2 font-sans text-xs font-medium text-[#6b7280]">{project.extraDesigners}</span>
            ) : null}
          </div>
          <p className="mt-2 font-sans text-xs text-[#6b7280]">{project.designersLabel}</p>
        </div>
        <div className="text-right">
          <p className="mb-2 flex items-center justify-end gap-1 font-sans text-xs text-[#6b7280]">
            {project.meta}
            {project.status === "review" ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <circle cx="6" cy="6" r="5" fill="#f59e0b" />
                <path d="m4 6.2 1.4 1.4 2.6-3" stroke="white" strokeWidth="1.2" />
              </svg>
            ) : null}
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              aria-label={`Message about ${project.title}`}
              onClick={onMessage}
              className="inline-flex size-8 items-center justify-center rounded-full border border-[#e5e7eb] text-[#6b7280] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.7" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </button>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                aria-label={`More options for ${project.title}`}
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex size-8 items-center justify-center rounded-full border border-[#e5e7eb] text-[#6b7280] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
              >
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
                  <circle cx="7" cy="3" r="1.4" />
                  <circle cx="7" cy="8" r="1.4" />
                  <circle cx="7" cy="13" r="1.4" />
                </svg>
              </button>
              {menuOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 z-20 mt-1 w-44 rounded-lg border border-[#e5e7eb] bg-white py-1 shadow-[0px_8px_24px_rgba(0,0,0,0.08)]"
                >
                  <Link
                    href={`/projects/${project.id}`}
                    role="menuitem"
                    className="block px-3 py-2 font-sans text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                  >
                    View Project
                  </Link>
                  <Link
                    href="/post-project"
                    role="menuitem"
                    className="block px-3 py-2 font-sans text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                  >
                    Edit Project
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onArchive(project.id);
                      setMenuOpen(false);
                    }}
                    className="block w-full px-3 py-2 text-left font-sans text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                  >
                    Archive
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <span className={`absolute inset-x-px bottom-0 h-1 ${accentBar[project.accent]}`} />
    </article>
  );
}

export function ClientProjectsPage() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<DashTab>(searchParams.get("tab") === "messages" ? "messages" : "mine");
  const [projects, setProjects] = useState(clientProjects);
  const [sort, setSort] = useState<SortKey>("recent");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [items, setItems] = useState<ActionItem[]>(seedActionItems);
  const [showAllItems, setShowAllItems] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [promoOpen, setPromoOpen] = useState(true);
  const [notesOpen, setNotesOpen] = useState(false);
  const addRef = useRef<HTMLInputElement>(null);
  const counts = tabCounts(projects);

  useEffect(() => {
    if (adding) addRef.current?.focus();
  }, [adding]);

  const visibleProjects = useMemo(() => {
    let list = projects;
    if (tab === "mine") list = list.filter((project) => project.featured && project.status !== "closed");
    if (tab === "open") list = list.filter((project) => project.status === "in-progress");
    if (tab === "closed") {
      list = list.filter(
        (project) => project.status === "closed" || project.status === "blocked" || project.status === "review",
      );
    }
    if (tab === "drafts") list = list.filter((project) => project.status === "draft");
    if (statusFilter !== "all") list = list.filter((project) => project.status === statusFilter);
    return [...list].sort((a, b) => {
      if (sort === "oldest") return a.updatedAt - b.updatedAt;
      if (sort === "name") return a.title.localeCompare(b.title);
      return b.updatedAt - a.updatedAt;
    });
  }, [projects, tab, sort, statusFilter]);

  const visibleItems = showAllItems ? items : items.slice(0, 3);

  function archive(id: string) {
    setProjects((current) =>
      current.map((project) =>
        project.id === id ? { ...project, status: "closed", featured: false } : project,
      ),
    );
  }

  function addActionItem(event: FormEvent) {
    event.preventDefault();
    const label = newItem.trim();
    if (!label) return;
    setItems((current) => [{ id: `item-${Date.now()}`, label, due: "Added locally", done: false }, ...current]);
    setNewItem("");
    setAdding(false);
  }

  const tabs: { id: DashTab; label: string }[] = [
    { id: "mine", label: "My Projects" },
    { id: "open", label: `Open (${counts.open})` },
    { id: "closed", label: `Closed (${counts.closed})` },
    { id: "drafts", label: `Drafts (${counts.drafts})` },
    { id: "messages", label: "Messages" },
  ];

  return (
    <div className="flex w-full flex-col bg-[#f8f9fa] lg:flex-row lg:items-start">
      <ClientSidebar
        onMessages={() => setTab("messages")}
        messagesActive={tab === "messages"}
        showNeedDesigner={false}
      />
      <div className="flex min-w-0 flex-1 flex-col">
      <main className="min-w-0 flex-1 bg-[#f8f9fa]">
        <header className="flex flex-col gap-4 px-8 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-sans text-2xl font-bold leading-8 text-[#111827]">Projects Dashboard</h1>
            <p className="mt-1 font-sans text-sm leading-5 text-[#6b7280]">
              Manage your design requests and collaborate with talent.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/post-project"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#7b61ff] px-5 font-sans text-sm font-medium text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
                <path d="M6 1v12M1 5h10" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Post New Project
            </Link>
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setNotesOpen((open) => !open)}
                className="relative inline-flex size-10 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6b7280] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
              >
                <svg width="14" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 9a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M10 21a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <span className="absolute top-2 right-2 size-2 rounded-full bg-[#7b61ff]" />
              </button>
              {notesOpen ? (
                <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-[0px_8px_24px_rgba(0,0,0,0.08)]">
                  <p className="font-sans text-sm font-semibold text-[#111827]">Notifications</p>
                  <p className="mt-2 font-sans text-sm text-[#6b7280]">Alex submitted new checkout wireframes.</p>
                  <Link
                    href="/notifications"
                    className="mt-3 inline-block font-sans text-sm text-[#7b61ff] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                  >
                    Open notifications
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="border-b border-[#e5e7eb] px-8">
          <nav className="flex gap-6 overflow-x-auto" aria-label="Project views">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={tab === item.id ? "page" : undefined}
                onClick={() => setTab(item.id)}
                className={`shrink-0 py-4 font-sans text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff] ${
                  tab === item.id
                    ? "border-b-2 border-[#7b61ff] font-medium text-[#7b61ff]"
                    : "border-b-2 border-transparent text-[#6b7280]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="px-8 py-8">
          {tab === "messages" ? (
            <div className="rounded-xl border border-[#e5e7eb]/50 bg-white p-6">
              <h2 className="font-sans text-lg font-semibold text-[#111827]">Messages</h2>
              <p className="mt-1 font-sans text-sm text-[#6b7280]">Local demo threads. Nothing is sent to a server.</p>
              <ul className="mt-4 divide-y divide-[#e5e7eb]">
                {clientThreads.map((thread) => (
                  <li key={thread.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="font-sans text-sm font-medium text-[#111827]">{thread.name}</p>
                      <p className="font-sans text-sm text-[#6b7280]">{thread.preview}</p>
                    </div>
                    <span className="font-sans text-xs text-[#9ca3af]">{thread.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col gap-8 xl:flex-row">
              <div className="min-w-0 flex-1">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {stats.map((card) => (
                    <article
                      key={card.label}
                      className="rounded-xl border border-[#e5e7eb]/50 bg-white p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex size-10 items-center justify-center rounded-lg ${card.iconBg}`}>
                          <StatIcon name={card.icon} color={card.iconColor} />
                        </span>
                        <p className="font-sans text-2xl font-bold leading-8 text-[#111827]">{card.value}</p>
                      </div>
                      <p className="mt-2 font-sans text-xs text-[#6b7280]">{card.label}</p>
                    </article>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="font-sans text-lg font-semibold text-[#111827]">All Projects</h2>
                  <div className="relative flex items-center gap-4">
                    <div>
                      <button
                        type="button"
                        aria-expanded={sortOpen}
                        onClick={() => {
                          setSortOpen((open) => !open);
                          setFilterOpen(false);
                        }}
                        className="inline-flex items-center gap-1 font-sans text-sm text-[#6b7280] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M4 7h16M7 12h10M10 17h4" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                        {sort === "recent" ? "Recent" : sort === "oldest" ? "Oldest" : "Name"}
                      </button>
                      {sortOpen ? (
                        <div className="absolute right-16 z-10 mt-2 w-36 rounded-lg border border-[#e5e7eb] bg-white py-1 shadow-[0px_8px_24px_rgba(0,0,0,0.08)]">
                          {(
                            [
                              ["recent", "Recent"],
                              ["oldest", "Oldest"],
                              ["name", "Name"],
                            ] as const
                          ).map(([id, label]) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => {
                                setSort(id);
                                setSortOpen(false);
                              }}
                              className="block w-full px-3 py-2 text-left font-sans text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <button
                        type="button"
                        aria-expanded={filterOpen}
                        onClick={() => {
                          setFilterOpen((open) => !open);
                          setSortOpen(false);
                        }}
                        className="inline-flex items-center gap-1 font-sans text-sm text-[#6b7280] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M4 6h16l-6 8v6l-4-2v-4L4 6Z" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                        {statusFilter === "all" ? "All" : statusFilter}
                      </button>
                      {filterOpen ? (
                        <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-[#e5e7eb] bg-white py-1 shadow-[0px_8px_24px_rgba(0,0,0,0.08)]">
                          {(
                            [
                              ["all", "All"],
                              ["in-progress", "In progress"],
                              ["blocked", "Blocked"],
                              ["review", "Review"],
                              ["closed", "Closed"],
                              ["draft", "Draft"],
                            ] as const
                          ).map(([id, label]) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => {
                                setStatusFilter(id);
                                setFilterOpen(false);
                              }}
                              className="block w-full px-3 py-2 text-left font-sans text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {visibleProjects.length === 0 ? (
                  <div className="mt-6 rounded-xl border border-[#e5e7eb] bg-white px-6 py-16 text-center">
                    <p className="font-sans text-base font-semibold text-[#111827]">No projects in this view.</p>
                    <p className="mt-2 font-sans text-sm text-[#6b7280]">Try another tab or clear the status filter.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setTab("mine");
                        setStatusFilter("all");
                      }}
                      className="mt-4 rounded-lg border border-[#e5e7eb] px-4 py-2 font-sans text-sm text-[#111827] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                    >
                      Reset view
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {visibleProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onMessage={() => setTab("messages")}
                        onArchive={archive}
                      />
                    ))}
                  </div>
                )}
              </div>

              <aside className="flex w-full shrink-0 flex-col gap-6 xl:w-80">
                <section className="rounded-xl border border-[#e5e7eb]/50 bg-white p-6 shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.03),0px_4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center justify-between">
                    <h2 className="font-sans text-base font-semibold text-[#111827]">Action Items</h2>
                    <button
                      type="button"
                      aria-label="Add action item"
                      onClick={() => setAdding(true)}
                      className="inline-flex size-6 items-center justify-center rounded bg-[#a855f7]/10 text-[#7b61ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                    >
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden>
                        <path d="M5 1v10M1 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  {adding ? (
                    <form className="mt-4" onSubmit={addActionItem}>
                      <label className="sr-only" htmlFor="new-action-item">
                        New action item
                      </label>
                      <input
                        id="new-action-item"
                        ref={addRef}
                        value={newItem}
                        onChange={(event) => setNewItem(event.target.value)}
                        placeholder="Add an item…"
                        className="h-9 w-full rounded-lg border border-[#e5e7eb] px-3 font-sans text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                      />
                      <div className="mt-2 flex gap-2">
                        <button
                          type="submit"
                          className="rounded-lg bg-[#7b61ff] px-3 py-1.5 font-sans text-xs text-white focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => setAdding(false)}
                          className="rounded-lg px-3 py-1.5 font-sans text-xs text-[#6b7280]"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : null}
                  <ul className="mt-4 space-y-4">
                    {visibleItems.map((item) => (
                      <li key={item.id}>
                        <label className="flex cursor-pointer gap-3">
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() =>
                              setItems((current) =>
                                current.map((entry) =>
                                  entry.id === item.id ? { ...entry, done: !entry.done } : entry,
                                ),
                              )
                            }
                            className="mt-1 size-[13px] rounded-[2.5px] accent-[#0075ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                          />
                          <span>
                            <span
                              className={`block font-sans text-sm text-[#111827] ${item.done ? "line-through opacity-60" : ""}`}
                            >
                              {item.label}
                            </span>
                            <span className={`mt-0.5 block font-sans text-xs ${item.urgent && !item.done ? "text-[#ef4444]" : "text-[#6b7280]"}`}>
                              {item.due}
                            </span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setShowAllItems((open) => !open)}
                    className="mt-4 w-full border-t border-[#e5e7eb] pt-4 text-center font-sans text-sm text-[#7b61ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                  >
                    {showAllItems ? "Show fewer items" : "Show all items"}
                  </button>
                </section>

                <div className="px-4">
                  <NeedDesignerCard />
                </div>

                {promoOpen ? (
                  <section className="relative overflow-visible rounded-xl bg-[#1e293b] p-6">
                    <button
                      type="button"
                      aria-label="Dismiss exclusive designer network"
                      onClick={() => setPromoOpen(false)}
                      className="absolute top-3.5 right-3.5 text-[#9ca3af] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden>
                        <path d="M2 5.5 10 13.5M10 5.5 2 13.5" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                    <h2 className="pr-6 font-sans text-base font-semibold text-white">Exclusive Designer Network</h2>
                    <p className="mt-2 font-sans text-sm leading-[19.5px] text-[#d1d5db]">
                      Upgrade to Pro to invite top-tier designers directly to your private projects.
                    </p>
                    <Link
                      href="/pricing"
                      className="mt-4 inline-flex h-9 items-center rounded-lg bg-white px-4 font-sans text-sm font-medium text-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      View Pro Plans
                    </Link>
                  </section>
                ) : null}
              </aside>
            </div>
          )}
        </div>
      </main>
      <DesignerAppFooter />
      </div>
    </div>
  );
}
