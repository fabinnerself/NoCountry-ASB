import { CohereClientV2 } from 'cohere-ai';
import logger from '../utils/logger';

export interface GenerateStoryInput {
  tone: string;
  format: string;
  text?: string;
  image?: string;
}

export class StoryGeneratorService {
  private cohere: CohereClientV2;

  constructor() {
    const apiKey = process.env.COHERE_API_KEY;
    if (!apiKey) {
      throw new Error('COHERE_API_KEY no está configurada');
    }
    this.cohere = new CohereClientV2({ token: apiKey });
  }

  async generate(input: GenerateStoryInput): Promise<string> {
    try {
      const prompt = this.buildPrompt(input);
      
      logger.info('Generating story with Cohere', { 
        tone: input.tone, 
        format: input.format 
      });

      const model = process.env.COHERE_MODEL || 'command-r7b-12-2024';

      const response = await this.cohere.chat({
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        maxTokens: 500
      });

      // Extraer el texto de la respuesta
      let generatedText = '';
      
      if (response.message?.content) {
        for (const item of response.message.content) {
          if ('text' in item && item.text) {
            generatedText += item.text;
          }
        }
      }
      
      generatedText = generatedText.trim();
      
      if (!generatedText) {
        throw new Error('No se pudo generar la historia');
      }

      logger.info('Story generated successfully');
      return generatedText;
    } catch (error) {
      logger.error('Error generating story:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      logger.error('Error details:', errorMessage);
      throw new Error('Error al generar la historia con IA');
    }
  }

  private buildPrompt(input: GenerateStoryInput): string {
    const toneMap: Record<string, string> = {
      'INSPIRACIONAL': 'inspiracional y motivador',
      'EDUCATIVO': 'educativo y didáctico',
      'TÉCNICO': 'técnico y profesional',
      'inspiracional': 'inspiracional y motivador',
      'educativo': 'educativo y didáctico',
      'tecnico': 'técnico y profesional'
    };

    const formatMap: Record<string, string> = {
      'HISTORIA': 'una historia narrativa completa de 200-350 palabras',
      'POST': 'un post de blog de 150-250 palabras',
      'REDES SOCIALES': 'un post para redes sociales de 80-120 palabras',
      'historia': 'una historia narrativa completa de 200-350 palabras',
      'post': 'un post de blog de 150-250 palabras',
      'redes sociales': 'un post para redes sociales de 80-120 palabras',
      'otro': 'un texto narrativo'
    };

    const tone = toneMap[input.tone] || input.tone;
    const format = formatMap[input.format] || input.format;

    let prompt = `Eres un escritor experto en crear narrativas de impacto social.\n\n`;
    prompt += `Genera ${format} con un tono ${tone}.\n\n`;
    
    if (input.text) {
      prompt += `Basándote en la siguiente información:\n${input.text}\n\n`;
    }
    
    if (input.image) {
      prompt += `Nota: El usuario ha proporcionado una imagen de apoyo.\n\n`;
    }

    prompt += `Requisitos:\n`;
    prompt += `- Escribe en español\n`;
    prompt += `- Usa un lenguaje claro y accesible\n`;
    prompt += `- Crea una narrativa coherente y emotiva\n`;
    prompt += `- Enfócate en el impacto humano y social\n`;
    prompt += `- NO incluyas títulos ni encabezados\n`;
    prompt += `- Escribe directamente el contenido\n\n`;
    prompt += `Genera la historia ahora:`;
    
    return prompt;
  }
}
