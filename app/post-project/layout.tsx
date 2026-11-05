import { ProjectProvider } from "../../components/project/project-context";

export default function PostProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProjectProvider>{children}</ProjectProvider>;
}
