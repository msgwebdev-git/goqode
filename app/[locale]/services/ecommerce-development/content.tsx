"use client";

import { ShoppingCart, Zap, Smartphone, Shield } from "lucide-react";
import {
  ServiceHero,
  ServiceFeatures,
  ServiceProcess,
  ServicePricing,
  ServiceResults,
  ServiceFAQ,
  type ResultStat,
} from "@/components/services";

const NAMESPACE = "ServiceEcommerce";

const results: ResultStat[] = [
  { icon: Zap, value: 95, suffix: "+", labelKey: "results.performance" },
  { icon: Smartphone, value: 100, suffix: "%", labelKey: "results.mobile" },
  { icon: Shield, value: 100, suffix: "%", labelKey: "results.secure" },
];

export default function EcommerceContent() {
  return (
    <>
      <ServiceHero namespace={NAMESPACE} icon={ShoppingCart} />
      <ServiceFeatures namespace={NAMESPACE} count={7} />
      <ServiceProcess namespace={NAMESPACE} stepsCount={6} />
      <ServicePricing namespace={NAMESPACE} basePrice="2,000" isMonthly={false} calculatorTypeIndex="1" />
      <ServiceResults namespace={NAMESPACE} results={results} />
      <ServiceFAQ namespace={NAMESPACE} />
    </>
  );
}
