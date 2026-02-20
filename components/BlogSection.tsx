"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Shuffle from "./Shuffle";
import Image from "next/image";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

// Placeholder blog posts
const blogPosts = [
  {
    id: "1",
    slug: "web-design-trends-2025",
    image: "/blog/post-1.jpg",
    category: "design",
    readTime: 5,
  },
  {
    id: "2",
    slug: "nextjs-performance-optimization",
    image: "/blog/post-2.jpg",
    category: "development",
    readTime: 8,
  },
  {
    id: "3",
    slug: "ai-in-web-development",
    image: "/blog/post-3.jpg",
    category: "technology",
    readTime: 6,
  },
];

export function BlogSection() {
  const t = useTranslations("Blog");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        {/* Section Header */}
        <motion.div variants={cardVariant} className="mb-6 md:mb-[2.5vw]">
          {/* Label */}
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-3 md:mb-[1vw]">
            <div className="w-2 h-2 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="text-xs md:clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("subtitle")}
            </span>
          </div>

          {/* Title + Description grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[2vw] items-end">
            <Shuffle
              text={t("title")}
              tag="h2"
              className="text-[14vw] md:text-[7vw] font-black leading-[0.9] tracking-tight text-foreground"
              textAlign="left"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
            />
            <div className="md:border-l-2 md:border-[#C9FD48] md:pl-[1.5vw]">
              <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts — mobile: horizontal scroll, desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-[1.5vw]">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={cardVariant}
              className="group h-full"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-[0.8vw] bg-zinc-100 dark:bg-zinc-900">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                    <svg className="w-[2vw] h-[2vw] text-zinc-400 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-[#C9FD48]/0 group-hover:bg-[#C9FD48]/10 transition-colors duration-300" />
                </div>
                <div className="flex items-center gap-[0.5vw] mb-[0.5vw]">
                  <span className="clamp-[text,0.625rem,0.75rem] font-semibold uppercase tracking-wider text-black bg-[#C9FD48] px-[0.6vw] py-[0.2vw] rounded-full">
                    {t(`categories.${post.category}`)}
                  </span>
                  <span className="clamp-[text,0.625rem,0.75rem] text-muted-foreground">
                    {post.readTime} {t("readTime")}
                  </span>
                </div>
                <h3 className="text-[1.25vw] font-bold text-foreground leading-tight group-hover:underline decoration-[#C9FD48] decoration-2 underline-offset-4 transition-all duration-300 mb-[0.4vw] line-clamp-2">
                  {t(`posts.${index}.title`)}
                </h3>
                <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed line-clamp-2">
                  {t(`posts.${index}.excerpt`)}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide -mx-6" style={{ WebkitOverflowScrolling: "touch", scrollPaddingLeft: "24px" }}>
          <div className="shrink-0 w-6" />
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={cardVariant}
              className="group shrink-0 w-[75vw] snap-start"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-900">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                    <svg className="w-6 h-6 text-zinc-400 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[0.625rem] font-semibold uppercase tracking-wider text-black bg-[#C9FD48] px-2 py-0.5 rounded-full">
                    {t(`categories.${post.category}`)}
                  </span>
                  <span className="text-[0.625rem] text-muted-foreground">
                    {post.readTime} {t("readTime")}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground leading-tight mb-1 line-clamp-2">
                  {t(`posts.${index}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {t(`posts.${index}.excerpt`)}
                </p>
              </Link>
            </motion.article>
          ))}
          <div className="shrink-0 w-6" />
        </div>

        {/* View All Button */}
        <motion.div variants={cardVariant} className="mt-8 md:mt-[2.5vw] text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 md:gap-[0.4vw] px-6 py-3 md:px-[1.5vw] md:py-[0.8vw] rounded-full border-2 border-foreground text-foreground font-semibold text-sm md:clamp-[text,0.875rem,1rem] transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            {t("viewAll")}
            <svg className="w-4 h-4 md:w-[1vw] md:h-[1vw]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
