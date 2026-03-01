import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ro", "en", "ru"],
  defaultLocale: "ro",
  pathnames: {
    "/": "/",
    "/about": {
      ro: "/despre-noi",
      en: "/about",
      ru: "/o-nas",
    },
    "/contact": {
      ro: "/contact",
      en: "/contact",
      ru: "/kontakty",
    },
    "/cases": {
      ro: "/cazuri",
      en: "/cases",
      ru: "/kejsy",
    },
    "/cases/[slug]": {
      ro: "/cazuri/[slug]",
      en: "/cases/[slug]",
      ru: "/kejsy/[slug]",
    },
    "/launch": {
      ro: "/lansare",
      en: "/launch",
      ru: "/zapusk",
    },
    "/growth": {
      ro: "/crestere",
      en: "/growth",
      ru: "/rost",
    },
    "/platforms": {
      ro: "/platforme",
      en: "/platforms",
      ru: "/platformy",
    },
    "/events": {
      ro: "/evenimente",
      en: "/events",
      ru: "/sobytiya",
    },
    "/automation": {
      ro: "/automatizare",
      en: "/automation",
      ru: "/avtomatizaciya",
    },
    "/branding": {
      ro: "/branding",
      en: "/branding",
      ru: "/brending",
    },
    "/support": {
      ro: "/suport",
      en: "/support",
      ru: "/podderzhka",
    },
    "/packages": {
      ro: "/pachete",
      en: "/packages",
      ru: "/pakety",
    },
    "/calculator": {
      ro: "/calculator",
      en: "/calculator",
      ru: "/kalkulyator",
    },
    "/calculator/thank-you": {
      ro: "/calculator/multumim",
      en: "/calculator/thank-you",
      ru: "/kalkulyator/spasibo",
    },
    "/contact/thank-you": {
      ro: "/contact/multumim",
      en: "/contact/thank-you",
      ru: "/kontakty/spasibo",
    },
    "/blog": {
      ro: "/blog",
      en: "/blog",
      ru: "/blog",
    },
    "/blog/[slug]": {
      ro: "/blog/[slug]",
      en: "/blog/[slug]",
      ru: "/blog/[slug]",
    },
    "/services/corporate-website": {
      ro: "/servicii/site-corporativ",
      en: "/services/corporate-website",
      ru: "/uslugi/korporativnyj-sajt",
    },
    "/services/landing-page-development": {
      ro: "/servicii/dezvoltare-landing-page",
      en: "/services/landing-page-development",
      ru: "/uslugi/razrabotka-lending-pejdzh",
    },
    "/services/ecommerce-development": {
      ro: "/servicii/dezvoltare-ecommerce",
      en: "/services/ecommerce-development",
      ru: "/uslugi/razrabotka-internet-magazina",
    },
    "/services/web-application-development": {
      ro: "/servicii/dezvoltare-aplicatii-web",
      en: "/services/web-application-development",
      ru: "/uslugi/razrabotka-veb-prilozhenij",
    },
    "/services/mobile-app-development": {
      ro: "/servicii/dezvoltare-aplicatii-mobile",
      en: "/services/mobile-app-development",
      ru: "/uslugi/razrabotka-mobilnyh-prilozhenij",
    },
    "/services/digital-marketing": {
      ro: "/servicii/marketing-digital",
      en: "/services/digital-marketing",
      ru: "/uslugi/cifrovoj-marketing",
    },
    "/privacy": {
      ro: "/confidentialitate",
      en: "/privacy",
      ru: "/konfidencialnost",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
