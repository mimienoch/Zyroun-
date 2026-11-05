import { FigmaAsset } from "../figma-asset";

export const authInputClass =
  "h-[47px] w-full rounded-lg border border-[#e5e7eb] bg-white px-4 font-sans text-sm text-[#1a1a1a] outline-none placeholder:text-[#9ca3af] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]";

type AuthCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`w-full max-w-[471px] rounded-3xl bg-white px-[58px] py-12 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

export function AuthSocialRow({ label }: { label: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="relative flex h-5 w-full items-center justify-center">
        <span className="absolute inset-x-0 top-1/2 h-px bg-[#e5e7eb]" />
        <span className="relative bg-white px-2 font-sans text-sm text-[#6b7280]">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-4">
        {[
          { src: "/images/auth-icon-facebook.svg", label: "Continue with Facebook" },
          { src: "/images/auth-icon-google.svg", label: "Continue with Google" },
          { src: "/images/auth-icon-apple.svg", label: "Continue with Apple" },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            aria-label={item.label}
            className="flex size-10 items-center justify-center rounded-full bg-[#f3f4f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
          >
            <FigmaAsset src={item.src} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function SegmentedToggle({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex h-11 w-full rounded-lg bg-[#f3f4f6] p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`h-9 flex-1 rounded-md font-sans text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff] ${
            value === option.value
              ? "bg-white text-[#1a1a1a]"
              : "text-[#6b7280]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
