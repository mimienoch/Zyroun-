"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";
import { Icon } from "../ui/icon";
import { SearchBar } from "../ui/search-bar";
import { DesignerAppFooter } from "./designer-app-footer";
import { DesignerSidebar } from "./designer-sidebar";
import { UnavailableControl } from "./unavailable";

type NoticeKind = "milestone" | "message" | "review" | "payment" | "invite";
type NoticeFilter = "all" | "unread" | "mentions" | "system";

type Notice = {
  id: string;
  title: string;
  body: string;
  time: string;
  day: "today" | "yesterday";
  unread: boolean;
  kind: NoticeKind;
};

const initialNotices: Notice[] = [
  {
    id: "milestone",
    title: "Milestone Approved",
    body: 'Client approved "Wireframes" for E-commerce App.',
    time: "2 hours ago",
    day: "today",
    unread: true,
    kind: "milestone",
  },
  {
    id: "message",
    title: "New Message from Sarah",
    body: 'Sarah left a comment on your recent design submission: "Love the new color palette, can we see it on the mobile view?"',
    time: "5 hours ago",
    day: "today",
    unread: true,
    kind: "message",
  },
  {
    id: "review",
    title: "5-Star Review Received",
    body: '"Excellent work on the branding project! Highly recommended."',
    time: "8 hours ago",
    day: "today",
    unread: false,
    kind: "review",
  },
  {
    id: "payment",
    title: "Payment Processed",
    body: "Your withdrawal of $1,200.00 has been successfully processed to your bank account.",
    time: "1 day ago",
    day: "yesterday",
    unread: false,
    kind: "payment",
  },
  {
    id: "invite",
    title: "Project Invitation",
    body: 'Nexus Financial invited you to apply for "Banking App Redesign".',
    time: "1 day ago",
    day: "yesterday",
    unread: false,
    kind: "invite",
  },
];

const filters: { id: NoticeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "mentions", label: "Mentions" },
  { id: "system", label: "System" },
];

const iconWrap: Record<Exclude<NoticeKind, "invite">, string> = {
  milestone: "bg-[#d1fae5] text-[#10b981]",
  message: "bg-[#dbeafe] text-[#3b82f6]",
  review: "bg-[#f3e8ff] text-[#7b61ff]",
  payment: "bg-[#fef3c7] text-[#f59e0b]",
};

