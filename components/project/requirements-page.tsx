"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FigmaAsset } from "../figma-asset";
import { authInputClass } from "../auth/auth-card";
import { ProjectShell, WizardFooter } from "./project-shell";
import { useProjectDraft } from "./project-context";

const styles = ["Minimalist", "Corporate", "Playful", "Dark Mode"];
const timelines = [
  { value: "", label: "Select timeline..." },
  { value: "1-2 weeks", label: "1-2 weeks" },
  { value: "2-4 weeks", label: "2-4 weeks" },
  { value: "4-8 weeks", label: "4-8 weeks" },
];

export function RequirementsPage() {
  const router = useRouter();
  const { draft, update } = useProjectDraft();

  function toggleStyle(style: string) {
    update({
      styles: draft.styles.includes(style)
        ? draft.styles.filter((item) => item !== style)
        : [...draft.styles, style],
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/post-project/budget");
  }

  return (
    <ProjectShell>
      <form
        onSubmit={onSubmit}
        className="rounded-[24px] bg-white p-8 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)] md:p-10"
      >
        <h2 className="font-sans text-xl font-bold text-[#0f172a]">Requirements</h2>
        <p className="mt-2 font-sans text-sm text-[#64748b]">
          Define your visual preferences and project constraints.
        </p>
        <div className="mt-6 border-t border-[#f3f4f6] pt-6">
          <p className="font-sans text-sm font-medium text-[#0f172a]">Style Preferences</p>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            {styles.map((style) => {
              const selected = draft.styles.includes(style);
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => toggleStyle(style)}
                  className={`h-12 rounded-xl border font-sans text-sm ${
                    selected
                      ? "border-[#7b61ff] bg-[#f3f0ff] text-[#7b61ff]"
                      : "border-[#e5e7eb] bg-white text-[#0f172a]"
                  }`}
                >
                  {style}
                </button>
              );
            })}
          </div>
          <p className="mt-6 font-sans text-sm font-medium text-[#0f172a]">
            Estimated Budget (USD)
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="relative">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 font-sans text-sm text-[#9ca3af]">
                $
              </span>
              <input
                value={draft.budgetMin}
                onChange={(event) => update({ budgetMin: event.target.value })}
                placeholder="Min"
                className={`${authInputClass} bg-[#f8fafc] pl-8`}
              />
            </label>
            <label className="relative">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 font-sans text-sm text-[#9ca3af]">
                $
              </span>
              <input
                value={draft.budgetMax}
                onChange={(event) => update({ budgetMax: event.target.value })}
                placeholder="Max"
                className={`${authInputClass} bg-[#f8fafc] pl-8`}
              />
            </label>
          </div>
          <label className="mt-6 flex flex-col gap-2">
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
        <WizardFooter backHref="/post-project" />
      </form>
    </ProjectShell>
  );
}
