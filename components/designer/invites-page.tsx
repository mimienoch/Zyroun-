"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Avatar } from "../ui/avatar";
import { Icon } from "../ui/icon";
import { SearchBar } from "../ui/search-bar";
import { DesignerAppFooter } from "./designer-app-footer";
import { DesignerSidebar } from "./designer-sidebar";
import { UnavailableControl } from "./unavailable";

type Status = "pending" | "accepted" | "declined";
type Tab = "all" | Status;
type SortKey = "newest" | "oldest";
type TagTone = "purple" | "gray" | "pink";

type Invite = {
  id: string;
  title: string;
  client: string;
  avatar: string;
  verified: boolean;
  status: Status;
  description: string;
  budgetLabel: string;
  budgetValue: string;
  metaLabel: string;
  metaValue: string;
  tags: { label: string; tone: TagTone }[];
  expiresSoon?: boolean;
  declinedNote?: string;
  createdAt: number;
  detailsHref?: string;
  spaceHref?: string;
};

const seed: Invite[] = [
  {
    id: "fintech",
    title: "Fintech Mobile App Redesign",
    client: "Michael Chen",
    avatar: "/images/avatar-michael.png",
    verified: true,
    status: "pending",
    description:
      "We are looking for an experienced UI/UX designer to revamp our core banking application focusing on Gen-Z users. Must have experience…",
    budgetLabel: "Budget Range",
    budgetValue: "$4,500 - $6,000",
    metaLabel: "Estimated Timeline",
    metaValue: "4-6 Weeks",
    tags: [
      { label: "UI/UX Design", tone: "purple" },
      { label: "Mobile App", tone: "gray" },
      { label: "Fintech", tone: "gray" },
    ],
    createdAt: 3,
    detailsHref: "/jobs/nexus-banking",
    spaceHref: "/jobs/nexus-banking",
  },
  {
    id: "ecommerce",
    title: "E-commerce Brand Identity",
    client: "Emma Wilson",
    avatar: "/images/avatar-emma.png",
    verified: false,
    status: "pending",
    description:
      "Need a fresh, modern brand identity including logo, typography, color palette, and basic brand guidelines for a new sustainable fashion…",
    budgetLabel: "Fixed Budget",
    budgetValue: "$2,800",
    metaLabel: "Estimated Timeline",
    metaValue: "3 Weeks",
    tags: [
      { label: "Brand Identity", tone: "pink" },
      { label: "Logo Design", tone: "gray" },
      { label: "Guidelines", tone: "gray" },
    ],
    expiresSoon: true,
    createdAt: 2,
  },
  {
    id: "saas",
    title: "SaaS Dashboard UI Kit",
    client: "TechFlow Inc.",
    avatar: "/images/hiw-avatar-3.png",
    verified: true,
    status: "accepted",
    description:
      "Create a comprehensive UI kit for our upcoming SaaS product. Needs to include light/dark modes, 50+ components, and 10 key screen…",
    budgetLabel: "Budget",
    budgetValue: "$8,000",
    metaLabel: "Status",
    metaValue: "In Progress",
    tags: [],
    createdAt: 1,
  },
  {
    id: "marketing",
    title: "Marketing Website Redesign",
    client: "David Smith",
    avatar: "/images/avatar-elena.png",
    verified: false,
    status: "declined",
    description:
      "Quick redesign needed for our 5-page marketing website. Looking for someone who can start immediately and finish within 3 days.",
    budgetLabel: "Budget",
    budgetValue: "—",
    metaLabel: "Timeline",
    metaValue: "3 days",
    tags: [],
    declinedNote: "Declined on Oct 14, 2023 - Reason: Schedule conflict",
    createdAt: 0,
  },
];

const statusBadge: Record<Status, string> = {
  pending: "bg-[#fef9c3] text-[#a16207]",
  accepted: "bg-[#dcfce7] text-[#15803d]",
  declined: "bg-[#e5e7eb] text-[#4b5563]",
};

