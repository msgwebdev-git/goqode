"use client";

import { FileText, Target, Zap, TrendingUp } from "lucide-react";
import {
  ServiceHero,
  ServiceFeatures,
  ServiceProcess,
  ServicePricing,
  ServiceResults,
  ServiceFAQ,
  type ResultStat,
} from "@/components/services";

const NAMESPACE = "ServiceLanding";

const results: ResultStat[] = [
  { icon: Target, value: 12, suffix: "%", labelKey: "results.conversions" },
  { icon: TrendingUp, value: 95, suffix: "+", labelKey: "results.seo" },
  { icon: Zap, value: 1.5, suffix: "s", labelKey: "results.speed" },
];

export default function LandingPageContent() {
  return (
    <>
      <ServiceHero namespace={NAMESPACE} icon={FileText} />
      <ServiceFeatures namespace={NAMESPACE} count={7} />
      <ServiceProcess namespace={NAMESPACE} stepsCount={5} />
      <ServicePricing namespace={NAMESPACE} basePrice="500" isMonthly={false} calculatorTypeIndex="0" />
      <ServiceResults namespace={NAMESPACE} results={results} />
      <ServiceFAQ namespace={NAMESPACE} />
    </>
  );
}
