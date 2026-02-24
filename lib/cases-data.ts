export interface CaseStudy {
  slug: string;
  featured: boolean;
  cardImage: string;
  tags: string[];
  year: string;
  color: string;
  url?: string;
  images: string[];
}

export const casesData: CaseStudy[] = [
  {
    slug: "lineproduction",
    featured: true,
    cardImage: "/cases/lineproduction/cover.webp",
    tags: ["Web", "UX/UI"],
    year: "2024",
    color: "#1a1a1a",
    url: "https://www.lineproduction.md",
    images: [
      "/cases/lineproduction/cover.webp",
      "/cases/lineproduction/screen-1.webp",
      "/cases/lineproduction/screen-2.webp",
      "/cases/lineproduction/screen-3.webp",
      "/cases/lineproduction/mobile.webp",
    ],
  },
];

export const filterMap: Record<string, string[]> = {
  Web: ["Web", "E-commerce", "UX/UI", "Web App", "Dashboard"],
  Mobile: ["Mobile", "iOS", "Android"],
  Branding: ["Branding", "Identity"],
  Platforms: ["Event", "Platform", "SaaS", "Automation"],
};

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return casesData.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return casesData.map((c) => c.slug);
}

export function getNextCase(currentSlug: string): CaseStudy | undefined {
  const idx = casesData.findIndex((c) => c.slug === currentSlug);
  if (idx === -1) return undefined;
  return casesData[(idx + 1) % casesData.length];
}
