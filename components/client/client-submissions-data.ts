import type { ClientProject, ProjectStatus } from "./client-data";
import { slugForDesignerName } from "../designers/designer-profiles";

export type DesignerLevel = "junior" | "mid" | "senior" | "expert";
export type SubmissionBadge = "New" | "Popular" | "Selected";

export type ClientSubmission = {
  id: string;
  designer: string;
  designerSlug: string;
  avatar: string;
  rating: number;
  level: DesignerLevel;
  badge: SubmissionBadge;
  preview: string;
  previewAlt: string;
  createdAt: number;
};

const previews = [
  { src: "/images/designer-cover.png", alt: "Minimal mobile app interface with clean white and purple accents" },
  { src: "/images/category-uiux.png", alt: "Mobile app dashboard with dark mode toggle" },
  { src: "/images/category-web.png", alt: "Modern mobile app UI with purple gradient dashboard" },
  { src: "/images/category-branding.png", alt: "App branding and product grid exploration" },
  { src: "/images/hiw-social-1.png", alt: "Social commerce home screen concept" },
  { src: "/images/hiw-social-2.png", alt: "Feed and discovery layout concept" },
  { src: "/images/hiw-social-3.png", alt: "Profile and wallet screen concept" },
  { src: "/images/hiw-social-4.png", alt: "Checkout confirmation screen concept" },
  { src: "/images/designer-naylia.png", alt: "Portrait-led lifestyle app concept" },
];

const seeds: Array<Pick<ClientSubmission, "designer" | "avatar" | "rating" | "level" | "badge">> = [
  { designer: "CreativeStudio", avatar: "/images/hiw-avatar-2.png", rating: 4.2, level: "mid", badge: "New" },
  { designer: "CreativeStudio", avatar: "/images/hiw-avatar-2.png", rating: 4.2, level: "mid", badge: "New" },
  { designer: "CreativeStudio", avatar: "/images/hiw-avatar-2.png", rating: 4.2, level: "mid", badge: "New" },
  { designer: "CreativeStudio", avatar: "/images/hiw-avatar-2.png", rating: 4.2, level: "mid", badge: "New" },
  { designer: "PixelPerfect", avatar: "/images/avatar-elena.png", rating: 4.8, level: "expert", badge: "Popular" },
  { designer: "DesignFlow", avatar: "/images/hiw-avatar-3.png", rating: 4.7, level: "senior", badge: "New" },
  { designer: "ModernDesign", avatar: "/images/avatar-emma.png", rating: 4.6, level: "senior", badge: "New" },
  { designer: "SmoothUI", avatar: "/images/avatar-michael.png", rating: 4.5, level: "mid", badge: "Popular" },
  { designer: "Sarah Design", avatar: "/images/avatar-sarah.png", rating: 4.9, level: "expert", badge: "Selected" },
  { designer: "Northline", avatar: "/images/hiw-avatar-1.png", rating: 4.1, level: "junior", badge: "New" },
  { designer: "Atelier Nine", avatar: "/images/avatar-elena.png", rating: 4.4, level: "mid", badge: "New" },
  { designer: "Kite Studio", avatar: "/images/hiw-avatar-3.png", rating: 4.6, level: "senior", badge: "Popular" },
  { designer: "Lumen Co", avatar: "/images/avatar-emma.png", rating: 3.9, level: "junior", badge: "New" },
  { designer: "Orbit Craft", avatar: "/images/hiw-avatar-2.png", rating: 4.3, level: "mid", badge: "New" },
  { designer: "Fold & Form", avatar: "/images/avatar-michael.png", rating: 4.7, level: "senior", badge: "Popular" },
  { designer: "Quiet Type", avatar: "/images/avatar-sarah.png", rating: 4.8, level: "expert", badge: "New" },
  { designer: "Harbor UI", avatar: "/images/hiw-avatar-1.png", rating: 4.0, level: "junior", badge: "New" },
  { designer: "Maple Grid", avatar: "/images/avatar-elena.png", rating: 4.5, level: "mid", badge: "Popular" },
  { designer: "Nova Marks", avatar: "/images/hiw-avatar-3.png", rating: 4.6, level: "senior", badge: "New" },
  { designer: "Cedar Lab", avatar: "/images/avatar-emma.png", rating: 4.2, level: "mid", badge: "New" },
  { designer: "Pulse Form", avatar: "/images/avatar-michael.png", rating: 4.9, level: "expert", badge: "Popular" },
  { designer: "Fieldnote", avatar: "/images/hiw-avatar-1.png", rating: 4.3, level: "junior", badge: "New" },
  { designer: "Silverline", avatar: "/images/avatar-sarah.png", rating: 4.4, level: "mid", badge: "New" },
  { designer: "Echo Studio", avatar: "/images/hiw-avatar-2.png", rating: 4.7, level: "senior", badge: "Popular" },
];

