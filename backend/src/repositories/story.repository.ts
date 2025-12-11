import { PrismaClient, Story } from '@prisma/client';
import DatabaseClient from '../config/database';
import { CreateStoryDTO, UpdateStoryDTO, FindOptions, StoryResponse } from '../types/story.dto';
import { DatabaseErrorHandler } from '../utils/databaseErrorHandler';
import logger from '../utils/logger';

export class StoryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DatabaseClient.getInstance();
  }

  async create(data: CreateStoryDTO): Promise<StoryResponse> {
    try {
      const story = await this.prisma.story.create({
        data: {
          tone: data.tone,
          format: data.format,
          text: data.text,
          image: data.image,
          generatedStory: data.generatedStory,
          idUsuario: data.idUsuario,
          errorMessage: data.errorMessage
        }
      });

      logger.info('Story created successfully', { id: story.id });
      return this.mapToResponse(story);
    } catch (error) {
      const dbError = DatabaseErrorHandler.handle(error);
      logger.error('Error creating story:', dbError);
      throw new Error(dbError.message);
    }
  }

  async findById(id: string): Promise<StoryResponse | null> {
    try {
      const story = await this.prisma.story.findUnique({
        where: { id }
      });

      return story ? this.mapToResponse(story) : null;
    } catch (error) {
      const dbError = DatabaseErrorHandler.handle(error);
      logger.error('Error finding story by id:', dbError);
      throw new Error(dbError.message);
    }
  }

  async findAll(options?: FindOptions): Promise<StoryResponse[]> {
    try {
      const stories = await this.prisma.story.findMany({
        skip: options?.skip,
        take: options?.take,
        orderBy: options?.orderBy ? {
          [options.orderBy]: options.order || 'desc'
        } : {
          createdAt: 'desc'
        }
      });

      return stories.map(story => this.mapToResponse(story));
    } catch (error) {
      const dbError = DatabaseErrorHandler.handle(error);
      logger.error('Error finding stories:', dbError);
      throw new Error(dbError.message);
    }
  }

  async update(id: string, data: UpdateStoryDTO): Promise<StoryResponse> {
    try {
      const story = await this.prisma.story.update({
        where: { id },
        data: {
          generatedStory: data.generatedStory,
          errorMessage: data.errorMessage
        }
      });

      logger.info('Story updated successfully', { id: story.id });
      return this.mapToResponse(story);
    } catch (error) {
      const dbError = DatabaseErrorHandler.handle(error);
      logger.error('Error updating story:', dbError);
      throw new Error(dbError.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.story.delete({
        where: { id }
      });

      logger.info('Story deleted successfully', { id });
    } catch (error) {
      const dbError = DatabaseErrorHandler.handle(error);
      logger.error('Error deleting story:', dbError);
      throw new Error(dbError.message);
    }
  }

  async count(): Promise<number> {
    try {
      return await this.prisma.story.count();
    } catch (error) {
      const dbError = DatabaseErrorHandler.handle(error);
      logger.error('Error counting stories:', dbError);
      throw new Error(dbError.message);
    }
  }

  private mapToResponse(story: Story): StoryResponse {
    return {
      id: story.id,
      tone: story.tone,
      format: story.format,
      text: story.text || undefined,
      image: story.image || undefined,
      generatedStory: story.generatedStory,
      idUsuario: story.idUsuario || undefined,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
      version: story.version,
      errorMessage: story.errorMessage || undefined
    };
  }
}
