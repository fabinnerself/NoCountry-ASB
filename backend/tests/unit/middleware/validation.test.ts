import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../../../src/middleware/validation.middleware';
import { StoryRequestSchema } from '../../../src/schemas/storyRequest.schema';

describe('Validation Middleware - TDD', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it('should call next() for valid request', () => {
    mockRequest.body = {
      tone: 'INSPIRACIONAL',
      format: 'POST',
      text: 'Valid text with more than 20 characters',
    };

    const middleware = validateRequest(StoryRequestSchema);
    middleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith();
  });

  it('should return 400 for invalid request', () => {
    mockRequest.body = {
      tone: 'INVALID',
      format: 'POST',
      text: 'Valid text',
    };

    const middleware = validateRequest(StoryRequestSchema);
    middleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should include error message in response', () => {
    mockRequest.body = {
      tone: 'INSPIRACIONAL',
      format: 'POST',
      text: 'Short', // too short
    };

    const middleware = validateRequest(StoryRequestSchema);
    middleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: expect.any(String),
      })
    );
  });
});
