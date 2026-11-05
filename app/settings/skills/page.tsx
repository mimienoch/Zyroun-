import { Suspense } from "react";
import { SettingsSkillsPage } from "../../../components/designer/settings-skills-page";

export default function SettingsSkillsRoute() {
  return (
    <Suspense>
      <SettingsSkillsPage />
    </Suspense>
  );
}
