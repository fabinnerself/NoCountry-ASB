import { Request, Response, NextFunction } from 'express';
import { generateStoryHandler } from '../../../src/controllers/story.controller';
import * as storyGeneratorService from '../../../src/services/storyGenerator.service';

jest.mock('../../../src/services/storyGenerator.service');

const mockGenerateStory = storyGeneratorService.generateStory as jest.MockedFunction<
  typeof storyGeneratorService.generateStory
>;

describe('Story Controller - TDD', () => {
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
    jest.clearAllMocks();
  });

  it('should call generateStory service with request body', async () => {
    const requestBody = {
      tone: 'INSPIRACIONAL',
      format: 'POST',
      text: 'María completó el programa.',
    };

    const mockResponse_data = {
      success: 'ok' as const,
      generatedStory: 'Generated story text',
      validation: { tone: 'ok' as const, format: 'ok' as const, text: 'ok' as const },
      metadata: {
        wordCount: 95,
        tone: 'INSPIRACIONAL',
        format: 'POST',
        generatedAt: new Date().toISOString(),
        model: 'command-r-plus',
      },
    };

    mockRequest.body = requestBody;
    mockGenerateStory.mockResolvedValue(mockResponse_data);

    await generateStoryHandler(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockGenerateStory).toHaveBeenCalledWith(requestBody);
  });

  it('should return response from service with status 200', async () => {
    const mockServiceResponse = {
      success: 'ok' as const,
      generatedStory: 'Story content',
      validation: { tone: 'ok' as const, format: 'ok' as const, text: 'ok' as const },
      metadata: {
        wordCount: 100,
        tone: 'EDUCATIVO',
        format: 'HISTORIA',
        generatedAt: new Date().toISOString(),
        model: 'command-r-plus',
      },
    };

    mockRequest.body = {
      tone: 'EDUCATIVO',
      format: 'HISTORIA',
      text: 'Context text here.',
    };

    mockGenerateStory.mockResolvedValue(mockServiceResponse);

    await generateStoryHandler(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockServiceResponse);
  });

  it('should pass errors to next middleware', async () => {
    const error = new Error('Service error');
    mockRequest.body = {
      tone: 'TÉCNICO',
      format: 'POST',
      text: 'Test context.',
    };

    mockGenerateStory.mockRejectedValue(error);

    await generateStoryHandler(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
