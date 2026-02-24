"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { db } from "@/db";
import {
  projectTypes,
  designLevels,
  featureCategories,
  features,
  scopeModifiers,
  scopeModifierOptions,
} from "@/db/schema";
import { eq } from "drizzle-orm";

async function requireAdmin() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin-auth");
  if (!auth || auth.value !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
}

function invalidate() {
  revalidateTag("calc-config", "max");
}

// ─── Project Types ──────────────────────────────────

export async function updateProjectType(
  id: number,
  data: {
    basePriceMin: number;
    basePriceMax: number;
    isMonthly: boolean;
    skipDesign: boolean;
    sortOrder: number;
  },
) {
  await requireAdmin();
  await db.update(projectTypes).set(data).where(eq(projectTypes.id, id));
  invalidate();
}

// ─── Design Levels ──────────────────────────────────

export async function updateDesignLevel(
  id: number,
  data: { multiplier: number; sortOrder: number },
) {
  await requireAdmin();
  await db.update(designLevels).set(data).where(eq(designLevels.id, id));
  invalidate();
}

// ─── Feature Categories ─────────────────────────────

export async function addFeatureCategory(data: {
  projectTypeKey: string;
  categoryKey: string;
  sortOrder: number;
}) {
  await requireAdmin();
  const [row] = await db.insert(featureCategories).values(data).returning();
  invalidate();
  return row;
}

export async function updateFeatureCategory(
  id: number,
  data: { categoryKey: string; sortOrder: number },
) {
  await requireAdmin();
  await db.update(featureCategories).set(data).where(eq(featureCategories.id, id));
  invalidate();
}

export async function deleteFeatureCategory(id: number) {
  await requireAdmin();
  await db.delete(featureCategories).where(eq(featureCategories.id, id));
  invalidate();
}

// ─── Features ───────────────────────────────────────

export async function addFeature(data: {
  categoryId: number;
  key: string;
  priceMin: number;
  priceMax: number;
  recommended: boolean;
  sortOrder: number;
}) {
  await requireAdmin();
  const [row] = await db.insert(features).values(data).returning();
  invalidate();
  return row;
}

export async function updateFeature(
  id: number,
  data: {
    key: string;
    priceMin: number;
    priceMax: number;
    recommended: boolean;
    sortOrder: number;
  },
) {
  await requireAdmin();
  await db.update(features).set(data).where(eq(features.id, id));
  invalidate();
}

export async function deleteFeature(id: number) {
  await requireAdmin();
  await db.delete(features).where(eq(features.id, id));
  invalidate();
}

// ─── Scope Modifiers ────────────────────────────────

export async function addScopeModifier(data: {
  projectTypeKey: string;
  key: string;
  sortOrder: number;
}) {
  await requireAdmin();
  const [row] = await db.insert(scopeModifiers).values(data).returning();
  invalidate();
  return row;
}

export async function updateScopeModifier(
  id: number,
  data: { key: string; sortOrder: number },
) {
  await requireAdmin();
  await db.update(scopeModifiers).set(data).where(eq(scopeModifiers.id, id));
  invalidate();
}

export async function deleteScopeModifier(id: number) {
  await requireAdmin();
  await db.delete(scopeModifiers).where(eq(scopeModifiers.id, id));
  invalidate();
}

// ─── Scope Modifier Options ─────────────────────────

export async function addScopeModifierOption(data: {
  scopeModifierId: number;
  value: string;
  multiplier: number;
  sortOrder: number;
}) {
  await requireAdmin();
  const [row] = await db.insert(scopeModifierOptions).values(data).returning();
  invalidate();
  return row;
}

export async function updateScopeModifierOption(
  id: number,
  data: { value: string; multiplier: number; sortOrder: number },
) {
  await requireAdmin();
  await db.update(scopeModifierOptions).set(data).where(eq(scopeModifierOptions.id, id));
  invalidate();
}

export async function deleteScopeModifierOption(id: number) {
  await requireAdmin();
  await db.delete(scopeModifierOptions).where(eq(scopeModifierOptions.id, id));
  invalidate();
}
