import { Metadata } from "next";
import { Suspense } from "react";
import { ResumeEditor } from "./ResumeEditor";

export const metadata: Metadata = {
  title: "Design your resume",
};

export default function Page() {
  return (
    <Suspense>
      <ResumeEditor />
    </Suspense>
  );
}