export function NotificationsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<NoticeFilter>("all");
  const [notices, setNotices] = useState(initialNotices);
  const [declined, setDeclined] = useState(false);

  const unreadCount = notices.filter((item) => item.unread).length;

  const visible = useMemo(() => {
    return notices.filter((item) => {
      const haystack = `${item.title} ${item.body}`.toLowerCase();
      if (query.trim() && !haystack.includes(query.toLowerCase())) return false;
      if (filter === "unread") return item.unread;
      if (filter === "mentions") return item.kind === "message";
      if (filter === "system") return item.kind === "payment" || item.kind === "milestone";
      return true;
    });
  }, [notices, query, filter]);

  const today = visible.filter((item) => item.day === "today");
  const yesterday = visible.filter((item) => item.day === "yesterday");

  return (
    <div className="flex w-full flex-col bg-[#fafafa] lg:flex-row lg:items-start">
      <DesignerSidebar unreadNotifications={unreadCount} />
      <div className="flex min-w-0 flex-1 flex-col bg-[#f9fafb] pt-10">
        <main className="flex min-h-[1121px] min-w-0 flex-col px-8">
          <header className="flex min-h-20 flex-col justify-center gap-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:py-0">
            <div>
              <h1 className="font-sans text-2xl leading-8 font-bold text-[#111827]">Notifications</h1>
              <p className="mt-1 font-sans text-sm leading-5 text-[#6b7280]">
                Stay updated with your latest activity.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[7px]">
              <SearchBar
                className="w-full max-w-[258px] sm:w-[258px]"
                placeholder="Search notifications..."
                aria-label="Search notifications"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button
                type="button"
                className="px-1 font-display text-xs font-medium text-z-300"
                onClick={() =>
                  setNotices((current) => current.map((item) => ({ ...item, unread: false })))
                }
              >
                Mark all as read
              </button>
            </div>
          </header>

          <div className="flex min-h-[1041px] flex-col">
            <div
              className="flex gap-4 overflow-x-auto border-b border-n-300"
              role="tablist"
              aria-label="Notification filters"
            >
              {filters.map((item) => {
                const current = filter === item.id;
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
                    onClick={() => setFilter(item.id)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {today.length > 0 ? (
              <section className="mt-[24px]">
                <h2 className="font-sans text-sm font-semibold tracking-wide text-[#6b7280] uppercase">
                  Today
                </h2>
                <div className="mt-4 rounded-xl border border-[#f3f4f6] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                  {today.map((item) => (
                    <NoticeRow key={item.id} notice={item} />
                  ))}
                </div>
              </section>
            ) : null}

            {yesterday.length > 0 ? (
              <section className="mt-8">
                <h2 className="pt-2 font-sans text-sm font-semibold tracking-wide text-[#6b7280] uppercase">
                  Yesterday
                </h2>
                <div className="mt-4 rounded-xl border border-[#f3f4f6] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                  {yesterday.map((item) => (
                    <NoticeRow
                      key={item.id}
                      notice={item}
                      declined={declined}
                      onDecline={() => setDeclined(true)}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {visible.length === 0 ? (
              <p className="mt-8 rounded-xl border border-n-300 bg-white p-8 font-sans text-sm text-n-500">
                No notifications match this view. These items are the Figma frame copy, not a live
                inbox.
              </p>
            ) : (
              <div className="mt-6 flex justify-center pb-16">
                <Button type="button" variant="outline" size="lg" className="w-[161px]">
                  Load More
                </Button>
              </div>
            )}
          </div>
        </main>
        <DesignerAppFooter />
      </div>
    </div>
  );
}

function NoticeIcon({ kind }: { kind: NoticeKind }) {
  if (kind === "invite") {
    return (
      <FigmaAsset
        src="/images/hiw-avatar-2.png"
        alt=""
        className="size-10 shrink-0 rounded-full object-cover"
      />
    );
  }
  const name =
    kind === "milestone" ? "check" : kind === "message" ? "mail" : kind === "review" ? "star" : "dollar-sign";
  return (
    <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${iconWrap[kind]}`}>
      <Icon name={name} className="size-4" />
    </span>
  );
}

function NoticeRow({
  notice,
  declined = false,
  onDecline,
}: {
  notice: Notice;
  declined?: boolean;
  onDecline?: () => void;
}) {
  return (
    <article
      className={`relative flex gap-4 border-b border-[#f3f4f6] px-5 py-5 last:border-b-0 ${
        notice.unread ? "bg-[#eff6ff]" : "bg-white"
      }`}
    >
      {notice.unread ? <span className="absolute top-0 bottom-0 left-0 w-1 bg-z-300" /> : null}
      <NoticeIcon kind={notice.kind} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3
            className={`font-sans text-sm text-[#111827] ${
              notice.unread ? "font-semibold" : "font-medium"
            }`}
          >
            {notice.title}
          </h3>
          <p className="shrink-0 font-sans text-xs text-[#6b7280]">{notice.time}</p>
        </div>
        <p className="mt-1 font-sans text-sm text-[#6b7280]">{notice.body}</p>
        {notice.kind === "milestone" ? (
          <UnavailableControl
            reason="No matching details screen exists for this milestone"
            className="mt-2 font-sans text-xs font-medium text-z-300"
          >
            View Details
          </UnavailableControl>
        ) : null}
        {notice.kind === "message" ? (
          <Link
            href="/messages"
            className="mt-2 inline-flex h-7 items-center rounded-md bg-z-300 px-3 font-sans text-xs font-medium text-white"
          >
            Reply
          </Link>
        ) : null}
        {notice.kind === "invite" ? (
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              href="/jobs/nexus-banking"
              className="inline-flex h-[30px] items-center rounded-md bg-z-300 px-3 font-sans text-xs font-medium text-white"
            >
              View Project
            </Link>
            {declined ? (
              <span className="inline-flex h-[30px] items-center font-sans text-xs text-[#6b7280]">
                Declined in this session only.
              </span>
            ) : (
              <button
                type="button"
                onClick={onDecline}
                className="h-[30px] rounded-md border border-[#e5e7eb] bg-white px-3 font-sans text-xs font-medium text-[#111827]"
              >
                Decline
              </button>
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}
