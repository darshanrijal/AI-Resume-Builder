import { useState } from "react";
import {
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateWorkExperience } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/LoadingButton";
import { usePremiumModal } from "@/hooks/use-premium-modal";
import { useSubscriptionLevel } from "../../SubscriptionLevelCtx";
import { canUseAITools } from "@/lib/permissions";

interface GenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (work_exp: WorkExperience) => void;
}

export const GenerateWorkExperienceButton = ({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceButtonProps) => {
  const [showInputDialog, setShowInputDialog] = useState(false);
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();
  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          if (!canUseAITools(subscriptionLevel)) {
            premiumModal.setOpen(true);
            return;
          }
          setShowInputDialog(true);
        }}
      >
        <WandSparkles className="size-4" />
        Smart Fill(AI)
      </Button>

      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={(exp) => {
          onWorkExperienceGenerated(exp);
          setShowInputDialog(false);
        }}
      />
    </>
  );
};
interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (work_exp: WorkExperience) => void;
}
function InputDialog({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogProps) {
  const { toast } = useToast();
  const form = useForm<GenerateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: GenerateWorkExperienceInput) {
    try {
      const res = await generateWorkExperience(input);

      onWorkExperienceGenerated(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to generate your work experience",
      });
    }
  }

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate work experience</DialogTitle>
          <DialogDescription>
            Describe this work experience and the AI will generate an optimized
            entry for you
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`E.g. "From nov 2019 to dec 2020 i worked as chariman of chaudary group, my tasks were ...."`}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
