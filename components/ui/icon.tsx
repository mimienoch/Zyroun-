export const ffIconNames = [
  "search",
  "send",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "heart",
  "star",
  "check",
  "arrow-up-right",
  "arrow-left",
  "layers",
  "users",
  "x",
  "award",
  "user",
  "zap",
  "file-text",
  "download",
  "git-pull-request",
  "eye",
  "eye-off",
  "credit-card",
  "lock",
  "globe",
  "shield",
  "upload-cloud",
  "mail",
  "phone",
  "headphones",
  "user-check",
  "menu",
  "more-horizontal",
  "edit-2",
  "grid",
  "briefcase",
  "facebook",
  "instagram",
  "linkedin",
  "twitter",
  "sun",
  "sliders",
  "dollar-sign",
] as const;

export type FfIconName = (typeof ffIconNames)[number];

export function Icon({
  name,
  className = "",
  label,
}: {
  name: FfIconName;
  className?: string;
  label?: string;
}) {
  return (
    <span
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block shrink-0 bg-current ${/\bsize-/.test(className) ? "" : "size-6"} ${className}`}
      style={{
        mask: `url(/images/ff/${name}.svg) center / contain no-repeat`,
        WebkitMask: `url(/images/ff/${name}.svg) center / contain no-repeat`,
      }}
    />
  );
}
