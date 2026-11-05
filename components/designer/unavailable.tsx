type UnavailableControlProps = {
  children: React.ReactNode;
  className?: string;
  reason?: string;
  "aria-label"?: string;
};

export function UnavailableControl({
  children,
  className = "",
  reason = "This destination is not available yet",
  "aria-label": ariaLabel,
}: UnavailableControlProps) {
  return (
    <button
      type="button"
      aria-disabled="true"
      aria-label={ariaLabel}
      title={reason}
      className={`cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
