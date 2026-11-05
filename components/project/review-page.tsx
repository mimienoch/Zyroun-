"use client";

import { ProjectShell, WizardFooter } from "./project-shell";
import { useProjectDraft } from "./project-context";
import { FigmaAsset } from "../figma-asset";

function moneyRange(min: string, max: string, prize: number) {
  if (min && max) return `$${Number(min).toLocaleString()} - $${Number(max).toLocaleString()}`;
  return `$${prize.toLocaleString()}`;
}

export function ReviewPage() {
  const { draft } = useProjectDraft();
  const title = draft.title.trim() || "E-commerce App Redesign";
  const category = draft.category || "UI/UX Design";
  const timeline = draft.timeline || "2-4 weeks";
  const budget = moneyRange(draft.budgetMin, draft.budgetMax, draft.prize);

  return (
    <ProjectShell>
      <div className="rounded-[24px] bg-white p-8 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)] md:p-10">
        <h2 className="font-sans text-xl font-bold text-[#0f172a]">Ready to Post?</h2>
        <p className="mt-2 font-sans text-sm text-[#64748b]">
          Review your details and publish to connect with top designers.
        </p>
        <article className="mt-8 rounded-2xl bg-[#f8fafc] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-medium tracking-wide text-[#7b61ff] uppercase">
                Project type
              </p>
              <h3 className="mt-2 font-sans text-lg font-bold text-[#0f172a]">{title}</h3>
            </div>
            <span className="rounded-full bg-white px-3 py-1 font-sans text-xs text-[#0f172a] shadow-sm">
              {category}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#e5e7eb] pt-4">
            <div>
              <p className="font-sans text-xs text-[#9ca3af]">Budget</p>
              <p className="mt-1 font-sans text-sm font-medium text-[#0f172a]">{budget}</p>
            </div>
            <div>
              <p className="font-sans text-xs text-[#9ca3af]">Timeline</p>
              <p className="mt-1 font-sans text-sm font-medium text-[#0f172a]">{timeline}</p>
            </div>
          </div>
        </article>
        <article className="mt-6 flex gap-3 rounded-2xl border border-[#dbeafe] bg-[#eff6ff] p-5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white">
            <FigmaAsset src="/images/auth-icon-shield.svg" alt="" />
          </span>
          <div>
            <h3 className="font-sans text-sm font-semibold text-[#0f172a]">
              Secure & Guaranteed
            </h3>
            <p className="mt-1 font-sans text-xs leading-5 text-[#64748b]">
              Your project details are secure. You&apos;ll only pay when you approve the
              final milestones. Access to top 5% vetted talent.
            </p>
          </div>
        </article>
        <WizardFooter
          backHref="/post-project/budget"
          nextHref="/post-project/payment"
          nextLabel="Proceed to Payment"
          nextVariant="brand"
        />
      </div>
    </ProjectShell>
  );
}
