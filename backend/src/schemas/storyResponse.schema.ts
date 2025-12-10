import { z } from 'zod';
import { VALID_TONES, VALID_FORMATS } from '../constants/validation';

export const ValidationResultSchema = z.object({
  tone: z.enum(['ok', 'error']),
  format: z.enum(['ok', 'error']),
  text: z.enum(['ok', 'error']),
  image: z.enum(['ok', 'error', 'not_provided']),
});

export const MetadataSchema = z.object({
  wordCount: z.number(),
  tone: z.enum(VALID_TONES),
  format: z.enum(VALID_FORMATS),
  imageProcessed: z.boolean(),
  imageCaptions: z.array(z.string()).optional(),
  generatedAt: z.string(),
  model: z.string(),
  processingTimeMs: z.number().optional(),
});

export const StoryResponseSchema = z.object({
  success: z.literal('ok'),
  generatedStory: z.string(),
  validation: ValidationResultSchema,
  metadata: MetadataSchema,
});

export type ValidationResult = z.infer<typeof ValidationResultSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type GenerateStoryResponse = z.infer<typeof StoryResponseSchema>;
