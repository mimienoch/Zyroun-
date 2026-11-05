import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "brand" | "solid" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  justify?: "center" | "between";
  iconOnly?: boolean;
  disabled?: boolean;
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  "aria-label"?: string;
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 min-w-10 gap-2.5 px-4 text-xs font-medium",
  md: "h-12 min-w-12 gap-3 px-5 text-sm font-medium",
  lg: "h-14 min-w-14 gap-3 px-6 text-base font-medium",
};

const iconOnlyPad: Record<ButtonSize, string> = {
  sm: "px-4",
  md: "px-5",
  lg: "px-6",
};

const variants: Record<ButtonVariant, string> = {
  brand:
    "bg-gradient-to-r from-z-300 to-z-cyan font-bold text-white shadow-button hover:shadow-[0px_2px_12px_rgba(123,97,255,0.25)] disabled:from-z-200 disabled:to-z-200 disabled:shadow-button",
  solid:
    "bg-z-300 text-white shadow-button hover:bg-z-400 disabled:bg-z-200 disabled:hover:bg-z-200",
  ghost:
    "bg-transparent text-n-900 shadow-button hover:bg-z-50 hover:font-bold hover:text-z-300 disabled:bg-transparent disabled:text-disabled-text",
  outline:
    "border border-n-300 bg-n-000 text-n-900 shadow-button hover:bg-n-100 disabled:border-disabled-outline disabled:bg-disabled-bg disabled:text-disabled-text",
};

export function Button({
  href,
  children,
  variant = "brand",
  size = "md",
  className = "",
  icon,
  iconPosition = "start",
  justify = "center",
  iconOnly = false,
  disabled = false,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classNameValue = `inline-flex items-center rounded-button font-display whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300 ${
    justify === "between" ? "justify-between" : "justify-center"
  } ${sizes[size]} ${iconOnly ? iconOnlyPad[size] : ""} ${variant === "brand" && !disabled ? "font-bold" : ""} ${variants[variant]} ${
    disabled ? "pointer-events-none" : ""
  } ${className}`;

  const content = (
    <>
      {iconOnly ? icon : iconPosition === "start" ? icon : null}
      {iconOnly ? null : children}
      {iconOnly ? null : iconPosition === "end" ? icon : null}
    </>
  );

  if (href) {
    if (disabled) {
      return (
        <span className={classNameValue} aria-disabled="true" aria-label={ariaLabel}>
          {content}
        </span>
      );
    }
    return (
      <Link href={href} className={classNameValue} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classNameValue} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
