"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Shuffle from "@/components/Shuffle";
import { ArrowRight, Check, Star } from "lucide-react";

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
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ─── Package data ────────────────────────────────────── */

const PACKAGES = [
  { index: 0, featureCount: 6, custom: false },
  { index: 1, featureCount: 7, custom: false, recommended: true },
  { index: 2, featureCount: 8, custom: false },
  { index: 3, featureCount: 6, custom: true },
];

/* ═══════════════════════════════════════════════════════
   PACKAGES SECTION
   ═══════════════════════════════════════════════════════ */

function PackagesSection() {
  const t = useTranslations("Packages");

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] pt-28 md:pt-36 pb-8 md:pb-[min(3vw,58px)]">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title */}
        <motion.div variants={itemVariant} className="text-center mb-8 md:mb-[min(3vw,58px)]">
          <Shuffle
            text={t("hero.title")}
            tag="h1"
            className="text-[12vw] md:text-[min(8vw,153px)] font-black leading-[0.85] tracking-tighter text-foreground"
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
          <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed mt-3 md:mt-[min(1vw,19px)]">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={itemVariant}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-[min(0.8vw,15px)]"
        >
          {PACKAGES.map((pkg) => {
            const isRecommended = !!pkg.recommended;

            return (
              <motion.div
                key={pkg.index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className={`flex flex-col rounded-2xl overflow-hidden ${
                  isRecommended
                    ? "bg-zinc-950 border-2 border-[#C9FD48] shadow-xl shadow-[#C9FD48]/5"
                    : "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {/* Header */}
                <div className="p-5 md:p-[min(1.2vw,23px)] pb-0 md:pb-0">
                  {/* Name + badge */}
                  <div className="flex items-center justify-between mb-2 md:mb-[min(0.3vw,6px)]">
                    <h3
                      className={`clamp-[text,1.375rem,1.5rem] font-black leading-none ${
                        isRecommended ? "text-[#C9FD48]" : "text-foreground"
                      }`}
                    >
                      {t(`packages.${pkg.index}.name`)}
                    </h3>
                    {isRecommended && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C9FD48] text-black clamp-[text,0.625rem,0.65rem] font-bold uppercase tracking-wider">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        {t("grid.popular")}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-3 md:mb-[min(0.5vw,10px)]">
                    {pkg.custom ? (
                      <span
                        className={`clamp-[text,1.5rem,1.75rem] font-bold ${
                          isRecommended ? "text-white" : "text-foreground"
                        }`}
                      >
                        {t(`packages.${pkg.index}.priceLabel`)}
                      </span>
                    ) : (
                      <>
                        <span
                          className={`clamp-[text,0.875rem,0.875rem] font-medium ${
                            isRecommended ? "text-zinc-500" : "text-muted-foreground"
                          }`}
                        >
                          {t("grid.from")}
                        </span>
                        <span
                          className={`clamp-[text,2.25rem,3.25rem] font-black leading-none ${
                            isRecommended ? "text-white" : "text-foreground"
                          }`}
                        >
                          {t(`packages.${pkg.index}.price`)}
                        </span>
                        <span
                          className={`clamp-[text,0.875rem,0.875rem] font-medium ${
                            isRecommended ? "text-zinc-500" : "text-muted-foreground"
                          }`}
                        >
                          €
                        </span>
                        <span
                          className={`clamp-[text,0.875rem,0.8rem] ${
                            isRecommended ? "text-zinc-500" : "text-muted-foreground"
                          }`}
                        >
                          {t(`packages.${pkg.index}.period`)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Tagline */}
                  <p
                    className={`clamp-[text,0.9375rem,0.875rem] leading-relaxed mb-4 md:mb-[min(0.8vw,15px)] ${
                      isRecommended ? "text-zinc-400" : "text-muted-foreground"
                    }`}
                  >
                    {t(`packages.${pkg.index}.tagline`)}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className={`mx-5 md:mx-[min(1.2vw,23px)] h-px ${
                    isRecommended ? "bg-zinc-800" : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                />

                {/* Features */}
                <div className="p-5 md:p-[min(1.2vw,23px)] flex-1 flex flex-col">
                  <ul className="space-y-3 md:space-y-[min(0.5vw,10px)] flex-1">
                    {Array.from({ length: pkg.featureCount }).map((_, i) => (
                      <li key={i} className="flex items-start gap-3 md:gap-[min(0.4vw,8px)]">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isRecommended
                              ? "bg-[#C9FD48]/10"
                              : "bg-zinc-900 dark:bg-zinc-700"
                          }`}
                        >
                          <Check
                            className={`w-2.5 h-2.5 ${isRecommended ? "text-[#C9FD48]" : "text-white dark:text-[#C9FD48]"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span
                          className={`clamp-[text,0.9375rem,0.875rem] leading-relaxed ${
                            isRecommended ? "text-zinc-300" : "text-muted-foreground"
                          }`}
                        >
                          {t(`packages.${pkg.index}.features.${i}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Result */}
                  <div
                    className={`inline-flex items-start gap-2 px-4 py-2.5 rounded-2xl w-fit mt-5 mb-4 md:mt-[min(1vw,19px)] md:mb-[min(0.8vw,15px)] ${
                      isRecommended
                        ? "bg-[#C9FD48]/10 border border-[#C9FD48]/20"
                        : "bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isRecommended ? "text-[#C9FD48]" : "text-zinc-900 dark:text-[#C9FD48]"}`} strokeWidth={2.5} />
                    <span
                      className={`clamp-[text,0.875rem,0.8rem] font-medium ${
                        isRecommended ? "text-white" : "text-foreground"
                      }`}
                    >
                      {t(`packages.${pkg.index}.result`)}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className={`group flex items-center justify-center gap-2 h-11 rounded-full font-semibold clamp-[text,0.9375rem,0.875rem] transition-all duration-300 ${
                      isRecommended
                        ? "bg-[#C9FD48] text-black hover:shadow-[0_0_30px_rgba(201,253,72,0.4)] hover:scale-[1.02]"
                        : "bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90"
                    }`}
                  >
                    <span>{t("hero.cta")}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════════ */

function PackagesCTA() {
  const t = useTranslations("Packages");

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
      >
        <motion.div variants={itemVariant}>
          <Link href="/contact" className="block group">
            <div className="relative rounded-3xl bg-[#C9FD48] overflow-hidden clamp-[py,12,16] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9FD48]/40 hover:brightness-105">
              <span className="block clamp-[text,1.5rem,3rem] font-black text-black uppercase text-center transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0 relative z-10">
                {t("cta.title")}
              </span>
              <span className="absolute inset-0 flex items-center justify-center clamp-[text,1.5rem,3rem] font-black text-black uppercase translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10">
                {t("cta.button")}
              </span>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariant} className="mt-3 md:mt-[min(1vw,19px)] text-center">
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

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function PackagesPage() {
  return (
    <main className="min-h-screen w-full">
      <PackagesSection />
    </main>
  );
}
