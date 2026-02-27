"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { CaseStudy } from "@/lib/cases-data";

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

export function CaseNextCard({ nextCase }: { nextCase: CaseStudy }) {
  const t = useTranslations("Cases");

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,16,32]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
      >
        <motion.div
          variants={item}
          className="flex items-center gap-2 mb-4 md:mb-[1.5vw]"
        >
          <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
            {t("nextCase")}
          </span>
        </motion.div>

        <motion.div variants={item}>
          <Link href={{ pathname: "/cases/[slug]", params: { slug: nextCase.slug } }} className="group block">
            <div className="relative w-full aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
              <Image
                src={nextCase.cardImage}
                alt={t(`items.${nextCase.slug}.title`)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="100vw"
              />
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
                <h3 className="clamp-[text,1.5rem,3rem] font-bold text-white">
                  {t(`items.${nextCase.slug}.title`)}
                </h3>
              </div>
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20">
                <ArrowRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
