"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { notFound, unauthorized } from "next/navigation";

export async function deleteResume(resumeId: string) {
  const { userId } = await auth();

  if (!userId) unauthorized();

  const resume = await db.resume.findUnique({
    where: { id: resumeId, userId },
  });

  if (!resume) {
    notFound();
  }

  if (resume.photoUrl) {
    await del(resume.photoUrl);
  }

  await db.resume.delete({ where: { id: resume.id } });

  revalidatePath("/resumes");
}
