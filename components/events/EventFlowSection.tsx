"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Globe,
  QrCode,
  ScanLine,
  BarChart3,
  FileCheck,
} from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const flowSteps = [
  { icon: Globe },
  { icon: QrCode },
  { icon: ScanLine },
  { icon: BarChart3 },
  { icon: FileCheck },
];

// Animated connection line between steps
function ConnectionLine({ delay }: { delay: number }) {
  return (
    <div className="hidden md:flex items-center justify-center flex-1 max-w-[60px] lg:max-w-[80px]">
      <div className="relative w-full h-[3px] bg-zinc-700 overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9FD48] to-[#a8e035] rounded-full shadow-[0_0_8px_rgba(201,253,72,0.5)]"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// Flow step card
function FlowStep({
  icon: Icon,
  title,
  description,
  index,
  isLast,
}: {
  icon: typeof Globe;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}) {
  return (
    <>
      <motion.div
        variants={itemVariant}
        className="group relative flex flex-col items-center"
      >
        <div className="relative">
          {/* Icon container */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-white border-2 border-zinc-200 shadow-md flex items-center justify-center">
            <Icon className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-zinc-700" strokeWidth={1.5} />
          </div>

          {/* Step number badge */}
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C9FD48] text-black text-xs font-bold flex items-center justify-center">
            {index + 1}
          </div>
        </div>

        {/* Text content */}
        <div className="mt-4 md:mt-6 text-center max-w-[140px] md:max-w-[160px]">
          <h3 className="clamp-[text,0.875rem,1rem] font-bold text-white mb-1">
            {title}
          </h3>
          <p className="clamp-[text,0.75rem,0.875rem] text-zinc-400 leading-snug">
            {description}
          </p>
        </div>
      </motion.div>

      {/* Connection line */}
      {!isLast && <ConnectionLine delay={0.3 + index * 0.15} />}
    </>
  );
}

export function EventFlowSection() {
  const t = useTranslations("Events");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,16,32] overflow-hidden bg-zinc-50/50 dark:bg-transparent">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center mb-6 md:mb-12">
          <div className="flex items-center justify-center gap-2 md:gap-[0.4vw] mb-2 md:mb-4">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("flow.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.75rem,3.5rem] font-bold leading-tight text-foreground">
            {t("flow.title")}
          </h2>
        </motion.div>

        {/* Flow Steps Container - Dark block */}
        <div className="w-full bg-zinc-900 dark:bg-zinc-950 rounded-2xl p-6 md:clamp-[p,16,32] shadow-xl">
          {/* Flow Steps - Desktop: horizontal, Mobile: 2-col grid */}
          <div className="grid grid-cols-2 gap-5 md:hidden">
            {flowSteps.map((step, index) => (
              <FlowStep
                key={index}
                icon={step.icon}
                title={t(`flow.steps.${index}.title`)}
                description={t(`flow.steps.${index}.description`)}
                index={index}
                isLast={true}
              />
            ))}
          </div>
          <div className="hidden md:flex items-center justify-center gap-0">
            {flowSteps.map((step, index) => (
              <FlowStep
                key={index}
                icon={step.icon}
                title={t(`flow.steps.${index}.title`)}
                description={t(`flow.steps.${index}.description`)}
                index={index}
                isLast={index === flowSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
