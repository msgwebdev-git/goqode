"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedPlusX } from "./AnimatedPlusX";

interface ServiceFeaturesProps {
  namespace: string;
  count: number;
}

export function ServiceFeatures({ namespace, count }: ServiceFeaturesProps) {
  const t = useTranslations(namespace);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <div className="flex flex-col lg:flex-row border-t border-zinc-200 dark:border-zinc-800 pt-4 md:pt-[1.2vw]">
        {/* Left Column - Title */}
        <div className="lg:w-[40%] lg:sticky lg:top-24 lg:self-start mb-5 lg:mb-0 lg:pr-[2vw]">
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-2 md:mb-[0.5vw]">
            <div className="w-1.5 h-1.5 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("features.label")}
            </span>
          </div>
          <h2 className="text-[7vw] md:text-[2.5vw] font-bold leading-tight text-foreground">
            {t("features.title")}
          </h2>
        </div>

        {/* Right Column - Accordion */}
        <div className="lg:w-[60%] lg:pl-[2vw] lg:border-l border-zinc-200 dark:border-zinc-800">
          {Array.from({ length: count }, (_, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-4 md:py-[1vw] flex items-center justify-between gap-3 md:gap-[0.8vw] text-left group cursor-pointer"
                >
                  <h3 className="text-[6vw] md:text-[3.2vw] font-semibold text-foreground leading-tight transition-[font-weight] duration-300 ease-out group-hover:font-extrabold">
                    {t(`features.items.${index}.title`)}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 md:w-[2.5vw] md:h-[2.5vw] flex items-center justify-center text-muted-foreground">
                    <AnimatedPlusX isOpen={isOpen} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 md:pb-[1.5vw] pr-0 md:pr-[3vw]">
                        <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed mb-2 md:mb-[0.5vw]">
                          {t(`features.items.${index}.description`)}
                        </p>
                        <p className="clamp-[text,0.875rem,1rem] text-foreground/70 leading-relaxed mb-3 md:mb-[0.8vw]">
                          {t(`features.items.${index}.details`)}
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-[0.4vw]">
                          {t(`features.items.${index}.deliverables`).split(", ").map((item, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 md:px-[0.8vw] md:py-[0.3vw] border border-zinc-300 dark:border-zinc-700 text-foreground/80 clamp-[text,0.75rem,0.875rem] font-medium rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
