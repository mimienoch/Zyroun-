"use client";

import type { ReactNode } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchBar } from "../ui/search-bar";
import { DesignerAppFooter } from "./designer-app-footer";
import { DesignerSidebar } from "./designer-sidebar";

const items = [
  { label: "Account Details", href: "/settings?tab=account" },
  { label: "Creative Skills", href: "/settings/skills" },
  { label: "Public Profile", href: "/settings" },
  { label: "Emails & Notifications", href: "/settings/emails" },
  { label: "Payment Method", href: "/settings?tab=payment" },
  { label: "Security", href: "/settings/security" },
  { label: "Delete Account", href: "/settings?tab=delete", danger: true },
] as const;

export type SettingsTab =
  | "Account Details"
  | "Creative Skills"
  | "Public Profile"
  | "Emails & Notifications"
  | "Payment Method"
  | "Security"
  | "Delete Account";

export function currentSettingsTab(pathname: string, tab: string | null): SettingsTab {
  if (pathname.startsWith("/settings/skills")) return "Creative Skills";
  if (pathname.startsWith("/settings/security")) return "Security";
  if (pathname.startsWith("/settings/emails")) return "Emails & Notifications";
  if (tab === "account") return "Account Details";
  if (tab === "emails") return "Emails & Notifications";
  if (tab === "payment") return "Payment Method";
  if (tab === "security") return "Security";
  if (tab === "delete") return "Delete Account";
  return "Public Profile";
}

export function SettingsShell({
  children,
  title = "Profile Settings",
  subtitle = "Manage your account settings and preferences.",
  actions,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <SettingsChrome current="Public Profile" title={title} subtitle={subtitle} actions={actions}>
          {children}
        </SettingsChrome>
      }
    >
      <SettingsShellInner title={title} subtitle={subtitle} actions={actions}>
        {children}
      </SettingsShellInner>
    </Suspense>
  );
}

function SettingsShellInner({
  children,
  title,
  subtitle,
  actions,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = currentSettingsTab(pathname, searchParams.get("tab"));
  return (
    <SettingsChrome current={current} title={title} subtitle={subtitle} actions={actions}>
      {children}
    </SettingsChrome>
  );
}

function SettingsChrome({
  children,
  current,
  title,
  subtitle,
  actions,
}: {
  children: ReactNode;
  current: SettingsTab;
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {

  return (
    <div className="flex w-full flex-col bg-[#f9fafb] lg:flex-row lg:items-start">
      <DesignerSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex min-w-0 flex-1 flex-col bg-[#f8fafc]">
          <header className="flex min-h-[89px] flex-col justify-center gap-3 border-b border-[#f3f4f6] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h1 className="font-sans text-2xl leading-8 font-bold text-[#111827]">{title}</h1>
              <p className="font-sans text-sm leading-5 text-[#6b7280]">{subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center">
              {actions !== undefined ? (
                actions
              ) : (
                <>
                  <SearchBar
                    className="h-[38px] w-full min-w-[180px] rounded-full border-[#e5e7eb] bg-[#f9fafb] sm:w-64"
                    placeholder="Search..."
                    aria-label="Search settings"
                  />
                  <Link
                    href="/profile"
                    className="ml-4 inline-flex h-9 items-center rounded-full bg-[#7b61ff] px-5 font-sans text-sm font-medium text-white shadow-[0_1px_2px_rgba(138,99,248,0.2)]"
                  >
                    View Public Profile
                  </Link>
                </>
              )}
            </div>
          </header>

          <div className="px-5 py-8 sm:px-8">
            <div className="rounded-2xl border border-[#f3f4f6] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col lg:flex-row lg:items-start">
                <nav
                  className="shrink-0 border-b border-[#f3f4f6] bg-[#f9fafb]/50 p-6 lg:w-64 lg:border-r lg:border-b-0"
                  aria-label="Settings"
                >
                  <div className="flex flex-col gap-1">
                    {items.map((item) => {
                      const active = current === item.label;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={`relative min-h-10 rounded-lg px-4 py-2.5 font-sans text-sm font-medium ${
                            active
                              ? "bg-white text-[#7b61ff] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                              : "danger" in item && item.danger
                                ? "text-[#dc2626]"
                                : "text-[#4b5563]"
                          }`}
                          aria-current={active ? "page" : undefined}
                        >
                          {active ? (
                            <span
                              aria-hidden
                              className="absolute top-1/2 left-px h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#7b61ff]"
                            />
                          ) : null}
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </nav>
                <section className="min-w-0 flex-1 px-6 py-8 sm:px-10">{children}</section>
              </div>
            </div>
          </div>
        </main>
        <DesignerAppFooter />
      </div>
    </div>
  );
}
