import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminClient } from "./admin-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const dynamic = "force-dynamic";

export default async function AdminCalculatorPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;

  if (!token) redirect("/admin");

  const res = await fetch(`${API_URL}/api/admin/calculator/config`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) redirect("/admin");

  const config = await res.json();

  return (
    <AdminClient
      token={token}
      projectTypes={config.projectTypes}
      designLevels={config.designLevels}
      featureCategories={config.featureCategories}
      features={config.features}
      scopeModifiers={config.scopeModifiers}
      scopeModifierOptions={config.scopeModifierOptions}
    />
  );
}
