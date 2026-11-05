export type DesignerPortfolioItem = {
  src: string;
  alt: string;
  title: string;
  meta: string;
};

export type DesignerLanguage = {
  name: string;
  level: string;
};

export type DesignerProfile = {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  cover: string;
  location: string;
  localTime: string;
  rating: number;
  reviewCount: number;
  hourly: number;
  skills: string[];
  bio: string[];
  portfolio: DesignerPortfolioItem[];
  online: boolean;
  verified: boolean;
  totalEarned: string;
  jobsCompleted: number;
  languages: DesignerLanguage[];
  moreProjects: number;
  fallbackStudio?: boolean;
};

const ALEX_PORTFOLIO: DesignerPortfolioItem[] = [
  { title: "Fintech Analytics Dashboard", meta: "Web Application • UI/UX", src: "/images/category-uiux.png", alt: "Fintech analytics dashboard" },
  { title: "Modern E-commerce App", meta: "Mobile App • Product Design", src: "/images/category-web.png", alt: "Modern e-commerce app screens" },
  { title: "Lifestyle Brand System", meta: "Brand • Identity", src: "/images/designer-cover.png", alt: "Lifestyle brand system boards" },
  { title: "SaaS Platform Redesign", meta: "Web Design • Design System", src: "/images/category-branding.png", alt: "SaaS platform redesign" },
  { title: "Campaign Spark Set", meta: "Social • Motion", src: "/images/hiw-spark.png", alt: "Campaign spark creative set" },
  { title: "Checkout Flow Study", meta: "Mobile App • UX", src: "/images/hiw-social-1.png", alt: "Checkout flow study" },
  { title: "Wallet Home Concept", meta: "Fintech • Product", src: "/images/hiw-social-2.png", alt: "Wallet home concept" },
];

export const ALEX_RIVERA: DesignerProfile = {
  slug: "alex-rivera",
  name: "Alex Rivera",
  role: "Senior UI/UX Designer & Art Director",
  avatar: "/images/hiw-avatar-1.png",
  cover: "/images/designer-cover.png",
  location: "San Francisco, CA",
  localTime: "9:41 AM Local Time",
  rating: 4.9,
  reviewCount: 142,
  hourly: 85,
  skills: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Figma", "Design Systems", "Webflow"],
  bio: [
    "I'm a passionate Senior Product Designer with over 8 years of experience creating user-centric digital products. I specialize in building scalable design systems and intuitive interfaces for SaaS platforms and fintech applications.",
    "My approach combines deep user research with clean, modern aesthetics to solve complex problems. I've successfully led design initiatives from conception to launch, working closely with cross-functional teams to ensure high-quality implementation.",
  ],
  portfolio: ALEX_PORTFOLIO,
  online: true,
  verified: true,
  totalEarned: "$100k+",
  jobsCompleted: 142,
  languages: [
    { name: "English", level: "Native/Bilingual" },
    { name: "Spanish", level: "Conversational" },
  ],
  moreProjects: 12,
};

