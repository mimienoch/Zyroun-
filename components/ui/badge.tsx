export type BadgeTone = "purple" | "green" | "blue" | "red" | "orange" | "gold" | "neutral";

const tones: Record<BadgeTone, string> = {
  purple: "bg-purple-light-2 text-purple-dark",
  green: "bg-green-light-2 text-green",
  blue: "bg-blue-light-2 text-blue",
  red: "bg-red-light-2 text-red",
  orange: "bg-orange-light-2 text-orange-dark",
  gold: "bg-orange-light-2 text-orange-dark",
  neutral: "bg-n-100 text-n-700",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-sans text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
