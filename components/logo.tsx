import Link from "next/link";
import { FigmaAsset } from "./figma-asset";

type LogoProps = {
  variant?: "default" | "onDark";
};

export function Logo({ variant = "default" }: LogoProps) {
  const onDark = variant === "onDark";

  return (
    <Link
      href="/"
      className="flex items-center gap-[18.675px] rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
    >
      <FigmaAsset
        src={onDark ? "/images/logo-mark-white.svg" : "/images/logo-mark.svg"}
        alt=""
      />
      <span
        className={`font-display text-[24px] font-bold leading-none ${
          onDark ? "text-white" : "text-black"
        }`}
      >
        Zyroun.
      </span>
      <span className="sr-only">Zyroun home</span>
    </Link>
  );
}
