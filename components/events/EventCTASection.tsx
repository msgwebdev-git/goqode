"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { CalendarDays, ArrowRight, Sparkles } from "lucide-react";

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

export function EventCTASection() {
  const t = useTranslations("Events");

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        {/* CTA Card */}
        <motion.div variants={itemVariant}>
          <Link href="/contact" className="block group">
            <div className="relative rounded-3xl bg-[#C9FD48] overflow-hidden py-8 md:py-12 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9FD48]/40 hover:brightness-105">
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-[5%] -translate-y-1/2 w-[20vw] h-[20vw] max-w-[200px] max-h-[200px] rounded-full border-2 border-black/5 pointer-events-none" />
              <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[15vw] h-[15vw] max-w-[150px] max-h-[150px] rounded-full border-2 border-black/5 pointer-events-none" />

              {/* Sparkles */}
              <motion.div
                className="absolute top-4 left-[20%] text-black/20"
                animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <motion.div
                className="absolute bottom-4 right-[30%] text-black/20"
                animate={{ y: [5, -5, 5], rotate: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                {/* First text - visible by default */}
                <span className="block text-[5vw] md:text-[4vw] lg:text-[3vw] font-black text-black uppercase transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                  {t("cta.title")}
                </span>

                {/* Second text - visible on hover */}
                <span className="absolute inset-0 flex items-center justify-center text-[5vw] md:text-[4vw] lg:text-[3vw] font-black text-black uppercase translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="flex items-center gap-3">
                    {t("cta.button")}
                    <ArrowRight className="w-[4vw] md:w-[3vw] lg:w-[2vw] h-[4vw] md:h-[3vw] lg:h-[2vw] min-w-6 min-h-6" />
                  </span>
                </span>
              </div>

              {/* Animated calendar icon */}
              <motion.div
                className="absolute bottom-4 right-6 md:right-8 text-black/20"
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <CalendarDays className="w-10 h-10 md:w-14 md:h-14" />
              </motion.div>

              {/* Animated QR pattern */}
              <motion.div
                className="absolute bottom-4 left-6 md:left-8 text-black/10"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  viewBox="0 0 64 64"
                  className="w-10 h-10 md:w-14 md:h-14"
                  fill="currentColor"
                >
                  <rect x="0" y="0" width="20" height="20" rx="2" />
                  <rect x="24" y="0" width="8" height="8" rx="1" />
                  <rect x="36" y="0" width="8" height="8" rx="1" />
                  <rect x="44" y="0" width="20" height="20" rx="2" />
                  <rect x="0" y="24" width="8" height="8" rx="1" />
                  <rect x="16" y="24" width="8" height="8" rx="1" />
                  <rect x="28" y="24" width="8" height="8" rx="1" />
                  <rect x="40" y="24" width="8" height="8" rx="1" />
                  <rect x="56" y="24" width="8" height="8" rx="1" />
                  <rect x="0" y="36" width="8" height="8" rx="1" />
                  <rect x="24" y="36" width="16" height="8" rx="1" />
                  <rect x="56" y="36" width="8" height="8" rx="1" />
                  <rect x="0" y="44" width="20" height="20" rx="2" />
                  <rect x="24" y="48" width="8" height="8" rx="1" />
                  <rect x="36" y="44" width="8" height="8" rx="1" />
                  <rect x="48" y="48" width="16" height="16" rx="2" />
                </svg>
              </motion.div>
            </div>
          </Link>
        </motion.div>

        {/* Contact text */}
        <motion.div variants={itemVariant} className="mt-6 md:mt-8 text-center">
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

        {/* Additional info cards */}
        <motion.div
          variants={itemVariant}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
            >
              <div className="w-10 h-10 rounded-xl bg-[#C9FD48]/10 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-[#C9FD48]" />
              </div>
              <span className="clamp-[text,0.875rem,1rem] text-foreground font-medium">
                {t(`cta.benefits.${i}`)}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
