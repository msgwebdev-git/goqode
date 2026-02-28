import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThankYouClient } from "./thank-you-client";
import { getCalculatorConfig, getSubmissionById } from "@/lib/calculator-api";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  if (!id) notFound();

  const numId = parseInt(id, 10);
  if (isNaN(numId)) notFound();

  const row = await getSubmissionById(numId);
  if (!row || row.source !== "calculator") notFound();

  const config = await getCalculatorConfig();

  const features: string[] = row.features ? JSON.parse(row.features) : [];
  const scopeModifiers: Record<string, string> = row.scopeModifiers
    ? JSON.parse(row.scopeModifiers)
    : {};

  // Resolve feature prices from config
  const projectFeatures = (config.categorizedFeatures[row.projectType!] || []).flatMap(
    (c) => c.features,
  );
  const featureDetails = features.map((key) => {
    const f = projectFeatures.find((pf) => pf.key === key);
    return { key, priceMin: f?.price[0] ?? 0, priceMax: f?.price[1] ?? 0 };
  });

  // Resolve scope modifier keys
  const scopeDetails = (config.scopeModifiers[row.projectType!] || [])
    .map((mod) => {
      const val = scopeModifiers[mod.key];
      if (!val) return null;
      return { modKey: mod.key, value: val };
    })
    .filter((x): x is { modKey: string; value: string } => x !== null);

  return (
    <ThankYouClient
      submission={{
        name: row.name,
        projectType: row.projectType!,
        designLevel: row.designLevel,
        priceMin: row.priceMin ?? 0,
        priceMax: row.priceMax ?? 0,
        isMonthly: row.isMonthly ?? false,
        adBudget: row.adBudget,
        message: row.message,
        features: featureDetails,
        scopeModifiers: scopeDetails,
      }}
    />
  );
}
