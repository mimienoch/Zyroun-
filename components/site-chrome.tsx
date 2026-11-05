"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Footer } from "./footer";
import { Header } from "./header";

function SiteChromeInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? searchParams.get("chrome");
  const isProject = pathname.startsWith("/post-project");
  const isDesignerApp =
    pathname === "/dashboard" ||
    pathname.startsWith("/jobs") ||
    pathname === "/profile" ||
    pathname === "/notifications" ||
    pathname === "/messages" ||
    pathname === "/invites" ||
    pathname === "/submissions" ||
    pathname === "/watchlist" ||
    pathname === "/payouts" ||
    pathname === "/settings" ||
    pathname.startsWith("/settings/");
  const clientDesignerProfile =
    pathname.startsWith("/designers/") &&
    (from === "saved" || from === "projects" || from === "client");
  const isClientApp = pathname.startsWith("/projects") || pathname === "/saved-designers" || clientDesignerProfile;
  const lightChrome =
    pathname === "/how-it-works" ||
    pathname === "/designers" ||
    (pathname.startsWith("/designers/") && !clientDesignerProfile) ||
    pathname === "/pricing" ||
    pathname === "/contact" ||
    pathname === "/login" ||
    pathname.startsWith("/signup");

  return (
    <>
      {isProject || isDesignerApp || isClientApp ? null : <Header search={lightChrome} />}
      {children}
      {isProject || isDesignerApp || isClientApp ? null : (
        <Footer variant={lightChrome ? "light" : "home"} />
      )}
    </>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <SiteChromeInner>{children}</SiteChromeInner>
    </Suspense>
  );
}
