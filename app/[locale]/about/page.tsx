"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import SplitText from "@/components/SplitText";

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

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ─── Data ────────────────────────────────────────────── */

const stats = [
  { id: "experience", value: 30, suffix: "+" },
  { id: "projects", value: 35, suffix: "+" },
  { id: "industries", value: 12, suffix: "+" },
];

const advantages = ["flexibility", "attention", "drive", "results"];

const clientLogos = [
  {
    name: "Vercel",
    logo: (
      <svg viewBox="0 0 76 65" fill="currentColor" className="h-6 md:h-8 w-auto">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
      </svg>
    ),
  },
  {
    name: "Stripe",
    logo: (
      <svg viewBox="0 0 60 25" fill="currentColor" className="h-6 md:h-8 w-auto">
        <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.02.96-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 9.16c-.88 0-1.64.4-2.07.97v4.85c.42.54 1.17.93 2.07.93 1.58 0 2.68-1.75 2.68-3.39 0-1.64-1.1-3.36-2.68-3.36zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-5.57h4.13v3.57h-4.13V0zm-6.14 5.57h4.13v14.44h-4.13V5.57zm0-5.57h4.13v3.57h-4.13V0zM8.32 5.57h4.13v14.44H8.32V5.57zm0-5.57h4.13v3.57H8.32V0zM0 5.57h4.13v14.44H0V5.57zm0-5.57h4.13v3.57H0V0z" />
      </svg>
    ),
  },
  {
    name: "Notion",
    logo: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="h-6 md:h-8 w-auto">
        <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" />
        <path fill="var(--background, white)" d="M61.35 16.903l-37.333 2.723c-1.75 0.193 -2.14 0.193 -3.5 -0.583l-8.157 -5.833c-0.583 -0.583 -0.39 -1.167 0.78 -1.167l38.5 -2.917c1.553 -0.193 2.333 0.39 3.5 1.167l7.19 5.25c0.193 0.193 0.39 0.583 -0.98 1.36z" />
        <path fill="var(--background, white)" d="M25.083 28.083v57.917c0 3.113 1.553 4.473 5.053 4.277l46.667 -2.723c3.5 -0.193 3.887 -2.333 3.887 -4.86V25.947c0 -2.527 -0.973 -3.887 -3.11 -3.693l-48.807 2.917c-2.333 0.193 -3.69 1.36 -3.69 2.913z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    logo: (
      <svg viewBox="0 0 38 57" fill="none" className="h-6 md:h-8 w-auto">
        <path fill="#F24E1E" d="M9.5 57c5.238 0 9.5-4.262 9.5-9.5V38H9.5C4.262 38 0 42.262 0 47.5S4.262 57 9.5 57z"/>
        <path fill="#A259FF" d="M0 28.5C0 23.262 4.262 19 9.5 19H19v19H9.5C4.262 38 0 33.738 0 28.5z"/>
        <path fill="#F24E1E" d="M0 9.5C0 4.262 4.262 0 9.5 0H19v19H9.5C4.262 19 0 14.738 0 9.5z"/>
        <path fill="#FF7262" d="M19 0h9.5C33.738 0 38 4.262 38 9.5S33.738 19 28.5 19H19V0z"/>
        <path fill="#1ABCFE" d="M38 28.5c0 5.238-4.262 9.5-9.5 9.5S19 33.738 19 28.5s4.262-9.5 9.5-9.5 9.5 4.262 9.5 9.5z"/>
      </svg>
    ),
  },
  {
    name: "Linear",
    logo: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="h-6 md:h-8 w-auto">
        <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5765C20.0515 94.4586 5.54111 79.9482 1.22541 61.5228ZM.00189135 46.8891c-.01764375.2833.08887215.5599.28957965.7606L52.3503 99.7085c.2007.2007.4773.3072.7606.2896 2.2768-.1423 4.5216-.4014 6.6854-.7616.5765-.0959.7899-.7906.3655-1.215L4.18755 42.0766c-.4243-.4244-1.11913-.2111-1.21499.3655-.36025 2.1638-.61936 4.4086-.76166 6.6854-.0177.2833.08891.5599.28958.7606L52.6322 99.4187c.2007.2006.4773.3071.7606.2895 2.2769-.1422 4.5217-.4013 6.6855-.7616.5765-.0959.79-.7906.3656-1.215L4.46952 41.787c-.4244-.4244-1.11913-.2111-1.215.3655-.36024 2.1638-.61935 4.4086-.76166 6.6854Z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    logo: (
      <svg viewBox="0 0 109 113" fill="none" className="h-6 md:h-8 w-auto">
        <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-35.15 44.347Z" fill="url(#a)"/>
        <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-35.15 44.347Z" fill="url(#b)" fillOpacity=".2"/>
        <path d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072Z" fill="#3ECF8E"/>
        <defs>
          <linearGradient id="a" x1="53.974" y1="54.974" x2="94.163" y2="71.829" gradientUnits="userSpaceOnUse">
            <stop stopColor="#249361"/><stop offset="1" stopColor="#3ECF8E"/>
          </linearGradient>
          <linearGradient id="b" x1="36.156" y1="30.578" x2="54.484" y2="65.081" gradientUnits="userSpaceOnUse">
            <stop/><stop offset="1" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Prisma",
    logo: (
      <svg viewBox="0 0 90 90" fill="currentColor" className="h-6 md:h-8 w-auto">
        <path d="M87.333 67.469L52.073 2.833a5.762 5.762 0 00-5.024-2.93 5.766 5.766 0 00-5.024 2.93L6.767 67.469a5.763 5.763 0 00.52 6.157l26.77 34.61a5.762 5.762 0 004.504 2.164 5.762 5.762 0 004.504-2.164l44.268-34.61a5.763 5.763 0 00.52-6.157h-.52zM47.049 85.052a1.44 1.44 0 01-2.253.17L20.003 55.008a1.44 1.44 0 01.225-2.142l24.793-17.867a1.44 1.44 0 012.253.17l23.793 46.89a1.44 1.44 0 01-.225 2.142L47.049 85.052z"/>
      </svg>
    ),
  },
  {
    name: "Resend",
    logo: (
      <svg viewBox="0 0 65 65" fill="currentColor" className="h-6 md:h-8 w-auto">
        <path d="M0 10C0 4.477 4.477 0 10 0h45c5.523 0 10 4.477 10 10v45c0 5.523-4.477 10-10 10H10c-5.523 0-10-4.477-10-10V10z"/>
        <path fill="var(--background, white)" d="M17 17h13.5c6.904 0 12.5 5.596 12.5 12.5S37.404 42 30.5 42H24v6h-7V17zm7 18h6.5c3.038 0 5.5-2.462 5.5-5.5S33.538 24 30.5 24H24v11z"/>
        <path fill="var(--background, white)" d="M31 48l11-14h7L38 48h-7z"/>
      </svg>
    ),
  },
  {
    name: "Tailwind",
    logo: (
      <svg viewBox="0 0 54 33" fill="none" className="h-5 md:h-6 w-auto">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#06B6D4"/>
      </svg>
    ),
  },
  {
    name: "Next.js",
    logo: (
      <svg viewBox="0 0 180 180" fill="none" className="h-6 md:h-8 w-auto">
        <mask id="mask0_about" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="currentColor"/>
        </mask>
        <g mask="url(#mask0_about)">
          <circle cx="90" cy="90" r="90" fill="currentColor"/>
          <path d="M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.461a90.304 90.304 0 009.509-7.325z" fill="url(#paint0_about)"/>
          <rect x="115" y="54" width="12" height="72" fill="url(#paint1_about)"/>
        </g>
        <defs>
          <linearGradient id="paint0_about" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--background, white)"/><stop offset="1" stopColor="var(--background, white)" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint1_about" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--background, white)"/><stop offset="1" stopColor="var(--background, white)" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════════════════ */

export default function AboutPage() {
  const t = useTranslations("About");
  const tp = useTranslations("AboutPage");
  const tClients = useTranslations("Clients");

  return (
    <main className="min-h-screen w-full">
      {/* ── Hero Section ── */}
      <section className="w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center clamp-[px,12,24] clamp-[py,24,48]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 md:mb-[1vw]"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-[#C9FD48]/10 text-[#C9FD48] text-xs font-semibold tracking-widest uppercase border border-zinc-800 dark:border-[#C9FD48]/20">
            {tp("subtitle")}
          </span>
        </motion.div>

        <SplitText
          text={t("title")}
          tag="h1"
          className="text-[14vw] md:text-[8vw] font-black leading-[1.05] tracking-tight text-foreground uppercase"
          textAlign="center"
        />

        <div className="mt-6 md:mt-[2vw] w-full">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={3}
            blurStrength={4}
            containerClassName="w-full"
            textClassName="text-[5vw] md:text-[3vw] font-bold leading-[1.15] text-foreground text-center"
          >
            {t("heroText")}
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
        >
          {/* Section label */}
          <motion.div variants={cardVariant} className="flex items-center gap-2 md:gap-[0.4vw] mb-4 md:mb-[1.5vw]">
            <div className="w-2 h-2 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="text-xs md:clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {tp("statsTitle")}
            </span>
          </motion.div>

          {/* Team message */}
          <motion.div variants={cardVariant} className="mb-6 md:mb-[3vw]">
            <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed">
              {t("teamMessage")}
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={cardVariant}
            className="grid grid-cols-3 gap-2 md:gap-[1.5vw]"
          >
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 py-6 md:py-[2vw]"
              >
                <div className="text-[12vw] md:text-[6vw] font-black text-foreground leading-none mb-1 md:mb-[0.5vw]">
                  <CountUp from={0} to={stat.value} duration={2} separator="" />
                  {stat.suffix}
                </div>
                <p className="clamp-[text,0.75rem,1rem] text-muted-foreground font-medium">
                  {t(`stats.${stat.id}`)}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Advantages Section ── */}
      <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
        >
          {/* Section label */}
          <motion.div variants={cardVariant} className="flex items-center gap-2 md:gap-[0.4vw] mb-6 md:mb-[2vw]">
            <div className="w-2 h-2 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="text-xs md:clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {tp("advantagesTitle")}
            </span>
          </motion.div>

          {/* Advantages grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-[1.25vw]">
            {advantages.map((id) => (
              <motion.div key={id} variants={cardVariant} className="group">
                <div className="h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 md:p-[1.25vw] transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#C9FD48]/50">
                  <h3 className="clamp-[text,1.125rem,1.5rem] font-bold text-foreground mb-2 md:mb-[0.6vw]">
                    {t(`advantages.${id}.title`)}
                  </h3>
                  <p className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed">
                    {t(`advantages.${id}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Client Logos Section ── */}
      <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
        >
          {/* Section label */}
          <motion.div variants={cardVariant} className="flex items-center gap-2 md:gap-[0.4vw] mb-4 md:mb-[1.5vw]">
            <div className="w-2 h-2 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
            <span className="text-xs md:clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
              {tp("clientsTitle")}
            </span>
          </motion.div>

          <motion.div variants={cardVariant}>
            <div className="grid grid-cols-5 gap-px bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden">
              {clientLogos.map((client, index) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="group flex items-center justify-center h-20 md:h-[6.5vw] bg-background transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <div className="text-zinc-400 dark:text-zinc-600 transition-all duration-300 group-hover:text-foreground group-hover:scale-110 [&_svg]:h-5 [&_svg]:md:h-[1.8vw] [&_svg]:w-auto">
                    {client.logo}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CTA Section ── */}
      <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
        >
          <motion.div variants={cardVariant}>
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
    </main>
  );
}
