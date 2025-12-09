import { z } from 'zod';

export const ValidationStatusEnum = z.enum(['ok', 'error']);

export const StoryResponseSchema = z.object({
  success: z.literal('ok'),
  generatedStory: z.string(),
  validation: z.object({
    tone: ValidationStatusEnum,
    format: ValidationStatusEnum,
    text: ValidationStatusEnum,
  }),
  metadata: z.object({
    wordCount: z.number(),
    tone: z.string(),
    format: z.string(),
    generatedAt: z.string().datetime(),
    model: z.string(),
  }),
});

export type StoryResponse = z.infer<typeof StoryResponseSchema>;
export type ValidationStatus = z.infer<typeof ValidationStatusEnum>;
