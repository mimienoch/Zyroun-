type FigmaAssetProps = {
  src: string;
  alt: string;
  className?: string;
};

export function FigmaAsset({ src, alt, className }: FigmaAssetProps) {
  return (
    // Figma SVGs include intrinsic width/height; do not stretch them with next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}
