import type { ReactNode } from "react";
import { Icon } from "./icon";

export type SnackbarTone = "purple" | "blue";

const tones: Record<SnackbarTone, string> = {
  purple: "border-z-200 bg-z-50 text-z-400",
  blue: "border-[#d7ebff] bg-blue-light-2 text-blue",
};

export function Snackbar({
  children,
  tone = "purple",
  onDismiss,
  className = "",
}: {
  children: ReactNode;
  tone?: SnackbarTone;
  onDismiss?: () => void;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-[10px] border p-4 font-sans text-sm ${tones[tone]} ${className}`}
    >
      <div className="min-w-0 flex-1">{children}</div>
      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss"
          className="shrink-0 text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300"
          onClick={onDismiss}
        >
          <Icon name="x" className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
