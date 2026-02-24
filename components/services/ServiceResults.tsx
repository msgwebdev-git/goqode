"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import { type LucideIcon } from "lucide-react";
import { container, itemVariant } from "./serviceAnimations";

export interface ResultStat {
  icon: LucideIcon;
  value: number;
  suffix: string;
  labelKey: string;
}

interface ServiceResultsProps {
  namespace: string;
  results: ResultStat[];
}

export function ServiceResults({ namespace, results }: ServiceResultsProps) {
  const t = useTranslations(namespace);

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
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
              <div className="w-12 h-12 md:w-[3vw] md:h-[3vw] rounded-2xl bg-zinc-900 dark:bg-[#C9FD48]/10 flex items-center justify-center shrink-0 md:mb-[0.8vw]">
                <result.icon className="w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] text-[#C9FD48]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col md:items-center">
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
                <p className="text-sm md:clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed mt-0.5">
                  {t(result.labelKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
