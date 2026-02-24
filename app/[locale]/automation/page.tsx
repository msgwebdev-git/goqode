"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Shuffle from "@/components/Shuffle";
import {
  Cog,
  ArrowRight,
  Bot,
  Database,
  Mail,
  Users,
  LucideIcon,
  Workflow,
  Send,
  FileBarChart,
  Search,
  PenTool,
  Code2,
  TestTube,
  Rocket,
  X,
  Check,
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

function AutomationHero() {
  const t = useTranslations("Automation");

  return (
    <section className="w-full flex flex-col items-center px-6 md:clamp-[px,12,24] pt-28 md:pt-36 pb-6">
      <motion.div
        className="flex flex-col items-center gap-5 md:gap-6 text-center w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title */}
        <motion.div variants={itemVariant} className="w-full">
          <Shuffle
            text={t("hero.title")}
            tag="h1"
            className="text-[9vw] md:text-[8vw] font-black leading-[0.9] tracking-tight text-foreground"
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
          className="clamp-[text,1rem,1.5rem] text-muted-foreground leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariant}>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-8 md:clamp-[px,24,32] rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02] overflow-hidden"
          >
            <span className="whitespace-nowrap">{t("hero.cta")}</span>
            <ArrowRight className="h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   2. TYPES SECTION — Bento Grid
   ═══════════════════════════════════════════════════════ */

const typeIcons: LucideIcon[] = [
  Bot,
  Database,
  Mail,
  Send,
  Workflow,
  FileBarChart,
];

function AutomationTypesSection() {
  const t = useTranslations("Automation");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        {/* Header */}
        <motion.div
          variants={itemVariant}
          className="text-center mb-6 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("types.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.5rem,3rem] font-bold leading-tight text-foreground">
            {t("types.title")}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:clamp-[gap,8,12]">
          {typeIcons.map((Icon, i) => (
            <motion.div
              key={i}
              variants={itemVariant}
              className="relative p-4 md:clamp-[p,12,20] rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center mb-3">
                  <Icon
                    className="w-6 h-6 text-[#C9FD48]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="clamp-[text,1.125rem,1.5rem] font-bold text-foreground mb-2">
                  {t(`types.items.${i}.title`)}
                </h3>
                <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed">
                  {t(`types.items.${i}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   3. COMPARISON SECTION — Before / After Table
   ═══════════════════════════════════════════════════════ */

const comparisonKeys = ["0", "1", "2", "3", "4"];

function AutomationComparisonSection() {
  const t = useTranslations("Automation");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        {/* Header */}
        <motion.div
          variants={itemVariant}
          className="text-center mb-6 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("comparison.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.5rem,3rem] font-bold leading-tight text-foreground">
            {t("comparison.title")}
          </h2>
        </motion.div>

        {/* Mobile: Comparison Cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {comparisonKeys.map((key) => (
            <motion.div
              key={key}
              variants={itemVariant}
              className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4"
            >
              <span className="text-sm font-bold text-foreground">
                {t(`comparison.before.items.${key}.label`)}
              </span>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-red-500 line-through">
                  {t(`comparison.before.items.${key}.value`)}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-zinc-900 text-xs font-bold text-[#C9FD48]">
                  {t(`comparison.after.items.${key}.value`)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Comparison Table */}
        <div className="hidden md:block w-full md:max-w-4xl md:mx-auto rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {/* Header row */}
          <div className="grid grid-cols-3 bg-zinc-100 dark:bg-zinc-900">
            <div className="clamp-[p,8,12]" />
            <div className="clamp-[p,8,12] text-center border-x border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-center gap-2">
                <X className="w-4 h-4 text-red-500" />
                <span className="clamp-[text,0.75rem,0.875rem] font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("comparison.before.title")}
                </span>
              </div>
            </div>
            <div className="clamp-[p,8,12] text-center">
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-[#C9FD48] bg-zinc-900 rounded-full p-0.5" />
                <span className="clamp-[text,0.75rem,0.875rem] font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("comparison.after.title")}
                </span>
              </div>
            </div>
          </div>

          {/* Data rows */}
          {comparisonKeys.map((key, i) => (
            <motion.div
              key={key}
              variants={itemVariant}
              className={`grid grid-cols-3 ${
                i % 2 === 0
                  ? "bg-white dark:bg-zinc-950"
                  : "bg-zinc-50 dark:bg-zinc-900/50"
              }`}
            >
              <div className="clamp-[p,8,12] flex items-center">
                <span className="clamp-[text,0.875rem,1rem] font-medium text-foreground">
                  {t(`comparison.before.items.${key}.label`)}
                </span>
              </div>
              <div className="clamp-[p,8,12] flex items-center justify-center border-x border-zinc-200 dark:border-zinc-800">
                <span className="clamp-[text,0.875rem,1rem] text-red-500 line-through">
                  {t(`comparison.before.items.${key}.value`)}
                </span>
              </div>
              <div className="clamp-[p,8,12] flex items-center justify-center">
                <span className="inline-flex items-center h-7 px-3 rounded-full bg-zinc-900 clamp-[text,0.875rem,1rem] font-bold text-[#C9FD48]">
                  {t(`comparison.after.items.${key}.value`)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   4. PROCESS SECTION — Vertical Steps
   ═══════════════════════════════════════════════════════ */

const processIcons: LucideIcon[] = [
  Search,
  PenTool,
  Code2,
  TestTube,
  Rocket,
];

function AutomationProcessSection() {
  const t = useTranslations("Automation");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48] bg-zinc-50 dark:bg-zinc-900/30">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        {/* Header */}
        <motion.div
          variants={itemVariant}
          className="text-center mb-6 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("process.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.5rem,3rem] font-bold leading-tight text-foreground">
            {t("process.title")}
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative md:max-w-3xl md:mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9FD48]/50 via-[#C9FD48]/20 to-transparent" />

          <div className="space-y-6 md:space-y-8">
            {processIcons.map((Icon, i) => (
              <motion.div
                key={i}
                variants={itemVariant}
                className="relative flex items-start gap-4 md:gap-6"
              >
                {/* Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <Icon
                      className="w-5 h-5 md:w-6 md:h-6 text-[#C9FD48]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9FD48] text-black text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-2 md:pt-3">
                  <h3 className="clamp-[text,1.125rem,1.5rem] font-bold text-foreground mb-1">
                    {t(`process.steps.${i}.title`)}
                  </h3>
                  <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed">
                    {t(`process.steps.${i}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   5. RESULTS SECTION — CountUp Numbers
   ═══════════════════════════════════════════════════════ */

function CountUpNumber({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function AutomationResultsSection() {
  const t = useTranslations("Automation");

  const metrics = [
    { value: 70, suffix: "%", key: "0" },
    { value: 3, suffix: "\u00d7", key: "1" },
    { value: 24, suffix: "/7", key: "2" },
    { value: 0, suffix: "", key: "3" },
  ];

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        {/* Header */}
        <motion.div
          variants={itemVariant}
          className="text-center mb-6 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("results.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.5rem,3rem] font-bold leading-tight text-foreground">
            {t("results.title")}
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:clamp-[gap,12,20]">
          {metrics.map((metric) => (
            <motion.div
              key={metric.key}
              variants={itemVariant}
              className="relative clamp-[p,12,20] rounded-2xl bg-zinc-950 text-center overflow-hidden"
            >
              <div className="relative">
                <div className="clamp-[text,2rem,4rem] font-black text-[#C9FD48] leading-none mb-2">
                  <CountUpNumber
                    target={metric.value}
                    suffix={metric.suffix}
                  />
                </div>
                <p className="clamp-[text,0.875rem,1rem] text-zinc-400 leading-relaxed">
                  {t(`results.metrics.${metric.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════
   7. CTA SECTION
   ═══════════════════════════════════════════════════════ */

function AutomationCTASection() {
  const t = useTranslations("Automation");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
      >
        {/* CTA Card */}
        <motion.div variants={itemVariant}>
          <Link href="/contact" className="block group">
            <div className="relative rounded-2xl md:rounded-3xl bg-[#C9FD48] overflow-hidden py-6 md:py-12 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9FD48]/40 hover:brightness-105">
              {/* Content — text swap on hover */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                <span className="block text-[5.5vw] md:text-[4vw] lg:text-[3vw] font-black text-black uppercase transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                  {t("cta.title")}
                </span>
                <span className="absolute inset-0 flex items-center justify-center text-[5.5vw] md:text-[4vw] lg:text-[3vw] font-black text-black uppercase translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="flex items-center gap-3">
                    {t("cta.button")}
                    <ArrowRight className="w-[4vw] md:w-[3vw] lg:w-[2vw] h-[4vw] md:h-[3vw] lg:h-[2vw] min-w-6 min-h-6" />
                  </span>
                </span>
              </div>

            </div>
          </Link>
        </motion.div>

        {/* Contact */}
        <motion.div
          variants={itemVariant}
          className="mt-4 md:mt-8 text-center"
        >
          <p className="clamp-[text,0.875rem,1rem] text-muted-foreground">
            {t("cta.contactText")}{" "}
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
   DEMO SECTION — Live Automation Pipeline
   ═══════════════════════════════════════════════════════ */

const DEMO_ICONS: LucideIcon[] = [Bot, Database, Mail, Users];
const DEMO_TIMES = ["0.4s", "1.1s", "1.8s", "2.5s"];

const demoContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const demoStep = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const demoLine = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

function AutomationDemoSection() {
  const t = useTranslations("Automation");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-zinc-950 flex flex-col items-center justify-center px-6 md:clamp-[px,12,24] clamp-[py,24,48] relative overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,253,72,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,253,72,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-zinc-500 uppercase tracking-wider">
              {t("demo.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.5rem,3rem] font-bold leading-tight text-white">
            {t("demo.title")}
          </h2>
        </motion.div>

        {/* Pipeline */}
        <motion.div
          variants={demoContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="flex flex-col lg:flex-row items-center w-full justify-center"
        >
          {/* Trigger */}
          <motion.div variants={demoStep} className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#C9FD48] flex items-center justify-center shadow-[0_0_30px_rgba(201,253,72,0.3)]">
              <Cog className="w-7 h-7 md:w-8 md:h-8 text-black" strokeWidth={1.5} />
            </div>
            <span className="mt-2 text-sm font-semibold text-white">
              {t("demo.trigger")}
            </span>
            <span className="text-xs text-zinc-500 mt-0.5">0.0s</span>
          </motion.div>

          {/* Steps */}
          {DEMO_ICONS.map((Icon, i) => (
            <div key={i} className="flex flex-col lg:flex-row items-center">
              {/* Connector */}
              <motion.div
                variants={demoLine}
                className="w-px h-8 lg:w-12 xl:w-20 lg:h-px bg-[#C9FD48]/30 origin-top lg:origin-left"
              />

              {/* Step */}
              <motion.div variants={demoStep} className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#C9FD48]" strokeWidth={1.5} />
                  </div>
                  {/* Check badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.2, ease: "backOut" }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9FD48] flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-black" strokeWidth={2.5} />
                  </motion.div>
                </div>
                <span className="mt-2 text-sm font-semibold text-white">
                  {t(`demo.steps.${i}.title`)}
                </span>
                <span className="text-xs text-zinc-500 mt-0.5">
                  {t(`demo.steps.${i}.desc`)}
                </span>
                <span className="text-[10px] text-[#C9FD48]/60 font-mono mt-1">
                  {DEMO_TIMES[i]}
                </span>
              </motion.div>
            </div>
          ))}

          {/* Final connector */}
          <motion.div
            variants={demoLine}
            className="w-px h-8 lg:w-12 xl:w-20 lg:h-px bg-[#C9FD48]/30 origin-top lg:origin-left"
          />

          {/* Done */}
          <motion.div variants={demoStep} className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#C9FD48] flex items-center justify-center">
              <Check className="w-7 h-7 md:w-8 md:h-8 text-[#C9FD48]" strokeWidth={2} />
            </div>
            <span className="mt-2 text-sm font-semibold text-[#C9FD48]">
              {t("demo.done")}
            </span>
            <span className="text-xs text-zinc-500 mt-0.5">3.0s</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function AutomationPage() {
  return (
    <main className="min-h-screen w-full">
      <AutomationHero />
      <AutomationTypesSection />
      <AutomationDemoSection />
      <AutomationComparisonSection />
      <AutomationProcessSection />
      <AutomationResultsSection />
      <AutomationCTASection />
    </main>
  );
}
