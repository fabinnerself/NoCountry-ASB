import { ErrorResponseSchema } from '../../../src/schemas/error.schema';

describe('ErrorResponse Schema - TDD', () => {
  it('should accept valid error response', () => {
    const data = {
      success: false,
      error: 'Valor de tone no válido: EMOTIVO. Valores permitidos: INSPIRACIONAL, EDUCATIVO, TÉCNICO',
    };
    const result = ErrorResponseSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('should reject error response with missing success field', () => {
    const data = {
      error: 'Some error message',
    };
    const result = ErrorResponseSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('should reject error response with missing error field', () => {
    const data = {
      success: false,
    };
    const result = ErrorResponseSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('should reject error response with success: true', () => {
    const data = {
      success: true,
      error: 'Error message',
    };
    const result = ErrorResponseSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
