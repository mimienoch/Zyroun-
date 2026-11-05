import type { ReactNode } from "react";

export type JobTagType = "urgent" | "category" | "guaranteed" | "participation";

const styles: Record<JobTagType, string> = {
  urgent: "bg-red-light-2 text-red",
  category: "bg-z-50 text-z-300",
  guaranteed: "bg-green-light-2 text-green",
  participation: "bg-orange-light-2 text-orange-dark",
};

export function tagTypeFromLabel(label: string): JobTagType {
  const value = label.trim().toLowerCase();
  if (value === "urgent") return "urgent";
  if (value === "guaranteed") return "guaranteed";
  if (value === "participation paid" || value === "participation") return "participation";
  return "category";
}

export function Tag({
  children,
  type = "category",
  icon,
  trailing,
  className = "",
}: {
  children: ReactNode;
  type?: JobTagType;
  icon?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-6 items-center gap-1 rounded-tag px-3 font-display text-xs font-medium ${styles[type]} ${className}`}
    >
      {icon}
      {children}
      {trailing}
    </span>
  );
}
