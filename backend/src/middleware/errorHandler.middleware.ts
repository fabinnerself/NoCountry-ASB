import { Request, Response, NextFunction } from 'express';
import { ERROR_CODES } from '../constants/errors';
import { createErrorResponse } from '../schemas/error.schema';
import logger from '../utils/logger';

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  logger.error('Error caught by global handler:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
  });

  if (err.message.includes('timeout')) {
    const errorResponse = createErrorResponse(
      ERROR_CODES.TIMEOUT,
      'Request timeout. Please try again.'
    );
    res.status(504).json(errorResponse);
    return;
  }

  if (err.message.includes('API')) {
    const errorResponse = createErrorResponse(
      ERROR_CODES.API_ERROR,
      'Error communicating with external API. Please try again later.'
    );
    res.status(500).json(errorResponse);
    return;
  }

  const errorResponse = createErrorResponse(
    ERROR_CODES.INTERNAL_ERROR,
    process.env.NODE_ENV === 'production' ? 'Internal server error. Please try again.' : err.message
  );

  res.status(500).json(errorResponse);
}
