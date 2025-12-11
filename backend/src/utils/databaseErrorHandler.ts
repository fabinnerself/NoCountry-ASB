import { Prisma } from '@prisma/client';

export enum DatabaseErrorType {
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  CONSTRAINT_VIOLATION = 'CONSTRAINT_VIOLATION',
  QUERY_ERROR = 'QUERY_ERROR',
  TRANSACTION_ERROR = 'TRANSACTION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface DatabaseError {
  type: DatabaseErrorType;
  message: string;
  code?: string;
  meta?: any;
}

export const DB_ERROR_MESSAGES = {
  CONNECTION_FAILED: 'Error de conexión con base de datos. Verifique la configuración de DATABASE_URL',
  TIMEOUT: 'Tiempo de espera agotado al conectar con base de datos',
  SAVE_FAILED: 'Error al guardar historia en base de datos',
  CONSTRAINT_VIOLATION: 'Violación de restricción de base de datos',
  TRANSACTION_FAILED: 'Error al ejecutar transacción. Los cambios fueron revertidos',
  NOT_FOUND: 'Registro no encontrado en base de datos'
};

export class DatabaseErrorHandler {
  static handle(error: unknown): DatabaseError {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handleKnownError(error);
    }
    
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return {
        type: DatabaseErrorType.UNKNOWN_ERROR,
        message: 'Error desconocido en base de datos'
      };
    }
    
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return {
        type: DatabaseErrorType.CONNECTION_ERROR,
        message: DB_ERROR_MESSAGES.CONNECTION_FAILED
      };
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        type: DatabaseErrorType.QUERY_ERROR,
        message: 'Error de validación en los datos'
      };
    }
    
    return {
      type: DatabaseErrorType.UNKNOWN_ERROR,
      message: error instanceof Error ? error.message : 'Error inesperado'
    };
  }
  
  private static handleKnownError(
    error: Prisma.PrismaClientKnownRequestError
  ): DatabaseError {
    switch (error.code) {
      case 'P2002':
        return {
          type: DatabaseErrorType.CONSTRAINT_VIOLATION,
          message: 'Violación de restricción única',
          code: error.code,
          meta: error.meta
        };
      case 'P2025':
        return {
          type: DatabaseErrorType.QUERY_ERROR,
          message: DB_ERROR_MESSAGES.NOT_FOUND,
          code: error.code
        };
      case 'P2024':
        return {
          type: DatabaseErrorType.TIMEOUT_ERROR,
          message: DB_ERROR_MESSAGES.TIMEOUT,
          code: error.code
        };
      case 'P2034':
        return {
          type: DatabaseErrorType.TRANSACTION_ERROR,
          message: DB_ERROR_MESSAGES.TRANSACTION_FAILED,
          code: error.code
        };
      default:
        return {
          type: DatabaseErrorType.QUERY_ERROR,
          message: `Error de base de datos. Código: ${error.code}`,
          code: error.code,
          meta: error.meta
        };
    }
  }
}
