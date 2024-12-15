import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { steps } from "./steps";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

export const Footer = ({ currentStep, setCurrentStep }: FooterProps) => {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  const nextStep = currentIndex >= 0 ? steps[currentIndex + 1]?.key : null;
  const prevStep = currentIndex >= 0 ? steps[currentIndex - 1]?.key : null;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={prevStep ? () => setCurrentStep(prevStep) : undefined}
            disabled={!prevStep}
          >
            Previous step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next step
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
};
