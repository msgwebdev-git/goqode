"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { deleteSubmission } from "./actions";

type Submission = {
  id: number;
  source: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  projectType: string | null;
  designLevel: string | null;
  features: string | null;
  scopeModifiers: string | null;
  adBudget: string | null;
  priceMin: number | null;
  priceMax: number | null;
  isMonthly: boolean | null;
  solutions: string | null;
  serviceTypes: string | null;
  budget: string | null;
  createdAt: Date;
};

export function SubmissionsClient({ submissions }: { submissions: Submission[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm("Удалить заявку?")) return;
    setDeletingId(id);
    await deleteSubmission(id);
    setDeletingId(null);
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-500">
        Заявок пока нет
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">
        Заявки ({submissions.length})
      </h2>

      <div className="flex flex-col gap-3">
        {submissions.map((s) => {
          const isExpanded = expandedId === s.id;
          const isCalc = s.source === "calculator";
          const date = new Date(s.createdAt).toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={s.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
            >
              {/* Row header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : s.id)}
                className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <span
                  className={`shrink-0 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                    isCalc
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  }`}
                >
                  {isCalc ? "Calc" : "Contact"}
                </span>
                <span className="font-medium text-sm text-foreground truncate">
                  {s.name}
                </span>
                <span className="text-xs text-zinc-500 truncate hidden sm:inline">
                  {s.email}
                </span>
                {isCalc && s.priceMin != null && s.priceMax != null && (
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 shrink-0">
                    €{s.priceMin.toLocaleString()} — €{s.priceMax.toLocaleString()}
                    {s.isMonthly ? "/мес" : ""}
                  </span>
                )}
                <span className="text-xs text-zinc-400 shrink-0 ml-auto">
                  {date}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                )}
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <Detail label="Имя" value={s.name} />
                    <Detail label="Email" value={s.email} />
                    <Detail label="Телефон" value={s.phone} />
                    <Detail label="Источник" value={s.source} />

                    {isCalc && (
                      <>
                        <Detail label="Тип проекта" value={s.projectType} />
                        <Detail label="Уровень дизайна" value={s.designLevel} />
                        <Detail
                          label="Цена"
                          value={
                            s.priceMin != null && s.priceMax != null
                              ? `€${s.priceMin.toLocaleString()} — €${s.priceMax.toLocaleString()}${s.isMonthly ? "/мес" : ""}`
                              : null
                          }
                        />
                        <Detail label="Рекл. бюджет" value={s.adBudget} />
                        <DetailList label="Фичи" json={s.features} />
                        <DetailJson label="Модификаторы" json={s.scopeModifiers} />
                      </>
                    )}

                    {!isCalc && (
                      <>
                        <DetailList label="Решения" json={s.solutions} />
                        <DetailList label="Услуги" json={s.serviceTypes} />
                        <Detail label="Бюджет" value={s.budget} />
                      </>
                    )}
                  </div>

                  {s.message && (
                    <div className="mt-3">
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Сообщение
                      </span>
                      <p className="text-sm text-foreground mt-1 whitespace-pre-wrap">
                        {s.message}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDelete(s.id)}
                      disabled={deletingId === s.id}
                      className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {deletingId === s.id ? "Удаление..." : "Удалить"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex flex-col">
      <span className="text-xs text-zinc-400">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function DetailList({ label, json }: { label: string; json: string | null }) {
  if (!json) return null;
  try {
    const arr = JSON.parse(json) as string[];
    if (arr.length === 0) return null;
    return (
      <div className="flex flex-col sm:col-span-2">
        <span className="text-xs text-zinc-400">{label}</span>
        <span className="text-foreground">{arr.join(", ")}</span>
      </div>
    );
  } catch {
    return null;
  }
}

function DetailJson({ label, json }: { label: string; json: string | null }) {
  if (!json) return null;
  try {
    const obj = JSON.parse(json) as Record<string, string>;
    const entries = Object.entries(obj).filter(([, v]) => v);
    if (entries.length === 0) return null;
    return (
      <div className="flex flex-col sm:col-span-2">
        <span className="text-xs text-zinc-400">{label}</span>
        <span className="text-foreground">
          {entries.map(([k, v]) => `${k}: ${v}`).join(", ")}
        </span>
      </div>
    );
  } catch {
    return null;
  }
}
