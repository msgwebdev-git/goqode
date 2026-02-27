"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Copy, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  submission: {
    name: string;
    projectType: string;
    designLevel: string | null;
    priceMin: number;
    priceMax: number;
    isMonthly: boolean;
    adBudget: string | null;
    message: string | null;
    features: { key: string; priceMin: number; priceMax: number }[];
    scopeModifiers: { modKey: string; value: string }[];
  };
};

export function ThankYouClient({ submission }: Props) {
  const t = useTranslations("Calculator");
  const [linkCopied, setLinkCopied] = useState(false);
  const monthlySuffix = submission.isMonthly ? ` ${t("perMonth")}` : "";

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  return (
    <main className="w-full min-h-[100dvh] flex flex-col lg:flex-row">
      {/* Left dark panel */}
      <div className="relative w-full lg:w-[45%] bg-zinc-950 flex flex-col justify-between px-4 lg:clamp-[px,12,24] py-6 lg:clamp-[py,24,48] lg:min-h-[100dvh] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 70%, rgba(201,253,72,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 flex-1 flex flex-col justify-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-[#C9FD48]/15 border-2 border-[#C9FD48]/30 flex items-center justify-center"
          >
            <CheckCircle className="w-10 h-10 text-[#C9FD48]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-[8vw] lg:text-[3.5vw] font-black leading-[0.95] tracking-tight text-white">
              {t("thankYou.title")}
            </h1>
            <p className="text-zinc-400 mt-4 text-sm lg:text-base leading-relaxed max-w-md">
              {t("thankYou.subtitle")}
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6">
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-[#C9FD48] hover:text-black"
          >
            <span>{linkCopied ? t("thankYou.copied") : t("thankYou.copyLink")}</span>
            {linkCopied ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Right content panel */}
      <div className="w-full lg:w-[55%] bg-white dark:bg-zinc-900 flex flex-col justify-start pt-6 lg:pt-20 px-4 lg:clamp-[px,12,24] py-6 lg:py-12 pb-12 min-h-[50vh] lg:min-h-[100dvh]">
        <div className="w-full lg:max-w-lg lg:ml-[10%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Price */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-2">
                {t("thankYou.estimate")}
              </p>
              <div className="text-black dark:text-[#C9FD48] text-3xl lg:text-4xl font-black tabular-nums">
                €{submission.priceMin.toLocaleString()} — €{submission.priceMax.toLocaleString()}
                {submission.isMonthly && (
                  <span className="text-zinc-500 text-xl font-medium ml-1">{t("perMonth")}</span>
                )}
              </div>
            </div>

            {/* Parameters summary */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
                {t("result.summary")}
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("result.projectType")}</span>
                  <span className="font-medium text-foreground">
                    {t(`step1.types.${submission.projectType}`)}
                  </span>
                </div>
                {submission.designLevel && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("result.designLevel")}</span>
                    <span className="font-medium text-foreground">
                      {t(`step2.levels.${submission.designLevel}`)}
                    </span>
                  </div>
                )}
                {submission.scopeModifiers.map((mod) => (
                  <div key={mod.modKey} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t(`step3.scopes.${submission.projectType}.${mod.modKey}.label`)}
                    </span>
                    <span className="font-medium text-foreground">
                      {t(`step3.scopes.${submission.projectType}.${mod.modKey}.${mod.value}`)}
                    </span>
                  </div>
                ))}
                {submission.adBudget && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("thankYou.adBudget")}</span>
                    <span className="font-medium text-foreground">
                      {t(`adBudget.options.${submission.adBudget}`)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            {submission.features.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
                  {t("result.features")}
                </p>
                <div className="flex flex-col gap-1.5">
                  {submission.features.map((f) => (
                    <div key={f.key} className="flex justify-between items-center text-sm">
                      <span className="text-foreground font-medium">
                        {t(`step3.features.${submission.projectType}.${f.key}`)}
                      </span>
                      <span className="text-xs text-zinc-400 tabular-nums shrink-0 ml-3">
                        €{f.priceMin} — €{f.priceMax}{monthlySuffix}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {submission.message && (
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-2">
                  {t("thankYou.description")}
                </p>
                <p className="text-sm text-foreground">{submission.message}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/calculator"
                className="group inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-[#C9FD48] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#b8ec3a]"
              >
                <span className="tracking-widest uppercase">{t("thankYou.newCalculation")}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
