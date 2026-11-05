"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";
import { MAX_PRIZE, useProjectDraft } from "./project-context";
import { SupportHeader } from "./support-header";

const steps = [
  { href: "/post-project", label: "Step 1", title: "Brief Basics" },
  { href: "/post-project/requirements", label: "Step 2", title: "Requirements" },
  { href: "/post-project/budget", label: "Step 3", title: "Budget & Timeline" },
  { href: "/post-project/review", label: "Step 4", title: "Review & Publish" },
];

function money(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export function ProjectShell({
  children,
  showBreakdown = false,
}: {
  children: React.ReactNode;
  showBreakdown?: boolean;
}) {
  const pathname = usePathname();
  const { draft } = useProjectDraft();
  const fee = Math.round(draft.prize * 0.1);
  const total = draft.prize + fee;
  const currentIndex = Math.max(
    0,
    steps.findIndex((step) => step.href === pathname),
  );

  return (
    <>
      <SupportHeader />
      <main className="flex w-full justify-center bg-white px-5 py-10 md:px-8">
        <div className="flex w-full max-w-[1330px] flex-col gap-8 lg:flex-row lg:gap-8">
          <aside className="w-full shrink-0 lg:w-64">
            <h1 className="font-sans text-xl font-bold text-[#0f172a]">Post a Project</h1>
            <ol className="relative mt-8 flex flex-col gap-6 border-l border-[#e5e7eb] pl-6">
              {steps.map((step, index) => {
                const active = index === currentIndex;
                return (
                  <li key={step.href} className="relative">
                    <span
                      className={`absolute top-1.5 -left-[31px] size-3 rounded-full ${
                        active
                          ? "bg-white ring-4 ring-[#7b61ff]"
                          : "bg-[#e5e7eb]"
                      }`}
                    />
                    <Link href={step.href} className="block">
                      <p
                        className={`font-sans text-sm font-medium ${
                          active ? "text-[#0f172a]" : "text-[#9ca3af]"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p
                        className={`font-sans text-sm ${
                          active ? "text-[#0f172a]" : "text-[#9ca3af]"
                        }`}
                      >
                        {step.title}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </aside>
          <div className="min-w-0 flex-1">{children}</div>
          <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-72">
            {showBreakdown ? (
              <article className="rounded-2xl bg-white p-6 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)]">
                <h2 className="font-sans text-sm font-semibold text-[#0f172a]">
                  Estimated Breakdown (USD)
                </h2>
                <div className="mt-5 flex flex-col gap-3 font-sans text-sm text-[#64748b]">
                  <div className="flex justify-between">
                    <span>Winning Prize</span>
                    <span className="text-[#0f172a]">{money(draft.prize)}{draft.prize >= MAX_PRIZE ? "+" : ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (10%)</span>
                    <span className="text-[#0f172a]">{money(fee)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#f3f4f6] pt-3 font-semibold text-[#0f172a]">
                    <span>Total Investment</span>
                    <span className="bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text text-transparent">
                      {money(total)}
                    </span>
                  </div>
                </div>
                <p className="mt-4 rounded-xl bg-[#f3f0ff] p-3 font-sans text-xs leading-5 text-[#7b61ff]">
                  This budget typically attracts 15-25 high-quality design
                  submissions within 7 days.
                </p>
              </article>
            ) : null}
            <article className="rounded-2xl bg-white p-6 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)]">
              <h2 className="font-sans text-xs font-semibold tracking-wide text-[#0f172a] uppercase">
                Project Summary
              </h2>
              <dl className="mt-4 divide-y divide-[#f3f4f6] font-sans text-sm">
                <div className="flex justify-between py-3">
                  <dt className="text-[#9ca3af]">Visibility</dt>
                  <dd className="flex items-center gap-1 text-[#0f172a]">
                    <FigmaAsset src="/images/auth-icon-globe.svg" alt="" />
                    Public
                  </dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-[#9ca3af]">Est. Budget</dt>
                  <dd className="text-[#9ca3af]">Not set</dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-[#9ca3af]">Deadline</dt>
                  <dd className="text-[#9ca3af]">Not set</dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-[#9ca3af]">Completion</dt>
                  <dd className="text-[#7b61ff]">25%</dd>
                </div>
              </dl>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f3f4f6]">
                <div className="h-full w-1/4 rounded-full bg-[#7b61ff]" />
              </div>
            </article>
            <article className="rounded-2xl border border-[#dbeafe] bg-[#eff6ff] p-5">
              <div className="flex gap-2">
                <FigmaAsset src="/images/auth-icon-bulb.svg" alt="" />
                <div>
                  <h2 className="font-sans text-sm font-semibold text-[#0f172a]">
                    Need help?
                  </h2>
                  <p className="mt-1 font-sans text-xs leading-5 text-[#64748b]">
                    A clear, detailed brief attracts higher-quality designers. Be
                    as specific as possible about your goals.
                  </p>
                </div>
              </div>
            </article>
          </aside>
        </div>
      </main>
    </>
  );
}

export function WizardFooter({
  backHref,
  nextLabel = "Next Step",
  nextHref,
  onNext,
  nextVariant = "dark",
}: {
  backHref: string;
  nextLabel?: string;
  nextHref?: string;
  onNext?: () => void;
  nextVariant?: "dark" | "brand";
}) {
  const darkClass = nextVariant === "dark" ? "bg-n-900 from-n-900 to-n-900 hover:shadow-none" : "";

  return (
    <div className="mt-8 flex items-center justify-between border-t border-[#f3f4f6] pt-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 font-sans text-sm text-[#64748b]"
      >
        <FigmaAsset src="/images/auth-icon-back.svg" alt="" />
        Back
      </Link>
      {nextHref ? (
        <Button href={nextHref} size="sm" className={darkClass}>
          {nextLabel}
        </Button>
      ) : (
        <Button type="submit" size="sm" onClick={onNext} className={darkClass}>
          {nextLabel}
        </Button>
      )}
    </div>
  );
}

export function FieldNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 font-sans text-xs text-[#9ca3af]">{children}</p>;
}

export { MAX_PRIZE };
