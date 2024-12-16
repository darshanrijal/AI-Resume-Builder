"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteResume(resumeId: string) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const resume = await db.resume.findUnique({
    where: { id: resumeId, userId },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  if (resume.photoUrl) {
    await del(resume.photoUrl);
  }

  await db.resume.delete({ where: { id: resume.id } });

  revalidatePath("/resumes");
}
