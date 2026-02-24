"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { container, itemVariant } from "./serviceAnimations";

interface ServiceProcessProps {
  namespace: string;
  stepsCount: number;
}

export function ServiceProcess({ namespace, stepsCount }: ServiceProcessProps) {
  const t = useTranslations(namespace);

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
        <motion.div variants={itemVariant} className="mb-8 md:mb-[2.5vw]">
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-2 md:mb-[0.5vw]">
            <div className="w-1.5 h-1.5 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("process.label")}
            </span>
          </div>
          <h2 className="text-[7vw] md:text-[2.5vw] font-bold leading-tight text-foreground">
            {t("process.title")}
          </h2>
        </motion.div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[1vw]">
          {Array.from({ length: stepsCount }, (_, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              className="group relative p-5 md:p-[1.5vw] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 hover:border-[#C9FD48]/50 hover:shadow-lg hover:shadow-[#C9FD48]/5"
            >
              {/* Step number */}
              <div className="flex items-center gap-3 md:gap-[0.6vw] mb-4 md:mb-[1vw]">
                <div className="w-9 h-9 md:w-[2.2vw] md:h-[2.2vw] rounded-xl bg-[#C9FD48] text-black flex items-center justify-center font-bold clamp-[text,0.75rem,0.875rem] shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800 group-hover:bg-[#C9FD48]/30 transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="clamp-[text,1.125rem,1.5rem] font-semibold text-foreground mb-2 md:mb-[0.4vw] leading-tight">
                {t(`process.steps.${index}.title`)}
              </h3>
              <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed">
                {t(`process.steps.${index}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