const NAMED: DesignerProfile[] = [
  ALEX_RIVERA,
  {
    slug: "elena-rodriguez",
    name: "Elena Rodriguez",
    role: "Senior UI/UX Designer",
    avatar: "/images/avatar-elena.png",
    cover: "/images/category-uiux.png",
    location: "Barcelona, Spain",
    localTime: "6:41 PM Local Time",
    rating: 4.9,
    reviewCount: 124,
    hourly: 85,
    skills: ["UI/UX", "SaaS", "Webflow", "Figma", "Design Systems", "Prototyping"],
    bio: [
      "Award-winning product designer specializing in B2B SaaS platforms and design systems. Helping startups ship clearer, calmer product surfaces.",
      "I partner with founders and engineers to turn messy roadmaps into usable product systems, from research through high-fidelity UI.",
    ],
    portfolio: [
      { src: "/images/category-uiux.png", alt: "Dark modern SaaS dashboard UI by Elena Rodriguez", title: "SaaS Command Center", meta: "Web App • UI/UX" },
      { src: "/images/hiw-social-1.png", alt: "Mobile app onboarding screens by Elena Rodriguez", title: "Onboarding Flow", meta: "Mobile • Product" },
      { src: "/images/category-web.png", alt: "Dark-mode crypto wallet web app by Elena Rodriguez", title: "Wallet Web App", meta: "Fintech • Web" },
      { src: "/images/hiw-social-3.png", alt: "Product marketing landing page by Elena Rodriguez", title: "Product Launch Site", meta: "Marketing • Web" },
      { src: "/images/designer-cover.png", alt: "Cover exploration by Elena Rodriguez", title: "Cover Explorations", meta: "Visual • Brand" },
      { src: "/images/hiw-spark.png", alt: "Campaign graphics by Elena Rodriguez", title: "Campaign Graphics", meta: "Social • Motion" },
      { src: "/images/category-branding.png", alt: "Identity tiles by Elena Rodriguez", title: "Identity Tiles", meta: "Brand • System" },
    ],
    online: true,
    verified: true,
    totalEarned: "$46,500",
    jobsCompleted: 101,
    languages: [
      { name: "Spanish", level: "Native/Bilingual" },
      { name: "English", level: "Fluent" },
    ],
    moreProjects: 18,
  },
  {
    slug: "marcus-chen",
    name: "Marcus Chen",
    role: "Brand Identity Director",
    avatar: "/images/avatar-michael.png",
    cover: "/images/category-branding.png",
    location: "Singapore",
    localTime: "12:41 AM Local Time",
    rating: 5,
    reviewCount: 89,
    hourly: 120,
    skills: ["Branding", "Typography", "Logo", "Packaging", "Art Direction"],
    bio: [
      "Crafting compelling visual identities for tech startups and lifestyle brands. Former Art Director at a top global studio.",
      "I build brand systems that hold up in product UI, packaging, and campaign work — not just a logo on a white slide.",
    ],
    portfolio: [
      { src: "/images/category-branding.png", alt: "Minimalist typography logo presentation by Marcus Chen", title: "Wordmark System", meta: "Brand • Typography" },
      { src: "/images/designer-cover.png", alt: "Brand identity mockup on packaging by Marcus Chen", title: "Packaging Suite", meta: "Brand • Print" },
      { src: "/images/hiw-social-2.png", alt: "Minimal paper bag branding mockup by Marcus Chen", title: "Collateral Set", meta: "Brand • Print" },
      { src: "/images/category-web.png", alt: "Brand-led website by Marcus Chen", title: "Brand Website", meta: "Web • Identity" },
      { src: "/images/hiw-social-4.png", alt: "Gradient brand frames by Marcus Chen", title: "Campaign Frames", meta: "Social • Brand" },
      { src: "/images/category-uiux.png", alt: "Brand applied in product UI by Marcus Chen", title: "Product Application", meta: "UI • Brand" },
      { src: "/images/hiw-spark.png", alt: "Launch kit by Marcus Chen", title: "Launch Kit", meta: "Campaign • Brand" },
    ],
    online: false,
    verified: true,
    totalEarned: "$128k+",
    jobsCompleted: 76,
    languages: [
      { name: "English", level: "Native/Bilingual" },
      { name: "Mandarin", level: "Fluent" },
    ],
    moreProjects: 9,
  },
  {
    slug: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "Creative Web Developer",
    avatar: "/images/avatar-sarah.png",
    cover: "/images/hiw-social-3.png",
    location: "Austin, TX",
    localTime: "11:41 AM Local Time",
    rating: 4.8,
    reviewCount: 210,
    hourly: 95,
    skills: ["Web Design", "Framer", "Motion", "Webflow", "Frontend"],
    bio: [
      "I build high-performance, award-winning websites using Framer and Webflow. Specializing in micro-interactions that feel considered, not decorative.",
      "Clients hire me when the brand is strong and the site still feels generic. I close that gap with motion, type, and production-quality builds.",
    ],
    portfolio: [
      { src: "/images/hiw-social-3.png", alt: "Cinematic website landing page by Sarah Jenkins", title: "Cinematic Landing", meta: "Web • Motion" },
      { src: "/images/designer-naylia.png", alt: "Light-mode portfolio website by Sarah Jenkins", title: "Studio Portfolio", meta: "Web • Editorial" },
      { src: "/images/hiw-social-4.png", alt: "Abstract gradient web layout by Sarah Jenkins", title: "Gradient Layout", meta: "Web • Visual" },
      { src: "/images/category-web.png", alt: "Product marketing site by Sarah Jenkins", title: "Product Site", meta: "Web • SaaS" },
      { src: "/images/hiw-spark.png", alt: "Interactive campaign by Sarah Jenkins", title: "Interactive Campaign", meta: "Web • Motion" },
      { src: "/images/category-uiux.png", alt: "Component library site by Sarah Jenkins", title: "System Site", meta: "Web • Design System" },
      { src: "/images/designer-cover.png", alt: "Case study cover by Sarah Jenkins", title: "Case Study Cover", meta: "Web • Story" },
    ],
    online: true,
    verified: true,
    totalEarned: "$89k+",
    jobsCompleted: 210,
    languages: [
      { name: "English", level: "Native/Bilingual" },
      { name: "French", level: "Conversational" },
    ],
    moreProjects: 24,
  },
  {
    slug: "naylia-rhamen",
    name: "Naylia Rhamen",
    role: "Web Designer",
    avatar: "/images/designer-naylia.png",
    cover: "/images/designer-naylia.png",
    location: "Lisbon, Portugal",
    localTime: "5:41 PM Local Time",
    rating: 5,
    reviewCount: 124,
    hourly: 72,
    skills: ["UI/UX Design", "SaaS", "Webflow"],
    bio: [
      "Award-winning product designer specializing in B2B SaaS platforms and design systems. Helping startups…",
      "I ship polished marketing and product surfaces with a bias toward clear hierarchy and fast Webflow production.",
    ],
    portfolio: [
      { src: "/images/designer-naylia.png", alt: "Portrait-led lifestyle site by Naylia Rhamen", title: "Lifestyle Site", meta: "Web • Editorial" },
      { src: "/images/category-web.png", alt: "SaaS marketing page by Naylia Rhamen", title: "SaaS Marketing", meta: "Web • SaaS" },
      { src: "/images/hiw-social-1.png", alt: "Social product screens by Naylia Rhamen", title: "Social Product", meta: "Mobile • UI" },
      { src: "/images/category-uiux.png", alt: "Dashboard UI by Naylia Rhamen", title: "Ops Dashboard", meta: "Web • UI/UX" },
      { src: "/images/hiw-social-3.png", alt: "Landing exploration by Naylia Rhamen", title: "Launch Landing", meta: "Web • Visual" },
      { src: "/images/category-branding.png", alt: "Brand tiles by Naylia Rhamen", title: "Brand Tiles", meta: "Brand • Web" },
      { src: "/images/hiw-spark.png", alt: "Campaign set by Naylia Rhamen", title: "Campaign Set", meta: "Social • Web" },
    ],
    online: true,
    verified: true,
    totalEarned: "$46,500",
    jobsCompleted: 101,
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Portuguese", level: "Native/Bilingual" },
    ],
    moreProjects: 12,
  },
];

