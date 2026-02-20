"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Shuffle from "@/components/Shuffle";
import TrueFocus from "@/components/TrueFocus";
import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 md:clamp-[px,12,24]">
      <motion.div
        className="flex flex-col items-center clamp-[gap,16,32]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col items-center clamp-[gap,8,16] w-full">
          {/* Title */}
          <motion.div variants={item} className="w-full">
            <Shuffle
              text="We build bold digital"
              tag="h1"
              className="w-full text-[12vw] md:text-[10vw] font-black leading-none tracking-tight text-foreground font-sans"
              textAlign="center"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={item}>
            <TrueFocus
              sentence={t("subtitle")}
              separator=". "
              manualMode={false}
              blurAmount={3}
              borderColor="hsl(var(--foreground))"
              glowColor="hsl(var(--foreground) / 0.4)"
              animationDuration={0.5}
              pauseBetweenAnimations={2}
              textClassName="clamp-[text,2rem,1.75rem] font-medium text-muted-foreground"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="clamp-[text,0.875rem,1.125rem] text-muted-foreground text-center max-w-2xl leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:clamp-[gap,12,16] w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 h-12 sm:h-14 clamp-[px,24,32] rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02] overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
              {t("cta")}
            </span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#C9FD48] to-[#a8e824] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <Link
            href="/packages"
            className="group relative inline-flex items-center justify-center gap-2 h-12 sm:h-14 clamp-[px,24,32] rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/20 text-foreground font-medium clamp-[text,0.875rem,1rem] transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/15 hover:border-black/20 dark:hover:border-white/30 hover:scale-[1.02] w-full sm:w-auto"
          >
            <Tag className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span>{t("ctaSecondary")}</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
