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
