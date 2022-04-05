import fs from 'fs';
import { resolve } from 'path';

import upload from '@config/upload';

import IStorageProvider, { IStorageData } from '../IStorageProvider';

export default class LocalStorageProvider implements IStorageProvider {
  async save({ file, folder }: IStorageData): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    );

    return file;
  }

  async delete({ file, folder }: IStorageData): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }
}
