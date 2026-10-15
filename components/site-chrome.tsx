"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { Header } from "./header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const howItWorks = pathname === "/how-it-works";

  return (
    <>
      <Header search={howItWorks} />
      {children}
      <Footer variant={howItWorks ? "light" : "home"} />
    </>
  );
}