const tagClass: Record<TagTone, string> = {
  purple: "bg-[#f3f0ff] text-[#9b82f3]",
  gray: "bg-[#f3f4f6] text-[#64748b]",
  pink: "bg-[#fdf2f8] text-[#db2777]",
};

function VerifiedMark() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <circle cx="5" cy="5" r="5" fill="#3b82f6" />
      <path d="M2.6 5.1 4.2 6.7 7.4 3.4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function InvitesPage() {
  const [invites, setInvites] = useState(seed);
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [declineId, setDeclineId] = useState<string | null>(null);
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const dialogId = useId();

  const counts = {
    all: invites.length,
    pending: invites.filter((invite) => invite.status === "pending").length,
    accepted: invites.filter((invite) => invite.status === "accepted").length,
    declined: invites.filter((invite) => invite.status === "declined").length,
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: `All (${counts.all})` },
    { id: "pending", label: `Pending (${counts.pending})` },
    { id: "accepted", label: "Accepted" },
    { id: "declined", label: "Declined" },
  ];

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = invites.filter((invite) => {
      if (tab !== "all" && invite.status !== tab) return false;
      if (
        q &&
        !`${invite.title} ${invite.client} ${invite.description} ${invite.tags.map((tag) => tag.label).join(" ")}`
          .toLowerCase()
          .includes(q)
      ) {
        return false;
      }
      return true;
    });
    return [...list].sort((a, b) => (sort === "oldest" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt));
  }, [invites, tab, query, sort]);

  const declining = invites.find((invite) => invite.id === declineId);
  const details = invites.find((invite) => invite.id === detailsId);

  function acceptInvite(id: string) {
    setInvites((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "accepted",
              metaLabel: "Status",
              metaValue: "In Progress",
            }
          : item,
      ),
    );
  }

  function confirmDecline() {
    if (!declineId) return;
    setInvites((current) =>
      current.map((item) =>
        item.id === declineId
          ? {
              ...item,
              status: "declined",
              declinedNote: "Declined just now - Reason: Schedule conflict",
            }
          : item,
      ),
    );
    setDeclineId(null);
  }

  useEffect(() => {
    if (!declineId && !detailsId) return;
    confirmRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDeclineId(null);
        setDetailsId(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [declineId, detailsId]);

  return (
    <div className="flex w-full flex-col bg-white lg:flex-row lg:items-start">
      <DesignerSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex min-h-[979px] min-w-0 flex-col bg-[#f8fafc]">
          <header className="flex min-h-24 flex-col justify-center gap-4 border-b border-[#e2e8f0] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-0">
            <h1 className="font-sans text-xl font-semibold leading-7 text-[#1e293b]">Project Invites</h1>
            <SearchBar
              className="w-full sm:w-[240px]"
              placeholder="Search invites..."
              aria-label="Search invites"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </header>

          <div className="px-4">
            <div className="flex min-h-[883px] flex-col px-8 py-8">
              <div className="flex min-h-[61px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-4 overflow-x-auto" role="tablist" aria-label="Invite filters">
                  {tabs.map((item) => {
                    const current = tab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={current}
                        onClick={() => setTab(item.id)}
                        className={`h-[61px] shrink-0 px-2.5 font-sans text-sm ${
                          current ? "border-b border-z-300 font-medium text-z-300" : "font-normal text-black"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                <label className="flex items-center gap-3.5 font-sans text-sm font-medium text-[#64748b]">
                  Sort by:
                  <span className="relative">
                    <select
                      value={sort}
                      onChange={(event) => setSort(event.target.value as SortKey)}
                      className="h-[41px] w-[158px] appearance-none rounded-xl border border-[#e5e7eb] bg-[#f9fafb] py-2 pr-10 pl-4 font-sans text-sm font-normal text-[#64748b] outline-none focus-visible:border-z-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                    <Icon
                      name="chevron-down"
                      className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#64748b]"
                    />
                  </span>
                </label>
              </div>

              {visible.length === 0 ? (
                <div className="mt-6 rounded-xl border border-[#e2e8f0] bg-white px-6 py-16 text-center">
                  <p className="font-sans text-base font-semibold text-[#1e293b]">No invitations match these filters.</p>
                  <p className="mt-2 font-sans text-sm text-[#64748b]">Try another tab, search term, or sort order.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setTab("all");
                      setQuery("");
                      setSort("newest");
                    }}
                    className="mt-4 h-10 rounded-lg bg-[#9b82f3] px-4 font-sans text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b82f3]"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid min-h-[734px] grid-cols-1 content-start gap-6 xl:grid-cols-2">
                  {visible.map((invite) => (
                    <InviteCard
                      key={invite.id}
                      invite={invite}
                      onAccept={() => acceptInvite(invite.id)}
                      onDecline={() => setDeclineId(invite.id)}
                      onDetails={() => setDetailsId(invite.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <DesignerAppFooter />
      </div>

      {declining ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/70 p-4" onClick={() => setDeclineId(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${dialogId}-title`}
            className="w-full max-w-md rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0px_24px_60px_rgba(0,0,0,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id={`${dialogId}-title`} className="font-sans text-lg font-semibold text-[#111827]">
              Decline this invitation?
            </h2>
            <p className="mt-2 font-sans text-sm text-[#6b7280]">
              {declining.title} will move to Declined on this page only. Nothing is saved to a server.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeclineId(null)}
                className="h-10 rounded-lg border border-[#e2e8f0] px-4 font-sans text-sm font-medium text-[#1e293b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b82f3]"
              >
                Cancel
              </button>
              <button
                ref={confirmRef}
                type="button"
                onClick={confirmDecline}
                className="h-10 rounded-lg bg-[#ef4444] px-4 font-sans text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4444]"
              >
                Decline invite
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {details ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/70 p-4" onClick={() => setDetailsId(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${dialogId}-details`}
            className="w-full max-w-lg rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0px_24px_60px_rgba(0,0,0,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h2 id={`${dialogId}-details`} className="font-sans text-lg font-semibold text-[#111827]">
                {details.title}
              </h2>
              <button
                ref={confirmRef}
                type="button"
                aria-label="Close details"
                onClick={() => setDetailsId(null)}
                className="inline-flex size-8 items-center justify-center rounded-lg text-[#6b7280] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
              >
                <Icon name="x" className="size-3" />
              </button>
            </div>
            <p className="mt-1 font-sans text-sm text-[#64748b]">Invited by {details.client}</p>
            <p className="mt-4 font-sans text-sm leading-6 text-[#475569]">{details.description}</p>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <dt className="font-sans text-xs text-[#64748b]">{details.budgetLabel}</dt>
                <dd className="mt-1 font-sans text-sm font-semibold text-[#1e293b]">{details.budgetValue}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs text-[#64748b]">{details.metaLabel}</dt>
                <dd className="mt-1 font-sans text-sm font-semibold text-[#1e293b]">{details.metaValue}</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function InviteCard({
  invite,
  onAccept,
  onDecline,
  onDetails,
}: {
  invite: Invite;
  onAccept: () => void;
  onDecline: () => void;
  onDetails: () => void;
}) {
  const declined = invite.status === "declined";
  const pending = invite.status === "pending";

  return (
    <article
      className={`relative overflow-hidden rounded-xl border border-[#e2e8f0] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] ${
        declined ? "min-h-[331px] bg-[#f9fafb]" : pending ? "min-h-[379px] bg-white" : "min-h-[331px] bg-white"
      }`}
    >
      {pending && !invite.expiresSoon ? (
        <span className="pointer-events-none absolute top-0 right-0 h-24 w-24 bg-[linear-gradient(225deg,#f3f0ff_0%,transparent_70%)]" />
      ) : null}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 gap-3">
            <Avatar src={invite.avatar} alt="" size={48} className="border border-[#e5e7eb]" />
            <div className="min-w-0">
              <h2 className="font-sans text-lg font-semibold leading-7 text-[#1e293b]">{invite.title}</h2>
              <p className="mt-0.5 flex flex-wrap items-center gap-1 font-sans text-sm text-[#64748b]">
                Invited by
                <span className="font-medium text-[#1e293b]">{invite.client}</span>
                {invite.verified ? <VerifiedMark /> : null}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-[3.5px]">
            <span className={`rounded-full px-2.5 py-1 font-sans text-xs font-semibold ${statusBadge[invite.status]}`}>
              {invite.status === "pending" ? "Pending" : invite.status === "accepted" ? "Accepted" : "Declined"}
            </span>
            {invite.expiresSoon && pending ? (
              <span className="inline-flex items-center gap-1 font-sans text-[10px] font-medium text-[#ef4444]">
                <span className="size-2.5 rounded-full bg-[#ef4444]" aria-hidden />
                Expires in 24h
              </span>
            ) : null}
          </div>
        </div>

        <p className="font-sans text-sm leading-5 text-[#64748b]">{invite.description}</p>

        {declined ? (
          <p className="border-t border-[#e2e8f0] pt-4 font-sans text-xs text-[#64748b]">{invite.declinedNote}</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-[#e2e8f0] bg-[#f9fafb] px-4 pt-5 pb-4">
              <div>
                <p className="font-sans text-xs text-[#64748b]">{invite.budgetLabel}</p>
                <p className="mt-1 font-sans text-base font-semibold text-[#1e293b]">{invite.budgetValue}</p>
              </div>
              <div>
                <p className="font-sans text-xs text-[#64748b]">{invite.metaLabel}</p>
                <p className="mt-1 font-sans text-base font-semibold text-[#1e293b]">{invite.metaValue}</p>
              </div>
            </div>
            {pending && invite.tags.length ? (
              <div className="flex flex-wrap gap-2 pt-1 pb-2">
                {invite.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`rounded-md px-2.5 py-1 font-sans text-xs font-medium ${tagClass[tag.tone]}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            ) : null}
            <div className={`flex items-center gap-3 border-t border-[#e2e8f0] ${pending ? "pt-4" : "pt-5"}`}>
              {pending ? (
                <>
                  <button
                    type="button"
                    onClick={onAccept}
                    className="h-10 flex-1 rounded-lg bg-[#9b82f3] font-sans text-sm font-medium text-white shadow-[0_1px_2px_rgba(155,130,243,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b82f3]"
                  >
                    Accept Invite
                  </button>
                  <button
                    type="button"
                    onClick={onDecline}
                    className="h-[42px] flex-1 rounded-lg border border-[#e2e8f0] bg-white font-sans text-sm font-medium text-[#1e293b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b82f3]"
                  >
                    Decline
                  </button>
                  {invite.detailsHref ? (
                    <Link
                      href={invite.detailsHref}
                      aria-label={`View details for ${invite.title}`}
                      className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#e2e8f0] text-[#64748b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b82f3]"
                    >
                      <DetailsIcon />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-label={`View details for ${invite.title}`}
                      onClick={onDetails}
                      className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#e2e8f0] text-[#64748b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b82f3]"
                    >
                      <DetailsIcon />
                    </button>
                  )}
                </>
              ) : invite.spaceHref ? (
                <Link
                  href={invite.spaceHref}
                  className="inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-[#e2e8f0] bg-white font-sans text-sm font-medium text-[#1e293b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b82f3]"
                >
                  <SpaceIcon />
                  View Project Space
                </Link>
              ) : (
                <UnavailableControl
                  reason="No project workspace exists for this invite"
                  className="inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-[#e2e8f0] bg-white font-sans text-sm font-medium text-[#1e293b]"
                >
                  <SpaceIcon />
                  View Project Space
                </UnavailableControl>
              )}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

function DetailsIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
      <path d="M2 1.5h7.2L12 4.2V14.5H2V1.5Z" stroke="#64748b" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9 1.5V4.4h3" stroke="#64748b" strokeWidth="1.3" />
    </svg>
  );
}

function SpaceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 12V5l5-3 5 3v7H2Z" stroke="#1e293b" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