const STUDIO_SEEDS: Array<{
  slug: string;
  name: string;
  role: string;
  avatar: string;
  cover: string;
  location: string;
  hourly: number;
  rating: number;
  reviewCount: number;
  skills: string[];
}> = [
  { slug: "creative-studio", name: "CreativeStudio", role: "Product design studio", avatar: "/images/hiw-avatar-2.png", cover: "/images/hiw-social-2.png", location: "Remote", hourly: 64, rating: 4.2, reviewCount: 38, skills: ["UI Design", "Mobile", "Prototyping"] },
  { slug: "pixel-perfect", name: "PixelPerfect", role: "Interface design studio", avatar: "/images/avatar-elena.png", cover: "/images/category-uiux.png", location: "Berlin, Germany", hourly: 90, rating: 4.8, reviewCount: 64, skills: ["UI/UX", "Design Systems", "Figma"] },
  { slug: "design-flow", name: "DesignFlow", role: "UX studio", avatar: "/images/hiw-avatar-3.png", cover: "/images/category-web.png", location: "Toronto, Canada", hourly: 78, rating: 4.7, reviewCount: 51, skills: ["UX Research", "Wireframing", "UI Design"] },
  { slug: "modern-design", name: "ModernDesign", role: "Visual product studio", avatar: "/images/avatar-emma.png", cover: "/images/designer-cover.png", location: "London, UK", hourly: 82, rating: 4.6, reviewCount: 47, skills: ["Visual Design", "Web", "Brand"] },
  { slug: "smooth-ui", name: "SmoothUI", role: "Interaction design studio", avatar: "/images/avatar-michael.png", cover: "/images/hiw-social-1.png", location: "New York, NY", hourly: 88, rating: 4.5, reviewCount: 41, skills: ["Motion", "UI Design", "Prototyping"] },
  { slug: "northline", name: "Northline", role: "Junior product studio", avatar: "/images/hiw-avatar-1.png", cover: "/images/hiw-spark.png", location: "Oslo, Norway", hourly: 45, rating: 4.1, reviewCount: 12, skills: ["UI Design", "Figma", "Web"] },
  { slug: "atelier-nine", name: "Atelier Nine", role: "Brand and product studio", avatar: "/images/avatar-elena.png", cover: "/images/category-branding.png", location: "Paris, France", hourly: 70, rating: 4.4, reviewCount: 29, skills: ["Brand", "UI Design", "Art Direction"] },
  { slug: "kite-studio", name: "Kite Studio", role: "Digital product studio", avatar: "/images/hiw-avatar-3.png", cover: "/images/category-web.png", location: "Melbourne, Australia", hourly: 76, rating: 4.6, reviewCount: 33, skills: ["Web Design", "UX", "Systems"] },
  { slug: "lumen-co", name: "Lumen Co", role: "Early-career design duo", avatar: "/images/avatar-emma.png", cover: "/images/hiw-social-4.png", location: "Chicago, IL", hourly: 42, rating: 3.9, reviewCount: 8, skills: ["UI Design", "Mobile", "Figma"] },
  { slug: "orbit-craft", name: "Orbit Craft", role: "Product craft studio", avatar: "/images/hiw-avatar-2.png", cover: "/images/hiw-social-3.png", location: "Amsterdam", hourly: 68, rating: 4.3, reviewCount: 22, skills: ["UI Design", "Prototyping", "Webflow"] },
  { slug: "fold-form", name: "Fold & Form", role: "Spatial UI studio", avatar: "/images/avatar-michael.png", cover: "/images/category-uiux.png", location: "Seoul, Korea", hourly: 92, rating: 4.7, reviewCount: 44, skills: ["UI Design", "3D", "Brand"] },
  { slug: "quiet-type", name: "Quiet Type", role: "Editorial product studio", avatar: "/images/avatar-sarah.png", cover: "/images/designer-naylia.png", location: "Portland, OR", hourly: 80, rating: 4.8, reviewCount: 58, skills: ["Typography", "Web", "Editorial"] },
  { slug: "harbor-ui", name: "Harbor UI", role: "Junior interface studio", avatar: "/images/hiw-avatar-1.png", cover: "/images/hiw-social-2.png", location: "Boston, MA", hourly: 40, rating: 4.0, reviewCount: 11, skills: ["UI Design", "Wireframing", "Figma"] },
  { slug: "maple-grid", name: "Maple Grid", role: "Systems design studio", avatar: "/images/avatar-elena.png", cover: "/images/category-web.png", location: "Montreal, Canada", hourly: 74, rating: 4.5, reviewCount: 36, skills: ["Design Systems", "UI/UX", "SaaS"] },
  { slug: "nova-marks", name: "Nova Marks", role: "Brand-led product studio", avatar: "/images/hiw-avatar-3.png", cover: "/images/category-branding.png", location: "Los Angeles, CA", hourly: 86, rating: 4.6, reviewCount: 40, skills: ["Brand", "UI Design", "Campaign"] },
  { slug: "cedar-lab", name: "Cedar Lab", role: "Research-led studio", avatar: "/images/avatar-emma.png", cover: "/images/hiw-spark.png", location: "Denver, CO", hourly: 61, rating: 4.2, reviewCount: 19, skills: ["UX Research", "UI Design", "Workshops"] },
  { slug: "pulse-form", name: "Pulse Form", role: "Health-tech design studio", avatar: "/images/avatar-michael.png", cover: "/images/category-uiux.png", location: "Zurich, Switzerland", hourly: 110, rating: 4.9, reviewCount: 73, skills: ["Healthtech", "UI/UX", "Systems"] },
  { slug: "fieldnote", name: "Fieldnote", role: "Junior research studio", avatar: "/images/hiw-avatar-1.png", cover: "/images/hiw-social-1.png", location: "Nairobi, Kenya", hourly: 38, rating: 4.3, reviewCount: 9, skills: ["Research", "UI Design", "Figma"] },
  { slug: "silverline", name: "Silverline", role: "Fintech product studio", avatar: "/images/avatar-sarah.png", cover: "/images/category-web.png", location: "Dublin, Ireland", hourly: 84, rating: 4.4, reviewCount: 27, skills: ["Fintech", "UI Design", "Web"] },
  { slug: "echo-studio", name: "Echo Studio", role: "Sound and motion studio", avatar: "/images/hiw-avatar-2.png", cover: "/images/hiw-social-4.png", location: "Tokyo, Japan", hourly: 96, rating: 4.7, reviewCount: 48, skills: ["Motion", "Brand", "Web"] },
];

