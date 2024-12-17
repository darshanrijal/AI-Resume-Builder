import { SubscriptionLevel } from "./subscription";

export function canCreateResume(
  level: SubscriptionLevel,
  currentResumeCount: number,
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    free: 1,
    pro: 3,
    pro_plus: Infinity,
  };

  const maxResumes = maxResumeMap[level];

  return currentResumeCount < maxResumes;
}

export function canUseAITools(level: SubscriptionLevel) {
  return level !== "free";
}

export function canUseCustomization(level: SubscriptionLevel) {
  return level === "pro_plus";
}
