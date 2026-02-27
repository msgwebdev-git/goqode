"use server";

import { db } from "@/db";
import { submissions } from "@/db/schema";
import { sendTelegramNotification } from "@/lib/telegram";

export async function submitCalculator(data: {
  name: string;
  email: string;
  phone: string;
  description: string;
  projectType: string;
  designLevel: string | null;
  features: string[];
  scopeModifiers: Record<string, string>;
  adBudget: string | null;
  priceMin: number;
  priceMax: number;
  isMonthly: boolean;
  labels: {
    projectType: string;
    designLevel: string;
    scopeModifiers: { label: string; value: string }[];
    features: { name: string; priceMin: number; priceMax: number }[];
    adBudget: string;
  };
}) {
  try {
    const [row] = await db.insert(submissions).values({
      source: "calculator",
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.description || null,
      projectType: data.projectType,
      designLevel: data.designLevel,
      features: JSON.stringify(data.features),
      scopeModifiers: JSON.stringify(data.scopeModifiers),
      adBudget: data.adBudget,
      priceMin: data.priceMin,
      priceMax: data.priceMax,
      isMonthly: data.isMonthly,
      labels: JSON.stringify(data.labels),
    }).returning({ id: submissions.id });

    const monthlySuffix = data.isMonthly ? "/мес" : "";
    const { labels } = data;

    let msg =
      `<b>🧮 Новая заявка из калькулятора</b>\n\n` +
      `<b>Имя:</b> ${esc(data.name)}\n` +
      `<b>Email:</b> ${esc(data.email)}\n` +
      (data.phone ? `<b>Телефон:</b> ${esc(data.phone)}\n` : "") +
      `\n<b>💰 €${data.priceMin.toLocaleString()} — €${data.priceMax.toLocaleString()}${monthlySuffix}</b>\n` +
      `\n<b>Выбранные параметры:</b>\n` +
      `Тип проекта: <b>${esc(labels.projectType)}</b>\n` +
      (labels.designLevel ? `Уровень дизайна: <b>${esc(labels.designLevel)}</b>\n` : "");

    for (const mod of labels.scopeModifiers) {
      msg += `${esc(mod.label)}: <b>${esc(mod.value)}</b>\n`;
    }

    if (labels.adBudget) {
      msg += `Рекл. бюджет: <b>${esc(labels.adBudget)}</b>\n`;
    }

    if (labels.features.length > 0) {
      msg += `\n<b>Функции:</b>\n`;
      for (const f of labels.features) {
        msg += `• ${esc(f.name)}  €${f.priceMin} — €${f.priceMax}${monthlySuffix}\n`;
      }
    }

    if (data.description) {
      msg += `\n<b>Описание:</b> ${esc(data.description)}`;
    }

    sendTelegramNotification(msg);

    return { success: true, id: row.id };
  } catch (error) {
    console.error("submitCalculator error:", error);
    return { success: false, error: "Failed to submit" } as const;
  }
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  solutions: string[];
  serviceTypes: string[];
  budget: string;
}) {
  try {
    const [row] = await db.insert(submissions).values({
      source: "contact",
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message || null,
      solutions: JSON.stringify(data.solutions),
      serviceTypes: JSON.stringify(data.serviceTypes),
      budget: data.budget || null,
    }).returning({ id: submissions.id });

    sendTelegramNotification(
      `<b>📩 Новая заявка с контактной формы</b>\n\n` +
        `<b>Имя:</b> ${esc(data.name)}\n` +
        `<b>Email:</b> ${esc(data.email)}\n` +
        (data.phone ? `<b>Телефон:</b> ${esc(data.phone)}\n` : "") +
        (data.solutions.length > 0
          ? `\n<b>Решения:</b> ${esc(data.solutions.join(", "))}\n`
          : "") +
        (data.serviceTypes.length > 0
          ? `<b>Услуги:</b> ${esc(data.serviceTypes.join(", "))}\n`
          : "") +
        (data.budget
          ? `<b>Бюджет:</b> ${esc(data.budget)}\n`
          : "") +
        (data.message
          ? `\n<b>Сообщение:</b> ${esc(data.message)}`
          : ""),
    );

    return { success: true, id: row.id };
  } catch (error) {
    console.error("submitContact error:", error);
    return { success: false, error: "Failed to submit" } as const;
  }
}

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
