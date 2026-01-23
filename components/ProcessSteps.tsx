"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Step navigation item
function StepNavItem({
  index,
  title,
  isActive,
  onClick,
}: {
  index: number;
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 text-left w-full py-4 px-5 rounded-2xl transition-all duration-300",
        isActive
          ? "bg-foreground text-background"
          : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300",
          isActive
            ? "bg-[#C9FD48] text-black"
            : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
        )}
      >
        {index + 1}
      </span>
      <span
        className={cn(
          "clamp-[text,0.875rem,1rem] font-semibold transition-colors duration-300"
        )}
      >
        {title}
      </span>
    </button>
  );
}

// Step content section - Big card 70vh
function StepContent({
  index,
  isActive,
}: {
  index: number;
  isActive: boolean;
}) {
  const t = useTranslations("Platforms");
  const deliverables = t(`timeline.steps.${index}.deliverables`).split(", ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
      id={`step-${index}`}
      className="scroll-mt-24"
    >
      <div
        className={cn(
          "relative min-h-[70vh] rounded-3xl border-2 p-8 lg:p-12 xl:p-16 transition-all duration-500 overflow-hidden flex flex-col justify-center",
          isActive
            ? "border-foreground bg-foreground text-background"
            : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
        )}
      >
        {/* Large step number in background */}
        <div
          className={cn(
            "absolute -right-8 -top-8 text-[20rem] font-black leading-none pointer-events-none select-none transition-colors duration-500",
            isActive
              ? "text-[#C9FD48]/10"
              : "text-zinc-200 dark:text-zinc-800"
          )}
        >
          {index + 1}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          {/* Step indicator */}
          <div className="flex items-center gap-4 mb-8">
            <span
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-2xl text-lg font-bold",
                isActive
                  ? "bg-[#C9FD48] text-black"
                  : "bg-zinc-200 dark:bg-zinc-800 text-foreground"
              )}
            >
              0{index + 1}
            </span>
            <div
              className={cn(
                "h-[2px] w-24 transition-colors duration-500",
                isActive ? "bg-[#C9FD48]" : "bg-zinc-300 dark:bg-zinc-700"
              )}
            />
          </div>

          {/* Title */}
          <h3 className="clamp-[text,2rem,4rem] font-bold leading-[1.1] mb-6">
            {t(`timeline.steps.${index}.title`)}
          </h3>

          {/* Short description */}
          <p
            className={cn(
              "clamp-[text,1.125rem,1.5rem] leading-relaxed mb-8",
              isActive ? "text-background/80" : "text-muted-foreground"
            )}
          >
            {t(`timeline.steps.${index}.description`)}
          </p>

          {/* Detailed description */}
          <p
            className={cn(
              "clamp-[text,1rem,1.25rem] leading-relaxed mb-10",
              isActive ? "text-background/70" : "text-foreground/70"
            )}
          >
            {t(`timeline.steps.${index}.details`)}
          </p>

          {/* Deliverables */}
          <div>
            <span
              className={cn(
                "text-sm font-bold uppercase tracking-wider mb-4 block",
                isActive ? "text-zinc-500" : "text-muted-foreground"
              )}
            >
              {t("timeline.deliverablesLabel")}
            </span>
            <div className="flex flex-wrap gap-3">
              {deliverables.map((item, i) => (
                <span
                  key={i}
                  className={cn(
                    "clamp-[text,0.875rem,1rem] px-5 py-2.5 rounded-full font-medium transition-colors duration-300",
                    isActive
                      ? "bg-[#C9FD48] text-black"
                      : "bg-zinc-200 dark:bg-zinc-800 text-foreground"
                  )}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Component
export default function ProcessSteps() {
  const t = useTranslations("Platforms");
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stepCount = 6;
    const newStep = Math.min(Math.floor(latest * stepCount), stepCount - 1);
    if (newStep !== activeStep && newStep >= 0) {
      setActiveStep(newStep);
    }
  });

  const scrollToStep = (index: number) => {
    const element = document.getElementById(`step-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const stepTitles = Array.from({ length: 6 }, (_, i) =>
    t(`timeline.steps.${i}.title`)
  );

  return (
    <section
      ref={containerRef}
      className="w-full clamp-[px,12,24] clamp-[py,24,48]"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 lg:mb-24"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {t("timeline.label")}
          </span>
        </div>
        <h2 className="clamp-[text,2rem,5rem] font-bold leading-[1.1] text-foreground">
          {t("timeline.title")}
        </h2>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Sticky Navigation - Desktop */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24">
            <nav className="flex flex-col gap-2">
              {stepTitles.map((title, index) => (
                <StepNavItem
                  key={index}
                  index={index}
                  title={title}
                  isActive={activeStep === index}
                  onClick={() => scrollToStep(index)}
                />
              ))}
            </nav>

            {/* Progress indicator */}
            <div className="mt-10 px-5">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <span>Progress</span>
                <span className="font-bold text-foreground">
                  {activeStep + 1}/6
                </span>
              </div>
              <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#C9FD48] rounded-full"
                  animate={{ width: `${((activeStep + 1) / 6) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden sticky top-16 z-20 bg-background/95 backdrop-blur-md py-4 -mx-3 px-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {stepTitles.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToStep(index)}
                className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-xl text-sm font-bold transition-all duration-300",
                  activeStep === index
                    ? "bg-foreground text-background"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <p className="text-base font-semibold text-foreground mt-3">
            {stepTitles[activeStep]}
          </p>
        </div>

        {/* Steps Content */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-8 lg:space-y-12">
          {Array.from({ length: 6 }, (_, index) => (
            <StepContent
              key={index}
              index={index}
              isActive={activeStep === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
