"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Copy, CheckCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { CalculatorConfig } from "@/lib/calculator-queries";

/* ─── Helper: flatten features ───────────────────────── */

function getAllFeatures(
  categorizedFeatures: CalculatorConfig["categorizedFeatures"],
  projectType: string,
) {
  return (categorizedFeatures[projectType] || []).flatMap((c) => c.features);
}

/* ─── Price calculation ──────────────────────────────── */

function calculatePrice(
  config: CalculatorConfig,
  projectType: string | null,
  designLevel: string | null,
  features: string[],
  scopeModifiers: Record<string, string>,
): [number, number] {
  if (!projectType) return [0, 0];

  const [baseMin, baseMax] = config.basePrices[projectType] || [0, 0];
  const designMult =
    designLevel !== null ? (config.designMultipliers[designLevel] || 1.0) : 1.0;

  let scopeMult = 1.0;
  for (const mod of config.scopeModifiers[projectType] || []) {
    const selected = scopeModifiers[mod.key];
    if (selected) {
      const opt = mod.options.find((o) => o.value === selected);
      if (opt) scopeMult *= opt.multiplier;
    }
  }

  const allFeatures = getAllFeatures(config.categorizedFeatures, projectType);
  let featureMin = 0;
  let featureMax = 0;
  for (const f of features) {
    const feat = allFeatures.find((tf) => tf.key === f);
    if (feat) {
      featureMin += feat.price[0];
      featureMax += feat.price[1];
    }
  }

  return [
    Math.round(baseMin * designMult * scopeMult + featureMin),
    Math.round(baseMax * designMult * scopeMult + featureMax),
  ];
}

/* ─── Copy-to-clipboard pill ─────────────────────────── */

