"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FigmaAsset } from "../figma-asset";
import { authInputClass } from "../auth/auth-card";
import { FieldNote, ProjectShell, WizardFooter } from "./project-shell";
import { useProjectDraft } from "./project-context";

const categories = [
  { value: "", label: "Select a category..." },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Logo Design", label: "Logo Design" },
  { value: "Branding & Logos", label: "Branding & Logos" },
  { value: "Web Design", label: "Web Design" },
];

export function BasicsPage() {
  const router = useRouter();
  const { draft, update } = useProjectDraft();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!draft.title.trim()) next.title = "Enter a project title.";
    if (!draft.category) next.category = "Select a category.";
    if (!draft.description.trim()) next.description = "Describe your project.";
    setErrors(next);
    if (Object.keys(next).length === 0) router.push("/post-project/requirements");
  }

  return (
    <ProjectShell>
      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-[24px] bg-white p-8 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)] md:p-10"
      >
        <h2 className="font-sans text-xl font-bold text-[#0f172a]">Project Information</h2>
        <p className="mt-2 font-sans text-sm text-[#64748b]">
          Give your project a clear title and define what you need.
        </p>
        <div className="mt-6 border-t border-[#f3f4f6] pt-6">
          <label className="flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-[#0f172a]">
              Project Title *
            </span>
            <input
              value={draft.title}
              onChange={(event) => update({ title: event.target.value })}
              placeholder="e.g., E-commerce App Redesign"
              className={`${authInputClass} h-[49px] bg-[#f8fafc]`}
            />
          </label>
          <FieldNote>A clear, descriptive title helps attract the right designers.</FieldNote>
          {errors.title ? (
            <p className="mt-1 font-sans text-xs text-[#dc2626]">{errors.title}</p>
          ) : null}

          <label className="mt-6 flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-[#0f172a]">Category *</span>
            <span className="relative">
              <select
                value={draft.category}
                onChange={(event) => update({ category: event.target.value })}
                className={`${authInputClass} h-[49px] appearance-none bg-[#f8fafc] pr-10`}
              >
                {categories.map((item) => (
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
          {errors.category ? (
            <p className="mt-1 font-sans text-xs text-[#dc2626]">{errors.category}</p>
          ) : null}

          <label className="mt-6 flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-[#0f172a]">
              Description & Goals *
            </span>
            <textarea
              value={draft.description}
              onChange={(event) => update({ description: event.target.value })}
              placeholder="Describe your project, target audience, and primary goals..."
              className="min-h-[140px] w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3 font-sans text-sm outline-none placeholder:text-[#9ca3af] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
            />
          </label>
          <FieldNote>Be as detailed as possible to get accurate proposals.</FieldNote>
          {errors.description ? (
            <p className="mt-1 font-sans text-xs text-[#dc2626]">{errors.description}</p>
          ) : null}

          <p className="mt-6 font-sans text-sm font-medium text-[#0f172a]">
            Attachments & Brief (Optional)
          </p>
          <label className="mt-3 flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#cbd5e1] bg-white px-4 py-6 text-center">
            <FigmaAsset src="/images/auth-icon-cloud.svg" alt="" />
            <p className="mt-2 font-sans text-sm">
              <span className="text-[#7b61ff]">Upload a file</span>
              <span className="text-[#64748b]"> or drag and drop</span>
            </p>
            <p className="font-sans text-xs text-[#9ca3af]">PDF, PNG, JPG up to 10MB</p>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg" className="sr-only" />
          </label>
        </div>
        <WizardFooter backHref="/signup" />
      </form>
    </ProjectShell>
  );
}
