import { HeroSection } from "@/components/HeroSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CasesSection } from "@/components/CasesSection";
import { BlogSection } from "@/components/BlogSection";
import { AboutSection } from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <HeroSection />
      <SolutionsSection />
      <ProcessSection />
      <CasesSection />
      <AboutSection />
      <BlogSection />
    </main>
  );
}
