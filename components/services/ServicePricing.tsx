"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Calculator, ArrowRight } from "lucide-react";
import { container, itemVariant } from "./serviceAnimations";

interface ServicePricingProps {
  namespace: string;
  basePrice: string;
  isMonthly: boolean;
  calculatorTypeIndex: string;
}

export function ServicePricing({ namespace, basePrice, isMonthly, calculatorTypeIndex }: ServicePricingProps) {
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
        <motion.div variants={itemVariant} className="mb-6 md:mb-[2vw]">
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-2 md:mb-[0.5vw]">
            <div className="w-1.5 h-1.5 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("pricing.label")}
            </span>
          </div>
          <h2 className="text-[7vw] md:text-[2.5vw] font-bold leading-tight text-foreground">
            {t("pricing.title")}
          </h2>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          variants={itemVariant}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-[2vw] p-6 md:p-[2vw] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          <div>
            <div className="flex items-baseline gap-1 mb-2 md:mb-[0.5vw]">
              <span className="clamp-[text,0.875rem,1rem] text-muted-foreground">{t("pricing.from")}</span>
              <span className="text-[10vw] md:text-[4vw] font-black text-foreground leading-none">
                €{basePrice}
              </span>
              {isMonthly && (
                <span className="clamp-[text,1rem,1.25rem] text-muted-foreground font-medium">/mo</span>
              )}
            </div>
            <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed max-w-[500px]">
              {t("pricing.description")}
            </p>
          </div>

          <Link
            href={`/calculator?type=${calculatorTypeIndex}`}
            className="group inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-8 md:px-[1.5vw] rounded-full border-2 border-zinc-900 dark:border-[#C9FD48] text-zinc-900 dark:text-[#C9FD48] font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-[#C9FD48] dark:hover:text-black shrink-0"
          >
            <Calculator className="h-4 w-4" />
            <span>{t("pricing.cta")}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
