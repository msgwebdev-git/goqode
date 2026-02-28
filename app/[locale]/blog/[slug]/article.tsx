"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import type { BlogPostDetail } from "@/lib/blog-api";

interface Props {
  post: BlogPostDetail;
}

export default function BlogArticle({ post }: Props) {
  const tb = useTranslations("Blog");

  return (
    <main className="w-full pt-18 md:pt-20">
      {/* Header */}
      <header className="w-full px-6 md:clamp-[px,12,24] pb-8 md:pb-12">
        <div className="lg:w-[calc(40vw+16vw+3vw)] lg:mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {tb("articleLabels.backToBlog")}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-black bg-[#C9FD48] px-3 py-1 rounded-full">
              {tb(`categories.${post.category}`)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} {tb("readTime")}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
          </div>

          <h1 className="text-[8vw] md:text-[4vw] font-black leading-[1.1] tracking-tight text-foreground uppercase">
            {post.title}
          </h1>

          {/* Decorative divider */}
          <div className="mt-6 md:mt-8 flex items-center gap-3">
            <div className="h-1 w-16 md:w-24 bg-[#C9FD48] rounded-full" />
            <div className="h-1 w-8 md:w-12 bg-[#C9FD48]/40 rounded-full" />
            <div className="h-1 w-4 md:w-6 bg-[#C9FD48]/20 rounded-full" />
          </div>
        </div>
      </header>

      {/* Content + Sidebar */}
      <div className="w-full px-6 md:clamp-[px,12,24] pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[40vw_16vw] gap-8 lg:gap-[3vw] lg:justify-center">
          {/* Main Article */}
          <article>
            {/* Intro */}
            <p className="clamp-[text,1.125rem,1.375rem] text-muted-foreground leading-relaxed mb-10 md:mb-14 border-l-4 border-[#C9FD48] pl-4 md:pl-6">
              {post.intro}
            </p>

            {/* Sections */}
            {post.sections.map((section, sectionIndex) => (
              <section
                key={section.key}
                id={`section-${section.key}`}
                className="mb-10 md:mb-14 scroll-mt-24"
              >
                {/* Section number + title */}
                <div className="flex items-start gap-3 md:gap-4 mb-5">
                  <span className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#C9FD48] text-black flex items-center justify-center text-sm md:text-base font-black mt-0.5">
                    {sectionIndex + 1}
                  </span>
                  <h2 className="clamp-[text,1.25rem,2rem] font-bold text-foreground leading-tight">
                    {section.title}
                  </h2>
                </div>

                {/* Content text */}
                <div className="clamp-[text,0.9375rem,1.125rem] text-muted-foreground leading-relaxed whitespace-pre-line mb-4 pl-11 md:pl-14">
                  {section.content}
                </div>

                {/* List items */}
                {section.type === "list" && section.list && (
                  <ul className="space-y-3 mt-5 pl-11 md:pl-14">
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 clamp-[text,0.9375rem,1.125rem] text-muted-foreground leading-relaxed group"
                      >
                        <span className="shrink-0 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-foreground flex items-center justify-center text-xs font-bold mt-0.5 group-hover:bg-[#C9FD48] group-hover:text-black transition-colors">
                          {i + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Items with subtitle + text */}
                {section.type === "items" && section.items && (
                  <div className="space-y-5 mt-5 pl-11 md:pl-14">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="border-l-2 border-[#C9FD48] pl-4 py-1"
                      >
                        <h3 className="clamp-[text,1rem,1.25rem] font-semibold text-foreground mb-1">
                          {i + 1}. {item.subtitle}
                        </h3>
                        <p className="clamp-[text,0.9375rem,1.125rem] text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Section divider */}
                {section.key !== "conclusion" && (
                  <div className="mt-10 md:mt-14 border-t border-zinc-200 dark:border-zinc-800" />
                )}
              </section>
            ))}

            {/* CTA */}
            <div className="mt-12 p-6 md:p-10 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9FD48] via-[#C9FD48]/60 to-transparent" />
              <p className="clamp-[text,1rem,1.25rem] font-semibold text-foreground mb-5">
                {post.sections.find((s) => s.key === "conclusion")?.content ?? ""}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[#C9FD48] text-black font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02]"
              >
                {tb("articleLabels.shareTitle") === "Поделиться статьёй"
                  ? "Обсудить проект"
                  : tb("articleLabels.shareTitle") === "Distribuie articolul"
                    ? "Discută proiectul"
                    : "Discuss your project"}
              </Link>
            </div>
          </article>

          {/* Sidebar — Table of Contents (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  {tb("articleLabels.tableOfContents")}
                </h4>
                <nav className="space-y-1">
                  {post.sections.map((section, index) => (
                    <a
                      key={section.key}
                      href={`#section-${section.key}`}
                      className="flex items-center gap-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <span className="shrink-0 w-5 h-5 rounded bg-zinc-200 dark:bg-zinc-800 text-[0.625rem] font-bold flex items-center justify-center group-hover:bg-[#C9FD48] group-hover:text-black transition-colors">
                        {index + 1}
                      </span>
                      <span className="line-clamp-1">
                        {section.title}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
