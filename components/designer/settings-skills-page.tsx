"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "../ui/icon";
import type { FfIconName } from "../ui/icon";
import { Snackbar } from "../ui/snackbar";
import { SettingsShell } from "./settings-shell";

const disciplines = [
  { label: "UI/UX Design", icon: "layers" as FfIconName },
  { label: "Graphic Design", icon: "edit-2" as FfIconName },
  { label: "Illustration", icon: "grid" as FfIconName },
  { label: "Motion", icon: "zap" as FfIconName },
] as const;

const levels = ["Expert", "Intermediate", "Beginner"] as const;
type Level = (typeof levels)[number];
type Skill = { name: string; level: Level; icon: FfIconName; tone: "purple" | "blue" | "lilac" };

const initialSkills: Skill[] = [
  { name: "Figma", level: "Expert", icon: "layers", tone: "purple" },
  { name: "Adobe Photoshop", level: "Intermediate", icon: "edit-2", tone: "blue" },
  { name: "Branding", level: "Beginner", icon: "grid", tone: "lilac" },
];

const levelClass: Record<Level, string> = {
  Expert: "bg-[#dcfce7] text-[#15803d]",
  Intermediate: "bg-[#dbeafe] text-[#1d4ed8]",
  Beginner: "bg-[#f3f4f6] text-[#4b5563]",
};

const toneClass = {
  purple: "bg-[#f4f1ff] text-[#7b61ff]",
  blue: "bg-[#eff6ff] text-[#3b82f6]",
  lilac: "bg-[#faf5ff] text-[#7b61ff]",
};

