"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import Shuffle from "./Shuffle";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

// Card 1 - Accent color with rocket icon
function Card1({ solution, task, result }: { solution: string; task: string; result: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full rounded-3xl bg-[#C9FD48] overflow-hidden p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
        {/* Decorative circles */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%]">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-black/10"
            animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-[15%] rounded-full border-2 border-black/10"
            animate={{ scale: isHovered ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.div
            className="absolute inset-[30%] rounded-full border-2 border-black/10"
            animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
        </div>

        {/* Rocket icon in center */}
        <motion.div
          className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/70 md:w-[120px] md:h-[120px]">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
          </svg>
        </motion.div>

        <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
          <h3 className="text-2xl md:text-4xl font-bold text-black mb-3 md:mb-4">{solution}</h3>
          <div className="flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-4">
            {task.split(", ").map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 md:px-6 md:py-3 bg-black/90 text-white text-sm md:text-lg font-medium rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-black/80 font-semibold text-base md:text-xl">{result}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Card 2 - Wide (2x1) - Sales dashboard
function Card2({ solution, task, result }: { solution: string; task: string; result: string }) {
  const chartBars = [35, 45, 30, 60, 45, 75, 55, 85, 70, 95];

  return (
    <motion.div
      variants={cardVariant}
      className="group relative h-full"
    >
      <div className="relative h-full rounded-3xl bg-zinc-800 dark:bg-zinc-200 overflow-hidden p-5 md:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col">
        {/* Sales dashboard mockup - compact layout */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* KPI Row - horizontal on all screens */}
          <div className="flex gap-2 md:gap-3 mb-3">
            {/* Revenue */}
            <motion.div
              className="flex-1 bg-zinc-700/50 dark:bg-zinc-300/50 rounded-lg p-2 md:p-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-[8px] md:text-[10px] text-white/50 dark:text-black/50 uppercase tracking-wider mb-1">Revenue</div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm md:text-lg font-bold text-white dark:text-black">$48.2k</span>
                <span className="text-[8px] md:text-xs text-emerald-400 font-semibold">+24%</span>
              </div>
            </motion.div>

            {/* Orders */}
            <motion.div
              className="flex-1 bg-zinc-700/50 dark:bg-zinc-300/50 rounded-lg p-2 md:p-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-[8px] md:text-[10px] text-white/50 dark:text-black/50 uppercase tracking-wider mb-1">Orders</div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm md:text-lg font-bold text-white dark:text-black">1,847</span>
                <span className="text-[8px] md:text-xs text-emerald-400 font-semibold">+18%</span>
              </div>
            </motion.div>

            {/* Conversion */}
            <motion.div
              className="flex-1 bg-[#C9FD48]/20 dark:bg-[#C9FD48]/30 rounded-lg p-2 md:p-3 border border-[#C9FD48]/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-[8px] md:text-[10px] text-[#C9FD48]/70 dark:text-[#5a7a00] uppercase tracking-wider mb-1">Conversion</div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm md:text-lg font-bold text-[#C9FD48] dark:text-[#4a6600]">12.4%</span>
                <span className="text-[8px] md:text-xs text-emerald-400 dark:text-emerald-600 font-semibold">+147%</span>
              </div>
            </motion.div>
          </div>

          {/* Chart - takes remaining space */}
          <div className="flex-1 bg-zinc-700/30 dark:bg-zinc-300/30 rounded-lg p-3 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] md:text-xs text-white/60 dark:text-black/60 font-medium">Sales Trend</span>
              <motion.div
                className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-emerald-500 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-2 h-2 md:w-2.5 md:h-2.5">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </motion.div>
            </div>

            {/* Bar chart */}
            <div className="flex-1 flex items-end gap-1 min-h-[40px]">
              {chartBars.map((height, i) => (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-t-sm ${i >= 7 ? 'bg-[#C9FD48]' : 'bg-white/20 dark:bg-black/30'}`}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                />
              ))}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between mt-2">
              <span className="text-[8px] md:text-[10px] text-white/30 dark:text-black/30">Jan</span>
              <span className="text-[8px] md:text-[10px] text-white/30 dark:text-black/30">Jun</span>
              <span className="text-[8px] md:text-[10px] text-white/50 dark:text-black/50 font-medium">Now</span>
            </div>
          </div>
        </div>

        {/* Text content - fixed at bottom */}
        <div className="mt-3 md:mt-4 flex-shrink-0">
          <h3 className="clamp-[text,1.125rem,1.75rem] font-bold text-white dark:text-black mb-1">{solution}</h3>
          <p className="text-white/50 dark:text-black/50 clamp-[text,0.75rem,1rem] mb-1">{task}</p>
          <p className="text-white/70 dark:text-black/70 font-semibold clamp-[text,0.75rem,1rem]">{result}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Card 3 - Platform mockup interface
function Card3({ solution, task, result }: { solution: string; task: string; result: string }) {
  return (
    <motion.div
      variants={cardVariant}
      className="group relative h-full"
    >
      <div className="relative h-full rounded-3xl bg-zinc-900 dark:bg-zinc-100 overflow-hidden p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col">
        {/* Dashboard mockup - adaptive container */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <motion.div
            className="w-full max-w-[85%] aspect-[4/3] bg-zinc-950 dark:bg-zinc-50 rounded-lg overflow-hidden border border-white/10 dark:border-black/10 shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top header bar */}
            <div className="h-[8%] min-h-[12px] bg-white/5 dark:bg-black/5 flex items-center justify-between px-[5%]">
              <div className="flex gap-[2px]">
                <div className="w-1 h-1 rounded-full bg-white/40 dark:bg-black/40" />
                <div className="w-1 h-1 rounded-full bg-white/40 dark:bg-black/40" />
                <div className="w-1 h-1 rounded-full bg-white/40 dark:bg-black/40" />
              </div>
              <div className="w-[20%] h-[40%] bg-white/10 dark:bg-black/10 rounded-full" />
              <div className="w-[6%] aspect-square rounded-full bg-[#C9FD48]/30" />
            </div>

            <div className="flex h-[92%]">
              {/* Sidebar */}
              <div className="w-[22%] border-r border-white/5 dark:border-black/5 p-[5%] flex flex-col">
                <div className="w-[50%] aspect-square rounded bg-[#C9FD48]/20 mb-[15%] flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-sm bg-[#C9FD48]" />
                </div>
                <div className="flex flex-col gap-[6%]">
                  <div className="h-[3px] w-full bg-[#C9FD48] rounded-full" />
                  <div className="h-[3px] w-3/4 bg-white/15 dark:bg-black/15 rounded-full" />
                  <div className="h-[3px] w-4/5 bg-white/10 dark:bg-black/10 rounded-full" />
                  <div className="h-[3px] w-2/3 bg-white/10 dark:bg-black/10 rounded-full" />
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-[3%] flex flex-col gap-[4%]">
                {/* KPI Cards row */}
                <div className="flex gap-[3%] h-[20%]">
                  <div className="flex-1 bg-white/5 dark:bg-black/5 rounded p-[5%] flex flex-col justify-center">
                    <div className="w-[30%] h-[2px] bg-white/30 dark:bg-black/30 rounded mb-[8%]" />
                    <div className="text-[clamp(5px,1.5vw,8px)] font-bold text-[#C9FD48]">2,847</div>
                  </div>
                  <div className="flex-1 bg-white/5 dark:bg-black/5 rounded p-[5%] flex flex-col justify-center">
                    <div className="w-[30%] h-[2px] bg-white/30 dark:bg-black/30 rounded mb-[8%]" />
                    <div className="text-[clamp(5px,1.5vw,8px)] font-bold text-white/70 dark:text-black/70">$12.4k</div>
                  </div>
                  <div className="flex-1 bg-white/5 dark:bg-black/5 rounded p-[5%] flex flex-col justify-center">
                    <div className="w-[30%] h-[2px] bg-white/30 dark:bg-black/30 rounded mb-[8%]" />
                    <div className="text-[clamp(5px,1.5vw,8px)] font-bold text-white/70 dark:text-black/70">89%</div>
                  </div>
                </div>

                {/* Chart */}
                <div className="flex-1 bg-white/5 dark:bg-black/5 rounded p-[3%] flex items-end gap-[2%]">
                  <motion.div className="flex-1 bg-[#C9FD48] rounded-t-sm" initial={{ height: "20%" }} whileInView={{ height: "50%" }} transition={{ duration: 0.5, delay: 0.1 }} />
                  <motion.div className="flex-1 bg-[#C9FD48]/60 rounded-t-sm" initial={{ height: "20%" }} whileInView={{ height: "35%" }} transition={{ duration: 0.5, delay: 0.15 }} />
                  <motion.div className="flex-1 bg-[#C9FD48] rounded-t-sm" initial={{ height: "20%" }} whileInView={{ height: "70%" }} transition={{ duration: 0.5, delay: 0.2 }} />
                  <motion.div className="flex-1 bg-[#C9FD48]/60 rounded-t-sm" initial={{ height: "20%" }} whileInView={{ height: "55%" }} transition={{ duration: 0.5, delay: 0.25 }} />
                  <motion.div className="flex-1 bg-[#C9FD48] rounded-t-sm" initial={{ height: "20%" }} whileInView={{ height: "85%" }} transition={{ duration: 0.5, delay: 0.3 }} />
                  <motion.div className="flex-1 bg-[#C9FD48]/60 rounded-t-sm" initial={{ height: "20%" }} whileInView={{ height: "45%" }} transition={{ duration: 0.5, delay: 0.35 }} />
                </div>

                {/* Table rows */}
                <div className="flex flex-col gap-[4%] h-[18%]">
                  <div className="flex gap-[3%] items-center flex-1">
                    <div className="w-[8%] aspect-square rounded-full bg-[#C9FD48]/30" />
                    <div className="flex-1 h-[3px] bg-white/20 dark:bg-black/20 rounded-full" />
                    <div className="w-[15%] h-[3px] bg-[#C9FD48] rounded-full" />
                  </div>
                  <div className="flex gap-[3%] items-center flex-1">
                    <div className="w-[8%] aspect-square rounded-full bg-white/10 dark:bg-black/10" />
                    <div className="flex-1 h-[3px] bg-white/10 dark:bg-black/10 rounded-full" />
                    <div className="w-[12%] h-[3px] bg-white/20 dark:bg-black/20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-shrink-0 mt-4">
          <h3 className="clamp-[text,1.125rem,1.5rem] font-bold text-white dark:text-black mb-1">{solution}</h3>
          <p className="text-white/50 dark:text-black/50 clamp-[text,0.75rem,0.875rem] mb-1">{task}</p>
          <p className="text-white/70 dark:text-black/70 font-medium clamp-[text,0.75rem,0.875rem]">{result}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Card 4 - Event ticket with QR code
function Card4({ solution, task, result }: { solution: string; task: string; result: string }) {
  return (
    <motion.div
      variants={cardVariant}
      className="group relative h-full"
    >
      <div className="relative h-full rounded-3xl bg-zinc-800 dark:bg-zinc-200 overflow-hidden p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col">
        {/* Ticket mockup - compact */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <motion.div
            className="relative w-full max-w-[75%] bg-zinc-700 dark:bg-white rounded-lg overflow-hidden shadow-2xl"
            initial={{ rotate: 2 }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Compact horizontal ticket */}
            <div className="flex">
              {/* Left: Event info */}
              <div className="flex-1 p-[6%] border-r border-dashed border-zinc-600 dark:border-zinc-300">
                <div className="flex items-center gap-[8%] mb-[6%]">
                  <div className="w-[22%] aspect-square bg-[#C9FD48] rounded-md flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" className="w-1/2 h-1/2">
                      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[clamp(5px,1.2vw,7px)] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Event</div>
                    <div className="text-[clamp(8px,2vw,12px)] font-bold text-white dark:text-black leading-tight">Tech Summit</div>
                  </div>
                </div>
                <div className="flex gap-[10%] text-[clamp(5px,1.1vw,7px)]">
                  <div>
                    <div className="text-zinc-500 dark:text-zinc-400">Date</div>
                    <div className="font-semibold text-white dark:text-black">24 Mar</div>
                  </div>
                  <div>
                    <div className="text-zinc-500 dark:text-zinc-400">Time</div>
                    <div className="font-semibold text-white dark:text-black">10:00</div>
                  </div>
                  <div>
                    <div className="text-zinc-500 dark:text-zinc-400">Seat</div>
                    <div className="font-semibold text-[#C9FD48]">A-12</div>
                  </div>
                </div>
              </div>

              {/* Right: QR Code */}
              <div className="w-[35%] p-[4%] flex items-center justify-center">
                <div className="w-full aspect-square bg-white p-[10%] rounded-md">
                  <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-[1px]">
                    {[
                      1,1,1,0,1,1,1,
                      1,0,1,1,1,0,1,
                      1,1,1,0,1,1,1,
                      0,1,0,1,0,1,0,
                      1,1,1,0,1,1,1,
                      1,0,1,1,1,0,1,
                      1,1,1,0,1,1,1
                    ].map((cell, i) => (
                      <div key={i} className={`${cell ? 'bg-black' : 'bg-white'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket number */}
            <div className="px-[6%] pb-[4%]">
              <div className="text-[clamp(5px,1vw,7px)] font-mono text-zinc-500 dark:text-zinc-400 text-center">#EVT-2024-0847</div>
            </div>

            {/* Perforation circles */}
            <div className="absolute top-0 left-[65%] -translate-x-1/2 -translate-y-1/2 w-[8%] aspect-square bg-zinc-800 dark:bg-zinc-200 rounded-full" />
            <div className="absolute bottom-0 left-[65%] -translate-x-1/2 translate-y-1/2 w-[8%] aspect-square bg-zinc-800 dark:bg-zinc-200 rounded-full" />
          </motion.div>
        </div>

        <div className="flex-shrink-0 mt-4">
          <h3 className="clamp-[text,1.125rem,1.5rem] font-bold text-white dark:text-black mb-1">{solution}</h3>
          <p className="text-white/50 dark:text-black/50 clamp-[text,0.75rem,0.875rem] mb-1">{task}</p>
          <p className="text-white/70 dark:text-black/70 font-medium clamp-[text,0.75rem,0.875rem]">{result}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Card 5 - Workflow automation (wide) - Zapier style
function Card5({ solution, task, result }: { solution: string; task: string; result: string }) {
  return (
    <motion.div variants={cardVariant} className="group relative h-full">
      <div className="relative h-full rounded-3xl bg-zinc-900 dark:bg-zinc-100 overflow-hidden p-5 md:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col">
        {/* Dot grid background */}
        <div className="absolute inset-0 opacity-20 text-white dark:text-black">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Zapier-style workflow - adaptive container */}
        <div className="flex-1 flex items-center justify-center min-h-0 relative z-10">
          <div className="w-full max-w-[95%] flex items-center justify-between gap-[3%]">
            {/* Trigger node - Form */}
            <motion.div
              className="relative z-10 flex flex-col items-center flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-[clamp(40px,12vw,70px)] aspect-square bg-blue-500 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-1/2 h-1/2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 9h6M9 13h6M9 17h4"/>
                </svg>
              </div>
              <span className="text-[clamp(8px,1.5vw,12px)] text-white/60 dark:text-black/60 mt-1 font-medium">Form</span>
            </motion.div>

            {/* Line 1 */}
            <div className="flex-1 h-[2px] bg-zinc-700 dark:bg-zinc-300 rounded-full relative min-w-[20px]">
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-[clamp(8px,2vw,14px)] aspect-square rounded-full bg-[#C9FD48] shadow-lg shadow-[#C9FD48]/50"
                animate={{ left: ["-10%", "100%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Center processor */}
            <motion.div
              className="relative z-10 flex flex-col items-center flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-[clamp(50px,14vw,85px)] aspect-square bg-[#C9FD48] rounded-xl shadow-xl shadow-[#C9FD48]/40 flex items-center justify-center">
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  className="w-1/2 h-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </motion.svg>
              </div>
              <span className="text-[clamp(8px,1.5vw,12px)] text-white/60 dark:text-black/60 mt-1 font-medium">Process</span>
            </motion.div>

            {/* Branching lines section */}
            <div className="flex-1 flex flex-col justify-center gap-[clamp(20px,6vw,45px)] relative min-w-[20px]">
              {/* Top line */}
              <div className="h-[2px] bg-zinc-700 dark:bg-zinc-300 rounded-full relative">
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-[clamp(8px,2vw,14px)] aspect-square rounded-full bg-[#C9FD48] shadow-lg shadow-[#C9FD48]/50"
                  animate={{ left: ["-10%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.4 }}
                />
              </div>
              {/* Bottom line */}
              <div className="h-[2px] bg-zinc-700 dark:bg-zinc-300 rounded-full relative">
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-[clamp(8px,2vw,14px)] aspect-square rounded-full bg-[#C9FD48] shadow-lg shadow-[#C9FD48]/50"
                  animate={{ left: ["-10%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.8 }}
                />
              </div>
              {/* Vertical connector */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-700 dark:bg-zinc-300 rounded-full" />
            </div>

            {/* Output nodes */}
            <div className="flex flex-col gap-[clamp(12px,4vw,35px)] flex-shrink-0">
              {/* CRM */}
              <motion.div
                className="relative z-10 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-[clamp(35px,10vw,55px)] aspect-square bg-[#6366F1] rounded-lg shadow-lg shadow-[#6366F1]/30 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-1/2 h-1/2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <span className="text-[clamp(8px,1.5vw,12px)] text-white/60 dark:text-black/60 font-medium hidden md:block">CRM</span>
              </motion.div>

              {/* Google Sheets */}
              <motion.div
                className="relative z-10 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-[clamp(35px,10vw,55px)] aspect-square bg-[#0F9D58] rounded-lg shadow-lg shadow-[#0F9D58]/30 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" className="w-1/2 h-1/2">
                    <path d="M19 11V9h-4V5h-2v4H9V5H7v4H3v2h4v4H3v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4H9v-4h4v4z"/>
                  </svg>
                </div>
                <span className="text-[clamp(8px,1.5vw,12px)] text-white/60 dark:text-black/60 font-medium hidden md:block">Sheets</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 mt-4 relative z-10">
          <h3 className="clamp-[text,1.125rem,1.5rem] font-bold text-white dark:text-black mb-1">{solution}</h3>
          <p className="text-white/50 dark:text-black/50 clamp-[text,0.75rem,1rem] mb-1">{task}</p>
          <p className="text-white/70 dark:text-black/70 font-medium clamp-[text,0.75rem,1rem]">{result}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Card 6 - Brand identity kit
function Card6({ solution, task, result }: { solution: string; task: string; result: string }) {
  return (
    <motion.div
      variants={cardVariant}
      className="group relative h-full"
    >
      <div className="relative h-full rounded-3xl bg-zinc-900 dark:bg-zinc-100 overflow-hidden p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col">
        {/* Brand identity mockup - adaptive container */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="w-full max-w-[80%] flex flex-col gap-[6%]">
            {/* Logo area */}
            <motion.div
              className="bg-zinc-800 dark:bg-zinc-200 rounded-lg p-4 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                {/* Abstract logo mark */}
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 bg-[#C9FD48] rounded-md flex items-center justify-center flex-shrink-0"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-black rounded-sm transform rotate-45" />
                </motion.div>
                {/* Logo text */}
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-bold text-white dark:text-black tracking-tight leading-none">Brand</span>
                  <span className="text-[8px] md:text-[10px] text-white/50 dark:text-black/50 uppercase tracking-[0.15em]">Studio</span>
                </div>
              </div>
            </motion.div>

            {/* Color palette row */}
            <div className="flex gap-2">
              {[
                { color: "bg-[#C9FD48]", hex: "#C9FD48" },
                { color: "bg-zinc-950 dark:bg-white", hex: "#0A0A0A" },
                { color: "bg-zinc-600", hex: "#52525B" },
                { color: "bg-zinc-400", hex: "#A1A1AA" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex-1 flex flex-col gap-1"
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`${item.color} h-6 md:h-8 rounded-md shadow-sm`} />
                  <span className="text-[7px] md:text-[8px] font-mono text-white/40 dark:text-black/40 text-center">{item.hex}</span>
                </motion.div>
              ))}
            </div>

            {/* Typography sample */}
            <div className="bg-zinc-800 dark:bg-zinc-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-lg md:text-xl font-bold text-[#C9FD48]">Aa</span>
                <span className="text-[10px] md:text-xs text-white/60 dark:text-black/60 font-medium">Manrope</span>
              </div>
              <div className="flex gap-1">
                <div className="px-2 py-1 bg-white/10 dark:bg-black/10 rounded text-[8px] md:text-[9px] text-white/50 dark:text-black/50">Regular</div>
                <div className="px-2 py-1 bg-[#C9FD48]/20 rounded text-[8px] md:text-[9px] text-[#C9FD48] font-bold">Bold</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 mt-4 z-10">
          <h3 className="clamp-[text,1.125rem,1.5rem] font-bold text-white dark:text-black mb-1">{solution}</h3>
          <p className="text-white/50 dark:text-black/50 clamp-[text,0.75rem,0.875rem] mb-1">{task}</p>
          <p className="text-white/70 dark:text-black/70 font-medium clamp-[text,0.75rem,0.875rem]">{result}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Card 7 - Support chat bubbles
function Card7({ solution, task, result }: { solution: string; task: string; result: string }) {
  return (
    <motion.div
      variants={cardVariant}
      className="group relative h-full"
    >
      <div className="relative h-full rounded-3xl bg-zinc-900 dark:bg-zinc-100 overflow-hidden p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col">
        {/* Chat bubbles - adaptive container */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="w-full max-w-[85%] flex flex-col gap-[8%]">
            {/* Message from support */}
            <motion.div
              className="self-start flex items-end gap-[4%]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="w-[12%] aspect-square rounded-full bg-[#C9FD48] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" className="w-1/2 h-1/2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="bg-zinc-800 dark:bg-zinc-200 rounded-2xl rounded-bl-sm px-[8%] py-[5%]">
                <div className="w-[clamp(40px,15vw,80px)] h-[clamp(4px,1vw,8px)] bg-white/30 dark:bg-black/30 rounded-full" />
              </div>
            </motion.div>

            {/* Message from user */}
            <motion.div
              className="self-end"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="bg-[#C9FD48] rounded-2xl rounded-br-sm px-[8%] py-[5%]">
                <div className="w-[clamp(30px,12vw,60px)] h-[clamp(4px,1vw,8px)] bg-black/30 rounded-full" />
              </div>
            </motion.div>

            {/* Typing indicator */}
            <motion.div
              className="self-start flex items-end gap-[4%]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <div className="w-[12%] aspect-square rounded-full bg-[#C9FD48] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" className="w-1/2 h-1/2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="bg-zinc-800 dark:bg-zinc-200 rounded-2xl rounded-bl-sm px-[6%] py-[5%] flex gap-[clamp(2px,0.5vw,4px)]">
                <motion.div
                  className="w-[clamp(4px,1vw,8px)] aspect-square bg-white/50 dark:bg-black/50 rounded-full"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-[clamp(4px,1vw,8px)] aspect-square bg-white/50 dark:bg-black/50 rounded-full"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                />
                <motion.div
                  className="w-[clamp(4px,1vw,8px)] aspect-square bg-white/50 dark:bg-black/50 rounded-full"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Online indicator */}
        <div className="absolute top-5 right-5 flex items-center gap-[4%]">
          <motion.div
            className="w-[clamp(6px,1.5vw,10px)] aspect-square rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[clamp(8px,1.5vw,12px)] font-mono text-white/40 dark:text-black/40 uppercase tracking-wider">online</span>
        </div>

        <div className="flex-shrink-0 mt-4 z-10">
          <h3 className="clamp-[text,1.125rem,1.5rem] font-bold text-white dark:text-black mb-1">{solution}</h3>
          <p className="text-white/50 dark:text-black/50 clamp-[text,0.75rem,0.875rem] mb-1">{task}</p>
          <p className="text-white/70 dark:text-black/70 font-medium clamp-[text,0.75rem,0.875rem]">{result}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function SolutionsSection() {
  const t = useTranslations("Solutions");

  const items = Array.from({ length: 7 }, (_, i) => ({
    solution: t(`items.${i}.solution`),
    task: t(`items.${i}.task`),
    result: t(`items.${i}.result`),
  }));

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="w-full"
      >
        {/* Section Header */}
        <motion.div variants={cardVariant} className="mb-10 md:mb-16">
          {/* Label */}
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
              {t("subtitle")}
            </span>
          </div>

          {/* Title + Description grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-end">
            <Shuffle
              text={t("title")}
              tag="h2"
              className="text-[14vw] md:text-[7vw] font-black leading-[0.9] tracking-tight text-foreground"
              textAlign="left"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
            />
            <div className="md:border-l-2 md:border-[#C9FD48] md:pl-8">
              <p className="clamp-[text,1rem,1.25rem] text-muted-foreground leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mobile layout - simple 2 column grid */}
        <div className="md:hidden grid grid-cols-2 gap-5">
          <div className="aspect-square"><Card1 solution={items[0].solution} task={items[0].task} result={items[0].result} /></div>
          <div className="aspect-square"><Card2 solution={items[1].solution} task={items[1].task} result={items[1].result} /></div>
          <div className="aspect-square"><Card3 solution={items[2].solution} task={items[2].task} result={items[2].result} /></div>
          <div className="aspect-square"><Card4 solution={items[3].solution} task={items[3].task} result={items[3].result} /></div>
          <div className="aspect-square"><Card6 solution={items[4].solution} task={items[4].task} result={items[4].result} /></div>
          <div className="aspect-square"><Card5 solution={items[5].solution} task={items[5].task} result={items[5].result} /></div>
          <div className="aspect-square col-span-2"><Card7 solution={items[6].solution} task={items[6].task} result={items[6].result} /></div>
        </div>

        {/* Desktop layout - structured rows with explicit aspect ratios */}
        <div className="hidden md:flex flex-col gap-8">
          {/* Row 1-2: Card1 (2x2) + Card2 (2x1) + Card3 & Card4 (1x1 each) */}
          <div className="grid grid-cols-4 gap-8" style={{ aspectRatio: '4/2' }}>
            {/* Card1 - spans 2 cols, 2 rows */}
            <div className="col-span-2 row-span-2">
              <Card1 solution={items[0].solution} task={items[0].task} result={items[0].result} />
            </div>
            {/* Card2 - spans 2 cols, 1 row */}
            <div className="col-span-2">
              <Card2 solution={items[1].solution} task={items[1].task} result={items[1].result} />
            </div>
            {/* Card3 - 1x1 */}
            <div className="col-span-1">
              <Card3 solution={items[2].solution} task={items[2].task} result={items[2].result} />
            </div>
            {/* Card4 - 1x1 */}
            <div className="col-span-1">
              <Card4 solution={items[3].solution} task={items[3].task} result={items[3].result} />
            </div>
          </div>

          {/* Row 3: Card6 (1x1) + Card5 (2x1) + Card7 (1x1) */}
          <div className="grid grid-cols-4 gap-8" style={{ aspectRatio: '4/1' }}>
            <div className="col-span-1">
              <Card6 solution={items[4].solution} task={items[4].task} result={items[4].result} />
            </div>
            <div className="col-span-2">
              <Card5 solution={items[5].solution} task={items[5].task} result={items[5].result} />
            </div>
            <div className="col-span-1">
              <Card7 solution={items[6].solution} task={items[6].task} result={items[6].result} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
