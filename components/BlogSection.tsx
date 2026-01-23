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
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        {/* Section Header */}
        <motion.div variants={cardVariant} className="mb-10 md:mb-16">
          {/* Label */}
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
              {t("subtitle")}
            </span>
          </div>

          {/* Title + Description grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-end">
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
            <div className="md:border-l-2 md:border-[#C9FD48] md:pl-8">
              <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={cardVariant}
              className="group h-full"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-zinc-100 dark:bg-zinc-900">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-zinc-400 dark:text-zinc-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#C9FD48]/0 group-hover:bg-[#C9FD48]/10 transition-colors duration-300" />
                </div>

                {/* Category & Read time */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-black bg-[#C9FD48] px-3 py-1 rounded-full">
                    {t(`categories.${post.category}`)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime} {t("readTime")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="clamp-[text,1.125rem,1.5rem] font-bold text-foreground leading-tight group-hover:underline decoration-[#C9FD48] decoration-2 underline-offset-4 transition-all duration-300 mb-2 line-clamp-2">
                  {t(`posts.${index}.title`)}
                </h3>

                {/* Excerpt */}
                <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed line-clamp-2">
                  {t(`posts.${index}.excerpt`)}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div variants={cardVariant} className="mt-10 md:mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-foreground text-foreground font-semibold transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            {t("viewAll")}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
