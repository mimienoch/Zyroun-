import { Suspense } from "react";
import { ClientProjectsPage } from "../../components/client/client-projects-page";

export default function ClientProjectsRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f9fa]" />}>
      <ClientProjectsPage />
    </Suspense>
  );
}
