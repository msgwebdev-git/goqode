import { cookies } from "next/headers";
import { AdminClient } from "./admin-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function getJwtToken(): Promise<string> {
  const res = await fetch(`${API_URL}/api/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: process.env.ADMIN_PASSWORD }),
    cache: "no-store",
  });
  const data = await res.json();
  return data.access_token;
}

export const dynamic = "force-dynamic";

export default async function AdminCalculatorPage() {
  const token = await getJwtToken();

  const res = await fetch(`${API_URL}/api/admin/calculator/config`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
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
