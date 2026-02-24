import { db } from "@/db";
import {
  projectTypes,
  designLevels,
  featureCategories,
  features,
  scopeModifiers,
  scopeModifierOptions,
} from "@/db/schema";
import { asc } from "drizzle-orm";
import { AdminClient } from "./admin-client";

export const dynamic = "force-dynamic";

export default async function AdminCalculatorPage() {
  const [ptRows, dlRows, fcRows, fRows, smRows, smoRows] = await Promise.all([
    db.select().from(projectTypes).orderBy(asc(projectTypes.sortOrder)),
    db.select().from(designLevels).orderBy(asc(designLevels.sortOrder)),
    db.select().from(featureCategories).orderBy(asc(featureCategories.sortOrder)),
    db.select().from(features).orderBy(asc(features.sortOrder)),
    db.select().from(scopeModifiers).orderBy(asc(scopeModifiers.sortOrder)),
    db.select().from(scopeModifierOptions).orderBy(asc(scopeModifierOptions.sortOrder)),
  ]);

  return (
    <AdminClient
      projectTypes={ptRows}
      designLevels={dlRows}
      featureCategories={fcRows}
      features={fRows}
      scopeModifiers={smRows}
      scopeModifierOptions={smoRows}
    />
  );
}