function TrashGlyph() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
      <path
        d="M1 4h12M5 4V2.5A1.5 1.5 0 0 1 6.5 1h1A1.5 1.5 0 0 1 9 2.5V4M2.5 4l.8 9.2A1.5 1.5 0 0 0 4.8 14.5h4.4a1.5 1.5 0 0 0 1.5-1.3L11.5 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SettingsSkillsPage() {
  const [selected, setSelected] = useState<string[]>(["UI/UX Design"]);
  const [skills, setSkills] = useState(initialSkills);
  const [draft, setDraft] = useState("");
  const [level, setLevel] = useState<Level>("Expert");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function reset() {
    setSelected(["UI/UX Design"]);
    setSkills(initialSkills);
    setDraft("");
    setLevel("Expert");
    setError("");
    setNotice("");
  }

  function addSkill() {
    const name = draft.trim();
    if (!name) {
      setError("Enter a skill to add.");
      setNotice("");
      return;
    }
    if (skills.some((skill) => skill.name.toLowerCase() === name.toLowerCase())) {
      setError("That skill is already on your list.");
      setNotice("");
      return;
    }
    setSkills((current) => [...current, { name, level, icon: "layers", tone: "purple" }]);
    setDraft("");
    setError("");
  }

  return (
    <SettingsShell>
      <div className="mx-auto flex max-w-[768px] flex-col gap-6">
        <div className="flex flex-col gap-2 rounded-xl bg-[#f4f1ff] p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-sans text-sm font-semibold text-[#111827]">Profile Completeness</h2>
            <p className="font-sans text-sm font-bold text-[#7b61ff]">85%</p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#e5e7eb]">
            <div className="h-full w-[85%] rounded-full bg-[#7b61ff]" />
          </div>
          <p className="font-sans text-xs text-[#6b7280]">
            Complete your profile to increase your visibility to clients.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <h2 className="font-sans text-xl font-bold text-[#111827]">Creative Skills</h2>
          <Link href="/profile" className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[#7b61ff]">
            <Icon name="arrow-up-right" className="size-3 text-[#7b61ff]" />
            View Public Profile
          </Link>
        </div>

        <fieldset>
          <legend className="font-sans text-sm font-medium text-[#374151]">Primary Disciplines</legend>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {disciplines.map((item) => {
              const on = selected.includes(item.label);
              return (
                <button
                  key={item.label}
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    setSelected((current) =>
                      current.includes(item.label)
                        ? current.filter((value) => value !== item.label)
                        : [...current, item.label],
                    )
                  }
                  className={`flex min-h-[84px] flex-col items-center justify-center rounded-xl px-3 py-4 ${
                    on ? "bg-[#f4f1ff]" : "bg-white"
                  }`}
                >
                  <Icon
                    name={item.icon}
                    className={`mb-2 size-5 ${on ? "text-[#7b61ff]" : "text-[#9ca3af]"}`}
                  />
                  <span className={`font-sans text-sm font-medium ${on ? "text-[#7b61ff]" : "text-[#4b5563]"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <p className="font-sans text-sm font-medium text-[#374151]">Tools & Technologies</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search and add skills</span>
              <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#9ca3af]" />
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Search and add skills (e.g. Figma, React)..."
                className="h-[42px] w-full rounded-lg border-0 bg-[#f9fafb] py-2.5 pr-4 pl-9 font-sans text-sm text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus-visible:ring-2 focus-visible:ring-[#7b61ff]"
              />
            </label>
            <label className="relative w-full sm:w-40">
              <span className="sr-only">Proficiency</span>
              <select
                value={level}
                onChange={(event) => setLevel(event.target.value as Level)}
                className="h-[42px] w-full appearance-none rounded-lg border-0 bg-[#f9fafb] px-5 pr-10 font-sans text-sm text-[#1f2937] outline-none focus-visible:ring-2 focus-visible:ring-[#7b61ff]"
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <Icon
                name="chevron-down"
                className="pointer-events-none absolute top-1/2 right-3 size-3 -translate-y-1/2 text-[#9ca3af]"
              />
            </label>
            <button
              type="button"
              onClick={addSkill}
              className="h-[42px] rounded-lg bg-[#111827] px-4 font-sans text-sm font-medium text-white"
            >
              Add Skill
            </button>
          </div>

          <ul className="mt-4 space-y-3">
            {skills.map((skill) => (
              <li
                key={skill.name}
                className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-3"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={`inline-flex size-8 items-center justify-center rounded-lg ${toneClass[skill.tone]}`}
                  >
                    <Icon name={skill.icon} className="size-4" />
                  </span>
                  <span className="font-sans text-sm font-medium text-[#111827]">{skill.name}</span>
                </span>
                <span className="flex items-center gap-4">
                  <button
                    type="button"
                    className={`rounded-full px-2.5 py-1 font-sans text-xs font-medium ${levelClass[skill.level]}`}
                    aria-label={`Change proficiency for ${skill.name}, currently ${skill.level}`}
                    onClick={() =>
                      setSkills((current) =>
                        current.map((item) =>
                          item.name === skill.name
                            ? {
                                ...item,
                                level: levels[(levels.indexOf(item.level) + 1) % levels.length],
                              }
                            : item,
                        ),
                      )
                    }
                  >
                    {skill.level}
                  </button>
                  <button
                    type="button"
                    className="text-[#9ca3af]"
                    aria-label={`Remove ${skill.name}`}
                    onClick={() => setSkills((current) => current.filter((item) => item.name !== skill.name))}
                  >
                    <TrashGlyph />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {error ? <p className="font-sans text-sm text-[#dc2626]">{error}</p> : null}
        {notice ? (
          <Snackbar onDismiss={() => setNotice("")}>{notice}</Snackbar>
        ) : null}

        <div className="sticky bottom-0 -mx-6 flex flex-wrap justify-end gap-4 bg-white px-6 py-4 sm:-mx-10 sm:px-10">
          <button
            type="button"
            onClick={reset}
            className="h-10 px-5 font-sans text-sm font-medium text-[#4b5563]"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={() => {
              if (selected.length === 0) {
                setError("Select at least one primary discipline.");
                setNotice("");
                return;
              }
              setError("");
              setNotice("Changes are kept on this page only. Nothing is saved to an account.");
            }}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#7b61ff] px-6 font-sans text-sm font-medium text-white"
          >
            <Icon name="check" className="size-3 text-white" />
            Save Changes
          </button>
        </div>
      </div>
    </SettingsShell>
  );
}
