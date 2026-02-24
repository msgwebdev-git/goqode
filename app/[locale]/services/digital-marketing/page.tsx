import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import MarketingContent from "./content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceMarketing" });
  return {
    title: t("seo.title"),
    description: t("seo.description"),
    keywords: t("seo.keywords"),
    openGraph: {
      title: t("seo.ogTitle"),
      description: t("seo.ogDescription"),
      type: "website",
      url: `https://goqode.dev/${locale}/services/digital-marketing`,
    },
    alternates: {
      canonical: `https://goqode.dev/${locale}/services/digital-marketing`,
      languages: {
        ro: "/ro/services/digital-marketing",
        en: "/en/services/digital-marketing",
        ru: "/ru/services/digital-marketing",
      },
    },
  };
}

function ServiceJsonLd({ locale }: { locale: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing Services",
    provider: {
      "@type": "Organization",
      name: "GoQode",
      url: "https://goqode.dev",
    },
    serviceType: "Digital Marketing",
    areaServed: ["RO", "MD", "EU"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Marketing Packages",
      itemListElement: [
        {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: "500",
        },
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({ locale }: { locale: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://goqode.dev/${locale}` },
      { "@type": "ListItem", position: 2, name: "Services", item: `https://goqode.dev/${locale}/services` },
      { "@type": "ListItem", position: 3, name: "Digital Marketing", item: `https://goqode.dev/${locale}/services/digital-marketing` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <ServiceJsonLd locale={locale} />
      <BreadcrumbJsonLd locale={locale} />
      <MarketingContent />
    </>
  );
}
