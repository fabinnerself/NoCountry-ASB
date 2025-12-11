import { Request, Response } from 'express';
import { StoryGeneratorService } from '../services/storyGenerator.service';
import { StoryRepository } from '../repositories/story.repository';
import logger from '../utils/logger';

const storyGeneratorService = new StoryGeneratorService();

export const generateStory = async (req: Request, res: Response): Promise<void> => {
  const startTime = Date.now();
  
  try {
    // Validar inputs
    const { tone, format, text, id_usuario } = req.body;
    
    if (!tone || !format) {
      res.status(400).json({
        success: false,
        error: 'Los campos tone y format son requeridos'
      });
      return;
    }

    // Validar valores permitidos
    const validTones = ['inspiracional', 'educativo', 'tecnico'];
    const validFormats = ['historia', 'post', 'redes sociales', 'otro'];
    
    if (!validTones.includes(tone.toLowerCase())) {
      res.status(400).json({
        success: false,
        error: `Tono inválido. Valores permitidos: ${validTones.join(', ')}`
      });
      return;
    }

    if (!validFormats.includes(format.toLowerCase())) {
      res.status(400).json({
        success: false,
        error: `Formato inválido. Valores permitidos: ${validFormats.join(', ')}`
      });
      return;
    }

    // Obtener imagen si fue subida
    const imageFile = req.file ? req.file.filename : undefined;

    logger.info('Generating story', { tone, format, hasText: !!text, hasImage: !!imageFile });

    // Generar historia con IA
    const generatedStory = await storyGeneratorService.generate({
      tone,
      format,
      text,
      image: imageFile
    });

    // Intentar persistir en base de datos
    let dbValidation: { db: string; message?: string } = { db: 'ok' };
    
    try {
      const storyRepository = new StoryRepository();
      await storyRepository.create({
        tone,
        format,
        text,
        image: imageFile,
        generatedStory,
        idUsuario: id_usuario
      });
      
      logger.info('Story persisted successfully in database');
    } catch (dbError) {
      logger.error('Database persistence error:', dbError);
      dbValidation = {
        db: 'error',
        message: 'Error al guardar historia en base de datos'
      };
    }

    const processingTime = Date.now() - startTime;

    // Respuesta exitosa
    res.json({
      success: true,
      story: generatedStory,
      metadata: {
        tone,
        format,
        hasImage: !!imageFile,
        processingTimeMs: processingTime
      },
      validation: {
        input: 'ok',
        generation: 'ok',
        ...dbValidation
      }
    });

  } catch (error) {
    logger.error('Error in generateStory controller:', error);
    
    const processingTime = Date.now() - startTime;
    
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error al generar la historia',
      metadata: {
        processingTimeMs: processingTime
      }
    });
  }
};
