"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function HoverEffect({
  items,
  className,
}: {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-zinc-100 dark:bg-zinc-800/60 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div
            className={cn(
              "rounded-2xl h-full w-full p-5 md:p-6 overflow-hidden",
              "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
              "group-hover:border-zinc-300 dark:group-hover:border-zinc-700 relative z-20 transition-colors duration-200"
            )}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
