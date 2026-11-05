"use client";

import Link from "next/link";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";
import { Tag, tagTypeFromLabel } from "../ui/tag";
import type { JobListing } from "./jobs-data";
import { UnavailableControl } from "./unavailable";

export function JobCard({
  job,
  compact = false,
}: {
  job: JobListing;
  compact?: boolean;
}) {
  const detailsHref = job.slug === "nexus-banking" ? "/jobs/nexus-banking" : undefined;
  const submitHref =
    job.slug === "nexus-banking" ? "/jobs/nexus-banking/submit" : undefined;

  return (
    <article className="rounded-2xl border border-[#f3f4f6] bg-white p-6 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <span
            className={`mt-0.5 size-10 shrink-0 rounded-xl ${
              job.category === "Brand Identity"
                ? "bg-gradient-to-br from-[#fb7185] to-[#fda4af]"
                : "bg-gradient-to-br from-[#7b61ff] via-[#5ce1e6] to-[#fb7185]"
            }`}
          />
          <div>
            {detailsHref ? (
              <Link href={detailsHref} className="font-sans text-lg font-bold text-[#0f172a]">
                {job.title}
              </Link>
            ) : (
              <h3 className="font-sans text-lg font-bold text-[#0f172a]">{job.title}</h3>
            )}
            <p className="mt-1 font-sans text-sm text-[#6b7280]">
              {job.client} <span className="text-[#22c55e]">●</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <Tag key={tag.label} type={tagTypeFromLabel(tag.label)}>
                  {tag.label}
                </Tag>
              ))}
            </div>
          </div>
        </div>
        <button type="button" aria-label="Save job" className="text-[#9ca3af]">
          ♡
        </button>
      </div>
      <p className="mt-4 font-sans text-sm leading-6 text-[#64748b]">{job.summary}</p>
      <div className={`mt-5 grid gap-3 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}>
        <div className="rounded-xl bg-[#f8fafc] px-4 py-3">
          <p className="font-sans text-xs text-[#9ca3af]">{job.budgetLabel}</p>
          <p className="mt-1 font-sans text-lg font-bold text-[#0f172a]">{job.budgetValue}</p>
        </div>
        <div className="rounded-xl bg-[#f8fafc] px-4 py-3">
          <p className="font-sans text-xs text-[#9ca3af]">Time Left</p>
          <p className="mt-1 font-sans text-lg font-semibold text-[#f97316]">{job.timeLeft}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-sans text-sm text-[#6b7280]">
          <FigmaAsset src="/images/hiw-avatar-2.png" alt="" className="size-6 rounded-full" />
          {job.people}
          <span className="text-[#eab308]">★ {job.rating}</span>
          <span>(Client)</span>
        </p>
        {job.cta === "apply" && detailsHref ? (
          <Button href={detailsHref} size="sm">
            Apply Now
          </Button>
        ) : submitHref ? (
          <Button href={submitHref} size="sm">
            Submit Design
          </Button>
        ) : (
          <UnavailableControl
            reason="This listing has no job details or submission screen in the selected Figma frames"
            className="inline-flex h-10 items-center rounded-button bg-gradient-to-r from-z-300 to-z-cyan px-5 font-display text-xs font-bold text-white"
          >
            Submit Design
          </UnavailableControl>
        )}
      </div>
    </article>
  );
}
