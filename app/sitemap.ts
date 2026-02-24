import type { MetadataRoute } from "next";

const BASE_URL = "https://goqode.dev";
const locales = ["ro", "en", "ru"] as const;

const staticPages = [
  "",
  "/launch",
  "/growth",
  "/platforms",
  "/events",
  "/automation",
  "/solutions/branding",
  "/solutions/support",
  "/packages",
  "/calculator",
  "/cases",
  "/contact",
  "/services/landing-page-development",
  "/services/ecommerce-development",
  "/services/corporate-website",
  "/services/web-application-development",
  "/services/mobile-app-development",
  "/services/digital-marketing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      const url = `${BASE_URL}/${locale}${page}`;
      const alternates: Record<string, string> = {};
      for (const alt of locales) {
        alternates[alt] = `${BASE_URL}/${alt}${page}`;
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page.startsWith("/services/") ? 0.9 : 0.8,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
