"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import Image from "next/image";
import { getAllPosts } from "@/content/blog/posts";
import SplitText from "@/components/SplitText";

export default function BlogContent() {
  const t = useTranslations("Blog");
  const posts = getAllPosts();

  return (
    <main className="w-full pt-18 md:pt-20">
      {/* Header */}
      <header className="w-full px-6 md:clamp-[px,12,24] pb-8 md:pb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("articleLabels.backToBlog") === "Назад к блогу"
            ? "На главную"
            : t("articleLabels.backToBlog") === "Înapoi la blog"
              ? "Acasă"
              : "Home"}
        </Link>

        {/* Label */}
        <div className="flex items-center gap-2 md:gap-[0.4vw] mb-3 md:mb-[1vw]">
          <div className="w-2 h-2 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
          <span className="text-xs md:clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
            {t("subtitle")}
          </span>
        </div>

        <SplitText
          text={t("title")}
          tag="h1"
          className="text-[14vw] lg:text-[7vw] font-black leading-[1.1] tracking-tight text-foreground uppercase"
          textAlign="left"
        />

        <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed mt-4 lg:mt-[1vw]">
          {t("description")}
        </p>
      </header>

      {/* Posts grid */}
      <section className="w-full px-6 md:clamp-[px,12,24] pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[1.5vw]">
          {posts.map((post, index) => (
            <NextLink
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 lg:mb-[0.8vw] bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={post.image}
                  alt={t(`posts.${index}.title`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#C9FD48]/0 group-hover:bg-[#C9FD48]/10 transition-colors duration-300" />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 lg:gap-[0.5vw] mb-2 lg:mb-[0.4vw]">
                <span className="text-[0.625rem] lg:clamp-[text,0.625rem,0.75rem] font-semibold uppercase tracking-wider text-black bg-[#C9FD48] px-2 lg:px-[0.6vw] py-0.5 lg:py-[0.2vw] rounded-full">
                  {t(`categories.${post.category}`)}
                </span>
                <span className="text-[0.625rem] lg:clamp-[text,0.625rem,0.75rem] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime} {t("readTime")}
                </span>
                <span className="text-[0.625rem] lg:clamp-[text,0.625rem,0.75rem] text-muted-foreground">
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h2 className="clamp-[text,1.125rem,1.5rem] font-bold text-foreground leading-[1.2] group-hover:underline decoration-[#C9FD48] decoration-2 underline-offset-4 transition-all duration-300 mb-1.5 lg:mb-[0.3vw] line-clamp-2">
                {t(`posts.${index}.title`)}
              </h2>

              {/* Excerpt */}
              <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed line-clamp-2">
                {t(`posts.${index}.excerpt`)}
              </p>
            </NextLink>
          ))}
        </div>
      </section>
    </main>
  );
}
