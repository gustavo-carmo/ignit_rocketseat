import { container } from 'tsyringe';

import LocalStorageProvider from './implementations/LocalStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';
import IStorageProvider from './IStorageProvider';

const storageToUse = () => {
  switch (process.env.STORAGE) {
    case 's3':
      return S3StorageProvider;
    case 'local':
      return LocalStorageProvider;
    default:
      return LocalStorageProvider;
  }
};
/*
const storageProvider =
  process.env.STORAGE && process.env.STORAGE === 's3'
    ? S3StorageProvider
    : LocalStorageProvider;
*/

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageToUse(),
);
