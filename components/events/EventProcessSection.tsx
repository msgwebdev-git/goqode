"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Code2,
  TestTube,
  Rocket,
  HeadphonesIcon
} from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const steps = [
  { icon: MessageSquare, key: "brief" },
  { icon: Code2, key: "development" },
  { icon: TestTube, key: "testing" },
  { icon: Rocket, key: "launch" },
  { icon: HeadphonesIcon, key: "support" },
];

export function EventProcessSection() {
  const t = useTranslations("Events");

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="w-full max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("process.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.75rem,3rem] font-bold leading-tight text-foreground">
            {t("process.title")}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent" />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  variants={itemVariant}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 md:top-0 md:right-auto md:left-1/2 md:translate-x-4 w-6 h-6 rounded-full bg-[#C9FD48] text-zinc-900 text-xs font-bold flex items-center justify-center z-10">
                    {index + 1}
                  </div>

                  {/* Icon container */}
                  <div className="relative w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-bold text-foreground mb-1">
                    {t(`process.steps.${step.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`process.steps.${step.key}.description`)}
                  </p>

                  {/* Mobile connector */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden w-0.5 h-8 bg-zinc-200 dark:bg-zinc-700 mt-4" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
