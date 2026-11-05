export function CountBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex size-6 items-center justify-center rounded-full bg-z-300 font-sans text-[10px] font-medium text-white ${className}`}
    >
      {children}
    </span>
  );
}
