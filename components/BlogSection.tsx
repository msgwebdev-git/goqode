"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import NextLink from "next/link";
import SplitText from "./SplitText";
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

const blogPosts = [
  {
    id: "1",
    slug: "sozdanie-lendinga-Moldova-polnoe-rukovodstvo",
    image: "/blog/landingmoldova.jpeg",
    category: "development",
    readTime: 12,
  },
  {
    id: "2",
    slug: "skolko-stoit-sait-v-Moldova-2026",
    image: "/blog/money.jpg",
    category: "development",
    readTime: 15,
  },
  {
    id: "3",
    slug: "5-priznakov-chto-sajtu-nuzhen-redizajn",
    image: "/blog/rebranding.jpg",
    category: "design",
    readTime: 4,
  },
];

export function BlogSection() {
  const t = useTranslations("Blog");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,16,32]">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[2vw] items-end">
            <SplitText
              text={t("title")}
              tag="h2"
              className="text-[14vw] lg:text-[7vw] font-black leading-[1.1] tracking-tight text-foreground uppercase"
              textAlign="left"
            />
            <div className="lg:border-l-2 lg:border-[#C9FD48] lg:pl-[1.5vw]">
              <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts — mobile: horizontal scroll, desktop: grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-[1.5vw]">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={cardVariant}
              className="group h-full"
            >
              <NextLink href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-[0.8vw] bg-zinc-100 dark:bg-zinc-900">
                  <Image src={post.image} alt={t(`posts.${index}.title`)} fill className="object-cover" sizes="33vw" />
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
                <h3 className="text-[1.25vw] font-bold text-foreground leading-[1.1] group-hover:underline decoration-[#C9FD48] decoration-2 underline-offset-4 transition-all duration-300 mb-[0.4vw] line-clamp-2">
                  {t(`posts.${index}.title`)}
                </h3>
                <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed line-clamp-2">
                  {t(`posts.${index}.excerpt`)}
                </p>
              </NextLink>
            </motion.article>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide -mx-6" style={{ WebkitOverflowScrolling: "touch", scrollPaddingLeft: "24px" }}>
          <div className="shrink-0 w-6" />
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={cardVariant}
              className="group shrink-0 w-[75vw] snap-start"
            >
              <NextLink href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-900">
                  <Image src={post.image} alt={t(`posts.${index}.title`)} fill className="object-cover" sizes="75vw" />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[0.625rem] font-semibold uppercase tracking-wider text-black bg-[#C9FD48] px-2 py-0.5 rounded-full">
                    {t(`categories.${post.category}`)}
                  </span>
                  <span className="text-[0.625rem] text-muted-foreground">
                    {post.readTime} {t("readTime")}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground leading-[1.1] mb-1 line-clamp-2">
                  {t(`posts.${index}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {t(`posts.${index}.excerpt`)}
                </p>
              </NextLink>
            </motion.article>
          ))}
          <div className="shrink-0 w-6" />
        </div>

        {/* View All Button */}
        <motion.div variants={cardVariant} className="mt-8 md:mt-[2.5vw] text-center">
          <NextLink
            href="/blog"
            className="inline-flex items-center gap-2 md:gap-[0.4vw] px-6 py-3 md:px-[1.5vw] md:py-[0.8vw] rounded-full border-2 border-foreground text-foreground font-semibold text-sm md:clamp-[text,0.875rem,1rem] transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            {t("viewAll")}
            <svg className="w-4 h-4 md:w-[1vw] md:h-[1vw]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NextLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
