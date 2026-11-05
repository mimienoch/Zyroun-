import { Suspense } from "react";
import { ClientSubmissionsPage } from "../../../components/client/client-submissions-page";

export default function ProjectReviewRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f9fa]" />}>
      <ClientSubmissionsPage />
    </Suspense>
  );
}
