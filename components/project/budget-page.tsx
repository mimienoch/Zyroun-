"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FigmaAsset } from "../figma-asset";
import { authInputClass } from "../auth/auth-card";
import { ProjectShell, WizardFooter } from "./project-shell";
import { MAX_PRIZE, MIN_PRIZE, useProjectDraft } from "./project-context";

const timelines = [
  { value: "", label: "Select timeline..." },
  { value: "1-2 weeks", label: "1-2 weeks" },
  { value: "2-4 weeks", label: "2-4 weeks" },
  { value: "4-8 weeks", label: "4-8 weeks" },
];

function money(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export function BudgetPage() {
  const router = useRouter();
  const { draft, update } = useProjectDraft();
  const prizePercent = ((draft.prize - MIN_PRIZE) / (MAX_PRIZE - MIN_PRIZE)) * 100;
  const prizeTrack = `linear-gradient(90deg, #7b61ff, #5ce1e6) 0 / ${prizePercent}% 100% no-repeat, #f3f0ff`;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/post-project/review");
  }

  return (
    <ProjectShell showBreakdown>
      <form
        onSubmit={onSubmit}
        className="rounded-[24px] bg-white p-8 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)] md:p-10"
      >
        <h2 className="font-sans text-xl font-bold text-[#0f172a]">Budget & Timeline</h2>
        <p className="mt-2 font-sans text-sm text-[#64748b]">
          Define your visual preferences and project constraints.
        </p>
        <div className="mt-6 border-t border-[#f3f4f6] pt-6">
          <label className="flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-[#0f172a]">
              Estimated Budget (USD)
            </span>
            <span className="relative">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 font-sans text-sm text-[#9ca3af]">
                $
              </span>
              <input
                value={draft.prize}
                onChange={(event) => {
                  const value = Number(event.target.value.replace(/[^\d]/g, ""));
                  if (Number.isNaN(value)) return;
                  update({ prize: Math.min(MAX_PRIZE, Math.max(MIN_PRIZE, value)) });
                }}
                placeholder="Budget"
                className={`${authInputClass} bg-[#f8fafc] pl-8`}
              />
            </span>
          </label>
          <div className="mt-8 flex items-end justify-between">
            <p className="font-sans text-xs font-medium tracking-[0.7px] text-[#4b5563] uppercase">
              Prize pool
            </p>
            <p className="font-serif text-[30px] leading-9 font-bold text-[#0f172a]">
              {money(draft.prize)}
              {draft.prize >= MAX_PRIZE ? "+" : ""}
            </p>
          </div>
          <input
            type="range"
            min={MIN_PRIZE}
            max={MAX_PRIZE}
            step={50}
            value={draft.prize}
            onChange={(event) => update({ prize: Number(event.target.value) })}
            className="prize-slider mt-2"
            style={{ ["--prize-track" as string]: prizeTrack }}
            aria-label="Prize pool"
          />
          <div className="flex justify-between pt-2 font-sans text-xs text-[#4b5563]">
            <span>$500</span>
            <span>$10,000+</span>
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-[10px] bg-[#f3f4f6] p-4">
            <div className="min-w-0 flex-1">
              <p className="font-sans text-sm font-semibold text-[#0f172a]">
                Participation Payments
              </p>
              <p className="mt-1 font-sans text-xs text-[#64748b]">
                Guarantee payment to up to 3 shortlisted designers to attract
                higher quality pitches.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={draft.participation}
              aria-label="Participation payments"
              onClick={() => update({ participation: !draft.participation })}
              className={`relative h-6 w-12 shrink-0 rounded-[28px] ${
                draft.participation ? "bg-[#7b61ff]" : "bg-white"
              }`}
            >
              <span
                className={`absolute top-0 size-6 rounded-full border-[3px] bg-white ${
                  draft.participation
                    ? "translate-x-6 border-[#7b61ff]"
                    : "translate-x-0 border-[#e5e7eb]"
                }`}
              />
            </button>
          </div>
          <label className="mt-8 flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-[#0f172a]">
              Expected Timeline
            </span>
            <span className="relative">
              <select
                value={draft.timeline}
                onChange={(event) => update({ timeline: event.target.value })}
                className={`${authInputClass} appearance-none bg-[#f8fafc] pr-10`}
              >
                {timelines.map((item) => (
                  <option key={item.value || "placeholder"} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
                <FigmaAsset src="/images/icon-chevron-down.svg" alt="" className="size-3" />
              </span>
            </span>
          </label>
        </div>
        <WizardFooter backHref="/post-project/requirements" />
      </form>
    </ProjectShell>
  );
}
