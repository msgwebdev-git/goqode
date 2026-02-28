import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { getAlternates, getLocalizedUrl, getOgLocale } from "@/lib/metadata-helpers";
import type { Locale } from "@/i18n/routing";
import { getBlogPost } from "@/lib/blog-api";
import { notFound } from "next/navigation";
import BlogArticle from "./article";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      url: await getLocalizedUrl(`/blog/${slug}`, locale as Locale),
      siteName: "GoQode",
      locale: getOgLocale(locale as Locale),
    },
    alternates: await getAlternates(`/blog/${slug}`, locale as Locale),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);
  if (!post) notFound();

  return <BlogArticle post={post} />;
}
