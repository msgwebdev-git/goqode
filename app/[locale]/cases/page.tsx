"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import Shuffle from "@/components/Shuffle";
import { casesData, filterMap } from "@/lib/cases-data";

/* ─── Animation variants ─────────────────────────────── */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ─── Hero ────────────────────────────────────────────── */

function CasesHero() {
  const t = useTranslations("Cases");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] pt-28 md:pt-36 pb-6">
      <motion.div
        className="flex flex-col gap-5 md:gap-6 w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariant} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
          <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
            {t("subtitle")}
          </span>
        </motion.div>

        <motion.div variants={itemVariant}>
          <Shuffle
            text={t("pageTitle")}
            tag="h1"
            className="text-[12vw] md:text-[7vw] font-black leading-[0.9] tracking-tight text-foreground"
            textAlign="left"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={false}
            respectReducedMotion={true}
          />
        </motion.div>

        <motion.p
          variants={itemVariant}
          className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed md:w-1/2"
        >
          {t("pageDescription")}
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ─── Filter Bar ──────────────────────────────────────── */

function CasesFilterBar({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  const t = useTranslations("Cases");

  const filters = [
    { key: "all", label: t("filterAll") },
    { key: "Web", label: t("filterWeb") },
    { key: "Mobile", label: t("filterMobile") },
    { key: "Branding", label: t("filterBranding") },
    { key: "Platforms", label: t("filterPlatforms") },
  ];

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] pb-6 md:pb-10">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase border transition-all duration-200 ${
              activeFilter === filter.key
                ? "bg-[#C9FD48] text-black border-[#C9FD48]"
                : "bg-zinc-50 dark:bg-zinc-900 text-foreground border-zinc-200 dark:border-zinc-700 hover:border-[#C9FD48]/50"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </section>
  );
}

/* ─── Featured Card ───────────────────────────────────── */

function CaseCardFeatured({
  caseItem,
  title,
  description,
}: {
  caseItem: (typeof casesData)[0];
  title: string;
  description: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariant}
      layout
      className="group relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/cases/${caseItem.slug}`}>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-zinc-900 transition-all duration-500 hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={caseItem.cardImage}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-[#C9FD48]/10 z-[5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="absolute top-6 left-6 z-20">
            <Badge className="bg-[#C9FD48] text-black hover:bg-[#C9FD48]/90 font-semibold">
              Featured
            </Badge>
          </div>

          <div className="absolute top-6 right-6 z-20">
            <span className="text-white/60 font-mono text-sm">{caseItem.year}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
            <div className="flex flex-wrap gap-2 mb-4">
              {caseItem.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="clamp-[text,1.5rem,3rem] font-bold text-white mb-2 leading-tight">
              {title}
            </h3>
            <p className="clamp-[text,0.875rem,1.125rem] text-white/70 leading-relaxed line-clamp-2 md:w-2/3">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Regular Card ────────────────────────────────────── */

function CaseCardRegular({
  caseItem,
  title,
}: {
  caseItem: (typeof casesData)[0];
  title: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariant}
      layout
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/cases/${caseItem.slug}`}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={caseItem.cardImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-[#C9FD48]/10 z-[5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="absolute top-4 right-4 z-20">
            <span className="text-white/50 font-mono text-xs">{caseItem.year}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {caseItem.tags.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-white/20 text-white/80 text-xs bg-white/5 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="clamp-[text,1rem,1.25rem] font-bold text-white leading-tight line-clamp-1">
              {title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Cases Grid ──────────────────────────────────────── */

function CasesGrid({ filteredCases }: { filteredCases: typeof casesData }) {
  const t = useTranslations("Cases");

  const featuredCase = filteredCases.find((c) => c.featured);
  const otherCases = filteredCases.filter((c) => !c.featured);

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        {featuredCase && (
          <div className="mb-6 md:mb-8">
            <CaseCardFeatured
              caseItem={featuredCase}
              title={t(`items.${featuredCase.slug}.title`)}
              description={t(`items.${featuredCase.slug}.description`)}
            />
          </div>
        )}

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {otherCases.map((caseItem) => (
              <CaseCardRegular
                key={caseItem.slug}
                caseItem={caseItem}
                title={t(`items.${caseItem.slug}.title`)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ─── CTA ─────────────────────────────────────────────── */

function CasesCTA() {
  const t = useTranslations("Cases");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
      >
        <motion.div variants={itemVariant}>
          <Link href="/contact" className="block group">
            <div className="relative rounded-2xl md:rounded-3xl bg-[#C9FD48] overflow-hidden py-6 md:py-12 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9FD48]/40 hover:brightness-105">
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                <span className="block text-[5.5vw] md:text-[4vw] lg:text-[3vw] font-black text-black uppercase transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                  {t("cta.title")}
                </span>
                <span className="absolute inset-0 flex items-center justify-center text-[5.5vw] md:text-[4vw] lg:text-[3vw] font-black text-black uppercase translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="flex items-center gap-3">
                    {t("cta.button")}
                    <ArrowRight className="w-[4vw] md:w-[3vw] lg:w-[2vw] h-[4vw] md:h-[3vw] lg:h-[2vw] min-w-6 min-h-6" />
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariant} className="mt-4 md:mt-8 text-center">
          <p className="clamp-[text,0.875rem,1rem] text-muted-foreground">
            {t("cta.contactText")}{" "}
            <a
              href="mailto:hello@goqode.dev"
              className="text-zinc-900 dark:text-[#C9FD48] font-medium hover:underline transition-colors"
            >
              hello@goqode.dev
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CASES PAGE
   ═══════════════════════════════════════════════════════ */

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCases =
    activeFilter === "all"
      ? casesData
      : casesData.filter((c) =>
          c.tags.some((tag) => filterMap[activeFilter]?.includes(tag))
        );

  return (
    <main className="min-h-screen w-full">
      <CasesHero />
      <CasesFilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <CasesGrid filteredCases={filteredCases} />
      <CasesCTA />
    </main>
  );
}
