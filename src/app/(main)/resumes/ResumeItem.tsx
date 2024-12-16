"use client";

import Link from "next/link";
import { formatDate } from "date-fns";
import { ResumePreview } from "@/components/ResumePreview";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export const ResumeItem = ({ resume }: ResumeItemProps) => {
  const wasUpdated = resume.createdAt !== resume.createdAt;
  return (
    <div className="group rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "<no-title>"}
          </p>

          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}

          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"}
            on {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
    </div>
  );
};
