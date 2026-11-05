import { Icon } from "./icon";

type RatingProps = {
  value: number;
  max?: number;
  size?: "sm" | "lg";
  onChange?: (value: number) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export function Rating({
  value,
  max = 5,
  size = "lg",
  onChange,
  disabled = false,
  label = "Rating",
  className = "",
}: RatingProps) {
  const px = size === "lg" ? "size-6" : "size-5";
  const interactive = Boolean(onChange) && !disabled;

  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`} role={interactive ? "radiogroup" : "img"} aria-label={`${label}: ${value} of ${max}`}>
      {Array.from({ length: max }, (_, index) => {
        const star = index + 1;
        const filled = star <= Math.round(value);
        const starEl = (
          <Icon
            name="star"
            className={`${px} ${filled ? "text-[#facc15]" : "text-n-300"}`}
          />
        );
        if (!interactive) {
          return <span key={star}>{starEl}</span>;
        }
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === Math.round(value)}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-z-300"
            onClick={() => onChange?.(star)}
          >
            {starEl}
          </button>
        );
      })}
    </div>
  );
}
