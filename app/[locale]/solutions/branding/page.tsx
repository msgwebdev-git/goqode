"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Shuffle from "@/components/Shuffle";
import CountUp from "@/components/CountUp";
import {
  Palette,
  ArrowRight,
  BookOpen,
  Hexagon,
  Type,
  Package,
  X,
  Check,
} from "lucide-react";

/* ─── Animation variants ─────────────────────────────── */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ═══════════════════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════════════════ */

function BrandingHero() {
  const t = useTranslations("Branding");

  return (
    <section className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center clamp-[px,12,24]">
      <motion.div
        className="flex flex-col items-center gap-[2vw] text-center w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariant} className="w-full">
          <Shuffle
            text={t("hero.title")}
            tag="h1"
            className="text-[15vw] md:text-[12vw] font-black leading-[0.85] tracking-tighter text-foreground"
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

        <motion.p
          variants={itemVariant}
          className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed md:w-2/3 lg:w-1/2"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div variants={itemVariant}>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 h-12 sm:h-14 clamp-[px,24,32] rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02]"
          >
            <span>{t("hero.cta")}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   2. BRAND SYSTEM — Dark bento grid
   ═══════════════════════════════════════════════════════ */

const BRAND_COLORS = [
  { hex: "#C9FD48", name: "Lime" },
  { hex: "#171717", name: "Onyx" },
  { hex: "#F4F4F5", name: "Cloud" },
  { hex: "#6366F1", name: "Indigo" },
  { hex: "#F97316", name: "Amber" },
];

function BrandSystemSection() {
  const t = useTranslations("Branding");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="w-full bg-zinc-950 clamp-[px,12,24] clamp-[py,24,48]"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={container}
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center mb-[2vw]">
          <div className="flex items-center justify-center gap-2 mb-[0.5vw]">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
              {t("system.label")}
            </span>
          </div>
          <h2 className="text-[5vw] md:text-[3vw] font-bold leading-tight text-white">
            {t("system.title")}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1vw] auto-rows-auto">
          {/* Colors — span 2 cols */}
          <motion.div
            variants={itemVariant}
            className="col-span-2 rounded-2xl bg-zinc-900 border border-zinc-800 p-[1.5vw] flex flex-col"
          >
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-[1.5vw]">
              {t("deliverables.items.colors.title")}
            </span>
            <div className="flex-1 flex items-center">
              <div className="flex gap-[0.8vw] w-full">
                {BRAND_COLORS.map((color, i) => (
                  <motion.div
                    key={color.hex}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      delay: 0.3 + 0.08 * i,
                      duration: 0.4,
                      ease: "backOut",
                    }}
                    className="flex-1 flex flex-col items-center gap-[0.4vw]"
                  >
                    <div
                      className="w-full aspect-square rounded-xl border border-zinc-700/50"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[10px] text-zinc-600 font-mono tracking-wider">
                      {color.hex}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            variants={itemVariant}
            className="col-span-1 rounded-2xl bg-zinc-900 border border-zinc-800 p-[1.5vw] flex flex-col items-center justify-between"
          >
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-[1vw] self-start">
              {t("deliverables.items.typography.title")}
            </span>
            <div className="flex flex-col items-center gap-[0.4vw] flex-1 justify-center">
              <span className="text-[4vw] md:text-[2.5vw] font-black leading-none text-white">
                Aa
              </span>
              <span className="text-[2vw] md:text-[1.2vw] font-semibold leading-none text-white/60">
                Heading
              </span>
              <span className="text-[1.5vw] md:text-[0.8vw] font-normal leading-none text-white/35">
                Body Text
              </span>
              <span className="text-xs text-zinc-700 font-mono mt-[0.5vw]">
                Manrope Variable
              </span>
            </div>
          </motion.div>

          {/* Logo System */}
          <motion.div
            variants={itemVariant}
            className="col-span-1 rounded-2xl bg-zinc-900 border border-zinc-800 p-[1.5vw] flex flex-col"
          >
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-[1vw]">
              {t("deliverables.items.logo.title")}
            </span>
            <div className="grid grid-cols-2 gap-[0.5vw] flex-1">
              <div className="rounded-xl bg-zinc-800 flex items-center justify-center aspect-square">
                <div className="w-[2.5vw] h-[2.5vw] min-w-6 min-h-6 rounded-lg bg-[#C9FD48]" />
              </div>
              <div className="rounded-xl bg-[#C9FD48] flex items-center justify-center aspect-square">
                <div className="w-[2.5vw] h-[2.5vw] min-w-6 min-h-6 rounded-lg bg-zinc-950" />
              </div>
              <div className="rounded-xl bg-zinc-800 flex items-center justify-center aspect-square">
                <div className="w-[2.5vw] h-[2.5vw] min-w-6 min-h-6 rounded-lg border-2 border-[#C9FD48]" />
              </div>
              <div className="rounded-xl bg-zinc-800 flex items-center justify-center aspect-square">
                <div className="w-[2.5vw] h-[2.5vw] min-w-6 min-h-6 rounded-lg bg-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   3. COMPARISON — Centered table
   ═══════════════════════════════════════════════════════ */

const comparisonKeys = ["0", "1", "2", "3", "4"] as const;

function ComparisonSection() {
  const t = useTranslations("Branding");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={container}
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center mb-[2vw]">
          <div className="flex items-center justify-center gap-2 mb-[0.5vw]">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("comparison.label")}
            </span>
          </div>
          <h2 className="text-[5vw] md:text-[3vw] font-bold leading-tight text-foreground">
            {t("comparison.title")}
          </h2>
        </motion.div>

        {/* Table */}
        <div className="w-full overflow-x-auto flex justify-center">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="pb-[0.8vw] pr-[1.5vw]" />
                <th className="pb-[0.8vw] px-[1.5vw] text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10">
                    <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span className="clamp-[text,0.75rem,0.875rem] font-semibold text-red-500 uppercase tracking-wider">
                      {t("comparison.without_title")}
                    </span>
                  </div>
                </th>
                <th className="pb-[0.8vw] pl-[1.5vw] text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900">
                    <Check className="w-3.5 h-3.5 text-[#C9FD48] flex-shrink-0" />
                    <span className="clamp-[text,0.75rem,0.875rem] font-semibold text-white uppercase tracking-wider">
                      {t("comparison.with_title")}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonKeys.map((key, i) => (
                <motion.tr
                  key={key}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.06 * i }}
                  className="border-t border-zinc-200 dark:border-zinc-800"
                >
                  <td className="py-[0.6vw] pr-[1.5vw] clamp-[text,0.875rem,1rem] font-semibold text-foreground whitespace-nowrap">
                    {t(`comparison.rows.${key}.aspect`)}
                  </td>
                  <td className="py-[0.6vw] px-[1.5vw] clamp-[text,0.875rem,1rem] text-zinc-400 dark:text-zinc-500 text-center">
                    {t(`comparison.rows.${key}.without`)}
                  </td>
                  <td className="py-[0.6vw] pl-[1.5vw] clamp-[text,0.875rem,1rem] font-semibold text-foreground text-center">
                    {t(`comparison.rows.${key}.with`)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   4. DELIVERABLES — Cards grid
   ═══════════════════════════════════════════════════════ */

const deliverableItems = [
  { key: "brandbook", icon: BookOpen },
  { key: "logo", icon: Hexagon },
  { key: "colors", icon: Palette },
  { key: "typography", icon: Type },
  { key: "digital", icon: Package },
] as const;

function DeliverablesSection() {
  const t = useTranslations("Branding");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={container}
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="mb-[2vw]">
          <div className="flex items-center gap-2 mb-[0.5vw]">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("deliverables.label")}
            </span>
          </div>
          <h2 className="text-[5vw] md:text-[3vw] font-bold leading-tight text-foreground">
            {t("deliverables.title")}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1vw]">
          {deliverableItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                variants={itemVariant}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-[1.2vw] flex flex-col"
              >
                <div className="flex items-center justify-between mb-[0.8vw]">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center">
                    <Icon
                      className="w-5 h-5 text-[#C9FD48]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-zinc-300 dark:text-zinc-700 uppercase">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-[2.5vw] md:text-[1.3vw] font-bold text-foreground mb-[0.3vw]">
                  {t(`deliverables.items.${item.key}.title`)}
                </h3>
                <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed">
                  {t(`deliverables.items.${item.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   5. FEATURES — Three pillars
   ═══════════════════════════════════════════════════════ */

const featureIcons = [
  { key: "0", icon: "01" },
  { key: "1", icon: "02" },
  { key: "2", icon: "03" },
];

function FeaturesSection() {
  const t = useTranslations("Branding");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={container}
      >
        <motion.div variants={itemVariant} className="mb-[2vw]">
          <div className="flex items-center gap-2 mb-[0.5vw]">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("features.label")}
            </span>
          </div>
          <h2 className="text-[5vw] md:text-[3vw] font-bold leading-tight text-foreground">
            {t("features.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1vw]">
          {featureIcons.map((feat) => {
            const points = t(`features.items.${feat.key}.points`).split(", ");
            return (
              <motion.div
                key={feat.key}
                variants={itemVariant}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-[1.2vw] flex flex-col"
              >
                <span className="text-[4vw] md:text-[2vw] font-black text-zinc-100 dark:text-zinc-800 leading-none mb-[0.5vw]">
                  {feat.icon}
                </span>

                <h3 className="text-[2.5vw] md:text-[1.3vw] font-bold text-foreground mb-[0.5vw]">
                  {t(`features.items.${feat.key}.title`)}
                </h3>

                <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed mb-[1vw]">
                  {t(`features.items.${feat.key}.description`)}
                </p>

                <div className="mt-auto flex flex-wrap gap-[0.4vw]">
                  {points.map((point) => (
                    <span
                      key={point}
                      className="inline-flex items-center h-7 px-3 rounded-full bg-zinc-900 dark:bg-zinc-800 text-xs font-medium text-[#C9FD48]"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   6. STATS — Dark with big numbers
   ═══════════════════════════════════════════════════════ */

function StatsSection() {
  const t = useTranslations("Branding");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { index: 0, value: 80, suffix: "%" },
    { index: 1, value: 3, suffix: "x" },
    { index: 2, value: 23, suffix: "%" },
  ];

  return (
    <section
      ref={ref}
      className="w-full bg-zinc-950 clamp-[px,12,24] clamp-[py,24,48]"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={container}
      >
        <motion.div variants={itemVariant} className="text-center mb-[2vw]">
          <div className="flex items-center justify-center gap-2 mb-[0.5vw]">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
              {t("stats.label")}
            </span>
          </div>
          <h2 className="text-[5vw] md:text-[3vw] font-bold leading-tight text-white">
            {t("stats.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1vw]">
          {stats.map((stat) => (
            <motion.div
              key={stat.index}
              variants={itemVariant}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-[1.5vw] text-center"
            >
              <div className="flex items-baseline justify-center gap-1 mb-[0.5vw]">
                <CountUp
                  to={stat.value}
                  duration={2.5}
                  delay={stat.index * 0.2}
                  className="text-[10vw] md:text-[5vw] font-black text-white leading-none"
                />
                <span className="text-[5vw] md:text-[2.5vw] font-black text-[#C9FD48]">
                  {stat.suffix}
                </span>
              </div>
              <p className="clamp-[text,0.875rem,1rem] text-zinc-400 leading-relaxed">
                {t(`stats.items.${stat.index}.label`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   7. CTA
   ═══════════════════════════════════════════════════════ */

function BrandingCTA() {
  const t = useTranslations("Branding");

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
      >
        <motion.div variants={itemVariant}>
          <Link href="/contact" className="block group">
            <div className="relative rounded-3xl bg-[#C9FD48] overflow-hidden py-[2vw] md:py-[0.8vw] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9FD48]/40 hover:brightness-105">
              <span className="block text-[6vw] md:text-[3vw] font-black text-black uppercase text-center transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0 relative z-10">
                {t("cta.title")}
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-[6vw] md:text-[3vw] font-black text-black uppercase translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10">
                {t("cta.button")}
              </span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariant}
          className="mt-[1vw] text-center"
        >
          <p className="clamp-[text,0.875rem,1rem] text-muted-foreground">
            {t("cta.contact_text")}{" "}
            <a
              href="mailto:hello@goqode.dev"
              className="text-zinc-900 dark:text-[#C9FD48] font-medium hover:underline transition-colors"
            >
              hello@goqode.dev
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function BrandingPage() {
  return (
    <main className="min-h-screen w-full">
      <BrandingHero />
      <BrandSystemSection />
      <ComparisonSection />
      <DeliverablesSection />
      <FeaturesSection />
      <StatsSection />
      <BrandingCTA />
    </main>
  );
}
