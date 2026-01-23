"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

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

const aggregatorFeatures = ["0", "1", "2", "3", "4"];
const customFeatures = ["0", "1", "2", "3", "4"];

export function EventComparisonSection() {
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
              {t("comparison.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.75rem,3rem] font-bold leading-tight text-foreground">
            {t("comparison.title")}
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 clamp-[gap,16,32]">
          {/* Aggregators Card - Neutral Style */}
          <motion.div
            variants={itemVariant}
            className="relative clamp-[p,20,32] rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
          >
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <X className="w-5 h-5 text-zinc-500" />
              </div>
              <h3 className="clamp-[text,1.25rem,1.5rem] font-bold text-foreground">
                {t("comparison.aggregators.title")}
              </h3>
            </div>

            {/* Features List */}
            <ul className="space-y-4">
              {aggregatorFeatures.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mt-0.5">
                    <X className="w-3 h-3 text-zinc-500" />
                  </div>
                  <span className="clamp-[text,0.875rem,1rem] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t(`comparison.aggregators.features.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Custom Platform Card - Accent Style */}
          <motion.div
            variants={itemVariant}
            className="relative clamp-[p,20,32] rounded-2xl bg-zinc-900 dark:bg-zinc-950 border border-[#C9FD48]/30"
          >
            {/* Accent glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C9FD48]/10 to-transparent pointer-events-none" />

            {/* Card Header */}
            <div className="relative flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#C9FD48] flex items-center justify-center">
                <Check className="w-5 h-5 text-zinc-900" />
              </div>
              <h3 className="clamp-[text,1.25rem,1.5rem] font-bold text-white">
                {t("comparison.custom.title")}
              </h3>
            </div>

            {/* Features List */}
            <ul className="relative space-y-4">
              {customFeatures.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C9FD48] flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-zinc-900" />
                  </div>
                  <span className="clamp-[text,0.875rem,1rem] text-zinc-300 leading-relaxed">
                    {t(`comparison.custom.features.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.div
          variants={itemVariant}
          className="mt-8 lg:mt-12 text-center"
        >
          <p className="clamp-[text,0.875rem,1.125rem] text-muted-foreground italic">
            &ldquo;{t("comparison.note")}&rdquo;
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
