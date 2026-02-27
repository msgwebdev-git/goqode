"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "./ScrollReveal";
import CountUp from "./CountUp";
import SplitText from "./SplitText";
import { ClientLogos } from "./ClientLogos";
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const stats = [
  { id: "experience", value: 30, suffix: "+" },
  { id: "projects", value: 35, suffix: "+" },
  { id: "industries", value: 12, suffix: "+" },
];

const advantages = ["flexibility", "attention", "drive", "results"];

export function AboutSection() {
  const t = useTranslations("About");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,16,32]">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="mb-4 md:mb-[1.5vw] text-center"
      >
        {/* Title */}
        <SplitText
          text={t("title")}
          tag="h2"
          className="text-[14vw] md:text-[7vw] font-black leading-[1.1] tracking-tight text-foreground uppercase"
          textAlign="center"
        />
      </motion.div>

      {/* Hero Text with Scroll Reveal */}
      <div className="mb-6 md:mb-[3vw]">
        <ScrollReveal
          enableBlur={true}
          baseOpacity={0.1}
          baseRotation={3}
          blurStrength={4}
          containerClassName="w-full"
          textClassName="text-[5.5vw] md:text-[3.5vw] font-bold leading-[1.15] text-foreground text-center"
        >
          {t("heroText")}
        </ScrollReveal>
      </div>

      {/* Stats & Advantages Section */}
      <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
          className="w-full"
        >
          {/* Team Message */}
          <motion.div
            variants={cardVariant}
            className="text-center mb-4 md:mb-[1.5vw]"
          >
            <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed">
              {t("teamMessage")}
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={cardVariant}
            className="grid grid-cols-3 gap-2 md:gap-[1.5vw] mb-8 md:mb-[3vw]"
          >
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-[10vw] md:text-[5vw] font-bold text-foreground leading-none mb-[0.5vw]">
                  <CountUp
                    from={0}
                    to={stat.value}
                    duration={2}
                    separator=""
                  />
                  {stat.suffix}
                </div>
                <p className="clamp-[text,0.75rem,0.875rem] text-muted-foreground font-medium">
                  {t(`stats.${stat.id}`)}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-[1.25vw]">
            {advantages.map((id) => (
              <motion.div
                key={id}
                variants={cardVariant}
                className="group"
              >
                <div className="h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-[1vw] transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#C9FD48]/50">
                  <h3 className="text-base md:text-[1.45vw] font-bold text-foreground mb-1.5 md:mb-[0.6vw]">
                    {t(`advantages.${id}.title`)}
                  </h3>
                  <p className="text-sm md:clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed">
                    {t(`advantages.${id}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Clients Grid */}
          <motion.div variants={cardVariant} className="mt-10 md:mt-[5vw]">
            <ClientLogos />
          </motion.div>

          {/* CTA Card */}
          <motion.div
            variants={cardVariant}
            className="mt-10 md:mt-[5vw]"
          >
            <Link href="/contact" className="block group">
              <div className="relative rounded-3xl bg-[#C9FD48] overflow-hidden py-3 md:py-[0.8vw] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9FD48]/40 hover:brightness-105">
                {/* First text */}
                <span className="block text-[5vw] md:text-[3vw] font-black text-black uppercase text-center transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                  {t("cta.title")}
                </span>
                {/* Second text */}
                <span className="absolute inset-0 flex items-center justify-center text-[5vw] md:text-[3vw] font-black text-black uppercase translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  {t("cta.button")}
                </span>
              </div>
            </Link>
          </motion.div>
        </motion.div>
    </section>
  );
}
