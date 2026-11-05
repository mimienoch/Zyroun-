import type { InputHTMLAttributes, ReactNode } from "react";
import { Icon } from "./icon";

export function FileUpload({
  label = "Upload files",
  hint,
  className = "",
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  hint?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-input border-2 border-dashed border-n-300 bg-n-000 px-4 py-8 text-center hover:border-z-300 focus-within:border-z-300 ${className}`}
    >
      <Icon name="upload-cloud" className="size-6 text-z-300" />
      <span className="font-sans text-sm font-medium text-n-900">{label}</span>
      {hint ? <span className="font-sans text-xs text-n-500">{hint}</span> : null}
      <input type="file" className="sr-only" {...props} />
    </label>
  );
}
