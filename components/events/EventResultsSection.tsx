"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
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

const categories = [
  { icon: Globe, titleKey: "stack.frontend.title", subtitleKey: "stack.frontend.subtitle", stack: frontendStack },
  { icon: Server, titleKey: "stack.backend.title", subtitleKey: "stack.backend.subtitle", stack: backendStack },
  { icon: Cloud, titleKey: "stack.infra.title", subtitleKey: "stack.infra.subtitle", stack: infraStack },
  { icon: Smartphone, titleKey: "stack.mobile.title", subtitleKey: "stack.mobile.subtitle", stack: mobileStack },
];

function AnimatedPlusX({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      className="relative w-5 h-5"
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

function TechBadge({ name, logo, logoDark }: { name: string; logo: string; logoDark?: string }) {
  return (
    <motion.div
      variants={itemVariant}
      className="group flex flex-col items-center gap-2"
    >
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-all duration-300 group-hover:border-[#C9FD48]/50 group-hover:shadow-lg group-hover:shadow-[#C9FD48]/10 group-hover:scale-105">
        <Image
          src={logo}
          alt={name}
          width={32}
          height={32}
          className={`w-7 h-7 md:w-8 md:h-8 object-contain ${logoDark ? 'dark:hidden' : ''}`}
        />
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
  const [openStack, setOpenStack] = useState<number | null>(0);

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,24,48] bg-zinc-50 dark:bg-zinc-900/50">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="w-full md:max-w-6xl md:mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center mb-6 md:mb-10">
          <div className="flex items-center justify-center gap-2 md:gap-[0.4vw] mb-2 md:mb-4">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {t("stack.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.5rem,3rem] font-bold leading-tight text-foreground">
            {t("stack.title")}
          </h2>
        </motion.div>

        {/* Mobile: Accordion */}
        <div className="md:hidden">
          {categories.map((category, idx) => {
            const isOpen = openStack === idx;
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariant}
                className="border-b border-zinc-200 dark:border-zinc-800"
              >
                <button
                  onClick={() => setOpenStack(isOpen ? null : idx)}
                  className="w-full py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-[#C9FD48]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#C9FD48]" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-bold text-foreground">{t(category.titleKey)}</h3>
                      <p className="text-xs text-muted-foreground">{t(category.subtitleKey)}</p>
                    </div>
                  </div>
                  <div className="text-muted-foreground">
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
                      <div className="flex flex-wrap gap-3 pb-4">
                        {category.stack.map((tech) => (
                          <div key={tech.name} className="flex flex-col items-center gap-2">
                            <div className="relative w-14 h-14 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                              <Image
                                src={tech.logo}
                                alt={tech.name}
                                width={32}
                                height={32}
                                className={`w-7 h-7 object-contain ${tech.logoDark ? 'dark:hidden' : ''}`}
                              />
                              {tech.logoDark && (
                                <Image
                                  src={tech.logoDark}
                                  alt={tech.name}
                                  width={32}
                                  height={32}
                                  className="w-7 h-7 object-contain hidden dark:block"
                                />
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground font-medium text-center leading-tight">
                              {tech.name}
                            </span>
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

        {/* Desktop: 2x2 Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
          <StackCard
            icon={<Globe className="w-5 h-5 text-[#C9FD48]" />}
            titleKey="stack.frontend.title"
            subtitleKey="stack.frontend.subtitle"
            stack={frontendStack}
            t={t}
          />
          <StackCard
            icon={<Server className="w-5 h-5 text-[#C9FD48]" />}
            titleKey="stack.backend.title"
            subtitleKey="stack.backend.subtitle"
            stack={backendStack}
            t={t}
          />
          <StackCard
            icon={<Cloud className="w-5 h-5 text-[#C9FD48]" />}
            titleKey="stack.infra.title"
            subtitleKey="stack.infra.subtitle"
            stack={infraStack}
            t={t}
          />
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
