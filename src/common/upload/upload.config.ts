import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { BadRequestException } from '@nestjs/common';

const ROUTE_UPLOADS_RELATIVE_PATH = '/uploads/routes';
const ROUTE_UPLOADS_ABSOLUTE_PATH = join(process.cwd(), 'uploads', 'routes');

function ensureDirectoryExists(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

export const routeImageUploadConfig = {
  storage: diskStorage({
    destination: (_req, _file, cb) => {
      ensureDirectoryExists(ROUTE_UPLOADS_ABSOLUTE_PATH);
      cb(null, ROUTE_UPLOADS_ABSOLUTE_PATH);
    },
    filename: (_req, file, cb) => {
      const extension = extname(file.originalname).toLowerCase();
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueName}${extension}`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    const extension = extname(file.originalname).toLowerCase();
    const allowedMimeTypes = new Set([
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/webp',
    ]);
    const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

    if (
      allowedMimeTypes.has(file.mimetype.toLowerCase()) &&
      allowedExtensions.has(extension)
    ) {
      cb(null, true);
      return;
    }

    cb(
      new BadRequestException(
        'Only jpg, jpeg, png, webp files are allowed',
      ) as unknown as Error,
      false,
    );
  },
};

export function buildRouteImageUrl(filename: string): string {
  return `${ROUTE_UPLOADS_RELATIVE_PATH}/${filename}`;
}
