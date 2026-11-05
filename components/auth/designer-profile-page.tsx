"use client";

import { FormEvent, KeyboardEvent, useState } from "react";
import Link from "next/link";
import { FigmaAsset } from "../figma-asset";
import { AuthCard, authInputClass } from "./auth-card";

const experienceLevels = [
  { value: "", label: "Select experience level" },
  { value: "0-1", label: "0–1 years" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5+", label: "5+ years" },
];

export function DesignerProfilePage() {
  const [displayName, setDisplayName] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [skills, setSkills] = useState(["Branding", "UI Design"]);
  const [skillDraft, setSkillDraft] = useState("");
  const [experience, setExperience] = useState("");
  const [setupPayout, setSetupPayout] = useState(false);
  const [error, setError] = useState("");

  function addSkill() {
    const next = skillDraft.trim();
    if (!next || skills.includes(next)) return;
    setSkills((current) => [...current, next]);
    setSkillDraft("");
  }

  function onSkillKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!displayName.trim()) {
      setError("Enter a display name.");
      return;
    }
    setError("");
  }

  return (
    <main className="flex w-full flex-col items-center bg-white px-5 py-[69px]">
      <AuthCard>
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
          <div className="flex flex-col gap-2 pt-2">
            <h1 className="text-center font-sans text-2xl font-bold text-[#1a1a1a]">
              Create Your Designer Profile
            </h1>
            <p className="text-center font-sans text-sm text-[#6b7280]">
              Please enter your details to sign in.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <label className="flex flex-col gap-1">
              <span className="font-sans text-sm font-medium text-[#374151]">
                Display Name*
              </span>
              <input
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="How clients will see you"
                className={authInputClass}
              />
              {error ? (
                <span className="font-sans text-xs text-[#dc2626]">{error}</span>
              ) : null}
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-sans text-sm font-medium text-[#374151]">
                Location
              </span>
              <span className="relative">
                <select
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className={`${authInputClass} appearance-none pr-10`}
                >
                  <option value="">City, Country</option>
                  <option value="remote">Remote</option>
                </select>
                <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
                  <FigmaAsset src="/images/icon-chevron-down.svg" alt="" className="size-3" />
                </span>
              </span>
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-sans text-sm font-medium text-[#374151]">
                Timezone
              </span>
              <span className="relative">
                <select
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                  className={`${authInputClass} appearance-none pr-10`}
                >
                  <option value="">Enter your timezone</option>
                  <option value="est">Eastern Time (EST)</option>
                  <option value="gmt">GMT</option>
                </select>
                <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
                  <FigmaAsset src="/images/icon-chevron-down.svg" alt="" className="size-3" />
                </span>
              </span>
            </label>
            <div className="flex flex-col gap-1">
              <span className="font-sans text-sm font-medium text-[#374151]">
                Primary Skills
              </span>
              <div className="flex min-h-[58px] flex-wrap items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-md bg-[#f3f0ff] px-2 py-1 font-sans text-xs text-[#7b61ff]"
                  >
                    {skill}
                    <button
                      type="button"
                      aria-label={`Remove ${skill}`}
                      onClick={() =>
                        setSkills((current) => current.filter((item) => item !== skill))
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  value={skillDraft}
                  onChange={(event) => setSkillDraft(event.target.value)}
                  onKeyDown={onSkillKey}
                  onBlur={addSkill}
                  placeholder="Add a skill..."
                  className="min-w-[90px] flex-1 font-sans text-sm text-[#1a1a1a] outline-none placeholder:text-[#9ca3af]"
                />
              </div>
            </div>
            <label className="flex flex-col gap-1">
              <span className="font-sans text-sm font-medium text-[#374151]">
                Years of Experience
              </span>
              <span className="relative">
                <select
                  value={experience}
                  onChange={(event) => setExperience(event.target.value)}
                  className={`${authInputClass} appearance-none pr-10`}
                >
                  {experienceLevels.map((item) => (
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
          <div className="rounded-xl border border-black/10 p-4">
            <div className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f3f0ff]">
                <FigmaAsset src="/images/auth-icon-wallet.svg" alt="" />
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="font-sans text-sm font-semibold text-[#1a1a1a]">
                  Get ready to get paid
                </h2>
                <p className="font-sans text-xs leading-5 text-[#6b7280]">
                  You&apos;ll need to set up your payout method before you can
                  submit to projects. You can do this now or later in settings.
                </p>
                <label className="flex items-center gap-2 font-sans text-sm text-[#6b7280]">
                  <input
                    type="checkbox"
                    checked={setupPayout}
                    onChange={(event) => setSetupPayout(event.target.checked)}
                    className="size-4 rounded-[2.5px] border border-[#e5e7eb]"
                  />
                  Set up payout method next
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[#f3f4f6] pt-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 font-sans text-sm text-[#64748b]"
            >
              <FigmaAsset src="/images/auth-icon-back.svg" alt="" />
              Back
            </Link>
            <button
              type="submit"
              className="inline-flex h-10 items-center rounded-full bg-black px-6 font-sans text-sm font-medium text-white"
            >
              Next Step
            </button>
          </div>
        </form>
      </AuthCard>
    </main>
  );
}
