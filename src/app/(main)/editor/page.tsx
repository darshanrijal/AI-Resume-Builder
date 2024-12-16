import { db } from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { Suspense } from "react";
import { ResumeEditor } from "./ResumeEditor";

export const metadata: Metadata = {
  title: "Design your resume",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ resumeId?: string }>;
}) {
  const { resumeId } = await searchParams;
  const { userId } = await auth();

  if (!userId) return null;

  const resumeToEdit = resumeId
    ? await db.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return (
    <Suspense>
      <ResumeEditor resumeToEdit={resumeToEdit} />
    </Suspense>
  );
}
