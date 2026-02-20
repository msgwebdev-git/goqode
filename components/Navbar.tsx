"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Globe,
  ChevronRight,
  ArrowRight,
  ChevronDown,
  Rocket,
  TrendingUp,
  Globe2,
  CalendarDays,
  Cog,
  Palette,
  HeadphonesIcon
} from "lucide-react";
import type { Locale } from "@/i18n/routing";

const navContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const navItem = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
  { key: "branding", href: "/solutions/branding", icon: Palette },
  { key: "support", href: "/solutions/support", icon: HeadphonesIcon },
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
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, langDrawerOpen]);

  const handleLocaleChange = (locale: Locale) => {
    router.replace(pathname, { locale });
  };

  const currentLocaleData = locales.find((l) => l.code === currentLocale);

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
        <motion.div
          className="flex h-16 w-full items-center justify-between"
          variants={navContainer}
          initial="hidden"
          animate="show"
        >
          {/* Logo */}
          <motion.div variants={navItem}>
            <Link href="/" className="flex-shrink-0 relative z-10 block">
            {mounted ? (
              <Image
                src={
                  resolvedTheme === "dark"
                    ? "/goQode - dark.svg"
                    : "/goQode - white.svg"
                }
                alt="GoQode"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            ) : (
              <div className="h-8 w-28 bg-muted rounded animate-pulse" />
            )}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            variants={navItem}
            className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] backdrop-blur-sm border border-black/[0.05] dark:border-white/[0.1]"
          >
            {/* Solutions Mega Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-wider text-foreground/70 rounded-full border border-black/20 dark:border-white/20 transition-all duration-300 hover:text-foreground hover:font-semibold hover:bg-background hover:shadow-sm cursor-pointer group">
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
                {/* Footer CTA */}
                <div className="p-4 bg-accent/30 border-t border-border/30">
                  <Link
                    href="/solutions"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-foreground text-background text-sm font-medium transition-all duration-200 hover:opacity-90 group/cta"
                  >
                    <span>{t("allSolutions")}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

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
          </motion.div>

          {/* Right Side Actions */}
          <motion.div variants={navItem} className="flex items-center gap-2">
            {/* Language Switcher — desktop only */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer hidden lg:inline-flex">
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
              className="cursor-pointer hidden lg:inline-flex"
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

            {/* CTA Button - Desktop */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-[#C9FD48] text-black font-semibold text-sm transition-all duration-300 hover:bg-[#b8ec3d] hover:shadow-[0_0_20px_rgba(201,253,72,0.5)] group overflow-hidden"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">{t("cta")}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Mobile Language Button */}
            <button
              onClick={() => setLangDrawerOpen(true)}
              className="lg:hidden flex items-center justify-center h-8 px-2.5 rounded-full border border-border/50 text-xs font-semibold text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
            >
              {currentLocale.toUpperCase()}
            </button>

            {/* Mobile Burger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="relative w-[22px] h-[18px]">
                <motion.span
                  className="absolute left-0 w-full h-[2px] bg-foreground rounded-full origin-center"
                  style={{ top: 0 }}
                  animate={menuOpen ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.span
                  className="absolute left-0 w-[70%] h-[2px] bg-foreground rounded-full"
                  style={{ top: 8 }}
                  animate={menuOpen ? { opacity: 0, x: 12 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="absolute left-0 w-full h-[2px] bg-foreground rounded-full origin-center"
                  style={{ top: 16 }}
                  animate={menuOpen ? { y: -8, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </button>
          </motion.div>
        </motion.div>
      </nav>

    </header>

    {/* Mobile Menu Overlay — outside header stacking context */}
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/50"
            style={{ zIndex: 55 }}
          />
          <motion.div
            initial={{ transform: "translateX(100%)" }}
            animate={{ transform: "translateX(0%)" }}
            exit={{ transform: "translateX(100%)" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            style={{ willChange: "transform", zIndex: 56 }}
            className="fixed inset-y-0 right-0 w-full bg-background shadow-2xl flex flex-col pt-16"
          >
            {/* Top bar — logo + close */}
            <div className="absolute top-0 left-0 right-0 h-16 px-6 flex items-center justify-between">
              {mounted && (
                <Image
                  src={resolvedTheme === "dark" ? "/goQode - dark.svg" : "/goQode - white.svg"}
                  alt="GoQode"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              )}
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
                <motion.span
                  className="absolute left-0 w-full h-[2px] bg-foreground rounded-full origin-center"
                  style={{ top: 0 }}
                  animate={{ y: 8, rotate: 45 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.span
                  className="absolute left-0 w-full h-[2px] bg-foreground rounded-full origin-center"
                  style={{ top: 16 }}
                  animate={{ y: -8, rotate: -45 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </button>
            </div>
            </div>

            {/* Scrollable nav content */}
            <div className="flex-1 overflow-y-auto px-6 pt-6">
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
                <Link
                  href="/packages"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-lg font-semibold text-foreground hover:text-[#C9FD48] transition-colors"
                >
                  {t("packages") || "Пакеты"}
                </Link>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="px-6 pb-8 pt-4 border-t border-border/50 space-y-4">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* Language Drawer — outside header stacking context */}
    <AnimatePresence>
      {langDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLangDrawerOpen(false)}
            className="fixed inset-0 bg-black/50"
            style={{ zIndex: 60 }}
          />
          <motion.div
            initial={{ transform: "translateY(100%)" }}
            animate={{ transform: "translateY(0%)" }}
            exit={{ transform: "translateY(100%)" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            style={{ willChange: "transform", zIndex: 61 }}
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl"
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
