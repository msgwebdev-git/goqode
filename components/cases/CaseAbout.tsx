"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const blocks = [
  { labelKey: "challengeLabel" as const, textSuffix: "challenge" },
  { labelKey: "solutionLabel" as const, textSuffix: "solution" },
  { labelKey: "resultLabel" as const, textSuffix: "result" },
];

export function CaseAbout({ slug }: { slug: string }) {
  const t = useTranslations("Cases");

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,16,32]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
      >
        {/* Section label */}
        <motion.div
          variants={item}
          className="flex items-center gap-2 mb-6 md:mb-[2vw]"
        >
          <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
          <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
            {t("aboutLabel")}
          </span>
        </motion.div>

        {/* Challenge / Solution / Result grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 clamp-[gap,16,32]">
          {blocks.map((block) => (
            <motion.div
              key={block.labelKey}
              variants={item}
              className="flex flex-col gap-3"
            >
              <span className="clamp-[text,0.75rem,0.875rem] font-semibold text-[#C9FD48] uppercase tracking-wider">
                {t(block.labelKey)}
              </span>
              <p className="clamp-[text,0.875rem,1rem] text-foreground leading-relaxed">
                {t(`items.${slug}.${block.textSuffix}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
