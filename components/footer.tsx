import Link from "next/link";
import { FigmaAsset } from "./figma-asset";
import { Logo } from "./logo";

const columns = [
  {
    title: "For Clients",
    links: [
      { href: "#how-it-works", label: "How it Works" },
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

export function Footer() {
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
