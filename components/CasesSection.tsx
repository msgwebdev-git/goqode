"use client";

import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import Shuffle from "./Shuffle";
import { casesData, type CaseStudy } from "@/lib/cases-data";

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

interface CaseCardProps {
  caseItem: CaseStudy;
  title: string;
  featured?: boolean;
}

function CaseCard({ caseItem, title, featured = false }: CaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (featured) {
    return (
      <motion.div
        variants={cardVariant}
        className="group relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/cases/${caseItem.slug}`}>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-zinc-900 dark:bg-zinc-100 transition-all duration-500 hover:shadow-2xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Case image */}
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
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </motion.div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-[#C9FD48]/10 z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Featured badge */}
          <div className="absolute top-6 left-6 z-20">
            <Badge className="bg-[#C9FD48] text-black hover:bg-[#C9FD48]/90 font-semibold">
              Featured
            </Badge>
          </div>

          {/* Year badge */}
          <div className="absolute top-6 right-6 z-20">
            <span className="text-white/60 font-mono text-sm">{caseItem.year}</span>
          </div>

          {/* Content */}
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
          </div>
        </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariant}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/cases/${caseItem.slug}`}>
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

        {/* Case image */}
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

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-[#C9FD48]/10 z-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Year */}
        <div className="absolute top-4 right-4 z-20">
          <span className="text-white/50 font-mono text-xs">{caseItem.year}</span>
        </div>

        {/* Content */}
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
          <h3 className="clamp-[text,1rem,1.25rem] font-bold text-white mb-1 line-clamp-1">
            {title}
          </h3>
        </div>
      </div>
      </Link>
    </motion.div>
  );
}

// View All Card - styled like a case card
function ViewAllCard({ text }: { text: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#C9FD48] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex items-center justify-center">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]"
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-black/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-black/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-black/10" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4 p-6">
          <motion.div
            className="w-16 h-16 rounded-full bg-black flex items-center justify-center"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </motion.div>
          <span className="text-black font-bold clamp-[text,1rem,1.25rem] text-center">
            {text}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function CasesSection() {
  const t = useTranslations("Cases");

  const featuredCase = casesData.find((c) => c.featured);
  const otherCases = casesData.filter((c) => !c.featured);
  const mobileCases = casesData.slice(0, 5);

  // Refs for floating button visibility
  const firstCaseRef = useRef<HTMLDivElement>(null);
  const lastCaseRef = useRef<HTMLDivElement>(null);
  const firstInView = useInView(firstCaseRef);
  const lastInView = useInView(lastCaseRef, { amount: "all" });
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);

  useEffect(() => {
    if (lastInView) {
      setShowFloatingBtn(false);
    } else if (firstInView) {
      setShowFloatingBtn(true);
    } else {
      setShowFloatingBtn(false);
    }
  }, [firstInView, lastInView]);

  const getCaseTranslation = (slug: string, key: string) => {
    return t(`items.${slug}.${key}`);
  };

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
              triggerOnHover={false}
              respectReducedMotion={true}
            />
            <div className="md:border-l-2 md:border-[#C9FD48] md:pl-8">
              <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Desktop: Featured + Grid */}
        <div className="hidden md:block">
          {featuredCase && (
            <div className="mb-6 md:mb-8">
              <CaseCard
                caseItem={featuredCase}
                title={getCaseTranslation(featuredCase.slug, "title")}
                featured
              />
            </div>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {otherCases.map((caseItem) => (
              <CaseCard
                key={caseItem.slug}
                caseItem={caseItem}
                title={getCaseTranslation(caseItem.slug, "title")}
              />
            ))}
            <ViewAllCard text={t("viewAll")} />
          </div>
        </div>

        {/* Mobile: Compact list */}
        <motion.div
          className="md:hidden flex flex-col"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          {mobileCases.map((caseItem, i) => (
            <motion.div
              key={caseItem.slug}
              ref={i === 0 ? firstCaseRef : i === 4 ? lastCaseRef : undefined}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
              }}
              className="mb-4"
            >
              <Link href={`/cases/${caseItem.slug}`}>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                  <Image
                    src={caseItem.cardImage}
                    alt={getCaseTranslation(caseItem.slug, "title")}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-white/50 font-mono text-xs">{caseItem.year}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {caseItem.tags.slice(0, 2).map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-white/20 text-white/80 text-xs bg-white/5 backdrop-blur-sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-white leading-tight line-clamp-1">
                      {getCaseTranslation(caseItem.slug, "title")}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating bottom button - mobile only */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="md:hidden fixed bottom-6 left-6 right-6 z-50"
          >
            <Link
              href="/cases"
              className="flex items-center justify-center gap-2 h-14 w-full rounded-full bg-[#C9FD48] text-black font-semibold text-base shadow-[0_8px_30px_rgba(201,253,72,0.4)] active:scale-[0.98] transition-transform"
            >
              <span>{t("viewAll")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
