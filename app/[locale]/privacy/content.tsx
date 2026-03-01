"use client";

import { useTranslations } from "next-intl";

export default function PrivacyContent() {
  const t = useTranslations("Privacy");

  const sections = [
    "intro",
    "controller",
    "dataCollected",
    "legalBasis",
    "cookies",
    "thirdParty",
    "rights",
    "retention",
    "security",
    "children",
    "changes",
    "contact",
  ] as const;

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <div className="max-w-[800px]">
        <h1 className="clamp-[text,1.75rem,4rem] font-bold leading-tight text-black dark:text-white">
          {t("title")}
        </h1>
        <p className="clamp-[text,0.875rem,1rem] text-zinc-500 dark:text-zinc-400 mt-2">
          {t("lastUpdated")}
        </p>

        <div className="mt-8 space-y-8">
          {sections.map((key) => (
            <div key={key}>
              <h2 className="clamp-[text,1.25rem,2rem] font-semibold leading-tight text-black dark:text-white">
                {t(`${key}.title`)}
              </h2>
              <div
                className="clamp-[text,1rem,1.25rem] leading-relaxed text-zinc-600 dark:text-zinc-400 mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-black dark:[&_a]:text-white"
                dangerouslySetInnerHTML={{ __html: t.raw(`${key}.content`) }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
