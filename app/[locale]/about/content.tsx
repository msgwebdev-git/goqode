"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import SplitText from "@/components/SplitText";
import { ClientLogos } from "@/components/ClientLogos";

/* ─── Animation variants ─────────────────────────────── */

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

/* ─── Data ────────────────────────────────────────────── */

const stats = [
  { id: "experience", value: 30, suffix: "+" },
  { id: "projects", value: 35, suffix: "+" },
  { id: "industries", value: 12, suffix: "+" },
];

const advantages = ["flexibility", "attention", "drive", "results"];

/* ═══════════════════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════════════════ */

export default function AboutPage() {
  const t = useTranslations("About");
  const tp = useTranslations("AboutPage");

  return (
    <main className="min-h-screen w-full">
      {/* ── Hero Section ── */}
      <section className="w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center clamp-[px,12,24] clamp-[py,24,48]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 md:mb-[1vw]"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-[#C9FD48]/10 text-[#C9FD48] text-xs font-semibold tracking-widest uppercase border border-zinc-800 dark:border-[#C9FD48]/20">
            {tp("subtitle")}
          </span>
        </motion.div>

        <SplitText
          text={t("title")}
          tag="h1"
          className="text-[14vw] md:text-[8vw] font-black leading-[1.05] tracking-tight text-foreground uppercase"
          textAlign="center"
        />

        <div className="mt-6 md:mt-[2vw] w-full">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={3}
            blurStrength={4}
            containerClassName="w-full"
            textClassName="text-[5vw] md:text-[3vw] font-bold leading-[1.15] text-foreground text-center"
          >
            {t("heroText")}
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
        >
          {/* Section label */}
          <motion.div variants={cardVariant} className="flex items-center gap-2 md:gap-[0.4vw] mb-4 md:mb-[1.5vw]">
            <div className="w-2 h-2 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="text-xs md:clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {tp("statsTitle")}
            </span>
          </motion.div>

          {/* Team message */}
          <motion.div variants={cardVariant} className="mb-6 md:mb-[3vw]">
            <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed">
              {t("teamMessage")}
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={cardVariant}
            className="grid grid-cols-3 gap-2 md:gap-[1.5vw]"
          >
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 py-6 md:py-[2vw]"
              >
                <div className="text-[12vw] md:text-[6vw] font-black text-foreground leading-none mb-1 md:mb-[0.5vw]">
                  <CountUp from={0} to={stat.value} duration={2} separator="" />
                  {stat.suffix}
                </div>
                <p className="clamp-[text,0.75rem,1rem] text-muted-foreground font-medium">
                  {t(`stats.${stat.id}`)}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Advantages Section ── */}
      <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
        >
          {/* Section label */}
          <motion.div variants={cardVariant} className="flex items-center gap-2 md:gap-[0.4vw] mb-6 md:mb-[2vw]">
            <div className="w-2 h-2 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="text-xs md:clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {tp("advantagesTitle")}
            </span>
          </motion.div>

          {/* Advantages grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-[1.25vw]">
            {advantages.map((id) => (
              <motion.div key={id} variants={cardVariant} className="group">
                <div className="h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 md:p-[1.25vw] transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#C9FD48]/50">
                  <h3 className="clamp-[text,1.125rem,1.5rem] font-bold text-foreground mb-2 md:mb-[0.6vw]">
                    {t(`advantages.${id}.title`)}
                  </h3>
                  <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed">
                    {t(`advantages.${id}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Client Logos Section ── */}
      <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
        >
          <motion.div variants={cardVariant}>
            <ClientLogos />
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
