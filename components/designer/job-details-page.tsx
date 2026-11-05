"use client";

import { FormEvent, useState } from "react";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";
import { DesignerHeader } from "./designer-header";

const mustHaves = [
  "Dark and Light mode compatibility for all screens.",
  "High-fidelity prototype showing the onboarding flow.",
  "Social feed mockups for shared financial goals.",
  "Design system components (Icons, Buttons, Typography).",
];

export function JobDetailsPage() {
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);
  const [comments] = useState([
    {
      author: "Sarah Johnson",
      time: "2 hours ago",
      body: "Are there any specific color palettes from the brand book we should avoid or prioritize?",
      likes: 4,
    },
  ]);

  function onComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <DesignerHeader backHref="/jobs" backLabel="Job Details" />
      <main className="bg-[#f8fafc] px-5 py-8 md:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <section className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.06)] md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <span className="size-12 rounded-xl bg-gradient-to-br from-[#7b61ff] via-[#5ce1e6] to-[#fb7185]" />
              <div>
                <h1 className="font-sans text-2xl font-bold text-[#0f172a]">
                  Nexus Banking App Redesign
                </h1>
                <p className="mt-1 font-sans text-sm text-[#6b7280]">
                  Nexus Financial • Verified Client <span className="text-[#22c55e]">●</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#f3f0ff] px-2.5 py-1 text-xs text-[#7b61ff]">
                    UI/UX Design
                  </span>
                  <span className="rounded-full bg-[#f0fdf4] px-2.5 py-1 text-xs text-[#16a34a]">
                    Guaranteed
                  </span>
                  <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-xs text-[#4b5563]">
                    Active
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setSaved((value) => !value)}>
                  {saved ? "Saved" : "Add to watchlist"}
                </Button>
                <Button href="/jobs/nexus-banking/submit" size="sm">
                  Submit your design
                </Button>
              </div>
              <p className="font-sans text-sm text-[#f97316]">Time Left: 3 days, 4 hrs</p>
            </div>
          </section>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="flex flex-col gap-6">
              <article className="rounded-2xl bg-white p-6">
                <h2 className="font-sans text-lg font-semibold">Job Brief</h2>
                <p className="mt-4 font-sans text-sm leading-6 text-[#4b5563]">
                  We are looking for a visionary UI/UX designer to completely overhaul our mobile
                  banking application. Nexus Financial is transitioning to target the Gen-Z
                  demographic, focusing on social finance, crypto integration, and intuitive
                  budgeting tools.
                </p>
                <p className="mt-4 font-sans text-sm leading-6 text-[#4b5563]">
                  The current application is functional but lacks personality and modern UX
                  patterns that younger users expect. Your goal is to create a design that feels
                  less like a bank and more like a financial lifestyle companion.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Target Market", "Gen-Z, Digital Nomads (18-26)"],
                    ["Industry Type", "Fintech / Banking"],
                    ["Design Style", "Neubrutalism / Minimalist"],
                    ["Preferred Font", "Inter / Satoshi / Space Grotesk"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-[#f8fafc] p-4">
                      <p className="font-sans text-[11px] tracking-wide text-[#9ca3af] uppercase">
                        {label}
                      </p>
                      <p className="mt-1 font-sans text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl bg-white p-6">
                <h2 className="font-sans text-lg font-semibold">Must Haves</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {mustHaves.map((item) => (
                    <li key={item} className="flex gap-2 font-sans text-sm text-[#4b5563]">
                      <span className="text-[#22c55e]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl bg-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-sans text-lg font-semibold">Discussion Board</h2>
                  <p className="text-sm text-[#9ca3af]">12 Comments</p>
                </div>
                {comments.map((item) => (
                  <div key={item.author} className="mt-5 rounded-xl bg-[#f8fafc] p-4">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-2 font-sans text-sm font-semibold">
                        <FigmaAsset
                          src="/images/avatar-sarah.png"
                          alt=""
                          className="size-8 rounded-full"
                        />
                        {item.author}
                      </p>
                      <span className="text-xs text-[#9ca3af]">{item.time}</span>
                    </div>
                    <p className="mt-2 font-sans text-sm text-[#4b5563]">{item.body}</p>
                    <div className="mt-3 flex gap-4 text-sm">
                      <button type="button" className="text-[#7b61ff]">
                        Reply
                      </button>
                      <button type="button" className="text-[#6b7280]">
                        Like ({item.likes})
                      </button>
                    </div>
                  </div>
                ))}
                <form className="mt-4 flex items-center gap-3" onSubmit={onComment}>
                  <FigmaAsset
                    src="/images/hiw-avatar-1.png"
                    alt=""
                    className="size-8 rounded-full"
                  />
                  <input
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Add a comment..."
                    className="h-11 flex-1 rounded-full bg-[#f8fafc] px-4 text-sm outline-none"
                  />
                  <button type="submit" aria-label="Send comment" className="text-[#7b61ff]">
                    ➤
                  </button>
                </form>
              </article>
            </div>

            <aside className="flex flex-col gap-6">
              <article className="rounded-2xl bg-white p-6">
                <p className="font-sans text-xs tracking-wide text-[#9ca3af] uppercase">
                  Total Prize Pool
                </p>
                <p className="mt-2 font-sans text-3xl font-bold">$6,000</p>
                <dl className="mt-4 divide-y divide-[#f3f4f6] font-sans text-sm">
                  <div className="flex justify-between py-3">
                    <dt className="text-[#6b7280]">1st Place</dt>
                    <dd className="font-medium">$4,500</dd>
                  </div>
                  <div className="flex justify-between py-3">
                    <dt className="text-[#6b7280]">Runner Up</dt>
                    <dd className="font-medium">$1,000</dd>
                  </div>
                  <div className="flex justify-between py-3">
                    <dt className="text-[#6b7280]">
                      Participation
                      <span className="block text-xs text-[#9ca3af]">Shared by top 10</span>
                    </dt>
                    <dd className="font-medium">$500</dd>
                  </div>
                </dl>
                <p className="mt-4 font-sans text-sm text-[#16a34a]">Guaranteed Payment</p>
                <p className="text-xs text-[#6b7280]">Funds held in escrow by Zyroun</p>
                <p className="mt-3 font-sans text-sm">Verified Client</p>
                <p className="text-xs text-[#6b7280]">100% payment completion rate</p>
              </article>
              <article className="rounded-2xl bg-white p-6">
                <h2 className="font-sans text-sm font-semibold">Attachments</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {[
                    ["Brand_Guidelines.pdf", "4.2 MB"],
                    ["Current_App_Screens.zip", "18.5 MB"],
                  ].map(([name, size]) => (
                    <li
                      key={name}
                      className="flex items-center justify-between rounded-xl bg-[#f8fafc] px-3 py-3 text-sm"
                    >
                      <span>
                        {name}
                        <span className="block text-xs text-[#9ca3af]">{size}</span>
                      </span>
                      <span aria-hidden="true">↓</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl bg-white p-6">
                <h2 className="font-sans text-sm font-semibold">Contest Stats</h2>
                <dl className="mt-4 space-y-3 font-sans text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[#6b7280]">Submissions</dt>
                    <dd>24 Designs</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#6b7280]">Watching</dt>
                    <dd>142 Users</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#6b7280]">Deadline</dt>
                    <dd>Oct 24, 2024</dd>
                  </div>
                </dl>
              </article>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
