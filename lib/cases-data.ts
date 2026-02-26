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
    cardImage: "/cases/lineproduction/line.jpg",
    tags: ["Web", "UX/UI"],
    year: "2024",
    color: "#1a1a1a",
    url: "https://www.lineproduction.md",
    images: [
      "/cases/lineproduction/line.jpg",
      "/cases/lineproduction/linemob.jpg",
    ],
  },
  {
    slug: "standup-live",
    featured: false,
    cardImage: "/cases/standup/standup.jpg",
    tags: ["Web App", "Platform"],
    year: "2025",
    color: "#0a0a0a",
    images: [
      "/cases/standup/standup.jpg",
      "/cases/standup/standupmob.jpg",
    ],
  },
  {
    slug: "povestea-de-iarna",
    featured: false,
    cardImage: "/cases/povestea-de-iarna/povestea.jpg",
    tags: ["Web App", "Event"],
    year: "2025",
    color: "#0a1628",
    url: "https://povesteadeiarna.md",
    images: [
      "/cases/povestea-de-iarna/povestea.jpg",
      "/cases/povestea-de-iarna/povesteamob.jpg",
    ],
  },
  {
    slug: "voievod",
    featured: false,
    cardImage: "/cases/voievod/voievod.jpg",
    tags: ["Web App", "Event"],
    year: "2025",
    color: "#0d0d0d",
    images: [
      "/cases/voievod/voievod.jpg",
      "/cases/voievod/voievodmob.jpg",
    ],
  },
  {
    slug: "egotax",
    featured: false,
    cardImage: "/cases/egotax/egotax.jpg",
    tags: ["Web App", "UX/UI"],
    year: "2025",
    color: "#1a1a2e",
    url: "https://egotax.md",
    images: [
      "/cases/egotax/egotax.jpg",
      "/cases/egotax/egotaxmob.jpg",
    ],
  },
  {
    slug: "artgarage",
    featured: false,
    cardImage: "/cases/artgarage/artgarage.jpg",
    tags: ["Web", "UX/UI"],
    year: "2025",
    color: "#0a0a0a",
    url: "https://artgarage.md",
    images: [
      "/cases/artgarage/artgarage.jpg",
      "/cases/artgarage/artgaragemob.jpg",
    ],
  },
  {
    slug: "cong-2025",
    featured: false,
    cardImage: "/cases/cong-2025/cong.jpg",
    tags: ["Web", "Event"],
    year: "2025",
    color: "#0a1a2e",
    images: [
      "/cases/cong-2025/cong.jpg",
      "/cases/cong-2025/congmob.jpg",
    ],
  },
  {
    slug: "examen",
    featured: false,
    cardImage: "/cases/examen/examen.jpg",
    tags: ["Web", "3D"],
    year: "2024",
    color: "#0d0010",
    url: "https://examen.wtf",
    images: [
      "/cases/examen/examen.jpg",
      "/cases/examen/examenmob.jpg",
    ],
  },
  {
    slug: "msprod",
    featured: false,
    cardImage: "/cases/msprod/msprod.jpg",
    tags: ["Web", "UX/UI"],
    year: "2025",
    color: "#0a0014",
    images: [
      "/cases/msprod/msprod.jpg",
    ],
  },
  {
    slug: "dj-voting",
    featured: false,
    cardImage: "/cases/dj-voting/dj-voting.jpg",
    tags: ["Web App", "Platform"],
    year: "2025",
    color: "#0a0010",
    images: [
      "/cases/dj-voting/dj-voting.jpg",
      "/cases/dj-voting/dj-votingmob.jpg",
    ],
  },
  {
    slug: "epc",
    featured: false,
    cardImage: "/cases/epc/epc.jpg",
    tags: ["Web", "Event"],
    year: "2023",
    color: "#0a1a2e",
    images: [
      "/cases/epc/epc.jpg",
      "/cases/epc/epcmob.jpg",
    ],
  },
];

export const filterMap: Record<string, string[]> = {
  Web: ["Web", "E-commerce", "UX/UI", "Web App", "Dashboard", "3D"],
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
