"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import { ArrowRight, Tag } from "lucide-react";

/* Lazy-load animation-heavy components — removes GSAP & motion/react from initial bundle */
const SplitText = dynamic(() => import("@/components/SplitText"), {
  ssr: false,
  loading: () => (
    <h1 className="w-full text-[10vw] font-black leading-[1.1] tracking-tight text-foreground font-sans uppercase text-center opacity-0">
      We build bold digital
    </h1>
  ),
});

const TrueFocus = dynamic(() => import("@/components/TrueFocus"), {
  ssr: false,
});

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 md:clamp-[px,12,24]">
      <div className="flex flex-col items-center clamp-[gap,16,32]">
        <div className="flex flex-col items-center clamp-[gap,8,16] w-full">
          {/* Title — static on mobile, GSAP SplitText on desktop */}
          <div className="w-full">
            <h1 className="md:hidden w-full text-[12vw] font-black leading-[1.1] tracking-tight text-foreground font-sans uppercase text-center">
              We build bold digital
            </h1>
            <div className="hidden md:block">
              <SplitText
                text="We build bold digital"
                tag="h1"
                className="w-full text-[10vw] font-black leading-[1.1] tracking-tight text-foreground font-sans uppercase"
                textAlign="center"
              />
            </div>
          </div>

          {/* Subtitle — min-h reserves space while TrueFocus loads (ssr:false) to prevent CLS */}
          <div className="hero-fade-up [animation-delay:250ms] min-h-[10rem] sm:min-h-[3rem] flex items-center">
            <TrueFocus
              sentence={t("subtitle")}
              separator=". "
              manualMode={false}
              blurAmount={3}
              borderColor="hsl(var(--foreground))"
              glowColor="hsl(var(--foreground) / 0.4)"
              animationDuration={0.5}
              pauseBetweenAnimations={2}
              textClassName="clamp-[text,2rem,1.75rem] font-medium text-muted-foreground"
            />
          </div>

          {/* Description — LCP element: always visible, no opacity animation */}
          <p className="clamp-[text,0.875rem,1.125rem] text-muted-foreground text-center max-w-2xl leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:clamp-[gap,12,16] w-full sm:w-auto hero-fade-up [animation-delay:400ms]">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 h-12 sm:h-14 clamp-[px,24,32] rounded-full bg-[#C9FD48] text-black font-semibold clamp-[text,0.875rem,1rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,253,72,0.5)] hover:scale-[1.02] overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
              {t("cta")}
            </span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#C9FD48] to-[#a8e824] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <Link
            href="/calculator"
            className="group relative inline-flex items-center justify-center gap-2 h-12 sm:h-14 clamp-[px,24,32] rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/20 text-foreground font-medium clamp-[text,0.875rem,1rem] transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/15 hover:border-black/20 dark:hover:border-white/30 hover:scale-[1.02] w-full sm:w-auto"
          >
            <Tag className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span>{t("ctaSecondary")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
