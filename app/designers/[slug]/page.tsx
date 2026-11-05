"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import { PublicDesignerProfilePage } from "../../../components/designers/public-designer-profile-page";

function DesignerSlugInner() {
  const params = useParams();
  const slug = String(params.slug ?? "");
  return <PublicDesignerProfilePage slug={slug} />;
}

export default function DesignerSlugRoute() {
  return (
    <Suspense fallback={<main className="px-8 py-16 font-sans text-sm text-[#6b7280]">Loading profile…</main>}>
      <DesignerSlugInner />
    </Suspense>
  );
}
