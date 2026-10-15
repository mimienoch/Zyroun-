import Link from "next/link";
import { FigmaAsset } from "./figma-asset";
import { Logo } from "./logo";

const columns = [
  {
    title: "For Clients",
    links: [
      { href: "/how-it-works", label: "How it Works" },
      { href: "#pricing", label: "Pricing" },
      { href: "#categories", label: "Design Categories" },
      { href: "#designers", label: "Find a Designer" },
    ],
  },
  {
    title: "For Designers",
    links: [
      { href: "#designers", label: "Become a Designer" },
      { href: "#designers", label: "Browse Contests" },
      { href: "#contact", label: "Community Guidelines" },
      { href: "#contact", label: "Designer Resources" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "#contact", label: "Help Center" },
      { href: "#contact", label: "Contact Us" },
      { href: "#contact", label: "Terms of Service" },
      { href: "#contact", label: "Privacy Policy" },
    ],
  },
];

const lightColumns = [
  {
    title: "Platform",
    links: [
      { href: "/how-it-works", label: "How it Works" },
      { href: "#", label: "Pricing" },
      { href: "#", label: "Design Contests" },
      { href: "/designers", label: "Browse Designers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#", label: "Blog" },
      { href: "#", label: "Help Center" },
      { href: "#", label: "Design Tips" },
      { href: "#", label: "Success Stories" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
    ],
  },
];

const lightSocial = [
  { src: "/images/hiw-social-1.png", label: "Zyroun on X" },
  { src: "/images/hiw-social-2.png", label: "Zyroun on Instagram" },
  { src: "/images/hiw-social-3.png", label: "Zyroun on LinkedIn" },
  { src: "/images/hiw-social-4.png", label: "Zyroun on Dribbble" },
];

type FooterProps = {
  variant?: "home" | "light";
};

export function Footer({ variant = "home" }: FooterProps) {
  if (variant === "light") {
    return (
      <footer className="bg-white px-5 py-16 text-[#0f172a] md:px-20 md:py-[100px]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-0 md:px-6">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            <div className="flex max-w-[464px] flex-col gap-4">
              <Logo />
              <p className="max-w-[384px] font-display text-sm font-medium text-[#0f172a]">
                The premium design marketplace connecting clients
                <br className="hidden md:block" /> with world-class designers
                through creative contests.
              </p>
              <div className="flex gap-4">
                {lightSocial.map((item) => (
                  <a
                    key={item.src}
                    href="#"
                    className="size-10 overflow-hidden rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                    aria-label={item.label}
                  >
                    <FigmaAsset src={item.src} alt="" />
                  </a>
                ))}
              </div>
            </div>
            {lightColumns.map((column) => (
              <div key={column.title} className="w-full max-w-[208px]">
                <h2 className="font-display text-base font-bold text-[#0f172a]">
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 border-t border-[#e5e7eb] pt-8 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-sm font-medium text-[#0f172a]">
              © 2024 Zyroun. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Cookies"].map((label) => (
                <Link
                  key={label}
                  href="#"
                  className="font-display text-sm font-medium text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      id="contact"
      className="bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] px-5 pt-16 pb-16 text-[#fafafa] md:px-20"
    >
      <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-6">
          <Logo variant="onDark" />
          <p className="max-w-[272px] font-poppins text-sm leading-5">
            The premium digital design marketplace for clients who demand
            excellence and designers who deliver it.
          </p>
          <div className="flex gap-4">
            <a
              href="#contact"
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Zyroun on social network 1"
            >
              <FigmaAsset src="/images/icon-social-1.svg" alt="" />
            </a>
            <a
              href="#contact"
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Zyroun on social network 2"
            >
              <FigmaAsset src="/images/icon-social-2.svg" alt="" />
            </a>
            <a
              href="#contact"
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Zyroun on social network 3"
            >
              <FigmaAsset src="/images/icon-social-3.svg" alt="" />
            </a>
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="font-poppins text-base font-semibold">{column.title}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-poppins text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-16 max-w-[1280px] border-t border-[#e5e7eb] pt-8 text-center font-poppins text-xs">
        © 2026 Zyroun Marketplace. All rights reserved.
      </p>
    </footer>
  );
}
