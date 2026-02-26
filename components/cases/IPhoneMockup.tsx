"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

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

interface IPhoneMockupProps {
  screenshotSrc: string;
  alt?: string;
}

export function IPhoneMockup({ screenshotSrc, alt = "Mobile version" }: IPhoneMockupProps) {
  const t = useTranslations("Cases");

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
      >
        {/* Section label */}
        <motion.div
          variants={item}
          className="flex items-center gap-2 mb-6 md:mb-[2vw]"
        >
          <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
          <span className="clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
            {t("mobileVersion")}
          </span>
        </motion.div>

        {/* iPhone frame */}
        <motion.div variants={item} className="flex justify-center">
          <div className="relative w-[280px] md:w-[320px]">
            {/* Device frame */}
            <div className="bg-zinc-900 rounded-[40px] p-3 shadow-2xl shadow-black/30">
              {/* Dynamic Island */}
              <div className="w-20 h-6 rounded-2xl bg-black mx-auto mb-2 relative z-10" />

              {/* Screen */}
              <div className="rounded-[32px] overflow-hidden bg-black aspect-[9/19.5]">
                <Image
                  src={screenshotSrc}
                  alt={alt}
                  width={390}
                  height={844}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Home indicator */}
              <div className="w-1/3 h-1 rounded-full bg-zinc-700 mx-auto mt-2" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
