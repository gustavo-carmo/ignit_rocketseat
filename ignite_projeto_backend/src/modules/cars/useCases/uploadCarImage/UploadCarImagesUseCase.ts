import { inject, injectable } from 'tsyringe';

import ICarImagesRepository from '@modules/cars/repositories/ICarImagesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider';
import { deleteFile } from '@utils/file';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export default class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const promises: any[] = [];

    images_name.forEach(async (image_name) => {
      promises.push(
        await this.carImagesRepository.create({
          car_id,
          image_name,
        }),
      );

      promises.push(
        await this.storageProvider.save({
          file: image_name,
          folder: 'car',
        }),
      );
    });

    const imagesToDelete = await this.carImagesRepository.findAllByCar(car_id);

    // TODO this logic need to be improved to be able to keep only new photos
    imagesToDelete.forEach(async (carImage) => {
      promises.push(await this.carImagesRepository.delete(carImage.id));
      promises.push(
        await this.storageProvider.delete({
          file: carImage.image_name,
          folder: 'car',
        }),
      );
    });

    await Promise.all(promises);
  }
}
