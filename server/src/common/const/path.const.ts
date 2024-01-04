import { join } from 'path/posix';

export const PROJECT_ROOT_PATH = process.cwd();
export const HOST_PATH = 'http://localhost:3001';
export const PUBLIC_FOLDER_NAME = 'public';
export const IMAGES_FOLDER_NAME = 'images';

export const PUBLIC_FOLDER_PATH = join(PROJECT_ROOT_PATH, PUBLIC_FOLDER_NAME);

export const PUBLIC_IMAGES_FOLDER_PATH = join(
  PUBLIC_FOLDER_NAME,
  IMAGES_FOLDER_NAME,
);
