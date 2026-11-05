"use client";

import { useState } from "react";
import { Icon } from "./icon";

export function FaqItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-[10px] bg-n-100 ${open ? "min-h-[111px]" : "min-h-[72px]"}`}>
      <button
        type="button"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-5 text-left font-sans text-sm font-medium text-n-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300"
        onClick={() => setOpen((value) => !value)}
      >
        {question}
        <Icon name="chevron-down" className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? <div className="px-5 pb-5 font-sans text-sm leading-6 text-n-500">{children}</div> : null}
    </div>
  );
}
