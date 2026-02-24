import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import CorporateContent from "./content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceCorporate" });
  return {
    title: t("seo.title"),
    description: t("seo.description"),
    keywords: t("seo.keywords"),
    openGraph: {
      title: t("seo.ogTitle"),
      description: t("seo.ogDescription"),
      type: "website",
      url: `https://goqode.dev/${locale}/services/corporate-website`,
    },
    alternates: {
      canonical: `https://goqode.dev/${locale}/services/corporate-website`,
      languages: {
        ro: "/ro/services/corporate-website",
        en: "/en/services/corporate-website",
        ru: "/ru/services/corporate-website",
      },
    },
  };
}

function ServiceJsonLd({ locale }: { locale: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Corporate Website Development",
    provider: {
      "@type": "Organization",
      name: "GoQode",
      url: "https://goqode.dev",
    },
    serviceType: "Corporate Website Development",
    areaServed: ["RO", "MD", "EU"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Corporate Website Packages",
      itemListElement: [
        {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: "1500",
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
      { "@type": "ListItem", position: 3, name: "Corporate Website", item: `https://goqode.dev/${locale}/services/corporate-website` },
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
      <CorporateContent />
    </>
  );
}
