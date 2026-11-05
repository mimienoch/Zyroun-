"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FigmaAsset } from "../figma-asset";
import { Logo } from "../logo";

type DesignerHeaderProps = {
  backHref?: string;
  backLabel?: string;
};

export function DesignerHeader({ backHref, backLabel }: DesignerHeaderProps) {
  const pathname = usePathname();

  if (backHref && backLabel) {
    return (
      <header className="w-full border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-5 md:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#0f172a]"
          >
            <span aria-hidden="true">←</span>
            {backLabel}
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="font-sans text-sm text-[#6b7280]">
              Dashboard
            </Link>
            <UserChip />
          </div>
        </div>
      </header>
    );
  }

  const items =
    pathname === "/profile"
      ? [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/jobs", label: "Browse Jobs" },
          { href: "/profile", label: "Profile" },
        ]
      : [
          { href: "/jobs", label: "Browse Jobs" },
          { href: "/profile", label: "Profile" },
        ];

  return (
    <header className="w-full border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Designer">
          {pathname === "/profile" ? null : (
            <Link
              href="/submissions"
              className={`text-sm ${
                pathname === "/submissions"
                  ? "border-b border-[#7b61ff] bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text font-medium text-transparent"
                  : "text-[#6b7280]"
              }`}
              aria-current={pathname === "/submissions" ? "page" : undefined}
            >
              Submissions
            </Link>
          )}
          {items.map((item) => {
            const current =
              item.href === "/jobs"
                ? pathname.startsWith("/jobs")
                : pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm ${
                  current
                    ? "border-b border-[#7b61ff] bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text font-medium text-transparent"
                    : "text-[#6b7280]"
                }`}
                aria-current={current ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <UserChip />
      </div>
    </header>
  );
}

function UserChip() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/notifications"
        aria-label="Notifications"
        className="flex size-10 items-center justify-center rounded-full border border-[#e5e7eb]"
      >
        <FigmaAsset src="/images/icon-star.svg" alt="" className="size-4" />
      </Link>
      <Link href="/profile" className="flex items-center gap-2">
        <FigmaAsset
          src="/images/hiw-avatar-1.png"
          alt=""
          className="size-10 rounded-full object-cover"
        />
        <div className="hidden sm:block">
          <p className="font-sans text-sm font-semibold text-[#0f172a]">Alex Carter</p>
          <p className="font-sans text-xs text-[#6b7280]">Sr. UI/UX Designer</p>
        </div>
      </Link>
    </div>
  );
}
