"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const MIN_PRIZE = 500;
export const MAX_PRIZE = 10000;
export const DEFAULT_PRIZE = 2500;

export type ProjectDraft = {
  title: string;
  category: string;
  description: string;
  styles: string[];
  budgetMin: string;
  budgetMax: string;
  prize: number;
  participation: boolean;
  timeline: string;
};

const defaultDraft: ProjectDraft = {
  title: "",
  category: "",
  description: "",
  styles: [],
  budgetMin: "",
  budgetMax: "",
  prize: DEFAULT_PRIZE,
  participation: false,
  timeline: "",
};

type ProjectContextValue = {
  draft: ProjectDraft;
  update: (patch: Partial<ProjectDraft>) => void;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);
const STORAGE_KEY = "zyroun-project-draft";

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<ProjectDraft>(defaultDraft);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setDraft({ ...defaultDraft, ...JSON.parse(raw) });
      } catch {
        setDraft(defaultDraft);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft, ready]);

  const value = useMemo(
    () => ({
      draft,
      update: (patch: Partial<ProjectDraft>) =>
        setDraft((current) => ({ ...current, ...patch })),
    }),
    [draft],
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProjectDraft() {
  const value = useContext(ProjectContext);
  if (!value) throw new Error("useProjectDraft must be used within ProjectProvider");
  return value;
}
