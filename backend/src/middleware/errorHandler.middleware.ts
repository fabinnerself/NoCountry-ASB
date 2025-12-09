import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logError } from '../utils/logger';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logError('Error handler caught error', error);

  if (error instanceof ZodError) {
    const errorMessage = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
    res.status(400).json({
      success: false,
      error: `Validation error: ${errorMessage}`,
    });
    return;
  }

  if (error instanceof Error) {
    if (error.message.includes('Cohere') || error.message.includes('API')) {
      res.status(500).json({
        success: false,
        error: 'Error al generar la historia. Por favor, intente nuevamente.',
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
  });
}
