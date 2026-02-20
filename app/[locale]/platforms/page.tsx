"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Shuffle from "@/components/Shuffle";
import CountUp from "@/components/CountUp";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  Monitor,
  ArrowRight,
  Cloud,
  ShoppingCart,
  Users,
  Zap,
  Lock,
  Globe,
  Database,
  Server,
  BarChart3,
  Smartphone,
  Code2,
  GitBranch,
  Webhook,
  Bell,
  Search,
  Settings,
  TrendingUp,
  PieChart,
} from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
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

// Animated Plus to X Icon
function AnimatedPlusX({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      className="relative w-6 h-6 md:w-[1.5vw] md:h-[1.5vw]"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 w-full h-[2px] bg-current rounded-full origin-center"
        style={{ x: "-50%", y: "-50%" }}
        initial={false}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-full h-[2px] bg-current rounded-full origin-center"
        style={{ x: "-50%", y: "-50%" }}
        initial={false}
        animate={{ rotate: isOpen ? -45 : 90 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.div>
  );
}

// Hero Section with Container Scroll Animation
function PlatformsHero() {
  const t = useTranslations("Platforms");

  return (
    <section className="w-full overflow-hidden">
      <ContainerScroll
        titleComponent={
          <motion.div
            className="flex flex-col items-center gap-5 md:gap-[1.5vw]"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Title */}
            <motion.div variants={cardVariant}>
              <Shuffle
                text={t("hero.title")}
                tag="h1"
                className="text-[13vw] md:text-[10vw] font-black leading-[0.9] tracking-tight text-foreground"
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
            <motion.p
              variants={cardVariant}
              className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed px-4"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={cardVariant}>
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-8 md:px-[1.5vw] rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02] overflow-hidden"
              >
                <Monitor className="h-4 w-4" />
                <span>{t("hero.cta")}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        }
      >
        {/* Dashboard Mockup */}
        <div className="h-full w-full p-3 md:p-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-3 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#C9FD48] flex items-center justify-center">
                <Monitor className="w-3.5 h-3.5 md:w-4 md:h-4 text-black" />
              </div>
              <span className="text-white font-semibold text-xs md:text-base">Dashboard</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-3">
              {/* Mobile: bottom nav icons */}
              <div className="hidden md:flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Search className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-zinc-400" />
                </div>
              </div>
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#C9FD48]" />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-2 md:gap-4 h-[calc(100%-2.5rem)] md:h-[calc(100%-3rem)]">
            {/* Sidebar - hidden on mobile */}
            <div className="hidden md:block md:col-span-2 space-y-2">
              <div className="h-10 rounded-lg bg-[#C9FD48]/20 border border-[#C9FD48]/30 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-[#C9FD48]" />
              </div>
              {[Users, ShoppingCart, Settings, Database].map((Icon, i) => (
                <div key={i} className="h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-zinc-500" />
                </div>
              ))}
            </div>

            {/* Main Area */}
            <div className="col-span-12 md:col-span-10 space-y-2 md:space-y-4">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-1.5 md:gap-3">
                <div className="rounded-lg md:rounded-xl bg-zinc-800/50 p-2 md:p-4">
                  <div className="flex items-center gap-1.5 mb-1 md:mb-2">
                    <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-[#C9FD48]" />
                    <span className="text-zinc-400 text-[10px] md:text-xs">Revenue</span>
                  </div>
                  <div className="text-white font-bold text-sm md:text-xl">$48.2k</div>
                </div>
                <div className="rounded-lg md:rounded-xl bg-zinc-800/50 p-2 md:p-4">
                  <div className="flex items-center gap-1.5 mb-1 md:mb-2">
                    <Users className="w-3 h-3 md:w-4 md:h-4 text-[#C9FD48]" />
                    <span className="text-zinc-400 text-[10px] md:text-xs">Users</span>
                  </div>
                  <div className="text-white font-bold text-sm md:text-xl">2,847</div>
                </div>
                <div className="rounded-lg md:rounded-xl bg-zinc-800/50 p-2 md:p-4">
                  <div className="flex items-center gap-1.5 mb-1 md:mb-2">
                    <PieChart className="w-3 h-3 md:w-4 md:h-4 text-[#C9FD48]" />
                    <span className="text-zinc-400 text-[10px] md:text-xs">Growth</span>
                  </div>
                  <div className="text-white font-bold text-sm md:text-xl">+24%</div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="flex-1 rounded-lg md:rounded-xl bg-zinc-800/30 p-2 md:p-4 min-h-[80px] md:min-h-[180px]">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-zinc-400 text-[10px] md:text-sm">Analytics Overview</span>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C9FD48]" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-zinc-600" />
                  </div>
                </div>
                {/* Fake Chart Bars */}
                <div className="flex items-end justify-between gap-[3px] md:gap-2 h-[60px] md:h-[120px] pt-2 md:pt-4">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-[#C9FD48]/20 to-[#C9FD48]/60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile bottom nav */}
              <div className="flex md:hidden items-center justify-around rounded-lg bg-zinc-800/50 py-2">
                <div className="flex flex-col items-center gap-0.5">
                  <BarChart3 className="w-4 h-4 text-[#C9FD48]" />
                </div>
                {[Users, ShoppingCart, Search, Settings].map((Icon, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <Icon className="w-4 h-4 text-zinc-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}

// Platform Types Bento Grid
function PlatformTypesSection() {
  const t = useTranslations("Platforms");

  const types = [
    { icon: Cloud, index: 0 },
    { icon: ShoppingCart, index: 1 },
    { icon: Users, index: 2 },
  ];

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        {/* Section Header */}
        <motion.div variants={cardVariant} className="mb-6 md:mb-[2vw]">
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-2 md:mb-[0.5vw]">
            <div className="w-1.5 h-1.5 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("types.label")}
            </span>
          </div>
          <div className="flex flex-col gap-4 md:gap-[1.5vw]">
            <Shuffle
              text={t("types.title")}
              tag="h2"
              className="text-[13vw] md:text-[7vw] font-black leading-[0.9] tracking-tight text-foreground"
              textAlign="left"
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
            <div className="border-l-2 border-[#C9FD48] pl-4 md:pl-[1vw]">
              <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed">
                {t("types.description")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[1.5vw]">
          {types.map((type) => (
            <motion.div
              key={type.index}
              variants={cardVariant}
              className="group"
            >
              <div className="relative h-full rounded-2xl md:rounded-3xl bg-zinc-900 dark:bg-zinc-100 overflow-hidden p-6 md:p-[1.5vw] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer aspect-auto md:aspect-square flex flex-col">
                {/* Large number background */}
                <div className="absolute -top-4 -right-4 text-[25vw] md:text-[10vw] font-black leading-none select-none pointer-events-none text-white/[0.03] dark:text-black/[0.03]">
                  {String(type.index + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-zinc-800 dark:bg-zinc-900 flex items-center justify-center mb-auto">
                  <type.icon className="w-7 h-7 md:w-8 md:h-8 text-[#C9FD48]" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-auto">
                  <h3 className="text-lg md:text-[1.45vw] font-bold text-white dark:text-black mb-1 md:mb-[0.4vw]">
                    {t(`types.items.${type.index}.title`)}
                  </h3>
                  <p className="clamp-[text,0.875rem,1rem] text-white/60 dark:text-black/60 leading-relaxed mb-3 md:mb-[0.6vw]">
                    {t(`types.items.${type.index}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-[0.3vw]">
                    {t(`types.items.${type.index}.features`).split(", ").map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 clamp-[text,0.75rem,0.875rem] font-medium bg-white/10 dark:bg-black/10 text-white/70 dark:text-black/70 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Features Accordion Section
function FeaturesSection() {
  const t = useTranslations("Platforms");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const features = [
    { icon: Zap, index: 0 },
    { icon: Lock, index: 1 },
    { icon: Globe, index: 2 },
  ];

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

        {/* Right Column - List */}
        <div className="lg:w-[60%] lg:pl-[2vw] lg:border-l border-zinc-200 dark:border-zinc-800">
          {features.map((feature) => {
            const isOpen = openIndex === feature.index;

            return (
              <div
                key={feature.index}
                className="border-b border-zinc-200 dark:border-zinc-800"
              >
                <button
                  onClick={() => toggleItem(feature.index)}
                  className="w-full py-4 md:py-[1vw] flex items-center justify-between gap-3 md:gap-[0.8vw] text-left group"
                >
                  <div className="flex items-center gap-3 md:gap-[0.8vw]">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#C9FD48]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base md:text-[1.45vw] font-semibold text-foreground leading-tight transition-[font-weight] duration-300 ease-out group-hover:font-bold">
                      {t(`features.items.${feature.index}.title`)}
                    </h3>
                  </div>
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
                      <div className="pb-4 md:pb-[1.5vw] pl-[52px] md:pl-[3.5vw] pr-0 md:pr-[3vw]">
                        <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed mb-2 md:mb-[0.5vw]">
                          {t(`features.items.${feature.index}.description`)}
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-[0.4vw]">
                          {t(`features.items.${feature.index}.points`).split(", ").map((item, i) => (
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

// Bento Grid Section
function BentoGridSection() {
  const t = useTranslations("Platforms");

  const bentoItems = [
    { key: "architecture", icon: Server, span: "md:col-span-2 md:row-span-2" },
    { key: "security", icon: Lock, span: "" },
    { key: "api", icon: Webhook, span: "" },
    { key: "analytics", icon: BarChart3, span: "" },
    { key: "responsive", icon: Smartphone, span: "" },
  ];

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={cardVariant} className="mb-6 md:mb-[2vw]">
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-2 md:mb-[0.5vw]">
            <div className="w-1.5 h-1.5 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("bento.label")}
            </span>
          </div>
          <h2 className="text-[7vw] md:text-[2.5vw] font-bold leading-tight text-foreground">
            {t("bento.title")}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-[1vw]">
          {bentoItems.map((item) => (
            <motion.div
              key={item.key}
              variants={cardVariant}
              className={item.span}
            >
              <div className={`h-full rounded-2xl md:rounded-3xl bg-zinc-900 dark:bg-zinc-100 p-6 md:p-[1.5vw] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.span.includes("row-span-2") ? "min-h-[200px] md:min-h-full" : ""}`}>
                <div className="h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 dark:bg-zinc-900 flex items-center justify-center mb-3 md:mb-[0.5vw]">
                    <item.icon className="w-6 h-6 text-[#C9FD48]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg md:text-[1.2vw] font-bold text-white dark:text-black mb-1 md:mb-[0.3vw]">
                    {t(`bento.items.${item.key}.title`)}
                  </h3>
                  <p className="clamp-[text,0.875rem,1rem] text-white/60 dark:text-black/60 leading-relaxed">
                    {t(`bento.items.${item.key}.description`)}
                  </p>

                  {/* Visual for large card */}
                  {item.span.includes("row-span-2") && (
                    <div className="flex-1 flex items-center justify-center mt-[2vw] md:mt-[1vw] min-h-[100px]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-zinc-800 dark:bg-zinc-900 flex items-center justify-center">
                          <Server className="w-6 h-6 text-[#C9FD48]" />
                        </div>
                        <div className="w-6 h-[2px] bg-white/20 dark:bg-black/20" />
                        <div className="w-12 h-12 rounded-xl bg-zinc-800 dark:bg-zinc-900 flex items-center justify-center">
                          <Database className="w-6 h-6 text-[#C9FD48]" />
                        </div>
                        <div className="w-6 h-[2px] bg-white/20 dark:bg-black/20" />
                        <div className="w-12 h-12 rounded-xl bg-zinc-800 dark:bg-zinc-900 flex items-center justify-center">
                          <Cloud className="w-6 h-6 text-[#C9FD48]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Tech Stack Section
function TechStackSection() {
  const t = useTranslations("Platforms");
  const [openStack, setOpenStack] = useState<number | null>(0);

  const technologies = {
    frontend: [
      { name: "React", icon: "https://svgl.app/library/react_dark.svg" },
      { name: "Next.js", icon: "https://svgl.app/library/nextjs_icon_dark.svg" },
      { name: "TypeScript", icon: "https://svgl.app/library/typescript.svg" },
      { name: "Tailwind CSS", icon: "https://svgl.app/library/tailwindcss.svg" },
    ],
    backend: [
      { name: "Node.js", icon: "https://svgl.app/library/nodejs.svg" },
      { name: "Express.js", icon: "https://svgl.app/library/expressjs_dark.svg" },
      { name: "Fastify", icon: "https://svgl.app/library/fastify_dark.svg" },
      { name: "NestJS", icon: "https://svgl.app/library/nestjs.svg" },
    ],
    database: [
      { name: "PostgreSQL", icon: "https://svgl.app/library/postgresql.svg" },
      { name: "MongoDB", icon: "https://svgl.app/library/mongodb-icon-light.svg" },
      { name: "MySQL", icon: "https://svgl.app/library/mysql-icon-light.svg" },
      { name: "Redis", icon: "https://svgl.app/library/redis.svg" },
      { name: "Supabase", icon: "https://svgl.app/library/supabase.svg" },
      { name: "Firebase", icon: "https://svgl.app/library/firebase.svg" },
    ],
    devops: [
      { name: "Docker", icon: "https://svgl.app/library/docker.svg" },
      { name: "Kubernetes", icon: "https://svgl.app/library/kubernetes.svg" },
      { name: "AWS", icon: "https://svgl.app/library/aws.svg" },
      { name: "GitHub", icon: "https://svgl.app/library/github-light.svg" },
    ],
  };

  const categories = [
    { key: "frontend" as const, icon: Code2 },
    { key: "backend" as const, icon: Server },
    { key: "database" as const, icon: Database },
    { key: "devops" as const, icon: GitBranch },
  ];

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48] bg-zinc-50 dark:bg-zinc-950">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={cardVariant} className="mb-6 md:mb-[2vw]">
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-2 md:mb-[0.5vw]">
            <div className="w-1.5 h-1.5 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("stack.label")}
            </span>
          </div>
          <h2 className="text-[7vw] md:text-[2.5vw] font-bold leading-tight text-foreground">
            {t("stack.title")}
          </h2>
        </motion.div>

        {/* Mobile: Accordion */}
        <div className="md:hidden">
          {categories.map((category, idx) => {
            const isOpen = openStack === idx;
            return (
              <motion.div key={category.key} variants={cardVariant} className="border-b border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => setOpenStack(isOpen ? null : idx)}
                  className="w-full py-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-[#C9FD48]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {t(`stack.categories.${category.key}.title`)}
                    </h3>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center text-muted-foreground">
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
                      <div className="flex flex-wrap gap-2 pb-4">
                        {technologies[category.key].map((tech, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                          >
                            <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
                            <span className="text-xs font-medium text-foreground">{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-[1.5vw]">
          {categories.map((category) => (
            <motion.div key={category.key} variants={cardVariant}>
              <div className="flex items-center gap-[0.5vw] mb-[0.8vw]">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-[#C9FD48]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[1.1vw] font-semibold text-foreground">
                  {t(`stack.categories.${category.key}.title`)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-[0.4vw]">
                {technologies[category.key].map((tech, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-[0.7vw] py-[0.3vw] rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
                    <span className="clamp-[text,0.75rem,0.875rem] font-medium text-foreground">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Scroll-driven step component
function ProcessStep({
  step,
  stepIndex,
  phaseKey,
  scrollYProgress
}: {
  step: { num: number; key: string };
  stepIndex: number;
  phaseKey: string;
  scrollYProgress: import("framer-motion").MotionValue<number>;
}) {
  const t = useTranslations("Platforms");
  const x = useTransform(scrollYProgress, [0, 1], [0, stepIndex * 20]);

  return (
    <motion.div
      style={{ x }}
      className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black md:w-fit"
    >
      <span className="w-6 h-6 rounded-full bg-zinc-700 dark:bg-zinc-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
        {step.num}
      </span>
      <span className="text-xs md:clamp-[text,0.75rem,0.875rem] font-medium md:whitespace-nowrap">
        {t(`process.phases.${phaseKey}.steps.${step.key}`)}
      </span>
    </motion.div>
  );
}

// Development Process Section
function ProcessSection() {
  const t = useTranslations("Platforms");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const phases = [
    {
      key: "discovery",
      steps: [
        { num: 1, key: "strategy" },
        { num: 2, key: "requirements" },
        { num: 3, key: "audit" },
        { num: 4, key: "architecture" },
      ],
    },
    {
      key: "design",
      steps: [
        { num: 5, key: "ux" },
        { num: 6, key: "prototypes" },
        { num: 7, key: "ui" },
      ],
    },
    {
      key: "development",
      steps: [
        { num: 8, key: "frontend" },
        { num: 9, key: "backend" },
        { num: 10, key: "testing" },
      ],
    },
    {
      key: "launch",
      steps: [
        { num: 11, key: "deployment" },
        { num: 12, key: "support" },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={cardVariant} className="mb-6 md:mb-[2vw]">
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-2 md:mb-[0.5vw]">
            <div className="w-1.5 h-1.5 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("process.label")}
            </span>
          </div>
          <h2 className="text-[7vw] md:text-[2.5vw] font-bold leading-tight text-foreground">
            {t("process.title")}
          </h2>
        </motion.div>

        {/* Timeline - Mobile: vertical timeline */}
        <motion.div variants={cardVariant}>
          {/* Mobile timeline */}
          <div className="md:hidden flex flex-col gap-5">
            {phases.map((phase) => (
              <div key={phase.key}>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {t(`process.phases.${phase.key}.title`)}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {phase.steps.map((step) => (
                    <div
                      key={step.num}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black"
                    >
                      <span className="w-5 h-5 rounded-full bg-zinc-700 dark:bg-zinc-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {step.num}
                      </span>
                      <span className="text-xs font-medium">
                        {t(`process.phases.${phase.key}.steps.${step.key}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop timeline */}
          <div className="hidden md:block">
            <div className="w-full h-px bg-zinc-300 dark:bg-zinc-700 mb-[1.5vw]" />

            <div className="grid grid-cols-4 gap-[1vw]">
              {phases.map((phase) => (
                <div key={phase.key} className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

                  <div className="pl-[1.2vw]">
                    <h3 className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground mb-[1vw]">
                      {t(`process.phases.${phase.key}.title`)}
                    </h3>

                    <div className="flex flex-col gap-[0.5vw]">
                      {phase.steps.map((step, stepIndex) => (
                        <ProcessStep
                          key={step.num}
                          step={step}
                          stepIndex={stepIndex}
                          phaseKey={phase.key}
                          scrollYProgress={scrollYProgress}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const t = useTranslations("Platforms");

  const stats = [
    { index: 0, icon: Zap },
    { index: 1, icon: Monitor },
    { index: 2, icon: Users },
  ];

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={cardVariant} className="mb-6 md:mb-[2vw]">
          <div className="flex items-center gap-2 md:gap-[0.4vw] mb-2 md:mb-[0.5vw]">
            <div className="w-1.5 h-1.5 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("stats.label")}
            </span>
          </div>
          <h2 className="text-[7vw] md:text-[2.5vw] font-bold leading-tight text-foreground">
            {t("stats.title")}
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-[1.5vw]">
          {stats.map((stat) => (
            <motion.div
              key={stat.index}
              variants={cardVariant}
            >
              <div className="rounded-2xl md:rounded-3xl bg-zinc-900 dark:bg-zinc-100 p-6 md:p-[1.5vw] flex items-center gap-4 md:flex-col md:items-start md:justify-between md:aspect-[4/3]">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-zinc-800 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                  <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-[#C9FD48]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="flex items-baseline gap-1 md:gap-[0.5vw] md:mb-[0.5vw]">
                    <span className="text-3xl md:text-[3.5vw] font-black text-white dark:text-black leading-none">
                      {t(`stats.items.${stat.index}.value`)}
                    </span>
                    <span className="text-lg md:text-[1.8vw] font-black text-[#C9FD48]">
                      {t(`stats.items.${stat.index}.suffix`)}
                    </span>
                  </div>
                  <p className="text-sm md:clamp-[text,0.875rem,1rem] text-white/60 dark:text-black/60 mt-0.5">
                    {t(`stats.items.${stat.index}.label`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// CTA Section
function PlatformsCTA() {
  const t = useTranslations("Platforms");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        <motion.div variants={cardVariant}>
          <Link href="/contact" className="block group">
            <div className="relative rounded-2xl md:rounded-3xl bg-[#C9FD48] overflow-hidden py-4 md:py-[0.8vw] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9FD48]/40 hover:brightness-105">
              {/* First text */}
              <span className="block text-[5.5vw] md:text-[3vw] font-black text-black uppercase text-center transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0 relative z-10">
                {t("cta.title")}
              </span>
              {/* Second text */}
              <span className="absolute inset-0 flex items-center justify-center text-[5.5vw] md:text-[3vw] font-black text-black uppercase translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10">
                {t("cta.button")}
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Contact text */}
        <motion.div variants={cardVariant} className="mt-4 md:mt-[1vw] text-center">
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

// Main Page Component
export default function PlatformsPage() {
  return (
    <main className="min-h-screen w-full">
      <PlatformsHero />
      <PlatformTypesSection />
      <FeaturesSection />
      <ProcessSection />
      <BentoGridSection />
      <TechStackSection />
      <StatsSection />
      <PlatformsCTA />
    </main>
  );
}
