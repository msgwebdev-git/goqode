"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  Globe,
  QrCode,
  ScanLine,
  BarChart3,
  Mail,
  CheckCircle,
  CreditCard,
  ShoppingCart,
  Ticket,
  Users,
  TrendingUp,
  Bell,
  Award,
  FileText,
  Smartphone,
  Wifi,
  WifiOff,
  Calendar,
  Clock,
} from "lucide-react";

// ============================================
// 1. WEBSITE DEMO - Browser mockup
// ============================================
function WebsiteDemoVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white dark:bg-zinc-900 rounded-lg px-3 py-1.5 text-xs text-muted-foreground font-mono">
              techsummit2026.com
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-gradient-to-r from-[#C9FD48] to-[#a8e035] rounded-xl p-6 mb-4">
            <div className="w-16 h-2 bg-black/20 rounded mb-2" />
            <div className="w-32 h-4 bg-black/30 rounded mb-4" />
            <div className="w-24 h-8 bg-black rounded-lg" />
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-3">
                <div className="w-6 h-6 bg-zinc-300 dark:bg-zinc-700 rounded mb-2" />
                <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded" />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {["Standard", "VIP", "Premium"].map((type, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700"
              >
                <div className="flex items-center gap-3">
                  <Ticket className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{type}</span>
                </div>
                <div className="text-sm font-bold text-emerald-600 dark:text-[#C9FD48]">
                  {i === 0 ? "€49" : i === 1 ? "€99" : "€149"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        className="absolute -right-4 top-1/4 bg-white dark:bg-zinc-900 rounded-xl p-3 shadow-lg border border-zinc-200 dark:border-zinc-800 hidden md:flex"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <CreditCard className="w-6 h-6 text-[#C9FD48]" />
      </motion.div>
      <motion.div
        className="absolute -left-4 bottom-1/4 bg-white dark:bg-zinc-900 rounded-xl p-3 shadow-lg border border-zinc-200 dark:border-zinc-800 hidden md:flex"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <ShoppingCart className="w-6 h-6 text-[#C9FD48]" />
      </motion.div>
    </div>
  );
}

