"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Shuffle from "@/components/Shuffle";
import { Rocket, ArrowRight, Target, Users, TrendingUp } from "lucide-react";
import CountUp from "@/components/CountUp";

// Animated Plus to X Icon
function AnimatedPlusX({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      className="relative w-6 h-6 md:w-[1.5vw] md:h-[1.5vw]"
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
function LaunchHero() {
  const t = useTranslations("Launch");

  return (
    <section className="w-full min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        className="flex flex-col items-center gap-5 md:gap-[1.5vw] text-center w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title with Shuffle animation */}
        <motion.div variants={itemVariant} className="w-full">
          <Shuffle
            text={t("hero.title")}
            tag="h1"
            className="text-[13vw] md:text-[10vw] font-black leading-[0.9] tracking-tight text-foreground"
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
          className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariant}>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-8 md:px-[1.5vw] rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02] overflow-hidden"
          >
            <Rocket className="h-4 w-4" />
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
  const t = useTranslations("Launch");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <div className="flex flex-col lg:flex-row border-t border-zinc-200 dark:border-zinc-800 pt-4 md:pt-[1.2vw]">
        {/* Left Column - Title */}
        <div className="lg:w-[40%] lg:sticky lg:top-24 lg:self-start mb-5 lg:mb-0 lg:pr-[2vw]">
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-2 md:mb-[0.5vw]">
            <div className="w-1.5 h-1.5 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("overview.label")}
            </span>
          </div>
          <h2 className="text-[7vw] md:text-[2.5vw] font-bold leading-tight text-foreground">
            {t("overview.title")}
          </h2>
        </div>

        {/* Right Column - List */}
        <div className="lg:w-[60%] lg:pl-[2vw] lg:border-l border-zinc-200 dark:border-zinc-800">
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
                  className="w-full py-4 md:py-[1vw] flex items-center justify-between gap-3 md:gap-[0.8vw] text-left group"
                >
                  {/* Title */}
                  <h3 className="text-[6vw] md:text-[3.2vw] font-semibold text-foreground leading-tight transition-[font-weight] duration-300 ease-out group-hover:font-extrabold">
                    {t(`overview.steps.${index}.title`)}
                  </h3>

                  {/* Plus/Minus */}
                  <div className="flex-shrink-0 w-8 h-8 md:w-[2.5vw] md:h-[2.5vw] flex items-center justify-center text-muted-foreground">
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
                      <div className="pb-4 md:pb-[1.5vw] pr-0 md:pr-[3vw]">
                        {/* Description */}
                        <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed mb-2 md:mb-[0.5vw]">
                          {t(`overview.steps.${index}.description`)}
                        </p>
                        <p className="clamp-[text,0.875rem,1rem] text-foreground/70 leading-relaxed mb-3 md:mb-[0.8vw]">
                          {t(`overview.steps.${index}.details`)}
                        </p>

                        {/* Deliverables */}
                        <div className="flex flex-wrap gap-2 md:gap-[0.4vw]">
                          {t(`overview.steps.${index}.deliverables`).split(", ").map((item, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 md:px-[0.8vw] md:py-[0.3vw] border border-zinc-300 dark:border-zinc-700 text-foreground/80 clamp-[text,0.75rem,0.875rem] font-medium rounded-full"
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
  const t = useTranslations("Launch");

  const results = [
    {
      icon: Target,
      value: 100,
      suffix: "%",
      label: t("results.digital_presence"),
    },
    {
      icon: Users,
      value: 30,
      suffix: "+",
      label: t("results.first_leads"),
    },
    {
      icon: TrendingUp,
      value: 2,
      suffix: "x",
      label: t("results.conversion_growth"),
    },
  ];

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48] bg-zinc-50 dark:bg-zinc-950">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="mb-6 md:mb-[2vw]">
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-2 md:mb-[0.5vw]">
            <div className="w-1.5 h-1.5 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("results.label")}
            </span>
          </div>
          <h2 className="text-[7vw] md:text-[2.5vw] font-bold leading-tight text-foreground">
            {t("results.title")}
          </h2>
        </motion.div>

        {/* Results List */}
        <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-[1.5vw]">
          {results.map((result, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              className="flex items-center gap-4 md:flex-col md:text-center"
            >
              {/* Icon */}
              <div className="w-12 h-12 md:w-[3vw] md:h-[3vw] rounded-2xl bg-zinc-900 dark:bg-[#C9FD48]/10 flex items-center justify-center shrink-0 md:mb-[0.8vw]">
                <result.icon className="w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] text-[#C9FD48]" strokeWidth={1.5} />
              </div>

              <div className="flex flex-col md:items-center">
                {/* Number */}
                <div className="flex items-baseline gap-0.5 md:gap-[0.5vw] md:mb-[0.4vw]">
                  <CountUp
                    to={result.value}
                    duration={2.5}
                    delay={index * 0.2}
                    className="text-4xl md:text-[5vw] font-black text-foreground leading-none"
                  />
                  <span className="text-xl md:text-[2.5vw] font-black text-[#C9FD48]">
                    {result.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-sm md:clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed mt-0.5">
                  {result.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// CTA Section
function LaunchCTA() {
  const t = useTranslations("Launch");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
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
            <div className="relative rounded-2xl md:rounded-3xl bg-[#C9FD48] overflow-hidden py-4 md:py-[0.8vw] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9FD48]/40 hover:brightness-105">
              {/* First text */}
              <span className="block text-[5.5vw] md:text-[3vw] font-black text-black uppercase text-center transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0 relative z-10">
                {t("cta.title")}
              </span>
              {/* Second text */}
              <span className="absolute inset-0 flex items-center justify-center text-[5.5vw] md:text-[3vw] font-black text-black uppercase translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10">
                {t("cta.button")}
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Contact text */}
        <motion.div variants={itemVariant} className="mt-4 md:mt-[1vw] text-center">
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
export default function LaunchPage() {
  return (
    <main className="min-h-screen w-full">
      <LaunchHero />
      <SolutionOverview />
      <ResultsSection />
      <LaunchCTA />
    </main>
  );
}
