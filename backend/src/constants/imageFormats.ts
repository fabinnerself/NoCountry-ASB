export const VALID_IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp'] as const;

export const IMAGE_EXTENSIONS = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
} as const;

export const MAX_FILE_SIZE = 10485760; // 10 MB in bytes

export type ValidImageMime = (typeof VALID_IMAGE_MIMES)[number];
