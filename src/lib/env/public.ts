import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_MODEL_BASE_URL: z.string().url(),
  NEXT_PUBLIC_MODEL_API_KEY: z.string(),
});

type PublicEnv = z.infer<typeof publicEnvSchema>;

export const publicEnv: PublicEnv = {
  NEXT_PUBLIC_MODEL_BASE_URL: process.env.NEXT_PUBLIC_MODEL_BASE_URL!,
  NEXT_PUBLIC_MODEL_API_KEY: process.env.NEXT_PUBLIC_MODEL_API_KEY!,
};

publicEnvSchema.parse(publicEnv);
