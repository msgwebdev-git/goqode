import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { getAlternates, getLocalizedUrl, getOgLocale } from "@/lib/metadata-helpers";
import type { Locale } from "@/i18n/routing";
import EcommerceContent from "./content";

const SERVICE_HREF = "/services/ecommerce-development";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceEcommerce" });
  return {
    title: t("seo.title"),
    description: t("seo.description"),
    keywords: t("seo.keywords"),
    openGraph: {
      title: t("seo.ogTitle"),
      description: t("seo.ogDescription"),
      type: "website",
      url: await getLocalizedUrl(SERVICE_HREF, locale as Locale),
      siteName: "GoQode",
      locale: getOgLocale(locale as Locale),
    },
    alternates: await getAlternates(SERVICE_HREF, locale as Locale),
  };
}

async function ServiceJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "JsonLd" });
  const serviceUrl = await getLocalizedUrl(SERVICE_HREF, locale as Locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("ecommerce"),
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      name: "GoQode",
      url: "https://goqode.agency",
    },
    serviceType: t("ecommerce"),
    areaServed: ["RO", "MD", "EU"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t("ecommercePackages"),
      itemListElement: [
        {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: "2000",
        },
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

async function BreadcrumbJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "JsonLd" });
  const homeUrl = await getLocalizedUrl("/", locale as Locale);
  const serviceUrl = await getLocalizedUrl(SERVICE_HREF, locale as Locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("home"), item: homeUrl },
      { "@type": "ListItem", position: 2, name: t("services") },
      { "@type": "ListItem", position: 3, name: t("ecommerce"), item: serviceUrl },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

async function FaqJsonLd({ locale, namespace }: { locale: string; namespace: string }) {
  const t = await getTranslations({ locale, namespace });
  const faqItems = [0, 1, 2, 3].map((i) => ({
    "@type": "Question" as const,
    name: t(`faq.items.${i}.question`),
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: t(`faq.items.${i}.answer`),
    },
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <ServiceJsonLd locale={locale} />
      <BreadcrumbJsonLd locale={locale} />
      <FaqJsonLd locale={locale} namespace="ServiceEcommerce" />
      <EcommerceContent />
    </>
  );
}
