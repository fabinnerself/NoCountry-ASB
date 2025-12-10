import { z } from 'zod';
import { ERROR_CODES } from '../constants/errors';

const ErrorCodeEnum = z.enum([
  ERROR_CODES.VALIDATION_ERROR,
  ERROR_CODES.FILE_ERROR,
  ERROR_CODES.API_ERROR,
  ERROR_CODES.TIMEOUT,
  ERROR_CODES.INTERNAL_ERROR,
]);

export const ErrorResponseSchema = z.object({
  success: z.literal('error'),
  error: z.object({
    code: ErrorCodeEnum,
    message: z.string(),
    details: z.record(z.string()).optional(),
    timestamp: z.string(),
  }),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export function createErrorResponse(
  code: z.infer<typeof ErrorCodeEnum>,
  message: string,
  details?: Record<string, string>
): ErrorResponse {
  return {
    success: 'error',
    error: {
      code,
      message,
      details,
      timestamp: new Date().toISOString(),
    },
  };
}
