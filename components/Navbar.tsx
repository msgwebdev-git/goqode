"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Sun,
  Moon,
  Globe,
  ArrowRight,
  ChevronDown,
  Rocket,
  TrendingUp,
  Globe2,
  CalendarDays,
  Cog,
  Palette,
  HeadphonesIcon,
  Calculator,
  FileText,
  ShoppingCart,
  Building2,
  AppWindow,
  Smartphone,
  Megaphone,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const solutions = [
  { key: "launch", href: "/launch", icon: Rocket },
  { key: "growth", href: "/growth", icon: TrendingUp },
  { key: "platforms", href: "/platforms", icon: Globe2 },
  { key: "events", href: "/events", icon: CalendarDays },
  { key: "automation", href: "/automation", icon: Cog },
  { key: "branding", href: "/branding", icon: Palette },
  { key: "support", href: "/support", icon: HeadphonesIcon },
] as const;

const services = [
  { key: "landing", href: "/services/landing-page-development", icon: FileText },
  { key: "ecommerce", href: "/services/ecommerce-development", icon: ShoppingCart },
  { key: "corporate", href: "/services/corporate-website", icon: Building2 },
  { key: "webapp", href: "/services/web-application-development", icon: AppWindow },
  { key: "mobile", href: "/services/mobile-app-development", icon: Smartphone },
  { key: "marketing", href: "/services/digital-marketing", icon: Megaphone },
] as const;

