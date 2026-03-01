import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { getAlternates, getLocalizedUrl, getOgLocale } from "@/lib/metadata-helpers";
import type { Locale } from "@/i18n/routing";
import PrivacyContent from "./content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      url: await getLocalizedUrl("/privacy", locale as Locale),
      siteName: "GoQode",
      locale: getOgLocale(locale as Locale),
    },
    alternates: await getAlternates("/privacy", locale as Locale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PrivacyContent />;
}
