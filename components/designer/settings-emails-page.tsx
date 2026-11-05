"use client";

import { useState } from "react";
import { Icon } from "../ui/icon";
import type { FfIconName } from "../ui/icon";
import { Switch } from "../ui/switch";
import { SettingsShell } from "./settings-shell";

type Channel = { email: boolean; push: boolean };

type PrefRow = {
  id: string;
  title: string;
  description: string;
};

const sections: {
  title: string;
  icon: FfIconName;
  iconClass: string;
  rows: PrefRow[];
}[] = [
  {
    title: "Platform Updates",
    icon: "mail",
    iconClass: "text-[#7b61ff]",
    rows: [
      {
        id: "announcements",
        title: "Product Announcements",
        description: "Receive updates on new features, tools, and platform improvements.",
      },
      {
        id: "security",
        title: "Account Security",
        description:
          "Important notifications regarding your account safety, password changes, and login attempts.",
      },
    ],
  },
  {
    title: "Social & Networking",
    icon: "users",
    iconClass: "text-[#4ade80]",
    rows: [
      {
        id: "messages",
        title: "Direct Messages",
        description: "When clients or other designers send you a direct message.",
      },
      {
        id: "views",
        title: "Profile Views & Likes",
        description: "Get notified when someone interacts with your portfolio or views your profile.",
      },
    ],
  },
  {
    title: "Job Opportunities",
    icon: "briefcase",
    iconClass: "text-[#3b82f6]",
    rows: [
      {
        id: "invites",
        title: "Contest Invitations",
        description: "Alerts when a client specifically invites you to participate in their design contest.",
      },
      {
        id: "recommended",
        title: "Recommended Projects",
        description: "Weekly digest of projects that match your creative skills and preferences.",
      },
    ],
  },
];

const initialPrefs: Record<string, Channel> = {
  announcements: { email: true, push: false },
  security: { email: false, push: true },
  messages: { email: true, push: true },
  views: { email: false, push: true },
  invites: { email: true, push: true },
  recommended: { email: true, push: false },
};

function Completeness() {
  return (
    <div className="w-64">
      <div className="flex items-center justify-between gap-4">
        <p className="font-sans text-sm font-medium text-[#374151]">Profile Completeness</p>
        <p className="font-sans text-sm font-bold text-[#7b61ff]">85%</p>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e5e7eb]">
        <div className="h-full w-[85%] rounded-full bg-[#7b61ff]" />
      </div>
    </div>
  );
}

export function SettingsEmailsPage() {
  const [prefs, setPrefs] = useState(initialPrefs);

  function toggle(id: string, channel: keyof Channel) {
    setPrefs((current) => ({
      ...current,
      [id]: { ...current[id], [channel]: !current[id][channel] },
    }));
  }

  return (
    <SettingsShell
      title="Emails and Notifications"
      subtitle="Manage how and when you receive updates from Zyroun."
      actions={<Completeness />}
    >
      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <section key={section.title} className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
            <div className="flex items-center justify-between gap-4 bg-[#f9fafb] px-6 py-4">
              <h2 className="flex items-center gap-2 font-sans text-base font-semibold text-[#1f2937]">
                <Icon name={section.icon} className={`size-4 ${section.iconClass}`} />
                {section.title}
              </h2>
              <div className="flex w-32 justify-between font-sans text-xs font-semibold tracking-wide text-[#9ca3af]">
                <span>EMAIL</span>
                <span>PUSH</span>
              </div>
            </div>
            <ul>
              {section.rows.map((row) => (
                <li
                  key={row.id}
                  className="flex flex-wrap items-start justify-between gap-4 border-t border-[#f3f4f6] px-6 py-5"
                >
                  <div className="min-w-0 max-w-[530px] flex-1">
                    <p className="font-sans text-sm font-medium text-[#111827]">{row.title}</p>
                    <p className="mt-1 font-sans text-sm text-[#6b7280]">{row.description}</p>
                  </div>
                  <div className="flex w-32 items-center justify-between gap-6 pt-1">
                    <Switch
                      checked={prefs[row.id].email}
                      onCheckedChange={() => toggle(row.id, "email")}
                      aria-label={`${row.title} email`}
                    />
                    <Switch
                      checked={prefs[row.id].push}
                      onCheckedChange={() => toggle(row.id, "push")}
                      aria-label={`${row.title} push`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SettingsShell>
  );
}
