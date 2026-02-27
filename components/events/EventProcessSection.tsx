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
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
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
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,16,32]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="w-full md:max-w-6xl md:mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center mb-6 md:mb-12">
          <div className="flex items-center justify-center gap-2 md:gap-[0.4vw] mb-2 md:mb-4">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("process.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.5rem,3rem] font-bold leading-tight text-foreground">
            {t("process.title")}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Mobile: horizontal rows stacked */}
          <div className="flex flex-col gap-4 md:hidden">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  variants={itemVariant}
                  className="flex items-center gap-4"
                >
                  <div className="relative flex-shrink-0">
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C9FD48] text-zinc-900 text-[10px] font-bold flex items-center justify-center z-10">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {t(`process.steps.${step.key}.title`)}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {t(`process.steps.${step.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-5 gap-4 relative">
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent" />
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  variants={itemVariant}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="absolute top-0 left-1/2 translate-x-4 w-6 h-6 rounded-full bg-[#C9FD48] text-zinc-900 text-xs font-bold flex items-center justify-center z-10">
                    {index + 1}
                  </div>
                  <div className="relative w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">
                    {t(`process.steps.${step.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`process.steps.${step.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
