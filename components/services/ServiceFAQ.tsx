"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServiceFAQProps {
  namespace: string;
  count?: number;
}

export function ServiceFAQ({ namespace, count = 4 }: ServiceFAQProps) {
  const t = useTranslations(namespace);

  return (
    <section className="w-full clamp-[px,12,24] clamp-[py,16,32]">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 md:gap-[0.4vw] mb-4 md:mb-[1.5vw]">
          <div className="w-2 h-2 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C9FD48]" />
          <span className="text-xs md:clamp-[text,0.75rem,0.875rem] font-medium text-muted-foreground uppercase tracking-wider">
            FAQ
          </span>
        </div>
        <h2 className="clamp-[text,1.5rem,3rem] font-semibold leading-tight mb-6 md:mb-8">
          {t("faq.title")}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {Array.from({ length: count }, (_, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="clamp-[text,1rem,1.25rem] text-left font-medium">
                {t(`faq.items.${i}.question`)}
              </AccordionTrigger>
              <AccordionContent className="clamp-[text,0.875rem,1rem] text-muted-foreground leading-relaxed">
                {t(`faq.items.${i}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
