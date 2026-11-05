export type ProjectStatus = "in-progress" | "blocked" | "review" | "closed" | "draft";
export type Accent = "green" | "red" | "orange";

export type ClientProject = {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  designersLabel: string;
  avatars: string[];
  extraDesigners?: string;
  meta: string;
  accent: Accent;
  featured: boolean;
  updatedAt: number;
};

export type ActionItem = {
  id: string;
  label: string;
  due: string;
  urgent?: boolean;
  done: boolean;
};

export const clientProjects: ClientProject[] = [
  {
    id: "ecommerce-app",
    title: "E-commerce App UI Redesign",
    status: "in-progress",
    description:
      "Complete overhaul of the mobile shopping experience focusing on checkout flow and…",
    designersLabel: "8 Designers",
    avatars: ["/images/hiw-avatar-1.png", "/images/avatar-sarah.png", "/images/avatar-elena.png"],
    meta: "55 Designs",
    accent: "green",
    featured: true,
    updatedAt: 4,
  },
  {
    id: "saas-dashboard",
    title: "SaaS Dashboard Web App",
    status: "in-progress",
    description:
      "Analytics dashboard interface for B2B clients, requiring complex data visualization and dark…",
    designersLabel: "45 Designers",
    avatars: ["/images/avatar-emma.png", "/images/hiw-avatar-2.png"],
    extraDesigners: "+2",
    meta: "78 Designs",
    accent: "green",
    featured: true,
    updatedAt: 3,
  },
  {
    id: "brand-kit",
    title: "Brand Identity Kit",
    status: "blocked",
    description: "Logo design, typography selection, and brand guidelines document for new sub-brand.",
    designersLabel: "2 members",
    avatars: ["/images/avatar-michael.png", "/images/hiw-avatar-3.png"],
    meta: "2 / 5 milestones",
    accent: "red",
    featured: true,
    updatedAt: 2,
  },
  {
    id: "marketing-website",
    title: "Marketing Website",
    status: "review",
    description:
      "Landing page design for Q4 campaign, including custom illustrations and responsive layouts.",
    designersLabel: "1 member",
    avatars: ["/images/avatar-elena.png"],
    meta: "8 / 8 milestones",
    accent: "orange",
    featured: true,
    updatedAt: 1,
  },
  {
    id: "onboarding-draft",
    title: "Customer Onboarding Flow",
    status: "draft",
    description: "Draft contest brief for a five-screen mobile onboarding flow. Not published yet.",
    designersLabel: "0 Designers",
    avatars: [],
    meta: "Draft",
    accent: "green",
    featured: false,
    updatedAt: 0,
  },
  ...[
    "Packaging System",
    "Help Center Illustrations",
    "Investor Deck Refresh",
    "Icon Library",
    "Email Templates",
    "App Store Screenshots",
    "Social Campaign Kit",
    "Annual Report Layout",
    "Product Hunt Assets",
    "Event Booth Graphics",
    "Internal Wiki Theme",
    "Q3 Case Study Pages",
  ].map((title, index) => ({
    id: `closed-${index + 1}`,
    title,
    status: "closed" as const,
    description: "Contest closed. Files were delivered and the project was archived locally.",
    designersLabel: "Completed",
    avatars: ["/images/hiw-avatar-1.png"],
    meta: "Closed",
    accent: "green" as const,
    featured: false,
    updatedAt: -index - 1,
  })),
];

export const clientStats = {
  totalProjects: clientProjects.length,
  activeContests: clientProjects.filter((project) => project.featured).length,
  totalSubmissions: 245,
  pendingFeedback: 8,
};

export const seedActionItems: ActionItem[] = [
  { id: "wireframes", label: "Review wireframes from Alex", due: "Due today", urgent: true, done: false },
  { id: "milestone", label: "Approve milestone payment", due: "Oct 18", done: true },
  { id: "logo", label: "Provide feedback on logo concepts", due: "Oct 20", done: false },
  { id: "checkout", label: "Share checkout flow notes", due: "Oct 22", done: false },
  { id: "brand", label: "Upload brand assets for designers", due: "Oct 24", done: false },
];

export const clientThreads = [
  { id: "alex", name: "Alex Rivera", preview: "Updated the checkout wireframes for review.", time: "2h" },
  { id: "sarah", name: "Sarah Chen", preview: "Logo round 2 is ready in the project space.", time: "5h" },
  { id: "emma", name: "Emma Wilson", preview: "Can you confirm the dark-mode palette?", time: "1d" },
];

export function tabCounts(projects: ClientProject[]) {
  return {
    open: projects.filter((project) => project.status === "in-progress").length,
    closed: projects.filter((project) =>
      project.status === "closed" || project.status === "blocked" || project.status === "review",
    ).length,
    drafts: projects.filter((project) => project.status === "draft").length,
  };
}
