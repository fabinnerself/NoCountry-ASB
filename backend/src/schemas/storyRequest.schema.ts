import { z } from 'zod';
import {
  VALID_TONES,
  VALID_FORMATS,
  TEXT_MIN_LENGTH,
  TEXT_MAX_LENGTH,
} from '../constants/validation';
import { ImageValidationSchema } from './imageValidation.schema';

export const StoryRequestSchema = z.object({
  tone: z.enum(VALID_TONES, {
    errorMap: () => ({ message: `tone must be one of: ${VALID_TONES.join(', ')}` }),
  }),
  format: z.enum(VALID_FORMATS, {
    errorMap: () => ({ message: `format must be one of: ${VALID_FORMATS.join(', ')}` }),
  }),
  text: z
    .string()
    .min(TEXT_MIN_LENGTH, `text must be at least ${TEXT_MIN_LENGTH} characters`)
    .max(TEXT_MAX_LENGTH, `text must not exceed ${TEXT_MAX_LENGTH} characters`),
  image: ImageValidationSchema.optional(),
});

export type GenerateStoryRequest = z.infer<typeof StoryRequestSchema>;