function studioToProfile(seed: (typeof STUDIO_SEEDS)[number]): DesignerProfile {
  return {
    slug: seed.slug,
    name: seed.name,
    role: seed.role,
    avatar: seed.avatar,
    cover: seed.cover,
    location: seed.location,
    localTime: "Local time not synced",
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    hourly: seed.hourly,
    skills: seed.skills,
    bio: [
      `${seed.name} is a demo studio profile on Zyroun. This is not ${NAMED[1].name} or ${NAMED[2].name} — it is a labelled fallback so contest names can still open a unique page.`,
      "Portfolio images are in-repo assets used for layout. Nothing on this profile is saved to a server.",
    ],
    portfolio: [
      { src: seed.cover, alt: `${seed.name} cover work`, title: "Selected Work", meta: "Studio • Demo" },
      { src: "/images/category-uiux.png", alt: `${seed.name} interface study`, title: "Interface Study", meta: "UI • Demo" },
      { src: "/images/category-web.png", alt: `${seed.name} web study`, title: "Web Study", meta: "Web • Demo" },
      { src: "/images/category-branding.png", alt: `${seed.name} brand study`, title: "Brand Study", meta: "Brand • Demo" },
      { src: "/images/hiw-social-1.png", alt: `${seed.name} mobile study`, title: "Mobile Study", meta: "Mobile • Demo" },
      { src: "/images/hiw-spark.png", alt: `${seed.name} campaign study`, title: "Campaign Study", meta: "Campaign • Demo" },
      { src: "/images/designer-cover.png", alt: `${seed.name} cover board`, title: "Cover Board", meta: "Visual • Demo" },
    ],
    online: seed.rating >= 4.5,
    verified: false,
    totalEarned: seed.hourly >= 80 ? "$40k+" : "$12k+",
    jobsCompleted: seed.reviewCount,
    languages: [{ name: "English", level: "Professional" }],
    moreProjects: 6,
    fallbackStudio: true,
  };
}

