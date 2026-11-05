import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export const fieldClass =
  "h-[45px] w-full rounded-input border border-n-300 bg-n-000 px-4 font-sans text-sm text-n-900 outline-none placeholder:text-n-500 hover:border-n-500 focus-visible:border-z-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300 disabled:border-disabled-outline disabled:bg-disabled-bg disabled:text-disabled-text aria-[invalid=true]:border-red";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  helper?: string;
  error?: string;
  success?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function TextField({
  label,
  helper,
  error,
  success,
  leading,
  trailing,
  className = "",
  id,
  ...props
}: TextFieldProps) {
  const invalid = Boolean(error) || props["aria-invalid"] === true;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={id} className="font-sans text-xs font-medium text-n-900">
          {label}
        </label>
      ) : null}
      <span className="relative">
        {leading ? (
          <span className="pointer-events-none absolute top-0 left-3 flex h-[45px] items-center text-n-500">
            {leading}
          </span>
        ) : null}
        <input
          id={id}
          className={`${fieldClass} ${leading ? "pl-10" : ""} ${trailing ? "pr-10" : ""} ${className}`}
          aria-invalid={invalid}
          {...props}
        />
        {trailing ? (
          <span className="absolute top-0 right-3 flex h-[45px] items-center">{trailing}</span>
        ) : null}
      </span>
      {error ? <span className="font-sans text-xs text-red">{error}</span> : null}
      {!error && success ? <span className="font-sans text-xs text-green">{success}</span> : null}
      {!error && !success && helper ? <span className="font-sans text-xs text-n-500">{helper}</span> : null}
    </div>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helper?: string;
  error?: string;
};

export function TextArea({ label, helper, error, className = "", id, ...props }: TextAreaProps) {
  const invalid = Boolean(error) || props["aria-invalid"] === true;
  return (
    <label className="flex flex-col gap-1.5" htmlFor={id}>
      {label ? (
        <span className="font-sans text-xs font-medium text-n-900">{label}</span>
      ) : null}
      <textarea
        id={id}
        className={`min-h-[90px] w-full rounded-input border border-n-300 bg-n-000 px-4 py-3 font-sans text-sm text-n-900 outline-none placeholder:text-n-500 hover:border-n-500 focus-visible:border-z-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300 disabled:border-disabled-outline disabled:bg-disabled-bg disabled:text-disabled-text aria-[invalid=true]:border-red ${className}`}
        aria-invalid={invalid}
        {...props}
      />
      {error ? <span className="font-sans text-xs text-red">{error}</span> : null}
      {!error && helper ? <span className="font-sans text-xs text-n-500">{helper}</span> : null}
    </label>
  );
}
