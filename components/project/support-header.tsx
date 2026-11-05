import { Button } from "../button";
import { Logo } from "../logo";

export function SupportHeader() {
  return (
    <header className="w-full border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-5 md:px-8">
        <Logo />
        <div className="flex items-center gap-4">
          <p className="hidden font-sans text-sm text-[#0f172a] sm:block">
            Need our Support?
          </p>
          <Button href="/contact" size="sm">
            Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
}
