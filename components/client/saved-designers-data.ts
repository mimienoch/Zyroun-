export type SavedCategory = "UI/UX" | "Branding" | "Web Development";

export type SavedDesigner = {
  id: string;
  name: string;
  slug: string;
  role: string;
  rating: number;
  reviews: number;
  online: boolean;
  hourly: number;
  category: SavedCategory;
  tags: string[];
  bio: string;
  avatar: string;
  portfolio: { src: string; alt: string }[];
};

export const savedDesignersSeed: SavedDesigner[] = [
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    slug: "elena-rodriguez",
    role: "Senior UI/UX Designer",
    rating: 4.9,
    reviews: 124,
    online: true,
    hourly: 85,
    category: "UI/UX",
    tags: ["UI/UX", "SaaS", "Webflow"],
    bio: "Award-winning product designer specializing in B2B SaaS platforms and design systems. Helping startups...",
    avatar: "/images/avatar-elena.png",
    portfolio: [
      { src: "/images/category-uiux.png", alt: "Dark modern SaaS dashboard UI by Elena Rodriguez" },
      { src: "/images/hiw-social-1.png", alt: "Mobile app onboarding screens by Elena Rodriguez" },
      { src: "/images/category-web.png", alt: "Dark-mode crypto wallet web app by Elena Rodriguez" },
    ],
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    slug: "marcus-chen",
    role: "Brand Identity Director",
    rating: 5,
    reviews: 89,
    online: false,
    hourly: 120,
    category: "Branding",
    tags: ["Branding", "Typography", "Logo"],
    bio: "Crafting compelling visual identities for tech startups and lifestyle brands. Former Art Director at top global...",
    avatar: "/images/avatar-michael.png",
    portfolio: [
      { src: "/images/category-branding.png", alt: "Minimalist typography logo presentation by Marcus Chen" },
      { src: "/images/designer-cover.png", alt: "Brand identity mockup on packaging by Marcus Chen" },
      { src: "/images/hiw-social-2.png", alt: "Minimal paper bag branding mockup by Marcus Chen" },
    ],
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    slug: "sarah-jenkins",
    role: "Creative Web Developer",
    rating: 4.8,
    reviews: 210,
    online: true,
    hourly: 95,
    category: "Web Development",
    tags: ["Web Design", "Framer", "Motion"],
    bio: "I build high-performance, award-winning websites using Framer and Webflow. Specializing in micro-interactions...",
    avatar: "/images/avatar-sarah.png",
    portfolio: [
      { src: "/images/hiw-social-3.png", alt: "Cinematic website landing page by Sarah Jenkins" },
      { src: "/images/designer-naylia.png", alt: "Light-mode portfolio website by Sarah Jenkins" },
      { src: "/images/hiw-social-4.png", alt: "Abstract gradient web layout by Sarah Jenkins" },
    ],
  },
];

export const savedDesignerCategories: Array<"All Categories" | SavedCategory> = [
  "All Categories",
  "UI/UX",
  "Branding",
  "Web Development",
];
