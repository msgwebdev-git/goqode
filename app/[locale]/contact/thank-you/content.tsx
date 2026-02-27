"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ThankYouContent() {
  const t = useTranslations("Contact");

  return (
    <main className="w-full min-h-[100dvh] flex flex-col lg:flex-row">
      {/* Left dark panel */}
      <div className="relative w-full lg:w-[45%] bg-zinc-950 flex flex-col justify-between clamp-[px,12,24] clamp-[py,16,32] min-h-[40vh] lg:min-h-[100dvh] overflow-hidden">
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

        <div className="relative z-10 flex-1 flex items-center">
          <h1 className="text-[10vw] lg:text-[4.5vw] font-black leading-[0.95] tracking-tight text-white whitespace-pre-line">
            {t("heading")}
          </h1>
        </div>
      </div>

      {/* Right panel — success */}
      <div className="w-full lg:w-[55%] bg-white dark:bg-zinc-950 flex flex-col justify-center clamp-[px,12,24] clamp-[py,16,32] min-h-[60vh] lg:min-h-[100dvh]">
        <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-[10%]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col items-center justify-center text-center gap-6 py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-[#C9FD48]/15 border-2 border-[#C9FD48]/30 flex items-center justify-center"
            >
              <CheckCircle className="w-10 h-10 text-[#C9FD48]" />
            </motion.div>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t("success.title")}
            </h2>

            <p className="text-sm text-muted-foreground">
              {t("success.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#C9FD48] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#b8ec3a]"
              >
                {t("success.sendAnother") === "Отправить ещё сообщение"
                  ? "На главную"
                  : t("success.sendAnother") === "Trimite alt mesaj"
                    ? "Acasă"
                    : "Back to Home"}
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-foreground text-foreground font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-foreground hover:text-background"
              >
                {t("success.sendAnother")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
