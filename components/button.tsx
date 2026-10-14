import Link from "next/link";

type ButtonVariant = "brand" | "solid" | "ghost" | "outline";
type ButtonSize = "sm" | "md";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: React.ReactNode;
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 py-2 text-xs font-medium",
  md: "h-12 px-5 py-3 text-sm font-bold",
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
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-[30px] font-display whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff] ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {icon}
      {children}
    </Link>
  );
}
