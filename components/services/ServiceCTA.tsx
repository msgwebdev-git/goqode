"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { container, itemVariant } from "./serviceAnimations";

interface ServiceCTAProps {
  namespace: string;
}

export function ServiceCTA({ namespace }: ServiceCTAProps) {
  const t = useTranslations(namespace);

  return (
    <section className="w-full px-6 md:clamp-[px,12,24] clamp-[py,16,32]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        <motion.div variants={itemVariant}>
          <Link href="/contact" className="block group">
            <div className="relative rounded-2xl md:rounded-3xl bg-[#C9FD48] overflow-hidden py-4 md:py-[0.8vw] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9FD48]/40 hover:brightness-105">
              <span className="block text-[5.5vw] md:text-[3vw] font-black text-black uppercase text-center transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0 relative z-10">
                {t("cta.title")}
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-[5.5vw] md:text-[3vw] font-black text-black uppercase translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10">
                {t("cta.button")}
              </span>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariant} className="mt-4 md:mt-[1vw] text-center">
          <p className="clamp-[text,0.875rem,1rem] text-muted-foreground">
            {t("cta.contact_text")}{" "}
            <a
              href="mailto:hello@goqode.agency"
              className="text-zinc-900 dark:text-[#C9FD48] font-medium hover:underline transition-colors"
            >
              hello@goqode.agency
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
