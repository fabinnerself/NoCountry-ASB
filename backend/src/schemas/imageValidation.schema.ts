import { z } from 'zod';
import { VALID_IMAGE_MIMES, MAX_FILE_SIZE } from '../constants/imageFormats';

export const ImageValidationSchema = z.object({
  buffer: z.instanceof(Buffer).refine((buf) => buf.length > 0, {
    message: 'Image buffer cannot be empty',
  }),
  mimetype: z
    .string()
    .refine((mime) => VALID_IMAGE_MIMES.includes(mime as (typeof VALID_IMAGE_MIMES)[number]), {
      message: `Invalid image type. Allowed: ${VALID_IMAGE_MIMES.join(', ')}`,
    }),
  size: z
    .number()
    .max(MAX_FILE_SIZE, `File size must not exceed ${MAX_FILE_SIZE / 1024 / 1024} MB`),
});

export type ImageValidationResult = z.infer<typeof ImageValidationSchema>;

export function validateImage(file: {
  buffer: Buffer;
  mimetype: string;
  size: number;
}): ImageValidationResult {
  return ImageValidationSchema.parse(file);
}
