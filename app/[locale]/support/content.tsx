"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import SplitText from "@/components/SplitText";
import {
  Phone,
  Mail,
  Filter,
  Search,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  HeadphonesIcon,
  type LucideIcon,
} from "lucide-react";

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

const itemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ═══════════════════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════════════════ */

function ClockVisualization() {
  const segments = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="relative w-48 md:w-80 aspect-square mx-auto rounded-full bg-zinc-950 border border-zinc-800">
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
        {segments.map((i) => {
          const angle = (i * 360) / 24;
          const radius = 80;
          const x = 100 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 100 + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="2.5"
              fill="#C9FD48"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 1, 0.2], r: [2.5, 4, 2.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.1 }}
            />
          );
        })}

        {/* Outer ring */}
        <circle cx="100" cy="100" r="88" fill="none" stroke="#C9FD48" strokeWidth="0.3" opacity="0.3" />

        {/* Center disc */}
        <circle cx="100" cy="100" r="35" fill="#18181b" />
        <circle cx="100" cy="100" r="36" fill="none" stroke="#C9FD48" strokeWidth="0.5" opacity="0.4" />
      </svg>

      {/* Center icons overlay */}
      <div className="absolute inset-0 flex items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center">
          <Phone className="w-5 h-5 text-[#C9FD48]" strokeWidth={1.5} />
        </div>
        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center">
          <Mail className="w-5 h-5 text-[#C9FD48]" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

function SupportHero() {
  const t = useTranslations("Support");

  return (
    <section className="w-full min-h-[60vh] md:min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 md:clamp-[px,12,24]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center gap-5 md:gap-8"
      >
        <SplitText
          text={t("hero.title")}
          tag="h1"
          className="text-[12vw] md:text-[8vw] font-black leading-[1.1] tracking-tight text-foreground uppercase"
          textAlign="center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed text-center md:w-2/3 lg:w-1/2"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ClockVisualization />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-8 md:clamp-[px,24,32] rounded-full bg-foreground text-background font-semibold clamp-[text,0.875rem,1rem] transition-all duration-200 hover:opacity-90"
          >
            <HeadphonesIcon className="w-5 h-5" strokeWidth={1.5} />
            {t("hero.cta")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   2. SUPPORT CHANNELS
   ═══════════════════════════════════════════════════════ */

function ChannelsSection() {
  const t = useTranslations("Support");

  const channels = [
    { icon: Phone, key: "phone" as const },
    { icon: Mail, key: "email" as const },
  ];

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("channels.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.75rem,3rem] font-bold leading-[1.1] text-foreground">
            {t("channels.title")}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 clamp-[gap,16,32]">
          {channels.map(({ icon: Icon, key }) => (
            <motion.div
              key={key}
              variants={itemVariant}
              className="relative clamp-[p,16,32] rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-[#C9FD48]/50 hover:shadow-lg hover:shadow-[#C9FD48]/5"
            >
              {/* Available badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {t("channels.available")}
                </span>
              </div>

              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-zinc-900 dark:bg-zinc-800 border border-zinc-700/50 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#C9FD48]" strokeWidth={1.5} />
              </div>

              <h3 className="clamp-[text,1.25rem,1.75rem] font-bold text-foreground mb-2">
                {t(`channels.${key}.title`)}
              </h3>
              <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed mb-5">
                {t(`channels.${key}.description`)}
              </p>

              <div className="flex flex-wrap gap-2">
                {t(`channels.${key}.features`).split(", ").map((feature, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center h-7 px-3 rounded-full bg-zinc-900 clamp-[text,0.75rem,0.875rem] font-medium text-[#C9FD48]"
                  >
                    {feature}
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

/* ═══════════════════════════════════════════════════════
   3. PROCESS — Horizontal Steps
   ═══════════════════════════════════════════════════════ */

const processIcons: LucideIcon[] = [Phone, Filter, Search, CheckCircle, MessageCircle];

function ProcessSection() {
  const t = useTranslations("Support");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48] bg-zinc-50 dark:bg-zinc-900/30">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center mb-6 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("process.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.5rem,3rem] font-bold leading-[1.1] text-foreground">
            {t("process.title")}
          </h2>
        </motion.div>

        {/* Mobile: Horizontal rows */}
        <div className="flex flex-col gap-4 md:hidden">
          {processIcons.map((Icon, i) => (
            <motion.div
              key={i}
              variants={itemVariant}
              className="flex items-center gap-4"
            >
              <div className="relative flex-shrink-0">
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C9FD48] text-black text-[10px] font-bold flex items-center justify-center z-10">
                  {i + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-zinc-900 dark:bg-zinc-800 border border-zinc-700/50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#C9FD48]" strokeWidth={1.5} />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {t(`process.steps.${i}.title`)}
                </h3>
                <p className="text-xs text-muted-foreground leading-snug">
                  {t(`process.steps.${i}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: 5-column grid */}
        <div className="hidden md:grid md:grid-cols-5 clamp-[gap,16,32]">
          {processIcons.map((Icon, i) => (
            <motion.div
              key={i}
              variants={itemVariant}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 dark:bg-zinc-800 border border-zinc-700/50 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[#C9FD48]" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#C9FD48] text-black text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <h3 className="clamp-[text,1.125rem,1.5rem] font-bold text-foreground mb-1">
                {t(`process.steps.${i}.title`)}
              </h3>
              <p className="clamp-[text,0.75rem,0.875rem] text-muted-foreground leading-relaxed">
                {t(`process.steps.${i}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function SupportPage() {
  return (
    <main className="min-h-screen w-full">
      <SupportHero />
      <ProcessSection />
    </main>
  );
}
