"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "./breadcrumbs";
import { steps } from "./steps";
import { Footer } from "./footer";
import { ResumeValues } from "@/lib/validation";
import { ResumePreviewSection } from "./ResumePreviewSection";

export const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState<ResumeValues>({});
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const params = new URLSearchParams(searchParams);
    params.set("step", key);
    window.history.pushState(null, "", `?${params.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume. Your progress will be
          saved automatically
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute inset-y-0 flex w-full">
          <div className="w-full space-y-6 overflow-y-auto p-3 md:w-1/2">
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
};