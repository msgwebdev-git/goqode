"use client";

import { Building2, Globe, TrendingUp, Zap } from "lucide-react";
import {
  ServiceHero,
  ServiceFeatures,
  ServiceProcess,
  ServicePricing,
  ServiceResults,
  ServiceFAQ,
  type ResultStat,
} from "@/components/services";

const NAMESPACE = "ServiceCorporate";

const results: ResultStat[] = [
  { icon: TrendingUp, value: 60, suffix: "%", labelKey: "results.traffic" },
  { icon: Zap, value: 95, suffix: "+", labelKey: "results.seo" },
  { icon: Globe, value: 3, suffix: "", labelKey: "results.languages" },
];

export default function CorporateContent() {
  return (
    <>
      <ServiceHero namespace={NAMESPACE} icon={Building2} />
      <ServiceFeatures namespace={NAMESPACE} count={7} />
      <ServiceProcess namespace={NAMESPACE} stepsCount={5} />
      <ServicePricing namespace={NAMESPACE} basePrice="1,500" isMonthly={false} calculatorTypeIndex="2" />
      <ServiceResults namespace={NAMESPACE} results={results} />
      <ServiceFAQ namespace={NAMESPACE} />
    </>
  );
}
