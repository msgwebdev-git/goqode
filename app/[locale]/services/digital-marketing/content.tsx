"use client";

import { Megaphone, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import {
  ServiceHero,
  ServiceFeatures,
  ServiceProcess,
  ServicePricing,
  ServiceResults,
  ServiceFAQ,
  type ResultStat,
} from "@/components/services";

const NAMESPACE = "ServiceMarketing";

const results: ResultStat[] = [
  { icon: BarChart3, value: 3, suffix: "x", labelKey: "results.roas" },
  { icon: DollarSign, value: 40, suffix: "%", labelKey: "results.cac" },
  { icon: TrendingUp, value: 150, suffix: "%", labelKey: "results.leads" },
];

export default function MarketingContent() {
  return (
    <>
      <ServiceHero namespace={NAMESPACE} icon={Megaphone} />
      <ServiceFeatures namespace={NAMESPACE} count={7} />
      <ServiceProcess namespace={NAMESPACE} stepsCount={5} />
      <ServicePricing namespace={NAMESPACE} basePrice="500" isMonthly={true} calculatorTypeIndex="6" />
      <ServiceResults namespace={NAMESPACE} results={results} />
      <ServiceFAQ namespace={NAMESPACE} count={4} />
    </>
  );
}
