"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "../button";
import { DesignerHeader } from "./designer-header";

export function SubmitPage() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(["UI/UX", "Fintech"]);
  const [tagDraft, setTagDraft] = useState("");
  const [portfolio, setPortfolio] = useState(true);
  const [stock, setStock] = useState(true);
  const [stockName, setStockName] = useState("Premium Lifestyle Hero Image");
  const [stockUrl, setStockUrl] = useState("https://unsplash.com/photos/...");
  const [license, setLicense] = useState(true);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draftSaved, setDraftSaved] = useState(false);
  const [notice, setNotice] = useState("");

  function addTag() {
    const next = tagDraft.trim();
    if (!next || tags.includes(next)) return;
    setTags((current) => [...current, next]);
    setTagDraft("");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "Enter a design title.";
    if (!fileName) next.file = "Choose a design file.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setNotice("Submission is UI-only. No file is uploaded to a server.");
    }
  }

  return (
    <>
      <DesignerHeader backHref="/jobs/nexus-banking" backLabel="Submit Design" />
      <main className="bg-[#f8fafc] px-5 py-8 md:px-8">
        <form
          onSubmit={onSubmit}
          noValidate
          className="mx-auto grid w-full max-w-[1200px] gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"
        >
          <div className="flex flex-col gap-6">
            <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#cbd5e1] bg-white p-8 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-[#f3f0ff] text-2xl text-[#7b61ff]">
                ☁
              </span>
              <p className="mt-4 font-sans text-lg font-semibold">Upload your design</p>
              <p className="mt-1 font-sans text-sm text-[#6b7280]">
                Drag and drop your files here, or{" "}
                <span className="text-[#7b61ff]">browse</span>
              </p>
              <p className="mt-2 font-sans text-xs text-[#9ca3af]">
                Max size: 20MB • Formats: PNG, JPG, JPEG, GIF
              </p>
              {fileName ? (
                <p className="mt-3 font-sans text-sm text-[#0f172a]">{fileName}</p>
              ) : null}
              {errors.file ? (
                <p className="mt-2 text-xs text-[#dc2626]">{errors.file}</p>
              ) : null}
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.gif"
                className="sr-only"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
              />
            </label>

            <article className="rounded-2xl bg-white p-6">
              <label className="flex flex-col gap-2">
                <span className="font-sans text-xs tracking-wide text-[#9ca3af] uppercase">
                  Design Title
                </span>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Enter a name for your design"
                  className="h-11 rounded-lg bg-[#f8fafc] px-4 text-sm outline-none"
                />
                {errors.title ? (
                  <span className="text-xs text-[#dc2626]">{errors.title}</span>
                ) : null}
              </label>
              <p className="mt-5 font-sans text-xs tracking-wide text-[#9ca3af] uppercase">
                Design Tags
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg bg-[#f8fafc] px-3 py-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTags((current) => current.filter((item) => item !== tag))}
                    className="rounded-full bg-[#f3f0ff] px-2.5 py-1 text-xs text-[#7b61ff]"
                  >
                    {tag} ×
                  </button>
                ))}
                <input
                  value={tagDraft}
                  onChange={(event) => setTagDraft(event.target.value)}
                  onBlur={addTag}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add more..."
                  className="min-w-[90px] flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </article>

            <article className="rounded-2xl bg-white p-6">
              <div className="flex items-start justify-between gap-4 border-b border-[#f3f4f6] pb-5">
                <div>
                  <p className="font-sans text-sm font-semibold">Do you want to show on portfolio?</p>
                  <Link href="/profile" className="font-sans text-xs text-[#7b61ff]">
                    View your portfolio page
                  </Link>
                </div>
                <div className="flex rounded-lg bg-[#f3f4f6] p-1">
                  {["Yes", "No"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPortfolio(item === "Yes")}
                      className={`h-8 w-14 rounded-md text-sm ${
                        (item === "Yes") === portfolio ? "bg-white" : "text-[#6b7280]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <p className="font-sans text-sm font-semibold">Have you included stock photos?</p>
                <div className="flex rounded-lg bg-[#f3f4f6] p-1">
                  {["Yes", "No"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStock(item === "Yes")}
                      className={`h-8 w-14 rounded-md text-sm ${
                        (item === "Yes") === stock ? "bg-white" : "text-[#6b7280]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              {stock ? (
                <div className="mt-5 rounded-xl bg-[#f8fafc] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="text-xs tracking-wide text-[#9ca3af] uppercase">
                        Name / Description
                      </span>
                      <input
                        value={stockName}
                        onChange={(event) => setStockName(event.target.value)}
                        className="h-10 rounded-lg bg-white px-3 text-sm"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-xs tracking-wide text-[#9ca3af] uppercase">
                        Source URL
                      </span>
                      <input
                        value={stockUrl}
                        onChange={(event) => setStockUrl(event.target.value)}
                        className="h-10 rounded-lg bg-white px-3 text-sm"
                      />
                    </label>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={license}
                        onChange={(event) => setLicense(event.target.checked)}
                      />
                      Client must purchase license
                    </label>
                    <button
                      type="button"
                      className="text-sm text-[#ef4444]"
                      onClick={() => setStock(false)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : null}
              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-dashed border-[#cbd5e1] py-3 text-sm text-[#7b61ff]"
              >
                + Add another stock image
              </button>
            </article>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <Link href="/dashboard" className="font-sans text-sm text-[#6b7280]">
                Back to dashboard
              </Link>
              <Button type="button" variant="outline" size="sm" onClick={() => setDraftSaved(true)}>
                Save Draft
              </Button>
              <Button type="submit" size="sm">
                Submit your design
              </Button>
            </div>
            {draftSaved ? (
              <p className="text-right text-xs text-[#6b7280]">Draft stored locally in this browser session only.</p>
            ) : null}
            {notice ? <p className="text-right text-xs text-[#6b7280]">{notice}</p> : null}
          </div>

          <aside className="flex flex-col gap-6">
            <article className="rounded-2xl bg-white p-5">
              <div className="flex gap-3">
                <span className="size-10 rounded-xl bg-gradient-to-br from-[#7b61ff] via-[#5ce1e6] to-[#fb7185]" />
                <div>
                  <h2 className="font-sans text-sm font-bold">
                    Nexus Banking App
                    <br />
                    Redesign
                  </h2>
                  <Link href="/jobs/nexus-banking" className="text-xs text-[#7b61ff]">
                    View project ↗
                  </Link>
                </div>
              </div>
              <p className="mt-3 font-sans text-xs leading-5 text-[#6b7280]">
                Designing a visionary mobile banking experience for Gen-Z, focusing on social
                finance and crypto integration.
              </p>
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-[#9ca3af]">Deadline</span>
                <span>Oct 24, 2024</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-[#9ca3af]">Total Budget</span>
                <span className="font-semibold">$6,000</span>
              </div>
            </article>
            <article className="rounded-2xl bg-white p-5">
              <h2 className="font-sans text-sm font-semibold">Design Guidelines</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li className="flex justify-between rounded-xl bg-[#f8fafc] px-3 py-3">
                  <span>
                    Brand_Guidelines.pdf
                    <span className="block text-xs text-[#9ca3af]">4.2 MB</span>
                  </span>
                  <span>↓</span>
                </li>
                <li className="flex justify-between rounded-xl bg-[#f8fafc] px-3 py-3">
                  <span>
                    Current_App_Screens.zip
                    <span className="block text-xs text-[#9ca3af]">18.5 MB</span>
                  </span>
                  <span>↓</span>
                </li>
              </ul>
            </article>
            <p className="text-sm text-[#f97316]">Time Left: 3 days, 4 hrs</p>
          </aside>
        </form>
      </main>
    </>
  );
}
