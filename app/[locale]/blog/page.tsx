import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { getAlternates, getLocalizedUrl, getOgLocale } from "@/lib/metadata-helpers";
import type { Locale } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog-api";
import BlogContent from "./content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });

  return {
    title: t("blog.title"),
    description: t("blog.description"),
    keywords: t("blog.keywords"),
    openGraph: {
      title: t("blog.ogTitle"),
      description: t("blog.ogDescription"),
      type: "website",
      url: await getLocalizedUrl("/blog", locale as Locale),
      siteName: "GoQode",
      locale: getOgLocale(locale as Locale),
    },
    alternates: await getAlternates("/blog", locale as Locale),
  };
}

async function BreadcrumbJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "JsonLd" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("home"), item: await getLocalizedUrl("/", locale as Locale) },
      { "@type": "ListItem", position: 2, name: t("blog"), item: await getLocalizedUrl("/blog", locale as Locale) },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data: posts } = await getBlogPosts(locale);

  return (
    <>
      <BreadcrumbJsonLd locale={locale} />
      <BlogContent posts={posts} />
    </>
  );
}
