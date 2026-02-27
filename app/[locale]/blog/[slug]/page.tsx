import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { getAlternates, getLocalizedUrl, getOgLocale } from "@/lib/metadata-helpers";
import type { Locale } from "@/i18n/routing";
import { getPostBySlug } from "@/content/blog/posts";
import { notFound } from "next/navigation";
import BlogArticle from "./article";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const t = await getTranslations({ locale, namespace: `BlogPost_${slug}` });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "article",
      url: await getLocalizedUrl(`/blog/${slug}`, locale as Locale),
      siteName: "GoQode",
      locale: getOgLocale(locale as Locale),
    },
    alternates: await getAlternates(`/blog/${slug}`, locale as Locale),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return <BlogArticle slug={slug} post={post} />;
}
