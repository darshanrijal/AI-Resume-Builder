import { EditorFormProps } from "@/lib/types";
import { GeneralInfoForm } from "./_forms/GeneralInfoForm";
import { PersonalInfoForm } from "./_forms/PersonalInfoForm";
import { WorkExperienceForm } from "./_forms/WorkExperienceForm";
import { EducationForm } from "./_forms/EducationForm";
import { SkillsForm } from "./_forms/SkillsForm";
import { SummaryForm } from "./_forms/SummaryForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  {
    title: "General info",
    component: GeneralInfoForm,
    key: "general-info",
  },
  {
    title: "Personal info",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Work experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Education",
    component: EducationForm,
    key: "education",
  },
  {
    title: "Skills",
    component: SkillsForm,
    key: "skills",
  },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];
