import { unstable_cache } from "next/cache";
import { getCalculatorData } from "@/lib/calculator-queries";
import { CalculatorClient } from "./calculator-client";

const getCachedData = unstable_cache(getCalculatorData, ["calc-config"], {
  tags: ["calc-config"],
});

export default async function CalculatorPage() {
  const config = await getCachedData();
  return <CalculatorClient config={config} />;
}
