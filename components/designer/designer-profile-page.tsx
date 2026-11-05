"use client";

import { DesignerHeader } from "./designer-header";
import { DesignerPublicProfile } from "../designers/designer-public-profile";
import { ALEX_RIVERA } from "../designers/designer-profiles";

export function DesignerProfilePage() {
  return (
    <>
      <DesignerHeader />
      <main className="bg-[#fafafa] px-5 py-8 md:px-[100px] md:py-8">
        <DesignerPublicProfile profile={ALEX_RIVERA} visitor="own" />
      </main>
    </>
  );
}
