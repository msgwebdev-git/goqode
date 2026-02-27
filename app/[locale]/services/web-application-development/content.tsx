"use client";

import { AppWindow, Server, Zap, Clock } from "lucide-react";
import {
  ServiceHero,
  ServiceFeatures,
  ServiceProcess,
  ServicePricing,
  ServiceResults,
  ServiceFAQ,
  type ResultStat,
} from "@/components/services";

const NAMESPACE = "ServiceWebapp";

const results: ResultStat[] = [
  { icon: Server, value: 99, suffix: ".9%", labelKey: "results.uptime" },
  { icon: Zap, value: 500, suffix: "ms", labelKey: "results.response" },
  { icon: Clock, value: 24, suffix: "/7", labelKey: "results.availability" },
];

export default function WebAppContent() {
  return (
    <>
      <ServiceHero namespace={NAMESPACE} icon={AppWindow} />
      <ServiceFeatures namespace={NAMESPACE} count={7} />
      <ServiceProcess namespace={NAMESPACE} stepsCount={6} />
      <ServicePricing namespace={NAMESPACE} basePrice="5,000" isMonthly={false} calculatorTypeIndex="3" />
      <ServiceResults namespace={NAMESPACE} results={results} />
      <ServiceFAQ namespace={NAMESPACE} />
    </>
  );
}
