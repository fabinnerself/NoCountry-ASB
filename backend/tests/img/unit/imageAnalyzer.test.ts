import { ImageAnalyzerService } from '../../../src/services/imageAnalyzer.service';
import { cohereClient } from '../../../src/config/cohere';
import { mockImageBuffer } from '../../fixtures/testData';

jest.mock('../../../src/config/cohere', () => ({
  cohereClient: {
    chat: jest.fn(),
  },
}));

describe('ImageAnalyzerService', () => {
  let service: ImageAnalyzerService;

  beforeEach(() => {
    service = new ImageAnalyzerService();
    jest.clearAllMocks();
  });

  describe('analyzeImage - success cases', () => {
    it('should extract captions from JPEG image', async () => {
      const mockResponse = {
        text: 'Mujer joven emprendedora\nEspacio de trabajo moderno\nProductos artesanales',
      };
      (cohereClient.chat as jest.Mock).mockResolvedValue(mockResponse);

      const captions = await service.analyzeImage(mockImageBuffer, 'image/jpeg');

      expect(captions).toBeDefined();
      expect(Array.isArray(captions)).toBe(true);
      expect(captions.length).toBeGreaterThanOrEqual(2);
      expect(captions.every((c) => typeof c === 'string' && c.length > 0)).toBe(true);
    });

    it('should extract captions from PNG image', async () => {
      const mockResponse = {
        text: 'Laptop sobre mesa\nCafé y notebook\nAmbiente creativo',
      };
      (cohereClient.chat as jest.Mock).mockResolvedValue(mockResponse);

      const captions = await service.analyzeImage(mockImageBuffer, 'image/png');

      expect(captions).toBeDefined();
      expect(captions.length).toBeGreaterThanOrEqual(2);
    });

    it('should extract captions from WEBP image', async () => {
      const mockResponse = {
        text: 'Oficina moderna\nEquipo de trabajo\nTecnología',
      };
      (cohereClient.chat as jest.Mock).mockResolvedValue(mockResponse);

      const captions = await service.analyzeImage(mockImageBuffer, 'image/webp');

      expect(captions).toBeDefined();
      expect(captions.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('analyzeImage - error cases', () => {
    it('should handle API timeout', async () => {
      (cohereClient.chat as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 15000))
      );

      await expect(service.analyzeImage(mockImageBuffer, 'image/jpeg')).rejects.toThrow();
    });

    it('should handle API error', async () => {
      (cohereClient.chat as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(service.analyzeImage(mockImageBuffer, 'image/jpeg')).rejects.toThrow(
        'Failed to analyze image'
      );
    });

    it('should return default captions when API returns empty', async () => {
      const mockResponse = { text: '' };
      (cohereClient.chat as jest.Mock).mockResolvedValue(mockResponse);

      const captions = await service.analyzeImage(mockImageBuffer, 'image/jpeg');

      expect(captions).toBeDefined();
      expect(captions.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('retryWithBackoff', () => {
    it('should retry on failure', async () => {
      (cohereClient.chat as jest.Mock)
        .mockRejectedValueOnce(new Error('Temporary error'))
        .mockRejectedValueOnce(new Error('Temporary error'))
        .mockResolvedValueOnce({ text: 'Success after retries\nCaptions here' });

      const captions = await service.analyzeImage(mockImageBuffer, 'image/jpeg');

      expect(captions).toBeDefined();
      expect(cohereClient.chat).toHaveBeenCalledTimes(3);
    });

    it('should fail after max retries', async () => {
      (cohereClient.chat as jest.Mock).mockRejectedValue(new Error('Persistent error'));

      await expect(service.analyzeImage(mockImageBuffer, 'image/jpeg')).rejects.toThrow();
      expect(cohereClient.chat).toHaveBeenCalledTimes(3);
    });
  });
});