export const DESIGNER_PROFILES: DesignerProfile[] = [...NAMED, ...STUDIO_SEEDS.map(studioToProfile)];

const BY_SLUG = new Map(DESIGNER_PROFILES.map((profile) => [profile.slug, profile]));

const NAME_ALIASES: Record<string, string> = {
  "Sarah Design": "sarah-jenkins",
  "Sarah Johnson": "sarah-jenkins",
  "Alex Rivera": "alex-rivera",
  "Elena Rodriguez": "elena-rodriguez",
  "Marcus Chen": "marcus-chen",
  "Sarah Jenkins": "sarah-jenkins",
  "Naylia Rhamen": "naylia-rhamen",
};

export function slugifyDesignerName(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function slugForDesignerName(name: string) {
  return NAME_ALIASES[name] ?? slugifyDesignerName(name);
}

export function getDesignerProfile(slug: string) {
  return BY_SLUG.get(slug) ?? null;
}

export const SAVED_DESIGNER_SLUGS = ["elena-rodriguez", "marcus-chen", "sarah-jenkins"] as const;

export const MARKETPLACE_DESIGNERS = [
  DESIGNER_PROFILES.find((item) => item.slug === "elena-rodriguez")!,
  DESIGNER_PROFILES.find((item) => item.slug === "marcus-chen")!,
  DESIGNER_PROFILES.find((item) => item.slug === "sarah-jenkins")!,
  DESIGNER_PROFILES.find((item) => item.slug === "naylia-rhamen")!,
  DESIGNER_PROFILES.find((item) => item.slug === "alex-rivera")!,
  DESIGNER_PROFILES.find((item) => item.slug === "pulse-form")!,
];
