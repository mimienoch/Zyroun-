"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { FigmaAsset } from "./figma-asset";
import { Logo } from "./logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It works" },
  { href: "/designers", label: "Designers" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
];

type HeaderProps = {
  search?: boolean;
};

export function Header({ search = false }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-5 md:px-8 lg:px-6">
        <Logo />
        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const current =
              item.href === "/" ? pathname === "/" : pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex h-[37px] items-center justify-center px-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff] ${
                  current
                    ? "border-b border-[#7b61ff] bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text font-medium text-transparent"
                    : "font-normal text-black"
                }`}
                aria-current={current ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          {search ? (
            <form
              role="search"
              className="flex h-[42px] w-[240px] items-center gap-2.5 rounded-full bg-[#f9fafb] py-2.5 pr-5 pl-[18px]"
              onSubmit={(event) => event.preventDefault()}
            >
              <FigmaAsset src="/images/icon-search.svg" alt="" />
              <input
                type="search"
                name="q"
                placeholder="Search for art, designers..."
                className="min-w-0 flex-1 bg-transparent font-display text-sm font-medium text-[#0f172a] outline-none placeholder:text-[#64748b]"
                aria-label="Search for art, designers"
              />
            </form>
          ) : null}
          <Link
            href="#login"
            className="px-2.5 text-sm text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
          >
            Log In
          </Link>
          <Button href="#post-project" className="w-[146px]">
            Post a Project
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-[#e5e7eb] text-[#0f172a] lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-2 border-t border-[#e5e7eb] px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-2 py-2 text-sm text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#login"
            className="rounded-md px-2 py-2 text-sm text-[#0f172a]"
            onClick={() => setOpen(false)}
          >
            Log In
          </Link>
          <Button href="#post-project" className="w-full">
            Post a Project
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
