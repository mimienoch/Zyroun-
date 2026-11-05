"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";
import { SelectField } from "../ui/select-field";
import { TextArea, TextField } from "../ui/text-field";
import { UnavailableControl } from "../designer/unavailable";
import { clientProjects } from "../client/client-data";
import { SAVED_DESIGNER_SLUGS, type DesignerProfile } from "./designer-profiles";

export type ProfileVisitor = "own" | "public" | "client";

function cardClass() {
  return "rounded-2xl border border-[#e5e7eb] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.06),0px_1px_3px_rgba(0,0,0,0.10)]";
}

const inviteProjects = clientProjects.filter(
  (project) => project.status === "in-progress" || project.status === "review" || project.status === "draft",
);

function ProfileDialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const titleId = useId();

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Close dialog overlay" className="absolute inset-0 bg-[#0f172a]/70" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0px_24px_60px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
          <h2 id={titleId} className="font-sans text-lg font-semibold text-[#111827]">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-lg text-[#6b7280] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 2l8 8M10 2 2 10" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function DesignerPublicProfile({
  profile,
  visitor,
}: {
  profile: DesignerProfile;
  visitor: ProfileVisitor;
}) {
  const [saved, setSaved] = useState(() => SAVED_DESIGNER_SLUGS.includes(profile.slug as (typeof SAVED_DESIGNER_SLUGS)[number]));
  const [dialog, setDialog] = useState<"message" | "invite" | null>(null);
  const [message, setMessage] = useState("");
  const [messageNotice, setMessageNotice] = useState("");
  const [inviteProject, setInviteProject] = useState(inviteProjects[0]?.id ?? "");
  const [inviteNote, setInviteNote] = useState("");
  const [inviteNotice, setInviteNotice] = useState("");
  const showSave = visitor !== "own";

  function closeDialog() {
    setDialog(null);
    setMessageNotice("");
    setInviteNotice("");
  }

  function sendMessage(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) {
      setMessageNotice("Write a message before sending.");
      return;
    }
    setMessageNotice(`Saved locally for ${profile.name}. Nothing was sent to a server.`);
    setMessage("");
  }

  function sendInvite(event: FormEvent) {
    event.preventDefault();
    const project = inviteProjects.find((item) => item.id === inviteProject);
    if (!project) {
      setInviteNotice("Choose a project to invite this designer to.");
      return;
    }
    setInviteNotice(`Invite to “${project.title}” saved locally. Nothing was sent to a server.`);
    setInviteNote("");
  }

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div className="flex flex-col gap-9">
        <section className="flex flex-col gap-9">
          <div className={`${cardClass()} overflow-hidden`}>
            <div className="relative h-[200px] overflow-hidden">
              <FigmaAsset src={profile.cover} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f9a8d4]/55 via-[#c4b5fd]/40 to-[#67e8f9]/55" />
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              <div className="relative size-32 shrink-0">
                <FigmaAsset
                  src={profile.avatar}
                  alt=""
                  className="size-[120px] rounded-full border-4 border-white object-cover shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
                />
                <span
                  className={`absolute right-1 bottom-1 size-5 rounded-full border-2 border-white ${
                    profile.online ? "bg-[#22c55e]" : "bg-[#d1d5db]"
                  }`}
                />
                <span className="sr-only">{profile.online ? "Online" : "Offline"}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-sans text-2xl font-bold leading-8 text-[#111827]">{profile.name}</h1>
                  {profile.verified ? (
                    <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-[#6366f1] text-white" title="Verified">
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2.5 6.2 4.8 8.5 9.5 3.5" stroke="white" strokeWidth="1.6" />
                      </svg>
                      <span className="sr-only">Verified designer</span>
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 font-sans text-base font-medium leading-6 text-[#6b7280]">{profile.role}</p>
                <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-sm leading-5 text-[#6b7280]">
                  <span>{profile.location}</span>
                  <span>{profile.localTime}</span>
                  <span className="inline-flex items-center gap-1 text-[#111827]">
                    <FigmaAsset src="/images/icon-star-gold.svg" alt="" />
                    {profile.rating.toFixed(1)}
                    <span className="font-normal text-[#9ca3af]">({profile.reviewCount} reviews)</span>
                  </span>
                </p>
                {profile.fallbackStudio ? (
                  <p className="mt-2 font-sans text-xs text-[#6b7280]">
                    Studio fallback profile for contest entries. Not a saved-designers record.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialog("message")}
                icon={
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
                    <path d="M1 2.5 8 7l7-4.5M2 11h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1Z" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                }
              >
                Message
              </Button>
              <Button
                type="button"
                variant="solid"
                onClick={() => setDialog("invite")}
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M19 8v6M22 11h-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                }
              >
                Invite
              </Button>
              {showSave ? (
                <button
                  type="button"
                  aria-pressed={saved}
                  aria-label={saved ? `Remove ${profile.name} from saved designers` : `Save ${profile.name}`}
                  onClick={() => setSaved((value) => !value)}
                  className="inline-flex size-11 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6b7280] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={saved ? "#7b61ff" : "none"}
                    stroke={saved ? "#7b61ff" : "currentColor"}
                    strokeWidth="1.8"
                    aria-hidden
                  >
                    <path d="M12 20s-7-4.4-9-8.2C1.4 8.7 3.2 5 7 5c2 0 3.2 1 5 3 1.8-2 3-3 5-3 3.8 0 5.6 3.7 4 6.8-2 3.8-9 8.2-9 8.2Z" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        </section>

        <div className="grid gap-7 lg:grid-cols-[342px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-6">
            <article className={`${cardClass()} p-6`}>
              <h2 className="font-sans text-lg font-semibold leading-7 text-[#111827]">Overview</h2>
              <dl className="mt-4 space-y-4 font-sans text-sm">
                <div className="flex items-center justify-between border-b border-[#e5e7eb]/50 pb-4">
                  <dt className="text-[#6b7280]">Total Earned</dt>
                  <dd className="font-semibold text-[#111827]">{profile.totalEarned}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#6b7280]">Jobs Completed</dt>
                  <dd className="font-semibold text-[#111827]">{profile.jobsCompleted}</dd>
                </div>
              </dl>
            </article>

            <article className={`${cardClass()} p-6`}>
              <h2 className="font-sans text-lg font-semibold leading-7 text-[#111827]">Creative Skills</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg bg-[#7b61ff]/10 px-3 py-2 font-sans text-sm font-medium text-[#7b61ff]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>

            <article className={`${cardClass()} p-6`}>
              <h2 className="font-sans text-lg font-semibold leading-7 text-[#111827]">Languages</h2>
              <ul className="mt-4 space-y-3">
                {profile.languages.map((language) => (
                  <li key={language.name} className="flex items-center justify-between gap-3">
                    <span className="font-sans text-sm font-medium text-[#111827]">{language.name}</span>
                    <span className="rounded-md bg-[#f9fafb] px-2 py-1 font-sans text-xs text-[#6b7280]">
                      {language.level}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </aside>

          <div className="flex flex-col gap-6">
            <article className={`${cardClass()} p-6`}>
              <div className="flex items-center justify-between">
                <h2 className="font-sans text-lg font-semibold leading-7 text-[#111827]">Portfolio</h2>
                <UnavailableControl reason="Full portfolio is not available yet" className="font-sans text-sm text-[#7b61ff]">
                  View All
                </UnavailableControl>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {profile.portfolio.map((item) => (
                  <figure key={`${item.title}-${item.src}`} className="min-w-0">
                    <FigmaAsset src={item.src} alt={item.alt} className="h-[180px] w-full rounded-xl object-cover" />
                    <figcaption className="mt-2">
                      <p className="font-sans text-sm font-semibold text-[#111827]">{item.title}</p>
                      <p className="font-sans text-xs text-[#9ca3af]">{item.meta}</p>
                    </figcaption>
                  </figure>
                ))}
                <div className="flex h-[180px] items-center justify-center rounded-xl bg-[#f8fafc] font-sans text-sm text-[#6b7280]">
                  + {profile.moreProjects} More Projects
                </div>
              </div>
            </article>

            <article className={`${cardClass()} p-6`}>
              <h2 className="font-sans text-lg font-semibold leading-7 text-[#111827]">About Me</h2>
              {profile.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-3 font-sans text-sm leading-[22.75px] text-[#6b7280]">
                  {paragraph}
                </p>
              ))}
              <p className="mt-4 font-sans text-xs text-[#9ca3af]">Demo profile only. Edits and saves stay in this browser session.</p>
            </article>
          </div>
        </div>
      </div>

      {dialog === "message" ? (
        <ProfileDialog title={`Message ${profile.name}`} onClose={closeDialog}>
          <form className="p-5" onSubmit={sendMessage}>
            <p className="font-sans text-sm text-[#6b7280]">
              Write a short note. This stays in your browser session and is not delivered.
            </p>
            <div className="mt-4">
              <TextField id="message-to" label="To" value={profile.name} readOnly />
            </div>
            <div className="mt-4">
              <TextArea
                id="message-body"
                label="Message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={5}
                placeholder={`Hi ${profile.name.split(" ")[0]}, I’d like to talk about a contest…`}
              />
            </div>
            {messageNotice ? <p className="mt-3 font-sans text-sm text-[#7b61ff]">{messageNotice}</p> : null}
            <div className="mt-5 flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" variant="solid" size="sm">
                Send message
              </Button>
            </div>
          </form>
        </ProfileDialog>
      ) : null}

      {dialog === "invite" ? (
        <ProfileDialog title={`Invite ${profile.name}`} onClose={closeDialog}>
          <form className="p-5" onSubmit={sendInvite}>
            <p className="font-sans text-sm text-[#6b7280]">
              Choose a local demo contest. The designer is not notified and nothing is posted to a server.
            </p>
            <div className="mt-4">
              <SelectField
                id="invite-project"
                label="Project"
                value={inviteProject}
                onChange={(event) => setInviteProject(event.target.value)}
              >
                {inviteProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                    {project.status === "draft" ? " (Draft)" : project.status === "review" ? " (In review)" : ""}
                  </option>
                ))}
              </SelectField>
            </div>
            <div className="mt-4">
              <TextArea
                id="invite-note"
                label="Note to designer"
                value={inviteNote}
                onChange={(event) => setInviteNote(event.target.value)}
                rows={4}
                placeholder="Share brief context for this invite (optional)"
              />
            </div>
            {inviteNotice ? <p className="mt-3 font-sans text-sm text-[#7b61ff]">{inviteNotice}</p> : null}
            <div className="mt-5 flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" variant="solid" size="sm">
                Send invite
              </Button>
            </div>
          </form>
        </ProfileDialog>
      ) : null}
    </div>
  );
}