const navItems = [
  { key: "cases", href: "/cases" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

const locales: { code: Locale; label: string; flag: string }[] = [
  { code: "ro", label: "Romana", flag: "🇷🇴" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export function Navbar() {
  const t = useTranslations("Navbar");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [langDrawerOpen, setLangDrawerOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params.locale as Locale) || "ro";

  React.useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (menuOpen || langDrawerOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.inset = "0";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.inset = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.inset = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen, langDrawerOpen]);

  const handleLocaleChange = (locale: Locale) => {
    router.replace(
      // @ts-expect-error -- pathname + params always match for the current route
      { pathname, params },
      { locale }
    );
  };

  return (
    <>
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="w-full px-6 md:clamp-[px,12,24]">
        <div className="flex h-16 w-full items-center justify-between">
          {/* Logo */}
          <div className="nav-fade-in [animation-delay:50ms]">
            <Link href="/" className="flex-shrink-0 relative z-10 block">
              <Image
                src="/goqode-white.svg"
                alt="GoQode"
                width={120}
                height={40}
                className="h-8 w-auto dark:hidden"
                priority
              />
              <Image
                src="/goqode-dark.svg"
                alt="GoQode"
                width={120}
                height={40}
                className="h-8 w-auto hidden dark:block"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div
            className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] backdrop-blur-sm border border-black/[0.05] dark:border-white/[0.1] nav-fade-in [animation-delay:150ms]"
          >
            {/* Solutions Mega Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-wider text-foreground/70 rounded-full transition-all duration-300 hover:text-foreground hover:font-semibold hover:bg-background hover:shadow-sm cursor-pointer group">
                  {t("solutions")}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={12}
                className="w-[580px] p-0 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-0">
                  {solutions.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.key} asChild className="p-0 focus:bg-transparent">
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-start gap-4 p-5 cursor-pointer transition-all duration-200 hover:bg-accent/50 group/item",
                            index % 2 === 0 && index < solutions.length - 1 && "border-r border-border/30",
                            index < solutions.length - 2 && "border-b border-border/30",
                            index === solutions.length - 1 && solutions.length % 2 !== 0 && "col-span-2 border-t border-border/30"
                          )}
                        >
                          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-black/[0.06] dark:bg-white/[0.08] flex items-center justify-center group-hover/item:bg-black/[0.1] dark:group-hover/item:bg-white/[0.12] transition-all duration-200">
                            <Icon className="h-5 w-5 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                          </div>
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-sm font-semibold text-foreground group-hover/item:text-foreground transition-colors">
                              {t(`solutionsMenu.${item.key}`)}
                            </span>
                            <span className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                              {t(`solutionsMenu.${item.key}Desc`)}
                            </span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-wider text-foreground/70 rounded-full transition-all duration-300 hover:text-foreground hover:font-semibold hover:bg-background hover:shadow-sm cursor-pointer group">
                  {t("services")}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={12}
                className="w-[580px] p-0 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-0">
                  {services.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.key} asChild className="p-0 focus:bg-transparent">
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-start gap-4 p-5 cursor-pointer transition-all duration-200 hover:bg-accent/50 group/item",
                            index % 2 === 0 && index < services.length - 1 && "border-r border-border/30",
                            index < services.length - 2 && "border-b border-border/30",
                            index === services.length - 1 && services.length % 2 !== 0 && "col-span-2 border-t border-border/30"
                          )}
                        >
                          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-black/[0.06] dark:bg-white/[0.08] flex items-center justify-center group-hover/item:bg-black/[0.1] dark:group-hover/item:bg-white/[0.12] transition-all duration-200">
                            <Icon className="h-5 w-5 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                          </div>
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-sm font-semibold text-foreground group-hover/item:text-foreground transition-colors">
                              {t(`servicesMenu.${item.key}`)}
                            </span>
                            <span className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                              {t(`servicesMenu.${item.key}Desc`)}
                            </span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Packages — regular link */}
            <Link
              href="/packages"
              className="relative px-4 py-2 text-sm font-medium uppercase tracking-wider text-foreground/70 rounded-full transition-all duration-300 hover:text-foreground hover:font-semibold hover:bg-background hover:shadow-sm"
            >
              {t("packages")}
            </Link>

            {/* Other nav items */}
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium uppercase tracking-wider text-foreground/70 rounded-full transition-all duration-300 hover:text-foreground hover:font-semibold hover:bg-background hover:shadow-sm"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 nav-fade-in [animation-delay:250ms]">
            {/* Language Switcher — desktop only */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer hidden xl:inline-flex">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Switch language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {locales.map((locale) => (
                  <DropdownMenuItem
                    key={locale.code}
                    onClick={() => handleLocaleChange(locale.code)}
                    className={cn(
                      "cursor-pointer gap-2",
                      currentLocale === locale.code && "bg-accent"
                    )}
                  >
                    <span>{locale.flag}</span>
                    <span>{locale.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle — desktop only */}
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer hidden xl:inline-flex"
              onClick={() =>
                mounted && setTheme(resolvedTheme === "light" ? "dark" : "light")
              }
            >
              {mounted ? (
                resolvedTheme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )
              ) : (
                <div className="h-5 w-5 bg-muted rounded-full animate-pulse" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* CTA Buttons - Desktop */}
            <Link
              href="/calculator"
              className="hidden xl:inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full border border-zinc-900 dark:border-[#C9FD48] text-zinc-900 dark:text-[#C9FD48] font-semibold text-sm transition-all duration-300 hover:bg-zinc-900/5 dark:hover:bg-[#C9FD48]/10 group overflow-hidden"
            >
              <Calculator className="h-4 w-4" />
              <span>{t("calculator")}</span>
            </Link>
            <Link
              href="/contact"
              className="hidden xl:inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-[#C9FD48] text-black font-semibold text-sm transition-all duration-300 hover:bg-[#b8ec3d] hover:shadow-[0_0_20px_rgba(201,253,72,0.5)] group overflow-hidden"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">{t("cta")}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Mobile Language Button */}
            <button
              onClick={() => setLangDrawerOpen(true)}
              className="xl:hidden flex items-center justify-center h-8 px-2.5 rounded-full border border-border/50 text-xs font-semibold text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
            >
              {currentLocale.toUpperCase()}
            </button>

            {/* Mobile Burger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden relative z-10 w-10 h-10 flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="relative w-[22px] h-[18px]">
                <span
                  className={cn(
                    "absolute left-0 w-full h-[2px] bg-foreground rounded-full origin-center transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                    menuOpen ? "translate-y-[8px] rotate-45" : "translate-y-0 rotate-0"
                  )}
                  style={{ top: 0 }}
                />
                <span
                  className={cn(
                    "absolute left-0 w-[70%] h-[2px] bg-foreground rounded-full transition-all duration-[250ms]",
                    menuOpen ? "opacity-0 translate-x-3" : "opacity-100 translate-x-0"
                  )}
                  style={{ top: 8 }}
                />
                <span
                  className={cn(
                    "absolute left-0 w-full h-[2px] bg-foreground rounded-full origin-center transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                    menuOpen ? "-translate-y-[8px] -rotate-45" : "translate-y-0 rotate-0"
                  )}
                  style={{ top: 16 }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

    </header>

    {/* Mobile Menu Overlay — always mounted, CSS transitions */}
    <div
      className={cn(
        "fixed inset-0 bg-black/50 transition-opacity duration-[250ms]",
        menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      style={{ zIndex: 55 }}
      onClick={() => setMenuOpen(false)}
    />
    <div
      className={cn(
        "fixed inset-y-0 right-0 w-full bg-background shadow-2xl flex flex-col pt-16 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
        menuOpen ? "translate-x-0" : "translate-x-full"
      )}
      style={{ zIndex: 56 }}
    >
      {/* Top bar — logo + close */}
      <div className="absolute top-0 left-0 right-0 h-16 px-6 flex items-center justify-between">
          <Image
            src="/goqode-white.svg"
            alt="GoQode"
            width={120}
            height={40}
            className="h-8 w-auto dark:hidden"
          />
          <Image
            src="/goqode-dark.svg"
            alt="GoQode"
            width={120}
            height={40}
            className="h-8 w-auto hidden dark:block"
          />
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setMenuOpen(false); setLangDrawerOpen(true); }}
            className="flex items-center justify-center h-8 px-2.5 rounded-full border border-border/50 text-xs font-semibold text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
          >
            {currentLocale.toUpperCase()}
          </button>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center w-10 h-10 cursor-pointer"
            aria-label="Close menu"
          >
            <div className="relative w-[22px] h-[18px]">
              <span
                className="absolute left-0 w-full h-[2px] bg-foreground rounded-full origin-center translate-y-[8px] rotate-45"
                style={{ top: 0 }}
              />
              <span
                className="absolute left-0 w-full h-[2px] bg-foreground rounded-full origin-center -translate-y-[8px] -rotate-45"
                style={{ top: 16 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Scrollable nav content */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-6 pt-6" style={{ touchAction: "pan-y" }}>
        {/* Solutions — priority */}
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          {t("solutions")}
        </p>
        <div className="flex flex-col gap-0">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-3 text-lg font-semibold text-foreground hover:text-[#C9FD48] transition-colors group border-b border-border/30 last:border-b-0"
              >
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-[#C9FD48] transition-colors shrink-0" />
                <span>{t(`solutionsMenu.${item.key}`)}</span>
              </Link>
            );
          })}
        </div>

        {/* Services */}
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 mt-6">
          {t("services")}
        </p>
        <div className="flex flex-col gap-0">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-3 text-lg font-semibold text-foreground hover:text-[#C9FD48] transition-colors group border-b border-border/30 last:border-b-0"
              >
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-[#C9FD48] transition-colors shrink-0" />
                <span>{t(`servicesMenu.${item.key}`)}</span>
              </Link>
            );
          })}
        </div>

        {/* Packages — highlighted */}
        <Link
          href="/packages"
          onClick={() => setMenuOpen(false)}
          className="mt-4 flex items-center justify-center gap-2 w-full h-11 rounded-full bg-[#C9FD48] text-black font-semibold text-sm transition-all duration-300 hover:bg-[#b8ec3d]"
        >
          {t("packages")}
        </Link>

        {/* Other nav links */}
        <div className="mt-6 pt-6 border-t border-border/50 flex flex-col gap-0">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-lg font-semibold text-foreground hover:text-[#C9FD48] transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 pb-8 pt-4 border-t border-border/50 space-y-3">
        <Link
          href="/calculator"
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center gap-2 w-full h-12 rounded-full border border-zinc-900 dark:border-[#C9FD48] text-zinc-900 dark:text-[#C9FD48] font-semibold transition-all duration-300 hover:bg-zinc-900/5 dark:hover:bg-[#C9FD48]/10"
        >
          <Calculator className="h-4 w-4" />
          <span>{t("calculator")}</span>
        </Link>
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-[#C9FD48] text-black font-semibold transition-all duration-300 hover:bg-[#b8ec3d]"
        >
          <span>{t("cta")}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="flex items-center justify-center">
          <button
            onClick={() =>
              mounted && setTheme(resolvedTheme === "light" ? "dark" : "light")
            }
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-border/50"
          >
            {mounted && (
              resolvedTheme === "light" ? (
                <>
                  <Moon className="h-3.5 w-3.5" />
                  <span>Dark mode</span>
                </>
              ) : (
                <>
                  <Sun className="h-3.5 w-3.5" />
                  <span>Light mode</span>
                </>
              )
            )}
          </button>
        </div>
      </div>
    </div>

    {/* Language Drawer — always mounted, CSS transitions */}
    <div
      className={cn(
        "fixed inset-0 bg-black/50 transition-opacity duration-200",
        langDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      style={{ zIndex: 60 }}
      onClick={() => setLangDrawerOpen(false)}
    />
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
        langDrawerOpen ? "translate-y-0" : "translate-y-full"
      )}
      style={{ zIndex: 61 }}
    >
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
      </div>
      <div className="px-6 pb-8 pt-2">
        <div className="flex flex-col gap-1">
          {locales.map((locale) => (
            <button
              key={locale.code}
              onClick={() => {
                handleLocaleChange(locale.code);
                setLangDrawerOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 py-3.5 px-4 rounded-xl transition-colors text-left cursor-pointer",
                currentLocale === locale.code
                  ? "bg-foreground text-background"
                  : "hover:bg-accent"
              )}
            >
              <span className="text-lg">{locale.flag}</span>
              <span className="font-medium text-sm">{locale.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
