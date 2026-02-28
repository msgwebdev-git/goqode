import { SubmissionsClient } from "./submissions-client";

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

export default async function SubmissionsPage() {
  const token = await getJwtToken();

  const res = await fetch(`${API_URL}/api/admin/submissions`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const rows = await res.json();

  return <SubmissionsClient submissions={rows} token={token} />;
}
