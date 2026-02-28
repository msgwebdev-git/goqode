import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SubmissionsClient } from "./submissions-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;

  if (!token) redirect("/admin");

  const res = await fetch(`${API_URL}/api/admin/submissions`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) redirect("/admin");

  const rows = await res.json();

  return <SubmissionsClient submissions={rows} token={token} />;
}
