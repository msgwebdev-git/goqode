"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const solutionLinks = [
  { key: "launch", href: "/launch" },
  { key: "growth", href: "/growth" },
  { key: "platforms", href: "/platforms" },
  { key: "events", href: "/events" },
  { key: "branding", href: "/branding" },
  { key: "automation", href: "/automation" },
  { key: "support", href: "/support" },
] as const;

const serviceLinks = [
  { key: "landing", href: "/services/landing-page-development" },
  { key: "ecommerce", href: "/services/ecommerce-development" },
  { key: "corporate", href: "/services/corporate-website" },
  { key: "webapp", href: "/services/web-application-development" },
  { key: "mobile", href: "/services/mobile-app-development" },
  { key: "marketing", href: "/services/digital-marketing" },
] as const;

const companyLinks = [
  { key: "about", href: "/about" },
  { key: "cases", href: "/cases" },
  { key: "packages", href: "/packages" },
  { key: "calculator", href: "/calculator" },
  { key: "contact", href: "/contact" },
] as const;

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/goqode",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/goqode",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/goqode",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-950 dark:bg-zinc-950 text-white">
      {/* CTA Banner */}
      <div className="px-6 md:clamp-[px,12,24] pt-16 pb-12 md:pt-24 md:pb-16">
        <Link href="/contact" className="group block">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="w-full text-[10vw] md:text-[7vw] font-black leading-[0.9] tracking-tight uppercase text-white">
              <span className="inline-flex items-center justify-between w-full">
                <span className="text-[#C9FD48]">{t("cta")}</span>
                <ArrowUpRight className="w-[7vw] md:w-[5vw] h-[7vw] md:h-[5vw] text-[#C9FD48] transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 shrink-0" />
              </span>
            </h2>
          </div>
          <div className="mt-6 h-px bg-zinc-800 group-hover:bg-[#C9FD48] transition-colors duration-500" />
        </Link>
      </div>

      {/* Main Footer Content */}
      <div className="px-6 md:clamp-[px,12,24] pb-8">
        {/* Mobile: Accordions */}
        <div className="md:hidden pb-8 border-b border-zinc-800">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="solutions" className="border-zinc-800">
              <AccordionTrigger className="text-xs font-semibold text-zinc-500 uppercase tracking-widest hover:no-underline">
                {t("solutions.title")}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3">
                  {solutionLinks.map(({ key, href }) => (
                    <li key={key}>
                      <Link href={href} className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                        {t(`solutions.${key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="services" className="border-zinc-800">
              <AccordionTrigger className="text-xs font-semibold text-zinc-500 uppercase tracking-widest hover:no-underline">
                {t("services.title")}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3">
                  {serviceLinks.map(({ key, href }) => (
                    <li key={key}>
                      <Link href={href} className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                        {t(`services.${key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="company" className="border-zinc-800">
              <AccordionTrigger className="text-xs font-semibold text-zinc-500 uppercase tracking-widest hover:no-underline">
                {t("company.title")}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3">
                  {companyLinks.map(({ key, href }) => (
                    <li key={key}>
                      <Link href={href} className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                        {t(`company.${key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Contact — always visible on mobile */}
          <div className="pt-6">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-5">
              {t("contact.title")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@goqode.agency" className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                  hello@goqode.agency
                </a>
              </li>
              <li>
                <a href="tel:+37360000000" className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                  +373 60 000 000
                </a>
              </li>
              <li>
                <span className="text-sm text-zinc-500">Chișinău, Moldova</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-zinc-500 hover:text-white transition-colors duration-200"
                  suppressHydrationWarning
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-12 pb-12 border-b border-zinc-800">
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-5">
              {t("solutions.title")}
            </h4>
            <ul className="space-y-3">
              {solutionLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                    {t(`solutions.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-5">
              {t("services.title")}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                    {t(`services.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-5">
              {t("company.title")}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                    {t(`company.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-5">
              {t("contact.title")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@goqode.agency" className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                  hello@goqode.agency
                </a>
              </li>
              <li>
                <a href="tel:+37360000000" className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                  +373 60 000 000
                </a>
              </li>
              <li>
                <span className="text-sm text-zinc-500">Chișinău, Moldova</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-zinc-500 hover:text-white transition-colors duration-200"
                  suppressHydrationWarning
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <Link href="/" className="inline-block">
            <Image
              src="/goqode-dark.svg"
              alt="GoQode"
              width={100}
              height={28}
              className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity duration-200"
            />
          </Link>
          <p className="text-xs text-zinc-600">
            © {currentYear} GoQode. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
