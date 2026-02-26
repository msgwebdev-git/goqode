"use client";

import { getCaseBySlug, getNextCase } from "@/lib/cases-data";
import { CaseHero } from "@/components/cases/CaseHero";
import { MacBookMockup } from "@/components/cases/MacBookMockup";
import { CaseAbout } from "@/components/cases/CaseAbout";
import { CaseNextCard } from "@/components/cases/CaseNextCard";
import { CaseCTA } from "@/components/cases/CaseCTA";

export default function CaseDetailContent({ slug }: { slug: string }) {
  const caseData = getCaseBySlug(slug)!;
  const nextCase = getNextCase(slug);

  const showNextCase = nextCase && nextCase.slug !== slug;

  const img = (name: string) => `/cases/${slug}/${name}`;

  return (
    <main className="min-h-screen w-full">
      <CaseHero slug={slug} caseData={caseData} />
      <MacBookMockup
        screenshots={[img("line.jpg")]}
        mobileScreenshot={img("linemob.jpg")}
        slug={slug}
      />
      <CaseAbout slug={slug} />
      {showNextCase && <CaseNextCard nextCase={nextCase} />}
      <CaseCTA />
    </main>
  );
}
