"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin-auth");
  if (!auth || auth.value !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
}

export async function deleteSubmission(id: number) {
  await requireAdmin();
  await db.delete(submissions).where(eq(submissions.id, id));
  revalidatePath("/admin/submissions");
}
