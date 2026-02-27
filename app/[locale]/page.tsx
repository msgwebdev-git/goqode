import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { getAlternates, getLocalizedUrl, getOgLocale } from "@/lib/metadata-helpers";
import type { Locale } from "@/i18n/routing";
import { HeroSection } from "@/components/HeroSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CasesSection } from "@/components/CasesSection";
import { BlogSection } from "@/components/BlogSection";
import { AboutSection } from "@/components/AboutSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });

  return {
    title: t("home.title"),
    description: t("home.description"),
    keywords: t("home.keywords"),
    openGraph: {
      title: t("home.ogTitle"),
      description: t("home.ogDescription"),
      type: "website",
      url: await getLocalizedUrl("/", locale as Locale),
      siteName: "GoQode",
      locale: getOgLocale(locale as Locale),
    },
    alternates: await getAlternates("/", locale as Locale),
  };
}

async function OrganizationJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "JsonLd" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GoQode",
    url: "https://goqode.agency",
    logo: "https://goqode.agency/goqode-dark.svg",
    description: t("orgDescription"),
    areaServed: ["RO", "MD", "EU"],
    knowsLanguage: ["ro", "en", "ru"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@goqode.agency",
        availableLanguage: ["Romanian", "English", "Russian"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/goqode.agency",
      "https://www.instagram.com/goqode.agency",
      "https://www.linkedin.com/company/goqode",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GoQode",
    url: "https://goqode.agency",
    inLanguage: ["ro", "en", "ru"],
    publisher: {
      "@type": "Organization",
      name: "GoQode",
      url: "https://goqode.agency",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "GoQode",
    url: "https://goqode.agency",
    logo: "https://goqode.agency/goqode-dark.svg",
    image: "https://goqode.agency/goqode-dark.svg",
    email: "hello@goqode.agency",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chișinău",
      addressCountry: "MD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.0105,
      longitude: 28.8638,
    },
    areaServed: [
      { "@type": "Country", name: "Moldova" },
      { "@type": "Country", name: "Romania" },
      { "@type": "Place", name: "European Union" },
    ],
    priceRange: "$$",
    knowsLanguage: ["ro", "en", "ru"],
    sameAs: [
      "https://www.facebook.com/goqode.agency",
      "https://www.instagram.com/goqode.agency",
      "https://www.linkedin.com/company/goqode",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="min-h-screen w-full">
      <OrganizationJsonLd locale={locale} />
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />
      <HeroSection />
      <SolutionsSection />
      <ProcessSection />
      <CasesSection />
      <AboutSection />
      <BlogSection />
    </main>
  );
}
