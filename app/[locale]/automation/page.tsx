"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Shuffle from "@/components/Shuffle";
import { Zap, ArrowRight, Bot, GitBranch, Database, MessageSquare, Users, Workflow, LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";

const LaserFlow = dynamic(
  () => import("@/components/ui/laser-flow").then((mod) => mod.LaserFlow),
  { ssr: false }
);

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

// Workflow Node Component
function WorkflowNode({
  icon: Icon,
  label,
  sublabel,
  className = "",
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col items-center gap-2 ${className}`}
    >
      <div className="relative">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-zinc-900/80 border border-zinc-700/50 flex items-center justify-center backdrop-blur-sm">
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-zinc-300" />
        </div>
        <div className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-[#C9FD48]/80 animate-pulse" />
      </div>
      <span className="text-xs md:text-sm text-zinc-400 text-center max-w-[80px]">{label}</span>
      {sublabel && <span className="text-[10px] text-zinc-600">{sublabel}</span>}
    </motion.div>
  );
}

// Animated connection line
function ConnectionLine({ delay = 0, horizontal = true }: { delay?: number; horizontal?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: horizontal ? 0 : 1, scaleY: horizontal ? 1 : 0 }}
      animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className={`${horizontal ? "w-8 md:w-12 h-px" : "w-px h-8 md:h-12"} bg-gradient-to-r from-[#C9FD48]/50 via-[#C9FD48]/30 to-transparent`}
    />
  );
}

// Hero Section
function AutomationHero() {
  const t = useTranslations("Automation");

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center clamp-[px,12,24] relative overflow-hidden bg-black">
      {/* LaserFlow Background */}
      <div className="absolute inset-0 z-0">
        <LaserFlow
          color="#C9FD48"
          verticalBeamOffset={-0.25}
          horizontalBeamOffset={0}
          verticalSizing={2.5}
          horizontalSizing={0.6}
          fogIntensity={0.5}
          wispDensity={1.2}
          wispIntensity={6}
          flowSpeed={0.4}
        />
      </div>

      {/* Content */}
      <motion.div
        className="flex flex-col items-center clamp-[gap,16,32] text-center w-full relative z-10 pt-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title */}
        <motion.div variants={itemVariant} className="w-full">
          <Shuffle
            text={t("hero.title")}
            tag="h1"
            className="text-[14vw] md:text-[10vw] font-black leading-[0.9] tracking-tight text-white"
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
          variants={itemVariant}
          className="clamp-[text,1rem,1.5rem] text-zinc-400 leading-relaxed max-w-3xl"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariant}>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 h-12 sm:h-14 clamp-[px,24,32] rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02] overflow-hidden"
          >
            <Zap className="h-4 w-4" />
            <span>{t("hero.cta")}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Workflow Block - Target of LaserFlow */}
        <motion.div
          variants={itemVariant}
          className="w-full max-w-4xl mt-8 md:mt-12"
        >
          <div className="relative rounded-2xl border border-[#C9FD48]/30 bg-zinc-950/80 backdrop-blur-xl p-6 md:p-10 overflow-hidden">
            {/* Dot pattern background */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(201, 253, 72, 0.3) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Glow effect from laser */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#C9FD48]/20 blur-3xl rounded-full" />

            {/* Workflow visualization */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Top row */}
              <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                <WorkflowNode icon={MessageSquare} label="Form Submit" delay={0.8} />
                <ConnectionLine delay={1} />
                <WorkflowNode icon={Bot} label="AI Agent" sublabel="Tools Agent" delay={1.1} />
                <ConnectionLine delay={1.3} />
                <WorkflowNode icon={GitBranch} label="Is manager?" delay={1.4} />
              </div>

              {/* Bottom row - integrations */}
              <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap mt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700/50 flex items-center justify-center">
                    <span className="text-lg font-bold text-[#C9FD48]">AI</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">Anthropic</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700/50 flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-[10px] text-zinc-500">Postgres</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700/50 flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-[10px] text-zinc-500">Slack</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9, duration: 0.5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700/50 flex items-center justify-center">
                    <Workflow className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-[10px] text-zinc-500">Jira</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Main Page Component
export default function AutomationPage() {
  return (
    <main className="min-h-screen w-full">
      <AutomationHero />
    </main>
  );
}
