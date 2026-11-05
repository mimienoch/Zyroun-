import Link from "next/link";
import type { ReactNode } from "react";

const currentClass =
  "relative bg-n-000 font-medium text-z-300 before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-r before:bg-z-300";
const idleClass = "text-n-700 hover:bg-z-50";

export function SettingsNavItem({
  href,
  current = false,
  children,
  className = "",
}: {
  href?: string;
  current?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const classes = `flex min-h-10 items-center rounded-md px-3 py-2 font-sans text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300 ${
    current ? currentClass : idleClass
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-current={current ? "page" : undefined}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
