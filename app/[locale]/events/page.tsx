"use client";

import dynamic from "next/dynamic";
import EventsHero from "@/components/events/EventsHero";
import { EventFlowSection } from "@/components/events/EventFlowSection";
import { SolutionsShowcase } from "@/components/events/SolutionsShowcase";
import { EventProcessSection } from "@/components/events/EventProcessSection";
import { EventResultsSection } from "@/components/events/EventResultsSection";
import { EventCTASection } from "@/components/events/EventCTASection";

const Lanyard = dynamic(() => import("@/components/events/Lanyard"), {
  ssr: false,
});

export default function EventsPage() {
  return (
    <main className="min-h-screen w-full">
      {/* Hero Section with 3D Lanyard */}
      <div className="relative">
        <EventsHero />
        <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
          <div className="pointer-events-auto">
            <Lanyard />
          </div>
        </div>
      </div>

      {/* Flow Section - Visual process */}
      <EventFlowSection />

      {/* Solutions Showcase - All 5 solutions with parallax */}
      <SolutionsShowcase />


      {/* Process Section - How we work */}
      <EventProcessSection />

      {/* Tech Stack Section */}
      <EventResultsSection />

      {/* CTA Section */}
      <EventCTASection />
    </main>
  );
}
