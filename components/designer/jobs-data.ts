export type JobListing = {
  slug: string;
  title: string;
  client: string;
  verified: boolean;
  tags: { label: string; tone: "purple" | "green" | "gray" | "pink" | "orange" }[];
  summary: string;
  budgetLabel: string;
  budgetValue: string;
  timeLeft: string;
  people: string;
  rating: string;
  cta: "apply" | "submit";
  category: string;
  guaranteed: boolean;
  participation: boolean;
  prize: number;
};

export const jobs: JobListing[] = [
  {
    slug: "nexus-banking",
    title: "Nexus Banking App Redesign",
    client: "Nexus Financial • Verified Client",
    verified: true,
    tags: [
      { label: "UI/UX Design", tone: "purple" },
      { label: "Guaranteed", tone: "green" },
      { label: "Mobile App", tone: "gray" },
    ],
    summary:
      "Looking for an experienced product designer to redesign our core banking application focusing on gen-z users. Must have experience…",
    budgetLabel: "Budget",
    budgetValue: "$4,500 - $6,000",
    timeLeft: "3 days, 4 hrs",
    people: "12 Applied",
    rating: "4.9",
    cta: "apply",
    category: "UI/UX Design",
    guaranteed: true,
    participation: false,
    prize: 6000,
  },
  {
    slug: "aura-brand-urgent",
    title: "Aura Brand Identity Kit",
    client: "Aura Wellness • Verified Client",
    verified: true,
    tags: [
      { label: "Guaranteed", tone: "green" },
      { label: "Participation Paid", tone: "orange" },
      { label: "Logo design", tone: "gray" },
      { label: "Urgent", tone: "pink" },
    ],
    summary:
      "We need a fresh, modern brand identity including logo, typography, color palette, and basic brand guidelines for a new holistic wellness…",
    budgetLabel: "Prize Pool",
    budgetValue: "$2,800",
    timeLeft: "5 days, 12 hrs",
    people: "8 Submitted",
    rating: "4.5",
    cta: "submit",
    category: "Brand Identity",
    guaranteed: true,
    participation: true,
    prize: 2800,
  },
  {
    slug: "aura-brand",
    title: "Aura Brand Identity Kit",
    client: "Aura Wellness • Verified Client",
    verified: true,
    tags: [
      { label: "Brand Identity", tone: "pink" },
      { label: "Participation Paid", tone: "orange" },
    ],
    summary:
      "We need a fresh, modern brand identity including logo, typography, color palette, and basic brand guidelines for a new holistic wellness…",
    budgetLabel: "Prize Pool",
    budgetValue: "$2,800",
    timeLeft: "5 days, 12 hrs",
    people: "8 Submitted",
    rating: "4.5",
    cta: "submit",
    category: "Brand Identity",
    guaranteed: false,
    participation: true,
    prize: 2800,
  },
];

export const nexusJob = jobs[0];
