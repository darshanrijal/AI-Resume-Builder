"use client";
import { Button } from "@/components/ui/button";
import { usePremiumModal } from "@/hooks/use-premium-modal";
import Link from "next/link";
import { PlusSquare } from "lucide-react";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

export const CreateResumeButton = ({ canCreate }: CreateResumeButtonProps) => {
  const premiumModal = usePremiumModal();

  if (canCreate) {
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New Resume
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => premiumModal.setOpen(true)}
      className="mx-auto flex w-fit gap-2"
    >
      <PlusSquare className="size-5" />
      New Resume
    </Button>
  );
};