function EmailPill({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-[#C9FD48] hover:text-black"
    >
      <span>{copied ? "COPIED" : email.toUpperCase()}</span>
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Check className="w-3.5 h-3.5" />
          </motion.div>
        ) : (
          <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Copy className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

/* ─── Animated underline input ───────────────────────── */

function UnderlineInput({
  label,
  type = "text",
  required = false,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          focused || value
            ? "text-[10px] -top-4 text-zinc-400"
            : "text-xs top-3 text-zinc-500"
        } font-semibold tracking-widest uppercase`}
      >
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-700 py-3 text-base font-medium text-foreground outline-none transition-colors duration-300 focus:border-[#C9FD48]"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#C9FD48]"
        initial={{ width: "0%" }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      />
    </div>
  );
}

/* ─── Animated underline textarea ────────────────────── */

function UnderlineTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          focused || value
            ? "text-[10px] -top-4 text-zinc-400"
            : "text-xs top-3 text-zinc-500"
        } font-semibold tracking-widest uppercase`}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={3}
        className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-700 py-3 text-base font-medium text-foreground outline-none transition-colors duration-300 focus:border-[#C9FD48] resize-none"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#C9FD48]"
        initial={{ width: "0%" }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      />
    </div>
  );
}

/* ─── CountUp number ─────────────────────────────────── */

function CountUp({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, count, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── Design Level Card ─────────────────────────────── */

function DesignLevelCard({
  selected,
  name,
  description,
  multiplier,
  onClick,
}: {
  selected: boolean;
  name: string;
  description: string;
  multiplier: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
        selected
          ? "border-[#C9FD48] bg-zinc-50 dark:bg-zinc-900"
          : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-[#C9FD48]/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground leading-snug">{description}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          <span className={`text-xs font-bold tabular-nums ${selected ? "text-zinc-900 dark:text-[#C9FD48]" : "text-zinc-400"}`}>
            {multiplier}
          </span>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              selected
                ? "border-[#C9FD48] bg-[#C9FD48]"
                : "border-zinc-300 dark:border-zinc-600"
            }`}
          >
            {selected && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
          </div>
        </div>
      </div>
    </button>
  );
}

/* ─── Feature Card ──────────────────────────────────── */

function FeatureCard({
  selected,
  name,
  description,
  priceRange,
  recommended,
  recommendedLabel,
  onClick,
}: {
  selected: boolean;
  name: string;
  description: string;
  priceRange: string;
  recommended?: boolean;
  recommendedLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
        selected
          ? "border-[#C9FD48]/40 bg-zinc-50 dark:bg-zinc-900"
          : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-[#C9FD48]/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
            selected
              ? "border-[#C9FD48] bg-[#C9FD48]"
              : "border-zinc-300 dark:border-zinc-600"
          }`}
        >
          {selected && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{name}</span>
            {recommended && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#C9FD48] text-[9px] font-bold text-black uppercase tracking-wider">
                {recommendedLabel}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{description}</p>
          <span className="text-[11px] font-medium text-zinc-400 mt-1 inline-block tabular-nums">
            {priceRange}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ─── Scope Modifier Group ───────────────────────────── */

function ScopeModifierGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string | undefined;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              selected === opt.value
                ? "bg-[#C9FD48] text-black"
                : "bg-zinc-100 dark:bg-zinc-800 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Scrollable container with custom track ────────── */

function ScrollContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(100);
  const [showTrack, setShowTrack] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const canScroll = scrollHeight > clientHeight;
      setShowTrack(canScroll);
      if (canScroll) {
        setThumbHeight(Math.max((clientHeight / scrollHeight) * 100, 15));
        setThumbTop((scrollTop / scrollHeight) * 100);
      }
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [children]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className={`overflow-y-auto scrollbar-hide ${className}`}
      >
        {children}
      </div>
      {showTrack && (
        <div className="absolute top-0 right-0 w-1 h-full rounded-full bg-white/[0.08] dark:bg-white/[0.08]">
          <div
            className="absolute w-full rounded-full bg-[#C9FD48] transition-all duration-150"
            style={{ top: `${thumbTop}%`, height: `${thumbHeight}%` }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Step transition config ─────────────────────────── */

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

/* ─── Dynamic step definitions ──────────────────────── */

type StepDef =
  | { type: "projectType" }
  | { type: "designLevel" }
  | { type: "scope" }
  | { type: "features"; categoryIndex: number }
  | { type: "adBudget" }
  | { type: "contact" };

function buildSteps(config: CalculatorConfig, projectType: string | null): StepDef[] {
  const steps: StepDef[] = [{ type: "projectType" }];
  if (!projectType) return steps;

  if (!config.skipDesignTypes.includes(projectType)) {
    steps.push({ type: "designLevel" });
  }
  if ((config.scopeModifiers[projectType] || []).length > 0) {
    steps.push({ type: "scope" });
  }
  const cats = config.categorizedFeatures[projectType] || [];
  cats.forEach((_, i) => steps.push({ type: "features", categoryIndex: i }));
  if (projectType === "6") {
    steps.push({ type: "adBudget" });
  }
  steps.push({ type: "contact" });
  return steps;
}

/* ═══════════════════════════════════════════════════════
   CALCULATOR CLIENT
   ═══════════════════════════════════════════════════════ */

export function CalculatorClient({ config }: { config: CalculatorConfig }) {
  const t = useTranslations("Calculator");

  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const validInitialType = initialType && config.projectTypeKeys.includes(initialType) ? initialType : null;

  const [stepIdx, setStepIdx] = useState(validInitialType ? 1 : 0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    projectType: validInitialType,
    designLevel: null as string | null,
    scopeModifiers: {} as Record<string, string>,
    features: [] as string[],
    adBudget: null as string | null,
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const steps = buildSteps(config, form.projectType);
  const currentStep = steps[stepIdx] || steps[0];
  const totalSteps = steps.length;

  const [priceMin, priceMax] = calculatePrice(config, form.projectType, form.designLevel, form.features, form.scopeModifiers);
  const isMonthly = form.projectType !== null && config.monthlyTypes.includes(form.projectType);

  function goNext() {
    if (stepIdx < totalSteps - 1) {
      setDirection(1);
      setStepIdx(stepIdx + 1);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  function goBack() {
    if (stepIdx > 0) {
      setDirection(-1);
      setStepIdx(stepIdx - 1);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const projectLabel = form.projectType !== null ? t(`step1.types.${form.projectType}`) : "";
    const designLabel = form.designLevel !== null ? t(`step2.levels.${form.designLevel}`) : "";

    const scopeLines = (config.scopeModifiers[form.projectType!] || [])
      .map((mod) => {
        const val = form.scopeModifiers[mod.key];
        if (!val) return null;
        const label = t(`step3.scopes.${form.projectType}.${mod.key}.label`);
        const valueLabel = t(`step3.scopes.${form.projectType}.${mod.key}.${val}`);
        return `${label}: ${valueLabel}`;
      })
      .filter(Boolean)
      .join("\n");

    const allFeatures = getAllFeatures(config.categorizedFeatures, form.projectType!);
    const featureLabels = form.features
      .map((f) => {
        const feat = allFeatures.find((ft) => ft.key === f);
        const suffix = isMonthly ? t("perMonth") : "";
        const price = feat ? ` (€${feat.price[0]} — €${feat.price[1]}${suffix})` : "";
        return `- ${t(`step3.features.${form.projectType}.${f}`)}${price}`;
      })
      .join("\n");

    const subject = `Calculator: ${projectLabel} — ${form.name}`;
    const monthlySuffix = isMonthly ? t("perMonth") : "";
    const adBudgetLabel = form.adBudget ? t(`adBudget.options.${form.adBudget}`) : "";
    const adBudgetLine = adBudgetLabel ? `\nAd Budget: ${adBudgetLabel}` : "";
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nProject Type: ${projectLabel}\nDesign Level: ${designLabel}\n\nScope:\n${scopeLines}\n\nFeatures:\n${featureLabels}${adBudgetLine}\n\nEstimate: €${priceMin.toLocaleString()} — €${priceMax.toLocaleString()}${monthlySuffix}\n\nDescription: ${form.description}`;
    window.location.href = `mailto:hello@goqode.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => setSubmitted(true), 400);
  }

  function reset() {
    setForm({
      projectType: null,
      designLevel: null,
      scopeModifiers: {},
      features: [],
      adBudget: null,
      name: "",
      email: "",
      phone: "",
      description: "",
    });
    setStepIdx(0);
    setDirection(-1);
    setSubmitted(false);
  }

  const step1Valid = form.projectType !== null;
  const step2Valid = form.designLevel !== null;
  const contactValid = form.name.trim() !== "" && form.email.trim() !== "";

  /* ── Navigation buttons ── */
  const BackButton = () => (
    <button
      type="button"
      onClick={goBack}
      className="w-14 h-14 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-muted-foreground transition-all duration-200 hover:border-foreground hover:text-foreground"
      aria-label={t("back")}
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );

  const NextButton = ({ disabled = false, isSubmit = false }: { disabled?: boolean; isSubmit?: boolean }) => (
    <motion.button
      type={isSubmit ? "submit" : "button"}
      onClick={isSubmit ? undefined : goNext}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className="group inline-flex items-center gap-3 h-14 px-8 rounded-full bg-[#C9FD48] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#b8ec3a] disabled:opacity-40 disabled:pointer-events-none"
    >
      <span className="tracking-widest uppercase">{isSubmit ? t("submit") : t("continue")}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </motion.button>
  );

  /* ── Render current step content ── */
  function renderStep() {
    const def = currentStep;
    const indicator = `${stepIdx + 1}/${totalSteps}`;

    switch (def.type) {
      case "projectType":
        return (
          <motion.div
            key="projectType"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">
                {indicator}
              </p>
              <h2 className="clamp-[text,1.5rem,2.5rem] font-bold leading-tight text-foreground">
                {t("step1.title")}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {config.projectTypeKeys.map((key) => {
                const selected = form.projectType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setForm((p) => ({
                        ...p,
                        projectType: selected ? null : key,
                        features: selected ? p.features : [],
                        scopeModifiers: selected ? p.scopeModifiers : {},
                        designLevel: config.skipDesignTypes.includes(key) ? null : p.designLevel,
                      }));
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase border transition-all duration-200 ${
                      selected
                        ? "bg-[#C9FD48] text-black border-[#C9FD48]"
                        : "bg-zinc-50 dark:bg-zinc-900 text-foreground border-zinc-200 dark:border-zinc-700 hover:border-[#C9FD48]/50"
                    }`}
                  >
                    {t(`step1.types.${key}`)}
                  </button>
                );
              })}
            </div>

            <NextButton disabled={!step1Valid} />
          </motion.div>
        );

      case "designLevel":
        return (
          <motion.div
            key="designLevel"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">
                {indicator}
              </p>
              <h2 className="clamp-[text,1.5rem,2.5rem] font-bold leading-tight text-foreground">
                {t("step2.title")}
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {config.designLevelKeys.map((key) => {
                const selected = form.designLevel === key;
                return (
                  <DesignLevelCard
                    key={key}
                    selected={selected}
                    name={t(`step2.levels.${key}`)}
                    description={t(`step2.descriptions.${key}`)}
                    multiplier={`${config.designMultipliers[key]}x`}
                    onClick={() => setForm((p) => ({ ...p, designLevel: selected ? null : key }))}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <BackButton />
              <NextButton disabled={!step2Valid} />
            </div>
          </motion.div>
        );

      case "scope":
        return (
          <motion.div
            key="scope"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">
                {indicator}
              </p>
              <h2 className="clamp-[text,1.5rem,2.5rem] font-bold leading-tight text-foreground">
                {t("step3.scopeTitle")}
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              {(config.scopeModifiers[form.projectType!] || []).map((mod) => (
                <ScopeModifierGroup
                  key={mod.key}
                  label={t(`step3.scopes.${form.projectType}.${mod.key}.label`)}
                  options={mod.options.map((opt) => ({
                    value: opt.value,
                    label: t(`step3.scopes.${form.projectType}.${mod.key}.${opt.value}`),
                  }))}
                  selected={form.scopeModifiers[mod.key]}
                  onSelect={(value) =>
                    setForm((p) => ({
                      ...p,
                      scopeModifiers: { ...p.scopeModifiers, [mod.key]: value },
                    }))
                  }
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <BackButton />
              <NextButton />
            </div>
          </motion.div>
        );

      case "features": {
        const cats = config.categorizedFeatures[form.projectType!] || [];
        const category = cats[def.categoryIndex];
        if (!category) return null;

        return (
          <motion.div
            key={`features-${def.categoryIndex}`}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">
                {indicator}
              </p>
              <h2 className="clamp-[text,1.5rem,2.5rem] font-bold leading-tight text-foreground">
                {t(`step3.categories.${form.projectType}.${category.categoryKey}`)}
              </h2>
            </div>

            {/* Desktop: scrollable container. Mobile: flat list */}
            <div className="hidden lg:block">
              <ScrollContainer className="flex flex-col gap-2 max-h-[50vh] pb-4 pr-3">
                {category.features.map((feature) => {
                  const selected = form.features.includes(feature.key);
                  return (
                    <FeatureCard
                      key={feature.key}
                      selected={selected}
                      name={t(`step3.features.${form.projectType}.${feature.key}`)}
                      description={t(`step3.descriptions.${form.projectType}.${feature.key}`)}
                      priceRange={`€${feature.price[0]} — €${feature.price[1]}${isMonthly ? t("perMonth") : ""}`}
                      recommended={feature.recommended}
                      recommendedLabel={t("step3.recommended")}
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          features: selected
                            ? p.features.filter((f) => f !== feature.key)
                            : [...p.features, feature.key],
                        }))
                      }
                    />
                  );
                })}
              </ScrollContainer>
            </div>
            <div className="flex lg:hidden flex-col gap-2">
              {category.features.map((feature) => {
                const selected = form.features.includes(feature.key);
                return (
                  <FeatureCard
                    key={feature.key}
                    selected={selected}
                    name={t(`step3.features.${form.projectType}.${feature.key}`)}
                    description={t(`step3.descriptions.${form.projectType}.${feature.key}`)}
                    priceRange={`€${feature.price[0]} — €${feature.price[1]}${isMonthly ? t("perMonth") : ""}`}
                    recommended={feature.recommended}
                    recommendedLabel={t("step3.recommended")}
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        features: selected
                          ? p.features.filter((f) => f !== feature.key)
                          : [...p.features, feature.key],
                      }))
                    }
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <BackButton />
              <NextButton />
            </div>
          </motion.div>
        );
      }

      case "adBudget": {
        const budgetOptions = ["under300", "300to500", "500to1000", "1000to2000", "over2000"];
        return (
          <motion.div
            key="adBudget"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">
                {indicator}
              </p>
              <h2 className="clamp-[text,1.5rem,2.5rem] font-bold leading-tight text-foreground">
                {t("adBudget.title")}
              </h2>
              <p className="clamp-[text,0.875rem,1rem] text-muted-foreground mt-2">
                {t("adBudget.subtitle")}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {budgetOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, adBudget: opt }))}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    form.adBudget === opt
                      ? "bg-[#C9FD48] text-black"
                      : "bg-zinc-100 dark:bg-zinc-800 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {t(`adBudget.options.${opt}`)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <BackButton />
              <NextButton />
            </div>
          </motion.div>
        );
      }

      case "contact":
        return (
          <motion.form
            key="contact"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">
                {indicator}
              </p>
              <h2 className="clamp-[text,1.5rem,2.5rem] font-bold leading-tight text-foreground">
                {t("step4.title")}
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              <UnderlineInput
                label={t("step4.name")}
                required
                value={form.name}
                onChange={(v) => setForm((p) => ({ ...p, name: v }))}
              />
              <UnderlineInput
                label={t("step4.email")}
                type="email"
                required
                value={form.email}
                onChange={(v) => setForm((p) => ({ ...p, email: v }))}
              />
              <UnderlineInput
                label={t("step4.phone")}
                type="tel"
                value={form.phone}
                onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
              />
              <UnderlineTextarea
                label={t("step4.description")}
                value={form.description}
                onChange={(v) => setForm((p) => ({ ...p, description: v }))}
              />
            </div>

            <div className="flex items-center gap-3">
              <BackButton />
              <NextButton disabled={!contactValid} isSubmit />
            </div>
          </motion.form>
        );
    }
  }

  const showBottomBar = priceMin > 0 && !submitted;

  return (
  <>
    <main className="w-full min-h-[100dvh] flex flex-col lg:flex-row">
      {/* ── LEFT SIDE — Dark panel ── */}
      {/* Mobile: compact header. Desktop: full side panel */}
      <div className="relative w-full lg:w-[45%] bg-zinc-950 flex flex-col justify-between clamp-[px,12,24] py-6 lg:clamp-[py,24,48] lg:min-h-[100dvh] overflow-hidden">
        {/* Subtle gradient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 70%, rgba(201,253,72,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Heading */}
        <div className="relative z-10 flex-1 flex flex-col justify-center gap-4 lg:gap-8">
          <h1 className="text-2xl lg:text-[4.5vw] font-black leading-[0.95] tracking-tight text-white whitespace-pre-line">
            {t("heading")}
          </h1>

          {/* Progress bar — desktop only */}
          {!submitted && (
            <div className="hidden lg:flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                  {stepIdx + 1}/{totalSteps}
                </span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#C9FD48] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((stepIdx + 1) / totalSteps) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                />
              </div>
            </div>
          )}

          {/* Mobile progress bar — compact inline */}
          {!submitted && (
            <div className="flex lg:hidden items-center gap-3">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 shrink-0">
                {stepIdx + 1}/{totalSteps}
              </span>
              <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#C9FD48] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((stepIdx + 1) / totalSteps) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                />
              </div>
            </div>
          )}

          {/* Live price estimate — desktop only (mobile uses sticky bottom bar) */}
          {priceMin > 0 && !submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden lg:flex flex-col gap-1"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                {t("estimate")}
              </span>
              <div className="text-[#C9FD48] text-2xl lg:text-3xl font-black tabular-nums">
                <motion.span
                  key={priceMin}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  €{priceMin.toLocaleString()}
                </motion.span>
                <span className="text-zinc-500 mx-2">—</span>
                <motion.span
                  key={priceMax}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  €{priceMax.toLocaleString()}
                </motion.span>
                {isMonthly && (
                  <span className="text-zinc-500 text-lg lg:text-xl font-medium ml-1">{t("perMonth")}</span>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom email contact — desktop only */}
        <div className="relative z-10 hidden lg:flex flex-wrap items-center gap-3 pt-6">
          <span className="text-xs text-zinc-500 font-medium tracking-wide">
            {t("bottom.project")}
          </span>
          <EmailPill email={t("bottom.email")} />
        </div>
      </div>

      {/* ── RIGHT SIDE — Steps panel ── */}
      <div className="w-full lg:w-[55%] bg-white dark:bg-zinc-900 flex flex-col justify-start pt-6 lg:pt-36 clamp-[px,12,24] clamp-[py,24,48] pb-28 lg:pb-12 min-h-[50vh] lg:min-h-[100dvh] relative">
        <div className="w-full lg:max-w-lg lg:mx-0 lg:ml-[10%] relative overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction}>
            {submitted ? (
              /* ── Result state ── */
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex flex-col gap-8 py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-[#C9FD48]/15 border-2 border-[#C9FD48]/30 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-[#C9FD48]" />
                </motion.div>

                <div>
                  <h2 className="clamp-[text,1.5rem,2.5rem] font-bold text-foreground mb-2">
                    {t("result.title")}
                  </h2>
                  <div className="text-[#C9FD48] text-3xl lg:text-4xl font-black tabular-nums">
                    <CountUp target={priceMin} prefix="€" /> — <CountUp target={priceMax} prefix="€" />
                    {isMonthly && <span className="text-zinc-500 text-xl font-medium ml-1">{t("perMonth")}</span>}
                  </div>
                </div>

                {/* Summary */}
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
                    {t("result.summary")}
                  </p>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    {form.projectType !== null && (
                      <div className="flex justify-between">
                        <span>{t("result.projectType")}</span>
                        <span className="font-medium text-foreground">{t(`step1.types.${form.projectType}`)}</span>
                      </div>
                    )}
                    {form.designLevel !== null && (
                      <div className="flex justify-between">
                        <span>{t("result.designLevel")}</span>
                        <span className="font-medium text-foreground">{t(`step2.levels.${form.designLevel}`)}</span>
                      </div>
                    )}
                    {(config.scopeModifiers[form.projectType!] || []).map((mod) => {
                      const val = form.scopeModifiers[mod.key];
                      if (!val) return null;
                      return (
                        <div key={mod.key} className="flex justify-between">
                          <span>{t(`step3.scopes.${form.projectType}.${mod.key}.label`)}</span>
                          <span className="font-medium text-foreground">
                            {t(`step3.scopes.${form.projectType}.${mod.key}.${val}`)}
                          </span>
                        </div>
                      );
                    })}
                    {form.features.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted-foreground">{t("result.features")}</span>
                        <div className="flex flex-col gap-1.5">
                          {form.features.map((f) => {
                            const featureData = getAllFeatures(config.categorizedFeatures, form.projectType!).find((ft) => ft.key === f);
                            return (
                              <div key={f} className="flex justify-between items-center text-sm">
                                <span className="text-foreground font-medium">
                                  {t(`step3.features.${form.projectType}.${f}`)}
                                </span>
                                {featureData && (
                                  <span className="text-xs text-zinc-400 tabular-nums shrink-0 ml-3">
                                    €{featureData.price[0]} — €{featureData.price[1]}{isMonthly ? t("perMonth") : ""}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-[#C9FD48] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#b8ec3a]"
                  >
                    <span className="tracking-widest uppercase">{t("result.discuss")}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <button
                    onClick={reset}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                  >
                    {t("result.recalculate")}
                  </button>
                </div>
              </motion.div>
            ) : (
              renderStep()
            )}
          </AnimatePresence>
        </div>
      </div>

    </main>

    {/* ── MOBILE STICKY BOTTOM BAR — via Portal to avoid framer-motion transform interference ── */}
    {typeof document !== "undefined" &&
      createPortal(
        <div
          style={{ transform: `translateY(${showBottomBar ? 0 : 100}%)` }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ease-out"
        >
          <div className="bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 px-4 py-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                {t("estimate")}
              </span>
              <div className="text-[#C9FD48] text-lg font-black tabular-nums leading-tight">
                €{priceMin.toLocaleString()}
                <span className="text-zinc-500 mx-1">—</span>
                €{priceMax.toLocaleString()}
                {isMonthly && (
                  <span className="text-zinc-500 text-xs font-medium ml-1">{t("perMonth")}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {form.features.length > 0 && (
                <span className="text-[10px] text-zinc-500 font-medium tabular-nums">
                  {form.features.length} {t("featuresCount")}
                </span>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
  </>
  );
}
