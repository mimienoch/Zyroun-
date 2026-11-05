"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FigmaAsset } from "../figma-asset";
import { Icon } from "../ui/icon";
import { Snackbar } from "../ui/snackbar";
import { Switch } from "../ui/switch";
import { currentSettingsTab } from "./settings-shell";
import { SettingsShell } from "./settings-shell";
import { UnavailableControl } from "./unavailable";

const initial = {
  name: "Alex Rivera",
  website: "https://alexrivera.design",
  portfolio: "https://dribbble.com/alexrivera",
  bio: "Passionate UI/UX designer with 5+ years of experience creating intuitive digital experiences. Specialized in FinTech and SaaS platforms. Always looking for the next creative challenge.",
  available: true,
  visibility: "public",
  language: "en",
};

function looksLikeUrl(value: string) {
  return /^https?:\/\/\S+\.\S+/i.test(value.trim());
}

function CameraGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.5 5.2h2.1l.9-1.4h5l.9 1.4h2.1A1.5 1.5 0 0 1 15 6.7v5.8A1.5 1.5 0 0 1 13.5 14h-11A1.5 1.5 0 0 1 1 12.5V6.7A1.5 1.5 0 0 1 2.5 5.2Z"
        fill="white"
      />
      <circle cx="8" cy="9.4" r="2.4" fill="#111827" />
    </svg>
  );
}

