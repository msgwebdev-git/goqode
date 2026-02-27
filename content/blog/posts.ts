export interface SectionConfig {
  key: string;
  type: "text" | "list" | "items";
}

export interface BlogPost {
  slug: string;
  category: "design" | "development" | "technology" | "marketing";
  readTime: number;
  image: string;
  date: string;
  author: string;
  sections: SectionConfig[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "sozdanie-lendinga-Moldova-polnoe-rukovodstvo",
    category: "development",
    readTime: 12,
    image: "/blog/landingmoldova.jpeg",
    date: "2026-02-27",
    author: "GoQode",
    sections: [
      { key: "why", type: "text" },
      { key: "structure", type: "list" },
      { key: "mistakes", type: "items" },
      { key: "cost", type: "text" },
      { key: "seo", type: "text" },
      { key: "tech", type: "text" },
      { key: "checklist", type: "list" },
      { key: "conclusion", type: "text" },
    ],
  },
  {
    slug: "5-priznakov-chto-sajtu-nuzhen-redizajn",
    category: "design",
    readTime: 4,
    image: "/blog/rebranding.jpg",
    date: "2026-02-27",
    author: "GoQode",
    sections: [
      { key: "signs", type: "items" },
      { key: "action", type: "text" },
      { key: "conclusion", type: "text" },
    ],
  },
  {
    slug: "skolko-stoit-sait-v-Moldova-2026",
    category: "development",
    readTime: 15,
    image: "/blog/money.jpg",
    date: "2026-02-27",
    author: "GoQode",
    sections: [
      { key: "types", type: "items" },
      { key: "factors", type: "list" },
      { key: "comparison", type: "items" },
      { key: "hidden", type: "list" },
      { key: "timeline", type: "text" },
      { key: "save", type: "list" },
      { key: "checklist", type: "list" },
      { key: "conclusion", type: "text" },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}
