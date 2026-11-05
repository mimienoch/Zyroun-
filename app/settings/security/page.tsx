import { Suspense } from "react";
import { SettingsSecurityPage } from "../../../components/designer/settings-security-page";

export default function SettingsSecurityRoute() {
  return (
    <Suspense>
      <SettingsSecurityPage />
    </Suspense>
  );
}
