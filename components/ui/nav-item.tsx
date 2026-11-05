import type { ReactNode } from "react";
import Link from "next/link";

export function NavItem({
  href,
  current = false,
  children,
  className = "",
}: {
  href: string;
  current?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`flex h-[37px] items-center justify-center px-2.5 font-sans text-sm hover:font-medium hover:text-z-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300 ${
        current
          ? "border-b border-z-300 bg-gradient-to-r from-z-300 to-z-cyan bg-clip-text font-medium text-transparent"
          : "font-normal text-n-900"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
