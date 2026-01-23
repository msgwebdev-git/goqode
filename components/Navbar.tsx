"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Globe,
  Menu,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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

  const handleLocaleChange = (locale: Locale) => {
    router.replace(pathname, { locale });
  };

  const currentLocaleData = locales.find((l) => l.code === currentLocale);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="w-full clamp-[px,12,24]">
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
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
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

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
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
              className="hidden sm:inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-[#C9FD48] text-black font-semibold text-sm transition-all duration-300 hover:bg-[#b8ec3d] hover:shadow-[0_0_20px_rgba(201,253,72,0.5)] group overflow-hidden"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">{t("cta")}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    {mounted && (
                      <Image
                        src={
                          resolvedTheme === "dark"
                            ? "/goQode - dark.svg"
                            : "/goQode - white.svg"
                        }
                        alt="GoQode"
                        width={100}
                        height={32}
                        className="h-7 w-auto"
                      />
                    )}
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-1">
                  {/* Solutions with submenu */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between py-3 px-4 rounded-lg text-base font-medium text-muted-foreground">
                      {t("solutions")}
                    </div>
                    <div className="pl-2 flex flex-col gap-1">
                      {solutions.map((item) => {
                        const Icon = item.icon;
                        return (
                          <SheetClose asChild key={item.key}>
                            <Link
                              href={item.href}
                              className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-accent transition-colors group"
                            >
                              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-black/[0.06] dark:bg-white/[0.08] flex items-center justify-center group-hover:bg-black/[0.1] dark:group-hover:bg-white/[0.12] transition-colors">
                                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                              </div>
                              <span className="flex-1">{t(`solutionsMenu.${item.key}`)}</span>
                              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          </SheetClose>
                        );
                      })}
                    </div>
                  </div>
                  {/* Other nav items */}
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.key}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between py-3 px-4 rounded-lg text-base font-medium hover:bg-accent transition-colors"
                      >
                        {t(item.key)}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t">
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-[#C9FD48] text-black font-semibold transition-all duration-300 hover:bg-[#b8ec3d] hover:shadow-[0_0_20px_rgba(201,253,72,0.5)] group overflow-hidden"
                    >
                      <span className="transition-transform duration-300 group-hover:-translate-x-1">{t("cta")}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </SheetClose>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    {t("language")}
                  </p>
                  <div className="flex gap-2">
                    {locales.map((locale) => (
                      <SheetClose asChild key={locale.code}>
                        <Button
                          variant={
                            currentLocale === locale.code ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handleLocaleChange(locale.code)}
                          className="flex-1"
                        >
                          <span className="mr-1">{locale.flag}</span>
                          {locale.code.toUpperCase()}
                        </Button>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </motion.div>
      </nav>
    </header>
  );
}
