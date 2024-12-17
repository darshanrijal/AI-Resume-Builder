"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LoadingButton } from "@/components/LoadingButton";
import { createCustomerPortalSession } from "./actions";

export const ManageSubscriptionButton = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    try {
      setLoading(true);
      const redirectUrl = await createCustomerPortalSession();

      window.location.href = redirectUrl;
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
    <LoadingButton loading={loading} onClick={handleClick}>
      Manage subscription
    </LoadingButton>
  );
};
