import { Suspense } from "react";
import { SettingsPage } from "../../components/designer/settings-page";

export default function SettingsRoute() {
  return (
    <Suspense>
      <SettingsPage />
    </Suspense>
  );
}
