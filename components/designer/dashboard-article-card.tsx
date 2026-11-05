"use client";

import { Button } from "../button";
import { Avatar } from "../ui/avatar";
import { AvatarGroup } from "../ui/avatar-group";
import { Icon } from "../ui/icon";
import { Tag } from "../ui/tag";

const applicants = [
  "/images/designer-naylia.png",
  "/images/hiw-avatar-1.png",
  "/images/hiw-avatar-2.png",
  "/images/hiw-avatar-3.png",
];

export function DashboardArticleCard({
  saved,
  onToggleSave,
}: {
  saved: boolean;
  onToggleSave: () => void;
}) {
  return (
    <article className="flex w-full flex-col gap-2 rounded-lg border border-n-300 bg-n-000 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Avatar src="/images/designer-naylia.png" size={48} alt="" />
          <div>
            <h3 className="font-display text-lg font-bold text-n-900">Naylia Rhamen</h3>
            <p className="mt-0.5 flex items-center gap-1.5 font-display text-sm font-medium text-n-500">
              Web Designer • Verified Client
              <Icon name="check" className="size-3.5 text-green" />
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved jobs" : "Save job"}
          onClick={onToggleSave}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-button bg-n-100 shadow-button focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300"
        >
          <Icon name="heart" className={`size-4 ${saved ? "text-z-300" : "text-n-500"}`} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Tag type="category" icon={<Icon name="check" className="size-[11px] text-z-300" />}>
          UI/UX Design
        </Tag>
        <Tag type="guaranteed" icon={<Icon name="shield" className="size-[11px] text-green" />}>
          Guaranteed
        </Tag>
        <Tag type="participation" icon={<Icon name="credit-card" className="size-[11px] text-orange-dark" />}>
          Participation Paid
        </Tag>
      </div>

      <p className="px-2.5 py-2.5 font-display text-sm font-medium text-n-900">
        Looking for an experienced product designer to redesign our core banking application
        focusing on gen-z users. Must have experience…
      </p>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-sans text-xs text-n-500">Budget</p>
          <p className="mt-[5px] font-sans text-base font-medium text-black">$4,500-$6,000</p>
        </div>
        <div className="text-right">
          <p className="font-sans text-xs text-n-500">Time Left</p>
          <p className="mt-[5px] font-sans text-base font-medium text-[#ffa000]">3 days, 4 hrs</p>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3 border-t border-n-300 pt-4">
        <div className="flex items-end gap-3">
          <div className="flex items-center">
            <AvatarGroup>
              {applicants.map((src) => (
                <Avatar key={src} src={src} size={24} className="border border-white" alt="" />
              ))}
            </AvatarGroup>
            <p className="pl-2 font-display text-xs font-medium text-black">15 Applied</p>
          </div>
          <p className="flex items-center gap-1 font-display text-xs">
            <Icon name="star" className="size-5 text-[#facc15]" />
            <span className="font-bold text-n-900">5.0</span>
            <span className="font-medium text-n-500">(Client)</span>
          </p>
        </div>
        <Button href="/jobs/nexus-banking" variant="solid" size="sm" className="w-[124px]">
          Apply Now
        </Button>
      </div>
    </article>
  );
}
