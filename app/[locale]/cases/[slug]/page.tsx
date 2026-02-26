import { notFound } from "next/navigation";
import { getCaseBySlug, getAllSlugs } from "@/lib/cases-data";
import CaseDetailContent from "./content";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const caseData = getCaseBySlug(slug);
  if (!caseData) notFound();

  return <CaseDetailContent slug={slug} />;
}
