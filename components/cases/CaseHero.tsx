"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import type { CaseStudy } from "@/lib/cases-data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const cell = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const aboutBlocks = [
  { labelKey: "challengeLabel" as const, textSuffix: "challenge", num: "01" },
  { labelKey: "solutionLabel" as const, textSuffix: "solution", num: "02" },
  { labelKey: "resultLabel" as const, textSuffix: "result", num: "03" },
];

interface CaseHeroProps {
  slug: string;
  caseData: CaseStudy;
}

export function CaseHero({ slug, caseData }: CaseHeroProps) {
  const t = useTranslations("Cases");

  const img = (name: string) => `/cases/${slug}/${name}`;
  const title = t(`items.${slug}.title`);

  return (
    <section className="w-full clamp-[px,12,24] pt-18 md:pt-20 clamp-[pb,24,48]">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-3"
      >
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors clamp-[text,0.875rem,1rem]"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToCases")}
        </Link>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[150px] gap-2 md:gap-3"
      >
        {/* Info cell — col 1, row 1-2 */}
        <motion.div
          variants={cell}
          className="col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-center gap-3 p-5 md:p-6 bg-zinc-950 dark:bg-zinc-900 rounded-2xl text-white"
        >
          <SplitText
            text={t(`items.${slug}.title`)}
            tag="h1"
            className="clamp-[text,1.5rem,2.5rem] font-black leading-[1.1] tracking-tight uppercase"
            textAlign="left"
          />
          <div className="flex flex-wrap items-center gap-1.5">
            {caseData.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border border-zinc-700 text-zinc-400"
              >
                {tag}
              </span>
            ))}
            <span className="text-zinc-500 font-mono text-[10px]">{caseData.year}</span>
          </div>
          <p className="clamp-[text,0.75rem,0.875rem] text-zinc-400 leading-relaxed line-clamp-3">
            {t(`items.${slug}.description`)}
          </p>
          {caseData.url && (
            <a
              href={caseData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 mt-1 text-[#C9FD48] font-semibold clamp-[text,0.75rem,0.875rem] hover:underline"
            >
              {t("visitSite")}
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </motion.div>

        {/* Hero screenshot — col 2-3, row 1-2 */}
        <motion.div
          variants={cell}
          className="col-span-2 row-span-2 rounded-2xl overflow-hidden"
        >
          <Image
            src={img("line.jpg")}
            alt={`${title} — desktop preview`}
            width={1440}
            height={900}
            className="w-full h-full object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>

        {/* Mobile screenshot — col 4, row 1-3 */}
        <motion.div
          variants={cell}
          className="hidden lg:block lg:row-span-4 rounded-2xl overflow-hidden"
        >
          <Image
            src={img("linemob.jpg")}
            alt={`${title} — mobile version`}
            width={390}
            height={844}
            className="w-full h-full object-cover object-top"
            sizes="25vw"
            priority
          />
        </motion.div>

        {/* Section screenshots row */}
        {[1, 2, 3].map((n) => (
          <motion.div
            key={n}
            variants={cell}
            className="rounded-2xl overflow-hidden"
          >
            <Image
              src={img("line.jpg")}
              alt={`${title} — section ${n}`}
              width={1440}
              height={900}
              className="w-full h-full object-cover object-center"
              sizes="25vw"
            />
          </motion.div>
        ))}

        {/* Challenge / Solution / Result cards */}
        {aboutBlocks.map((block) => (
          <motion.div
            key={block.labelKey}
            variants={cell}
            className="relative flex flex-col justify-between p-4 md:p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
          >
            <div>
              <span className="clamp-[text,0.625rem,0.75rem] font-semibold text-[#C9FD48] uppercase tracking-wider">
                {t(block.labelKey)}
              </span>
              <p className="mt-1.5 clamp-[text,0.7rem,0.8rem] text-foreground/80 leading-relaxed line-clamp-5">
                {t(`items.${slug}.${block.textSuffix}`)}
              </p>
            </div>
            <span className="absolute top-3 right-4 text-zinc-300 dark:text-zinc-700 font-mono text-xs">
              {block.num}
            </span>
          </motion.div>
        ))}

        {/* Footer section screenshot — spans remaining */}
        <motion.div
          variants={cell}
          className="col-span-1 rounded-2xl overflow-hidden"
        >
          <Image
            src={img("line.jpg")}
            alt={`${title} — footer section`}
            width={1440}
            height={900}
            className="w-full h-full object-cover object-center"
            sizes="25vw"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
