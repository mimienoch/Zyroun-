export function Progress({
  value,
  max = 100,
  size = "md",
  className = "",
}: {
  value: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`w-full overflow-hidden rounded-full bg-n-300 ${size === "sm" ? "h-1" : "h-2"} ${className}`}
    >
      <div className="h-full rounded-full bg-z-300" style={{ width: `${pct}%` }} />
    </div>
  );
}
