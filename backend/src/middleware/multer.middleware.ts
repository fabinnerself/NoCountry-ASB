import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { VALID_IMAGE_MIMES, MAX_FILE_SIZE } from '../constants/imageFormats';
import { getFileTypeErrorMessage, getFileSizeErrorMessage } from '../utils/errorMessages';

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  if (VALID_IMAGE_MIMES.includes(file.mimetype as (typeof VALID_IMAGE_MIMES)[number])) {
    cb(null, true);
  } else {
    cb(new Error(getFileTypeErrorMessage(file.mimetype)));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});

export const uploadImage = upload.single('image');

export function handleMulterError(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({
        success: 'error',
        error: {
          code: 'FILE_ERROR',
          message: getFileSizeErrorMessage(MAX_FILE_SIZE + 1),
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }
  }
  if (err instanceof Error && err.message.includes('tipo de archivo')) {
    res.status(400).json({
      success: 'error',
      error: {
        code: 'FILE_ERROR',
        message: err.message,
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }
  next(err);
  return;
}
