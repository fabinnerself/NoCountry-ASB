export interface CreateStoryDTO {
  tone: string;
  format: string;
  text?: string;
  image?: string;
  generatedStory: string;
  idUsuario?: string;
  errorMessage?: string;
}

export interface UpdateStoryDTO {
  generatedStory?: string;
  errorMessage?: string;
}

export interface FindOptions {
  skip?: number;
  take?: number;
  orderBy?: 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
}

export interface StoryResponse {
  id: string;
  tone: string;
  format: string;
  text?: string;
  image?: string;
  generatedStory: string;
  idUsuario?: string;
  createdAt: Date;
  updatedAt: Date;
  version: string;
  errorMessage?: string;
}
