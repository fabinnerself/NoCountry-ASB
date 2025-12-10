import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ERROR_CODES } from '../constants/errors';
import { createErrorResponse } from '../schemas/error.schema';
import logger from '../utils/logger';

export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data: {
        tone: string;
        format: string;
        text: string;
        image?: { buffer: Buffer; mimetype: string; size: number };
      } = {
        tone: (req.body as { tone: string }).tone,
        format: (req.body as { format: string }).format,
        text: (req.body as { text: string }).text,
      };

      if (req.file) {
        data.image = {
          buffer: req.file.buffer,
          mimetype: req.file.mimetype,
          size: req.file.size,
        };
      }

      schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0];
        const errorResponse = createErrorResponse(
          ERROR_CODES.VALIDATION_ERROR,
          firstError.message,
          {
            field: firstError.path.join('.'),
            received: 'undefined',
          }
        );

        logger.error('Validation error:', { error: firstError });
        res.status(400).json(errorResponse);
        return;
      }
      next(error);
    }
  };
}
