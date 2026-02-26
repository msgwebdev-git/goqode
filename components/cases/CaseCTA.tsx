"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export function CaseCTA() {
  const t = useTranslations("Cases");

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
      >
        <motion.div variants={item}>
          <Link href="/contact" className="block group">
            <div className="relative rounded-3xl bg-[#C9FD48] overflow-hidden py-4 md:py-[1.2vw] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9FD48]/40 hover:brightness-105">
              <span className="block text-[6vw] md:text-[3.5vw] font-black text-black uppercase text-center transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                {t("cta.title")}
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-[6vw] md:text-[3.5vw] font-black text-black uppercase translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                {t("cta.button")}
              </span>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
