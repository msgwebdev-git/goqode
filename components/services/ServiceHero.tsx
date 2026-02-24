"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Shuffle from "@/components/Shuffle";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { container, itemVariant } from "./serviceAnimations";

interface ServiceHeroProps {
  namespace: string;
  icon: LucideIcon;
}

const shuffleProps = {
  shuffleDirection: "right" as const,
  duration: 0.35,
  animationMode: "evenodd" as const,
  shuffleTimes: 1,
  ease: "power3.out",
  stagger: 0.03,
  threshold: 0.1,
  triggerOnce: true,
  triggerOnHover: false,
  respectReducedMotion: true,
};

export function ServiceHero({ namespace, icon: Icon }: ServiceHeroProps) {
  const t = useTranslations(namespace);
  const title = t("hero.title");
  const lines = title.includes("|") ? title.split("|") : [title];

  return (
    <section className="w-full min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center px-6 md:clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        className="flex flex-col items-center gap-5 md:gap-[1.5vw] text-center w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariant} className="w-full">
          {lines.map((line, i) => (
            <Shuffle
              key={i}
              text={line}
              tag={i === 0 ? "h1" : "div"}
              className="text-[13vw] md:text-[10vw] font-black leading-[0.9] text-foreground"
              textAlign="center"
              {...shuffleProps}
            />
          ))}
        </motion.div>

        <motion.p
          variants={itemVariant}
          className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed max-w-[600px]"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div variants={itemVariant}>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-8 md:px-[1.5vw] rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02] overflow-hidden"
          >
            <Icon className="h-4 w-4" />
            <span>{t("hero.cta")}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
