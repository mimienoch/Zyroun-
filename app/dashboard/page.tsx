import { Suspense } from "react";
import { DashboardPage } from "../../components/designer/dashboard-page";

export default function DashboardRoute({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  return (
    <DashboardPage>
      <Suspense fallback={null}>
        <SigninNotice searchParams={searchParams} />
      </Suspense>
    </DashboardPage>
  );
}

async function SigninNotice({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const params = await searchParams;
  if (params.from !== "signin") return null;
  return (
    <p
      className="mb-6 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 font-sans text-sm text-[#6b7280]"
      role="status"
    >
      Temporary navigation from Sign In. Authentication is UI-only; this dashboard is not a
      signed-in session.
    </p>
  );
}
