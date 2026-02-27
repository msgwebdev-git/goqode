"use client";

import { Smartphone, Zap, Monitor, Shield } from "lucide-react";
import {
  ServiceHero,
  ServiceFeatures,
  ServiceProcess,
  ServicePricing,
  ServiceResults,
  ServiceFAQ,
  type ResultStat,
} from "@/components/services";

const NAMESPACE = "ServiceMobile";

const results: ResultStat[] = [
  { icon: Monitor, value: 2, suffix: "", labelKey: "results.platforms" },
  { icon: Zap, value: 60, suffix: "fps", labelKey: "results.performance" },
  { icon: Shield, value: 100, suffix: "%", labelKey: "results.offline" },
];

export default function MobileContent() {
  return (
    <>
      <ServiceHero namespace={NAMESPACE} icon={Smartphone} />
      <ServiceFeatures namespace={NAMESPACE} count={7} />
      <ServiceProcess namespace={NAMESPACE} stepsCount={6} />
      <ServicePricing namespace={NAMESPACE} basePrice="8,000" isMonthly={false} calculatorTypeIndex="4" />
      <ServiceResults namespace={NAMESPACE} results={results} />
      <ServiceFAQ namespace={NAMESPACE} />
    </>
  );
}