// ============================================
// 2. QR TICKET DEMO
// ============================================
function QRTicketDemoVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl"
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative bg-gradient-to-r from-[#C9FD48] to-[#a8e035] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-black/60 uppercase">Мероприятие</p>
              <h3 className="text-xl font-bold text-black mt-1">Tech Summit 2026</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-black" />
            </div>
          </div>
          <div className="absolute -left-4 bottom-0 translate-y-1/2 w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-950" />
          <div className="absolute -right-4 bottom-0 translate-y-1/2 w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-950" />
        </div>
        <div className="border-b-2 border-dashed border-zinc-200 dark:border-zinc-700 mx-6" />
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Дата</p>
                <p className="text-sm font-semibold">15 Mar 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Время</p>
                <p className="text-sm font-semibold">09:00</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 p-2 bg-white rounded-xl border border-zinc-200">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Position markers */}
                <rect x="5" y="5" width="25" height="25" fill="black"/>
                <rect x="8" y="8" width="19" height="19" fill="white"/>
                <rect x="11" y="11" width="13" height="13" fill="black"/>

                <rect x="70" y="5" width="25" height="25" fill="black"/>
                <rect x="73" y="8" width="19" height="19" fill="white"/>
                <rect x="76" y="11" width="13" height="13" fill="black"/>

                <rect x="5" y="70" width="25" height="25" fill="black"/>
                <rect x="8" y="73" width="19" height="19" fill="white"/>
                <rect x="11" y="76" width="13" height="13" fill="black"/>

                {/* Data modules */}
                <rect x="35" y="5" width="5" height="5" fill="black"/>
                <rect x="45" y="5" width="5" height="5" fill="black"/>
                <rect x="55" y="5" width="5" height="5" fill="black"/>
                <rect x="35" y="15" width="5" height="5" fill="black"/>
                <rect x="50" y="15" width="5" height="5" fill="black"/>
                <rect x="60" y="15" width="5" height="5" fill="black"/>
                <rect x="40" y="25" width="5" height="5" fill="black"/>
                <rect x="55" y="25" width="5" height="5" fill="black"/>

                <rect x="5" y="35" width="5" height="5" fill="black"/>
                <rect x="15" y="35" width="5" height="5" fill="black"/>
                <rect x="25" y="35" width="5" height="5" fill="black"/>
                <rect x="5" y="45" width="5" height="5" fill="black"/>
                <rect x="20" y="45" width="5" height="5" fill="black"/>
                <rect x="5" y="55" width="5" height="5" fill="black"/>
                <rect x="15" y="55" width="5" height="5" fill="black"/>
                <rect x="25" y="55" width="5" height="5" fill="black"/>

                <rect x="35" y="35" width="5" height="5" fill="black"/>
                <rect x="45" y="35" width="5" height="5" fill="black"/>
                <rect x="55" y="35" width="5" height="5" fill="black"/>
                <rect x="40" y="45" width="5" height="5" fill="black"/>
                <rect x="50" y="45" width="5" height="5" fill="black"/>
                <rect x="60" y="45" width="5" height="5" fill="black"/>
                <rect x="35" y="55" width="5" height="5" fill="black"/>
                <rect x="50" y="55" width="5" height="5" fill="black"/>

                <rect x="70" y="35" width="5" height="5" fill="black"/>
                <rect x="80" y="35" width="5" height="5" fill="black"/>
                <rect x="90" y="35" width="5" height="5" fill="black"/>
                <rect x="75" y="45" width="5" height="5" fill="black"/>
                <rect x="85" y="45" width="5" height="5" fill="black"/>
                <rect x="70" y="55" width="5" height="5" fill="black"/>
                <rect x="80" y="55" width="5" height="5" fill="black"/>
                <rect x="90" y="55" width="5" height="5" fill="black"/>

                <rect x="35" y="70" width="5" height="5" fill="black"/>
                <rect x="45" y="70" width="5" height="5" fill="black"/>
                <rect x="60" y="70" width="5" height="5" fill="black"/>
                <rect x="40" y="80" width="5" height="5" fill="black"/>
                <rect x="55" y="80" width="5" height="5" fill="black"/>
                <rect x="35" y="90" width="5" height="5" fill="black"/>
                <rect x="50" y="90" width="5" height="5" fill="black"/>
                <rect x="60" y="90" width="5" height="5" fill="black"/>

                <rect x="70" y="70" width="5" height="5" fill="black"/>
                <rect x="85" y="70" width="5" height="5" fill="black"/>
                <rect x="75" y="80" width="5" height="5" fill="black"/>
                <rect x="90" y="80" width="5" height="5" fill="black"/>
                <rect x="70" y="90" width="5" height="5" fill="black"/>
                <rect x="80" y="90" width="5" height="5" fill="black"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ID билета</p>
              <p className="font-mono text-sm font-semibold">EVT-2026-7X9K2</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================
// 3. CHECK-IN DEMO
// ============================================
function CheckInDemoVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-zinc-900 rounded-[3rem] p-3 shadow-2xl">
        <div className="bg-white dark:bg-zinc-950 rounded-[2.5rem] overflow-hidden">
          <div className="bg-zinc-100 dark:bg-zinc-900 px-6 py-2 flex items-center justify-between">
            <span className="text-xs font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-4 h-4" />
              <div className="w-6 h-3 bg-zinc-400 rounded-sm" />
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg">Check-in Scanner</h3>
                <p className="text-xs text-muted-foreground">Tech Summit 2026</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-emerald-500">Online</span>
              </div>
            </div>
            <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-2xl mb-4 overflow-hidden">
              <div className="absolute inset-4 border-2 border-[#C9FD48] rounded-xl" />
              <motion.div
                className="absolute left-4 right-4 h-0.5 bg-[#C9FD48]"
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode className="w-16 h-16 text-zinc-300 dark:text-zinc-600" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-emerald-600 dark:text-[#C9FD48]">847</p>
                <p className="text-xs text-muted-foreground">Вошли</p>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">1,200</p>
                <p className="text-xs text-muted-foreground">Всего</p>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-emerald-500">71%</p>
                <p className="text-xs text-muted-foreground">Явка</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 4. ANALYTICS DEMO
// ============================================
function AnalyticsDemoVisual() {
  const bars = [65, 45, 80, 55, 90, 70, 85];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">Analytics Dashboard</h3>
              <p className="text-xs text-muted-foreground">Tech Summit 2026</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#C9FD48]/10 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
              <span className="text-xs font-medium text-[#C9FD48]">Live</span>
            </div>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-muted-foreground">Выручка</span>
            </div>
            <p className="text-xl font-bold">€58,400</p>
            <p className="text-xs text-emerald-500">+12% за неделю</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Билеты</span>
            </div>
            <p className="text-xl font-bold">1,247</p>
            <p className="text-xs text-blue-500">из 1,500</p>
          </div>
        </div>
        <div className="px-4 pb-4">
          <p className="text-xs text-muted-foreground mb-3">Продажи за неделю</p>
          <div className="flex items-end justify-between gap-2 h-24">
            {bars.map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-[#C9FD48] rounded-t-lg"
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
              <span key={day} className="text-xs text-muted-foreground">{day}</span>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        className="absolute -right-2 top-1/4 bg-white dark:bg-zinc-900 rounded-xl p-3 shadow-lg border border-zinc-200 dark:border-zinc-800 hidden md:block"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-medium">+5 билетов</p>
            <p className="text-xs text-muted-foreground">только что</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================
// 5. ADDITIONAL SERVICES DEMO
// ============================================
function AdditionalServicesDemoVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto space-y-4">
      <motion.div
        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-[#C9FD48]/10 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-[#C9FD48]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-sm">Напоминание о событии</p>
              <span className="text-xs text-muted-foreground">2ч назад</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Tech Summit 2026 начнётся через 24 часа. Не забудьте ваш билет!
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-[#C9FD48]/10 flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-5 h-5 text-[#C9FD48]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-sm">SMS-напоминание</p>
              <span className="text-xs text-muted-foreground">1д назад</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Завтра Tech Summit 2026! Ваш билет: EVT-2026-7X9K2. Начало в 09:00.
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-[#C9FD48]/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#C9FD48]" />
          </div>
          <div>
            <p className="font-medium text-sm">Оцените мероприятие</p>
            <p className="text-xs text-muted-foreground">Ваше мнение важно для нас</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="absolute -left-4 top-0 bg-white dark:bg-zinc-900 rounded-full p-3 shadow-lg border border-zinc-200 dark:border-zinc-800 hidden md:block"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Bell className="w-5 h-5 text-[#C9FD48]" />
      </motion.div>
    </div>
  );
}

// ============================================
// STICKY CARD COMPONENT
// ============================================
interface StickyCardProps {
  index: number;
  icon: typeof Globe;
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function StickyCard({ index, icon: Icon, children, progress, range, targetScale }: StickyCardProps) {
  const t = useTranslations("Events");
  const containerRef = useRef<HTMLDivElement>(null);

  // Track when this card enters viewport for image animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Scale based on overall scroll progress
  const scale = useTransform(progress, range, [1, targetScale]);

  const isReversed = index % 2 !== 0;

  // Card background colors for variety
  const cardBgColors = [
    "bg-white dark:bg-zinc-900",
    "bg-zinc-50 dark:bg-zinc-900",
    "bg-white dark:bg-zinc-900",
    "bg-zinc-50 dark:bg-zinc-900",
    "bg-white dark:bg-zinc-900",
  ];

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        className={`w-full md:w-[calc(100%-48px)] md:max-w-7xl ${cardBgColors[index]} rounded-2xl md:rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden origin-top`}
        style={{
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
      >
        <div className="p-6 md:clamp-[p,20,40]">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center ${
              isReversed ? "lg:grid-flow-dense" : ""
            }`}
          >
            {/* Text Content */}
            <div className={isReversed ? "lg:col-start-2" : ""}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-[#C9FD48]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#C9FD48]" />
                </div>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                  {t(`services.items.${index}.title`)}
                </span>
              </div>
              <h2 className="clamp-[text,1.5rem,2.5rem] font-bold leading-tight text-foreground mb-4">
                {t(`solutions.${index}.headline`)}
              </h2>
              <p className="clamp-[text,1rem,1.125rem] text-muted-foreground leading-relaxed mb-6">
                {t(`services.items.${index}.description`)}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {t(`solutions.${index}.features`)
                  .split("|")
                  .map((feature: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-[#C9FD48]/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-[#C9FD48]" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Visual Demo - hidden on mobile for sticky effect */}
            <div className={`hidden lg:block ${isReversed ? "lg:col-start-1 lg:row-start-1" : ""}`}>
              {children}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================
// EXPORT MAIN COMPONENT
// ============================================
export function SolutionsShowcase() {
  const t = useTranslations("Events");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cards = [
    { icon: Globe, component: <WebsiteDemoVisual /> },
    { icon: QrCode, component: <QRTicketDemoVisual /> },
    { icon: ScanLine, component: <CheckInDemoVisual /> },
    { icon: BarChart3, component: <AnalyticsDemoVisual /> },
    { icon: Mail, component: <AdditionalServicesDemoVisual /> },
  ];

  return (
    <section ref={containerRef} className="relative bg-zinc-100 dark:bg-zinc-950 px-6 md:px-0">
      {/* Header Section - внутри серой секции */}
      <div className="px-6 md:clamp-[px,12,24] pt-12 pb-8 md:pt-32 md:pb-24">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 md:gap-[0.4vw] mb-2 md:mb-6">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C9FD48]" />
            <span className="clamp-[text,0.75rem,0.875rem] font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              {t("services.label")}
            </span>
          </div>
          <h2 className="text-[8vw] md:clamp-[text,2.5rem,6rem] font-black leading-[0.95] text-foreground uppercase tracking-tight">
            {t("services.title")}
          </h2>
        </div>
      </div>

      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.05;
        return (
          <StickyCard
            key={i}
            index={i}
            icon={card.icon}
            progress={scrollYProgress}
            range={[i * 0.2, 1]}
            targetScale={targetScale}
          >
            {card.component}
          </StickyCard>
        );
      })}
    </section>
  );
}
