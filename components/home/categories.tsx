import Image from "next/image";
import Link from "next/link";
import { FigmaAsset } from "../figma-asset";

const imageCards = [
  {
    title: "UI/UX Design",
    designers: "12,400+ Designers",
    src: "/images/category-uiux.png",
    tall: true,
    overlay: "from-black/80 via-black/20 to-transparent",
  },
  {
    title: "Branding & Logos",
    designers: "18,200+ Designers",
    src: "/images/category-branding.png",
    tall: false,
    overlay: "from-[rgba(124,58,237,0.9)] via-[rgba(124,58,237,0.4)] to-transparent",
  },
  {
    title: "Web Design",
    designers: "15,100+ Designers",
    src: "/images/category-web.png",
    tall: true,
    overlay: "from-black/80 via-black/20 to-transparent",
  },
];

export function Categories() {
  return (
    <section className="w-full bg-[#f8fafc] px-5 py-16 md:px-20 md:py-32" id="categories">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 md:gap-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-[32px] font-bold leading-none text-[#0f172a] md:text-[40px] md:leading-[40px]">
              Explore categories
            </h2>
            <p className="mt-2 font-display text-base font-medium text-[#4b5563]">
              Find specialized talent for your specific needs.
            </p>
          </div>
          <Link
            href="#categories"
            className="font-display text-base font-bold text-[#7b61ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
          >
            View all categories
          </Link>
        </div>
        <div className="grid justify-center gap-6 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-start">
          {imageCards.map((card) => (
            <Link
              key={card.title}
              href="#categories"
              className={`relative w-full overflow-hidden rounded-3xl shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff] ${
                card.tall
                  ? "min-h-[320px] lg:h-[409px] lg:w-[290px]"
                  : "min-h-[280px] lg:h-[320px] lg:w-[290px]"
              }`}
            >
              <Image
                src={card.src}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${card.overlay}`} />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{card.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                  <FigmaAsset src="/images/icon-designers.svg" alt="" />
                  {card.designers}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href="#categories"
            className="flex min-h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] lg:h-[320px] lg:w-[290px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
          >
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-[#f8fafc]">
              <FigmaAsset src="/images/icon-layers-more.svg" alt="" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0f172a]">Explore More</h3>
            <p className="mt-2 text-center text-sm text-[#64748b]">
              Illustration, Packaging, 3D &amp; more
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
