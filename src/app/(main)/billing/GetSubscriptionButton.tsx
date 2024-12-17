"use client";

import { Button } from "@/components/ui/button";
import { usePremiumModal } from "@/hooks/use-premium-modal";

export const GetSubscriptionButton = () => {
  const premiumModal = usePremiumModal();
  return (
    <Button onClick={() => premiumModal.setOpen(true)} variant="premium">
      Get premium subscription
    </Button>
  );
};
