import { FigmaAsset } from "../figma-asset";

export type AvatarSize = 24 | 32 | 48 | 80;

const sizeClass: Record<AvatarSize, string> = {
  24: "size-6 text-[10px]",
  32: "size-8 text-xs",
  48: "size-12 text-sm",
  80: "size-20 text-xl",
};

export function Avatar({
  src,
  alt = "",
  initials,
  size = 48,
  className = "",
}: {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  className?: string;
}) {
  const frame = `inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-n-300 font-sans font-medium text-n-700 ${sizeClass[size]} ${className}`;

  if (src) {
    return <FigmaAsset src={src} alt={alt} className={`${frame} object-cover`} />;
  }

  return (
    <span className={frame} aria-hidden={alt ? undefined : true} aria-label={alt || undefined}>
      {initials?.slice(0, 2).toUpperCase() ?? ""}
    </span>
  );
}
