"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const clientLogos = [
  { name: "ArtGarage", src: "/logos/artgarage.png" },
  { name: "EgoTax", src: "/logos/egotax.png" },
  { name: "Finch", src: "/logos/finch.png" },
  { name: "Libra", src: "/logos/libra.png" },
  { name: "Line", src: "/logos/line.png" },
  { name: "Ministerul", src: "/logos/ministerul.png" },
  { name: "MSG", src: "/logos/msg.png" },
  { name: "MSProd", src: "/logos/msprod.png" },
  { name: "Onco", src: "/logos/onco.png" },
  { name: "Standupovka", src: "/logos/standupovka.png" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

interface ClientLogosProps {
  showLabel?: boolean;
}

export function ClientLogos({ showLabel = true }: ClientLogosProps) {
  const tClients = useTranslations("Clients");

  return (
    <>
      {showLabel && (
        <div className="flex items-center justify-center gap-2 md:gap-[0.4vw] mb-4 md:mb-[1.5vw]">
          <div className="w-2 h-2 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
          <span className="text-xs md:clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
            {tClients("title")}
          </span>
        </div>
      )}
      <div className="grid grid-cols-5 gap-px bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden">
        {clientLogos.map((client, index) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            viewport={{ once: true }}
            className="group flex items-center justify-center h-20 md:h-[7vw] bg-white transition-all duration-300 hover:bg-zinc-50"
          >
            <Image
              src={client.src}
              alt={`${client.name} logo`}
              width={962}
              height={595}
              className="h-10 md:h-[3.5vw] w-auto max-w-[70%] object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
              sizes="(max-width: 768px) 20vw, 15vw"
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
