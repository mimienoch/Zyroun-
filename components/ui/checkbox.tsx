import type { InputHTMLAttributes } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: string;
  error?: boolean;
  indeterminate?: boolean;
};

export function Checkbox({
  label,
  error = false,
  className = "",
  id,
  checked,
  indeterminate = false,
  ...props
}: CheckboxProps) {
  const box = (
    <span className="relative inline-flex size-[18px] shrink-0">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className={`peer size-[18px] appearance-none rounded-[4px] border bg-n-000 outline-none focus-visible:ring-2 focus-visible:ring-z-300 focus-visible:ring-offset-1 checked:border-z-300 checked:bg-z-300 disabled:border-disabled-outline disabled:bg-disabled-bg ${
          error ? "border-red" : "border-n-300"
        } ${className}`}
        {...props}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden items-center justify-center text-white peer-checked:flex peer-indeterminate:flex"
      >
        {indeterminate ? (
          <span className="block h-0.5 w-2.5 rounded-full bg-white" />
        ) : (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l2.5 2.5L9 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </span>
  );

  if (!label) return box;

  return (
    <label htmlFor={id} className="inline-flex items-center gap-2 font-sans text-sm text-n-900">
      {box}
      {label}
    </label>
  );
}
