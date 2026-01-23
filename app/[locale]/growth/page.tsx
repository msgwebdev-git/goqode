"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Shuffle from "@/components/Shuffle";
import { TrendingUp, ArrowRight, BarChart3, Target, Zap } from "lucide-react";
import CountUp from "@/components/CountUp";

// Animated Plus to X Icon
function AnimatedPlusX({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      className="relative w-6 h-6 lg:w-8 lg:h-8"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* First line */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-full h-[2.5px] bg-current rounded-full origin-center"
        style={{ x: "-50%", y: "-50%" }}
        initial={false}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Second line */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-full h-[2.5px] bg-current rounded-full origin-center"
        style={{ x: "-50%", y: "-50%" }}
        initial={false}
        animate={{ rotate: isOpen ? -45 : 90 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.div>
  );
}

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

// Hero Section
function GrowthHero() {
  const t = useTranslations("Growth");

  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        className="flex flex-col items-center clamp-[gap,16,32] text-center w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title with Shuffle animation */}
        <motion.div variants={itemVariant} className="w-full">
          <Shuffle
            text={t("hero.title")}
            tag="h1"
            className="text-[14vw] md:text-[10vw] font-black leading-[0.9] tracking-tight text-foreground"
            textAlign="center"
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
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariant}
          className="clamp-[text,1rem,1.5rem] text-muted-foreground leading-relaxed max-w-3xl"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariant}>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 h-12 sm:h-14 clamp-[px,24,32] rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02] overflow-hidden"
          >
            <TrendingUp className="h-4 w-4" />
            <span>{t("hero.cta")}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Steps data
const steps = [0, 1, 2, 3, 4, 5, 6];

// Solution Overview Section - Minimalist List
function SolutionOverview() {
  const t = useTranslations("Growth");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <div className="flex flex-col lg:flex-row border-t border-zinc-200 dark:border-zinc-800 pt-8 lg:pt-12">
        {/* Left Column - Title */}
        <div className="lg:w-[40%] lg:sticky lg:top-24 lg:self-start mb-8 lg:mb-0 lg:pr-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("overview.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.75rem,3.5rem] font-bold leading-tight text-foreground">
            {t("overview.title")}
          </h2>
        </div>

        {/* Right Column - List */}
        <div className="lg:w-[60%] lg:pl-12 lg:border-l border-zinc-200 dark:border-zinc-800">
          {steps.map((_, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-b border-zinc-200 dark:border-zinc-800"
              >
                {/* Row */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 lg:py-8 flex items-center justify-between gap-4 text-left group"
                >
                  {/* Title */}
                  <h3 className="clamp-[text,3rem,5rem] font-semibold text-foreground leading-tight transition-[font-weight] duration-300 ease-out group-hover:font-extrabold">
                    {t(`overview.steps.${index}.title`)}
                  </h3>

                  {/* Plus/Minus */}
                  <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-muted-foreground">
                    <AnimatedPlusX isOpen={isOpen} />
                  </div>
                </button>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 lg:pb-10 pr-12 lg:pr-20">
                        {/* Description */}
                        <p className="clamp-[text,0.9375rem,1.0625rem] text-muted-foreground leading-relaxed mb-4">
                          {t(`overview.steps.${index}.description`)}
                        </p>
                        <p className="clamp-[text,0.9375rem,1.0625rem] text-foreground/70 leading-relaxed mb-6">
                          {t(`overview.steps.${index}.details`)}
                        </p>

                        {/* Deliverables */}
                        <div className="flex flex-wrap gap-2">
                          {t(`overview.steps.${index}.deliverables`).split(", ").map((item, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-foreground/80 clamp-[text,0.8125rem,0.875rem] font-medium rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Results Section
function ResultsSection() {
  const t = useTranslations("Growth");

  const results = [
    {
      icon: BarChart3,
      value: 150,
      suffix: "%",
      label: t("results.conversion_increase"),
    },
    {
      icon: Target,
      value: 40,
      suffix: "%",
      label: t("results.cost_reduction"),
    },
    {
      icon: Zap,
      value: 3,
      suffix: "x",
      label: t("results.roi_growth"),
    },
  ];

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48] bg-zinc-50 dark:bg-zinc-950">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="mb-12 lg:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("results.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.75rem,3.5rem] font-bold leading-tight text-foreground">
            {t("results.title")}
          </h2>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {results.map((result, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              className="flex flex-col items-start"
            >
              {/* Icon */}
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-zinc-900 dark:bg-[#C9FD48]/10 flex items-center justify-center mb-6">
                <result.icon className="w-6 h-6 lg:w-8 lg:h-8 text-[#C9FD48]" strokeWidth={1.5} />
              </div>

              {/* Number */}
              <div className="flex items-baseline gap-1 mb-3">
                <CountUp
                  to={result.value}
                  duration={2.5}
                  delay={index * 0.2}
                  className="clamp-[text,4rem,8rem] font-black text-foreground leading-none"
                />
                <span className="clamp-[text,2rem,4rem] font-black text-[#C9FD48]">
                  {result.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed">
                {result.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// CTA Section
function GrowthCTA() {
  const t = useTranslations("Growth");

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        {/* CTA Card */}
        <motion.div variants={itemVariant}>
          <Link href="/contact" className="block group">
            <div className="relative rounded-3xl bg-[#C9FD48] overflow-hidden py-6 md:py-8 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9FD48]/40 hover:brightness-105">
              {/* Decorative circles */}
              <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[15vw] h-[15vw] rounded-full border-2 border-black/5 pointer-events-none" />
              <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[10vw] h-[10vw] rounded-full border-2 border-black/5 pointer-events-none" />

              {/* First text */}
              <span className="block text-[6vw] md:text-[5vw] font-black text-black uppercase text-center transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0 relative z-10">
                {t("cta.title")}
              </span>
              {/* Second text */}
              <span className="absolute inset-0 flex items-center justify-center text-[6vw] md:text-[5vw] font-black text-black uppercase translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10">
                {t("cta.button")}
              </span>

              {/* TrendingUp icon */}
              <motion.div
                className="absolute bottom-4 right-6 md:right-8 text-black/20"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <TrendingUp className="w-10 h-10 md:w-14 md:h-14" />
              </motion.div>
            </div>
          </Link>
        </motion.div>

        {/* Contact text */}
        <motion.div variants={itemVariant} className="mt-6 md:mt-8 text-center">
          <p className="clamp-[text,0.875rem,1rem] text-muted-foreground">
            {t("cta.contact_text")}{" "}
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

// Main Page Component
export default function GrowthPage() {
  return (
    <main className="min-h-screen w-full">
      <GrowthHero />
      <SolutionOverview />
      <ResultsSection />
      <GrowthCTA />
    </main>
  );
}
