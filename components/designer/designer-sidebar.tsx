"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "../ui/avatar";
import { CountBadge } from "../ui/count-badge";

function NavGlyph({ name }: { name: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "Overview") {
    return (
      <svg {...common}>
        <path d="M4 13h7V4H4v9Zm9 7h7v-9h-7v9ZM4 20h7v-5H4v5Zm9-16v5h7V4h-7Z" />
      </svg>
    );
  }
  if (name === "Browse Jobs") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.2-3.2" />
      </svg>
    );
  }
  if (name === "Notifications") {
    return (
      <svg {...common}>
        <path d="M6 9a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
        <path d="M10 21a2 2 0 0 0 4 0" />
      </svg>
    );
  }
  if (name === "Messages") {
    return (
      <svg {...common}>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }
  if (name === "Invites") {
    return (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6M22 11h-6" />
      </svg>
    );
  }
  if (name === "Submissions") {
    return (
      <svg {...common}>
        <path d="M12 17V3" />
        <path d="m7 8 5-5 5 5" />
        <path d="M5 21h14" />
      </svg>
    );
  }
  if (name === "Watchlist") {
    return (
      <svg {...common}>
        <path d="M6 4h12v16l-6-3-6 3V4Z" />
      </svg>
    );
  }
  if (name === "Payouts") {
    return (
      <svg {...common}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
    </svg>
  );
}

const items = [
  { href: "/dashboard", label: "Overview", match: (path: string) => path === "/dashboard" },
  { href: "/jobs", label: "Browse Jobs", match: (path: string) => path.startsWith("/jobs") },
  {
    href: "/notifications",
    label: "Notifications",
    match: (path: string) => path === "/notifications",
  },
  { href: "/messages", label: "Messages", match: (path: string) => path === "/messages" },
  { href: "/invites", label: "Invites", match: (path: string) => path === "/invites" },
  {
    href: "/submissions",
    label: "Submissions",
    match: (path: string) => path === "/submissions",
  },
  { href: "/watchlist", label: "Watchlist", match: (path: string) => path === "/watchlist" },
  { href: "/payouts", label: "Payouts", match: (path: string) => path === "/payouts" },
];

export function DesignerSidebar({
  unreadNotifications = 1,
}: {
  unreadNotifications?: number;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col border-b border-[#f3f4f6] bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-b-0">
      <Link href="/profile" className="flex items-center gap-4 border-b border-n-300 px-6 py-6">
        <Avatar src="/images/hiw-avatar-1.png" size={48} alt="" />
        <div suppressHydrationWarning>
          <p className="font-display text-sm font-bold text-black">Alex Carter</p>
          <p className="font-sans text-xs text-n-500">Web Designer</p>
        </div>
      </Link>
      <nav className="flex flex-1 flex-col gap-1 px-[18px] py-6" aria-label="Dashboard">
        {items.map((item) => {
          const current = item.match(pathname);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex h-[52px] items-center justify-between gap-4 px-4 py-3.5 font-sans text-sm ${
                current ? "bg-z-50 text-z-400" : "text-n-900"
              }`}
              aria-current={current ? "page" : undefined}
            >
              <span className="flex min-w-0 items-center">
                <NavGlyph name={item.label} />
                <span className="px-3">{item.label}</span>
              </span>
              {item.label === "Notifications" && unreadNotifications > 0 ? (
                <CountBadge className="border-2 border-white font-display text-[9px] font-bold">
                  {unreadNotifications}
                </CountBadge>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <Link
        href="/settings"
        className={`mt-auto flex h-[52px] items-center border-t border-[#f3f4f6] px-[18px] py-4 font-sans text-sm ${
          pathname.startsWith("/settings") ? "bg-z-50 text-z-400" : "text-n-900"
        }`}
        aria-current={pathname.startsWith("/settings") ? "page" : undefined}
      >
        <span className="flex items-center px-4">
          <NavGlyph name="Settings" />
          <span className="px-3">Settings</span>
        </span>
      </Link>
    </aside>
  );
}
