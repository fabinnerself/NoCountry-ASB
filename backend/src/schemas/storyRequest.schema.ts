import { z } from 'zod';

export const ToneEnum = z.enum(['INSPIRACIONAL', 'EDUCATIVO', 'TÉCNICO']);
export const FormatEnum = z.enum(['HISTORIA', 'POST', 'REDES_SOCIALES', 'OTRO']);

export const StoryRequestSchema = z.object({
  tone: ToneEnum,
  format: FormatEnum,
  text: z.string().min(20).max(1000),
});

export type StoryRequest = z.infer<typeof StoryRequestSchema>;
export type Tone = z.infer<typeof ToneEnum>;
export type Format = z.infer<typeof FormatEnum>;
