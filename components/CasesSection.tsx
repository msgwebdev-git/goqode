"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import SplitText from "./SplitText";
import { casesData, type CaseStudy } from "@/lib/cases-data";
import { MacbookPro } from "@/components/ui/macbook-pro";
import { Iphone } from "@/components/ui/iphone";
import Image from "next/image";

const SCREEN = {
  left: "11.46%",
  top: "5.33%",
  width: "77.11%",
  height: "80.96%",
};

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

/* ─── Bento Card (same style as /cases page) ── */

function BentoCard({
  caseItem,
  title,
  className = "",
}: {
  caseItem: CaseStudy;
  title: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={cardVariant}
      className={`group cursor-pointer ${className}`}
    >
      <Link href={`/cases?case=${caseItem.slug}`} className="block h-full">
        <div className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl p-6 pb-4 h-full flex flex-col">
          {/* Mockups */}
          <div className="flex items-center justify-center gap-2 flex-1">
            <div className="relative flex-1 min-w-0">
              <MacbookPro width={650} height={400} className="w-full h-auto relative z-10" />
              <div className="absolute overflow-hidden rounded-[0.5%] z-20" style={{ left: SCREEN.left, top: SCREEN.top, width: SCREEN.width, height: SCREEN.height }}>
                <Image src={caseItem.images[0]} alt={title} width={1440} height={900} className="w-full h-full object-cover object-top" sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
            </div>

            {caseItem.images[1] && (
              <div className="flex-shrink-0 w-[18%]">
                <Iphone src={caseItem.images[1]} className="w-full h-auto" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex items-start justify-between gap-2 mt-4">
            <div>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {caseItem.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold tracking-wide uppercase text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="clamp-[text,1rem,1.25rem] font-bold text-foreground leading-[1.1]">
                {title}
              </h3>
            </div>
            <span className="text-muted-foreground font-mono text-xs shrink-0 pt-4">
              {caseItem.year}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Cases Section ──────────────────────────── */

export function CasesSection() {
  const t = useTranslations("Cases");

  const bentoCases = casesData.slice(0, 5);
  const getTitle = (slug: string) => t(`items.${slug}.title`);

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
        <motion.div variants={cardVariant} className="mb-8 md:mb-16">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
              {t("subtitle")}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-end">
            <SplitText
              text={t("title")}
              tag="h2"
              className="text-[14vw] md:text-[7vw] font-black leading-[1.1] tracking-tight text-foreground uppercase"
              textAlign="left"
            />
            <div className="md:border-l-2 md:border-[#C9FD48] md:pl-8">
              <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Desktop Bento Grid */}
        <div className="hidden md:grid grid-cols-3 gap-4 md:gap-5 auto-rows-[1fr]">
          {/* Row 1: 3 square cards */}
          {bentoCases[0] && (
            <BentoCard
              caseItem={bentoCases[0]}
              title={getTitle(bentoCases[0].slug)}
            />
          )}
          {bentoCases[1] && (
            <BentoCard
              caseItem={bentoCases[1]}
              title={getTitle(bentoCases[1].slug)}
            />
          )}
          {bentoCases[2] && (
            <BentoCard
              caseItem={bentoCases[2]}
              title={getTitle(bentoCases[2].slug)}
            />
          )}

          {/* Row 2: 2 cards + CTA */}
          {bentoCases[3] && (
            <BentoCard
              caseItem={bentoCases[3]}
              title={getTitle(bentoCases[3].slug)}
            />
          )}
          {bentoCases[4] && (
            <BentoCard
              caseItem={bentoCases[4]}
              title={getTitle(bentoCases[4].slug)}
            />
          )}

          {/* CTA card */}
          <motion.div variants={cardVariant}>
            <Link
              href="/cases"
              className="group flex flex-col items-center justify-center h-full rounded-2xl bg-[#C9FD48] transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,253,72,0.4)] hover:scale-[1.02]"
            >
              <span className="clamp-[text,1.125rem,1.5rem] font-bold text-black mb-3">
                {t("viewAll")}
              </span>
              <ArrowRight className="w-6 h-6 text-black transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden flex flex-col gap-4">
          {bentoCases.slice(0, 4).map((caseItem) => (
            <BentoCard
              key={caseItem.slug}
              caseItem={caseItem}
              title={getTitle(caseItem.slug)}
            />
          ))}

          <Link
            href="/cases"
            className="flex items-center justify-center gap-2 h-14 rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.4)]"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
