import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: z.string().startsWith("sk_"),
    BLOB_READ_WRITE_TOKEN: z.string().startsWith("vercel_blob_rw_"),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.literal("/sign-in", {
      message: "Change in file tree and modify env",
    }),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.literal("/sign-up", {
      message: "Change in file tree and modify env",
    }),
    NEXT_PUBLIC_CLERK_FORCE_SIGN_IN_URL: z.string().startsWith("/"),
    NEXT_PUBLIC_CLERK_FORCE_SIGN_UP_URL: z.string().startsWith("/"),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHY: z.string().startsWith("price"),
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHY: z.string().startsWith("price"),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CLERK_FORCE_SIGN_IN_URL:
      process.env.NEXT_PUBLIC_CLERK_FORCE_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_FORCE_SIGN_UP_URL:
      process.env.NEXT_PUBLIC_CLERK_FORCE_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
});
