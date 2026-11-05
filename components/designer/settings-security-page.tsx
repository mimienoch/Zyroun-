"use client";

import { FormEvent, useState } from "react";
import { Icon } from "../ui/icon";
import { Snackbar } from "../ui/snackbar";
import { SettingsShell } from "./settings-shell";
import { UnavailableControl } from "./unavailable";

function isStrongPassword(value: string) {
  return value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  helper,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  helper?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="block font-sans text-sm font-medium text-[#374151]" htmlFor={id}>
      {label}
      <span className="relative mt-1.5 block">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          className="h-[42px] w-full rounded-lg border border-[#d1d5db] bg-white px-4 pr-11 font-sans text-sm font-normal text-[#1f2937] outline-none focus-visible:ring-2 focus-visible:ring-[#7b61ff]"
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-[#9ca3af]"
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
          onClick={() => setVisible((current) => !current)}
        >
          <Icon name={visible ? "eye-off" : "eye"} className="size-4" />
        </button>
      </span>
      {helper ? <span className="mt-1.5 block font-sans text-xs font-normal text-[#6b7280]">{helper}</span> : null}
    </label>
  );
}

function Card({
  title,
  icon,
  badge,
  children,
}: {
  title: string;
  icon: "lock" | "shield" | "file-text" | "globe";
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-[#e5e7eb] px-6 py-4">
        <h3 className="flex items-center gap-2 font-sans text-base font-semibold text-[#111827]">
          <Icon name={icon} className="size-4 text-[#7b61ff]" />
          {title}
        </h3>
        {badge ? (
          <span className="rounded-full bg-[#fef2f2] px-3 py-1 font-sans text-xs font-medium text-[#dc2626]">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}

const questions = [
  ["Question 1", "What is your mother's maiden name?", "Answer 1"],
  ["Question 2", "What was your first pet's name?", "Answer 2"],
  ["Question 3", "What is your favorite book?", "Answer 3"],
] as const;

const sessions = [
  { device: "Web Browser", detail: "Chrome - 12 hours ago", icon: "globe" as const },
  { device: "Mobile App", detail: "iOS - 2 hours ago", icon: "phone" as const },
  { device: "Work Computer", detail: "Firefox - 1 hour ago", icon: "grid" as const },
];

export function SettingsSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [passwordError, setPasswordError] = useState("");
  const [passwordNotice, setPasswordNotice] = useState("");

  function onPasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentPassword) {
      setPasswordError("Enter your current password.");
      setPasswordNotice("");
      return;
    }
    if (!isStrongPassword(nextPassword)) {
      setPasswordError("New password must be at least 8 characters with letters, numbers, and a symbol.");
      setPasswordNotice("");
      return;
    }
    if (nextPassword !== confirm) {
      setPasswordError("Confirm New Password does not match.");
      setPasswordNotice("");
      return;
    }
    setPasswordError("");
    setPasswordNotice("Password is validated on this page only. It is not changed on a server.");
    setCurrentPassword("");
    setNextPassword("");
    setConfirm("");
  }

  return (
    <SettingsShell>
      <div className="mx-auto flex max-w-[768px] flex-col gap-6">
        <div>
          <h2 className="font-sans text-2xl leading-8 font-bold text-[#111827]">Security Settings</h2>
          <p className="mt-1 font-sans text-sm leading-5 text-[#6b7280]">
            Manage your account security and authentication preferences.
          </p>
        </div>

        <Card title="Change Password" icon="lock">
          <form onSubmit={onPasswordSubmit} className="space-y-5" autoComplete="on">
            <PasswordField
              id="current-password"
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              autoComplete="current-password"
            />
            <PasswordField
              id="new-password"
              label="New Password"
              value={nextPassword}
              onChange={setNextPassword}
              autoComplete="new-password"
              helper="Must be at least 8 characters with a mix of letters, numbers & symbols."
            />
            <PasswordField
              id="confirm-password"
              label="Confirm New Password"
              value={confirm}
              onChange={setConfirm}
              autoComplete="new-password"
            />
            {passwordError ? <p className="font-sans text-sm text-[#dc2626]">{passwordError}</p> : null}
            {passwordNotice ? (
              <Snackbar onDismiss={() => setPasswordNotice("")}>{passwordNotice}</Snackbar>
            ) : null}
            <button
              type="submit"
              className="rounded-lg bg-[#7b61ff] px-4 py-2 font-sans text-sm font-medium text-white"
            >
              Update Password
            </button>
          </form>
        </Card>

        <Card title="Two-Factor Authentication" icon="shield" badge="Not Enabled">
          <p className="font-sans text-sm text-[#4b5563]">
            Add an extra layer of security to your account by enabling two-factor authentication.
          </p>
          <div className="mt-5 space-y-3">
            <div className="flex gap-3 rounded-lg border border-[#e5e7eb] p-4">
              <span className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#8b5cf6]/10">
                <Icon name="lock" className="size-4 text-[#7b61ff]" />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-sans text-sm font-medium text-[#111827]">Google Authenticator</h4>
                <p className="mt-0.5 font-sans text-xs text-[#6b7280]">
                  Scan the QR code with your authenticator app to set up 2FA.
                </p>
                <div className="mt-2 flex size-32 items-center justify-center rounded-lg bg-[#f3f4f6] font-sans text-xs text-[#9ca3af]">
                  2FA QR Code
                </div>
                <p className="mt-2 font-sans text-xs text-[#6b7280]">
                  This is a placeholder, not a working authenticator setup.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-[#e5e7eb] p-4">
              <span className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#8b5cf6]/10">
                <Icon name="phone" className="size-4 text-[#7b61ff]" />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-sans text-sm font-medium text-[#111827]">SMS Verification</h4>
                <p className="mt-0.5 mb-1.5 font-sans text-xs text-[#6b7280]">
                  Receive a verification code via SMS to your phone number.
                </p>
                <input
                  id="security-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Phone number"
                  autoComplete="tel"
                  className="h-[42px] w-full rounded-lg border border-[#d1d5db] bg-white px-3 font-sans text-sm outline-none placeholder:text-[#9ca3af] focus-visible:ring-2 focus-visible:ring-[#7b61ff]"
                />
                <UnavailableControl
                  className="mt-3 rounded-lg bg-[#7b61ff] px-3 py-2 font-sans text-sm text-white"
                  reason="SMS verification is not connected."
                >
                  Send code
                </UnavailableControl>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Security Questions" icon="file-text">
          <p className="font-sans text-sm text-[#4b5563]">
            Set up security questions to help recover your account if you lose access to your password.
          </p>
          <div className="mt-5 space-y-4">
            {questions.map(([questionLabel, question, answerLabel], index) => (
              <div key={questionLabel} className="grid gap-4 sm:grid-cols-2">
                <label className="block font-sans text-sm font-medium text-[#374151]">
                  {questionLabel}
                  <input
                    readOnly
                    value={question}
                    className="mt-1.5 h-[42px] w-full rounded-lg border border-[#d1d5db] bg-white px-4 font-sans text-sm font-normal text-[#9ca3af]"
                  />
                </label>
                <label className="block font-sans text-sm font-medium text-[#374151]">
                  {answerLabel}
                  <input
                    type="password"
                    autoComplete="off"
                    value={answers[index]}
                    onChange={(event) =>
                      setAnswers((current) => current.map((item, i) => (i === index ? event.target.value : item)))
                    }
                    placeholder="Answer"
                    className="mt-1.5 h-[42px] w-full rounded-lg border border-[#d1d5db] bg-white px-4 font-sans text-sm outline-none placeholder:text-[#9ca3af] focus-visible:ring-2 focus-visible:ring-[#7b61ff]"
                  />
                </label>
              </div>
            ))}
          </div>
          <p className="mt-4 font-sans text-xs text-[#6b7280]">
            Answers stay in this browser session only. They are not stored or used for recovery.
          </p>
        </Card>

        <Card title="Session Management" icon="globe">
          <p className="font-sans text-sm text-[#4b5563]">
            Manage your active sessions and log out from devices you no longer use.
          </p>
          <ul className="mt-5 space-y-4">
            {sessions.map((session) => (
              <li
                key={session.device}
                className="flex items-center justify-between gap-3 rounded-lg bg-[#f9fafb] px-4 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb]">
                    <Icon name={session.icon} className="size-4 text-[#4b5563]" />
                  </span>
                  <div>
                    <p className="font-sans text-sm font-medium text-[#111827]">{session.device}</p>
                    <p className="font-sans text-xs text-[#6b7280]">{session.detail}</p>
                  </div>
                </div>
                <UnavailableControl
                  aria-label={`Sign out ${session.device}`}
                  className="text-[#dc2626]"
                  reason="Session termination is not connected."
                >
                  <Icon name="x" className="size-3.5" />
                </UnavailableControl>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </SettingsShell>
  );
}
