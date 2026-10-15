import Link from "next/link";

type ButtonVariant = "brand" | "solid" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  justify?: "center" | "between";
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 gap-2 px-4 py-2 text-xs font-medium",
  md: "h-12 gap-2 px-5 py-3 text-sm font-bold",
  lg: "h-14 gap-3 px-6 py-4 text-base font-medium",
};

const variants: Record<ButtonVariant, string> = {
  brand:
    "bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] text-white shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]",
  solid: "bg-[#7b61ff] text-white shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]",
  ghost:
    "bg-transparent text-[#0f172a] shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]",
  outline: "bg-white text-[#0f172a] shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]",
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
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-[30px] font-display whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff] ${justify === "between" ? "justify-between" : "justify-center"} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {iconPosition === "start" ? icon : null}
      {children}
      {iconPosition === "end" ? icon : null}
    </Link>
  );
}
