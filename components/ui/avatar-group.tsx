import type { ReactNode } from "react";

export function AvatarGroup({ children, overlap = 8 }: { children: ReactNode; overlap?: 8 | 20 }) {
  return (
    <div className={`flex ${overlap === 20 ? "-space-x-5" : "-space-x-2"}`}>{children}</div>
  );
}
