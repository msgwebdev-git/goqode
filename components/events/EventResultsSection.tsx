"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Globe, Smartphone, Server, Cloud } from "lucide-react";
import Image from "next/image";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

// Frontend technologies
const frontendStack = [
  { name: "Next.js", logo: "https://svgl.app/library/nextjs_icon_dark.svg", logoDark: "https://svgl.app/library/nextjs_icon_dark.svg" },
  { name: "React", logo: "https://svgl.app/library/react.svg" },
  { name: "TypeScript", logo: "https://svgl.app/library/typescript.svg" },
  { name: "Tailwind", logo: "https://svgl.app/library/tailwindcss.svg" },
];

// Backend technologies
const backendStack = [
  { name: "Node.js", logo: "https://svgl.app/library/nodejs.svg" },
  { name: "PostgreSQL", logo: "https://svgl.app/library/postgresql.svg" },
  { name: "Prisma", logo: "https://svgl.app/library/prisma.svg", logoDark: "https://svgl.app/library/prisma_dark.svg" },
  { name: "Redis", logo: "https://svgl.app/library/redis.svg" },
];

// Infrastructure technologies
const infraStack = [
  { name: "Docker", logo: "https://svgl.app/library/docker.svg" },
  { name: "Vercel", logo: "https://svgl.app/library/vercel.svg", logoDark: "https://svgl.app/library/vercel_dark.svg" },
  { name: "Railway", logo: "https://svgl.app/library/railway.svg", logoDark: "https://svgl.app/library/railway_dark.svg" },
  { name: "GitHub Actions", logo: "https://svgl.app/library/github.svg", logoDark: "https://svgl.app/library/github_dark.svg" },
];

// Mobile technologies
const mobileStack = [
  { name: "Flutter", logo: "https://svgl.app/library/flutter.svg" },
  { name: "Dart", logo: "https://svgl.app/library/dart.svg" },
  { name: "Firebase", logo: "https://svgl.app/library/firebase.svg" },
  { name: "Supabase", logo: "https://svgl.app/library/supabase.svg" },
];

function TechBadge({ name, logo, logoDark }: { name: string; logo: string; logoDark?: string }) {
  return (
    <motion.div
      variants={itemVariant}
      className="group flex flex-col items-center gap-2"
    >
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-all duration-300 group-hover:border-[#C9FD48]/50 group-hover:shadow-lg group-hover:shadow-[#C9FD48]/10 group-hover:scale-105">
        {/* Light mode logo */}
        <Image
          src={logo}
          alt={name}
          width={32}
          height={32}
          className={`w-7 h-7 md:w-8 md:h-8 object-contain ${logoDark ? 'dark:hidden' : ''}`}
        />
        {/* Dark mode logo (if different) */}
        {logoDark && (
          <Image
            src={logoDark}
            alt={name}
            width={32}
            height={32}
            className="w-7 h-7 md:w-8 md:h-8 object-contain hidden dark:block"
          />
        )}
      </div>
      <span className="text-[10px] md:text-xs text-muted-foreground font-medium text-center leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

interface StackCardProps {
  icon: React.ReactNode;
  titleKey: string;
  subtitleKey: string;
  stack: { name: string; logo: string; logoDark?: string }[];
  t: ReturnType<typeof useTranslations>;
}

function StackCard({ icon, titleKey, subtitleKey, stack, t }: StackCardProps) {
  return (
    <motion.div
      variants={itemVariant}
      className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 md:p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-zinc-900 dark:bg-[#C9FD48]/10 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">{t(titleKey)}</h3>
          <p className="text-xs text-muted-foreground">{t(subtitleKey)}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {stack.map((tech) => (
          <TechBadge key={tech.name} {...tech} />
        ))}
      </div>
    </motion.div>
  );
}

export function EventResultsSection() {
  const t = useTranslations("Events");

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48] bg-zinc-50 dark:bg-zinc-900/50">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="w-full max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center mb-10 lg:mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("stack.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.75rem,3rem] font-bold leading-tight text-foreground">
            {t("stack.title")}
          </h2>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Frontend */}
          <StackCard
            icon={<Globe className="w-5 h-5 text-[#C9FD48]" />}
            titleKey="stack.frontend.title"
            subtitleKey="stack.frontend.subtitle"
            stack={frontendStack}
            t={t}
          />

          {/* Backend */}
          <StackCard
            icon={<Server className="w-5 h-5 text-[#C9FD48]" />}
            titleKey="stack.backend.title"
            subtitleKey="stack.backend.subtitle"
            stack={backendStack}
            t={t}
          />

          {/* Infrastructure */}
          <StackCard
            icon={<Cloud className="w-5 h-5 text-[#C9FD48]" />}
            titleKey="stack.infra.title"
            subtitleKey="stack.infra.subtitle"
            stack={infraStack}
            t={t}
          />

          {/* Mobile */}
          <StackCard
            icon={<Smartphone className="w-5 h-5 text-[#C9FD48]" />}
            titleKey="stack.mobile.title"
            subtitleKey="stack.mobile.subtitle"
            stack={mobileStack}
            t={t}
          />
        </div>
      </motion.div>
    </section>
  );
}
