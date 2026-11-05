import type { ReactNode } from "react";
import { DesignerSidebar } from "./designer-sidebar";

export function DesignerAppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-0 w-full flex-col bg-[#f8fafc] lg:flex-row">
      <DesignerSidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <div className="flex flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h1 className="font-sans text-2xl font-bold text-[#111827]">{title}</h1>
            {subtitle ? (
              <p className="mt-1 font-sans text-sm text-[#6b7280]">{subtitle}</p>
            ) : null}
          </div>
          {actions}
        </div>
        <div className="px-5 pb-10 md:px-8">{children}</div>
      </main>
    </div>
  );
}
