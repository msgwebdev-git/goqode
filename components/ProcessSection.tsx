"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { LogoLoop } from "./LogoLoop";
import { Link } from "@/i18n/navigation";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

// Animation variants for active card switching
const cardContainerVariants = {
  inactive: {
    boxShadow: "0 0 0 rgba(201,253,72,0)",
  },
  active: {
    boxShadow: "0 25px 60px -15px rgba(201,253,72,0.4)",
  },
};

const iconVariants = {
  inactive: { scale: 1, rotate: 0 },
  active: {
    scale: [1, 1.25, 0.95, 1.1, 1],
    rotate: [0, -8, 8, -4, 0],
  },
};

const titleVariants = {
  inactive: { y: 0, opacity: 1 },
  active: { y: [8, 0], opacity: [0.7, 1] },
};

const tagsContainerVariants = {
  inactive: {},
  active: {
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};

const tagVariants = {
  inactive: { scale: 1, opacity: 0.8 },
  active: { scale: [0.9, 1.05, 1], opacity: 1 },
};

// Icons for each step
const StepIcons = [
  // Brief - face/meeting
  <svg key="brief" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <circle cx="9" cy="9" r="1" fill="currentColor"/>
    <circle cx="15" cy="9" r="1" fill="currentColor"/>
  </svg>,
  // Research - magnifying glass
  <svg key="research" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
    <path d="M8 11h6M11 8v6"/>
  </svg>,
  // Execution - code
  <svg key="execution" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
    <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="2 2"/>
  </svg>,
  // Launch - rocket
  <svg key="launch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>,
];

function ProcessCard({
  index,
  title,
  description,
  includes,
  isActive,
  isPast,
}: {
  index: number;
  title: string;
  description: string;
  includes: string[];
  isActive: boolean;
  isPast: boolean;
}) {
  return (
    <motion.div
      variants={cardVariant}
      className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] aspect-square"
    >
      <motion.div
        variants={cardContainerVariants}
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className={`
          relative h-full rounded-3xl overflow-hidden p-6 md:p-8 cursor-pointer transition-colors duration-500 ease-out
          ${isActive
            ? "bg-[#C9FD48] text-black"
            : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black"
          }
        `}
      >
        {/* Large step number background */}
        <div
          className={`
            absolute -top-4 -right-4 text-[30vw] md:text-[12vw] font-black leading-none select-none pointer-events-none transition-colors duration-500
            ${isActive ? "text-black/5" : "text-white/[0.02] dark:text-black/[0.02]"}
          `}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Icon */}
          <div
            className={`
              w-12 h-12 md:w-16 md:h-16 mb-6 rounded-2xl flex items-center justify-center transition-colors duration-500
              ${isActive ? "bg-black/10 text-black" : "bg-zinc-800 text-[#C9FD48]"}
            `}
          >
            <motion.div
              variants={iconVariants}
              animate={isActive ? "active" : "inactive"}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-6 h-6 md:w-8 md:h-8"
            >
              {StepIcons[index]}
            </motion.div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`
                text-sm font-mono uppercase tracking-wider transition-colors duration-500
                ${isActive ? "text-black/60" : "text-white/40 dark:text-black/40"}
              `}
            >
              Step {String(index + 1).padStart(2, "0")}
            </span>
            {isPast && (
              <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-500 rounded-full">
                Done
              </span>
            )}
          </div>

          {/* Title */}
          <motion.h3
            variants={titleVariants}
            animate={isActive ? "active" : "inactive"}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={`
              clamp-[text,1.5rem,2.5rem] font-bold mb-3 leading-tight transition-colors duration-500
              ${isActive ? "text-black" : "text-white dark:text-black"}
            `}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <p
            className={`
              clamp-[text,0.875rem,1.125rem] leading-relaxed mb-6 transition-colors duration-500
              ${isActive ? "text-black/70" : "text-white/60 dark:text-black/60"}
            `}
          >
            {description}
          </p>

          {/* Includes list */}
          <div className="mt-auto">
            <div
              className={`
                text-xs font-medium uppercase tracking-wider mb-3 transition-colors duration-500
                ${isActive ? "text-black/50" : "text-white/30 dark:text-black/30"}
              `}
            >
              Includes
            </div>
            <motion.div
              variants={tagsContainerVariants}
              animate={isActive ? "active" : "inactive"}
              className="flex flex-wrap gap-2"
            >
              {includes.map((item, i) => (
                <motion.span
                  key={i}
                  variants={tagVariants}
                  transition={{ duration: 0.3 }}
                  className={`
                    px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-500
                    ${isActive
                      ? "bg-black/10 text-black"
                      : "bg-white/10 dark:bg-black/10 text-white/80 dark:text-black/80"
                    }
                  `}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Progress indicator dot */}
        <motion.div
          className={`
            absolute bottom-6 right-6 w-3 h-3 rounded-full transition-colors duration-500
            ${isActive ? "bg-black" : isPast ? "bg-emerald-500" : "bg-white/20 dark:bg-black/20"}
          `}
          animate={isActive ? {
            scale: [1, 1.4, 1],
            boxShadow: [
              "0 0 0 0 rgba(0,0,0,0.4)",
              "0 0 0 10px rgba(0,0,0,0)",
              "0 0 0 0 rgba(0,0,0,0)"
            ]
          } : {}}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

// Mobile Horizontal Scroll with progress indicator
function MobileProcessScroll({
  steps,
  subtitle,
  title,
}: {
  steps: { title: string; description: string; includes: string[] }[];
  subtitle: string;
  title: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mobileStep, setMobileStep] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / (steps.length + 2); // account for spacers
    const index = Math.round((el.scrollLeft - 24) / (cardWidth + 16)); // 16 = gap
    const clamped = Math.max(0, Math.min(steps.length - 1, index));
    if (clamped !== mobileStep) setMobileStep(clamped);
  };

  const progress = steps.length > 1 ? mobileStep / (steps.length - 1) : 0;

  return (
    <section className="md:hidden w-full py-12">
      {/* Header */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {subtitle}
          </span>
        </div>
        <h2 className="text-[10vw] font-black leading-tight text-foreground">
          {title}
        </h2>
      </div>

      {/* Horizontal Scroll */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch", scrollPaddingLeft: "24px" }}
      >
        {/* Left spacer */}
        <div className="shrink-0 w-6" />
        {steps.map((step, index) => (
          <div
            key={index}
            className="snap-start shrink-0 w-[80vw] relative rounded-2xl bg-zinc-900 dark:bg-zinc-100 p-5 overflow-hidden"
          >
            {/* Step number bg */}
            <div className="absolute -top-2 -right-2 text-[8rem] font-black leading-none text-white/5 dark:text-black/5 select-none pointer-events-none">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="relative z-10">
              {/* Icon + Step */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#C9FD48]/20 flex items-center justify-center text-[#C9FD48]">
                  <div className="w-5 h-5">{StepIcons[index]}</div>
                </div>
                <span className="text-xs font-mono text-white/40 dark:text-black/40 uppercase tracking-wider">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white dark:text-black mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/60 dark:text-black/60 leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {step.includes.map((item, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-medium bg-white/10 dark:bg-black/10 text-white/70 dark:text-black/70 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* Spacer for right padding */}
        <div className="shrink-0 w-6" />
      </div>

      {/* Progress indicator */}
      <div className="px-6 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C9FD48] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((mobileStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-mono text-muted-foreground">
            {mobileStep + 1}/{steps.length}
          </span>
        </div>

        {/* Step names */}
        <div className="flex justify-between mt-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-1.5 transition-opacity duration-300 ${
                mobileStep === index ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  mobileStep >= index ? "bg-[#C9FD48]" : "bg-zinc-400"
                }`}
              />
              <span className="text-[0.625rem] font-medium text-muted-foreground">
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Mobile CTA Section
function MobileCTASection() {
  const t = useTranslations("Process");

  return (
    <section className="md:hidden w-full px-6 pb-12">
      <div className="bg-[#C9FD48] rounded-2xl p-8 text-center text-black">
        <h2 className="text-2xl font-bold mb-3">
          {t("cta.title")}
        </h2>
        <p className="text-sm opacity-70 mb-6">
          {t("cta.subtitle")}
        </p>
        <Link href="/contact">
          <button className="h-12 px-8 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition-colors">
            {t("cta.button")}
          </button>
        </Link>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const t = useTranslations("Process");
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const lastStepRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll for 4 cards
  const x = useTransform(scrollYProgress, [0, 1], ["35vw", "-65vw"]);

  // Breakpoints for 4 cards
  const stepBreakpoints = [0, 0.25, 0.5, 0.75];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let step = 0;
    for (let i = stepBreakpoints.length - 1; i >= 0; i--) {
      if (latest >= stepBreakpoints[i]) {
        step = i;
        break;
      }
    }
    if (step !== lastStepRef.current) {
      lastStepRef.current = step;
      setActiveStep(step);
    }
  });

  const steps = Array.from({ length: 4 }, (_, i) => ({
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
    includes: t.raw(`steps.${i}.includes`) as string[],
  }));

  return (
    <>
      {/* Desktop: Sticky Horizontal Scroll */}
      <section
        ref={containerRef}
        className="hidden md:block relative h-[300vh]"
      >
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
          {/* Header */}
          <div className="clamp-[px,12,24] pt-8 pb-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
              <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
                {t("subtitle")}
              </span>
            </div>
          </div>

          {/* Marquee */}
          <div className="w-full border-y border-zinc-200 dark:border-zinc-800 py-4 overflow-hidden">
            <div className="pointer-events-none">
              <LogoLoop
                logos={[...Array(4)].map((_, i) => ({
                  node: (
                    <span className="text-[4rem] md:text-[6rem] font-black tracking-tighter text-foreground/80">
                      {t("marquee")}
                    </span>
                  ),
                }))}
                speed={80}
                gap={32}
                logoHeight={96}
                pauseOnHover={false}
              />
            </div>
          </div>

          {/* Horizontal Scroll Cards */}
          <div className="flex-1 flex items-center overflow-visible">
            <motion.div
              className="relative flex gap-6 md:gap-8"
              style={{ x, willChange: "transform" }}
            >
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={container}
                className="flex gap-6 md:gap-8"
              >
                {steps.map((step, index) => (
                  <ProcessCard
                    key={index}
                    index={index}
                    title={step.title}
                    description={step.description}
                    includes={step.includes}
                    isActive={activeStep === index}
                    isPast={activeStep > index}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="clamp-[px,12,24] pb-8">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-black dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-[#C9FD48] rounded-full origin-left"
                  style={{ scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
                />
              </div>
              <span className="text-sm font-mono text-muted-foreground w-16 text-right">
                {activeStep + 1}/4
              </span>
            </div>

            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 transition-opacity duration-300 ${
                    activeStep === index ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      activeStep >= index ? "bg-[#C9FD48]" : "bg-zinc-400"
                    }`}
                  />
                  <span className="text-xs font-medium text-muted-foreground hidden lg:block">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Mobile: Horizontal Scroll Snap */}
      <MobileProcessScroll steps={steps} subtitle={t("subtitle")} title={t("title")} />

      {/* Mobile CTA */}
      <MobileCTASection />
    </>
  );
}
