"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Shuffle from "@/components/Shuffle";
import { CalendarDays, ArrowRight } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export default function EventsHero() {
  const t = useTranslations("Events");

  return (
    <section className="w-full min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        className="flex flex-col items-center gap-5 md:gap-[1.5vw] text-center w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title */}
        <motion.div variants={itemVariant} className="w-full">
          <Shuffle
            text={t("hero.title")}
            tag="h1"
            className="text-[11vw] md:text-[10vw] font-black leading-[0.9] tracking-tight text-foreground"
            textAlign="center"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={false}
            respectReducedMotion={true}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariant}
          className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariant} className="relative z-50">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-8 md:px-[1.5vw] rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02] overflow-hidden pointer-events-auto"
          >
            <CalendarDays className="h-4 w-4" />
            <span>{t("hero.cta")}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
