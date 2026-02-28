import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { getAlternates, getLocalizedUrl, getOgLocale } from "@/lib/metadata-helpers";
import type { Locale } from "@/i18n/routing";
import { getCalculatorConfig } from "@/lib/calculator-api";
import { CalculatorClient } from "./calculator-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });

  return {
    title: t("calculator.title"),
    description: t("calculator.description"),
    keywords: t("calculator.keywords"),
    openGraph: {
      title: t("calculator.ogTitle"),
      description: t("calculator.ogDescription"),
      type: "website",
      url: await getLocalizedUrl("/calculator", locale as Locale),
      siteName: "GoQode",
      locale: getOgLocale(locale as Locale),
    },
    alternates: await getAlternates("/calculator", locale as Locale),
  };
}

export default async function CalculatorPage() {
  const config = await getCalculatorConfig();
  return <CalculatorClient config={config} />;
}
