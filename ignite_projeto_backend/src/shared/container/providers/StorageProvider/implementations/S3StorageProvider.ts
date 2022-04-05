import { S3 } from 'aws-sdk';
import { ContentType } from 'aws-sdk/clients/cloudsearchdomain';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import upload from '@config/upload';

import IStorageProvider, { IStorageData } from '../IStorageProvider';

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save({ file, folder }: IStorageData): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName) as ContentType;

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        Body: fileContent,
        ACL: 'public-read',
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalName);

    return file;
  }

  async delete({ file, folder }: IStorageData): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}
