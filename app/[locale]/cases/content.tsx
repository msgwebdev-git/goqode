"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import SplitText from "@/components/SplitText";
import { casesData, filterMap, type CaseStudy } from "@/lib/cases-data";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { MacbookPro } from "@/components/ui/macbook-pro";
import { Iphone } from "@/components/ui/iphone";

const SCREEN = {
  left: "11.46%",
  top: "5.33%",
  width: "77.11%",
  height: "80.96%",
};

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
          <SplitText
            text={t("pageTitle")}
            tag="h1"
            className="text-[12vw] md:text-[7vw] font-black leading-[1.1] tracking-tight text-foreground uppercase"
            textAlign="left"
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
  onOpen,
}: {
  caseItem: CaseStudy;
  title: string;
  description: string;
  onOpen: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariant}
      layout
      className="group relative w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
    >
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
          <h3 className="clamp-[text,1.5rem,3rem] font-bold text-white mb-2 leading-[1.1]">
            {title}
          </h3>
          <p className="clamp-[text,0.875rem,1.125rem] text-white/70 leading-relaxed line-clamp-2 md:w-2/3">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Regular Card ────────────────────────────────────── */

function CaseCardRegular({
  caseItem,
  title,
  onOpen,
}: {
  caseItem: CaseStudy;
  title: string;
  onOpen: () => void;
}) {
  return (
    <motion.div
      variants={itemVariant}
      layout
      className="group cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl p-6 pb-4">
        {/* Mockups */}
        <div className="flex items-center justify-center gap-2 mb-4 aspect-[16/10]">
          <div className="relative flex-1 min-w-0">
            <MacbookPro width={650} height={400} className="w-full h-auto relative z-10" />
            <div className="absolute overflow-hidden rounded-[0.5%] z-20" style={{ left: SCREEN.left, top: SCREEN.top, width: SCREEN.width, height: SCREEN.height }}>
              <Image src={caseItem.images[0]} alt={title} width={1440} height={900} className="w-full h-full object-cover object-top" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
          </div>

          {caseItem.images[1] && (
            <div className="flex-shrink-0 w-[13%]">
              <Iphone src={caseItem.images[1]} className="w-full h-auto" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-1">
              {caseItem.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-[10px] font-semibold tracking-wide uppercase text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="clamp-[text,1rem,1.25rem] font-bold text-foreground leading-[1.1] min-h-[2.5em]">
              {title}
            </h3>
          </div>
          <span className="text-muted-foreground font-mono text-xs shrink-0 pt-5">{caseItem.year}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Case Detail Sheet Content ──────────────────────── */

function CaseDetailSheet({ caseItem }: { caseItem: CaseStudy }) {
  const t = useTranslations("Cases");
  const slug = caseItem.slug;

  const aboutBlocks = [
    { labelKey: "challengeLabel" as const, textSuffix: "challenge", num: "01" },
    { labelKey: "solutionLabel" as const, textSuffix: "solution", num: "02" },
    { labelKey: "resultLabel" as const, textSuffix: "result", num: "03" },
  ];

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-12 px-3 md:px-0 w-full md:w-[1200px] md:mx-auto">
      {/* Title + meta */}
      <div>
        <h2 className="clamp-[text,2rem,4rem] font-black leading-[1.05] tracking-tight text-foreground uppercase">
          {t(`items.${slug}.title`)}
        </h2>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          {caseItem.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border border-zinc-300 dark:border-zinc-700 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          <span className="text-muted-foreground font-mono clamp-[text,0.75rem,0.875rem]">
            {caseItem.year}
          </span>
        </div>
        <p className="mt-4 clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed md:w-2/3">
          {t(`items.${slug}.description`)}
        </p>
        {caseItem.url && (
          <a
            href={caseItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 mt-4 h-12 px-8 rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02]"
          >
            {t("visitSite")}
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </div>

      {/* MacBook + iPhone mockups */}
      <div className="flex items-end justify-center gap-3 md:gap-6 w-[82%] mx-auto">
        <div className="relative flex-1 min-w-0">
          <MacbookPro width={650} height={400} className="w-full h-auto relative z-10" />
          <div className="absolute overflow-hidden rounded-[0.5%] z-20" style={{ left: SCREEN.left, top: SCREEN.top, width: SCREEN.width, height: SCREEN.height }}>
            <Image src={caseItem.images[0]} alt={t(`items.${slug}.title`)} width={1440} height={900} className="w-full h-full object-cover object-top" sizes="70vw" />
          </div>
        </div>

        {caseItem.images[1] && (
          <div className="flex-shrink-0 w-[18%]">
            <Iphone src={caseItem.images[1]} className="w-full h-auto" />
          </div>
        )}
      </div>

      {/* About: Challenge / Solution / Result */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
          <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
            {t("aboutLabel")}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {aboutBlocks.map((block) => (
            <div key={block.labelKey} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-zinc-900 dark:text-[#C9FD48] font-mono text-sm">{block.num}</span>
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <h4 className="clamp-[text,1rem,1.125rem] font-bold text-foreground">
                {t(block.labelKey)}
              </h4>
              <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed">
                {t(`items.${slug}.${block.textSuffix}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ─── Cases Grid ──────────────────────────────────────── */

function CasesGrid({
  filteredCases,
  onOpenCase,
  activeFilter,
}: {
  filteredCases: typeof casesData;
  onOpenCase: (slug: string) => void;
  activeFilter: string;
}) {
  const t = useTranslations("Cases");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] pb-12 md:pb-16">
      <motion.div
        key={activeFilter}
        initial="hidden"
        animate="show"
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredCases.map((caseItem) => (
            <CaseCardRegular
              key={caseItem.slug}
              caseItem={caseItem}
              title={t(`items.${caseItem.slug}.title`)}
              onOpen={() => onOpenCase(caseItem.slug)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════
   CASES PAGE
   ═══════════════════════════════════════════════════════ */

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const openSlug = searchParams.get("case");

  const setOpenSlug = useCallback(
    (slug: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set("case", slug);
      } else {
        params.delete("case");
      }
      const qs = params.toString();
      window.history.pushState(null, "", qs ? `${pathname}?${qs}` : pathname);
    },
    [searchParams, pathname]
  );

  const filteredCases =
    activeFilter === "all"
      ? casesData
      : casesData.filter((c) =>
          c.tags.some((tag) => filterMap[activeFilter]?.includes(tag))
        );

  const openCase = openSlug
    ? casesData.find((c) => c.slug === openSlug) ?? null
    : null;

  return (
    <main className="min-h-screen w-full">
      <CasesHero />
      {/* <CasesFilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} /> */}
      <CasesGrid filteredCases={filteredCases} onOpenCase={setOpenSlug} activeFilter={activeFilter} />

      {/* Case Detail Drawer (Vaul — optimised for mobile) */}
      <Drawer open={!!openCase} onOpenChange={(open) => !open && setOpenSlug(null)} handleOnly>
        <DrawerContent className="h-[92vh] p-0 max-w-none rounded-t-[2rem]">
          <DrawerTitle className="sr-only">
            {openCase ? openCase.slug : "Case"}
          </DrawerTitle>

          {/* Close button */}
          <div className="sticky top-0 z-50 flex justify-center pt-1 pb-2">
            <button
              onClick={() => setOpenSlug(null)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Закрыть
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {openCase && <CaseDetailSheet caseItem={openCase} />}
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
