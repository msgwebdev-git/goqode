import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center clamp-[px,12,24]">
      <h1 className="clamp-[text,2rem,5rem] font-bold leading-tight text-black dark:text-white">
        404
      </h1>
      <p className="clamp-[text,1rem,1.25rem] leading-relaxed text-zinc-600 dark:text-zinc-400 mt-4">
        {t("message")}
      </p>
      <Link
        href="/"
        className="mt-8 h-12 clamp-[px,20,32] rounded-full bg-foreground text-background font-medium transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 inline-flex items-center justify-center"
      >
        {t("goHome")}
      </Link>
    </section>
  );
}
