"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { Header } from "./header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lightChrome = pathname === "/how-it-works" || pathname === "/designers";

  return (
    <>
      <Header search={lightChrome} />
      {children}
      <Footer variant={lightChrome ? "light" : "home"} />
    </>
  );
}
