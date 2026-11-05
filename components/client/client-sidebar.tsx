"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FigmaAsset } from "../figma-asset";
import { UnavailableControl } from "../designer/unavailable";

function Glyph({ name }: { name: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "projects") {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="7" height="7" rx="1.5" />
        <rect x="14" y="4" width="7" height="7" rx="1.5" />
        <rect x="3" y="15" width="7" height="5" rx="1.5" />
        <rect x="14" y="15" width="7" height="5" rx="1.5" />
      </svg>
    );
  }
  if (name === "messages") {
    return (
      <svg {...common}>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }
  if (name === "saved") {
    return (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6M22 11h-6" />
      </svg>
    );
  }
  if (name === "billing") {
    return (
      <svg {...common}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function NeedDesignerCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-[#dbeafe]/50 bg-[#eff6ff]/50 px-4 py-4 text-center ${className}`}>
      <span className="mx-auto mb-1 flex size-8 items-center justify-center rounded-full bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4v16M8 8l4-4 4 4"
            stroke="#7b61ff"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <p className="mt-2 font-sans text-sm font-semibold text-[#111827]">Need a Designer?</p>
      <p className="mt-1 font-sans text-xs leading-4 text-[#6b7280]">
        Post a new project to get
        <br />
        proposals.
      </p>
      <Link
        href="/post-project"
        className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-lg bg-[#22d3ee] font-sans text-sm font-medium text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
      >
        Post New Project
      </Link>
    </div>
  );
}

export function ClientSidebar({
  onMessages,
  unreadMessages = 12,
  messagesActive = false,
  showNeedDesigner = true,
}: {
  onMessages?: () => void;
  unreadMessages?: number;
  messagesActive?: boolean;
  showNeedDesigner?: boolean;
}) {
  const pathname = usePathname();
  const [from, setFrom] = useState("");
  useEffect(() => {
    setFrom(new URLSearchParams(window.location.search).get("from") ?? "");
  }, [pathname]);
  const savedActive = pathname === "/saved-designers" || (pathname.startsWith("/designers/") && from === "saved");
  const projectsActive =
    (pathname.startsWith("/projects") && !messagesActive) ||
    (pathname.startsWith("/designers/") && from === "projects");
  const itemClass =
    "flex items-center gap-3 rounded-lg px-4 py-3.5 font-sans text-sm text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]";
  const mutedClass = "text-[#4b5563]";
  const activeClass = "bg-[#f3f0ff] text-[#4129b9]";

  return (
    <aside className="flex w-full flex-col border-b border-[#e5e7eb] bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-hidden lg:border-r lg:border-b-0">
      <div className="flex items-center gap-3 border-b border-[#e5e7eb] px-6 py-6">
        <FigmaAsset
          src="/images/avatar-michael.png"
          alt=""
          className="size-10 rounded-full object-cover"
        />
        <div>
          <p className="font-sans text-sm font-semibold leading-5 text-[#111827]">TechFlow Inc.</p>
          <p className="font-sans text-xs leading-4 text-[#6b7280]">Project Owner</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-4" aria-label="Client">
        <Link
          href="/projects"
          aria-current={projectsActive ? "page" : undefined}
          className={`${itemClass} ${projectsActive ? activeClass : mutedClass}`}
        >
          <Glyph name="projects" />
          My Projects
        </Link>
        {onMessages ? (
          <button
            type="button"
            onClick={onMessages}
            aria-current={messagesActive ? "page" : undefined}
            className={`${itemClass} w-full text-left ${messagesActive ? activeClass : mutedClass}`}
          >
            <Glyph name="messages" />
            <span className="flex-1">Messages</span>
            <span className="inline-flex size-6 items-center justify-center rounded-full border-2 border-white bg-[#7b61ff] font-display text-[9px] font-bold text-white">
              {unreadMessages}
            </span>
          </button>
        ) : (
          <Link
            href="/projects?tab=messages"
            aria-current={messagesActive ? "page" : undefined}
            className={`${itemClass} ${messagesActive ? activeClass : mutedClass}`}
          >
            <Glyph name="messages" />
            <span className="flex-1">Messages</span>
            <span className="inline-flex size-6 items-center justify-center rounded-full border-2 border-white bg-[#7b61ff] font-display text-[9px] font-bold text-white">
              {unreadMessages}
            </span>
          </Link>
        )}
        <Link
          href="/saved-designers"
          aria-current={savedActive ? "page" : undefined}
          className={`${itemClass} ${savedActive ? activeClass : mutedClass}`}
        >
          <Glyph name="saved" />
          Saved Designers
        </Link>
        <UnavailableControl aria-label="Billing & Invoices is not available yet" className="w-full text-left">
          <span className={`${itemClass} ${mutedClass}`}>
            <Glyph name="billing" />
            Billing & Invoices
          </span>
        </UnavailableControl>
      </nav>

      <div className="mt-auto border-t border-[#f3f4f6] p-4">
        {showNeedDesigner ? <NeedDesignerCard className="mb-4" /> : null}
        <UnavailableControl aria-label="Settings is not available yet" className="w-full text-left">
          <span className={`${itemClass} ${mutedClass}`}>
            <Glyph name="settings" />
            Settings
          </span>
        </UnavailableControl>
      </div>
    </aside>
  );
}
