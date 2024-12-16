import { useState } from "react";
import { WandSparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { LoadingButton } from "@/components/LoadingButton";
import { generateSummary } from "./actions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export const GenerateSummaryButton = ({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    // TODO block for non premium users

    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong, Please try again",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <LoadingButton
      loading={loading}
      variant="outline"
      type="button"
      onClick={handleClick}
    >
      <WandSparkles className="size-4" />
      Generate(AI)
    </LoadingButton>
  );
};
