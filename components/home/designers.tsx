import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";

const designers = [
  { name: "Elena R.", role: "Brand Identity Expert" },
  { name: "Elena R.", role: "Brand Identity Expert" },
  { name: "Elena R.", role: "Brand Identity Expert" },
  { name: "Elena R.", role: "Brand Identity Expert" },
];

export function Designers() {
  return (
    <section id="designers" className="w-full border-t border-[#eee] bg-white px-5 py-16 md:px-20 md:py-24">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12">
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-end md:justify-between">
          <Link
            href="#designers"
            className="font-display text-base font-bold text-[#7b61ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
          >
            Browse all designers
          </Link>
          <div className="md:text-right">
            <h2 className="font-display text-[32px] font-bold text-[#0f172a] md:text-[40px]">
              Top Tier Talent
            </h2>
            <p className="mt-2 font-display text-base font-medium text-[#0f172a]">
              Work directly with our highest-rated, hand-vetted design professionals.
            </p>
          </div>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {designers.map((designer, index) => (
            <li
              key={`${designer.name}-${index}`}
              className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] shadow-[-2px_4px_12px_4px_rgba(51,51,51,0.04)]"
            >
              <div className="relative flex flex-col items-center">
                <div className="relative h-32 w-full overflow-hidden opacity-80">
                  <Image
                    src="/images/designer-cover.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="290px"
                  />
                </div>
                <div className="relative -mt-10 flex flex-col items-end">
                  <Image
                    src="/images/avatar-elena.png"
                    alt=""
                    width={80}
                    height={80}
                    className="size-20 rounded-full"
                  />
                  <span className="-mt-3 ml-auto flex size-6 items-center justify-center rounded-full border-2 border-white bg-[#7b61ff]">
                    <FigmaAsset src="/images/icon-check.svg" alt="" />
                    <span className="sr-only">Verified designer</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 px-4 pt-1 pb-6">
                <h3 className="font-display text-base font-bold text-[#0f172a]">{designer.name}</h3>
                <p className="font-display text-xs font-medium text-[#64748b]">{designer.role}</p>
                <p className="flex items-center gap-1 font-display text-sm font-bold text-[#0f172a]">
                  <span className="inline-flex size-6 items-center justify-center">
                    <FigmaAsset src="/images/icon-star.svg" alt="" />
                  </span>
                  4.9
                  <span className="font-medium text-[#64748b]">(124 reviews)</span>
                </p>
                <Button href="#post-project" variant="ghost" size="sm" className="mt-2 w-full">
                  Invite to Contest
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
