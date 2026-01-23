"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Globe,
  QrCode,
  ScanLine,
  BarChart3,
  Mail,
} from "lucide-react";

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
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// Service card data
const services = [
  { icon: Globe },
  { icon: QrCode },
  { icon: ScanLine },
  { icon: BarChart3 },
  { icon: Mail },
];

// Service Card Component
function ServiceCard({
  service,
  title,
  description,
  features,
}: {
  service: (typeof services)[0];
  title: string;
  description: string;
  features: string[];
}) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={itemVariant}
      className="group relative rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 hover:border-[#C9FD48] hover:shadow-lg hover:shadow-[#C9FD48]/10"
    >
      <div className="relative p-6 md:p-8 h-full flex flex-col">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center mb-6 group-hover:border-[#C9FD48] group-hover:bg-[#C9FD48]/10 transition-all duration-300">
          <Icon
            className="w-7 h-7 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
            strokeWidth={1.5}
          />
        </div>

        {/* Title & Description */}
        <h3 className="clamp-[text,1.25rem,1.5rem] font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Features Tags */}
        <div className="flex flex-wrap gap-2">
          {features.map((feature, i) => (
            <span
              key={i}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function EventServicesSection() {
  const t = useTranslations("Events");

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48] bg-white dark:bg-zinc-950">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="mb-12 lg:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("services.label")}
            </span>
          </div>
          <h2 className="clamp-[text,1.75rem,3.5rem] font-bold leading-tight text-foreground mb-4">
            {t("services.title")}
          </h2>
          <p className="clamp-[text,1rem,1.25rem] text-muted-foreground max-w-2xl">
            {t("services.description")}
          </p>
        </motion.div>

        {/* Grid: 3 cards top row, 2 cards bottom row centered */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Top row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                title={t(`services.items.${index}.title`)}
                description={t(`services.items.${index}.description`)}
                features={t(`services.items.${index}.deliverables`)
                  .split(", ")
                  .slice(0, 4)}
              />
            ))}
          </div>
          {/* Bottom row - 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:w-2/3 md:mx-auto">
            {services.slice(3).map((service, index) => (
              <ServiceCard
                key={index + 3}
                service={service}
                title={t(`services.items.${index + 3}.title`)}
                description={t(`services.items.${index + 3}.description`)}
                features={t(`services.items.${index + 3}.deliverables`)
                  .split(", ")
                  .slice(0, 4)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
