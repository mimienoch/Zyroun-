import { Suspense } from "react";
import { SettingsEmailsPage } from "../../../components/designer/settings-emails-page";

export default function SettingsEmailsRoute() {
  return (
    <Suspense>
      <SettingsEmailsPage />
    </Suspense>
  );
}
