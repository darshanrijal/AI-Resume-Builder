"use client";

import React from "react";
import { SubscriptionLevel } from "@/lib/subscription";

const subscriptionLevelCtx = React.createContext<SubscriptionLevel | undefined>(
  undefined,
);

interface SubscriptionLevelProviderProps {
  children: React.ReactNode;
  userSubscriptionLevel: SubscriptionLevel;
}

export const SubscriptionLevelProvider = ({
  children,
  userSubscriptionLevel,
}: SubscriptionLevelProviderProps) => {
  return (
    <subscriptionLevelCtx.Provider value={userSubscriptionLevel}>
      {children}
    </subscriptionLevelCtx.Provider>
  );
};

export function useSubscriptionLevel() {
  const ctx = React.useContext(subscriptionLevelCtx);

  if (ctx === undefined) {
    throw new Error(
      "useSubscriptionLevel must be used within <SubscriptionLevelProvider/>",
    );
  }

  return ctx;
}
