"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ClientSidebar } from "../client/client-sidebar";
import { DesignerPublicProfile } from "./designer-public-profile";
import { getDesignerProfile } from "./designer-profiles";

export function PublicDesignerProfilePage({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? searchParams.get("chrome");
  const clientChrome = from === "saved" || from === "projects" || from === "client";
  const profile = getDesignerProfile(slug);
  const backHref = from === "projects" ? "/projects" : from === "saved" ? "/saved-designers" : "/designers";
  const backLabel =
    from === "projects" ? "Back to My Projects" : from === "saved" ? "Back to Saved Designers" : "Back to designers";

  if (!profile) {
    const body = (
      <main className="min-w-0 flex-1 px-5 py-16 md:px-8">
        <h1 className="font-sans text-2xl font-semibold text-[#111827]">Designer not found</h1>
        <p className="mt-2 font-sans text-sm text-[#6b7280]">
          This slug is not in the local demo directory. Nothing was loaded from a server.
        </p>
        <Link href={backHref} className="mt-6 inline-flex font-sans text-sm text-[#7b61ff] focus-visible:outline-2 focus-visible:outline-[#7b61ff]">
          {backLabel}
        </Link>
      </main>
    );
    if (clientChrome) {
      return (
        <div className="flex min-h-0 w-full bg-[#f8fafc] lg:flex-row lg:items-stretch">
          <ClientSidebar />
          {body}
        </div>
      );
    }
    return <div className="bg-[#fafafa]">{body}</div>;
  }

  const content = (
    <main className={`min-w-0 flex-1 px-5 py-8 md:px-[100px] ${clientChrome ? "bg-[#f8fafc]" : "bg-[#fafafa]"}`}>
      <p className="mb-6">
        <Link href={backHref} className="font-sans text-sm text-[#7b61ff] focus-visible:outline-2 focus-visible:outline-[#7b61ff]">
          {backLabel}
        </Link>
      </p>
      <DesignerPublicProfile profile={profile} visitor={clientChrome ? "client" : "public"} />
    </main>
  );

  if (clientChrome) {
    return (
      <div className="flex min-h-0 w-full bg-[#f8fafc] lg:flex-row lg:items-stretch">
        <ClientSidebar />
        {content}
      </div>
    );
  }

  return content;
}