export function SettingsPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const section = currentSettingsTab(pathname, searchParams.get("tab"));
  const [name, setName] = useState(initial.name);
  const [website, setWebsite] = useState(initial.website);
  const [portfolio, setPortfolio] = useState(initial.portfolio);
  const [bio, setBio] = useState(initial.bio);
  const [available, setAvailable] = useState(initial.available);
  const [visibility, setVisibility] = useState(initial.visibility);
  const [language, setLanguage] = useState(initial.language);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const remaining = Math.max(0, 240 - bio.length);
  const websiteOk = looksLikeUrl(website);
  const portfolioOk = looksLikeUrl(portfolio);
  const showIdentity = section === "Public Profile" || section === "Account Details";
  const showPrefs = section === "Public Profile";
  const showDesigned = showIdentity;

  function reset() {
    setName(initial.name);
    setWebsite(initial.website);
    setPortfolio(initial.portfolio);
    setBio(initial.bio);
    setAvailable(initial.available);
    setVisibility(initial.visibility);
    setLanguage(initial.language);
    setError("");
    setSaved(false);
  }

  function save() {
    if (!name.trim()) {
      setError("Display name is required.");
      setSaved(false);
      return;
    }
    if (bio.length > 240) {
      setError("About You must be 240 characters or fewer.");
      setSaved(false);
      return;
    }
    setError("");
    setSaved(true);
  }

  return (
    <SettingsShell>
      {showDesigned ? (
        <form
          className="mx-auto flex max-w-[768px] flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
        >
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
            <h2 className="font-sans text-xl font-bold text-[#111827]">Public Profile</h2>
            <Link href="/profile" className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[#7b61ff]">
              <Icon name="arrow-up-right" className="size-3 text-[#7b61ff]" />
              View Public Profile
            </Link>
          </div>

          {showIdentity ? (
            <>
              <div>
                <p className="font-sans text-sm font-medium text-[#374151]">Profile Picture</p>
                <div className="mt-3 flex flex-wrap items-center gap-6">
                  <div className="relative size-24 overflow-hidden rounded-full">
                    <FigmaAsset
                      src="/images/hiw-avatar-1.png"
                      alt=""
                      className="size-24 rounded-full object-cover"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                      <CameraGlyph />
                    </span>
                  </div>
                  <div>
                    <div className="flex gap-3">
                      <UnavailableControl
                        className="rounded-lg px-4 py-2 font-sans text-sm font-medium text-[#374151]"
                        reason="Photo upload is not connected."
                      >
                        Change
                      </UnavailableControl>
                      <UnavailableControl
                        className="rounded-lg px-4 py-2 font-sans text-sm font-medium text-[#dc2626]"
                        reason="Photo upload is not connected."
                      >
                        Remove
                      </UnavailableControl>
                    </div>
                    <p className="mt-2 font-sans text-xs text-[#6b7280]">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block font-sans text-sm font-medium text-[#374151]" htmlFor="display-name">
                  Display Name
                  <input
                    id="display-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-2 h-[42px] w-full rounded-lg border-0 bg-[#f9fafb] px-4 font-sans text-sm font-normal text-[#1f2937] outline-none focus-visible:ring-2 focus-visible:ring-[#7b61ff]"
                  />
                </label>
                <label className="block font-sans text-sm font-medium text-[#374151]" htmlFor="website">
                  Personal Website
                  <span className="relative mt-2 block">
                    <input
                      id="website"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                      className={`h-[42px] w-full rounded-lg border-0 px-4 pr-10 font-sans text-sm text-[#1f2937] outline-none focus-visible:ring-2 focus-visible:ring-[#7b61ff] ${
                        websiteOk ? "bg-[#f0fdf4]" : "bg-[#f9fafb]"
                      }`}
                    />
                    {websiteOk ? (
                      <Icon name="check" className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#22c55e]" />
                    ) : null}
                  </span>
                </label>
                <label className="block font-sans text-sm font-medium text-[#374151] sm:col-span-2" htmlFor="portfolio">
                  Portfolio Link
                  <span className="relative mt-2 block">
                    <input
                      id="portfolio"
                      value={portfolio}
                      onChange={(event) => setPortfolio(event.target.value)}
                      className={`h-[42px] w-full rounded-lg border-0 px-4 pr-10 font-sans text-sm text-[#1f2937] outline-none focus-visible:ring-2 focus-visible:ring-[#7b61ff] ${
                        portfolioOk ? "bg-[#f0fdf4]" : "bg-[#f9fafb]"
                      }`}
                    />
                    {portfolioOk ? (
                      <Icon name="check" className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#22c55e]" />
                    ) : null}
                  </span>
                  {portfolioOk ? (
                    <span className="mt-1 block font-sans text-xs font-normal text-[#16a34a]">
                      Link verified successfully.
                    </span>
                  ) : null}
                </label>
              </div>
            </>
          ) : null}

          {showPrefs ? (
            <>
              <label className="block font-sans text-sm font-medium text-[#374151]" htmlFor="about-you">
                About You <span className="font-normal text-[#6b7280]">(Brief bio)</span>
                <textarea
                  id="about-you"
                  value={bio}
                  rows={4}
                  onChange={(event) => setBio(event.target.value)}
                  className="mt-2 min-h-[106px] w-full rounded-lg border-0 bg-[#f9fafb] px-4 py-3 font-sans text-sm text-[#1f2937] outline-none focus-visible:ring-2 focus-visible:ring-[#7b61ff]"
                />
                <span className="mt-1 block text-right font-sans text-xs font-normal text-[#6b7280]">
                  {remaining} characters remaining
                </span>
              </label>

              <div className="border-t border-[#e5e7eb] pt-5">
                <h3 className="font-sans text-base font-semibold text-[#111827]">Preferences & Visibility</h3>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#f9fafb] p-4">
                  <div>
                    <p className="font-sans text-sm font-medium text-[#111827]">Available for work</p>
                    <p className="mt-1 font-sans text-xs text-[#6b7280]">
                      Show a badge on your profile indicating you are open to new projects.
                    </p>
                  </div>
                  <Switch
                    checked={available}
                    onCheckedChange={setAvailable}
                    aria-label="Available for work"
                    className={available ? "bg-[#48c774]" : undefined}
                  />
                </div>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <label className="block font-sans text-sm font-medium text-[#374151]" htmlFor="visibility">
                    Default Design Visibility
                    <span className="relative mt-2 block">
                      <select
                        id="visibility"
                        value={visibility}
                        onChange={(event) => setVisibility(event.target.value)}
                        className="h-[42px] w-full appearance-none rounded-lg border-0 bg-[#f9fafb] px-4 pr-10 font-sans text-sm font-normal text-[#1f2937] outline-none focus-visible:ring-2 focus-visible:ring-[#7b61ff]"
                      >
                        <option value="public">Public (Everyone can see)</option>
                        <option value="private">Private</option>
                      </select>
                      <Icon
                        name="chevron-down"
                        className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-[#9ca3af]"
                      />
                    </span>
                  </label>
                  <label className="block font-sans text-sm font-medium text-[#374151]" htmlFor="language">
                    Primary Language
                    <span className="relative mt-2 block">
                      <select
                        id="language"
                        value={language}
                        onChange={(event) => setLanguage(event.target.value)}
                        className="h-[42px] w-full appearance-none rounded-lg border-0 bg-[#f9fafb] px-4 pr-10 font-sans text-sm font-normal text-[#1f2937] outline-none focus-visible:ring-2 focus-visible:ring-[#7b61ff]"
                      >
                        <option value="en">English (US)</option>
                        <option value="fr">French</option>
                      </select>
                      <Icon
                        name="chevron-down"
                        className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-[#9ca3af]"
                      />
                    </span>
                  </label>
                </div>
              </div>
            </>
          ) : null}

          {error ? <p className="font-sans text-sm text-[#dc2626]">{error}</p> : null}
          {saved ? (
            <Snackbar onDismiss={() => setSaved(false)}>
              Changes are kept on this page only. Nothing is saved to an account.
            </Snackbar>
          ) : null}

          <div className="flex flex-wrap justify-end gap-4 pt-6">
            <button type="button" onClick={reset} className="h-10 px-5 font-sans text-sm font-medium text-[#4b5563]">
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 rounded-lg bg-[#7b61ff] px-6 font-sans text-sm font-medium text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="max-w-[768px]">
          <h2 className="font-sans text-xl font-bold text-[#111827]">{section}</h2>
          <p className="mt-3 font-sans text-sm text-[#6b7280]">
            {section} is listed in the selected Figma frame, but that section has no designed content here. Email,
            payment, security, and account deletion are not connected.
          </p>
        </div>
      )}
    </SettingsShell>
  );
}
