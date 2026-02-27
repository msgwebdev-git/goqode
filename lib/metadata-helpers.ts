import { routing, type Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const host = "https://goqode.agency";

const ogLocaleMap: Record<Locale, string> = {
  ro: "ro_RO",
  en: "en_US",
  ru: "ru_RU",
};

/** Map locale to Open Graph locale string (e.g. "en" → "en_US"). */
export function getOgLocale(locale: Locale): string {
  return ogLocaleMap[locale] || "ro_RO";
}

/**
 * Build a fully-qualified URL for a given internal href and locale,
 * resolving localized pathnames automatically.
 */
export async function getLocalizedUrl(href: string, locale: Locale): Promise<string> {
  const pathname = await getPathname({ locale, href: href as any });
  return `${host}${pathname}`;
}

/**
 * Generate `alternates` object for `generateMetadata`, including
 * canonical, all locale hreflangs, and x-default.
 */
export async function getAlternates(href: string, currentLocale: Locale) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = await getLocalizedUrl(href, locale);
  }
  languages["x-default"] = await getLocalizedUrl(href, routing.defaultLocale);

  return {
    canonical: await getLocalizedUrl(href, currentLocale),
    languages,
  };
}
