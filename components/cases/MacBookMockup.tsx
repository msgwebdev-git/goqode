"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MacbookPro } from "@/components/ui/macbook-pro";
import { Iphone } from "@/components/ui/iphone";

/*
  MacbookPro SVG screen area (from viewBox 0 0 650 400):
    x=74.52  y=21.32  w=501.22  h=323.85
  As percentages:
    left: 11.46%  top: 5.33%  width: 77.11%  height: 80.96%
*/
const SCREEN = {
  left: "11.46%",
  top: "5.33%",
  width: "77.11%",
  height: "80.96%",
};

interface MacBookMockupProps {
  screenshots: string[];
  mobileScreenshot: string;
  slug: string;
}

export function MacBookMockup({
  screenshots,
  mobileScreenshot,
  slug,
}: MacBookMockupProps) {
  const t = useTranslations("Cases");
  const title = t(`items.${slug}.title`);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  useEffect(() => {
    function measure() {
      if (contentRef.current && screenRef.current) {
        const contentH = contentRef.current.scrollHeight;
        const screenH = screenRef.current.clientHeight;
        if (contentH > screenH) {
          setMaxScroll(contentH - screenH);
        }
      }
    }

    const timer = setTimeout(measure, 500);
    const timer2 = setTimeout(measure, 1500);

    const observer = new ResizeObserver(measure);
    if (screenRef.current) observer.observe(screenRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Desktop: scroll-linked animation with both devices */}
      <section
        ref={containerRef}
        className="hidden md:block w-full relative"
        style={{ height: "300vh" }}
      >
        <div className="sticky top-0 h-screen flex items-end justify-center clamp-[px,12,24] pb-8">
          <div className="flex items-end gap-6 lg:gap-10">
            {/* MacBook */}
            <div className="relative flex-shrink-0" style={{ width: "65vw", maxWidth: "900px" }}>
              {/* SVG Frame */}
              <MacbookPro
                width={650}
                height={400}
                className="w-full h-auto relative z-10"
              />

              {/* Scrollable content overlay on screen area */}
              <div
                ref={screenRef}
                className="absolute overflow-hidden rounded-[0.5%] z-20"
                style={{
                  left: SCREEN.left,
                  top: SCREEN.top,
                  width: SCREEN.width,
                  height: SCREEN.height,
                }}
              >
                <motion.div
                  ref={contentRef}
                  style={{ y: translateY, willChange: "transform" }}
                  className="flex flex-col w-full"
                >
                  {screenshots.map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`${title} — section ${i + 1}`}
                      width={1440}
                      height={900}
                      className="w-full h-auto block"
                      loading={i < 3 ? "eager" : "lazy"}
                      sizes="50vw"
                    />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* iPhone — next to MacBook, aligned to bottom */}
            <div className="relative flex-shrink-0 hidden lg:block" style={{ width: "22vw", maxWidth: "320px" }}>
              <Iphone
                src={mobileScreenshot}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: static screenshot */}
      <section className="md:hidden w-full clamp-[px,12,24] clamp-[py,16,32]">
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
          <Image
            src={`/cases/${slug}/line.jpg`}
            alt={`${title} — desktop preview`}
            width={1440}
            height={900}
            className="w-full h-auto"
            sizes="100vw"
          />
        </div>
      </section>
    </>
  );
}
