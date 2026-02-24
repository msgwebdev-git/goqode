"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { container, itemVariant } from "./serviceAnimations";

interface ServiceTechStackProps {
  namespace: string;
  categories: string[];
}

export function ServiceTechStack({ namespace, categories }: ServiceTechStackProps) {
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
        <motion.div variants={itemVariant} className="mb-8 md:mb-[2.5vw]">
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-2 md:mb-[0.5vw]">
            <div className="w-1.5 h-1.5 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("tech.label")}
            </span>
          </div>
          <h2 className="text-[7vw] md:text-[2.5vw] font-bold leading-tight text-foreground">
            {t("tech.title")}
          </h2>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[1vw]">
          {categories.map((catKey) => (
            <motion.div
              key={catKey}
              variants={itemVariant}
              className="p-4 md:p-[1.2vw] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
            >
              <h3 className="clamp-[text,0.875rem,1rem] font-semibold text-foreground mb-3 md:mb-[0.6vw]">
                {t(`tech.categories.${catKey}.title`)}
              </h3>
              <div className="flex flex-wrap gap-1.5 md:gap-[0.3vw]">
                {t(`tech.categories.${catKey}.items`).split(", ").map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 md:px-[0.6vw] md:py-[0.2vw] bg-zinc-200 dark:bg-zinc-800 text-foreground/80 clamp-[text,0.75rem,0.875rem] font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
