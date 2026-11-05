import type { ButtonHTMLAttributes } from "react";

type SwitchProps = {
  checked: boolean;
  onCheckedChange?: (next: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export function Switch({
  checked,
  onCheckedChange,
  disabled = false,
  label,
  className = "",
  ...props
}: SwitchProps) {
  const control = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={`relative h-6 w-12 shrink-0 rounded-[28px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300 ${
        disabled ? "bg-disabled-bg" : checked ? "bg-z-300" : "bg-n-300"
      } ${className}`}
      {...props}
    >
      <span
        aria-hidden
        className={`absolute top-0.5 size-5 rounded-full bg-n-000 shadow-button transition-transform ${
          checked ? "translate-x-[26px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );

  if (!label) return control;

  return (
    <label className="inline-flex items-center gap-2 font-sans text-sm text-n-900">
      {control}
      {label}
    </label>
  );
}
