"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Shuffle from "./Shuffle";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
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

// Demo case data (replace with real data later)
const casesData = [
  {
    id: 1,
    featured: true,
    image: "/01.jpg",
    tags: ["Web", "E-commerce", "UX/UI"],
    year: "2024",
  },
  {
    id: 2,
    featured: false,
    image: "/01.jpg",
    tags: ["Mobile", "iOS", "Android"],
    year: "2024",
  },
  {
    id: 3,
    featured: false,
    image: "/01.jpg",
    tags: ["Web App", "Dashboard"],
    year: "2023",
  },
  {
    id: 4,
    featured: false,
    image: "/01.jpg",
    tags: ["Branding", "Identity"],
    year: "2023",
  },
  {
    id: 5,
    featured: false,
    image: "/01.jpg",
    tags: ["Event", "Platform"],
    year: "2024",
  },
  {
    id: 6,
    featured: false,
    image: "/01.jpg",
    tags: ["SaaS", "Automation"],
    year: "2024",
  },
];

interface CaseCardProps {
  caseItem: (typeof casesData)[0];
  title: string;
  description: string;
  result: string;
  featured?: boolean;
}

function CaseCard({ caseItem, title, description, result, featured = false }: CaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (featured) {
    return (
      <motion.div
        variants={cardVariant}
        className="group relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-zinc-900 dark:bg-zinc-100 transition-all duration-500 hover:shadow-2xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Case image */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={caseItem.image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </motion.div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-[#C9FD48]/10 z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Featured badge */}
          <div className="absolute top-6 left-6 z-20">
            <Badge className="bg-[#C9FD48] text-black hover:bg-[#C9FD48]/90 font-semibold">
              Featured
            </Badge>
          </div>

          {/* Year badge */}
          <div className="absolute top-6 right-6 z-20">
            <span className="text-white/60 font-mono text-sm">{caseItem.year}</span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
            <div className="flex flex-wrap gap-2 mb-4">
              {caseItem.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="clamp-[text,1.5rem,3rem] font-bold text-white mb-2 leading-tight">
              {title}
            </h3>
            <p className="clamp-[text,0.875rem,1.125rem] text-white/70 max-w-2xl mb-4 line-clamp-2">
              {description}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
              <span className="text-[#C9FD48] font-medium clamp-[text,0.875rem,1rem]">{result}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariant}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

        {/* Case image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={caseItem.image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-[#C9FD48]/10 z-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Year */}
        <div className="absolute top-4 right-4 z-20">
          <span className="text-white/50 font-mono text-xs">{caseItem.year}</span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {caseItem.tags.slice(0, 2).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-white/20 text-white/80 text-xs bg-white/5 backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="clamp-[text,1rem,1.25rem] font-bold text-white mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-white/60 text-sm line-clamp-1">{result}</p>
        </div>
      </div>
    </motion.div>
  );
}

// View All Card - styled like a case card
function ViewAllCard({ text }: { text: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#C9FD48] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex items-center justify-center">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]"
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-black/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-black/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-black/10" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4 p-6">
          <motion.div
            className="w-16 h-16 rounded-full bg-black flex items-center justify-center"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </motion.div>
          <span className="text-black font-bold clamp-[text,1rem,1.25rem] text-center">
            {text}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function CasesSection() {
  const t = useTranslations("Cases");

  const featuredCase = casesData.find((c) => c.featured);
  const otherCases = casesData.filter((c) => !c.featured);

  const getCaseTranslation = (id: number, key: string) => {
    return t(`items.${id - 1}.${key}`);
  };

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
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-2 h-2 rounded-full bg-[#C9FD48]" />
            <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
              {t("subtitle")}
            </span>
          </div>

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

        {/* Featured Case */}
        {featuredCase && (
          <div className="mb-6 md:mb-8">
            <CaseCard
              caseItem={featuredCase}
              title={getCaseTranslation(featuredCase.id, "title")}
              description={getCaseTranslation(featuredCase.id, "description")}
              result={getCaseTranslation(featuredCase.id, "result")}
              featured
            />
          </div>
        )}

        {/* Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {otherCases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              title={getCaseTranslation(caseItem.id, "title")}
              description={getCaseTranslation(caseItem.id, "description")}
              result={getCaseTranslation(caseItem.id, "result")}
            />
          ))}
          {/* View All Card */}
          <ViewAllCard text={t("viewAll")} />
        </div>
      </motion.div>
    </section>
  );
}
