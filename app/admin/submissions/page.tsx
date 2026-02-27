import { db } from "@/db";
import { submissions } from "@/db/schema";
import { desc } from "drizzle-orm";
import { SubmissionsClient } from "./submissions-client";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const rows = await db
    .select()
    .from(submissions)
    .orderBy(desc(submissions.createdAt));

  return <SubmissionsClient submissions={rows} />;
}
