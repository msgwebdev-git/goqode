import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { getAlternates, getLocalizedUrl, getOgLocale } from "@/lib/metadata-helpers";
import type { Locale } from "@/i18n/routing";
import { getCaseBySlug, getAllSlugs } from "@/lib/cases-data";
import CaseDetailContent from "./content";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const caseData = getCaseBySlug(slug);
  if (!caseData) return {};

  const t = await getTranslations({ locale, namespace: "Cases" });

  const title = t(`items.${slug}.title`);
  const description = t(`items.${slug}.description`);

  const tags = caseData.tags;
  const keywords = [...tags, title, "GoQode", "web development", "case study"].join(", ");

  return {
    title: `${title} | GoQode`,
    description,
    keywords,
    openGraph: {
      title: `${title} — GoQode`,
      description,
      type: "article",
      url: await getLocalizedUrl(`/cases/${slug}`, locale as Locale),
      images: caseData.cardImage
        ? [{ url: `https://goqode.agency${caseData.cardImage}`, width: 1200, height: 630 }]
        : undefined,
      siteName: "GoQode",
      locale: getOgLocale(locale as Locale),
    },
    alternates: await getAlternates(`/cases/${slug}`, locale as Locale),
  };
}

async function BreadcrumbJsonLd({ locale, slug, title }: { locale: string; slug: string; title: string }) {
  const t = await getTranslations({ locale, namespace: "JsonLd" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("home"), item: await getLocalizedUrl("/", locale as Locale) },
      { "@type": "ListItem", position: 2, name: t("cases"), item: await getLocalizedUrl("/cases", locale as Locale) },
      { "@type": "ListItem", position: 3, name: title, item: await getLocalizedUrl(`/cases/${slug}`, locale as Locale) },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

async function CreativeWorkJsonLd({
  locale,
  slug,
  title,
  description,
  image,
  year,
}: {
  locale: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  year: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: await getLocalizedUrl(`/cases/${slug}`, locale as Locale),
    image: `https://goqode.agency${image}`,
    dateCreated: year,
    creator: {
      "@type": "Organization",
      name: "GoQode",
      url: "https://goqode.agency",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const caseData = getCaseBySlug(slug);
  if (!caseData) notFound();

  const t = await getTranslations({ locale, namespace: "Cases" });
  const title = t(`items.${slug}.title`);
  const description = t(`items.${slug}.description`);

  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug={slug} title={title} />
      <CreativeWorkJsonLd
        locale={locale}
        slug={slug}
        title={title}
        description={description}
        image={caseData.cardImage}
        year={caseData.year}
      />
      <CaseDetailContent slug={slug} />
    </>
  );
}
