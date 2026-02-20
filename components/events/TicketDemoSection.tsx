"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, Clock, CheckCircle, QrCode } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

// QR Code SVG Pattern
function QRCodePattern({ isScanning }: { isScanning: boolean }) {
  const pattern = [
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0],
  ];

  const cellSize = 100 / pattern.length;

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {pattern.map((row, y) =>
          row.map((cell, x) =>
            cell === 1 ? (
              <motion.rect
                key={`${x}-${y}`}
                x={x * cellSize}
                y={y * cellSize}
                width={cellSize}
                height={cellSize}
                className="fill-zinc-900"
                initial={{ opacity: 1 }}
                animate={{
                  opacity: isScanning ? [1, 0.3, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: isScanning ? (x + y) * 0.02 : 0,
                }}
              />
            ) : null
          )
        )}
      </svg>

      {/* Scanning line */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9FD48] to-transparent"
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// 3D Ticket Component
function TicketCard({
  isHovered,
  isScanned,
  onHover,
}: {
  isHovered: boolean;
  isScanned: boolean;
  onHover: (hovered: boolean) => void;
}) {
  const t = useTranslations("Events");

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto perspective-1000"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl"
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Ticket Header */}
        <div className="relative bg-gradient-to-r from-[#C9FD48] to-[#a8e035] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-black/60 uppercase tracking-wider">
                {t("ticket.eventLabel")}
              </p>
              <h3 className="text-xl font-bold text-black mt-1">
                Tech Summit 2026
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-black" />
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute -left-4 bottom-0 translate-y-1/2 w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-950" />
          <div className="absolute -right-4 bottom-0 translate-y-1/2 w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-950" />
        </div>

        {/* Dashed line */}
        <div className="border-b-2 border-dashed border-zinc-200 dark:border-zinc-700 mx-6" />

        {/* Ticket Body */}
        <div className="p-6">
          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("ticket.dateLabel")}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  15 Mar 2026
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("ticket.timeLabel")}
                </p>
                <p className="text-sm font-semibold text-foreground">09:00</p>
              </div>
            </div>
            <div className="flex items-center gap-3 col-span-2">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("ticket.locationLabel")}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  Chisinau Arena
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 p-2 bg-white rounded-xl border border-zinc-200">
              <QRCodePattern isScanning={isHovered} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">
                {t("ticket.ticketId")}
              </p>
              <p className="font-mono text-sm font-semibold text-foreground tracking-wider">
                EVT-2026-7X9K2
              </p>

              {/* Scan status */}
              <AnimatePresence mode="wait">
                {isScanned ? (
                  <motion.div
                    key="scanned"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 mt-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-500">
                      {t("ticket.verified")}
                    </span>
                  </motion.div>
                ) : isHovered ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 mt-3"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <QrCode className="w-5 h-5 text-[#C9FD48]" />
                    </motion.div>
                    <span className="text-sm font-medium text-[#C9FD48]">
                      {t("ticket.scanning")}
                    </span>
                  </motion.div>
                ) : (
                  <motion.p
                    key="ready"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-muted-foreground mt-3"
                  >
                    {t("ticket.hoverToScan")}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered
              ? "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)"
              : "transparent",
            backgroundPosition: isHovered ? "200% 0" : "-100% 0",
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function TicketDemoSection() {
  const t = useTranslations("Events");
  const [isHovered, setIsHovered] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  const handleHover = (hovered: boolean) => {
    setIsHovered(hovered);
    if (hovered) {
      setTimeout(() => setIsScanned(true), 1500);
    } else {
      setIsScanned(false);
    }
  };

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48] bg-zinc-50 dark:bg-zinc-950">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 clamp-[gap,16,32] items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <motion.div variants={itemVariant}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {t("ticket.label")}
              </span>
            </div>
            <h2 className="clamp-[text,1.75rem,3.5rem] font-bold leading-tight text-foreground mb-6">
              {t("ticket.title")}
            </h2>
            <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed mb-8">
              {t("ticket.description")}
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariant}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#C9FD48]/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-[#C9FD48]" />
                  </div>
                  <span className="clamp-[text,0.875rem,1rem] text-foreground">
                    {t(`ticket.features.${i}`)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ticket Demo */}
          <motion.div variants={itemVariant}>
            <TicketCard
              isHovered={isHovered}
              isScanned={isScanned}
              onHover={handleHover}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