function submissionCount(projectId: string, status: ProjectStatus) {
  if (status === "draft") return 0;
  if (projectId === "ecommerce-app") return seeds.length;
  if (status === "closed") return 6;
  if (status === "blocked") return 4;
  if (status === "review") return 8;
  return 12;
}

export function submissionsForProject(project: ClientProject): ClientSubmission[] {
  const count = submissionCount(project.id, project.status);
  const offset = project.id.length % previews.length;
  return seeds.slice(0, count).map((seed, index) => {
    const preview = previews[(index + offset) % previews.length];
    const closedWinner = project.status === "closed" && index === 0;
    return {
      id: `${project.id}-submission-${index + 1}`,
      ...seed,
      designerSlug: slugForDesignerName(seed.designer),
      badge: closedWinner ? "Selected" : seed.badge,
      preview: preview.src,
      previewAlt: preview.alt,
      createdAt: count - index,
    };
  });
}

export function briefForProject(project: ClientProject) {
  if (project.id === "ecommerce-app") {
    return {
      summary:
        "Complete overhaul of the mobile shopping experience focusing on checkout flow, navigation, and a calmer visual system for iOS and Android.",
      goals: [
        "A unified design system for iOS and Android.",
        "Checkout reduced to three primary steps.",
        "Dark and light mode for all key screens.",
        "Accessible type, contrast, and tap targets.",
      ],
    };
  }
  return {
    summary: project.description,
    goals: [
      `Cover the full ${project.title} scope in this contest.`,
      "Match Zyroun’s visual system, type, and accessibility bar.",
      "Deliver source files plus a short rationale for the chosen direction.",
    ],
  };
}

export const statusCopy: Record<ProjectStatus, { label: string; className: string }> = {
  "in-progress": { label: "Open", className: "bg-[#f3e8ff] text-[#7b61ff]" },
  blocked: { label: "Blocked", className: "bg-[#fee2e2] text-[#dc2626]" },
  review: { label: "In Review", className: "bg-[#fffbeb] text-[#d97706]" },
  closed: { label: "Closed", className: "bg-[#f3f4f6] text-[#6b7280]" },
  draft: { label: "Draft", className: "bg-[#f3e8ff] text-[#7b61ff]" },
};

export function canSelectWinner(status: ProjectStatus) {
  return status === "in-progress" || status === "review";
}

export const recentActivity = [
  { id: "a1", name: "Sarah Johnson", avatar: "/images/avatar-sarah.png", text: "Sarah Johnson uploaded new design files", time: "2 hours ago" },
  { id: "a2", name: "Mike Roberts", avatar: "/images/hiw-avatar-2.png", text: "Mike Roberts completed UI Design milestone", time: "5 hours ago" },
  { id: "a3", name: "Emily Chen", avatar: "/images/avatar-elena.png", text: "Emily Chen commented on mockups", time: "Yesterday" },
  { id: "a4", name: "Lisa Anderson", avatar: "/images/avatar-emma.png", text: "Lisa Anderson shared research findings", time: "2 days ago" },
  { id: "a5", name: "John Doe", avatar: "/images/avatar-michael.png", text: "John Doe updated project timeline", time: "3 days ago" },
  { id: "a6", name: "Sarah Johnson", avatar: "/images/avatar-sarah.png", text: "Sarah Johnson created wireframe set", time: "1 week ago" },
  { id: "a7", name: "Alex Rivera", avatar: "/images/hiw-avatar-1.png", text: "Alex Rivera requested a checkout review", time: "1 week ago" },
];

export const discussionNotes = [
  { id: "d1", author: "Sarah Johnson", body: "Are we locking the purple accent to #7B61FF for both platforms?", time: "2 hours ago" },
  { id: "d2", author: "TechFlow Inc.", body: "Yes — keep Zyroun purple for primary actions and cyan for success states.", time: "1 hour ago" },
];
