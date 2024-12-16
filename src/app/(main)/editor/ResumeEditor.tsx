"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn, mapToResumeValues } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useUnloadWarning } from "@/hooks/use-unload-warning";
import { Breadcrumbs } from "./breadcrumbs";
import { ResumePreviewSection } from "./ResumePreviewSection";
import { Footer } from "./footer";
import { steps } from "./steps";
import { useAutoSaveResume } from "./useAutoSaveResume";
import { ResumeServerData } from "@/lib/types";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

export const ResumeEditor = ({ resumeToEdit }: ResumeEditorProps) => {
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {},
  );
  const [showSmResumePreview, setshowSmResumePreview] = useState(false);
  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges);
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
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
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
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        isSaving={isSaving}
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setshowSmResumePreview}
      />
    </div>
  );
};
