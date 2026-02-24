"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowLeft, Check, Copy, CheckCircle } from "lucide-react";

/* ─── Constants ──────────────────────────────────────── */

const SOLUTION_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7"] as const;
const SERVICE_TYPE_KEYS = ["0", "1", "2", "3", "4", "5", "6"] as const;
const BUDGET_KEYS = ["0", "1", "2", "3", "4"] as const;

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
      {/* Active underline */}
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
  required = false,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
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
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        rows={3}
        className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-700 py-3 text-base font-medium text-foreground outline-none transition-colors duration-300 focus:border-[#C9FD48] resize-none placeholder:text-zinc-400"
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

/* ═══════════════════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════════════════ */

export default function ContactPage() {
  const t = useTranslations("Contact");

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    solutions: [] as string[],
    serviceTypes: [] as string[],
    budget: "",
    agreed: true,
  });

  function goNext() {
    setDirection(1);
    setStep(2);
  }

  function goBack() {
    setDirection(-1);
    setStep(1);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const solutionsStr = form.solutions.join(", ");
    const serviceTypesStr = form.serviceTypes.join(", ");
    const subject = solutionsStr || serviceTypesStr
      ? `${[solutionsStr, serviceTypesStr].filter(Boolean).join(" | ")}: ${form.name}`
      : `Contact from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nSolutions: ${solutionsStr}\nServices: ${serviceTypesStr}\nBudget: ${form.budget}\n\n${form.message}`;
    window.location.href = `mailto:hello@goqode.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => setSubmitted(true), 400);
  }

  function reset() {
    setForm({ name: "", email: "", phone: "", message: "", solutions: [], serviceTypes: [], budget: "", agreed: true });
    setStep(1);
    setDirection(-1);
    setSubmitted(false);
  }

  const step1Valid = form.name.trim() !== "" && form.email.trim() !== "";
  const step2Valid = form.message.trim() !== "";

  return (
    <main className="w-full min-h-[100dvh] flex flex-col lg:flex-row">
      {/* ── LEFT SIDE — Dark panel with heading ── */}
      <div className="relative w-full lg:w-[45%] bg-zinc-950 flex flex-col justify-between clamp-[px,12,24] clamp-[py,24,48] min-h-[40vh] lg:min-h-[100dvh] overflow-hidden">
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
        <div className="relative z-10 flex-1 flex items-center">
          <h1 className="text-[10vw] lg:text-[4.5vw] font-black leading-[0.95] tracking-tight text-white whitespace-pre-line">
            {t("heading")}
          </h1>
        </div>

        {/* Bottom email contact */}
        <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6">
          <span className="text-xs text-zinc-500 font-medium tracking-wide">
            {t("bottom.project")}
          </span>
          <EmailPill email={t("bottom.email")} />
        </div>
      </div>

      {/* ── RIGHT SIDE — Form panel ── */}
      <div className="w-full lg:w-[55%] bg-white dark:bg-zinc-950 flex flex-col justify-center clamp-[px,12,24] clamp-[py,24,48] min-h-[60vh] lg:min-h-[100dvh] relative">
        <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-[10%]">
          <AnimatePresence mode="wait" custom={direction}>
            {submitted ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex flex-col items-center justify-center text-center gap-6 py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-[#C9FD48]/15 border-2 border-[#C9FD48]/30 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-[#C9FD48]" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {t("success.title")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t("success.subtitle")}
                </p>
                <button
                  onClick={reset}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  {t("success.sendAnother")}
                </button>
              </motion.div>
            ) : step === 1 ? (
              /* ── Step 1: Contact details ── */
              <motion.div
                key="step1"
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
                    {t("step1.indicator")}
                  </p>
                  <h2 className="clamp-[text,1.5rem,2.5rem] font-bold leading-tight text-foreground">
                    {t("step1.title")}
                  </h2>
                </div>

                <div className="flex flex-col gap-8">
                  <UnderlineInput
                    label={t("step1.name")}
                    required
                    value={form.name}
                    onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                  />
                  <UnderlineInput
                    label={t("step1.email")}
                    type="email"
                    required
                    value={form.email}
                    onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                  />
                  <UnderlineInput
                    label={t("step1.phone")}
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
                  />
                </div>

                <motion.button
                  type="button"
                  onClick={goNext}
                  disabled={!step1Valid}
                  whileHover={step1Valid ? { scale: 1.02 } : {}}
                  whileTap={step1Valid ? { scale: 0.98 } : {}}
                  className="group self-start inline-flex items-center gap-3 h-14 px-8 rounded-full bg-[#C9FD48] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#b8ec3a] disabled:opacity-40 disabled:pointer-events-none"
                >
                  <span className="tracking-widest uppercase">{t("step1.continue")}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            ) : (
              /* ── Step 2: Project info ── */
              <motion.form
                key="step2"
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
                    {t("step2.indicator")}
                  </p>
                  <h2 className="clamp-[text,1.5rem,2.5rem] font-bold leading-tight text-foreground">
                    {t("step2.title")}
                  </h2>
                </div>

                <UnderlineTextarea
                  label={t("step2.message")}
                  required
                  value={form.message}
                  onChange={(v) => setForm((p) => ({ ...p, message: v }))}
                  placeholder={t("step2.messagePlaceholder")}
                />

                {/* Solutions selector pills */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">
                    {t("step2.selectSolution")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SOLUTION_KEYS.map((key) => {
                      const label = t(`step2.solutions.${key}`);
                      const selected = form.solutions.includes(label);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() =>
                            setForm((p) => ({
                              ...p,
                              solutions: selected
                                ? p.solutions.filter((s) => s !== label)
                                : [...p.solutions, label],
                            }))
                          }
                          className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase border transition-all duration-200 ${
                            selected
                              ? "bg-[#C9FD48] text-black border-[#C9FD48]"
                              : "bg-zinc-50 dark:bg-zinc-900 text-foreground border-zinc-200 dark:border-zinc-700 hover:border-[#C9FD48]/50"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Service type selector pills */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">
                    {t("step2.selectServiceType")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_TYPE_KEYS.map((key) => {
                      const label = t(`step2.serviceTypes.${key}`);
                      const selected = form.serviceTypes.includes(label);
                      return (
                        <button
                          key={`st-${key}`}
                          type="button"
                          onClick={() =>
                            setForm((p) => ({
                              ...p,
                              serviceTypes: selected
                                ? p.serviceTypes.filter((s) => s !== label)
                                : [...p.serviceTypes, label],
                            }))
                          }
                          className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase border transition-all duration-200 ${
                            selected
                              ? "bg-[#C9FD48] text-black border-[#C9FD48]"
                              : "bg-zinc-50 dark:bg-zinc-900 text-foreground border-zinc-200 dark:border-zinc-700 hover:border-[#C9FD48]/50"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget selector pills */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">
                    {t("step2.selectBudget")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_KEYS.map((key) => {
                      const label = t(`step2.budgets.${key}`);
                      const selected = form.budget === label;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() =>
                            setForm((p) => ({
                              ...p,
                              budget: selected ? "" : label,
                            }))
                          }
                          className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase border transition-all duration-200 ${
                            selected
                              ? "bg-[#C9FD48] text-black border-[#C9FD48]"
                              : "bg-zinc-50 dark:bg-zinc-900 text-foreground border-zinc-200 dark:border-zinc-700 hover:border-[#C9FD48]/50"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Agreement checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
                      form.agreed
                        ? "bg-[#C9FD48] border-[#C9FD48]"
                        : "border-zinc-300 dark:border-zinc-600"
                    }`}
                    onClick={() => setForm((p) => ({ ...p, agreed: !p.agreed }))}
                  >
                    {form.agreed && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {t("step2.agree")}
                  </span>
                </label>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    className="w-14 h-14 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-muted-foreground transition-all duration-200 hover:border-foreground hover:text-foreground"
                    aria-label={t("step2.back")}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <motion.button
                    type="submit"
                    disabled={!step2Valid || !form.agreed}
                    whileHover={step2Valid && form.agreed ? { scale: 1.02 } : {}}
                    whileTap={step2Valid && form.agreed ? { scale: 0.98 } : {}}
                    className="group inline-flex items-center gap-3 h-14 px-8 rounded-full bg-[#C9FD48] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#b8ec3a] disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <span className="tracking-widest uppercase">{t("step2.submit")}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
