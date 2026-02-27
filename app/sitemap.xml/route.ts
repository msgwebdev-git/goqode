import { routing, type Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { getAllSlugs, getCaseBySlug } from "@/lib/cases-data";

const host = "https://goqode.agency";

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
  alternates: Record<string, string>;
  images?: string[];
}

export async function GET() {
  const staticPages = [
    { href: "/" as const, changeFrequency: "weekly", priority: 1.0 },
    { href: "/about" as const, changeFrequency: "monthly", priority: 0.8 },
    { href: "/contact" as const, changeFrequency: "monthly", priority: 0.8 },
    { href: "/cases" as const, changeFrequency: "weekly", priority: 0.8 },
    { href: "/launch" as const, changeFrequency: "monthly", priority: 0.7 },
    { href: "/growth" as const, changeFrequency: "monthly", priority: 0.7 },
    { href: "/platforms" as const, changeFrequency: "monthly", priority: 0.7 },
    { href: "/events" as const, changeFrequency: "monthly", priority: 0.7 },
    { href: "/automation" as const, changeFrequency: "monthly", priority: 0.7 },
    { href: "/branding" as const, changeFrequency: "monthly", priority: 0.7 },
    { href: "/support" as const, changeFrequency: "monthly", priority: 0.7 },
    { href: "/packages" as const, changeFrequency: "monthly", priority: 0.8 },
    { href: "/calculator" as const, changeFrequency: "monthly", priority: 0.7 },
    {
      href: "/services/landing-page-development" as const,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      href: "/services/ecommerce-development" as const,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      href: "/services/corporate-website" as const,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      href: "/services/web-application-development" as const,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      href: "/services/mobile-app-development" as const,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      href: "/services/digital-marketing" as const,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const entries: SitemapEntry[] = [];
  const now = new Date().toISOString();

  // Static pages — one entry per locale, each with hreflang alternates
  for (const page of staticPages) {
    const alternates = await getAlternates(page.href);
    for (const locale of routing.locales) {
      entries.push({
        url: await getUrl(page.href, locale),
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates,
      });
    }
  }

  // Dynamic case study pages
  const caseSlugs = getAllSlugs();
  for (const slug of caseSlugs) {
    const href = `/cases/${slug}` as const;
    const alternates = await getAlternates(href);
    const caseData = getCaseBySlug(slug);
    const images = caseData
      ? [caseData.cardImage, ...caseData.images].filter(
          (v, i, a) => a.indexOf(v) === i
        ).map((img) => `${host}${img}`)
      : [];
    for (const locale of routing.locales) {
      entries.push({
        url: await getUrl(href, locale),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates,
        images,
      });
    }
  }

  const xml = generateSitemapXml(entries);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

function generateSitemapXml(entries: SitemapEntry[]): string {
  const urlEntries = entries
    .map((entry) => {
      const alternateLinks = Object.entries(entry.alternates)
        .map(
          ([lang, url]) =>
            `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(url)}" />`
        )
        .join("\n");

      const imageLinks = (entry.images ?? [])
        .map(
          (img) =>
            `    <image:image>\n      <image:loc>${escapeXml(img)}</image:loc>\n    </image:image>`
        )
        .join("\n");

      return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
${alternateLinks}
${imageLinks ? `${imageLinks}\n` : ""}    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function getUrl(href: string, locale: Locale): Promise<string> {
  const pathname = await getPathname({ locale, href: href as any });
  return `${host}${pathname}`;
}

async function getAlternates(
  href: string
): Promise<Record<string, string>> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = await getUrl(href, locale);
  }
  languages["x-default"] = await getUrl(href, routing.defaultLocale);
  return languages;
}
