import Link from "next/link";

export function DesignerAppFooter() {
  return (
    <footer className="mt-auto border-t border-[#eeeeee] bg-white px-6 py-6">
      <div className="flex flex-col items-center justify-center gap-4 font-poppins text-sm leading-5 text-n-900 sm:flex-row sm:gap-14">
        <p>© 2024 Zyroun. All rights reserved.</p>
        <nav className="flex gap-6" aria-label="Legal">
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Cookies</Link>
        </nav>
      </div>
    </footer>
  );
}
