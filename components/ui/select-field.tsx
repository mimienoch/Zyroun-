import type { SelectHTMLAttributes } from "react";
import { Icon } from "./icon";

export function SelectField({
  label,
  className = "",
  id,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={id} className="font-sans text-xs font-medium text-n-900">
          {label}
        </label>
      ) : null}
      <span className="relative">
        <select
          id={id}
          className={`h-[45px] w-full appearance-none rounded-input border border-n-300 bg-n-000 px-4 pr-10 font-sans text-sm text-n-900 outline-none hover:border-n-500 focus-visible:border-z-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300 disabled:border-disabled-outline disabled:bg-disabled-bg ${className}`}
          {...props}
        >
          {children}
        </select>
        <Icon name="chevron-down" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-n-500" />
      </span>
    </div>
  );
}
